var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();


app.get('/node', function(req,resp){
    resp.sendFile(path.join(__dirname+'/../html/index.html'));
});

var server = app.listen(1337, function(){
    console.log('Starting server');
});
