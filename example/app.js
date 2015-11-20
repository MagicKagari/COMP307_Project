//imports
var express = require('express');
var bodyParser = require('body-parser')
var mysql = require('mysql');
var shortid = require('shortid');

//init mysql connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'asaasa',
  database : 'Q2DB_new'
});
connection.connect();

//start express framework
var app = express();
//add json parser
app.use(bodyParser.json());
//setup to run in localhost
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.header("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//allow post to http://localhost:3000/login
app.post('/login', function (req, res, next){
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

//allow post to http://localhost:3000/logout
app.post('/logout', function (req, res, next){
    var sessionID = req.body.sessionID;
    console.log(sessionID+" request logout.");
    var query = "SELECT * FROM sessions WHERE sessionID='"+sessionID+"'";
    connection.query(query, function(err, rows, fields) {
        if(err) throw err;
        if(rows.length == 0){
            res.send(JSON.stringify({'result':false}));
        }else{
            query = "DELETE FROM sessions WHERE `sessionID`='"+sessionID+"'";
            connection.query(query, function(err,rows,fields){
                if(err) throw err;
            });
            res.send(JSON.stringify({'result':true}));
        }
    });
});

//start server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});


function caesar(str, offset){
   var ret = "";
   var ranges = [[65,90],[97,122]];
   for(var i = 0; i < str.length; i++){
       var charcode = str.charCodeAt(i);
       for(var j = 0; j < ranges.length; j++){
           if (charcode >= ranges[j][0] && charcode <= ranges[j][1]){
                charcode = ((charcode - ranges[j][0] + offset) %
                    (ranges[j][1] - ranges[j][0] + 1)) + ranges[j][0];
                break;
           }
       }
       ret += String.fromCharCode(charcode);
   }
   return ret;
}
