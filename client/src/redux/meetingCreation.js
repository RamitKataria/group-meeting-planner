import { createSlice } from "@reduxjs/toolkit"
import { REQUEST_STATE } from './utils';
import { addMeetingsAsync } from './meetings/thunks';

// slice for meeting creation

const init = {
  currUser: "",
  name: "",
  description: "",
  dates: [],
  startTime: 9,
  endTime: 17,
  addMeeting: {
    state: REQUEST_STATE.IDLE,
    response: null,
  },
}

const meetingCreationSlice = createSlice({
  name: 'meetingCreation',
  initialState: init,
  reducers: {
    storeDates(state, action) {
      return {
          ...state,
          "dates": action.payload,
      }
    },

    storeStartTime(state, action) {
      return {
        ...state,
        "startTime": action.payload,
      }
    },
    storeEndTime(state, action) {
      return {
        ...state,
        "endTime": action.payload,
      }
    },
    storeMeetingName(state, action) {
      return {
        ...state,
        "name": action.payload,
      }
    }, 
    resetAddMeeting() {
      return init;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMeetingsAsync.pending, (state) => {
        state.addMeeting.state = REQUEST_STATE.PENDING;
        state.addMeeting.response = null;
        state.error = null;
      })
      .addCase(addMeetingsAsync.fulfilled, (state, action) => {
        state.addMeeting.state = REQUEST_STATE.FULFILLED;
        state.addMeeting.response = action.payload;
        state.list = action.payload;
      })
      .addCase(addMeetingsAsync.rejected, (state, action) => {
        state.addMeeting.state = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
  }
})

// Extract the action creators object and the reducer
const { actions, reducer } = meetingCreationSlice
// Extract and export each action creator by name
export const { storeDates, storeStartTime, storeEndTime, storeMeetingName, resetAddMeeting } = actions
// Export the reducer, either as a default or named export
export default reducer