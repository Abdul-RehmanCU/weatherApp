import React, { useState } from "react";
import Script from "react-load-script";
import PlacesAutocomplete from "react-places-autocomplete";

function SearchBar({ fetchWeather }) {
  const [city, setCity] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
  };

  const handleScriptError = () => {
    console.error("Failed to load Google Maps script.");
  };

  const handleSelect = async (address) => {
    setCity(address);
    fetchWeather(address); // Call the weather function with the selected address
    setCity(""); // Clear the input after selection
  };

  return (
    <>
      {/* Load Google Maps JavaScript API */}
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />

      <div className="flex justify-center items-center mt-6">
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg px-4 py-4 w-full max-w-md">
          {isScriptLoaded ? (
            <PlacesAutocomplete
              value={city}
              onChange={setCity}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className="w-full">
                  <input
                    {...getInputProps({
                      placeholder: "Enter city name...",
                      className:
                        "w-full px-4 py-2 border rounded-full text-gray-700 text-sm focus:outline-none",
                    })}
                  />
                  <div className="mt-2 shadow-lg bg-white rounded-lg">
                    {loading && (
                      <div className="px-4 py-2 text-gray-500">Loading...</div>
                    )}
                    {suggestions.map((suggestion, index) => {
                      const className = suggestion.active
                        ? "bg-blue-100 cursor-pointer px-4 py-2"
                        : "cursor-pointer px-4 py-2";
                      return (
                        <div
                          key={index}
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          ) : (
            <div>Loading Google Maps API...</div>
          )}
          <button
            onClick={() => city.trim() && fetchWeather(city)}
            className="mt-4 bg-blue-500 text-white text-sm font-medium rounded-full px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
