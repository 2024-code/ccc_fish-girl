"use strict";
cc._RF.push(module, '27f91OJQ0dCpYhw4Vi1HCDY', 'sm_Network');
// Texture/game_saima/sm_Network.js

"use strict";

cc.Class({
  "extends": cc.Component,
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.gameMain = this.node.getComponent('saima');
    this.sign = this.playerInfo.gameSign;
    this.userId = this.playerInfo.playerId;
    this.port = ':16006';
    this.time_betClose = 0;
    this.time_openPrice = 0;
    this.time_oneGame = 0; //连接网络

    if (cc.sys.isNative) {
      this.socket = SocketIO.connect(Lhjconfig.Server_IP + this.port);
    } else {
      var socket = require("socket-io");

      this.socket = socket(Lhjconfig.Server_IP + this.port);
    }

    this.registEvent();
  },
  //BetPool
  registEvent: function registEvent() {
    var _this = this;

    this.socket.on("connected", function (ret) {
      cc.log('connected:' + ret);

      if (ret) {
        _this.socket.emit("LoginGame", JSON.stringify({
          userid: _this.userId,
          //用户ID
          gametype: 11,
          //游戏类型
          sign: _this.sign //签名

        }));
      }
    });
    this.socket.on("loginGameResult", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      cc.log('游戏登陆成功=======================' + JSON.stringify(result));

      if (result.resultid) {
        //游戏登录成功
        _this.userName = result.Obj.nickname;
        _this.userCoin = result.Obj.score / _this.playerInfo.exchangeRate;
        _this.headUrl = result.Obj.headimgurl;
        _this.time_betClose = result.Obj.time_betClose;
        _this.time_openPrice = result.Obj.time_openPrice;
        _this.time_oneGame = result.Obj.time_oneGame;

        _this.gameMain.showInfo(result.Obj);

        _this.socket.emit('getGameRecord');
      } else {
        cc.log(result.msg);
      }
    });
    this.socket.on("BetStart", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      cc.log('BetStart:', result);

      _this.socket.emit('getGameRecord');

      _this.gameMain.startBets(result.obj);
    });
    this.socket.on("OpenWinResult", function (ret) {
      cc.log('OpenWinResult:', ret);

      var result = _this.changeResultJSON_Function(ret);

      if (result.ResultCode) {
        _this.userCoin = result.score / _this.playerInfo.exchangeRate;

        _this.gameMain.getResult(result);
      }
    });
    this.socket.on("lotteryResult", function (ret) {
      cc.log('lotteryResult:', ret);
    });
    this.socket.on("BetPool", function (ret) {
      var result = _this.changeResultJSON_Function(ret); // console.log('BetPool' + JSON.stringify(result));


      var index = 0;

      for (var i in _this.gameMain.otherOdd) {
        for (var j in _this.gameMain.otherOdd[i]) {
          _this.gameMain.otherOdd[i][j] = result.result[index];
          index++;
        }
      }
    });
    this.socket.on("getGameRecordResult", function (ret) {
      cc.log('getGameRecordResult:', ret);

      var result = _this.changeResultJSON_Function(ret);

      if (result.game_record.length > 0) {
        _this.gameMain.gameRecord = result.game_record;
      }
    });
    this.socket.on("BetStop", function (ret) {
      cc.log('BetStop:', ret);

      _this.gameMain.closeBets();
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