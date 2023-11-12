import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "auth",
  initialState: {
    checkLogin: false,
  },
  reducers: {
    login: (state) => {
      console.log(state);
      state.checkLogin = true;
    },
  },
});
