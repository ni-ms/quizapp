// In your RequireAuth.js file
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// checkauth

function checkAuth() {
    // Fetch and return the username
    fetch('/api/checkAuth')
        .then((res) => res.json())
        .then((data) => {
            return data.username;
        });

    // otherwise return false
    return false;

}

function RequireAuth({ children, redirectTo }) {
    // Use useSelector to get the login status from the state
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    // check auth
    checkAuth();

    return (checkAuth() || isLoggedIn )
        ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;
