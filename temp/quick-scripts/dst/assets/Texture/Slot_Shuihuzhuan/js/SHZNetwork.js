
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_Shuihuzhuan/js/SHZNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7ac8dLuCdBC9Z77tUUQZq41', 'SHZNetwork');
// Texture/Slot_Shuihuzhuan/js/SHZNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('SHZMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('SHZAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15016';
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
      window.SHZ_LOBBYNET.disconnect();

      _this.socket.emit('LoginfreeCount');
    });
    this.socket.on('lotteryResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('lotteryResult:', data);

      if (!!data.ResultCode && data.ResultCode == 1) {
        _this.mainObj.lotteryRes = JSON.parse(JSON.stringify(data.ResultData));

        _this.mainObj.roll(data.ResultData.viewarray.nHandCards);
      } else {
        _this.mainObj.status = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9TaHVpaHV6aHVhblxcanNcXFNIWk5ldHdvcmsuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJtYWluT2JqIiwibm9kZSIsImdldENvbXBvbmVudCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsImF1ZGlvIiwic3RhcnQiLCJ1cmwiLCJMaGpjb25maWciLCJTZXJ2ZXJfSVAiLCJzb2NrZXQiLCJpbyIsImNvbm5lY3QiLCJhZGRFdmVudCIsIm9uIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VyaWQiLCJwbGF5ZXJJZCIsImdhbWV0eXBlIiwic2lnbiIsImdhbWVTaWduIiwiZGF0YSIsImNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24iLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiU0haX0xPQkJZTkVUIiwiZGlzY29ubmVjdCIsIlJlc3VsdENvZGUiLCJsb3R0ZXJ5UmVzIiwicGFyc2UiLCJSZXN1bHREYXRhIiwicm9sbCIsInZpZXdhcnJheSIsIm5IYW5kQ2FyZHMiLCJzdGF0dXMiLCJmcmVlQ291bnQiLCJmcmVlVGltZXMiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsInJldCIsInN5cyIsImlzTmF0aXZlIiwib25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MQyxFQUFBQSxNQVBLLG9CQU9JO0FBQ0wsU0FBS0MsT0FBTCxHQUFlLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixTQUF2QixDQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBeEM7QUFDQSxTQUFLQyxLQUFMLEdBQWEs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Q3ZDLE9BQUwsQ0FBYXdDLFNBQWIsR0FBeUJoQixJQUFJLENBQUNlLFNBQUwsR0FBaUIsQ0FBMUM7O0FBQ0EsUUFBQSxLQUFJLENBQUN2QyxPQUFMLENBQWF5QyxVQUFiOztBQUNBLFFBQUEsS0FBSSxDQUFDekMsT0FBTCxDQUFhMEMsYUFBYjtBQUNIO0FBQ0osS0FSRDtBQVNILEdBN0RJO0FBK0RMakIsRUFBQUEseUJBL0RLLHFDQStEcUJrQixHQS9EckIsRUErRDBCO0FBQzNCLFFBQUloRCxFQUFFLENBQUNpRCxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsYUFBTzVCLElBQUksQ0FBQ2dCLEtBQUwsQ0FBV1UsR0FBWCxDQUFQO0FBQ0g7O0FBQ0QsV0FBT0EsR0FBUDtBQUNILEdBcEVJO0FBc0VMRyxFQUFBQSxTQXRFSyx1QkFzRU87QUFDUixTQUFLbkMsTUFBTCxDQUFZSyxJQUFaLENBQWlCLGNBQWpCO0FBQ0g7QUF4RUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm1haW5PYmogPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdTSFpNYWluJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnU0haQXVkaW8nKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMudXJsID0gTGhqY29uZmlnLlNlcnZlcl9JUCArICc6MTUwMTYnO1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gaW8uY29ubmVjdCh0aGlzLnVybCk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgYWRkRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnTG9naW5HYW1lJywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdXNlcmlkOiB0aGlzLnBsYXllckluZm8ucGxheWVySWQsXHJcbiAgICAgICAgICAgICAgICBnYW1ldHlwZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHNpZ246IHRoaXMucGxheWVySW5mby5nYW1lU2lnblxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb2dpbkdhbWVSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luR2FtZVJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgd2luZG93LlNIWl9MT0JCWU5FVC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ0xvZ2luZnJlZUNvdW50Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb3R0ZXJ5UmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb3R0ZXJ5UmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoISFkYXRhLlJlc3VsdENvZGUgJiYgZGF0YS5SZXN1bHRDb2RlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5sb3R0ZXJ5UmVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhLlJlc3VsdERhdGEpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5yb2xsKGRhdGEuUmVzdWx0RGF0YS52aWV3YXJyYXkubkhhbmRDYXJkcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdMb2dpblJvb21SZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luUm9vbVJlc3VsdCcsIGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBzZWxmLmNhbnZhcy5vbkZyZWVUaW1lKGRhdGEuUmVzdWx0RGF0YS5mcmVlQ291bnQpOyAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjliLfmlrDlhY3otLnmrKHmlbDnmoTmlrnms5UgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ0xvZ2luZnJlZUNvdW50UmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbmZyZWVDb3VudFJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuUmVzdWx0Q29kZSA9PSAxICYmIGRhdGEuZnJlZUNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmZyZWVUaW1lcyA9IGRhdGEuZnJlZUNvdW50IC0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouc3RhcnRGcmVlR2FtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnY2xlYW5MaW5lT3V0Jyk7XHJcbiAgICB9XHJcbn0pOyJdfQ==