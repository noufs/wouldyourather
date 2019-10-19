
import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/shared";
import PageNotFound from "./PageNotFound"
import { Redirect } from "react-router-dom";

class AnswerQuestion extends Component {

    state = {
        selectedAwnser: "",
        isSubmitted: false
    }


    handleInputChange = (e) => {
        const text = e.target.value;

        this.setState(() => ({
            selectedAwnser: text
        }));
    }

    handleSubmit(e, questionId) {
        e.preventDefault();

        const { selectedAwnser } = this.state

        this.props.dispatch(handleAddQuestionAnswer(questionId, selectedAwnser, this.props.authedUser))
        // this.props.dispatch(addUserAnswerToQuestion(questionId, selectedAwnser, this.props.authedUser))  /* Already called in handleAddQuestionAnswer */

        this.setState(() => ({
            selectedAwnser: "",
            isSubmitted: true
        }))

    }

    render() {
        const { selectedAwnser, isSubmitted } = this.state
        const { question_id, question, author } = this.props

        console.log("question: " + this.props.question)

        if (question === "") {
            return <PageNotFound />
        }

        if(window.location.href == (`http://localhost:3000/question/${question_id}/results`))
        {
            return false;
        }

        if (isSubmitted === true) {
            return <Redirect to={`/question/${question_id}/results`} />
        }

        return (
            <div>
                <div className="container">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header bg-light">{author.name} asks would you rather: </div>
                            <div className="card-body">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4">
                                            <img src={author.avatarURL}
                                                alt={`Avatar of ${author.id}`}
                                                className="avatar" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="question-info">
                                                <form onSubmit={(e) => this.handleSubmit(e, question_id)}>
                                                    <div className="form-check">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            id="optionOne"
                                                            value="optionOne"
                                                            onChange={this.handleInputChange}
                                                        />
                                                        <label
                                                            className="form-check-label">
                                                            {question.optionOne.text}
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            id="optionTwo"
                                                            value="optionTwo"
                                                            onChange={this.handleInputChange}
                                                        />
                                                        <label
                                                            className="form-check-label">
                                                            {question.optionTwo.text}
                                                        </label>
                                                    </div>
                                                    <br />
                                                    <button
                                                        className="btn btn-info"
                                                        type="submit"
                                                        disabled={selectedAwnser === ""}>
                                                        Submit
                                                            </button>
                                                </form>
                                            </div>
                                        </div>
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

function mapStateToProps({ authedUser, questions, users }, props) {
    const { question_id } = props.match.params

    var  neededQuestion = questions[question_id] ? questions[question_id] : ""
    var author = users[neededQuestion["author"]]

    return {
        question_id,
        question: neededQuestion,
        author: author,
        authedUser: authedUser,
    }
}

export default connect(mapStateToProps)(AnswerQuestion);