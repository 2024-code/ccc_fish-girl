
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_sandabaigujing/js/SDBGJNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ff950Mt7rpHBZkO9D3j3lHw', 'SDBGJNetwork');
// Texture/Slot_sandabaigujing/js/SDBGJNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('SDBGJMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('SDBGJAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15007';
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
      window.SDBGJ_LOBBYNET.disconnect();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9zYW5kYWJhaWd1amluZ1xcanNcXFNEQkdKTmV0d29yay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsIm1haW5PYmoiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwiYXVkaW8iLCJzdGFydCIsInVybCIsIkxoamNvbmZpZyIsIlNlcnZlcl9JUCIsInNvY2tldCIsImlvIiwiY29ubmVjdCIsImFkZEV2ZW50Iiwib24iLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJpZCIsInBsYXllcklkIiwiZ2FtZXR5cGUiLCJzaWduIiwiZ2FtZVNpZ24iLCJkYXRhIiwiY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJTREJHSl9MT0JCWU5FVCIsImRpc2Nvbm5lY3QiLCJSZXN1bHRDb2RlIiwibG90dGVyeVJlcyIsInBhcnNlIiwiUmVzdWx0RGF0YSIsInJvbGwiLCJ2aWV3YXJyYXkiLCJuSGFuZENhcmRzIiwic3RhdHVzIiwiZnJlZUNvdW50IiwiZnJlZVRpbWVzIiwiY2xvc2VTaGluZSIsInN0YXJ0RnJlZUdhbWUiLCJyZXQiLCJzeXMiLCJpc05hdGl2ZSIsIm9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTEMsRUFBQUEsTUFQSyxvQkFPSTtBQUNMLFNBQUtDLE9BQUwsR0FBZSxLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsV0FBdkIsQ0FBZjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQXhDO0FBQ0EsU0FBS0MsS0FB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QUFJLENBQUN2QyxPQUFMLENBQWF3QyxTQUFiLEdBQXlCaEIsSUFBSSxDQUFDZSxTQUFMLEdBQWlCLENBQTFDOztBQUNBLFFBQUEsS0FBSSxDQUFDdkMsT0FBTCxDQUFheUMsVUFBYjs7QUFDQSxRQUFBLEtBQUksQ0FBQ3pDLE9BQUwsQ0FBYTBDLGFBQWI7QUFDSDtBQUNKLEtBUkQ7QUFTSCxHQTdESTtBQStETGpCLEVBQUFBLHlCQS9ESyxxQ0ErRHFCa0IsR0EvRHJCLEVBK0QwQjtBQUMzQixRQUFJaEQsRUFBRSxDQUFDaUQsR0FBSCxDQUFPQyxRQUFYLEVBQXFCO0FBQ2pCLGFBQU81QixJQUFJLENBQUNnQixLQUFMLENBQVdVLEdBQVgsQ0FBUDtBQUNIOztBQUNELFdBQU9BLEdBQVA7QUFDSCxHQXBFSTtBQXNFTEcsRUFBQUEsU0F0RUssdUJBc0VPO0FBQ1IsU0FBS25DLE1BQUwsQ0FBWUssSUFBWixDQUFpQixjQUFqQjtBQUNIO0FBeEVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnU0RCR0pNYWluJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnU0RCR0pBdWRpbycpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBMaGpjb25maWcuU2VydmVyX0lQICsgJzoxNTAwNyc7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBpby5jb25uZWN0KHRoaXMudXJsKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBhZGRFdmVudCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignY29ubmVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdMb2dpbkdhbWUnLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB1c2VyaWQ6IHRoaXMucGxheWVySW5mby5wbGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgIGdhbWV0eXBlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc2lnbjogdGhpcy5wbGF5ZXJJbmZvLmdhbWVTaWduXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2xvZ2luR2FtZVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5HYW1lUmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICB3aW5kb3cuU0RCR0pfTE9CQllORVQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdMb2dpbmZyZWVDb3VudCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbignbG90dGVyeVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG90dGVyeVJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKCEhZGF0YS5SZXN1bHRDb2RlICYmIGRhdGEuUmVzdWx0Q29kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmoubG90dGVyeVJlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YS5SZXN1bHREYXRhKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmoucm9sbChkYXRhLlJlc3VsdERhdGEudmlld2FycmF5Lm5IYW5kQ2FyZHMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignTG9naW5Sb29tUmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpblJvb21SZXN1bHQnLCBkYXRhKTtcclxuICAgICAgICAgICAgLy8gc2VsZi5jYW52YXMub25GcmVlVGltZShkYXRhLlJlc3VsdERhdGEuZnJlZUNvdW50KTsgICAgICAgICAgICAgICAgICAgIC8v6LCD55So5Yi35paw5YWN6LS55qyh5pWw55qE5pa55rOVIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdMb2dpbmZyZWVDb3VudFJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5mcmVlQ291bnRSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLlJlc3VsdENvZGUgPT0gMSAmJiBkYXRhLmZyZWVDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5mcmVlVGltZXMgPSBkYXRhLmZyZWVDb3VudCAtIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0sXHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2NsZWFuTGluZU91dCcpO1xyXG4gICAgfVxyXG59KTsiXX0=