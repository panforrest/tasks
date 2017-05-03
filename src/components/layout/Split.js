import React, { Component } from 'react'
import { Task, Account } from '../containers'

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
		<div className="container">
		    <div className="row">
                <div className="col-md-8">
                    <Task {...props} /> 
                </div>

                <div className="col-md-4">
                    <Account />
                </div>
		    </div>
		    
		    
		    
		</div>
	)
}