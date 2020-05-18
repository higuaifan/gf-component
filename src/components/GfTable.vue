<template>
    <div class="div-gf-table">
        <slot :table="table" name="table"></slot>
        <el-pagination :current-page.sync="page.pageNum"
                       :page-size="page.pageSize"
                       :page-sizes="[10,20,30,40,50]"
                       :total="page.total"
                       :pager-count="5"
                       @current-change="changePage"
                       @size-change="changePageSize"
                       :class="['pagination',position]"
                       :layout="layout">
        </el-pagination>
    </div>
</template>

<script>
    /**
     * @description GfTable组件
     * @author: 菩萨蛮
     * @date: 2019-09-12 10:31
     * @version: V2.0.0
     */
    import qs from 'qs';

    export default {
        name: 'GfTable',
        props: {
            gfTable: Object,
            pageSize: Number,
            searchPage: Object,
            layout: {
                type: String,
                default: 'total, sizes, prev, pager, next, jumper'
            },
            indices: {
                type: Boolean,
                default: true
            },
            position: {
                type: String,
                default: 'right'
            }
        },
        data() {
            return {
                table: [],
                page: {
                    pageNum: 0,
                    pageSize: 10,
                    total: 0
                },
                searchObj: {}
            };
        },
        async created() {
            this.page.pageSize = this.pageSize || 10;
            await this.getTable();
        },
        watch: {
            'gfTable.updateFlag': function () {
                this.searchObj = this.gfTable.searchObj;
                this.getTable(0);
            },
            'gfTable.url': function () {
                this.searchObj = this.gfTable.searchObj;
                this.getTable(0);
            },
            'gfTable.table': function () {
                this.table = this.gfTable.table;
            },
            'page.total': function () {
                this.updatePage();
            },
            searchPage() {
                this.page = this.searchPage;
            },
            pageSize() {
                this.page.pageSize = this.pageSize || 10;
                this.page.pageNum = 0;
                this.getTable();
            }
        },
        methods: {
            async getTable(pageNum = this.page.pageNum) {
                this.searchObj = {};
                // 创建日期查询的特殊逻辑
                if (this.gfTable.searchObj.createDate && this.gfTable.searchObj.createDate.length > 1) {
                    [this.searchObj.beginDate, this.searchObj.endDate] = this.gfTable.searchObj.createDate;
                }

                Object.keys(this.gfTable.searchObj).forEach(e => {
                    if (!this.utils.isEmpty(this.gfTable.searchObj[e])) {
                        this.searchObj[e] = this.gfTable.searchObj[e];
                    }
                });


                if (pageNum !== this.page.pageNum) {
                    this.page.pageNum = pageNum;
                }
                const { data } = await this.qGet({
                    url: `${this.gfTable.url}?${decodeURIComponent(qs.stringify(Object.assign(this.searchObj,
                        this.page), { indices: this.indices }))}`
                }).catch(e => console.error(e));
                this.table = data.datas || data.supplierList
                    || data.supplierGradleList || data.goods.dataList;
                if (data.goods !== undefined && data.goods.total !== undefined) {
                    data.page = data.goods.page;
                    data.total = data.goods.total;
                }
                this.page = {
                    pageNum: data.page !== undefined ? data.page + 1 : this.page.pageNum,
                    pageSize: this.page.pageSize,
                    total: data.total !== undefined ? data.total : this.page.total
                };
                this.updatePage();
                this.$emit('updateTable', { table: this.table });
            },
            async changePage(item) {
                await this.getTable(item - 1);
            },
            async changePageSize(val) {
                this.page.pageSize = val;
                await this.getTable(0);
            },
            updatePage() {
                this.$emit('updatePage', { total: this.page.total });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .div-gf-table {
        .right {
            text-align: right;
        }

        .center {
            text-align: center;
        }

        .pagination {
            margin: 20px 10px 0;
            padding: 0 5px;

            &.pagination-bottom {
                position: absolute;
                bottom: 5px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
</style>
