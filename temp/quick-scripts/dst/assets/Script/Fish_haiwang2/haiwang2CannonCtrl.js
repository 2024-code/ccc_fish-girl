
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Fish_haiwang2/haiwang2CannonCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eaa8axK0mZKlaU7OjthI2Iu', 'haiwang2CannonCtrl');
// Script/Fish_haiwang2/haiwang2CannonCtrl.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    seatID: 0,
    //座位号
    goldLbl: cc.Label,
    //金币显示
    nameLbl: cc.Label,
    //名字显示
    betLbl: cc.Label,
    //当前倍数显示
    cannonAnim: cc.Animation //大炮动画

  },
  onLoad: function onLoad() {
    this.cannonPos = this.node.convertToWorldSpaceAR(this.cannonAnim.node.position);
    this.fishMain = cc.find('Canvas').getComponent('Fishhaiwang2Main');
    this.fishMain.cannonList[this.seatID] = this;
    this.playerInfo = require('PlayerInfo').getInstant; //this.autoTime = 0;
  },
  onEnable: function onEnable() {
    this.dataInfo = this.fishMain.playerList[this.seatID];
    this.nameLbl.string = this.dataInfo.name;
    window.setHeadTexture(this.node.getChildByName('left').getChildByName('face').getChildByName('s1'), this.dataInfo.head); //this.goldLbl.string = this.dataInfo.score;
    //this.betLbl.string = this.fishMain.roomBet;

    this.betLbl.string = Helper.fixNum(this.fishMain.roomBet);
  },
  update: function update(dt) {
    this.goldLbl.string = Helper.fixNum(this.dataInfo.score);

    if (this.dataInfo.uid == this.playerInfo.playerId) {
      this.betLbl.string = Helper.fixNum(this.fishMain.roomBet * this.fishMain.bulletPower);

      if (this.fishMain.isLockFish) {
        this.node.getChildByName('suoding_effect').active = true;
      } else {
        this.node.getChildByName('suoding_effect').active = false;
      }
    } // if (this.autoTime>0){
    //     this.autoTime--;
    // };
    // if (this.autoTime>0)

  },
  bang: function bang(pos, bet, bid) {
    //需要区分上下  方向是反的
    var angle = 180 / (Math.PI / Math.atan((this.cannonPos.x - pos.x) / (this.cannonPos.y - pos.y)));
    this.cannonAnim.node.angle = this.seatID > 1 ? angle : -angle;
    this.cannonAnim.playAdditive("武器1_攻击状态"); //处理子弹发射

    var bullet = this.fishMain.getBullet();
    var bulletPos = this.fishMain.bulletBg.convertToNodeSpaceAR(this.cannonPos);
    bulletPos.x += 100 * Math.sin(-2 * Math.PI / 360 * this.cannonAnim.node.angle);
    bulletPos.y += 100 * Math.cos(-2 * Math.PI / 360 * this.cannonAnim.node.angle);
    bullet.getComponent('haiwang2BulletCtrl').init(this.fishMain, this.seatID, bulletPos, this.seatID > 1 ? angle - 180 : angle, this.fishMain.bulletPower);
    bullet.getComponent('haiwang2BulletCtrl').userID = this.dataInfo.uid;
    bullet.parent = this.fishMain.bulletBg;
    this.dataInfo.score -= this.fishMain.roomBet * bet;
    bullet.getComponent('haiwang2BulletCtrl').bulletId = bid; //console.log("onshoot: "+bid);
    //this.bulletPower = bet;

    this.betLbl.string = Helper.fixNum(this.fishMain.roomBet * bet);
    var bigfishid = this.fishMain.getBigFishId();

    if (this.fishMain.isLockFish) {
      bullet.getComponent('haiwang2BulletCtrl').autoId = bigfishid;
    }
  },
  addscore: function addscore(score) {
    this.dataInfo.score += score;
  },
  check_pan: function check_pan(fishType, score) {
    var labelBaseNode = this.node.getChildByName("zhuanpan").getChildByName("zp_di3");
    var labelNode = labelBaseNode.getChildByName("tray_fish_type_" + fishType);
    if (labelNode == null) return;
    this.node.getChildByName("zhuanpan").active = true;
    this.node.getChildByName("zhuanpan").stopAllActions();
    this.node.getChildByName("zhuanpan").runAction(cc.sequence(cc.show(), cc.delayTime(3), cc.hide()));

    for (var i in labelBaseNode.children) {
      var node = labelBaseNode.children[i];
      if (node == labelNode) node.active = true;else node.active = false;
    }

    this.node.getChildByName("zhuanpan").getChildByName("jiangjin").getComponent(cc.Label).string = Helper.fixNum(score);
  },
  onSkill: function onSkill(sid, score, time) {
    this.dataInfo.score -= score;

    if (sid == 1) {} else if (sid == 2) {
      this.skillTime[1] = time;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxGaXNoX2hhaXdhbmcyXFxoYWl3YW5nMkNhbm5vbkN0cmwuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzZWF0SUQiLCJnb2xkTGJsIiwiTGFiZWwiLCJuYW1lTGJsIiwiYmV0TGJsIiwiY2Fubm9uQW5pbSIsIkFuaW1hdGlvbiIsIm9uTG9hZCIsImNhbm5vblBvcyIsIm5vZGUiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwb3NpdGlvbiIsImZpc2hNYWluIiwiZmluZCIsImdldENvbXBvbmVudCIsImNhbm5vbkxpc3QiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJvbkVuYWJsZSIsImRhdGFJbmZvIiwicGxheWVyTGlzdCIsInN0cmluZyIsIm5hbWUiLCJ3aW5kb3ciLCJzZXRIZWFkVGV4dHVyZSIsImdldENoaWxkQnlOYW1lIiwiaGVhZCIsIkhlbHBlciIsImZpeE51bSIsInJvb21CZXQiLCJ1cGRhdGUiLCJkdCIsInNjb3JlIiwidWlkIiwicGxheWVySWQiLCJidWxsZXRQb3dlciIsImlzTG9ja0Zpc2giLCJhY3RpdmUiLCJiYW5nIiwicG9zIiwiYmV0IiwiYmlkIiwiYW5nbGUiLCJNYXRoIiwiUEkiLCJhdGFuIiwieCIsInkiLCJwbGF5QWRkaXRpdmUiLCJidWxsZXQiLCJnZXRCdWxsZXQiLCJidWxsZXRQb3MiLCJidWxsZXRCZyIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwic2luIiwiY29zIiwiaW5pdCIsInVzZXJJRCIsInBhcmVudCIsImJ1bGxldElkIiwiYmlnZmlzaGlkIiwiZ2V0QmlnRmlzaElkIiwiYXV0b0lkIiwiYWRkc2NvcmUiLCJjaGVja19wYW4iLCJmaXNoVHlwZSIsImxhYmVsQmFzZU5vZGUiLCJsYWJlbE5vZGUiLCJzdG9wQWxsQWN0aW9ucyIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwic2hvdyIsImRlbGF5VGltZSIsImhpZGUi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QUk2QyxHQUFHLElBQUksQ0FBWCxFQUFjLENBQ2IsQ0FERCxNQUNPLElBQUlBLEdBQUcsSUFBSSxDQUFYLEVBQWM7QUFDakIsV0FBS0UsU0FBTCxDQUFlLENBQWYsSUFBb0JELElBQXBCO0FBQ0g7QUFDSjtBQXhHSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNlYXRJRDogMCwgLy/luqfkvY3lj7dcclxuICAgICAgICBnb2xkTGJsOiBjYy5MYWJlbCwgLy/ph5HluIHmmL7npLpcclxuICAgICAgICBuYW1lTGJsOiBjYy5MYWJlbCwgLy/lkI3lrZfmmL7npLpcclxuICAgICAgICBiZXRMYmw6IGNjLkxhYmVsLCAvL+W9k+WJjeWAjeaVsOaYvuekulxyXG4gICAgICAgIGNhbm5vbkFuaW06IGNjLkFuaW1hdGlvbiwgLy/lpKfngq7liqjnlLtcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuY2Fubm9uUG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLmNhbm5vbkFuaW0ubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5maXNoTWFpbiA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnRmlzaGhhaXdhbmcyTWFpbicpO1xyXG4gICAgICAgIHRoaXMuZmlzaE1haW4uY2Fubm9uTGlzdFt0aGlzLnNlYXRJRF0gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoJ1BsYXllckluZm8nKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIC8vdGhpcy5hdXRvVGltZSA9IDA7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmRhdGFJbmZvID0gdGhpcy5maXNoTWFpbi5wbGF5ZXJMaXN0W3RoaXMuc2VhdElEXTtcclxuICAgICAgICB0aGlzLm5hbWVMYmwuc3RyaW5nID0gdGhpcy5kYXRhSW5mby5uYW1lO1xyXG4gICAgICAgIHdpbmRvdy5zZXRIZWFkVGV4dHVyZSh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xlZnQnKS5nZXRDaGlsZEJ5TmFtZSgnZmFjZScpLmdldENoaWxkQnlOYW1lKCdzMScpLCB0aGlzLmRhdGFJbmZvLmhlYWQpO1xyXG4gICAgICAgIC8vdGhpcy5nb2xkTGJsLnN0cmluZyA9IHRoaXMuZGF0YUluZm8uc2NvcmU7XHJcbiAgICAgICAgLy90aGlzLmJldExibC5zdHJpbmcgPSB0aGlzLmZpc2hNYWluLnJvb21CZXQ7XHJcbiAgICAgICAgdGhpcy5iZXRMYmwuc3RyaW5nID0gSGVscGVyLmZpeE51bSh0aGlzLmZpc2hNYWluLnJvb21CZXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICB0aGlzLmdvbGRMYmwuc3RyaW5nID0gSGVscGVyLmZpeE51bSh0aGlzLmRhdGFJbmZvLnNjb3JlKTtcclxuICAgICAgICBpZiAodGhpcy5kYXRhSW5mby51aWQgPT0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0TGJsLnN0cmluZyA9IEhlbHBlci5maXhOdW0odGhpcy5maXNoTWFpbi5yb29tQmV0ICogdGhpcy5maXNoTWFpbi5idWxsZXRQb3dlcik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5maXNoTWFpbi5pc0xvY2tGaXNoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3N1b2RpbmdfZWZmZWN0JykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc3VvZGluZ19lZmZlY3QnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuYXV0b1RpbWU+MCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYXV0b1RpbWUtLTtcclxuICAgICAgICAvLyB9O1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmF1dG9UaW1lPjApXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBiYW5nKHBvcywgYmV0LCBiaWQpIHtcclxuICAgICAgICAvL+mcgOimgeWMuuWIhuS4iuS4iyAg5pa55ZCR5piv5Y+N55qEXHJcbiAgICAgICAgbGV0IGFuZ2xlID0gMTgwIC8gKE1hdGguUEkgLyBNYXRoLmF0YW4oKHRoaXMuY2Fubm9uUG9zLnggLSBwb3MueCkgLyAodGhpcy5jYW5ub25Qb3MueSAtIHBvcy55KSkpO1xyXG4gICAgICAgIHRoaXMuY2Fubm9uQW5pbS5ub2RlLmFuZ2xlID0gdGhpcy5zZWF0SUQgPiAxID8gYW5nbGUgOiAtYW5nbGU7XHJcbiAgICAgICAgdGhpcy5jYW5ub25BbmltLnBsYXlBZGRpdGl2ZShcIuatpuWZqDFf5pS75Ye754q25oCBXCIpO1xyXG5cclxuICAgICAgICAvL+WkhOeQhuWtkOW8ueWPkeWwhFxyXG4gICAgICAgIGxldCBidWxsZXQgPSB0aGlzLmZpc2hNYWluLmdldEJ1bGxldCgpO1xyXG5cclxuICAgICAgICBsZXQgYnVsbGV0UG9zID0gdGhpcy5maXNoTWFpbi5idWxsZXRCZy5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLmNhbm5vblBvcyk7XHJcblxyXG4gICAgICAgIGJ1bGxldFBvcy54ICs9IDEwMCAqIE1hdGguc2luKC0yICogTWF0aC5QSSAvIDM2MCAqIHRoaXMuY2Fubm9uQW5pbS5ub2RlLmFuZ2xlKTtcclxuICAgICAgICBidWxsZXRQb3MueSArPSAxMDAgKiBNYXRoLmNvcygtMiAqIE1hdGguUEkgLyAzNjAgKiB0aGlzLmNhbm5vbkFuaW0ubm9kZS5hbmdsZSk7XHJcblxyXG4gICAgICAgIGJ1bGxldC5nZXRDb21wb25lbnQoJ2hhaXdhbmcyQnVsbGV0Q3RybCcpLmluaXQodGhpcy5maXNoTWFpbiwgdGhpcy5zZWF0SUQsIGJ1bGxldFBvcywgdGhpcy5zZWF0SUQgPiAxID8gYW5nbGUgLSAxODAgOiBhbmdsZSwgdGhpcy5maXNoTWFpbi5idWxsZXRQb3dlcik7XHJcbiAgICAgICAgYnVsbGV0LmdldENvbXBvbmVudCgnaGFpd2FuZzJCdWxsZXRDdHJsJykudXNlcklEID0gdGhpcy5kYXRhSW5mby51aWQ7XHJcbiAgICAgICAgYnVsbGV0LnBhcmVudCA9IHRoaXMuZmlzaE1haW4uYnVsbGV0Qmc7XHJcbiAgICAgICAgdGhpcy5kYXRhSW5mby5zY29yZSAtPSB0aGlzLmZpc2hNYWluLnJvb21CZXQgKiBiZXQ7XHJcbiAgICAgICAgYnVsbGV0LmdldENvbXBvbmVudCgnaGFpd2FuZzJCdWxsZXRDdHJsJykuYnVsbGV0SWQgPSBiaWQ7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIm9uc2hvb3Q6IFwiK2JpZCk7XHJcbiAgICAgICAgLy90aGlzLmJ1bGxldFBvd2VyID0gYmV0O1xyXG4gICAgICAgIHRoaXMuYmV0TGJsLnN0cmluZyA9IEhlbHBlci5maXhOdW0odGhpcy5maXNoTWFpbi5yb29tQmV0ICogYmV0KTtcclxuXHJcbiAgICAgICAgbGV0IGJpZ2Zpc2hpZCA9IHRoaXMuZmlzaE1haW4uZ2V0QmlnRmlzaElkKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpc2hNYWluLmlzTG9ja0Zpc2gpIHtcclxuICAgICAgICAgICAgYnVsbGV0LmdldENvbXBvbmVudCgnaGFpd2FuZzJCdWxsZXRDdHJsJykuYXV0b0lkID0gYmlnZmlzaGlkO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYWRkc2NvcmUoc2NvcmUpIHtcclxuICAgICAgICB0aGlzLmRhdGFJbmZvLnNjb3JlICs9IHNjb3JlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja19wYW4oZmlzaFR5cGUsIHNjb3JlKSB7XHJcbiAgICAgICAgdmFyIGxhYmVsQmFzZU5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aHVhbnBhblwiKS5nZXRDaGlsZEJ5TmFtZShcInpwX2RpM1wiKTtcclxuICAgICAgICB2YXIgbGFiZWxOb2RlID0gbGFiZWxCYXNlTm9kZS5nZXRDaGlsZEJ5TmFtZShcInRyYXlfZmlzaF90eXBlX1wiICsgZmlzaFR5cGUpO1xyXG4gICAgICAgIGlmIChsYWJlbE5vZGUgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInpodWFucGFuXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiemh1YW5wYW5cIikuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aHVhbnBhblwiKS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2hvdygpLCBjYy5kZWxheVRpbWUoMyksIGNjLmhpZGUoKSkpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpIGluIGxhYmVsQmFzZU5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBsYWJlbEJhc2VOb2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAobm9kZSA9PSBsYWJlbE5vZGUpIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZSBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aHVhbnBhblwiKS5nZXRDaGlsZEJ5TmFtZShcImppYW5namluXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVscGVyLmZpeE51bShzY29yZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uU2tpbGwoc2lkLCBzY29yZSwgdGltZSkge1xyXG4gICAgICAgIHRoaXMuZGF0YUluZm8uc2NvcmUgLT0gc2NvcmU7XHJcbiAgICAgICAgaWYgKHNpZCA9PSAxKSB7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzaWQgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsVGltZVsxXSA9IHRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7Il19