<template>
    <div>
        <div style="padding: 20px;font-size: 20px;border-bottom: 1px solid #D1D1D1">
            <el-button @click="doGoBack()" type="success" size="mini">←返回</el-button>
            银行编辑
        </div>
        <div class="mt15 pl20">
            <el-form class="" label-position="top" ref="channelEditForm" :model="form" :rules="rules" label-width="150px">

                <el-form-item label="银行名称">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.name"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="状态">
                    <div class="" style="width: 300px">
                        <el-radio v-model="form.status" label="1">启用</el-radio>
                        <el-radio v-model="form.status" label="0">禁用</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="支付货币类型">
                    <div class="" style="width: 300px">

                        <el-select v-model="form.payType" placeholder="请选择">
                            <el-option
                                    v-for="item in payTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                    </div>
                </el-form-item>
                <el-form-item label="支付图片一">
                    <div class="" style="width: 300px">

                        <el-upload
                                class="avatar-uploader"
                                action=""
                                ref="upload"
                                :on-change="handleAvatarSuccess1"
                                :auto-upload="false"
                                :show-file-list="false"
                        >
                            <img v-if="form.payImgFir!=''" :src="form.payImgFir" class="avatar upload_small">
                            <i v-else class="el-icon-plus avatar-uploader-icon upload_small"></i>
                        </el-upload>

                    </div>
                </el-form-item>
                <el-form-item label="支付图片二">
                    <div class="" style="width: 300px">

                        <el-upload
                                class="avatar-uploader"
                                action=""
                                ref="upload"
                                :on-change="handleAvatarSuccess2"
                                :auto-upload="false"
                                :show-file-list="false"
                        >
                            <img v-if="form.payImgSec!=''" :src="form.payImgSec" class="avatar upload_middle">
                            <i v-else class="el-icon-plus avatar-uploader-icon upload_middle"></i>
                        </el-upload>

                    </div>
                </el-form-item>
                <el-form-item label="支付图片三">
                    <div class="" style="width: 300px">
                        <el-upload
                                class="avatar-uploader"
                                action=""
                                ref="upload"
                                :on-change="handleAvatarSuccess3"
                                :auto-upload="false"
                                :show-file-list="false"
                        >
                            <img v-if="form.payImgThir!=''" :src="form.payImgThir" class="avatar upload_large">
                            <i v-else class="el-icon-plus avatar-uploader-icon upload_large"></i>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item :label="channelInfo.paytype+' 名称'">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.rpnPayName"></el-input>
                    </div>
                </el-form-item>
                <el-form-item :label="channelInfo.paytype+'  商户号'">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.rpnPayNo"></el-input>
                    </div>
                </el-form-item>
                <el-form-item :label="channelInfo.paytype+'  KEY'">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.rpnPayKey"></el-input>
                    </div>
                </el-form-item>
                <el-form-item :label="channelInfo.paytype+'  VERSION'">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.rpnPayVersion"></el-input>
                    </div>
                </el-form-item>
                <el-form-item :label="channelInfo.paytype+'  银行BRAKID'">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.rpnPayBankId"></el-input>
                    </div>
                </el-form-item>
                <el-form-item :label="channelInfo.paytype+'  银行银行链接'">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.bankUrl"></el-input>
                    </div>
                </el-form-item>
                <el-form-item :label="channelInfo.paytype+'  即时到账可选银行：'">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.rpnPayToBank" placeholder="请选择">
                            <el-option value="CMB_D" label="招商银行总行"></el-option>
                            <el-option value="ICBC_D" label="中国工商银行总行"></el-option>
                            <el-option value="CCB_D" label="中国建设银行总行"></el-option>
                            <el-option value="SPDB" label="上海浦东发展银行总行"></el-option>
                            <el-option value="ABC" label="中国农业银行总行"></el-option>
                            <el-option value="CMBC_D" label="中国民生银行总行"></el-option>
                            <el-option value="CIB_D" label="兴业银行总行"></el-option>
                            <el-option value="PAB" label="平安银行"></el-option>
                            <el-option value="COMM_D" label="交通银行总行"></el-option>
                            <el-option value="CITIC" label="中信银行总行"></el-option>
                            <el-option value="CEB_D" label="中国光大银行总行"></el-option>
                            <el-option value="GDB_D" label="广东发展银行总行"></el-option>
                            <el-option value="POSTGC" label="邮政储汇总局"></el-option>
                            <el-option value="BOB" label="北京银行"></el-option>
                            <el-option value="BOC_D" label="中国银行总行"></el-option>
                            <el-option value="BJRCB" label="北京农村信用联社"></el-option>
                            <el-option value="HXB" label="华夏银行总行"></el-option>
                        </el-select>

                    </div>
                </el-form-item>
                <el-form-item label="排序">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.rank"></el-input>
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
                    payType:'CNY',
                    payImgFir:'',
                    payImgSec:'',
                    payImgThir:'',
                    rpnPayName:'',
                    rpnPayNo:'',
                    rpnPayKey:'',
                    rpnPayVersion:'',
                    rpnPayBankid:'',
                    rpnPayToBank:'',
                    rank:'0',
                    channelId:this.$route.query.channelId,
                    bankUrl:'',
                },
                rules:{

                },
                payTypeOptions:[{
                    value: 'CNY',
                    label: '人民币（汇率：6.16989994）'
                }, {
                    value: 'USD',
                    label: '美金（汇率：1.00000000）'
                }, {
                    value: 'HKD',
                    label: '港元（汇率：7.76350021）'
                }, {
                    value: 'EUR',
                    label: '欧元（汇率：0.76639998）'
                }, {
                    value: 'GBP',
                    label: '英镑（汇率：0.64529997）'
                }],
                channelInfo:{},
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
                this.$req.post(this.$store.state.app.interfaceURL.getChannelDomain,
                    {id:this.$route.query.channelId.toString()}, data => {
                        console.log("getChannelDomain",data)
                        this.channelInfo = data.channelDomain;
                    })



                if(this.channelId!=undefined){
                    this.$req.post(this.$store.state.app.interfaceURL.getBankDomain,
                        {id:this.channelId.toString()}, data => {
                            console.log("loadChannelInfo from ChannelEdit.vue",data)
                            this.form = data.bankInfoDomain;
                        })
                }
            },
            doGoBack() {
                this.$router.go(-1);
            },
            submitUpload() {
                //公告修改正常的公告修改接口
                this.$req.post(this.$store.state.app.interfaceURL.disposeBankInfo,
                    this.form, data => {
                        console.log("this.userId from noticeEdit", data)
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$router.go(-1);
                    })
            },
            handleAvatarSuccess1(res) {
                console.log(res)
                var this_ = this;
                console.log("vueObj",this_)
//                this.stepForm4.userCardUp = window.URL.createObjectURL(res.raw);
                let reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e) {
                        console.info(this.result); //这个就是base64的数据了
//                        var sss=$("#showImage");

                        this_.form.payImgFir=this.result;
                    };
                })(res.raw);
                reader.readAsDataURL(res.raw);
            },
            handleAvatarSuccess2(res) {
                console.log(res)
                var this_ = this;
                console.log("vueObj",this_)
//                this.stepForm4.userCardUp = window.URL.createObjectURL(res.raw);
                let reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e) {
                        console.info(this.result); //这个就是base64的数据了
//                        var sss=$("#showImage");

                        this_.form.payImgSec=this.result;
                    };
                })(res.raw);
                reader.readAsDataURL(res.raw);
            },
            handleAvatarSuccess3(res) {
                console.log(res)
                var this_ = this;
                console.log("vueObj",this_)
//                this.stepForm4.userCardUp = window.URL.createObjectURL(res.raw);
                let reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e) {
                        console.info(this.result); //这个就是base64的数据了
//                        var sss=$("#showImage");
                        this_.form.payImgThir=this.result;
                    };
                })(res.raw);
                reader.readAsDataURL(res.raw);
            },
        },
        computed: {
            channelId() {
                return this.$route.query.id;
            },
            payType(){
                return this.$store.query.paytype;
            }
        },
        components: {
        }
    }
</script>
<style>
    .el-form--label-top .el-form-item__label{
        padding: 0px;
    }
</style>
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

        line-height: 90px;
        text-align: center;
    }
    .avatar {

        display: block;
    }
    .upload_small{
        width: 90px;
        height: 90px;
    }
    .upload_middle{
        line-height: 50px;
        width: 160px;
        height: 50px;
    }
    .upload_large{
        line-height: 160px;
        width: 160px;
        height: 160px;
    }
</style>