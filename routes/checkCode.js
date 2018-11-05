var session = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var url = require('url');

exports.get_checkCode =  function(req, res) {
	var params = url.parse(req.url, true).query;
 	console.log(params.account); // /pub?id=( )<---取這邊
 	var today = new Date();
 	var isToday = today.getTime();
 	userdata.findOne({account:params.account},function(err,doc){
 		if(err){ 
 			throw err
 		}
 		else if(!doc){	//找不到該帳號時
 			res.render("nofinduser");
 		}
 		else if(((isToday - doc.SucDate) > 3600000) || (params.code != doc.code)){//1小時=3,600,000毫秒 如果 進入畫面時間大於一小時 則驗證失敗
 			res.render("checkcodeErr");
 		}	
 		else if(doc.islive == true){
 			res.render("checkcodeisSuc");
 		}
 		else{
 			userdata.updateOne({account:params.account},{islive:true},function(err1,user){
 				if(err) throw err;
 				else{
 					res.render("checkcodeSuc");
 				}
 			})
 		}
 	})
};