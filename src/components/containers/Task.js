    //          {task.title} <br />
	// 		    {task.description} <br />
	// 		    {task.category} <br />
	// 		    {task.profile.username} <br />
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {
    componentDidMount(){
        console.log('componentDidMount: '+JSON.stringify(this.props)) 

     //    const taskId = this.props.params.id
     //    const task = this.props.tasks[taskId]

    	// console.log('componentDidMount: '+JSON.stringify(task)) 

    	//garb the task from the store:

    }

	render(){
		//garb the task from the store:
        // const taskId = this.props.params.id
        // const task = this.props.tasks[taskId]

		return(
			<div>

			    TASK CONTAINER
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task
	}
}


export default connect(stateToProps)(Task)


