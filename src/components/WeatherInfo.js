import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { msToKmPerHour, getFormattedDate } from "../utils";

const weatherCodeToDescription = {
  1000: "Clear",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  1001: "Cloudy",
};

const WeatherInfo = ({ weather, locationName }) => {
  if (!weather || !weather.values) {
    return <div>No weather data available</div>;
  }

  const quoteReplacer = (weatherCondition) => {
    switch (weatherCondition) {
      case "Cloudy":
        return "Very cloudy, I wouldn't go outside!";
      case "Clear":
        return "Clear weather, still be cautious";
      case "Mostly Clear":
      case "Partly Cloudy":
      case "Mostly Cloudy":
        return "A bit of clouds, but overall good weather.";
      default:
        return "Weather is unpredictable, stay prepared!";
    }
  };

  const { temperature, windSpeed, weatherCode } = weather.values;
  const weatherCondition = weatherCodeToDescription[weatherCode] || "Unknown";
  const isHot = temperature > 29;
  const formattedWindSpeed = msToKmPerHour(windSpeed);
  const weatherQuote = quoteReplacer(weatherCondition);

  return (
    <div className={`weather-info-box ${isHot ? "hot" : "cool"}`}>
      <h2>
        <FontAwesomeIcon icon="location-dot" /> {locationName}
      </h2>
      <h3>{getFormattedDate(weather.startTime)}</h3>
      <div className="temp">
        <p>{temperature.toFixed(0)}° C</p>
      </div>
      <div className="weather-info-data">
      <h4>{weatherQuote}</h4>
        <h4>Wind {formattedWindSpeed.toFixed(0)} km/h</h4>
      </div>
    </div>
  );
};

export default WeatherInfo;
