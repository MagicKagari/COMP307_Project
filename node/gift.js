//function related to present


//send a gift, need a JSON in format:
//{product = product_id, toWho = toWho_id, fromWho = fromWho_id }
//TODO: check if toWho is a friend of fromWho， validate ids
//deduct credit of fromWho
//update toWho of a present
//return JSON {result, info}
exports.sendGift = function(req,resp){
/*
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'comp307project',
    database:'ProjectDB'
  });
  */
  var product_id = req.body.product;
  var toWho_id = req.body.toWho;
  var fromWho_id = req.body.fromWho;

  var d = new Date();
  var gift_id = d.getFullYear().toString() + (d.getMonth()+1).toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString();
  var price;
  var ret = false;
  //get the product price
  var query = "SELECT price FROM Product WHERE productID='"+product_id+"'";
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    if(rows.length == 0){
      console.log('no product: '+product_id);
      ret = true;
      return;
    }else{
      price = rows[0].price;
    }
  });

  var fromWho_username;
  query = "SELECT username FROM Members WHERE userID='"+fromWho_id+"'";
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    if(rows.length > 0) fromWho_username = rows[0].username;
  });

  //deduct credit of fromWho
  query = "SELECT credits FROM MembersDetails WHERE userID='"+fromWho_id+"'";
  console.log(query);
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    if(rows.length == 0){
      console.log('no user: '+fromWho_id);
      resp.send(JSON.stringify({'result':false,'info':'invalid fromWho'}));
      return;
    }else{
      var old_credit = rows[0].credits;
      if(old_credit < price){
        resp.send(JSON.stringify({"result":false,"info":"insufficient fund"}));
        console.log('insufficient fund');
        return;
      }else{
        var new_credit = old_credit - price;
        query = "UPDATE MembersDetails SET credits='"+new_credit+"' WHERE userID='"+fromWho_id+"'";
        console.log(query);
        connection.query(query, function(err, rows, fields){
          if(err) throw err;
          //update toWho
          query = "SELECT numberOfPresents, presentList FROM MembersDetails WHERE userID='"+toWho_id+"'";
          console.log(query);
          connection.query(query, function(err,rows, fields){
            if(err) throw err;
            if(rows.length == 0){
              console.log('no user:'+toWho_id);
              resp.send(JSON.stringify({'result':false,'info':'invalid toWho'}));
              return;
            }else{
              var numberOfPresents = rows[0].numberOfPresents + 1;
              var presentList = rows[0].presentList + "," + gift_id;
              query = "UPDATE MembersDetails SET numberOfPresents='"+numberOfPresents+"', presentList='"+presentList+"' WHERE userID='"+toWho_id+"'";
              console.log(query);
              connection.query(query, function(err, rows, fields){
                if(err) throw err;
                //insert into gifts
                query = "INSERT INTO Gifts (giftID, productID, fromWho, toWho, redeemCheck) VALUES ('"+gift_id+"','"+product_id+"','"+fromWho_id+"','"+toWho_id+"',0)";
                connection.query(query, function(err, rows, fields){
                  if(err) throw err;
                  query = "INSERT INTO GiftQueue (userID, giftID, fromWho, fromWhoName) VALUES ('"+toWho_id+"','"+gift_id+"','"+fromWho_id+"','"+fromWho_username+"')";
                  connection.query(query, function(err, rows, fields){
                    if(err) throw err;
                    resp.send(JSON.stringify({'result':true,'info':''}));
                  });
                });
              });
            }
          });
        });
      }
    }
  });
};

