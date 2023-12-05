import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        adminInfo: {
            name: "",
            email: "",
            photoURL: "",
        }
    },
    reducers: {
        update: (state, action) => {
            state.adminInfo.name = action.payload.name;
            state.adminInfo.email = action.payload.email;
            state.adminInfo.photoURL = action.payload.photoURL;
        },
    },
});

export const { update } = adminSlice.actions;

export default adminSlice.reducer;