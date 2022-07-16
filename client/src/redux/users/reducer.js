import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { getMeetingsAsync, getUserAsync, updateUserAsync, deleteUserAsync } from './thunks';

const INITIAL_STATE = {
  list: [],
  getMeetings: REQUEST_STATE.IDLE,
  getUser: REQUEST_STATE.IDLE,
  updateUser: REQUEST_STATE.IDLE,
  deleteUser: REQUEST_STATE.IDLE,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMeetingsAsync.pending, (state) => {
        state.getMeetings = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getMeetingsAsync.fulfilled, (state, action) => {
        state.getMeetings = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
      })
      .addCase(getMeetingsAsync.rejected, (state, action) => {
        state.getMeetings = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.getUser = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.getUser = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.getUser = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.updateUser = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.updateUser = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.updateUser = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.deleteUser = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.deleteUser = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.deleteUser = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
  }
});

export default usersSlice.reducer;
