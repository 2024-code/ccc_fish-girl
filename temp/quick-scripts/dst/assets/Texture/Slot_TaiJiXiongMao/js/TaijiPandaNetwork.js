
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_TaiJiXiongMao/js/TaijiPandaNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f62352LTxVAw5N9zQIi0NOs', 'TaijiPandaNetwork');
// Texture/Slot_TaiJiXiongMao/js/TaijiPandaNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('TaijiPandaMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('TaijiPandaAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15050';
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
      window.TaijiPanda_LOBBYNET.disconnect();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9UYWlKaVhpb25nTWFvXFxqc1xcVGFpamlQYW5kYU5ldHdvcmsuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJtYWluT2JqIiwibm9kZSIsImdldENvbXBvbmVudCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsImF1ZGlvIiwic3RhcnQiLCJ1cmwiLCJMaGpjb25maWciLCJTZXJ2ZXJfSVAiLCJzb2NrZXQiLCJpbyIsImNvbm5lY3QiLCJhZGRFdmVudCIsIm9uIiwiY29uc29sZSIsImxvZyIsInBsYXllcklkIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VyaWQiLCJnYW1ldHlwZSIsInNpZ24iLCJnYW1lU2lnbiIsImRhdGEiLCJjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uIiwid2luZG93IiwiVGFpamlQYW5kYV9MT0JCWU5FVCIsImRpc2Nvbm5lY3QiLCJSZXN1bHRDb2RlIiwibG90dGVyeVJlcyIsInBhcnNlIiwiUmVzdWx0RGF0YSIsInJvbGwiLCJ2aWV3YXJyYXkiLCJuSGFuZENhcmRzIiwic3RhdHVzIiwic2V0VHlwZVJlc3VsdCIsImZyZWVDb3VudCIsImZyZWVUaW1lcyIsImNsb3NlU2hpbmUiLCJzdGFydEZyZWVHYW1lIiwicmV0Iiwic3lzIiwiaXNOYXRpdmUiLCJvbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBT0xDLEVBQUFBLE1BUEssb0JBT0k7QUFDTCxTQUFLQyxPQUFMLEdBQWUsS0FBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCLGdCQUF2QixDQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxD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QUFDdENBLE1BQUFBLElBQUksR0FBRyxLQUFJLENBQUNDLHlCQUFMLENBQStCRCxJQUEvQixDQUFQO0FBQ0FWLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaLEVBQStCUyxJQUEvQixFQUZzQyxDQUd0QztBQUNILEtBSkQ7QUFLQSxTQUFLZixNQUFMLENBQVlJLEVBQVosQ0FBZSxzQkFBZixFQUF1QyxVQUFBVyxJQUFJLEVBQUk7QUFDM0NBLE1BQUFBLElBQUksR0FBRyxLQUFJLENBQUNDLHlCQUFMLENBQStCRCxJQUEvQixDQUFQO0FBQ0FWLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUFaLEVBQXFDUyxJQUFyQzs7QUFDQSxVQUFJQSxJQUFJLENBQUNLLFVBQUwsSUFBbUIsQ0FBbkIsSUFBd0JMLElBQUksQ0FBQ2MsU0FBTCxHQUFpQixDQUE3QyxFQUFnRDtBQUM1QyxRQUFBLEtBQUksQ0FBQ3hDLE9BQUwsQ0FBYXlDLFNBQWIsR0FBeUJmLElBQUksQ0FBQ2MsU0FBTCxHQUFpQixDQUExQzs7QUFDQSxRQUFBLEtBQUksQ0FBQ3hDLE9BQUwsQ0FBYTBDLFVBQWI7O0FBQ0EsUUFBQSxLQUFJLENBQUMxQyxPQUFMLENBQWEyQyxhQUFiO0FBQ0g7QUFDSixLQVJEO0FBU0gsR0FyRUk7QUF1RUxoQixFQUFBQSx5QkF2RUsscUNBdUVxQmlCLEdBdkVyQixFQXVFMEI7QUFDM0IsUUFBSWpELEVBQUUsQ0FBQ2tELEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQixhQUFPMUIsSUFBSSxDQUFDYSxLQUFMLENBQVdXLEdBQVgsQ0FBUDtBQUNIOztBQUNELFdBQU9BLEdBQVA7QUFDSCxHQTVFSTtBQThFTEcsRUFBQUEsU0E5RUssdUJBOEVPO0FBQ1IsU0FBS3BDLE1BQUwsQ0FBWVEsSUFBWixDQUFpQixjQUFqQjtBQUNIO0FBaEZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnVGFpamlQYW5kYU1haW4nKTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdUYWlqaVBhbmRhQXVkaW8nKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMudXJsID0gTGhqY29uZmlnLlNlcnZlcl9JUCArICc6MTUwNTAnO1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gaW8uY29ubmVjdCh0aGlzLnVybCk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgYWRkRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dpbkdhbWUgOiBcIix0aGlzLnBsYXllckluZm8ucGxheWVySWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdMb2dpbkdhbWUnLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB1c2VyaWQ6IHRoaXMucGxheWVySW5mby5wbGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgIGdhbWV0eXBlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc2lnbjogdGhpcy5wbGF5ZXJJbmZvLmdhbWVTaWduXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2xvZ2luR2FtZVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5HYW1lUmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICB3aW5kb3cuVGFpamlQYW5kYV9MT0JCWU5FVC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ0xvZ2luZnJlZUNvdW50Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb3R0ZXJ5UmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb3R0ZXJ5UmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoISFkYXRhLlJlc3VsdENvZGUgJiYgZGF0YS5SZXN1bHRDb2RlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5sb3R0ZXJ5UmVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhLlJlc3VsdERhdGEpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5yb2xsKGRhdGEuUmVzdWx0RGF0YS52aWV3YXJyYXkubkhhbmRDYXJkcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdmcmVlVGltZVR5cGVSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZyZWVUaW1lVHlwZVJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuUmVzdWx0Q29kZSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouc2V0VHlwZVJlc3VsdChkYXRhLlJlc3VsdERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ0xvZ2luUm9vbVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5Sb29tUmVzdWx0JywgZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlbGYuY2FudmFzLm9uRnJlZVRpbWUoZGF0YS5SZXN1bHREYXRhLmZyZWVDb3VudCk7ICAgICAgICAgICAgICAgICAgICAvL+iwg+eUqOWIt+aWsOWFjei0ueasoeaVsOeahOaWueazlSBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignTG9naW5mcmVlQ291bnRSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luZnJlZUNvdW50UmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5SZXN1bHRDb2RlID09IDEgJiYgZGF0YS5mcmVlQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouZnJlZVRpbWVzID0gZGF0YS5mcmVlQ291bnQgLSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zdGFydEZyZWVHYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdjbGVhbkxpbmVPdXQnKTtcclxuICAgIH1cclxufSk7Il19