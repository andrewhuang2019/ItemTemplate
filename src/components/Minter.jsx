import { 
    Button,
    Box
} from '@chakra-ui/react';

import React, {useState} from 'react';

import { ethers } from 'ethers';

import ItemNFT from '../abis/itemContractABI.json';

import { useURI } from '../back-end/URIContext';
import { useWallet } from '../back-end/WalletContext';

const Minter = () => {

    const [minting, setMinting] = useState(false);
    const { URI } = useURI();
    const { account } = useWallet();

    // Get the URI of the token from the ItemForm
    // If there is no return on the ItemForm, use the default data.json file.

    // Connect to MetaMask wallet

    // Mint NFT function
    const mintNFT = async () => {
        if(!account){
            console.log('Please connect wallet')
            return;
        } else {
            try {

                // Getting an internal RPC error here. Try to fix later!

                setMinting(true);
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);

                const signer = provider.getSigner();

                console.log(process.env.REACT_APP_CONTRACT_ADDRESS);
                console.log(ItemNFT.abi);
                console.log(signer);

                const contract = new ethers.Contract(
                    process.env.REACT_APP_CONTRACT_ADDRESS,
                    ItemNFT.abi,
                    signer
                
                );

                let tokenURI = '../data.json';

                if (URI != "undefined") {
                    tokenURI = URI;
                }

                console.log(tokenURI);
                
                const currentToken = await contract.getTotalTokens();

                // this is probably not passing through 
                console.log("Minting NFT to: ", account);
                const tx = await contract.safeMint(account, tokenURI);
                await tx.wait();

                const newTokenId = currentToken.toNumber();
                
                const checkURI = await contract.tokenURI(newTokenId);

                console.log("NFT Minted to:", tx.to);
                console.log("NFT URI: ", checkURI);

            } catch (error) {
                console.log('Issue with minting the NFT: ', error);
                if (error.data) {
                    console.error('Error data:', error.data);
                }
                if (error.message) {
                    console.error('Error message:', error.message);
                }
            } finally {
                setMinting(false);
            }
        } 
    }


    return (
        <Button
            colorScheme="blue"
            onClick={mintNFT}
            className="button"
            isLoading={minting}>
            Mint Item
         </Button>
    );

};

export default Minter;