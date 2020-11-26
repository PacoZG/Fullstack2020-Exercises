import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`Anecdote: "${content}", created`, 5)
  }

  return (
    <div>
      <h2>{'create new'}</h2>
      <form onSubmit={addAnecdote}>
        <div style={{ marginBottom: 10 }}>
          <input name="anecdote" />
        </div>
        <button type="submit">{'create'}</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = { createAnecdote, setNotification }

const ConnectedAnecdotes = connect ( null, mapDispatchToProps )(AnecdoteForm)

export default ConnectedAnecdotes