<template>
    <div class="main-panel">
        <div class="desktop-panel" @click="clickDeskTop" @contextmenu.prevent.self.stop="openContextMenu($event)">
            <windowContent v-for="item in winBox" class="page-content"
                :key="item.WinId"
                :WinId="item.WinId"
                :AppId="item.AppId"
                :AppName="item.AppName"
                :LayerX="item.LayerX"
                :LayerY="item.LayerY"
                :ZIndex="item.ZIndex"
                :SysWindow="item.SysWindow"></windowContent>
            <desktopIcon class="appicon"  v-for="app in apps"
                :key="app.Inx" 
                :AppId="app.AppId"
                :Inx="app.Inx"
                :AppColor="app.AppColor" 
                :LayerX="app.LayerX" 
                :LayerY="app.LayerY" 
                :AppName="app.AppName" 
                :IsImg="app.IsImg"
                :ImgUrl="app.ImgUrl"
                @openWin="openWin(app)"></desktopIcon>
        </div>
        <transition name="menu-show">
            <div class="startmenu-panel" v-show="ctrl.startpanel">
                <startMenu></startMenu>
            </div>
         </transition>
         <transition name="desktoptask-show">
            <div class="desktop-task unselect" v-show="ctrl.desktoptaskshow" @click="ClickDesktopTask()">
                <div class="start-button">
                    <div class="btn-start" @click="openStartMenu()">
                        <img :src="startIcon" />
                    </div>
                </div>
                <div class="opened-page">
                    <minState></minState>
                </div>
                <div class="shortcut-app">
                    <div class="sapp-more" @click="OpenMoreFunc()"><i class="iconfont"></i></div>
                    <div class="sapp-func1" @click="OpenTestFunc()"><i class="iconfont"></i></div>
                    <div class="sapp-func2" @click="OpenTestFunc()"><i class="iconfont"></i></div>
                    <div class="sapp-func3" @click="OpenTestFunc()"><i class="iconfont"></i></div>
                </div>
                <div class="date-notice">
                    <div class="btn-datetime"><span>2022-02-10</span></div>
                    <div class="btn-notice" @click="openNoticePanel"><i class="iconfont"></i></div>
                </div>
            </div>
        </transition>
         <transition name="notice-ani">
            <div class="notice-panel" v-show="ctrl.noticepanel">
                <noticeCenter></noticeCenter>
            </div>
        </transition>
         <transition name="fade-up">
            <div class="morefunc-panel" v-show="ctrl.morefunc">
                <moreFunc></moreFunc>
            </div>
        </transition>
        <transition name="context-ani">
            <contextMenu @hiddenContext="hiddenContext" v-show="ctrl.contexmenushow" :layerX=layerX :layerY=layerY></contextMenu>
        </transition>
        <transition name="fade">
            <contextClearRecycleBin v-show="ctrl.contextclearrecyclebinshow" :layerX=layerX1 :layerY=layerY1></contextClearRecycleBin>
        </transition>

    </div>
