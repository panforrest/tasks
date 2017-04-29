var Profile= require('../models/Profile')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')

module.exports = {
	get: function(params, isRaw){
        return new Promise(function(resolve, reject){
            var filters = {
                sort: {timestamp: -1}
            }

            Profile.find(params, null, filters, function(err, profiles){  //Profile.find(params, function(err, profiles){
            // Profile.find(params, function(err, profiles){
            	// console.log('TEST 0: '+JSON.stringify(profiles))
                if (err) {
            		reject(err)
            		return
            	}

                if (isRaw == true){
                    resolve(profiles)
                }
                else {
                    var list = []
                    profiles.forEach(function(profile, i){
                        list.push(profile.summary())
                    })                    
                    resolve(list)
                }
            })
        })
    },

    getById: function(id, isRaw){
        return new Promise(function(resolve, reject){
            Profile.findById(id, function(err, profile){
                if (err) {
                    reject(err)
                    return
                }

                if (isRaw == true)
                    resolve(profile)                
                else
                    resolve(profile.summary())                
            })
        })
    },

    post: function(params, isRaw){
        return new Promise(function(resolve, reject){
            if (params['password'])
                params['password'] = bcrypt.hashSync(params.password, 10) //params['password'] = bcrypt.hashSync(param['password'], 10)

            // console.log('BODY 2: '+JSON.stringify(params))
            Profile.create(params, function(err, profile){
                if (err) {
                    reject(err)
                    return
                }
 
                if (isRaw == true)
                    resolve(profile)                
                else
                    resolve(profile.summary())                 
            })
        })
    }   
}

