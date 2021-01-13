import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { LOGIN, ALL_USERS } from '../queries'

const LoginForm = (props) => {
  const { setToken, setPage, setNotification } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const  allUsers = useQuery(ALL_USERS)

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setNotification(error.graphQLErrors[0].message, 5)
      setPage('login')
    }
  })

  useEffect(() => {
    if (result.data) {
      //console.log(result.data.login.value)
      const token = result.data.login.value
      const currentUser = users.find(user => user.username === username)
      setToken(token)
      localStorage.setItem('library-user-token', token)
      localStorage.setItem('current-library-user', JSON.stringify(currentUser))
      setNotification(`${currentUser.username} logged in`, 5)
      setUsername('')
      setPassword('')
    }
  }, [result.data]) // eslint-disable-line

  if (allUsers.loading) {
      return <div>{'loading...'}</div>
    }
  
  const users = allUsers.data.allUsers

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setPage('add')
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
        <button type='submit'>{'login'}</button>
      </form>
    </div>
  )
}

export default LoginForm