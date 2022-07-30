import { createSlice } from "@reduxjs/toolkit"

const init = {
    dates: [
        new Date().getTime()
    ],
    timeRanges: [[9 , 17]],
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
        setDates(state, action) {
            state.dates = action.payload;
        },
        setTimeRanges(state, action) {
            state.timeRanges = action.payload;
        }
    },
})


export const { setUserSlots } = availabilitySlice.actions
export default availabilitySlice.reducer
