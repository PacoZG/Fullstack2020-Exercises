import React,  { useState } from 'react'

const Books = (props) => {
  const { books } = props
  const [genre, setGenre ] = useState(null)
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
          {genre ? 
          books.filter(book => book.genres.includes(genre)).map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>) :
          books.map(b => 
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setGenre('agile')}>{'Agile'}</button>
      <button onClick={() => setGenre('awesome')}>{'Awesome'}</button>
      <button onClick={() => setGenre('classic')}>{'Classic'}</button>
      <button onClick={() => setGenre('crime')}>{'Crime'}</button>
      <button onClick={() => setGenre('design')}>{'Design'}</button>
      <button onClick={() => setGenre('horror')}>{'Horror'}</button>
      <button onClick={() => setGenre('medical')}>{'Medical'}</button>
      <button onClick={() => setGenre('parody')}>{'Parody'}</button>
      <button onClick={() => setGenre('patterns')}>{'Patterns'}</button>
      <button onClick={() => setGenre('refactoring')}>{'Refactoring'}</button>
      <button onClick={() => setGenre('revolution')}>{'Revolution'}</button>
      <button onClick={() => setGenre('satire')}>{'Satire'}</button>
      <button onClick={() => setGenre(null)}>{'reset'}</button>
    </div>
  )
}

export default Books