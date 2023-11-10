import { useState, useEffect, useCallback } from "react";

let logOutTimer;

export const useAuth = () => {
   const [token, setToken] = useState(false);
   const [userId, setUserId] = useState(null);
   const [tokenExpirationDate, setTokenExpirationDate] = useState();

   const logIn = useCallback((uid, token, expirationDate) => {
      setUserId(uid);
      setToken(token);

      // generating tokenExpiryDateStamp which will be current timestamp + 1 hour.
      const tokenExpiryDateStamp =
         expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpiryDateStamp);
      // saving token and uid to localStorage for automatic authentication as long as the token doesn't expire which is 1 hour.
      // localstorage can only store text/number value thus converting the object to string before saving.
      localStorage.setItem(
         "userData", //key
         JSON.stringify({
            //value
            userId: uid,
            token: token,
            expiration: tokenExpiryDateStamp.toISOString(),
         }) // date.toISOString => converts a date into string
      );
   }, []);

   const logOut = useCallback(() => {
      setToken(null);
      setUserId(null);
      setTokenExpirationDate(null);
      localStorage.removeItem("userData"); // clearing localstorage if user logs out
   }, []);

   useEffect(() => {
      const storedUserData = JSON.parse(localStorage.getItem("userData")); //JSON.parse => parses json string to back to a javascript object.
      if (
         storedUserData &&
         storedUserData.token &&
         new Date(storedUserData.expiration) > new Date() // => if expiration date timestamp is greater than current timestamp
      ) {
         logIn(
            storedUserData.userId,
            storedUserData.token,
            new Date(storedUserData.expiration)
         ); // logging in user automatically
      }
   }, [logIn]);

   useEffect(() => {
      if (token && tokenExpirationDate) {
         const remainingTime =
            tokenExpirationDate.getTime() - new Date().getTime(); // remaining time for token expiration in milli seconds
         logOutTimer = setTimeout(logOut, remainingTime);
      } else {
         clearTimeout(logOutTimer);
      }
   }, [token, tokenExpirationDate, logOut]);

   return { token, logIn, logOut, userId };
};
