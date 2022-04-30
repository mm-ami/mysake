const express = require("express");
const app = express();
const LoginRegister = require("./route/LoginRegister")
const MyPage = require("./route/mypage")
const Home = require("./route/Home")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", LoginRegister)
app.use("/mypage", MyPage)
app.use("/home", Home)

module.exports = {
  path: '/server',
  handler: app,
};