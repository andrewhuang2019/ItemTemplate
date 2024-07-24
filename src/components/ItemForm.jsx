// ItemForm.jsx

import {
    Button,
    FormLabel,
    FormControl,
    Input,
    Textarea,
    Image,
    Box
} from '@chakra-ui/react'

import { useState, useRef } from 'react';

import { Field, Form, Formik, FieldArray } from 'formik';

import data from '../data.json'

import "../assets/styles/ItemForm.css";

import { useURI } from '../back-end/URIContext';

const ItemForm = () => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { setURI } = useURI();

    const [isLoading, setisLoading] = useState(false);

    // changes the image file contents and handles how that works.
    const handleFileChange = (event) => {
        const chosenFile = event.currentTarget.files[0];
        if (chosenFile){
            setFile(chosenFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(chosenFile);
        }
    }

    // pins the image file to IPFS via Pinata
    const pinImageToIPFS = async (file) => {

        try {
            //create form data
            const formData = new FormData();
            formData.append("file", file);

            //obtain response from the fetch call (pinning form data to ipfs)
            const response = await fetch(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
                    },
                    body: formData
                },

            );

            //if the response worked, then returns ipfs://CID
            if (response.ok){
                const responseData = await response.json();
                console.log("Image pinned successfully", responseData);

                const imageURL = `ipfs://${responseData.IpfsHash}`;
                
                return imageURL;

            } else {
                console.error("Failed to pin file", response.statusText);
            }
        } catch (error) {
            console.log("Failed to upload image to IPFS: ", error);
        }
    }

    // pins JSON file to IPFS via Pinata
    const pinJsonToIPFS = async (jsonData) => {
        try {
            
            //obtain response from the fetch call (pinning json data to ipfs)
            //renames the file "metadata" so that image appears in metamask
            const response = await fetch(
                "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                {
  
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
                        "Content-Type": "application/json",
                    },
                    body: `{"pinataOptions":{"cidVersion":1},"pinataMetadata":{"name":"metadata.json"},"pinataContent": ${JSON.stringify(jsonData)}}`
                },                
            );

            // if the response works, then return the CID for the json file. 
            if (response.ok){

                const returnedData = await response.json();
                console.log("JSON Pinned Successfully: ", returnedData);

                return returnedData.IpfsHash;

            } else {
                console.log("Failed to pin JSON: ", response.statusText);
            }

        } catch (error) {
            console.log("Failed to pin JSON data: ", error);
        }
    }

    // handles the submission of the form by getting the right data on ipfs
    const handleSubmit = async (values, actions) => {
        setisLoading(true);

        // if the file exists, then create a new file reader.
        if (file) {
            const reader = new FileReader();

            // form values are added to the data initially
            const updatedData = {
                ...data,
                name: values.name,
                description: values.description,
                stats: {
                    health: values.stats.health,
                    attack: values.stats.attack,
                    defense: values.stats.defense,
                    speed: values.stats.speed
                },
                keywords: values.keywords,
                image: ""
            };

            reader.onloadend = async () => {

                
                //Try to send the data to IPFS system and get the CID back from them. 
                try {

                    // pin image and wait to get the result. Store it in the updatedData variable
                    updatedData.image = await pinImageToIPFS(file);

                    // pin json and wait to get the result. Store it in the jsonCID variable. 
                    const jsonCID = await pinJsonToIPFS(updatedData);

                    console.log("Json data successfully pinned: ", jsonCID);

                    // set the URI to be the full link to the data using a Pinata gateway 
                    setURI(`${process.env.REACT_APP_GATEWAY_URL}/ipfs/${jsonCID}`);

                } catch (error) {
                    console.error("Error uploading to IPFS:", error);
                }

                // after 1 second, show the full json as an alert
                setTimeout(() =>{
                    alert(JSON.stringify(updatedData, null, 2))
                    actions.setSubmitting(false)
        
                    if (fileInputRef.current) {
                        fileInputRef.current.value = null;
                      }
                }, 1000);
            };

            reader.readAsDataURL(file);
        } else {
            
            // if there is no file attached, then do not change the image url, just the JSON CID
            const updatedData = {
                ...data,
                name: values.name,
                description: values.description,
                stats: {
                    health: values.stats.health,
                    attack: values.stats.attack,
                    defense: values.stats.defense,
                    speed: values.stats.speed
                },

                keywords: values.keywords,
            };

            const jsonCID = await pinJsonToIPFS(updatedData);

            setURI(`${process.env.REACT_APP_GATEWAY_URL}/ipfs/${jsonCID}`);
            
            setTimeout(() =>{
                alert(JSON.stringify(updatedData, null, 2))
                actions.setSubmitting(false)
    
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                  }
            }, 1000);

        }
        setisLoading(false);
    };

    // render the form using Formik
    return (
            <Formik
            initialValues={{...data, keywords: ['']}}
            onSubmit={handleSubmit}
            >
                {(props) => (
            <Form>
                <FormLabel>Metadata</FormLabel>
                <Field name="name">
                    {({field, form}) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel className="form-label">name</FormLabel>
                        <Input {...field } placeholder='name' size="sm"/>
                        {form.errors.name && form.touched.name && (
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        )}
                    </FormControl>)}
                </Field>

                <Field name="image">
                    {({field, form}) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel className="form-label">image file</FormLabel>
                        <Input {...field } 
                        type="file"
                        accept="image/*"
                        size="sm"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        />
                        {imagePreview && <Image src={imagePreview} alt="Image Preview"/>}
                        {form.errors.name && form.touched.name && (
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        )}
                    </FormControl>)}
                </Field>

                
                <Field name="description">
                    {({field, form}) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel className="form-label">description</FormLabel>
                        <Textarea {...field } placeholder='description' size="sm"/>
                        {form.errors.name && form.touched.name && (
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        )}
                    </FormControl>)}
                </Field>

                <Field name="stats.health">
                    {({field, form}) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel className="form-label">health</FormLabel>
                        <Input {...field } placeholder='health' size="sm"/>
                        {form.errors.name && form.touched.name && (
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        )}
                    </FormControl>)}
                </Field>

                <Field name="stats.attack">
                    {({field, form}) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel className="form-label">attack</FormLabel>
                        <Input {...field } placeholder='attack' size="sm"/>
                        {form.errors.name && form.touched.name && (
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        )}
                    </FormControl>)}
                </Field>

                
                <Field name="stats.defense">
                    {({field, form}) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel className="form-label">defense</FormLabel>
                        <Input {...field } placeholder='defense' size="sm"/>
                        {form.errors.name && form.touched.name && (
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        )}
                    </FormControl>)}
                </Field>

                
                <Field name="stats.speed">
                    {({field, form}) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel className="form-label">speed</FormLabel>
                        <Input {...field } placeholder='speed' size="sm"/>
                        {form.errors.name && form.touched.name && (
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        )}
                    </FormControl>)}
                </Field>

                {/*
                Added dynamic form inputs using FieldArray
                This allows for keywords to be added/removed
                */}

                <FieldArray name="keywords">
                    {({push, remove, form}) => (
                        
                        <Box>
                            <FormLabel>Keywords</FormLabel>

                            {form.values.keywords.map((keyword, index) => (
                                <Box key={index}>
                                    <FormLabel>Keyword {index}</FormLabel>
                                    <Field name={`keywords[${index}]`}>
                                        {({ field }) => (
                                            <Input 
                                            {...field} 
                                            placeholder='keyword' 
                                            size="sm" 
                                            mb={2} />
                                        )}
                                    </Field>
                                    <Button
                                    onClick={() => remove(index)}>
                                        Remove Keyword
                                    </Button>
                                </Box>
                            ))}

                            <Button
                            onClick={() => push('')}>
                                Add Keyword
                            </Button>


                        </Box>
                    )}

                </FieldArray>


            <Button isLoading={isLoading} type='submit' >
                    Submit Metadata
            </Button>  
        </Form>
        )}

        </Formik>

    );
}

export default ItemForm;