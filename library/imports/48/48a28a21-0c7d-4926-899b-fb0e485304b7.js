"use strict";
cc._RF.push(module, '48a28ohDH1JJomb+w5IUwS3', 'BulletCtrl');
// Script/Fish/BulletCtrl.js

"use strict";

var bulletJL = {
  '1': 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4
};
var speedJL = {
  '1': 10,
  '2': 12,
  '3': 15,
  '4': 17,
  '5': 20
};
cc.Class({
  "extends": cc.Component,
  properties: {
    spList: [cc.SpriteFrame] //炮弹sp

  },
  init: function init(fishMain, seatId, pos, angle, roombet) {
    this.fishMain = fishMain;
    this.seatId = seatId;
    this.speed = speedJL[roombet + ''];
    this.getComponent(cc.Sprite).spriteFrame = this.spList[bulletJL[roombet + '']];
    this.node.position = pos; // this.node.rotation = angle;

    this.node.angle = -angle;
    this.roomBet = roombet;
  },
  update: function update(dt) {
    this.node.x += speedJL[this.roomBet] * Math.sin(-2 * Math.PI / 360 * this.node.angle);
    this.node.y += speedJL[this.roomBet] * Math.cos(-2 * Math.PI / 360 * this.node.angle); //边界检测 处理子弹反弹

    if (this.node.x > 667) {
      this.node.angle = 360 - this.node.angle;
      this.node.x = 667;
    } else if (this.node.x < -667) {
      this.node.angle = 360 - this.node.angle;
      this.node.x = -667;
    } else if (this.node.y > 375) {
      this.node.angle = 180 - this.node.angle;
      this.node.y = 375;
    } else if (this.node.y < -375) {
      this.node.angle = 180 - this.node.angle;
      this.node.y = -375;
    }
  },
  onCollisionEnter: function onCollisionEnter(other, self) {
    var _this = this;

    //渔网
    var com = self.node.getComponent("BulletCtrl");
    var fishNode = other.node;
    var fishsc = fishNode.getComponent("Fish");

    if (this.fishMain.isLockFish && com.autoId != fishsc.fishId && this.fishMain.checkFishId(com.autoId)) {
      return;
    }

    var _loop = function _loop() {
      var net = _this.fishMain.getNet();

      net.parent = _this.fishMain.netBg; // net.position = other.node.position;

      point = cc.v2(_this.node.x + other.node.width / 2 * Math.sin(-2 * Math.PI / 360 * _this.node.angle), _this.node.y + other.node.height / 2 * Math.cos(-2 * Math.PI / 360 * _this.node.angle));
      net.getComponent(cc.Animation).play();

      if (index == 0) {
        point.x += 50 * Math.sin(-2 * Math.PI / 360 * _this.node.angle);
        point.y += 50 * Math.cos(2 * Math.PI / 360 * _this.node.angle);
      } else if (index == 1) {
        point.x += 50 * Math.sin(-2 * Math.PI / 360 * (_this.node.angle + 120));
        point.y += 50 * Math.cos(2 * Math.PI / 360 * (_this.node.angle + 120));
      } else if (index == 2) {
        point.x += 50 * Math.sin(-2 * Math.PI / 360 * (_this.node.angle + 240));
        point.y += 50 * Math.cos(-2 * Math.PI / 360 * (_this.node.angle + 240));
      }

      net.position = point;
      net.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function () {
        _this.fishMain.netPool.put(net);
      })));
    };

    for (var index = 0; index < 3; index++) {
      var point;

      _loop();
    }

    playEffect('open_net');
    this.fishMain.bulletPool.put(this.node);

    var ac = this._getActionByTag(257, fishNode);

    if (!ac) {
      ac = cc.sequence(cc.tintTo(0.2, 50, 50, 50), cc.tintTo(0.2, 255, 255, 255), cc.tintTo(0.2, 50, 50, 50), cc.tintTo(0.2, 255, 255, 255));
      ac.setTag(257);
      fishNode.runAction(ac);
    } //this.node.removeComponent(cc.CircleCollider);


    var playerinfo = require("PlayerInfo").getInstant;

    var fishNet = require("./FishNetWork").getInstant;

    var mes = {
      fishId: fishsc.fishId,
      //fishInfo.fishId[0],
      bulletId: self.node.getComponent("BulletCtrl").bulletId,
      //sendId: self.node.getComponent("BulletCtrl").userID,
      uid: self.node.getComponent("BulletCtrl").userID
    };

    if (false) //(self.node.getComponent("BulletCtrl").userID == playerinfo.playerId)
      {
        fishNet.fishSocket.emit('fishHit_board', JSON.stringify(mes));
      } else {
      fishNet.fishSocket.emit('fishHit', JSON.stringify(mes));
    }
  },
  _getActionByTag: function _getActionByTag(tag, target) {
    tag === cc.Action.TAG_INVALID && cc.logID(1004);

    var element = cc.director.getActionManager()._hashTargets[target._id];

    if (element) {
      if (null != element.actions) for (var i = 0; i < element.actions.length; ++i) {
        var action = element.actions[i];
        if (action && action.getTag() === tag) return action;
      }
    }

    return null;
  }
});

cc._RF.pop();