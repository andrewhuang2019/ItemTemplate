import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
    return (
        <ChakraProvider>
            <Router>
                <div className="App">
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />}/>
                        </Routes>
                    </main>
                </div>
            </Router>
        </ChakraProvider>
    )
}
/*function App(){
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
            </header>
        </div>
    );
}*/
export default App;