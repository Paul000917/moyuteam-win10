<!--
任务栏向上箭头的更多功能
-->
<template>
    <div class="mf-panel">
        <el-row :gutter="10">
            <el-col :span="8">
                <div class="bg-box" @click="openMenu">
                    <i class="iconfont">&#xe788;</i>
                    <span>106</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="bg-box" @click="openMenu">
                    <i class="iconfont">&#xebe5;</i>
                    <span>24</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="bg-box" @click="openMenu">
                    <i class="iconfont">&#xeae6;</i>
                    <span>0</span>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8">
                <div class="bg-box" @click="openMenu">
                    <i class="iconfont">&#xe7c3;</i>
                    <span>90</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="bg-box" @click="openMenu">
                    <i class="iconfont">&#xeaed;</i>
                    <span>19</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="bg-box" @click="openMenu">
                    <i class="iconfont">&#xe8f1;</i>
                    <span>57</span>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8">
                <div class="bg-box" @click="openMenu">
                    <i class="iconfont">&#xebf3;</i>
                    <span>7891</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="bg-box" @click="openMenu">
                    <i class="iconfont">&#xe7d2;</i>
                    <span>1061</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="bg-box" @click="openMenu">
                    <i class="iconfont">&#xe616;</i>
                    <span>9</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
    data () {
        return {
            appList:[
                {
                    id:1,
                    name:'拍照',
                    icon:require('@/assets/image/app/camerm.png')
                }
            ]
        }
    },
    created () {

    },
    methods: {
        openMenu(){
            this.$notify({title: '标题名称',message: '打开一个新窗口'});
            EventBus.$emit('close-morefunc',false);
        }
    }
}
</script>
<style scoped lang="scss">
.mf-panel{
    width: 100%;
    height:140px;
    display: block;
    margin: 0px;
    &:first-child{
        margin-top: 5px;
    }
}
.el-row {
    margin-bottom: 10px;
}
.bg-box {
    height: 38px;
    transition: all .4s ease-in-out;
    border: 1px solid rgba($color: #000000, $alpha: 0);
    line-height: 38px;
    &:hover{
        cursor: pointer;
        background-color: #1C1C1C;
        transition: all .4s ease-in-out;
        border: 1px solid #666666;
        & > i,span{
            transition: all .4s ease-in-out;
            color: $themeColor;
        }
    }
    span{
        display: inline-block;
        color: #FFFFFF;
        width: 38px;
        height: 38px;
        text-align: center;
        font-size: 13px;
        transition: all .4s ease-in-out;
    }
    i{
        display: inline-block;
        color: #FFFFFF;
        width: 38px;
        height: 38px;
        text-align: center;
        font-size: 18px;
        transition: all .4s ease-in-out;
    }

}
</style>