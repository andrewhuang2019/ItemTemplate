import { 
    Button,
    Box
} from '@chakra-ui/react';

import React, {useState} from 'react';

import { ethers } from 'ethers';

import abi from '../abis/itemContractABI.json';

const uri = '../data.json';

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

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
                                    chainId: "0x7e5", //chain is hexadecimal
                                    chainName: "Ronin Saigon",
                                    nativeCurrency: {
                                        name:"RON",
                                        symbol: "RON",
                                        decimals: 18,
                                    },
                                    rpcUrls: ["https://saigon-testnet.roninchain.com/rpc"],
                                    blockExplorerUrls: ["https://saigon-app.roninchain.com/"],
                                }
                                ]
                        }) 
                        
                        await window.ethereum.request({method: "wallet_switchEthereumChain",
                            params: [{
                                "chainId": "0x7e5"
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
                setMinting(true);
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract({
                    contractAddress,
                    abi,
                    signer
                }
                )

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