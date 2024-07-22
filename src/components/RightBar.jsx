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
} from "@chakra-ui/react";

const RightBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const mintItemPopup = async () => {
        checkMetaMaskAndNetwork();
        onOpen();
    }

    return(
        <div className="right-bar-content">
            <Box>
                <Button 
                colorScheme="blue"
                onClick={mintItemPopup}
                >
                Open Metadata
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                        
                    <ModalOverlay />
                    
                    <ModalContent>
                        <ModalHeader>Change Metadata:</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <ItemForm />
                        </ModalBody>
                        
                        <ModalFooter>
                            <Button onClick={onClose} colorScheme="blue">
                                Close
                            </Button>

                        </ModalFooter>
                        
                    </ModalContent>

                </Modal>

                <Minter />
            </Box>
        </div>
    );
};

export default RightBar;