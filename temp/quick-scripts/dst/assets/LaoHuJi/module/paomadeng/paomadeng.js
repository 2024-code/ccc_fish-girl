
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/paomadeng/paomadeng.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a08bd4sIFJHZJwl2od8RYXn', 'paomadeng');
// LaoHuJi/module/paomadeng/paomadeng.js

"use strict";

var i18n = require('i18n');
/**
 * 替换所有匹配exp的字符串为指定字符串
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */


String.prototype.replaceAll = function (exp, newStr) {
  return this.replace(new RegExp(exp, "gm"), newStr);
};
/**
 * 原型：字符串格式化
 * @param args 格式化参数值
 */


String.prototype.format = function (args) {
  var result = this;

  if (arguments.length < 1) {
    return result;
  }

  var data = arguments; // 如果模板参数是数组

  if (arguments.length == 1 && typeof args == "object") {
    // 如果模板参数是对象
    data = args;
  }

  for (var key in data) {
    var value = data[key];

    if (undefined != value) {
      result = result.replaceAll("\\{" + key + "\\}", value);
    }
  }

  return result;
};

cc.Class({
  "extends": cc.Component,
  properties: {
    Label_Text: cc.RichText,
    _totalTime: 10,
    //显示时长
    _countDown: 0,
    //显示倒计时
    _strTemplate_SubGame: "LHJ_SUBGAME_GAMEID_{0}"
  },
  onLoad: function onLoad() {
    ////KBEngineEvent.register("onWorldWinMSG", this, "onWorldWinMSG");
    ////KBEngineEvent.register("onSendNotice", this, "onSendNotice");
    this.node.active = false;
  },
  //取消注册
  onDestroy: function onDestroy() {////KBEngineEvent.deregister("onWorldWinMSG", this);
    ////KBEngineEvent.deregister("onSendNotice", this);
  },
  update: function update(dt) {
    this._countDown -= dt;

    if (this._countDown < 0) {
      this.node.active = false;
    }
  },
  //收到消息:玩家中奖跑马灯
  onWorldWinMSG: function onWorldWinMSG(parameterArray, strNickName) {
    this.node.active = true;
    this._countDown = this._totalTime;
    var nGameId = parameterArray[0];
    var nWinCoin = parameterArray[1];
    var template = i18n.t("LHJ_GONGGAO_WIN");
    var strGameName = i18n.t(this._strTemplate_SubGame.format(nGameId));
    this.Label_Text.string = template.format(strNickName, strGameName, nWinCoin);
  },
  //公告消息
  onSendNotice: function onSendNotice(strNotice) {
    this.node.active = true;
    this._countDown = this._totalTime;
    this.Label_Text.string = strNotice;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxwYW9tYWRlbmdcXHBhb21hZGVuZy5qcyJdLCJuYW1lcyI6WyJpMThuIiwicmVxdWlyZSIsIlN0cmluZyIsInByb3RvdHlwZSIsInJlcGxhY2VBbGwiLCJleHAiLCJuZXdTdHIiLCJyZXBsYWNlIiwiUmVnRXhwIiwiZm9ybWF0IiwiYXJncyIsInJlc3VsdCIsImFyZ3VtZW50cyIsImxlbmd0aCIsImRhdGEiLCJrZXkiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiTGFiZWxfVGV4dCIsIlJpY2hUZXh0IiwiX3RvdGFsVGltZSIsIl9jb3VudERvd24iLCJfc3RyVGVtcGxhdGVfU3ViR2FtZSIsIm9uTG9hZCIsIm5vZGUiLCJhY3RpdmUiLCJvbkRlc3Ryb3kiLCJ1cGRhdGUiLCJkdCIsIm9uV29ybGRXaW5NU0ciLCJwYXJhbWV0ZXJBcnJheSIsInN0ck5pY2tOYW1lIiwibkdhbWVJZCIsIm5XaW5Db2luIiwidGVtcGxhdGUiLCJ0Iiwic3RyR2FtZU5hbWUiLCJzdHJpbmciLCJvblNlbmROb3RpY2UiLCJzdHJOb3RpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBQyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLFVBQWpCLEdBQThCLFVBQVVDLEdBQVYsRUFBZUMsTUFBZixFQUF1QjtBQUNqRCxTQUFPLEtBQUtDLE9BQUwsQ0FBYSxJQUFJQyxNQUFKLENBQVdILEdBQVgsRUFBZ0IsSUFBaEIsQ0FBYixFQUFvQ0MsTUFBcEMsQ0FBUDtBQUNILENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FKLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQk0sTUFBakIsR0FBMEIsVUFBVUMsSUFBVixFQUFnQjtBQUN0QyxNQUFJQyxNQUFNLEdBQUcsSUFBYjs7QUFDQSxNQUFJQyxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEIsV0FBT0YsTUFBUDtBQUNIOztBQUVELE1BQUlHLElBQUksR0FBR0YsU0FBWCxDQU5zQyxDQU1oQjs7QUFDdEIsTUFBSUEsU0FBUyxDQUFDQyxNQUFWLElBQW9CLENBQXBCLElBQXlCLE9BQVFILElBQVIsSUFBaUIsUUFBOUMsRUFBd0Q7QUFDcEQ7QUFDQUksSUFBQUEsSUFBSSxHQUFHSixJQUFQO0FBQ0g7O0FBQ0QsT0FBSyxJQUFJSyxHQUFULElBQWdCRCxJQUFoQixFQUFzQjtBQUNsQixRQUFJRSxLQUFLLEdBQUdGLElBQUksQ0FBQ0MsR0FBRCxDQUFoQjs7QUFDQSxRQUFJRSxTQUFTLElBQUlELEtBQWpCLEVBQXdCO0FBQ3BCTCxNQUFBQSxNQUFNLEdBQUdBLE1BQU0sQ0FBQ1AsVUFBUCxDQUFrQixRQUFRVyxHQUFSLEdBQWMsS0FBaEMsRUFBdUNDLEtBQXZDLENBQVQ7QUFDSDtBQUNKOztBQUNELFNBQU9MLE1BQVA7QUFDSCxDQWxCRDs7QUFvQkFPLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVKLEVBQUUsQ0FBQ0ssUUFEUDtBQUVSQyxJQUFBQSxVQUFVLEVBQUUsRUFGSjtBQUVPO0FBQ2ZDLElBQUFBLFVBQVUsRUFBRSxDQUhKO0FBR007QUFDZEMsSUFBQUEsb0JBQW9CLEVBQUU7QUFKZCxHQUhQO0FBVUxDLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUNoQjtBQUNBO0FBQ0EsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLEtBQW5CO0FBQ0gsR0FkSTtBQWdCTDtBQUNBQyxFQUFBQSxTQUFTLEVBQUUscUJBQVksQ0FDbkI7QUFDQTtBQUNILEdBcEJJO0FBc0JMQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQixTQUFLUCxVQUFMLElBQW1CTyxFQUFuQjs7QUFDQSxRQUFJLEtBQUtQLFVBQUwsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDckIsV0FBS0csSUFBTCxDQUFVQyxNQUFWLEdBQW1CLEtBQW5CO0FBQ0g7QUFDSixHQTNCSTtBQTZCTDtBQUNBSSxFQUFBQSxhQUFhLEVBQUUsdUJBQVVDLGNBQVYsRUFBMEJDLFdBQTFCLEVBQXVDO0FBQ2xELFNBQUtQLElBQUwsQ0FBVUMsTUFBVixHQUFtQixJQUFuQjtBQUNBLFNBQUtKLFVBQUwsR0FBa0IsS0FBS0QsVUFBdkI7QUFFQSxRQUFJWSxPQUFPLEdBQUdGLGNBQWMsQ0FBQyxDQUFELENBQTVCO0FBQ0EsUUFBSUcsUUFBUSxHQUFHSCxjQUFjLENBQUMsQ0FBRCxDQUE3QjtBQUNBLFFBQUlJLFFBQVEsR0FBR3RDLElBQUksQ0FBQ3VDLENBQUwsQ0FBTyxpQkFBUCxDQUFmO0FBQ0EsUUFBSUMsV0FBVyxHQUFHeEMsSUFBSSxDQUFDdUMsQ0FBTCxDQUFPLEtBQUtiLG9CQUFMLENBQTBCakIsTUFBMUIsQ0FBaUMyQixPQUFqQyxDQUFQLENBQWxCO0FBQ0EsU0FBS2QsVUFBTCxDQUFnQm1CLE1BQWhCLEdBQXlCSCxRQUFRLENBQUM3QixNQUFULENBQWdCMEIsV0FBaEIsRUFBNkJLLFdBQTdCLEVBQTBDSCxRQUExQyxDQUF6QjtBQUNILEdBdkNJO0FBeUNMO0FBQ0FLLEVBQUFBLFlBQVksRUFBRSxzQkFBVUMsU0FBVixFQUFxQjtBQUMvQixTQUFLZixJQUFMLENBQVVDLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxTQUFLSixVQUFMLEdBQWtCLEtBQUtELFVBQXZCO0FBQ0EsU0FBS0YsVUFBTCxDQUFnQm1CLE1BQWhCLEdBQXlCRSxTQUF6QjtBQUNIO0FBOUNJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCBpMThuID0gcmVxdWlyZSgnaTE4bicpO1xyXG4vKipcclxuICog5pu/5o2i5omA5pyJ5Yy56YWNZXhw55qE5a2X56ym5Liy5Li65oyH5a6a5a2X56ym5LiyXHJcbiAqIEBwYXJhbSBleHAg6KKr5pu/5o2i6YOo5YiG55qE5q2j5YiZXHJcbiAqIEBwYXJhbSBuZXdTdHIg5pu/5o2i5oiQ55qE5a2X56ym5LiyXHJcbiAqL1xyXG5TdHJpbmcucHJvdG90eXBlLnJlcGxhY2VBbGwgPSBmdW5jdGlvbiAoZXhwLCBuZXdTdHIpIHtcclxuICAgIHJldHVybiB0aGlzLnJlcGxhY2UobmV3IFJlZ0V4cChleHAsIFwiZ21cIiksIG5ld1N0cik7XHJcbn07XHJcblxyXG4vKipcclxuICog5Y6f5Z6L77ya5a2X56ym5Liy5qC85byP5YyWXHJcbiAqIEBwYXJhbSBhcmdzIOagvOW8j+WMluWPguaVsOWAvFxyXG4gKi9cclxuU3RyaW5nLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiAoYXJncykge1xyXG4gICAgdmFyIHJlc3VsdCA9IHRoaXM7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkYXRhID0gYXJndW1lbnRzOyAvLyDlpoLmnpzmqKHmnb/lj4LmlbDmmK/mlbDnu4RcclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEgJiYgdHlwZW9mIChhcmdzKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgLy8g5aaC5p6c5qih5p2/5Y+C5pWw5piv5a+56LGhXHJcbiAgICAgICAgZGF0YSA9IGFyZ3M7XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGRhdGFba2V5XTtcclxuICAgICAgICBpZiAodW5kZWZpbmVkICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlQWxsKFwiXFxcXHtcIiArIGtleSArIFwiXFxcXH1cIiwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgTGFiZWxfVGV4dDogY2MuUmljaFRleHQsXHJcbiAgICAgICAgX3RvdGFsVGltZTogMTAsLy/mmL7npLrml7bplb9cclxuICAgICAgICBfY291bnREb3duOiAwLC8v5pi+56S65YCS6K6h5pe2XHJcbiAgICAgICAgX3N0clRlbXBsYXRlX1N1YkdhbWU6IFwiTEhKX1NVQkdBTUVfR0FNRUlEX3swfVwiXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vLy9LQkVuZ2luZUV2ZW50LnJlZ2lzdGVyKFwib25Xb3JsZFdpbk1TR1wiLCB0aGlzLCBcIm9uV29ybGRXaW5NU0dcIik7XHJcbiAgICAgICAgLy8vL0tCRW5naW5lRXZlbnQucmVnaXN0ZXIoXCJvblNlbmROb3RpY2VcIiwgdGhpcywgXCJvblNlbmROb3RpY2VcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+WPlua2iOazqOWGjFxyXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8vL0tCRW5naW5lRXZlbnQuZGVyZWdpc3RlcihcIm9uV29ybGRXaW5NU0dcIiwgdGhpcyk7XHJcbiAgICAgICAgLy8vL0tCRW5naW5lRXZlbnQuZGVyZWdpc3RlcihcIm9uU2VuZE5vdGljZVwiLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB0aGlzLl9jb3VudERvd24gLT0gZHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvdW50RG93biA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/mlLbliLDmtojmga86546p5a625Lit5aWW6LeR6ams54GvXHJcbiAgICBvbldvcmxkV2luTVNHOiBmdW5jdGlvbiAocGFyYW1ldGVyQXJyYXksIHN0ck5pY2tOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY291bnREb3duID0gdGhpcy5fdG90YWxUaW1lO1xyXG5cclxuICAgICAgICB2YXIgbkdhbWVJZCA9IHBhcmFtZXRlckFycmF5WzBdO1xyXG4gICAgICAgIHZhciBuV2luQ29pbiA9IHBhcmFtZXRlckFycmF5WzFdOyAgICAgICAgXHJcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gaTE4bi50KFwiTEhKX0dPTkdHQU9fV0lOXCIpO1xyXG4gICAgICAgIHZhciBzdHJHYW1lTmFtZSA9IGkxOG4udCh0aGlzLl9zdHJUZW1wbGF0ZV9TdWJHYW1lLmZvcm1hdChuR2FtZUlkKSk7XHJcbiAgICAgICAgdGhpcy5MYWJlbF9UZXh0LnN0cmluZyA9IHRlbXBsYXRlLmZvcm1hdChzdHJOaWNrTmFtZSwgc3RyR2FtZU5hbWUsIG5XaW5Db2luKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/lhazlkYrmtojmga9cclxuICAgIG9uU2VuZE5vdGljZTogZnVuY3Rpb24gKHN0ck5vdGljZSkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NvdW50RG93biA9IHRoaXMuX3RvdGFsVGltZTtcclxuICAgICAgICB0aGlzLkxhYmVsX1RleHQuc3RyaW5nID0gc3RyTm90aWNlO1xyXG4gICAgfSxcclxufSk7Il19