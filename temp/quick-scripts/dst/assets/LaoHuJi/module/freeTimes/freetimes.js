
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/freeTimes/freetimes.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '038fd0ozVlKXbE0ycm5kQA7', 'freetimes');
// LaoHuJi/module/freeTimes/freetimes.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    Label_Freetimes: cc.Label,
    _freeTimes: 0
  },
  start: function start() {////KBEngineEvent.register("onGetAccountInfo", this, "onGetAccountInfo");
    // if (Global != null && Global != undefined &&
    //     Global.accountInfo != null && Global.accountInfo != undefined &&
    //     Global.freeTimes != null && Global.freeTimes != undefined &&
    //     Global.currentGameID != null && Global.currentGameID != undefined) {
    //     this.onGetAccountInfo(1, Global.accountInfo, Global.freeTimes);
    // }
  },
  //取消注册
  onDestroy: function onDestroy() {////KBEngineEvent.deregister("onGetAccountInfo", this);
  },
  //收到消息:得到账户信息
  onGetAccountInfo: function onGetAccountInfo(nSuccess, dict, dictList) {
    this.node.active = false;

    if (nSuccess === 1) {
      //success
      for (var i = 0; i < dictList["values"].length; i++) {
        if (dictList["values"][i]["nGameId"] === Global.currentGameID) {
          //当前子游戏的免费次数
          this._freeTimes = dictList["values"][i]["nFreeTimes"]; //免费次数

          if (this._freeTimes > 0) {
            this.node.active = true;
            this.Label_Freetimes.string = this._freeTimes; //显示免费次数
          }

          break;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxmcmVlVGltZXNcXGZyZWV0aW1lcy5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkxhYmVsX0ZyZWV0aW1lcyIsIkxhYmVsIiwiX2ZyZWVUaW1lcyIsInN0YXJ0Iiwib25EZXN0cm95Iiwib25HZXRBY2NvdW50SW5mbyIsIm5TdWNjZXNzIiwiZGljdCIsImRpY3RMaXN0Iiwibm9kZSIsImFjdGl2ZSIsImkiLCJsZW5ndGgiLCJHbG9iYWwiLCJjdXJyZW50R2FtZUlEIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsZUFBZSxFQUFFSixFQUFFLENBQUNLLEtBRFo7QUFFUkMsSUFBQUEsVUFBVSxFQUFFO0FBRkosR0FIUDtBQVFMQyxFQUFBQSxLQUFLLEVBQUUsaUJBQVksQ0FDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILEdBaEJJO0FBa0JMO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxxQkFBWSxDQUNuQjtBQUNILEdBckJJO0FBdUJMO0FBQ0FDLEVBQUFBLGdCQUFnQixFQUFFLDBCQUFVQyxRQUFWLEVBQW9CQyxJQUFwQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDbEQsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLEtBQW5COztBQUNBLFFBQUlKLFFBQVEsS0FBSyxDQUFqQixFQUFvQjtBQUFDO0FBQ2pCLFdBQUssSUFBSUssQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0gsUUFBUSxDQUFDLFFBQUQsQ0FBUixDQUFtQkksTUFBdkMsRUFBK0NELENBQUMsRUFBaEQsRUFBb0Q7QUFDaEQsWUFBSUgsUUFBUSxDQUFDLFFBQUQsQ0FBUixDQUFtQkcsQ0FBbkIsRUFBc0IsU0FBdEIsTUFBcUNFLE1BQU0sQ0FBQ0MsYUFBaEQsRUFBK0Q7QUFBQztBQUM1RCxlQUFLWixVQUFMLEdBQWtCTSxRQUFRLENBQUMsUUFBRCxDQUFSLENBQW1CRyxDQUFuQixFQUFzQixZQUF0QixDQUFsQixDQUQyRCxDQUNMOztBQUN0RCxjQUFJLEtBQUtULFVBQUwsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDckIsaUJBQUtPLElBQUwsQ0FBVUMsTUFBVixHQUFtQixJQUFuQjtBQUNBLGlCQUFLVixlQUFMLENBQXFCZSxNQUFyQixHQUE4QixLQUFLYixVQUFuQyxDQUZxQixDQUV5QjtBQUNqRDs7QUFDRDtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBdENJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIExhYmVsX0ZyZWV0aW1lczogY2MuTGFiZWwsXHJcbiAgICAgICAgX2ZyZWVUaW1lczogMCxcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLy8vS0JFbmdpbmVFdmVudC5yZWdpc3RlcihcIm9uR2V0QWNjb3VudEluZm9cIiwgdGhpcywgXCJvbkdldEFjY291bnRJbmZvXCIpO1xyXG4gICAgICAgIC8vIGlmIChHbG9iYWwgIT0gbnVsbCAmJiBHbG9iYWwgIT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgLy8gICAgIEdsb2JhbC5hY2NvdW50SW5mbyAhPSBudWxsICYmIEdsb2JhbC5hY2NvdW50SW5mbyAhPSB1bmRlZmluZWQgJiZcclxuICAgICAgICAvLyAgICAgR2xvYmFsLmZyZWVUaW1lcyAhPSBudWxsICYmIEdsb2JhbC5mcmVlVGltZXMgIT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgLy8gICAgIEdsb2JhbC5jdXJyZW50R2FtZUlEICE9IG51bGwgJiYgR2xvYmFsLmN1cnJlbnRHYW1lSUQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMub25HZXRBY2NvdW50SW5mbygxLCBHbG9iYWwuYWNjb3VudEluZm8sIEdsb2JhbC5mcmVlVGltZXMpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/lj5bmtojms6jlhoxcclxuICAgIG9uRGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vLy9LQkVuZ2luZUV2ZW50LmRlcmVnaXN0ZXIoXCJvbkdldEFjY291bnRJbmZvXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+aUtuWIsOa2iOaBrzrlvpfliLDotKbmiLfkv6Hmga9cclxuICAgIG9uR2V0QWNjb3VudEluZm86IGZ1bmN0aW9uIChuU3VjY2VzcywgZGljdCwgZGljdExpc3QpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG5TdWNjZXNzID09PSAxKSB7Ly9zdWNjZXNzXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGljdExpc3RbXCJ2YWx1ZXNcIl0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChkaWN0TGlzdFtcInZhbHVlc1wiXVtpXVtcIm5HYW1lSWRcIl0gPT09IEdsb2JhbC5jdXJyZW50R2FtZUlEKSB7Ly/lvZPliY3lrZDmuLjmiI/nmoTlhY3otLnmrKHmlbBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mcmVlVGltZXMgPSBkaWN0TGlzdFtcInZhbHVlc1wiXVtpXVtcIm5GcmVlVGltZXNcIl07Ly/lhY3otLnmrKHmlbBcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MYWJlbF9GcmVldGltZXMuc3RyaW5nID0gdGhpcy5fZnJlZVRpbWVzOy8v5pi+56S65YWN6LS55qyh5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7Il19