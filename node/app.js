var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser')
var app = express();
var router = express.Router();

var product = require('./product.js');
var members = require('./members.js');
var gift = require('./gift.js');
var html = require('./html.js');

global.mysql = require('mysql');
global.connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'comp307project',
  database:'ProjectDB'
});

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

//routers for handle return of ../html
router.get('/',html.getIndex);
router.get('/:name', html.getHtml);
router.get('/js/:name',html.getJs);
router.get('/img/:name',html.getImg);
router.get('/css/:name',html.getCss);
router.get('/js/vendor/:name', html.getVendor);

//routers for handel product
router.get('/product/getAllProduct', product.getAllProduct);
router.get('/product/:product_id', product.getProduct);
router.get('/product/img/:img_name', product.getProductImg);

//TODO: add session validation middleware
//routers for handel members
router.post('/members/register', members.register);
router.post('/members/getMemberInfo', members.getMemberInfo);

//routers for handle gifts
router.post('/gifts/sendGift', gift.sendGift);
router.post('/gifts/redeemGift', gift.redeemGift);
router.post('/gifts/cancelGift', gift.cancelGift);
router.post('/gifts/checkGift', gift.checkGift);
router.post('/gifts/getGift', gift.getGift);

app.use('/node', router);
var port = 1337;
var server = app.listen(port, function(){
    console.log('Starting server on ' + port);
});
