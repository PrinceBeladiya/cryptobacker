import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/UserSession';
import campaignReducer from '../reducer/Campaign';

export const store = configureStore({
  reducer: {
    user: userReducer,
    campaigns: campaignReducer
  },
})