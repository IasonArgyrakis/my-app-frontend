import React, {useEffect, useReducer, useState} from 'react';
import {Button, Card, CardContent} from "@mui/material";
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import {backend} from "../../services/backend.service";


export interface IDepartmentValues {
    title: string;

}


const AddDepartment = (props:any) => {

    const submit = (values: IDepartmentValues, {setSubmitting, setErrors}: any) => {
        setSubmitting(false);
        console.log(values)
        backend.post({
            url: '/departments',
            payload: values,
            requiresToken:true

        })
            .then((data) => {
               props.onSubmit(data)
            }).catch((errors) => {
            console.log(errors)
            setErrors(
                errors
            )
        })


    }

    return (
        <div>
            <Formik
                initialValues={{
                    title:""

                }}
                validate={(values:IDepartmentValues) => {
                    const errors: Partial<IDepartmentValues> = {};
                    if (!values.title) {
                        errors.title = 'Required';
                    }
                    return errors;
                }}
                onSubmit={submit}
            >
                {({submitForm, isSubmitting}) => (
                    <Card variant="outlined">
                        <CardContent className='pa-2'>
                            <Form>
                                <h1>Add Department</h1>

                                <Field

                                    component={TextField}
                                    name="title"
                                    label="title"
                                    type="text"

                                />


                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Submit
                                </Button>

                            </Form>
                        </CardContent>
                    </Card>

                )}
            </Formik>
        </div>
    );
};

export default AddDepartment;