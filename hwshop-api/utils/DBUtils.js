/**
 * @name DBUtils
 * @version 1.0.0
 * @author Theodore
 * @description 数据库操作的封装
 */
const mysql = require("mysql2");


class DBUtils {
    /**
     * 获取数据库的连接
     * @returns {mysql.Connection}
     */
    getConn() {
        let conn = mysql.createConnection({
            host: "127.0.0.1",
            port: 3306,
            user: "root",
            password: "020308",
            database: "hwshop"
        })
        conn.connect();
        return conn;
    }


    /**
     * 执行SQL语句
     * @param {string} sql 
     * @param {Array} params 
     * @returns {Promise<Array|mysql.ResultSetHeader>} 返回SQL语句执行的结果
     */
    executeSql(sql, params = []) {
        let conn = this.getConn();
        return new Promise((resolve, reject) => {
            conn.query(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
                conn.end();
            })
        })
    }
    /**
     * 执行SQL事务
     * @param {Array<{sql:string,params:[]}>} sqlEnemtyList 
     */
    executeTransaction(sqlEnemtyList) {
        return new Promise((resolve, reject) => {
            let conn = this.getConn();
            conn.beginTransaction(error => {
                if (error) {
                    reject(error)
                    return;
                }
                //得到promiseArr
                let arr = sqlEnemtyList.map(item => {
                    return new Promise((sqlResolve, sqlReject) => {
                        conn.query(item.sql, item.params, (err, result) => {
                            if (err) {
                                sqlReject(err);
                            }
                            else {
                                sqlResolve(result)
                            }
                        })
                    })
                });
                //执行promise的并发
                Promise.all(arr)
                    .then(resultArr => {
                        conn.commit();
                        resolve(resultArr);
                    }).catch(error => {
                        conn.rollback();
                        reject(error);
                    }).finally(() => conn.end())
            })
        })
    }
    paramsInit() {
        let obj = {
            strWhere: "",
            params: [],
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
        };
        return obj;
    }
}


module.exports = DBUtils;