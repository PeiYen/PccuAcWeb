var session      = require('express-session');
var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var multer = require('multer');
var storage =   multer.diskStorage({
    limits: { fileSize : 1024 * 1024 * 16}, //圖片限制16MB
    destination: function (req, file, callback) {
                    callback(null, './uploadimg');
                    },
    filename: function (req, file, callback) {
                    callback(null,  Date.now() + '-' + file.originalname)//此設定為上傳圖片命名 時間-該圖名+副檔名
                    },

   });
var upload = multer({ storage : storage});
var fs = require('fs');

//處理路由部分
var home = require('./home');
var reg = require('./reg');
var login = require('./login');
var logout = require('./logout');
var check = require('./check');
var change = require('./changeData');
var sell = require('./sell');
var pub =require('./pub');
var shopcart = require('./Shopcart');
var buy = require('./buy')
var MyPub = require('./MyPub');
var user = require('./user');
var mydata = require('./mydata');
var confirm = require('./confirm');
var order = require('./order');
var ordersession = require('./ordersession');
var changequantity = require('./changequantity');
var Evaluation = require('./Evaluation');
var checkCode = require('./checkCode');
var reset = require('./reset');
var chIntrod = require('./chIntrod');
var forget = require('./forget');
//訂單
global.buy = mongoose.model('buy',{
  Ordernum:String,                //訂單編號
  Orderstatus:String,             //訂單狀態
  Seller:String,                  //賣家帳戶
  Sellername:String,              //賣家姓名
  Sellphone:Number,               //賣家電話
  account:String,                 //訂購人帳戶
  name:String,                    //訂購人姓名
  phone:Number,                   //訂購人電話
  product:String,                 //商品名稱
  quantity:Number,                //商品數量
  price:Number,                   //商品價格
  total:Number,                   //總價格
  Cover:String,                   //商品封面圖
  id:String,                      //商品ID
  Date:String,                    //日期
  Time:String                     //時間
});   
//追蹤商品
global.shopcart = mongoose.model('shopcart',{
  id:String,              //儲存與商品id一樣
  account:String,         //訂購人帳戶
  name:String,            //訂購人姓名
  phone:Number,           //訂購人電話
  product:String,         //商品名稱
  Classification:String,  //分類
  Cover:String,           //商品封面圖
  quantity:Number,        //商品數量
  price:Number,           //商品價格
  Pstatus:String,         //商品狀況
  Introduce:String,       //商品介紹
  Date:String,            //日期
  Time:String             //時間
})
//使用者帳戶
global.userdata = mongoose.model('userdata', { //儲放使用者資料的集合
  account: String,  //文大帳戶
  password: String, //密碼
  name:String,      //姓名
  phone:Number,     //電話號碼
  code:String,      //驗證信箱瑪
  Line:String,      //Line Id
  Introd:String,    //自我介紹
  islive:Boolean,   //是否驗證帳戶
  SucDate:Number,   //驗證時間
  Date:String,      //日期
  Time:String       //時間
});
userdata.updateMany({},{islive:true},function(err,doc){})
userdata.updateOne({account:"A4230763@g.pccu.edu.tw"},{islive:true},function(err,doc){})
// userdata.updateMany({},{islive:false},function(err,doc){})
//刊登商品
global.Publish = mongoose.model('Publish',  { //刊登商品集合
  account:{type:String,ref:'userdata'},       //account與登入之帳戶關聯
  name:{type:String,ref:'userdata'},          //name與登入之帳戶關聯
  phone:{type:String,ref:'userdata'},         //phone與登入之帳戶關聯
  Picture:[{type:String,ref:'PubImg'}],       //與上傳圖片做關聯
  Cover:String,           //封面圖片
  product:String,         //商品名稱
  Classification:String,  //分類
  quantity:Number,        //商品數量
  price:Number,           //商品價格
  Pstatus:String,         //商品狀況
  Introduce:String,       //商品介紹
  guest:Number,           //留言數
  Ans:Number,             //回覆數
  Date:String,            //日期
  Time:String             //時間
});
//上傳圖片用
global.PubImg = new mongoose.Schema({       //上傳圖片集合
  file:[String]
});
//留言板
global.guestbook = mongoose.model('guestbook',{
  productid:String,       //商品ID
  account:String,         //留言帳戶
  name:String,            //留言者姓名
  sellaccount:String,     //賣家帳戶
  message:String,         //留言
  Date:String,            //日期
  Time:String             //時間
});
//賣家回覆
global.Ans = mongoose.model('Ans',{
  productid:String,       //商品ID
  QusID:String,           //留言ID
  account:String,         //賣家帳戶
  name:String,            //賣家姓名
  message:String,         //留言
  Date:String,            //日期
  Time:String             //時間
});
//評價
global.Evaluation = mongoose.model('Evaluation',{
  account:String,     //賣家帳戶,用於做帳戶總評
  Buyacc:String,      //買家帳戶
  ProId:String,       //商品ID,辨別商品評價
  Ordernum:String,    //以訂單編號為評價次數
  Score:Number,       //評分
  opinion:String,     //意見
  Date:String,        //日期
  Time:String         //時間
});

