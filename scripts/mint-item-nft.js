const { ethers } = require("hardhat");

async function main() {
    
    const [owner] = await ethers.getSigners();
  
    const nftcontractaddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const ItemNFT = await ethers.getContractFactory("ItemNFT")
    const itemNFT = await ItemNFT.attach(nftcontractaddress)

    const tokenId = 1;
    const tokenURI = "http://localhost:8080/token-uri-1.json";

    const transaction = await itemNFT.safeMint(owner.address, tokenId, tokenURI)
    await transaction.wait()
    console.log(`Minted NFT to: ${owner.address}`)

}

main() 
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//export default mint();