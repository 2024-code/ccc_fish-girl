let RouletteNetWork = (() => {
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
    this.lobbyMain = null;
    this.roulette = null;
    this.rouletteSocket = null;
    this.playerInfo = null;
    this.playerHead = null;
    this.userid = null;

    this.init = () => {
      this.playerInfo = require("PlayerInfo").getInstant;
    };

    this.loginGame_Function = (loginIP, port, userid, sign) => {
      loginIP = Lhjconfig.Server_IP;
      port = Lhjconfig.roulette_port;
      this.userid = userid;
      var socket = null;
      if (cc.sys.isNative) {
        this.rouletteSocket = SocketIO.connect(loginIP + port);
      } else {
        socket = require("socket-io");
        this.rouletteSocket = socket(loginIP + port);
      }
      //用户连接游戏服务器
      this.connectServer_Function(userid, sign);

      //连接
      this.rouletteSocket.on("connected", ret => {
        if (ret) {
          try {
            //进入游戏
            this.rouletteSocket.emit("LoginGame", JSON.stringify({
              userid: userid, //用户ID
              gametype: 11, //游戏类型
              sign: sign //签名
            }));
          } catch (error) {}
        }
      });
    };

    this.connectServer_Function = (userid, sign) => {
      this.rouletteSocket && this.rouletteSocket.on("loginGameResult", ret => {
        var result = this.changeResultJSON_Function(ret);
        console.log('loginGameResult', result);
        if (result.resultid) { //游戏登录成
          this.history = result.Obj.history_win;
          this.playerInfo.playerHeadId = result.Obj.headimgurl;
          this.playerInfo.playerCoin = result.Obj.score;
          if (!!this.lobbyMain && !!this.lobbyMain.getComponent("LobbyMain")) {
            this.lobbyMain.getComponent("LobbyMain").netWork.socket.disconnect();
            this.lobbyMain.bg_Black.active = true;
          }
          this.playerInfo.gameDisconnect = false;
          this.playerInfo.gameName = "Roulette";
          cc.audioEngine.stopAll();
          cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("RouletteCrystal");
          this.addEvent();
        } else {
          //游戏登录失败
          this.lobbyMain.getComponent("LobbyMain").loadGameScene = false;
          this.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
          this.eventOn = true;
        }
      });

      this.addEvent = () => {

        this.rouletteSocket.on("BetStart", data => {
          console.log("开始下注", data);
          this.roulette.startBet();
        });

        this.rouletteSocket.on("lotteryResult", data => {
          var result = this.changeResultJSON_Function(data);
          console.log("下注结果", result);
          if (result.ResultCode == 2) {
            let cData = result.bet_dict_list[0];
            this.roulette.bet(cData.pos, cData.bet_gold);
            this.roulette.usrScore.string = (data.score / 100).toFixed(2);
          }
        });

        this.rouletteSocket.on("OpenWinResult", data => {
          var result = this.changeResultJSON_Function(data);
          console.log("OpenWinResult", result);
          this.roulette.showResult(result.win, result.win_score, result.user_score, result.history_win);
        });
      }
    };

    this.setLobbyMainObj_Function = scene => {
      this.lobbyMain = scene;
    };

    this.changeResultJSON_Function = ret => {
      if (cc.sys.isNative) {
        return JSON.parse(ret);
      }
      return ret;
    };

    this.init();

    /**************提交事件****************/
    this.lotteryEmit = (type, gold, pos, res) => {
      this.rouletteSocket.emit('lottery', JSON.stringify([{
        bet_type: type,
        bet_res: res,
        bet_gold: gold * 100,
        pos: pos
      }]));
    }
  }

  return {
    getInstant: new getInstant()
  }
})();

module.exports = RouletteNetWork;