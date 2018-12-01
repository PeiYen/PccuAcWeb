var session = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/mydb');
const cookieParser = require('cookie-parser');

exports.get_chIntrod =  function(req, res) {
	if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
		userdata.findOne({account:req.session.acc},function(err,doc){
      if(err) throw err;
      else{
        res.render("chIntrod",{
          user:doc
       }); 
      }
    });
	}
  else{
    res.render("Nologin");
  }
};
exports.post_chIntrod =  function(req, res) {
      if(req.session.isLogin==true){   //防止未登入輸入網址進入頁面
            userdata.updateOne({account:req.session.acc},{Introd:req.body.Introd},function(err,doc){
                if(err){
                  throw err;
                  res.send(500);
                    console.log(err);
                }
            })
         console.log('更改成功：');
        res.render("changesucc");
      }
      else{
        res.render("Nologin");
      }
  
};