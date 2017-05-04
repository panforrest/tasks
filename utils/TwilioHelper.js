// var twilio = require('twilio')
// var Promise = require('bluebird')

// module.exports = {

//     sendSMS: function(recipient, message){
//     	return new Promise (function(resolve, err){
//             if (recipient.indexOf('+1') == -1)
//                 recipient = '+1'+recipient          

//     	    var client = new twilio('AC4b99f76eaaec3adff9b44c733bdc00b6', 'abdedad29ab5a58bc45cb068386abaab')

// 		    client.messages.create({
// 		        body: message,
// 		        to: recipient,  // Text this number
// 		        // from: from // From a valid Twilio number
// 		        from: '+19088458522'
// 		    }, function(err, message){
// 		    	if (err){
// 		    		// completion(err, null)
// 		    		reject(err)
// 		    		return
// 		    	}
//   		        resolve(message)
// 		    })
//     	})
//     }
// }

var twilio = require('twilio')
var Promise = require('bluebird')

module.exports = {

	sendSMS: function(recipient, message){
		return new Promise(function(resolve, reject){
			if (recipient.indexOf('+1') == -1)
				recipient = '+1'+recipient

// TWILIO_SID=AC4b99f76eaaec3adff9b44c733bdc00b6
// TWILIO_AUTH_TOKEN=abdedad29ab5a58bc45cb068386abaab
// TWILIO_FROM=+19088458522

			var client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

			client.messages.create({
			    body: message,
			    to: recipient,  // Text this number
			    from: process.env.TWILIO_FROM
			}, function(err, message) {
				if (err){
					reject(err)
				    return
				}

				resolve(message)
			})
		})
	}

}