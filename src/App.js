import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  //setting state
  const [stanford, setStanford] = useState(null);
  const [cornell, setCornell] = useState(null);
  const [fetching, setFetching] = useState(false);

  const fetchStanford = () =>
    fetch("/stanford")
      .then((r) => {
        return r.json();
      })
      .catch((e) => console.error(e));

  const fetchCornell = () =>
    fetch("/cornell")
      .then((r) => {
        return r.json();
      })
      .catch((e) => console.error(e));

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
  }, [fetching, setFetching, setStanford, setCornell, stanford, cornell]);

  let allData = [];

  if (typeof stanford === "object" && stanford) {
    allData = [...stanford];
  }

  if (typeof cornell === "object" && cornell) {
    allData = [...allData, ...cornell];
  }

  return (
    <div className="App">
      <h1>Degree Data</h1>
      {allData &&
        allData.map((degree) => (
          <span>
            {degree.name} - {degree.level} - {degree.duration} - {degree.code}
          </span>
        ))}
    </div>
  );
}

export default App;
