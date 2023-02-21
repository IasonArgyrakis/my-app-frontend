import * as React from 'react';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import {useState} from "react";
import {IUser} from "../../services/dto/Users.dto";
import {backend} from "../../services/backend.service";




export function UserDetailsDialog(props:any) {
    let {user, open, onClose} = props;
    const [userState, userStateUpdate] = useState(user)



    const handleClose = (value:any) => {
        onClose(value);
    };


    const submit = (values: any, {setSubmitting, setErrors}: any) => {

        setSubmitting(false);
        delete values.departments

        backend.put({
            url: '/users',
            payload: values,
            requiresToken: true
        })
            .then((data) => {
                    console.log(data)
                    onClose(data)

                }
            ).catch((errors) => {
            setErrors({
                ...errors
            })

        })


    }

    const fieldStyle = {
        padding: "10px"
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Update user Info</DialogTitle>
            <Formik
                initialValues={{
                    ...user
                }}
                validate={(values) => {

                    const errors: Partial<IUser> = {};

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={submit}
            >
                {({submitForm, isSubmitting}) => (
                    <Form style={{
                        padding: "10px"
                    }}>
                        <div
                            style={fieldStyle}>
                            <Field

                                component={TextField}
                                name="email"
                                type="email"
                                label="Email"
                            />
                        </div>

                        <br/>


                        <div
                            style={fieldStyle}>
                            <Field
                                component={TextField}
                                type="text"
                                name="firstName"
                                label="First Name"
                            />
                        </div>
                        <br/>

                        <div
                            style={fieldStyle}>
                            <Field
                                component={TextField}
                                type="text"
                                label="lastName"
                                name="lastName"
                            />
                        </div>
                        <br/>

                        <div
                            style={fieldStyle}>
                            <Field
                                component={TextField}
                                type="text"
                                label="afm"
                                name="afm"
                            />
                        </div>
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>

        </Dialog>
    );
}

