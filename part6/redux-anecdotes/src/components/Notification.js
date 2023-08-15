import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  return props.notification ? (
    <div className="notification">{props.notification}</div>
  ) : null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.content,
  }
}

const ConnectedNotification = connect(mapStateToProps, null)(Notification)

export default ConnectedNotification
