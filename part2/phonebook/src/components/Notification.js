import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else if (message.error) {
    return <div className="error">{message.msg}</div>;
  } else {
    return <div className="status">{message.msg}</div>;
  }
};

export default Notification;
