import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./App.css";

function App() {
  //setting state
  const [stanford, setStanford] = useState(null);
  const [cornell, setCornell] = useState(null);
  const [fetching, setFetching] = useState(false);

  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const stanfordUrl = "https://registree-coding-challenge.glitch.me/stanford";
  const cornellUrl = "https://registree-coding-challenge.glitch.me/cornell";

  // const fetchStanford = () => fetch(stanfordUrl).then((r) => r.json());
  // const fetchCornell = () => fetch(cornellUrl).then((r) => r.json());

  const fetchStanford = () =>
    fetch("/stanford").then((r) => {
      const contentType = r.headers["Content-Type"];
      if (contentType === "application/json") {
        return r.json();
      } else {
        return r.text();
      }
    });

  const fetchCornell = () =>
    fetch("/cornell").then((r) => {
      const contentType = r.headers["Content-Type"];
      if (contentType === "application/json") {
        return r.json();
      } else {
        return r.text();
      }
    });

  useEffect(() => {
    if (!fetching && !stanford && !cornell) {
      setFetching(true);

      Promise.all([fetchStanford(), fetchCornell()]).then((results) => {
        console.log("results in useEffect", results);
        setFetching(false);
        setStanford(results[0]);
        setCornell(results[1]);
      });
    }
  }, [fetching, setFetching, setStanford, setCornell]);

  const allData = [...stanford, ...cornell];

  console.log("allData", allData);

  return (
    <div className="App">
      <h1>Degree Data</h1>
    </div>
  );
}

export default App;
