"use strict";
cc._RF.push(module, 'b61cbuQ6RhDsKZnAGUrz9li', 'RouletteNet');
// Script/roulette/RouletteNet.js

"use strict";

var RouletteNetWork = function () {
  /**
   * 单例模式
   */
  function getInstant() {
    var _instance;

    if (_instance === undefined) {
      _instance = new Single();
    }

    return _instance;
  }
  /**
   * 逻辑层
   */


  function Single() {
    var _this = this;

    this.lobbyMain = null;
    this.roulette = null;
    this.rouletteSocket = null;
    this.playerInfo = null;
    this.playerHead = null;
    this.userid = null;

    this.init = function () {
      _this.playerInfo = require("PlayerInfo").getInstant;
    };

    this.loginGame_Function = function (loginIP, port, userid, sign) {
      loginIP = Lhjconfig.Server_IP;
      port = Lhjconfig.roulette_port;
      _this.userid = userid;
      var socket = null;

      if (cc.sys.isNative) {
        _this.rouletteSocket = SocketIO.connect(loginIP + port);
      } else {
        socket = require("socket-io");
        _this.rouletteSocket = socket(loginIP + port);
      } //用户连接游戏服务器


      _this.connectServer_Function(userid, sign); //连接


      _this.rouletteSocket.on("connected", function (ret) {
        if (ret) {
          try {
            //进入游戏
            _this.rouletteSocket.emit("LoginGame", JSON.stringify({
              userid: userid,
              //用户ID
              gametype: 11,
              //游戏类型
              sign: sign //签名

            }));
          } catch (error) {}
        }
      });
    };

    this.connectServer_Function = function (userid, sign) {
      _this.rouletteSocket && _this.rouletteSocket.on("loginGameResult", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        console.log('loginGameResult', result);

        if (result.resultid) {
          //游戏登录成
          _this.history = result.Obj.history_win;
          _this.playerInfo.playerHeadId = result.Obj.headimgurl;
          _this.playerInfo.playerCoin = result.Obj.score;

          if (!!_this.lobbyMain && !!_this.lobbyMain.getComponent("LobbyMain")) {
            _this.lobbyMain.getComponent("LobbyMain").netWork.socket.disconnect();

            _this.lobbyMain.bg_Black.active = true;
          }

          _this.playerInfo.gameDisconnect = false;
          _this.playerInfo.gameName = "Roulette";
          cc.audioEngine.stopAll();
          cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("RouletteCrystal");

          _this.addEvent();
        } else {
          //游戏登录失败
          _this.lobbyMain.getComponent("LobbyMain").loadGameScene = false;

          _this.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);

          _this.eventOn = true;
        }
      });

      _this.addEvent = function () {
        _this.rouletteSocket.on("BetStart", function (data) {
          console.log("开始下注", data);

          _this.roulette.startBet();
        });

        _this.rouletteSocket.on("lotteryResult", function (data) {
          var result = _this.changeResultJSON_Function(data);

          console.log("下注结果", result);

          if (result.ResultCode == 2) {
            var cData = result.bet_dict_list[0];

            _this.roulette.bet(cData.pos, cData.bet_gold);

            _this.roulette.usrScore.string = (data.score / 100).toFixed(2);
          }
        });

        _this.rouletteSocket.on("OpenWinResult", function (data) {
          var result = _this.changeResultJSON_Function(data);

          console.log("OpenWinResult", result);

          _this.roulette.showResult(result.win, result.win_score, result.user_score, result.history_win);
        });
      };
    };

    this.setLobbyMainObj_Function = function (scene) {
      _this.lobbyMain = scene;
    };

    this.changeResultJSON_Function = function (ret) {
      if (cc.sys.isNative) {
        return JSON.parse(ret);
      }

      return ret;
    };

    this.init();
    /**************提交事件****************/

    this.lotteryEmit = function (type, gold, pos, res) {
      _this.rouletteSocket.emit('lottery', JSON.stringify([{
        bet_type: type,
        bet_res: res,
        bet_gold: gold * 100,
        pos: pos
      }]));
    };
  }

  return {
    getInstant: new getInstant()
  };
}();

module.exports = RouletteNetWork;

cc._RF.pop();