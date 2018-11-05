var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');


exports.get_sell =  function(req, res) {
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
		buy.find({Seller:req.session.acc,Orderstatus: { $ne : "交易完成" }},function(err,order){
	  		res.render("sell",{
	         name:req.session.user,
	         order:order
	  		});
  		})
	}
	else{
		res.render("Nologin");
	}
};
