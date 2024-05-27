const BaseService = require('./BaseService');
const PageList = require("../model/PageList");
class GoodsInfoService extends BaseService {
    constructor() {
        super();
        this.currentTable = this.tableMap.goods_info;
    }
    async getListByPageForCategory({ category_id, pageIndex = 1,startMoney,endMoney }) {
        let [listData, total_count] = await this.createQuery(this.currentTable)
            .gte("goods_info.money", startMoney)
            .lte("goods_info.money", endMoney)
            .innerJoin(this.tableMap.category_info, `${this.currentTable}.category_id=${this.tableMap.category_info}.id`)
            .addField(`${this.tableMap.category_info}.category_name`)
            .innerJoin(this.tableMap.goods_img_info, `${this.currentTable}.id=${this.tableMap.goods_img_info}.goods_id`)
            .addField(`${this.tableMap.goods_img_info}.img_url`)
            .equal("goods_info.category_id", category_id)
            .setPageIndex(pageIndex)
            .getPageAndCount();
        return new PageList(pageIndex, total_count, listData);
    }
    async findById(id) {
        let sql = `select goods_info.*,goods_img_info.img_url from ${this.currentTable}
        inner join goods_img_info on goods_info.id = goods_img_info.goods_id
        where goods_img_info.is_del = false and goods_info.id=${id}`
        return this.executeSql(sql, [id])
    }
}

module.exports = GoodsInfoService;