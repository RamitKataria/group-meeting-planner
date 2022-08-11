import {createSlice} from '@reduxjs/toolkit';
import {REQUEST_STATE} from '../utils';
import {getMeetingAsync} from './thunks';

const INITIAL_STATE = {
    list: [],
    getMeeting: REQUEST_STATE.IDLE,
    error: null
};

const meetingsSlice = createSlice({
    name: 'meetings',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMeetingAsync.pending, (state) => {
                state.getMeeting = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getMeetingAsync.fulfilled, (state, action) => {
                state.getMeeting = REQUEST_STATE.FULFILLED;
                state.list = action.payload;
            })
            .addCase(getMeetingAsync.rejected, (state, action) => {
                state.getMeeting = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
    }
});

export default meetingsSlice.reducer;
