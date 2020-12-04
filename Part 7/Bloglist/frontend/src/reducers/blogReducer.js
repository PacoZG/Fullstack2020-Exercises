import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  console.log("<----STEP 5---->");
  console.log("BLOGS STATE IN BLOGREDUCER:", state);
  console.log("BLOGS ACTION.TYPE IN BLOGREDUCER:", action.type);
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "NEW_BLOG":
      return [...state, action.data];
    case "LIKE": {
      const id = action.data.id;
      const toChange = state.find((blog) => blog.id === id);
      const changedBlog = { ...toChange, likes: toChange.likes + 1 };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    }
    case "DELETE":
      return state.filter((blog) => blog.id !== action.id);
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
    dispatch({
      type: "NEW_BLOG",
      data: newBlog,
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
    const removedBlog = await blogService.remove(blog.id); // request doesn't do anything
    console.log("REMOVED BLOG", removedBlog);
    dispatch({
      type: "DELETE",
      data: blog.id,
    });
  };
};

export default blogReducer;
