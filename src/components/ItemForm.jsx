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
            reader.onloadend = () => {
                const base64Image = reader.result;

                const updatedData = {
                    ...data,
                    name: values.name,
                    stats: {
                        health: values.stats.health,
                        attack: values.stats.attack,
                        defense: values.stats.defense,
                        speed: values.stats.speed
                    },

                    // change this later to link where the image is stored
                    image: base64Image
                };


                //Try to send the data to IPFS system and get the CID back from them. 


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