import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  //console.log('ANECDOTE:', action)
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const toChange = state.find(anecd => anecd.id === id)
      const changedAnecdote = { ...toChange, votes: toChange.votes + 1 }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteFor = (anecdote) => {
  const updated = { ...anecdote, votes: anecdote.votes + 1 }
  return async dispatch => {
    const changedAnecdote = await anecdoteService.update(anecdote.id, updated)
    dispatch ({
      type: 'VOTE',
      data: changedAnecdote
    })
  }
}

export default anecdoteReducer