const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW': {
      return [...state, asObject(action.data.content)]
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
  return {
    type: 'ADD_NEW',
    data: { content },
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_DATA',
    data: anecdotes,
  }
}

export default anecdoteReducer
