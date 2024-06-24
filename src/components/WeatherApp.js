// WeatherApp.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./WeatherApp.css";
library.add(fas);

const WeatherApp = () => {
  const msToKmPerHour = (x) => x * 3.6;
  const [search, setSearch] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const [weather, setWeather] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [currentFavouriteIndex, setCurrentFavouriteIndex] = useState(0);
  
  const api = {
    key: "b616c6aa3c56788fcbd0e5aa0dbc47fe",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  
  const searchPressed = () => {
    fetch(api.base + "weather?q=" + search + "&units=metric&APPID=" + api.key)
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        setWeather(result);
      });
      setIsSearchExpanded(true);
  };

  const quoteReplacer = () => {
    switch (weather.weather[0].main) {
      case "Clouds":
        return "Very cloudy, I wouldn't go outside!";
      case "Clear":
        return "Clear weather, still be cautious";
      case "Sunny":
        return "Suns out, guns out!";
      default:
        return "Suns out, guns out!";
    }
  };

  const addToFavourites = () => {
    if (
      weather &&
      !favourites.some(function (fav) {
        return fav.id === weather.id;
      })
    ) {
      setFavourites(favourites.concat([weather]));
      setCurrentFavouriteIndex(favourites.length);
    }
  };

  const removeFavourite = (favouriteId) => {
    const updatedFavourites = favourites.filter(function (fav) {
      return fav.id !== favouriteId;
    });

    setFavourites(updatedFavourites);

    if (currentFavouriteIndex >= updatedFavourites.length) {
      setCurrentFavouriteIndex(Math.max(0, updatedFavourites.length - 1));
    }
  };

  const navigateFavourite = (direction) => {
    const newIndex =
      (currentFavouriteIndex + direction + favourites.length) %
      favourites.length;
    setCurrentFavouriteIndex(newIndex);
  };

  const getFormattedDate = () => {
    const currentDate = new Date();
    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(currentDate);
    const dayOfMonth = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
    }).format(currentDate);
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      currentDate
    );

    return `${dayOfWeek} - ${dayOfMonth} ${month}`;
  };

  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <h1>Weather App☁️</h1>
        </div>

          {/* Search Button */}
        <div className="search-container">
          {!isSearchExpanded && (
            <button onClick={() => setIsSearchExpanded(true)}>
              <FontAwesomeIcon icon="search"/>
            </button>
          )}
          {isSearchExpanded && (
            <>
              <input
                type="text"
                placeholder="Enter location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={() => { searchPressed(); setIsSearchExpanded(false); }}>
                <FontAwesomeIcon icon="search"/> 
              </button>
            </>
          )}
        </div>
      </div>

      {/* Weather Info Box */}
      {weather && typeof weather.main !== "undefined" ? (
        <div className="weather-info-box">
          <h2>
          <FontAwesomeIcon icon="location-dot"/> {weather.name}</h2>
          <h3>{getFormattedDate()}</h3>
          <div className="temp">
            <p>{weather.main.temp.toFixed(0)} C°</p>
          </div>
          <div className="weather-info-data">
            <h3>{quoteReplacer()}</h3>
            <h3>
              {weather.main.temp_min.toFixed(0)}C° -{" "}
              {weather.main.temp_max.toFixed(0)}C°
            </h3>
            <h4>Wind {msToKmPerHour(weather.wind.speed).toFixed(0)} km/h </h4>
            {weather.rain && weather.rain['1h'] !== undefined && (
              <h4>Precipitation {weather.rain['1h']}mm </h4>
            )}
            <h4>Hourly </h4>
          </div>

          <div className="favourite-button">
            <button onClick={addToFavourites}>Add to Favourites🌟</button>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Favourites Box */}
      {favourites.length > 0 && (
        <div className="favourites-box">
          <h2>Favourites🌟</h2>
          <div>
            <button onClick={() => navigateFavourite(-1)}>⬅️ Prev</button>
            <button onClick={() => navigateFavourite(1)}>Next ➡️</button>
          </div>
          <div
            key={favourites[currentFavouriteIndex].id}
            className="weather-info-box"
          >
            <p>{getFormattedDate()}</p>
            <p>{favourites[currentFavouriteIndex].name}</p>
            <p> {favourites[currentFavouriteIndex].main.temp} C°</p>
            <p>{favourites[currentFavouriteIndex].weather[0].main}</p>
            <p>{favourites[currentFavouriteIndex].weather[0].description}</p>
            <button
              onClick={() =>
                removeFavourite(favourites[currentFavouriteIndex].id)
              }
            >
              Remove from Favourites
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
