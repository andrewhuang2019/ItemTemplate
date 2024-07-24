// RightBar.jsx

import React, {useEffect, useState} from  "react";
import "../assets/styles/RightBar.css"
import ItemForm from "./ItemForm.jsx";
import Minter from "./Minter.jsx";
import SendNFT from "./SendNFT.jsx";

import {
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text
} from "@chakra-ui/react";

import { useWallet } from '../back-end/WalletContext';

const RightBar = () => {
    const { isOpen: isMetadataOpen, onOpen: onMetadataOpen, onClose: onMetadataClose } = useDisclosure();
    const { isOpen: isOptionsOpen, onOpen: onOptionsOpen, onClose: onOptionsClose } = useDisclosure(); 
    const { account, isConnecting, isConnected, setIsConnected, connectWallet  } = useWallet();
    const [ text, setText ] = useState('Please Connect Wallet!'); 

    // checks Metamask when site is loaded in
    // sets up a listener to check when the network changes
    useEffect(() => {

        checkMetaMaskAndNetwork()
        window.ethereum.on('chainChanged', checkMetaMaskAndNetwork);
        return () => {
            if (ethereum.removeListener) {
              ethereum.removeListener('chainChanged', checkMetaMaskAndNetwork);
        }}
    
    }, [account, isConnected]);

    // checks to see if the user is connected to the Saigon network
    const checkMetaMaskAndNetwork = async () => {

        if(window.ethereum && window.ethereum.isMetaMask){
            const chainID = await window.ethereum.request({method: "eth_chainId"})
            if (chainID == "0x7e5"){
                console.log("On correct network");
                setIsConnected(true);
                setText(account ? 'Wallet Connected!' : 'Please Connect Wallet!');
            } else {
                console.log("Not correct network");
                setIsConnected(false);
                setText('Please Connect Wallet!');
            }
        }

    };

    // checks the network and then opens the Metadata modal
    const metaDataPopup = async () => {
        checkMetaMaskAndNetwork();
        onMetadataOpen();
    }

    // checks the network and then opens the options modal
    const optionsNFTPopup = async () => {
        checkMetaMaskAndNetwork();
        onOptionsOpen();
    }

    return(
        <div className="right-bar-content">
            <Box className="button-container">
                <Text>{text}</Text>

                <Button 
                colorScheme="blue"
                onClick={connectWallet}
                className="button"
                isLoading={isConnecting}>
                Connect Wallet
                </Button>

                {/*Button opens the modal below which users can change metadata with*/}
                <Button 
                colorScheme="blue"
                onClick={metaDataPopup}
                className="button"
                >
                Open Metadata
                </Button>

                <Modal isOpen={isMetadataOpen} onClose={onMetadataClose}>
                        
                    <ModalOverlay />
                    
                    <ModalContent>
                        <ModalHeader>Change Metadata:</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <ItemForm />
                        </ModalBody>
                        
                        <ModalFooter>
                            <Button onClick={onMetadataClose} colorScheme="blue">
                                Close
                            </Button>

                        </ModalFooter>
                        
                    </ModalContent>

                </Modal>

                {/*Minter including the button*/}
                <Minter id="minter"/>

                {/*Button opens the modal below which users can use different NFT options*/}
                <Button 
                colorScheme='blue' 
                className='button'
                onClick={optionsNFTPopup}>
                    NFT Options
                </Button>

                <Modal isOpen={isOptionsOpen} onClose={onOptionsClose}>
                        
                    <ModalOverlay />
                    
                    <ModalContent>
                        <ModalHeader>Send NFT</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <SendNFT />
                        </ModalBody>
                        
                        <ModalFooter>
                            <Button onClick={onOptionsClose} colorScheme="blue">
                                Close
                            </Button>

                        </ModalFooter>
                        
                    </ModalContent>

                </Modal>
            </Box>
        </div>
    );
};

export default RightBar;