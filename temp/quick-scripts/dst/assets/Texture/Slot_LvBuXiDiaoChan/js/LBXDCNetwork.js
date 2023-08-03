
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_LvBuXiDiaoChan/js/LBXDCNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c9feNeU51AFIJijMT6fw6k', 'LBXDCNetwork');
// Texture/Slot_LvBuXiDiaoChan/js/LBXDCNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('LBXDCMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('LBXDCAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15045';
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
      window.LBXDC_LOBBYNET.disconnect();

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
    this.socket.on('chooseGameResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('chooseGameResult:', data);

      if (!!data.ResultCode && data.ResultCode == 1) {
        _this.mainObj.sendFree();
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

        _this.mainObj.sendFree();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9MdkJ1WGlEaWFvQ2hhblxcanNcXExCWERDTmV0d29yay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsIm1haW5PYmoiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwiYXVkaW8iLCJzdGFydCIsInVybCIsIkxoamNvbmZpZyIsIlNlcnZlcl9JUCIsInNvY2tldCIsImlvIiwiY29ubmVjdCIsImFkZEV2ZW50Iiwib24iLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJpZCIsInBsYXllcklkIiwiZ2FtZXR5cGUiLCJzaWduIiwiZ2FtZVNpZ24iLCJkYXRhIiwiY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJMQlhEQ19MT0JCWU5FVCIsImRpc2Nvbm5lY3QiLCJSZXN1bHRDb2RlIiwibG90dGVyeVJlcyIsInBhcnNlIiwiUmVzdWx0RGF0YSIsInJvbGwiLCJ2aWV3YXJyYXkiLCJuSGFuZENhcmRzIiwic3RhdHVzIiwic2VuZEZyZWUiLCJmcmVlQ291bnQiLCJmcmVlVGltZXMiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsInJldCIsInN5cyIsImlzTmF0aXZlIiwib25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MQyxFQUFBQSxNQVBLLG9CQU9JO0FBQ0wsU0FBS0MsT0FBTCxHQUFlLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixXQUF2QixDQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBeEM7QUFD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QyxHQUFSLENBQVksaUJBQVosRUFBK0JILElBQS9CLEVBRnNDLENBR3RDO0FBQ0gsS0FKRDtBQUtBLFNBQUtiLE1BQUwsQ0FBWUksRUFBWixDQUFlLHNCQUFmLEVBQXVDLFVBQUFTLElBQUksRUFBSTtBQUMzQ0EsTUFBQUEsSUFBSSxHQUFHLEtBQUksQ0FBQ0MseUJBQUwsQ0FBK0JELElBQS9CLENBQVA7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksdUJBQVosRUFBcUNILElBQXJDOztBQUNBLFVBQUlBLElBQUksQ0FBQ08sVUFBTCxJQUFtQixDQUFuQixJQUF3QlAsSUFBSSxDQUFDZ0IsU0FBTCxHQUFpQixDQUE3QyxFQUFnRDtBQUM1QyxRQUFBLEtBQUksQ0FBQ3hDLE9BQUwsQ0FBYXlDLFNBQWIsR0FBeUJqQixJQUFJLENBQUNnQixTQUFMLEdBQWlCLENBQTFDOztBQUNBLFFBQUEsS0FBSSxDQUFDeEMsT0FBTCxDQUFhMEMsVUFBYjs7QUFDQSxRQUFBLEtBQUksQ0FBQzFDLE9BQUwsQ0FBYTJDLGFBQWI7O0FBQ0EsUUFBQSxLQUFJLENBQUMzQyxPQUFMLENBQWF1QyxRQUFiO0FBQ0g7QUFDSixLQVREO0FBVUgsR0F0RUk7QUF3RUxkLEVBQUFBLHlCQXhFSyxxQ0F3RXFCbUIsR0F4RXJCLEVBd0UwQjtBQUMzQixRQUFJakQsRUFBRSxDQUFDa0QsR0FBSCxDQUFPQyxRQUFYLEVBQXFCO0FBQ2pCLGFBQU83QixJQUFJLENBQUNnQixLQUFMLENBQVdXLEdBQVgsQ0FBUDtBQUNIOztBQUNELFdBQU9BLEdBQVA7QUFDSCxHQTdFSTtBQStFTEcsRUFBQUEsU0EvRUssdUJBK0VPO0FBQ1IsU0FBS3BDLE1BQUwsQ0FBWUssSUFBWixDQUFpQixjQUFqQjtBQUNIO0FBakZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnTEJYRENNYWluJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnTEJYRENBdWRpbycpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBMaGpjb25maWcuU2VydmVyX0lQICsgJzoxNTA0NSc7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBpby5jb25uZWN0KHRoaXMudXJsKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBhZGRFdmVudCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignY29ubmVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdMb2dpbkdhbWUnLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB1c2VyaWQ6IHRoaXMucGxheWVySW5mby5wbGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgIGdhbWV0eXBlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc2lnbjogdGhpcy5wbGF5ZXJJbmZvLmdhbWVTaWduXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2xvZ2luR2FtZVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5HYW1lUmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICB3aW5kb3cuTEJYRENfTE9CQllORVQuZGlzY29ubmVjdCgpO1xyXG5cdFx0XHRcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnTG9naW5mcmVlQ291bnQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2xvdHRlcnlSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvdHRlcnlSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEuUmVzdWx0Q29kZSAmJiBkYXRhLlJlc3VsdENvZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmxvdHRlcnlSZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEuUmVzdWx0RGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnJvbGwoZGF0YS5SZXN1bHREYXRhLnZpZXdhcnJheS5uSGFuZENhcmRzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Nob29zZUdhbWVSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nob29zZUdhbWVSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEuUmVzdWx0Q29kZSAmJiBkYXRhLlJlc3VsdENvZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnNlbmRGcmVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignTG9naW5Sb29tUmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpblJvb21SZXN1bHQnLCBkYXRhKTtcclxuICAgICAgICAgICAgLy8gc2VsZi5jYW52YXMub25GcmVlVGltZShkYXRhLlJlc3VsdERhdGEuZnJlZUNvdW50KTsgICAgICAgICAgICAgICAgICAgIC8v6LCD55So5Yi35paw5YWN6LS55qyh5pWw55qE5pa55rOVIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdMb2dpbmZyZWVDb3VudFJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5mcmVlQ291bnRSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLlJlc3VsdENvZGUgPT0gMSAmJiBkYXRhLmZyZWVDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5mcmVlVGltZXMgPSBkYXRhLmZyZWVDb3VudCAtIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zZW5kRnJlZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnY2xlYW5MaW5lT3V0Jyk7XHJcbiAgICB9XHJcbn0pOyJdfQ==