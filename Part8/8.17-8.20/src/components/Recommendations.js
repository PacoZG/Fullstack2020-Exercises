import React from 'react'

const Recommendations = (props) => {
  const { books, users } = props
  const loggedinUser = JSON.parse(localStorage.getItem('library-user'))
  const currentUser = users.find(user => user.username === loggedinUser.username)
  const favoriteBooks = books.filter(book => book.genres.includes(currentUser.favoriteGenre))

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>{'recommendations'}</h2>
      <p>{'Books in your favorite genre '}<b>{currentUser.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>{'author'}</th>
            <th>{'published'}</th>
          </tr>
          {favoriteBooks.map(b =>
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