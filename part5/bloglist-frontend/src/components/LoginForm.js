const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
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

export default LoginForm;
