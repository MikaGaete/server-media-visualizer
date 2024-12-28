import {configureStore} from "@reduxjs/toolkit";
import {auth} from "./slices/auth.ts";

export const store = configureStore({
    reducer: {
        auth: auth.reducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;