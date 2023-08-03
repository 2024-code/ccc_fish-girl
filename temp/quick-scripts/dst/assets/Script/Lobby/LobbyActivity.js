
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/LobbyActivity.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dcb09K3rFtDt7PeCEb/+QgP', 'LobbyActivity');
// Script/Lobby/LobbyActivity.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.netWork = require("LobbyNetWork");
  },
  start: function start() {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcTG9iYnlBY3Rpdml0eS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsIm5ldFdvcmsiLCJyZXF1aXJlIiwic3RhcnQiLCJjbG9zZVBhbmVsIiwibm9kZSIsImFjdGl2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTEMsRUFBQUEsTUFQSyxvQkFPSTtBQUNMLFNBQUtDLE9BQUwsR0FBZUMsT0FBTyxDQUFDLGNBQUQsQ0FBdEI7QUFDSCxHQVRJO0FBV0xDLEVBQUFBLEtBWEssbUJBV0csQ0FFUCxDQWJJO0FBY0w7QUFDQUMsRUFBQUEsVUFmSyx3QkFlUTtBQUNULFNBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixLQUFuQjtBQUNIO0FBakJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrID0gcmVxdWlyZShcIkxvYmJ5TmV0V29ya1wiKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIC8v5YWz6Zet5b2T5YmN6Z2i5p2/XHJcbiAgICBjbG9zZVBhbmVsKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=