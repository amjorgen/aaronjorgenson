var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
// var fs = require('fs');
var http = require('http');
// var https = require('https');
// var privateKey  = fs.readFileSync('ssl/privatekey.key', 'utf8');
// var certificate = fs.readFileSync('ssl/cert.crt', 'utf8')
// var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();
// Database
mongoose.connect('mongodb://localhost/aaronjorgenson');

//Configuration
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));

//Schema
var Schema = mongoose.Schema;
var Contact = new Schema({
  name: {type: String, required: true},
  company: {type: String, required: false},
  email: {type: String, required: true},
  comment: {type: String, required: true}
});
var ContactModel = mongoose.model('Contact', Contact);

// Routes
app.use('/public/css', express.static(path.join(__dirname, '/public/css')));
app.use('/public/js', express.static(path.join(__dirname, '/public/js')));
app.use('/public/images', express.static(path.join(__dirname, '/public/images')));
app.get('/', function(req, res){
  res.sendfile('./public/views/resume.html');
});
app.get('/api/contacts', function(req, res) {
  return ContactModel.find(function (err, contacts) {
    if (!err) {
      return res.send(contacts);
    } else {
      return console.log(err);
    }
  });
});

app.post('/api/contacts', function (req, res){
  var contact;
  contact = new ContactModel({
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    comment: req.body.comment
  });
  contact.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  res.sendfile('./public/views/resume.html');
});
var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);
httpServer.listen(80);
// httpsServer.listen(8081);
console.log("Server is running");