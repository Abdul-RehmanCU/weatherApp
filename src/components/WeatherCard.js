import React from "react";

function WeatherCard({ data }) {
  if (!data || !data.weather || data.weather.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No weather data available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
        <p className="text-gray-500 text-sm capitalize">
          {data.weather[0].description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-gray-800 font-bold text-lg">
              {data.main.temp}°C
            </p>
            <p className="text-gray-500 text-sm">Temperature</p>
          </div>
          <div>
            <p className="text-gray-800 font-bold text-lg">
              {data.main.humidity}%
            </p>
            <p className="text-gray-500 text-sm">Humidity</p>
          </div>
          <div>
            <p className="text-gray-800 font-bold text-lg">
              {data.wind.speed} m/s
            </p>
            <p className="text-gray-500 text-sm">Wind Speed</p>
          </div>
        </div>
      </div>
      <div className="bg-blue-500 px-6 py-4 text-center">
        <p className="text-white text-sm">Enjoy your day in {data.name}!</p>
      </div>
    </div>
  );
}

export default WeatherCard;
