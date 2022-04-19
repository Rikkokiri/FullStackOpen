import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef(({ children, showLabel, hideLabel }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{hideLabel}</button>
      </div>
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        {showLabel}
      </button>
    </div>
  );
});

export default Togglable;
