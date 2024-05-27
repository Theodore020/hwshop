const express = require('express');
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");
const ResultJson = require('../model/ResultJson');



router.get("/getAreaLevelList", async (req, resp) => {
    let list = await ServiceFactory.createAreaService().getAllList();
    let obj = {
        provinceList:[],
        cityList:[],
        areaList:[]
    }
    list.forEach(item=>{
        if(item.level===1){
            obj.provinceList.push(item)
        }
        else if(item.level===2){
            obj.cityList.push(item)
        }
        else if(item.level===3){
            obj.areaList.push(item);
        }
    })

    resp.json(new ResultJson(true,"获取数据成功",obj));
});


module.exports = router;