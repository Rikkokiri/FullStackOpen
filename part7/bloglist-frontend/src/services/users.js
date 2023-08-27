import axios from 'axios'
const baseUrl = '/api/users'

let userToken = null

const setToken = (token) => {
  userToken = `Bearer ${token}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export { getAll, setToken }
