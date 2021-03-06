import constants from '../constants'

var initialState = {

}

export default (state=initialState, action) => {
	let updated = Object.assign({}, state)

	switch (action.type){
		case constants.MESSAGES_RECEIVED:
		    console.log('MESSAGES_RECEIVED 0: '+JSON.stringify(action.payload))
		    let taskId = action.params.task  //let taskId = actions.params.taskId
		    updated[taskId] = action.payload
		    console.log('MESSAGES_RECEIVED 1: '+JSON.stringify(updated))
		    return updated

		default:
		    return state
	}
}