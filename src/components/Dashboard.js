import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionsList from './QuestionsList'
import { log } from 'util'

class Dashboard extends Component {

    // this.componentDidMount(){
    //     this.props.dispatch(handleAuthedUser())

    // }

    state = {
        questionsToShow: 'unanswered'
    };

    handleTabChange = (e, questionsToShow) => {
        this.setState(() => ({
            questionsToShow: questionsToShow,
        }));
    };

    render() {
        const { questionsToShow } = this.state;

        return (
            <div>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className="col-md-10">
                            <button type='button'
                                className={"btn btn-light tabs " + (questionsToShow === 'unanswered' ? 'active' : '')}
                                onClick={(e) => this.handleTabChange(e, 'unanswered')}>Unanswered Questions
                                </button>
                            <button type='button'
                                className={"btn btn-light tabs " + (questionsToShow === 'answered' ? 'active' : '')}
                                onClick={(e) => this.handleTabChange(e, 'answered')}>Answered Questions
                                </button>
                        <div className="card">
                        <ul>   {/* style={{backgroundColor:'#dae0e5'}} */}
                            {this.props.questionIds.map((id) => (
                                <li key={id}>
                                    <QuestionsList id={id} questionsToShow={questionsToShow} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions }) {
    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        questions: questions
    }
}

export default connect(mapStateToProps)(Dashboard)