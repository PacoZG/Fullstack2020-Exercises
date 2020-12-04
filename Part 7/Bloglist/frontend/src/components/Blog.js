import React, { useState, useImperativeHandle  } from "react"
import PropTypes from "prop-types"

const Blog = React.forwardRef(({ user, blog, addLike, deleteBlog }, ref ) => {
  var [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
  const showDetails = { display: visible ? 'none' : '' }
  const hideDetails = { display: visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const handleDelete = () => {
    deleteBlog(blog)
  }

  const handleLike = () => {
    setLikes(++likes)
    const newBlog ={
        ...blog,
        user: blog.user.id,
        likes: likes,
      }
    addLike(newBlog)
  }

  return (
    <div >
      <table className={ 'blog' }>
      <tbody style={showDetails}>
        <tr>
          <td>{blog.title}{', by '} {blog.author}</td><td><button id="view-button" className={ 'blogButton' } onClick={toggleVisibility}>{'view'}</button></td>
        </tr>
      </tbody>
      <tbody style={hideDetails} className={"detailsVisible"}>
        <tr>
          <td >{blog.title}</td><td><button id="hide-button" className={ 'blogButton' } onClick={toggleVisibility}>{'hide'}</button></td>
        </tr>
        <tr>
          <td >{blog.url}</td>
        </tr>
        <tr>
          <td >{'likes: '}{blog.likes}</td><td> <button id="like-button" className={ 'blogButton' } onClick={handleLike}>{'like'}</button></td>
        </tr>
        <tr>
          <td >{blog.author}</td>
          {blog.user.id === user.id ?
              <td><button id="delete-button" className={'deleteButton'} onClick={handleDelete} >{'delete'}</button></td>
              : null }
        </tr>
      </tbody>
      </table>
    </div>
  )
})

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog