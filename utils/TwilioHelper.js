var twilio = require('twilio')

module.exports = {

    // sendSMS: function(from, recipient, message, completion){
    sendSMS: function(recipient, message, completion){
            // if (from.indexOf('+1') == -1)
            //     from = '+1'+from

            if (recipient.indexOf('+1') == -1)
                recipient = '+1'+recipient          

    	    var client = new twilio('AC4b99f76eaaec3adff9b44c733bdc00b6', 'abdedad29ab5a58bc45cb068386abaab')

		    client.messages.create({
		        body: message,
		        to: recipient,  // Text this number
		        // from: from // From a valid Twilio number
		        from: '+19088458522'
		    }, function(err, message){
		    	if (err){
		    		completion(err, null)
		    		return
		    	}
                
		        // if (err) {
		        //     res.json({
		        //         confirmation: 'fail',
		        //         message: err
		        //     })

		        //     return
		        // }

		        // console.log(message)
		        completion(null, message)
		    })

    }

}