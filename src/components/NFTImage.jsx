// NFTImage.jsx

import {
    Box,
    Image,
    Text,
    useDisclosure, 
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from "@chakra-ui/react";

import "../assets/styles/NFTImage.css"

const NFTImage = ({name, image, description, stats, keywords, jsonData, index}) => {
    const { isOpen: isStatsOpen, onOpen: onStatsOpen, onClose: onStatsClose } = useDisclosure();
    const { isOpen: isJsonOpen, onOpen: onJsonOpen, onClose: onJsonClose } = useDisclosure();

    // closes stats page and opens json page
    const openJsonPage = () => {
        onJsonOpen(); 
        onStatsClose();
        console.log(keywords);
    }

    // renders each NFT card
    return(

            <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            onClick={onStatsOpen}
            width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }} // Responsive width
            height={{ base: "auto", sm: "100%", md: "100%", lg: "100%" }} // Responsive height
            marginLeft={0}
            marginRight={0}
            >
                {/*Creates image, with an alternative if the image is missing*/}
                <Image
                src={image.replace("ipfs://", `${process.env.REACT_APP_GATEWAY_URL}/ipfs/`)}
                alt={`Missing Image For: ${name}`} 
                fallbackSrc='https://via.placeholder.com/150'/>

                <Box className="nft-text-box">
                    <Text className="nft-text">
                        Name: {name}
                    </Text>
                    <Text className="nft-text">
                        TokenID: {index}
                    </Text>
                </Box>

                {/*Prints out list of stats*/}
                <Modal isOpen={isStatsOpen} onClose={onStatsClose}>
                        <ModalContent>
                            <ModalHeader>NFT Stats:</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box overflow="auto">
                                    <Text className="bolded-text">Name: </Text> 
                                    <Text>{name}</Text> 

                                    <Text className="bolded-text">Description:</Text>
                                    <Text>"{description}"</Text>

                                    <Text className="bolded-text">Stats:</Text>
                                    <Text>Health: {stats.health}</Text>
                                    <Text>Attack: {stats.attack}</Text>
                                    <Text>Defense: {stats.defense}</Text>
                                    <Text>Speed: {stats.speed}</Text>

                                    <Text className="bolded-text">Keywords: </Text>
                                    {keywords.length > 0 ? (
                                        keywords.map((keyword, index) => (
                                            <Text key={index}>{keyword}</Text>
                                        ))
                                    ) : (
                                        <Text>No Keywords In Item</Text>
                                    )}
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

                {/*Prints out raw json file*/}
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