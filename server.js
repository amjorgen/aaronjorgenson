var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendfile('./resume.html');
});

app.listen(3000);
console.log("You are listening on localhost:3000");