import constants from '../constants'
import { APIManager } from '../utils'

const getRequest = (path, params, actionType) => {	//const getRequest: (path, params) => {	
	return (dispatch) => 
		APIManager.get(path, params)
		.then( response => {
            // console.log('GET: '+JSON.stringify(response))
            const payload = response.results || response.result || response.user

	        dispatch({
				type: actionType,
				payload: payload,
                params: params
			})
			return response
		})
		.catch( err => {
            // console.log('ERR: '+JSON.stringify(err.message))
            throw err
		})	
}

const postRequest = (path, params, actionType) => {	//const getRequest: (path, params) => {	
	return (dispatch) => 
		APIManager.post(path, params)
		.then( response => {
            // console.log('POST: '+JSON.stringify(response))
            const payload = response.results || response.result || response.user

	        dispatch({
				type: actionType,
				payload: payload,
				params: params
			})
			return response
		})
		.catch( err => {
            console.log('ERR: '+JSON.stringify(err.message))
            throw err
		})	
}

export default {

	register: (credentials) => {
        return (dispatch) => {
        	// return dispatch(postRequest('/api/profile', credentials, constants.PROFILE_CREATED))  //NOT params here
            return dispatch(postRequest('/account/register', credentials, constants.PROFILE_CREATED))
        }
	},

	login: (credentials) => {
		return(dispatch) => {
			return dispatch(postRequest('/account/login', credentials, constants.USER_LOGGED_IN))  //getRequest
		}
	},

	checkCurrentUser: () => {
		return(dispatch) => {
			// return checkCurrentUser(getRequest('account/currentuser', {}, constants.USER_LOGGED_IN))
			return dispatch(getRequest('account/currentuser', {}, constants.USER_LOGGED_IN))
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

	submitMessage: (params) => {
		return (dispatch) => {
			return dispatch(postRequest('/api/message', params, constants.MESSAGE_CREATED))
		}
	},

	selectCategory: (category) => {
		return {
			type: constants.CATEGORY_SELECTED,
			payload: category
		}
	},

	notify: (params) => {
		return (dispatch) => {
			console.log('actions.notify: '+JSON.stringify(params))
			return dispatch(postRequest('/twilio/notify', params, null))
		}
	},

	fetchMessages: (params) => {
		return(dispatch) => {
			// return checkCurrentUser(getRequest('account/currentuser', {}, constants.USER_LOGGED_IN))
			return dispatch(getRequest('api/message', params, constants.MESSAGES_RECEIVED))
		}		
	}
}