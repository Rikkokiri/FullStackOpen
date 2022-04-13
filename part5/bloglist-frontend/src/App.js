import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import * as blogService from './services/blogs';
import * as loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistUser');
    if (userJSON) {
      const parsedUser = JSON.parse(userJSON);
      setUser(parsedUser);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Logging in');

    try {
      const user = await loginService.login({ username, password });
      console.log('login response', user);
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

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h1>Log in to the application</h1>
        <div>
          <label htmlFor="username">username </label>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name="username"
            id="username"
          />
        </div>
        <div>
          <label htmlFor="password">password </label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="password"
            id="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };

  if (!user) {
    return loginForm();
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name || user.username} logged in</p>{' '}
      <button onClick={handleLogout}>Log out</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
