import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';

const App = () => {
    return (
        <Router>
            <div className="App">
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                    </Routes>
                </main>
            </div>
        </Router>
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