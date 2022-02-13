<!--
最小化任务栏的隐藏类的窗体
-->
<template>
    <div class="minstate-panel">
        <div :class="getClassStyle(item.WinId)" v-for="(item,index) in minBox"
        :key="item.WinId"
        :winId="item.WinId"
        @click="nomalWindow(item.WinId)">
            
            <!-- <span>{{item.AppName}}</span> -->
            <!-- <span>{{item.ImgUrl}}</span> -->
            <img :src=item.ImgUrl class="minstate-img">
            <div class="short-img" :style="{'left':(index*70-35)+'px'}">
                <img :src="getImg(item.WinId)" height="110" width="170"/>
            </div>
        </div>
    </div>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
    data () {
        return {
            minBox:[]
        }
    },
    mounted(){
        EventBus.$on('rander-minstate',data=>{
            this.randerMinState();
        });
    },
    methods: {
        randerMinState(){
            this.minBox=[]
            var allBox=this.$store.state.window.winBox;
            if(window.global.taskNavMode=='nomal')
            {
                this.minBox=allBox;
            }else if(window.global.taskNavMode=='onlymin')
            {
                let minWin=allBox.filter((item)=>{
                    return item.winStatus=='MIN'
                })
                this.minBox=minWin;
            }
            console.log(this.minBox);
        },
        nomalWindow(winid){
            EventBus.$emit('window-nomal',winid);
            this.changeNomal(winid);
        },
        changeNomal(winid){
            this.$store.commit('window/UPDATE_WINSTATUS_NOMAL', winid);
            if(window.global.taskNavMode=='onlymin')
            {
                this.randerMinState();
            }
        },
        
        getImg(winid){
            let imgs = this.$store.state.window.imgDataUrl.filter(function (item) {
               return item.WinId == winid
            })
            if(imgs.length>0){
                return imgs[0].dataurl
            }
        },
        getClassStyle(winid){
            if(window.global.taskNavMode=='nomal'){
                if(this.$store.state.window.currentActiveWinId==winid){
                    return 'win-min-item-active';
                }else
                {
                    return 'win-min-item';
                }
            }
            return 'win-min-item';
        }
    }
}
</script>
<style scoped lang="scss">
.minstate-panel{
    width: 24px;
    height:26px;
    width: 100%;
    display: inline-block;
    text-align: left;
    margin: 5px 0px;
    .win-min-item{
        width: 24px;
        height: 24px;
        display: inline-block;
        border: 1px solid #3b3b3b;
        border-radius: 5px;
        background:rgba($color: #444444, $alpha: 0.5);
        margin: 0px 2px;
        float: left;
        .minstate-img{
            width: 24px;
            height: 24px;
            display: block;
            line-height: 24px;
            text-align: center;
            color: #adadad;
            font-size: 11px;
        }
        &:hover{
            cursor: pointer;
            border-bottom: 1px solid $themeColor;
            & > span{
                color: #fcfcfc;
                font-weight: 500;
            }
            & > .short-img{
                display: inline-block;
            }
        }
    }
    .win-min-item-active{
        width: 24px;
        height: 26px;
        display: inline-block;
        border-radius: 5px;
        border: 1px solid #5f5f5f;
        border-bottom: 1px solid $themeColor;
        background:rgba($color: #444444, $alpha: 0.3);
        margin: 0px 2px;
        float: left;
        .minstate-img{
            width: 24px;
            height: 24px;
            display: block;
            line-height: 26px;
            text-align: center;
            color: #fcfcfc;
            font-weight: 500;
            font-size: 11px;
        }
        &:hover{
            cursor: pointer;
            & > .short-img{
                display: inline-block;
            }
        }
    }
    .short-img{
        position:absolute;
        left: 0px;
        top: -130px;
        width: 180px;
        height: 120px;
        padding: 5px;
        background: rgba($color: #000000, $alpha: 0.3);
        display: none;
        border-radius: 5px;
        cursor: pointer;
        img{
            position: relative;
            left: 5px;
            top: 5px;
            object-fit: fill;
        }
    }
}
</style>