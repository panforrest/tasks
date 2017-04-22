import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { CreateTask } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'

class Categories extends Component {
    componentDidMount(){
    	// console.log('componentDidMount: ')
    	this.props.fetchTasks(null)
    	.then(results => {

    	})
    	.catch(err => {
    		alert(err)
    	})

    }

	render(){
		return(
	        <div>
	            <h2>Categories</h2>
                    { (this.props.tasks.all == null) ? null:
                    	this.props.tasks.all.map((task, i) => {
                    		return (
                                <li key={task.id}>{task.category}</li>
                    		)
                    	})


                    }

	        </div>
	    )    
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchTasks: (tasks) => dispatch(actions.fetchTasks(tasks))
	}
}

export default connect(stateToProps, dispatchToProps)(Categories)