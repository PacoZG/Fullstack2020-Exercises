var _ = require ('lodash')
import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import userService from './services/users'
import blogService from './services/blogs'
import loginService from './services/login'
import Header from './components/Header'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import TogglableForm from './components/TogglableForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [colorClass , setColorClass ] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  

  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const blogRef = useRef()

  useEffect(() => {
    userService.getAll().then( users => {
      setUsers(users)
    })
  },[])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( _.sortBy(blogs, 'likes').reverse() )}
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const actionMessage = (message, colorClass) => {
    setMessage(message)
    setColorClass(colorClass)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      var user = await loginService.login({ username, password })
      window.localStorage.setItem( 'loggedBlogUser', JSON.stringify(user) )

      blogService.setToken(user.token)
      setUser(user)
      actionMessage(`logged in, welcome back ${user.name}`, 'success')
      setUsername('')
      setPassword('')
    } catch (exception) {
      actionMessage('wrong username or password', 'error')
    }
  }

  const handleLougout = () => {
    setUser(null)
    window.localStorage.clear()
    window.localStorage.removeItem('loggedBlogUser')
    actionMessage(`logged out, see next time ${user.name}`, 'error')
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.setToken(user.token)
    blogService.create(blogObject)
      .then(returnBlog => {
        setBlogs(blogs.concat(returnBlog))
        actionMessage(`a new blog posted: ${blogObject.title} by ${blogObject.author}`, 'success')
      })
  }

  const deleteBlog = async (blog) => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
        await blogService.deleting(blog.id)
        await blogService.getAll().then(blogs => {
          setBlogs(_.sortBy(blogs, 'likes').reverse())
          actionMessage('Blog has been deleted!', 'success')
        })
      }
  }

  const addLike = async (changedBlog) => {
    await blogService.update(changedBlog.id, changedBlog)
    await blogService.getAll().then(blogs => {
      setBlogs(_.sortBy(blogs, 'likes').reverse())
      //actionMessage(`You like ${changedBlog.title}`, 'success')
    })
  }

  const blogForm = () => (
    <TogglableForm buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </TogglableForm>
  )

  return (
    <div className={'background'}>
      <Header user={user}/>
      <Notification message={message} colorClass={colorClass} />
      {user === null ?
        <LoginForm handleSubmit={handleLogin} username={username} password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}/>:
        <div>
          <LogoutForm handleSubmit={handleLougout} user={user} blogs={blogs}/>
          {blogForm()}
          <div >
            {blogs.map(blog =>
              <Blog key={blog.id} user={user} blog={blog} addLike={addLike} deleteBlog={deleteBlog} ref={blogRef}/> )}
          </div>
        </div>
      }
    </div>
  )
}

export default App