import React, { Component } from 'react'
import { APIManager } from '../../utils'

class Tasks extends Component{
    componentDidMount(){
    	// console.log('componentDidMount: ')
    	// APIManager.get('/api/task', function(err, results){
     //        if (err) {
     //        	alert(err)
     //        	return
     //        }
     //        console.log('componentDidMount: '+JSON.stringify(results.body))
    	// })


    	// APIManager.get('/api/task', (err, results) => {
    	// 	.then((results) => {
     //            console.log(JSON.stringify(results))
    	// 	})
    	// 	.catch((err) => {
     //            console.log(JSON.stringify(err))
    	// 	})
    	// })

    	APIManager
    	.get('/api/task', null)
    	.then( response => {
    		console.log(JSON.stringify(response))
    	})
    	.catch( err => {
    		console.log('ERROR: '+JSON.stringify(err))
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