    //          {task.title} <br />
	// 		    {task.description} <br />
	// 		    {task.category} <br />
	// 		    {task.profile.username} <br />
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {
    componentDidMount(){
        console.log('componentDidMount: '+JSON.stringify(this.props.user)) 

     //    const taskId = this.props.params.id
     //    const task = this.props.tasks[taskId]

    	// console.log('componentDidMount: '+JSON.stringify(task)) 

    	//garb the task from the store:

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
					    <textarea placeholder="Enter Message to Respond"></textarea><br />
					    <button>Submit</button>
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


