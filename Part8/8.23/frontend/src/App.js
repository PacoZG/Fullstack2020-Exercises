import React, { useState, useEffect } from 'react'
// components
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import CreateUserForm from './components/CreateUserForm'
import ProfileForm from './components/ProfileForm'

import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ALL_USERS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [token])

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const users = useQuery(ALL_USERS)

  const logout = () => {
    setNotification(`login out...`, 3)
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const setNotification = (message, time) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, time * 1000)
  }

  if (authors.loading || books.loading || users.loading) {
    return <div>{'loading...'}</div>
  }

  //console.log(authors.data)
  //console.log('BOOKS: ',books.data.allBooks)
  console.log(users.data.allUsers)

  return (
    <div>
      <Notification message={message} />
      {token ?
        <div>
          <button onClick={() => setPage('authors')}>{'authors'}</button>
          <button onClick={() => setPage('books')}>{'books'}</button>
          <button onClick={() => setPage('add')}>{'add book'}</button>
          <button onClick={() => setPage('profile')}>{'profile'}</button>
          <button onClick={logout}>{'logout'}</button>
        </div>
        :
        <div>
          <button onClick={() => setPage('authors')}>{'authors'}</button>
          <button onClick={() => setPage('books')}>{'books'}</button>
          <button onClick={() => setPage('login')}>{'login'}</button>
          <button onClick={() => setPage('create')}>{'create user'}</button>
        </div>}
      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />
      <Books show={page === 'books'} />
      {token ?
        <div>
          <NewBook show={page === 'add'} setNotification={setNotification} />
          <ProfileForm show={page === 'profile'}/>
        </div> :
        <div>
          <LoginForm show={page === 'login'} users={users.data.allUsers}
            setNotification={setNotification} setToken={setToken} setPage={setPage} />
          <CreateUserForm show={page === 'create'} setNotification={setNotification} />
        </div>

      }
    </div>
  )
}

export default App