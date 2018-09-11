<template>
    <div>
        <!--<div class="pt5 pb5" style="border-bottom: 1px solid #e3e3e3">用户列表</div>-->

        <div style="padding-bottom: 8px">
            <span style="display: inline-block;width: 10px;height: 24px;background-color: #409EFF;position: relative;top: 7px;margin: 0px 10px"></span>
            <span class="ft14">出金记录</span>

            <!--<span style="float: right;font-size: 14px;padding: 5px 30px;"></span>-->
            <span style="display: inline-block;padding: 2px 10px">
                <el-input
                        class="searchPrj"
                        size="small"
                        placeholder="搜索成员姓名"
                        prefix-icon="el-icon-search"
                        v-model="searchUserName"
                        clearable>
                </el-input>
            </span>

            <span style="display: inline-block;padding: 2px 10px;float: right">
                <el-button size="mini" @click="openOrderEdit()" type="primary" plain>添加账号</el-button>
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
                            prop="orderId"
                            label="订单号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            width="120"
                            label="姓名">
                    </el-table-column>

                    <el-table-column
                            prop="bankCardNo"
                            width="220"
                            label="账号">
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
                            prop="money"
                            width="160"
                            label="银行">
                        <template slot-scope="scope">
                            {{getGetBankName(scope.row.bankType)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            width="180"
                            label="邮箱">
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
                            label="提交时间"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="orderState"
                            label="订单状态"
                            width="">
                        <template slot-scope="scope">
                            <template v-if="scope.row.orderState==0">
                                交易处理中
                            </template>
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
                title="添加账号"
                :visible.sync="dialogVisible"
                width="50%"

        >
            <el-dialog
                    width="30%"
                    title="出金结果"
                    :visible.sync="innerVisible"
                    append-to-body>
                <iframe :src="'http://httpd.gjumall.com/hefu/payout/call.php?' +
                 'card_number='+form.bankCardNo
                 +'&amount='+ changeMoney(form.money)
                 +'&api_key=vNa1mgS3w6b2rfQgngNj9L2Vuj0Gofh0'
                 +'&bank='+form.bankType
                 +'&name='+form.name
                 +'&email='+form.email
                 +'&callback_url=myurl'
                 +'&remote_ip=106.48.12.76'" style="width: 100%;border: 1px;overflow: hidden"></iframe>
            </el-dialog>

            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号">
                        <el-input v-model="form.bankCardNo"></el-input>
                    </el-form-item>
                    <el-form-item label="金额">
                        <el-input v-model="form.money"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="银行">
                        <el-select v-model="form.bankType" placeholder="请选择银行" filterable clearable>
                            <!--bankType-->
                            <el-option v-for="(item,index) in bankType" :label="item.name"
                                       :value="item.bankId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input style="display: inline-block;width: 220px;margin-right: 10px"
                                  v-model="form.phone"></el-input>
                        <el-button style="" size="">获取验证码</el-button>
                    </el-form-item>
                    <el-form-item label="验证码">
                        <el-input style="display: inline-block;width: 80px" v-model="form.phoneCode"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="insertOutCheck()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

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
                dialogVisible: false,
                innerVisible:false,
                form: {
                    name: "",
                    bankCardNo: "",
                    money: "0",
                    email: "",
                    bankType: "",
                    phone: "",
                    phoneCode: "",
                },
                bankType: [
                    {bankId: "102100099996", name: "中国工商银行"},
                    {bankId: "103100000026", name: "中国农业银行"},
                    {bankId: "104100000004", name: "中国银行"},
                    {bankId: "322290000011", name: "上海农商银行"},
                    {bankId: "596110000013", name: "企业银行"},
                    {bankId: "402731057238", name: "云南省农村信用社"},
                    {bankId: "402641000014", name: "海南省农村信用社"},
                    {bankId: "402611099974", name: "广西农村信用社（合作银行）"},
                    {bankId: "402521000032", name: "湖北农信"},
                    {bankId: "402391000068", name: "福建省农村信用社"},
                    {bankId: "402301099998", name: "江苏省农村信用社联合社"},
                    {bankId: "319361000013", name: "徽商银行"},
                    {bankId: "315456000105", name: "恒丰银行"},
                    {bankId: "314653000011", name: "重庆农村商业银行"},
                    {bankId: "314305506621", name: "常熟农村商业银行"},
                    {bankId: "314305400015", name: "吴江农村商业银行"},
                    {bankId: "313882000012", name: "昆仑银行"},
                    {bankId: "313881000002", name: "乌鲁木齐市商业银行"},
                    {bankId: "313871000007", name: "宁夏银行"},
                    {bankId: "313851000018", name: "青海银行"},
                    {bankId: "313821001016", name: "兰州银行股份有限公司"},
                    {bankId: "313731010015", name: "富滇银行"},
                    {bankId: "313701098010", name: "贵阳银行"},
                    {bankId: "313659000016", name: "绵阳市商业银行"},
                    {bankId: "313658000014", name: "德阳银行"},
                    {bankId: "313656000019", name: "攀枝花市商业银行"},
                    {bankId: "313653000013", name: "重庆银行股份有限公司"},
                    {bankId: "313614000012", name: "柳州银行"},
                    {bankId: "313521000011", name: "汉口银行"},
                    {bankId: "317110010019", name: "天津农商银行"},
                    {bankId: "402521090019", name: "武汉农村商业银行"},
                    {bankId: "313493080539", name: "洛阳银行"},
                    {bankId: "313491000232", name: "郑州银行"},
                    {bankId: "105100000017", name: "中国建设银行"},
                    {bankId: "301290000007", name: "交通银行"},
                    {bankId: "302100011000", name: "中信银行"},
                    {bankId: "303100000006", name: "中国光大银行"},
                    {bankId: "304100040000", name: "华夏银行"},
                    {bankId: "305100000013", name: "中国民生银行"},
                    {bankId: "306581000003", name: "广发银行股份有限公司"},
                    {bankId: "307584007998", name: "平安银行（原深圳发展银行）"},
                    {bankId: "308584000013", name: "招商银行"},
                    {bankId: "309391000011", name: "兴业银行"},
                    {bankId: "313100000013", name: "北京银行"},
                    {bankId: "313110000017", name: "天津银行"},
                    {bankId: "313581003284", name: "广州银行"},
                    {bankId: "313585000990", name: "珠海华润银行清算中心"},
                    {bankId: "313602088017", name: "东莞银行"},
                    {bankId: "314581000011", name: "广州农村商业银行"},
                    {bankId: "314588000016", name: "顺德农村商业银行"},
                    {bankId: "313468000015", name: "德州银行"},
                    {bankId: "313458000013", name: "潍坊银行"},
                    {bankId: "313428076517", name: "赣州银行"},
                    {bankId: "313391080007", name: "福建海峡银行"},
                    {bankId: "313345400010", name: "浙江民泰商业银行"},
                    {bankId: "313495081900", name: "平顶山银行"},
                    {bankId: "318110000014", name: "渤海银行"},
                    {bankId: "402100000018", name: "北京农村商业银行"},
                    {bankId: "314305106644", name: "太仓农商行"},
                    {bankId: "402602000018", name: "东莞农村商业银行"},
                    {bankId: "403100000004", name: "中国邮政储蓄银行"},
                    {bankId: "402651020006", name: "四川省联社"},
                    {bankId: "595100000007", name: "新韩银行中国"},
                    {bankId: "597100000014", name: "韩亚银行"},
                    {bankId: "310290000013", name: "上海浦东发展银行"},
                    {bankId: "313222080002", name: "大连银行"},
                    {bankId: "313223007007", name: "鞍山市商业银行"},
                    {bankId: "313227000012", name: "锦州银行"},
                    {bankId: "313227600018", name: "葫芦岛银行"},
                    {bankId: "313331000014", name: "杭州银行"},
                    {bankId: "313332082914", name: "宁波银行"},
                    {bankId: "313333007331", name: "温州银行"},
                    {bankId: "313336071575", name: "湖州银行"},
                    {bankId: "313338707013", name: "浙江稠州商业银行"},
                    {bankId: "313345010019", name: "浙江泰隆商业银行"},
                    {bankId: "313393080005", name: "厦门银行"},
                    {bankId: "313421087506", name: "南昌银行"},
                    {bankId: "313433076801", name: "上饶银行"},
                    {bankId: "313452060150", name: "青岛银行"},
                    {bankId: "313453001017", name: "齐商银行"},
                    {bankId: "313455000018", name: "东营银行"},
                    {bankId: "313456000108", name: "烟台银行"},
                    {bankId: "313461000012", name: "济宁银行"},
                    {bankId: "313463000993", name: "泰安市商业银行"},
                    {bankId: "313463400019", name: "莱商银行"},
                    {bankId: "313465000010", name: "威海市商业银行"},
                    {bankId: "313473070018", name: "临商银行"},
                    {bankId: "313473200011", name: "日照银行"},
                    {bankId: "313551088886", name: "长沙银行"},
                    {bankId: "313611001018", name: "广西北部湾银行"},
                    {bankId: "313655091983", name: "自贡市商业银行清算中心"},
                    {bankId: "314305206650", name: "昆山农村商业银行"},
                    {bankId: "314305670002", name: "张家港农村商业银行"},
                    {bankId: "316331000018", name: "浙商银行"},
                    {bankId: "313305066661", name: "苏州银行"},
                    {bankId: "402332010004", name: "鄞州银行"},
                    {bankId: "402361018886", name: "安徽省农村信用社联合社"},
                    {bankId: "402871099996", name: "黄河农村商业银行"},
                    {bankId: "313121006888", name: "河北银行股份有限公司"},
                    {bankId: "313127000013", name: "邯郸市商业银行"},
                    {bankId: "313131000016", name: "邢台银行"},
                    {bankId: "313138000019", name: "张家口市商业银行"},
                    {bankId: "313141052422", name: "承德银行"},
                    {bankId: "313143005157", name: "沧州银行"},
                    {bankId: "313161000017", name: "晋商银行网上银行"},
                    {bankId: "313168000003", name: "晋城银行"},
                    {bankId: "313191000011", name: "内蒙古银行"},
                    {bankId: "313192000013", name: "包商银行股份有限公司"},
                    {bankId: "313205057830", name: "鄂尔多斯银行"},
                    {bankId: "313228000276", name: "营口银行"},
                    {bankId: "313229000008", name: "阜新银行结算中心"},
                    {bankId: "313241066661", name: "吉林银行"},
                    {bankId: "313261000018", name: "哈尔滨银行结算中心"},
                    {bankId: "313261099913", name: "龙江银行"},
                    {bankId: "313301008887", name: "南京银行"},
                    {bankId: "313301099999", name: "江苏银行股份有限公司"},
                    {bankId: "313337009004", name: "绍兴银行"},
                    {bankId: "313345001665", name: "台州银行"},
                    {bankId: "313591001001", name: "广东南粤银行股份有限公司"},
                    {bankId: "313791030003", name: "长安银行"},
                    {bankId: "402241000015", name: "吉林农村信用社"},
                    {bankId: "402451000010", name: "山东省农联社"},
                    {bankId: "593100000020", name: "友利银行"},
                    {bankId: "313335081005", name: "嘉兴银行清算中心"},
                    {bankId: "313146000019", name: "廊坊银行"},
                    {bankId: "402331000007", name: "浙江省农村信用社"},
                    {bankId: "313617000018", name: "桂林银行股份有限公司"},
                    {bankId: "320345790018", name: "浙江三门银座村镇银行"},
                    {bankId: "313451000019", name: "齐鲁银行"},
                    {bankId: "313586000006", name: "广东华兴银行"},
                    {bankId: "320100010011", name: "北京顺义银座村镇银行"},
                    {bankId: "320428090311", name: "江西赣州银座村镇银行"},
                    {bankId: "320584002002", name: "深圳福田银座村镇银行"},
                    {bankId: "320653000104", name: "重庆渝北银座村镇银行"},
                    {bankId: "320687000016", name: "重庆黔江银座村镇银行"},
                    {bankId: "320343800019", name: "浙江景宁银座村镇银行"},
                    {bankId: "402584009991", name: "深圳农商行"},
                    {bankId: "313397075189", name: "泉州银行"},
                    {bankId: "313312300018", name: "江苏长江商行"},
                    {bankId: "313791000015", name: "西安银行"},
                    {bankId: "313454000016", name: "枣庄银行"},
                    {bankId: "314641000014", name: "海口联合农村商业银行"},
                    {bankId: "313424076706", name: "九江银行股份有限公司"},
                    {bankId: "313651099999", name: "成都银行"},
                    {bankId: "313673093259", name: "南充市商业银行"},
                    {bankId: "314302200018", name: "江阴农商银行"},
                    {bankId: "502290000006", name: "东亚银行（中国）有限公司"},
                    {bankId: "313491099996", name: "中原银行"},
                    {bankId: "313521006000", name: "湖北银行"},
                    {bankId: "323584000888", name: "深圳前海微众银行"},
                    {bankId: "313148053964", name: "衡水银行"},
                    {bankId: "313501080608", name: "焦作市商业银行"},
                    {bankId: "325290000012", name: "上海银行"},
                    {bankId: "313332090019", name: "宁波通商银行股份有限公司"},
                    {bankId: "320455000019", name: "东营莱商村镇银行股份有限公司"},
                    {bankId: "402421099990", name: "农村信用社"},
                    {bankId: "313338009688", name: "金华银行股份有限公司"},
                    {bankId: "314651000000", name: "成都农村商业银行股份有限公司"},
                ],
            }
        },
        created() {

        },
        mounted() {
            this.loadPageInfo();
        },

        watch: {
            dialogVisible(newVal) {
                if(newVal===false){
                    this.form.name = "";
                    this.form.bankCardNo = "";
                    this.form.money = "0";
                    this.form.email = "";
                    this.form.bankType = "";
                    this.form.phone = "";
                    this.form.phoneCode = "";
                }
            },
            innerVisible(newVal){
                if(newVal===false){
                    this.dialogVisible = false;
                }
            }
        },
        methods: {
            loadPageInfo() {
                this.$req.postPage(this.$store.state.app.interfaceURL.getOutCheckList,
                    {
                        likeName: this.searchUserName,
                    },
                    this.pageInfo
                    , (data, page) => {
                        console.log("for:outRecord.vue--> page is ---->", page)
                        console.log("for:outRecord.vue--> data is ---->", data)
//                      alert(JSON.stringify(page));
                        this.tableData = data.outCheckList;
                        this.pageInfo.currentPage = parseInt(page.currentPage)
                        this.pageInfo.pageSize = parseInt(page.pageSize)
                        this.pageInfo.totalCount = parseInt(page.totalCount);
                    })
            },
            openOrderEdit() {
                this.dialogVisible = true;
            },
            changeIndex: function (currentPage) {
                this.pageInfo.currentPage = currentPage;
//                this.loadTable();
            },
            changeSize: function (pageSize) {
                this.pageInfo.pageSize = pageSize;
//                this.loadTable();
            },
            insertOutCheck() {
                this.$req.post(this.$store.state.app.interfaceURL.insertOutCheck,
                    this.form, data => {
                        this.$message({
                            type: 'success',
                            message: '新增成功!'
                        });
                        this.innerVisible = true;
                        this.loadPageInfo();
                    })

//                this.dialogVisible = false;
            },
            getGetBankName(pBankId) {
                let bankName = "";
                this.bankType.some(({bankId, name}) => {
                    if (pBankId === bankId) {
                        bankName = name;
                        return true;
                    }
                })
                return bankName;
            },
            changeMoney(money){
                return parseInt(money)*100;
            }
        },
        computed: {},
        components: {
            ElButton,
            ElInput
        }
    }
</script>

<style scoped>

</style>