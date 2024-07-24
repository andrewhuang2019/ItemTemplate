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

const recipient = "0x50d96e6258b432292c1D803f03974D698677211E";

const SendNFT = () => {

    const [obtainTokenId, setObtainTokenId] = useState(null);
    const [loadObtain, setLoadObtain] = useState(false);
    const [loadSend, setLoadSend] = useState(false);
    const [recipient, setRecipient] = useState(null);
    const [sendTokenId, setSendTokenId] = useState(null);

    const { account } = useWallet();

    const obtainNFT = async (values) => {
        setLoadObtain(true);
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

    const sendNFT = async (values) => {
        setLoadSend(true);

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

            <Formik
            initialValues={{obtain: ""}}
            onSubmit={obtainNFT}>

                <Form>
                
                    <Field name="obtain">
                        {({field, form}) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>

                            <FormLabel className="form-label">Obtain NFT by tokenId (index): </FormLabel>
                            <Input {...field } type="number" placeholder='tokenId' size="sm"/>

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


                <Formik
                initialValues={{recipient:"", tokenId: ''}}
                onSubmit={sendNFT}>

                    <Form>
                    
                        <Field name="recipient">
                            {({field, form}) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>

                                <FormLabel mt={10} className="form-label">Obtain NFT by tokenId (index): </FormLabel>
                                <Input {...field } placeholder='recipient' size="sm"/>

                                {form.errors.name && form.touched.name && (
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                )}
                            </FormControl>)}
                            
                        </Field>

                        <Field name="tokenId">
                            {({field, form}) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>

                                <Input {...field } placeholder='tokenId' size="sm"/>

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
            {/*
            <Formik
            onSubmit={sendNFT}>
                <Form>

                    <FormLabel mt={10}>Send NFT to user: </FormLabel>

                    <Input placeholder="recipient address"/>
                    <Input placeholder="token ID number"/>

                    <Button
                    onClick={sendNFT}>
                        Send NFT
                    </Button>

                </Form>
            </Formik>*/}

        </Box>
    );
    
}

export default SendNFT;

/*
            <Formik
            onSubmit={obtainNFT}>
                {(props) => (
                    <Form>
                        <Field name="obtain">

                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>

                                    <FormLabel>Obtain NFT by tokenId (index): </FormLabel>

                                    <Input {...field } type="number" placeholder='token ID number' size="sm"/>

                                    {form.errors.name && form.touched.name && (
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    )}
                                </FormControl>)}

                            <Button
                            type="submit"
                            isLoading={props.isSubmitting}>
                                Obtain NFT
                            </Button>

                        </Field>

                    </Form>
                )}

            </Formik> 
            */