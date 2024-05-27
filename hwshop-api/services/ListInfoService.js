const BaseService = require('./BaseService');
const PageList = require("../model/PageList");
class ListInfoService extends BaseService {
    constructor() {
        super();
        this.currentTable = this.tableMap.list_info;
    }
   
}

module.exports = ListInfoService;