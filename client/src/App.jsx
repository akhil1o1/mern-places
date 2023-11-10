import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Users from "./users/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import NotFound from "./shared/Pages/NotFound";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { authActions } from "./store/authSlice";
import "./App.css";

let logOutTimer;

function App() {
   const authState = useSelector((state) => {
      console.log(state);
      return state;
   });
   const { token, tokenExpirationDate } = authState;
   
   const dispatch = useDispatch();
   const { logIn, logOut } = authActions;

   useEffect(() => {
      const storedUserData = JSON.parse(localStorage.getItem("userData")); //JSON.parse => parses json string to back to a javascript object.
      if (
         storedUserData &&
         storedUserData.token &&
         new Date(storedUserData.expiration) > new Date() // => if expiration date timestamp is greater than current timestamp
      ) {
         dispatch(
            logIn({
               uid: storedUserData.userId,
               token: storedUserData.token,
               expirationDate: new Date(storedUserData.expiration),
            })
         ); // logging in user automatically
      }
   }, [logIn, dispatch]);

   useEffect(() => {
      if (token && tokenExpirationDate) {
         const remainingTime =
            tokenExpirationDate.getTime() - new Date().getTime(); // remaining time for token expiration in milli seconds
         console.log("remainingTime", remainingTime);
         logOutTimer = setTimeout(dispatch(logOut()), remainingTime);
      } else {
         clearTimeout(logOutTimer);
      }
   }, [token, tokenExpirationDate, dispatch, logOut]);

   return (
      <Router>
         <MainNavigation />
         <main>
            <Routes>
               <Route path="/" element={<Users />} />
               <Route path="/places/new" element={<NewPlace />} />
               <Route path="/:userId/places" element={<UserPlaces />} />
               <Route path="/places/:placeId" element={<UpdatePlace />} />
               <Route path="/auth" element={<Auth />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </main>
      </Router>
   );
}

export default App;
