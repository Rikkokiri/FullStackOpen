import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const error = useSelector((state) => state.notification.error);

  if (!message) {
    return null;
  } else if (error) {
    return <div className="error">{message}</div>;
  } else {
    return <div className="status">{message}</div>;
  }
};

export default Notification;
