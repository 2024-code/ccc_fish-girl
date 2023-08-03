
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Fish_haiwang2/Fishhaiwang2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1f9cdLrRZ9KDYtmzLsj3ZTc', 'Fishhaiwang2');
// Script/Fish_haiwang2/Fishhaiwang2.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  fishInit: function fishInit() {
    this.fishMain = null;
    this.fishID = 0;
    this.fishType = 0;
    this.offset = cc.v2(0, 0);
    this.activity = false;
    this.dead = false;
  },
  onDie: function onDie() {
    var _this = this;

    var anim = this.node.getComponent(cc.Animation);
    anim.play(anim._clips[1]._name);
    this.node.getComponent(cc.BoxCollider).enabled = false;
    this.scheduleOnce(function () {
      _this.node.removeFromParent();
    }, 1);
  },
  update: function update() {
    if (this.last_pos == undefined) {
      this.last_pos = this.node.position;
      return;
    }

    if (this.last_pos.x == this.node.position.x && this.last_pos.y == this.node.position.y) {
      return;
    }

    var startPos = this.last_pos;
    var endPos = this.node.position;
    var dirVec = endPos.sub(startPos); //获得从startPos指向endPos的方向向量

    var comVec = new cc.v2(0, 1); //计算夹角的参考方向，这里选择x轴正方向

    var radian = cc.v2(dirVec).signAngle(comVec); //获得带方向的夹角弧度值(参考方向顺时针为正值，逆时针为负值)

    var degree = Math.floor(cc.misc.radiansToDegrees(radian)); // this.node.rotation = degree;

    this.node.angle = -degree;

    if (!this.rot_setted) {
      this.rot_setted = true;

      if (degree > 180 || degree > -180 && degree < 0) {
        this.node.scaleX = -1;
        this.node.getChildByName("tip") && (this.node.getChildByName("tip").scaleX = -1);
      }
    }

    this.last_pos = this.node.position;
  },
  // BirdCreat_function: function(e, t, i, n, o, a, s, c, r) {
  //     this.birdID = e,
  //     this.birdType = t,
  //     this.node.opacity = 255,
  //     this.node.scale = 1.8,
  //     this.positionArray = null,
  //     26 === t ? r += "+": r = "",
  //     this.node.getChildByName("id").getComponent("cc.Label").string = r,
  //     this.LoadPath_Function(i, n, o, a, s, c)
  // },
  // LoadPath_Function: function(e, t, i, n, o, a) {
  //     var s = cc.p(0, 0),
  //     c = 0;
  //     if (this.positionArray = new Array(i[e].length), t < 2) for (c = 0; c < this.positionArray.length; ++c) s = cc.p(0, 0),
  //     s.x = i[e][c][0] * a * 1.1 - n.x,
  //     s.y = i[e][c][1] * a * 1.1 - n.y,
  //     this.positionArray[c] = s;
  //     else for (c = 0; c < this.positionArray.length; ++c) s = cc.p(0, 0),
  //     s.x = i[e][c][0] * a * 1.1 - n.x,
  //     s.y = i[e][c][1] * a * 1.1 * -1 - n.y,
  //     this.positionArray[c] = s;
  //     this.BirdRun_Function(o)
  // },
  // BirdRun_Function: function(e) {
  //     this.node.setPosition(this.positionArray[0]),
  //     this.lastP = cc.p(0, 0),
  //     this.currentP = cc.p(0, 0);
  //     var t;
  //     t = e === !0 ? cc.cardinalSplineTo(this.node.parent.parent.getComponent("GameMain").fishWaveMoveTime, this.positionArray, -.5) : cc.cardinalSplineTo(this.node.parent.parent.getComponent("GameMain").moveTime[this.birdType], this.positionArray, -.5);
  //     var i = cc.sequence(t, cc.callFunc(function() {
  //         this.deaded = !0,
  //         this.dying = !1,
  //         this.activity = !1,
  //         this.existence ? (this.turn.destroy(), this.existence = !1) : this.Halo ? (this.PHalo.destroy(), this.Halo = !1) : this.TQ ? (this.toadquan.destroy(), this.TQ = !1) : this.PL && (this.p_Label.destroy(), this.PL = !1, this.node.parent.parent.getComponent("GameMain").pen = null);
  //         for (var e = 0; e < this.node.parent.parent.getComponent("GameMain").birdArray.length; e++) this.node.parent.parent.getComponent("GameMain").birdArray[e] == this.node && this.node.parent.parent.getComponent("GameMain").birdArray.splice(e, 1);
  //         this.node.parent.parent.getComponent("GameMain").FishPool.put(this.node)
  //     },
  //     this));
  //     this.node.runAction(i),
  //     18 === this.birdType || 19 === this.birdType || 20 === this.birdType ? (this.turn = cc.instantiate(this.turntable), this.node.parent.addChild(this.turn, -1), this.turn.setPosition(this.node.getPosition()), this.existence = !0) : 15 === this.birdType || 16 === this.birdType || 17 === this.birdType ? (this.PHalo = cc.instantiate(this.Pb_Halo), this.node.parent.addChild(this.PHalo, -1), this.PHalo.setPosition(this.node.getPosition()), this.Halo = !0) : 23 === this.birdType ? (this.p_Label = cc.instantiate(this.pen_Label), this.node.addChild(this.p_Label), this.PL = !0, this.p_Label.getComponent("cc.Label").string = this.node.parent.parent.getComponent("GameMain").pool) : 24 === this.birdType && (this.toadquan = cc.instantiate(this.pb_toadquan), this.node.parent.addChild(this.toadquan, -1), this.toadquan.setPosition(this.node.getPosition()), this.TQ = !0),
  //     this.getComponent("cc.Animation").play("move" + this.birdType),
  //     this.deaded = !1,
  //     this.dying = !1,
  //     this.activity = !0
  // },
  // Rotation_function: function() {
  //     this.currentP = this.node.getPosition();
  //     var e = this.currentP.sub(this.lastP),
  //     t = cc.pToAngle(e) / Math.PI * 180;
  //     if (this.node.rotation = -t, this.lastP = this.currentP, 18 === this.birdType || 19 === this.birdType || 20 === this.birdType) {
  //         var i = this.node.getPosition().x + 10 * Math.cos(cc.pToAngle(e)),
  //         n = this.node.getPosition().y + 10 * Math.sin(cc.pToAngle(e));
  //         this.turn.setPosition(i, n)
  //     } else 15 === this.birdType || 16 === this.birdType || 17 === this.birdType ? this.PHalo.setPosition(this.node.getPosition()) : 23 === this.birdType || 25 === this.birdType ? this.node.rotation = 0 : 24 === this.birdType ? this.toadquan.setPosition(this.node.getPosition()) : 26 === this.birdType && (this.node.rotation = 0)
  // },
  // CountDeadAnimationTimes_Function: function(e) {
  //     this.deadAnimationTimes += e,
  //     this.deadAnimationTimes > 1 && (this.node.stopAllActions(), this.playDeadAnimation = !1, this.dying = !1, this.deaded = !0, this.activity = !1, this.deadAnimationTimes = 0, this.existence ? (this.turn.destroy(), this.existence = !1) : this.Halo ? (this.PHalo.destroy(), this.Halo = !1) : this.TQ ? (this.toadquan.destroy(), this.TQ = !1) : this.PL && (this.p_Label.destroy(), this.PL = !1, this.node.parent.parent.getComponent("GameMain").pen = null), this.node.getComponent("cc.Animation").stop(), this.node.parent.parent.getComponent("GameMain").FishPool.put(this.node))
  // },
  // playDeadAnimation_Function: function(e) {
  //     this.node.getComponent("cc.Animation").play("dead" + this.birdType),
  //     this.playDeadAnimation = !0
  // },
  // countColorChange_Function: function(e) {
  //     this.time >= .3 ? (this.time = 0, this.colorChange = !1, this.node.color = cc.Color.WHITE, this.existence ? this.turn.color = cc.Color.WHITE: this.Halo ? this.PHalo.color = cc.Color.WHITE: this.TQ && (this.toadquan.color = cc.Color.WHITE)) : this.time += e
  // },
  // update: function(e) { ! this.activity || this.deaded || this.dying || this.Rotation_function(),
  //     this.dying && this.CountDeadAnimationTimes_Function(e),
  //     this.colorChange && this.countColorChange_Function(e)
  // }
  executeMove: function executeMove() {
    var pos_arr = [];

    for (var i = this.pathIndex; i < this.pathIndex + 3; i++) {
      if (i >= this.pathArr.length) break;
      pos_arr.push(cc.v2(this.pathArr[i][0], this.pathArr[i][1]).add(this.offset));
    }

    var path = cc.find('Canvas').getComponent("Fishhaiwang2Path");

    if (pos_arr.length == 0) {
      this.node.destroy();
    } else if (pos_arr.length == 3) {
      var t = path.waveMoveTime;

      if (this.fishInfo.fishLineup != 0) {
        t = path.moveTime[this.fishInfo.fishType];
      }

      var bezierTo = cc.bezierTo(t, pos_arr);
      var finish = cc.callFunc(this.executeMove, this);
      this.node.runAction(cc.sequence(bezierTo, finish));
      this.pathIndex += 3;
    } else {
      var t = path.waveMoveTime;

      if (this.fishInfo.fishLineup != 0) {
        t = path.moveTime[this.fishInfo.fishType];
      }

      var move = cc.moveTo(t / 3, pos_arr[0]);
      var finish = cc.callFunc(this.executeMove, this);
      this.node.runAction(cc.sequence(move, finish));
      this.pathIndex++;
    }
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxGaXNoX2hhaXdhbmcyXFxGaXNoaGFpd2FuZzIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJmaXNoSW5pdCIsImZpc2hNYWluIiwiZmlzaElEIiwiZmlzaFR5cGUiLCJvZmZzZXQiLCJ2MiIsImFjdGl2aXR5IiwiZGVhZCIsIm9uRGllIiwiYW5pbSIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJBbmltYXRpb24iLCJwbGF5IiwiX2NsaXBzIiwiX25hbWUiLCJCb3hDb2xsaWRlciIsImVuYWJsZWQiLCJzY2hlZHVsZU9uY2UiLCJyZW1vdmVGcm9tUGFyZW50IiwidXBkYXRlIiwibGFzdF9wb3MiLCJ1bmRlZmluZWQiLCJwb3NpdGlvbiIsIngiLCJ5Iiwic3RhcnRQb3MiLCJlbmRQb3MiLCJkaXJWZWMiLCJzdWIiLCJjb21WZWMiLCJyYWRpYW4iLCJzaWduQW5nbGUiLCJkZWdyZWUiLCJNYXRoIiwiZmxvb3IiLCJtaXNjIiwicmFkaWFuc1RvRGVncmVlcyIsImFuZ2xlIiwicm90X3NldHRlZCIsInNjYWxlWCIsImdldENoaWxkQnlOYW1lIiwiZXhlY3V0ZU1vdmUiLCJwb3NfYXJyIiwiaSIsInBhdGhJbmRleCIsInBhdGhBcnIiLCJsZW5ndGgiLCJwdXNoIiwiYWRkIiwicGF0aCIsImZpbmQiLCJkZXN0cm95IiwidCIsIndhdmVNb3ZlVGltZSIsImZpc2hJbmZvIiwiZmlzaExpbmV1cCIsIm1vdmVUaW1lIiwiYmV6aWVyVG8iLCJmaW5pc2giLCJjYWxsRnVuYyIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwibW92ZSIsIm1vdmVUbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTEMsRUFBQUEsUUFQSyxzQkFPTTtBQUNQLFNB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ICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZmlzaEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5maXNoTWFpbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5maXNoSUQgPSAwO1xyXG4gICAgICAgIHRoaXMuZmlzaFR5cGUgPSAwO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpZSgpIHtcclxuICAgICAgICBsZXQgYW5pbSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICBhbmltLnBsYXkoYW5pbS5fY2xpcHNbMV0uX25hbWUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQm94Q29sbGlkZXIpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5sYXN0X3BvcyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0X3BvcyA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubGFzdF9wb3MueCA9PSB0aGlzLm5vZGUucG9zaXRpb24ueCAmJiB0aGlzLmxhc3RfcG9zLnkgPT0gdGhpcy5ub2RlLnBvc2l0aW9uLnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0UG9zID0gdGhpcy5sYXN0X3BvcztcclxuICAgICAgICB2YXIgZW5kUG9zID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG5cclxuICAgICAgICBsZXQgZGlyVmVjID0gZW5kUG9zLnN1YihzdGFydFBvcyk7Ly/ojrflvpfku45zdGFydFBvc+aMh+WQkWVuZFBvc+eahOaWueWQkeWQkemHj1xyXG4gICAgICAgIGxldCBjb21WZWMgPSBuZXcgY2MudjIoMCwgMSk7Ly/orqHnrpflpLnop5LnmoTlj4LogIPmlrnlkJHvvIzov5nph4zpgInmi6l46L205q2j5pa55ZCRXHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IGNjLnYyKGRpclZlYykuc2lnbkFuZ2xlKGNvbVZlYyk7Ly/ojrflvpfluKbmlrnlkJHnmoTlpLnop5LlvKfluqblgLwo5Y+C6ICD5pa55ZCR6aG65pe26ZKI5Li65q2j5YC877yM6YCG5pe26ZKI5Li66LSf5YC8KVxyXG4gICAgICAgIGxldCBkZWdyZWUgPSBNYXRoLmZsb29yKGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW4pKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLnJvdGF0aW9uID0gZGVncmVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IC1kZWdyZWU7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5yb3Rfc2V0dGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm90X3NldHRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChkZWdyZWUgPiAxODAgfHwgKGRlZ3JlZSA+IC0xODAgJiYgZGVncmVlIDwgMCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAtMTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpcFwiKSAmJiAodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGlwXCIpLnNjYWxlWCA9IC0xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYXN0X3BvcyA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgIH0sXHJcbiAgICAvLyBCaXJkQ3JlYXRfZnVuY3Rpb246IGZ1bmN0aW9uKGUsIHQsIGksIG4sIG8sIGEsIHMsIGMsIHIpIHtcclxuICAgIC8vICAgICB0aGlzLmJpcmRJRCA9IGUsXHJcbiAgICAvLyAgICAgdGhpcy5iaXJkVHlwZSA9IHQsXHJcbiAgICAvLyAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTUsXHJcbiAgICAvLyAgICAgdGhpcy5ub2RlLnNjYWxlID0gMS44LFxyXG4gICAgLy8gICAgIHRoaXMucG9zaXRpb25BcnJheSA9IG51bGwsXHJcbiAgICAvLyAgICAgMjYgPT09IHQgPyByICs9IFwiK1wiOiByID0gXCJcIixcclxuICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpZFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSByLFxyXG4gICAgLy8gICAgIHRoaXMuTG9hZFBhdGhfRnVuY3Rpb24oaSwgbiwgbywgYSwgcywgYylcclxuICAgIC8vIH0sXHJcbiAgICAvLyBMb2FkUGF0aF9GdW5jdGlvbjogZnVuY3Rpb24oZSwgdCwgaSwgbiwgbywgYSkge1xyXG4gICAgLy8gICAgIHZhciBzID0gY2MucCgwLCAwKSxcclxuICAgIC8vICAgICBjID0gMDtcclxuICAgIC8vICAgICBpZiAodGhpcy5wb3NpdGlvbkFycmF5ID0gbmV3IEFycmF5KGlbZV0ubGVuZ3RoKSwgdCA8IDIpIGZvciAoYyA9IDA7IGMgPCB0aGlzLnBvc2l0aW9uQXJyYXkubGVuZ3RoOyArK2MpIHMgPSBjYy5wKDAsIDApLFxyXG4gICAgLy8gICAgIHMueCA9IGlbZV1bY11bMF0gKiBhICogMS4xIC0gbi54LFxyXG4gICAgLy8gICAgIHMueSA9IGlbZV1bY11bMV0gKiBhICogMS4xIC0gbi55LFxyXG4gICAgLy8gICAgIHRoaXMucG9zaXRpb25BcnJheVtjXSA9IHM7XHJcbiAgICAvLyAgICAgZWxzZSBmb3IgKGMgPSAwOyBjIDwgdGhpcy5wb3NpdGlvbkFycmF5Lmxlbmd0aDsgKytjKSBzID0gY2MucCgwLCAwKSxcclxuICAgIC8vICAgICBzLnggPSBpW2VdW2NdWzBdICogYSAqIDEuMSAtIG4ueCxcclxuICAgIC8vICAgICBzLnkgPSBpW2VdW2NdWzFdICogYSAqIDEuMSAqIC0xIC0gbi55LFxyXG4gICAgLy8gICAgIHRoaXMucG9zaXRpb25BcnJheVtjXSA9IHM7XHJcbiAgICAvLyAgICAgdGhpcy5CaXJkUnVuX0Z1bmN0aW9uKG8pXHJcbiAgICAvLyB9LFxyXG4gICAgLy8gQmlyZFJ1bl9GdW5jdGlvbjogZnVuY3Rpb24oZSkge1xyXG4gICAgLy8gICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLnBvc2l0aW9uQXJyYXlbMF0pLFxyXG4gICAgLy8gICAgIHRoaXMubGFzdFAgPSBjYy5wKDAsIDApLFxyXG4gICAgLy8gICAgIHRoaXMuY3VycmVudFAgPSBjYy5wKDAsIDApO1xyXG4gICAgLy8gICAgIHZhciB0O1xyXG4gICAgLy8gICAgIHQgPSBlID09PSAhMCA/IGNjLmNhcmRpbmFsU3BsaW5lVG8odGhpcy5ub2RlLnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiR2FtZU1haW5cIikuZmlzaFdhdmVNb3ZlVGltZSwgdGhpcy5wb3NpdGlvbkFycmF5LCAtLjUpIDogY2MuY2FyZGluYWxTcGxpbmVUbyh0aGlzLm5vZGUucGFyZW50LnBhcmVudC5nZXRDb21wb25lbnQoXCJHYW1lTWFpblwiKS5tb3ZlVGltZVt0aGlzLmJpcmRUeXBlXSwgdGhpcy5wb3NpdGlvbkFycmF5LCAtLjUpO1xyXG4gICAgLy8gICAgIHZhciBpID0gY2Muc2VxdWVuY2UodCwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuZGVhZGVkID0gITAsXHJcbiAgICAvLyAgICAgICAgIHRoaXMuZHlpbmcgPSAhMSxcclxuICAgIC8vICAgICAgICAgdGhpcy5hY3Rpdml0eSA9ICExLFxyXG4gICAgLy8gICAgICAgICB0aGlzLmV4aXN0ZW5jZSA/ICh0aGlzLnR1cm4uZGVzdHJveSgpLCB0aGlzLmV4aXN0ZW5jZSA9ICExKSA6IHRoaXMuSGFsbyA/ICh0aGlzLlBIYWxvLmRlc3Ryb3koKSwgdGhpcy5IYWxvID0gITEpIDogdGhpcy5UUSA/ICh0aGlzLnRvYWRxdWFuLmRlc3Ryb3koKSwgdGhpcy5UUSA9ICExKSA6IHRoaXMuUEwgJiYgKHRoaXMucF9MYWJlbC5kZXN0cm95KCksIHRoaXMuUEwgPSAhMSwgdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiR2FtZU1haW5cIikucGVuID0gbnVsbCk7XHJcbiAgICAvLyAgICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiR2FtZU1haW5cIikuYmlyZEFycmF5Lmxlbmd0aDsgZSsrKSB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5nZXRDb21wb25lbnQoXCJHYW1lTWFpblwiKS5iaXJkQXJyYXlbZV0gPT0gdGhpcy5ub2RlICYmIHRoaXMubm9kZS5wYXJlbnQucGFyZW50LmdldENvbXBvbmVudChcIkdhbWVNYWluXCIpLmJpcmRBcnJheS5zcGxpY2UoZSwgMSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQucGFyZW50LmdldENvbXBvbmVudChcIkdhbWVNYWluXCIpLkZpc2hQb29sLnB1dCh0aGlzLm5vZGUpXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICB0aGlzKSk7XHJcbiAgICAvLyAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihpKSxcclxuICAgIC8vICAgICAxOCA9PT0gdGhpcy5iaXJkVHlwZSB8fCAxOSA9PT0gdGhpcy5iaXJkVHlwZSB8fCAyMCA9PT0gdGhpcy5iaXJkVHlwZSA/ICh0aGlzLnR1cm4gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnR1cm50YWJsZSksIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGhpcy50dXJuLCAtMSksIHRoaXMudHVybi5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSksIHRoaXMuZXhpc3RlbmNlID0gITApIDogMTUgPT09IHRoaXMuYmlyZFR5cGUgfHwgMTYgPT09IHRoaXMuYmlyZFR5cGUgfHwgMTcgPT09IHRoaXMuYmlyZFR5cGUgPyAodGhpcy5QSGFsbyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUGJfSGFsbyksIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGhpcy5QSGFsbywgLTEpLCB0aGlzLlBIYWxvLnNldFBvc2l0aW9uKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKSwgdGhpcy5IYWxvID0gITApIDogMjMgPT09IHRoaXMuYmlyZFR5cGUgPyAodGhpcy5wX0xhYmVsID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZW5fTGFiZWwpLCB0aGlzLm5vZGUuYWRkQ2hpbGQodGhpcy5wX0xhYmVsKSwgdGhpcy5QTCA9ICEwLCB0aGlzLnBfTGFiZWwuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiR2FtZU1haW5cIikucG9vbCkgOiAyNCA9PT0gdGhpcy5iaXJkVHlwZSAmJiAodGhpcy50b2FkcXVhbiA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGJfdG9hZHF1YW4pLCB0aGlzLm5vZGUucGFyZW50LmFkZENoaWxkKHRoaXMudG9hZHF1YW4sIC0xKSwgdGhpcy50b2FkcXVhbi5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSksIHRoaXMuVFEgPSAhMCksXHJcbiAgICAvLyAgICAgdGhpcy5nZXRDb21wb25lbnQoXCJjYy5BbmltYXRpb25cIikucGxheShcIm1vdmVcIiArIHRoaXMuYmlyZFR5cGUpLFxyXG4gICAgLy8gICAgIHRoaXMuZGVhZGVkID0gITEsXHJcbiAgICAvLyAgICAgdGhpcy5keWluZyA9ICExLFxyXG4gICAgLy8gICAgIHRoaXMuYWN0aXZpdHkgPSAhMFxyXG4gICAgLy8gfSxcclxuICAgIC8vIFJvdGF0aW9uX2Z1bmN0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICB0aGlzLmN1cnJlbnRQID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAvLyAgICAgdmFyIGUgPSB0aGlzLmN1cnJlbnRQLnN1Yih0aGlzLmxhc3RQKSxcclxuICAgIC8vICAgICB0ID0gY2MucFRvQW5nbGUoZSkgLyBNYXRoLlBJICogMTgwO1xyXG4gICAgLy8gICAgIGlmICh0aGlzLm5vZGUucm90YXRpb24gPSAtdCwgdGhpcy5sYXN0UCA9IHRoaXMuY3VycmVudFAsIDE4ID09PSB0aGlzLmJpcmRUeXBlIHx8IDE5ID09PSB0aGlzLmJpcmRUeXBlIHx8IDIwID09PSB0aGlzLmJpcmRUeXBlKSB7XHJcbiAgICAvLyAgICAgICAgIHZhciBpID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkueCArIDEwICogTWF0aC5jb3MoY2MucFRvQW5nbGUoZSkpLFxyXG4gICAgLy8gICAgICAgICBuID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkueSArIDEwICogTWF0aC5zaW4oY2MucFRvQW5nbGUoZSkpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnR1cm4uc2V0UG9zaXRpb24oaSwgbilcclxuICAgIC8vICAgICB9IGVsc2UgMTUgPT09IHRoaXMuYmlyZFR5cGUgfHwgMTYgPT09IHRoaXMuYmlyZFR5cGUgfHwgMTcgPT09IHRoaXMuYmlyZFR5cGUgPyB0aGlzLlBIYWxvLnNldFBvc2l0aW9uKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKSA6IDIzID09PSB0aGlzLmJpcmRUeXBlIHx8IDI1ID09PSB0aGlzLmJpcmRUeXBlID8gdGhpcy5ub2RlLnJvdGF0aW9uID0gMCA6IDI0ID09PSB0aGlzLmJpcmRUeXBlID8gdGhpcy50b2FkcXVhbi5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSkgOiAyNiA9PT0gdGhpcy5iaXJkVHlwZSAmJiAodGhpcy5ub2RlLnJvdGF0aW9uID0gMClcclxuICAgIC8vIH0sXHJcbiAgICAvLyBDb3VudERlYWRBbmltYXRpb25UaW1lc19GdW5jdGlvbjogZnVuY3Rpb24oZSkge1xyXG4gICAgLy8gICAgIHRoaXMuZGVhZEFuaW1hdGlvblRpbWVzICs9IGUsXHJcbiAgICAvLyAgICAgdGhpcy5kZWFkQW5pbWF0aW9uVGltZXMgPiAxICYmICh0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKSwgdGhpcy5wbGF5RGVhZEFuaW1hdGlvbiA9ICExLCB0aGlzLmR5aW5nID0gITEsIHRoaXMuZGVhZGVkID0gITAsIHRoaXMuYWN0aXZpdHkgPSAhMSwgdGhpcy5kZWFkQW5pbWF0aW9uVGltZXMgPSAwLCB0aGlzLmV4aXN0ZW5jZSA/ICh0aGlzLnR1cm4uZGVzdHJveSgpLCB0aGlzLmV4aXN0ZW5jZSA9ICExKSA6IHRoaXMuSGFsbyA/ICh0aGlzLlBIYWxvLmRlc3Ryb3koKSwgdGhpcy5IYWxvID0gITEpIDogdGhpcy5UUSA/ICh0aGlzLnRvYWRxdWFuLmRlc3Ryb3koKSwgdGhpcy5UUSA9ICExKSA6IHRoaXMuUEwgJiYgKHRoaXMucF9MYWJlbC5kZXN0cm95KCksIHRoaXMuUEwgPSAhMSwgdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiR2FtZU1haW5cIikucGVuID0gbnVsbCksIHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJjYy5BbmltYXRpb25cIikuc3RvcCgpLCB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5nZXRDb21wb25lbnQoXCJHYW1lTWFpblwiKS5GaXNoUG9vbC5wdXQodGhpcy5ub2RlKSlcclxuICAgIC8vIH0sXHJcbiAgICAvLyBwbGF5RGVhZEFuaW1hdGlvbl9GdW5jdGlvbjogZnVuY3Rpb24oZSkge1xyXG4gICAgLy8gICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJjYy5BbmltYXRpb25cIikucGxheShcImRlYWRcIiArIHRoaXMuYmlyZFR5cGUpLFxyXG4gICAgLy8gICAgIHRoaXMucGxheURlYWRBbmltYXRpb24gPSAhMFxyXG4gICAgLy8gfSxcclxuICAgIC8vIGNvdW50Q29sb3JDaGFuZ2VfRnVuY3Rpb246IGZ1bmN0aW9uKGUpIHtcclxuICAgIC8vICAgICB0aGlzLnRpbWUgPj0gLjMgPyAodGhpcy50aW1lID0gMCwgdGhpcy5jb2xvckNoYW5nZSA9ICExLCB0aGlzLm5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURSwgdGhpcy5leGlzdGVuY2UgPyB0aGlzLnR1cm4uY29sb3IgPSBjYy5Db2xvci5XSElURTogdGhpcy5IYWxvID8gdGhpcy5QSGFsby5jb2xvciA9IGNjLkNvbG9yLldISVRFOiB0aGlzLlRRICYmICh0aGlzLnRvYWRxdWFuLmNvbG9yID0gY2MuQ29sb3IuV0hJVEUpKSA6IHRoaXMudGltZSArPSBlXHJcbiAgICAvLyB9LFxyXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbihlKSB7ICEgdGhpcy5hY3Rpdml0eSB8fCB0aGlzLmRlYWRlZCB8fCB0aGlzLmR5aW5nIHx8IHRoaXMuUm90YXRpb25fZnVuY3Rpb24oKSxcclxuICAgIC8vICAgICB0aGlzLmR5aW5nICYmIHRoaXMuQ291bnREZWFkQW5pbWF0aW9uVGltZXNfRnVuY3Rpb24oZSksXHJcbiAgICAvLyAgICAgdGhpcy5jb2xvckNoYW5nZSAmJiB0aGlzLmNvdW50Q29sb3JDaGFuZ2VfRnVuY3Rpb24oZSlcclxuICAgIC8vIH1cclxuXHJcbiAgICBleGVjdXRlTW92ZSgpIHtcclxuICAgICAgICB2YXIgcG9zX2FyciA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnBhdGhJbmRleDsgaSA8IHRoaXMucGF0aEluZGV4ICsgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID49IHRoaXMucGF0aEFyci5sZW5ndGgpIGJyZWFrO1xyXG4gICAgICAgICAgICBwb3NfYXJyLnB1c2goY2MudjIodGhpcy5wYXRoQXJyW2ldWzBdLCB0aGlzLnBhdGhBcnJbaV1bMV0pLmFkZCh0aGlzLm9mZnNldCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHBhdGggPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoXCJGaXNoaGFpd2FuZzJQYXRoXCIpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHBvc19hcnIubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBvc19hcnIubGVuZ3RoID09IDMpIHtcclxuICAgICAgICAgICAgdmFyIHQgPSBwYXRoLndhdmVNb3ZlVGltZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlzaEluZm8uZmlzaExpbmV1cCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0ID0gcGF0aC5tb3ZlVGltZVt0aGlzLmZpc2hJbmZvLmZpc2hUeXBlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYmV6aWVyVG8gPSBjYy5iZXppZXJUbyh0LCBwb3NfYXJyKTtcclxuICAgICAgICAgICAgdmFyIGZpbmlzaCA9IGNjLmNhbGxGdW5jKHRoaXMuZXhlY3V0ZU1vdmUsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGJlemllclRvLCBmaW5pc2gpKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRoSW5kZXggKz0gMztcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdmFyIHQgPSBwYXRoLndhdmVNb3ZlVGltZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlzaEluZm8uZmlzaExpbmV1cCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0ID0gcGF0aC5tb3ZlVGltZVt0aGlzLmZpc2hJbmZvLmZpc2hUeXBlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbW92ZSA9IGNjLm1vdmVUbyh0IC8gMywgcG9zX2FyclswXSk7XHJcbiAgICAgICAgICAgIHZhciBmaW5pc2ggPSBjYy5jYWxsRnVuYyh0aGlzLmV4ZWN1dGVNb3ZlLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShtb3ZlLCBmaW5pc2gpKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRoSW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTsiXX0=