</template>
<script>
import desktop from '@/mixins/desktop.mixin.js'
import noticeCenter from '@/mixins/notice-center.mixin.js'
import winContent from '@/mixins/win-content.mixin.js'
import MinState from '@/components/minState.vue'
export default {
  mixins: [desktop,MinState,noticeCenter, winContent],
  data () {
    return {
      startIcon: require('@img/svg/start.svg'),
      recycleBin_Empty: require('@img/app/empty.png'),
      recycleBin_Full: require('@img/app/full.png'),
      ctrl: {
        startpanel: false,
        noticepanel: false,
        contexmenushow: false,
        desktoptaskshow:false,
        contextclearrecyclebinshow:false,
        morefunc:false
      },
      apps:[]
    }
  },
  created(){
      
  },
  mounted () {
    this.$('.desktop-task').css('background',window.global.colorConfig.bottomTaskColor)
    this.$('.notice-panel').css('background',window.global.colorConfig.noticePanelColor)
    this.$('.morefunc-panel').css('background',window.global.colorConfig.moreFuncColor)
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">

.desktop-panel{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 36px;
    z-index: 1;
    overflow: hidden;

    .appicon{
        z-index: 10;
    }

    .page-content{
        z-index: 20;
    }
}
.desktop-task{
    height: 36px;
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    background: rgba($color: #000000, $alpha: 0.9);
    z-index: 200000;
    //overflow: hidden;
    .start-button{
        width: 36px;
        height: 36px;
        position: absolute;
        left: 0;
        bottom: 0;
        text-align: center;
        line-height: 36px;
        padding: 0;
        margin: 0;
        .btn-start{
            position: absolute;
            width: 36px;
            height: 36px;
            left: 0;
            bottom: 0;
            img{
                width: 36px;
                height: 36px;
                display: block;
            }
            &:hover{
                cursor: pointer;
                background-color: #1E1E1E;
            }
        }
    }
    .opened-page{
        height: 36px;
        position: absolute;
        left:36px;
        right: 294px;
        bottom: 0;
        line-height: 36px;
    }
    .shortcut-app{
        height: 36px;
        width: 144px;
        position: absolute;
        right: 150px;
        bottom: 0;
        text-align: center;
        padding: 0px;
        margin: 0px;
        border: 0px;
        overflow: hidden;
        .sapp-more{
            position: absolute;
            width: 36px;
            height: 36px;
            line-height: 36px;
            left: 0px;
            bottom: 0px;
            float: left;
            transition: all .4s ease-in-out;
            i{
                font-size: 18px;
                color: rgba($color: $themeColor, $alpha: 1.0);
                color: #FFFFFF;
                text-align: center;
            }
            i:after{
                content: '\e6bd'
            }
            &:hover{
                cursor: pointer;
                transition: all .4s ease-in-out;
                background-color: #1E1E1E;
            }
        }
        .sapp-func1{
            position: absolute;
            width: 36px;
            height: 36px;
            line-height: 36px;
            left: 36px;
            bottom: 0;
            transition: all .4s ease-in-out;
            i{
                font-size: 18px;
                color: rgba($color: $themeColor, $alpha: 1.0);
                color: #FFFFFF;
            }
            i:after{
                content: '\e9c3'
            }
            &:hover{
                cursor: pointer;
                transition: all .4s ease-in-out;
                background-color: #1E1E1E;
            }
        }
        .sapp-func2{
            position: absolute;
            width: 36px;
            height: 36px;
            line-height: 36px;
            left: 72px;
            bottom: 0;
            transition: all .4s ease-in-out;
            i{
                font-size: 18px;
                color: rgba($color: $themeColor, $alpha: 1.0);
                color: #FFFFFF;
            }
            i:after{
                content: '\ecb8'
            }
            &:hover{
                cursor: pointer;
                transition: all .4s ease-in-out;
                background-color: #1E1E1E;
            }
        }
        .sapp-func3{
            position: absolute;
            width: 36px;
            height: 36px;
            line-height: 36px;
            left: 108px;
            bottom: 0;
            transition: all .4s ease-in-out;
            i{
                font-size: 18px;
                color: rgba($color: $themeColor, $alpha: 1.0);
                color: #FFFFFF;
            }
            i:after{
                content: '\eb97'
            }
            &:hover{
                cursor: pointer;
                transition: all .4s ease-in-out;
                background-color: #1E1E1E;
            }
        }
    }

    .date-notice{
        height: 36px;
        width: 150px;
        position: absolute;
        right: 0;
        bottom: 0;

        .btn-datetime{
            height: 36px;
            width: 104px;
            position: absolute;
            right: 46px;
            bottom: 0;
            text-align: center;
            line-height: 36px;
            font-size: 13px;
            color: #FFFFFF;
            transition: all .4s ease-in-out;
            &:hover{
                cursor: pointer;
                background: rgba($color: #000000, $alpha: 0.2);
                transition: all .4s ease-in-out;
            }
        }
        .btn-notice{
            height: 36px;
            width: 45px;
            position: absolute;
            right: 0;
            bottom: 0;
            text-align: center;
            line-height: 36px;
            border-left: 1px solid rgba($color: #FFFFFF, $alpha: 0.2);
            transition: all .4s ease-in-out;
            i{
                display: inline-block;
                color: #FFFFFF;
            }
            i:after{
                content: '\ebbe'
            }
            &:hover{
                transition: all .4s ease-in-out;
                cursor: pointer;
                background-color: #1E1E1E;
                i:after{
                    content: '\e9a8'
                }
            }
        }
        .btn-notice2{
            background-color: rgba($color: $themeColor, $alpha: 1);
            i:after{
                content: '\e9a8'
            }
        }
    }
}
.startmenu-panel{
    position:absolute;
    left: 0;
    bottom: 36px;
    width: 500px;
    height: 480px;
    transition: all .4s ease-in-out;
    z-index: 100000;
}

.notice-panel{
    position:absolute;
    top: 0;
    right: 0;
    bottom: 36px;
    width: 280px;
    margin: 0px;
    padding: 0px;
    background: rgba($color: #000000, $alpha: 1);
    z-index: 2999;
}
.morefunc-panel{
    position:absolute;
    right: 145px;
    bottom: 40px;
    width: 280px;
    height: 150px;
    margin: 0px;
    padding: 5px;
    background: rgba($color: #000000, $alpha: 1);
    border-radius: 10px;
    z-index: 100000;
}
</style>
