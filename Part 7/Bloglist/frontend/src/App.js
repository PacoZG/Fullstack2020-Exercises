import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import './index.css'

// components
import Header from './components/Header'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import TogglableForm from './components/TogglableForm'

//reducers
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
// Utils

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])
  const user = useSelector((state) => state.user)
  //console.log('LOGGED IN USER:', user)

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(
      setNotification(`a new blog posted: ${blogObject.title} by ${blogObject.author}`, 'success')
    )
  }

  const blogForm = () => (
    <TogglableForm buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </TogglableForm>
  )

  return (
    <div className={'background'}>
      <Header />
      <Notification />
      {user === null ?
        <LoginForm />
        :
        <div>
          <LogoutForm />
          {blogForm()}
          <BlogList />
        </div>
      }
    </div>
  )
}

export default App
