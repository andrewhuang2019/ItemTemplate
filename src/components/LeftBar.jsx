import React from  "react";
import "../assets/styles/LeftBar.css";
import NFTImage from "./NFTImage.jsx";
import Display from "./Display.jsx";



const LeftBar = () => {

    return(
        <div className="left-bar-content">
            <Display />
        </div>
    );
};

export default LeftBar;