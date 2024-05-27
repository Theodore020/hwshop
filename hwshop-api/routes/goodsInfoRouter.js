const express = require('express');
const router = express.Router();
const ResultJson = require("../model/ResultJson");
const ServiceFactory = require("../factory/ServiceFactory");


router.currentService = ServiceFactory.createGoodsInfoService();
router.routerName = "goodsInfo";
router.get("/getListByPageForCategory", async (req, resp) => {
    let pageList = await ServiceFactory.createGoodsInfoService().getListByPageForCategory(req.query);
    resp.json(new ResultJson(true, "数据获取成功", pageList));
})



module.exports = router;