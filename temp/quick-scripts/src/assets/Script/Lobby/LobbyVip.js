"use strict";
cc._RF.push(module, '88de8Ay5OdDwZz0aKmN0wST', 'LobbyVip');
// Script/Lobby/LobbyVip.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.netWork = require("LobbyNetWork");
    this.lobbyMain = cc.find('Canvas').getComponent("LobbyMain");
    this.playerInfo = require("PlayerInfo").getInstant;
  },
  start: function start() {},
  //打开充值面板
  openMallPanel: function openMallPanel() {
    this.node.active = false;
    this.lobbyMain.bg_Black.active = true;
    this.lobbyMain.com_Mall.active = true;
    this.lobbyMain.changeMallUI(0);
    cc.find('com_chongzhi_01/lb_PlayerId', this.lobbyMain.com_Mall).getComponent("cc.Label").string = "ID: " + this.playerInfo.playerId;
    ;
  },
  //关闭当前面板
  closePanel: function closePanel() {
    this.node.active = false;
  }
});

cc._RF.pop();