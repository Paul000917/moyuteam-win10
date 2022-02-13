var desktopIcon = {
    data() {
        return {
        }
    },
    mounted() {
        this.InitDraggable();
    },
    methods:{
        InitDraggable(){
            this.$(".win-content").draggable(
            { 
                cancel:".win-panel",grid: [ 1, 1 ],
                containment: !window.global.isOverDeskTop?".desktop-panel":'', 
                scroll: false,
                stop: function( event, ui) {
                    console.log("拖拽方法")
                } 
            });
        }
    }
  }
  export default desktopIcon