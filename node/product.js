//handler functions for product related actions

//function that return meta information about a product with given id
exports.getProduct = function(req, resp) {
  var product_id = req.params.product_id;
  resp.send('product ' + product_id); 

};


//function that return the image a product with given id
exports.getProductImg = function(req, resp){
  var fs = require('fs');
  var path = require('path');
  var product_id = req.params.product_id;
  var img = fs.readFileSync(path.join(__dirname+'/../img/black_tea.jpg'));

  resp.contentType = 'image/png';
  resp.end(img, 'binary');
};
