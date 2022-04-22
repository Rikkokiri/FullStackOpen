import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLike, removeBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const allowDelete = blog.user.username === user.username;

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="blog-details">
      <div className="blog-summaryrow">
        <span>
          {blog.title} by {blog.author}{' '}
        </span>
        <button onClick={toggleDetails}>{showDetails ? 'Hide' : 'View'}</button>
      </div>
      {showDetails && (
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
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default Blog;
