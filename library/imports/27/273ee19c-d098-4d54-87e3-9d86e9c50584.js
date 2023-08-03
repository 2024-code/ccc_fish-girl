"use strict";
cc._RF.push(module, '273eeGc0JhNVIfjnYbpxQWE', 'bcbm_NetWork');
// Texture/game_bcbm/js/bcbm_NetWork.js

"use strict";

//sgttest
var LandNetWork = function () {
  function getInstant() {
    var _instance;

    if (_instance === undefined) {
      _instance = new Single();
    }

    return _instance;
  }

  function Single() {
    var _this = this;

    this.lobbyMain = null;
    this.Landlords = null;
    this.LandlordsSocket = null;
    this.playerInfo = null;
    this.playerHead = null;
    this.playerList = null;
    this.roomBet = 1;
    this.LandlordsData = null;
    this.maxLint = [0, 0, 0]; //单压 串  豹子

    this.gameData = []; //单局数据

    this.mineData = []; //单局个人数据

    this.tmpMoveTm = 0; //挪的次数

    this.tmpSubsequent = {}; //局内串的组合

    this.enterGameType = 0; // 正常房卡场 0   俱乐部房卡场1

    this.init = function () {
      this.playerInfo = require("PlayerInfo").getInstant;
    };
    /**
     * 房卡场进入游戏
     */


    this.loginGame_Function = function (ip, prot, playerId, sign) {
      _this.ip = Lhjconfig.Server_IP;
      _this.prot = prot;
      _this.playerId = playerId;
      _this.sign = sign;

      if (!_this.playerInfo) {
        _this.init();
      }

      _this.enterGameType = 0;
      _this.playerInfo.gameName = "lottery";
      _this.playerInfo.gameDisconnect = false;
      _this.lobbyMainSocket = require('../../../Script/Lobby/LobbyNetWork').socket;

      _this.startGameFunction();
    };

    this.initCLubObj = function (clubObj) {
      this.clubObj = clubObj;
      this.clubObj.loginGameResult();
    };
    /**
     * 开始游戏
     */


    this.startGameFunction = function () {
      var ip = this.ip;
      var prot = this.prot;
      var playerId = this.playerId;
      var sign = this.sign;
      var self = this;
      var socket = null;

      if (cc.sys.isNative) {
        self.LandlordsSocket = SocketIO.connect(ip + ":" + prot);
      } else {
        socket = require("socket-io"), self.LandlordsSocket = socket(ip + ":" + prot);
      }

      self.LandlordsSocket.on("connect_error", function () {
        cc.log("连接失败");
      });
      self.LandlordsSocket.on("connect_timeout", function () {
        cc.log("连接超时");
      });
      self.LandlordsSocket.on("connected", function (ret) {
        //cc.log('进入游戏=====' + JSON.stringify(ret));
        self.LandlordsSocket.emit("LoginGame", JSON.stringify({
          userid: playerId,
          gametype: 1,
          sign: sign
        }));
      });
      self.LandlordsSocket.on("loginGameResult", function (ret) {
        cc.log('进入奔驰宝马， 返回游戏信息:' + JSON.stringify(ret));
        ret = self.changeResultJSON_Function(ret);
        window.yadaxiao_sc = ret.Obj;

        if (ret.resultid) {
          self.playerInfo.playerCoin = ret.Obj.score;
          self.lobbyMainSocket.disconnect(); //self.LandlordsSocket.emit("getGameRankingList","");

          cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("game_benchibaoma");
        }
      }); // //当前状态

      self.LandlordsSocket.on("getGameTypeResult", function (ret) {
        //1开始下注 2开奖 3结束 4可以抢庄
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.BCBM_ins.init_stat(result);
      });
      self.LandlordsSocket.on("qiangZhuangResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log('抢庄结果');
        console.log(result);

        if (result.ResultCode == 1) {
          window.BCBM_ins.showHint(result);
        } else {//window.BCBM_ins.showHint('抢庄失败');
        }
      });
      self.LandlordsSocket.on("qiangStart", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log("开始抢庄");
        console.log(result);

        if (window.BCBM_ins) {
          window.BCBM_ins.qiangBegin();
        }
      });
      self.LandlordsSocket.on("sendZhuang", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log("发送庄");
        console.log(result);

        if (window.BCBM_ins) {
          window.BCBM_ins.setzhuang(result);
        }
      });
      self.LandlordsSocket.on("lotteryResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log("～～～～～～下注返回");
        console.log(result);

        if (result.ResultCode == -1) {
          return;
        } else if (result.ResultCode == 2) {
          try {
            self.playerInfo.playerCoin = result.score;
            window.BCBM_ins.onBet(result.bet_dict);
          } catch (e) {}
        }
      });
      self.LandlordsSocket.on("OpenWinResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);

        if (window.BCBM_ins) {
          window.BCBM_ins.showResult(result);
        }

        console.log("～～～～～～开牌");
        console.log(ret);
      });
      self.LandlordsSocket.on("BetStart", function (ret) {
        var result = self.changeResultJSON_Function(ret); //var ss = {result:true,type:1};

        if (window.BCBM_ins) {
          window.BCBM_ins.betBegin();
        }

        console.log("～～～～～～开局");
        console.log(result);
      });
      self.LandlordsSocket.on("BetPool", function (ret) {
        var result = self.changeResultJSON_Function(ret); //var ss = {result:true,type:1};

        if (window.BCBM_ins) {
          window.BCBM_ins.betUpdate(result.betPool);
        } // console.log("～～～～～～获取下注池子");
        // console.log(result);

      }); //记录

      self.LandlordsSocket.on("getGameRecordListResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(result);

        for (var i = 0; i < result.game_record_list.length; i++) {
          window.BCBM_ins.history(result.game_record_list[i].win_car);
        }
      });
    };
    /**
     * 设置场景对象
     */


    this.setLobbyMainObj_Function = function (scene) {
      this.lobbyMain = scene;
    };

    this.setLandlordsObj_Function = function (scene) {
      this.Landlords = scene;
    };

    this.changeResultJSON_Function = function (ret) {
      if (cc.sys.isNative) {
        return JSON.parse(ret);
      }

      return ret;
    };

    this.init();
  }

  return {
    getInstant: new getInstant()
  };
}();

module.exports = LandNetWork;

cc._RF.pop();