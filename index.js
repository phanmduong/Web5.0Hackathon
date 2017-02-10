'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.static(__dirname));

http.listen(6969, function(){
  console.log('Server started. Listening on *:6969');
});