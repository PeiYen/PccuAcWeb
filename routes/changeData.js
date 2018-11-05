var session      = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');

//更改會員資料
exports.get_change =  function(req, res) {
  if(req.session.isLogin==true && req.session.check==1){ //req.session.check 為 更改資料前的驗證密碼確認
    req.session.check=0;
    userdata.findOne({account:req.session.acc},function(err,doc){
      if(err) throw err;
      else{
        res.render("change",{
          user:doc
       }); 
      }
    });
  }
  else if(req.session.isLogin==true){
    req.session.check=0;
     res.render("checkpwd");
   }
     else{
      req.session.check=0;
      res.render("Nologin");
  }
};

//XXX.updataMany更改多筆資料，其格式為({要搜尋之欄位},{要更改之欄位},function)
exports.post_change = function(req, res) {
       if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
          // if(req.body.newName!=""){//如果名字沒有輸入，則不更改
          //   req.session.user = req.body.newName; 
          //   userdata.updateOne({account:req.session.acc},{name:req.body.newName},function(err,doc){
          //       if(err){
          //         throw err;
          //         res.send(500);
          //           console.log(err);
          //       }
          //       // else{
          //       //    doc.name=req.body.newName; 
          //       //    req.session.user = req.body.newName;
          //       // } 
          //   })
          // }
          if(req.body.newPas!=""){ //如果密碼沒有輸入，則不更改
            req.session.pwd = req.body.newPas;
            userdata.updateOne({account:req.session.acc},{password:req.body.newPas},function(err,doc){
                if(err){
                  throw err;
                  res.send(500);
                    console.log(err);
                }
            })
          }
          // if(req.body.newPhone!=""){ //如果電話沒有輸入，則不更改
          //    req.session.phone = req.body.newPhone; 
          //    userdata.updateOne({account:req.session.acc},{phone:req.body.newPhone},function(err,doc){
          //       if(err){
          //         throw err;
          //         res.send(500);
          //           console.log(err);
          //       }
          //   })        
          // }   
           console.log('更改成功：');
            res.render("changeSuc");
    // userdata.updateMany({account:req.session.acc},{name:req.body.newName,password:req.body.newPas,phone:req.body.newPhone},function(err,doc){
    //     if(err){
    //       throw err;
    //       res.send(500);
    //       console.log(err);
    //     }
    //     else{
    //       doc.name=req.body.newName;     //更改會員資料的session
    //       doc.password=req.body.newPas;
    //       doc.phone=req.body.newPhone;
    //       req.session.user = doc.name;   //session更新
    //       req.session.pwd = doc.password;        
    //       req.session.phone = doc.phone; 
        
    //     }
    // })
    }
    else{
    res.render("Nologin");
    }   
};