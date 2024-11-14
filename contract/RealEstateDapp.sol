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
        uint[] dates;
        bool checkedIn;
        bool checkedOut;
    }

    struct ReviewStruct {
        uint id;
        uint aptid;
        string text;
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

    address private Owner;
    uint private totalApts = 0;
    uint8 platformFee;

    constructor(uint8 _platformFee){ 
        Owner = msg.sender;
        platformFee = _platformFee;
    }

    function currentTime() internal view returns (uint256) {
        return (block.timestamp * 1000) + 1000;
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
        require(price > 0 ether, 'Price cannot be zero.');

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
        apt.timestamp = currentTime();

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
        require(price > 0 ether, 'Price cannot be zero.');

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

    function datesAvailable(uint aptid, uint[] memory dates) internal view returns (bool) {
        bool avail = true;
        for(uint i=0; i<dates.length;i++){
            if(isDateBooked[aptid][dates[i]]){
                avail = false;
                break;
            }
        }
        return avail;
    }

    function calculatePrice(uint aptid, uint[] memory dates) internal view returns (uint) {
        return (apartments[aptid].price * dates.length * (1 + (platformFee/100)));
    }

    function bookApt(uint aptid, uint[] memory dates) public payable nonReentrant{
        require(apartmentExists[aptid], 'Apartment does not exist.');
        require(dates[0]>currentTime(), 'Cannot book past dates');
        require(datesAvailable(aptid, dates), 'Dates not avaiable.');
        uint total = calculatePrice(aptid, dates);
        require(msg.value >= total, 'Insufficient funds.');

        BookingStruct memory booking;
        booking.id = bookings[aptid].length;
        booking.aptid = aptid;
        booking.tenant = msg.sender;
        booking.dates = dates;
        booking.price = apartments[aptid].price;
        booking.total = total;

        uint _platform = booking.price * booking.dates.length * platformFee/100;
        payTo(apartments[aptid].owner, total - _platform);
        payTo(Owner, _platform);

        bookings[aptid].push(booking);
        for(uint i=0; i<dates.length;i++){
            isDateBooked[aptid][dates[i]] = true;
            bookedDates[aptid].push(dates[i]);
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

    function addReview(uint aptid, string memory text) internal{
        require(apartmentExists[aptid], 'Apartment does not exist.');
        require(hasBooked[msg.sender][aptid], 'Must book apartment before reviewing.');
        require(bytes(text).length > 0, 'Review cannot be empty.');

        ReviewStruct memory review;
        review.id = reviews[aptid].length;
        review.aptid = aptid;
        review.text = text;
        review.reviewer = msg.sender;
        review.timestamp = currentTime();

        reviews[aptid].push(review);
    }

    function getReviews(uint aptid) public view returns (ReviewStruct[] memory){
        return reviews[aptid];
    }
}

