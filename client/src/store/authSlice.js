import { createSlice } from "@reduxjs/toolkit";

// import { useAuth } from "../shared/hooks/auth-hook";

// isLoggedIn: false,
//     token: null,
//     userId: null,
//     logIn : () => {},
//     logOut : () => {}

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
      login(state, action) {
         state.isLoggedIn = true;
         state.token = action.payload.token;
         state.userId = action.payload.uid;

         const expirationDate = action.payload.expirationDate;
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
      logout(state, action) {
         state.isLoggedIn = false;
         state.token = null;
         state.tokenExpirationDate = null;

         localStorage.removeItem("userData"); // clearing localstorage if user logs out
      },
   },
});

export const authActions = authSlice.actions;
export default authSlice;
