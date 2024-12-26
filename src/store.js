import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./slices/articlesSlice"; // Assuming you have this slice
import authSlice from "./slices/authSlice"; // Assuming you have this slice
import { articlesApi } from "./service/api"; // Import the API slice

export default configureStore({
    reducer: {
        articles: articlesSlice, // Add the articles slice to the store
        auth: authSlice, // Add the auth slice to the store
        [articlesApi.reducerPath]: articlesApi.reducer, // Add the API reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(articlesApi.middleware), // Add middleware to handle caching, invalidation, etc.
});
