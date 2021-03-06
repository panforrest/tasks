import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextUtils, DateUtils } from '../../utils'
import actions from '../../actions'
import { Link } from 'react-router'
import Promise from 'bluebird'

class Task extends Component {
    constructor(){
        super()
        this.state = {
            // fetchData: true,
            inLoop: false,
            message: {
                text: ''
            }
        }
    }

    componentDidMount(){
        console.log('componentDidMount: '+ this.props.params.id)
        
        if (this.props.messages[this.props.params.id] != null)
            return

        this.setState({
            inLoop: true
        })
        // this.props.fetchMessages({task: this.props.params.id})
        this.fetchMessages()

    }

    

    fetchMessages(){
        this.props.fetchMessages({task: this.props.params.id})
        .then(response => {
            console.log('IN LOOP?: '+this.state.inLoop)
            console.log('LOCATION?: '+JSON.stringify(this.props.router.location))
            // wrong path, bail out
            if(this.props.router.location.pathname != '/task/'+this.props.params.id)
                return

            if(this.state.inLoop == false)
                return

            setTimeout(() => {
                this.fetchMessages()
            }, 3*1000)
        })
        .catch(err => {
            console.log('ERROR: '+err)
        })
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

        const messages = this.props.messages[taskId]


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

                <h3>Replies</h3>
                <ol>
                    { (messages == null) ? <p>No Replies</p> :
                        messages.map((message, i) => {
                            return <li key={message.id}>{message.text} by <Link to={'/profile/'+message.profile.id}>{message.profile.username}</Link></li>
                        })
                    }
                </ol>


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
        account: state.account,
        messages: state.message
    }
}

const dispatchToProps = (dispatch) => {
    return {
        createMessage: (params) => dispatch(actions.submitMessage(params)),
        notify: (params) => dispatch(actions.notify(params)),
        fetchMessages: (params) => dispatch(actions.fetchMessages(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Task) 

