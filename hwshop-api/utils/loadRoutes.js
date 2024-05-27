const fs = require("fs");
const path = require("path");
const ResultJson = require("../model/ResultJson");
/**
 * 加载路由
 * @param {import("express").Express} app 
 */
const loadRoutes = app => {
    let arr = fs.readdirSync(path.join(__dirname, "../routes"));
    for (let item of arr) {
        let router = require(path.join(__dirname, "../routes", item));
        buildBaseRouterHandler(router)
        app.use(`/${item.replace("Router.js", "")}`, router);
    }
}

/**
 * 生成每个路由里面基本的增删除查请求
 * @param {import("express").Router & {currentService:import("../services/BaseService")}} router 
 */
const buildBaseRouterHandler = router => {
    if (router.currentService) {
        router.post("/add", async (req, resp) => {
            let flag = await router.currentService.add(req.body);
            resp.json(new ResultJson(flag, flag ? "新增成功" : "新增失败"));
        });
        router.delete("/deleteById/:id", async (req, resp) => {
            let flag = await router.currentService.deleteById(req.params.id);
            resp.json(new ResultJson(flag, flag ? "删除成功" : "删除失败"));
        })
        router.put("/update/:id", async (req, resp) => {
            req.body.id = req.params.id;
            let flag = await router.currentService.update(req.body);
            resp.json(new ResultJson(flag, flag ? "修改成功" : "修改失败"));
        });

        router.get("/findById/:id", async (req, resp) => {
            let result = await router.currentService.findById(req.params.id);
            let flag = Boolean(result)
            resp.json(new ResultJson(flag, flag ? "获取数据成功" : "获取数据失败", result));
        });

        router.get("/getAllList",async (req, resp) => {
            let resultList = await router.currentService.getAllList();
            resp.json(new ResultJson(true, "获取成功", resultList));
        });
    }

}


module.exports = loadRoutes;