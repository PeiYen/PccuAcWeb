var session = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');

exports.get_order =  function(req, res) {
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
		buy.find({Seller:req.session.acc,Orderstatus: { $ne : "交易完成" }},function(err,doc){
      	if(err) throw err;
      	else{
        res.render("order",{
        	loginStatus:req.session.isLogin,
	        name:req.session.user,
          buy:doc,
          order:doc
       	}); 
      	}
    });
	}
	else{
		res.render("Nologin");
	}
};

exports.post_order =  function(req, res) {
    if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
      if(req.body.submit == "Finish"){
        var Orderstatus = "交易完成";
        buy.updateOne({_id:req.body.id},{Orderstatus:Orderstatus},function(err,doc){
          if(err){
            throw err;
            res.send(500);
            console.log(err);
          }
          else{
            return res.redirect('/routes/order');
          }
        });
      }
      else if(req.body.submit == "Delete"){
        buy.deleteOne({_id:req.body.id},function(err,doc){
          if(err){
            throw err;
            console.log(err);
          }
          else{
            return res.redirect('/routes/order');
          }
        })
      }
    }
  else{
    res.render("Nologin");
  }
};