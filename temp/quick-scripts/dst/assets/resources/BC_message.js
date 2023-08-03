
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/resources/BC_message.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b6257GyeVtGb5GSaKK0sDvR', 'BC_message');
// resources/BC_message.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    rich_text: cc.RichText
  },
  setView: function setView(data) {
    // cc.log(data);
    this.playerInfo = require("PlayerInfo").getInstant;
    this.rich_text.string = "\u73A9\u5BB6" + data.nickName + "\u521A\u521A\u5728\u6E38\u620F<color=#94FF86>" + data.gameName + "</color>\u4E2D\u5956<color=#CD7F32>" + data.win / this.playerInfo.exchangeRate + "</color>\u91D1\u5E01";
    this.actionDo();
  },
  //滚动展示
  actionDo: function actionDo() {
    var _this = this;

    this.rich_text.node.x = 800;
    cc.tween(this.rich_text.node).to(5, {
      position: cc.v2(-800, 0)
    }).call(function () {
      _this.node.destroy();
    }).start();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccmVzb3VyY2VzXFxCQ19tZXNzYWdlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicmljaF90ZXh0IiwiUmljaFRleHQiLCJzZXRWaWV3IiwiZGF0YSIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsInN0cmluZyIsIm5pY2tOYW1lIiwiZ2FtZU5hbWUiLCJ3aW4iLCJleGNoYW5nZVJhdGUiLCJhY3Rpb25EbyIsIm5vZGUiLCJ4IiwidHdlZW4iLCJ0byIsInBvc2l0aW9uIiwidjIiLCJjYWxsIiwiZGVzdHJveSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFSixFQUFFLENBQUNLO0FBRE4sR0FIUDtBQU9MQyxFQUFBQSxPQVBLLG1CQU9HQyxJQVBILEVBT1M7QUFDVjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQXhDO0FBQ0EsU0FBS04sU0FBTCxDQUFlTyxNQUFmLG9CQUE2QkosSUFBSSxDQUFDSyxRQUFsQyxxREFBaUVMLElBQUksQ0FBQ00sUUFBdEUsMkNBQTBHTixJQUFJLENBQUNPLEdBQUwsR0FBVyxLQUFLTixVQUFMLENBQWdCTyxZQUFySTtBQUNBLFNBQUtDLFFBQUw7QUFDSCxHQVpJO0FBYUw7QUFDQUEsRUFBQUEsUUFkSyxzQkFjTTtBQUFBOztBQUNQLFNBQUtaLFNBQUwsQ0FBZWEsSUFBZixDQUFvQkMsQ0FBcEIsR0FBd0IsR0FBeEI7QUFDQWxCLElBQUFBLEVBQUUsQ0FBQ21CLEtBQUgsQ0FBUyxLQUFLZixTQUFMLENBQWVhLElBQXhCLEVBQ0tHLEVBREwsQ0FDUSxDQURSLEVBQ1c7QUFBRUMsTUFBQUEsUUFBUSxFQUFFckIsRUFBRSxDQUFDc0IsRUFBSCxDQUFNLENBQUMsR0FBUCxFQUFZLENBQVo7QUFBWixLQURYLEVBRUtDLElBRkwsQ0FFVSxZQUFNO0FBQ1IsTUFBQSxLQUFJLENBQUNOLElBQUwsQ0FBVU8sT0FBVjtBQUNILEtBSkwsRUFLS0MsS0FMTDtBQU1IO0FBdEJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcmljaF90ZXh0OiBjYy5SaWNoVGV4dCxcclxuICAgIH0sXHJcblxyXG4gICAgc2V0VmlldyhkYXRhKSB7XHJcbiAgICAgICAgLy8gY2MubG9nKGRhdGEpO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5yaWNoX3RleHQuc3RyaW5nID0gYOeOqeWutiR7ZGF0YS5uaWNrTmFtZX3liJrliJrlnKjmuLjmiI88Y29sb3I9Izk0RkY4Nj4ke2RhdGEuZ2FtZU5hbWV9PC9jb2xvcj7kuK3lpZY8Y29sb3I9I0NEN0YzMj4ke2RhdGEud2luIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZX08L2NvbG9yPumHkeW4gWA7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25EbygpO1xyXG4gICAgfSxcclxuICAgIC8v5rua5Yqo5bGV56S6XHJcbiAgICBhY3Rpb25EbygpIHtcclxuICAgICAgICB0aGlzLnJpY2hfdGV4dC5ub2RlLnggPSA4MDA7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5yaWNoX3RleHQubm9kZSlcclxuICAgICAgICAgICAgLnRvKDUsIHsgcG9zaXRpb246IGNjLnYyKC04MDAsIDApIH0pXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG59KTtcclxuIl19