import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login(username, password))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-login">
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
      <button id="submit-login" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
