var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

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

    if (action == 'login'){
        controllers.profile
        .get({email: req.body.email}, true)
        .then(function(results){
            // console.log('TEST 1: '+JSON.stringify(results))
            if (results.length == 0){
                throw new Error('user not found.')   //MORE GRACEFUL WAY TO HANDLE ERROR, BECAUSE IN SUCCESS BLOCK
                // res.json({
                //     confirmation: 'fail',
                //     message: 'user not found'
                // })
                return
            }

            var profile = results[0]
            // console.log('result.password: '+JSON.stringify(result.password))
            // console.log('req.body.password: '+req.body.password)

            var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)

            if (isPasswordCorrect == false) {  // if (isPasswordCorrect == null) {
                throw new Error('wrong password')
                // res.json({
                //     confirmation: 'fail',
                //     message: 'wrong password'
                // })
                return
            }

            var token = jwt.sign({id:profile._id}, process.env.TOKEN_SECRET, {expiresIn: 4000})  //({id:result.id}
            req.session.token = token 

            res.json({
                confirmation: 'success',
                user: profile.summary()    //user: profile           
            })
            return 
        })
        .catch(function(err){
            res.json({
                confirmation: 'fail',
                message: err.message
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

        jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err, decoded){
            
            if (err){
                res.json({
                    confirmation: 'fail',
                    message: 'Access Denied'
                })
                return
            }

            // console.log('TEST CURRENTID: '+decoded.id)

            controllers.profile
            .getById(decoded.id, false)  //.getById(decoded.id)
            .then(function(result){
                res.json({
                    confirmation: 'success',
                    user: result
                })
                return
            })
            .catch(function(error){
                res.json({
                    confirmation: 'fail',
                    message: error
                })
                return
            })

            // res.json({
            //     confirmation: 'success',
            //     token: req.session.token,
            //     id: decoded.id  // token: req.session.token   //I FORGOT req.session.user
            // })
        }) 
    }

    if (action == 'logout'){
        req.session.reset()
        res.json({
            confirmation: 'success',
            user: null
        })
        return
    }
})

module.exports = router   //module.exports = router()