import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  userToken: "",
  userName: "",
  userEmail: "",
  userStatus: "",
  userID: ""
}

// Create an async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3001/user/getUser', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.data
    } catch (error) {
      console.log(error);
      try {
        const adminresponse = await axios.get('http://localhost:3001/admin/getAdmin', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        return adminresponse.data.data
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.userToken = action.payload
    },
    logout: (state) => {
      // Reset state to initial values
      state.userToken = ""
      state.userName = ""
      state.userEmail = ""
      state.userStatus = ""
      state.userRole = ""
      state.userID = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userName = action.payload.name
        state.userEmail = action.payload.email
        state.userStatus = action.payload.status
        state.userRole = action.payload.role
        state.access = action.payload.adminType
        state.userID = action.payload._id
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export const { setToken, logout } = userSlice.actions

export default userSlice.reducer