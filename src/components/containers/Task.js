import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {
    componentDidMount(){
        // console.log('componentDidMount: '+JSON.stringify(this.props.params.id)) 

        const taskId = this.props.params.id
        const task = this.props.tasks[taskId]

    	console.log('componentDidMount: '+JSON.stringify(task)) 

    	//garb the task from the store:

    }

	render(){
        const taskId = this.props.params.id
        const task = this.props.tasks[taskId]

		return(
			<div>
			    Task: {task.title}
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
