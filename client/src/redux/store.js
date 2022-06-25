import { configureStore } from '@reduxjs/toolkit';
import meetingsReducer from './meetings/reducer';
import meetingCreation from './meetingCreation';

export const store = configureStore({
  reducer: {
    meetings: meetingsReducer,
    meetingCreation: meetingCreation
  },
  devTools: true
});
