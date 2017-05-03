    //          {task.title} <br />
	// 		    {task.description} <br />
	// 		    {task.category} <br />
	// 		    {task.profile.username} <br />
import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        // console.log('componentDidMount: '+JSON.stringify(this.props.user)) 

     //    const taskId = this.props.params.id
     //    const task = this.props.tasks[taskId]

    	// console.log('componentDidMount: '+JSON.stringify(task)) 

    	//garb the task from the store:

    }

    submitMessage(event){
    	event.preventDefault()
        console.log('submitMessage: '+JSON.stringify(this.state.message))
    }

    updateMessage(event){
    	// console.log('updateMessage: '+'event.target.id'+' == '+'event.target.value')
    	console.log('updateMessage: '+' == '+event.target.value)
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

		return(
			<div>
                {task.title} <br />
			    {task.description} <br />
			    {task.category} <br />
			    {task.profile.username} <br />
               
                {(this.props.account.user == null) ? <h3>Please log in or Register to Reply.</h3> : 
                	<div><h2>Reply</h2>
					    <textarea onChange={this.updateMessage.bind(this)} placeholder="Enter Message to Respond" id="text"></textarea><br />
					    <button onClick={this.submitMessage.bind(this)}>Submit</button>
			        </div>
			    }
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task,
		account: state.account
	}
}

export default connect(stateToProps)(Task)


