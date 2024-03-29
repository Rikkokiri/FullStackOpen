import { createSlice, createSelector } from '@reduxjs/toolkit'
import * as anecdoteService from '../services/anecdotes'
import { setNotification } from './notificationReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

// eslint-disable-next-line no-unused-vars
const initialState = anecdotesAtStart.map(asObject)

/**
 * 6.11 - Change also the definition of the anecdote reducer and
 * action creators to use the Redux Toolkit's createSlice function.
 */

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    /**
     * 6.4 - Implement the functionality for adding new anecdotes.
     * You can keep the form uncontrolled like we did earlier.
     */
    addAnecdote(state, action) {
      /* const content = action.payload
      state.push({
        content,
        votes: 0,
        id: getId(),
      }) */
      state.push(action.payload)
    },
    /**
     * 6.3 - Implement the functionality for voting anecdotes.
     * The number of votes must be saved to a Redux store.
     */
    updateAnecdote(state, action) {
      const anecdote = action.payload
      const id = anecdote.id
      return state.map((a) => (a.id !== id ? a : anecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

const selectAnecdotes = (state) => state.anecdotes
const selectFilter = (state) => state.filter

export const selectFilteredSortedAnecdotes = createSelector(
  selectAnecdotes,
  selectFilter,
  (anecdotes, filter) => {
    // 6.5 - Make sure that the anecdotes are ordered by the number of votes.
    const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes)
    if (filter === '') {
      return sorted
    }

    // 6.9 - Implement filtering for the anecdotes that are displayed to the user.
    return sorted.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  }
)

export const { addAnecdote, updateAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer

/**
 * 6.16 - Modify the initialization of the Redux store to happen using asynchronous
 * action creators, which are made possible by the Redux Thunk library.
 */
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

/**
 * 6.17 - Also modify the creation of a new anecdote to happen using
 * asynchronous action creators, made possible by the Redux Thunk library.
 */
export const createAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(setNotification(`You added new anecdote: '${content}'`, 10))
      dispatch(addAnecdote(newAnecdote))
    } catch (err) {
      dispatch(
        setNotification(
          `Adding an anecdote failed due to server error`,
          10,
          true
        )
      )
    }
  }
}

/**
 * 6.18 - Voting does not yet save changes to the backend.
 * Fix the situation with the help of the Redux Thunk library.
 */
export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    try {
      const anecdote = await anecdoteService.addVote(id)
      dispatch(updateAnecdote(anecdote))
      dispatch(setNotification(`You voted for: '${anecdote.content}'`, 10))
    } catch (err) {
      dispatch(setNotification(`Voting failed due to server error`, 10, true))
    }
  }
}

// -------- What reducer and action creators looked like before using createSlice() --------

/* const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    // 6.4 - Implement the functionality for adding new anecdotes.
    // You can keep the form uncontrolled like we did earlier.
    case 'ADD_NEW': {
      return [
        ...state,
        { content: action.payload.content, id: getId(), votes: 0 },
      ]
    }
    // 6.3 - Implement the functionality for voting anecdotes.
    // The number of votes must be saved to a Redux store.
    case 'VOTE': {
      const id = action.payload.id

      const anecdote = state.find((a) => a.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      }
      return state.map((a) => (a.id !== id ? a : updatedAnecdote))
    }
    default:
      return state
  }
} */

/**
 * 6.6 - If you haven't done so already, separate the creation of action-objects to
 * action creator-functions and place them in the src/reducers/anecdoteReducer.js file,
 * so do what we have been doing since the chapter action creators.
 

export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id },
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'ADD_NEW',
    payload: { content },
  }
}

export default anecdoteReducer */
