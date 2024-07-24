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

const SendNFT = () => {

    const [obtainTokenId, setObtainTokenId] = useState(null);
    const [recipient, setRecipient] = useState(null);
    const [sendTokenId, setSendTokenId] = useState(null);

    const { account } = useWallet();

    const obtainNFT = async (values) => {
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
    
            } catch (error) {
                console.log("Error in obtaining the NFT: ", error);
            }
            if (wasAdded){
                console.log("NFT added to Metamask!");
            }
        }
    }

    const sendNFT = (values, actions) => {

    }

    return(
        <Box>

            <Formik
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

                    <Button type="submit">
                        Obtain NFT
                    </Button>
                
                </Form>
            
            </Formik>


                <Formik
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

                        <Button type="submit">
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