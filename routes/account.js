var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var jwt = require('jsonwebtoken')

router.post('/:action', function(req, res, next){
	var action = req.params.action

    // console.log('BODY: '+JSON.stringify(req.body))

    if ( action == 'register') {
        // console.log('BODY: '+JSON.stringify(req.body))
        controllers.profile
        .post(req.body, false)  //NOT controllers[profile].post
        .then(function(result){
            // console.log('BODY X: '+JSON.stringify(result))
            var token = jwt.sign({id:result.id}, process.env.TOKEN_SECRET, {expiresIn: 4000})
            req.session.token = token  //req.session.user = token  
            // console.log('BODY X: '+JSON.stringify(result))      	
        	res.json({
        		confirmation: 'success',
                user: result,
                token: token
        	})
        })
        .catch(function(err){
        	res.json({
        		confirmation: 'fail',
        		message: err
        	})
        })
    }

})

router.get('/:action', function(req, res, next){
    var action = req.params.action
    if (action == 'currentuser'){
        if (req.session == null) {
            res.json({
            	confirmation: 'success',
            	user: null 
            })
            return //DO NOT FORGET
        }

        if (req.session.token == null) {
            res.json({
            	confirmation: 'success',
            	user: null 
            })
            return //DO NOT FORGET
        }

        res.json({
        	confirmation: 'success',
        	token: req.session.token   //I FORGOT req.session.user
        })
    }

    if (action == 'login'){

    }
})

module.exports = router   //module.exports = router()