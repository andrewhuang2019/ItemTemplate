import { 
    Button 

} from '@chakra-ui/react'

//import { deploy } from '../../scripts/deploy_item_nft';

const Minter = () => {

    const mintItem = async () => {

        console.log("Minted Item")

    }

    return(    
        <Button 
        colorScheme='blue' 
        variant='solid'
        onClick={mintItem}>
            Mint
        </Button>
    );

};

export default Minter;