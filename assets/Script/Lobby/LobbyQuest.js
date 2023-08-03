cc.Class({
    extends: cc.Component,

    properties: {
        questScroll: cc.ScrollView,
    },

    onLoad() {
        this.netWork = require("LobbyNetWork");
    },

    start() {

    },

    getEveryLoginPrice(data) {
        this.questScroll.content.children[0].getComponent("questItem").setView(data);
    },

    updatePanel(data) {
        this.questScroll.content.children[0].getComponent("questItem").setView(data);
    },

    //通用关闭界面
    onBtnClick_closePanel(event) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        event.target.parent.active = false;
    },
});
