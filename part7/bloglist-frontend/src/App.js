import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import * as blogService from './services/blogs';
import * as loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, addBlog } from './reducers/blogReducer';

const App = () => {
  const blogsFromRedux = useSelector(({ blogs }) => {
    return blogs.sort((a, b) => b.likes - a.likes);
  });
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistUser');
    if (userJSON) {
      const parsedUser = JSON.parse(userJSON);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem('bloglistUser', JSON.stringify(user));
    } catch (error) {
      showNotification(error.response.data.error, true);
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('bloglistUser');
  };

  // TODO: move implementation details to redux
  const showNotification = (message, error = false, delay = 2500) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { error: error, message: message },
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, delay);
  };

  const createBlog = async (blogObject) => {
    try {
      dispatch(addBlog(blogObject));
      blogFormRef.current.toggleVisibility();
      showNotification(
        `A new blog "${blogObject.title}" by ${blogObject.author} added`
      );
    } catch (error) {
      console.log('Error creating a blog', error);
      showNotification(error.response.data.error, true, 5000);
      throw error; // Throw error so blog form knowns error happened and does not reset fields
    }
  };

  const handleLike = async (blog) => {
    await blogService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });
    // loadBlogs();
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
      await blogService.remove(blog.id);
      // loadBlogs();
    }
  };

  if (!user) {
    return (
      <div>
        <h1>Log in to the application</h1>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
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
      {blogsFromRedux.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
