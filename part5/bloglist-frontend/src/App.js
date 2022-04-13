import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import * as blogService from './services/blogs';
import * as loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // New blog details
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

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
      console.log('Error', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('bloglistUser');
  };

  const createBlog = async (event) => {
    event.preventDefault();
    // const url = blogUrl.trim();
    // TODO: Validate blog details

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogAuthor('');
      setBlogTitle('');
      setBlogUrl('');

      setBlogs(blogs.concat(returnedBlog));
    } catch (error) {
      // TODO: Show error message to user
      console.log('Error creating a blog', error);
    }
  };

  if (!user) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name || user.username} logged in</p>{' '}
      <button onClick={handleLogout}>Log out</button>
      <BlogForm
        createBlog={createBlog}
        title={blogTitle}
        setTitle={setBlogTitle}
        author={blogAuthor}
        setAuthor={setBlogAuthor}
        url={blogUrl}
        setUrl={setBlogUrl}
      />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
