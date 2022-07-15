import { configureStore } from '@reduxjs/toolkit';
import meetingsReducer from './meetings/reducer';
import usersReducer from './users/reducer';
import meetingCreation from './meetingCreation';
import availabilityReducer from "./availability";

export const store = configureStore({
  reducer: {
    meetingsReducer: meetingsReducer,
    meetingCreation: meetingCreation,
    usersReducer: usersReducer,
    availability: availabilityReducer
  },
  devTools: true
});
