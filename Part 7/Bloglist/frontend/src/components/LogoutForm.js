import React from 'react'

const LogoutForm = (props) => {
  const { handleSubmit, user } = props
  return (
    <form onSubmit={handleSubmit} >
      <table className={'labelStyle'} >
        <tbody >
          <tr>
            <td >{`${user.name} has logged in`}</td>
            <td ><button id="logout-button" className={ 'logoutButton' } type="submit">{ 'logout' }</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default LogoutForm