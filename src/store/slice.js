import { createSlice } from '@reduxjs/toolkit';

const NavbarSlice = createSlice({
  name: 'example',
  initialState: {
    value: '',
  },
  reducers: {
    setpath : (state,payload) => {
        state.value = payload
    }
  },
});

export const { setpath } = NavbarSlice.actions;
export default NavbarSlice.reducer;
