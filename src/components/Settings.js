import React from 'react';

const Settings = ({ isCelsius, setIsCelsius }) => {
  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="toggle-unit">
        <label className="switch">
          <input
            type="checkbox"
            checked={isCelsius}
            onChange={() => setIsCelsius(!isCelsius)}
          />
          <span className="slider"></span>
        </label>
        <span>{isCelsius ? 'Celsius' : 'Fahrenheit'}</span>
      </div>
    </div>
  );
};

export default Settings;
