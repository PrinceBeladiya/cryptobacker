import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userToken: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.userToken = action.payload
    }
  }
})

export const { setToken } = userSlice.actions

export default userSlice.reducer