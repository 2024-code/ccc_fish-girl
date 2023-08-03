
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Runing/RunTimer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8a2b1zimXxIFq62ar/R0yOB', 'RunTimer');
// Script/Runing/RunTimer.js

"use strict";

/**
 * 跑得快定时器
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    count: 0,
    num: 0
  },
  onLoad: function onLoad() {},

  /**
   * 定时器
   */
  timing: function timing() {
    if (this.num === this.count) {
      this.cancelTimer();

      if (this.node.parent.getComponent("RuningMain").btnPlayerState) {
        this.node.parent.getComponent("RuningMain").btnPlayerState.active = false;
      }

      this.node.active = false;
    } else {
      this.node.getChildByName("times").getComponent("cc.Label").string = this.num - this.count; //还剩下5秒时，开始报警

      if (this.node.getChildByName("times").getComponent("cc.Label").string == '5' && this.node.parent.getComponent("RuningMain").pInfo.soundEffectControl) {
        cc.audioEngine.play(this.node.parent.getComponent("RuningMain").baoJingAudio[2]);
      }

      this.count++;
    }
  },

  /**
   * 开始定时
   */
  startTimer: function startTimer() {
    this.node.getChildByName("times").getComponent("cc.Label").string = this.num - this.count;
    this.count++;

    if (this.num < 1) {
      this.count = 0;

      if (this.node.parent.getComponent("RuningMain").btnPlayerState) {
        this.node.parent.getComponent("RuningMain").btnPlayerState.active = false;
      }

      this.node.active = false;
    } else {
      this.schedule(this.timing, 1, this.num - 1);
    }
  },

  /**
   * 取消定时器
   */
  cancelTimer: function cancelTimer() {
    this.unschedule(this.timing);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxSdW5pbmdcXFJ1blRpbWVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY291bnQiLCJudW0iLCJvbkxvYWQiLCJ0aW1pbmciLCJjYW5jZWxUaW1lciIsIm5vZGUiLCJwYXJlbnQiLCJnZXRDb21wb25lbnQiLCJidG5QbGF5ZXJTdGF0ZSIsImFjdGl2ZSIsImdldENoaWxkQnlOYW1lIiwic3RyaW5nIiwicEluZm8iLCJzb3VuZEVmZmVjdENvbnRyb2wiLCJhdWRpb0VuZ2luZSIsInBsYXkiLCJiYW9KaW5nQXVkaW8iLCJzdGFydFRpbWVyIiwic2NoZWR1bGUiLCJ1bnNjaGVkdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFFLENBREM7QUFFUkMsSUFBQUEsR0FBRyxFQUFFO0FBRkcsR0FIUDtBQU9MQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVcsQ0FBRSxDQVBoQjs7QUFTTDtBQUNKO0FBQ0E7QUFDSUMsRUFBQUEsTUFBTSxFQUFFLGtCQUFXO0FBRWYsUUFBRyxLQUFLRixHQUFMLEtBQWEsS0FBS0QsS0FBckIsRUFDQTtBQUNJLFdBQUtJLFdBQUw7O0FBQ0EsVUFBRyxLQUFLQyxJQUFMLENBQVVDLE1BQVYsQ0FBaUJDLFlBQWpCLENBQThCLFlBQTlCLEVBQTRDQyxjQUEvQyxFQUNBO0FBQ0ksYUFBS0gsSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxZQUFqQixDQUE4QixZQUE5QixFQUE0Q0MsY0FBNUMsQ0FBMkRDLE1BQTNELEdBQW9FLEtBQXBFO0FBQ0g7O0FBQ0QsV0FBS0osSUFBTCxDQUFVSSxNQUFWLEdBQW1CLEtBQW5CO0FBQ0gsS0FSRCxNQVVBO0FBQ0ksV0FBS0osSUFBTCxDQUFVSyxjQUFWLENBQXlCLE9BQXpCLEVBQWtDSCxZQUFsQyxDQUErQyxVQUEvQyxFQUEyREksTUFBM0QsR0FBb0UsS0FBS1YsR0FBTCxHQUFXLEtBQUtELEtBQXBGLENBREosQ0FHSTs7QUFDQSxVQUFHLEtBQUtLLElBQUwsQ0FBVUssY0FBVixDQUF5QixPQUF6QixFQUFrQ0gsWUFBbEMsQ0FBK0MsVUFBL0MsRUFBMkRJLE1BQTNELElBQXFFLEdBQXJFLElBQTRFLEtBQUtOLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsWUFBakIsQ0FBOEIsWUFBOUIsRUFBNENLLEtBQTVDLENBQWtEQyxrQkFBakksRUFDQTtBQUNJakIsUUFBQUEsRUFBRSxDQUFDa0IsV0FBSCxDQUFlQyxJQUFmLENBQW9CLEtBQUtWLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsWUFBakIsQ0FBOEIsWUFBOUIsRUFBNENTLFlBQTVDLENBQXlELENBQXpELENBQXBCO0FBQ0g7O0FBQ0QsV0FBS2hCLEtBQUw7QUFFSDtBQUNKLEdBbkNJOztBQXFDTDtBQUNKO0FBQ0E7QUFDSWlCLEVBQUFBLFVBQVUsRUFBRSxzQkFBVztBQUNuQixTQUFLWixJQUFMLENBQVVLLGNBQVYsQ0FBeUIsT0FBekIsRUFBa0NILFlBQWxDLENBQStDLFVBQS9DLEVBQTJESSxNQUEzRCxHQUFvRSxLQUFLVixHQUFMLEdBQVcsS0FBS0QsS0FBcEY7QUFDQSxTQUFLQSxLQUFMOztBQUVBLFFBQUcsS0FBS0MsR0FBTCxHQUFXLENBQWQsRUFDQTtBQUNJLFdBQUtELEtBQUwsR0FBYSxDQUFiOztBQUNBLFVBQUcsS0FBS0ssSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxZQUFqQixDQUE4QixZQUE5QixFQUE0Q0MsY0FBL0MsRUFDQTtBQUNJLGFBQUtILElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsWUFBakIsQ0FBOEIsWUFBOUIsRUFBNENDLGNBQTVDLENBQTJEQyxNQUEzRCxHQUFvRSxLQUFwRTtBQUNIOztBQUNELFdBQUtKLElBQUwsQ0FBVUksTUFBVixHQUFtQixLQUFuQjtBQUNILEtBUkQsTUFVQTtBQUNJLFdBQUtTLFFBQUwsQ0FBYyxLQUFLZixNQUFuQixFQUEyQixDQUEzQixFQUE4QixLQUFLRixHQUFMLEdBQVcsQ0FBekM7QUFDSDtBQUNKLEdBekRJOztBQTJETDtBQUNKO0FBQ0E7QUFDSUcsRUFBQUEsV0FBVyxFQUFFLHVCQUFXO0FBQ3BCLFNBQUtlLFVBQUwsQ0FBZ0IsS0FBS2hCLE1BQXJCO0FBQ0g7QUFoRUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOi3keW+l+W/q+WumuaXtuWZqFxyXG4gKi9cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjb3VudDogMCxcclxuICAgICAgICBudW06IDBcclxuICAgIH0sXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uKCkge30sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrprml7blmahcclxuICAgICAqL1xyXG4gICAgdGltaW5nOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYodGhpcy5udW0gPT09IHRoaXMuY291bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbFRpbWVyKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiUnVuaW5nTWFpblwiKS5idG5QbGF5ZXJTdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoXCJSdW5pbmdNYWluXCIpLmJ0blBsYXllclN0YXRlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGltZXNcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gdGhpcy5udW0gLSB0aGlzLmNvdW50O1xyXG5cclxuICAgICAgICAgICAgLy/ov5jliankuIs156eS5pe277yM5byA5aeL5oql6K2mXHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpbWVzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9PSAnNScgJiYgdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoXCJSdW5pbmdNYWluXCIpLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChcIlJ1bmluZ01haW5cIikuYmFvSmluZ0F1ZGlvWzJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvdW50Kys7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvIDlp4vlrprml7ZcclxuICAgICAqL1xyXG4gICAgc3RhcnRUaW1lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGltZXNcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gdGhpcy5udW0gLSB0aGlzLmNvdW50O1xyXG4gICAgICAgIHRoaXMuY291bnQrKztcclxuXHJcbiAgICAgICAgaWYodGhpcy5udW0gPCAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiUnVuaW5nTWFpblwiKS5idG5QbGF5ZXJTdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoXCJSdW5pbmdNYWluXCIpLmJ0blBsYXllclN0YXRlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnRpbWluZywgMSwgdGhpcy5udW0gLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+W5raI5a6a5pe25ZmoXHJcbiAgICAgKi9cclxuICAgIGNhbmNlbFRpbWVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy50aW1pbmcpO1xyXG4gICAgfVxyXG59KTtcclxuIl19