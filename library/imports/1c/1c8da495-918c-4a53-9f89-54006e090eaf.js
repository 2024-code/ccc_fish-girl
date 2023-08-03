"use strict";
cc._RF.push(module, '1c8daSVkYxKU5+JVABuCQ6v', 'houndRecord');
// Texture/game_saigou/houndRecord.js

"use strict";

var KBEngine = {}; //require("kbengine");

cc.Class({
  "extends": cc.Component,
  properties: {
    Node_ItemParent: {
      "default": null,
      type: cc.Node,
      tooltip: "Item父节点"
    },
    Prefab_Item: {
      "default": null,
      type: cc.Prefab,
      tooltip: "Item预制件"
    }
  },
  //取消注册
  onDestroy: function onDestroy() {
    KBEngine.Event.deregister("onGetDogRaceRecord", this);
  },
  start: function start() {
    KBEngine.Event.register("onGetDogRaceRecord", this, "onGetDogRaceRecord");
  },
  onEnable: function onEnable() {
    KBEngine.app.player().reqGetDogRaceRecord(); //请求赛狗比赛记录
  },
  onDisable: function onDisable() {
    var items = this.Node_ItemParent.children;

    for (var i = 0; i < items.length; i++) {
      items[i].destroy();
    }
  },
  onGetDogRaceRecord: function onGetDogRaceRecord(dictList) {
    for (var i = 0; i < dictList.length; i++) {
      var record = dictList[i];
      var nodeItem = cc.instantiate(this.Prefab_Item);
      nodeItem.getComponent("houndRecordItem").SetData(record);
      nodeItem.parent = this.Node_ItemParent;
    }
  },
  onBtnClick_HaoMa: function onBtnClick_HaoMa() {
    var items = this.Node_ItemParent.children;

    for (var i = 0; i < items.length; i++) {
      items[i].getComponent("houndRecordItem").ShowHaoMa();
    }
  },
  onBtnClick_DaXiao: function onBtnClick_DaXiao() {
    var items = this.Node_ItemParent.children;

    for (var i = 0; i < items.length; i++) {
      items[i].getComponent("houndRecordItem").ShowDaXiao();
    }
  },
  onBtnClick_DanShuang: function onBtnClick_DanShuang() {
    var items = this.Node_ItemParent.children;

    for (var i = 0; i < items.length; i++) {
      items[i].getComponent("houndRecordItem").ShowDanShuang();
    }
  }
});

cc._RF.pop();