import {_getQuestions} from '../utils/_DATA'
import {showLoading, hideLoading} from 'react-redux-loading'
export const ADD_QUESTION = 'ADD_QUESTION'
export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION'

export function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}

export function getQuestions(questions) {
    return {
      type: GET_QUESTIONS,
      questions,
    }
  }

  export function addAnswerToQuesion (authedUser, qid,answer) {
    return {
      type: ADD_ANSWER_TO_QUESTION,
      authedUser,
      answer,
      qid
    }
  }
  
  export function handleGetQuestions() {
    return (dispatch) => {
      dispatch(showLoading())
        return _getQuestions()
            .then((questions) => {
                dispatch(getQuestions(questions))
                dispatch(hideLoading())
            })
    }
}
 