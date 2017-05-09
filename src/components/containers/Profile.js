				// <br />
				// <span>{this.props.profile.username}</span>
				// <br />
				// <span>{this.props.profile.email}</span>
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Profile extends Component {

	componentDidMount(){
        const id = this.props.params.id
		console.log('ID: '+id)
		// let path = '/api/profile'
		this.props.fetchProfile(id)
		// console.log('PROFILE: '+JSON.stringify(this.props.profile))
		// console.log('MESSAGE: '+JSON.stringify(this.props.message))
		// console.log('PARAMS: '+JSON.stringify(this.props.params))

//		console.log(JSON.stringify(this.props.profile))
	}

	render(){
		return (
			<div>
				Profile Container
				// <br />
				// <span>{this.props.profile.username}</span>
				// <br />
				// <span>{this.props.profile.email}</span>

			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		message: state.message,
		// profile: state.account.user,  //alway logged in person, not profile
		profile: state.profile
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchProfile: (id) => dispatch(actions.fetchProfile(id))
	}
}

export default connect(stateToProps, dispatchToProps)(Profile)

