import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = React.forwardRef(({ blog }, ref) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  //const blogs = useSelector(state => state.blogs)

  const [visible, setVisible] = useState(false)
  const showDetails = { display: visible ? 'none' : '' }
  const hideDetails = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      console.log('<----STEP 1---->')
      dispatch(deleteBlog(blog))
      dispatch(setNotification('Blog has been deleted!', 'success'))
    }
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`You liked ${blog.title}`, 'success'))
  }

  return (
    <div>
      <table className={'blog'}>
        <tbody style={showDetails}>
          <tr>
            <td>
              {blog.title}
              {', by '} {blog.author}
            </td>
            <td>
              <button
                id="view-button"
                className={'blogButton'}
                onClick={toggleVisibility}
              >
                {'view'}
              </button>
            </td>
          </tr>
        </tbody>
        <tbody style={hideDetails} className={'detailsVisible'}>
          <tr>
            <td>{blog.title}</td>
            <td>
              <button
                id="hide-button"
                className={'blogButton'}
                onClick={toggleVisibility}
              >
                {'hide'}
              </button>
            </td>
          </tr>
          <tr>
            <td>{blog.url}</td>
          </tr>
          <tr>
            <td>
              {'likes: '}
              {blog.likes}
            </td>
            <td>
              {' '}
              <button
                id="like-button"
                className={'blogButton'}
                onClick={handleLike}
              >
                {'like'}
              </button>
            </td>
          </tr>
          <tr>
            <td>{blog.author}</td>
            {blog.user.id === user.id ? (
              <td>
                <button
                  id="delete-button"
                  className={'deleteButton'}
                  onClick={handleDelete}
                >
                  {'delete'}
                </button>
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>
    </div>
  )
})

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
