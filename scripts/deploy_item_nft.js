const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();

    const ItemNFT = await ethers.getContractFactory("ItemNFT")

    //const initialOwner = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
    const itemNFT = await ItemNFT.deploy(owner.address);
    await itemNFT.deployed();

    console.log("MyContract deployed to:", itemNFT.address);

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })

//export default deploy