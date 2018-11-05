var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var url = require('url');

exports.get_changequantity =  function(req, res) {
	var params = url.parse(req.url, true).query;
 	console.log(params.acc); // /pub?id=( )<---取這邊
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
		Publish.findOne({_id:params.pubid},function(err,pub){
			res.render("changequantity",{
				name:req.session.user,
				pub:pub
			});
		});
	}
	else{
		res.render("Nologin");
	}
};

exports.post_changequantity =  function(req, res) {
	var params = url.parse(req.url, true).query;
 	console.log(params.acc); // /pub?id=( )<---取這邊
 	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
	if(req.body.quantity !=""){//如果數量沒有輸入，則不更改
		Publish.updateOne({_id:params.pubid},{quantity:req.body.quantity},function(err,pub){
			if(err){
                throw err;
                res.send(500);
                console.log(err);
            }
             else{
            	console.log('商品數量更改成功');
            }
		});
	}
	if(req.body.Introduce !=""){//如果數量沒有輸入，則不更改
		Publish.updateOne({_id:params.pubid},{Introduce:req.body.Introduce},function(err,pub){
			if(err){
                throw err;
                res.send(500);
                console.log(err);
            }
            else{
            	console.log('商品介紹更改成功');
            }
		});
	}
    res.render("PuBChangeSuc");
    }
	else{
		res.render("Nologin");
	}
};