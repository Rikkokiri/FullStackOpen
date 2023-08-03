import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, removeBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const allowDelete = blog.user.username === user.username

  const toggleDetails = () => {
    setShowDetails((prev) => !prev)
  }

  return (
    <li className="blog-entry">
      <div className="blog-summaryrow">
        <span className="blog-entry-heading">
          <span className="blog-title">{blog.title}</span>
          <br /> <span className="blog-author">by {blog.author} </span>
        </span>
        <button onClick={toggleDetails} className="blog-view button-dark-solid">
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>
      {showDetails && (
        <div className="blog-details">
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>

          <div className="blog-submitter">
            Submitted by: {blog.user.username}
          </div>
          <div className="blog-actions">
            <div className="blog-likes">
              <span className="blog-like-count">
                {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
              </span>
              <button onClick={() => handleLike(blog)} className="blog-like">
                Like
              </button>
            </div>
            {allowDelete && (
              <button
                className="blog-remove button-dark-solid"
                onClick={() => removeBlog(blog)}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
