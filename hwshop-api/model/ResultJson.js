/**
 * 返回值对象
 */

class ResultJson {
    /**
     * 
     * @param {boolean} status 
     * @param {string} msg 
     * @param {object} data 
     */
    constructor(status, msg, data = {}) {
        this.code = Number(status);
        this.msg = msg;
        this.data = data;
    }
}

module.exports = ResultJson;