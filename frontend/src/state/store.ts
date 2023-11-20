import { configureStore } from '@reduxjs/toolkit';
import baseSlice from './slices/base';
import userSlice from './slices/user';

export const store = configureStore({
  reducer: {
    base: baseSlice,
    user: userSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;