import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants';
import axios from 'axios';
import { UserState } from '../../types/user';

const initialState: UserState = {
    fetchUserLoading: 'idle',
    userData: {
        id: 0,
        login: '',
        owner: false,
        profile: {
            description: '',
            initialDescription: ''
        },
    },
    editableProfile: false,
    editableDescription: false,
};

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (id: number) => {
        const response = await axios.get(`${BASE_URL}/user/${id}`, {withCredentials: true});

        if(!response.data.profile) {
            return {
                ...response.data,
                profile: {
                    description: '',
                    initialDescription: ''
                }
            }
        }
        return {
            ...response.data,
            profile: {
                ...response.data.profile,
                initialDescription: response.data.profile.description || ''
            }
        };
    }
);

export const createProfile = createAsyncThunk(
    'user/createProfile',
    async (data: any) => {
        const response = await axios.post(`${BASE_URL}/profile`, {
            text: data.text, userId: data.userId
        }, {withCredentials: true});
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEditableProfile: (state, action) => {
            state.editableProfile = action.payload;
        },
        setEditableDescription: (state, action) => {
            state.editableDescription = action.payload;
        },
        onChangeProfileDescription: (state, action) => {
            state.userData.profile.description = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.fetchUserLoading = 'pending';
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.fetchUserLoading = 'fulfilled';
            state.userData = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state) => {
            state.fetchUserLoading = 'rejected';
        });
        builder.addCase(createProfile.pending, (state) => {
            state.fetchUserLoading = 'pending';
        });
        builder.addCase(createProfile.fulfilled, (state, action) => {
            state.fetchUserLoading = 'fulfilled';
        });
        builder.addCase(createProfile.rejected, (state) => {
            state.fetchUserLoading = 'rejected';
        });
    },
});

export const {
    setEditableProfile,
    setEditableDescription,
    onChangeProfileDescription,
} = userSlice.actions;

export default userSlice.reducer;