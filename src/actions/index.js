import constants from '../constants'
import { APIManager } from '../utils'

const getRequest = (path, params) => {	//const getRequest: (path, params) => {	
	return (dispatch) => 
		APIManager.get(path, params)
		.then( response => {
            console.log('GET: '+JSON.stringify(response))
            
	        dispatch({
				type: constants.TASKS_RECEIVED,
				tasks: response.results
			})
		})
		.catch( err => {
            console.log('ERR: '+JSON.stringify(err))
		})	

}

export default {

    fetchTasks: (params) => {
        return (dispatch) => {
        	return dispatch(getRequest('/api/task', params))
        }
    },

	tasksReceived: (tasks) => {
		return {
			type: constants.TASKS_RECEIVED,
			tasks: tasks
		}
	},

	taskCreated: (task) => {
		return {
			type: constants.TASK_CREATED,
			task: task
		}
	}
}