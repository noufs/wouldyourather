export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const GET_AUTHED_USER = 'GET_AUTHED_USER'
export const AUTHED_USER_LOGOUT = 'AUTHED_USER_LOGOUT'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function getAuthedUser () {
  return {
    type: GET_AUTHED_USER,
  }
}

export function AuthedUserLogout () {
  return {
    type: AUTHED_USER_LOGOUT,
    id : null
  }
}

export function handleAuthedUser(id)
{
    return (dispatch) => {
        return dispatch(setAuthedUser(id))
    }
}