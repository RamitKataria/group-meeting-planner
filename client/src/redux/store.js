import { configureStore } from '@reduxjs/toolkit';
import meetingsReducer from './meetings/reducer';
import usersReducer from './users/reducer';
import meetingCreation from './meetingCreation';
import meetingInfo from './availabilityPage';

export const store = configureStore({
  reducer: {
    meetingsReducer: meetingsReducer,
    meetingCreation: meetingCreation,
    meetingInfo: meetingInfo,
    usersReducer: usersReducer
  },
  devTools: true
});
