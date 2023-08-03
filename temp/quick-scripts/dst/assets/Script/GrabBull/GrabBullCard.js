
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GrabBull/GrabBullCard.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '559cfhcMbNIWqFxwYKv+TH1', 'GrabBullCard');
// Script/GrabBull/GrabBullCard.js

"use strict";

/**
 * 扑克管理类
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    sp_CardSprite: {
      "default": [],
      type: cc.SpriteFrame
    },
    canvasNode: {
      "default": null,
      type: cc.Node
    },
    type: 0,
    point: 0
  },
  onLoad: function onLoad() {
    this.defaultFrame = this.node.getComponent("cc.Sprite").spriteFrame;
  },

  /**
   * 显示卡牌
   * @param {*} index 
   */
  open_Function: function open_Function(index) {
    this.type = index;
    this.setFrame_Function(index);
    this.setPoint_Function(index);
  },

  /**
   * vip特权 关闭显示
   */
  close_func: function close_func() {
    this.node.getComponent("cc.Sprite").spriteFrame = this.defaultFrame;
  },

  /**
   * 设置显示帧数
   * @param {*} index 
   */
  setFrame_Function: function setFrame_Function(index) {
    this.node.getComponent("cc.Sprite").spriteFrame = this.sp_CardSprite[index];
  },

  /**
   * 设置点数
   * @param {*} index 
   */
  setPoint_Function: function setPoint_Function(index) {
    var point = index % 13;

    if (point == 0 || point > 10) {
      this.point = 10;
    } else {
      this.point = point;
    }
  },

  /**
   * 点击扑克
   */
  clickCard_Function: function clickCard_Function() {
    if (this.canvasNode.canSetBull) {
      this.canvasNode.checkBull_Function(this.node.cardId);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHcmFiQnVsbFxcR3JhYkJ1bGxDYXJkLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BfQ2FyZFNwcml0ZSIsInR5cGUiLCJTcHJpdGVGcmFtZSIsImNhbnZhc05vZGUiLCJOb2RlIiwicG9pbnQiLCJvbkxvYWQiLCJkZWZhdWx0RnJhbWUiLCJub2RlIiwiZ2V0Q29tcG9uZW50Iiwic3ByaXRlRnJhbWUiLCJvcGVuX0Z1bmN0aW9uIiwiaW5kZXgiLCJzZXRGcmFtZV9GdW5jdGlvbiIsInNldFBvaW50X0Z1bmN0aW9uIiwiY2xvc2VfZnVuYyIsImNsaWNrQ2FyZF9GdW5jdGlvbiIsImNhblNldEJ1bGwiLCJjaGVja0J1bGxfRnVuY3Rpb24iLCJjYXJkSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxhQUFhLEVBQUU7QUFDWCxpQkFBUyxFQURFO0FBRVhDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZFLEtBRFA7QUFLUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1E7QUFGRCxLQUxKO0FBU1JILElBQUFBLElBQUksRUFBRSxDQVRFO0FBVVJJLElBQUFBLEtBQUssRUFBRTtBQVZDLEdBSFA7QUFlTEMsRUFBQUEsTUFBTSxFQUFFLGtCQUFXO0FBQ2YsU0FBS0MsWUFBTCxHQUFvQixLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsV0FBdkIsRUFBb0NDLFdBQXhEO0FBQ0gsR0FqQkk7O0FBbUJMO0FBQ0o7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLGFBQWEsRUFBRSx1QkFBU0MsS0FBVCxFQUFnQjtBQUMzQixTQUFLWCxJQUFMLEdBQVlXLEtBQVo7QUFDQSxTQUFLQyxpQkFBTCxDQUF1QkQsS0FBdkI7QUFDQSxTQUFLRSxpQkFBTCxDQUF1QkYsS0FBdkI7QUFDSCxHQTNCSTs7QUE2Qkw7QUFDSjtBQUNBO0FBQ0lHLEVBQUFBLFVBQVUsRUFBRSxzQkFBVTtBQUNsQixTQUFLUCxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsV0FBdkIsRUFBb0NDLFdBQXBDLEdBQWtELEtBQUtILFlBQXZEO0FBQ0gsR0FsQ0k7O0FBb0NMO0FBQ0o7QUFDQTtBQUNBO0FBQ0lNLEVBQUFBLGlCQUFpQixFQUFFLDJCQUFTRCxLQUFULEVBQWdCO0FBQy9CLFNBQUtKLElBQUwsQ0FBVUMsWUFBVixDQUF1QixXQUF2QixFQUFvQ0MsV0FBcEMsR0FBa0QsS0FBS1YsYUFBTCxDQUFtQlksS0FBbkIsQ0FBbEQ7QUFDSCxHQTFDSTs7QUEyQ0w7QUFDSjtBQUNBO0FBQ0E7QUFDSUUsRUFBQUEsaUJBQWlCLEVBQUUsMkJBQVNGLEtBQVQsRUFBZ0I7QUFDL0IsUUFBSVAsS0FBSyxHQUFHTyxLQUFLLEdBQUcsRUFBcEI7O0FBQ0EsUUFBR1AsS0FBSyxJQUFJLENBQVQsSUFBY0EsS0FBSyxHQUFHLEVBQXpCLEVBQ0E7QUFDSSxXQUFLQSxLQUFMLEdBQWEsRUFBYjtBQUNILEtBSEQsTUFLQTtBQUNJLFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNIO0FBQ0osR0F6REk7O0FBMERMO0FBQ0o7QUFDQTtBQUNJVyxFQUFBQSxrQkFBa0IsRUFBRSw4QkFBVztBQUMzQixRQUFHLEtBQUtiLFVBQUwsQ0FBZ0JjLFVBQW5CLEVBQ0E7QUFDSSxXQUFLZCxVQUFMLENBQWdCZSxrQkFBaEIsQ0FBbUMsS0FBS1YsSUFBTCxDQUFVVyxNQUE3QztBQUNIO0FBQ0o7QUFsRUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOaJkeWFi+euoeeQhuexu1xyXG4gKi9cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzcF9DYXJkU3ByaXRlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FudmFzTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlOiAwLFxyXG4gICAgICAgIHBvaW50OiAwXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRGcmFtZSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65Y2h54mMXHJcbiAgICAgKiBAcGFyYW0geyp9IGluZGV4IFxyXG4gICAgICovXHJcbiAgICBvcGVuX0Z1bmN0aW9uOiBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuc2V0RnJhbWVfRnVuY3Rpb24oaW5kZXgpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9pbnRfRnVuY3Rpb24oaW5kZXgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHZpcOeJueadgyDlhbPpl63mmL7npLpcclxuICAgICAqL1xyXG4gICAgY2xvc2VfZnVuYzogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gdGhpcy5kZWZhdWx0RnJhbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5pi+56S65bin5pWwXHJcbiAgICAgKiBAcGFyYW0geyp9IGluZGV4IFxyXG4gICAgICovXHJcbiAgICBzZXRGcmFtZV9GdW5jdGlvbjogZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF9DYXJkU3ByaXRlW2luZGV4XTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rueCueaVsFxyXG4gICAgICogQHBhcmFtIHsqfSBpbmRleCBcclxuICAgICAqL1xyXG4gICAgc2V0UG9pbnRfRnVuY3Rpb246IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgdmFyIHBvaW50ID0gaW5kZXggJSAxMztcclxuICAgICAgICBpZihwb2ludCA9PSAwIHx8IHBvaW50ID4gMTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50ID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnQgPSBwb2ludDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vmiZHlhYtcclxuICAgICAqL1xyXG4gICAgY2xpY2tDYXJkX0Z1bmN0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZih0aGlzLmNhbnZhc05vZGUuY2FuU2V0QnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5jaGVja0J1bGxfRnVuY3Rpb24odGhpcy5ub2RlLmNhcmRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19