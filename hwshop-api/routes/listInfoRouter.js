const express = require('express');
const router = express.Router();
const ResultJson = require("../model/ResultJson");
const ServiceFactory = require("../factory/ServiceFactory");


router.currentService = ServiceFactory.createListInfoService();
router.routerName = "listInfo";


module.exports = router;