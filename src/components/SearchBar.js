import React, { useState } from "react";

function SearchBar({ fetchWeather }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-grow text-gray-700 text-sm focus:outline-none px-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white text-sm font-medium rounded-full px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
