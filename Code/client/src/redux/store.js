import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import reloadReducer from './reloadSlice'

export default configureStore({
    reducer: {
        admin: adminReducer,
        reload: reloadReducer
    },
});