import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'

const NewBook = (props) => {
  const { setNotification } = props
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    createBook({ variables: { title, published, author, genres } })
    console.log('adding book... { title: ', title, ', published: ', published,
      ', author: ', author, ', genres: ', genres)
    setNotification(`${title} added`, 5)
    setTitle('')
    setPublished(null)
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <table>
          <tbody>
            <tr>
              <th>{'title'}</th>
              <td>
                <input value={title}
                  onChange={({ target }) => setTitle(target.value)} />
              </td>
            </tr>
            <tr>
              <th>{'author'}</th>
              <td><input value={author}
                onChange={({ target }) => setAuthor(target.value)} />
              </td>
            </tr>
            <tr>
              <th>{'published'}</th>
              <td><input type='number' value={published}
                onChange={({ target }) => setPublished(parseInt(target.value))}
              />
              </td>
            </tr>
            <tr>
              <th>{'genre'}</th>
              <td>
                <input value={genre}
                  onChange={({ target }) => setGenre(target.value)} />
              </td>
              <td><button onClick={addGenre} type="button">{'add genre'}</button></td>
            </tr>
            <tr>
              <td><button type='submit'>{'create book'}</button></td>
              <td>{`genres: ${genres.join(', ')}`}</td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default NewBook