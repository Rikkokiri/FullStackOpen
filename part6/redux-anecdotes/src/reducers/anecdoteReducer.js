import * as anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  /**
   * 6.3 - Implement the functionality for voting anecdotes.
   * The number of votes must be saved to a Redux store.
   *
   * 6.4 - Implement the functionality for adding new anecdotes.
   * You can keep the form uncontrolled like we did earlier.
   */
  switch (action.type) {
    case 'ADD_NEW': {
      return [...state, action.data]
    }
    case 'VOTE': {
      const id = action.data.id
      const votes = action.data.votes
      const anecdote = state.find((a) => a.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: votes,
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

/**
 * 6.6 - If you haven't done so already, separate the creation of action-objects to
 * action creator-functions and place them in the src/reducers/anecdoteReducer.js file,
 * so do what we have been doing since the chapter action creators.
 */
export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    const data = await anecdoteService.addVote(id)
    dispatch({
      type: 'VOTE',
      data,
    })
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
