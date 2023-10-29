import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants';
import axios from 'axios';
import { UserFields } from '../../types/base';

export interface BaseState {
    value: number,
    loginModalLoading: string
};

const initialState: BaseState = {
    value: 0,
    loginModalLoading: 'idle'
};

export const fetchLoginedUser = createAsyncThunk(
    'users/fetchLoginedUser',
    async () => {
        const { data } = await axios.get(`${BASE_URL}/auth/profile`, {withCredentials: true});
        return data;
    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (userData: UserFields) => {

        const response = await axios.post(`${BASE_URL}/auth/login`, {
            login: userData.login, password: userData.password
        }, { withCredentials: true });
        return JSON.stringify(response.data);

    }
)

export const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(registrationUser.pending, (state) => {
        //   if(state.introModalLoading === 'idle') {
        //     state.introModalLoading = 'pending'
        //   }
        // });
        // builder.addCase(registrationUser.fulfilled, (state, action) => {
        
        // });
        // builder.addCase(registrationUser.rejected, (state, action) => {
        
        // })
    },
});

export const { increment, decrement, incrementByAmount } = baseSlice.actions;

export default baseSlice.reducer;