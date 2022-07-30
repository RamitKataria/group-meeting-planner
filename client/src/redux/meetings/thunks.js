import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import MeetingService from './service';

export const getMeetingAsync = createAsyncThunk(
    actionTypes.GET_MEETING,
    async (meetingId) => {
        return await MeetingService.getMeeting(meetingId);
    }
);

export const addMeetingsAsync = createAsyncThunk(
  actionTypes.ADD_MEETING,
  async (meeting) => {
    return await MeetingService.addMeeting(meeting);
  }
);

export const deleteMeetingAsync = createAsyncThunk(
    actionTypes.DELETE_MEETING,
    async (meeting) => {
        return await MeetingService.deleteMeeting({meeting});
    }
);

export const updateMeetingAsync = createAsyncThunk(
    actionTypes.UPDATE_MEETING,
    async (meeting) => {
        return await MeetingService.updateMeeting(meeting._id, {meeting});
    }
);

export const updateAvailAsync = createAsyncThunk(
    actionTypes.UPDATE_AVAIL,
    async (args) => {
        return await MeetingService.updateAvailability(args.meetingId, args.userId, args.body);
    }
);