import constants from '../constants'
import { APIManager } from '../utils'

const getRequest = (path, params, actionType) => {	//const getRequest: (path, params) => {	
	return (dispatch) => 
		APIManager.get(path, params)
		.then( response => {
            console.log('GET: '+JSON.stringify(response))
            const payload = response.results || response.result

	        dispatch({
				type: actionType,
				payload: payload
			})
		})
		.catch( err => {
            console.log('ERR: '+JSON.stringify(err))
		})	

}

export default {

    fetchTasks: (params) => {
        return (dispatch) => {
        	return dispatch(getRequest('/api/task', params, constants.TASKS_RECEIVED))
        }
    },

	tasksReceived: (tasks) => {
		return {
			type: constants.TASKS_RECEIVED,
			payload: tasks
		}
	},

	taskCreated: (task) => {
		console.log('TASK_CREATED: '+JSON.stringify(task))
		return {
			type: constants.TASK_CREATED,
			payload: task
		}
	}
}