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
         state.userId = action.payload.uid;
         state.isLoggedIn = true;

         const expirationDate = action.payload?.expirationDate || null;
         // generating tokenExpiryDateStamp which will be current timestamp + 1 hour.
         const tokenExpiryDateStamp =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
         state.tokenExpirationDate = tokenExpiryDateStamp;
         // saving token and uid to localStorage for automatic authentication as long as the token doesn't expire which is 1 hour.
         // localstorage can only store text/number value thus converting the object to string before saving.
         localStorage.setItem(
            "userData", //key
            JSON.stringify({
               //value
               userId: action.payload.uid,
               token: action.payload.token,
               expiration: tokenExpiryDateStamp.toISOString(),
            }) // date.toISOString => converts a date into string
         );
      },
      logOut(state, action) {
         state.token = null;
         state.tokenExpirationDate = null;
         state.isLoggedIn = false;
         localStorage.removeItem("userData"); // clearing localstorage if user logs out
      },
   },
});

export const authActions = authSlice.actions;
export default authSlice;
