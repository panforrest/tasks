import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { CreateTask } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'

class Categories extends Component {
    selectedCategory(event){
    	event.preventDefault()
    	console.log('selectedCategory: '+event.target.id) //+JSON.stringify(this.props.task.category)
    }

	render(){
		return(
	        <div>
	            <h2>Categories</h2>
                    { this.props.tasks.categories.map((category, i) => {
                            const color = (category == this.props.tasks.selectedCategory) ? 'red' : '#333'
                            return (
                                <li key={category}>
                                    <a id={category} onClick={this.selectedCategory.bind(this)} href="#" style={{color: color}}>{category}</a>
                                </li>
                            )    
                        }) 
                    }
	        </div>
	    )    
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task
	}
}

// const dispatchToProps = (dispatch) => {
// 	return {
// 		fetchTasks: (tasks) => dispatch(actions.fetchTasks(tasks))
// 	}
// }

export default connect(stateToProps)(Categories)