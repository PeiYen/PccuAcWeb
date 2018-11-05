var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser"); 
var app = express();
var morgan   = require('morgan');
var session  = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');
var multer = require('multer');
var url = require('url');
var nodemailer = require('nodemailer');  //郵件信箱驗證



app.use(session({
  secret:'my secret',//(必要選項):用來簽章sessionID 的cookie
  store:new MongoStore({url:'mongodb://localhost:27017/mydb'}), //mongodb連結
  rolling: true,  //在每個請求執行時，重製MaxAge Time。
  cookie:{maxAge: 60 * 1000 *60} //1小時到期
}))
app.use(cookieParser('my secret'));
app.use(morgan('dev'));     // 把每個請求都顯示在 console
app.use(cookieParser());    // 認證需要用到
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));    // 讀取 html 表格的資料(POST...etc)
app.use('/css', express.static(__dirname + '/css')); 
app.use('/js', express.static(__dirname + '/js'));
app.use('/uploadimg', express.static(__dirname + '/uploadimg'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/static', express.static('public'));



var routes =require('./routes');
app.use('/routes',routes);
var today = new Date();
//getMonth => 一月=0 2月=1 ~~~ 12月=11[陣列]所以+1
global.day = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
global.now = today.getHours() + "：" + today.getMinutes() + "：" +today.getSeconds();
console.log(today);
console.log(day);
console.log(now);
app.get("/",function(req,res){
  res.redirect('/routes');
});

app.use(function(req, res) {
  res.status(404).render("404");//找不到頁面 404
});

//port3000
http.createServer(app).listen(3000, function() {
  console.log("Pccu App started on port 3000.");
});
