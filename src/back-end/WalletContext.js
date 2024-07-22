import React, {createContext, useContext, useState } from 'react'

const WalletContext = createContext();

export const WalletProvider = ({children}) => {
    const [isConnected, setConnected] = useState(false);
    const [account, setAccount] = useState(null);
    return(
        <WalletContext.Provider value={{isConnected, setConnected}}>
        {children}
        </WalletContext.Provider>
    );
}

export const useURI = () => useContext(WalletContext);