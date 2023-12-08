import logo from "./logo.svg";
import "./App.css";
import WeatherApp from "./components/WeatherApp";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <WeatherApp/>
      </header>
    </div>
  );
}

export default App;
