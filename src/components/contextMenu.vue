<!--
在桌面空白处右键
-->
<template>
    <div class="context-menu-panel" :style="{left:`${layerX}px`,top:`${layerY}px`}">
      <div class="context-item" :key="app.AppId" v-for="app in apps" @click="contextClick(app.AppId,app.SysWindow)">
        <i class="iconfont" :class="app.Icon"></i>
        <span>{{app.AppName}}</span>
      </div>
      <div v-if="!isFull" class="context-item" @click="FullScreen()"><i class="iconfont"></i><span>全屏桌面(F11)</span></div>
      <div v-else class="context-item" @click="FullScreen()"><i class="iconfont"></i><span>退出全屏(F11)</span></div>
    </div>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
  props: {
    layerX: {
      type: Number,
      default: 0
    },
    layerY: {
      type: Number,
      default: 0
    }
  },
  created(){
    this.apps=window.global.contextMenuConfig
  },
  inject:['reload'],
  data(){
    return {
      isFull:false,
      appAutoSort:true,
      apps:[]
    }
  },
  methods:{
    contextClick(appid,sysWindow){
      if(appid=='refresh'){
        location.reload();
      }
      if(sysWindow){
        this.$emit('hiddenContext');
      EventBus.$emit('open-window',this.apps.filter(function (item) {return item.AppId == appid})[0]);
      }

    },
    AppSortMy(){
      this.appAutoSort=false;
      this.$emit('hiddenContext');
      this.$store.commit('window/UPDATE_AUTOSORTICON', false)
    },
    AppSortAuto(){
      this.appAutoSort=true;
      this.$emit('hiddenContext');
      EventBus.$emit('reset-appposition',true);
      this.$store.commit('window/UPDATE_AUTOSORTICON', true)
    },
    FullScreen(){
      this.$emit('hiddenContext');
      var that=this;
      setTimeout(function(){
        that.isFull=!that.$tools.isFullscreen()
        EventBus.$emit('app-fullscreen',true);
      },500)
    }
  }
}
</script>
<style scoped lang="scss">
.context-menu-panel{
    width: 110px;
    height: 190px;
    display: inline-block;
    background: #FFFFFF;
    position: absolute;
    
    z-index: 9999999;
    box-shadow:$shadow-2;
    transition: all .4s ease-in-out;
}
.context-item{
    height: 28px;
    width: calc(100% - 10px);
    display: block;
    line-height: 28px;
    text-align: left;
    font-size: 13px;
    margin: 3px 5px;
    
    .iconfont{
        margin: 0px 5px;
        height: 28px;
        width: 28px;
    }
    span{
        display: inline-block;
        height: 28px;
    }
    &:hover{
      cursor: pointer;
      background: rgba($color: $themeColor, $alpha: 0.5);
      // color: $themeColor;
    }
}
</style>