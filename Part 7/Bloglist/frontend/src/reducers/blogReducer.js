import blogService from "../services/blogs";
import localdb from '../utils/localdb';

const blogReducer = (state = [], action) => {
  console.log("<----STEP 5---->");
  console.log("BLOGS STATE IN BLOGREDUCER:", state);
  console.log("BLOGS ACTION.TYPE IN BLOGREDUCER:", action);
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "NEW_BLOG":
      return state.concat(action.data);
    case "LIKE": {
      const id = action.data.id;
      const toChange = state.find((blog) => blog.id === id);
      const changedBlog = { ...toChange, likes: toChange.likes + 1 };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    }
    case "DELETE":
      return state.filter(blog => blog.id !== action.data);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    const newBlogwUser = {...newBlog, user: localdb.loadUser()}
    console.log('BLOG CREATED W/user:', newBlogwUser)
    dispatch({
      type: "NEW_BLOG",
      data: newBlogwUser,
    });
  };
};

export const likeBlog = (blog) => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 };
  return async (dispatch) => {
    const changedBlog = await blogService.update(updatedBlog);

    dispatch({
      type: "LIKE",
      data: changedBlog,
    });
  };
};

export const deleteBlog = (blog) => {
  console.log("<----STEP 2---->");
  console.log("ID OF BLOG TO DELETE:", blog.id);
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch({
      type: "DELETE",
      data: blog.id,
    });
  };
};

export default blogReducer;
