//function related to present


//send a gift, need a JSON in format:
//{product = product_id, toWho = toWho_id, fromWho = fromWho_id }
//TODO: check if toWho is a friend of fromWho， validate ids
//deduct credit of fromWho
//update toWho of a present
//return JSON {result, info}
exports.sendGift = function(req,resp){
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'comp307project',
    database:'ProjectDB'
  });
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
                query = "INSERT INTO Gifts (giftID, productID, fromWho, toWho, redeemCheck) VALUES ("+gift_id+",'"+product_id+"','"+fromWho_id+"','"+toWho_id+"',0)";
                connection.query(query, function(err, rows, fields){
                  if(err) throw err;
                  resp.send(JSON.stringify({'result':true,'info':''}));
                });
              });
            }
          });
        });
      }
    }
  });

};