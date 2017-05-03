import React, { Component } from 'react'
import { Task } from '../containers'

// class Split extends Component {
// 	render(){
// 		return(
// 			<div>
// 			    Split Layout
// 			</div>
// 		)
// 	}
// }

// export default Split

export default (props) => {
	return (
		<div>
		    Split Layout
		    
		    <Task {...props} /> 
		</div>
	)
}