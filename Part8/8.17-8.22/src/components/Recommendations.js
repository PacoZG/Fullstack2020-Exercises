import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
  const [books, setBooks] = useState([])// eslint-disable-next-line
  const [genre, setGenre] = useState('')
  const [ getBooks, result ] = useLazyQuery(ALL_BOOKS)
  const loggedinUser = JSON.parse(localStorage.getItem('current-library-user'))// eslint-disable-next-line

  useEffect (() => {
    setGenre(loggedinUser.favoriteGenre)
    getBooks({ variables: { genre: genre } })
    if (result.data){
      setBooks(result.data.allBooks)
    }// eslint-disable-next-line
  }, [result.data] )
  

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>{'recommendations'}</h2>
      <p>{'Books in your favorite genre '}<b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>{'author'}</th>
            <th>{'published'}</th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
          </table>
    </div>
  )
}

export default Recommendations