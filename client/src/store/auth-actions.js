import { authActions } from "./authSlice";

const { logIn, logOut } = authActions;

export function loginUser(userData) {
   return (dispatch) => {
      const { token, userId, expirationDate } = userData;

      // generating tokenExpiryDateStamp which will be current timestamp + 1 hour.
      const tokenExpiryDateStamp =
         expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

      dispatch(
         logIn({
            token: token,
            userId: userId,
            expirationDate: tokenExpiryDateStamp.toISOString(),
         })
      );
      // saving token and userId to localStorage for automatic authentication as long as the token doesn't expire which is 1 hour.
      // localstorage can only store text/number value thus converting the object to string before saving.
      localStorage.setItem(
         "userData",
         JSON.stringify({
            userId: userId,
            token: token,
            expiration: tokenExpiryDateStamp.toISOString(),
         })
      );
   };
}

export function logOutUser() {
   return (dispatch) => {
      dispatch(logOut());
      localStorage.removeItem("userData"); // clearing localstorage if user logs out
   };
}
