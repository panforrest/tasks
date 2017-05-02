import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {
    componentDidMount(){
    	console.log('componentDidMount: ')
    }

	render(){
		return(
			<div>
			    Task container.
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
