import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../resources/style/global.css";
import "../resources/style/header.css";
import "../resources/style/weather-info.css";
import "../resources/style/side-menu.css";
import "../resources/style/settings.css";
import SearchBar from "./SearchBar";
import WeatherInfo from "./WeatherInfo";
import Favourites from "./Favourites";
import SideMenu from "./SideMenu";
import Settings from "./Settings";
import HourlyForecast from "./HourlyForecast";

library.add(fas, faBars, faTimes);

const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [locationName, setLocationName] = useState(""); 
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [weather, setWeather] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [currentFavouriteIndex, setCurrentFavouriteIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [currentPage, setCurrentPage] = useState("weather");

  const api = {
    key: "tnHGS6aU8GRCvnIx3ALsQqo40XOP1EpQ",
    base: "https://api.tomorrow.io/v4/",
  };

  const searchPressed = () => {
    setLocationName(search);
    const fields = "temperature,precipitationProbability,windSpeed,weatherCode"; 
    const url = `${
      api.base
    }timelines?location=${search}&fields=${fields}&timesteps=1h&units=${
      isCelsius ? "metric" : "imperial"
    }&apikey=${api.key}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data && data.data.timelines) {
          setWeather(data.data.timelines[0].intervals[0]); //Take first result
          setHourlyData(data.data.timelines[0].intervals);
        }
      });
    setIsSearchExpanded(true);
  };


  const addToFavourites = () => {
    if (weather && !favourites.some((fav) => fav.id === weather.id)) {
      setFavourites(favourites.concat([weather]));
      setCurrentFavouriteIndex(favourites.length);
    }
  };

  const removeFavourite = (favouriteId) => {
    const updatedFavourites = favourites.filter(
      (fav) => fav.id !== favouriteId
    );
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
  return (
    <div className="App">
      <SideMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setCurrentPage={setCurrentPage}
      />
      <div className="header">
        <button
          className="side-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon="fa-bars" />
        </button>
        <div className="logo">
          <h1>Weather App☁️</h1>
        </div>
        <SearchBar
          search={search}
          setSearch={setSearch}
          isSearchExpanded={isSearchExpanded}
          setIsSearchExpanded={setIsSearchExpanded}
          searchPressed={searchPressed}
        />
      </div>
      {currentPage === "weather" && (
        <>
          <WeatherInfo
            weather={weather}
            locationName={locationName} 
            addToFavourites={addToFavourites}
          />
          <HourlyForecast hourlyData={hourlyData} isCelsius={isCelsius} />
          <Favourites
            favourites={favourites}
            currentFavouriteIndex={currentFavouriteIndex}
            navigateFavourite={navigateFavourite}
            removeFavourite={removeFavourite}
          />
        </>
      )}
      {currentPage === "settings" && (
        <Settings isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
      )}
    </div>
  );
};

export default WeatherApp;
