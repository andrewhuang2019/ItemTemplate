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
    const { isOpen: isSendOpen, onOpen: onSendOpen, onClose: onSendClose } = useDisclosure(); 
    const { isConnecting, isConnected, setIsConnected, connectWallet  } = useWallet();
    const [ text, setText ] = useState('Please Connect Wallet!'); 

    useEffect(() => {

        checkMetaMaskAndNetwork()
        window.ethereum.on('chainChanged', checkMetaMaskAndNetwork);
        return () => {
            if (ethereum.removeListener) {
              ethereum.removeListener('chainChanged', checkMetaMaskAndNetwork);
        }}
    
    }, []);

    const checkMetaMaskAndNetwork = async () => {

        if(window.ethereum && window.ethereum.isMetaMask){
            const chainID = await window.ethereum.request({method: "eth_chainId"})
            if (chainID == "0x7e5"){
                console.log("On correct network")
                setIsConnected(true);
                setText('Wallet Connected!')
            } else {
                console.log("Not correct network")
                setIsConnected(false);
                setText('Please Connect Wallet!')
            }
        }

    };

    const metaDataPopup = async () => {
        checkMetaMaskAndNetwork();
        onMetadataOpen();
    }

    const sendNFTPopup = async () => {
        checkMetaMaskAndNetwork();
        onSendOpen();
    }

    const checkIsConnected = () => {

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

                <Minter id="minter"/>

                <Button 
                colorScheme='blue' 
                className='button'
                onClick={sendNFTPopup}>
                    NFT Options
                </Button>

                <Modal isOpen={isSendOpen} onClose={onSendClose}>
                        
                    <ModalOverlay />
                    
                    <ModalContent>
                        <ModalHeader>Send NFT</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <SendNFT />
                        </ModalBody>
                        
                        <ModalFooter>
                            <Button onClick={onSendClose} colorScheme="blue">
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