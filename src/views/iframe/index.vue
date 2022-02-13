<!--
外链接窗体展示的页面
-->
<template>
    <iframe 
        class="iframe-panel"
        marginWidth=0 
        marginHeight=0 
        :src="pageUrl"
        frameBorder=0>
    </iframe>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
    data () {
        return {
            pageUrl:'',
            AppId:''
        }
    },
    created () {
        this.pageUrl=this.$route.query.url;
        this.AppId=this.$route.query.AppId;
    },
    mounted(){
        EventBus.$on('change-windowsize',data=>{
            if(data.AppId==this.AppId)
            {
                this.$(".iframe-panel").css('height',data.height+"px")
            }
        });
    }
}
</script>
<style scoped lang="scss">
.iframe-panel{
    width: 100%; 
    height:560px;
}
</style>