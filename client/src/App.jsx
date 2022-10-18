import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Users from "./users/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlaces from "./places/pages/NewPlaces";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import './App.css';


function App() {
  return (<Router>
  <MainNavigation/>
  <main>
    <Routes>
      <Route path="/" element={<Users/>}/>
      <Route path="/places/new" element={<NewPlaces/>}/>
      <Route path="/:userId/places" element={<UserPlaces/>} />
    </Routes>
    </main>
  </Router>
  );
}

export default App;
