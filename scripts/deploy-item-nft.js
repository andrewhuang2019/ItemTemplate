const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();

    const ItemNFT = await ethers.getContractFactory("ItemNFT")

    const itemNFT = await ItemNFT.deploy(owner.address);
    await itemNFT.deployed();

    console.log("ItemNFTContract deployed to:", itemNFT.address);

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })

//export default deploy