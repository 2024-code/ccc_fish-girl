
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game_hongbao/HongBaoPreb.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a0becVOH91CFKQiK0faI6Jv', 'HongBaoPreb');
// Script/game_hongbao/HongBaoPreb.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    money_lab: cc.Label,
    name_lab: cc.Label,
    remainNum_lab: cc.Label,
    finishBg: cc.Node
  },
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.exchangeRate = this.playerInfo.exchangeRate;
    this.netWork = require("HongBaoNetWork").getInstant;
    this.gameMain = cc.find('Canvas').getComponent('HongBaoMain');
  },
  start: function start() {
    this.initUI();
  },
  initUI: function initUI() {
    this.money_lab.string = this.data.money / this.exchangeRate + "元";
    this.name_lab.string = this.data.player;
    this.remainNum_lab.string = this.data.nowNum + "/" + this.data.maxNum;
    this.isHave = this.data.nowNum > 0;
    this.checkIsGet();
  },
  initData: function initData(data) {
    this.data = data;
  },
  //检查是否已领取
  checkIsGet: function checkIsGet() {
    this.isGet = false;

    for (var i = 0; i < this.data.receiveList.length; i++) {
      if (this.playerInfo.playerId == this.data.receiveList[i].userId) {
        this.isGet = true;
        break;
      }
    }

    this.finishBg.active = this.isGet || !this.isHave;
  },
  //打开领红包
  onClick_openGetHbPanel: function onClick_openGetHbPanel() {
    if (!this.isGet && this.isHave) {
      this.gameMain.nowHbId = this.data.hbId;
      this.gameMain.open_panel("开始抢红包");
    } else {
      this.netWork.gameSocket.emit("getHb", {
        hbId: this.data.hbId //红包id

      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lX2hvbmdiYW9cXEhvbmdCYW9QcmViLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibW9uZXlfbGFiIiwiTGFiZWwiLCJuYW1lX2xhYiIsInJlbWFpbk51bV9sYWIiLCJmaW5pc2hCZyIsIk5vZGUiLCJvbkxvYWQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJleGNoYW5nZVJhdGUiLCJuZXRXb3JrIiwiZ2FtZU1haW4iLCJmaW5kIiwiZ2V0Q29tcG9uZW50Iiwic3RhcnQiLCJpbml0VUkiLCJzdHJpbmciLCJkYXRhIiwibW9uZXkiLCJwbGF5ZXIiLCJub3dOdW0iLCJtYXhOdW0iLCJpc0hhdmUiLCJjaGVja0lzR2V0IiwiaW5pdERhdGEiLCJpc0dldCIsImkiLCJyZWNlaXZlTGlzdCIsImxlbmd0aCIsInBsYXllcklkIiwidXNlcklkIiwiYWN0aXZlIiwib25DbGlja19vcGVuR2V0SGJQYW5lbCIsIm5vd0hiSWQiLCJoYklkIiwib3Blbl9wYW5lbCIsImdhbWVTb2NrZXQiLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFSixFQUFFLENBQUNLLEtBRE47QUFFUkMsSUFBQUEsUUFBUSxFQUFFTixFQUFFLENBQUNLLEtBRkw7QUFHUkUsSUFBQUEsYUFBYSxFQUFFUCxFQUFFLENBQUNLLEtBSFY7QUFJUkcsSUFBQUEsUUFBUSxFQUFFUixFQUFFLENBQUNTO0FBSkwsR0FIUDtBQVVMQyxFQUFBQSxNQVZLLG9CQVVJO0FBQ0wsU0FBS0MsVUFBTCxHQUFrQkMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBeEM7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEtBQUtILFVBQUwsQ0FBZ0JHLFlBQXBDO0FBQ0EsU0FBS0MsT0FBTCxHQUFlSCxPQUFPLENBQUMsZ0JBQUQsQ0FBUCxDQUEwQkMsVUFBekM7QUFDQSxTQUFLRyxRQUFMLEdBQWdCaEIsRUFBRSxDQUFDaUIsSUFBSCxDQUFRLFFBQVIsRUFBa0JDLFlBQWxCLENBQStCLGFBQS9CLENBQWhCO0FBQ0gsR0FmSTtBQWlCTEMsRUFBQUEsS0FqQkssbUJBaUJHO0FBQ0osU0FBS0MsTUFBTDtBQUNILEdBbkJJO0FBcUJMQSxFQUFBQSxNQXJCSyxvQkFxQkk7QUFDTCxTQUFLaEIsU0FBTCxDQUFlaUIsTUFBZixHQUF3QixLQUFLQyxJQUFMLENBQVVDLEtBQVYsR0FBa0IsS0FBS1QsWUFBdkIsR0FBc0MsR0FBOUQ7QUFDQSxTQUFLUixRQUFMLENBQWNlLE1BQWQsR0FBdUIsS0FBS0MsSUFBTCxDQUFVRSxNQUFqQztBQUNBLFNBQUtqQixhQUFMLENBQW1CYyxNQUFuQixHQUErQixLQUFLQyxJQUFMLENBQVVHLE1BQXpDLFNBQW1ELEtBQUtILElBQUwsQ0FBVUksTUFBN0Q7QUFDQSxTQUFLQyxNQUFMLEdBQWMsS0FBS0wsSUFBTCxDQUFVRyxNQUFWLEdBQW1CLENBQWpDO0FBQ0EsU0FBS0csVUFBTDtBQUNILEdBM0JJO0FBNkJMQyxFQUFBQSxRQTdCSyxvQkE2QklQLElBN0JKLEVBNkJVO0FBQ1gsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0gsR0EvQkk7QUFnQ0w7QUFDQU0sRUFBQUEsVUFqQ0ssd0JBaUNRO0FBQ1QsU0FBS0UsS0FBTCxHQUFhLEtBQWI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtULElBQUwsQ0FBVVUsV0FBVixDQUFzQkMsTUFBMUMsRUFBa0RGLENBQUMsRUFBbkQsRUFBdUQ7QUFDbkQsVUFBSSxLQUFLcEIsVUFBTCxDQUFnQnVCLFFBQWhCLElBQTRCLEtBQUtaLElBQUwsQ0FBVVUsV0FBVixDQUFzQkQsQ0FBdEIsRUFBeUJJLE1BQXpELEVBQWlFO0FBQzdELGFBQUtMLEtBQUwsR0FBYSxJQUFiO0FBQ0E7QUFDSDtBQUNKOztBQUNELFNBQUt0QixRQUFMLENBQWM0QixNQUFkLEdBQXVCLEtBQUtOLEtBQUwsSUFBYyxDQUFDLEtBQUtILE1BQTNDO0FBQ0gsR0ExQ0k7QUEyQ0w7QUFDQVUsRUFBQUEsc0JBNUNLLG9DQTRDb0I7QUFDckIsUUFBSSxDQUFDLEtBQUtQLEtBQU4sSUFBZSxLQUFLSCxNQUF4QixFQUFnQztBQUM1QixXQUFLWCxRQUFMLENBQWNzQixPQUFkLEdBQXdCLEtBQUtoQixJQUFMLENBQVVpQixJQUFsQztBQUNBLFdBQUt2QixRQUFMLENBQWN3QixVQUFkLENBQXlCLE9BQXpCO0FBQ0gsS0FIRCxNQUdLO0FBQ0QsV0FBS3pCLE9BQUwsQ0FBYTBCLFVBQWIsQ0FBd0JDLElBQXhCLENBQTZCLE9BQTdCLEVBQXNDO0FBQ2xDSCxRQUFBQSxJQUFJLEVBQUUsS0FBS2pCLElBQUwsQ0FBVWlCLElBRGtCLENBQ1o7O0FBRFksT0FBdEM7QUFHSDtBQUNKO0FBckRJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbW9uZXlfbGFiOiBjYy5MYWJlbCxcclxuICAgICAgICBuYW1lX2xhYjogY2MuTGFiZWwsXHJcbiAgICAgICAgcmVtYWluTnVtX2xhYjogY2MuTGFiZWwsXHJcbiAgICAgICAgZmluaXNoQmc6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMuZXhjaGFuZ2VSYXRlID0gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsgPSByZXF1aXJlKFwiSG9uZ0Jhb05ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLmdhbWVNYWluID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdIb25nQmFvTWFpbicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmluaXRVSSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0VUkoKSB7XHJcbiAgICAgICAgdGhpcy5tb25leV9sYWIuc3RyaW5nID0gdGhpcy5kYXRhLm1vbmV5IC8gdGhpcy5leGNoYW5nZVJhdGUgKyBcIuWFg1wiO1xyXG4gICAgICAgIHRoaXMubmFtZV9sYWIuc3RyaW5nID0gdGhpcy5kYXRhLnBsYXllcjtcclxuICAgICAgICB0aGlzLnJlbWFpbk51bV9sYWIuc3RyaW5nID0gYCR7dGhpcy5kYXRhLm5vd051bX0vJHt0aGlzLmRhdGEubWF4TnVtfWA7XHJcbiAgICAgICAgdGhpcy5pc0hhdmUgPSB0aGlzLmRhdGEubm93TnVtID4gMDtcclxuICAgICAgICB0aGlzLmNoZWNrSXNHZXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdERhdGEoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9LFxyXG4gICAgLy/mo4Dmn6XmmK/lkKblt7Lpooblj5ZcclxuICAgIGNoZWNrSXNHZXQoKSB7XHJcbiAgICAgICAgdGhpcy5pc0dldCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLnJlY2VpdmVMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckluZm8ucGxheWVySWQgPT0gdGhpcy5kYXRhLnJlY2VpdmVMaXN0W2ldLnVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0dldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpbmlzaEJnLmFjdGl2ZSA9IHRoaXMuaXNHZXQgfHwgIXRoaXMuaXNIYXZlO1xyXG4gICAgfSxcclxuICAgIC8v5omT5byA6aKG57qi5YyFXHJcbiAgICBvbkNsaWNrX29wZW5HZXRIYlBhbmVsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0dldCAmJiB0aGlzLmlzSGF2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVNYWluLm5vd0hiSWQgPSB0aGlzLmRhdGEuaGJJZDtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTWFpbi5vcGVuX3BhbmVsKFwi5byA5aeL5oqi57qi5YyFXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuZ2FtZVNvY2tldC5lbWl0KFwiZ2V0SGJcIiwge1xyXG4gICAgICAgICAgICAgICAgaGJJZDogdGhpcy5kYXRhLmhiSWQsIC8v57qi5YyFaWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=