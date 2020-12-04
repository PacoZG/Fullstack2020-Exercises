import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => {
  const defaultConfig = {
    headers: { Authorization: token },
  };
  return { ...defaultConfig };
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
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject,
    getConfig()
  );
  return response.data;
};

const remove = async (id) => {
  console.log("<----STEP 3---->", id);
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  console.log("RESPONSE: <----STEP 4---->", response.data);
  return response.data;
};

export default { getAll, create, update, remove, setToken };
