// src/App.js
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
} from "recharts";

function App() {
  // State for datasets
  const [historical, setHistorical] = useState([]);
  const [changePoints, setChangePoints] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch historical prices
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/historical")
      .then((res) => res.json())
      .then((data) => setHistorical(data))
      .catch((err) => console.error("Error fetching historical:", err));
  }, []);

  // Fetch change points
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/change_points")
      .then((res) => res.json())
      .then((data) => setChangePoints(data))
      .catch((err) => console.error("Error fetching change points:", err));
  }, []);

  // Fetch events
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/event_correlations")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Filter data by date (robust for partial date inputs)
  const filteredHistorical = historical.filter((d) => {
    const date = new Date(d.Date);

    if (startDate && !endDate) {
      return date >= new Date(startDate);
    }

    if (!startDate && endDate) {
      return date <= new Date(endDate);
    }

    if (startDate && endDate) {
      return date >= new Date(startDate) && date <= new Date(endDate);
    }

    return true; // if neither date is set
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Brent Oil Dashboard</h1>

      {/* Date filters */}
      <div style={{ marginBottom: "20px" }}>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label style={{ marginLeft: "20px" }}>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Historical Price Chart */}
      <h2>Historical Prices</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredHistorical}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Price" stroke="#8884d8" dot={false} />

          {/* Highlight change points */}
          {changePoints.map((cp, index) => (
            <Scatter
              key={`cp-${index}`}
              data={[{ Date: cp.Date, Price: cp.Price }]}
              fill="red"
              line={false}
            />
          ))}

          {/* Highlight events */}
          {events.map((ev, index) => (
            <Scatter
              key={`ev-${index}`}
              data={[{ Date: ev.Date, Price: ev.Price }]}
              fill="green"
              line={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <p style={{ marginTop: "10px" }}>
        <span style={{ color: "red" }}>Red dots</span> = Change Points,{" "}
        <span style={{ color: "green" }}>Green dots</span> = Events
      </p>
    </div>
  );
}

export default App;
