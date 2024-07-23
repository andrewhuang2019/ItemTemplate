import React, {useEffect} from  "react";
import "../assets/styles/RightBar.css"
import ItemForm from "./ItemForm.jsx";
import Minter from "./Minter.jsx";

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
    const { isConnecting, connectWallet } = useWallet();

    useEffect(() => {
        checkMetaMaskAndNetwork()
    }, []);

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

    const metaDataPopup = async () => {
        checkMetaMaskAndNetwork();
        onMetadataOpen();
    }

    const sendNFTPopup = async () => {
        onSendOpen();
    }

    return(
        <div className="right-bar-content">
            <Box className="button-container">
                <Text>
                    Wallet Not Connected!
                </Text>

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
                    Send NFT
                </Button>

                <Modal isOpen={isSendOpen} onClose={onSendClose}>
                        
                    <ModalOverlay />
                    
                    <ModalContent>
                        <ModalHeader>Send NFT</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
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