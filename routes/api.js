var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

router.get('/:resource', function(req, res, next){
    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null){
    	res.json({
    		confirmation: 'fail',
    		message: 'invalid resource'
    	})
    	return
    }

    controller.get(req.query)
    .then(function(results){
        res.json({
        	confirmation: 'success',
        	results: results
        })
    })
    .catch(function(err){
        res.json({
        	confirmation: 'fail',
        	message: err
        })
    })
})

router.get('/:resource/:id', function(req, res, next){
    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'invalid resource'
        })
        return
    }

    var id = req.params.id
    controller.getById(id)
    .then(function(result){
        res.json({
            confirmation: 'success',
            result: result
        })
    })
    .catch(function(err){
        res.json({
            confirmation: 'fail',
            err: err
        })
    })
})

router.post('/:resource', function(req, res, next){
    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'invalid resource'
        })
    }

    controller.create(req.body)
    .then(function(result){
        res.json({
            confirmation: 'success',
            result: result
        })
    })
    .catch(function(err){
        res.json({
            confirmation: 'fail',
            message: err
        })
    })

})

module.exports = router  //default.exports = router