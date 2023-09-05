import { Link as RRDLink } from 'react-router-dom'
import {
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Spacer,
} from '@nextui-org/react'
import { ThemeSwitcher } from './ThemeSwitcher'

const Header = ({ user, handleLogout }) => {
  return (
    <Navbar isBordered position="sticky" maxWidth="xl">
      <NavbarContent>
        <NavbarItem>
          <Link as={RRDLink} to="/">
            Blogs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={RRDLink} to="/users">
            Users
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <span>{user.name ? user.name : user.username} logged in </span>
        </NavbarItem>
        <NavbarItem>
          <Button variant="ghost" onClick={handleLogout}>
            Log out
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
