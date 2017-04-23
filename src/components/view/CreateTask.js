import React, { Component } from 'react'
import { APIManager } from '../../utils'

class CreateTask extends Component {
    constructor(){
    	super()
    	this.state = {
    		task: {
    			title: '',
    			category: 'delivery',
                description: ''
    		}
    	}
    }

    updateTask(event){
    	console.log('updateTask: '+event.target.id+' == '+event.target.value)
    	var updated = Object.assign({}, this.state.task)
    	updated[event.target.id] = event.target.value
    	this.setState({
            task: updated
    	})
    }

    submitTask(event){
    	event.preventDefault()
    	console.log('submitTask: '+JSON.stringify(this.state.task))
    	// APIManager
    	// .post('/api/task', this.state.task)
    	// .then(response => {
     //        console.log('TASK CREATED: '+JSON.stringify(response))
    	// })
    	// .catch(err => {
     //        console.log('ERROR: '+JSON.stringify(err))
    	// })
    	this.props.onSubmitTask(this.state.task)
    }

    render(){
    	return(
    		<div>
    		    <h2>Create Task</h2>
    		    <input onChange={this.updateTask.bind(this)} type="text" id="title" placeholder="Title" /><br />
    		    <input onChange={this.updateTask.bind(this)} type="text" id="description" placeholder="Description" /><br />
    		    <select id="category" onChange={this.updateTask.bind(this)}>
                    <option value="delivery">Delivery</option>
                    <option value="dog walking">Dog walking</option>
                    <option value="house cleaning">House Cleaning</option>
                </select>
                <br />
                <button onClick={this.submitTask.bind(this)}>Submit</button>
    		</div>
    	)
    }
}

export default CreateTask