import React, { useState, useEffect } from 'react'
// components
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import CreateUserForm from './components/CreateUserForm'
import ProfileForm from './components/ProfileForm'

import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

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

  const books = useQuery(ALL_BOOKS)

  const updateCacheWith = (addedBook) => {
    console.log('ADDED BOOK: ', addedBook)
    const includedIn = (set, object) =>  {
      set.map(book => book.id).includes(object.id)
    }

    const booksInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(booksInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: booksInStore.allBooks.concat(addedBook) }
      })
    }
    const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(authorsInStore.allAuthors, addedBook.author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: authorsInStore.allAuthors.concat(addedBook.author) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      setNotification(`${addedBook.title} added`, 5)
      updateCacheWith(addedBook)
    }
  })

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

  if (books.loading) {
    return <div>{'loading...'}</div>
  }

  //console.log(authors.data.allAuthors)
  //console.log('BOOKS: ',books.data.allBooks)
  //console.log(users.data.allUsers)

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
      <Authors show={page === 'authors'} updateCacheWith={updateCacheWith} setNotification={setNotification} />
      <Books show={page === 'books'} />
      {token ?
        <div>
          <NewBook show={page === 'add'} setNotification={setNotification}
            updateCacheWith={updateCacheWith} setPage={setPage} />
          <ProfileForm show={page === 'profile'} />
        </div> :
        <div>
          <LoginForm show={page === 'login'} setNotification={setNotification} setToken={setToken} setPage={setPage} />
          <CreateUserForm show={page === 'create'} setNotification={setNotification} setPage={setPage} />
        </div>

      }
    </div>
  )
}

export default App