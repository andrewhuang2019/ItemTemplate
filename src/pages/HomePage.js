
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

import { ConnectMetaProvider } from '../back-end/connectMeta';

const HomePage = () => {

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

    return (
        <div className="background">
            <ConnectMetaProvider>
            <TopBar />
            <div className="main-content">
                <LeftBar />
                <div className="center">
                    
                    <h2>HomePage of UI</h2>
                    <p>This is the home page of the UI</p>

                    <Button 
                      colorScheme="blue"
                      onClick={checkMetaMaskAndNetwork}
                    >

                    </Button>
                    <Minter />
                </div>
                <RightBar />
            </div>
            </ConnectMetaProvider>
        </div>

    );
};

export default HomePage;