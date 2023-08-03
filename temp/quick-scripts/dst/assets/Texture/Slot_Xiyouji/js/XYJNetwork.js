
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_Xiyouji/js/XYJNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0a0f44zzWdN9J0vqjZo+BqM', 'XYJNetwork');
// Texture/Slot_Xiyouji/js/XYJNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('XYJMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('XYJAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15089';
    this.socket = io.connect(this.url);
    this.addEvent();
  },
  addEvent: function addEvent() {
    var _this = this;

    this.socket.on('connected', function () {
      console.log("LoginGame : ", _this.playerInfo.playerId);

      _this.socket.emit('LoginGame', JSON.stringify({
        userid: _this.playerInfo.playerId,
        gametype: null,
        sign: _this.playerInfo.gameSign
      }));
    });
    this.socket.on('loginGameResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('LoginGameResult:', data);
      window.XYJ_LOBBYNET.disconnect();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9YaXlvdWppXFxqc1xcWFlKTmV0d29yay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsIm1haW5PYmoiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwiYXVkaW8iLCJzdGFydCIsInVybCIsIkxoamNvbmZpZyIsIlNlcnZlcl9JUCIsInNvY2tldCIsImlvIiwiY29ubmVjdCIsImFkZEV2ZW50Iiwib24iLCJjb25zb2xlIiwibG9nIiwicGxheWVySWQiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJpZCIsImdhbWV0eXBlIiwic2lnbiIsImdhbWVTaWduIiwiZGF0YSIsImNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24iLCJ3aW5kb3ciLCJYWUpfTE9CQllORVQiLCJkaXNjb25uZWN0IiwiUmVzdWx0Q29kZSIsImxvdHRlcnlSZXMiLCJwYXJzZSIsIlJlc3VsdERhdGEiLCJyb2xsIiwidmlld2FycmF5IiwibkhhbmRDYXJkcyIsInN0YXR1cyIsInNldFR5cGVSZXN1bHQiLCJmcmVlQ291bnQiLCJmcmVlVGltZXMiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsInJldCIsInN5cyIsImlzTmF0aXZlIiwib25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MQyxFQUFBQSxNQVBLLG9CQU9JO0FBQ0wsU0FBS0MsT0FBTCxHQUFlLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixTQUF2QixDQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBeEM7QUFDQSxTQUFL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S0FBSSxDQUFDQyx5QkFBTCxDQUErQkQsSUFBL0IsQ0FBUDtBQUNBVixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWixFQUErQlMsSUFBL0IsRUFGc0MsQ0FHdEM7QUFDSCxLQUpEO0FBS0EsU0FBS2YsTUFBTCxDQUFZSSxFQUFaLENBQWUsc0JBQWYsRUFBdUMsVUFBQVcsSUFBSSxFQUFJO0FBQzNDQSxNQUFBQSxJQUFJLEdBQUcsS0FBSSxDQUFDQyx5QkFBTCxDQUErQkQsSUFBL0IsQ0FBUDtBQUNBVixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx1QkFBWixFQUFxQ1MsSUFBckM7O0FBQ0EsVUFBSUEsSUFBSSxDQUFDSyxVQUFMLElBQW1CLENBQW5CLElBQXdCTCxJQUFJLENBQUNjLFNBQUwsR0FBaUIsQ0FBN0MsRUFBZ0Q7QUFDNUMsUUFBQSxLQUFJLENBQUN4QyxPQUFMLENBQWF5QyxTQUFiLEdBQXlCZixJQUFJLENBQUNjLFNBQUwsR0FBaUIsQ0FBMUM7O0FBQ0EsUUFBQSxLQUFJLENBQUN4QyxPQUFMLENBQWEwQyxVQUFiOztBQUNBLFFBQUEsS0FBSSxDQUFDMUMsT0FBTCxDQUFhMkMsYUFBYjtBQUNIO0FBQ0osS0FSRDtBQVNILEdBckVJO0FBdUVMaEIsRUFBQUEseUJBdkVLLHFDQXVFcUJpQixHQXZFckIsRUF1RTBCO0FBQzNCLFFBQUlqRCxFQUFFLENBQUNrRCxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsYUFBTzFCLElBQUksQ0FBQ2EsS0FBTCxDQUFXVyxHQUFYLENBQVA7QUFDSDs7QUFDRCxXQUFPQSxHQUFQO0FBQ0gsR0E1RUk7QUE4RUxHLEVBQUFBLFNBOUVLLHVCQThFTztBQUNSLFNBQUtwQyxNQUFMLENBQVlRLElBQVosQ0FBaUIsY0FBakI7QUFDSDtBQWhGSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubWFpbk9iaiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1hZSk1haW4nKTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdYWUpBdWRpbycpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBMaGpjb25maWcuU2VydmVyX0lQICsgJzoxNTA4OSc7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBpby5jb25uZWN0KHRoaXMudXJsKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBhZGRFdmVudCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignY29ubmVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2luR2FtZSA6IFwiLHRoaXMucGxheWVySW5mby5wbGF5ZXJJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ0xvZ2luR2FtZScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHVzZXJpZDogdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgZ2FtZXR5cGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzaWduOiB0aGlzLnBsYXllckluZm8uZ2FtZVNpZ25cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbignbG9naW5HYW1lUmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbkdhbWVSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5YWUpfTE9CQllORVQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdMb2dpbmZyZWVDb3VudCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbignbG90dGVyeVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG90dGVyeVJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKCEhZGF0YS5SZXN1bHRDb2RlICYmIGRhdGEuUmVzdWx0Q29kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmoubG90dGVyeVJlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YS5SZXN1bHREYXRhKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmoucm9sbChkYXRhLlJlc3VsdERhdGEudmlld2FycmF5Lm5IYW5kQ2FyZHMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignZnJlZVRpbWVUeXBlUmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmcmVlVGltZVR5cGVSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLlJlc3VsdENvZGUgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnNldFR5cGVSZXN1bHQoZGF0YS5SZXN1bHREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdMb2dpblJvb21SZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luUm9vbVJlc3VsdCcsIGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBzZWxmLmNhbnZhcy5vbkZyZWVUaW1lKGRhdGEuUmVzdWx0RGF0YS5mcmVlQ291bnQpOyAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjliLfmlrDlhY3otLnmrKHmlbDnmoTmlrnms5UgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ0xvZ2luZnJlZUNvdW50UmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbmZyZWVDb3VudFJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuUmVzdWx0Q29kZSA9PSAxICYmIGRhdGEuZnJlZUNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmZyZWVUaW1lcyA9IGRhdGEuZnJlZUNvdW50IC0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouc3RhcnRGcmVlR2FtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnY2xlYW5MaW5lT3V0Jyk7XHJcbiAgICB9XHJcbn0pOyJdfQ==