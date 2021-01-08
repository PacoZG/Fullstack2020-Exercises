import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from "react-select";

const Authors = (props) => {
  const { authors } = props
  const [year, setYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  let options = []
  for (var i in authors) {
    options = [...options, { value: authors[i].name, label: authors[i].name }]
  }

  const [changeBirthday] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const updateAuthorBirth = async (event) => {
    event.preventDefault()
    const setBornTo = parseInt(year)
    const name = selectedAuthor.value
    changeBirthday({ variables: { name, setBornTo } })
    setYear('')
  }
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>{'authors'}</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>{'born'}</th>
            <th>{'books'}</th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>{'Set birthyear'}</h2>
      <Select defaultValue={selectedAuthor} onChange={setSelectedAuthor} options={options} />
      <p><input value={year} onChange={({ target }) => setYear(target.value)}
      /></p>
      <p><button type='submit' onClick={updateAuthorBirth} >{'Update author'}</button></p>
    </div>
  )
}

export default Authors
