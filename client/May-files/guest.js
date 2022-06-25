import {createSlice} from "@reduxjs/toolkit";

export const guestSlice = createSlice({
    name: "guest",
    initialState: { value: []},
    reducers: {
        addGuest: (state, action) => {
                state.value.push(action.payload);
                /*localStorage.removeItem("guest");
                localStorage.setItem("guest",JSON.stringify(state.value));*/

        },

    },
});

export const { addGuest } = guestSlice.actions;
export default guestSlice.reducer;
