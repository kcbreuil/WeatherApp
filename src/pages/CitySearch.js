import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const CitySearch = () => {
  const [citySearch, setCitySearch] = useState([]);

  const handleSearch = (e) => {
    fetch(
      `https://wyn-weather-api.herokuapp.com/cities?query=${e.target.value}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setCitySearch(data);
      });
  };

  return (
    <div>
      <header>
        <h1>WeatherApp</h1>
      </header>
      <h1>City Search</h1>
      <input type="text" onChange={handleSearch} />
      {citySearch.map((city) => (
        <div key={city.id}>
          <Link to={`/cities/${city.id}`}>{city.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default CitySearch;
