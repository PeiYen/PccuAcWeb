var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var url = require('url');

exports.get_pub = function(req,res){
	var params = url.parse(req.url, true).query;
 	console.log(params.id); // /pub?id=( )<---取這邊
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
    Publish.findOne({_id:params.id},function(err,doc){  //以ID尋找商品並把該商品撈過來
    if(err){
      throw err;
      console.log(err);
    }
    else if(doc){            //如果有該商品(doc),傳回商品資訊
       buy.find({Seller:req.session.acc,Orderstatus: { $ne : "交易完成" }},function(err,order){
        guestbook.find({productid:params.id},function(err,mes){
          Ans.find({productid:params.id},function(err,ans){
            Evaluation.find({ProId:params.id},function(err,Eva){
              var length = Eva.length;
              var count = new Array();
              var Avg = new Array();
              var Sum = 0;
              for(i=0;i < length;i++){ 
                count[i]=Eva[i].Score;
                Sum += Eva[i].Score;
                if(i == (length-1)){
                  var a = (Sum/length);
                  Avg[0] = a.toFixed(1);
                }
              }
              
              // console.log("陣列："+count);
              // console.log("平均"+Avg[0]);
              // console.log("評價長度："+length);
              console.log(doc.product);
                res.render("pub",{
                pub:doc,//商品資訊匯入首頁
                Ans:ans,//賣家回覆
                mes:mes,//商品留言板
                loginStatus:req.session.isLogin,
                name:req.session.user,
                me:req.session.acc,
                order:order,
                Eva:Eva,
                Avg:Avg[0]
              })
          })
        });
      });
      });
    }
    else{
  		 res.render("NOPub");		    
		}
  });
}
	else{
		res.render("Nologin");
	}
};





exports.post_pub = function(req,res){
if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
	var params = url.parse(req.url, true).query;
	console.log(req.body.submit);
	if(req.body.submit == "buy"){				//直接購買
		console.log("這是購買");
		console.log(req.body.price);
		console.log(params.id);
		Publish.findOne({_id:params.id},function(err,doc){  //以ID尋找商品並把該商品撈過來
      if(err){
        throw err;
        console.log(err);
      }
      else{
	 		res.render("buy",{
	 		  pub:doc,										                 //商品資訊匯入購物車
     		loginStatus:req.session.isLogin,
     		name:req.session.user,
     		quantity:req.body.PubNum, 						       //訂購數量
     		price:req.body.price,							           //商品價格
     		totalprice:req.body.price*req.body.PubNum		 //數量*價格	
     		});
      }
		});
	}
	else if(req.body.submit == "join"){			//購物車
		

    console.log("這是加入購物車");
    shopcart.find({id:params.id,account:req.session.acc},function(err,doc){ //當同一個帳號將同一商品加入第2次購物車時擋住
      console.log(doc.length);
      console.log(doc[0]);
      console.log(params.id);
      if(doc.length==1){                  //如果剛商品的ID已出現一次,代表已加入購物車中了
         res.render("joinError");
        }
      else{
          Publish.findOne({_id:params.id},function(err,doc){  //以ID尋找商品並把該商品撈過來
            if(err){
              throw err;
              console.log(err);
              }
            else{
              var joincart = new shopcart({
                id:params.id,
                account:req.session.acc,            //訂購人帳戶
                name:req.session.user,              //訂購人姓名
                phone:req.session.phone,            //訂購人電話
                product:doc.product,                //商品名稱
                Classification:doc.Classification,  //分類
                Cover:doc.Cover,                    //商品封面圖
                quantity:doc.quantity,              //商品數量
                price:doc.price,                    //商品價格
                Pstatus:doc.Pstatus,                //商品狀況
                Introduce:doc.Introduce,            //商品介紹
                Date:day,                           //日期
                Time:now                            //時間
              })    
            joincart.save(function(err,doc){
              if (err) throw err ;
              console.log('加入購物車成功');
            });
            res.render("joincart",{                   
            // loginStatus:req.session.isLogin,
            // name:req.session.user,
            // quantity:req.body.PubNum,            //訂購數量
            // price:req.body.price,              //商品價格
            // totalprice:req.body.price*req.body.PubNum    //數量*價格 
            });
          }
        });
    }
  });	
	}
  else if(req.body.submit == "Question"){
    Publish.updateOne({_id:req.body.id},{$inc:{guest:1}},function(err,doc){ //商品留言數+1
      if(err) throw err;
    });
    var newmessage = new guestbook({
      productid:req.body.id,        //商品ID
      account:req.body.acc,         //留言帳戶
      name:req.body.name,           //留言者姓名
      sellaccount:req.body.sellacc, //賣家帳戶
      message:req.body.message,     //留言
      Date:day,                     //日期
      Time:now                      //時間
    })
    newmessage.save(function(err,doc){
      if(err) throw err;
      console.log("留言成功");
    });
    res.render("guestbook",{
    });
  }
   else if(req.body.submit == "Ans"){
    Publish.updateOne({_id:req.body.id},{$inc:{Ans:1}},function(err,doc){ //商品回覆數+1
      if(err) throw err;
    });
    var newmessage = new Ans({
      productid:req.body.id,      //商品ID
      QusID:req.body.Question,    //回覆ID
      account:req.body.acc,       //留言帳戶
      name:req.body.name,         //留言者姓名
      message:req.body.message,   //留言
      Date:day,                   //日期
      Time:now                    //時間
    })
    newmessage.save(function(err,doc){
      if(err) throw err;
      console.log("留言成功");
    });
    res.render("Ans",{
    });
  }
}
  else{
    res.render("Nologin");
  }
};