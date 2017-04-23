import constants from '../constants'

var initialState = {
	// list: []  //list: null WILL CAUSE: Uncaught TypeError: Cannot read property 'map' of null
	// list: {} //WILL CAUSE THE BUG: Uncaught TypeError: this.props.tasks.map is not a function
	// task: {} ,
	all: null,
	selectedCategory: 'dog walking',
	categories: [
	    'delivery',
	    'dog walking',
	    'house cleaning'
	]
}

export default (state=initialState, action) => {
	let updated = Object.assign({}, state) 
	switch (action.type){
		case constants.TASKS_RECEIVED:
		    // console.log('TASKS_RECEIVED: '+JSON.stringify(action.tasks))
            updated['all'] = action.payload  //THIS LINE MUST BE INSERTED TO RENDER ON Tasks.js CONTAINER PAGE
		    return updated

		case constants.TASK_CREATED:
		    // console.log('TASK_CREATED: '+JSON.stringify(action.payload))  
		    let currentTasks = (updated['all']) ? Object.assign([], updated['all']) : []
		    currentTasks.unshift(action.payload)  //currentTask.unshift(action.task)
		    updated['all'] = currentTasks  //updated['all'] = currentTask

		    return updated 

		case constants.CATEGORY_SELECTED:
		    // let updated = 
		    // console.log('CATEGORY_SELECTED: '+action.payload) 
		    updated['selectedCategory'] = action.payload //this triggers re-render of the components
            return updated

		default:
		    return state
	}
}