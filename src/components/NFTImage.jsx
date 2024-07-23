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
    ModalCloseButton,
    Button
} from "@chakra-ui/react";

import "../assets/styles/NFTImage.css"

const NFTImage = ({name, image, description, stats, keywords, index, jsonData}) => {
    const { isOpen: isStatsOpen, onOpen: onStatsOpen, onClose: onStatsClose } = useDisclosure();
    const { isOpen: isJsonOpen, onOpen: onJsonOpen, onClose: onJsonClose } = useDisclosure();
    console.log(`Rendering this image: ${name}, ${image}, ${stats}`);

    const openJsonPage = () => {
        onJsonOpen(); 
        onStatsClose();
    }

    return(
        <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        onClick={onStatsOpen}
        >
            <Image
            src={image}
            alt={`NFT ${name}`} />

            <Box className="nft-text-box">
                <Text>
                    Name: {name}
                </Text>
                <Text>
                    Index: {index}
                </Text>
            </Box>

            <Modal isOpen={isStatsOpen} onClose={onStatsClose}>
                    <ModalContent>
                        <ModalHeader>NFT Stats:</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box overflow="auto">
                                <Text>Name: {name}</Text>

                                <Text>Description:</Text>
                                <Text>"{description}"</Text>

                                <Text>Health: {stats.health}</Text>
                                <Text>Attack: {stats.attack}</Text>
                                <Text>Defense: {stats.defense}</Text>
                                <Text>Speed: {stats.speed}</Text>

                                <Text>Keywords: {keywords}</Text>         
                            </Box>

                        </ModalBody>
                        
                        <ModalFooter>
                            <Button 
                            onClick={openJsonPage}>
                                Open Json
                            </Button>
                        </ModalFooter>
                        
                    </ModalContent>
            </Modal>

            <Modal isOpen={isJsonOpen} onClose={onJsonClose}>
                    <ModalContent>
                        <ModalHeader>Raw Json:</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody>
                            <Box overflow="auto">
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