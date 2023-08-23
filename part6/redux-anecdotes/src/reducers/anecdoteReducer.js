import { createSlice, createSelector } from '@reduxjs/toolkit'

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

const initialState = anecdotesAtStart.map(asObject)

/**
 * 6.11 - Change also the definition of the anecdote reducer and
 * action creators to use the Redux Toolkit's createSlice function.
 */

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], // initialState,
  reducers: {
    /**
     * 6.4 - Implement the functionality for adding new anecdotes.
     * You can keep the form uncontrolled like we did earlier.
     */
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        votes: 0,
        id: getId(),
      })
    },
    /**
     * 6.3 - Implement the functionality for voting anecdotes.
     * The number of votes must be saved to a Redux store.
     */
    voteForAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find((a) => a.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      }
      return state.map((a) => (a.id !== id ? a : updatedAnecdote))
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

export const { createAnecdote, voteForAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer

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
