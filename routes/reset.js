var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');  //郵件信箱驗證


exports.get_reset =  function(req, res) {
   res.render("reset");
};

exports.post_reset =  function(req, res) {
  var code =  Math.random().toString(36).substring(2); 
  var today = new Date();
  var SucDate = today.getTime();
     console.log("這是重發驗證信");
    userdata.findOne({account:req.body.retemail},function(err,doc){ //搜尋userdata集合的文大帳戶欄位
      if(err){
        throw err;
        console.log(err);
      }
      else if(!doc){                                            //如果並未找到剛帳號資訊
        res.render("nofinduser");
      }
      else if(doc.islive == true){                        //如果帳號已經開通
        res.render("checkcodetoed");
      }
      else{
        userdata.updateOne({account:req.body.retemail},{code:code,SucDate:SucDate},function(err,doc){//更新驗證碼與時間
          if(err) throw err;
        })
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
            subject: '文大拍賣網驗證信', //標題
            // text:'點擊驗證："http://localhost:3000/routes/checkCode?account='+ req.body.email +'&code='+ code + '"',     //內容
            html:'<h2>歡迎註冊文大拍賣網，感謝您的支持，快來驗證帳號吧!</h2><br/><a href="http://pccuac.hopto.org:3000/routes/checkCode?account='+ req.body.retemail +'&code='+ code + '"><h2>點我驗證帳號!!</h2></a></br><img src="https://i.imgur.com/G4pIpwP.png" width="800" height="400"> '
          };

          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        res.render("resetcode");
      }
    })
};