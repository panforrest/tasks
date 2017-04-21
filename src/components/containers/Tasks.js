import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { CreateTask } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'
// import { taskReducer } from '../../reducers'
 
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
    		// console.log(JSON.stringify(response))
            this.props.tasksReceived(response.results)

    	})
    	.catch( err => {
    		console.log('ERROR: '+JSON.stringify(err))
    	})

    }

    createTask(task){
        // console.log('CREATE TASK: '+JSON.stringify(task))
        APIManager
        .post('/api/task', task)
        .then(response => {
            console.log('CREATE TASK: '+JSON.stringify(response))
            
        })
        .catch(err => {
            console.log('ERROR: '+JSON.stringify(err))
        })

    }

	render(){
        // const list = this.props.tasks.map((task, i) => {
        //     return(
        //         <li key={task._id}>{task.title}</li>
        //     )
        // })

		return(
			<div>
			    Tasks container.
                <ol>
                    
                </ol>
			    <CreateTask onSubmitTask={this.createTask.bind(this)}/>
			</div>
		)
	}
}

const stateToProps = (state) => {
    return {
        tasks: state.task
    }
}

const dispatchToProps = (dispatch) => {
    return {
        tasksReceived: (tasks) => dispatch(actions.tasksReceived(tasks))
    }
}

export default connect(stateToProps, dispatchToProps)(Tasks)