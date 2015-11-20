var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();


app.get('/node', function(req,resp){
    resp.sendFile(path.join(__dirname+'/../html/index.html'));
});

//allow post to http://localhost:3000/login
app.post('/node/login', function (req, res, next){
    var username = req.body.username,
        password = caesar(req.body.password,16);
    console.log("User: "+username+" Password: "+password+" request login.");
    var query = "SELECT * FROM members WHERE userName='"+username+"' AND passWord='"+password+"'";
    connection.query(query, function(err, rows, fields) {
        if(err) throw err;
        if(rows.length == 0){
            res.send(JSON.stringify({'result':false, 'id':0}));
        }else{
            var id = shortid.generate();
            //add to sessions table
            var memberID = rows[0].memberID;
            query = "INSERT INTO sessions (memberID, sessionID) VALUES ('"+memberID+"','"+id+"')";
            connection.query(query, function(err,rows,fields){
                if(err) throw err;
            });
            res.send(JSON.stringify({'result':true, 'id':id}));
        }
    });
});


var server = app.listen(1338, function(){
    console.log('Starting server');
});
