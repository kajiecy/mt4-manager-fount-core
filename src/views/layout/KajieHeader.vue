<template>
    <el-header height="64px">
        <div class="dis_table wd100 div_header_sum"  style="">
            <div class="dis_table_cell" style="width: 64px;text-align: center">
                <div style="display: inline-block;width: 24px;height: 24px">
                    <i class="iconfont icon-webicon03 menu_ctrl_icon " :class="$store.state.app.isCollapse==true?'rote90':''" style="font-size: 24px;position: relative;top: -5px" @click="menuChange()"></i>
                </div>
            </div>
            <div class="dis_table_cell textleft " style="padding-left: 20px">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <template v-for="(item,index) in $store.state.app.breadcrumbArr">
                        <el-breadcrumb-item :to="item.name==null?null:{ name: item.name,query:item.query}" :key="index">{{item.title}}</el-breadcrumb-item>
                    </template>
                </el-breadcrumb>
            </div>
            <div class="dis_table_cell textright">
                <div class="dis_table wd100 ">
                    <div class="dis_table_cell textright">
                        <!--导航图标-->

                    </div>
                    <div class="dis_table_cell textright" style="width: 80px">
                        <!--下拉菜单 start-->
                        <el-dropdown size="small" @command="handleCommand">
                          <span class="el-dropdown-link color-default">
                            {{$store.state.user.userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="1">个人中心</el-dropdown-item>
                                <el-dropdown-item command="2" divided>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!--下拉菜单 end-->
                    </div>
                    <div class="dis_table_cell" style="width: 80px">
                        <!--头像图片-->
                        <!--<img src="http://qiniu.kajie88.com/28913648.jpg" class="head_img">-->
                        <i class="iconfont icon-yonghu" style="font-size: 40px"></i>
                    </div>
                </div>


            </div>
        </div>
    </el-header>
</template>

<script>
    export default {
        data() {
            return {}
        },
        created() {

        },
        mounted() {
            //获取本地token请求用户信息
            this.getUserLoginInfo();
        },
        watch: {},
        methods: {
            handleCommand(command) {
                if(command==='2'){
                    localStorage.removeItem("token");
                    this.$router.push({name: 'login'});
                }
            },
            //控制菜单的 展开与收起
            menuChange(){
                this.$store.commit("changeCollapse");
            },
            getUserLoginInfo(){
                let token = localStorage.getItem('token');
                if(token == null){
                    this.$router.push({name:"login"})
                }
                this.$req.post(this.$store.state.app.interfaceURL.getLoginInfo,
                    null, data => {
                        console.log("getLoginInfo from heard",data.adminInfo)
                        this.$store.commit('upUserInfo', data.adminInfo);

                    })


            }
        },
        computed: {},
        components: {}
    }
</script>

<style scoped>
    .el-header {
        background-color: #ffffff;
        padding: 0;
        /*background-color: #EC3329;*/
    }
    .div_header_sum{
        height: 60px;
        background-color: white;
        box-shadow:0px 1px 5px rgba(31, 16, 16, 0.2)

    }
    .head_img {
        width: 40px;
        height: 40px;
        border-radius: 30px;
        box-shadow: 0 0 6px rgba(31, 16, 16, 0.5), 0 0 12px rgba(31, 16, 16, 0.2) inset;

    }
    .el-dropdown-link{
        font-size: 14px;
        cursor: pointer;
    }
    .iconfont{
        font-size: 26px;
        color: #495060;
        display: inline-block;
        margin: 0 5px;
        cursor: pointer;

    }
    .menu_ctrl_icon{
        transition:all 0.5s;
    }
    .rote90{
        transform:rotate(-90deg);
    }
</style>