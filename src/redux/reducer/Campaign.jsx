import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    campaigns: []
}

export const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        addCampaign: (state, action) => {
            state.campaigns = (action.payload)
        },
    },
    extraReducers: () => {
    }
})

export const { addCampaign } = campaignSlice.actions

export default campaignSlice.reducer