import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from '../reducers/userReducer'

const UserPage = () => {
  const { userId } = useParams()
  const user = useSelector(selectUserById(userId))

  // TODO: Handle case of user not found vs. still loading
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
