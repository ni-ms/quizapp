// In your store.js file
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore function
import userReducer from '../Features/userSlice'; // Import userReducer

// Create the store object using configureStore and pass the userReducer as a slice
const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Export the store
export default store;