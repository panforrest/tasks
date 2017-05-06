import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextUtils, DateUtils } from '../../utils'
import actions from '../../actions'

class Task extends Component {
    constructor(){
        super()
        this.state = {
            message: {
                text: ''
            }
        }
    }

    componentDidMount(){
        console.log('componentDidMount: ' + JSON.stringify(this.props))
    }

    updateMessage(event){
        let updated = Object.assign({}, this.state.message)
        updated['text'] = event.target.value
        this.setState({
            message: updated 
        })
    }

    submitMessage(event){
        event.preventDefault()
        let updated = Object.assign({}, this.state.message)

        const user = this.props.account.user
        updated['profile'] = {
            id: user.id,
            username: user.username
        }

        updated['task'] = this.props.params.id

        const taskId = this.props.params.id
        const task = this.props.tasks[taskId]

        this.props.createMessage(updated)
        .then(response => {
            const params = {
                recipient: task.profile.id,
                text: updated.text,
                taskResponder: updated.profile.username
            }

            return this.props.notify(params)
        })
        .then(response => {
            alert('Thanks for replying! Good Luck!')

        })
        .catch(err => {
            console.log('ERR: '+JSON.stringify(err))
        })
    }

    render(){
        // grab the task from the store:
        const taskId = this.props.params.id
        const task = this.props.tasks[taskId]

        return (

            <section style={{paddingTop:24}}>
                <header className="major">
                    <h2 style={{border:'none', marginBottom:0}}>{task.title}</h2>
                </header>
                <div className="posts">
                    <article style={{background:'#f9f9f9', border:'1px solid #ddd', padding:16}}>
                        <strong>{ TextUtils.capitalize(task.category) }</strong>
                        <br />
                        <strong>{ TextUtils.capitalize(task.profile.username) }</strong>
                        <br />
                        { DateUtils.formattedDate(task.timestamp) }

                        <hr />
                        <p>{task.description}</p>
                    </article>
                </div>

                { (this.props.account.user == null) ? <h3>Please Log in or Register to Reply</h3> :  
                    <div>
                        <h3>Reply</h3>
                        <textarea onChange={this.updateMessage.bind(this)} placeholder="Enter Message to Respond"></textarea>
                        <br />
                        <button onClick={this.submitMessage.bind(this)}>Submit</button>
                    </div>
                }
            </section>


        )
    }
}

const stateToProps = (state) => {
    return {
        tasks: state.task,
        account: state.account
    }
}

const dispatchToProps = (dispatch) => {
    return {
        createMessage: (params) => dispatch(actions.submitMessage(params)),
        notify: (params) => dispatch(actions.notify(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Task) 

