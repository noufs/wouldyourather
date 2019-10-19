import React, { Component } from 'react'
import {Redirect } from 'react-router-dom'
import {AuthedUserLogout}  from '../actions/authedUser'
import {connect} from 'react-redux'
class Logout extends Component {

  componentDidMount() {
    this.props.dispatch(AuthedUserLogout())
}

  render() {
    return ( <Redirect to="/login" />)
  }
}

export default connect()(Logout);
