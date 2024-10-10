import React, { useEffect, useState } from "react";
import Header from "./component/Header";
import Board from "./component/Board";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem("groupBy") || "status"
  ); // Persist groupBy state
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "priority"
  ); // Persist sortBy state

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Save the view state in local storage
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="App">
      <Header
        setGroupBy={setGroupBy}
        setSortBy={setSortBy}
        groupBy={groupBy}
        sortBy={sortBy}
      />
      <Board
        tickets={tickets}
        users={users}
        groupBy={groupBy}
        sortBy={sortBy}
      />
    </div>
  );
}

export default App;
