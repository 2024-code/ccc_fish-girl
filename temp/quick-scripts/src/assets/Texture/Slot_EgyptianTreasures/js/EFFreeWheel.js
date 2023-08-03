"use strict";
cc._RF.push(module, 'd58c0cBjsZDWqsJqI9c0DMO', 'EFFreeWheel');
// Texture/Slot_EgyptianTreasures/js/EFFreeWheel.js

"use strict";

var ROLENUM = 40; //每一轮的角色数量

var TIMEMIN = 1; //第一轮摇奖时间

cc.Class({
  "extends": cc.Component,
  properties: {
    wheelId: 0
  },
  onLoad: function onLoad() {
    this.audio = this.node.getComponent('EFAudio');
    this.mainObj = cc.director.getScene().getChildByName('Canvas').getComponent('EFMain');
    this.mainObj.freeWheelList[this.wheelId] = this;
  },
  startRoll: function startRoll(args) {
    var _this = this;

    this.animObj = null;
    this.node.removeAllChildren();
    this.node.y = 0;

    for (var i = 0; i < 39; i++) {
      this.addRole(Math.floor(Math.random() * 10 + 1));
    }

    this.animObj = this.addRole(args);
    var timer = TIMEMIN + this.wheelId * 0.2;
    setTimeout(function () {
      _this.node.runAction(cc.sequence(cc.moveTo(timer, cc.v2(_this.node.x, -_this.node.height + 220)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 230)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 220)), cc.callFunc(_this.rollCallBack.bind(_this))));
    }, 1000);
  },
  addRole: function addRole(id) {
    var pb = cc.instantiate(this.mainObj.rolePb[id]);
    this.node.addChild(pb);
    return pb;
  },
  rollCallBack: function rollCallBack() {
    this.animObj.getComponent(cc.Animation).play();
  }
});

cc._RF.pop();