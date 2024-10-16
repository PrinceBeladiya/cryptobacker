import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/UserSession';
import campaignReducer from '../reducer/Campaign';
import usersReducer from '../reducer/Users'
import withdrawsReducer from '../reducer/Withdraws'

export const store = configureStore({
  reducer: {
    user: userReducer,
    campaigns: campaignReducer,
    users: usersReducer,
    withdraws: withdrawsReducer
  },
})