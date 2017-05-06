                // <CreateTask onSubmitTask={this.createTask.bind(this)}/>
import React, { Component } from 'react'
import { APIManager, DateUtils } from '../../utils'
import { Authenticate } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'
// import { taskReducer } from '../../reducers'
import { Link } from 'react-router'  //import { Line } from 'react-router'
 
class Tasks extends Component{
    constructor(){
        super()
        this.getTask = this.getTasks.bind(this)
    }

    getTasks(){
        console.log('getTasks: '+this.props.tasks.selectedCategory) 
        if (this.props.tasks[this.props.tasks.selectedCategory] != null)
            return

        this.props.fetchTasks({category: this.props.tasks.selectedCategory})
        .then(results => {

        })
        .catch(err => {
            alert(err)
        })        
    }

    componentDidMount(){
        // console.log('componentDidUpdate: '+this.props.tasks.selectedCategory)        
        this.getTask()
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
        //state loading
        // if (this.props.tasks[this.props.tasks.selectedCategory] != null)
        //     return

        // this.props.fetchTasks({category: this.props.tasks.selectedCategory})
        // .then(results => {
        //     //stop loading
        //     // console.log(JSON.stringify(results))
        // })
        // .catch(err => {
        //     //stop loading
        //     alert(err)
        // })

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

    componentDidUpdate(){
        // console.log('componentDidUpdate: '+this.props.tasks.selectedCategory)
        this.getTask()

        // if (this.props.tasks[this.props.tasks.selectedCategory] != null)
        //     return

        // this.props.fetchTasks({category: this.props.tasks.selectedCategory})
        // .then(results => {
        // })            
        // .catch(err => {
        //     //stop loading
        //     alert(err)
        // })
    }

    createTask(task){
        // console.log('CREATE TASK: '+JSON.stringify(task))
        this.props.submitTask(task)
        .then(result => {
            // console.log(JSON.stringify(result))
            return
        })
        .catch(err => {
            console.log('ERROR: '+JSON.stringify(err))
        })
        // APIManager
        // .post('/api/task', task)
        // .then(response => {
        //     console.log('CREATE TASK: '+JSON.stringify(response))
        //     this.props.taskCreated(response.result)//this.props.taskCreated(JSON.stringify(response.result))
            
        // })
        // .catch(err => {
        //     console.log('ERROR: '+JSON.stringify(err))
        // })

    }

	render(){
        const taskList = this.props.tasks[this.props.tasks.selectedCategory]
		return(

            <section id="banner">
              <div className="content">

                <h3>Current Tasks</h3>
                { (taskList == null) ? null:
                    taskList.map((task, i) => {
                        const username = task.profile.username || 'anonymous'
                        return (
                            <div key={task.id} className="box">
                                
                                <Link to ={'/task/'+task.id}>
                                    <h3>{task.title}</h3>
                                </Link>

                                <span style={localStyle.detailText}>{ DateUtils.formattedDate(task.timestamp) }</span>

                                <span style={localStyle.pipe}>|</span>
                                <Link to={'/profile/'+task.profile.id}> 
                                    <span style={localStyle.detailText}>{ username }</span>
                                </Link>

                                <Link to ={'/task/'+task.id}>
                                    {task.description}
                                </Link>


                            </div>
                        )
                    })                     
                }
              </div>
              <Authenticate />
            </section>
		)
	}
}

const localStyle = {
    detailText: {
        float:'right'
    },
    pipe: {
        float:'right',
        marginLeft:12,
        marginRight:12
    }
}

const stateToProps = (state) => {
    return {
        tasks: state.task,
        // selectedCategory: state.task.selectedCategory
        // task: state.task.task
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchTasks: (params) => dispatch(actions.fetchTasks(params)),
        tasksReceived: (tasks) => dispatch(actions.tasksReceived(tasks)),
        submitTask: (task) => dispatch(actions.submitTask(task)),
        // selectCategory: (category) => dispatch(actions.selectCategory(category))
        // taskCreated: (params) => dispatch(actions.taskCreated(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Tasks)