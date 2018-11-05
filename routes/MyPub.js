var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');

exports.get_MyPub = function(req,res){
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
		buy.find({Seller:req.session.acc,Orderstatus: { $ne : "交易完成" }},function(err,order){
			Publish.find({account:req.session.acc},function(err,doc){
				if(err){
					throw err;
				    console.log(err);
				}
				else{
					var count = 0 ; // 未回覆之留言計數器
					for(i=0;i<doc.length;i++){
						var a = doc[i].guest-doc[i].Ans;
						count +=a;
					}
					console.log(count);

					res.render('MyPub',{
						pub:doc,
						loginStatus:req.session.isLogin,
				        name:req.session.user,
				        order:order,
				        count:count
				    });
				}
			});
		});
	}
	else{
		res.render("Nologin");
	}
}

exports.post_MyPub = function(req,res){
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
	console.log("This is Delete");
	buy.find({id:req.body._id,Orderstatus: { $ne : "交易完成" }},function(err,findbuy){
		if(findbuy.length > 0){			//如果該商品尚有未處理訂單存在，提醒處理完才能刪除
			console.log(findbuy.length);
			res.render("DelError");
		}
		else{
		Publish.deleteOne({_id:req.body._id},function(err,doc){
			if(err) throw err;
		})
		guestbook.deleteMany({productid:req.body._id},function(err1,guest){	//留言
			if(err1) throw err1;
		})
		Ans.deleteMany({productid:req.body._id},function(err2,Ans){			//回覆
			if(err2) throw err2;
		})

		buy.deleteMany({id:req.body._id},function(err3,buy){				//訂單
			if(err3) throw err3;
		})

		Evaluation.deleteMany({ProId:req.body._id},function(err4,Eva){		//評價
			if(err4) throw err4;
		})					
		shopcart.deleteMany({id:req.body._id},function(err,doc){
			if(err) throw err;
		})
		console.log("刪除成功");
		res.render("DelSuccess1");
		}
	})
		}
	else{
		res.render("Nologin");
	}
};