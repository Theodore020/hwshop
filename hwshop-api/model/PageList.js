/**
 * 分页查询以后返回给前端的结果
*/
class PageList {
    constructor(pageIndex, total_count, listData) {
        this.pageIndex = Number(pageIndex);
        this.totalCount = total_count;
        this.pageCount = Math.ceil(total_count / 10);
        this.listData = listData;
        let pageStart = this.pageIndex - 2;
        this.pageStart = pageStart < 1 ? 1 : pageStart;
        let pageEnd = this.pageStart + 4;
        this.pageEnd = pageEnd > this.pageCount ? this.pageCount : pageEnd;
    }
}
module.exports = PageList;