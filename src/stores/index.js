import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { taskReducer } from '../reducers'

var store;

export default {
    configureStore: () => {   //createStore: () => {

        const reducers = combineReducers({  //var reducers = combineReducer(

            task: taskReducer

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