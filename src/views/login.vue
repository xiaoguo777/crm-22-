<style lang="less">
    @import './login.less';
    .login-con .form-con .ivu-btn-primary{
        background-color: #4b1d62;
        border:none;
    }
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-logo">
            <img src="../images/logo@2x.png" alt="">
        </div>
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import {login} from '../api/api'
export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    // let config = {
                    //     header: {'content-type': 'application/json' }
                    // }
                    // let para = {
                    //     'userAccount' : this.form.userName,
                    //     'userPwd' : this.form.password
                    // }
                    // this.$axios.post('/bff/sys/user/login', para ,config)
                    //     .then((res)=>{
                    //         this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    //         if (res.data.code === 200) {                                             
                    //             Cookies.set('user', this.form.userName);
                    //             Cookies.set('password', this.form.password);
                    //             Cookies.set('access', 0);                  
                    //             this.$router.push({
                    //                 name: 'home_index'
                    //             });                  
                    //         } else {
                    //             alert("登陆失败")
                    //             Cookies.set('access', 1);
                    //         }                          
                    //     })
                    Cookies.set('user', this.form.userName);
                    Cookies.set('password', this.form.password);
                    this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    if (this.form.userName === 'iview_admin') {
                        Cookies.set('access', 0);
                    } else {
                        Cookies.set('access', 1);
                    }
                    this.$router.push({
                        name: 'home_index'
                    });
                }
            });
            }
        },
    mounted(){
    }
};
</script>

<style>

</style>
