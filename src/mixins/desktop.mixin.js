import EventBus from '@/utils/eventbus.js'
import testData from '@/utils/data.js'
var desktop = {
    data() {
        return {
            layerX:0,
            layerY:0,
            layerX1:0,
            layerY1:0,
            winBox: [],
            currentMoveApp:''
        }
    },
    created() {
        let ljx={
            AppId:window.global.recycleBinId,
            AppColor:'#FF0000',
            AppName:'垃圾箱',
            UrlPath:'recyclebin',
            Component:'',
            IsImg:true,
            Inx:0,
            ImgUrl:require('@/assets/image/rcani.png')
        }
        this.$store.commit('window/UPDATE_ALLAPP', [...testData.allApp]);
        this.$store.commit('window/UPDATE_DESKTOPAPP', [ljx,...testData.desktopApp]);
        this.apps=this.$store.state.window.desktopApp;
        this.setAppPosition();
    },
    mounted() {
        EventBus.$emit('change-desktop-image','win10');
        this.registerEvent();
        var that=this;
        this.bindDraggableAndDroppableEvent();
        setTimeout(function(){
            that.ctrl.desktoptaskshow=true;
        },500)
    },
    methods:{
        bindDraggableAndDroppableEvent(){
            var that=this;
            this.$(".appicon").draggable({ 
                cancel:".title",grid: [ 1, 1 ],
                containment: ".desktop-panel", 
                scroll: false,
                stop: function( event, ui) {
                    this.layerX=ui.position.left
                    this.layerY=ui.position.top
                    let appid=that.$(this).attr("AppId");
                    for(let i=0;i<that.apps.length;i++){
                        if(that.apps[i].AppId==appid)
                        {
                            that.apps[i].LayerX=this.layerX;
                            that.apps[i].LayerY=this.layerY;
                        }
                    }
                    that.$store.commit('window/UPDATE_DESKTOPAPP', that.apps);
                    that.currentMoveApp=appid;
                }
            });
            this.$(".appicon").droppable({
                drop: function( event, ui ) {
                    if(that.$(this).attr("AppId")==window.global.recycleBinId)
                    {
                        setTimeout(function(){
                            if(that.currentMoveApp!='')
                            {
                                EventBus.$emit('full-recyclebin',false);
                                that.apps = that.apps.filter(function (item) {
                                    return item.AppId != that.currentMoveApp
                                })
                                that.$store.commit('window/UPDATE_DESKTOPAPP', that.apps);
                                that.$mynotify({title: '移出',message: '文件【'+that.currentMoveApp+'】已经被移出！',duration:0});
                            }
                        },200);
                    }
                } 
            });
        },
        registerEvent(){
            EventBus.$on('filter-desktop',data=>{
                if(window.global.desktopFilter)
                {
                    this.$(".desktop-panel").css('filter','blur(4px)');
                }
            });
            EventBus.$on('unfilter-desktop',data=>{
                this.$(".desktop-panel").css('filter','blur(0px)');
            });
            EventBus.$on('open-window',data=>{
                this.openWin(data)
            });
            EventBus.$on('open-newpage',data=>{
                this.$store.commit('window/UPDATE_WINBOX_URLINFO',data)
                this.$router.push('/home/'+data.UrlPath)
            });
            EventBus.$on('open-startmenu',data=>{
                this.ctrl.startpanel=!this.ctrl.startpanel
                EventBus.$emit('show-favoriteapp',this.ctrl.startpanel);
                EventBus.$emit('show-allprogram',this.ctrl.startpanel);
            });
            EventBus.$on('open-contextclearrecyclebin',data=>{
                this.CancleShortCut(data)
            });
            EventBus.$on('open-morefunc',data=>{
                this.ctrl.morefunc=!this.ctrl.morefunc;
            });
            EventBus.$on('close-contextclearrecyclebin',data=>{
                this.ctrl.contextclearrecyclebinshow=false;
            });
            EventBus.$on('close-startmenu',data=>{
                this.ctrl.startpanel=false;
                EventBus.$emit('show-favoriteapp',false);
                EventBus.$emit('show-allprogram',false);
            });
            EventBus.$on('close-noticecenter',data=>{
                this.ctrl.noticepanel=false;
            });
            EventBus.$on('close-contextmenu',data=>{
                this.ctrl.contexmenushow=false;
            });
            EventBus.$on('close-morefunc',data=>{
                this.ctrl.morefunc=false;
            });
            EventBus.$on('reset-appposition',data=>{
                if(this.$store.state.window.autosorticon)
                {
                    this.setAppPosition();
                }
            });
            EventBus.$on('send-desktopicon',data=>{
                let apphas=this.apps.filter(function (item) {
                    return item.AppId == data
                  })
                if(apphas.length==0)
                {
                    let app=this.$store.state.window.allApp.filter(function (item) {
                        return item.AppId == data
                    })
                    this.apps.push(app[0]);
                    this.$store.commit('window/UPDATE_DESKTOPAPP', this.apps);
                    this.setAppPosition();
                    var that=this;
                    setTimeout(function(){
                        that.bindDraggableAndDroppableEvent();
                    },200);
                }else
                {
                    this.$notify({title: '提示',message: '桌面已经存在！'});
                }
                
            });
        },
        openStartMenu(){
            EventBus.$emit('open-startmenu',true);
            EventBus.$emit('close-morefunc',false);
            if(this.ctrl.startpanel)
            {
                EventBus.$emit('filter-desktop',true);
            }else
            {
                EventBus.$emit('unfilter-desktop',false);
            }
        },
        hiddenContext(){
            this.ctrl.contexmenushow=false;
        },
        clickDeskTop(){
            EventBus.$emit('close-contextclearrecyclebin',false);
            EventBus.$emit('close-startmenu',false);
            EventBus.$emit('close-noticecenter',false);
            EventBus.$emit('close-contextmenu',false);
            EventBus.$emit('close-morefunc',false);
            EventBus.$emit('unfilter-desktop',false);
        },
        ClickDesktopTask(){
            EventBus.$emit('close-contextclearrecyclebin',false);
            EventBus.$emit('close-contextmenu',false);
            EventBus.$emit('filter-desktop',false);
        },
        openContextMenu(e){
            EventBus.$emit('close-contextclearrecyclebin',false);
            EventBus.$emit('close-startmenu',false);
            EventBus.$emit('close-noticecenter',false);
            EventBus.$emit('close-morefunc',false);
            if(this.ctrl.contexmenushow)
            {
                this.ctrl.contexmenushow=false;
                var that=this;
                setTimeout(function(){
                    that.ctrl.contexmenushow=true
                    if(e.layerX>=that.$(".desktop-panel").width()-100)
                    {
                        that.LayerX=e.layerX-100;
                    }else
                    {
                        that.layerX=e.layerX;
                    }
                    if(e.layerY>=that.$(".desktop-panel").height()-100)
                    {
                        that.layerY=e.layerY-100;
                    }else
                    {
                        that.layerY=e.layerY;
                    }
                },500);
            }else{
                this.ctrl.contexmenushow=true
                if(e.layerX>=this.$(".desktop-panel").width()-100)
                {
                    this.layerX=e.layerX-100;
                }else
                {
                    this.layerX=e.layerX;
                }
                if(e.layerY>=this.$(".desktop-panel").height()-100)
                {
                    this.layerY=e.layerY-100;
                }else
                {
                    this.layerY=e.layerY;
                }
            }
        },
        openWin (winObj) {
            if(!this.isCreateWin(winObj))
            {
                this.$store.commit('window/ADD_BOX', this.createWin(winObj))
                this.winBox = this.$store.state.window.winBox
                this.$nextTick(function () {
                    this.InitDraggable()
                })
                //this.$router.push('/home/'+winObj.UrlPath)
                if(!winObj.hasOwnProperty("Iframe"))
                {
                    this.$router.push('/home/'+winObj.UrlPath)
                }else
                {
                    if(winObj.Iframe)
                    {
                        this.$router.push({path:'/home/'+winObj.UrlPath,query:{url:winObj.IframeUrl,AppId:winObj.AppId}});
                    }else
                    {
                        this.$router.push('/home/'+winObj.UrlPath)
                    }
                }
                
            }else
            {   //如果已经创建，那么可能是最小化，那么恢复它即可
                let tempwin = this.$store.state.window.winBox.filter(function (item) {
                    return item.AppId == winObj.AppId
                })
                if(tempwin.length>0)
                {
                    EventBus.$emit('window-nomal',tempwin[0].WinId);
                }
            }
        },
        createWin (winObj) {
          var num = this.$store.state.window.winIndex
          let desktopHeight=this.$store.state.window.desktopHeight;
          let desktopWidth=this.$store.state.window.desktopWidth;
          let px=desktopWidth-window.global.windowSize.width;
          let py=desktopHeight-window.global.windowSize.height;
          let layerX_temp=px>0?Math.round(Math.random()*px):0;
          let layerY_temp=py>0?Math.round(Math.random()*py):0;
          var box = { 
              WinId: 'W' + num, 
              AppId:winObj.AppId,
              AppName: winObj.AppName, 
              LayerX: layerX_temp, 
              LayerY: layerY_temp, 
              ZIndex: num + 20, 
              WinStatus:'NOMAL',
              UrlPath: winObj.UrlPath,
              Component:winObj.Component,
              ImgUrl:winObj.ImgUrl}
            if(winObj.hasOwnProperty("SysWindow")){
                box.SysWindow=winObj.SysWindow;
            }else
            {
                box.SysWindow=false;
            }
          return box
        },
        isCreateWin(winObj)
        {
            var tempwinbox=this.$store.state.window.winBox.filter((item)=>{return item.AppId==winObj.AppId})
            if(tempwinbox.length>0)
            {
                EventBus.$emit('active-window',tempwinbox[0].WinId);
                return true;
            }
            return false;
        },
        CancleShortCut(e){
            var that=this;
            if(this.ctrl.contextclearrecyclebinshow)
            {
                this.ctrl.contextclearrecyclebinshow=false;
                setTimeout(function(){
                    that.layerX1=e.X;
                    that.layerY1=e.Y;
                    that.ctrl.contextclearrecyclebinshow=true
                },500);
            }else{

                that.layerX1=e.X;
                that.layerY1=e.Y;
                setTimeout(function(){
                    that.ctrl.contextclearrecyclebinshow=true
                },200);
            }
        },
        OpenMoreFunc(){
            EventBus.$emit('open-morefunc',true);
            EventBus.$emit('close-noticecenter',false);
            EventBus.$emit('close-contextclearrecyclebin',false);
            EventBus.$emit('close-startmenu',false);
            EventBus.$emit('close-contextmenu',false);
        },
        OpenTestFunc(){
            this.$mynotify({title: '标题名称',message: '打开一个新窗口',duration: 0});
        },
        setAppPosition(){//根据屏幕高度来变化位置

            let desktopHeight=this.$store.state.window.desktopHeight;
            let col= Math.ceil((this.apps.length*80)/desktopHeight);
            let row=Math.floor(desktopHeight/80)
            for(let i=0;i<col;i++){
                for(let j=0;j<row;j++){
                    let index=(i*row)+j;
                    if(index<this.apps.length)
                    {
                        this.apps[index].Inx=index+1;
                        this.apps[index].LayerX=(i*80)+20;
                        this.apps[index].LayerY=80*j+20;
                    }
                }
            }
        }
    }
  }
  export default desktop