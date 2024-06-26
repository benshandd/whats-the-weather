import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideMenu = ({ isMenuOpen, setIsMenuOpen, setCurrentPage }) => {
  return (
    <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
        <FontAwesomeIcon icon="times" />
      </button>
      <ul>
        <li
          onClick={() => {
            setCurrentPage("weather");
            setIsMenuOpen(false);
          }}
        >
          Current Weather
        </li>
        <li
          onClick={() => {
            setCurrentPage("settings");
            setIsMenuOpen(false);
          }}
        >
          Settings
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
