import useDarkMode from 'use-dark-mode'
import { Switch } from '@nextui-org/react'
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs'

export const ThemeSwitcher = () => {
  const darkMode = useDarkMode(false)

  return (
    <div>
      <Switch
        defaultSelected
        size="md"
        color="primary"
        alt="Switch between light and dark mode"
        startContent={<BsSunFill />}
        endContent={<BsFillMoonStarsFill />}
        onChange={darkMode.toggle}
      ></Switch>
    </div>
  )
}
