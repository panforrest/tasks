var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var twilio = require('twilio')
var CircularJSON = require('circular-json')

router.get('/task',function(req, res, next){
	res.json({
		confirmation: 'success',
		message: 'it worked!'
	})
})

router.get('/notify',function(req, res, next){

    // var client = new twilio(accountSid, authToken);
    // var twilio = require('twilio')('AC4b99f76eaaec3adff9b44c733bdc00b6', 'abdedad29ab5a58bc45cb068386abaab')
    // var client = new twilio.RestClient('AC4b99f76eaaec3adff9b44c733bdc00b6', 'abdedad29ab5a58bc45cb068386abaab')
    var client = new twilio('AC4b99f76eaaec3adff9b44c733bdc00b6', 'abdedad29ab5a58bc45cb068386abaab')

    client.messages.create({
        body: 'TWILIO TEST',
        to: '+19089061042',  // Text this number
        from: '+19088458522' // From a valid Twilio number
    }, function(err, message){

        if (err) {
            res.json({
                confirmation: 'fail',
                message: err
            })

            return
        }

        // console.log(message.sid)
        // console.log(JSON.stringify(message))
        console.log(message)
        // res.json({
        //     confirmation: 'success',
        //     message: message
        // })

    })
    // .then((message) => 
    //     // console.log(message.sid);
    //     res.json({
    //         confirmation: 'success',
    //         message: message
    //     })
    // );
    // .catch((err) =>
    //     console.log(err)
    // )
    // res.json({
    //     confirmation: 'success',
    //     message: 'Send Notification'
    // })
})

router.post('/task',function(req, res, next){
	// res.render('index', {title: 'Express'})  //res.send('')
	console.log('TWILIO: '+JSON.stringify(req.body))
    //TWILIO: {"ToCountry":"US","ToState":"NJ","SmsMessageSid":"SM31b8171aaa44742d29379496a3e69d09","NumMedia":"0","ToCity":"ELIZABETH","FromZip":"07080","SmsSid":"SM31b8171aaa44742d29379496a3e69d09","FromState":"NJ","SmsStatus":"received","FromCity":"ELIZABETH","Body":"Task from conference nast","FromCountry":"US","To":"+19088458522","ToZip":"07201","NumSegments":"1","MessageSid":"SM31b8171aaa44742d29379496a3e69d09","AccountSid":"AC4b99f76eaaec3adff9b44c733bdc00b6","From":"+19089061042","ApiVersion":"2010-04-01"}
    

    var message = req.body['Body']

    // Title, category, task description
    //example: 'Package pickup. Delivery. Please pick up my package from the post office.'

    var validCategories = ['delivery', 'house cleaning', 'dog walking', 'misc']


    var parts = message.split('.') // hopefully 3 parts
    var category = (parts.length == 1) ? 'misc' : parts[1].trim().toLowerCase()
    var description = null

    if (validCategories.indexOf(category) == -1){
        category = 'misc'
        var theRest = parts.splice(1)
        description = theRest.trim()
    }
    else {
        description = (parts.length < 3) ? '' : parts[2].trim()
    }
    
    // var description = (parts.length < 3) ? '' : parts[2].trim()

    var task = {
    	title: parts[0],
    	category: category, //(parts.length == 1) ? 'misc' : parts[1].trim().toLowerCase(),
    	description: description
    }

    var from = req.body['From'].replace('+1', '') //phone # of sender

    // var profile = null

    controllers.profile.get({phone: from}, false)
    .then(function(profiles){
        if (profiles.length == 0) {
            throw new Error('Go away.')
            return
        }

        profile = profiles[0]
        task['profile'] = {
            id: profile.id,
            username: profile.username
        }

        return controllers.task.post(task, false)

    })

    // controllers.task.post(task, false)
    .then(function(result){
    	console.log('SUCCESS: '+JSON.stringify(result))
        res.send('Hello')
    })
    .catch(function(err){
        console.log('ERROR: '+err)
    })
})


module.exports = router