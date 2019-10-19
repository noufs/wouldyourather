import { _saveQuestion,_saveQuestionAnswer } from '../utils/_DATA';
import { addUserAnswerToQuestion,addUserQuestion } from './users';
import { addAnswerToQuesion, addQuestion } from './questions';
import { showLoading,hideLoading } from 'react-redux-loading'


export function handleAddQuestion (optionOneText, optionTwoText, author) {
    return (dispatch, getState) => {
        dispatch(showLoading())

    
        _saveQuestion({optionOneText,optionTwoText,author})
        .then((question) => {
            dispatch(addQuestion(question))
            dispatch(addUserQuestion(question))
            dispatch(hideLoading())
        })
    }
}

export function handleAddQuestionAnswer (qid, answer, authedUser) {
    return (dispatch) => {
        dispatch(showLoading())
        
        _saveQuestionAnswer({authedUser, qid, answer})
        .then(() => {
            dispatch(addAnswerToQuesion(authedUser, qid,answer))
            dispatch(addUserAnswerToQuestion(authedUser, qid,answer))
            dispatch(hideLoading())
        });
    }
}
