import React from  "react";
import "../assets/styles/MainArea.css";
import NFTImage from "./NFTImage.jsx";

import {
    Button,
    Box
} from "@chakra-ui/react";



const MainArea = () => {

    const checkMetaMaskAndNetwork = async () => {
        if(window.ethereum && window.ethereum.isMetaMask){
            const chainID = await window.ethereum.request({method: "eth_chainId"})
            if (chainID == "0x7e5"){
                console.log("On correct network")
            } else {
                console.log("Not correct network")
            }
        }
    };

    return(
        <Box>
            <Button 
            colorScheme="blue"
            onClick={checkMetaMaskAndNetwork}
            >
            Mint Item
            </Button>

            <Button
            colorScheme="blue"
            onClick={checkMetaMaskAndNetwork}>
            Mint Component
            </Button>

            <Button 
            colorScheme="blue"
            onClick={checkMetaMaskAndNetwork}
            >
            Mint Material
            </Button>
        </Box>

    );
};

export default MainArea;