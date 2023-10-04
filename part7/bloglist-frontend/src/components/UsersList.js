import { useSelector } from 'react-redux'
import { selectSortedUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'

const UsersList = () => {
  const users = useSelector((state) => selectSortedUsers(state))

  return (
    <div>
      <h2 className="text-xl mb-4">Users</h2>
      <Table aria-label="users table" removeWrapper>
        <TableHeader>
          <TableColumn>Username</TableColumn>
          <TableColumn>Blogs created</TableColumn>
        </TableHeader>
        <TableBody items={users}>
          {(user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs.length ?? '0'}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersList
