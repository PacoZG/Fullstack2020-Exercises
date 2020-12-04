import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "../components/Blog";

const BlogList = (props) => {
  const blogRef = useRef();
  const { addLike, deleteBlog } = props;
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs).sort(
    (a, b) => b.likes - a.likes
  );

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          addLike={addLike}
          deleteBlog={deleteBlog}
          ref={blogRef}
        />
      ))}
    </div>
  );
};

export default BlogList;
