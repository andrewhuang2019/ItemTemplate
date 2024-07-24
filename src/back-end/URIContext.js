// URIContext.js

import React, {createContext, useContext, useState } from 'react'

const URIContext = createContext();

// provides URI and setURI states to all files
export const URIProvider = ({children}) => {
    const [URI, setURI] = useState(null);
    return(
        <URIContext.Provider value={{URI, setURI}}>
        {children}
        </URIContext.Provider>
    );
}

export const useURI = () => useContext(URIContext);