import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
    <div className="togglable">
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility} className="button-dark-solid">
          {hideLabel}
        </button>
      </div>
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        {showLabel}
      </button>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
}

export default Togglable
