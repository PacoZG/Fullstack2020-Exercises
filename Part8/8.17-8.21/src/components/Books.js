import React,  { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])// eslint-disable-next-line
  const [ getBooks, result ] = useLazyQuery(ALL_BOOKS)
  console.log('LOADED_BOOKS', books)
  const showBooks = (genre) => {
    getBooks({ variables: { genre: genre } })
  }

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
      <button onClick={() => showBooks('agile')}>{'Agile'}</button>
      <button onClick={() => showBooks('awesome')}>{'Awesome'}</button>
      <button onClick={() => showBooks('classic')}>{'Classic'}</button>
      <button onClick={() => showBooks('crime')}>{'Crime'}</button>
      <button onClick={() => showBooks('design')}>{'Design'}</button>
      <button onClick={() => showBooks('horror')}>{'Horror'}</button>
      <button onClick={() => showBooks('medical')}>{'Medical'}</button>
      <button onClick={() => showBooks('parody')}>{'Parody'}</button>
      <button onClick={() => showBooks('patterns')}>{'Patterns'}</button>
      <button onClick={() => showBooks('refactoring')}>{'Refactoring'}</button>
      <button onClick={() => showBooks('revolution')}>{'Revolution'}</button>
      <button onClick={() => showBooks('satire')}>{'Satire'}</button>
      <button onClick={() => showBooks('')}>{'All books'}</button>
    </div>
  )
}

export default Books