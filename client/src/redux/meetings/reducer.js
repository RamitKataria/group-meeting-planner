import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { getMeetingsAsync } from './thunks';

const INITIAL_STATE = {
  list: [],
  getMeetings: REQUEST_STATE.IDLE,
  addMeetings: REQUEST_STATE.IDLE,
  error: null
};

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMeetingsAsync.pending, (state) => {
        state.getMeetings = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getMeetingsAsync.fulfilled, (state, action) => {
        console.log("in reducer.js");
        state.getMeetings = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
      })
      .addCase(getMeetingsAsync.rejected, (state, action) => {
        state.getMeetings = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
  }
});

export default meetingsSlice.reducer;
