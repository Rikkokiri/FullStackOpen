import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from '../reducers/userReducer'

/**
 *
 * 7.15 - Implement a view for individual users that displays
 * all of the blog posts added by that user.
 * You can access the view by clicking the name of the user
 * in the view that lists all users.
 */
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
