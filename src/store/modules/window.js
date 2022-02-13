const state = {
  routes:'',
  winBox: [],
  imgDataUrl: [],
  winIndex: 1,
  currentPath: '',
  currentActiveWinId:'',
  desktopHeight:0,
  desktopWidth:0,
  autosorticon:true,
  notifyNum:0,
  desktopApp:[],
  allApp:[]
}

//很多时候还是使用同步模式较多
const mutations = {
  SET_ROUTES(state, obj){
    state.routes=obj;
  },
  INIT (state, obj){
    state.winBox=obj.winBox
    state.winIndex = obj.winIndex
    state.currentPath = obj.currentPath
  },
  REMOVE_ALL (state, obj){
    state.routes=''
    state.winBox=[]
    state.winIndex = 1
    state.currentPath =''
  },
  ADD_BOX (state, box) {
      let temBox=state.winBox.filter(function (item) {
        return item.AppId == box.AppId
      })
      if(temBox.length==0)
      {
        state.winBox.push(box)
        state.winIndex = state.winIndex + 1
        state.currentPath = box.UrlPath
      }
  },
  UPDATE_CURRENTPATH (state, path) {
      state.currentPath = path
  },
  REMOVE_BOX (state, winid) {
    state.winBox = state.winBox.filter(function (item) {
      return item.WinId != winid
    })
  },
  UPDATE_WINSTATUS_MIN (state, winid) {
    for(var i=0;i<state.winBox.length;i++){
      if(state.winBox[i].WinId==winid){
        state.winBox[i].winStatus = 'MIN';
      }
    }
  },
  UPDATE_WINSTATUS_NOMAL (state, winid) {
    for(var i=0;i<state.winBox.length;i++){
      if(state.winBox[i].WinId==winid){
        state.winBox[i].winStatus = 'NOMAL';
      }
    }
  },
  UPDATE_WINSTATUS_MAX (state, winid) {
    for(var i=0;i<state.winBox.length;i++){
      if(state.winBox[i].WinId==winid){
        state.winBox[i].winStatus = 'MAX';
      }
    }
  },
  UPDATE_DATAURL (state, obj) {
    let imgs = state.imgDataUrl.filter(function (item) {
      return item.WinId != obj.WinId
    })
    state.imgDataUrl=imgs;
    state.imgDataUrl.push(obj);
  },
  UPDATE_DESKTOP_SIZE (state, obj) {
    state.desktopHeight=obj.height;
    state.desktopWidth=obj.width;
  },
  UPDATE_AUTOSORTICON (state, obj) {
    state.autosorticon=obj;
  },
  UPDATE_NOTIFYNUM (state, num) {
    if(num==1)
    {
      state.notifyNum=state.notifyNum+1;
    }else if(num==0)
    {
      state.notifyNum=0
    }else if(num==-1)
    {
      state.notifyNum=state.notifyNum-1
    }
  },
  UPDATE_DESKTOPAPP (state, apps) {
    state.desktopApp=apps
  },
  UPDATE_ALLAPP (state, apps) {
    state.allApp=apps
  },
  UPDATE_CURRENTACTIVEWINID (state, winid) {
    state.currentActiveWinId=winid
  },
  UPDATE_WINBOX_URLINFO(state, obj){
    for(var i=0;i<state.winBox.length;i++){
      if(state.winBox[i].WinId==obj.WinId){
        state.winBox[i].UrlPath = obj.UrlPath;
        state.winBox[i].Component = obj.Component;
        state.winBox[i].ImgUrl = obj.ImgUrl;
      }
    }
    state.currentPath = obj.UrlPath
  }
  
}
//异步操作会导致很多问题，只有数据请求使用
const actions = {
  addBox ({ commit }, box) {
    commit('ADD_BOX', box)
  },
  removeBox ({ commit }, id) {
    commit('REMOVE_BOX', id)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
