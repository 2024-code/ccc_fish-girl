"use strict";
cc._RF.push(module, '880d7emZC5GsKeqbwvVzq3B', 'AZTKWheelBeishu');
// Texture/Slot_aztec/js/AZTKWheelBeishu.js

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
    this.audio = cc.director.getScene().getChildByName('Canvas').getComponent('AZTKAudio');
    this.mainObj = cc.director.getScene().getChildByName('Canvas').getComponent('AZTKMain');
    this.mainObj.wheelList[this.wheelId] = this;
    this.status = 0; //0停止 1转 

    this.lastResult = [0, 0, 0, 0, 0]; //中间一位是上一局结果 其余是为了防止露出部分转起来不一样 

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

    for (var i in this.lastResult) {
      this.lastResult[i] = this.getRandomId();
      this.addRole(this.lastResult[i]);
    }

    this.addRole(this.getRandomId());
    this.node.y = -100;
    this.mainObj.rollIndex++;
    this.mainObj.closeShine();
  },
  startRoll: function startRoll(args) {
    var _this = this;

    this.status = 1;
    this.rolePbList = [];
    this.roleIdList = [];
    this.node.removeAllChildren();
    this.node.y = -100; //滚轮启动位移距离

    for (var i in this.lastResult) {
      this.lastResult[i] = this.lastResult[i] == 0 ? this.getRandomId() : this.lastResult[i];
      this.addRole(this.lastResult[i]);
    }

    for (var _i = 0; _i < ROLENUM - 12; _i++) {
      this.addRole(this.getRandomId());
    }

    this.addRole(this.getRandomId());
    var indexArray = [0, 1, 2, 3, 5, 10, 15];

    for (var _i2 = 0; _i2 < indexArray.length; _i2++) {
      if (indexArray[_i2] == args) {
        this.addRole(_i2);
        break;
      }
    }

    this.addRole(this.getRandomId());
    this.addRole(this.getRandomId());
    setTimeout(function () {
      var timer = TIMEMIN + _this.wheelId * 0.2;
      timer = !_this.mainObj.auto ? TIMEMIN : timer;

      _this.node.runAction(cc.sequence(cc.delayTime(0.2), cc.moveTo(timer, cc.v2(_this.node.x, -_this.node.height + 595)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 650)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 595)), cc.callFunc(_this.rollCallBack.bind(_this))));
    }, 100);
  },
  getRandomId: function getRandomId() {
    var randomId = 0;

    while (randomId == 0) {
      randomId = Math.floor(Math.random() * (this.mainObj.roleBeishuPb.length - 1) + 1);
      randomId = randomId == this.excludeId ? 0 : randomId;
    }

    ;
    return randomId;
  },
  addRole: function addRole(id) {
    var pb = cc.instantiate(this.mainObj.roleBeishuPb[id]);
    this.rolePbList.push(pb);
    this.roleIdList.push(id);
    this.node.addChild(pb);
  },
  rollCallBack: function rollCallBack() {
    this.audio.playStopWheel();
    this.lastResult = this.roleIdList.slice(-4);
    this.status = 0;
    this.mainObj.stateCallBack();
  },
  stopImmediately: function stopImmediately() {
    var _this2 = this;

    this.lastResult = this.roleIdList.slice(-4);
    this.node.stopAllActions();
    setTimeout(function () {
      _this2.node.y = -_this2.node.height + 595;
    }, 50);
    this.status = 0;
    this.mainObj.stateCallBack();
  }
});

cc._RF.pop();