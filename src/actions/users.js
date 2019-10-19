import { _getUsers } from '../utils/_DATA'
import { showLoading,hideLoading } from 'react-redux-loading'


export const GET_USERS = 'GET_USERS'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'
export const ADD_USER_ANSWER_TO_QUESTION = 'ADD_USER_ANSWER_TO_QUESTION'

export function getUsers(users){
    return {
        type: GET_USERS,
        users
    }
}

export function addUserQuestion(question){
    return{
        type:ADD_USER_QUESTION,
        question
    }
}

export function addUserAnswerToQuestion(authedUser, qid,answer){
    return{
        type: ADD_USER_ANSWER_TO_QUESTION,
        authedUser,
        answer,
        qid
    }
}

export function handleGetUsers(){
    return (dispatch) => {
        dispatch(showLoading())
        return _getUsers()
        .then((users) => {
            dispatch(getUsers(users))
            dispatch(hideLoading())
        })
    }
}