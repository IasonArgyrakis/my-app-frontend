import React from 'react';
import {login} from '../services/auth.service';
import {Button} from "@mui/material";
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import {useNavigate} from "react-router-dom";



interface Values {
    email: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const submit = (values: any, {setSubmitting, setErrors}: any) => {

        setSubmitting(false);
        login(values).then(()=>{
                navigate("/users")
            }
        ).catch((errors) => {
            setErrors(errors)
        })


    }

    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",

                }}
                validate={(values) => {
                    const errors: Partial<Values> = {};
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
                    <Form>
                        <div className={"ma-2"}>
                            <Field
                                component={TextField}
                                name="email"
                                type="email"
                                label="Email"
                            />
                            <br/>

                        </div>
                        <div className={"ma-2"}>
                            <Field
                                component={TextField}
                                type="password"
                                label="Password"
                                name="password"
                            />
                            <br/>

                        </div>
                        <div className={"ma-2"}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;