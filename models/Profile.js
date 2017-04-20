var mongoose = require('mongoose')

var ProfileSchema = new mongoose.Schema({
	username:{type:String, default:''},
	password:{type:String, default:''},
    phone:{type:String, default:''},
	email:{type:String, default:''},
	timestamp:{type:Date, default:Date.now}  //timestamp:{type:String, default:Date.now()}
})

ProfileSchema.methods.summary = function(){
    var summary = {   	
        username: this.username,   //username = this.username, 
        phone: this.phone,   //password = this.password, 
        email: this.email,   //email = this.email, 
        timestamp: this.timestamp,  // timestamp = this.timestamp 
        id: this._id.toString(), //id = this._id,
    }

    return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema) 