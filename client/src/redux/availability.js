import { createSlice } from "@reduxjs/toolkit"

const init = {
    dates: [
        new Date(2022, 5, 20).getTime(),
        new Date(2022, 5, 22).getTime(),
        new Date(2022, 5, 24).getTime()
    ],
    timeRanges: [[8 , 17]],
    userAvailability: [],
    othersAvailability: []
}

const availabilitySlice = createSlice({
    name: 'availability',
    initialState: init,
    reducers: {
        setUserSlots(state, action) {
            state.userAvailability = action.payload;
        },
    },
})


export const { setUserSlots } = availabilitySlice.actions
export default availabilitySlice.reducer
