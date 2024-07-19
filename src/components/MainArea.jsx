import React from  "react";
import "../assets/styles/MainArea.css";
import NFTImage from "./NFTImage.jsx";
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
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
} from "@chakra-ui/react";

import { Field, Form, Formik } from 'formik';



const MainArea = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const mintItem = async (values) => {
        onClose();
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resolve()
            }, 3000)
        }

        )
    }

    return(
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

            <Button 
            colorScheme="blue"
            onClick={mintItemPopup}
            >
                Mint Item
            </Button>

            <Minter />

        </Box>

    );
};
/*
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
*/

export default MainArea;