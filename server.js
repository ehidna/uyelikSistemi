var express = require('express')
var session = require('express-session')
var kayit = require('./kayit')
var app = express()
var mongodb = require('mongodb')
var mongoose = require('mongoose')
var user = require('./user')
var bodyParser = require('body-parser')

app.use( bodyParser.json() )       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ) // to support URL-encoded bodies
app.use(express.static(__dirname + '/public'))
app.use(session({ secret: 'keyboard cat' }))

app.set('view engine', 'ejs')

dbURI = 'mongodb://admin:123Asd123@ds037451.mongolab.com:37451/uyelik'
//  dbURI = 'localhost'
mongoose.connect(dbURI)

mongoose.connection.once('connected', function(){
  console.log('Connected to database')
})

app.get('/', function (req, res) {
  if(req.session.user){
    res.redirect('/girisOnay')
  }else{
    res.render('index')
  }
})

app.post('/giris', function(req, res){
  user.findOne({
    email: req.body.email, password: req.body.password
    }, function(err, obj){
    if(obj === null){
      console.log("bulunamadi")
      res.redirect('/')
    }else{
      console.log(obj)
      req.session.user = obj.email
      res.redirect('/girisOnay')
    }
  })
})

app.get('/girisOnay', function(req, res){
  res.render('giris', { title: req.session.user})
})

app.get('/kayit', function (req, res) {
  res.render('kayit')
})

app.post('/kayit_et', function (req, res) {
  if(req.body.email === req.body.remail && req.body.email !== null){
    if(req.body.password === req.body.repassword && req.body.password !==null){
      user.findOne({
        email: req.body.email
        }, function(err, obj){
        if(obj === null ){
          kayit.kaydet(req)
          res.redirect('/basari')
        }else{
          console.log("email has been used  : " + obj)
          res.redirect('/kayit')
        }
      })
    }else {
      console.error("password eslesmedi")
    }
  }else{
    console.error("email eslesmedi")
  }
})

app.get('/basari', function (req, res){
  user.find({}).exec(function(err, models){
    if(err){
      console.log('bulunamadi')
    }else{
      console.log('models: ' + models)
    }
  })
  res.render('basari', { title: 'Basari' })
})

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Listening on port 3000 or ' + process.env.PORT)
});
