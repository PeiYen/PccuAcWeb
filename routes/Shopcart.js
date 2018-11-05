var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var url = require('url');



exports.get_Shopcart = function(req,res){
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
    buy.find({Seller:req.session.acc,Orderstatus: { $ne : "交易完成" }},function(err,order){
		shopcart.find({account:req.session.acc},function(err,doc){
			if(err){
       			throw err;
        		console.log(err);
      		}
      		else{
      			// var c=doc.length;
      			// for(var i=0;i<doc.length;i++){
      					
      			// 	var id = doc[i].id;
      			// 	console.log(id);
      			// 	Publish.findOne({_id:id},function(err,pub){
      			// 		if(pub == null){    
      			// 		c++; 			
      			// 			shopcart.deleteOne({id:id},function(err,del){
      			// 				if(err){
       		// 						throw err;
        	// 						console.log(err);
      			// 				}
      			// 				else{
      							
      			// 				}			
      			// 			})
      						
      			// 		}
      			// 	});
      			// }
      			// console.log(doc.length);
				// console.log(doc[1]);		//搜尋多個	
				res.render("Shopcart",{
          			name:req.session.user,
          			pub:doc,
                order:order
  				});
  			}	
  		});
    });
	}
	else{
		res.render("Nologin");
	}
};

exports.post_Shopcart = function(req,res){
  if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
	console.log("This is Delete");
	console.log(req.body._id);
	shopcart.deleteOne({account:req.session.acc,_id:req.body._id},function(err,doc){
		if(err){
       			throw err;
        		console.log(err);
      	}
      	else{
		console.log("刪除成功");
		res.render("DelSuccess");
		}
	})
  }
  else{
    res.render("Nologin");
  }
};


