import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else if (message.error) {
    return <div className="error">{message.msg}</div>;
  } else {
    return <div className="status">{message.msg}</div>;
  }
};

Notification.propTypes = {
  message: PropTypes.shape({
    msg: PropTypes.string,
  }),
};

export default Notification;
