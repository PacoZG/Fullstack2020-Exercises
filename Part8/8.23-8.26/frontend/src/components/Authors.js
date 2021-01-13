import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from "react-select";

const Authors = (props) => {
  const { setNotification } = props
  const allAuthors = useQuery(ALL_AUTHORS)
  const [year, setYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const [changeBirthday] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      setNotification(error.graphQLErrors[0].message, 5)
    },
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

  if (allAuthors.loading) {
    return <div>{'loading...'}</div>
  }

  const authors = allAuthors.data.allAuthors
  let options = []
  for (var i in authors) {
    options = [...options, { value: authors[i].name, label: authors[i].name }]
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
      <p><button onClick={updateAuthorBirth} >{'Update author'}</button></p>
    </div>
  )
}

export default Authors
