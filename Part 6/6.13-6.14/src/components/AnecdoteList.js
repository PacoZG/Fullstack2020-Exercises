import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => 
  anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  .sort((a, b) => b.votes - a.votes)
  )  

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            {`has ${anecdote.votes} votes`}
            <button onClick={() => {
              dispatch(voteFor(anecdote.id))
              showNotification(dispatch, `One vote for "${anecdote.content}". Total votes: ${anecdote.votes + 1}`)
            }}>{'vote'}</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList