<template>
    <div>
        <div style="padding: 20px;font-size: 20px;border-bottom: 1px solid #D1D1D1">
            <el-button @click="doGoBack()" type="success" size="mini">←返回</el-button>
            公告编辑

        </div>
        <div class="mt15">
            <el-form class="" ref="userEditForm" :model="form" :rules="rules" label-width="100px">

                <el-form-item label="新闻主题">
                    <div class="" style="width: 300px">
                        <el-input v-model="form.title"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="摘要">
                    <div class="" style="width: 300px">
                        <el-input type="textarea" v-model="form.noticeAbstract":autosize="{ minRows: 3, maxRows: 3}"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="缩略图">
                    <div class="" style="width: 300px">

                        <!--:before-upload="beforeAvatarUpload"-->
                        <el-upload
                                ref="noticeSubmit"
                                class="avatar-uploader"
                                :action="this.$store.state.app.rootURL+this.$store.state.app.interfaceURL.upNoticeInfo"
                                :data="form"
                                :show-file-list="false"
                                :on-change="handleAvatarSuccess"
                                :auto-upload="false">
                            <img v-if="form.picturePath" :src="form.picturePath" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>

                    </div>
                </el-form-item>
                <el-form-item label="内容">
                    <!-- quill-editor -->
                    <quill-editor style="width: 900px" ref="myTextEditor"
                                  v-model="form.noticeContent"
                                  :options="editorOption">
                    </quill-editor>
                </el-form-item>




                <el-form-item>
                    <el-button type="primary" @click="submitUpload()">保存</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'
    export default {
        data() {
            return {
                form: {
                    id:'',
                    noticeAbstract:'',
                    picturePath:null,
                    noticeContent:''
                },
                rules:{

                },

                dialogImageUrl: '',
                dialogVisible: false,
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['link', 'image', 'video']
                        ],
                        syntax: {
                            highlight: text => hljs.highlightAuto(text).value
                        }
                    }
                },
                //表示图片有没有被改变
                pcitureChangeFlag:0,
            }
        },
        created() {

        },
        mounted() {
            this.loadNoticeInfo();
        },

        watch: {},
        methods: {
            loadNoticeInfo(){
                if(this.noticeId!==undefined){
                    this.$req.post(this.$store.state.app.interfaceURL.getNoticeInfo,
                        {id:this.noticeId.toString()}, data => {
                            console.log("this.userId from userEdit",data)
                            data.noticeInfo.picturePath = 'data:image/jpeg;base64,'+data.noticeInfo.picturePath,
                            this.form = data.noticeInfo;
                        })
                }
            },
            doGoBack() {
                this.$router.go(-1);
            },
            handleAvatarSuccess(res) {
                this.pcitureChangeFlag = 1;
                this.form.picturePath = window.URL.createObjectURL(res.raw);
            },


            submitUpload() {
                if(this.pcitureChangeFlag===0){
                    //公告修改正常的公告修改接口
                    this.$req.post(this.$store.state.app.interfaceURL.upNoticeInfoNoFile,
                        this.form, data => {
                            console.log("this.userId from noticeEdit",data)
                        })
                }else {
                    this.$refs.noticeSubmit.submit();
                }
                this.$router.go(-1);
            },

        },
        computed: {
            noticeId() {
                return this.$route.query.id;
            }
        },
        components: {
            quillEditor,
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