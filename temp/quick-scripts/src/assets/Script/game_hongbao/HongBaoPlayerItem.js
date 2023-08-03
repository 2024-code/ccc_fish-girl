"use strict";
cc._RF.push(module, '3373aPjhbBHIau0RWTqTXqM', 'HongBaoPlayerItem');
// Script/game_hongbao/HongBaoPlayerItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    headIco: cc.Sprite,
    lab_name: cc.Label,
    lab_packageMoney: cc.Label,
    lab_date: cc.Label
  },
  onLoad: function onLoad() {
    this.pInfo = require("PlayerInfo").getInstant;
    this.gameMain = cc.find('Canvas').getComponent('HongBaoMain');
  },
  start: function start() {
    this.initUI();
  },
  initUI: function initUI() {
    var _this = this;

    Helper.loadHead(this.data.headUrl, function (sp) {
      _this.headIco.getComponent(cc.Sprite).spriteFrame = sp;
    });
    this.lab_name.string = this.data.nickname;
    this.lab_packageMoney.string = (this.data.packageMoney / this.pInfo.exchangeRate).toFixed(2);
    this.lab_date.string = new Date(this.data.date).Format("yyyy-MM-dd hh:mm:ss");
  },
  initData: function initData(data) {
    this.data = data;
  }
});

Date.prototype.Format = function (fmt) {
  //author: meizz   
  var o = {
    "M+": this.getMonth() + 1,
    //月份   
    "d+": this.getDate(),
    //日   
    "h+": this.getHours(),
    //小时   
    "m+": this.getMinutes(),
    //分   
    "s+": this.getSeconds(),
    //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3),
    //季度   
    "S": this.getMilliseconds() //毫秒   

  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }

  return fmt;
};

cc._RF.pop();