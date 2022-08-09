import { createSlice } from "@reduxjs/toolkit"
import { updateAvailAsync } from "./meetings/thunks";
import { REQUEST_STATE } from './utils';

const init = {
    dates: [
        new Date().getTime()
    ],
    timeRanges: [[9 , 17]],
    userAvailability: [],
    othersAvailability: [],
    updateAvailability: {
        state: REQUEST_STATE.IDLE,
        response: null,
    },
    available: [],
    unavailable: [],
    guestDialogue: false,
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
        },
        setOthersAvailability(state, action) {
            state.othersAvailability = action.payload;
        },
        setAvailable(state, action) {
            state.available = action.payload;
        },
        setUnavailable(state, action) {
            state.unavailable = action.payload;
        }, 
        setGuestDialogue(state, action) {
            state.guestDialogue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateAvailAsync.pending, (state) => {
                state.updateAvailability.state = REQUEST_STATE.PENDING;
                state.updateAvailability.response = null;
                state.error = null;
            })
            .addCase(updateAvailAsync.fulfilled, (state, action) => {
                state.updateAvailability.state = REQUEST_STATE.FULFILLED;
                state.updateAvailability.response = action.payload;
                state.list = action.payload;
            })
            .addCase(updateAvailAsync.rejected, (state, action) => {
                state.updateAvailability.state = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
    }
})


export const { setUserSlots, setDates, setTimeRanges, setOthersAvailability, setAvailable, setUnavailable, setGuestDialogue } = availabilitySlice.actions
export default availabilitySlice.reducer
