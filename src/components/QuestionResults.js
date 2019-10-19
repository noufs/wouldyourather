import React, { Component, Fragment } from "react"
import { connect } from "react-redux"


class QuestionResults extends Component {

  render() {

    const { question, author, authedUser } = this.props;

    if (question ===  undefined) {
      return false;
  }

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

    const authedUserAnswer = question.optionOne.votes.includes(authedUser) ? "optionOne" : "optionTwo";

    let optionOnePercent = Math.round((question.optionOne.votes.length * 100) / totalVotes);
    let optionTwoPercent = Math.round((question.optionTwo.votes.length * 100) / totalVotes);

    return (
      <div>
        <div className="container">
          <div className="col-md-10">
            <div className="card">
              <div className="card-header bg-light ">Question asked by {author.name}</div>
              <div className="card-body">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <img src={author.avatarURL}
                        alt={`Avatar of ${author.name}`}
                        className="avatar"/>
                    </div>
                    <div className="col-md-8">
                      <div className="question-info">
                        <div className="col-md-12 ">
                          <p>Results:</p>
                          <p>Would you rather</p>
                          <div className={`${(authedUserAnswer === 'optionOne') ? "authedUserAwnser" : ""}`}>{question.optionOne.text}?
                           <div className="progress">
                              <div className="progress-bar bg-info"
                                style={{ width: optionOnePercent + "%" }}></div>
                            </div>
                            <div>
                              <span>{question.optionOne.votes.length} out of {totalVotes} votes. ({optionOnePercent}%)</span>
                            </div>

                          </div>
                          <br />
                          <div className={`${(authedUserAnswer === 'optionTwo') ? "authedUserAwnser" : ""}`}>{question.optionTwo.text}?
                          <div className="progress">
                              <div className="progress-bar bg-info"
                                style={{ width: optionTwoPercent + "%" }}></div>
                                
                            </div>
                            <div>
                              <span>{question.optionTwo.votes.length} out of {totalVotes} votes. ({optionTwoPercent}%)</span>
                            </div>
                          </div>
                        </div>
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
  const { question_id } = props.match.params;

 if(questions[question_id] !== undefined){ var neededQuestion = questions[question_id];
  var author = users[neededQuestion["author"]];
  }

  return {
    question_id,
    question: neededQuestion,
    author: author,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(QuestionResults);
