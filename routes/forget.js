var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');  //郵件信箱驗證


exports.get_forget =  function(req, res) {
     if(req.session.isLogin == true){
    res.render('PleaseLogout');
  }
  else{
    res.render("forget");
  }
};

exports.post_forget =  function(req, res) {
    userdata.findOne({account:req.body.retemail,phone:req.body.Number},function(err,doc){ //搜尋userdata集合的文大帳戶欄位
      if(err){
        throw err;
        console.log(err);
      }
      else if(!doc){                                      //如果並未找到該帳號資訊
        res.render("nofinduser");
      }
      else{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'PccuAuctionWebsite07@gmail.com',  //寄信帳戶
              pass: 'aqenomwusvhslufv',        //google授權碼
            },
          });

          var mailOptions = {
            from: 'PccuAuctionWebsite07@gmail.com',
            to: req.body.retemail,
            subject: '文大拍賣網用戶資訊', //標題
            // text:'點擊驗證："http://localhost:3000/routes/checkCode?account='+ req.body.email +'&code='+ code + '"',     //內容
            // 
            html:'<h2><font style="color:#33CCFF"><u>'+ doc.name + '</u></font>&nbsp;&nbsp;&nbsp;&nbsp;,您好</h2><br/><h2>您的密碼為："<font color="red">'+ doc.password +'</font>"</h2></br><img src="https://i.imgur.com/DwH6uA0.png" width="500" height="350"> '
          };

          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        res.render("forgetSuc");
      }
    })
};