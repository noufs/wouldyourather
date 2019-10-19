import { GET_USERS,ADD_USER_ANSWER_TO_QUESTION, ADD_USER_QUESTION} from '../actions/users'

export default function users(state = {}, action) {
    switch(action.type)
    {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER_ANSWER_TO_QUESTION:
                return {
                    ...state,
                    [action.authedUser]: {
                      ...state[action.authedUser],
                      answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                      }
                    }
                  }
      case ADD_USER_QUESTION:
        return {
          ...state,
          [action.question.author]: {
            ...state[action.question.author],
            questions: [...state[action.question.author].questions, action.question.id]
          }
        }
        default:
            return state
    }
}