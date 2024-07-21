import {
    Box,
    Image,
    Text
} from "@chakra-ui/react";

const NFTImage = ({name, image, stats}) => {
    return(
        <Box>
            <Image
            src={image}>

            </Image>
            <Box>
                <Text>
                    Name: {name}
                    Stats: {stats}

                </Text>
            </Box>
        </Box>
    );
}

export default NFTImage;