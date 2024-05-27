const jwt = require("jsonwebtoken");
const APPConfig = require("../config/APPConfig");
const ResultJson = require("../model/ResultJson");

/**
 * 做jwt鉴权的中间件
 * @param {import("express").Request} req 
 * @param {import("express").Response} resp 
 * @param {import("express").NextFunction} next 
 */
const permissionCheck = (permissionKey) => {
    return function (req, resp, next) {
        let token = req.headers["authorization"];
        if (token) {
            token = token.replace("Bearer ", "");
            try {
                let decode = jwt.verify(token, APPConfig.privateKey);
                // 将解密以后的东西保存起来，这样后期方便继续操作
                req.user = decode;
                if (permissionKey) {
                    //说明需要进一下的验证是否具备这个权限
                    if (decode.allPermissionKey.includes(permissionKey)) {
                        next();
                    }
                    else {
                        resp.status(403).json(new ResultJson(false, "请求未授权"));
                    }
                }
                else {
                    next();
                }

            } catch (error) {
                console.log(error);
                //验证失败
                resp.status(401).json(new ResultJson(false, "请求未授权"));
            }
        }
        else {
            //token没有值
            resp.status(401).json(new ResultJson(false, "请求未授权"));
        }
    }
}

module.exports = permissionCheck;