// SPDX-License-Identifier: MIT

pragma solidity >=0.8.10;
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract RealEstateDapp is ReentrancyGuard {

    struct ApartmentStruct {
        uint id;
        string name;
        string desc;
        string loc;
        string images;
        uint rooms;
        uint price;
        address owner;
        bool booked;
        bool deleted;
        uint timestamp;
    }

    struct BookingStruct {
        uint id;
        uint aptid;
        address tenant;
        uint price;
        uint total;
        uint checkInDate;
        uint checkOutDate;
        uint numGuests;
        bool checkedIn;
        bool checkedOut;
    }

    struct ReviewStruct {
        uint id;
        uint aptid;
        string text;
        uint8 rating;
        uint timestamp;
        address reviewer;
    }

    mapping(uint => ApartmentStruct) apartments;
    mapping(uint => BookingStruct[]) bookings;
    mapping(uint => ReviewStruct[]) reviews;
    mapping(uint => bool) apartmentExists;
    mapping(address => mapping(uint => bool)) hasBooked;
    mapping(uint => mapping(uint => bool)) isDateBooked;
    mapping(uint => uint[]) bookedDates;
    mapping(uint => uint) private totalRatings;
    mapping(uint => uint) private numReviews;

    address private Owner;
    uint private totalApts = 0;
    uint8 platformFee;
    uint private constant RATING_PRECISION = 100;

    constructor(uint8 _platformFee){ 
        Owner = msg.sender;
        platformFee = _platformFee;
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}('');
        require(success);
    }

    function createApartment(
        string memory name,
        string memory desc,
        string memory loc,
        string memory images,
        uint rooms,
        uint price
    ) public {
        require(bytes(name).length > 0, 'Name cannot be empty.');
        require(bytes(desc).length > 0, 'Description cannot be empty.');
        require(bytes(loc).length > 0, 'Location cannot be empty.');
        require(bytes(images).length > 0, 'Images cannot be empty.');
        require(rooms > 0, 'Rooms cannot be zero.');
        require(price > 0, 'Price cannot be zero.');

        totalApts += 1;

        ApartmentStruct memory apt;
        
        apt.id = totalApts;
        apt.name = name;
        apt.desc = desc;
        apt.loc = loc;
        apt.images = images;
        apt.rooms = rooms;
        apt.price = price;
        apt.owner = msg.sender;
        apt.timestamp = block.timestamp;

        apartmentExists[apt.id] = true;
        apartments[apt.id] = apt;
    }

    function updateApartment(
        uint id,
        string memory name,
        string memory desc,
        string memory loc,
        string memory images,
        uint rooms,
        uint price
    ) public {
        require(apartmentExists[id], 'Apartment does not exist.');
        require(msg.sender == apartments[id].owner, 'Only owner can update.');
        require(bytes(name).length > 0, 'Name cannot be empty.');
        require(bytes(desc).length > 0, 'Description cannot be empty.');
        require(bytes(loc).length > 0, 'Location cannot be empty.');
        require(bytes(images).length > 0, 'Images cannot be empty.');
        require(rooms > 0, 'Rooms cannot be zero.');
        require(price > 0, 'Price cannot be zero.');

        ApartmentStruct memory apt = apartments[id];
        
        apt.name = name;
        apt.desc = desc;
        apt.loc = loc;
        apt.images = images;
        apt.rooms = rooms;
        apt.price = price;

        apartments[apt.id] = apt;
    }

    function deleteApartment(
        uint id
    ) public {
        require(apartmentExists[id], 'Apartment does not exist.');
        require(msg.sender == apartments[id].owner, 'Only owner can delete.');

        apartmentExists[id] = false;
        apartments[id].deleted = true;
    }

    function getApartment(uint id) public view returns (ApartmentStruct memory) {
        return apartments[id];
    }

    function getApartments() public view returns (ApartmentStruct[] memory _apartments) {
        uint256 size;
        for(uint i=1; i<totalApts;i++){
            if(!apartments[i].deleted) size++;
        }

        _apartments = new ApartmentStruct[](size);
        uint256 index = 0;
        for(uint i=1; i<totalApts;i++){
            if(!apartments[i].deleted) _apartments[index++] = apartments[i];
        }
    }

    function datesAvailable(uint aptid, uint checkInDate, uint checkOutDate) internal view returns (bool) {
        for (uint date = checkInDate; date < checkOutDate; date += 1 days) {
            if (isDateBooked[aptid][date]) {
                return false;
            }
        }
        return true;
    }

    function calculatePrice(uint aptid, uint[] memory dates) internal view returns (uint) {
        uint totalPrice = apartments[aptid].price * dates.length;
        return totalPrice + platformFee;  // Add constant platform fee
    }


    function bookApt(
        uint aptid,
        uint checkInDate,
        uint checkOutDate,
        uint numGuests
    ) public payable nonReentrant {
        require(apartmentExists[aptid], 'Apartment does not exist.');
        require(checkInDate > block.timestamp, 'Check-in date must be in the future.');
        require(checkOutDate > checkInDate, 'Check-out date must be after check-in date.');
        require(numGuests > 0, 'Number of guests must be greater than zero.');
        require(datesAvailable(aptid, checkInDate, checkOutDate), 'Selected dates are not available.');

        uint numNights = (checkOutDate - checkInDate) / 1 days;
        uint total = calculatePrice(aptid, numNights);
        require(msg.value >= total, 'Insufficient funds.');

        BookingStruct memory booking;
        booking.id = bookings[aptid].length;
        booking.aptid = aptid;
        booking.tenant = msg.sender;
        booking.checkInDate = checkInDate;
        booking.checkOutDate = checkOutDate;
        booking.numGuests = numGuests;
        booking.price = apartments[aptid].price;
        booking.total = total;

        // Split payment
        uint platformCut = total * platformFee / 100;
        payTo(apartments[aptid].owner, total - platformCut);
        payTo(Owner, platformCut);

        // Update mappings
        bookings[aptid].push(booking);
        for (uint date = checkInDate; date < checkOutDate; date += 1 days) {
            isDateBooked[aptid][date] = true;
            bookedDates[aptid].push(date);
        }
    }


    function getBooking(uint aptid, uint bookingid) public view returns (BookingStruct memory) {
        return bookings[aptid][bookingid]; 
    }
    
    function getBookings(uint aptid) public view returns (BookingStruct[] memory) {
        return bookings[aptid]; 
    }

    function getUnavailableDates(uint aptid) public view returns (uint[] memory) {
        return bookedDates[aptid]; 
    }

    function tenantBooked(uint aptid) public view returns (bool){
        return hasBooked[msg.sender][aptid];
    }

    function checkIn(uint aptid, uint bookingid) public {
        require(hasBooked[msg.sender][aptid], 'You must book before you can check-in');  
        require(!bookings[aptid][bookingid].checkedIn, 'You can only can check in once');
        bookings[aptid][bookingid].checkedIn = true;
    }

    function checkOut(uint aptid, uint bookingid) public {
        require(hasBooked[msg.sender][aptid], 'You must book before you can check-out');  
        require(bookings[aptid][bookingid].checkedIn, 'You must check-in before you can check-out');
        require(!bookings[aptid][bookingid].checkedOut, 'You can only can check out once');
        bookings[aptid][bookingid].checkedOut = true;
    }

    function addReview(uint aptid, string memory text, uint8 rating) public {
        require(apartmentExists[aptid], 'Apartment does not exist.');
        require(hasBooked[msg.sender][aptid], 'Must book apartment before reviewing.');
        require(bytes(text).length > 0, 'Review cannot be empty.');
        require(rating >= 1 && rating <= 5, 'Rating must be between 1 and 5.');

        ReviewStruct memory review;
        review.id = reviews[aptid].length;
        review.aptid = aptid;
        review.text = text;
        review.rating = rating;
        review.reviewer = msg.sender;
        review.timestamp = block.timestamp;

        reviews[aptid].push(review);
        totalRatings[aptid] += rating * RATING_PRECISION;
        numReviews[aptid] += 1;
    }

    function getAverageRating(uint aptid) public view returns (uint) {
        require(apartmentExists[aptid], 'Apartment does not exist.');
        if (numReviews[aptid] == 0) return 0; // No reviews yet
        return totalRatings[aptid] / numReviews[aptid]; // Return scaled average
    }

    function getReviews(uint aptid) public view returns (ReviewStruct[] memory){
        return reviews[aptid];
    }
}

