import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: []
}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.users = (action.payload)
        },
    },
    extraReducers: () => {
    }
})

export const { addUsers } = UsersSlice.actions

export default UsersSlice.reducer