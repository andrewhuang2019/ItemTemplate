import React from  "react";

import NFTImage from "./NFTImage.jsx";

import { ethers } from "ethers";



const LeftBar = () => {
    const [NFTs, setNFTs] = useState([])

    //Use the json file contents to print out in "Display.jsx"
    //Obtain through IPFS

    const getNFTs = async () => {

        const provider = new ethers.Web3Provider(window.ethereum);
    }

    return(
        <></>
    );
};

export default LeftBar;