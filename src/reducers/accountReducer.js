import constants from '../constants'

var initialState = {
	user: null,  //BUT WHY USING null?
    // current_user: null
}

export default (state=initialState, action) => {
	let updated = Object.assign({}, state)   //let udpated = Object.assign({}, state) 

	switch(action.type){
		case constants.PROFILE_CREATED:
            // console.log('PROFILE_CREATED: '+JSON.stringify(action.payload))   //console.log('PROFILE_CREATED: '+action.profile)
		    updated['user'] = action.payload
		    return updated

		case constants.USER_LOGGED_IN:
		    // console.log('USER_LOGGED_IN: '+JSON.stringify(action.payload))
		    updated['user'] = action.payload
		    return updated    

		default:
		    return state
	}
}