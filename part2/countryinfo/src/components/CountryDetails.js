import React from 'react'

const CountryDetails = ({ country, weather }) => {
  return (
    <div>
      <div className='countrydetails'>
        <h2>{country.name}</h2>
        <p>
          Capital: {country.capital}
        </p>
        <p>
          Population: {country.population}
        </p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
      </div>
      <img src={country.flag} height='150' alt={`flag of ${country}`} />
      <h3>Weather in {country.capital}</h3>
      {weather
        ? <WeatherDetails weather={weather} />
        : <p>Weather data not found.</p>
      }
    </div>
  )
}

const WeatherDetails = ({ weather }) => {
  if (weather.current) {
    return (
      <div>
        <p>{weather.current.weather_descriptions.join(', ')}</p>
        <p>Temperature: {weather.current.temperature} celcius</p>
        <p>Humidity: {weather.current.humidity}</p>
        <p>Wind speed: {weather.current.wind_speed}</p>
        <p>Wind direction: {weather.current.wind_dir}</p>
      </div>
    )
  } else {
    return (
      <p>Weather data not found.</p>
    )
  }
}

export default CountryDetails
