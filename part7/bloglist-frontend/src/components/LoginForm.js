import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
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
      <div className="flex flex-col gap-4 mt-2">
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          name="username"
          id="username"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name="password"
          id="password"
        />
        <Button id="submit-login" type="submit">
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
