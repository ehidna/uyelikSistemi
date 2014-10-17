var express = require('express')
var app = express()
app.set('view engine', 'ejs')

app.get('/', function (req, res) {

  res.render('index', { title: 'The index page!' })

})

app.get('/kayit', function (req, res) {
  console.log('helloo basaari')
  res.redirect('/basari')
})


var server = app.listen(3000, function () {

})
