import React, { useState, useEffect } from  "react";

import { 
    Button, 
    SimpleGrid,
    Box
} from '@chakra-ui/react';

import NFTImage from "./NFTImage.jsx";

import { ethers } from "ethers";

const contractAddress = 'contract address here';

const contractABI = 'contractABI here';

const LeftBar = () => {
    const [NFTs, setNFTs] = useState([]);

    //Use the json file contents to print out in "Display.jsx"
    //Obtain through IPFS

    const getNFTs = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const contract = new ethers.Contract(
            process.env.REACT_APP_CONTRACT_ADDRESS,
            contractABI.abi,
            provider
        )

        // get total supply of NFTs created here.
        const totalTokens = await contract.getTokenId();

        // for every tokenId, get the corresponding URI for that NFT
        let nfts = [];
        for (let i = 0; i < totalTokens; i++) {


            // fetch/parse the json data that was received from that URI 
            const tokenURI = contract.tokenURI(i);
            try {
                const response = await fetch(`${process.env.REACT_APP_GATEWAY_URL}/ipfs/${tokenURI}`);
                if (response.ok) {
                    const data = response.json();
                    console.log("Data retrieved from response: ", data);    

                    const tokenName = data.name;
                    const tokenStats = data.stats;
                    const tokenImage = data.image;

                    nfts.push({
                        name: tokenName,
                        image: tokenImage,
                        stats: tokenStats
                    });

                }
            } catch (error) {
                console.log("Error in getting the data from IPFS: ", error)
            }

        // Call a NFTImage and put in the different attributes for each.

        // return the list of data. 

        }

        setNFTs(nfts);

    }

    return(
        <Box>
            <Button
            onClick={getNFTs}>

            </Button>


        </Box>

    );
};

/*    
<SimpleGrid>
{NFTs.map((nft, index) =>{
    <NFTImage
    key={index}
    name={nft.name}
    image={nft.image}
    stats={nft.stats}
    index={index + 1}
    />
})}
</SimpleGrid>*/

export default LeftBar;