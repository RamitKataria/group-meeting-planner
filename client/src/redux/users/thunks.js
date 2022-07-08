import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import MeetingService from './service';

export const getMeetingsAsync = createAsyncThunk(
  actionTypes.GET_MEETINGS,
  async (userId) => {
    return await MeetingService.getMeetingsBasedOnUserId(userId);
  }
);

export const getUserAsync = createAsyncThunk(
    actionTypes.GET_USER,
    async (userId) => {
        return await MeetingService.getUserBasedOnUserId(userId);
    }
);
