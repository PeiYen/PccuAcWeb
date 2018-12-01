var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var url = require('url');


exports.get_mydata =  function(req, res) {
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
		buy.find({Seller:req.session.acc,Orderstatus: { $ne : "交易完成" }},function(err,order){ //導覽列提示用
		userdata.findOne({account:req.session.acc},function(err,doc){
  			res.render("mydata",{
         		name:req.session.user,
         		user:doc,
         		order:order
  			});
  		});
		});
	}
	else{
		res.render("Nologin");
	}
};

exports.post_mydata =  function(req, res) {
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
		if(req.body.submit=="Line"){
			userdata.updateOne({account:req.session.acc},{Line:req.body.Line},function(err,doc){
				if(err) throw err;
			})
			res.render("Newentry");
		}
		else if(req.body.submit=="Introd"){
			userdata.updateOne({account:req.session.acc},{Introd:req.body.Introd},function(err,doc){
				if(err) throw err;
			})
			res.render("Newentry");
		}
		else if(req.body.submit=="phone"){
			userdata.updateOne({account:req.session.acc},{phone:req.body.phone},function(err,doc){
				if(err) throw err;
			})
			res.render("Newentry");
		}
		else if(req.body.submit=="name"){
			req.session.user = req.body.name;
			userdata.updateOne({account:req.session.acc},{name:req.body.name},function(err,doc){
				if(err) throw err;
			})
			res.render("Newentry");
		}
	}
	else{
		res.render("Nologin");
	}
};