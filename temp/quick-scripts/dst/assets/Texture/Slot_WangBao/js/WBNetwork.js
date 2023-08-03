
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_WangBao/js/WBNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'af7d3SdjVtLdpkYT164/9u8', 'WBNetwork');
// Texture/Slot_WangBao/js/WBNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('WBMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('WBAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15051';
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
      window.WB_LOBBYNET.disconnect();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9XYW5nQmFvXFxqc1xcV0JOZXR3b3JrLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibWFpbk9iaiIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJhdWRpbyIsInN0YXJ0IiwidXJsIiwiTGhqY29uZmlnIiwiU2VydmVyX0lQIiwic29ja2V0IiwiaW8iLCJjb25uZWN0IiwiYWRkRXZlbnQiLCJvbiIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlcmlkIiwicGxheWVySWQiLCJnYW1ldHlwZSIsInNpZ24iLCJnYW1lU2lnbiIsImRhdGEiLCJjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsIldCX0xPQkJZTkVUIiwiZGlzY29ubmVjdCIsIlJlc3VsdENvZGUiLCJsb3R0ZXJ5UmVzIiwicGFyc2UiLCJSZXN1bHREYXRhIiwicm9sbCIsInZpZXdhcnJheSIsIm5IYW5kQ2FyZHMiLCJzdGF0dXMiLCJzZXRUeXBlUmVzdWx0IiwiZnJlZUNvdW50IiwiZnJlZVRpbWVzIiwiY2xvc2VTaGluZSIsInN0YXJ0RnJlZUdhbWUiLCJyZXQiLCJzeXMiLCJpc05hdGl2ZSIsIm9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTEMsRUFBQUEsTUFQSyxvQkFPSTtBQUNMLFNBQUtDLE9BQUwsR0FBZSxLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQXhDO0FBQ0EsU0FBS0Ms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LEVBQStCSCxJQUEvQixFQUZzQyxDQUd0QztBQUNILEtBSkQ7QUFLQSxTQUFLYixNQUFMLENBQVlJLEVBQVosQ0FBZSxzQkFBZixFQUF1QyxVQUFBUyxJQUFJLEVBQUk7QUFDM0NBLE1BQUFBLElBQUksR0FBRyxLQUFJLENBQUNDLHlCQUFMLENBQStCRCxJQUEvQixDQUFQO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUFaLEVBQXFDSCxJQUFyQzs7QUFDQSxVQUFJQSxJQUFJLENBQUNPLFVBQUwsSUFBbUIsQ0FBbkIsSUFBd0JQLElBQUksQ0FBQ2dCLFNBQUwsR0FBaUIsQ0FBN0MsRUFBZ0Q7QUFDNUMsUUFBQSxLQUFJLENBQUN4QyxPQUFMLENBQWF5QyxTQUFiLEdBQXlCakIsSUFBSSxDQUFDZ0IsU0FBTCxHQUFpQixDQUExQzs7QUFDQSxRQUFBLEtBQUksQ0FBQ3hDLE9BQUwsQ0FBYTBDLFVBQWI7O0FBQ0EsUUFBQSxLQUFJLENBQUMxQyxPQUFMLENBQWEyQyxhQUFiO0FBQ0g7QUFDSixLQVJEO0FBU0gsR0FwRUk7QUFzRUxsQixFQUFBQSx5QkF0RUsscUNBc0VxQm1CLEdBdEVyQixFQXNFMEI7QUFDM0IsUUFBSWpELEVBQUUsQ0FBQ2tELEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQixhQUFPN0IsSUFBSSxDQUFDZ0IsS0FBTCxDQUFXVyxHQUFYLENBQVA7QUFDSDs7QUFDRCxXQUFPQSxHQUFQO0FBQ0gsR0EzRUk7QUE2RUxHLEVBQUFBLFNBN0VLLHVCQTZFTztBQUNSLFNBQUtwQyxNQUFMLENBQVlLLElBQVosQ0FBaUIsY0FBakI7QUFDSDtBQS9FSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubWFpbk9iaiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1dCTWFpbicpO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1dCQXVkaW8nKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMudXJsID0gTGhqY29uZmlnLlNlcnZlcl9JUCArICc6MTUwNTEnO1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gaW8uY29ubmVjdCh0aGlzLnVybCk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgYWRkRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnTG9naW5HYW1lJywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdXNlcmlkOiB0aGlzLnBsYXllckluZm8ucGxheWVySWQsXHJcbiAgICAgICAgICAgICAgICBnYW1ldHlwZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHNpZ246IHRoaXMucGxheWVySW5mby5nYW1lU2lnblxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb2dpbkdhbWVSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luR2FtZVJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgd2luZG93LldCX0xPQkJZTkVULmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnTG9naW5mcmVlQ291bnQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2xvdHRlcnlSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvdHRlcnlSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEuUmVzdWx0Q29kZSAmJiBkYXRhLlJlc3VsdENvZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmxvdHRlcnlSZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEuUmVzdWx0RGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnJvbGwoZGF0YS5SZXN1bHREYXRhLnZpZXdhcnJheS5uSGFuZENhcmRzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2ZyZWVUaW1lVHlwZVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZnJlZVRpbWVUeXBlUmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5SZXN1bHRDb2RlID49IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zZXRUeXBlUmVzdWx0KGRhdGEuUmVzdWx0RGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignTG9naW5Sb29tUmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpblJvb21SZXN1bHQnLCBkYXRhKTtcclxuICAgICAgICAgICAgLy8gc2VsZi5jYW52YXMub25GcmVlVGltZShkYXRhLlJlc3VsdERhdGEuZnJlZUNvdW50KTsgICAgICAgICAgICAgICAgICAgIC8v6LCD55So5Yi35paw5YWN6LS55qyh5pWw55qE5pa55rOVIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdMb2dpbmZyZWVDb3VudFJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5mcmVlQ291bnRSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLlJlc3VsdENvZGUgPT0gMSAmJiBkYXRhLmZyZWVDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5mcmVlVGltZXMgPSBkYXRhLmZyZWVDb3VudCAtIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0sXHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2NsZWFuTGluZU91dCcpO1xyXG4gICAgfVxyXG59KTsiXX0=