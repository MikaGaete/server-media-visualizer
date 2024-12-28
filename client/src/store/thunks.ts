import {startLogin, login, logout} from "./slices/auth";
import {Dispatch} from "@reduxjs/toolkit";
import {LoginValues} from "../types/LoginTypes.tsx";
import {AppDispatch} from "./store.ts";

export const setCredentials = (data: LoginValues) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startLogin());
        dispatch(login(data));
    }
}

export const dropCredentials = () => {
    return async (dispatch: Dispatch) => {
        dispatch(logout());
    }
}