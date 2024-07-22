import {
    Box,
    Image,
    Text,
    useDisclosure, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from "@chakra-ui/react";

import "../assets/styles/NFTImage.css"

const NFTImage = ({name, image, stats, index, jsonData}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(`Rendering this image: ${name}, ${image}, ${stats}`);

    return(
        <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        onClick={onOpen}>
            <Image
            src={image}
            alt={`NFT ${name}`} />

            <Box>
                <Text>
                    Name: {name}
                </Text>
                <Text>
                    Index: {index}
                </Text>
                <Text mt="2">
                    Stats: 
                    <Text>Health: {stats.health}</Text>
                    <Text>Attack: {stats.attack}</Text>
                    <Text>Defense: {stats.defense}</Text>
                    <Text>Speed: {stats.speed}</Text>
                </Text>
            </Box>


            <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                        <ModalHeader>NFT Data:</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody>
                            <Box overflow="auto">
                            <Text>Raw Json:</Text>
                                <pre>{JSON.stringify(jsonData, null, 2)}</pre>                      
                            </Box>

                        </ModalBody>
                        
                        <ModalFooter>

                        </ModalFooter>
                        
                    </ModalContent>
            </Modal>
        </Box>
    );
}

export default NFTImage;