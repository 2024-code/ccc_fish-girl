
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/LobbyVip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '88de8Ay5OdDwZz0aKmN0wST', 'LobbyVip');
// Script/Lobby/LobbyVip.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.netWork = require("LobbyNetWork");
    this.lobbyMain = cc.find('Canvas').getComponent("LobbyMain");
    this.playerInfo = require("PlayerInfo").getInstant;
  },
  start: function start() {},
  //打开充值面板
  openMallPanel: function openMallPanel() {
    this.node.active = false;
    this.lobbyMain.bg_Black.active = true;
    this.lobbyMain.com_Mall.active = true;
    this.lobbyMain.changeMallUI(0);
    cc.find('com_chongzhi_01/lb_PlayerId', this.lobbyMain.com_Mall).getComponent("cc.Label").string = "ID: " + this.playerInfo.playerId;
    ;
  },
  //关闭当前面板
  closePanel: function closePanel() {
    this.node.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcTG9iYnlWaXAuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJuZXRXb3JrIiwicmVxdWlyZSIsImxvYmJ5TWFpbiIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJwbGF5ZXJJbmZvIiwiZ2V0SW5zdGFudCIsInN0YXJ0Iiwib3Blbk1hbGxQYW5lbCIsIm5vZGUiLCJhY3RpdmUiLCJiZ19CbGFjayIsImNvbV9NYWxsIiwiY2hhbmdlTWFsbFVJIiwic3RyaW5nIiwicGxheWVySWQiLCJjbG9zZVBhbmVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MQyxFQUFBQSxNQVBLLG9CQU9JO0FBQ0wsU0FBS0MsT0FBTCxHQUFlQyxPQUFPLENBQUMsY0FBRCxDQUF0QjtBQUNBLFNBQUtDLFNBQUwsR0FBaUJQLEVBQUUsQ0FBQ1EsSUFBSCxDQUFRLFFBQVIsRUFBa0JDLFlBQWxCLENBQStCLFdBQS9CLENBQWpCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkosT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkssVUFBeEM7QUFDSCxHQVhJO0FBYUxDLEVBQUFBLEtBYkssbUJBYUcsQ0FFUCxDQWZJO0FBZ0JMO0FBQ0FDLEVBQUFBLGFBakJLLDJCQWlCVztBQUNaLFNBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixLQUFuQjtBQUNBLFNBQUtSLFNBQUwsQ0FBZVMsUUFBZixDQUF3QkQsTUFBeEIsR0FBaUMsSUFBakM7QUFDQSxTQUFLUixTQUFMLENBQWVVLFFBQWYsQ0FBd0JGLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0EsU0FBS1IsU0FBTCxDQUFlVyxZQUFmLENBQTRCLENBQTVCO0FBQ0FsQixJQUFBQSxFQUFFLENBQUNRLElBQUgsQ0FBUSw2QkFBUixFQUFzQyxLQUFLRCxTQUFMLENBQWVVLFFBQXJELEVBQStEUixZQUEvRCxDQUE0RSxVQUE1RSxFQUF3RlUsTUFBeEYsR0FBaUcsU0FBUyxLQUFLVCxVQUFMLENBQWdCVSxRQUExSDtBQUFtSTtBQUN0SSxHQXZCSTtBQXdCTDtBQUNBQyxFQUFBQSxVQXpCSyx3QkF5QlE7QUFDVCxTQUFLUCxJQUFMLENBQVVDLE1BQVYsR0FBbUIsS0FBbkI7QUFDSDtBQTNCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubmV0V29yayA9IHJlcXVpcmUoXCJMb2JieU5ldFdvcmtcIik7XHJcbiAgICAgICAgdGhpcy5sb2JieU1haW4gPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIC8v5omT5byA5YWF5YC86Z2i5p2/XHJcbiAgICBvcGVuTWFsbFBhbmVsKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvYmJ5TWFpbi5iZ19CbGFjay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubG9iYnlNYWluLmNvbV9NYWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sb2JieU1haW4uY2hhbmdlTWFsbFVJKDApO1xyXG4gICAgICAgIGNjLmZpbmQoJ2NvbV9jaG9uZ3poaV8wMS9sYl9QbGF5ZXJJZCcsdGhpcy5sb2JieU1haW4uY29tX01hbGwpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwiSUQ6IFwiICsgdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkOztcclxuICAgIH0sXHJcbiAgICAvL+WFs+mXreW9k+WJjemdouadv1xyXG4gICAgY2xvc2VQYW5lbCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG59KTtcclxuIl19