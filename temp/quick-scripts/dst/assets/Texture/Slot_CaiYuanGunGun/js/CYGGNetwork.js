
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_CaiYuanGunGun/js/CYGGNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01974ekAxVFvpT+P3ElDJqZ', 'CYGGNetwork');
// Texture/Slot_CaiYuanGunGun/js/CYGGNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('CYGGMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('CYGGAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15042';
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
      window.CYGG_LOBBYNET.disconnect();

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
    this.socket.on('chooseLocationResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('chooseLocationResult:', data);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9DYWlZdWFuR3VuR3VuXFxqc1xcQ1lHR05ldHdvcmsuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJtYWluT2JqIiwibm9kZSIsImdldENvbXBvbmVudCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsImF1ZGlvIiwic3RhcnQiLCJ1cmwiLCJMaGpjb25maWciLCJTZXJ2ZXJfSVAiLCJzb2NrZXQiLCJpbyIsImNvbm5lY3QiLCJhZGRFdmVudCIsIm9uIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VyaWQiLCJwbGF5ZXJJZCIsImdhbWV0eXBlIiwic2lnbiIsImdhbWVTaWduIiwiZGF0YSIsImNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24iLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiQ1lHR19MT0JCWU5FVCIsImRpc2Nvbm5lY3QiLCJSZXN1bHRDb2RlIiwibG90dGVyeVJlcyIsInBhcnNlIiwiUmVzdWx0RGF0YSIsInJvbGwiLCJ2aWV3YXJyYXkiLCJuSGFuZENhcmRzIiwic3RhdHVzIiwic2VuZEZyZWUiLCJmcmVlQ291bnQiLCJmcmVlVGltZXMiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsInJldCIsInN5cyIsImlzTmF0aXZlIiwib25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MQyxFQUFBQSxNQVBLLG9CQU9JO0FBQ0wsU0FBS0MsT0FBTCxHQUFlLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixVQUF2QixDQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBeEM7QUFDQSxT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QUFSLENBQVksaUJBQVosRUFBK0JILElBQS9CLEVBRnNDLENBR3RDO0FBQ0gsS0FKRDtBQUtBLFNBQUtiLE1BQUwsQ0FBWUksRUFBWixDQUFlLHNCQUFmLEVBQXVDLFVBQUFTLElBQUksRUFBSTtBQUMzQ0EsTUFBQUEsSUFBSSxHQUFHLEtBQUksQ0FBQ0MseUJBQUwsQ0FBK0JELElBQS9CLENBQVA7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksdUJBQVosRUFBcUNILElBQXJDOztBQUNBLFVBQUlBLElBQUksQ0FBQ08sVUFBTCxJQUFtQixDQUFuQixJQUF3QlAsSUFBSSxDQUFDZ0IsU0FBTCxHQUFpQixDQUE3QyxFQUFnRDtBQUM1QyxRQUFBLEtBQUksQ0FBQ3hDLE9BQUwsQ0FBYXlDLFNBQWIsR0FBeUJqQixJQUFJLENBQUNnQixTQUFMLEdBQWlCLENBQTFDOztBQUNBLFFBQUEsS0FBSSxDQUFDeEMsT0FBTCxDQUFhMEMsVUFBYjs7QUFDQSxRQUFBLEtBQUksQ0FBQzFDLE9BQUwsQ0FBYTJDLGFBQWI7O0FBQ0EsUUFBQSxLQUFJLENBQUMzQyxPQUFMLENBQWF1QyxRQUFiO0FBQ0g7QUFDSixLQVREO0FBVUgsR0FwRUk7QUFzRUxkLEVBQUFBLHlCQXRFSyxxQ0FzRXFCbUIsR0F0RXJCLEVBc0UwQjtBQUMzQixRQUFJakQsRUFBRSxDQUFDa0QsR0FBSCxDQUFPQyxRQUFYLEVBQXFCO0FBQ2pCLGFBQU83QixJQUFJLENBQUNnQixLQUFMLENBQVdXLEdBQVgsQ0FBUDtBQUNIOztBQUNELFdBQU9BLEdBQVA7QUFDSCxHQTNFSTtBQTZFTEcsRUFBQUEsU0E3RUssdUJBNkVPO0FBQ1IsU0FBS3BDLE1BQUwsQ0FBWUssSUFBWixDQUFpQixjQUFqQjtBQUNIO0FBL0VJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnQ1lHR01haW4nKTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdDWUdHQXVkaW8nKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBMaGpjb25maWcuU2VydmVyX0lQICsgJzoxNTA0Mic7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBpby5jb25uZWN0KHRoaXMudXJsKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBhZGRFdmVudCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignY29ubmVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdMb2dpbkdhbWUnLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB1c2VyaWQ6IHRoaXMucGxheWVySW5mby5wbGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgIGdhbWV0eXBlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc2lnbjogdGhpcy5wbGF5ZXJJbmZvLmdhbWVTaWduXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2xvZ2luR2FtZVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5HYW1lUmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICB3aW5kb3cuQ1lHR19MT0JCWU5FVC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ0xvZ2luZnJlZUNvdW50Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb3R0ZXJ5UmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb3R0ZXJ5UmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoISFkYXRhLlJlc3VsdENvZGUgJiYgZGF0YS5SZXN1bHRDb2RlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5sb3R0ZXJ5UmVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhLlJlc3VsdERhdGEpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5yb2xsKGRhdGEuUmVzdWx0RGF0YS52aWV3YXJyYXkubkhhbmRDYXJkcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdjaG9vc2VMb2NhdGlvblJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hvb3NlTG9jYXRpb25SZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEuUmVzdWx0Q29kZSAmJiBkYXRhLlJlc3VsdENvZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnNlbmRGcmVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignTG9naW5Sb29tUmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpblJvb21SZXN1bHQnLCBkYXRhKTtcclxuICAgICAgICAgICAgLy8gc2VsZi5jYW52YXMub25GcmVlVGltZShkYXRhLlJlc3VsdERhdGEuZnJlZUNvdW50KTsgICAgICAgICAgICAgICAgICAgIC8v6LCD55So5Yi35paw5YWN6LS55qyh5pWw55qE5pa55rOVIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdMb2dpbmZyZWVDb3VudFJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5mcmVlQ291bnRSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLlJlc3VsdENvZGUgPT0gMSAmJiBkYXRhLmZyZWVDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5mcmVlVGltZXMgPSBkYXRhLmZyZWVDb3VudCAtIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zZW5kRnJlZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnY2xlYW5MaW5lT3V0Jyk7XHJcbiAgICB9XHJcbn0pOyJdfQ==