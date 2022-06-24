import { configureStore } from '@reduxjs/toolkit';
import meetingsReducer from './meetings/reducer';

export const store = configureStore({
  reducer: {
    meetings: meetingsReducer
  },
  devTools: true
});
