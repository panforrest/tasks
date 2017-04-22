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
        this.props.fetchTasks(null)
        

    	// APIManager
    	// .get('/api/task', null)
    	// .then( response => {
    	// 	// console.log(JSON.stringify(response))
     //        this.props.tasksReceived(response.results)

    	// })
    	// .catch( err => {
    	// 	console.log('ERROR: '+JSON.stringify(err))
    	// })

    }

    createTask(task){
        // console.log('CREATE TASK: '+JSON.stringify(task))
        APIManager
        .post('/api/task', task)
        .then(response => {
            console.log('CREATE TASK: '+JSON.stringify(response))
            this.props.taskCreated(response.result)//this.props.taskCreated(JSON.stringify(response.result))
            
        })
        .catch(err => {
            console.log('ERROR: '+JSON.stringify(err))
        })

    }

	render(){
        // const list = this.props.tasks.map((task, i) => {
        //     return(
        //         <li key={task.id}>{task.title}</li>
        //     )
        // })

		return(
			<div>
			    <h2>Tasks</h2>
                
                    { (this.props.tasks.all == null) ? null:
                        this.props.tasks.all.map((task, i) => {
                            return (
                                <li key={task.id}>{task.title}</li>
                            )
                        })                     
                    }
                    
			    <CreateTask onSubmitTask={this.createTask.bind(this)}/>
                
                
			</div>
		)
	}
}

const stateToProps = (state) => {
    return {
        tasks: state.task
        // task: state.task.task
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchTasks: (params) => dispatch(actions.fetchTasks(params)),
        tasksReceived: (tasks) => dispatch(actions.tasksReceived(tasks)),
        taskCreated: (task) => dispatch(actions.taskCreated(task))
    }
}

export default connect(stateToProps, dispatchToProps)(Tasks)