import React, { useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import {
  createBlog,
  deleteBlog,
  likeBlog,
  selectSortedBlogs,
} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const HomePage = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => selectSortedBlogs(state))

  const createNewBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
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

  return (
    <div>
      <Togglable showLabel={'New blog'} hideLabel={'Cancel'} ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default HomePage
