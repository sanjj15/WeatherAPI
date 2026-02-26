import { useState } from "react";
import { fetchCurrentWeather } from "../services/weatherService";

function CurrentWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const data = await fetchCurrentWeather(city);
      setWeather(data);
      setError("");
    } catch (err) {
  console.log(err);   
  setError("City not found");
  setWeather(null);
}
  };

  return (
    <div className="card">
      <h2>🌤 Live Weather</h2>

      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="result">
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;