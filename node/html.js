//function related to handel html required files

exports.getIndex = function(req, resp){
  var path = require('path');
  resp.sendFile(path.join(__dirname+'/../html/index.html'));
};

exports.getHtml = function(req,resp){
  try{
    var path = require('path');
    var name = req.params.name;
    resp.sendFile(path.join(__dirname+'/../html/'+name));
  }catch(e){
      console.log(e);
  }
};

exports.getJs = function(req,resp){
  try{
    var path = require('path');
    var name = req.params.name;
    resp.sendFile(path.join(__dirname+'/../html/js/'+name));
  }catch(e){
      console.log(e);
  }
};

exports.getImg = function(req,resp){
  try{
    var path = require('path');
    var name = req.params.name;
    resp.sendFile(path.join(__dirname+'/../html/img/'+name));
  }catch(e){
      console.log(e);
  }
};

exports.getCss = function(req,resp){
  try{
    var path = require('path');
    var name = req.params.name;
    resp.sendFile(path.join(__dirname+'/../html/css/'+name));
  }catch(e){
      console.log(e);
  }
};
