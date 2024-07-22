const { ethers } = require("hardhat");

async function main() {
    const DevToken = await ethers.getContractFactory("DevToken")

    const initialOwner = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
    const devToken = await DevToken.deploy(initialOwner);
    await devToken.deployed();

    console.log("MyContract deployed to:", devToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });