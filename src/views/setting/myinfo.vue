<!--
1
-->
<template>
    <div class="content-panel-20 desktop-setting">
        <el-row :gutter="10">
            <el-col :span="6">
                <div class="grid-content">
                    <el-row>
                        <el-col :span="24">
                            <div class="setting-item">
                                <span>账户信息</span>
                                <i class="iconfont">&#xe8fc;</i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="setting-item">
                                <span>电子邮件和账户</span>
                                <i class="iconfont">&#xe8fc;</i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="setting-item">
                                <span>登录选项</span>
                                <i class="iconfont">&#xe8fc;</i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="setting-item">
                                <span>连接工作或学校账户</span>
                                <i class="iconfont">&#xe8fc;</i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="setting-item">
                                <span>其他用户</span>
                                <i class="iconfont">&#xe8fc;</i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="setting-item">
                                <span>同步你的设置</span>
                                <i class="iconfont">&#xe8fc;</i>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="账户名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select v-model="form.region" placeholder="请选择性别">
                            <el-option label="男" value="shanghai"></el-option>
                            <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出生日期">
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                            </el-col>
                        </el-form-item>
                        <!-- <el-form-item label="是否就业">
                            <el-switch v-model="form.delivery"></el-switch>
                        </el-form-item> -->
                        <el-form-item label="身份">
                            <el-checkbox-group v-model="form.type">
                            <el-checkbox label="学生" name="type"></el-checkbox>
                            <el-checkbox label="教师" name="type"></el-checkbox>
                            <el-checkbox label="程序员" name="type"></el-checkbox>
                            <el-checkbox label="企业人员" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <!-- <el-form-item label=" ">
                            <el-radio-group v-model="form.resource">
                            <el-radio label=" "></el-radio>
                            <el-radio label=" "></el-radio>
                            </el-radio-group>
                        </el-form-item> -->
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                        </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style scoped lang="scss">
.desktop-setting{
    .grid-content{
        width: 100%;
        height: 100%;
    }
    .setting-item{
        width: 36px;
        width: 100%;
        display: block;
        span{
            width: calc(100% - 36px);
            height: 36px;
            font-size: 16px;
            font-weight: 500;
            color: #444444;
            line-height: 36px;
            float: left;
        }
        i{
            width: 36px;
            height: 36px;
            font-size: 16px;
            font-weight: 500;
            color: #444444;
            line-height: 36px;
            float: right;
        }
        &:hover{
            cursor: pointer;
            background-color:rgba($color: #000000, $alpha: 0.2)
        }
    }
}
</style>