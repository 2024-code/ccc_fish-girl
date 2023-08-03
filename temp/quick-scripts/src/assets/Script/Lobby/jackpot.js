"use strict";
cc._RF.push(module, 'da0b8kstbxDAqF7edOe3YOu', 'jackpot');
// Script/Lobby/jackpot.js

"use strict";

var self = null;
cc.Class({
  "extends": cc.Component,
  properties: {
    JackpotLabel: {
      type: cc.Node,
      "default": null
    },
    zuobiao: {
      "default": [],
      type: cc.String
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.allnum = this.JackpotLabel.children;
    self = this;
  },
  ShowJackPot: function ShowJackPot(num) {
    num = parseInt(num / 100);
    num += '';
    num = num.split('');
    var num1 = [];

    for (var i = num.length - 1; i >= 0; i--) {
      //数字变为倒序
      num1.push(num[i]);

      if (i == 0) {
        this.aa(num1);
      }
    }
  },
  aa: function aa(num1) {
    // console.log('!!!!',num1);
    num1.forEach(function (element, index) {
      //控制每一位的数字选择
      if (element != '.') {
        self.allnum[index].runAction(cc.moveTo(0.5, cc.v2(self.allnum[index].x, self.zuobiao[element])));
      }
    });
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();