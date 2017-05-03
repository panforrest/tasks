var mongoose = require('mongoose')

var MessageSchema = new mongoose.Schema({
    profile: {type:mongoose.Schema.Types.Mixed, default:{}}, //default:'', Types
    task: {type:String, default:''}, //task: {type: mongoose.Schema.Type.Mix, default:''},
    text: {type:String, default:''},
    timestamp: {type:Date, default: Date.now} //timestamp: {type:String, default: Date.now}
})

MessageSchema.methods.summary = function(){  //mothods
	var summary = {
        profile: this.profile,
        task: this.task,
        text: this.text,
        timesstamp: this.timestamp,
        id: this._id.toString()
	}

	return summary
}

module.exports = mongoose.model('MessageSchema', MessageSchema)