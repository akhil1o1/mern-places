import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Users from "./users/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import NotFound from "./shared/Pages/NotFound";
import UpdatePlace from "./places/pages/UpdatePlace";
import './App.css';


function App() {
  return (<Router>
  <MainNavigation/>
  <main>
    <Routes>
      <Route path="/" element={<Users/>}/>
      <Route path="/places/new" element={<NewPlace/>}/>
      <Route path="/:userId/places" element={<UserPlaces/>} />
      <Route path="/places/:placeId" element={<UpdatePlace/>}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </main>
  </Router>
  );
}

export default App;
