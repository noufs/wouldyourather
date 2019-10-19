import React, { Component, Fragment } from 'react'
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'
import { connect } from 'react-redux'


class AddQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    };

    handleOptionOneChange = (e) => {
        const text = e.target.value;

        this.setState({
            optionOne: text
        });
    };

    handleOptionTwoChange = (e) => {
        const text = e.target.value;

        this.setState({
            optionTwo: text
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { optionOne, optionTwo } = this.state
        const { dispatch } = this.props
        
        this.props.dispatch(handleAddQuestion(optionOne, optionTwo, this.props.authedUser))


        this.setState({
            optionOne: '',
            optionTwo: '',
            toHome: true
        })
    }

    render() {
        const { optionOne, optionTwo, toHome } = this.state;

        if (toHome === true) {
            return <Redirect to='/' />;
        }

        return (
            <div>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-md-10'>
                            <div className='card'>
                                <div className='card-header bg-light'>Create New Question</div>
                                <div className='card-body'>
                                    <div className='container'>
                                        <div className='col-md-12'>
                                            <p>Would You Rather?</p>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className='form-group'>
                                                    <input
                                                        className='form-control'
                                                        placeholder='first option'
                                                        value={optionOne}
                                                        onChange={this.handleOptionOneChange}
                                                    />
                                                </div>
                                                <h3 style={{textAlign :'center'}}>OR</h3>
                                                <div className='form-group'>
                                                    <input
                                                        className='form-control'
                                                        placeholder='second option'
                                                        value={optionTwo}
                                                        onChange={this.handleOptionTwoChange}
                                                    />
                                                </div>
                                                <br />
                                                <input type='submit'
                                                    name='submit'
                                                    id='submit'
                                                    value={"Submit"}
                                                    className='btn btn-info'
                                                    disabled={optionOne === '' || optionTwo === ''
                                                    } />
                                            </form>
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

function mapStateToProps({ authedUser }) {
    return {
        authedUser: authedUser,
    }
}
export default connect(mapStateToProps)(AddQuestion)