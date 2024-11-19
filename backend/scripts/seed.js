const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
    // Read contract address from deployments file
    const networkName = hre.network.name;
    const deploymentPath = path.join(__dirname, `../deployments/${networkName}.json`);
    if (!fs.existsSync(deploymentPath)) {
        throw new Error('Deployment file not found. Please deploy the contract first.');
    }

    const deploymentData = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
    const REAL_ESTATE_ADDRESS = deploymentData.address;

    console.log("Using contract address from deployment:", REAL_ESTATE_ADDRESS);

    const [owner, user1, user2, user3] = await hre.ethers.getSigners();

    // Get contract instance
    const RealEstateDapp = await hre.ethers.getContractFactory("RealEstateDapp");
    const realEstate = await RealEstateDapp.attach(REAL_ESTATE_ADDRESS);

    console.log("Connected to RealEstate contract at:", realEstate.address);

    // Sample apartment data
    const apartments = [
        {
            name: "Luxury Downtown Loft",
            desc: "Modern loft in the heart of downtown with stunning city views",
            loc: "London",
            images: "ipfs://QmHash1,ipfs://QmHash2",
            rooms: 2,
            price: hre.ethers.parseEther("0.1") // 0.1 ETH per night
        },
        {
            name: "Beachfront Villa",
            desc: "Spectacular oceanfront property with private beach access",
            loc: "Goa",
            images: "ipfs://QmHash3,ipfs://QmHash4",
            rooms: 4,
            price: hre.ethers.parseEther("0.2") // 0.2 ETH per night
        },
        {
            name: "Mountain Cabin",
            desc: "Cozy cabin retreat with panoramic mountain views",
            loc: "Russia",
            images: "ipfs://QmHash5,ipfs://QmHash6",
            rooms: 3,
            price: hre.ethers.parseEther("0.15") // 0.15 ETH per night
        }
    ];

    try {
        // Create apartments
        console.log("Creating apartments...");
        for (const apt of apartments) {
            const tx = await realEstate.createApartment(
                apt.name,
                apt.desc,
                apt.loc,
                apt.images,
                apt.rooms,
                apt.price
            );
            await tx.wait();
            console.log(`Created apartment: ${apt.name}`);
        }

        // Create bookings
        console.log("\nCreating bookings...");

        // Helper function to get Unix timestamp for a future date
        const getFutureTimestamp = (daysFromNow) => {
            return Math.floor(Date.now() / 1000) + (daysFromNow * 24 * 60 * 60);
        };

        // Book apartment 1
        console.log("Booking apartment 1...");
        let checkInDate = getFutureTimestamp(7); // 7 days from now
        let checkOutDate = getFutureTimestamp(10); // 10 days from now
        let tx = await realEstate.connect(user1).bookApt(
            1, // aptId
            checkInDate,
            checkOutDate,
            2, // numGuests
            { value: hre.ethers.parseEther("0.35") } // 0.3 ETH + platform fee
        );
        await tx.wait();

        // Book apartment 2
        console.log("Booking apartment 2...");
        checkInDate = getFutureTimestamp(14);
        checkOutDate = getFutureTimestamp(21);
        tx = await realEstate.connect(user2).bookApt(
            2,
            checkInDate,
            checkOutDate,
            4,
            { value: hre.ethers.parseEther("1.5") }
        );
        await tx.wait();

        // Add reviews
        console.log("\nAdding reviews...");

        // Reviews for apartment 1
        tx = await realEstate.connect(user1).addReview(
            1,
            "Amazing location and beautiful views! Would definitely stay again.",
            5
        );
        await tx.wait();
        console.log("Added review for apartment 1");

        // Reviews for apartment 2
        tx = await realEstate.connect(user2).addReview(
            2,
            "Great beachfront property but a bit overpriced.",
            4
        );
        await tx.wait();
        console.log("Added review for apartment 2");

        // Print summary
        console.log("\nVerifying created data...");

        const apt1 = await realEstate.getApartment(1);
        const apt2 = await realEstate.getApartment(2);
        const apt3 = await realEstate.getApartment(3);

        console.log("\nCreated Apartments:");
        console.log("Apartment 1:", apt1.name);
        console.log("Apartment 2:", apt2.name);
        console.log("Apartment 3:", apt3.name);

        const apt1Reviews = await realEstate.getReviews(1);
        const apt2Reviews = await realEstate.getReviews(2);

        console.log("\nReviews Created:");
        console.log("Apartment 1 Reviews:", apt1Reviews.length);
        console.log("Apartment 2 Reviews:", apt2Reviews.length);

        console.log("\nSeed data creation completed successfully!");

    } catch (error) {
        console.error("\nError while seeding data:");
        console.error(error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });