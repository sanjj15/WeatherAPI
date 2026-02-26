import "./App.css";
import CurrentWeather from "./components/CurrentWeather";
import PastWeather from "./components/PastWeather";

function App() {
  return (
    <div>
      <h1>🌦 Weather Dashboard</h1>
      <CurrentWeather />
      <PastWeather />
    </div>
  );
}

export default App;