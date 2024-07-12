import React from "react";
import "../assets/styles/HomePage.css"
import LeftBar from "../components/LeftBar"
import RightBar from "../components/RightBar"

const HomePage = () => {
    return (
        <div className="background">
            
            <div className="main-content">
                <LeftBar />
                <div className="home-page-title">
                    
                    <h2>HomePage of UI</h2>
                    <p>This is the home page of the UI</p>
                </div>
                <RightBar />
            </div>

        </div>

    );
};

export default HomePage;