import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "../components/Blog";

const BlogList = () => {
  const blogRef = useRef();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs).sort((a, b) => b.likes - a.likes);

  

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} user={user} blog={blog} ref={blogRef} />
      ))}
    </div>
  );
};

export default BlogList;
