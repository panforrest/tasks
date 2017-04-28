import React, { Component } from 'react'

class Authenticate extends Component {

    constructor(){
        super()
        this.state = {
            credentials: {
                username: '',
                phone: '',
                email:'',
                password: ''
            }
        }
    }

    updatedCredentials(field, event){
        // console.log('updatedCredentials: '+field+' == '+event.target.value)
        let updated = Object.assign({}, this.state.credentials) 
        updated[field] = event.target.value
        this.setState({
            credentials: updated
        })
    }

    register(event){
        // console.log('register: '+JSON.stringify(this.state.credentials))
        this.props.onRegister(this.state.credentials)
    }

    login(event){
        // console.log('login: '+JSON.stringify(this.state.credentials))
        this.props.onLogin(this.state.credentials)
    }

    // updateUser(event){
    //     // console.log('updateUser: '+event.target.id+' == '+event.target.value)
    //     let updated = Object.assign({}, this.state.profile)
    //     updated[event.target.id] = event.target.value
    //     this.setState({
    //     	profile: updated
    //     })
    // }

    // register(event){
    // 	event.preventDefault()
    	// console.log('register: '+JSON.stringify(this.state.profile))
    //     // APIManager.post('/api/profile', this.state.profile)
    //     // .then(response => {
    //     //     console.log('CREATED USER: '+JSON.stringify(response))
    //     // })
    //     // .catch(err => {
    //     //     console.log(JSON.stringify(err))
    //     // })
        			

    // 	//THIS APIMANAGER CALL CANNOT CONSOLE LOG CREATED USER BECAUSE APIMANAGER IS USING PROMISE
    //     // APIManager.post('/api/profile', this.state.profile, (err, response) => {
    //     // 	if (err) {
    //     // 		alert(err)
    //     // 		return
    //     // 	}
    //     // 	console.log('CREATED USER: '+JSON.stringify(response))
    //     // })
    // }

	render(){
		return(
            <div>
			    <h2>Account</h2>
			    <h3>Sign Up</h3>

			    <input onChange={this.updatedCredentials.bind(this, 'username')} type="text" placeholder="Username" id="username"/><br />
			    <input onChange={this.updatedCredentials.bind(this, 'password')} type="text" placeholder="Password" id="password"/><br />
			    <input onChange={this.updatedCredentials.bind(this, 'phone')} type="text" placeholder="Phone" id="phone"/><br />
			    <input onChange={this.updatedCredentials.bind(this, 'email')} type="text" placeholder="Email" id="email"/><br />
			    <button onClick={this.register.bind(this)}>Join</button>

			    <h3>Login</h3>

			    <input onChange={this.updatedCredentials.bind(this, 'username')} type="text" placeholder="Username" id="username"/><br />
			    <input onChange={this.updatedCredentials.bind(this, 'password')} type="text" placeholder="Password" id="password"/><br />

			    <button onClick={this.login.bind(this)}>Login</button>

            </div>
		)
	}
}

export default Authenticate