import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { taskReducer, accountReducer, messageReducer, profileReducer } from '../reducers'

var store;

export default {
    configureStore: () => {   //createStore: () => {

        const reducers = combineReducers({  //var reducers = combineReducer(

            task: taskReducer,
            account: accountReducer,
            message: messageReducer,
            profile: profileReducer
        })

        store = createStore(   //createStore({

            reducers,
            applyMiddleware(thunk)

        )

    	return store
    },   //}

    currentStore: () => {

    	return store
    }

        
}