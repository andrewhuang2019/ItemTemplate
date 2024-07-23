import React, {createContext, useContext, useState } from 'react'

const WalletContext = createContext();

export const WalletProvider = ({children}) => {

    const [account, setAccount] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
        
    // Connects wallet to Ronin Saigon network.
    const connectWallet = async () => {
        setIsConnecting(true);
        if(window.ethereum) {
            //check here to see if the wallet's chainId is the same as "0x7e5"
            setIsConnected(true);
        }

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
                setIsConnected(true);
                console.log("Connection successful: ", accounts[0])
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
    
    return(
        <WalletContext.Provider value={{account, isConnecting, isConnected, connectWallet}}>
        {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);