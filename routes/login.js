var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');

// 登入
exports.get_log = function(req, res) {
  if(req.session.isLogin == true){
    res.render('LoginNo');
  }
  else{
    res.render("login");
  }
  
};
//把註冊資料跟登入欄輸入的資料作比對
exports.post_log = function(req,res){
    var acc = req.body.email; //acc為儲存使用者登入帳戶
    userdata.findOne({account:acc},function(err , doc){
        if(err){
          throw err;
          res.send(500);
          console.log(err);
        }
        else if(!doc){                        //如果帳號不存在
          res.render("loginError");
        }
        else if(req.body.pwd != doc.password){//如果密碼輸入錯誤
          res.render("loginPwdErr");
        }
        else if(doc.islive != true){     //如果帳號驗證沒過 
          res.render("checkcodeNo");
        }
        else if(doc.islive == true){     
              req.session.user = doc.name;    //紀錄使用者名稱
              req.session.pwd = doc.password; //把登入使用者密碼存到session裡，更改會員資料前驗證使用(check)使用
              req.session.acc = acc;          //把登入使用者電子郵件放進session供更改會員資料(change)使用
              req.session.phone = doc.phone;  //登入使用者電話
              req.session.isLogin = true;     //登入狀態
          return res.redirect('/');
        }
    });  
};
 
