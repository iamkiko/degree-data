import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  //setting state
  const [degreeList, setDegreeList] = useState([]);

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const stanfordUrl = "https://registree-coding-challenge.glitch.me/stanford";
  const cornellUrl = "https://registree-coding-challenge.glitch.me/cornell";

  let responseData = [];

  fetch(proxyUrl + stanfordUrl)
    .then((r) => {
      const contentType = r.headers["Content-Type"];
      if (contentType === "application/json") {
        return r.json();
      } else {
        return r.text();
      }
    })
    .then((data) => (responseData = data));
  // .then(() => console.log("responseData", responseData));

  console.log("response data:", responseData);

  return (
    <div className="App">
      <h1>Degree Data</h1>
    </div>
  );
}

export default App;
