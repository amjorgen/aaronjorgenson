var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser')

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
  return res.send(contact);
});

app.listen(3000);
console.log("You are listening on localhost:3000");