"use strict";
cc._RF.push(module, '6e202NmXPtCD4EhkMtY+Xcm', 'SH_Network');
// Script/senlinwuhui/SH_Network.js

"use strict";

cc.Class({
  "extends": cc.Component,
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.gameMain = this.node.getComponent('SH_Main');
    this.sign = this.playerInfo.gameSign;
    this.userId = this.playerInfo.playerId;
    this.port = ':15201';
    this.timer = 0; //连接网络

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
      XYZB_LOBBYNET.disconnect();

      if (result.resultid) {
        //游戏登录成功
        _this.userName = result.Obj.nickname;
        _this.userCoin = result.Obj.score / 100;
        _this.headUrl = result.Obj.headimgurl;
        _this.gameTime = result.Obj.gameTime;
        _this.gameMain.colorList = [].concat(result.game_color_list);

        _this.gameMain.showInfo();

        _this.gameMain.loginInitColor();

        _this.gameMain.showNextTime();

        _this.socket.emit('getGameRecord');
      } else {
        cc.log(result.msg);
      }
    });
    this.socket.on("BetStart", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      cc.log('BetStart:', result);
      _this.gameMain.colorList = [].concat(result.game_color_list);
      _this.gameMain.betList = [].concat(result.game_odd);

      _this.socket.emit('getGameRecord');

      _this.timer = new Date().getTime() / 1000;

      _this.gameMain.startBets();
    });
    this.socket.on("OpenWinResult", function (ret) {
      cc.log('OpenWinResult:', ret);

      var result = _this.changeResultJSON_Function(ret);

      if (result.ResultCode) {
        _this.userCoin = result.score / 100;

        _this.gameMain.getResult(result);
      }
    });
    this.socket.on("lotteryResult", function (ret) {
      cc.log('lotteryResult:', ret);
    });
    this.socket.on("BetPool", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      console.log('BetPool' + JSON.stringify(result));
      var index = 0;

      for (var i in _this.gameMain.otherOdd) {
        for (var j in _this.gameMain.otherOdd[i]) {
          _this.gameMain.otherOdd[i][j] = result.result[index];
          index++;
        }
      }

      _this.gameMain.rfOdds();
    });
    this.socket.on("getGameRecordResult", function (ret) {
      cc.log('getGameRecordResult:', ret);

      var result = _this.changeResultJSON_Function(ret);

      var historyList = _this.gameMain.historyNode.children;

      for (var i in historyList) {
        historyList[i].active = false;
      }

      if (result.game_record.length > 0) {
        for (var _i in result.game_record) {
          var color = result.game_record[_i].win_color;
          var aid = result.game_record[_i].win_card;
          var sp = null;

          if (color == 0) {
            sp = _this.gameMain.redAnimSp[aid];
          } else if (color == 1) {
            sp = _this.gameMain.greenAnimSp[aid];
          } else if (color == 2) {
            sp = _this.gameMain.yellowAnimSp[aid];
          }

          var j = result.game_record.length - 1 - _i;
          historyList[j].active = true;
          historyList[j].getComponent(cc.Sprite).spriteFrame = sp;
        }
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