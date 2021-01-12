import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_USERS, EDIT_USER } from '../queries'

const ProfileForm = (props) => {
  const loggedinUser = JSON.parse(localStorage.getItem('current-library-user'))
  const username = loggedinUser.username
  const [favoriteGenre, setGenre ] = useState('')

  const [changeGenre] = useMutation(EDIT_USER, {
    refetchQueries: [{ query: ALL_USERS }]
  })

  const updateGenre = async (event) => {
    event.preventDefault()
    changeGenre({ variables: { username, favoriteGenre }})
    const currentUser = {...loggedinUser, favoriteGenre: favoriteGenre}
    localStorage.setItem('current-library-user', JSON.stringify(currentUser))
    setGenre('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>{'Username: '}</th>
            <td>{`${loggedinUser.username}`}</td>
          </tr>
          <tr>
            <th>{'favorite genre: '}</th>
            <td>{`${loggedinUser.favoriteGenre}`}</td>
          </tr>
          <tr>
            <td>{'Update your favorite genre: '}</td>
            <td><input value={favoriteGenre} onChange={({ target }) => setGenre(target.value)}/></td>
            <td><button onClick={updateGenre}>{'update'}</button></td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default ProfileForm