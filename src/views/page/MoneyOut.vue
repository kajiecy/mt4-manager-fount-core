<template>
    <div>
        <!--<div class="pt5 pb5" style="border-bottom: 1px solid #e3e3e3">用户列表</div>-->

        <div style="padding-bottom: 8px">
            <span style="display: inline-block;width: 10px;height: 24px;background-color: #409EFF;position: relative;top: 7px;margin: 0px 10px"></span>
            <span class="ft14">用户申请记录</span>

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
                            prop="orderNo"
                            label="订单号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            width="120"
                            label="金额">
                        <template slot-scope="scope">
                            ￥{{scope.row.money}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            width="120"
                            label="真实姓名">
                    </el-table-column>
                    <el-table-column
                            prop="mt4Account"
                            width="160"
                            label="MT4账号">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            width="150"
                            label="手机">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="email"-->
                    <!--width="150"-->
                    <!--label="邮箱">-->
                    <!--</el-table-column>-->

                    <!--<el-table-column-->
                    <!--prop=""-->
                    <!--label="交易银行">-->
                    <!--<template slot-scope="scope">-->

                    <!--开户行：{{scope.row.bankName}}-->
                    <!--<br>-->
                    <!--开所在地：{{scope.row.bankAddress}}-->
                    <!--<br>-->
                    <!--卡号：{{scope.row.bankCardNumber}}-->
                    <!--<br>-->
                    <!--</template>-->

                    <!--</el-table-column>-->


                    <el-table-column
                            prop="createTime"
                            label="申请时间"
                            width="">
                    </el-table-column>
                    <el-table-column
                    prop=""
                    width="70"
                    label="详情">

                    <template slot-scope="scope">
                        <el-button @click="showInfo(scope.row)" icon="el-icon-search" circle></el-button>
                        <!--<el-input v-model="scope.row.rank" @blur="rankChange(scope.row)"></el-input>-->
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

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="800px"
                >
            <div>
                <!--{{dialogInfo}}-->
                <el-form ref="form" :model="dialogInfo" label-width="150px">
                    <el-form-item label="订单号">
                        {{dialogInfo.orderNo}}
                    </el-form-item>
                    <el-form-item label="出金金额">
                        {{dialogInfo.money}}
                    </el-form-item>
                    <el-form-item label="用户名">
                        {{dialogInfo.userName}}
                    </el-form-item>
                    <el-form-item label="MT4账号">
                        {{dialogInfo.mt4Account}}
                    </el-form-item>
                    <el-form-item label="手机号">
                        {{dialogInfo.phone}}
                    </el-form-item>
                    <el-form-item label="开户行名称">
                        {{dialogInfo.bankName}}
                    </el-form-item>
                    <el-form-item label="开户行所在地">
                        {{dialogInfo.bankAddress}}
                    </el-form-item>
                    <el-form-item label="银行账号">
                        {{dialogInfo.bankCardNumber}}
                    </el-form-item>
                    <el-form-item label="注册时间">
                        {{dialogInfo.createTime}}
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>


    import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";

    export default {
        data() {
            return {
                searchUserName: '',
                pageInfo: {
                    currentPage: 1,
                    pageSize: 15,
                    totalCount: 0,
                },
                tableData: [],
                dialogVisible:false,
                dialogInfo:{
                    id:'',
                    orderNo:'',
                    money:'',
                    userName:'',
                    mt4Account:'',
                    phone:'',
                    bankName:'',
                    bankAddress:'',
                    bankCardNumber:'',
                    createTime:''
                }
            }
        },
        created() {

        },
        mounted() {
            this.loadTable();
        },

        watch: {
            searchUserName() {
                this.loadTable();
            }
        },
        methods: {
            loadTable: function () {
                this.$req.postPage(this.$store.state.app.interfaceURL.getMoneyOutList,
                    {
                        likeName: this.searchUserName,
                    },
                    this.pageInfo
                    , (data, page) => {
                        console.log("for:index.html--> page is ---->", page)
                        console.log("for:index.html--> data is ---->", data)
                        //alert(JSON.stringify(page));
                        this.tableData = data.moneyOutList;
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
            editUser(userId) {
                this.$router.push({name: 'user-edit', query: {userId: userId}})
            },
            deleteUser(userId) {
                this.$confirm('确认删除此用户吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$req.post(this.$store.state.app.interfaceURL.deleteUserById,
                        {
                            id: userId
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
            addUser() {
                this.$router.push({name: 'user-edit'})
            },
            rankChange(rowInfo) {
//                console.log(rowInfo);
                this.$req.post(this.$store.state.app.interfaceURL.updateMoneyOutRank,
                    {
                        id: rowInfo.id + "",
                        rank: rowInfo.rank + "",
                    }, data => {
                        this.loadTable();
                    })
            },
            showInfo(rowInfo){
                this.dialogInfo = rowInfo;
                this.dialogVisible = true;
            }
        },
        computed: {},
        components: {
            ElFormItem,
            ElInput},
        // 路由离开时释放循环任务
        beforeRouteLeave(to, from, next) {
            next();
        }
    }
</script>
<style scoped>
    .iconfont {
        cursor: pointer;
    }

    .icon-dengdai2 {
        color: #999999;
    }

    .icon-jinyong {
        color: #FF7262;
    }

    .icon-tongguo {
        color: #0ACF83;
    }

    .icon-bianji {
        color: #409EFF;
    }

    .icon-shanchu1 {
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

    .el-button--mini .is-circle {
        padding: 5px 2px;
        margin: 0 5px;
    }


</style>