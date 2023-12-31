import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants';
import axios from 'axios';
import { BaseState } from '../../types/base';

const initialState: BaseState = {
    logoutLoading: 'idle',
    fetchUserLoading: 'idle',
    logouted: false,
    userName: ''
};

export const fetchLoginedUser = createAsyncThunk(
    'base/fetchLoginedUser',
    async () => {
        const response = await axios.get(`${BASE_URL}/auth/profile`, {withCredentials: true});
        return response.data.login;
    }
);

export const logoutUser = createAsyncThunk(
    'base/logoutUser',
    async () => {
        const response = await axios.get(`${BASE_URL}/auth/logout`, {withCredentials: true});
        return response.data;
    }
);

export const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        // resetUser: (state) => {
        //     state.logouted = true;
        //     state.fetchUserLoading = 'idle';
        //     state.userName = '';
        // },
    },
    extraReducers: (builder) => {
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

export const { 
    // resetUser
} = baseSlice.actions;

export default baseSlice.reducer;