import React,  { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const loggedinUser = JSON.parse(localStorage.getItem('current-library-user'))// eslint-disable-next-line
  let favoriteGenre
  if (loggedinUser){
    favoriteGenre = loggedinUser.favoriteGenre
  }
  const [books, setBooks] = useState([])// eslint-disable-next-line
  const [ getBooks, result ] = useLazyQuery(ALL_BOOKS)

  const updatedBooks = useQuery(ALL_BOOKS)
  //console.log('UPDATED_BOOKS: ', updatedBooks.data.allBooks)
  
  const showBooks = (genre) => {
    getBooks({ variables: { genre: genre } })
  }

  useEffect (() => {
    if (result.data){
      setBooks(result.data.allBooks)
    } else setBooks(updatedBooks.data.allBooks)// eslint-disable-next-line
  }, [result.data] )

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>{'loading...'}</div>
  }

  return (
    <div>
      <h2>{'books'}</h2>
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
            </tr>)}
        </tbody>
      </table>
      <input type="text" placeholder="genre" id="inputGenre"/>
      <button type="button" onClick={() => showBooks(document.getElementById("inputGenre").value)}>{'search'}</button>
      <button onClick={() => showBooks('') }>{'All books'}</button>
      {loggedinUser ? 
      <button onClick={() => showBooks(favoriteGenre) }>{'Recommended for you'}</button>
      : null }
    </div>
  )
}

export default Books