
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/ExpBar/ExpBar.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '85779Zb/8NPDb2kiFmqG1tb', 'ExpBar');
// LaoHuJi/module/ExpBar/ExpBar.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    ProgressBar_EXP: cc.ProgressBar,
    Label_EXP: cc.Label
  },
  start: function start() {////KBEngineEvent.register("onGetAccountInfo", this, "onGetAccountInfo");
    // if (Global.accountInfo != null && Global.accountInfo != undefined) {
    //     this.onGetAccountInfo(1, Global.accountInfo, null);
    // }
  },
  //取消注册
  onDestroy: function onDestroy() {////KBEngineEvent.deregister("onGetAccountInfo", this);
  },
  //收到消息:得到账户信息
  onGetAccountInfo: function onGetAccountInfo(nSuccess, dict, dictList) {
    if (nSuccess === 1) {
      //success
      var exp = dict["nLevelEXP"];
      var needExp = dict["nLevelNeedEXP"];
      this.ProgressBar_EXP.progress = exp / needExp;
      this.Label_EXP.string = exp + "/" + needExp;
    } else {//fail
    }
  },
  onBtnClick_info: function onBtnClick_info() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxFeHBCYXJcXEV4cEJhci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIlByb2dyZXNzQmFyX0VYUCIsIlByb2dyZXNzQmFyIiwiTGFiZWxfRVhQIiwiTGFiZWwiLCJzdGFydCIsIm9uRGVzdHJveSIsIm9uR2V0QWNjb3VudEluZm8iLCJuU3VjY2VzcyIsImRpY3QiLCJkaWN0TGlzdCIsImV4cCIsIm5lZWRFeHAiLCJwcm9ncmVzcyIsInN0cmluZyIsIm9uQnRuQ2xpY2tfaW5mbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGVBQWUsRUFBRUosRUFBRSxDQUFDSyxXQURaO0FBRVJDLElBQUFBLFNBQVMsRUFBRU4sRUFBRSxDQUFDTztBQUZOLEdBSFA7QUFRTEMsRUFBQUEsS0FBSyxFQUFFLGlCQUFZLENBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDSCxHQWJJO0FBZUw7QUFDQUMsRUFBQUEsU0FBUyxFQUFFLHFCQUFZLENBQ25CO0FBQ0gsR0FsQkk7QUFvQkw7QUFDQUMsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVVDLFFBQVYsRUFBb0JDLElBQXBCLEVBQTBCQyxRQUExQixFQUFvQztBQUNsRCxRQUFJRixRQUFRLEtBQUssQ0FBakIsRUFBb0I7QUFDaEI7QUFDQSxVQUFJRyxHQUFHLEdBQUdGLElBQUksQ0FBQyxXQUFELENBQWQ7QUFDQSxVQUFJRyxPQUFPLEdBQUdILElBQUksQ0FBQyxlQUFELENBQWxCO0FBQ0EsV0FBS1IsZUFBTCxDQUFxQlksUUFBckIsR0FBZ0NGLEdBQUcsR0FBR0MsT0FBdEM7QUFDQSxXQUFLVCxTQUFMLENBQWVXLE1BQWYsR0FBd0JILEdBQUcsR0FBRyxHQUFOLEdBQVlDLE9BQXBDO0FBQ0gsS0FORCxNQU9LLENBQ0Q7QUFDSDtBQUNKLEdBaENJO0FBa0NMRyxFQUFBQSxlQUFlLEVBQUUsMkJBQVksQ0FFNUI7QUFwQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUHJvZ3Jlc3NCYXJfRVhQOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICBMYWJlbF9FWFA6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vLy9LQkVuZ2luZUV2ZW50LnJlZ2lzdGVyKFwib25HZXRBY2NvdW50SW5mb1wiLCB0aGlzLCBcIm9uR2V0QWNjb3VudEluZm9cIik7XHJcbiAgICAgICAgLy8gaWYgKEdsb2JhbC5hY2NvdW50SW5mbyAhPSBudWxsICYmIEdsb2JhbC5hY2NvdW50SW5mbyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5vbkdldEFjY291bnRJbmZvKDEsIEdsb2JhbC5hY2NvdW50SW5mbywgbnVsbCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WPlua2iOazqOWGjFxyXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8vL0tCRW5naW5lRXZlbnQuZGVyZWdpc3RlcihcIm9uR2V0QWNjb3VudEluZm9cIiwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5pS25Yiw5raI5oGvOuW+l+WIsOi0puaIt+S/oeaBr1xyXG4gICAgb25HZXRBY2NvdW50SW5mbzogZnVuY3Rpb24gKG5TdWNjZXNzLCBkaWN0LCBkaWN0TGlzdCkge1xyXG4gICAgICAgIGlmIChuU3VjY2VzcyA9PT0gMSkge1xyXG4gICAgICAgICAgICAvL3N1Y2Nlc3NcclxuICAgICAgICAgICAgdmFyIGV4cCA9IGRpY3RbXCJuTGV2ZWxFWFBcIl07XHJcbiAgICAgICAgICAgIHZhciBuZWVkRXhwID0gZGljdFtcIm5MZXZlbE5lZWRFWFBcIl07XHJcbiAgICAgICAgICAgIHRoaXMuUHJvZ3Jlc3NCYXJfRVhQLnByb2dyZXNzID0gZXhwIC8gbmVlZEV4cDtcclxuICAgICAgICAgICAgdGhpcy5MYWJlbF9FWFAuc3RyaW5nID0gZXhwICsgXCIvXCIgKyBuZWVkRXhwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9mYWlsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkJ0bkNsaWNrX2luZm86IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG59KTsiXX0=