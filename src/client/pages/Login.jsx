import React from 'react';
import { useState } from 'react';
import {Form, Button} from "react-bootstrap";

import {useDispatch, useSelector} from "react-redux";
import { login } from "../../Features/userSlice"

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();


    let loggedInfo = {
        loggedIn: false,
        username: username,
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create an init object with method, headers, and body
        const init = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };

        try {
            // Make a fetch call with init object
            const response = await fetch('/api/login', init);
            console.log(response)
            // Check the status of the response
            if (response.status === 200) {
                // Parse the response as JSON
                const data = await response.json();
                // Dispatch the login action with username and password
                dispatch(login({ username: username, password: password }));
                loggedInfo.loggedIn = true;
                loggedInfo.username = data.username;
                // Redirect to home page
                window.location.href = '/';

            } else {
                // Throw an error with the status text from response
                throw new Error(response.statusText);
            }
        } catch (err) {
            // Log the error to the console
            console.error(err);
        }
    };




    return (
        <>
            <h1>Login</h1>

            {loggedInfo.loggedIn && <h3>Logged in as {username}</h3>}


            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>

                <div className={"row justify-content-center py-5"}>
                    <div className={"col-md-2 cen px-2"}>
                        <Button variant="primary" type="submit">Login</Button>
                    </div>
                    <div className={"col-md-2 px-2 py-3 py-md-0"}>
                        <Button variant="primary" href="/register">Register</Button>
                    </div>
                </div>
            </Form>
        </>

    );
}

export default Login;
