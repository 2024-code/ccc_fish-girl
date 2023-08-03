"use strict";
cc._RF.push(module, 'dcb09K3rFtDt7PeCEb/+QgP', 'LobbyActivity');
// Script/Lobby/LobbyActivity.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.netWork = require("LobbyNetWork");
  },
  start: function start() {},
  //关闭当前面板
  closePanel: function closePanel() {
    this.node.active = false;
  }
});

cc._RF.pop();