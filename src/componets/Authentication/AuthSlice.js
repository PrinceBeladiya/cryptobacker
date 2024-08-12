import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    value: '',
  },
  reducers: {
    isloggedin : (state,payload) => {
        state.value = payload
    }
  },
});

export const { isloggedin } = AuthSlice.actions;
export default AuthSlice.reducer;
