import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {
    componentDidMount(){
    	console.log('componentDidMount: '+JSON.stringify(this.props.params.id))  
    }

	render(){
		return(
			<div>
			    Task container.{this.props.params.id}
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
