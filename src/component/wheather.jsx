import React, { useState, useEffect } from "react";
import axios from "axios";
import "./whearther.css";

function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = "44c8f58c6c824d5da3674938231811";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm.trim() !== "") {
          const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchTerm}`
          );
          console.log(response.data);
          setWeatherData(response.data);
        }
      } catch (error) {
        console.error(`Error fetching weather data for ${searchTerm}:`, error);
      }
    };

    fetchData();
  }, [apiKey, searchTerm]);

  const handleSearch = () => {
    setSearchTerm(searchTerm.trim());
  };

  return (
    <div className="weather">
      <div className="container">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter a country"
            className="input_1"
          />
          <button onClick={handleSearch} className="btn">
            Search
          </button>
        </div>

        {weatherData.current && (
          <div className="main">
            <h2>{weatherData.location.name}</h2>
            {weatherData.current.condition.icon && (
              <img
                src={weatherData.current.condition.icon}
                alt="Weather Icon"
                className="image"
              />
            )}
            <p>Temperature: {weatherData.current.temp_c} °C / {weatherData.current.temp_f} F</p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <p>Time : {weatherData.location.localtime}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
