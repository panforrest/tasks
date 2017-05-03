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
               
                {(this.props.user == null) ? <h2>Please log in.</h2> : <div><h2>Reply</h2>
			    <textarea placeholder="Enter Message to Respond"></textarea><br />
			    <button>Submit</button></div>}

                
                
                


			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task,
		user: state.account.user
	}
}

const dispatchToProps = (dispatch) => {
	return{
		// register: (credentials) => dispatch(actions.register(credentials)),
		login: (credentials) => dispatch(actions.login(credentials)),
		// checkCurrentUser: () => dispatch(actions.checkCurrentUser())
	}
}

export default connect(stateToProps, dispatchToProps)(Task)


