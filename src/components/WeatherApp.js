import React, { useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [search, setSearch] = useState("");
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
  };

  const addToFavourites = () => {
    if (
      weather &&
      !favourites.some(function (fav) {
        return fav.id === weather.id;
      })
    ) {
      setFavourites(favourites.concat([weather]));
      setCurrentFavouriteIndex(favourites.length); // Set current index to the newly added favourite
    }
  };

  const removeFavourite = (favouriteId) => {
    // Use the filter method to create a new array excluding the favourite with the specified id
    const updatedFavourites = favourites.filter(function (fav) {
      return fav.id !== favouriteId;
    });

    // Update the 'favourites' state with the new array excluding the removed favourite
    setFavourites(updatedFavourites);

    // Adjust the current index when a favourite is removed
    if (currentFavouriteIndex >= updatedFavourites.length) {
      setCurrentFavouriteIndex(Math.max(0, updatedFavourites.length - 1));
    }
  };

  const navigateFavourite = (direction) => {
    const newIndex =
      (currentFavouriteIndex + direction + favourites.length) % favourites.length;
    setCurrentFavouriteIndex(newIndex);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App☁️</h1>
        <div>
          <input
            type="text"
            placeholder="Enter location..."
            onChange={function (e) {
              setSearch(e.target.value);
            }}
          />
          <button onClick={searchPressed}> Search🔎 </button>
          <button onClick={addToFavourites}> Add to Favourites🌟 </button>
        </div>

        {weather && typeof weather.main !== "undefined" ? (
          <div>
            <p>{weather.name}</p>
            <p> {weather.main.temp} C°</p>
            <p>{weather.weather[0].main}</p>
            <p>{weather.weather[0].description}</p>
          </div>
        ) : (
          ""
        )}

        {favourites.length > 0 && (
          <div>
            <h2>Favourites🌟</h2>
            <div>
              <button
                onClick={function () {
                  navigateFavourite(-1);
                }}
              >
                ⬅️ Prev
              </button>
              <button
                onClick={function () {
                  navigateFavourite(1);
                }}
              >
                Next ➡️
              </button>
            </div>
            <div key={favourites[currentFavouriteIndex].id}>
              <p>{favourites[currentFavouriteIndex].name}</p>
              <p> {favourites[currentFavouriteIndex].main.temp} C°</p>
              <p>{favourites[currentFavouriteIndex].weather[0].main}</p>
              <p>{favourites[currentFavouriteIndex].weather[0].description}</p>
              <button
                onClick={function () {
                  removeFavourite(favourites[currentFavouriteIndex].id);
                }}
              >
                Remove from Favourites
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default WeatherApp;
