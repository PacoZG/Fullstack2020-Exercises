import React from 'react'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <h2>{`${anecdote.content} by ${anecdote.author}`}</h2>
      <ul>
        <li>
          {`has ${anecdote.votes} votes`} <button onClick={() => vote(anecdote.id)}>{'vote'} </button>
        </li>
        <li>{'for more info see'} <a href={anecdote.info}>{'here'}</a ></li>
      </ul>
    </div>
  )
}

export default Anecdote