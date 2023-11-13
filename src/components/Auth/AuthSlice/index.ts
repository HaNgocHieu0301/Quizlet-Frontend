import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "auth",
  initialState: {
    checkLogin: false,
  },
  reducers: {
    login: (state) => {
      state.checkLogin = true;
    },
    logout: (state) => {
      state.checkLogin = false;
    },
  },
});
