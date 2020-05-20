import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  //setting state
  const [degreeList, setDegreeList] = useState([]);

  const stanfordUrl = "https://registree-coding-challenge.glitch.me/stanford";
  const cornellUrl = "https://registree-coding-challenge.glitch.me/cornell";

  return (
    <div className="App">
      <h1>Degree Data</h1>
    </div>
  );
}

export default App;
