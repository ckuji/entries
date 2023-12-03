import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants';
import axios from 'axios';
import { CommonDay, DescriptionData, ExpItemWithUserAndExpItemIds, ExpWithUserId, ExperienceAndUserIds, LinkAndUserIds, LinkWithUserAndLinkIds, LinkWithUserId, UserState } from '../../types/user';

const initialState: UserState = {
    fetchUserLoading: 'idle',
    changeDescriptionLoading: 'idle',
    createLinkLoading: 'idle',
    updateLinkLoading: 'idle',
    deleteLinkLoading: 'idle',
    createExpItemLoading: 'idle',
    updateExpItemLoading: 'idle',
    deleteExpItemLoading: 'idle',
    userData: {
        id: 0,
        login: '',
        owner: false,
        profile: {
            description: '',
            initialDescription: ''
        },
        emptyInitialProfile: false,
        links: [],
        experience: [],
        days: []
    },
    editablePage: false,
    editableDescription: false,
    userRouterId: null,
    editableLinks: false,
    editedLinksItem: null,
    editableExperience: false,
    editedExpItem: null,
    dateValue: ''
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

export const createLinkAndUpdateLinks = createAsyncThunk(
    'user/createLink',
    async (newLink: LinkWithUserId) => {
        await axios.post(`${BASE_URL}/link`, {
            userId: newLink.userId,
            linkBase: newLink.linkBase,
            description: newLink.description
        }, {withCredentials: true});

        const response = await axios.get(`${BASE_URL}/link/${newLink.userId}`, {withCredentials: true});
        return response.data;
    }
);

export const updateLinksItem = createAsyncThunk(
    'user/updateLinksItem',
    async (link: LinkWithUserAndLinkIds) => {
        const response = await axios.put(`${BASE_URL}/link`, {
            linkBase: link.linkBase,
            description: link.description,
            id: link.id,
            userId: link.userId
        }, {withCredentials: true});
        return response.data;
    }
);

export const deleteLinkAndUpdateLinks = createAsyncThunk(
    'user/deleteLink',
    async (link: LinkAndUserIds) => {
        await axios.delete(`${BASE_URL}/link/${link.id}`, {withCredentials: true});

        const response = await axios.get(`${BASE_URL}/link/${link.userId}`, {withCredentials: true});
        return response.data;
    }
);

export const createExpItemAndUpdateExperience = createAsyncThunk(
    'user/createExpItem',
    async (newExpItem: ExpWithUserId) => {
        await axios.post(`${BASE_URL}/experience`, {
            userId: newExpItem.userId,
            name: newExpItem.name,
            percent: newExpItem.percent
        }, {withCredentials: true});

        const response = await axios.get(`${BASE_URL}/experience/${newExpItem.userId}`, {withCredentials: true});
        return response.data;
    }
);

export const updateExpItem = createAsyncThunk(
    'user/updateExpItem',
    async (expItem: ExpItemWithUserAndExpItemIds) => {
        const response = await axios.put(`${BASE_URL}/experience`, {
            name: expItem.name,
            percent: expItem.percent,
            id: expItem.id,
            userId: expItem.userId
        }, {withCredentials: true});
        return response.data;
    }
);

export const deleteExpItemAndUpdateExperience = createAsyncThunk(
    'user/deleteExpItem',
    async (expItem: ExperienceAndUserIds) => {
        await axios.delete(`${BASE_URL}/experience/${expItem.id}`, {withCredentials: true});

        const response = await axios.get(`${BASE_URL}/experience/${expItem.userId}`, {withCredentials: true});
        return response.data;
    }
);

export const changeDay = createAsyncThunk(
    'user/changeDay',
    async (day: CommonDay) => {
        const response = await axios.post(`${BASE_URL}/day`, day, {withCredentials: true});
        console.log('response data is ...', response.data);
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEditablePage: (state, action) => {
            state.editablePage = action.payload;
            if(state.editableDescription) {
                state.editableDescription = !state.editableDescription;
            }
            if(state.editableLinks) {
                state.editableLinks = !state.editableLinks;
            }
            if(state.editedLinksItem !== null) {
                state.editedLinksItem = null;
            }
            if(state.editableExperience) {
                state.editableExperience = !state.editableExperience;
            }
            if(state.editedExpItem !== null) {
                state.editedExpItem = null;
            }
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
        },
        setEditableLinks: (state, action) => {
            state.editableLinks = action.payload;
        },
        setEditedLinksItem: (state, action) => {
            state.editedLinksItem = action.payload;
        },
        setEditedExpItem: (state, action) => {
            state.editedExpItem = action.payload;
        },
        setEditableExperience: (state, action) => {
            state.editableExperience = action.payload;
        },
        setDateValue: (state, action) => {
            state.dateValue = action.payload;
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
        builder.addCase(createLinkAndUpdateLinks.pending, (state) => {
            state.createLinkLoading = 'pending';
        });
        builder.addCase(createLinkAndUpdateLinks.fulfilled, (state, action) => {
            state.createLinkLoading = 'fulfilled';
            state.userData.links = action.payload;
        });
        builder.addCase(createLinkAndUpdateLinks.rejected, (state) => {
            state.createLinkLoading = 'rejected';
        });
        builder.addCase(updateLinksItem.pending, (state) => {
            state.updateLinkLoading = 'pending';
        });
        builder.addCase(updateLinksItem.fulfilled, (state, action) => {
            state.updateLinkLoading = 'fulfilled';

            const links = state.userData.links.map((item) => item.id === action.payload.id ? action.payload : item);
            state.userData.links = links;
        });
        builder.addCase(updateLinksItem.rejected, (state) => {
            state.updateLinkLoading = 'rejected';
        });
        builder.addCase(deleteLinkAndUpdateLinks.pending, (state) => {
            state.deleteLinkLoading = 'pending';
        });
        builder.addCase(deleteLinkAndUpdateLinks.fulfilled, (state, action) => {
            state.deleteLinkLoading = 'fulfilled';
            state.userData.links = action.payload;
        });
        builder.addCase(deleteLinkAndUpdateLinks.rejected, (state) => {
            state.deleteLinkLoading = 'rejected';
        });
        builder.addCase(createExpItemAndUpdateExperience.pending, (state) => {
            state.createExpItemLoading = 'pending';
        });
        builder.addCase(createExpItemAndUpdateExperience.fulfilled, (state, action) => {
            state.createExpItemLoading = 'fulfilled';
            state.userData.experience = action.payload;
        });
        builder.addCase(createExpItemAndUpdateExperience.rejected, (state) => {
            state.createExpItemLoading = 'rejected';
        });
        builder.addCase(updateExpItem.pending, (state) => {
            state.updateExpItemLoading = 'pending';
        });
        builder.addCase(updateExpItem.fulfilled, (state, action) => {
            state.updateExpItemLoading = 'fulfilled';

            const expItems = state.userData.experience.map((item) => item.id === action.payload.id ? action.payload : item);
            state.userData.experience = expItems;
        });
        builder.addCase(updateExpItem.rejected, (state) => {
            state.updateExpItemLoading = 'rejected';
        });
        builder.addCase(deleteExpItemAndUpdateExperience.pending, (state) => {
            state.deleteExpItemLoading = 'pending';
        });
        builder.addCase(deleteExpItemAndUpdateExperience.fulfilled, (state, action) => {
            state.deleteExpItemLoading = 'fulfilled';
            state.userData.experience = action.payload;
        });
        builder.addCase(deleteExpItemAndUpdateExperience.rejected, (state) => {
            state.deleteExpItemLoading = 'rejected';
        });
    },
});

export const {
    setEditablePage,
    setEditableDescription,
    onChangeProfileDescription,
    setUserRouterId,
    resetUserOwnerField,
    setEditableLinks,
    setEditedLinksItem,
    setEditedExpItem,
    setEditableExperience,
    setDateValue
} = userSlice.actions;

export default userSlice.reducer;