import {createSlice} from "@reduxjs/toolkit";

export const auth = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isLogged: false,
        username: '',
        email: ''
    },
    reducers: {
        startLogin: (state) => {
            state.isLoading = true;
        },
        login: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isLogged = true;
            state.isLoading = false;
        },
        logout: (state) => {
            state.username = '';
            state.email = '';
            state.isLogged = false;
        }
    }
});

export const {startLogin, login, logout} = auth.actions;