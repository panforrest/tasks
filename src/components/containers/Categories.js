import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { CreateTask } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'

class Categories extends Component {
    selectedCategory(category, event){
    	event.preventDefault()
    	// console.log('selectedCategory: '+category) //+JSON.stringify(this.props.task.category)
    	this.props.selectCategory(category)
    }

	render(){
		return(
	        <div>
	            <h2>Categories</h2>
                    { this.props.tasks.categories.map((category, i) => {
                            const color = (category == this.props.tasks.selectedCategory) ? 'red' : '#333'
                            return (
                                <li key={category}>
                                    <a onClick={this.selectedCategory.bind(this, category)} href="#" style={{color: color}}>{category}</a>
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
		tasks: state.task,
		selectedCategory: state.task.selectedCategory
	}
}

const dispatchToProps = (dispatch) => {
	return {
		selectCategory: (category) => dispatch(actions.selectCategory(category))
	}
}

export default connect(stateToProps, dispatchToProps)(Categories)