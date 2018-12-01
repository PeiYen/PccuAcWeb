var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');  //郵件信箱驗證

// 切換註冊帳號介面
exports.get_reg =  function(req, res) {
  if(req.session.isLogin == true){
    res.render('RegNo');
  }
  else{
    res.render("register");
  }
  
};

exports.post_reg = function(req, res) {
  var code =  Math.random().toString(36).substring(2); //驗證碼規格 10為含隨機數字與英文
  var today = new Date();
  var SucDate = today.getTime();


//1小時=3,600,000毫秒
    console.log("這是註冊");

    var user = new userdata({ //user集合為使用者註冊資料
      account: req.body.email,
      password: req.body.pwd,
      name:req.body.name1,
      phone:req.body.Number,     
      code:code,                          //驗證信箱瑪
      islive:false,                       //是否驗證帳戶
      SucDate:SucDate,                    //驗證時間
      Date:day,                           //日期
      Time:now                            //時間
    });


    userdata.findOne({account:req.body.email},function(err,doc){ //搜尋userdata集合的文大帳戶欄位
        if(err){
          throw err;
          console.log(err);
        }
        else if(doc){
            res.render("regError");  //如果帳號已註冊
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
            to: req.body.email,
            subject: '文大拍賣網驗證信', //標題
            // text:'點擊驗證："http://localhost:3000/routes/checkCode?account='+ req.body.email +'&code='+ code + '"',     //內容
              html:'<h2>歡迎註冊文大拍賣網 快來驗證帳號吧!</h2><br/><a href="http://pccuac.hopto.org:3000/routes/checkCode?account='+ req.body.retemail +'&code='+ code + '"><h2>點我驗證帳號!!</h2></a></br><img src="https://i.imgur.com/DwH6uA0.png" width="500" height="350"> '
          };

          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          //以上為驗證信之內容
          user.save(function(err,doc){
              if (err) throw err ;
              console.log('註冊成功'); //註冊成功
          });
         res.render('regsuccess');
        }
    });
};