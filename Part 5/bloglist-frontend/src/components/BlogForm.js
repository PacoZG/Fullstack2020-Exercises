import React, { useState } from 'react'
import PropTypes from "prop-types"

const BlogForm = ({ createBlog }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      url: url,
      title: title,
      author: author
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="formDiv">
    <form onSubmit={addBlog}>
      <h2 className={'createStyle'}>{'create new ...'} </h2>
      <table>
        <tbody>
          <tr >
            <td>{'title:'}</td>
            <td><input
              id = "title" 
              type = "text"
              value = {title}
              name = "Title"
              onChange = {({ target }) => setTitle(target.value)}
            /></td>
          </tr>
          <tr >
            <td>{'author:'}</td>
            <td><input
              id =  "author"
              type = "text"
              value = {author}
              name = "Author"
              onChange = {({ target }) => setAuthor(target.value)}
            /></td>
            <th><button id="create-button" className={'button'} type="submit" >{'create'}</button></th>
          </tr>
          <tr >
            <td>{'url:'}</td>
            <td><input
              id = "url"
              type = "text"
              value = {url}
              name = "url"
              onChange = {({ target }) => setUrl(target.value)}
            /></td>
          </tr>
        </tbody>
      </table>
    </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired

}

export default BlogForm