var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');

//登出
exports.logout =  function(req, res) {
  req.session.destroy(function(){    //清除session檔，同時清除cookie裡的登入狀態檔
      res.clearCookie("user",{});
      res.cookie("isLogin","false");
      res.redirect("/");
    });
};