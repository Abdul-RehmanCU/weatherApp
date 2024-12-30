import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: apiKey,
            units: "metric",
          },
        }
      );
  
      console.log(response.data); 
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setWeatherData(null); 
      setError("City not found. Please try again.");
      console.error("Error fetching weather data:", err);
    }
  };
  
  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchBar fetchWeather={fetchWeather} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
