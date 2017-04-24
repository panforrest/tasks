var express = require('express')
var router = express.Router()

router.get('/task',function(req, res, next){
	res.json({
		confirmation: 'success',
		message: 'it worked!'
	})
})

router.post('/task',function(req, res, next){
	res.render('index', {title: 'Express'})  //res.send('')
	res.send('Hello!')
})


module.exports = router