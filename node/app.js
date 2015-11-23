var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser')
var app = express();
var router = express.Router();

var product = require('./product.js');
var members = require('./members.js');
var gift = require('./gift.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

router.get('/', function(req,resp){
    resp.sendFile(path.join(__dirname+'/../html/index.html'));
});

router.get('/product/:product_id', product.getProduct);
router.get('/product/img/:img_name', product.getProductImg);
router.get('/getAllProduct', product.getAllProduct);

router.post('/members/register', members.register);

router.post('/gifts/sendGift', gift.sendGift);

app.use('/node', router);
var port = 1337;
var server = app.listen(port, function(){
    console.log('Starting server on ' + port);
});
