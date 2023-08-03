
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game_hongbao/HongBaoPlayer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eea2cnLlKhKArG+7OKWVfag', 'HongBaoPlayer');
// Script/game_hongbao/HongBaoPlayer.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    headIco: cc.Sprite,
    lab_name: cc.Label,
    lab_coin: cc.Label,
    lab_packageMoney: cc.Label,
    lab_date: cc.Label
  },
  onLoad: function onLoad() {
    this.pInfo = require("PlayerInfo").getInstant;
    this.gameMain = cc.find('Canvas').getComponent('HongBaoMain');
  },
  start: function start() {
    var _this = this;

    Helper.loadHead(this.pInfo.playerHeadId, function (sp) {
      _this.headIco.getComponent(cc.Sprite).spriteFrame = sp;
    });
    this.lab_name.string = this.pInfo.playerName;
    this.lab_coin && (this.lab_coin.string = (this.pInfo.playerCoin / this.pInfo.exchangeRate).toFixed(2));
  },
  updateView: function updateView(data) {
    this.lab_coin.string = (data.ResultData.userscore / this.pInfo.exchangeRate).toFixed(2);
  },
  update: function update(dt) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lX2hvbmdiYW9cXEhvbmdCYW9QbGF5ZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJoZWFkSWNvIiwiU3ByaXRlIiwibGFiX25hbWUiLCJMYWJlbCIsImxhYl9jb2luIiwibGFiX3BhY2thZ2VNb25leSIsImxhYl9kYXRlIiwib25Mb2FkIiwicEluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsImdhbWVNYWluIiwiZmluZCIsImdldENvbXBvbmVudCIsInN0YXJ0IiwiSGVscGVyIiwibG9hZEhlYWQiLCJwbGF5ZXJIZWFkSWQiLCJzcCIsInNwcml0ZUZyYW1lIiwic3RyaW5nIiwicGxheWVyTmFtZSIsInBsYXllckNvaW4iLCJleGNoYW5nZVJhdGUiLCJ0b0ZpeGVkIiwidXBkYXRlVmlldyIsImRhdGEiLCJSZXN1bHREYXRhIiwidXNlcnNjb3JlIiwidXBkYXRlIiwiZHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxPQUFPLEVBQUVKLEVBQUUsQ0FBQ0ssTUFESjtBQUVSQyxJQUFBQSxRQUFRLEVBQUVOLEVBQUUsQ0FBQ08sS0FGTDtBQUdSQyxJQUFBQSxRQUFRLEVBQUVSLEVBQUUsQ0FBQ08sS0FITDtBQUlSRSxJQUFBQSxnQkFBZ0IsRUFBRVQsRUFBRSxDQUFDTyxLQUpiO0FBS1JHLElBQUFBLFFBQVEsRUFBRVYsRUFBRSxDQUFDTztBQUxMLEdBSFA7QUFXTEksRUFBQUEsTUFYSyxvQkFXSTtBQUNMLFNBQUtDLEtBQUwsR0FBYUMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBbkM7QUFDQSxTQUFLQyxRQUFMLEdBQWdCZixFQUFFLENBQUNnQixJQUFILENBQVEsUUFBUixFQUFrQkMsWUFBbEIsQ0FBK0IsYUFBL0IsQ0FBaEI7QUFDSCxHQWRJO0FBZ0JMQyxFQUFBQSxLQWhCSyxtQkFnQkc7QUFBQTs7QUFDSkMsSUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCLEtBQUtSLEtBQUwsQ0FBV1MsWUFBM0IsRUFBeUMsVUFBQUMsRUFBRSxFQUFJO0FBQzNDLE1BQUEsS0FBSSxDQUFDbEIsT0FBTCxDQUFhYSxZQUFiLENBQTBCakIsRUFBRSxDQUFDSyxNQUE3QixFQUFxQ2tCLFdBQXJDLEdBQW1ERCxFQUFuRDtBQUNILEtBRkQ7QUFHQSxTQUFLaEIsUUFBTCxDQUFja0IsTUFBZCxHQUF1QixLQUFLWixLQUFMLENBQVdhLFVBQWxDO0FBQ0EsU0FBS2pCLFFBQUwsS0FBa0IsS0FBS0EsUUFBTCxDQUFjZ0IsTUFBZCxHQUF1QixDQUFDLEtBQUtaLEtBQUwsQ0FBV2MsVUFBWCxHQUF3QixLQUFLZCxLQUFMLENBQVdlLFlBQXBDLEVBQWtEQyxPQUFsRCxDQUEwRCxDQUExRCxDQUF6QztBQUNILEdBdEJJO0FBd0JMQyxFQUFBQSxVQXhCSyxzQkF3Qk1DLElBeEJOLEVBd0JZO0FBQ2IsU0FBS3RCLFFBQUwsQ0FBY2dCLE1BQWQsR0FBdUIsQ0FBQ00sSUFBSSxDQUFDQyxVQUFMLENBQWdCQyxTQUFoQixHQUE0QixLQUFLcEIsS0FBTCxDQUFXZSxZQUF4QyxFQUFzREMsT0FBdEQsQ0FBOEQsQ0FBOUQsQ0FBdkI7QUFDSCxHQTFCSTtBQTRCTEssRUFBQUEsTUE1Qkssa0JBNEJFQyxFQTVCRixFQTRCTSxDQUVWO0FBOUJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGhlYWRJY286IGNjLlNwcml0ZSxcclxuICAgICAgICBsYWJfbmFtZTogY2MuTGFiZWwsXHJcbiAgICAgICAgbGFiX2NvaW46IGNjLkxhYmVsLFxyXG4gICAgICAgIGxhYl9wYWNrYWdlTW9uZXk6IGNjLkxhYmVsLFxyXG4gICAgICAgIGxhYl9kYXRlOiBjYy5MYWJlbCxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucEluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMuZ2FtZU1haW4gPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0hvbmdCYW9NYWluJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIEhlbHBlci5sb2FkSGVhZCh0aGlzLnBJbmZvLnBsYXllckhlYWRJZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRJY28uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxhYl9uYW1lLnN0cmluZyA9IHRoaXMucEluZm8ucGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLmxhYl9jb2luICYmICh0aGlzLmxhYl9jb2luLnN0cmluZyA9ICh0aGlzLnBJbmZvLnBsYXllckNvaW4gLyB0aGlzLnBJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVZpZXcoZGF0YSkge1xyXG4gICAgICAgIHRoaXMubGFiX2NvaW4uc3RyaW5nID0gKGRhdGEuUmVzdWx0RGF0YS51c2Vyc2NvcmUgLyB0aGlzLnBJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcblxyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==