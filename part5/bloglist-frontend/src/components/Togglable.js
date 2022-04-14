import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef(({ children, showLabel, hideLabel }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      {visible ? (
        <div>
          {children}
          <button onClick={toggleVisibility}>{hideLabel}</button>
        </div>
      ) : (
        <button onClick={toggleVisibility}>{showLabel}</button>
      )}
    </div>
  );
});

export default Togglable;
