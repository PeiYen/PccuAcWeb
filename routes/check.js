var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');


// 會員資料再確認
exports.get_check =  function(req, res) {
  if(req.session.isLogin==true){ //防止未登入輸入網址進入頁面
    res.render("check"); 
  }
  else{
    res.render("Nologin");
  }
};
  
  
exports.post_check = function(req, res){
  if(req.session.isLogin==true){ //防止未登入輸入網址進入頁面
   if(req.body.pwd!=req.session.pwd){  //如果輸入密碼沒有和該帳戶密碼相同時
    res.render("checkError");
   }
   else{
    req.session.check=1;
    return res.redirect('/routes/change');
   }
  }
  else{
    res.render("Nologin");
  }
};