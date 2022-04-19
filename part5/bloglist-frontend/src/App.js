import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import * as blogService from './services/blogs';
import * as loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistUser');
    if (userJSON) {
      const parsedUser = JSON.parse(userJSON);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Logging in');

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem('bloglistUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
      setStatusMessage({ msg: error.response.data.error, error: true });
      setTimeout(() => {
        setStatusMessage(null);
      }, 2500);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('bloglistUser');
  };

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      blogFormRef.current.toggleVisibility();

      setStatusMessage({
        msg: `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`,
        error: false,
      });
      setTimeout(() => {
        setStatusMessage(null);
      }, 2500);

      setBlogs(blogs.concat(returnedBlog));
    } catch (error) {
      console.log('Error creating a blog', error);
      setStatusMessage({ msg: error.response.data.error, error: true });
      setTimeout(() => {
        setStatusMessage(null);
      }, 5000);
      throw error; // Throw error so blog form knowns error happened and does not reset fields
    }
  };

  if (!user) {
    return (
      <div>
        <h1>Log in to the application</h1>
        <Notification message={statusMessage} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      {statusMessage && <Notification message={statusMessage} />}
      <div>
        <span>{user.name ? user.name : user.username} logged in </span>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <Togglable showLabel={'New blog'} hideLabel={'Cancel'} ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
