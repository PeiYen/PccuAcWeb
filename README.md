# 專題網站
<p align="center">
  <a href="http://pccuac.hopto.org:3000/">
    <img src="https://i.imgur.com/DwH6uA0.png"  width="400" height="200" title="source: imgur.com" />
  </a> 
</p>

## 使用套件
```- MongoDB
- Nodejs    
    └── 安裝套件
          ├── "body-parser": "^1.18.2",
          ├── "connect-mongo": "^2.0.1",
          ├── "connect-mongostore": "^0.1.4",
          ├── "cookie-parser": "^1.4.3",
          ├── "ejs": "^2.5.7",
          ├── "express": "^4.16.3",
          ├── "express-session": "^1.15.6",
          ├── "mongo": "^0.1.0",
          ├── "mongod": "^2.0.0",
          ├── "mongodb": "^3.0.7",
          ├── "mongoose": "^5.0.15",
          ├── "morgan": "^1.9.0",
          ├── "multer": "^1.3.0",
          ├── "nodemailer": "^4.6.8",
          └── "url": "^0.11.0"
- Html
- Bootstrap
- Css
- JQuery
```
## 檔案目錄
```
文大拍賣網/
     ├── css
     |    └──設定Html的排版與美化     
     ├── images
     |    └──靜態圖片放置 
     ├── routes
     |    └──後端程式(js)
     ├──
     |    └──前端程式(ejs) 
     ├── app.js (啟動Server)
     ├── package.json (顯示安裝nodejs套件)
     └── package-lock.json (詳細顯示安裝nodejs套件)
          
```
## 啟動網站
1. 安裝 ```Nodejs```
2. 安裝 ```MongoDB```
3. ```npm install```  package.json中的nodejs套件
4. 開啟命令提示字元 cd 到該文件根目錄
5. 開啟MongoDB的資料夾 ```bin/mongod.exe```
6. 執行```node app.js```即可 
也可以使用 ```npm install nodemon -g``` 後到第6步執行 ```nodemon app.js``` 




