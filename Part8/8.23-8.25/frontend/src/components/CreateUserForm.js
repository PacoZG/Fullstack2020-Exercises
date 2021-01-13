import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER, ALL_USERS } from '../queries'

const CreateUserForm = (props) => {
  const { setNotification, setPage } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [favoriteGenre, setGenre] = useState('')

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      setNotification(error.graphQLErrors[0].message, 5)
    },
    refetchQueries: [{ query: ALL_USERS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    createUser({ variables: { username, password, favoriteGenre } })
    //console.log('creating user:  { username : ', username, ', password: ', password,', favoriteGenre: ', favoriteGenre)
    setNotification(`${username} added`, 5)
    setPage('login')
    setUsername('')
    setPassword('')
    setGenre('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          {'username'} <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          {'password'} <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          {'favorite genre'} <input
            type='favoriteGenre'
            value={favoriteGenre}
            onChange={({ target }) => setGenre(target.value)}
          />
        </div>
        <button type='submit'>{'create'}</button>
      </form>
    </div>
  )
}

export default CreateUserForm