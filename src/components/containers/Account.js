import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
// import { APIManager } from '../../utils'
import { Authenticate } from '../view'

class Account extends Component {

    login(credentails){
    	console.log('login: '+JSON.stringify(credentials))

    }

    register(credentails){
        console.log('register: '+JSON.stringify(credentials))
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

export default Account