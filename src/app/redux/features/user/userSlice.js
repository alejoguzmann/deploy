"use client";

import { createSlice } from "@reduxjs/toolkit";
const obj = {
  logedInUser: typeof window !== "undefined"? JSON.parse(localStorage.getItem("user")) : {},
  fireBaseUser: typeof window !== "undefined"? JSON.parse(localStorage.getItem("fireBaseUser")) : {},
}
const initialState = {
  logedInUser: obj.logedInUser,
  fireBaseUser: obj.fireBaseUser,
};

// if (typeof window !== "undefined") {
//   initialState.logedInUser = JSON.parse(localStorage.getItem("user")) || {};
//   initialState.fireBaseUser = JSON.parse(localStorage.getItem("fireBaseUser")) || {};
// }

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.logedInUser = action.payload;
    },
    cleanUser: (state) => {
      state.logedInUser = {};
    },
    getFirebaseInfo: (state, action) => {
      state.fireBaseUser = action.payload;
    },
    cleanFireBaseInfo: (state) => {
      state.fireBaseUser = {};
    },
    getUserPosts: (state, action) => {
      state.logedInUser.publications = action.payload;
    },
  },
});

export const {
  getUser,
  cleanUser,
  getFirebaseInfo,
  cleanFireBaseInfo,
  getUserPosts,
} = userSlice.actions;

export default userSlice.reducer;
