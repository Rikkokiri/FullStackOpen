import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

/**
 * 7.16 - Implement a separate view for blog posts.
 * Users should be able to access the view by clicking the name of the blog post
 * in the view that lists all of the blog posts.
 *
 * After you're done with this exercise, the functionality that was implemented
 * in exercise 5.7 is no longer necessary. Clicking a blog post no longer needs
 * to expand the item in the list and display the details of the blog post.
 */
const Blog = () => {
  const blogId = useParams().blogId
  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogId))
  const user = useSelector((state) => state.login.currentUser)
  const allowDelete = blog?.user.username === user.username
  const dispatch = useDispatch()

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  if (blog === undefined) {
    return (
      <div>
        <h2>Blog not found</h2>
      </div>
    )
  }

  return (
    <div className="blog-details">
      <h2>{blog.title}</h2>
      <h3>by {blog.author}</h3>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <div className="blog-likes">
          Likes {blog.likes}{' '}
          <button onClick={() => handleLike(blog)}>Like</button>
        </div>
        <div>{blog.user.username}</div>
        {allowDelete && (
          <button onClick={() => removeBlog(blog)}>Remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
