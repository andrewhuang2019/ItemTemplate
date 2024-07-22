import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import { ChakraProvider } from '@chakra-ui/react'
import { URIProvider } from './back-end/URIContext';

const App = () => {
    return (
        <ChakraProvider>
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
        </ChakraProvider>
    )
}

export default App;