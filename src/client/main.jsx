import React, {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
// get user info from store
import {Provider, useSelector} from "react-redux";
import store from "../app/store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import pages and components
import App from "./App";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import Login from "./pages/Login";
import Register from "./pages/Register";

import RequireAuth from "./Components/RequireAuth";

function isAuth() {
    const userState = useSelector((state) => state.user);
    return userState.isLoggedIn;
}

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/create" element={
                    <RequireAuth redirectTo={"/login"}>
                        <CreateQuiz />
                    </RequireAuth>

                } />
                <Route path="/take" element={<TakeQuiz />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    </Provider>
    </StrictMode>
);
