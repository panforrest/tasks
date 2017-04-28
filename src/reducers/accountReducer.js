import constants from '../constants'

var initialState = {
	user: null   //BUT WHY USING null?

}

export default (state=initialState, action) => {
	let updated = Object.assign({}, state)   //let udpated = Object.assign({}, state) 

	switch(action.type){
		case constants.PROFILE_CREATED:
            console.log('PROFILE_CREATED: '+JSON.stringify(action.payload))   //console.log('PROFILE_CREATED: '+action.profile)
		    return updated

		default:
		    return state
	}
}