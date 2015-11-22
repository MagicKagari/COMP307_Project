//handler functions for product related actions

//function that return meta information about a product with given id
exports.getProduct = function(req, resp) {
  var product_id = req.params.product_id;
  resp.send('product ' + product_id);

};

//function that return all products information
exports.getAllProduct = function(req, resp){
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'comp307project',
    database:'ProjectDB'
  });
  var query = "SELECT * FROM Product";
  var productList = [];
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    if(rows.length == 0){
      console.log('no products');
    }
    console.log(rows);
  });

};

//function that return the image a product with given id
exports.getProductImg = function(req, resp){

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'comp307project',
    database:'ProjectDB'
  });

  var fs = require('fs');
  var path = require('path');
  var product_id = req.params.product_id;

  var query = "SELECT * FROM Product WHERE productID='"+product_id+"'";
  connection.query(query, function(err, rows, fields) {
        if(err) throw err;
        if(rows.length == 0){
          console.log("no info for product "+product_id);
        }else{
          var img = fs.readFileSync(path.join(__dirname+'/../img/'+row[0].img));
          resp.contentType = 'image/png';
          resp.end(img, 'binary');
        });
  });
  connection.close();
};
