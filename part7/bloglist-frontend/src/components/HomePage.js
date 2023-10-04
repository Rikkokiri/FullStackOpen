import React, { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, selectSortedBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Card, CardBody } from '@nextui-org/react'

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

  return (
    <div>
      <Togglable showLabel={'New blog'} hideLabel={'Cancel'} ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <br />
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="my-3 no-border">
            <Card className="px-1 py-0 text-default-400 hover:bg-secondary-100">
              <CardBody className="py-3">
                <Link to={`/blogs/${blog.id}`} color="foreground">
                  {blog.title}
                </Link>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
