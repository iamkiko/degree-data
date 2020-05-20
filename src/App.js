import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  //setting state
  const [stanford, setStanford] = useState(null);
  const [cornell, setCornell] = useState(null);
  const [fetching, setFetching] = useState(false);

  //fetch calls
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

  //useEffect to render correct info when anything changes
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

  //declare array to push both API returns in to
  let allData = [];

  if (typeof stanford === "object" && stanford) {
    allData = [...stanford];
  }

  if (typeof cornell === "object" && cornell) {
    allData = [...allData, ...cornell];
  }

  console.log("allData:", allData);

  // sort the data
  const compare = (a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    let comparison = 0;

    if (nameA > nameB) {
      comparison = -1;
    } else if (nameA < nameB) {
      comparison = 1;
    }
    return comparison * -1;
  };
  const sortedData = allData.sort(compare);

  return (
    <div className="App">
      <h1>Degree Data</h1>
      {sortedData &&
        sortedData.map((degree) => (
          <div>
            {degree.name} - {degree.level} - {degree.duration} - {degree.code}
          </div>
        ))}
    </div>
  );
}

export default App;
