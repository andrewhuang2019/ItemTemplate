import { 
    Button,
    Box
} from '@chakra-ui/react';

import React, {useState} from 'react';

import { ethers } from 'ethers';

import ItemNFT from '../abis/itemContractABI.json';

const uri = '../data.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const Minter = () => {

    const [account, setAccount] = useState(null);
    const [minting, setMinting] = useState(false);
    const {isOnSaigonNetwork} = {};

    // Connect to MetaMask wallet
    const connectWallet = async () => {
        if (window.ethereum){
            try{
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                    if(accounts.length > 0){
                        await window.ethereum.request({method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: "0x7a69", //"0x7e5", //chain is hexadecimal
                                    chainName: "Hardhat Local Network", // "Ronin Saigon",
                                    nativeCurrency: {
                                        name: "ETH", //"RON",
                                        symbol: "ETH", //"RON",
                                        decimals: 18,
                                    },
                                    rpcUrls: ["http://127.0.0.1:8545/"]//["https://saigon-testnet.roninchain.com/rpc"],
                                    //blockExplorerUrls: ["https://saigon-app.roninchain.com/"],
                                }
                                ]
                        }) 
                        
                        await window.ethereum.request({method: "wallet_switchEthereumChain",
                            params: [{
                                "chainId": "0x7a69" //"0x7e5"
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
                const contract = new ethers.Contract(
                    contractAddress,
                    ItemNFT.abi,
                    signer
                
                );

                const tx = await contract.safeMint(account, 1, uri);
                await tx.wait();

                console.log("NFT Minted to:", tx.address);

            } catch (error) {
                console.log('Issue with minting the NFT: ', error);
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