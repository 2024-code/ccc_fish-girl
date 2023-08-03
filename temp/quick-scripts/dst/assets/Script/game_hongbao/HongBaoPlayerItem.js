
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game_hongbao/HongBaoPlayerItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3373aPjhbBHIau0RWTqTXqM', 'HongBaoPlayerItem');
// Script/game_hongbao/HongBaoPlayerItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    headIco: cc.Sprite,
    lab_name: cc.Label,
    lab_packageMoney: cc.Label,
    lab_date: cc.Label
  },
  onLoad: function onLoad() {
    this.pInfo = require("PlayerInfo").getInstant;
    this.gameMain = cc.find('Canvas').getComponent('HongBaoMain');
  },
  start: function start() {
    this.initUI();
  },
  initUI: function initUI() {
    var _this = this;

    Helper.loadHead(this.data.headUrl, function (sp) {
      _this.headIco.getComponent(cc.Sprite).spriteFrame = sp;
    });
    this.lab_name.string = this.data.nickname;
    this.lab_packageMoney.string = (this.data.packageMoney / this.pInfo.exchangeRate).toFixed(2);
    this.lab_date.string = new Date(this.data.date).Format("yyyy-MM-dd hh:mm:ss");
  },
  initData: function initData(data) {
    this.data = data;
  }
});

Date.prototype.Format = function (fmt) {
  //author: meizz   
  var o = {
    "M+": this.getMonth() + 1,
    //月份   
    "d+": this.getDate(),
    //日   
    "h+": this.getHours(),
    //小时   
    "m+": this.getMinutes(),
    //分   
    "s+": this.getSeconds(),
    //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3),
    //季度   
    "S": this.getMilliseconds() //毫秒   

  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }

  return fmt;
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lX2hvbmdiYW9cXEhvbmdCYW9QbGF5ZXJJdGVtLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaGVhZEljbyIsIlNwcml0ZSIsImxhYl9uYW1lIiwiTGFiZWwiLCJsYWJfcGFja2FnZU1vbmV5IiwibGFiX2RhdGUiLCJvbkxvYWQiLCJwSW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwiZ2FtZU1haW4iLCJmaW5kIiwiZ2V0Q29tcG9uZW50Iiwic3RhcnQiLCJpbml0VUkiLCJIZWxwZXIiLCJsb2FkSGVhZCIsImRhdGEiLCJoZWFkVXJsIiwic3AiLCJzcHJpdGVGcmFtZSIsInN0cmluZyIsIm5pY2tuYW1lIiwicGFja2FnZU1vbmV5IiwiZXhjaGFuZ2VSYXRlIiwidG9GaXhlZCIsIkRhdGUiLCJkYXRlIiwiRm9ybWF0IiwiaW5pdERhdGEiLCJwcm90b3R5cGUiLCJmbXQiLCJvIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsIk1hdGgiLCJmbG9vciIsImdldE1pbGxpc2Vjb25kcyIsInRlc3QiLCJyZXBsYWNlIiwiUmVnRXhwIiwiJDEiLCJnZXRGdWxsWWVhciIsInN1YnN0ciIsImxlbmd0aCIsImsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxPQUFPLEVBQUVKLEVBQUUsQ0FBQ0ssTUFESjtBQUVSQyxJQUFBQSxRQUFRLEVBQUVOLEVBQUUsQ0FBQ08sS0FGTDtBQUdSQyxJQUFBQSxnQkFBZ0IsRUFBRVIsRUFBRSxDQUFDTyxLQUhiO0FBSVJFLElBQUFBLFFBQVEsRUFBRVQsRUFBRSxDQUFDTztBQUpMLEdBSFA7QUFVTEcsRUFBQUEsTUFWSyxv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Y2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBoZWFkSWNvOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgbGFiX25hbWU6IGNjLkxhYmVsLFxyXG4gICAgICAgIGxhYl9wYWNrYWdlTW9uZXk6IGNjLkxhYmVsLFxyXG4gICAgICAgIGxhYl9kYXRlOiBjYy5MYWJlbCxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucEluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMuZ2FtZU1haW4gPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0hvbmdCYW9NYWluJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFVJKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRVSSgpIHtcclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQodGhpcy5kYXRhLmhlYWRVcmwsIHNwID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkSWNvLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3A7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5sYWJfbmFtZS5zdHJpbmcgPSB0aGlzLmRhdGEubmlja25hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJfcGFja2FnZU1vbmV5LnN0cmluZyA9ICh0aGlzLmRhdGEucGFja2FnZU1vbmV5IC8gdGhpcy5wSW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5sYWJfZGF0ZS5zdHJpbmcgPSBuZXcgRGF0ZSh0aGlzLmRhdGEuZGF0ZSkuRm9ybWF0KFwieXl5eS1NTS1kZCBoaDptbTpzc1wiKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdERhdGEoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbkRhdGUucHJvdG90eXBlLkZvcm1hdCA9IGZ1bmN0aW9uIChmbXQpIHsgLy9hdXRob3I6IG1laXp6ICAgXHJcbiAgICB2YXIgbyA9IHtcclxuICAgICAgICBcIk0rXCI6IHRoaXMuZ2V0TW9udGgoKSArIDEsICAgICAgICAgICAgICAgICAvL+aciOS7vSAgIFxyXG4gICAgICAgIFwiZCtcIjogdGhpcy5nZXREYXRlKCksICAgICAgICAgICAgICAgICAgICAvL+aXpSAgIFxyXG4gICAgICAgIFwiaCtcIjogdGhpcy5nZXRIb3VycygpLCAgICAgICAgICAgICAgICAgICAvL+Wwj+aXtiAgIFxyXG4gICAgICAgIFwibStcIjogdGhpcy5nZXRNaW51dGVzKCksICAgICAgICAgICAgICAgICAvL+WIhiAgIFxyXG4gICAgICAgIFwicytcIjogdGhpcy5nZXRTZWNvbmRzKCksICAgICAgICAgICAgICAgICAvL+enkiAgIFxyXG4gICAgICAgIFwicStcIjogTWF0aC5mbG9vcigodGhpcy5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqYgICBcclxuICAgICAgICBcIlNcIjogdGhpcy5nZXRNaWxsaXNlY29uZHMoKSAgICAgICAgICAgICAvL+avq+enkiAgIFxyXG4gICAgfTtcclxuICAgIGlmICgvKHkrKS8udGVzdChmbXQpKVxyXG4gICAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKHRoaXMuZ2V0RnVsbFllYXIoKSArIFwiXCIpLnN1YnN0cig0IC0gUmVnRXhwLiQxLmxlbmd0aCkpO1xyXG4gICAgZm9yICh2YXIgayBpbiBvKVxyXG4gICAgICAgIGlmIChuZXcgUmVnRXhwKFwiKFwiICsgayArIFwiKVwiKS50ZXN0KGZtdCkpXHJcbiAgICAgICAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKFJlZ0V4cC4kMS5sZW5ndGggPT0gMSkgPyAob1trXSkgOiAoKFwiMDBcIiArIG9ba10pLnN1YnN0cigoXCJcIiArIG9ba10pLmxlbmd0aCkpKTtcclxuICAgIHJldHVybiBmbXQ7XHJcbn07XHJcbiJdfQ==