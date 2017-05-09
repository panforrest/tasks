                        // <Time value={task.timestamp} format="MMM DD, YYYY" />
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { TextUtils, DateUtils } from '../../utils'
// import Time from 'react-time'

class Task extends Component {
    constructor(){
    	super()
    	this.state = {
    		message: {
    			text: ''
    			// profile: {}
    		}
    	}
    }

    componentDidMount(){
        console.log('componentDidMount: '+JSON.stringify(this.props.params.id)) 

     //    const taskId = this.props.params.id
     //    const task = this.props.tasks[taskId]

    	// console.log('componentDidMount: '+JSON.stringify(task)) 

    	//garb the task from the store:
        this.props.fetchMessages(this.props.params.id)///this.props.fetchMessages(params)
    }

    submitMessage(event){
    	event.preventDefault()
        // console.log('submitMessage: '+JSON.stringify(this.state.message))
        let updated = Object.assign({}, this.state.message)
        const user = this.props.account.user
        updated['profile'] = {
            id: user.id,
            username: user.username
        }

        updated['task'] = this.props.params.id
        // console.log('submitMessage: '+JSON.stringify(updated))

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
            alert('Thanks for replying! Good luck!') 
               
        })
        .catch(err => {
            console.log('ERR: '+JSON.stringify(err.message))
        })
    }

    updateMessage(event){
    	// console.log('updateMessage: '+'event.target.id'+' == '+'event.target.value')
    	// console.log('updateMessage: '+' == '+event.target.value)
    	let updated = Object.assign({}, this.state.message)
    	updated['text'] = event.target.value
    	// updated = event.target.value
        this.setState({
        	message: updated 
        })
    }

	render(){
		// garb the task from the store:
        const taskId = this.props.params.id
        const task = this.props.tasks[taskId]
        const messages = this.props.messages[taskId]

		return(

            <section style={{paddingTop: 24}}>
                <header className="major">
                    <h2 style={{border:'none', marginBottom:0}}>{task.title}</h2>
                </header>
                <div className="posts">
                    <article style={{background: '#f9f9f9', border:'1px solid #ddd', padding: 16}}>
                        <strong>{ TextUtils.capitalize(task.category) }</strong> <br />
                        <strong>{ TextUtils.capitalize(task.profile.username) }</strong> <br />

                        { DateUtils.formattedDate(task.timestamp) }
                        <hr />                        
                        <p>{task.description} </p>


                    </article>  
                </div>
                <h3>Replies</h3>
                <ol>
                    { (messages == null) ? <p> No Replies </p> :
                        messages.map((message, i) => {
                            return <li key={message.id}>{message.text} by {message.profile.username}</li>
                        })
                    }
                </ol>


                
                
                    {(this.props.account.user == null) ? <h3>Please log in or Register to Reply.</h3> : 
                        <div><h2>Reply</h2>
                            <textarea onChange={this.updateMessage.bind(this)} placeholder="Enter Message to Respond" id="text"></textarea><br />
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


