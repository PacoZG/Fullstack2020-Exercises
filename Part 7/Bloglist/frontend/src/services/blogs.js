import axios from "axios";
const baseUrl = "/api/blogs";
import localdb from '../utils/localdb'

const getConfig = () => {
    return  {
      headers: { Authorization: `bearer ${localdb.loadUser().token}` }
  }
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, getConfig());
  return response.data;
};

const update = async (updatedObject) => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, getConfig());
  return response.data;
};

const remove = async (id) => {
  console.log("<----STEP 3---->", id);
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export default { getAll, create, update, remove };