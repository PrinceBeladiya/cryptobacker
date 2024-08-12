import { configureStore } from '@reduxjs/toolkit';
import NavbarSliceReducer from './slice' 
import authreducer from '../componets/Authentication/AuthSlice' 
const store = configureStore({
  reducer: {
    navbar: NavbarSliceReducer,
    auth: authreducer,
  },
});

export default store;
