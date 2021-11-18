import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Register = () => {
    const [formState, setFormState] = useState({ name: '', email: '', password: '', repeatPassword: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (formState.password === formState.repeatPassword) {
            const mutationResponse = await addUser({
                variables: {
                    name: formState.name,
                    email: formState.email,
                    password: formState.password
                },
            });
            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div id="Register">
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center bg-secondary border border-dark border-2 m-5 p-5 rounded-pill">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" onChange={handleChange} onSubmit={handleFormSubmit}>
                                <h3 className="text-center text-info">Register</h3>
                                <div className="form-group">
                                    <label htmlFor="name" className="text-info"><strong>Name:</strong></label><br />
                                    <input type="text" name="name" id="name" className="form-control rounded-pill border-primary border-2" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="text-info"><strong>Email:</strong></label><br />
                                    <input type="email" name="email" id="email" className="form-control rounded-pill border-primary border-2" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info"><strong>Password:</strong></label><br />
                                    <input type="password" name="password" id="password" className="form-control rounded-pill border-primary border-2" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="repeatPassword" className="text-info"><strong>Repeat Password:</strong></label><br />
                                    <input type="password" name="repeatPassword" id="repeatPassword" className="form-control rounded-pill border-primary border-2" />
                                </div>
                                <div className="form-group">
                                    <input type="submit" name="submit" className="btn btn-info btn-md mt-3 border-primary border-2 rounded-pill" value="submit" />
                                </div>
                                <div id="register-link" className="text-right">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;