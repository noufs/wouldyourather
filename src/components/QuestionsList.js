import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class QuestionsList extends Component {

    render() {
        const { question } = this.props;

        if (question === null) {
            return <p>This question doesn't exist.</p>
        }

        const { name, id, avatar, optionOne, optionTwo, hasAnswerd } = question;

        if (this.props.questionsToShow === 'answered' && hasAnswerd !== true) {
            return false;
        }

        if (this.props.questionsToShow === 'unanswered' && hasAnswerd === true) {
            return false;
        }

        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className="col-md-12" >
                        <div className='card'>
                            <div className="card-header bg-light ">{name} asks would you rather...</div>
                            <div>
                                <div className='question-info' >
                                    <div>
                                        <img src={avatar} alt={`${name} avatar`} className='avatar' />
                                    </div>
                                    <div>
                                        <p style={{ color: '#436350' }}>{optionOne.text} <strong>OR</strong> {optionTwo.text}</p>
                                        <Link to={this.props.questionsToShow === 'unanswered' ? `/question/${id}` : `/question/${id}/results`} >
                                            <button className="btn btn-info">{this.props.questionsToShow === 'answered' ? 'View Poll' : 'Answer'}</button>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

function mapStateToProps({ authedUser, users, questions }, { id, questionsToShow }) {
    const question = questions[id];
    return {
        authedUser,
        question: formatQuestion(question, users[question.author], authedUser),
        questionsToShow
    }
}


export default connect(mapStateToProps)(QuestionsList)