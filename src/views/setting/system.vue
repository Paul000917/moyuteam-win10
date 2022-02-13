<template>
    <div class="system-panel">
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="bg-box-left">
                    <div class="icon">
                        <i class="iconfont">&#xe614;</i>
                    </div>
                    <div class="discripinfo">
                        <span class="setting-name">个性化</span>
                        <span class="setting-tip">背景、锁屏、颜色</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="bg-box-right">
                    <div class="icon">
                        <i class="iconfont">&#xece0;</i>
                    </div>
                    <div class="discripinfo">
                        <span class="setting-name">桌面配置</span>
                        <span class="setting-tip">右键菜单、窗体大小</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="bg-box-left">
                    <div class="icon">
                        <i class="iconfont">&#xe77e;</i>
                    </div>
                    <div class="discripinfo">
                        <span class="setting-name">登录</span>
                        <span class="setting-tip">账号、密码、权限</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="bg-box-right">
                    <div class="icon">
                        <i class="iconfont">&#xe8e1;</i>
                    </div>
                    <div class="discripinfo">
                        <span class="setting-name">特效</span>
                        <span class="setting-tip">桌面模糊</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="bg-box-left">
                    <div class="icon">
                        <i class="iconfont">&#xe7e1;</i>
                    </div>
                    <div class="discripinfo">
                        <span class="setting-name">任务栏</span>
                        <span class="setting-tip">配置、权限</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="bg-box-right">
                    <div class="icon">
                        <i class="iconfont">&#xeb07;</i>
                    </div>
                    <div class="discripinfo">
                        <span class="setting-name">认证</span>
                        <span class="setting-tip">指纹、虹膜、声音</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="bg-box-left">
                    <div class="icon">
                        <i class="iconfont">&#xe601;</i>
                    </div>
                    <div class="discripinfo">
                        <span class="setting-name">收藏</span>
                        <span class="setting-tip">任务栏、开始菜单</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="bg-box-right">
                    <div class="icon">
                        <i class="iconfont">&#xea81;</i>
                    </div>
                    <div class="discripinfo">
                        <span class="setting-name">同步</span>
                        <span class="setting-tip">配置、缓存</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    created () {

    },
    methods: {

    }
}
</script>
<style scoped lang="scss">
.system-panel{
    width: calc(100% - 100px);
    height: 100%;
    display: block;
    overflow-x: hidden;
    padding: 10px 50px;
}
.el-row {
    margin: 10px;
}
.bg-box-left {
    width: 270px;
    height: 70px;
    transition: all .4s ease-in-out;
    float: right;
    &:hover{
        cursor: pointer;
        opacity: 0.7;
    }

    .icon{
        width: 70px;
        height: 70px;
        float: left;
        text-align: center;
        i{
            width: 70px;
            height: 70px;
            line-height: 70px;
            font-size: 38px;
            font-family: 500;
            color: $themeColor;
        }
    }
    .discripinfo{
        width: 200px;
        height: 50px;
        padding: 10px 0px;
        float: right;
        .setting-name{
            display: block;
            height: 25px;
            line-height: 25px;
            text-align: left;
            font-size: 16px;
            font-weight: bold;
            color: #272727;
        }
        .setting-tip{
            display: block;
            height: 25px;
            line-height: 25px;
            text-align: left;
            font-size: 14px;
            color: #6e6e6e;
        }
    }
}
.bg-box-right {
    width: 270px;
    height: 70px;
    transition: all .4s ease-in-out;
    float: left;
    &:hover{
        cursor: pointer;
        opacity: 0.7;
    }

    .icon{
        width: 70px;
        height: 70px;
        float: left;
        text-align: center;
        i{
            width: 70px;
            height: 70px;
            line-height: 70px;
            font-size: 38px;
            font-family: 500;
            color: $themeColor;
        }
    }
    .discripinfo{
        width: 200px;
        height: 50px;
        padding: 10px 0px;
        .setting-name{
            display: block;
            height: 25px;
            line-height: 25px;
            text-align: left;
            font-size: 16px;
            font-weight: bold;
            color: #272727;
        }
        .setting-tip{
            display: block;
            height: 25px;
            line-height: 25px;
            text-align: left;
            font-size: 14px;
            color: #6e6e6e;
        }
    }
}
</style>