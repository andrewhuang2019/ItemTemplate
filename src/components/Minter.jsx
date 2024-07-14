import { 
    Button 

} from '@chakra-ui/react'

//import { deploy } from '../../scripts/deploy_item_nft';

const Minter = () => {

    const mintItem = async () => {



    }

    return(    
        <Button 
        colorScheme='blue' 
        variant='solid'
        LoadingText='Minting'
        onClick={mintItem}>
            Mint
        </Button>
    );

};

export default Minter;