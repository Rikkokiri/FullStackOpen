import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const addVote = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`)
  const updatedAnecdote = { id, votes: data.votes + 1 }
  const response = await axios.patch(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

export { addVote, createNew, getAll }
