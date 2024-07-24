// SendNFT.jsx

import { useState } from 'react';

import {
    Box,
    Input,
    FormLabel, 
    Button,
    FormControl
} from '@chakra-ui/react';

import { useWallet } from '../back-end/WalletContext';

import { Field, Form, Formik } from 'formik';

import { ethers } from 'ethers';

import ItemNFT from '../abis/itemContractABI.json';

const SendNFT = () => {

    const [loadObtain, setLoadObtain] = useState(false);
    const [loadSend, setLoadSend] = useState(false);
    const [recipient, setRecipient] = useState(null);

    const { account } = useWallet();

    // handles form submission for obtaining an NFT
    const obtainNFT = async (values) => {
        setLoadObtain(true);

        // requests to obtain an asset which the user owns
        if (account) {
            try {
                const wasAdded = await window.ethereum.request({
                    method: "wallet_watchAsset",
                params: {
                    type: "ERC721",
                    options: {
                        address: process.env.REACT_APP_CONTRACT_ADDRESS,
                        tokenId: values.obtain.toString()
                    }
                }})

                if (wasAdded){
                    console.log("NFT added to Metamask!");
                }
            } catch (error) {
                console.log("Error in obtaining the NFT: ", error);
            }


        }
        setLoadObtain(false);
    }

    // sends an NFT to another wallet address
    const sendNFT = async (values) => {
        setLoadSend(true);

        // creates instance of contract, and then transfers ownership of NFT
        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();

            const from = await signer.getAddress();
            const contract = new ethers.Contract(
                process.env.REACT_APP_CONTRACT_ADDRESS,
                ItemNFT.abi,
                signer
            )

            // performs transaction to send here
            const transaction = await contract.transferFrom(from, values.recipient, values.tokenId)
            await transaction.wait();
            console.log("NFT Sent Successfully")
            setRecipient(values.recipient)

        } catch (error) {
            console.log("Error in sending the NFT: ", error);
        }


        setLoadSend(false);
    }

    return(
        <Box>

            {/* First form for obtaining an NFT*/}
            <Formik
            initialValues={{obtain: ""}}
            onSubmit={obtainNFT}>

                <Form>
                
                    <Field name="obtain">
                        {({field, form}) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>

                            <FormLabel className="form-label">Obtain NFT by tokenID: </FormLabel>
                            <Input {...field } type="number" placeholder='tokenID' size="sm"/>

                            {form.errors.name && form.touched.name && (
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            )}
                        </FormControl>)}

                    </Field>

                    <Button type="submit"
                    isLoading={loadObtain}>
                        Obtain NFT
                    </Button>
                
                </Form>
            
            </Formik>

            {/* Second form for sending an NFT*/}
            <Formik
            initialValues={{recipient:"", tokenId: ''}}
            onSubmit={sendNFT}>

                <Form>
                
                    <Field name="recipient">
                        {({field, form}) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>

                            <FormLabel mt={10} className="form-label">Send NFT by tokenID: </FormLabel>
                            <Input {...field } placeholder='recipient' size="sm"/>

                            {form.errors.name && form.touched.name && (
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            )}
                        </FormControl>)}
                        
                    </Field>

                    <Field name="tokenId">
                        {({field, form}) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>

                            <Input {...field } placeholder='tokenID' size="sm"/>

                            {form.errors.name && form.touched.name && (
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            )}
                        </FormControl>)}
                        
                    </Field>

                    <Button type="submit"
                    isLoading={loadSend}>
                        Send NFT
                    </Button>
                
                </Form>
            
            </Formik>

        </Box>
    );
    
}

export default SendNFT;