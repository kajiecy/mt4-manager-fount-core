<template>
    <div>
        <div style="padding: 20px;font-size: 20px;border-bottom: 1px solid #D1D1D1">
            <el-button @click="doGoBack()" type="success" size="mini">←返回</el-button>
            通道编辑

        </div>
        <div class="mt15">
            <el-form class="" ref="channelEditForm" :model="form" :rules="rules" label-width="150px">

                <el-form-item label="通道名称">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.name"></el-input>
                    </div>
                </el-form-item>

                <el-form-item label="支付方式">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.paytype" placeholder="请选择">
                            <el-option
                                    v-for="item in payTypeRecord"
                                    :key="item.key"
                                    :label="item.desc"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>

                <el-form-item label="状态">
                    <div class="" style="width: 300px">
                        <el-radio v-model="form.status" label="1" >开启</el-radio>
                        <el-radio v-model="form.status" label="0">关闭</el-radio>
                    </div>
                </el-form-item>

                <el-form-item label="排序">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.rank"></el-input>
                    </div>
                </el-form-item>

                <el-form-item label="最低支付金额">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.payMin"></el-input>
                    </div>
                </el-form-item>

                <el-form-item label="最高支付金额">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.payMax"></el-input>
                    </div>
                </el-form-item>

                <el-form-item label="每日限制总金额">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.payLimit"></el-input>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitUpload()">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                form: {
                    id:'',
                    name:'',
                    status:'1',
                    rank:'0',
                    payMin:'',
                    payMax:'',
                    payLimit:'',
                    paytype:""
                },
                rules:{

                },
                payTypeRecord:[
                    {key:'funToPay',desc:'funToPay'},
                    {key:'aoyou',desc:'遨游支付'},
                    {key:'caiHuiTong',desc:'财汇通支付'},
                    {key:'paySec',desc:'paySec支付'},
                    {key:'fenshops4h5',desc:'fenshops H5支付'},
                    {key:'wangyou5qr',desc:'华讯支付宝扫码支付'},
                    {key:'wangyou5h5',desc:'华讯支付宝H5支付'},
                    {key:'wangyou5WeChaQr',desc:'华讯微信扫码支付'},
                    {key:'wangyou5WeChaH5',desc:'华讯微信H5支付'},
                ]
            }
        },
        created() {

        },
        mounted() {
            this.loadChannelInfo();
        },

        watch: {},
        methods: {
            loadChannelInfo(){
                if(this.channelId!==undefined){
                    this.$req.post(this.$store.state.app.interfaceURL.getChannelDomain,
                        {id:this.channelId.toString()}, data => {
                            console.log("loadChannelInfo from ChannelEdit.vue",data)
                            this.form = data.channelDomain;
                        })
                }
            },
            doGoBack() {
                this.$router.go(-1);
            },
            submitUpload() {
                //公告修改正常的公告修改接口
                this.$req.post(this.$store.state.app.interfaceURL.disposeChannel,
                    this.form, data => {
                        console.log("this.userId from noticeEdit", data)
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$router.go(-1);
                    })
            }
        },
        computed: {
            channelId() {
                return this.$route.query.id;
            }
        },
        components: {
        }
    }
</script>

<style scoped>


    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;

        font-size: 28px;
        color: #8c939d;
        width: 160px;
        height: 90px;
        line-height: 90px;
        text-align: center;
    }
    .avatar {
        width: 160px;
        height: 90px;
        display: block;
    }
</style>