<template>
    <div>
        <!--<div class="pt5 pb5" style="border-bottom: 1px solid #e3e3e3">用户列表</div>-->

        <div style="padding-bottom: 8px">
            <span style="display: inline-block;width: 10px;height: 24px;background-color: #409EFF;position: relative;top: 7px;margin: 0px 10px"></span>
            <span class="ft14">入金管理</span>

            <!--<span style="float: right;font-size: 14px;padding: 5px 30px;"></span>-->
            <span style="display: inline-block;float: right;padding: 2px 10px">
                    <el-input
                            class="searchPrj"
                            size="small"
                            placeholder="搜索成员姓名"
                            prefix-icon="el-icon-search"
                            v-model="searchUserName"
                            clearable>
                    </el-input>
                </span>

        </div>
        <div style="border-top: 1px solid #DFDFDF;margin: 5px 10px 0 10px"></div>
        <div style="padding: 10px">

            <!--<div style="width: 100%;text-align: center;color: #777777;font-size: 16px;padding: 20px">-->
            <!--暂无数据-->
            <!--</div>-->

            <template>
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%"
                        row-class-name="user-list">
                    <el-table-column
                            prop="id"
                            label="id"
                            width="40">
                    </el-table-column>

                    <el-table-column
                            prop="orderNum"
                            label="编号"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="assessName"
                            width="80"
                            label="通道名">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            width="100"
                            label="真实姓名">
                    </el-table-column>
                    <el-table-column
                            prop="userAccount"
                            label="MT4账号">
                    </el-table-column>

                    <el-table-column
                            prop="money"
                            label="金额">
                        <template slot-scope="scope">
                            ￥{{scope.row.money}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="createTime"
                            label="注册时间"
                            width="180">
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--prop=""-->
                            <!--width="70"-->
                            <!--label="排序">-->

                        <!--<template slot-scope="scope">-->
                            <!--<el-input v-model="scope.row.rank" @blur="rankChange(scope.row)"></el-input>-->
                        <!--</template>-->

                    <!--</el-table-column>-->
                </el-table>
            </template>


            <div style="text-align: right;padding: 5px 0 2px 0">
                <el-pagination
                        @size-change="changeSize"
                        @current-change="changeIndex"
                        :current-page="pageInfo.currentPage"
                        :page-sizes="[15, 25, 50, 100,200]"
                        :page-size="pageInfo.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageInfo.totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>


    import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";

    export default {
        data() {
            return {
                searchUserName: '',
                pageInfo: {
                    currentPage: 1,
                    pageSize: 15,
                    totalCount: 0,
                },
                tableData: []
            }
        },
        created() {

        },
        mounted() {
            this.loadTable();
        },

        watch: {
            searchUserName(){
                this.loadTable();
            }
        },
        methods: {
            loadTable: function (){
                this.$req.postPage(this.$store.state.app.interfaceURL.getMoneyInList,
                    {
                        likeName:this.searchUserName,
                    },
                    this.pageInfo
                    , (data,page) => {
                        console.log("for:index.html--> page is ---->",page)
                        console.log("for:index.html--> data is ---->",data)
                        //alert(JSON.stringify(page));
                        this.tableData = data.moneyInList;
                        this.pageInfo.currentPage = parseInt(page.currentPage)
                        this.pageInfo.pageSize = parseInt(page.pageSize)
                        this.pageInfo.totalCount = parseInt(page.totalCount);
                    })
            },
            changeIndex: function (currentPage) {
                this.pageInfo.currentPage = currentPage;
                this.loadTable();
            },
            changeSize: function (pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.loadTable();
            },
            editUser(userId){
                this.$router.push({name:'user-edit',query:{userId:userId}})
            },
            deleteUser(userId){
                this.$confirm('确认删除此用户吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$req.post(this.$store.state.app.interfaceURL.deleteUserById,
                        {
                            id:userId
                        }, data => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.loadTable();
                        })

                }).catch(() => {
                });
            },
            addUser(){
                this.$router.push({name:'user-edit'})
            },
            rankChange(rowInfo){
//                console.log(rowInfo);
                this.$req.post(this.$store.state.app.interfaceURL.updateMoneyInRank,
                    {
                        id:rowInfo.id+"",
                        rank:rowInfo.rank+"",
                    }, data => {
                        this.loadTable();
                    })
            }
        },
        computed: {},
        components: {ElInput},
        // 路由离开时释放循环任务
        beforeRouteLeave(to, from, next) {
            next();
        }
    }
</script>
<style scoped>
    .iconfont{
        cursor: pointer;
    }
    .icon-dengdai2{
        color: #999999;
    }
    .icon-jinyong{
        color: #FF7262;
    }
    .icon-tongguo{
        color: #0ACF83;
    }
    .icon-bianji{
        color: #409EFF;
    }
    .icon-shanchu1{
        color: #FF7262;
    }
</style>
<style>
    .user-list td {
        padding: 4px 0;
    }

    .user-list td div {
        font-size: 12px;
    }
    .el-button--mini.is-circle{
        padding: 5px 2px;
        margin:0 5px;
    }
</style>