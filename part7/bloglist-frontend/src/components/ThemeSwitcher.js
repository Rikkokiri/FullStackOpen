import useDarkMode from 'use-dark-mode'
import { Switch } from '@nextui-org/react'

export const ThemeSwitcher = () => {
  const darkMode = useDarkMode(false)

  return (
    <div>
      <Switch
        defaultSelected
        size="sm"
        color="success"
        // startContent={<SunIcon />}
        // endContent={<MoonIcon />}
        onChange={darkMode.toggle}
      >
        Dark mode
      </Switch>
    </div>
  )
}
