var KBEngine = {};//require("kbengine");
cc.Class({
    extends: cc.Component,

    properties: {
        Node_ItemParent: {
            default: null,
            type: cc.Node,
            tooltip: "Item父节点",
        },
        Prefab_Item: {
            default: null,
            type: cc.Prefab,
            tooltip: "Item预制件",
        },
    },

    //取消注册
    onDestroy: function () {
        KBEngine.Event.deregister("onGetDogRaceRecord", this);
    },

    start: function () {
        KBEngine.Event.register("onGetDogRaceRecord", this, "onGetDogRaceRecord");
    },

    onEnable: function () {
        KBEngine.app.player().reqGetDogRaceRecord();//请求赛狗比赛记录
    },

    onDisable: function () {
        var items = this.Node_ItemParent.children;
        for (var i = 0; i < items.length; i++) {
            items[i].destroy();
        }
    },

    onGetDogRaceRecord:function(dictList){
        for (var i = 0; i < dictList.length; i++) {
            var record = dictList[i];
            var nodeItem = cc.instantiate(this.Prefab_Item);
            nodeItem.getComponent("houndRecordItem").SetData(record);
            nodeItem.parent = this.Node_ItemParent;
        }
    },
    
    onBtnClick_HaoMa: function () {
        var items = this.Node_ItemParent.children;
        for (var i = 0; i < items.length; i++) {
            items[i].getComponent("houndRecordItem").ShowHaoMa();
        }
    },

    onBtnClick_DaXiao: function () {
        var items = this.Node_ItemParent.children;
        for (var i = 0; i < items.length; i++) {
            items[i].getComponent("houndRecordItem").ShowDaXiao();
        }
    },

    onBtnClick_DanShuang: function () {
        var items = this.Node_ItemParent.children;
        for (var i = 0; i < items.length; i++) {
            items[i].getComponent("houndRecordItem").ShowDanShuang();
        }
    },
});