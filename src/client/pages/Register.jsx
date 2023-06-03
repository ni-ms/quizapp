import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        });
        if (response.redirected) {
            window.location.href = response.url;
        } else {
            alert('Username already exists');
        }
    };

    return (

<>
    <h1>Register</h1>
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
    <Button ariant="primary" href="/login">Register</Button>
</div>

    </Form>
</>

);
}

export default Register;
