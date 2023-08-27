import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div style={{ display: 'inline-flex', gap: '1rem', paddingLeft: '0.5rem' }}>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
    </div>
  )
}

export default Nav
