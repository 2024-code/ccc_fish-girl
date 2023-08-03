"use strict";
cc._RF.push(module, '3dbdfu2dslKYrFQROqQCQnn', 'XYJWheel');
// Texture/Slot_Xiyouji/js/XYJWheel.js

"use strict";

var ROLENUM = 40; //每一轮的角色数量

var TIMEMIN = 1; //第一轮摇奖时间

cc.Class({
  "extends": cc.Component,
  properties: {
    wheelId: 0,
    excludeId: {
      "default": 0,
      displayName: '不会出现的数字id'
    }
  },
  onLoad: function onLoad() {
    this.audio = cc.director.getScene().getChildByName('Canvas').getComponent('XYJAudio');
    this.mainObj = cc.director.getScene().getChildByName('Canvas').getComponent('XYJMain');
    this.mainObj.wheelList[this.wheelId] = this;
    this.status = 0; //0停止 1转 

    this.lastResult = [0, 0, 0, 0, 0]; //中间三位是上一局结果 首位末尾是为了防止露出部分转起来不一样 

    this.rolePbList = []; //roles

    this.roleIdList = []; //role ID
  },
  start: function start() {
    //初始化场景role
    this.initWheel();
  },
  initWheel: function initWheel() {
    this.rolePbList = [];
    this.roleIdList = [];
    this.node.removeAllChildren();

    for (var i = 0; i < ROLENUM - 12; i++) {
      this.addRole(this.getRandomId());
    }

    this.addRole(this.getRandomId());
    this.node.y = -200;
    this.mainObj.rollIndex++;
    this.mainObj.closeShine();
  },
  startRoll: function startRoll() {
    var _this = this;

    this.status = 1;
    this.rolePbList = [];
    this.roleIdList = [];
    this.node.removeAllChildren();
    this.node.y = -200;

    for (var i in this.lastResult) {
      this.lastResult[i] = this.lastResult[i] == 0 ? this.getRandomId() : this.lastResult[i];
      this.addRole(this.lastResult[i]);
    }

    for (var _i = 0; _i < ROLENUM - 12; _i++) {
      this.addRole(this.getRandomId());
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    for (var _i2 in args) {
      this.addRole(args[_i2]);
    }

    this.addRole(this.getRandomId());
    setTimeout(function () {
      var timer = TIMEMIN + _this.wheelId * 0.2;
      timer = !_this.mainObj.auto ? TIMEMIN : timer;

      _this.node.runAction(cc.sequence(cc.delayTime(0.2), cc.moveTo(timer, cc.v2(_this.node.x, -_this.node.height + 880)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 800)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 880)), cc.callFunc(_this.rollCallBack.bind(_this))));
    }, 100);
  },
  getRandomId: function getRandomId() {
    var randomId = 0;

    while (randomId == 0) {
      if (this.mainObj.freeTimes > 0 || this.mainObj.stopFree) {
        randomId = Math.floor(Math.random() * (this.mainObj.rolePb.length - 1) + 1);
        randomId = randomId == 9 ? 1 : randomId;
      } else {
        randomId = Math.floor(Math.random() * (this.mainObj.rolePb.length - 1) + 1);
      }

      randomId = randomId == this.excludeId ? 0 : randomId;
    }

    ;
    return randomId;
  },
  addRole: function addRole(id) {
    var pb = cc.instantiate(this.mainObj.rolePb[id]);
    this.rolePbList.push(pb);
    this.roleIdList.push(id);
    this.node.addChild(pb);
  },
  rollCallBack: function rollCallBack() {
    this.audio.playStopWheel();
    this.lastResult = this.roleIdList.slice(-5);
    this.status = 0;
    this.mainObj.stateCallBack();
  },
  stopImmediately: function stopImmediately() {
    var _this2 = this;

    this.lastResult = this.roleIdList.slice(-5);
    this.node.stopAllActions();
    setTimeout(function () {
      _this2.node.y = -_this2.node.height + 880;
    }, 50);
    this.status = 0;
    this.mainObj.stateCallBack();
  }
});

cc._RF.pop();