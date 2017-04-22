import constants from '../constants'

var initialState = {
	// list: []  //list: null WILL CAUSE: Uncaught TypeError: Cannot read property 'map' of null
	// list: {} //WILL CAUSE THE BUG: Uncaught TypeError: this.props.tasks.map is not a function
	// task: {} ,
	all: null,
	selectedCategory: 'delivery',
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

		default:
		    return state
	}
}











// import constants from '../constants'

// var initialState = {
// 	// all: null
// }


// export default (state = initialState, action) => {

// 	let updated = Object.assign({}, state)

// 	switch (action.type){
// 		case constants.TASKS_RECEIVED:
// 			console.log('TASKS_RECEIVED: '+JSON.stringify(action.tasks))
// 			// updated['all'] = action.payload
// 			return updated

// // 		case constants.TASK_CREATED:
// // //			console.log('TASKS_RECEIVED: '+JSON.stringify(action.tasks))
// // 			let currentTasks = (updated['all']) ? Object.assign([], updated['all']) : []
// // 			currentTasks.unshift(action.payload)
// // 			updated['all'] = currentTasks
// // 			return updated

// 		default:
// 			return state

// 	}

// }