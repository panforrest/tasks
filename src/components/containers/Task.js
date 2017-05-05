    //          {task.title} <br />
	// 		    {task.description} <br />
	// 		    {task.category} <br />
	// 		    {task.profile.username} <br />

            // <div>
            //     {task.title} <br />
            //     {task.description} <br />
            //     {task.category} <br />
            //     {task.profile.username} <br />
               
            //     {(this.props.account.user == null) ? <h3>Please log in or Register to Reply.</h3> : 
            //         <div><h2>Reply</h2>
            //             <textarea onChange={this.updateMessage.bind(this)} placeholder="Enter Message to Respond" id="text"></textarea><br />
            //             <button onClick={this.submitMessage.bind(this)}>Submit</button>
            //         </div>
            //     }
            // </div>

import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {
    constructor(){
    	super()
    	this.state = {
    		message: {
    			text: '',
    			profile: {}
    		}
    	}
    }

    componentDidMount(){
        // console.log('componentDidMount: '+JSON.stringify(this.props.user)) 

     //    const taskId = this.props.params.id
     //    const task = this.props.tasks[taskId]

    	// console.log('componentDidMount: '+JSON.stringify(task)) 

    	//garb the task from the store:

    }

    submitMessage(event){
    	event.preventDefault()
        // console.log('submitMessage: '+JSON.stringify(this.state.message))
        let updated = Object.assign({}, this.state.message)
        const user = this.props.account.user
        updated['profile'] = {
            id: user.id,
            usernaem: user.username
        }

        updated['task'] = this.props.params.id
        // console.log('submitMessage: '+JSON.stringify(updated))

        const taskId = this.props.params.id
        const task = this.props.tasks[taskId]

        this.props.submitMessage(updated)
        .then(response => {
            // console.log('MESSAGE CREATED: '+JSON.stringify(response))
            // alert('Thanks for replying! Good luck!')
            // TODO: send a notification to the task creator
            const params = {
                // recipient: '9089061042',
                // text: 'Hello from React'
                recipient: task.profile.id,  
                text: updated.text
            }

            return this.props.notify(params) 
        })
        .then(result => {
            alert('Thanks for replying! Good luck!') 
               
        })
        .catch(err => {
            console.log('ERR: '+JSON.stringify(err.message))
        })
    }

    updateMessage(event){
    	// console.log('updateMessage: '+'event.target.id'+' == '+'event.target.value')
    	console.log('updateMessage: '+' == '+event.target.value)
    	let updated = Object.assign({}, this.state.message)
    	updated['text'] = event.target.value
    	// updated = event.target.value
        this.setState({
        	message: updated 
        })
    }

	render(){
		// garb the task from the store:
        const taskId = this.props.params.id
        const task = this.props.tasks[taskId]

		return(

            <section>
                <header className="major">
                    <h2 style={{border:'none', marginBottom:0}}>{task.title}</h2>
                </header>
                <div className="posts">
                    <article style={{background: '#f9f9f9', border:'1px solid #ddd', padding: 16}}>
                        <strong>{task.category}</strong> <br />
                        <strong>{task.profile.username}</strong> <br />                        
                        <p>{task.description} </p>

                    </article>                    
                </div>
                    {(this.props.account.user == null) ? <h3>Please log in or Register to Reply.</h3> : 
                        <div><h2>Reply</h2>
                            <textarea onChange={this.updateMessage.bind(this)} placeholder="Enter Message to Respond" id="text"></textarea><br />
                            <button onClick={this.submitMessage.bind(this)}>Submit</button>
                        </div>
                    }
            </section>

		)
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task,
		account: state.account
	}
}

const dispatchToProps = (dispatch) => {
	return {
		submitMessage: (params) => dispatch(actions.submitMessage(params)),
        notify: (params) => dispatch(actions.notify(params))
	}
}

export default connect(stateToProps, dispatchToProps)(Task)


