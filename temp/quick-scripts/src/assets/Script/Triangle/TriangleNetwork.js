"use strict";
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