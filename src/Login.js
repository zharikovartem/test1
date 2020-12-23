import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Form, Input, Button, message } from 'antd';

const Login = (props) => {
    const [state, setState] = useState()

    useEffect(() => {
        if (state) {
            const baseURL = 'https://tager.dev.ozitag.com/api/auth/user/';

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state)
            };

            fetch(baseURL, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.data.accessToken !== undefined) {
                        localStorage.setItem('accessToken', data.data.accessToken);
                        localStorage.setItem('refreshToken', data.data.refreshToken);
                        props.isLogined(true)
                    }
                })
                .catch(function(error) {
                    message.error('Введены не правельные данные');
                });
        }

    }, [state, props])

    return (
        <div className="Container">
            <Formik
                initialValues={{ email: 'user@ozitag.com', password: 'user' }}
                validate={values => {
                    const errors = {};
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
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
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
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Form.Item 
                            label="Email" 
                            validateStatus={errors.email !== undefined ? "error" : ""}
                            help={errors.email && touched.email && errors.email}
                            required="true"
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
                            validateStatus={errors.password !== undefined ? "error" : ""}
                            help={errors.password && touched.password && errors.password}
                            required="true"
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
    )
}

export default Login;