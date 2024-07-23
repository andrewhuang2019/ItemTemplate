import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import { ChakraProvider } from '@chakra-ui/react'
import { URIProvider } from './back-end/URIContext';
import { WalletProvider } from './back-end/WalletContext';
import theme from './assets/themes/theme';

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <WalletProvider>
                <URIProvider>
                    <Router>
                        <div className="App">
                            <main>
                                <Routes>
                                    <Route path="/" element={<HomePage />}/>
                                </Routes>
                            </main>
                        </div>
                    </Router>
                </URIProvider>
            </WalletProvider>
        </ChakraProvider>
    )
}

export default App;