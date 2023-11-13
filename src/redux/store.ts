import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "~/components/Auth/AuthSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
});

export default store;
