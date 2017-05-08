import actions from '../actions'

var initialState = {

}

export default (state=initialState, actions) => {
	let updated = Object.assign({}, state)

	switch (action.type){
		case constants.MESSAGES_RECEIVED:
		    // console.log('MESSAGES_RECEIVED: '+JSON.stringify(action.payload))
		    let taskId = actions.params.taskId
		    updated[taskId] = action.payload
		    console.log('MESSAGES_RECEIVED: '+JSON.stringify(updated))
		    return updated

		default:
		    return
	}
}