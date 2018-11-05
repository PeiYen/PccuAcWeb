var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var url = require('url');



exports.post_buy = function(req,res){
if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
  Publish.findOne({_id:req.body.id},function(err,doc){
    var newquantity = doc.quantity - req.body.quantity;
    console.log(newquantity);
    Publish.updateOne({_id:req.body.id},{quantity:newquantity},function(err,doc){
      if(err){
        throw err;
        res.send(500);
        console.log(err);
      }
    });
  });
  var today = new Date();
  var Identifier = req.body.id.toString().substring(21,24);
  var random = Math.random().toString(36).substring(7);//亂數6位 隨機數字或英文 
  var Order = today.getFullYear().toString().substring(2) + (today.getMonth()+1) + today.getDate() +  today.getHours() + today.getMinutes() + today.getSeconds() + Identifier + random; 
  var status = "處理中";	
    var buying = new buy({  
      Ordernum:Order,               //訂單編號
      Orderstatus:status,           //訂單狀態
      Seller:req.body.account,      //賣家帳戶
      Sellername:req.body.name,     //賣家姓名
      Sellphone:req.body.phone,     //賣家電話
  		account:req.session.acc, 	    //訂購人帳戶
    	name:req.session.user,  	    //訂購人姓名
    	phone:req.session.phone,	    //訂購人電話
    	product:req.body.product,	    //商品名稱
    	quantity:req.body.quantity,   //商品數量
    	price:req.body.price,		      //商品價格
      total:req.body.PubNum,        //總價格
      Cover:req.body.cover,         //商品封面圖
      id:req.body.id,               //商品ID
      Date:day,                     //日期
      Time:now                      //時間
  	});	
    buying.save(function(err,doc){
      if (err) throw err ;
      console.log('購買成功');
      res.render("Buysuccess");
    });
    }
    else{
    res.render("Nologin");
    }
};