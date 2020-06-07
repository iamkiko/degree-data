import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Search from "./components/Search";

function App() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  //setting state
  const [stanford, setStanford] = useState(null);
  const [cornell, setCornell] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);

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
      setIsLoading(true);

      Promise.all([fetchStanford(), fetchCornell()]).then((results) => {
        setFetching(false);
        setIsLoading(false);
        setStanford(
          results[0]?.map((degree) => ({ ...degree, school: "Stanford" }))
        );
        setCornell(
          results[1]?.map((degree) => ({ ...degree, school: "Cornell" }))
        );
      });
    }
  }, [
    isLoading,
    setIsLoading,
    fetching,
    setFetching,
    setStanford,
    setCornell,
    stanford,
    cornell,
  ]);

  //declare array to push both API returns in to
  let allData = [];

  if (typeof stanford === "object" && stanford) {
    allData = [...stanford];
  }

  if (typeof cornell === "object" && cornell) {
    allData = [...allData, ...cornell];
  }

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

  // Sorted data array for iterating and displaying
  const sortedData = allData.sort(compare);

  // Handler function for search query for specific degree
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  //filter/search function
  const filteredDegrees = allData.filter((degree) =>
    degree.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleChecked = (event) => {
    setSelected([[...selected, event.target.value]]);
  };

  const showResults = () =>
    console.table(`You have selected: 
${selected} 
`);

  return (
    <div className="App">
      <h1>Degree Data</h1>
      {isLoading ? (
        <div>
          Our minions have set off to find the information you are after! Please
          be patient...
          <br />
          <br />
          <br />
          <CircularProgress color="secondary" />
          <br />
          <br />
        </div>
      ) : (
        <>
          <Search handleSearch={handleSearch} query={query} />
          <h3>
            Please select the relevant degrees to be output to the console.
          </h3>
          <Button variant="contained" color="primary" onClick={showResults}>
            Log selected degrees to the console
          </Button>
        </>
      )}
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Level</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right">University</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData &&
              filteredDegrees.map((degree) => (
                <TableRow key={degree.code + degree.school}>
                  <TableCell>
                    <Checkbox
                      onChange={handleChecked}
                      value={` Code: ${degree.code} - ${degree.school}`}
                    />
                  </TableCell>
                  <TableCell>{degree.name}</TableCell>
                  <TableCell align="right">{degree.level}</TableCell>
                  <TableCell align="right">{degree.duration} </TableCell>
                  <TableCell align="right">{degree.code}</TableCell>
                  <TableCell align="right"> {degree.school}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default App;
