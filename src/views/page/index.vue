<template>
    <div>
        <!--<div class="pt5 pb5" style="border-bottom: 1px solid #e3e3e3">用户列表</div>-->

        <div style="padding-bottom: 8px">
            <span style="display: inline-block;width: 10px;height: 24px;background-color: #409EFF;position: relative;top: 7px;margin: 0px 10px"></span>
            <span class="ft14">组织成员列表</span>
            <span>
                <el-button type="primary" @click="addUser()" icon="el-icon-plus" circle size="mini"></el-button>
            </span>
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
                            prop="userState"
                            label=""
                            width="43">
                        <template slot-scope="scope">
                            <i  @click="editUser(scope.row.id)" class="iconfont" :class='scope.row.userState==0?"icon-dengdai2":scope.row.userState==-1?"icon-jinyong":"icon-tongguo"'></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="account"
                            label="账号"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="userGroup"
                            width="80"
                            label="会员组">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            width="100"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="邮箱">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="注册时间">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            width="80"
                            label="操作">

                        <template slot-scope="scope">
                            <i @click="editUser(scope.row.id)" class="iconfont icon-bianji"></i>
                            <i @click="deleteUser(scope.row.id)" class="iconfont icon-shanchu1"></i>
                        </template>

                    </el-table-column>
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
                this.$req.postPage(this.$store.state.app.interfaceURL.getUserList,
                    {
                        likeName:this.searchUserName,
                    },
                    this.pageInfo
                    , (data,page) => {
                        console.log("for:index.html--> page is ---->",page)
                        console.log("for:index.html--> data is ---->",data)
//                      alert(JSON.stringify(page));
                        this.tableData = data.userList;
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
            }
        },
        computed: {},
        components: {},
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