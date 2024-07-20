import React from  "react";

import NFTImage from "./NFTImage.jsx";

import { ethers } from "ethers";

const contractAddress = 'contract address here';

const contractABI = 'contractABI here';

const LeftBar = () => {
    const [NFTs, setNFTs] = useState([])

    //Use the json file contents to print out in "Display.jsx"
    //Obtain through IPFS

    const getNFTs = async () => {

        const provider = new ethers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const contract = new ethers.Contract(
            contractAddress,
            contractABI.abi,
            provider
        )

        //get total supply of NFTs created here.

        // 
    }

    return(
        <></>
    );
};

export default LeftBar;