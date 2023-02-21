import * as React from 'react';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import {useState} from "react";
import {IUser} from "../../services/dto/Users.dto";
import {backend} from "../../services/backend.service";
import {IDepartment} from "../../services/dto/Departmetn.dto";




export function DepartmentDetailsDialog(props:any) {
    let {department, open, onClose} = props;
    const [departmentState, departmentStateUpdate] = useState(department)



    const handleClose = (value:any) => {
        onClose(value);
    };


    const submit = (values: any, {setSubmitting, setErrors}: any) => {

        setSubmitting(false);

        backend.put({
            url: '/departments',
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
                    ...department
                }}
                validate={(values) => {

                    const errors: Partial<IDepartment> = {};

                    if (!values.title) {
                        errors.title = 'Required';
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
                                name="title"
                                type="text"
                                label="title"
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

