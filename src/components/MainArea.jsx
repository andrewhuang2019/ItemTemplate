import React from  "react";
import "../assets/styles/MainArea.css";
import NFTImage from "./NFTImage.jsx";
import ItemForm from "./ItemForm.jsx";
import Minter from "./Minter.jsx";
import Display from "./Display.jsx";

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

const MainArea = () => {


    return(
        <Display />
    );
};

export default MainArea;