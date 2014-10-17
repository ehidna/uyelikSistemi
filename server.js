var express = require('express')
var kayit = require('./kayit')
var app = express()
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', { title: 'The index page!' })
})

app.get('/kayit', function (req, res) {
  res.render('kayit', { title: 'Bu kayit!'})
})

app.get('/basari', function (req, res) {
  res.render('basari', { title: 'Bu basari sayfasi!' })
})

app.get('/kayit_et', function (req, res) {
  kayit.kaydet(req)
  if(basari){
    res.redirect('/basari')
  }
})

var server = app.listen(3000);
