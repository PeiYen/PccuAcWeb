var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var url = require('url');

exports.get_Evaluation = function(req,res){
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
		var params = url.parse(req.url, true).query;
 		console.log(params.id); // /pub?id=( )<---取這邊
 		Publish.findOne({_id:params.id},function(err,doc){
 			if(err){
			    throw err;
			    console.log(err);
			}
			else if(doc){            //如果有該商品(doc),進入評價頁面
			 	res.render("Evaluation",{
			 		pub:doc
			 	});
			}
			else{
	  		 	res.render("NOPub2");		    
			}
		});
	}
	else{
		res.render("Nologin");
	}
};
exports.post_Evaluation = function(req,res){
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
	var params = url.parse(req.url, true).query;
 	console.log(params.id); // /pub?id=( )<---取這邊
 	console.log(params.Ordernum);
		buy.findOne({id:params.id},function(err,doc){
			var Eva = new Evaluation({
			  account:doc.Seller,     	//賣家帳戶,用於做帳戶總評
			  Buyacc:req.session.acc,   //買家帳戶
			  ProId:params.id,      	//商品ID,辨別商品評價
			  Ordernum:params.Ordernum, //以訂單編號為評價次數
			  Score:req.body.Eva,       //評分
			  opinion:req.body.opinion, //意見
			  Date:day,        			//日期
			  Time:now         			//時間
			});
			Eva.save(function(err,doc){
		      	if(err) throw err;
		      	console.log("評價成功");
		    });
		    	res.render("Eva",{
		    });
		});
		}
	else{
		res.render("Nologin");
	}
};