
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    param: {
      type,
      value,
      onChange
    },
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(response => setResources(response.data))
  }, [baseUrl])

  const create = async (resource) => {
    await axios.post(baseUrl, resource)
      //.then(axios.get(baseUrl).then(response => setResources(response.data))) // option where we get data from the server
      .then (response => setResources(resources.concat(response.data))) // option where we get the data from response and update our array locally
  }

  const service = {
    create
  }
  //console.log('RESOURCES:', resources) //checking the state of the resoucers
  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  // reset the input fields
  const reset = () => {
    content.reset()
    name.reset()
    number.reset()
  }

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.param.value })
    reset() // reset after submitting the information
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.param.value, number: number.param.value })
    reset() // reset after submitting the information
  }

  return (
    <div>
      <h2>{'Notes'}</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.param} />
        <button>{'create'}</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>{'Persons'}</h2>
      <form onSubmit={handlePersonSubmit}>
        {'name'} <input {...name.param} /> <br />
        {'number'} <input {...number.param} /> {/* // Invalid value for prop `reset` on <input> tag, therefore .param*/}
        <button>{'create'}</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App