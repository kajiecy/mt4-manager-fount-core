<template>
    <div>
        <div style="padding-bottom: 8px">
            <span style="display: inline-block;width: 10px;height: 24px;background-color: #409EFF;position: relative;top: 7px;margin: 0px 10px"></span>
            <span class="ft14">通道管理</span>
            <span>
                <el-button type="primary" @click="addChannel()" icon="el-icon-plus" circle size="mini"></el-button>
            </span>

            <!--<span style="float: right;font-size: 14px;padding: 5px 30px;"></span>-->
            <span style="display: inline-block;float: right;padding: 2px 10px">
                <!--<el-input-->
                    <!--class="searchPrj"-->
                    <!--size="small"-->
                    <!--placeholder="搜索成员姓名"-->
                    <!--prefix-icon="el-icon-search"-->
                    <!--v-model="searchUserName"-->
                    <!--clearable>-->
                <!--</el-input>-->
                </span>

        </div>
        <div style="border-top: 1px solid #DFDFDF;margin: 5px 10px 0 10px">
            <div class="dis_table wd100">
                <div class="dis_table_row">
                    <div class="dis_table_cell wd35 textleft pt10 pb10">名称</div>
                    <div class="dis_table_cell textleft">操作</div>
                </div>
                <template v-for="(item,index) in channelArray" >
                    <div class="dis_table_row" style="background-color: #eeeeee">
                        <div class="dis_table_cell wd35 textleft pt5 pb5 ft14">{{item.name}}
                            <template v-if="item.status==0">
                                <i class="iconfont icon-jinyong " style="font-size: 12px;color: #666666;"></i>
                            </template>
                            <template v-if="item.status==1">
                                <i class="iconfont icon-tongguo " style="font-size: 12px;color: #67C23A;"></i>
                            </template>
                        </div>

                        <div class="dis_table_cell textleft pt5 pb5">
                            <el-button size="mini" @click="editChannel(item)">编辑</el-button>
                            <el-button size="mini"  type="danger" plain @click="delChannel(item)">删除</el-button>
                            <el-button size="mini"  type="success" plain @click="addBankInfo(item)">添加银行</el-button>
                        </div>
                    </div>
                    <template v-if="channelArray[index].bankInfoList.length>0" v-for="(cItem,cIndex) in channelArray[index].bankInfoList">
                        <div class="dis_table_row" >
                            <div class="dis_table_cell wd35 textleft pt5 pb5 ft14 pl20">{{cItem.name}}
                                <template v-if="cItem.status==0">
                                    <span class="ft12 color-desc">(停用)</span>
                                </template>
                                <template v-if="cItem.status==1">

                                </template>
                            </div>
                            <div class="dis_table_cell textleft pt5 pb5">
                                <el-button size="mini" @click="editBank(cItem)">编辑</el-button>
                                <el-button size="mini"  type="danger" plain @click="delBank(cItem)">删除</el-button>
                            </div>
                        </div>
                    </template>

                </template>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                channelArray:[]
            }
        },
        created() {

        },
        mounted() {
            this.loadChannelList();
        },

        watch: {},
        methods: {
            loadChannelList(){
                //公告修改正常的公告修改接口
                this.$req.post(this.$store.state.app.interfaceURL.getChannelList,
                    {}, data => {
                        console.log("channelList from channels.vue", data)
                        this.channelArray = data.channelList;
                    })
            },
            addChannel(){
                this.$router.push({name:'channel-edit'})
            },
            editChannel(row){
                this.$router.push({name:'channel-edit',query:{id:row.id}})
            },
            delChannel(row){
                this.$confirm('确定要删除此通道吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$req.post(this.$store.state.app.interfaceURL.delChannel,
                        {id:row.id}, data => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.loadChannelList();
                        })
                }).catch(() => {

                });
            },
            addBankInfo(row){
                this.$router.push({name:'bank-edit',query:{channelId:row.id}})
            },
            editBank(row){
                this.$router.push({name:'bank-edit',query:{id:row.id}})
            },
            delBank(row){
                this.$confirm('确定要删除此银行吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$req.post(this.$store.state.app.interfaceURL.delBankInfo,
                        {id:row.id}, data => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.loadChannelList();
                        })
                }).catch(() => {

                });
            },
        },
        computed: {},
        components: {}
    }
</script>

<style >
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