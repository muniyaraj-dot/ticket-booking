import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import MovieSlice from "./MovieSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        movie:MovieSlice
    }
});