//function that redeem gift
//{userid, giftid}
exports.redeemGift = function(req, resp){
  /*
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'comp307project',
    database:'ProjectDB'
  });
*/
  var userid = req.body.userid;
  var giftid = req.body.giftid;

  //check if the gift is user's
  var query = "SELECT presentList FROM MembersDetails WHERE userID='"+userid+"'";
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    if(rows.length == 0){
      console.log('no userid: '+userid);
      resp.send(JSON.stringify({'result':false,'info':'no such user'}));
      return;
    }else{
      var presents = rows[0].presentList.split(',');
      if(presents.indexOf(giftid) == -1){
        console.log( giftid + ' not exists for ' + userid);
        resp.send(JSON.stringify({'result':false,'info':'no such gift'}));
        return;
      }else{
        //check if the gift is redeemed or not
        query = "SELECT redeemCheck FROM Gifts WHERE giftID='"+giftid+"'";
        connection.query(query, function(err, rows, fields){
          if(err) throw err;
          if(rows.length == 0){
            console.log('no giftid; '+giftid);
            resp.send(JSON.stringify({'result':false, 'info':'no such gift'}));
            return;
          }else{
            var check = rows[0].redeemCheck;
            if(check != 0){
              resp.send(JSON.stringify({'result':false,'info':'gift already redeemed'}));
              return;
            }else{
              //redeem the gift
              query = "UPDATE Gifts SET redeemCheck=1 WHERE giftID='"+giftid+"'";
              connection.query(query,function(err,rows,fields){
                if(err) throw err;
                resp.send(JSON.stringify({'result':true,'info':'gift is on the way'}));
              });
            }
          }
        });
      }
    }
  });
};

//function that cancel a gift and transfer as credits
//{userid, giftid}
exports.cancelGift = function(req, resp){
  /*
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'comp307project',
    database:'ProjectDB'
  });
*/
  var userid = req.body.userid;
  var giftid = req.body.giftid;

  //check if the gift is user's
  var query = "SELECT presentList FROM MembersDetails WHERE userID='"+userid+"'";
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    if(rows.length == 0){
      console.log('no userid: '+userid);
      resp.send(JSON.stringify({'result':false,'info':'no such user'}));
      return;
    }else{
      var presents = rows[0].presentList.split(',');
      if(presents.indexOf(giftid) == -1){
        console.log( giftid + ' not exists for ' + userid);
        resp.send(JSON.stringify({'result':false,'info':'no such gift'}));
        return;
      }else{
        //check if the gift is redeemed or not
        query = "SELECT productID, redeemCheck FROM Gifts WHERE giftID='"+giftid+"'";
        connection.query(query, function(err, rows, fields){
          if(err) throw err;
          if(rows.length == 0){
            console.log('no giftid; '+giftid);
            resp.send(JSON.stringify({'result':false, 'info':'no such gift'}));
            return;
          }else{
            var check = rows[0].redeemCheck;
            var productID = rows[0].productID;
            if(check != 0){
              resp.send(JSON.stringify({'result':false,'info':'gift already redeemed'}));
              return;
            }else{
              //redeem the gift, and transfer it to credit
              query = "UPDATE Gifts SET redeemCheck=1 WHERE giftID='"+giftid+"'";
              connection.query(query,function(err,rows,fields){
                if(err) throw err;
                query = "SELECT price FROM Product WHERE productID='"+productID+"'";
                connection.query(query, function(err, rows,fields){
                  if(err) throw err;
                  var price = rows[0].price;
                  query = "UPDATE MembersDetails SET credits = credits+'"+price+"' WHERE userID='"+userid+"'";
                  connection.query(query,function(err, rows, fields){
                    if(err) throw err;
                    resp.send(JSON.stringify({'result':false,'info':'gift changed to credit'}));
                  });
                });
              });
            }
          }
        });
      }
    }
  });
};

//function that check for a gift using id
exports.checkGift = function(req, resp){
  /*
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'comp307project',
    database:'ProjectDB'
  });
  */
  var userid = req.body.userid;
  var query = "SELECT * FROM GiftQueue WHERE userID='"+userid+"'";
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    if(rows.length == 0){
      resp.send(JSON.stringify({'result':false,'info':"oops no gift for you."}));
    }else{
      resp.send(JSON.stringify({'result':true,'info':rows}));
      query = "DELETE FROM GiftQueue WHERE userID='"+userid+"'";
      connection.query(query, function(err, rows, fields){
        if(err) throw err;
      });
    }
  });
};

//function that returns the datail of gift (like getProduct)
exports.getGift = function(req, resp){
  var giftid = req.body.giftid;
  var query = "SELECT * FROM Product WHERE productID IN ( SELECT productID FROM Gifts WHERE giftID='"+giftid+"')";
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    if(rows.length == 0){
      resp.send({'result':false, 'info':'oops no such thing'});
    }else{
      resp.send({'result':true, 'info':rows[0]});
    }
  });
};
