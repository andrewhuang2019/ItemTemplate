import {
    Button,
    FormLabel,
    FormControl,
    Input,
    Textarea,
    Image
} from '@chakra-ui/react'

import { useState, useRef } from 'react';

import { Field, Form, Formik } from 'formik';

import data from '../data.json'

import "../assets/styles/ItemForm.css";

const ItemForm = () => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

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

    const handleSubmit = async (values, actions) => {
        if (file) {
            const reader = new FileReader();

            reader.onloadend = async () => {

                
                //Try to send the data to IPFS system and get the CID back from them. 
                try {
                    const formData = new FormData();
                    formData.append("file", file);
    
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

                    if (response.ok){
                        const responseData = await response.json();
                        console.log("File pinned successfully", responseData);

                        //updates updatedData image to be the IPFS one
                        updatedData.image = `ipfs://${responseData.IpfsHash}`;

                        // now i need to get the updated data and pin it to the website as well.
                        // save the resulting url and pass that in as the minting uri 
                        // upload the image to ipfs
                        // store the image's url link in the json file
                        // upload the json file to ipfs
                        // fetch the json file

                        // get the src of the image from the json file and pass that into gallery or smth. <- do in the gallery section


                    } else {
                        console.error("Failed to pin file", response.statusText);
                    }

                } catch (error) {
                    console.error("Error uploading to IPFS:", error);
                }


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
            
            const updatedData = {
                ...data,
                name: values.name,
                stats: {
                    health: values.stats.health,
                    attack: values.stats.attack,
                    defense: values.stats.defense,
                    speed: values.stats.speed
                },
            };

            
            setTimeout(() =>{
                alert(JSON.stringify(updatedData, null, 2))
                actions.setSubmitting(false)
    
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                  }
            }, 1000);

        }

    };

    return (
            <Formik
            initialValues={data}
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

                <Field name="image.src">
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


            <Button type='submit' isLoading={props.isSubmitting}>
                    Submit Metadata
            </Button>  
        </Form>
        )}
        </Formik>
    );
}

export default ItemForm;