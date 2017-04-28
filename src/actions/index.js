import constants from '../constants'
import { APIManager } from '../utils'

const getRequest = (path, params, actionType) => {	//const getRequest: (path, params) => {	
	return (dispatch) => 
		APIManager.get(path, params)
		.then( response => {
            // console.log('GET: '+JSON.stringify(response))
            const payload = response.results || response.result

	        dispatch({
				type: actionType,
				payload: payload,
                params: params
			})
		})
		.catch( err => {
            console.log('ERR: '+JSON.stringify(err))
		})	
}

const postRequest = (path, params, actionType) => {	//const getRequest: (path, params) => {	
	return (dispatch) => 
		APIManager.post(path, params)
		.then( response => {
            // console.log('POST: '+JSON.stringify(response))
            const payload = response.results || response.result

	        dispatch({
				type: actionType,
				payload: payload,
				params: params
			})
		})
		.catch( err => {
            console.log('ERR: '+JSON.stringify(err))
            // throw err
		})	
}

export default {

	register: (credentials) => {
        return (dispatch) => {
        	return dispatch(postRequest('/api/profile', credentials, constants.PROFILE_CREATED))  //NOT params here
        }
	},

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

	submitTask: (params) => {
		return (dispatch) => {
			return dispatch(postRequest('/api/task', params, constants.TASK_CREATED))
		}
	},

	selectCategory: (category) => {
		return {
			type: constants.CATEGORY_SELECTED,
			payload: category
		}
	}

	// taskCreated: (task) => {
	// 	console.log('TASK_CREATED: '+JSON.stringify(task))
	// 	return {
	// 		type: constants.TASK_CREATED,
	// 		payload: task
	// 	}
	// }
}