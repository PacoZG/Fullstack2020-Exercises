const notificationBody = {
  notification: null,
  timeoutID: null
}

const notificationReducer = (state = notificationBody, action) => {
  //console.log('NOTIFICATION:', action)
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'SET_TIMEOUTID':
      return {
        notification: state.notification,
        timeoutID: action.timeoutID
      }
    case 'SET_NOTIFICATION':
      if(state.timeoutID){
        clearTimeout(state.timeoutID)
      }
      return {
        notification: action.data.message,
        timeoutID: null
      }
    default: return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message: message }
    })
    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { message: null }
      })
    }, time * 1000)
    dispatch({
      type: 'SET_TIMEOUTID',
      timeoutID: timeoutID
    })
  }

}


export default notificationReducer