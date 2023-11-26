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
import {
   checkStoredUserData,
   handleTokenExpiration,
} from "./shared/utils/checkauth";
import "./App.css";

let logOutTimer;

function App() {
   const token = useSelector((state) => state.token);
   const tokenExpirationDate = useSelector(
      (state) => state.tokenExpirationDate
   );
   // console.table({ token, tokenExpirationDate });

   const dispatch = useDispatch();

   useEffect(() => checkStoredUserData(dispatch), [dispatch]);

   useEffect(
      () =>
         handleTokenExpiration(
            dispatch,
            token,
            tokenExpirationDate,
            logOutTimer
         ),
      [token, tokenExpirationDate, dispatch]
   );

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
