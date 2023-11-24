import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isLoggedIn: false,
   userId: null,
   token: null,
   tokenExpirationDate: null,
};

const authSlice = createSlice({
   name: "authentication",
   initialState: initialState,
   reducers: {
      logIn(state, action) {
         state.token = action.payload.token;
         state.userId = action.payload.userId;
         state.isLoggedIn = true;
         state.tokenExpirationDate = action.payload.expirationDate;
      },
      logOut(state) {
         state.token = null;
         state.tokenExpirationDate = null;
         state.isLoggedIn = false;
         state.userId = null;
      },
   },
});

export const authActions = authSlice.actions;
export default authSlice;
