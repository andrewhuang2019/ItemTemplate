const { ethers } = require('ethers');

// Connect to blockchain
const provider = new ethers.providers.JsonRpcProvider('');

// Private key of account to modify data
const privateKey = 'Private key';
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = 'Contract Address';
const contractABI = [];

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function main(tokenId, newURI) {

    const currentURI = await contract.tokenURI(tokenId);
    console.log(`Current URI: ${contractURI}`)

    // Modify the NFT data
    const tx = await contract.setTokenURI(tokenId, newURI);
    console.log(`Transaction sent:`, tx.hash);

    await tx.wait();
    console.log('Transaction confirmed');

    const updatedURI = await contract.tokenURI(tokenId);
    console.log(`Updated URI: ${updatedURI}`);

}


main() 
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });