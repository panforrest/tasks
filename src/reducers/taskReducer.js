import constants from '../constants'

var initialState = {
	// list: []  //list: null WILL CAUSE: Uncaught TypeError: Cannot read property 'map' of null
	// list: {} //WILL CAUSE THE BUG: Uncaught TypeError: this.props.tasks.map is not a function
	// task: {} ,
	list:[]
}

export default (state=initialState, action) => {
	let updated = Object.assign({}, state) 
	switch (action.type){
		case constants.TASKS_RECEIVED:
		    console.log('TASKS_RECEIVED: '+JSON.stringify(action.tasks))
            updated['list'] = action.tasks  //THIS LINE MUST BE INSERTED TO RENDER ON Tasks.js CONTAINER PAGE
		    return updated

		case constants.TASK_CREATED:
		    console.log('TASK_CREATED: '+JSON.stringify(action.task))  
		    let updatedList = Object.assign([], updated.list)
		    updatedList.push(action.task)
		    updated['list'] = updatedList
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