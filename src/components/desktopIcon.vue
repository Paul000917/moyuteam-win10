<!--
桌面图标
-->
<template>
    <transition name="appicon-show">
        <div :appid="AppId" class="AppIcon unselect" v-show="isShow" :style="{left:`${LayerX}px`,top:`${LayerY}px`}">
            <template v-if="IsImg">
                <div class="app-img" 
                    @mousedown="MD($event)" 
                    @mouseup="MU($event)" 
                    @click="openWin()"
                    @contextmenu.prevent.stop="CancleShortCut($event)">
                    <div v-if="(AppId=='recycleBin100')" class="recyclebin recyclebin-empty" :style="{backgroundImage:`url(${ImgUrl})`}"></div>
                    <img v-else :src="ImgUrl"  width="40" height="40"/>
                </div>
                <div class="app-name">{{AppName}}</div>
            </template>
            <template v-else>
                <div class="app-icon" 
                    :style="{background:`${AppColor}`}" 
                    @mousedown="MD($event)" 
                    @mouseup="MU($event)" 
                    @click="openWin()"
                    @contextmenu.prevent.stop="CancleShortCut($event)">
                    <i class="iconfont">&#xe614;</i>
                </div>
                <div class="app-name">{{AppName}}</div>
            </template>
            
        </div>
    </transition>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
    props: {
        AppId:{
            type: String,
            default: "0"
        },
        Inx:{
            type: Number,
            default: 0
        },
        LayerX: {
            type: Number,
            default: 0
        },
        LayerY: {
            type: Number,
            default: 0
        },
        AppIcon: {
            type: String,
            default: '未命名'
        },
        AppColor: {
            type: String,
            default: '#888888'
        },
        AppName: {
            type: String,
            default: '未命名'
        },
        IsImg: {
            type: Boolean,
            default: false
        },
        ImgUrl: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            isShow:false,
            isClick:false,
            md_X:0,
            md_Y:0
        }
    },
    mounted(){
        var that=this;
        setTimeout(function(){
            that.isShow=true;
        },this.Inx*50)
        if(this.AppId=='recycleBin100')
        {
            EventBus.$on('play-recyclebinani',data=>{
                if(this.$('.recyclebin').hasClass('recyclebin-full'))
                {
                    this.$('.recyclebin').addClass('recyclebin-ani');
                }
            });
            EventBus.$on('empty-recyclebin',data=>{
                if(this.$('.recyclebin').hasClass('recyclebin-full'))
                {
                    this.$('.recyclebin').removeClass('recyclebin-full');
                }
                this.$('.recyclebin').addClass('recyclebin-empty');
            });
            EventBus.$on('full-recyclebin',data=>{
                if(this.$('.recyclebin').hasClass('recyclebin-empty'))
                {
                    this.$('.recyclebin').removeClass('recyclebin-empty');
                }
                if(this.$('.recyclebin').hasClass('recyclebin-ani'))
                {
                    this.$('.recyclebin').removeClass('recyclebin-ani');
                }
                this.$('.recyclebin').addClass('recyclebin-full');
            });
        }
    },
    methods:{
        openWin(){
            if(this.AppId!=window.global.recycleBinId)
            {
                if(this.isClick)
                {
                    this.$emit('openWin');
                    this.isClick=false;
                }
            }
        },
        MD(e){
            this.md_X=e.screenX;
            this.md_Y=e.screenY;
        },
        MU(e){//拖动不触发点击事件
            if(e.screenX==this.md_X && e.screenY==this.md_Y)
            {
                this.isClick=true;
            }
        },
        CancleShortCut(e){
            if(this.AppId==window.global.recycleBinId)
            {
                EventBus.$emit('open-contextclearrecyclebin',{"X":e.pageX,"Y":e.pageY});
            }else
            {
                EventBus.$emit('close-contextclearrecyclebin',false);
            }
        }

    }
}
</script>
<style scoped lang="scss">
 .AppIcon{
    display: inline-block;
    width: 40px;
    
    padding: 5px;
    // border-radius: 5px;
    position:absolute;
    .app-icon{
        display: block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #FF0000;
        color: #FFFFFF;
        border-radius: 8px;
        i{
            font-size: 30px;
            text-shadow:#666 1px 2px 2px;
        }
    }
    .app-img{
        display: block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #FFFFFF;
        border-radius: 8px;
        img{
            object-fit: fill;
        }
    }
    .app-name{
        display: block;
        width: 40px;
        
        text-align: center;
        font-size: 10px;
        line-height: 20px;
        font-weight: 500;
        color: #FFFFFF;
        text-shadow:#666 1px 2px 2px;
        
    }
    &:hover{
        cursor: pointer;
        background: rgba($color: #FFFFFF, $alpha: 0.4);
        
    }
    .recyclebin{
        background-repeat: no-repeat;
        background-size: cover;
        width: 40px;
        height: 40px;
    }    
    .recyclebin-empty{
        background-position:0px 0px;
    }  
    .recyclebin-full{
        background-position:-160px 0px;
    }
    .recyclebin-ani{
        animation:recyclebin 1s steps(1, start) 1;
        -webkit-animation:recyclebin 1s steps(1, start) 1;
        animation-fill-mode: forwards;
    }
 }
</style>