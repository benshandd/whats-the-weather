import React from "react";
import { getFormattedDate } from "../utils";

const Favourites = ({ favourites, currentFavouriteIndex, navigateFavourite, removeFavourite }) => {
  return (
    favourites.length > 0 && (
      <div className="favourites-box">
        <h2>Favourites🌟</h2>
        <div>
          <button onClick={() => navigateFavourite(-1)}>⬅️ Prev</button>
          <button onClick={() => navigateFavourite(1)}>Next ➡️</button>
        </div>
        <div key={favourites[currentFavouriteIndex].id} className="weather-info-box">
          <p>{getFormattedDate()}</p>
          <p>{favourites[currentFavouriteIndex].name}</p>
          <p>{favourites[currentFavouriteIndex].main.temp} C°</p>
          <p>{favourites[currentFavouriteIndex].weather[0].main}</p>
          <p>{favourites[currentFavouriteIndex].weather[0].description}</p>
          <button onClick={() => removeFavourite(favourites[currentFavouriteIndex].id)}>
            Remove from Favourites
          </button>
        </div>
      </div>
    )
  );
};

export default Favourites;