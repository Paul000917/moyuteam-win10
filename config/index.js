(function (window) {
  window.global = {
    version: 'v1.0.0',
    title: '青训营win10模拟',
    tokenkey:'GCTOKEN',
    // 默认主题色
    themeDefault: '#007aff',
    //颜色配置
    colorConfig:{
      //开始菜单
      startMenuColor:{left:'rgba(8,8,8,0.9)',center:'rgba(10,10,10,0.9)',right:'rgba(10,10,10,0.9)'},
      //任务栏更多功能
      moreFuncColor:'rgba(0,0,0,0.9)',
      //地步任务栏颜色
      bottomTaskColor:'rgba(0,0,0,0.9)',
      //通知面板颜色
      noticePanelColor:'rgba(0,0,0,0.9)'
    },
    startMenuPureColor:false,
    //拖动窗体，是否能超过桌面
    isOverDeskTop:false,
    //任务栏模式:nomal（全部显示），onlymin（只显示最小化的）
    taskNavMode:'nomal',
    //右键菜单
    contextMenuConfig:[
      {AppId:'mycenter',AppName:'查看(V)',SysWindow:true,UrlPath:'chakan',Component:'setting/myinfo.vue'},
      {AppId:'sort',AppName:'排序方式(I)',SysWindow:false},
      {AppId:'refresh',AppName:'刷新(E)',SysWindow:false},
      {AppId:'establish',AppName:'新建(W)',SysWindow:false},
      {AppId:'systemsetting',AppName:'系统设置(D)',SysWindow:true,UrlPath:'systemsetting',Component:'setting/system.vue'}
    ],
    //开始菜单配置
    startMenuFavoriteConfig:[
      [{span:16,info:'待办事项',imgPath:'../assets/image/favorite/f1.png',AppId:'10007'}],
      [{span:8,info:'待办事项',imgPath:'../assets/image/favorite/f2.png',AppId:'10007'},{span:16,info:'待办事项',imgPath:'../assets/image/favorite/f1.png',AppId:'10007'}],
      [{span:8,info:'待办事项',imgPath:'../assets/image/favorite/f2.png',AppId:'10007'},{span:16,info:'待办事项',imgPath:'../assets/image/favorite/f1.png',AppId:'10007'}],
      [{span:8,info:'待办事项',imgPath:'../assets/image/favorite/f2.png',AppId:'10007'},{span:16,info:'待办事项',imgPath:'../assets/image/favorite/f1.png',AppId:'10007'}]
    ],
    //垃圾箱APP的ID
    recycleBinId:'recycleBin100',
    //桌面是否要模糊
    desktopFilter:false,
    //窗口透明度，1是不透明，0是全透明
    windowHeadOpacity:0.9,
    //激活窗口颜色
    topWindowColor:'#007aff',
    //未激活窗口顶部颜色
    unActiveWindowColor:'#505050',
    //窗口的默认值和最小值
    windowSize:{
      height:600,
      width:800,
      minHeight:300,
      minWidth:400
    }
  }

  window.initSysUrl = function (env) {
    //window.global['baseUrl'] = 'http://127.0.0.1:9090/pms-service'
    window.global['baseUrl'] = 'http://127.0.0.1:9091/home'
  }
})(window)
