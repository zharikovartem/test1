import 'react-app-polyfill/ie11';
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Form, Input, Button, message } from 'antd';

type valuesType = {
    clientId?: number | null,
    email: string| null,
    password: string| null
}

type errorType = {
    email?: string,
    password?: string
};


const Login = (props:any) => {
    const [state, setState] = useState<valuesType>();
    const [apiErrors, setApiErrors] =useState({ email: null, password: null});

    useEffect(() => {
        if (state) {
            const baseURL = 'https://tager.dev.ozitag.com/api/auth/user/';

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state)
            };

            fetch(baseURL, requestOptions)
                .then(res => {
                    if (!res.ok) {
                        res.json()
                            .then( (error: any ) => {

                                setApiErrors({
                                    email: error.errors.email ? error.errors.email.message : undefined,
                                    password: error.errors.password ? error.errors.password.message : undefined
                                })
                                message.error(error.message);
                                // message.error(...error.message);
                            });
                    }
                    else {
                        return res.json()
                            .then(
                                (data) => {
                                    if (data.data !== undefined) {
                                        localStorage.setItem('accessToken', data.data.accessToken);
                                        localStorage.setItem('refreshToken', data.data.refreshToken);
                                        props.isLogined(true)
                                    }
                                },
                            );
                    }
                });
        }

    }, [state, props]);

    return (
        <div className="Container">
            <Formik
                initialValues={{ email: 'user@ozitag.com', password: 'user' }}
                validate={values => {
                    
                    let errors: errorType = {};

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    setApiErrors({ email: null, password: null});
                    return errors;
                }}
                onSubmit={(values:valuesType, { setSubmitting }) => {
                    values.clientId = 1;
                    setState(values)
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Form.Item
                            label="Email"
                            validateStatus={errors.email || apiErrors.email  ? "error" : ""}
                            help={errors.email === undefined ? apiErrors.email : errors.email}
                            required={true}
                        >
                            <Input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Password"
                            validateStatus={errors.password !== undefined || apiErrors.password ? "error" : ""}
                            help={errors.password === undefined ? apiErrors.password : errors.password}
                            required={true}
                        >
                            <Input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                        </Form.Item>


                        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default Login;