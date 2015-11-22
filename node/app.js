var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var router = express.Router();

var product = require('./product.js');


router.get('/', function(req,resp){
    resp.sendFile(path.join(__dirname+'/../html/index.html'));
});

router.get('/product/:product_id', product.getProduct);
router.get('/product/img/:product_id', product.getProductImg);
router.get('/getAllProduct', products,getAllProduct);


//start server listen on /node
app.use('/node', router);
var port = 1337;
var server = app.listen(port, function(){
    console.log('Starting server on ' + port);
});
