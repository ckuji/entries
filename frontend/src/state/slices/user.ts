import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants';
import axios from 'axios';
import { DescriptionData, UserState } from '../../types/user';

const initialState: UserState = {
    fetchUserLoading: 'idle',
    changeDescriptionLoading: 'idle',
    userData: {
        id: 0,
        login: '',
        owner: false,
        profile: {
            description: '',
            initialDescription: ''
        },
        emptyInitialProfile: false
    },
    editableProfile: false,
    editableDescription: false,
    userRouterId: null
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
                },
                emptyInitialProfile: true
            }
        }
        return {
            ...response.data,
            profile: {
                ...response.data.profile,
                initialDescription: response.data.profile.description || '',
            },
            emptyInitialProfile: false
        };
    }
);

export const createDescription = createAsyncThunk(
    'user/createDescription',
    async (data: DescriptionData) => {
        const response = await axios.post(`${BASE_URL}/profile`, {
            text: data.text, userId: data.userId
        }, {withCredentials: true});
        return response.data;
    }
);

export const updateDescription = createAsyncThunk(
    'user/updateDescription',
    async (data: DescriptionData) => {
        const response = await axios.put(`${BASE_URL}/profile`, {
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
        },
        setUserRouterId: (state, action) => {
            state.userRouterId = action.payload;
        },
        resetUserOwnerField: (state) => {
            state.userData.owner = false;
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
        builder.addCase(createDescription.pending, (state) => {
            state.changeDescriptionLoading = 'pending';
        });
        builder.addCase(createDescription.fulfilled, (state) => {
            state.changeDescriptionLoading = 'fulfilled';
            if(state.userData.emptyInitialProfile === true) {
                state.userData.emptyInitialProfile = false;
            }
            state.userData.profile.initialDescription = state.userData.profile.description;
        });
        builder.addCase(createDescription.rejected, (state) => {
            state.changeDescriptionLoading = 'rejected';
        });
        builder.addCase(updateDescription.pending, (state) => {
            state.changeDescriptionLoading = 'pending';
        });
        builder.addCase(updateDescription.fulfilled, (state) => {
            state.changeDescriptionLoading = 'fulfilled';
            state.userData.profile.initialDescription = state.userData.profile.description;
        });
        builder.addCase(updateDescription.rejected, (state) => {
            state.changeDescriptionLoading = 'rejected';
        });
    },
});

export const {
    setEditableProfile,
    setEditableDescription,
    onChangeProfileDescription,
    setUserRouterId,
    resetUserOwnerField
} = userSlice.actions;

export default userSlice.reducer;