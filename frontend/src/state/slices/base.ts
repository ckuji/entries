import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants';
import axios from 'axios';
import { UserFields } from '../../types/base';

export interface BaseState {
    value: number,
    loginLoading: string,
    logoutLoading: string,
    fetchUserLoading: string,
    userName: string,
    logouted: boolean,
};

const initialState: BaseState = {
    value: 0,
    loginLoading: 'idle',
    logoutLoading: 'idle',
    fetchUserLoading: 'idle',
    userName: '',
    logouted: false,
};

export const fetchLoginedUser = createAsyncThunk(
    'users/fetchLoginedUser',
    async () => {
        const { data } = await axios.get(`${BASE_URL}/auth/profile`, {withCredentials: true});
        return data.login;
    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (userData: UserFields) => {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            login: userData.login, password: userData.password
        }, { withCredentials: true });
        return response.data;
    }
)

export const logoutUser = createAsyncThunk(
    'users/logoutUser',
    async () => {
        const response = await axios.get(`${BASE_URL}/auth/logout`, {withCredentials: true});
        return response.data;
    }
);

export const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.logouted = true;
            state.fetchUserLoading = 'idle';
            state.userName = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loginLoading = 'pending';
        });
        builder.addCase(loginUser.fulfilled, (state) => {
            state.loginLoading = 'fulfilled';
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.loginLoading = 'rejected';
        });
        builder.addCase(logoutUser.pending, (state) => {
            state.logoutLoading = 'pending';
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.logoutLoading = 'fulfilled';
            state.logouted = true;
            state.fetchUserLoading = 'idle';
            state.userName = '';
        });
        builder.addCase(fetchLoginedUser.pending, (state) => {
            state.fetchUserLoading = 'pending';
        });
        builder.addCase(fetchLoginedUser.fulfilled, (state, action) => {
            state.fetchUserLoading = 'fulfilled';
            state.userName = action.payload;
        });
        builder.addCase(fetchLoginedUser.rejected, (state) => {
            state.fetchUserLoading = 'rejected';
        });
    },
});

export const { resetUser } = baseSlice.actions;

export default baseSlice.reducer;