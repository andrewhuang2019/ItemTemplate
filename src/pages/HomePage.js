
import { 
    ChakraProvider, 
    Button
} from "@chakra-ui/react";

import React from "react";
import "../assets/styles/HomePage.css"
import LeftBar from "../components/LeftBar"
import RightBar from "../components/RightBar"
import TopBar from "../components/TopBar";
import Minter from "../components/Minter";
import MainArea from "../components/MainArea";

const HomePage = () => {



    return (
        <div className="background">
            <TopBar />
            <div className="main-content">
                <LeftBar />
                <div className="center">
                    
                    <h2>HomePage of UI</h2>
                    <p>This is the home page of the UI</p>
                    <MainArea />
                </div>
                <RightBar />
            </div>
        </div>

    );
};

export default HomePage;