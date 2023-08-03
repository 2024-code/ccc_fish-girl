
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/modifyCoins/modifyCoins.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '89632NGuxNM7rUeDa5QH/c4', 'modifyCoins');
// LaoHuJi/module/modifyCoins/modifyCoins.js

"use strict";

cc.Class({
  "extends": cc.Component,
  start: function start() {//////KBEngineEvent.register("onSendNewCoin", this, "onSendNewCoin");
  },
  //取消注册
  onDestroy: function onDestroy() {//////KBEngineEvent.deregister("onSendNewCoin", this);
  },
  onSendNewCoin: function onSendNewCoin(nNewCoin) {
    this.node.getComponent(cc.Label).string = nNewCoin.lo; //////KBEngineapp.player().reqGetAccountInfo();//刷新账户信息
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxtb2RpZnlDb2luc1xcbW9kaWZ5Q29pbnMuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInN0YXJ0Iiwib25EZXN0cm95Iiwib25TZW5kTmV3Q29pbiIsIm5OZXdDb2luIiwibm9kZSIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwibG8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLEtBQUssRUFBRSxpQkFBWSxDQUNmO0FBQ0gsR0FMSTtBQU9MO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxxQkFBWSxDQUNuQjtBQUNILEdBVkk7QUFZTEMsRUFBQUEsYUFBYSxFQUFFLHVCQUFVQyxRQUFWLEVBQW9CO0FBQy9CLFNBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QlIsRUFBRSxDQUFDUyxLQUExQixFQUFpQ0MsTUFBakMsR0FBMENKLFFBQVEsQ0FBQ0ssRUFBbkQsQ0FEK0IsQ0FFL0I7QUFDSDtBQWZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBcclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8vLy8vS0JFbmdpbmVFdmVudC5yZWdpc3RlcihcIm9uU2VuZE5ld0NvaW5cIiwgdGhpcywgXCJvblNlbmROZXdDb2luXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+WPlua2iOazqOWGjFxyXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8vLy8vS0JFbmdpbmVFdmVudC5kZXJlZ2lzdGVyKFwib25TZW5kTmV3Q29pblwiLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25TZW5kTmV3Q29pbjogZnVuY3Rpb24gKG5OZXdDb2luKSB7IFxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG5OZXdDb2luLmxvO1xyXG4gICAgICAgIC8vLy8vL0tCRW5naW5lYXBwLnBsYXllcigpLnJlcUdldEFjY291bnRJbmZvKCk7Ly/liLfmlrDotKbmiLfkv6Hmga9cclxuICAgIH0sXHJcbn0pOyJdfQ==