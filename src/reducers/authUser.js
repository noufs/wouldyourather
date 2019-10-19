import { SET_AUTHED_USER, AUTHED_USER_LOGOUT } from '../actions/authedUser'

export default function authedUser (state = null, action) {
    switch (action.type) {
      case SET_AUTHED_USER:
        return action.id
      case AUTHED_USER_LOGOUT:
        return action.id
      default:
        return state
    }
  }