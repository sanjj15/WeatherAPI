import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = `af77c83719eb150028a64e1d21b5a07c`; 

export const fetchCurrentWeather = async (city) => {
  const response = await axios.get(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};