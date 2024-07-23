import React, { useState, useEffect } from  "react";

import { 
    Button, 
    SimpleGrid,
    Box
} from '@chakra-ui/react';

import NFTImage from "./NFTImage.jsx";

import { ethers } from "ethers";

import ItemNFT from '../abis/itemContractABI.json';

import "../assets/styles/MainArea.css";

const Display = () => {
    const [NFTs, setNFTs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //Use the json file contents to print out in "Display.jsx"
    //Obtain through IPFS

    const getNFTs = async () => {
        setIsLoading(true);
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
                        const tokenDescription = data.description;
                        const tokenImage = data.image;
                        const tokenKeywords = data.keywords || [];

                        //Has issues pushing the keywords to the class
                        nfts.push({
                            name: tokenName,
                            image: tokenImage,
                            description: tokenDescription,
                            stats: tokenStats,
                            keywords: tokenKeywords,
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
        setTimeout(() => {        
            setIsLoading(false);
        }, 500);

    }

    return(
        <Box id="main-area-box">
            <Button
            colorScheme="blue"
            onClick={getNFTs}
            className="button"
            id="load-button"
            isLoading={isLoading}>
            Load NFTs
            </Button>

            <Box>
                <SimpleGrid columns={3} spacing={4}>
                    {NFTs.map((nft, index) =>{
                        return(
                            <NFTImage
                            key={index}
                            name={nft.name}
                            image={nft.image}
                            description={nft.description}
                            stats={nft.stats}
                            keywords={nft.keywords}
                            index={index+1}
                            jsonData={nft.jsonData}
                            />
                        );
                    })}
                </SimpleGrid>
            </Box>

        </Box>

    );
};



export default Display;