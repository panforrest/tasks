import constants from '../constants'

var initialState = {

}

export default (state=initialState, action) => {
    let updated = Object.assing({}, state) 
	switch(action.type){
        case constant.PROFILE_RECEIVED:
            console.log("PROFILE_RECEIVED: "+JSON.stringify(action.payload))
            return updated

        default:
            return state
	}
}