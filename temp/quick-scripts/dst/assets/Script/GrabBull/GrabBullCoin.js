
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GrabBull/GrabBullCoin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9ba98Pne89I2ZTLwMNqrIer', 'GrabBullCoin');
// Script/GrabBull/GrabBullCoin.js

"use strict";

/**
 * 抢庄牛牛金币显示
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    type: 0,
    flyFinish: false,
    timeCount: 0
  },
  onLoad: function onLoad() {},

  /**
   * 
   * @param {*} index 
   */
  setFrame_Function: function setFrame_Function(index) {
    this.node.getComponent("cc.Sprite").spriteFrame = this.sp_CoinSprite[index];
  },

  /**
   * 获得范围随机数
   * @param {*} min 
   * @param {*} max 
   */
  getRandom_Function: function getRandom_Function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  /**
   * 金币从输家位置飞到庄家位置
   * @param {*} losePlayer 
   * @param {*} bankerPlayer 
   * @param {*} delayTime 
   */
  setCoinToBanker_Function: function setCoinToBanker_Function(losePlayer, bankerPlayer, delayTime) {
    this.node.setPosition(losePlayer.x, losePlayer.y);
    var move = cc.moveTo(.05 + .01 * delayTime, bankerPlayer.x + this.getRandom_Function(-30, 30), bankerPlayer.y + this.getRandom_Function(-30, 30));
    var action = cc.sequence(move, cc.callFunc(function () {
      this.flyFinish = true;
      this.timeCount = 0;
    }, this));
    this.node.runAction(action);
  },

  /**
   * 金币从庄家位置飞到赢家位置
   * @param {*} bankerPlayer 
   * @param {*} winPlayer 
   * @param {*} delayTime 
   */
  setCoinToPlayer_Function: function setCoinToPlayer_Function(bankerPlayer, winPlayer, delayTime) {
    this.node.setPosition(winPlayer.x, winPlayer.y);
    var move = cc.moveTo(.05 + .01 * delayTime, bankerPlayer.x + this.getRandom_Function(-30, 30), bankerPlayer.y + this.getRandom_Function(-30, 30));
    var action = cc.sequence(move, cc.callFunc(function () {
      this.flyFinish = true;
      this.timeCount = 0;
    }, this));
    this.node.runAction(action);
  },

  /**
   * 更新
   * @param {*} dt 
   */
  update: function update(dt) {
    if (this.node.active && this.flyFinish) {
      if (this.timeCount < .4) {
        this.timeCount += dt;
      } else {
        this.timeCount = 0;
        this.node.active = false;
        this.flyFinish = false;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHcmFiQnVsbFxcR3JhYkJ1bGxDb2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidHlwZSIsImZseUZpbmlzaCIsInRpbWVDb3VudCIsIm9uTG9hZCIsInNldEZyYW1lX0Z1bmN0aW9uIiwiaW5kZXgiLCJub2RlIiwiZ2V0Q29tcG9uZW50Iiwic3ByaXRlRnJhbWUiLCJzcF9Db2luU3ByaXRlIiwiZ2V0UmFuZG9tX0Z1bmN0aW9uIiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic2V0Q29pblRvQmFua2VyX0Z1bmN0aW9uIiwibG9zZVBsYXllciIsImJhbmtlclBsYXllciIsImRlbGF5VGltZSIsInNldFBvc2l0aW9uIiwieCIsInkiLCJtb3ZlIiwibW92ZVRvIiwiYWN0aW9uIiwic2VxdWVuY2UiLCJjYWxsRnVuYyIsInJ1bkFjdGlvbiIsInNldENvaW5Ub1BsYXllcl9GdW5jdGlvbiIsIndpblBsYXllciIsInVwZGF0ZSIsImR0IiwiYWN0aXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFFLENBREU7QUFFUkMsSUFBQUEsU0FBUyxFQUFFLEtBRkg7QUFHUkMsSUFBQUEsU0FBUyxFQUFFO0FBSEgsR0FIUDtBQVFMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVcsQ0FBRSxDQVJoQjs7QUFVTDtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxpQkFBaUIsRUFBRSwyQkFBU0MsS0FBVCxFQUFnQjtBQUMvQixTQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsV0FBdkIsRUFBb0NDLFdBQXBDLEdBQWtELEtBQUtDLGFBQUwsQ0FBbUJKLEtBQW5CLENBQWxE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InNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDmiqLluoTniZvniZvph5HluIHmmL7npLpcclxuICovXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgdHlwZTogMCxcclxuICAgICAgICBmbHlGaW5pc2g6IGZhbHNlLFxyXG4gICAgICAgIHRpbWVDb3VudDogMFxyXG4gICAgfSxcclxuICAgIG9uTG9hZDogZnVuY3Rpb24oKSB7fSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBpbmRleCBcclxuICAgICAqL1xyXG4gICAgc2V0RnJhbWVfRnVuY3Rpb246IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BfQ29pblNwcml0ZVtpbmRleF07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635b6X6IyD5Zu06ZqP5py65pWwXHJcbiAgICAgKiBAcGFyYW0geyp9IG1pbiBcclxuICAgICAqIEBwYXJhbSB7Kn0gbWF4IFxyXG4gICAgICovXHJcbiAgICBnZXRSYW5kb21fRnVuY3Rpb246IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOmHkeW4geS7jui+k+WutuS9jee9rumjnuWIsOW6hOWutuS9jee9rlxyXG4gICAgICogQHBhcmFtIHsqfSBsb3NlUGxheWVyIFxyXG4gICAgICogQHBhcmFtIHsqfSBiYW5rZXJQbGF5ZXIgXHJcbiAgICAgKiBAcGFyYW0geyp9IGRlbGF5VGltZSBcclxuICAgICAqL1xyXG4gICAgc2V0Q29pblRvQmFua2VyX0Z1bmN0aW9uOiBmdW5jdGlvbihsb3NlUGxheWVyLCBiYW5rZXJQbGF5ZXIsIGRlbGF5VGltZSkge1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihsb3NlUGxheWVyLngsIGxvc2VQbGF5ZXIueSk7XHJcbiAgICAgICAgdmFyIG1vdmUgPSBjYy5tb3ZlVG8oLjA1ICsgLjAxICogZGVsYXlUaW1lLCBiYW5rZXJQbGF5ZXIueCArIHRoaXMuZ2V0UmFuZG9tX0Z1bmN0aW9uKCAtIDMwLCAzMCksIGJhbmtlclBsYXllci55ICsgdGhpcy5nZXRSYW5kb21fRnVuY3Rpb24oIC0gMzAsIDMwKSk7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IGNjLnNlcXVlbmNlKG1vdmUsIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmZseUZpbmlzaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGltZUNvdW50ID0gMDtcclxuICAgICAgICB9LCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHkeW4geS7juW6hOWutuS9jee9rumjnuWIsOi1ouWutuS9jee9rlxyXG4gICAgICogQHBhcmFtIHsqfSBiYW5rZXJQbGF5ZXIgXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpblBsYXllciBcclxuICAgICAqIEBwYXJhbSB7Kn0gZGVsYXlUaW1lIFxyXG4gICAgICovXHJcbiAgICBzZXRDb2luVG9QbGF5ZXJfRnVuY3Rpb246IGZ1bmN0aW9uKGJhbmtlclBsYXllciwgd2luUGxheWVyLCBkZWxheVRpbWUpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24od2luUGxheWVyLngsIHdpblBsYXllci55KTtcclxuICAgICAgICB2YXIgbW92ZSA9IGNjLm1vdmVUbyguMDUgKyAuMDEgKiBkZWxheVRpbWUsIGJhbmtlclBsYXllci54ICsgdGhpcy5nZXRSYW5kb21fRnVuY3Rpb24oIC0gMzAsIDMwKSwgYmFua2VyUGxheWVyLnkgKyB0aGlzLmdldFJhbmRvbV9GdW5jdGlvbiggLSAzMCwgMzApKTtcclxuICAgICAgICB2YXIgYWN0aW9uID0gY2Muc2VxdWVuY2UobW92ZSwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmx5RmluaXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy50aW1lQ291bnQgPSAwO1xyXG4gICAgICAgIH0sdGhpcykpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrBcclxuICAgICAqIEBwYXJhbSB7Kn0gZHQgXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQpIHtcclxuICAgICAgICBpZih0aGlzLm5vZGUuYWN0aXZlICYmIHRoaXMuZmx5RmluaXNoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy50aW1lQ291bnQgPCAuNClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lQ291bnQgKz0gZHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZseUZpbmlzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19