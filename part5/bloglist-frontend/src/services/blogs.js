import axios from 'axios';
const baseUrl = '/api/blogs';

let userToken = null;

const setToken = (token) => {
  userToken = `bearer ${token}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = { headers: { Authorization: userToken } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export { create, getAll, update, setToken };
