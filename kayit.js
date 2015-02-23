var mongoose = require('mongoose')
var user = require('./user')
kaydet = function(req){
  user.create({
    email: req.body.email,
    password: req.body.password
  },function(err, createdUser){
    if(!err){
      console.log('Saved user name: ' + createdUser.email)
    }else{
      console.log('not saved')
    }
  })
}

exports.kaydet = kaydet
