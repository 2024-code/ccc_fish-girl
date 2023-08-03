
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_YuPuTuan2/js/YPT2Network.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd86740OQ/tLvLJPbbP4Gl7U', 'YPT2Network');
// Texture/Slot_YuPuTuan2/js/YPT2Network.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('YPT2Main');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('YPT2Audio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15056';
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
      window.YPT2_LOBBYNET.disconnect();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9ZdVB1VHVhbjJcXGpzXFxZUFQyTmV0d29yay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsIm1haW5PYmoiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwiYXVkaW8iLCJzdGFydCIsInVybCIsIkxoamNvbmZpZyIsIlNlcnZlcl9JUCIsInNvY2tldCIsImlvIiwiY29ubmVjdCIsImFkZEV2ZW50Iiwib24iLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJpZCIsInBsYXllcklkIiwiZ2FtZXR5cGUiLCJzaWduIiwiZ2FtZVNpZ24iLCJkYXRhIiwiY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJZUFQyX0xPQkJZTkVUIiwiZGlzY29ubmVjdCIsIlJlc3VsdENvZGUiLCJsb3R0ZXJ5UmVzIiwicGFyc2UiLCJSZXN1bHREYXRhIiwicm9sbCIsInZpZXdhcnJheSIsIm5IYW5kQ2FyZHMiLCJzdGF0dXMiLCJmcmVlQ291bnQiLCJmcmVlVGltZXMiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsInJldCIsInN5cyIsImlzTmF0aXZlIiwib25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MQyxFQUFBQSxNQVBLLG9CQU9JO0FBQ0wsU0FBS0MsT0FBTCxHQUFlLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixVQUF2QixDQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBeEM7QUFDQSxTQUFLQyxLQUFMLEdBQWEsS0FBS0wsSUFBTCxDQUFVQyxZQUFWLENBQXVCLFdBQXZCLENBQWI7QUFDSCxHQVhJO0FBYUxLLEVBQUFBLEtBYkssbUJBYUc7QUFDSixTQUFLQyxHQUFMLEdBQVdDLFNBQVMsQ0FBQ0MsU0FBVixHQUFzQixRQUFqQztBQUNBLFNBQUtDLE1BQUwsR0FBY0MsRUFBRSxDQUFDQyxPQUFILENBQVcsS0FBS0wsR0FBaEIsQ0FBZDtBQUNBLFNBQUtNLFFBQUw7QUFDSCxHQWpCSTtBQW9CTEEsRUFBQUEsUUFwQkssc0JBb0JNO0FBQUE7O0FBQ1AsU0FBS0gsTUFBTCxDQUFZSSxFQUFaLENBQWUsV0FBZixFQUE0QixZQUFNO0FBQzlCLE1BQUEsS0FBSSxDQUFDSixNQUFMLENBQVlLLElBQVosQ0FBaUIsV0FBakIsRUFBOEJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQ3pDQyxRQUFBQSxNQUFNLEVBQUUsS0FBSSxDQUFDaEIsVUFBTCxDQUFnQmlCLFFBRGlCO0FBRXpDQyxRQUFBQSxRQUFRLEVBQUUsSUFGK0I7QUFHekNDLFFBQUFBLElBQUksRUFBRSxLQUFJLENBQUNuQixVQUFMLENBQWdCb0I7QUFIbUIsT0FBZixDQUE5QjtBQUtILEtBTkQ7QUFRQSxTQUFLWixNQUFMLENBQVlJLEVBQVosQ0FBZSxpQkFBZixFQUFrQyxVQUFBUyxJQUFJLEVBQUk7QUFDdENBLE1BQUFBLElBQUksR0FBRyxLQUFJLENBQUNDLHlCQUFMLENBQStCRCxJQUEvQixDQUFQO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaLEVBQWdDSCxJQUFoQztBQUNBSSxNQUFBQSxNQUFNLENBQUNDLGFBQVAsQ0FBcUJDLFVBQXJCOztBQUNBLE1BQUEsS0FBSSxDQUFDbkIsTUFBTCxDQUFZSyxJQUFaLENBQWlCLGdCQUFqQjtBQUNILEtBTEQ7QUFPQSxTQUFLTCxNQUFMLENBQVlJLEVBQVosQ0FBZSxlQUFmLEVBQWdDLFVBQUFTLElBQUksRUFBSTtBQUNwQ0EsTUFBQUEsSUFBSSxHQUFHLEtBQUksQ0FBQ0MseUJBQUwsQ0FBK0JELElBQS9CLENBQVA7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVosRUFBOEJILElBQTlCOztBQUNBLFVBQUksQ0FBQyxDQUFDQSxJQUFJLENBQUNPLFVBQVAsSUFBcUJQLElBQUksQ0FBQ08sVUFBTCxJQUFtQixDQUE1QyxFQUErQztBQUMzQyxRQUFBLEtBQUksQ0FBQy9CLE9BQUwsQ0FBYWdDLFVBQWIsR0FBMEJmLElBQUksQ0FBQ2dCLEtBQUwsQ0FBV2hCLElBQUksQ0FBQ0MsU0FBTCxDQUFlTSxJQUFJLENBQUNVLFVBQXBCLENBQVgsQ0FBMUI7O0FBQ0EsUUFBQSxLQUFJLENBQUNsQyxPQUFMLENBQWFtQyxJQUFiLENBQWtCWCxJQUFJLENBQUNVLFVBQUwsQ0FBZ0JFLFNBQWhCLENBQTBCQyxVQUE1QztBQUNILE9BSEQsTUFHTztBQUNILFFBQUEsS0FBSSxDQUFDckMsT0FBTCxDQUFhc0MsTUFBYixHQUFzQixDQUF0QjtBQUNIO0FBQ0osS0FURDtBQVVBLFNBQUszQixNQUFMLENBQVlJLEVBQVosQ0FBZSxpQkFBZixFQUFrQyxVQUFBUyxJQUFJLEVBQUk7QUFDdENBLE1BQUFBLElBQUksR0FBRyxLQUFJLENBQUNDLHlCQUFMLENBQStCRCxJQUEvQixDQUFQO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaLEVBQStCSCxJQUEvQixFQUZzQyxDQUd0QztBQUNILEtBSkQ7QUFLQSxTQUFLYixNQUFMLENBQVlJLEVBQVosQ0FBZSxzQkFBZixFQUF1QyxVQUFBUyxJQUFJLEVBQUk7QUFDM0NBLE1BQUFBLElBQUksR0FBRyxLQUFJLENBQUNDLHlCQUFMLENBQStCRCxJQUEvQixDQUFQO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUFaLEVBQXFDSCxJQUFyQzs7QUFDQSxVQUFJQSxJQUFJLENBQUNPLFVBQUwsSUFBbUIsQ0FBbkIsSUFBd0JQLElBQUksQ0FBQ2UsU0FBTCxHQUFpQixDQUE3QyxFQUFnRDtBQUM1QyxRQUFBLEtBQUksQ0FBQ3ZDLE9BQUwsQ0FBYXdDLFNBQWIsR0FBeUJoQixJQUFJLENBQUNlLFNBQUwsR0FBaUIsQ0FBMUM7O0FBQ0EsUUFBQSxLQUFJLENBQUN2QyxPQUFMLENBQWF5QyxVQUFiOztBQUNBLFFBQUEsS0FBSSxDQUFDekMsT0FBTCxDQUFhMEMsYUFBYjtBQUNIO0FBQ0osS0FSRDtBQVNILEdBNURJO0FBOERMakIsRUFBQUEseUJBOURLLHFDQThEcUJrQixHQTlEckIsRUE4RDBCO0FBQzNCLFFBQUloRCxFQUFFLENBQUNpRCxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsYUFBTzVCLElBQUksQ0FBQ2dCLEtBQUwsQ0FBV1UsR0FBWCxDQUFQO0FBQ0g7O0FBQ0QsV0FBT0EsR0FBUDtBQUNILEdBbkVJO0FBcUVMRyxFQUFBQSxTQXJFSyx1QkFxRU87QUFDUixTQUFLbkMsTUFBTCxDQUFZSyxJQUFaLENBQWlCLGNBQWpCO0FBQ0g7QUF2RUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm1haW5PYmogPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdZUFQyTWFpbicpO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1lQVDJBdWRpbycpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnVybCA9IExoamNvbmZpZy5TZXJ2ZXJfSVAgKyAnOjE1MDU2JztcclxuICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QodGhpcy51cmwpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGFkZEV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdjb25uZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ0xvZ2luR2FtZScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHVzZXJpZDogdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgZ2FtZXR5cGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzaWduOiB0aGlzLnBsYXllckluZm8uZ2FtZVNpZ25cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbignbG9naW5HYW1lUmVzdWx0JywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbkdhbWVSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5ZUFQyX0xPQkJZTkVULmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnTG9naW5mcmVlQ291bnQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2xvdHRlcnlSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvdHRlcnlSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEuUmVzdWx0Q29kZSAmJiBkYXRhLlJlc3VsdENvZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmxvdHRlcnlSZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEuUmVzdWx0RGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnJvbGwoZGF0YS5SZXN1bHREYXRhLnZpZXdhcnJheS5uSGFuZENhcmRzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ0xvZ2luUm9vbVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5Sb29tUmVzdWx0JywgZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlbGYuY2FudmFzLm9uRnJlZVRpbWUoZGF0YS5SZXN1bHREYXRhLmZyZWVDb3VudCk7ICAgICAgICAgICAgICAgICAgICAvL+iwg+eUqOWIt+aWsOWFjei0ueasoeaVsOeahOaWueazlSBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignTG9naW5mcmVlQ291bnRSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luZnJlZUNvdW50UmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5SZXN1bHRDb2RlID09IDEgJiYgZGF0YS5mcmVlQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouZnJlZVRpbWVzID0gZGF0YS5mcmVlQ291bnQgLSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zdGFydEZyZWVHYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdjbGVhbkxpbmVPdXQnKTtcclxuICAgIH1cclxufSk7Il19