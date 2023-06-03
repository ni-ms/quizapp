import {createSelector, createSlice} from '@reduxjs/toolkit'; // Import createSlice function

// Define the initial state
const initialState = {
    isLoggedIn: false,
    user: null,
    loggedInUser: null,
};

// Create a slice using createSlice and pass the name, initial state, and reducers
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Define the login reducer that sets the isLoggedIn and user state
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;

        },
        // Define the logout reducer that resets the isLoggedIn and user state
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;


// Create a selector to get the whole user state
export const selectUserState = (state) => state.user;

// Create a selector to get the isLoggedIn status
export const selectIsLoggedIn = createSelector(
    [selectUserState],
    (userState) => userState.isLoggedIn
);

// Create a selector to get the user object
export const selectUser = createSelector(
    [selectUserState],
    (userState) => userState.user
);

// Create a selector to get the username
export const selectUsername = createSelector(
    [selectUser],
    (user) => user && user.username
);