const express = require("express");
require("express-async-errors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const path = require("path");
const cors = require("cors");
const buildServiceFactory = require("./factory/buildServiceFactory");
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));

const bodyParser = require("body-parser");
const ResultJson = require("./model/ResultJson");
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/upload", express.static(path.join(__dirname, "./upload")));


buildServiceFactory();
console.log("服务工厂生成完成");
//加载路由
require("./utils/loadRoutes")(app); 





/**
 * 全局异常处理的中间件
 */
app.use((err, req, resp, next) => {
    resp.status(500).json(new ResultJson(false, err.message));
    next();
});


server.listen(3000, "127.0.0.1", () => {
    console.log("服务器启动成功，端口3000");

})