import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function logIn() {
    setIsLoggedIn(true);
  }

  function logOut() {
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route
              path="/places/new"
              element={isLoggedIn ? <NewPlace /> : <Navigate to="/auth" />}
            />
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route
              path="/places/:placeId"
              element={isLoggedIn ? <UpdatePlace /> : <Navigate to="/auth" />}
            />
            <Route
              path="/auth"
              element={!isLoggedIn ? <Auth /> : <Navigate to="/" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
