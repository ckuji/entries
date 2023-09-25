import { configureStore } from '@reduxjs/toolkit';
import baseSlice from './slices/base';

export const store = configureStore({
  reducer: {
    base: baseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;