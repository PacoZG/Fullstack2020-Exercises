import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotesToShow = () => {
    return props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  }

  const addVote = (anecdote) => {
    props.voteFor(anecdote)
    props.setNotification(`You voted for "${anecdote.content}". Total votes: ${anecdote.votes + 1}`, 5)
  }
  return (
    <div>
      {anecdotesToShow().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            {`has ${anecdote.votes} votes`}
            <button onClick={() => addVote(anecdote)}>{'vote'}</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteFor,
  setNotification
}

const ConnectedAnecdotes = connect ( mapStateToProps, mapDispatchToProps )(AnecdoteList)
export default ConnectedAnecdotes