const notificationReducer = (state = '', action) => {
  console.log('NOTIFICATION:', action)
  switch (action.type) {
    case 'NOTIFICATION':
      return action.data.message
    default: return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: { message: message }
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: { message: null }
      })
    }, time * 1000)
  }
}


export default notificationReducer