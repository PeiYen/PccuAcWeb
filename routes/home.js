var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var url = require('url');


exports.ghome = function(req, res) {
	var params = url.parse(req.url, true).query;
	if(!params.minprice){
		req.session.min = 0;
	}
	else{
		req.session.min = params.minprice;//儲存最小值Cookie
	}
   

	if(!params.minprice){
		req.session.max = 0;
	}
	else{
		req.session.max = params.maxprice;//儲存最大值Cookie
	}

     if(!params.style){  //商品呈現方式
          req.session.style = "list";//並列
     }
     else if(params.style != "large"){  
          req.session.style = "list";
     }
     else if(params.style == "large"){
          req.session.style = "large;"
     }


if(params.sort == "priceBIG"){
	buy.find({Seller:req.session.acc,Orderstatus: { $ne : "交易完成" }},function(err,order){
	if(params.minprice !="" && params.maxprice !="" && params.minprice!=null &&params.maxprice !=null){
		if(params.Classification != null && params.status!=null && params.Search!=null){ //$regex為關鍵字查詢 $options為忽略大小寫
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,Pstatus:params.status,price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"price":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Classification != null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"price":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.status!=null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Pstatus:params.status,price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"price":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null && params.status!=null){ //Classification 種類 status 狀況
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,price:{$gte:params.minprice,$lte:params.maxprice},Pstatus:params.status}).sort({"price":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null){
		Publish.find({account: { $ne : req.session.acc },price:{$gte:params.minprice,$lte:params.maxprice},Classification:params.Classification}).sort({"price":-1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.status != null){
		Publish.find({account: { $ne : req.session.acc },price:{$gte:params.minprice,$lte:params.maxprice},Pstatus:params.status}).sort({"price":-1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Search!=null){
		Publish.find({account: { $ne : req.session.acc },price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"price":-1}).exec(function(err,doc){ //$regex為關鍵字查詢 $options為忽略大小寫
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else{
		Publish.find({account: { $ne : req.session.acc },price:{$gte:params.minprice,$lte:params.maxprice}}).sort({"price":-1}).exec(function(err,doc){
	 	res.render("index",{
	 	pub:doc,//商品資訊匯入首頁
     	loginStatus:req.session.isLogin,
     	sort:params.sort,
     	min:req.session.min,
     	max:req.session.max,
     	name:req.session.user,
          style:req.session.style,
     	order:order
     	});
	});
	}
	}
	else{
		if(params.Classification != null && params.status!=null && params.Search!=null){ //$regex為關鍵字查詢 $options為忽略大小寫
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,Pstatus:params.status,product:{ $regex:params.Search , $options: 'i' }}).sort({"price":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Classification != null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,product:{ $regex:params.Search , $options: 'i' }}).sort({"price":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.status!=null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Pstatus:params.status,product:{ $regex:params.Search , $options: 'i' }}).sort({"price":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null && params.status!=null){ //Classification 種類 status 狀況
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,Pstatus:params.status}).sort({"price":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null){
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification}).sort({"price":-1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.status != null){
		Publish.find({account: { $ne : req.session.acc },Pstatus:params.status}).sort({"price":-1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Search!=null){
		Publish.find({account: { $ne : req.session.acc },product:{ $regex:params.Search , $options: 'i' }}).sort({"price":-1}).exec(function(err,doc){ //$regex為關鍵字查詢 $options為忽略大小寫
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else{
		Publish.find({account: { $ne : req.session.acc }}).sort({"price":-1}).exec(function(err,doc){
	 	res.render("index",{
	 	pub:doc,//商品資訊匯入首頁
     	loginStatus:req.session.isLogin,
     	sort:params.sort,
     	min:req.session.min,
     	max:req.session.max,
     	name:req.session.user,
          style:req.session.style,
     	order:order
     	});
	});
	}
	}
	});
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
else if(params.sort == "priceSMALL"){
	buy.find({Seller:req.session.acc,Orderstatus: { $ne : "交易完成" }},function(err,order){
	if(params.minprice !="" && params.maxprice !="" && params.minprice!=null &&params.maxprice !=null){
		if(params.Classification != null && params.status!=null && params.Search!=null){ //$regex為關鍵字查詢 $options為忽略大小寫
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,Pstatus:params.status,price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"price":1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Classification != null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"price":1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.status!=null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Pstatus:params.status,price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"price":1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null && params.status!=null){ //Classification 種類 status 狀況
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,price:{$gte:params.minprice,$lte:params.maxprice},Pstatus:params.status}).sort({"price":1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null){
		Publish.find({account: { $ne : req.session.acc },price:{$gte:params.minprice,$lte:params.maxprice},Classification:params.Classification}).sort({"price":1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.status != null){
		Publish.find({account: { $ne : req.session.acc },price:{$gte:params.minprice,$lte:params.maxprice},Pstatus:params.status}).sort({"price":1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Search!=null){
		Publish.find({account: { $ne : req.session.acc },price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"price":1}).exec(function(err,doc){ //$regex為關鍵字查詢 $options為忽略大小寫
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else{
		Publish.find({account: { $ne : req.session.acc },price:{$gte:params.minprice,$lte:params.maxprice}}).sort({"price":1}).exec(function(err,doc){
	 	res.render("index",{
	 	pub:doc,//商品資訊匯入首頁
     	loginStatus:req.session.isLogin,
     	sort:params.sort,
     	min:req.session.min,
     	max:req.session.max,
     	name:req.session.user,
          style:req.session.style,
     	order:order
     	});
	});
	}
	}
	else{
	if(params.Classification != null && params.status!=null && params.Search!=null){ //$regex為關鍵字查詢 $options為忽略大小寫
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,Pstatus:params.status,product:{ $regex:params.Search , $options: 'i' }}).sort({"price":1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Classification != null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,product:{ $regex:params.Search , $options: 'i' }}).sort({"price":1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.status!=null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Pstatus:params.status,product:{ $regex:params.Search , $options: 'i' }}).sort({"price":1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null && params.status!=null){ //Classification 種類 status 狀況
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,Pstatus:params.status}).sort({"price":1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null){
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification}).sort({"price":1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.status != null){
		Publish.find({account: { $ne : req.session.acc },Pstatus:params.status}).sort({"price":1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Search!=null){
		Publish.find({account: { $ne : req.session.acc },product:{ $regex:params.Search , $options: 'i' }}).sort({"price":1}).exec(function(err,doc){ //$regex為關鍵字查詢 $options為忽略大小寫
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else{
		Publish.find({account: { $ne : req.session.acc }}).sort({"price":1}).exec(function(err,doc){
	 	res.render("index",{
	 	pub:doc,//商品資訊匯入首頁
     	loginStatus:req.session.isLogin,
     	sort:params.sort,
     	min:req.session.min,
     	max:req.session.max,
     	name:req.session.user,
          style:req.session.style,
     	order:order
     	});
	});
	}
	}
	});
	}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	else{
	buy.find({Seller:req.session.acc,Orderstatus: { $ne : "交易完成" }},function(err,order){
	if(params.minprice !="" && params.maxprice !="" && params.minprice!=null &&params.maxprice !=null){
		if(params.Classification != null && params.status!=null && params.Search!=null){ //$regex為關鍵字查詢 $options為忽略大小寫
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,Pstatus:params.status,price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"_id":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Classification != null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"_id":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.status!=null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Pstatus:params.status,price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"_id":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null && params.status!=null){ //Classification 種類 status 狀況
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,price:{$gte:params.minprice,$lte:params.maxprice},Pstatus:params.status}).sort({"_id":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null){
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,price:{$gte:params.minprice,$lte:params.maxprice}}).sort({"_id":-1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.status != null){
		Publish.find({account: { $ne : req.session.acc },Pstatus:params.status,price:{$gte:params.minprice,$lte:params.maxprice}}).sort({"_id":-1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Search!=null){
		Publish.find({account: { $ne : req.session.acc },price:{$gte:params.minprice,$lte:params.maxprice},product:{ $regex:params.Search , $options: 'i' }}).sort({"_id":-1}).exec(function(err,doc){ //$regex為關鍵字查詢 $options為忽略大小寫
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else{
		Publish.find({account: { $ne : req.session.acc },price:{$gte:params.minprice,$lte:params.maxprice}}).sort({"_id":-1}).exec(function(err,doc){
	 	res.render("index",{
	 	pub:doc,//商品資訊匯入首頁
     	loginStatus:req.session.isLogin,
     	sort:params.sort,
     	min:req.session.min,
     	max:req.session.max,
     	name:req.session.user,
          style:req.session.style,
     	order:order
     	});
	});
	}
	}	
	else{
	if(params.Classification != null && params.status!=null && params.Search!=null){ //$regex為關鍵字查詢 $options為忽略大小寫
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,Pstatus:params.status,product:{ $regex:params.Search , $options: 'i' }}).sort({"_id":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Classification != null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,product:{ $regex:params.Search , $options: 'i' }}).sort({"_id":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.status!=null && params.Search!=null){ 
		Publish.find({account: { $ne : req.session.acc },Pstatus:params.status,product:{ $regex:params.Search , $options: 'i' }}).sort({"_id":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null && params.status!=null){ //Classification 種類 status 狀況
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification,Pstatus:params.status}).sort({"_id":-1}).exec(function(err,doc){ 
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}	
	else if(params.Classification != null){
		Publish.find({account: { $ne : req.session.acc },Classification:params.Classification}).sort({"_id":-1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.status != null){
		Publish.find({account: { $ne : req.session.acc },Pstatus:params.status}).sort({"_id":-1}).exec(function(err,doc){
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else if(params.Search!=null){
		Publish.find({account: { $ne : req.session.acc },product:{ $regex:params.Search , $options: 'i' }}).sort({"_id":-1}).exec(function(err,doc){ //$regex為關鍵字查詢 $options為忽略大小寫
			res.render("index",{
	 		pub:doc,//商品資訊匯入首頁
     		loginStatus:req.session.isLogin,
     		sort:params.sort,
     		min:req.session.min,
     		max:req.session.max,
     		name:req.session.user,
               style:req.session.style,
     		order:order
     		});
		});
	}
	else{
		Publish.find({account: { $ne : req.session.acc }}).sort({"_id":-1}).exec(function(err,doc){
	 	res.render("index",{
	 	pub:doc,//商品資訊匯入首頁
     	loginStatus:req.session.isLogin,
     	sort:params.sort,
     	min:req.session.min,
     	max:req.session.max,
     	name:req.session.user,
          style:req.session.style,
     	order:order
     	});
	});
	}
	}
	});
	}
};