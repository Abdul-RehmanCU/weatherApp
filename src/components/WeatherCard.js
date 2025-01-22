import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function WeatherCard({ data, fetchWeather }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    // Load saved cities from localStorage on component mount
    const cities = JSON.parse(localStorage.getItem("savedCities")) || [];
    setSavedCities(cities);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const saveCity = () => {
    if (!data || !data.name) return;

    if (!savedCities.includes(data.name)) {
      const newCities = [...savedCities, data.name];
      setSavedCities(newCities);
      localStorage.setItem("savedCities", JSON.stringify(newCities));
    }
  };

  const removeCity = (city) => {
    const newCities = savedCities.filter((c) => c !== city);
    setSavedCities(newCities);
    localStorage.setItem("savedCities", JSON.stringify(newCities));
  };

  const isCitySaved = savedCities.includes(data?.name);
  const weatherIconUrl = `https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`;

  return (
    <div>
      {/* Weather Card */}
      <div
        className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">{data?.name}</h2>
            {data?.weather && (
              <img
                src={weatherIconUrl}
                alt={data?.weather[0]?.description}
                className="w-12 h-12"
              />
            )}
          </div>
          <p className="text-gray-500 text-sm capitalize">
            {data?.weather?.[0]?.description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-gray-800 font-bold text-lg">
                {data?.main?.temp}°C
              </p>
              <p className="text-gray-500 text-sm">Temperature</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold text-lg">
                {data?.main?.humidity}%
              </p>
              <p className="text-gray-500 text-sm">Humidity</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold text-lg">
                {data?.wind?.speed} m/s
              </p>
              <p className="text-gray-500 text-sm">Wind Speed</p>
            </div>
          </div>
          {isExpanded && (
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-800 font-bold text-lg">
                    {data?.main?.feels_like}°C
                  </p>
                  <p className="text-gray-500 text-sm">Feels Like</p>
                </div>
                <div>
                  <p className="text-gray-800 font-bold text-lg">
                    {data?.main?.pressure} hPa
                  </p>
                  <p className="text-gray-500 text-sm">Pressure</p>
                </div>
                <div>
                  <p className="text-gray-800 font-bold text-lg">
                    {data?.visibility / 1000} km
                  </p>
                  <p className="text-gray-500 text-sm">Visibility</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-800 font-medium text-sm">
                  Sunrise:{" "}
                  {new Date(data?.sys?.sunrise * 1000).toLocaleTimeString()}
                </p>
                <p className="text-gray-800 font-medium text-sm">
                  Sunset:{" "}
                  {new Date(data?.sys?.sunset * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="bg-blue-500 px-6 py-4 text-center">
          <p className="text-white text-sm">
            {isExpanded ? "Click to collapse" : `Click to expand`}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isCitySaved) saveCity();
            }}
            className={`mt-2 px-4 py-2 rounded-full ${
              isCitySaved
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
            disabled={isCitySaved}
          >
            {isCitySaved ? "Saved" : "Save City"}
          </button>
        </div>
      </div>

      {/* Saved Cities Section */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-gray-800">Saved Cities</h3>
        <ul className="mt-4">
          {savedCities.map((city) => (
            <li
              key={city}
              className="flex justify-between items-center bg-gray-100 rounded-md p-2 mt-2"
            >
              <span>{city}</span>
              <div className="flex">
                <button
                  onClick={() => fetchWeather(city)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Fetch Weather
                </button>
                <button
                  onClick={() => removeCity(city)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Default Prop for fetchWeather to avoid errors
WeatherCard.defaultProps = {
  fetchWeather: () => console.log("fetchWeather is not implemented."),
};

// Prop validation
WeatherCard.propTypes = {
  data: PropTypes.object.isRequired,
  fetchWeather: PropTypes.func,
};

export default WeatherCard;
