import { useEffect, useState } from "react";
import Papa from "papaparse";

function PastWeather() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  
  useEffect(() => {
  fetch("/testset.csv")
    .then((res) => res.text())
    .then((text) => {
      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(), // 🔥 THIS FIXES IT
      });

      setData(parsed.data);
    });
}, []);

const handleSearch = () => {
  setError("");
  setResult(null);

  if (!selectedDate) {
    setError("Please select a date.");
    return;
  }

  const formattedDate = selectedDate.replaceAll("-", "");

  const match = data.find((item) => {
    if (!item.datetime_utc) return false;

    const csvDate = item.datetime_utc.split("-")[0];

    return csvDate === formattedDate;
  });

  if (match) {
    setResult(match);
  } else {
    setError("No data found for this date.");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Past Weather Data</h2>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
        Search
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Weather Details</h3>
          <p>Date & Time: {result.datetime_utc}</p>
          <p>Condition: {result._conds}</p>
          <p>Temperature: {result._tempm}°C</p>
          <p>Humidity: {result._hum}%</p>
          <p>Pressure: {result._pressurem} hPa</p>
          <p>Wind Speed: {result._wspdm} km/h</p>
          <p>Visibility: {result._vism} km</p>
        </div>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
      )}
    </div>
  );
}

export default PastWeather;