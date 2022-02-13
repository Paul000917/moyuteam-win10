<!--
在垃圾箱上面右键
-->
<template>
    <div class="context-cancel-panel" :style="{left:`${layerX}px`,top:`${layerY}px`}" @click="RemoveAppIcon()">
        <i class="iconfont">&#xebb1;</i>
        <span>清空</span>
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
    methods: {
        RemoveAppIcon(){
            EventBus.$emit('close-contextclearrecyclebin',false);
            //EventBus.$emit('reset-recyclebinicon',false);
            EventBus.$emit('play-recyclebinani',false);
            this.$mymsg({
                showClose: true,
                message: '恭喜你，这是一条成功消息',
                type: 'success'
            });
        }
    }
}
</script>
<style scoped lang="scss">
.context-cancel-panel{
    width: 54px;
    height: 24px;
    position: absolute;
    z-index: 9999999;
    background-color:rgba($color: #1C1C1C, $alpha: 0.3);
    text-align: center;
    border-radius: 10px;
    i{
        width: 24px;
        height: 24px;
        line-height: 24px;
        display: inline-block;
        color: #FFFFFF;
        float: left;
    }
    span{
        width: 30px;
        height: 24px;
        line-height: 24px;
        font-size: 13px;
        text-align: center;
        display: inline-block;
        color: #FFFFFF;
        float: left;
    }
    &:hover{
        cursor: pointer;
        background-color:rgba($color: #1C1C1C, $alpha: 0.8);
    }
}
</style>