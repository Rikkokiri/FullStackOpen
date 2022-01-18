import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

const apiKey = process.env.REACT_APP_WEATHER_API_KEY

const App = () => {
  const [matches, setMatches] = useState([])
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState(undefined)

  const countriesHook = () => {
    if (query !== '') {
      axios
        .get('https://restcountries.com/v2/all')
        .then(response => {
          const filtered = filterResults(query, response.data)
          setMatches(filtered)
        })
    } else {
      setMatches([])
    }
  }

  useEffect(countriesHook, [query])

  const weatherHook = () => {
    console.log('weather effect')

    if (matches.length === 1) {
      const params = {
        access_key: apiKey,
        query: matches[0].capital
      }
      axios
        .get('http://api.weatherstack.com/current', { params })
        .then(response => {
          console.log('Weather data', response.data.current)
          setWeather(response.data)
        })
    }
  }

  useEffect(weatherHook, [matches])

  const filterResults = (name, countries) => {
    // First check for exact match
    let exactMatch = countries.filter(country => country.name.toLowerCase() === name.toLowerCase())
    if (exactMatch.length >= 1) {
      return exactMatch
    } else {
      // if exact match is not found, then just filter
      return countries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    }
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const showCountry = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  return (
    <div>
      <h1>Country Info</h1>
      <label htmlFor='search'>Find countries</label>
      <input id='search'
        value={query}
        onChange={handleQueryChange}
      />
      {matches.length === 1
        ? <CountryDetails country={matches[0]} weather={weather} />
        : <CountryList countries={matches} query={query} showButtonHandler={showCountry} />
      }
    </div>
  )
}

export default App
