import * as anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW': {
      return [...state, action.data]
    }
    case 'VOTE': {
      const id = action.data.id
      const anecdote = state.find((a) => a.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      }
      return state.map((a) => (a.id !== id ? a : updatedAnecdote))
    }
    case 'INIT_DATA': {
      return action.data
    }
    default:
      return state
  }
}

export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_NEW',
      data,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_DATA',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
