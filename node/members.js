//function related to members


//function that perform registration
//accept JSON in {username = "foo", password = "foo2", address = "foo3" } format
//return JSON in {result = true, info = ""} or {result = false, info = "why fail"}
exports.register = function(req, resp){
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'comp307project',
    database:'ProjectDB'
  });
  var username = req.body.username;
  var password = req.body.password;
  var address = req.body.address;
  var query = "SELECT * FROM Members WHERE username='"+username+"'";
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    if(rows.length == 0){
      //perform insert
      connection.query("SELECT * FROM Members", function(err, rows, fields){
        if(err) throw err;
        var next_id = rows.length + 1;
        var query = "INSERT INTO Members ( userID, username, password, encryptionKey ) VALUES ("+next_id+",'"+username+"','"+password+"',10)";
        console.log(query);
        connection.query(query, function(err, rows, fields){
          if(err) throw err;
          var query = "INSERT INTO MembersDetails ( userID, address, credits, numberOfPresents, presentList, friendsList ) VALUES ("+next_id+",'"+address+"',100,0,'','')";
          console.log(query);
          connection.query(query, function(err, rows, fields){
            if(err) throw err;
            resp.send(JSON.stringify({"result":true,"info":"success"}));
          });
        });
      });
    }else{
      resp.send(JSON.stringify({"result":false,"info":"duplicate username"}));
    }
  });
};

//function for getting user information
//{userid, sessionid}
exports.getMemberInfo = function(req, resp){
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'comp307project',
    database:'ProjectDB'
  });
  var userid = req.body.userid;
  var query = "SELECT * FROM MembersDetails WHERE userID='"+userid+"'";
  connection.query()
};
