import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/UserSession';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})