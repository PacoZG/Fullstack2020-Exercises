import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const { handleSubmit, username, password, handleUsernameChange, handlePasswordChange } = props
  return (
    <form className={'normal'} onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr >
            <td>{'username'}</td>
            <td><input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            /></td>
          </tr>
          <tr >
            <td>{'password'}</td>
            <td><input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            /></td>
          </tr>
        </tbody>
      </table>
      <button id="login-button" className={'button'} type="submit">{'login'}</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm