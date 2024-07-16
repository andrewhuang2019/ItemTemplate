import {
    Box,
    Image,
    Text
} from "@chakra-ui/react";

const NFTImage = ({src}) => {
    return(
        <Box>
            <Image
            src={src}>

            </Image>
            <Box>
                <Text>
                    Test:

                </Text>
            </Box>
        </Box>
    );
}

export default NFTImage;