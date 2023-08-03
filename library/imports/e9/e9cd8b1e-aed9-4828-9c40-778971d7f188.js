"use strict";
cc._RF.push(module, 'e9cd8sertlIKJxAd4lx1/GI', 'HongBaoButtonClick');
// Script/game_hongbao/HongBaoButtonClick.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.netWork = require("HongBaoNetWork").getInstant;
    this.pInfo = require("PlayerInfo").getInstant;
    this.gameMain = cc.find('Canvas').getComponent('HongBaoMain');
  },
  start: function start() {},
  //打开发红包
  onClick_openSendHbPanel: function onClick_openSendHbPanel() {
    this.gameMain.open_panel("发红包");
  },
  onClick_closeSendHbPanel: function onClick_closeSendHbPanel() {
    this.gameMain.close_panel("发红包");
  },
  //关闭领红包
  onClick_closegetHbPanel: function onClick_closegetHbPanel() {
    this.gameMain.close_panel("开始抢红包");
  },
  //关闭抢到红包
  onClick_closeSuccessHbPanel: function onClick_closeSuccessHbPanel() {
    this.gameMain.close_panel("抢到红包");
  },
  //关闭未抢到红包
  onClick_closeLoseHbPanel: function onClick_closeLoseHbPanel() {
    this.gameMain.close_panel("未抢到红包");
  },
  //关闭红包详情
  onClick_closeHbDetailPanel: function onClick_closeHbDetailPanel() {
    this.gameMain.close_hbDetail();
  },
  //发红包
  onClick_sendHb: function onClick_sendHb() {
    this.gameMain.close_panel("发红包");
    this.netWork.gameSocket.emit("sendHb", {
      money: this.gameMain.nowPrice,
      //红包钱数
      nickname: this.pInfo.playerName //用户名

    });
  },
  //领红包
  onClick_getHb: function onClick_getHb() {
    // this.gameMain.close_panel("发红包");
    this.netWork.gameSocket.emit("getHb", {
      hbId: this.gameMain.nowHbId //红包id

    });
  },
  onClick_QuitGame: function onClick_QuitGame() {
    if (this.netWork.socket_io) this.netWork.socket_io.disconnect();
    cc.director.loadScene("LobbyMain");
  }
});

cc._RF.pop();