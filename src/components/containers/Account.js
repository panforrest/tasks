import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
// import { APIManager } from '../../utils'
import { Authenticate } from '../view'

class Account extends Component {
	componentDidMount(){
		// console.log('componentDidMount: ')  //BUT WHY IT IS NOT CONSOLE LOGGED? MISSPELLING: ComponenetDidMount(){}
		// if (this.props.user == null)
		//     this.props.checkCurrentUser()
        if (this.props.user != null)
            return

        this.props.checkCurrentUser()
        .then(response => {

        }) 
        .catch(err => {
        	console.log('ERROR: '+err.message)
        })


	}

    login(credentials){
    	console.log('login: '+JSON.stringify(credentials))
    	this.props.login(credentials)
    	.then(response => {

    	})
    	.catch(err => {
    		alert(err.message)
    	})

    }

    register(credentials){
        console.log('register: '+JSON.stringify(credentials))
        this.props.register(credentials)
    }

	render(){
		return (
			<div>
                <h2>Account</h2>
                { (this.props.user == null) ? <Authenticate onLogin={this.login.bind(this)} onRegister={this.register.bind(this)} /> :
                    <h2> Hello, {this.props.user.username} </h2>
                }			    

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
		login: (credentials) => dispatch(actions.login(credentials)),
		checkCurrentUser: () => dispatch(actions.checkCurrentUser())
	}
}

export default connect(stateToProps, dispatchToProps)(Account)