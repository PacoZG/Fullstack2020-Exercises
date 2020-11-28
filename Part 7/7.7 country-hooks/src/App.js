import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => setCountry({ data: response.data[0], found: true }))
      .catch(error => setCountry({ data: null, found: false }))
  }, [name])
  return country
}

const Country = ({ country }) => {
  //console.log('COUNTRY:', country)
  if (!country) {
    return null
  }

  return (
    <div>
      {!country.found ?
        <div> {'not found...'} </div> :
        <div>
          <h3>{country.data.name} </h3>
          <div>
            <li><b>{'capital: '}</b>{country.data.capital}</li>
            <li><b>{'population: '}</b>{country.data.population}</li>
          </div>
          <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
        </div>
      }
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">{'find'}</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App