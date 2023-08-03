"use strict";
cc._RF.push(module, '17e6euWaWRO2JiYVOuR26QC', 'LobbyQuest');
// Script/Lobby/LobbyQuest.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    questScroll: cc.ScrollView
  },
  onLoad: function onLoad() {
    this.netWork = require("LobbyNetWork");
  },
  start: function start() {},
  getEveryLoginPrice: function getEveryLoginPrice(data) {
    this.questScroll.content.children[0].getComponent("questItem").setView(data);
  },
  updatePanel: function updatePanel(data) {
    this.questScroll.content.children[0].getComponent("questItem").setView(data);
  },
  //通用关闭界面
  onBtnClick_closePanel: function onBtnClick_closePanel(event) {
    //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
    event.target.parent.active = false;
  }
});

cc._RF.pop();