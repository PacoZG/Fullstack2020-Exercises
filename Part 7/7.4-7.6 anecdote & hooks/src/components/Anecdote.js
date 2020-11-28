import React from 'react'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{`${anecdote.content} by ${anecdote.author}`}</h2>
      <ul>
        <li>{`has ${anecdote.votes} votes`}</li>
        <li>{'for more info see'} <a href={anecdote.info}>{'here'}</a ></li>
      </ul>
    </div>
  )
}

export default Anecdote