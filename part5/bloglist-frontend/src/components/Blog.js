import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

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
            Likes {blog.likes} <button>Like</button>
          </div>
          <div>{blog.user.username}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
