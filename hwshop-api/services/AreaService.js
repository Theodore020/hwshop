const BaseService = require("./BaseService");


class AreaService extends BaseService {
    constructor() {
        super();
        this.currentTable = this.tableMap.t_area;
    }
}

module.exports = AreaService;