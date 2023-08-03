
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_YiLuFaFa/js/YLFFFNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e5ba0m9AbVJ46xjto1PFlJo', 'YLFFFNetwork');
// Texture/Slot_YiLuFaFa/js/YLFFFNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('YLFFFMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('YLFFFAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15054';
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
      window.YLFFF_LOBBYNET.disconnect();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9ZaUx1RmFGYVxcanNcXFlMRkZGTmV0d29yay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsIm1haW5PYmoiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwiYXVkaW8iLCJzdGFydCIsInVybCIsIkxoamNvbmZpZyIsIlNlcnZlcl9JUCIsInNvY2tldCIsImlvIiwiY29ubmVjdCIsImFkZEV2ZW50Iiwib24iLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJpZCIsInBsYXllcklkIiwiZ2FtZXR5cGUiLCJzaWduIiwiZ2FtZVNpZ24iLCJkYXRhIiwiY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJZTEZGRl9MT0JCWU5FVCIsImRpc2Nvbm5lY3QiLCJSZXN1bHRDb2RlIiwibG90dGVyeVJlcyIsInBhcnNlIiwiUmVzdWx0RGF0YSIsInJvbGwiLCJ2aWV3YXJyYXkiLCJuSGFuZENhcmRzIiwic3RhdHVzIiwic2V0VHlwZVJlc3VsdCIsImZyZWVDb3VudCIsImZyZWVUaW1lcyIsImNsb3NlU2hpbmUiLCJzdGFydEZyZWVHYW1lIiwicmV0Iiwic3lzIiwiaXNOYXRpdmUiLCJvbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBT0xDLEVBQUFBLE1BUEssb0JBT0k7QUFDTCxTQUFLQyxPQUFMLEdBQWUsS0FBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCLFdBQXZCLENBQWY7QUFDQSxTQUFLQyxVQUFMLEdBQWtCQyxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQyxVQUF4QztBQUNB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WSxpQkFBWixFQUErQkgsSUFBL0IsRUFGc0MsQ0FHdEM7QUFDSCxLQUpEO0FBS0EsU0FBS2IsTUFBTCxDQUFZSSxFQUFaLENBQWUsc0JBQWYsRUFBdUMsVUFBQVMsSUFBSSxFQUFJO0FBQzNDQSxNQUFBQSxJQUFJLEdBQUcsS0FBSSxDQUFDQyx5QkFBTCxDQUErQkQsSUFBL0IsQ0FBUDtBQUNBRSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx1QkFBWixFQUFxQ0gsSUFBckM7O0FBQ0EsVUFBSUEsSUFBSSxDQUFDTyxVQUFMLElBQW1CLENBQW5CLElBQXdCUCxJQUFJLENBQUNnQixTQUFMLEdBQWlCLENBQTdDLEVBQWdEO0FBQzVDLFFBQUEsS0FBSSxDQUFDeEMsT0FBTCxDQUFheUMsU0FBYixHQUF5QmpCLElBQUksQ0FBQ2dCLFNBQUwsR0FBaUIsQ0FBMUM7O0FBQ0EsUUFBQSxLQUFJLENBQUN4QyxPQUFMLENBQWEwQyxVQUFiOztBQUNBLFFBQUEsS0FBSSxDQUFDMUMsT0FBTCxDQUFhMkMsYUFBYjtBQUNIO0FBQ0osS0FSRDtBQVNILEdBcEVJO0FBc0VMbEIsRUFBQUEseUJBdEVLLHFDQXNFcUJtQixHQXRFckIsRUFzRTBCO0FBQzNCLFFBQUlqRCxFQUFFLENBQUNrRCxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsYUFBTzdCLElBQUksQ0FBQ2dCLEtBQUwsQ0FBV1csR0FBWCxDQUFQO0FBQ0g7O0FBQ0QsV0FBT0EsR0FBUDtBQUNILEdBM0VJO0FBNkVMRyxFQUFBQSxTQTdFSyx1QkE2RU87QUFDUixTQUFLcEMsTUFBTCxDQUFZSyxJQUFaLENBQWlCLGNBQWpCO0FBQ0g7QUEvRUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm1haW5PYmogPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdZTEZGRk1haW4nKTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdZTEZGRkF1ZGlvJyk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnVybCA9IExoamNvbmZpZy5TZXJ2ZXJfSVAgKyAnOjE1MDU0JztcclxuICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QodGhpcy51cmwpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGFkZEV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdjb25uZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ0xvZ2luR2FtZScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHVzZXJpZDogdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgZ2FtZXR5cGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzaWduOiB0aGlzLnBsYXllckluZm8uZ2FtZVNpZ25cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbignbG9naW5HYW1lUmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbkdhbWVSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5ZTEZGRl9MT0JCWU5FVC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ0xvZ2luZnJlZUNvdW50Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb3R0ZXJ5UmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb3R0ZXJ5UmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoISFkYXRhLlJlc3VsdENvZGUgJiYgZGF0YS5SZXN1bHRDb2RlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5sb3R0ZXJ5UmVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhLlJlc3VsdERhdGEpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5yb2xsKGRhdGEuUmVzdWx0RGF0YS52aWV3YXJyYXkubkhhbmRDYXJkcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdmcmVlVGltZVR5cGVSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZyZWVUaW1lVHlwZVJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuUmVzdWx0Q29kZSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouc2V0VHlwZVJlc3VsdChkYXRhLlJlc3VsdERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ0xvZ2luUm9vbVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5Sb29tUmVzdWx0JywgZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlbGYuY2FudmFzLm9uRnJlZVRpbWUoZGF0YS5SZXN1bHREYXRhLmZyZWVDb3VudCk7ICAgICAgICAgICAgICAgICAgICAvL+iwg+eUqOWIt+aWsOWFjei0ueasoeaVsOeahOaWueazlSBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignTG9naW5mcmVlQ291bnRSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luZnJlZUNvdW50UmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5SZXN1bHRDb2RlID09IDEgJiYgZGF0YS5mcmVlQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouZnJlZVRpbWVzID0gZGF0YS5mcmVlQ291bnQgLSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zdGFydEZyZWVHYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdjbGVhbkxpbmVPdXQnKTtcclxuICAgIH1cclxufSk7Il19