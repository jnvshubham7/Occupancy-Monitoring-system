import { createSlice } from "@reduxjs/toolkit";

export const reloadSlice = createSlice({
    name: "reload",
    initialState: {
        reloadFlag: false
    },
    reducers: {
        forceReload: (state, action) => {
            state.reloadFlag = action.payload.reloadFlag;
        },
    },
});

export const { forceReload } = reloadSlice.actions;

export default reloadSlice.reducer;