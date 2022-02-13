<!--
程序面板最左边菜单
-->
<template>
    <div class="menu-panel unselect">
        <div class="left-menu-panel">
            <div class="setting-panel">
                <div class="set-item" @click="MySetting()">
                    <i class="iconfont">&#xea5c;</i>
                </div>
                <div class="set-item" @click="SysSetting()">
                    <i class="iconfont">&#xece9;</i>
                </div>
                <div class="set-item" @click="QuitSys()">
                    <i class="iconfont">&#xed66;</i>
                </div>
            </div>
            <div class="program-panel">
                <programList></programList>
            </div>
        </div>
        <div class="right-menu-panel">
            <favoriteAppList></favoriteAppList>
        </div>
    </div>
</template>
<script> 
import EventBus from '@/utils/eventbus.js'
export default {
    data () {
        return {

        }
    },
    mounted(){
        if(window.global.colorConfig.startMenmPureColor)
        {
            this.$('.menu-panel').css('background',window.global.colorConfig.startMenuColor.left)
            this.$('.program-panel').css('background',window.global.colorConfig.startMenuColor.center)
            this.$('.right-menu-panel').css('background',window.global.colorConfig.startMenuColor.right)
        }else
        {
            this.$('.menu-panel').css('background-image','url('+require('@/assets/image/startbg.png')+')')
            //this.$('.menu-panel').css('background','linear-gradient(rgba(40,140,234,0.9), rgba(40,140,234, 0.9)), url('+require('@/assets/image/startbg.png')+') no-repeat 250px 40px/ 150px 150px')
            //;
        }
    },
    methods: {
      MySetting(){
        EventBus.$emit('open-startmenu',true);
        EventBus.$emit('open-window',{AppId:'wodeshez123123',AppName:'Administrator',UrlPath:'myinfo',Component:'setting/myinfo.vue'});
      },
      SysSetting(){
        EventBus.$emit('open-startmenu',true);
        EventBus.$emit('open-window',{AppId:'zmsezhi10001',AppName:'系统设置(D)',UrlPath:'desktop',Component:'setting/system.vue'});
      },
      QuitSys(){
        EventBus.$emit('change-desktop-image','login');
        this.$router.replace('/')
      }
    }
}
</script>
<style scoped lang="scss">
.menu-panel{
    width: 100%;
    height: 100%;
    display: block;
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    .left-menu-panel{
        width: 200px;
        height: 100%;
        float: left;
        .setting-panel{
            width: 36px;
            height: 108px;
            float: left;
            position:absolute;
            left: 0px;
            bottom: 5px;
            .set-item{
                width: 36px;
                height: 36px;
                display: block;
                text-align: center;
                i{
                    width: 36px;
                    height: 36px;
                    display: block;
                    text-align: center;
                    line-height: 36px;
                    font-size: 18px;
                    color: #FFFFFF;
                }
                &:hover{
                    cursor: pointer;
                    background-color: #3E3E3E;
                }
            }
        }
        .program-panel{
            width: 164px;
            height: 100%;
            float: right;
        }

    }
    .right-menu-panel{
        width: 300px;
        height: 100%;
        float: right;
    }

}
</style>