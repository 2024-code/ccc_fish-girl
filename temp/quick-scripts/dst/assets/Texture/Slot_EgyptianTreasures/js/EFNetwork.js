
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_EgyptianTreasures/js/EFNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ccf00ZSxOxHQY+efHsAKfnO', 'EFNetwork');
// Texture/Slot_EgyptianTreasures/js/EFNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('EFMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('EFAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15036';
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
      window.EF_LOBBYNET.disconnect();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9FZ3lwdGlhblRyZWFzdXJlc1xcanNcXEVGTmV0d29yay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsIm1haW5PYmoiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwiYXVkaW8iLCJzdGFydCIsInVybCIsIkxoamNvbmZpZyIsIlNlcnZlcl9JUCIsInNvY2tldCIsImlvIiwiY29ubmVjdCIsImFkZEV2ZW50Iiwib24iLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJpZCIsInBsYXllcklkIiwiZ2FtZXR5cGUiLCJzaWduIiwiZ2FtZVNpZ24iLCJkYXRhIiwiY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJFRl9MT0JCWU5FVCIsImRpc2Nvbm5lY3QiLCJSZXN1bHRDb2RlIiwibG90dGVyeVJlcyIsInBhcnNlIiwiUmVzdWx0RGF0YSIsInJvbGwiLCJ2aWV3YXJyYXkiLCJuSGFuZENhcmRzIiwiZnJlZUNvdW50IiwiZnJlZVRpbWVzIiwiY2xvc2VTaGluZSIsInN0YXJ0RnJlZUdhbWUiLCJyZXQiLCJzeXMiLCJpc05hdGl2ZSIsIm9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTEMsRUFBQUEsTUFQSyxvQkFPSTtBQUNMLFNBQUtDLE9BQUwsR0FBZSxLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQXhDO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEtBQUtM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LENBQUN0QyxPQUFMLENBQWF3QyxVQUFiOztBQUNBLFFBQUEsS0FBSSxDQUFDeEMsT0FBTCxDQUFheUMsYUFBYjtBQUNIO0FBQ0osS0FSRDtBQVNILEdBM0RJO0FBNkRMaEIsRUFBQUEseUJBN0RLLHFDQTZEcUJpQixHQTdEckIsRUE2RDBCO0FBQzNCLFFBQUkvQyxFQUFFLENBQUNnRCxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsYUFBTzNCLElBQUksQ0FBQ2dCLEtBQUwsQ0FBV1MsR0FBWCxDQUFQO0FBQ0g7O0FBQ0QsV0FBT0EsR0FBUDtBQUNILEdBbEVJO0FBb0VMRyxFQUFBQSxTQXBFSyx1QkFvRU87QUFDUixTQUFLbEMsTUFBTCxDQUFZSyxJQUFaLENBQWlCLGNBQWpCO0FBQ0g7QUF0RUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm1haW5PYmogPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdFRk1haW4nKTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdFRkF1ZGlvJyk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnVybCA9IExoamNvbmZpZy5TZXJ2ZXJfSVAgKyAnOjE1MDM2JztcclxuICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QodGhpcy51cmwpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGFkZEV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdjb25uZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ0xvZ2luR2FtZScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHVzZXJpZDogdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgZ2FtZXR5cGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzaWduOiB0aGlzLnBsYXllckluZm8uZ2FtZVNpZ25cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbignbG9naW5HYW1lUmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbkdhbWVSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5FRl9MT0JCWU5FVC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ0xvZ2luZnJlZUNvdW50Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb3R0ZXJ5UmVzdWx0JywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvdHRlcnlSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEuUmVzdWx0Q29kZSAmJiBkYXRhLlJlc3VsdENvZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmxvdHRlcnlSZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEuUmVzdWx0RGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnJvbGwoZGF0YS5SZXN1bHREYXRhLnZpZXdhcnJheS5uSGFuZENhcmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdMb2dpblJvb21SZXN1bHQnLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5Sb29tUmVzdWx0JywgZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlbGYuY2FudmFzLm9uRnJlZVRpbWUoZGF0YS5SZXN1bHREYXRhLmZyZWVDb3VudCk7ICAgICAgICAgICAgICAgICAgICAvL+iwg+eUqOWIt+aWsOWFjei0ueasoeaVsOeahOaWueazlSBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignTG9naW5mcmVlQ291bnRSZXN1bHQnLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5mcmVlQ291bnRSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLlJlc3VsdENvZGUgPT0gMSAmJiBkYXRhLmZyZWVDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5mcmVlVGltZXMgPSBkYXRhLmZyZWVDb3VudCAtIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0sXHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2NsZWFuTGluZU91dCcpO1xyXG4gICAgfVxyXG59KTsiXX0=