import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Profile extends Component{
    componentDidMount(){
    	// console.log('ID: '+JSON.stringify(this.props.params.id))
    	console.log('ID: '+JSON.stringify(this.props.profile))
    }

	render(){
		return(
			<div>
			    Profile Container.
			    <span>{this.props.profile.id}</span>
			    <br />
			    <span>{this.props.profile.username}</span>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
        // task: state.task,
        // account: state.account
        message: state.message,
        profile: state.account
	}
}

export default connect(stateToProps)(Profile)
