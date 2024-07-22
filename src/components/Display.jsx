import React, { useState, useEffect } from  "react";

import { 
    Button, 
    SimpleGrid,
    Box
} from '@chakra-ui/react';

import NFTImage from "./NFTImage.jsx";

import { ethers } from "ethers";

import ItemNFT from '../abis/itemContractABI.json';

const Display = () => {
    const [NFTs, setNFTs] = useState([]);

    //Use the json file contents to print out in "Display.jsx"
    //Obtain through IPFS
    useEffect(() => {
        getNFTs();
    }, []); 

    const getNFTs = async () => {
        try {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const contract = new ethers.Contract(
            process.env.REACT_APP_CONTRACT_ADDRESS,
            ItemNFT.abi,
            provider
        )

        // get total supply of NFTs created here.
        const totalTokens = await contract.getTotalTokens();

        // for every tokenId, get the corresponding URI for that NFT
        let nfts = [];
        for (let i = 1; i < totalTokens.toNumber(); i++) {
            try {
                // fetch/parse the json data that was received from that URI 
                const tokenURI = await contract.tokenURI(i);
                const response = await fetch(tokenURI);

                if (response.ok) {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")){
                        const data = await response.json();
                        console.log("Data retrieved from response: ", data);    
    
                        const tokenName = data.name;
                        const tokenStats = data.stats;
                        const tokenImage = data.image;
    
                        nfts.push({
                            name: tokenName,
                            image: tokenImage,
                            stats: tokenStats,
                            jsonData: data
                        });
                    } else {
                        console.error(`Expected JSON response, got ${contentType}`)
                    }

                } else {
                    console.error(`Error fetching tokenURI: ${response.statusText}`)
                }

            } catch (error) {
                console.log(`Error in getting the data from token ${i} from IPFS: `, error)
            }

        // Call a NFTImage and put in the different attributes for each.

        // return the list of data. 

        }

        setNFTs(nfts);

        } catch (error) {
            console.log("Error in retrieving NFTs: ", error);
        }
    }

    return(
        <Box position="relative">
            <Button
            colorScheme="blue"
            onClick={getNFTs}>
            Load NFTs
            </Button>

            <SimpleGrid columns={3} spacing={4}>
                {NFTs.map((nft, index) =>{
                    return(
                        <NFTImage
                        key={index}
                        name={nft.name}
                        image={nft.image}
                        stats={nft.stats}
                        index={index+1}
                        jsonData={nft.jsonData}
                        />
                    );
                })}
            </SimpleGrid>
        </Box>

    );
};



export default Display;