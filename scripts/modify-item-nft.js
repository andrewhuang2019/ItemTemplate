//const { ethers } = require('ethers');
const { ethers } = require("hardhat");

// Connect to blockchain
//const provider = new ethers.providers.JsonRpcProvider('');

// Private key of account to modify data
//const privateKey = 'Private key';
//const wallet = new ethers.Wallet(privateKey, provider);

//const contractAddress = 'Contract Address';
//const contractABI = [];

//const contract = new ethers.Contract(contractAddress, contractABI, wallet);


async function main() {

    const [owner] = await ethers.getSigners();

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const ItemNFT = await ethers.getContractFactory("ItemNFT");

    const itemNFT = await ItemNFT.attach(contractAddress);

    const tokenId = 1;

    try {
      const uri = await itemNFT.tokenURI(tokenId);
      console.log(`Token URI for token ID ${tokenId}: ${uri}`);
    } catch (error) {
      console.log("Error fetching the token URI: ", error);
    }

    const newTokenURI = "http://localhost:8080/token-uri-2.json";

    try {
      await itemNFT.setTokenURI(tokenId, newTokenURI);
      const uri = await itemNFT.tokenURI(tokenId);
      console.log(`Token URI for token ID ${tokenId}: ${uri}`);
    } catch (error) {
      console.log("Error fetching the token URI: ", error);
    }

    /*
    const nftcontractaddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

    const tokenId = 1;

    const newURI = "http://localhost:8080/token-uri-2.json"

    const ItemNFT = await ethers.getContractFactory("ItemNFT");
    const itemNFT = await ItemNFT.attach(nftcontractaddress);

    const currentURI = await itemNFT.tokenURI(tokenId);
    console.log(`Current URI: ${currentURI}`);

    const tx = await itemNFT.setTokenURI(tokenId, newURI);
    console.log(`Transaction sent:`, tx.hash);

    await tx.wait();
    console.log('Transaction confirmed');

    const updatedURI = await contract.tokenURI(tokenId);
    console.log(`Updated URI: ${updatedURI}`);

    */
}

main() 
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });