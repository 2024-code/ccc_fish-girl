"use strict";
cc._RF.push(module, 'eea2cnLlKhKArG+7OKWVfag', 'HongBaoPlayer');
// Script/game_hongbao/HongBaoPlayer.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    headIco: cc.Sprite,
    lab_name: cc.Label,
    lab_coin: cc.Label,
    lab_packageMoney: cc.Label,
    lab_date: cc.Label
  },
  onLoad: function onLoad() {
    this.pInfo = require("PlayerInfo").getInstant;
    this.gameMain = cc.find('Canvas').getComponent('HongBaoMain');
  },
  start: function start() {
    var _this = this;

    Helper.loadHead(this.pInfo.playerHeadId, function (sp) {
      _this.headIco.getComponent(cc.Sprite).spriteFrame = sp;
    });
    this.lab_name.string = this.pInfo.playerName;
    this.lab_coin && (this.lab_coin.string = (this.pInfo.playerCoin / this.pInfo.exchangeRate).toFixed(2));
  },
  updateView: function updateView(data) {
    this.lab_coin.string = (data.ResultData.userscore / this.pInfo.exchangeRate).toFixed(2);
  },
  update: function update(dt) {}
});

cc._RF.pop();