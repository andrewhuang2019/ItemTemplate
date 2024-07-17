// src/back-end/connectMeta.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const ConnectMetaContext = createContext();

export const ConnectMetaProvider = ({children}) => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [currentChainId, setCurrentChainId] = useState(null);

    const [currentAccount, setCurrentAccount] = useState(null);
    const [currentNetwork, setCurrentNetwork] = useState(null);

    const desiredNetworkId = '0x7e5'; //try 2021 if it doesn't work

    useEffect(() => { 
        const checkMetaMask = () => {
            if (typeof window.ethereum != 'undefined'){
                setIsMetaMaskInstalled(true);
                
                window.ethereum.request({ method: 'eth_accounts' })
                    .then(accounts => {
                        if(accounts.length > 0){
                            setIsWalletConnected(true);
                            setCurrentAccount(accounts[0]);

                            window.ethereum.request({method : 'net_version'})
                                .then( networkId => {
                                    setCurrentNetwork(networkId);
                                    if (networkId != desiredNetworkId){
                                        console.error('Please connect to the correct network.')
                                    }
                                });
                        } else {
                            setIsWalletConnected(false);
                        }
                    });
        
            } else {
                setIsMetaMaskInstalled(false);
                console.error('No Ethereum provider found.')
                return null;
            }
        }


        checkMetaMask();
    }, [window.ethereum, desiredNetworkId]);

    const connectWallet = async () => {
        if(isMetaMaskInstalled){
            try {
                await window.ethereum.request({method: "eth_requestAccounts"})
                setIsWalletConnected(true);
            } catch (error) {
                console.error("Connection to Metamask Not Working")
            }
        }
    }

    const addSaigonNetwork = async () => {
        try {
            await window.ethereum.request({method: "eth_requestAccounts"});

            await window.ethereum.request(
                {method: "wallet_addEthereumChain",
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
                            blockExploreUrls: ["https://saigon-app.roninchain.com/"],
                        },
                    ],
                });

                const chainId = await window.ethereum.request({method: "eth_chainId"});
                setCurrentChainId(chainId)

        } catch (error){
            console.error("Cannot connect to the Ronin Saigon network", error);
        }   
    }

    return (
        <ConnectMetaContext.Provider
            value={{
                isMetaMaskInstalled,
                isConnected: isWalletConnected,
                currentAccount,
                currentNetwork,
                desiredNetworkId,
                connectWallet,
                addSaigonNetwork
            }}
        >
            {children}
        </ConnectMetaContext.Provider>
    );
    
};

export function useConnectMetaMask() {
    return useContext(ConnectMetaContext)
}