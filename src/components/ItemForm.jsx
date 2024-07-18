import {
    Button,
    FormLabel,
    FormControl,
    Input
} from '@chakra-ui/react'

import { Field, Form, Formik } from 'formik';

import data from '../data.json'

import "../assets/styles/ItemForm.css";

const ItemForm = () => {

    return (
            <Formik
            initialValues={data}
            onSubmit={(values, actions) => {
                setTimeout(() =>{
                    alert(JSON.stringify(values, null, 2))
                    actions.setSubmitting(false)
                }, 1000)
            }}
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