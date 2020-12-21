
import React, { useState, useEffect } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ALL_USERS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const loggedinUser = JSON.parse(localStorage.getItem('library-user'))

  useEffect(() => {
    if (loggedinUser !== null) {
      setToken(loggedinUser.token)
    }
  }, [loggedinUser])

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const users = useQuery(ALL_USERS)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (authors.loading || books.loading || users.loading) {
    return <div>{'loading...'}</div>
  }

  //console.log(authors.data)
  //console.log(books.data)
  //console.log(users.data.allUsers)

  return (
    <div>
      {token ?
        <div>
          <button onClick={() => setPage('authors')}>{'authors'}</button>
          <button onClick={() => setPage('books')}>{'books'}</button>
          <button onClick={() => setPage('add')}>{'add book'}</button>
          <button onClick={() => setPage('recommended')}>{'recommended'}</button>
          <button onClick={logout}>{'logout'}</button>
          <div>
            <Authors show={page === 'authors'} authors={authors.data.allAuthors} />
            <Books show={page === 'books'} books={books.data.allBooks} />
            <NewBook show={page === 'add'} />
            <Recommendations show={page === 'recommended'}
              books={books.data.allBooks} users={users.data.allUsers} />
          </div>
        </div> :
        <div>
          <button onClick={() => setPage('authors')}>{'authors'}</button>
          <button onClick={() => setPage('books')}>{'books'}</button>
          <button onClick={() => setPage('login')}>{'login'}</button>
          <div>
            <Authors show={page === 'authors'} authors={authors.data.allAuthors} />
            <Books show={page === 'books'} books={books.data.allBooks} />
            <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
          </div>
        </div>
      }
    </div>
  )
}

export default App