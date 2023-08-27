import axios from 'axios'
const baseUrl = '/api/blogs'

let userToken = null

const setToken = (token) => {
  userToken = `Bearer ${token}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = { headers: { Authorization: userToken } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: userToken } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export { create, getAll, remove, update, setToken }
