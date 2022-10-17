import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import './App.css';


function App() {
  return (<Router>
    <Routes>
      <Route path="/" element={<Users/>}/>
      <Route path="/places/new" element={<NewPlaces/>}/>
    </Routes>
  </Router>
  );
}

export default App;
