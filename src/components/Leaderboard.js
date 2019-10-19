import React, { Component, Fragment } from "react"
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"


class Leaderboard extends Component {

    render() {

        const { users } = this.props;

        let usersInfo = Object.keys(users).map((key) => {
            let questionsAnswered = Object.keys(users[key].answers).length;
            let questionsAsked = Object.keys(users[key].questions).length;

            return {
                "name": users[key].name,
                "avatar": users[key].avatarURL,
                "questionsAnswered": questionsAnswered,
                "questionsAsked": questionsAsked,
                "totalScore": questionsAnswered + questionsAsked
            }
        })

        usersInfo.sort((a, b) => {
            if (b.totalScore < a.totalScore) return -1
            if (b.totalScore > a.totalScore) return 1
            return 0;
        })

        return (
            <div>
                <div className="container">
                    <div className='row justify-content-center'>

                        <div className="col-md-10">
                            {usersInfo.map((user, index) => {
                                return (
                                    <div className="margin-top-10" key={index}>
                                        <div className="card">
                                            <div className="card-header bg-light">{user.name}</div>
                                            <div className="card-body">
                                                <div className="container">
                                                    <div className="row justify-content-center">
                                                        <div className="col-md-4">
                                                            <img src={user.avatar} alt={`Avatar of ${user.name}`}
                                                                className="avatar" />
                                                        </div>
                                                        <div className="col-md-5">
                                                            <p>Answered Questions:
                                                              <span>{user.questionsAnswered}</span>
                                                            </p>
                                                            <p>Created Questions:
                                                              <span>{user.questionsAsked}</span>
                                                            </p>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="score">{user.totalScore}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><br />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users: users
    }
}
export default connect(mapStateToProps)(Leaderboard);
