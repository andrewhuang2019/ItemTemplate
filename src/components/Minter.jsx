// Minter.jsx

import { 
    Button
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

    // Mint NFT function
    const mintNFT = async () => {
        if(!account){
            console.log('Please connect wallet')
            return;
        } else {
            try {

                setMinting(true);

                // gets the provider and contract through its address, abi, and signer
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

                // if there is no tokenURI, then use a default one
                let tokenURI = '../data.json';

                if (URI != "undefined") {
                    tokenURI = URI;
                }

                console.log(tokenURI);
                
                const currentToken = await contract.getTotalTokens();

                // use contract's safeMint function to mint URI to the account with the URI value
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

    // renders button component
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