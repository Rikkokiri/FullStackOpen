import { useState } from 'react';

const Togglable = ({ children, showLabel, hideLabel }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

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
};

export default Togglable;
