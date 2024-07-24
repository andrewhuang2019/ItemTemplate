// WalletContext.js

import React, {createContext, useContext, useState } from 'react'

const WalletContext = createContext();

export const WalletProvider = ({children}) => {

    const [account, setAccount] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
        
    // Connects wallet to Ronin Saigon network.
    const connectWallet = async () => {
        setIsConnecting(true);

        if (window.ethereum){
            try{
                // sends a request to check accounts
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});

                    // if there are more than 0 accounts, then add network
                    if(accounts.length > 0){
                        await window.ethereum.request({method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: "0x7e5", 
                                    chainName: "Ronin Saigon Testnet", 
                                    nativeCurrency: {
                                        name:  "RON", 
                                        symbol: "RON", 
                                        decimals: 18,
                                    },
                                    rpcUrls: ["https://saigon-testnet.roninchain.com/rpc"],
                                    blockExplorerUrls: ["https://saigon-app.roninchain.com/"],
                                }
                                ]
                        }) 
                        
                        // if network is already added, switch to it
                        await window.ethereum.request({method: "wallet_switchEthereumChain",
                            params: [{
                                "chainId": "0x7e5" 
                            }]
                        })
                    }
                    // above statements don't do anything if user already has network and is connected to it
                
                setAccount(accounts[0]);
                setIsConnected(true);
                console.log("Connection successful: ", accounts[0]);

            } catch (error) {
                console.error('Connecting to wallet did not work');
            }
        } else {
            console.error('Please install MetaMask and try again');
        }
        setTimeout(() => {
            setIsConnecting(false);
        }, 500)
    }
    
    // returns different states to check if wallet is connected
    return(
        <WalletContext.Provider value={{account, isConnecting, isConnected, setIsConnected, connectWallet}}>
        {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);