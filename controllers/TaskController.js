var Task = require('../models/Task')
var Promise = require('bluebird')

module.exports = {
	get: function(params, isRaw){
		return new Promise(function(resolve, reject){//return new Promise(params, function(resolve, reject){
            var filters = {  //var filter = {
            	sort: {timestamp: -1}    //timestamp: -1
            }

			Task.find(params, null, filters, function(err, tasks){  //Task.find(params, function(err, tasks){
				if (err) {
                    reject(err)
                    return
				}

                if (isRaw == true){
                	resolve(tasks)
                }
                else {
                	var list = []
                	tasks.forEach(function(task, i){   //tasks.forEach(task, i){
                		list.push(task.summary())
                	})                	
                	resolve(list)
                }
				// resolve(tasks)
			})
		})
	},

	getById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Task.findById(id, function(err, task){
				if (err) {
					reject(err)
					return
				}

				if (isRaw == true)
                    resolve(task)
				else
				    resolve(task.summary())  //resolve(task.summary)				
			})
		})
	},
 
	post: function(params, isRaw){  //post: function(params){
		return new Promise(function(resolve, reject){
			Task.create(params, function(err, task){
				if (err){
					reject(err)
					return
				}
				
				if (isRaw == true)
                    resolve(task)
				else
				    resolve(task.summary())  //resolve(task.summary)
			})
		})
	}
}