
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Slot_diamond/DiamondNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '874faHgbhdCjZSYrgGCKmW0', 'DiamondNetwork');
// Script/Slot_diamond/DiamondNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('DiamondMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('DiamondAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15035';
    this.socket = io.connect(this.url);
    this.addEvent();
  },
  addEvent: function addEvent() {
    var _this = this;

    this.socket.on('connected', function () {
      _this.socket.emit('LoginGame', JSON.stringify({
        userid: _this.playerInfo.playerId,
        gametype: null,
        sign: _this.playerInfo.gameSign
      }));
    });
    this.socket.on('loginGameResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('LoginGameResult:', data);
      window.DIAMOND_LOBBYNET.disconnect();

      _this.socket.emit('LoginfreeCount');
    });
    this.socket.on('lotteryResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('lotteryResult:', data);

      if (!!data.ResultCode && data.ResultCode == 1) {
        _this.mainObj.lotteryRes = JSON.parse(JSON.stringify(data.ResultData));

        _this.mainObj.roll(data.ResultData.viewarray.nHandCards);
      }
    });
    this.socket.on('LoginRoomResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('LoginRoomResult', data); // self.canvas.onFreeTime(data.ResultData.freeCount);                    //调用刷新免费次数的方法 
    });
    this.socket.on('LoginfreeCountResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('LoginfreeCountResult:', data);

      if (data.ResultCode == 1 && data.freeCount > 0) {
        _this.mainObj.freeTimes = data.freeCount - 1;

        _this.mainObj.closeShine();

        _this.mainObj.startFreeGame();
      }
    });
  },
  changeResultJSON_Function: function changeResultJSON_Function(ret) {
    if (cc.sys.isNative) {
      return JSON.parse(ret);
    }

    return ret;
  },
  onDestroy: function onDestroy() {
    this.socket.emit('cleanLineOut');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTbG90X2RpYW1vbmRcXERpYW1vbmROZXR3b3JrLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibWFpbk9iaiIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJhdWRpbyIsInN0YXJ0IiwidXJsIiwiTGhqY29uZmlnIiwiU2VydmVyX0lQIiwic29ja2V0IiwiaW8iLCJjb25uZWN0IiwiYWRkRXZlbnQiLCJvbiIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlcmlkIiwicGxheWVySWQiLCJnYW1ldHlwZSIsInNpZ24iLCJnYW1lU2lnbiIsImRhdGEiLCJjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsIkRJQU1PTkRfTE9CQllORVQiLCJkaXNjb25uZWN0IiwiUmVzdWx0Q29kZSIsImxvdHRlcnlSZXMiLCJwYXJzZSIsIlJlc3VsdERhdGEiLCJyb2xsIiwidmlld2FycmF5IiwibkhhbmRDYXJkcyIsImZyZWVDb3VudCIsImZyZWVUaW1lcyIsImNsb3NlU2hpbmUiLCJzdGFydEZyZWVHYW1lIiwicmV0Iiwic3lzIiwiaXNOYXRpdmUiLCJvbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBT0xDLEVBQUFBLE1BUEssb0JBT0k7QUFDTCxTQUFLQyxPQUFMLEdBQWUsS0FBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCLGFBQXZCLENBQWY7QUFDQSxTQUFLQyxVQUFMLEdBQWtCQyxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQyxVQUF4QztBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFLTCxJQUFM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Q3RDLE9BQUwsQ0FBYXdDLFVBQWI7O0FBQ0EsUUFBQSxLQUFJLENBQUN4QyxPQUFMLENBQWF5QyxhQUFiO0FBQ0g7QUFDSixLQVJEO0FBU0gsR0EzREk7QUE2RExoQixFQUFBQSx5QkE3REsscUNBNkRxQmlCLEdBN0RyQixFQTZEMEI7QUFDM0IsUUFBSS9DLEVBQUUsQ0FBQ2dELEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQixhQUFPM0IsSUFBSSxDQUFDZ0IsS0FBTCxDQUFXUyxHQUFYLENBQVA7QUFDSDs7QUFDRCxXQUFPQSxHQUFQO0FBQ0gsR0FsRUk7QUFvRUxHLEVBQUFBLFNBcEVLLHVCQW9FTztBQUNSLFNBQUtsQyxNQUFMLENBQVlLLElBQVosQ0FBaUIsY0FBakI7QUFDSDtBQXRFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubWFpbk9iaiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ0RpYW1vbmRNYWluJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnRGlhbW9uZEF1ZGlvJyk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnVybCA9IExoamNvbmZpZy5TZXJ2ZXJfSVAgKyAnOjE1MDM1JztcclxuICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QodGhpcy51cmwpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGFkZEV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdjb25uZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ0xvZ2luR2FtZScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHVzZXJpZDogdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgZ2FtZXR5cGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzaWduOiB0aGlzLnBsYXllckluZm8uZ2FtZVNpZ25cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbignbG9naW5HYW1lUmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbkdhbWVSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5ESUFNT05EX0xPQkJZTkVULmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnTG9naW5mcmVlQ291bnQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2xvdHRlcnlSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvdHRlcnlSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEuUmVzdWx0Q29kZSAmJiBkYXRhLlJlc3VsdENvZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmxvdHRlcnlSZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEuUmVzdWx0RGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnJvbGwoZGF0YS5SZXN1bHREYXRhLnZpZXdhcnJheS5uSGFuZENhcmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdMb2dpblJvb21SZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luUm9vbVJlc3VsdCcsIGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBzZWxmLmNhbnZhcy5vbkZyZWVUaW1lKGRhdGEuUmVzdWx0RGF0YS5mcmVlQ291bnQpOyAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjliLfmlrDlhY3otLnmrKHmlbDnmoTmlrnms5UgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ0xvZ2luZnJlZUNvdW50UmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbmZyZWVDb3VudFJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuUmVzdWx0Q29kZSA9PSAxICYmIGRhdGEuZnJlZUNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmZyZWVUaW1lcyA9IGRhdGEuZnJlZUNvdW50IC0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouc3RhcnRGcmVlR2FtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnY2xlYW5MaW5lT3V0Jyk7XHJcbiAgICB9XHJcbn0pOyJdfQ==