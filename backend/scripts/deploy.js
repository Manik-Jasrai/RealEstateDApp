// scripts/deploy.js
const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function saveDeploymentInfo(contractAddress, networkName) {
    // Create deployments directory if it doesn't exist
    const deploymentsDir = path.join(__dirname, '../deployments');
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir);
    }

    // Save address and network info
    const deploymentInfo = {
        address: contractAddress,
        network: networkName,
        timestamp: new Date().toISOString()
    };

    // Write to network-specific file
    const filePath = path.join(deploymentsDir, `${networkName}.json`);
    fs.writeFileSync(
        filePath,
        JSON.stringify(deploymentInfo, null, 2)
    );

    console.log(`Deployment info saved to: ${filePath}`);
}

async function main() {
    // Get the network name
    const networkName = hre.network.name;

    // Get the contract factory
    const ContractFactory = await hre.ethers.getContractFactory("RealEstateDapp");

    // Deploy the contract
    const contract = await ContractFactory.deploy(5);

    // Wait for deployment to finish
    await contract.waitForDeployment();

    const contractAddress = await contract.getAddress();
    console.log("Contract deployed to:", contractAddress);

    // Save deployment information
    await saveDeploymentInfo(contractAddress, networkName);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });