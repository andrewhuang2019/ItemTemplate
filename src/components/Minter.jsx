import { 
    Button 

} from '@chakra-ui/react';

import React, {useState} from 'react';

import { ethers } from 'ethers';

import abi from '../abis/itemContractABI.json';

const uri = '../data.json';

const contractAddress = 'YOUR_CONTRACT_ADDRESS';

const Minter = () => {

    const [account, setAccount] = useState(null);
    const [minting, setMinting] = useState(false);
    const {isOnSaigonNetwork} = {};

    // Connect to MetaMask wallet
    const connectWallet = async () => {
        if (window.ethereum){
            try{
                const accounts = await window.ethereum.request({method: 'eth_accounts'});
                setAccount(accounts[0]);
            } catch (error) {
                console.error('Connecting to wallet did not work');
            }
        } else {
            console.error('Please install MetaMask and try again');
        }
    }

    // Mint NFT function
    const mintNFT = async () => {
        if(!account){
            console.log('Please connect wallet')
            return;
        } else {
            try {
                setMinting(true);

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    contractAddress,
                    abi,
                    signer
                )

                const tx = await contract.safeMint(account, 1, uri);
                await tx.wait();

                console.log("NFT Minted to:", tx.address);

            } catch (error) {
                console.log('Issue with minting the NFT');
            } finally {
                setMinting(false);
            }
        } 
    }


    return (
        <Box>
            <Button 
            colorScheme="blue"
            onClick={connectWallet}>
            Connect Wallet
            </Button>

            <Button
            colorScheme="blue"
            onClick={mintNFT}
            >
            Mint Item
            </Button>
        </Box>

    );

};

export default Minter;