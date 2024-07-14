const { ethers } = require("hardhat");

async function main() {
    const nftcontractaddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
    const recipient = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
    const tokenURI = "";

    const ItemNFT = await ethers.getContractFactory("ItemNFT")
    const itemNFT = await ItemNFT.attach(nftcontractaddress)

    const transaction = await itemNFT.safeMint(recipient)
    await transaction.wait()
     
    console.log("Minted NFT to:" , recipient)
}

main() 
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });