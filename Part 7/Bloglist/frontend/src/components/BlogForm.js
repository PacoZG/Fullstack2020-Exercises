import React from "react";
import PropTypes from "prop-types";
import { useField } from "../hooks/index";

const BlogForm = ({ createBlog }) => {
  const title = useField("title");
  const author = useField("author");
  const url = useField("url");

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog({
      url: url.param.value,
      title: title.param.value,
      author: author.param.value,
    });
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <h2 className={"createStyle"}>{"create new ..."} </h2>
        <table>
          <tbody>
            <tr>
              <td>{"title:"}</td>
              <td>
                <input id="title" name="Title" {...title.param} />
              </td>
            </tr>
            <tr>
              <td>{"author:"}</td>
              <td>
                <input id="author" name="Author" {...author.param} />
              </td>
              <th>
                <button id="create-button" className={"button"} type="submit">
                  {"create"}
                </button>
              </th>
            </tr>
            <tr>
              <td>{"url:"}</td>
              <td>
                <input
                  id="url"
                  name="url"
                  placeholder="http://example.com"
                  pattern="http://.*"
                  {...url.param}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
