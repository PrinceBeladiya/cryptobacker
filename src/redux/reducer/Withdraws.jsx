import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    withdraws: []
}

export const withdrawSlice = createSlice({
    name: 'withdraws',
    initialState,
    reducers: {
        addWithdraws: (state, action) => {
            state.withdraws = (action.payload)
        },
    },
    extraReducers: () => {
    }
})

export const { addWithdraws } = withdrawSlice.actions

export default withdrawSlice.reducer