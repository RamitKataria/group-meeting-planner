import { createSlice } from "@reduxjs/toolkit"

const init = {
  "meeting-name": "",
  "meeting-description": "",
  "dates": [],
  "start-time": 9,
  "end-time": 17
}

const meetingDatesSlice = createSlice({
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
          "start-time": action.payload,
        }
      },
      storeEndTime(state, action) {
        return {
          ...state,
          "end-time": action.payload,
        }
      },
      storeMeetingName(state, action) {
        return {
          ...state,
          "meeting-name": action.payload,
        }
      }
    },
  })

// Extract the action creators object and the reducer
const { actions, reducer } = meetingDatesSlice
// Extract and export each action creator by name
export const { storeDates, storeStartTime, storeEndTime, storeMeetingName } = actions
// Export the reducer, either as a default or named export
export default reducer