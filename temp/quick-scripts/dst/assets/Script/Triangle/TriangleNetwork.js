
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Triangle/TriangleNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ef405bRJ8FGjr1vF/5L1vPA', 'TriangleNetwork');
// Script/Triangle/TriangleNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('TriangleMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('TriangleAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15015';
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

      _this.socket.emit('LoginRoom');

      _this.mainObj.moneyLbl.string = (data.Obj.score / 100).toFixed(2);
      window.TG_LOBBYNET.disconnect();
    });
    this.socket.on('lotteryResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('lotteryResult:', data);

      if (!!data.ResultCode && data.ResultCode == 1) {
        _this.mainObj.moneyLbl.string = (_this.mainObj.moneyLbl.string - _this.mainObj.bet).toFixed(2);
        _this.mainObj.awardLbl.string = '0.00';
        _this.mainObj.awardPoorLbl.string = (data.ResultData.score_pool / 100).toFixed(2);

        _this.mainObj.showUnit(data.ResultData.viewarray[0].res);

        if (data.ResultData.viewarray.length > 1) {
          _this.mainObj.wheelFunc(data.ResultData.viewarray, data, 0);
        } else {
          _this.scheduleOnce(function () {
            _this.mainObj.status = 0;
            _this.mainObj.awardLbl.string = (data.ResultData.winscore / 100).toFixed(2);
            _this.mainObj.moneyLbl.string = (data.ResultData.userscore / 100).toFixed(2);
          }, 2.5);
        }
      }
    });
    this.socket.on('LoginRoomResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('LoginRoomResult', data);
      _this.mainObj.awardPoorLbl.string = (data.ResultData.score_pool / 100).toFixed(2);
    });
  },
  changeResultJSON_Function: function changeResultJSON_Function(ret) {
    if (cc.sys.isNative) {
      return JSON.parse(ret);
    }

    return ret;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxUcmlhbmdsZVxcVHJpYW5nbGVOZXR3b3JrLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJvbkxvYWQiLCJtYWluT2JqIiwibm9kZSIsImdldENvbXBvbmVudCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsImF1ZGlvIiwic3RhcnQiLCJ1cmwiLCJMaGpjb25maWciLCJTZXJ2ZXJfSVAiLCJzb2NrZXQiLCJpbyIsImNvbm5lY3QiLCJhZGRFdmVudCIsIm9uIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VyaWQiLCJwbGF5ZXJJZCIsImdhbWV0eXBlIiwic2lnbiIsImdhbWVTaWduIiwiZGF0YSIsImNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24iLCJjb25zb2xlIiwibG9nIiwibW9uZXlMYmwiLCJzdHJpbmciLCJPYmoiLCJzY29yZSIsInRvRml4ZWQiLCJ3aW5kb3ciLCJUR19MT0JCWU5FVCIsImRpc2Nvbm5lY3QiLCJSZXN1bHRDb2RlIiwiYmV0IiwiYXdhcmRMYmwiLCJhd2FyZFBvb3JMYmwiLCJSZXN1bHREYXRhIiwic2NvcmVfcG9vbCIsInNob3dVbml0Iiwidmlld2FycmF5IiwicmVzIiwibGVuZ3RoIiwid2hlZWxGdW5jIiwic2NoZWR1bGVPbmNlIiwic3RhdHVzIiwid2luc2NvcmUiLCJ1c2Vyc2NvcmUiLCJyZXQiLCJzeXMiLCJpc05hdGl2ZSIsInBhcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxNQUhLLG9CQUdJO0FBQ0wsU0FBS0MsT0FBTCxHQUFlLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixjQUF2QixDQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkMsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsVUFBeEM7QUFD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LGFBQU9wQyxJQUFJLENBQUNxQyxLQUFMLENBQVdILEdBQVgsQ0FBUDtBQUNIOztBQUNELFdBQU9BLEdBQVA7QUFDSDtBQWxFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubWFpbk9iaiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1RyaWFuZ2xlTWFpbicpO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1RyaWFuZ2xlQXVkaW8nKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMudXJsID0gTGhqY29uZmlnLlNlcnZlcl9JUCArICc6MTUwMTUnO1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gaW8uY29ubmVjdCh0aGlzLnVybCk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgYWRkRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnTG9naW5HYW1lJywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdXNlcmlkOiB0aGlzLnBsYXllckluZm8ucGxheWVySWQsXHJcbiAgICAgICAgICAgICAgICBnYW1ldHlwZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHNpZ246IHRoaXMucGxheWVySW5mby5nYW1lU2lnblxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb2dpbkdhbWVSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luR2FtZVJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnTG9naW5Sb29tJyk7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbk9iai5tb25leUxibC5zdHJpbmcgPSAoZGF0YS5PYmouc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHdpbmRvdy5UR19MT0JCWU5FVC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb3R0ZXJ5UmVzdWx0JywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvdHRlcnlSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEuUmVzdWx0Q29kZSAmJiBkYXRhLlJlc3VsdENvZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLm1vbmV5TGJsLnN0cmluZyA9ICh0aGlzLm1haW5PYmoubW9uZXlMYmwuc3RyaW5nIC0gdGhpcy5tYWluT2JqLmJldCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5hd2FyZExibC5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouYXdhcmRQb29yTGJsLnN0cmluZyA9IChkYXRhLlJlc3VsdERhdGEuc2NvcmVfcG9vbCAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zaG93VW5pdChkYXRhLlJlc3VsdERhdGEudmlld2FycmF5WzBdLnJlcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5SZXN1bHREYXRhLnZpZXdhcnJheS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLndoZWVsRnVuYyhkYXRhLlJlc3VsdERhdGEudmlld2FycmF5LCBkYXRhLCAwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmF3YXJkTGJsLnN0cmluZyA9IChkYXRhLlJlc3VsdERhdGEud2luc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5tb25leUxibC5zdHJpbmcgPSAoZGF0YS5SZXN1bHREYXRhLnVzZXJzY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyLjUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdMb2dpblJvb21SZXN1bHQnLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5Sb29tUmVzdWx0JywgZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbk9iai5hd2FyZFBvb3JMYmwuc3RyaW5nID0gKGRhdGEuUmVzdWx0RGF0YS5zY29yZV9wb29sIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0sXHJcbn0pOyJdfQ==