import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getConfig = () => {
  const defaultConfig = {
    headers: { Authorization: token }
  }
  return { ...defaultConfig }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, getConfig())
  return response.data
}

const update = (id, updatedObject) => {
  const response = axios.put(`${baseUrl}/${id}`, updatedObject, getConfig())
  return response.data
}

const deleting = async (id) => {
  const deletedBlog = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return deletedBlog.data
}

export default { getAll, create, update, deleting, setToken }