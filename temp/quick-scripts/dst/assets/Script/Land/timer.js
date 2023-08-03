
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Land/timer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0389775KzNNk4L/SjlkPft2', 'timer');
// Script/Land/timer.js

"use strict";

/**
 * 斗地主定时器
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

      if (this.node.parent.getComponent("LandlordsMain").btnPlayerState) {
        this.node.parent.getComponent("LandlordsMain").btnPlayerState.active = false;
      }

      this.node.active = false;
    } else {
      this.node.getChildByName("times").getComponent("cc.Label").string = this.num - this.count; //还剩下5秒时，开始报警

      if (this.node.getChildByName("times").getComponent("cc.Label").string == '5' && this.node.parent.getComponent("LandlordsMain").pInfo.soundEffectControl) {
        cc.audioEngine.play(this.node.parent.getComponent("LandlordsMain").baoJingAudio[2]);
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

      if (this.node.parent.getComponent("LandlordsMain").btnPlayerState) {
        this.node.parent.getComponent("LandlordsMain").btnPlayerState.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMYW5kXFx0aW1lci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNvdW50IiwibnVtIiwib25Mb2FkIiwidGltaW5nIiwiY2FuY2VsVGltZXIiLCJub2RlIiwicGFyZW50IiwiZ2V0Q29tcG9uZW50IiwiYnRuUGxheWVyU3RhdGUiLCJhY3RpdmUiLCJnZXRDaGlsZEJ5TmFtZSIsInN0cmluZyIsInBJbmZvIiwic291bmRFZmZlY3RDb250cm9sIiwiYXVkaW9FbmdpbmUiLCJwbGF5IiwiYmFvSmluZ0F1ZGlvIiwic3RhcnRUaW1lciIsInNjaGVkdWxlIiwidW5zY2hlZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEtBQUssRUFBRSxDQURDO0FBRVJDLElBQUFBLEdBQUcsRUFBRTtBQUZHLEdBSFA7QUFPTEMsRUFBQUEsTUFBTSxFQUFFLGtCQUFXLENBQUUsQ0FQaEI7O0FBU0w7QUFDSjtBQUNBO0FBQ0lDLEVBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUVmLFFBQUcsS0FBS0YsR0FBTCxLQUFhLEtBQUtELEtBQXJCLEVBQ0E7QUFDSSxXQUFLSSxXQUFMOztBQUNBLFVBQUcsS0FBS0MsSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxZQUFqQixDQUE4QixlQUE5QixFQUErQ0MsY0FBbEQsRUFDQTtBQUNJLGFBQUtILElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsWUFBakIsQ0FBOEIsZUFBOUIsRUFBK0NDLGNBQS9DLENBQThEQyxNQUE5RCxHQUF1RSxLQUF2RTtBQUNIOztBQUNELFdBQUtKLElBQUwsQ0FBVUksTUFBVixHQUFtQixLQUFuQjtBQUNILEtBUkQsTUFVQTtBQUNJLFdBQUtKLElBQUwsQ0FBVUssY0FBVixDQUF5QixPQUF6QixFQUFrQ0gsWUFBbEMsQ0FBK0MsVUFBL0MsRUFBMkRJLE1BQTNELEdBQW9FLEtBQUtWLEdBQUwsR0FBVyxLQUFLRCxLQUFwRixDQURKLENBR0k7O0FBQ0EsVUFBRyxLQUFLSyxJQUFMLENBQVVLLGNBQVYsQ0FBeUIsT0FBekIsRUFBa0NILFlBQWxDLENBQStDLFVBQS9DLEVBQTJESSxNQUEzRCxJQUFxRSxHQUFyRSxJQUE0RSxLQUFLTixJQUFMLENBQVVDLE1BQVYsQ0FBaUJDLFlBQWpCLENBQThCLGVBQTlCLEVBQStDSyxLQUEvQyxDQUFxREMsa0JBQXBJLEVBQ0E7QUFDSWpCLFFBQUFBLEVBQUUsQ0FBQ2tCLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixLQUFLVixJQUFMLENBQVVDLE1BQVYsQ0FBaUJDLFlBQWpCLENBQThCLGVBQTlCLEVBQStDUyxZQUEvQyxDQUE0RCxDQUE1RCxDQUFwQjtBQUNIOztBQUNELFdBQUtoQixLQUFMO0FBRUg7QUFDSixHQW5DSTs7QUFxQ0w7QUFDSjtBQUNBO0FBQ0lpQixFQUFBQSxVQUFVLEVBQUUsc0JBQVc7QUFDbkIsU0FBS1osSUFBTCxDQUFVSyxjQUFWLENBQXlCLE9BQXpCLEVBQWtDSCxZQUFsQyxDQUErQyxVQUEvQyxFQUEyREksTUFBM0QsR0FBb0UsS0FBS1YsR0FBTCxHQUFXLEtBQUtELEtBQXBGO0FBQ0EsU0FBS0EsS0FBTDs7QUFFQSxRQUFHLEtBQUtDLEdBQUwsR0FBVyxDQUFkLEVBQ0E7QUFDSSxXQUFLRCxLQUFMLEdBQWEsQ0FBYjs7QUFDQSxVQUFHLEtBQUtLLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsWUFBakIsQ0FBOEIsZUFBOUIsRUFBK0NDLGNBQWxELEVBQ0E7QUFDSSxhQUFLSCxJQUFMLENBQVVDLE1BQVYsQ0FBaUJDLFlBQWpCLENBQThCLGVBQTlCLEVBQStDQyxjQUEvQyxDQUE4REMsTUFBOUQsR0FBdUUsS0FBdkU7QUFDSDs7QUFDRCxXQUFLSixJQUFMLENBQVVJLE1BQVYsR0FBbUIsS0FBbkI7QUFDSCxLQVJELE1BVUE7QUFDSSxXQUFLUyxRQUFMLENBQWMsS0FBS2YsTUFBbkIsRUFBMkIsQ0FBM0IsRUFBOEIsS0FBS0YsR0FBTCxHQUFXLENBQXpDO0FBQ0g7QUFDSixHQXpESTs7QUEyREw7QUFDSjtBQUNBO0FBQ0lHLEVBQUFBLFdBQVcsRUFBRSx1QkFBVztBQUNwQixTQUFLZSxVQUFMLENBQWdCLEtBQUtoQixNQUFyQjtBQUNIO0FBaEVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDmlpflnLDkuLvlrprml7blmahcclxuICovXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgbnVtOiAwXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbigpIHt9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a6a5pe25ZmoXHJcbiAgICAgKi9cclxuICAgIHRpbWluZzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubnVtID09PSB0aGlzLmNvdW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxUaW1lcigpO1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChcIkxhbmRsb3Jkc01haW5cIikuYnRuUGxheWVyU3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiTGFuZGxvcmRzTWFpblwiKS5idG5QbGF5ZXJTdGF0ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpbWVzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IHRoaXMubnVtIC0gdGhpcy5jb3VudDtcclxuXHJcbiAgICAgICAgICAgIC8v6L+Y5Ymp5LiLNeenkuaXtu+8jOW8gOWni+aKpeitplxyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lc1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPT0gJzUnICYmIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiTGFuZGxvcmRzTWFpblwiKS5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoXCJMYW5kbG9yZHNNYWluXCIpLmJhb0ppbmdBdWRpb1syXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb3VudCsrO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5aeL5a6a5pe2XHJcbiAgICAgKi9cclxuICAgIHN0YXJ0VGltZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpbWVzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IHRoaXMubnVtIC0gdGhpcy5jb3VudDtcclxuICAgICAgICB0aGlzLmNvdW50Kys7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubnVtIDwgMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChcIkxhbmRsb3Jkc01haW5cIikuYnRuUGxheWVyU3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiTGFuZGxvcmRzTWFpblwiKS5idG5QbGF5ZXJTdGF0ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy50aW1pbmcsIDEsIHRoaXMubnVtIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPlua2iOWumuaXtuWZqFxyXG4gICAgICovXHJcbiAgICBjYW5jZWxUaW1lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMudGltaW5nKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==