import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import * as blogService from './services/blogs'
import * as loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const LOCAL_STORAGE_USER = 'bloglistUser'
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const blogFormRef = useRef()

  const loadBlogs = () => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }

  useEffect(() => {
    loadBlogs()
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem(LOCAL_STORAGE_USER)
    if (userJSON) {
      const parsedUser = JSON.parse(userJSON)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user))
    } catch (error) {
      showNotification(error.response.data.error, true)
      throw error
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem(LOCAL_STORAGE_USER)
  }

  const showNotification = (message, error = false, delay = 2500) => {
    setStatusMessage({
      msg: message,
      error: error,
    })
    setTimeout(() => {
      setStatusMessage(null)
    }, delay)
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      showNotification(
        `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`
      )
      loadBlogs()
    } catch (error) {
      console.log('Error creating a blog', error)
      showNotification(error.response.data.error, true, 5000)
      throw error // Throw error so blog form knowns error happened and does not reset fields
    }
  }

  const handleLike = async (blog) => {
    await blogService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    })
    loadBlogs()
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      loadBlogs()
    }
  }

  if (!user) {
    return (
      <div>
        <h1>Log in to Bloglist</h1>
        <Notification message={statusMessage} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1 className="app-heading">Bloglist</h1>
        <div className="logged-in-details">
          <span className="user-details">
            {user.name ? user.name : user.username} logged in{' '}
          </span>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </header>
      {statusMessage && <Notification message={statusMessage} />}
      <Togglable showLabel={'New blog'} hideLabel={'Cancel'} ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <ul className="blog-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
