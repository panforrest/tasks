var mongoose = require('mongoose')

var TaskSchema = new mongoose.Schema({
	title:{type:String, default:''},
	category:{type:String, default:''},
	description:{type:String, default:''},
	profile:{type:mongoose.Schema.Types.Mixed, default:''},
	timestamp:{type:Date, default:Date.now}  //timestamp:{type:String, default:Date.now()}
})

TaskSchema.methods.summary = function(){
	var summary = {
		title: this.title,  //name = this.name,
		category: this.category,
		description: this.description,  //body = this.body,
		profile: this.profile,
		timestamp: this.timestamp,   //timestamp = this.timestamp,
		id: this._id.toString()   //id = this._id
	}

	return summary
}

module.exports = mongoose.model('TaskSchema', TaskSchema) 