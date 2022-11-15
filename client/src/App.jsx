import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Users from "./users/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import NotFound from "./shared/Pages/NotFound";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import "./App.css";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);

  console.log(token);

  function logIn(uid, token) {
    setUserId(uid);
    setToken(token);
  }

  function logOut() {
    setToken(null);
    setUserId(null);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, logIn, logOut, userId }} // !!token => token is undefined/null means false and token is defined means true
    >
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
    </AuthContext.Provider>
  );
}

export default App;
