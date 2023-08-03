"use strict";
cc._RF.push(module, 'a0becVOH91CFKQiK0faI6Jv', 'HongBaoPreb');
// Script/game_hongbao/HongBaoPreb.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    money_lab: cc.Label,
    name_lab: cc.Label,
    remainNum_lab: cc.Label,
    finishBg: cc.Node
  },
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.exchangeRate = this.playerInfo.exchangeRate;
    this.netWork = require("HongBaoNetWork").getInstant;
    this.gameMain = cc.find('Canvas').getComponent('HongBaoMain');
  },
  start: function start() {
    this.initUI();
  },
  initUI: function initUI() {
    this.money_lab.string = this.data.money / this.exchangeRate + "元";
    this.name_lab.string = this.data.player;
    this.remainNum_lab.string = this.data.nowNum + "/" + this.data.maxNum;
    this.isHave = this.data.nowNum > 0;
    this.checkIsGet();
  },
  initData: function initData(data) {
    this.data = data;
  },
  //检查是否已领取
  checkIsGet: function checkIsGet() {
    this.isGet = false;

    for (var i = 0; i < this.data.receiveList.length; i++) {
      if (this.playerInfo.playerId == this.data.receiveList[i].userId) {
        this.isGet = true;
        break;
      }
    }

    this.finishBg.active = this.isGet || !this.isHave;
  },
  //打开领红包
  onClick_openGetHbPanel: function onClick_openGetHbPanel() {
    if (!this.isGet && this.isHave) {
      this.gameMain.nowHbId = this.data.hbId;
      this.gameMain.open_panel("开始抢红包");
    } else {
      this.netWork.gameSocket.emit("getHb", {
        hbId: this.data.hbId //红包id

      });
    }
  }
});

cc._RF.pop();