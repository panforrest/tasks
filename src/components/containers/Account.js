import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
// import { APIManager } from '../../utils'
import { Authenticate } from '../view'

class Account extends Component {

    login(credentials){
    	console.log('login: '+JSON.stringify(credentials))
    	this.props.login(credentials)

    }

    register(credentials){
        console.log('register: '+JSON.stringify(credentials))
        this.props.register(credentials)
    }

	render(){
		return (
			<div>
                <h2>Account</h2>
			    <Authenticate 
			        onLogin={this.login.bind(this)} 
			        onRegister={this.register.bind(this)} />

			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		user: state.account.user //can be null
	}
}

const dispatchToProps = (dispatch) => {
	return{
		register: (credentials) => dispatch(actions.register(credentials)),
		login: (credentials) => dispatch(actions.login(credentials))
	}
}

export default connect(stateToProps, dispatchToProps)(Account)