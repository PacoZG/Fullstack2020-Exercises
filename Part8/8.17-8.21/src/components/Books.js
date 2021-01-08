import React,  { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])// eslint-disable-next-line
  const [ getBooks, result ] = useLazyQuery(ALL_BOOKS)
  const [ genre, setGenre ] = useState(null)

  const updatedBooks = useQuery(ALL_BOOKS)
  console.log('UPDATED_BOOKS: ', updatedBooks.data.allBooks)
  
  //console.log('LOADED_BOOKS', books)
  const showBooks = (genero) => {
    setGenre(genero)
    getBooks({ variables: { genre: genre } })
  }

  console.log('BOOKS', books)

  useEffect (() => {
    if (result.data){
      setBooks(result.data.allBooks)
    }// eslint-disable-next-line
  }, [result.data] )

  if (!props.show || !books) {
    return null
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
      <button onClick={() => showBooks('')}>{'All books'}</button>
    </div>
  )
}

export default Books