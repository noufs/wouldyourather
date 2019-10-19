import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAuthedUser } from '../actions/authedUser'
import { handleGetUsers } from '../actions/users'
import reducers from '../reducers'

class LoginUser extends Component {

    state = {
        selectedUser: '',
        isLoggedIn: false
    }


    componentDidMount() {
        this.props.dispatch(handleGetUsers())
    }

    handleChange = (e) => {
        this.setState({ selectedUser: e.target.value })

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props

        dispatch(handleAuthedUser(this.state.selectedUser))

        this.setState({ isLoggedIn: true })
    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }

        const { isLoggedIn } = this.state

        if (isLoggedIn === true) {
            return <Redirect to={from} />
        }


        if (this.props.loading === true) {
            return <p>...</p>
        }

        if (!this.props.users) {
            return <p>no user available</p>
        }

        return (
            <div>
                <div className="container">
                    <br /> <br />
                    <div className="justify-content-center">

                    <div className="col-md-10">
                            <div className="card">
                                <div className="card-header bg-light"><h3>Select a user to login</h3></div>
                                <div className="card-body">
                                    <div className="justify-content-center">
                                        <form id="LoginForm" onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <select className="form-control" id="authUser"
                                                    onChange={(e) => this.handleChange(e)}>
                                                    <option></option>
                                                    {(Object.values(this.props.users)).map((user) => (
                                                        <option key={user.id} value={user.id}>
                                                            {user.id}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <button type="submit" className="btn btn-info" disabled={this.state.selectedUser === ''}>Login</button>
                                        </form>
                                        <br />
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

function mapStateToProps({ users }) {
    return {
        loading: users === null,
        users
    }
}
export default connect(mapStateToProps)(LoginUser)

