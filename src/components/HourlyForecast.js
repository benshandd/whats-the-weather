import React from "react";
import { get12HourTime } from "../utils";

const weatherCodeToDescription = {
  1000: "Clear",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  1001: "Cloudy",
};

const HourlyForecast = ({hourlyData}) => {
  if (!hourlyData) {
    return <div className="hourly-forecast no-data">No hourly data available.</div>;
  }

  const twelveHourData = hourlyData.slice(0, 12);
  const isHot = hourlyData.some(hour => hour.values.temperature > 29);

  return (
    <div className={`hourly-forecast ${isHot ? "hot" : "cool"}`}>
      <h2>Hourly</h2>
      <div className="hourly-block">
        {twelveHourData.map((hour, index) => {
          const { temperature, precipitationProbability, weatherCode } = hour.values;
          const weatherCondition = weatherCodeToDescription[weatherCode] || "Unknown";
          return (
            <div key={index} className="hour">
              <span className="hour-time">{get12HourTime(hour.startTime)}</span>
              <span className="hour-condition">{weatherCondition}</span>
              <span className="hour-precipitation">• {parseInt(precipitationProbability)}%</span>
              <span className="hour-temp">{temperature.toFixed(0)}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
