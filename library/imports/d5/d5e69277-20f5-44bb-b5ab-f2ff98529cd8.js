"use strict";
cc._RF.push(module, 'd5e69J3IPVEu7Wr8v+YUpzY', 'LobbyRank');
// Script/Lobby/LobbyRank.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    rankScroll: cc.ScrollView,
    rankPrefab: cc.Prefab
  },
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.netWork = require("LobbyNetWork");
  },
  start: function start() {},
  updateCoinPanel: function updateCoinPanel(data) {
    this.data = data;
    console.log(data);
    this.rankScroll.content.removeAllChildren();

    for (var i = 0; i < data.length; i++) {
      var newNode = cc.instantiate(this.rankPrefab);
      this.rankScroll.content.addChild(newNode);
      newNode.getComponent("paihangbg").setView(data[i], i, 1);
    }
  },
  updateDiamondPanel: function updateDiamondPanel(data) {
    this.data = data;
    this.rankScroll.content.removeAllChildren();

    for (var i = 0; i < data.length; i++) {
      var newNode = cc.instantiate(this.rankPrefab);
      this.rankScroll.content.addChild(newNode);
      newNode.getComponent("paihangbg").setView(data[i], i, 2);
    }
  },
  //查询金币排行
  selectCoinRank: function selectCoinRank() {
    this.netWork.socket.emit("getCoinRank");
  },
  //查询钻石排行
  selectDiamondRank: function selectDiamondRank() {
    this.netWork.socket.emit("getDiamondRank");
  }
});

cc._RF.pop();