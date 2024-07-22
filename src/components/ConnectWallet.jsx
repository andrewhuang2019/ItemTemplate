
import { ethers } from 'ethers';

import { useURI } from '../back-end/URIContext';

const ConnectWallet = () => {

    // Connects wallet to Ronin Saigon network.
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


}