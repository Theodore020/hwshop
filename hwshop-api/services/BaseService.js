
/**
 * 所有Service对象公共的父级对象
 */
const DBUtils = require('../utils/DBUtils');

class BaseService extends DBUtils {
    constructor() {
        super();
        this.tableMap = {
           goods_info:"goods_info",
           category_info:"category_info",
           goods_img_info:"goods_img_info",
           t_area:"t_area",
           list_info:"list_info"
        }
        this.currentTable = "";
    }
    /**
     * 
     * @param {number} id 
     * @returns {Promise<object>} 返回查询的结果
     */
    async findById(id) {
        let sql = `select * from ${this.currentTable} where id = ? and is_del = false`;
        let result = await this.executeSql(sql, [id]);
        return result[0];
    }

    /**
     * 查询所有数据
     * @returns {Promise<Array>} 查询结果
     */
    getAllList() {
        let sql = `select * from ${this.currentTable} where is_del = false`;
        return this.executeSql(sql);
    }
    /**
     * 
     * @param {number} id 
     * @returns {Promise<boolean>} true删除成功 false删除失败
     */
    async deleteById(id) {
        let sql = `update ${this.currentTable} set is_del = true where id = ?`;
        let result = await this.executeSql(sql, [id]);
        return result.affectedRows > 0;
    }

    /**
     * 新增
     * @param {object} obj 
     * @returns {Promise<boolean>} true新增成功，false新增失败
     */
    async add(obj) {
        obj.create_at = new Date();
        let keys = Object.keys(obj);
        let values = Object.values(obj);
        let sql = `insert into ${this.currentTable}  (${keys.join(",")}) values (${new Array(keys.length).fill("?").join(",")}) `;
        let result = await this.executeSql(sql, values);
        return result.affectedRows > 0;
    }


    async update(obj) {
        // obj = {
        //     email: "123@qq.com",
        //     id: 1
        // }
        // let sql =`update ${this.currentTable} set update_at = ?,email=?  where id = ?`;
        let sql = `update ${this.currentTable} set update_at = ?`;
        let params = [new Date()];
        for (let property in obj) {
            if (property === "id") {
                continue;
            }
            sql += `,${property} = ?`;
            params.push(obj[property]);
        }
        sql += ` where id = ? and is_del = false`
        params.push(obj.id);
        let result = await this.executeSql(sql, params);
        return result.affectedRows > 0;
    }
    createQuery(tableName = this.currentTable) {
        const that = this;
        let obj = {
            listSql: ` select ${tableName}.* `,
            countSql: ` select count(*) total_count from ${tableName} where ${tableName}.is_del = false `,
            from: ` from ${tableName} `,
            where: ` where ${tableName}.is_del = false `,
            pageIndex: 1,
            orderByStr: "",
            innerJoinStr: "",
            innerJoinFields: [],
            strWhere: "",
            params: [],
            innerJoin(targetTableName, onCondition) {
                this.innerJoinStr += ` inner join ${targetTableName} on ${onCondition} `;
                return this;
            },
            addField(field) {
                this.innerJoinFields.push(field);
                return this;
            },
            equal(key, value) {
                if (value) {
                    this.strWhere += ` and ${key} = ? `;
                    this.params.push(value);
                }
                return this;
            },
            like(key, value) {
                if (value) {
                    this.strWhere += ` and ${key} like ? `;
                    this.params.push(`%${value}%`);
                }
                return this;
            },
            gt(key, value) {
                if (value) {
                    this.strWhere += ` and ${key} > ? `;
                    this.params.push(value);
                }
                return this;
            },
            lt(key, value) {
                if (value) {
                    this.strWhere += ` and ${key} < ? `;
                    this.params.push(value);
                }
                return this;
            },
            gte(key, value) {
                if (value) {
                    this.strWhere += ` and ${key} >= ? `;
                    this.params.push(value);
                }
                return this;
            },
            lte(key, value) {
                if (value) {
                    this.strWhere += ` and ${key} <= ? `;
                    this.params.push(value);
                }
                return this;
            },
            setPageIndex(pageindex) {
                this.pageIndex = pageindex;
                return this;
            },
            /**
             * 
             * @param {string} columnName 
             * @param {"asc"|"desc"} orderType 
             */
            orderBy(columnName, orderType = "asc") {
                this.orderByStr = ` order by ${columnName} ${orderType}`;
                return this;
            },
            setListSql(listSql) {
                this.listSql = listSql;
                return this;
            },
            setCountSql(countSql) {
                this.countSql = countSql;
                return this;
            },
            async getPageAndCount() {
                // 第一步:拼接SQL
                let sql1 = this.listSql + (this.innerJoinFields.length > 0 ? "," : "") + this.innerJoinFields.join(",") + this.from + this.innerJoinStr + this.where + this.strWhere + this.orderByStr + ` limit ${(this.pageIndex - 1) * 10} , 10 `;
                let sql2 = this.countSql + this.strWhere;
                // 第二步:准备执行事务
                let arr = [{
                    sql: sql1,
                    params: this.params
                }, {
                    sql: sql2,
                    params: this.params
                }];
                //第三步:开始执行
                let [listData, [{ total_count }]] = await that.executeTransaction(arr);
                return [listData, total_count];
            }
        }
        return obj;
    }
}


module.exports = BaseService;