// userdata.update({account:"A4230763@g.pccu.edu.tw"},{islive:false},function(err,doc){});

var ImgUpload = upload.fields([{name:'Img1',maxCount:1},{name:'Img',maxCount:9}]);//name為欄位名稱 maxCount為最大上傳數限制 ([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
//根目錄路由
router.route('/')
	.get(home.ghome);
//註冊路由  
router.route("/register")
  .get(reg.get_reg)
  .post(reg.post_reg);
//登入路由
router.route("/login")
  .get(login.get_log)
  .post(login.post_log);
//登出路由
router.route("/logout")
  .get(logout.logout);
  //驗證密碼路由
router.route('/check')
  .get(check.get_check)
  .post(check.post_check);
  //更改會員資料路由
router.route('/change')
  .get(change.get_change)
  .post(change.post_change);
  //商品頁面路由
router.route('/pub')
  .get(pub.get_pub)
  .post(pub.post_pub);
  //購物車路由
router.route('/Shopcart')
  .get(shopcart.get_Shopcart)
  .post(shopcart.post_Shopcart); 
  //購買路由
router.route('/buy')
  .post(buy.post_buy);
  //我的拍賣
router.route('/MyPub')
  .get(MyPub.get_MyPub)
  .post(MyPub.post_MyPub);
  //帳戶頁面
router.route('/user')
  .get(user.get_user);
  //帳戶頁面
router.route('/mydata')
  .get(mydata.get_mydata)
  .post(mydata.post_mydata);
  //更改自介
router.route('/chIntrod')
  .get(chIntrod.get_chIntrod)
  .post(chIntrod.post_chIntrod);
  //購買商品查詢
router.route('/confirm')
  .get(confirm.get_confirm);
  //賣家訂單查詢
router.route('/order')
  .get(order.get_order)
  .post(order.post_order);
  //訂單紀錄查詢
router.route('/ordersession')
  .get(ordersession.get_ordersession);
  //更改商品數量
router.route('/changequantity')
  .get(changequantity.get_changequantity)
  .post(changequantity.post_changequantity);
  //商品評價
router.route('/Evaluation')
  .get(Evaluation.get_Evaluation)
  .post(Evaluation.post_Evaluation);
  //信箱驗證
router.route('/checkCode')
  .get(checkCode.get_checkCode);
  //重發驗證碼
router.route('/reset')
  .get(reset.get_reset)
  .post(reset.post_reset);
  //忘記密碼
router.route('/forget')
  .get(forget.get_forget)
  .post(forget.post_forget);
  //拍賣商品路由
router.route('/sell')
  .get(sell.get_sell)
  .post(ImgUpload,function(req,res){ 
    if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
        var user = new userdata({
          name:req.session.user,   //紀錄PO商品的帳號資訊
          account:req.session.acc,
          phone:req.session.phone
        });
        // console.log(req.files);
      
        var arr = [];
        
        for (var a=0;a<req.files['Img'].length;a++){//將圖片資料儲存到arr陣列中 
          arr[a] = req.files['Img'][a];
        }
        // console.log(arr);
        console.log(arr.length);
        console.log(req.files['Img'][0]);
        console.log(req.files['Img1'][0]);

        var Pubimg = mongoose.model('Pubimg',PubImg);

        var imgEntity = new Pubimg({});//商品圖片



        if(arr.length!=0){ //如果arr不為空集合 (因為長度為0的陣列為空等於沒上傳半張圖片)
          for(var i=0;i<arr.length;i++){           
            imgEntity.file.push(arr[i].filename);
          }
        }
        
        var Pub = new Publish({
          account:user.account,                     //賣家帳戶
          name:user.name,                           //賣家姓名
          phone:user.phone,                         //賣家電話
          Picture:imgEntity.file,                   //上傳商品之圖片
          Cover:req.files['Img1'][0].filename,      //商品封面圖片
          product:req.body.Prod,                    //商品名稱
          Classification:req.body.Classification,   //分類
          quantity:req.body.quantity,               //商品數量
          price:req.body.price,                     //商品價格
          Pstatus:req.body.Pstatus,                 //商品狀況
          Introduce:req.body.Introduce,             //商品介紹
          guest:0,                                  //留言數
          Ans:0,                                    //回覆數
          Date:day,                                 //日期
          Time:now                                  //時間
        });

      if(arr.length!=0){
        Pub.save(function(err,doc){
          if (err) throw err ;
          console.log('商品註冊成功');
        });
        imgEntity.save(function(err,doc){
          if (err) throw err ;
          console.log('商品圖片上傳成功');
          console.log(req.files);
        });
      }
          res.render('sellSuc');
          // console.log(req.body);
     }
    else{
      res.render("Nologin");
    }
  });
module.exports = router;