import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout } from './reducers/loginReducer'
import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersList from './components/UsersList'
import UserPage from './components/UserPage'
import Blog from './components/Blog'
import Header from './components/Header'
import useDarkMode from 'use-dark-mode'

const App = () => {
  const darkMode = useDarkMode(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login.currentUser)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!user) {
    return (
      <div>
        <h1>Log in to the application</h1>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div
      className={`${
        darkMode.value ? 'dark' : ''
      } text-foreground bg-background min-h-screen`}
    >
      <Header handleLogout={handleLogout} user={user} />
      <main className="max-w-7xl px-8">
        <h2>Blogs</h2>

        <Notification />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<HomePage />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:userId" element={<UserPage />} />
          <Route path="/blogs/:blogId" element={<Blog />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
