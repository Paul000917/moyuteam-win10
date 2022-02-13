<!--
程序栏的所有程序
-->
<template>
    <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
        <transition name="allprogram">
            <div  v-show="isShow"  class="program-panel">
                <div class="list-item" v-for="item in appList" :key="item.Inx" @click="openMenu(item.AppId)">
                    <img :src="item.ImgUrl" />
                    <span>{{item.AppName}}</span>
                    <i class="iconfont" @click.self.stop="SendToDeskTop(item.AppId,item.AppName)">&#xe89e;</i>
                </div>
            </div>
        </transition>
    </el-scrollbar>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
    data () {
        return {
            appList:[],
            isShow:false
        }
    },
    mounted(){
        EventBus.$on('show-allprogram',data=>{
            this.isShow=data;
        });
    },
    created () {
        this.appList=this.$store.state.window.allApp;;
        for(let i=0;i<this.appList.length;i++){
            this.appList[i].Inx=i+1;
        }
    },
    methods: {
        SendToDeskTop(appid,name){
            this.$mymsg({
                showClose: true,
                message: '已将【'+name+'】快捷创建到桌面',
                type: 'success'
            });
            EventBus.$emit('close-startmenu',false);
            EventBus.$emit('send-desktopicon',appid);
        },
        openMenu(appid){
            EventBus.$emit('open-window',this.$store.state.window.allApp.filter((item)=>{return item.AppId==appid})[0]);
            EventBus.$emit('close-startmenu',true);
        }
    }
}
</script>
<style scoped lang="scss">
.program-panel{
    width: 100%;
    height: 100%;
    display: block;
    .list-item{
        height: 24px;
        width: calc(100% - 20px);
        display: block;
        padding: 6px;
        line-height: 24px;
        transition: all .4s ease-in-out;
        img{
            width: 24px;
            height: 24px;
            display: inline-block;
            float: left;
            transition: all .4s ease-in-out;
        }
        span{
            width: calc(100% - 60px);
            height: 24px;
            text-align: left;
            line-height: 24px;
            display: inline-block;
            color: #FFFFFF;
            padding-left: 10px;
            font-size: 12px;
            float: left;
            transition: all .4s ease-in-out;
        }
        i{
            width: 20px;
            height: 24px;
            display: none;
            color: #FFFFFF;
            float: right;
            transition: all .4s ease-in-out;
        }
        &:hover{
            cursor: pointer;
            background-color: #3E3E3E;
            transition: all .4s ease-in-out;
            & > i{
                display: inline-block;
                transition: all .4s ease-in-out;
            }
        }
    }
}
</style>