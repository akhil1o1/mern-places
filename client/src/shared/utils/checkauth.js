import { loginUser, logOutUser } from "../../store/auth-actions";

export function checkStoredUserData(dispatch) {
   const storedUserData = JSON.parse(localStorage.getItem("userData")); //JSON.parse => parses json string back to a javascript object.
   if (
      storedUserData &&
      storedUserData.token &&
      new Date(storedUserData.expiration) > new Date() // => if expiration date timestamp is greater than current timestamp
   ) {
      dispatch(
         loginUser({
            // logging in user automatically
            userId: storedUserData.userId,
            token: storedUserData.token,
            expirationDate: new Date(storedUserData.expiration),
         })
      );
   }
}

export function handleTokenExpiration(
   dispatch,
   token,
   tokenExpirationDate,
   logOutTimer
) {
   if (token && tokenExpirationDate) {
      const remainingTime =
         new Date(tokenExpirationDate).getTime() - new Date().getTime(); // remaining time for token expiration in milli seconds
      console.log("remainingTime", remainingTime);
      logOutTimer = setTimeout(() => dispatch(logOutUser()), remainingTime);
   } else {
      clearTimeout(logOutTimer); //use effect cleanup function
   }
}
