
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_MengHuanNvShen/js/MHNSNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'afb70e8tIFAeJ6ypXzyhcwg', 'MHNSNetwork');
// Texture/Slot_MengHuanNvShen/js/MHNSNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('MHNSMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('MHNSAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15046';
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
      window.MHNS_LOBBYNET.disconnect();

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
    this.socket.on('freeTimeTypeResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('freeTimeTypeResult:', data);

      if (data.ResultCode >= 0) {
        _this.mainObj.setTypeResult(data.ResultData);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9NZW5nSHVhbk52U2hlblxcanNcXE1ITlNOZXR3b3JrLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibWFpbk9iaiIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJhdWRpbyIsInN0YXJ0IiwidXJsIiwiTGhqY29uZmlnIiwiU2VydmVyX0lQIiwic29ja2V0IiwiaW8iLCJjb25uZWN0IiwiYWRkRXZlbnQiLCJvbiIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlcmlkIiwicGxheWVySWQiLCJnYW1ldHlwZSIsInNpZ24iLCJnYW1lU2lnbiIsImRhdGEiLCJjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsIk1ITlNfTE9CQllORVQiLCJkaXNjb25uZWN0IiwiUmVzdWx0Q29kZSIsImxvdHRlcnlSZXMiLCJwYXJzZSIsIlJlc3VsdERhdGEiLCJyb2xsIiwidmlld2FycmF5IiwibkhhbmRDYXJkcyIsInN0YXR1cyIsInNldFR5cGVSZXN1bHQiLCJmcmVlQ291bnQiLCJmcmVlVGltZXMiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsInJldCIsInN5cyIsImlzTmF0aXZlIiwib25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MQyxFQUFBQSxNQVBLLG9CQU9JO0FBQ0wsU0FBS0MsT0FBTCxHQUFlLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixVQUF2QixDQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBeEM7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LENBQVksaUJBQVosRUFBK0JILElBQS9CLEVBRnNDLENBR3RDO0FBQ0gsS0FKRDtBQUtBLFNBQUtiLE1BQUwsQ0FBWUksRUFBWixDQUFlLHNCQUFmLEVBQXVDLFVBQUFTLElBQUksRUFBSTtBQUMzQ0EsTUFBQUEsSUFBSSxHQUFHLEtBQUksQ0FBQ0MseUJBQUwsQ0FBK0JELElBQS9CLENBQVA7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksdUJBQVosRUFBcUNILElBQXJDOztBQUNBLFVBQUlBLElBQUksQ0FBQ08sVUFBTCxJQUFtQixDQUFuQixJQUF3QlAsSUFBSSxDQUFDZ0IsU0FBTCxHQUFpQixDQUE3QyxFQUFnRDtBQUM1QyxRQUFBLEtBQUksQ0FBQ3hDLE9BQUwsQ0FBYXlDLFNBQWIsR0FBeUJqQixJQUFJLENBQUNnQixTQUFMLEdBQWlCLENBQTFDOztBQUNBLFFBQUEsS0FBSSxDQUFDeEMsT0FBTCxDQUFhMEMsVUFBYjs7QUFDQSxRQUFBLEtBQUksQ0FBQzFDLE9BQUwsQ0FBYTJDLGFBQWI7QUFDSDtBQUNKLEtBUkQ7QUFTSCxHQXBFSTtBQXNFTGxCLEVBQUFBLHlCQXRFSyxxQ0FzRXFCbUIsR0F0RXJCLEVBc0UwQjtBQUMzQixRQUFJakQsRUFBRSxDQUFDa0QsR0FBSCxDQUFPQyxRQUFYLEVBQXFCO0FBQ2pCLGFBQU83QixJQUFJLENBQUNnQixLQUFMLENBQVdXLEdBQVgsQ0FBUDtBQUNIOztBQUNELFdBQU9BLEdBQVA7QUFDSCxHQTNFSTtBQTZFTEcsRUFBQUEsU0E3RUssdUJBNkVPO0FBQ1IsU0FBS3BDLE1BQUwsQ0FBWUssSUFBWixDQUFpQixjQUFqQjtBQUNIO0FBL0VJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnTUhOU01haW4nKTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdNSE5TQXVkaW8nKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMudXJsID0gTGhqY29uZmlnLlNlcnZlcl9JUCArICc6MTUwNDYnO1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gaW8uY29ubmVjdCh0aGlzLnVybCk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgYWRkRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnTG9naW5HYW1lJywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdXNlcmlkOiB0aGlzLnBsYXllckluZm8ucGxheWVySWQsXHJcbiAgICAgICAgICAgICAgICBnYW1ldHlwZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHNpZ246IHRoaXMucGxheWVySW5mby5nYW1lU2lnblxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb2dpbkdhbWVSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luR2FtZVJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgd2luZG93Lk1ITlNfTE9CQllORVQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdMb2dpbmZyZWVDb3VudCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbignbG90dGVyeVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG90dGVyeVJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKCEhZGF0YS5SZXN1bHRDb2RlICYmIGRhdGEuUmVzdWx0Q29kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmoubG90dGVyeVJlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YS5SZXN1bHREYXRhKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmoucm9sbChkYXRhLlJlc3VsdERhdGEudmlld2FycmF5Lm5IYW5kQ2FyZHMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignZnJlZVRpbWVUeXBlUmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmcmVlVGltZVR5cGVSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLlJlc3VsdENvZGUgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnNldFR5cGVSZXN1bHQoZGF0YS5SZXN1bHREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdMb2dpblJvb21SZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luUm9vbVJlc3VsdCcsIGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBzZWxmLmNhbnZhcy5vbkZyZWVUaW1lKGRhdGEuUmVzdWx0RGF0YS5mcmVlQ291bnQpOyAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjliLfmlrDlhY3otLnmrKHmlbDnmoTmlrnms5UgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ0xvZ2luZnJlZUNvdW50UmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbmZyZWVDb3VudFJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuUmVzdWx0Q29kZSA9PSAxICYmIGRhdGEuZnJlZUNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmZyZWVUaW1lcyA9IGRhdGEuZnJlZUNvdW50IC0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouc3RhcnRGcmVlR2FtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnY2xlYW5MaW5lT3V0Jyk7XHJcbiAgICB9XHJcbn0pOyJdfQ==