import { 
    Button,
    Box
} from '@chakra-ui/react';

import React, {useState} from 'react';

import { ethers } from 'ethers';

import ItemNFT from '../abis/itemContractABI.json';

import { getURI } from './ItemForm.jsx';

const uri = '../data.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const Minter = () => {

    const [account, setAccount] = useState(null);
    const [minting, setMinting] = useState(false);
    const {isOnSaigonNetwork} = {};

    // Get the URI of the token from the ItemForm
    // If there is no return on the ItemForm, use the default data.json file.

    const getItemFormURI = async () => {

    }

    // Connect to MetaMask wallet
    const connectWallet = async () => {
        if (window.ethereum){
            try{
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                    if(accounts.length > 0){
                        await window.ethereum.request({method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: "0x7e5", //"0x7a69", //chain is hexadecimal
                                    chainName: "Ronin Saigon", //"Hardhat Local Network", 
                                    nativeCurrency: {
                                        name:  "RON", //"ETH",
                                        symbol: "RON", //"ETH", 
                                        decimals: 18,
                                    },
                                    rpcUrls: ["https://saigon-testnet.roninchain.com/rpc"],
                                    blockExplorerUrls: ["https://saigon-app.roninchain.com/"],
                                }
                                ]
                        }) 
                        
                        await window.ethereum.request({method: "wallet_switchEthereumChain",
                            params: [{
                                "chainId": "0x7e5" //"0x7a69" 
                            }]
                        })
                    }
                
                setAccount(accounts[0]);
                console.log("Connection successful: ", accounts[0])
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

                const tx = await contract.safeMint(account, getURI);
                await tx.wait();

                const currentToken = await contract.getTokenId();
                
                const checkURI = await contract.tokenURI(currentToken);

                console.log("NFT Minted to:", tx.address);
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