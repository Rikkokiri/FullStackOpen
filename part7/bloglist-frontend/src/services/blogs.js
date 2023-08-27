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

const getAllComplete = async () => {
  const response = await axios.get(`${baseUrl}/allDetails`)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
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

const addComment = async (id, comment) => {
  const config = { headers: { Authorization: userToken } }
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    comment,
    config
  )
  return response.data
}

export {
  addComment,
  create,
  getAll,
  getAllComplete,
  getOne,
  remove,
  setToken,
  update,
}
