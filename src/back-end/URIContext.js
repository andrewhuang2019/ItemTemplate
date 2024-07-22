import React, {createContext, useContext, useState } from 'react'

const URIContext = createContext();

export const URIProvider = ({children}) => {
    const [URI, setURI] = useState(null);
    return(
        <URIContext.Provider value={{URI, setURI}}>
        {children}
        </URIContext.Provider>
    );
}

export const useURI = () => useContext(URIContext);