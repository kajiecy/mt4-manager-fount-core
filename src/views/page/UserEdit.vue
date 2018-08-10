<template>
    <div>
        <div style="padding: 20px;font-size: 20px;border-bottom: 1px solid #D1D1D1">
            <el-button @click="doGoBack()" type="success" size="mini">←返回</el-button>
            用户编辑
        </div>
        <div class="mt15">
            <el-form class="" ref="userEditForm" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="用户姓名">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.name"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="账号" prop="account">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.account" placeholder="请填写会员账号，必须保证唯一"></el-input>

                    </div>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.pwd" placeholder="设置会员的密码，此项不能为空"  type="password"></el-input>
                    </div>
                </el-form-item>

                <el-form-item label="用户组">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.userGroup" placeholder="请选择">
                            <el-option label="虚拟账户" value="虚拟账户"></el-option>
                            <el-option label="真实账户" value="真实账户"></el-option>
                        </el-select>
                    </div>
                </el-form-item>

                <el-form-item label="用户状态">
                    <div class="" style="width: 300px">
                        <template>
                            <el-radio v-model="form.userState" :label="0">未认证</el-radio>
                            <el-radio v-model="form.userState" :label="1">正常</el-radio>
                            <el-radio v-model="form.userState" :label="-1">禁用</el-radio>
                        </template>
                    </div>
                </el-form-item>

                <el-form-item label="手机号">
                    <div class="" style="width: 300px">
                    <el-input v-model="form.phone"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="邮箱">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.email"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="身份证号码">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.identityCard"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="账户类型">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.accountType">
                            <el-option label="标准账户入金 (美金) : 2000-49999" value="1"></el-option>
                            <el-option label="高级账户入金 (美金) : 50000-200000" value="2"></el-option>
                            <el-option label="机构账户入金 (美金) : 200000以上" value="3"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="货币类型">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.moneyType">
                            <el-option label="USD" value="USD"></el-option>
                            <el-option label="EUR" value="EUR"></el-option>
                            <el-option label="GPB" value="GPB"></el-option>
                            <el-option label="AUD" value="AUD"></el-option>
                            <el-option label="CAB" value="CAB"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="杠杆比例">
                    <div class="" style="width: 300px">
                        <template>
                            <el-select v-model="form.leverage" placeholder="请选择">
                                <el-option label="1:100" :value="100"></el-option>
                            </el-select>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="预存款">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.advanceDepost"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="居住地">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.residentialCountry" style="width: 100%">
                            <el-option label="中国" value="中国"></el-option>
                            <el-option label="美国" value="美国"></el-option>
                            <el-option label="英国" value="英国"></el-option>
                            <el-option label="意大利" value="意大利"></el-option>
                            <el-option label="法国" value="法国"></el-option>
                        </el-select>
                    </div>
                </el-form-item>


                <el-form-item label="地址">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.address"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="邮编">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.postcode"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="城市">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.city"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="出生日期">
                    <div class="" style="width: 300px">
                        <el-date-picker
                                v-model="form.birthday"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="就业状态">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.jobState" >
                            <el-option label="在职" value="在职"></el-option>
                            <el-option label="个体经营/企业持有者" value="个体经营/企业持有者"></el-option>
                            <el-option label="退休" value="退休"></el-option>
                            <el-option label="学生" value="学生"></el-option>
                            <el-option label="失业" value="失业"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="工作经验">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.jobExperience">
                            <el-option label="金融服务(eligible for professional clients)"
                                       value="金融服务(eligible for professional clients)"></el-option>
                            <el-option label="农业，食品与自然资源" value="农业，食品与自然资源"></el-option>
                            <el-option label="建筑与建造业" value="建筑与建造业"></el-option>
                            <el-option label="艺术、音频视频技术&通讯" value="艺术、音频视频技术&通讯"></el-option>
                            <el-option label="企业管理与经营" value="企业管理与经营"></el-option>
                            <el-option label="教育&培训" value="教育&培训"></el-option>
                            <el-option label="政府&公共管理" value="政府&公共管理"></el-option>
                            <el-option label="卫生保健" value="卫生保健"></el-option>
                            <el-option label="酒店&旅游" value="酒店&旅游"></el-option>
                            <el-option label="信息技术" value="信息技术"></el-option>
                            <el-option label="法律、公共，安全" value="法律、公共，安全"></el-option>
                            <el-option label="制造业" value="制造业"></el-option>
                            <el-option label="市场&销售" value="市场&销售"></el-option>
                            <el-option label="科学，技术，工程&数学" value="科学，技术，工程&数学"></el-option>
                            <el-option label="运输，配送&物流" value="运输，配送&物流"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="教育水平">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.educationLevel">
                            <el-option label="选择" value=""></el-option>
                            <el-option label="高中" value="高中"></el-option>
                            <el-option label="本科或同等水平" value="本科或同等水平"></el-option>
                            <el-option label="硕士或同等水品" value="硕士或同等水品"></el-option>
                            <el-option label="博士或同等水平" value="博士或同等水平"></el-option>
                            <el-option label="无" value="无"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="年收入">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.annualIncome" style="width: 100%">
                            <el-option label="0-50,000" value="0-50,000"></el-option>
                            <el-option label="50,000-100,000" value="50,000-100,000"></el-option>
                            <el-option label="100,000-250,000" value="100,000-250,000"></el-option>
                            <el-option label="250,000-500,000" value="250,000-500,000"></el-option>
                            <el-option label="500,000-1,000,000" value="500,000-1,000,000"></el-option>
                            <el-option label=">1,000,000" value=">1,000,000"></el-option>
                        </el-select>
                    </div>
                </el-form-item>


                <el-form-item label="总资产">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.sumMoney" style="width: 100%">
                            <el-option label="0-50,000" value="0-50,000"></el-option>
                            <el-option label="50,000-100,000" value="50,000-100,000"></el-option>
                            <el-option label="100,000-250,000" value="100,000-250,000"></el-option>
                            <el-option label="250,000-500,000" value="250,000-500,000"></el-option>
                            <el-option label="500,000-1,000,000"
                                       value="500,000-1,000,000"></el-option>
                            <el-option label=">1,000,000"
                                       value=">>1,000,000"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="资金来源">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.moneyResource" style="width: 100%">
                            <el-option label="雇佣/企业持有者" value="雇佣/企业持有者"></el-option>
                            <el-option label="储蓄/投资" value="储蓄/投资"></el-option>
                            <el-option label="礼物/继承" value="礼物/继承"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="风险意识">
                    <div class="" style="width: 300px">
                        <el-select v-model="form.riskAwareness" style="width: 100%">
                            <el-option label="我会非常难过并再也不会交易差价合约CFDs"
                                       value="我会非常难过并再也不会交易差价合约CFDs"></el-option>
                            <el-option label="在一段时间内我会很难过，可能继续也可能不再交易。"
                                       value="在一段时间内我会很难过，可能继续也可能不再交易。"></el-option>
                            <el-option label="在一段时间内我会很难过，但大多情况下，我会继续交易。"
                                       value="在一段时间内我会很难过，但大多情况下，我会继续交易。"></el-option>
                            <el-option label="这就是生活...可能贏也可能输。" value="这就是生活...可能贏也可能输。"></el-option>
                        </el-select>
                    </div>
                </el-form-item>


                <el-form-item label="注册时间">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.createTime" disabled></el-input>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('userEditForm')">保存</el-button>
                    <el-button @click="resetForm('userEditForm')">重置</el-button>
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
                    name: "",
                    account: "",
                    pwd: "",
                    phone: "",
                    email: "",
                    identityCard: "",
                    moneyType: "",
                    leverage: "",
                    advanceDepost: "",
                    residentialCountry: "",
                    address: "",
                    postcode: "",
                    city: "",
                    birthday: "",
                    jobState: "",
                    jobExperience: "",
                    educationLevel: "",
                    annualIncome: "",
                    sumMoney: "",
                    moneyResource: "",
                    riskAwareness: "",
                    userState: 0,
                    userGroup: "虚拟账户",
                    createTime: "",
                    accountType:"",
                },
                rules:{
                    account: [
                        { required: true, message: '请填写会员账户', trigger: 'blur' },
                    ],
                    pwd: [
                        { required: true, message: '请填写设置密码', trigger: 'blur' },
                    ],
                }
            }
        },
        created() {

        },
        mounted() {
            this.loadUserInfo();
        },

        watch: {},
        methods: {
            loadUserInfo(){
                if(this.userId!==undefined){
                    this.$req.post(this.$store.state.app.interfaceURL.getUserInfoById,
                        {id:this.userId.toString()}, data => {
                            console.log("this.userId from userEdit",data)
                            this.form = data.userInfo;
                        })
                }
            },
            doGoBack() {
                this.$router.go(-1);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$req.post(this.$store.state.app.interfaceURL.editUserInfo,
                            this.form, data => {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                this.$router.go(-1)
                            })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '请检查必填项!'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        computed: {
            userId() {
                return this.$route.query.userId;
            }
        },
        components: {}
    }
</script>

<style scoped>

</style>