const notificationReducer = (state = '', action) => {
  //console.log('NOTIFICATION:', action)
  switch (action.type) {
    case 'NOTIFICATION':
      return action.data.message
    default: return state
  }
}

export const showNotification = async (dispatch, message) => {
  await dispatch(setNotification(message))
  setTimeout( () => {
    dispatch(setNotificationNull())
  }, 5000)
  return
}

const setNotification = (message) => {
  return {
    type: 'NOTIFICATION',
    data: { message: message }
  }
}

const setNotificationNull = () => {
  return {
    type: 'NOTIFICATION',
    data: { message: null }
  }
}

export default notificationReducer