import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAuthedUser } from '../actions/authedUser'

class Nav extends Component {
    componentDidMount() {
        this.props.dispatch(handleAuthedUser(this.props.authedUser))
    }
    render() {
        console.log('authedUser: ' + this.props.authedUser)

        // if(window.location.href == (`http://localhost:3000/pageNotFound`))
        // {
        //     return false;
        // }

        return (
            <div>
                {this.props.authedUser ? <div>
                    <nav className='nav nav-tabs'>
                        <ul className="col-md-12">
                            <li className="col-md-1">
                                <NavLink to='/' exact activeClassName='active' className="linkedli">
                                    Home
              </NavLink>
                            </li>
                            <li className="col-md-2">
                                <NavLink to='/add' activeClassName='active' className="linkedli">
                                    Add Question
              </NavLink>
                            </li>
                            <li className="col-md-1">
                                <NavLink to='/leaderboard' activeClassName='active' className="linkedli">
                                    Leaderboard
              </NavLink>
                            </li>
                            <li className="col-md-5"></li>
                            <li className="col-md-2">{this.props.authedUser}</li>
                            <li className="col-md-1">
                                <NavLink to='/logout' activeClassName='active' className="linkedli">
                                    Logout
              </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                    :
                    <div></div>}
                                <br/><br/>
            </div>

        )
    }
}

function mapStateToProps({ authedUser,users }) {
    let user =''
    return {
        authedUser: authedUser,
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(Nav);
