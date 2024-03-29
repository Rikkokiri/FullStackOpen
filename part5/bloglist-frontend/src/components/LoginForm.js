import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await handleLogin(username, password)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-login" data-cy="login-form">
      <div>
        <label htmlFor="username">Username </label>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          name="username"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password </label>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name="password"
          id="password"
        />
      </div>
      <button id="submit-login" type="submit">
        Login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
