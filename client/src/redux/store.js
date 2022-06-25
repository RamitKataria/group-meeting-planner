import { configureStore } from '@reduxjs/toolkit';
import datesPicked from '../reducers/datesPicked';
import meetingCreation from './meetingCreation';

const store = configureStore({
    reducer: {
        meetingCreation
    },
    devTools: true
});
console.log(store.getState())

export default store;