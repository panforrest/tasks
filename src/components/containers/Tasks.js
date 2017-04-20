import React, { Component } from 'react'
import { APIManager } from '../../utils'

class Tasks extends Component{
    componentDidMount(){
    	// console.log('componentDidMount: ')
    	APIManager.get('/api/task', function(err, results){
            if (err) {
            	alert(err)
            	return
            }
            console.log('componentDidMount: '+JSON.stringify(results.body))
    	})
    }

	render(){
		return(
			<div>
			    Tasks container.
			</div>
		)
	}
}

export default Tasks