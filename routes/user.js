var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var url = require('url');

exports.get_user =  function(req, res) {
	var params = url.parse(req.url, true).query;
 	console.log(params.acc); // /pub?id=( )<---取這邊
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
		buy.find({Seller:req.session.acc,Orderstatus: { $ne : "交易完成" }},function(err,order){
		Publish.find({account:params.acc},function(err,pub){
			userdata.findOne({account:params.acc},function(err,doc){
  				res.render("user",{
         			name:req.session.user,
         			user:doc,
         			pub:pub,
         			order:order
  				});
  			});
  		});
  		});
	}
	else{
		res.render("Nologin");
	}
};