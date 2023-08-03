"use strict";
cc._RF.push(module, '6d0b4avultBX5vMi1oMFOYH', 'XYZB_Network');
// Script/xiyouzhengba/XYZB_Network.js

"use strict";

cc.Class({
  "extends": cc.Component,
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.gameMain = this.node.getComponent('XYZB_Main');
    this.sign = this.playerInfo.gameSign;
    this.userId = this.playerInfo.playerId;
    this.port = ':16001';
    this.timer = 0; //连接网络

    if (cc.sys.isNative) {
      this.socket = SocketIO.connect(Lhjconfig.Server_IP + this.port);
    } else {
      var socket = require("socket-io");

      this.socket = socket(Lhjconfig.Server_IP + this.port);
    }

    this.registEvent();
  },
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
      _this.userName = result.Obj.nickname;
      _this.userCoin = result.Obj.score / 100;
      _this.headUrl = result.Obj.headimgurl;
      XYZB_LOBBYNET.disconnect();

      if (result.resultid) {
        //游戏登录成功
        _this.gameMain.showInfo();

        _this.socket.emit('getGameRecord');
      } else {
        cc.log(result.msg);
      }
    });
    this.socket.on("BetStart", function (ret) {
      cc.log('BetStart:', ret);

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

      var result = _this.changeResultJSON_Function(ret);

      if (result.ResultCode) {}
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
          var winN = result.game_record[_i].win_num[0];
          winN = winN == 0 || winN == 13 ? result.game_record[_i].win_num[1] : winN;
          var zxh = result.game_record[_i].win_special_num;
          historyList[_i].active = true;
          historyList[_i].getComponent(cc.Sprite).spriteFrame = _this.gameMain.cartoonSp[winN];
          historyList[_i].getChildByName('icon_he').getComponent(cc.Sprite).spriteFrame = _this.gameMain.zxhSp[zxh];
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