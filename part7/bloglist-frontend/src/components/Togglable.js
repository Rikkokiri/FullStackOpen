import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@nextui-org/react'

const Togglable = forwardRef(({ children, showLabel, hideLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible((prev) => !prev)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={toggleVisibility} className="mt-4">
          {hideLabel}
        </Button>
      </div>
      <Button
        style={hideWhenVisible}
        onClick={toggleVisibility}
        className="mt-4"
        color="primary"
      >
        {showLabel}
      </Button>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
}

export default Togglable
