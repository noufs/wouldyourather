import React, { Component, Fragment } from 'react'
import { withRouter, Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleGetQuestions } from '../actions/questions'
import { handleGetUsers } from '../actions/users'
import { handleAuthedUser } from '../actions/authedUser'
import Dashboard from './Dashboard'
import LoginUser from './LoginUser'
import AnswerQuestion from './AnswerQuestion'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard'
import QuestionResults from './QuestionResults'
import PageNotFound from './PageNotFound'
import Logout from './Logout'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import ProtectedRoute from './ProtectedRoute'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleAuthedUser(this.props.authedUser))
    this.props.dispatch(handleGetQuestions())
    this.props.dispatch(handleGetUsers())
  }
  render() {

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>

            <div>
              <Nav />
              <ProtectedRoute path='/' exact component={Dashboard} isAuthed={this.props.isAuthed} />
              <ProtectedRoute path="/question/:question_id" component={AnswerQuestion} isAuthed={this.props.isAuthed} />
              <ProtectedRoute path="/add" component={AddQuestion} isAuthed={this.props.isAuthed} />
              <ProtectedRoute path="/leaderBoard" component={Leaderboard} isAuthed={this.props.isAuthed} />
              <ProtectedRoute path="/question/:question_id/results" component={QuestionResults} isAuthed={this.props.isAuthed} />
              <ProtectedRoute path="/logout" component={Logout} isAuthed={this.props.isAuthed} />
              <Route path="/login" component={LoginUser} />
              <ProtectedRoute path="/pageNotFound" component={PageNotFound} />

            </div>
            {/* {this.props.isAuthed === true
              ?
              <div>

              </div>
              : <div>
                <Redirect to="/login" />
                {/* <LoginUser requestedPath={window.location.pathname} /> }
              </div> */}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser,
    isAuthed: authedUser != null ? true : false
  }
}

export default connect(mapStateToProps)(App);
