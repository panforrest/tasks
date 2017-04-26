import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { APIManager } from '../../utils'
import { Authenticate } from '../view'

class Account extends Component {
    constructor(){
    	super()
    	this.state = {
    		profile: {

    		}
    	}
    }


    updateUser(event){
        // console.log('updateUser: '+event.target.id+' == '+event.target.value)
        let updated = Object.assign({}, this.state.profile)
        updated[event.target.id] = event.target.value
        this.setState({
        	profile: updated
        })
    }

    submitUser(event){
    	console.log('submitUser: '+JSON.stringify(this.state.profile))
        APIManager.post('/api/profile', this.state.profile)
        .then(response => {
            console.log('CREATED USER: '+JSON.stringify(response))
        })
        .catch(err => {
            console.log(JSON.stringify(err))
        })

    	//THIS APIMANAGER CALL CANNOT CONSOLE LOG CREATED USER BECAUSE APIMANAGER IS USING PROMISE
        // APIManager.post('/api/profile', this.state.profile, (err, response) => {
        // 	if (err) {
        // 		alert(err)
        // 		return
        // 	}
        // 	console.log('CREATED USER: '+JSON.stringify(response))
        // })
    }

	render(){
		return (
			<div>
			    <h2>Account</h2>
			    <h3>Sign Up</h3>

			    <input onChange={this.updateUser.bind(this)} type="text" placeholder="Username" id="username"/><br />
			    <input onChange={this.updateUser.bind(this)} type="text" placeholder="Password" id="password"/><br />
			    <input onChange={this.updateUser.bind(this)} type="text" placeholder="Phone" id="phone"/><br />
			    <input onChange={this.updateUser.bind(this)} type="text" placeholder="Email" id="email"/><br />
			    <button onClick={this.submitUser.bind(this)}>Join</button>

			    <h3>Login</h3>

			    <input onChange={this.updateUser.bind(this)} type="text" placeholder="Username" id="username"/><br />
			    <input onChange={this.updateUser.bind(this)} type="text" placeholder="Password" id="password"/><br />

			    <button onClick={this.submitUser.bind(this)}>Login</button>
			    <Authenticate />
			</div>
		)
	}
}

export default Account