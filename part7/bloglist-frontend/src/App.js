import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  addBlog,
  deleteBlog,
  likeBlog,
} from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  })
  const user = useSelector((state) => state.users.currentUser)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async (username, password) => {
    try {
      dispatch(login(username, password))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
      throw error
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const createBlog = async (blogObject) => {
    try {
      dispatch(addBlog(blogObject))
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          `A new blog "${blogObject.title}" by ${blogObject.author} added`
        )
      )
    } catch (error) {
      console.log('Error creating a blog', error)
      dispatch(setNotification(error.response.data.error, true, 5000))
      throw error // Throw error so blog form knowns error happened and does not reset fields
    }
  }

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  if (!user) {
    return (
      <div>
        <h1>Log in to the application</h1>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <div>
        <span>{user.name ? user.name : user.username} logged in </span>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <Togglable showLabel={'New blog'} hideLabel={'Cancel'} ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
