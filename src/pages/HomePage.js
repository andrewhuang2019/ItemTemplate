// HomePage.js

import React from "react";
import "../assets/styles/HomePage.css"
import RightBar from "../components/RightBar"
import TopBar from "../components/TopBar";
import MainArea from "../components/MainArea";

const HomePage = () => {

    // main bars on the page are rendered
    return (
        <div className="background">
            <TopBar />
            <div className="main-content">

                <div className="center">
                    <MainArea />
                </div>
                <RightBar />
            </div>
        </div>

    );
};

export default HomePage;