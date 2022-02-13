<template>
  <div id="app" :style="{backgroundImage:`url(${bgimg})`}">
    <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
      <transition name="fade-up">
        <router-view class="routeview" />
      </transition>
    </el-scrollbar>
  </div>
</template>

<script>
import EventBus from '@/utils/eventbus.js'
export default {
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
            return {
                reload: this.reload                                              
            }
        },
  data () {
      return {
         isRouterAlive: true ,                   //控制视图是否显示的变量
        bgimg: require('@/assets/image/login.jpeg')
      }
  },
  mounted(){
     EventBus.$on('change-desktop-image',data=>{
        this.bgimg=require('@/assets/image/'+data+'.jpeg')
     });
     EventBus.$on('app-fullscreen',data=>{
        this.$tools.fullScreenById();
     });
    var that=this;
    this.desktopSize();
    window.onresize = () => that.desktopSize();
  },
  methods:{
    reload () {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                }) 
            },

    desktopSize(){
      let w=this.$(window).width();
      let h=this.$(window).height()-36;
      this.$store.commit('window/UPDATE_DESKTOP_SIZE', {width:w,height:h})
      EventBus.$emit('reset-appposition',true);
    }
  }
}
</script>
<style scoped lang="scss">
#app{
  background-repeat:no-repeat;
  background-size:100% 100%;
  -moz-background-size:100% 100%;
  z-index: -1000;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  transition: all 1s ease-in-out;
}
</style>