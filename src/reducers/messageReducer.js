import constants from '../constants'

var initialState = {

}

export default (state = initialState, action) => {
	let updated = Object.assign({}, state)

	switch (action.type){

		case constants.MESSAGES_RECEIVED:

			// PAYLOAD: 
			// [{"profile":{"username":"firstuser",
			// "id":"587d5d0502980937a4514b22"},
			// "task":"587a817100b7444e1b6f7f7a","text":"awfeawef",
			// "timestamp":"2017-01-21T17:32:04.960Z",
			// "id":"58839b145602362452d6648c"}]

			let taskId = action.params.task
			updated[taskId] = action.payload
			console.log('MESSAGES_RECEIVED: '+JSON.stringify(updated))

			return updated

		default:
			return state
	}

}