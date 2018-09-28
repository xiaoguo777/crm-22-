<template>
    <el-row class="articleDetails">
        <el-col :span="4" style="opacity:0">1</el-col>
        <!-- 帖子详情区 -->
        <el-col :span="16" class="content-box">
            <i @click="goBack" class="el-icon-arrow-left"></i>
            <!-- 右边详情 -->
            <!-- 头像部分 -->
            <div class="detail-right">
                <div class="header-top">
                    <div class="header">
                        <img src="http://iph.href.lu/78x78" alt="">
                        <div class="time">
                            <h2>Tom</h2>
                            <p>2018-04-20</p>
                        </div>
                    </div>
                    <div class="header-btn">
                        <el-popover
                        placement="bottom"
                        width="200"
                        trigger="click">
                        <div class="btn-box">
                            <el-button type="warning">警告</el-button>   
                            <el-button type="danger">封号</el-button>
                            <el-button type="info">取消</el-button>
                        </div>
                        <el-button type="primary" slot="reference">处理用户</el-button>
                        </el-popover>
                        <el-button type="danger">删除</el-button>
                    </div>
                </div>
            <!-- 图文部分 -->
                <div class="text-content">
                    <p class="text-box">
                        My father is a classic Chinese father. He doesn't talk much, but I know he loves me so much. One time, I don’t feel liking eating anything because of the hot weather, my father goes out of the house and carry a lot of my favorite snacks. I feel so moved. His love is so strong, I love my father. 
                    </p>
                    <img src="http://iph.href.lu/880x400" alt="">
                </div>
            <!-- 评价点赞部分 -->
                <div class="comment-box">
                    <div>
                        <img src="../../../images/pingjia-icon.png" alt="">
                    </div>
                    <div>189</div>
                    <div>
                        <img src="../../../images/dianzan-icon.png" alt="">
                    </div>
                    <div>220</div>
                </div>
            <!-- 他人评论部分 -->
                <div class="reply-box">
                    <img src="http://iph.href.lu/48x48" alt="">
                    <div class="reply-content">
                        <div class="reply-name">
                            <span>Lily</span>
                            <span>-</span>
                            <span>2018.4.20</span>
                            <span>-</span>
                            <span>Reply</span>
                        </div>
                        <p class="reply-text">
                            Don’t take everything from our parents as a necessary. 
                        </p>
                    </div>
                </div>
            <!-- 分页器 -->
                <el-pagination
                class="footer"
                background
                layout="prev, pager, next"
                :total="1000">
                </el-pagination>
            </div>
        </el-col>
        <el-col :span="4" style="opacity:0">1</el-col>
    </el-row>
</template>

<script>
export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods:{
        goBack(){
            this.$router.push('/dynamicList')
        }
    }
}
</script>

<style lang="less">
.btn-box{
    .el-button{
        width:100%;
        display:block;
        margin-left:0;
        margin-bottom:10px;
    }
}
</style>


<style lang="less" scoped>
.articleDetails{
    .content-box{
        margin-top:28px;
        overflow: hidden;
        .el-icon-arrow-left{
            font-size:60px;
            float: left;           
            padding:10px;
            margin-right:40px;
        }
        .el-icon-arrow-left:hover{
            cursor: pointer;
        }
        .detail-right{
            float:left;
            width:80%;
            overflow: hidden;
            .header-top{
                overflow: hidden;
                .header{
                    overflow: hidden;
                    float: left;
                    img{
                        border-radius: 50%;  
                        float: left;
                    }
                    .time{
                        float: left;
                        margin-left:16px;
                        h2{
                            font-size:22px;
                            line-height: 40px;
                        }
                        p{
                            font-size:14px;
                            color:#9a9a9a;
                        }
                    }
                }
                .header-btn{
                    float:right;
                    margin-top:20px;
                }
            }
            .text-content{
                .text-box{
                    margin-top:36px;
                    font-size:16px;
                    line-height: 22px;
                    color:#333333;
                }
                img{
                    width:100%;
                    margin-top:20px;
                    border-radius: 4px;
                }
            }
            .comment-box{
                margin-top:20px;
                float: right;
                div{
                    float: left;
                    font-size:16px;
                    line-height: 22px;
                    margin-right:6px;
                }
                div:nth-child(2){
                    margin-right: 30px;
                }
            }
            .reply-box{
                clear: both;
                overflow: hidden;
                img{
                    float: left;
                    padding:14px;
                    border-radius: 50%;
                    margin-bottom: 20px;
                }
                .reply-content{
                    float: left;
                    .reply-name{
                        padding:14px 0;
                        line-height: 48px;
                        font-size:16px;
                        span:nth-child(5){
                            color:#4e4a9e;
                        }
                    }
                    .reply-text{
                        color:#111111;
                        font-size:16px;
                    }
                }
            }
            .footer{
                text-align: center;
                padding:40px 0;
            }
        }
    }
}
</style>
