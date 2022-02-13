<!--
打开的窗体页面
-->
<template>
    <transition name="fade-up">
    <div :id=WinId class="win-content"
        v-show="isVisible" 
        :style="{left:`${LayerX}px`,top:`${LayerY}px`,width:`${width}px`,height:`${height}px`,minWidth:`${minWidth}px`,minHeight:`${minHeight}px`,zIndex:`${ZIndex}`}" 
        @click="ActiveWindow"
        @contextmenu="CopyTxt()">
        <div v-if='SysWindow' class="win-title sys-style unselect">
            <div class="win-title-left"><span>{{AppName}}</span></div>
            <div class="win-title-right">
                <i class="iconfont win-min" @click.stop="MinWindow"></i>
                <i v-if="!isWindowMax" class="iconfont win-max" @click.stop="MaxWindow"></i>
                <i v-else class="iconfont win-nomal" @click.stop="MaxWindow"></i>
                <i class="iconfont win-close" @click.stop="CloseWindow"></i>
            </div>
        </div>
        <div v-else class="win-title unselect">
            <div class="win-title-left"><span>{{AppName}}</span></div>
            <div class="win-title-right">
                <i class="iconfont win-min" @click.stop="MinWindow"></i>
                <i v-if="!isWindowMax" class="iconfont win-max" @click.stop="MaxWindow"></i>
                <i v-else class="iconfont win-nomal" @click.stop="MaxWindow"></i>
                <i class="iconfont win-close" @click.stop="CloseWindow"></i>
            </div>
        </div>
        <div class="win-panel">
            <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
                <router-view :name=WinId :WinId="WinId"/> 
            </el-scrollbar>
        </div>
    </div>
    </transition>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
    data(){
        return{
            isVisible:false,
            _width:0,
            _height:0,
            minWidth:0,
            minHeight:0,
            isWindowMax:false
        }
    },
    created(){
        this.width=window.global.windowSize.width;
        this.height=window.global.windowSize.height;
        this.minWidth=window.global.windowSize.minWidth;
        this.minHeight=window.global.windowSize.minHeight;
    },
    props: {
        WinId:{
            type: String,
            default:'W0'
        },
        AppId:{
            type: String,
            default:''
        },
        WindowStatus:{
            type: String,
            default:'NOMAL'
        },
        LayerX: {
            type: Number,
            default: 50
        },
        LayerY: {
            type: Number,
            default: 50
        },
        AppName: {
            type: String,
            default: '未命名'
        },
        SysWindow: {
            type: Boolean,
            default: false
        },
        ZIndex: {
            type: Number,
            default: 20
        }
    },
    mounted(){
        var that=this;
        this.$( ".win-content" ).resizable({
            stop: function( event, ui ) {
                EventBus.$emit('change-windowsize',{height:(ui.size.height-40),AppId:that.AppId});
            }
        });
        EventBus.$on('active-window',data=>{
            this.$store.commit('window/UPDATE_CURRENTACTIVEWINID',data);
            if(this.WinId==data)
            {
                if(!this.SysWindow)
                {
                    this.$('#'+this.WinId+' .win-title').css('background-color',window.global.topWindowColor);
                    this.$('#'+this.WinId+' .win-title').css('opacity',window.global.windowHeadOpacity);
                }
                this.$('#'+this.WinId).css('z-index',1000);
            }else
            {
                if(!this.SysWindow)
                {
                    this.$('#'+this.WinId+' .win-title').css('background-color',window.global.unActiveWindowColor);
                    this.$('#'+this.WinId+' .win-title').css('opacity',window.global.windowHeadOpacity);
                }
                this.$('#'+this.WinId).css('z-index',this.ZIndex);
            }
        });
        EventBus.$on('window-nomal',data=>{
            //将收到恢复状态的，显示出来
            if(this.WinId===data){
                this.isVisible=true;
                EventBus.$emit('active-window',this.WinId);
            }
        });
        EventBus.$emit('active-window',this.WinId);
        //挂载完成后，在显示，这样才有动画
        this.isVisible=true
        if(window.global.taskNavMode=='nomal')
        {
            setTimeout(function(){
                EventBus.$emit('rander-minstate',true);
            },500);
            setTimeout(function(){
                that.getWindowImg();
            },1000);
        }
    },
    methods:{
        CopyTxt(){
            let copytxt="";
            if(window.getSelection){ 
               copytxt= window.getSelection().toString(); 
            }else if(document.getSelection){ 
               copytxt=document.getSelection().toString(); 
            }else if(document.selection){ 
               copytxt=document.selection.createRange().text; 
            } 
            if(copytxt.toString()!='')
            {
                this.$notify({
                    title: '复制信息',
                    message: copytxt.toString()
                });
            }
        },
        ActiveWindow(){
            EventBus.$emit('active-window',this.WinId);
        },
        MinWindow(){
            this.isVisible=false;
            this.$store.commit('window/UPDATE_WINSTATUS_MIN', this.WinId);
            this.getWindowImg();
            if(this.$store.state.window.winBox.length>1)
            {
                var TopWin=this.$store.state.window.winBox.filter(function (item) {return item.winStatus != 'MIN'})
                let num=TopWin.length;
                if(num>0)
                {
                    EventBus.$emit('active-window',TopWin[num-1].WinId);
                }
            }
            EventBus.$emit('rander-minstate',true);
        },
        MaxWindow(){
            let desktopHeight=this.$store.state.window.desktopHeight;
            let desktopWidth=this.$store.state.window.desktopWidth;
            if(this.isWindowMax){
                let px=desktopWidth-window.global.windowSize.width;
                let py=desktopHeight-window.global.windowSize.height;
                let layerX_temp=px>0?Math.round(Math.random()*px):0;
                let layerY_temp=py>0?Math.round(Math.random()*py):0;

                this.$("#"+this.WinId).css('left',layerX_temp+'px');
                this.$("#"+this.WinId).css('top',layerY_temp+'px');
                this.$store.commit('window/UPDATE_WINSTATUS_NOMAL', this.WinId);
                this.width=window.global.windowSize.width;
                this.height=window.global.windowSize.height;
                this.isWindowMax=false
            }else
            {
                this.$("#"+this.WinId).css('left','0px');
                this.$("#"+this.WinId).css('top','0px');
                this.width=desktopWidth;
                this.height=desktopHeight;
                this.$store.commit('window/UPDATE_WINSTATUS_MAX', this.WinId);
                this.isWindowMax=true
            }
            EventBus.$emit('change-windowsize',{height:(this.height-40),AppId:this.AppId});
        },
        CloseWindow(){

            this.$store.commit('window/REMOVE_BOX', this.WinId);
            this.isVisible=false;
            //关闭窗口时，取前一个窗口激活
            if(this.$store.state.window.winBox.length>0)
            {
                var TopWin=this.$store.state.window.winBox[this.$store.state.window.winBox.length-1];
                EventBus.$emit('active-window',TopWin.WinId);
                this.$store.commit('window/UPDATE_CURRENTPATH', TopWin.UrlPath);
                this.$router.push('/home/'+TopWin.UrlPath)
            }else
            {
                this.$router.push('/home')
            }
            EventBus.$emit('rander-minstate',true);
        },
        getWindowImg(){
            this.$h2c(document.querySelector("#"+this.WinId)).then(canvas => {
                let dataURL = canvas.toDataURL("image/png");
                this.$store.commit('window/UPDATE_DATAURL', {WinId:this.WinId,dataurl:dataURL});
            });
        }
    }

}
</script>
<style scoped lang="scss">
 .win-content{
     position:absolute;
     left: 0;
     top: 0;
     display: inline-block;
     border-radius: 5px;
     overflow:hidden;
     box-shadow: $shadow-3;
     background: #474747;
    .win-title{
        display: block;
        width: 100%;
        height: 36px;
        background: #474747;
        line-height: 36px;
        border-radius: 5px 5px 0px 0px;
        .win-title-left{
            background: #474747;
            display: inline-block;
            width: calc(100% - 80px);
            height: 36px;
            span{
                float: left;
                padding-left: 10px;
                font-size: 16px;
                font-weight: 500;
                color: #FFFFFF;
            }
        }
        .win-title-right{
            background: #474747;
            display: inline-block;
            width: 80px;
            height: 24px;
            padding: 6px 0px;
            text-align: center;
            i{
                height: 24px;
                width: 24px;
                line-height: 24px;
                text-align: center;
                font-size: 13px;
                font-weight: 500;
                color: #FFFFFF;
                border-radius: 14px;
                float: left;
                transition: all .4s ease-in-out;
                &:hover{
                    cursor: pointer;
                }
            }
            .win-min::after{
                content:'\e8ba';
            }
            .win-max::after{
                content: '\e903';
            }
            .win-nomal::after{
                content: '\e6e6';
            }
            .win-close::after{
                content: '\eaee';
            }
            .win-min:hover{
                transition: all .4s ease-in-out;
                background: rgba($color: #bbaa15, $alpha: 0.8);
                color: #FFFFFF;
            }
            .win-max:hover{
                transition: all .4s ease-in-out;
                background: rgba($color: #129e64, $alpha: 0.8);
                color: #FFFFFF;
            }
            .win-nomal:hover{
                transition: all .4s ease-in-out;
                background: rgba($color: #129e64, $alpha: 0.8);
                color: #FFFFFF;
            }
            .win-close:hover{
                transition: all .4s ease-in-out;
                background: rgba($color: #b11313, $alpha: 0.8);
                color: #FFFFFF;
            }
        }
        &:hover{
            cursor: move;
        }
    }
    .win-panel{
        width: 100%;
        height: calc(100% - 36px);
        background: #FFFFFF;
        border-radius: 0px 0px 5px 5px;
        .iframeContent{
            width: 100%;
            height: 100%;
        }
    }
    .sys-style{
        background:#FFFFFF;
        .win-title-left{
            background:#FFFFFF;
            span{
                color: #222222;
            }
        }
        .win-title-right{
            background:#FFFFFF;

            .win-min{
                background: rgba($color: #FFFFFF, $alpha: 0.8);
                color: #444444;
            }
            .win-max{
                background: rgba($color: #FFFFFF, $alpha: 0.8);
                color: #444444;
            }
            .win-nomal{
                background: rgba($color: #FFFFFF, $alpha: 0.8);
                color: #444444;
            }
            .win-close{
                background: rgba($color: #FFFFFF, $alpha: 0.8);
                color: #444444;
            }
        }
    }
 }
</style>