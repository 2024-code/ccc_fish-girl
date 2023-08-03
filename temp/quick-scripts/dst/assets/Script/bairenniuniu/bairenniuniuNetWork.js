
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bairenniuniu/bairenniuniuNetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd2635a7J75OEKgCA0sktPcG', 'bairenniuniuNetWork');
// Script/bairenniuniu/bairenniuniuNetWork.js

"use strict";

//sgttest
window.bairenniuniu_global = {};

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
    this.houseId = null;
    this.tableId = -1;
    this.seatId = -1;
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
      _this.lobbyMainSocket = require('../Lobby/LobbyNetWork').socket;

      _this.startGameFunction();
    };

    this.club_loginGame_Function2 = function () {
      _this.ip = Lhjconfig.Server_IP;
      _this.prot = '13851';

      if (!_this.playerInfo) {
        _this.init();
      }

      _this.enterGameType = 1;
      _this.playerId = _this.playerInfo.playerId;
      _this.sign = _this.playerInfo.gameSign;
      _this.playerInfo.gameName = "Land";
      _this.playerInfo.gameDisconnect = false;
      _this.lobbyMainSocket = require('../Lobby/LobbyNetWork').socket;

      _this.startGameFunction();
    };

    this.initCLubObj = function (clubObj) {
      this.clubObj = clubObj;
      this.clubObj.loginGameResult();
    };

    this.club_loginGame_Function = function (clubObj) {
      _this.ip = Lhjconfig.Server_IP;
      _this.prot = '13851';

      if (!_this.playerInfo) {
        _this.init();
      }

      _this.enterGameType = 1;
      _this.clubObj = clubObj;
      _this.playerId = _this.playerInfo.playerId;
      _this.sign = _this.playerInfo.gameSign;
      _this.playerInfo.gameName = "Land";
      _this.playerInfo.gameDisconnect = false;
      _this.lobbyMainSocket = require('../Lobby/LobbyNetWork').socket;

      _this.startGameFunction();
    };

    this.gold_loginGame_Function = function (goldObj) {
      _this.ip = Lhjconfig.Server_IP;
      _this.prot = '13852';

      if (!_this.playerInfo) {
        _this.init();
      }

      _this.goldObj = goldObj;
      _this.enterGameType = 2;
      _this.playerId = _this.playerInfo.playerId;
      _this.sign = _this.playerInfo.gameSign;
      _this.playerInfo.gameName = "Land";
      _this.playerInfo.gameDisconnect = false;
      _this.lobbyMainSocket = require('../Lobby/LobbyNetWork').socket;

      _this.startGameFunction();
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
        cc.log('进入押大小， 返回游戏信息:' + JSON.stringify(ret));
        ret = self.changeResultJSON_Function(ret);
        window.bairenniuniu_sc = ret.Obj;

        if (ret.resultid) {
          self.playerInfo.playerCoin = ret.Obj.score;
          self.lobbyMainSocket.disconnect();
          self.LandlordsSocket.emit("getGameRankingList", "");
        }
      }); // // //名单

      self.LandlordsSocket.on("getGameRankingListResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.bairenniuniu_global.userInfo_list = result;

        if (cc.director.getScene().name != "game_bairenniuniu") {
          cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("game_bairenniuniu");
        } else {
          window.brnn_ins.serializeUsers(result);
          window.brnn_ins.betBegin_r();
        }
      }); // //当前状态

      self.LandlordsSocket.on("getGameTypeResult", function (ret) {
        //1开始下注 2开奖 3结束 4可以抢庄
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.brnn_ins.init_stat(result);
      });
      self.LandlordsSocket.on("qiangZhuangResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log('抢庄结果');
        console.log(result);

        if (result.ResultCode == 1) {
          window.brnn_ins.showHint('已经抢庄');
        } else {//window.brnn_ins.showHint('抢庄失败');
        }
      });
      self.LandlordsSocket.on("qiangStart", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log("开始抢庄");
        console.log(result);

        if (window.brnn_ins) {
          window.brnn_ins.qiangNode.active = true;
          window.brnn_ins.bet_text_qiang.active = true;
          window.brnn_ins.m_iGameOverTime = Date.now() / 1000 + 5;
        }
      });
      self.LandlordsSocket.on("sendZhuang", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log("发送庄");
        console.log(result);

        if (window.brnn_ins) {
          window.brnn_ins.setzhuang(result);
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
            brnn_ins.onBet(result.bet_dict);
          } catch (e) {}
        }
      });
      self.LandlordsSocket.on("OpenWinResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        if (window.brnn_ins) window.brnn_ins.showResult(result);
        console.log("～～～～～～开牌");
        console.log(ret);
      });
      self.LandlordsSocket.on("BetStart", function (ret) {
        var result = self.changeResultJSON_Function(ret); //var ss = {result:true,type:1};

        if (window.brnn_ins) window.brnn_ins.betBegin();
        console.log("～～～～～～开局");
        console.log(result);
      }); //记录

      self.LandlordsSocket.on("getGameRecordListResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.brnn_ins.init_record(result.game_record_list);
      });
      self.LandlordsSocket.on("sendTableMsgResult", function (ret) {
        var cjson = null;

        try {
          cjson = JSON.parse(ret);

          if (typeof cjson == 'object' && cjson) {
            ret = cjson;
          }
        } catch (e) {}

        ;
        cc.log('聊天=====' + JSON.stringify(ret));
        window.yuxiaxieMain.receiveSpChat(ret);
      });
      self.LandlordsSocket.on("BrokenLineRecovery", function (ret) {
        console.log('短线重连' + JSON.stringify(ret));
        self.Landlords.node.getChildByName('准备按钮').active = false;
        self.Landlords.node.getChildByName('邀请俱乐部成员按钮').active = false;
        self.Landlords.Ready(true);

        if (cc.sys.isNative) {
          ret = JSON.parse(ret);
          console.log('BetTypeResult22222==========================开始', ret);
        }

        self.Landlords.JuShu.string = '剩' + ret.round_num + '局';
        window.global_left_round = ret.round_num;

        if (ret.is_table_type == 1) {
          //如果下注状态需要 可以下注  
          self.Landlords.startInit();
          self.Landlords.mineData = [0, 0, 0, 0, 0, 0];
          self.Landlords.scheduleOnce(function () {
            yuxiaxieMain.startTouZhu(ret.bet_time - 1); //补投注信息

            var betData = ret.bet_data;

            for (var i in betData) {
              if (betData[i].bet_type == 1) {
                var pox = [0, -279, 9, 298, -279, 9, 298];
                var poy = [0, 97, 97, 97, -103, -103, -103, -103];
                self.Landlords.XiaZhu(betData[i].bet_gold, pox[betData[i].bet_res], poy[betData[i].bet_res], betData[i].seatId);

                if (betData[i].seatId == self.Landlords.seatID) {
                  self.Landlords.tempNetWork.mineData[betData[i].bet_res - 1] += betData[i].bet_gold;
                  self.Landlords.rfMineData();
                }
              }
            }

            self.Landlords.tempNetWork.tmpSubsequent = ret.lian_chuan_max;
            self.Landlords.tempNetWork.gameData = ret.bet_max_check;
            self.Landlords.rfGameData();
          }, 1);
        }

        self.Landlords.scheduleOnce(function () {
          //补玩家金币
          for (var i in ret.user_gold_dict) {
            for (var j in self.playerList) {
              if (!!self.playerList[j] && self.playerList[j].userId == i) {
                self.playerList[j].table_gold = ret.user_gold_dict[i];
              }
            }
          }

          self.Landlords.initPlayer(self.playerList);
        }, 1); //补上一局开骰子结果

        if (!!ret.last_win_card) {
          var list = ret.last_win_card;
          self.Landlords.resultNode.removeAllChildren();

          for (var i in list) {
            var nd = cc.instantiate(self.Landlords.ShaiZis[list[i]]);

            if (self.Landlords.spType == '1') {
              nd.getComponent(cc.Sprite).spriteFrame = self.Landlords.shaiList1[list[i] - 1];
            } else if (self.Landlords.spType == '2') {
              nd.getComponent(cc.Sprite).spriteFrame = self.Landlords.shaiList2[list[i] - 1];
            }

            nd.scale = 0.2;
            nd.position = i == '0' ? cc.v2(-140, 239) : cc.v2(-93, 239);
            self.Landlords.resultNode.addChild(nd);
          }
        }
      });
    };

    this.Exit_Function = function () {
      this.LandlordsSocket.disconnect();
      cc.director.loadScene('LobbyMain');
      this.lobbyMain = null;
      this.Landlords = null;
      this.LandlordsSocket = null;
      this.houseId = null;
      this.tableId = -1;
      this.seatId = -1;
      this.playerHead = null;
      this.playerList = null;
      this.roomBet = 1;
      this.LandlordsData = null;
      this.maxLint = [0, 0, 0];
      this.gameData = []; //单局数据

      this.mineData = []; //单局个人数据

      this.tmpMoveTm = 0; //挪的次数

      this.tmpSubsequent = {}; //局内串的组合
    };
    /**
     * socket长连
     */


    this.LandlordsNetWork = function () {
      var self = this;
      console.log('监听socket事件');
      self.LandlordsSocket.on("disconnect", function (t) {
        //self.gameExit || (self.Landlords.com_MessageBox.active = true, self.Landlords.disconnectNetWork_Function());
        console.log('断开连接');

        if (window.need_reconnet) {//console.log("22重连"+self.ip + ":" + self.prot);
          //self.LandlordsSocket = SocketIO.connect(self.ip + ":" + self.prot);
          //window.need_reconnet = false;
        }
      });
      /**
       * 接收所有玩家信息
       */

      self.LandlordsSocket.on("Hudshow", function (ret) {
        yuxiaxieMain.houseLbl.string = '房号：' + self.houseId;
        yuxiaxieMain.exhouseId = self.houseId;
        cc.log('Hudshow==========================' + JSON.stringify(ret) + '     ' + self.houseId);
        var result = self.changeResultJSON_Function(ret);

        for (var i in result.data) {
          if (result.data[i].seatId == self.seatId) {
            self.Landlords.gameInit(result.data[i].tableId, result.data[i].seatId, result.data[i].userId);
          }
        }

        self.maxLint = result.bet_max;
        self.playerList = result.data;
        self.Landlords.initPlayer(result.data);
      });
      /**
       * 接收玩家准备信息
       */

      self.LandlordsSocket.on("TabelReadyResult", function (ret) {
        ret = self.changeResultJSON_Function(ret);
        cc.log('TabelReadyResult==========================', JSON.stringify(ret));

        if (!!ret.zhuang) {
          console.log('获得固定庄id：' + ret.zhuang);
          if (!!self.Landlords) self.Landlords.setMoth(ret.zhuang);
        }

        if (ret.is_line) {
          return;
        }

        self.Landlords.readyPlayer(ret.data);
      });
      /**
       * 游戏状态
       */

      self.LandlordsSocket.on("BetStartResult", function (ret) {
        ret = self.changeResultJSON_Function(ret);
        cc.log('BetStartResult==========================', JSON.stringify(ret));
      });
      self.LandlordsSocket.on('BetTypeResult', function (ret) {
        console.log('BetTypeResult==========================开始', ret);

        if (cc.sys.isNative) {
          ret = JSON.parse(ret);
          console.log('BetTypeResult22222==========================开始', ret);
        }

        self.Landlords.JuShu.string = "\u5269" + ret.round_num + "\u5C40";
        self.Landlords.startInit();
        self.Landlords.startTouZhu();
        window.global_left_round = ret.round_num; // self.Landlords.closeSettlement();
      }); //开始抢庄

      self.LandlordsSocket.on("StartChoiceBanker", function (ret) {
        console.log('开始抢庄'); // self.Landlords.closeSettlement();

        self.Landlords.Moth();
        yuxiaxieMain.allowExitGame = false;
      }); //抢庄回执

      self.LandlordsSocket.on("ChoiceBankerResult", function (ret) {
        ret = self.changeResultJSON_Function(ret);
        console.log('抢庄请求成功：' + ret.result);
      }); //抢庄结果

      self.LandlordsSocket.on("OverChoiceBankerResult", function (ret) {
        console.log('谁是庄userID：');
        console.log(ret);
        ret = self.changeResultJSON_Function(ret);
        if (!!self.Landlords) self.Landlords.setMoth(ret.result);
      }); //回合结束 发结果

      self.LandlordsSocket.on("OpenWinResult", function (ret) {
        console.log('OpenWinResult');
        console.log(ret);
        var result = self.changeResultJSON_Function(ret); //控制显示筛子

        self.Landlords.showSaiZi(result.win_result); //控制回收筹资

        self.Landlords.refuseChouma(true);

        for (var i in result.result) {
          for (var j in self.playerList) {
            if (!!self.playerList[j] && self.playerList[j].userId == i) {
              self.playerList[j].table_gold = result.result[i];
            }
          }
        }

        self.Landlords.initPlayer(self.playerList);
        self.Landlords.openSettlement(result);
      }); //下注回执

      self.LandlordsSocket.on("TabelBetResult", function (ret) {
        console.log('TabelBetResult'); // console.log(ret);

        var result = self.changeResultJSON_Function(ret);

        if (result.result) {
          var dt = result.data[0];

          if (result.data[0].bet_type == 1) {
            var pox = [0, -279, 9, 298, -279, 9, 298];
            var poy = [0, 97, 97, 97, -103, -103, -103, -103];
            self.Landlords.XiaZhu(dt.bet_gold, pox[dt.bet_res], poy[dt.bet_res], dt.seatId);

            if (dt.seatId == self.Landlords.seatID) {
              self.mineData[dt.bet_res - 1] += dt.bet_gold;
              self.Landlords.rfMineData();
            }
          } else {//特殊注
          }

          self.tmpSubsequent = result.lian_chuan_max;
          self.gameData = result.bet_max_check;
          self.Landlords.rfGameData();
        } else {
          yuxiaxieMain.commonBoard.play();
          yuxiaxieMain.commonLbl.string = '下注失败';
        }
      }); //挪回执

      self.LandlordsSocket.on("TabelBetNuoResult", function (ret) {
        console.log('TabelBetNuoResult');
        console.log(ret);
        var result = self.changeResultJSON_Function(ret);

        if (result.result) {
          if (result.data.bet_type == 5) {
            //特殊注
            self.gameData = result.bet_max_check;
            self.Landlords.rfGameData();

            if (result.data.userId == self.Landlords.userid) {
              self.tmpMoveTm--;
            }
          }
        } else {
          yuxiaxieMain.commonBoard.play();
          yuxiaxieMain.commonLbl.string = '下注失败';
        }
      });
      self.LandlordsSocket.on("playEnter", function (ret) {
        cc.log('其它玩家进入=============' + JSON.stringify(ret));
        var result = self.changeResultJSON_Function(ret);
        self.playerList[result.ResultData.seatId] = {
          nickname: result.ResultData.nickname,
          score: result.ResultData.score,
          seatId: result.ResultData.seatId,
          userId: result.ResultData.userId,
          tableId: self.Landlords.tableID,
          table_gold: result.ResultData.table_gold,
          headimgurl: result.ResultData.headimgurl
        };
        self.Landlords.initPlayer(self.playerList);
      });
      self.LandlordsSocket.on("PlayerOut", function (ret) {
        var result = self.changeResultJSON_Function(ret);

        for (var i in self.playerList) {
          if (self.playerList[i].userId == result.userId) {
            if (!window.yuxiaxieMain.isGameOver) {
              self.playerList[i] = null;
              self.Landlords.initPlayer(self.playerList);
            }
          }
        }
      });
      self.LandlordsSocket.on("GameOverResult", function (ret) {
        ret = self.changeResultJSON_Function(ret);
        console.log(JSON.stringify(ret));

        if (this.enterGameType == 1) {
          var nt = require('clubNet').getInstant;

          nt.clubSocket.disconnect();
        }

        yuxiaxieMain.game_win_record = ret.data.game_win_record; // self.Exit_Function();

        setTimeout(function () {
          yuxiaxieMain.closeSettlement();
          yuxiaxieMain.openResultUI(ret);
        }, 3000);
      });
      self.LandlordsSocket.on("getTableWinRecordResult", function (ret) {
        console.log("获取历史结果" + JSON.stringify(ret));

        if (cc.sys.isNative) {
          ret = JSON.parse(ret);
          console.log("获取历史结果22222" + JSON.stringify(ret));
        }

        yuxiaxieMain.openHistoryUI(ret);
      });
      self.LandlordsSocket.on("getTableDictRecordResult", function (ret) {
        console.log("获取投注信息" + JSON.stringify(ret));

        if (cc.sys.isNative) {
          ret = JSON.parse(ret);
          console.log("获取投注信息22222" + JSON.stringify(ret));
        }

        yuxiaxieMain.openDetailUI(ret);
      }); // self.LandlordsSocket.on("regression", function (t) {
      //     t = self.changeResultJSON_Function(t);
      //     cc.log("断线重连", t);
      // });

      self.LandlordsSocket.on("CheckUserGlod", function (t) {
        t = self.changeResultJSON_Function(t);

        if (this.enterGameType == 2) {
          self.LandlordsSocket.disconnect();
          yuxiaxieMain.noGoldBd.active = true;
          setTimeout(function () {
            cc.director.loadScene('LobbyMain');
          }, 2000);
        }
      });
      self.LandlordsSocket.on("stratDisbandResult", function (t) {
        t = self.changeResultJSON_Function(t);
        console.log("退出游戏", t);
        yuxiaxieMain.exitBoard.active = true;
        yuxiaxieMain.exitBoard.getChildByName('ok').active = true;
        yuxiaxieMain.exitBoard.getChildByName('no').active = true;
        var tmLbl = yuxiaxieMain.exitBoard.getChildByName('tmLbl').getComponent(cc.Label);
        var titleLbl = yuxiaxieMain.exitBoard.getChildByName('titleLbl').getComponent(cc.Label);
        titleLbl.string = "\u73A9\u5BB6" + t.user_name + "\u7533\u8BF7\u89E3\u6563\u623F\u95F4";

        if (t.user == self.playerInfo.playerId) {
          yuxiaxieMain.exitBoard.getChildByName('ok').active = false;
          yuxiaxieMain.exitBoard.getChildByName('no').active = false;
        }

        var nodeList = yuxiaxieMain.exitBoard.getChildByName('user_list').children;

        for (var i in nodeList) {
          nodeList[i].active = false;

          if (i == '0') {
            nodeList[i].getChildByName('usrName').getComponent(cc.Label).string = t.user_name;
            nodeList[i].active = true;
          }
        }

        tmLbl.string = '60秒';
        var exitTimerTmp = 60;
        yuxiaxieMain.schedule(function () {
          exitTimerTmp--;
          tmLbl.string = exitTimerTmp + "\u79D2";
        }, 1, 59);
      });
      self.LandlordsSocket.on("overDisbandResult", function (t) {
        t = self.changeResultJSON_Function(t);
        console.log("所有人同意退出游戏", t);
        yuxiaxieMain.exitBoard.active = false;
        self.Exit_Function();
      });
      self.LandlordsSocket.on("choiceDisbandResult", function (t) {
        t = self.changeResultJSON_Function(t);
        console.log("有人投票", t);

        if (t.is_true) {
          var nodeList = yuxiaxieMain.exitBoard.getChildByName('user_list').children;

          for (var i in nodeList) {
            if (!nodeList[i].active) {
              nodeList[i].getChildByName('usrName').getComponent(cc.Label).string = t.user_name;
              nodeList[i].active = true;
              break;
            }
          }
        } else {
          yuxiaxieMain.exitBoard.active = false;
        }
      });
    };

    this.enterRoomSend_func = function () {
      var self = this;

      try {
        console.log('获取hudshow消息');
        self.LandlordsSocket.emit("getUer", {
          tableId: self.tableId,
          seatId: self.seatId,
          playerId: self.playerId
        }); // self.LandlordsSocket.emit("joinTableroom", {
        //     tableId: self.tableId,
        //     seatId: self.seatId,
        //     userId: self.playerId
        // });
      } catch (error) {}

      ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYWlyZW5uaXVuaXVcXGJhaXJlbm5pdW5pdU5ldFdvcmsuanMiXSwibmFtZXMiOlsid2luZG93IiwiYmFpcmVubml1bml1X2dsb2JhbCIsIkxhbmROZXRXb3JrIiwiZ2V0SW5zdGFudCIsIl9pbnN0YW5jZSIsInVuZGVmaW5lZCIsIlNpbmdsZSIsImxvYmJ5TWFpbiIsIkxhbmRsb3JkcyIsIkxhbmRsb3Jkc1NvY2tldCIsInBsYXllckluZm8iLCJob3VzZUlkIiwidGFibGVJZCIsInNlYXRJZCIsInBsYXllckhlYWQiLCJwbGF5ZXJMaXN0Iiwicm9vbUJldCIsIkxhbmRsb3Jkc0RhdGEiLCJtYXhMaW50IiwiZ2FtZURhdGEiLCJtaW5lRGF0YSIsInRtcE1vdmVUbSIsInRtcFN1YnNlcXVlbnQiLCJlbnRlckdhbWVUeXBlIiwiaW5pdCIsInJlcXVpcmUiLCJsb2dpbkdhbWVfRnVuY3Rpb24iLCJpcCIsInByb3QiLCJwbGF5ZXJJZCIsInNpZ24iLCJMaGpjb25maWciLCJTZXJ2ZXJfSVAiLCJnYW1lTmFtZSIsImdhbWVEaXNjb25uZWN0IiwibG9iYnlNYWluU29ja2V0Iiwic29ja2V0Iiwic3RhcnRHYW1lRnVuY3Rpb24iLCJjbHViX2xvZ2luR2FtZV9GdW5jdGlvbjIiLCJnYW1lU2lnbiIsImluaXRDTHViT2JqIiwiY2x1Yk9iaiIsImxvZ2luR2FtZVJlc3VsdCIsImNsdWJfbG9naW5HYW1lX0Z1bmN0aW9uIiwiZ29sZF9sb2dpbkdhbWVfRnVuY3Rpb24iLCJnb2xkT2JqIiwic2VsZiIsImNjIiwic3lzIiwiaXNOYXRpdmUiLCJTb2NrZXRJTyIsImNvbm5lY3QiLCJvbiIsImxvZyIsInJldCIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlcmlkIiwiZ2FtZXR5cGUiLCJjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uIiwiYmFpcmVubml1bml1X3NjIiwiT2JqIiwicmVzdWx0aWQiLCJwbGF5ZXJDb2luIiwic2NvcmUiLCJkaXNjb25uZWN0IiwicmVzdWx0IiwiY29uc29sZSIsInVzZXJJbmZvX2xpc3QiLCJkaXJlY3RvciIsImdldFNjZW5lIiwibmFtZSIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJRaWVIdWFuU2NlbmVfbm9ybWFsIiwiYnJubl9pbnMiLCJzZXJpYWxpemVVc2VycyIsImJldEJlZ2luX3IiLCJpbml0X3N0YXQiLCJSZXN1bHRDb2RlIiwic2hvd0hpbnQiLCJxaWFuZ05vZGUiLCJhY3RpdmUiLCJiZXRfdGV4dF9xaWFuZyIsIm1faUdhbWVPdmVyVGltZSIsIkRhdGUiLCJub3ciLCJzZXR6aHVhbmciLCJvbkJldCIsImJldF9kaWN0IiwiZSIsInNob3dSZXN1bHQiLCJiZXRCZWdpbiIsImluaXRfcmVjb3JkIiwiZ2FtZV9yZWNvcmRfbGlzdCIsImNqc29uIiwicGFyc2UiLCJ5dXhpYXhpZU1haW4iLCJyZWNlaXZlU3BDaGF0Iiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwiUmVhZHkiLCJKdVNodSIsInN0cmluZyIsInJvdW5kX251bSIsImdsb2JhbF9sZWZ0X3JvdW5kIiwiaXNfdGFibGVfdHlwZSIsInN0YXJ0SW5pdCIsInNjaGVkdWxlT25jZSIsInN0YXJ0VG91Wmh1IiwiYmV0X3RpbWUiLCJiZXREYXRhIiwiYmV0X2RhdGEiLCJpIiwiYmV0X3R5cGUiLCJwb3giLCJwb3kiLCJYaWFaaHUiLCJiZXRfZ29sZCIsImJldF9yZXMiLCJzZWF0SUQiLCJ0ZW1wTmV0V29yayIsInJmTWluZURhdGEiLCJsaWFuX2NodWFuX21heCIsImJldF9tYXhfY2hlY2siLCJyZkdhbWVEYXRhIiwidXNlcl9nb2xkX2RpY3QiLCJqIiwidXNlcklkIiwidGFibGVfZ29sZCIsImluaXRQbGF5ZXIiLCJsYXN0X3dpbl9jYXJkIiwibGlzdCIsInJlc3VsdE5vZGUiLCJyZW1vdmVBbGxDaGlsZHJlbiIsIm5kIiwiaW5zdGFudGlhdGUiLCJTaGFpWmlzIiwic3BUeXBlIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJzaGFpTGlzdDEiLCJzaGFpTGlzdDIiLCJzY2FsZSIsInBvc2l0aW9uIiwidjIiLCJhZGRDaGlsZCIsIkV4aXRfRnVuY3Rpb24iLCJsb2FkU2NlbmUiLCJMYW5kbG9yZHNOZXRXb3JrIiwidCIsIm5lZWRfcmVjb25uZXQiLCJob3VzZUxibCIsImV4aG91c2VJZCIsImRhdGEiLCJnYW1lSW5pdCIsImJldF9tYXgiLCJ6aHVhbmciLCJzZXRNb3RoIiwiaXNfbGluZSIsInJlYWR5UGxheWVyIiwiTW90aCIsImFsbG93RXhpdEdhbWUiLCJzaG93U2FpWmkiLCJ3aW5fcmVzdWx0IiwicmVmdXNlQ2hvdW1hIiwib3BlblNldHRsZW1lbnQiLCJkdCIsImNvbW1vbkJvYXJkIiwicGxheSIsImNvbW1vbkxibCIsIlJlc3VsdERhdGEiLCJuaWNrbmFtZSIsInRhYmxlSUQiLCJoZWFkaW1ndXJsIiwiaXNHYW1lT3ZlciIsIm50IiwiY2x1YlNvY2tldCIsImdhbWVfd2luX3JlY29yZCIsInNldFRpbWVvdXQiLCJjbG9zZVNldHRsZW1lbnQiLCJvcGVuUmVzdWx0VUkiLCJvcGVuSGlzdG9yeVVJIiwib3BlbkRldGFpbFVJIiwibm9Hb2xkQmQiLCJleGl0Qm9hcmQiLCJ0bUxibCIsIkxhYmVsIiwidGl0bGVMYmwiLCJ1c2VyX25hbWUiLCJ1c2VyIiwibm9kZUxpc3QiLCJjaGlsZHJlbiIsImV4aXRUaW1lclRtcCIsInNjaGVkdWxlIiwiaXNfdHJ1ZSIsImVudGVyUm9vbVNlbmRfZnVuYyIsImVycm9yIiwic2V0TG9iYnlNYWluT2JqX0Z1bmN0aW9uIiwic2NlbmUiLCJzZXRMYW5kbG9yZHNPYmpfRnVuY3Rpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0FBLE1BQU0sQ0FBQ0MsbUJBQVAsR0FBNkIsRUFBN0I7O0FBRUEsSUFBSUMsV0FBVyxHQUFJLFlBQVk7QUFDM0IsV0FBU0MsVUFBVCxHQUFzQjtBQUNsQixRQUFJQyxTQUFKOztBQUNBLFFBQUlBLFNBQVMsS0FBS0MsU0FBbEIs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QUFWLEVBQWlCO0FBQzdDLFdBQUtqTSxTQUFMLEdBQWlCaU0sS0FBakI7QUFDSCxLQUZEOztBQUlBLFNBQUtDLHdCQUFMLEdBQWdDLFVBQVVELEtBQVYsRUFBaUI7QUFDN0MsV0FBS2hNLFNBQUwsR0FBaUJnTSxLQUFqQjtBQUNILEtBRkQ7O0FBSUEsU0FBSzVJLHlCQUFMLEdBQWlDLFVBQVVOLEdBQVYsRUFBZTtBQUM1QyxVQUFJUCxFQUFFLENBQUNDLEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQixlQUFPTyxJQUFJLENBQUN5QyxLQUFMLENBQVczQyxHQUFYLENBQVA7QUFDSDs7QUFDRCxhQUFPQSxHQUFQO0FBQ0gsS0FMRDs7QUFNQSxTQUFLOUIsSUFBTDtBQUNIOztBQUNELFNBQU87QUFDSHJCLElBQUFBLFVBQVUsRUFBRSxJQUFJQSxVQUFKO0FBRFQsR0FBUDtBQUdILENBbHFCaUIsRUFBbEI7O0FBb3FCQXVNLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpNLFdBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL3NndHRlc3Rcclxud2luZG93LmJhaXJlbm5pdW5pdV9nbG9iYWwgPSB7fTtcclxuXHJcbnZhciBMYW5kTmV0V29yayA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBnZXRJbnN0YW50KCkge1xyXG4gICAgICAgIHZhciBfaW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKF9pbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIF9pbnN0YW5jZSA9IG5ldyBTaW5nbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBTaW5nbGUoKSB7XHJcbiAgICAgICAgdGhpcy5sb2JieU1haW4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGFuZGxvcmRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gbnVsbDtcclxuICAgICAgICB0aGlzLmhvdXNlSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFibGVJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuc2VhdElkID0gLTE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBsYXllckxpc3QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucm9vbUJldCA9IDE7XHJcbiAgICAgICAgdGhpcy5MYW5kbG9yZHNEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1heExpbnQgPSBbMCwgMCwgMF07IC8v5Y2V5Y6LIOS4siAg6LG55a2QXHJcbiAgICAgICAgdGhpcy5nYW1lRGF0YSA9IFtdOyAvL+WNleWxgOaVsOaNrlxyXG4gICAgICAgIHRoaXMubWluZURhdGEgPSBbXTsgLy/ljZXlsYDkuKrkurrmlbDmja5cclxuICAgICAgICB0aGlzLnRtcE1vdmVUbSA9IDA7IC8v5oyq55qE5qyh5pWwXHJcbiAgICAgICAgdGhpcy50bXBTdWJzZXF1ZW50ID0ge307IC8v5bGA5YaF5Liy55qE57uE5ZCIXHJcbiAgICAgICAgdGhpcy5lbnRlckdhbWVUeXBlID0gMDsgLy8g5q2j5bi45oi/5Y2h5Zy6IDAgICDkv7HkuZDpg6jmiL/ljaHlnLoxXHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmiL/ljaHlnLrov5vlhaXmuLjmiI9cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxvZ2luR2FtZV9GdW5jdGlvbiA9IChpcCwgcHJvdCwgcGxheWVySWQsIHNpZ24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pcCA9IExoamNvbmZpZy5TZXJ2ZXJfSVA7XHJcbiAgICAgICAgICAgIHRoaXMucHJvdCA9IHByb3Q7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySWQgPSBwbGF5ZXJJZDtcclxuICAgICAgICAgICAgdGhpcy5zaWduID0gc2lnbjtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllckluZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lVHlwZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lTmFtZSA9IFwibG90dGVyeVwiO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW5Tb2NrZXQgPSByZXF1aXJlKCcuLi9Mb2JieS9Mb2JieU5ldFdvcmsnKS5zb2NrZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lRnVuY3Rpb24oKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jbHViX2xvZ2luR2FtZV9GdW5jdGlvbjIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXAgPSBMaGpjb25maWcuU2VydmVyX0lQO1xyXG4gICAgICAgICAgICB0aGlzLnByb3QgPSAnMTM4NTEnO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGxheWVySW5mbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbnRlckdhbWVUeXBlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJZCA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJJZDtcclxuICAgICAgICAgICAgdGhpcy5zaWduID0gdGhpcy5wbGF5ZXJJbmZvLmdhbWVTaWduO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZU5hbWUgPSBcIkxhbmRcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVEaXNjb25uZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9iYnlNYWluU29ja2V0ID0gcmVxdWlyZSgnLi4vTG9iYnkvTG9iYnlOZXRXb3JrJykuc29ja2V0O1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZUZ1bmN0aW9uKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmluaXRDTHViT2JqID0gZnVuY3Rpb24gKGNsdWJPYmopIHtcclxuICAgICAgICAgICAgdGhpcy5jbHViT2JqID0gY2x1Yk9iajtcclxuICAgICAgICAgICAgdGhpcy5jbHViT2JqLmxvZ2luR2FtZVJlc3VsdCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2x1Yl9sb2dpbkdhbWVfRnVuY3Rpb24gPSAoY2x1Yk9iaikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlwID0gTGhqY29uZmlnLlNlcnZlcl9JUDtcclxuICAgICAgICAgICAgdGhpcy5wcm90ID0gJzEzODUxJztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllckluZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lVHlwZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuY2x1Yk9iaiA9IGNsdWJPYmo7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySWQgPSB0aGlzLnBsYXllckluZm8ucGxheWVySWQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2lnbiA9IHRoaXMucGxheWVySW5mby5nYW1lU2lnbjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVOYW1lID0gXCJMYW5kXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lRGlzY29ubmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvYmJ5TWFpblNvY2tldCA9IHJlcXVpcmUoJy4uL0xvYmJ5L0xvYmJ5TmV0V29yaycpLnNvY2tldDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWVGdW5jdGlvbigpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ29sZF9sb2dpbkdhbWVfRnVuY3Rpb24gPSAoZ29sZE9iaikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlwID0gTGhqY29uZmlnLlNlcnZlcl9JUDtcclxuICAgICAgICAgICAgdGhpcy5wcm90ID0gJzEzODUyJztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllckluZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ29sZE9iaiA9IGdvbGRPYmo7XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lVHlwZSA9IDI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySWQgPSB0aGlzLnBsYXllckluZm8ucGxheWVySWQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2lnbiA9IHRoaXMucGxheWVySW5mby5nYW1lU2lnbjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVOYW1lID0gXCJMYW5kXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lRGlzY29ubmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvYmJ5TWFpblNvY2tldCA9IHJlcXVpcmUoJy4uL0xvYmJ5L0xvYmJ5TmV0V29yaycpLnNvY2tldDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWVGdW5jdGlvbigpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOW8gOWni+a4uOaIj1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lRnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpcCA9IHRoaXMuaXA7XHJcbiAgICAgICAgICAgIHZhciBwcm90ID0gdGhpcy5wcm90O1xyXG4gICAgICAgICAgICB2YXIgcGxheWVySWQgPSB0aGlzLnBsYXllcklkO1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuc2lnbjtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc29ja2V0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0ID0gU29ja2V0SU8uY29ubmVjdChpcCArIFwiOlwiICsgcHJvdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzb2NrZXQgPSByZXF1aXJlKFwic29ja2V0LWlvXCIpLCBzZWxmLkxhbmRsb3Jkc1NvY2tldCA9IHNvY2tldChpcCArIFwiOlwiICsgcHJvdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiY29ubmVjdF9lcnJvclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCLov57mjqXlpLHotKVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJjb25uZWN0X3RpbWVvdXRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi6L+e5o6l6LaF5pe2XCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiY29ubmVjdGVkXCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIC8vY2MubG9nKCfov5vlhaXmuLjmiI89PT09PScgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJMb2dpbkdhbWVcIiwgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJpZDogcGxheWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZXR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbjogc2lnblxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwibG9naW5HYW1lUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygn6L+b5YWl5oq85aSn5bCP77yMIOi/lOWbnua4uOaIj+S/oeaBrzonICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5iYWlyZW5uaXVuaXVfc2MgPSByZXQuT2JqO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldC5yZXN1bHRpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5wbGF5ZXJDb2luID0gcmV0Lk9iai5zY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpblNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQuZW1pdChcImdldEdhbWVSYW5raW5nTGlzdFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyAvLyAvL+WQjeWNlVxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImdldEdhbWVSYW5raW5nTGlzdFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmJhaXJlbm5pdW5pdV9nbG9iYWwudXNlckluZm9fbGlzdCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLm5hbWUgIT0gXCJnYW1lX2JhaXJlbm5pdW5pdVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9idXR0b25DdHJsXCIpLmdldENvbXBvbmVudChcIkxvYmJ5QnV0dG9uQ2xpY2tcIikuUWllSHVhblNjZW5lX25vcm1hbChcImdhbWVfYmFpcmVubml1bml1XCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYnJubl9pbnMuc2VyaWFsaXplVXNlcnMocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYnJubl9pbnMuYmV0QmVnaW5fcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gLy/lvZPliY3nirbmgIFcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJnZXRHYW1lVHlwZVJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAvLzHlvIDlp4vkuIvms6ggMuW8gOWlliAz57uT5p2fIDTlj6/ku6XmiqLluoRcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93LmJybm5faW5zLmluaXRfc3RhdChyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcInFpYW5nWmh1YW5nUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiqLluoTnu5PmnpwnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LlJlc3VsdENvZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5icm5uX2lucy5zaG93SGludCgn5bey57uP5oqi5bqEJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vd2luZG93LmJybm5faW5zLnNob3dIaW50KCfmiqLluoTlpLHotKUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcInFpYW5nU3RhcnRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vmiqLluoRcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5icm5uX2lucykge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5icm5uX2lucy5xaWFuZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmJybm5faW5zLmJldF90ZXh0X3FpYW5nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmJybm5faW5zLm1faUdhbWVPdmVyVGltZSA9IERhdGUubm93KCkgLyAxMDAwICsgNTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcInNlbmRaaHVhbmdcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHluoRcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuYnJubl9pbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYnJubl9pbnMuc2V0emh1YW5nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwibG90dGVyeVJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIu+9nu+9nu+9nu+9nu+9nu+9nuS4i+azqOi/lOWbnlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LlJlc3VsdENvZGUgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5SZXN1bHRDb2RlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicm5uX2lucy5vbkJldChyZXN1bHQuYmV0X2RpY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJPcGVuV2luUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuYnJubl9pbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmJybm5faW5zLnNob3dSZXN1bHQocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi772e772e772e772e772e772e5byA54mMXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmV0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiQmV0U3RhcnRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgc3MgPSB7cmVzdWx0OnRydWUsdHlwZToxfTtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuYnJubl9pbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmJybm5faW5zLmJldEJlZ2luKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIu+9nu+9nu+9nu+9nu+9nu+9nuW8gOWxgFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL+iusOW9lVxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImdldEdhbWVSZWNvcmRMaXN0UmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYnJubl9pbnMuaW5pdF9yZWNvcmQocmVzdWx0LmdhbWVfcmVjb3JkX2xpc3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwic2VuZFRhYmxlTXNnUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2pzb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBjanNvbiA9IEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNqc29uID09ICdvYmplY3QnICYmIGNqc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IGNqc29uO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgfTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY2MubG9nKCfogYrlpKk9PT09PScgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy55dXhpYXhpZU1haW4ucmVjZWl2ZVNwQ2hhdChyZXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiQnJva2VuTGluZVJlY292ZXJ5XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55+t57q/6YeN6L+eJyArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMubm9kZS5nZXRDaGlsZEJ5TmFtZSgn5YeG5aSH5oyJ6ZKuJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5ub2RlLmdldENoaWxkQnlOYW1lKCfpgoDor7fkv7HkuZDpg6jmiJDlkZjmjInpkq4nKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLlJlYWR5KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQmV0VHlwZVJlc3VsdDIyMjIyPT09PT09PT09PT09PT09PT09PT09PT09PT3lvIDlp4snLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuSnVTaHUuc3RyaW5nID0gJ+WJqScgKyByZXQucm91bmRfbnVtICsgJ+WxgCc7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2xvYmFsX2xlZnRfcm91bmQgPSByZXQucm91bmRfbnVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldC5pc190YWJsZV90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOS4i+azqOeKtuaAgemcgOimgSDlj6/ku6XkuIvms6ggIFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnN0YXJ0SW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLm1pbmVEYXRhID0gWzAsIDAsIDAsIDAsIDAsIDBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5zdGFydFRvdVpodShyZXQuYmV0X3RpbWUgLSAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6KGl5oqV5rOo5L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZXREYXRhID0gcmV0LmJldF9kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGJldERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiZXREYXRhW2ldLmJldF90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG94ID0gWzAsIC0yNzksIDksIDI5OCwgLTI3OSwgOSwgMjk4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG95ID0gWzAsIDk3LCA5NywgOTcsIC0xMDMsIC0xMDMsIC0xMDMsIC0xMDNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLlhpYVpodShiZXREYXRhW2ldLmJldF9nb2xkLCBwb3hbYmV0RGF0YVtpXS5iZXRfcmVzXSwgcG95W2JldERhdGFbaV0uYmV0X3Jlc10sIGJldERhdGFbaV0uc2VhdElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmV0RGF0YVtpXS5zZWF0SWQgPT0gc2VsZi5MYW5kbG9yZHMuc2VhdElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnRlbXBOZXRXb3JrLm1pbmVEYXRhW2JldERhdGFbaV0uYmV0X3JlcyAtIDFdICs9IGJldERhdGFbaV0uYmV0X2dvbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnJmTWluZURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMudGVtcE5ldFdvcmsudG1wU3Vic2VxdWVudCA9IHJldC5saWFuX2NodWFuX21heDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMudGVtcE5ldFdvcmsuZ2FtZURhdGEgPSByZXQuYmV0X21heF9jaGVjaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMucmZHYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ooaXnjqnlrrbph5HluIFcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHJldC51c2VyX2dvbGRfZGljdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIHNlbGYucGxheWVyTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhc2VsZi5wbGF5ZXJMaXN0W2pdICYmIHNlbGYucGxheWVyTGlzdFtqXS51c2VySWQgPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVyTGlzdFtqXS50YWJsZV9nb2xkID0gcmV0LnVzZXJfZ29sZF9kaWN0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLmluaXRQbGF5ZXIoc2VsZi5wbGF5ZXJMaXN0KTtcclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v6KGl5LiK5LiA5bGA5byA6aqw5a2Q57uT5p6cXHJcbiAgICAgICAgICAgICAgICBpZiAoISFyZXQubGFzdF93aW5fY2FyZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gcmV0Lmxhc3Rfd2luX2NhcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMucmVzdWx0Tm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmQgPSBjYy5pbnN0YW50aWF0ZShzZWxmLkxhbmRsb3Jkcy5TaGFpWmlzW2xpc3RbaV1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuTGFuZGxvcmRzLnNwVHlwZSA9PSAnMScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5kLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2VsZi5MYW5kbG9yZHMuc2hhaUxpc3QxW2xpc3RbaV0gLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLkxhbmRsb3Jkcy5zcFR5cGUgPT0gJzInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNlbGYuTGFuZGxvcmRzLnNoYWlMaXN0MltsaXN0W2ldIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmQuc2NhbGUgPSAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5kLnBvc2l0aW9uID0gaSA9PSAnMCcgPyBjYy52MigtMTQwLCAyMzkpIDogY2MudjIoLTkzLCAyMzkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZXN1bHROb2RlLmFkZENoaWxkKG5kKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuRXhpdF9GdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0xvYmJ5TWFpbicpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYmJ5TWFpbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmhvdXNlSWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlSWQgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5zZWF0SWQgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJIZWFkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJMaXN0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5yb29tQmV0ID0gMTtcclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tYXhMaW50ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVEYXRhID0gW107IC8v5Y2V5bGA5pWw5o2uXHJcbiAgICAgICAgICAgIHRoaXMubWluZURhdGEgPSBbXTsgLy/ljZXlsYDkuKrkurrmlbDmja5cclxuICAgICAgICAgICAgdGhpcy50bXBNb3ZlVG0gPSAwOyAvL+aMqueahOasoeaVsFxyXG4gICAgICAgICAgICB0aGlzLnRtcFN1YnNlcXVlbnQgPSB7fTsgLy/lsYDlhoXkuLLnmoTnu4TlkIhcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBzb2NrZXTplb/ov55cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLkxhbmRsb3Jkc05ldFdvcmsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+ebkeWQrHNvY2tldOS6i+S7ticpO1xyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIC8vc2VsZi5nYW1lRXhpdCB8fCAoc2VsZi5MYW5kbG9yZHMuY29tX01lc3NhZ2VCb3guYWN0aXZlID0gdHJ1ZSwgc2VsZi5MYW5kbG9yZHMuZGlzY29ubmVjdE5ldFdvcmtfRnVuY3Rpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pat5byA6L+e5o6lJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93Lm5lZWRfcmVjb25uZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiMjLph43ov55cIitzZWxmLmlwICsgXCI6XCIgKyBzZWxmLnByb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZi5MYW5kbG9yZHNTb2NrZXQgPSBTb2NrZXRJTy5jb25uZWN0KHNlbGYuaXAgKyBcIjpcIiArIHNlbGYucHJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy93aW5kb3cubmVlZF9yZWNvbm5ldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDmjqXmlLbmiYDmnInnjqnlrrbkv6Hmga9cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiSHVkc2hvd1wiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uaG91c2VMYmwuc3RyaW5nID0gJ+aIv+WPt++8micgKyBzZWxmLmhvdXNlSWQ7XHJcbiAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZXhob3VzZUlkID0gc2VsZi5ob3VzZUlkO1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKCdIdWRzaG93PT09PT09PT09PT09PT09PT09PT09PT09PT0nICsgSlNPTi5zdHJpbmdpZnkocmV0KSArICcgICAgICcgKyBzZWxmLmhvdXNlSWQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiByZXN1bHQuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YVtpXS5zZWF0SWQgPT0gc2VsZi5zZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuZ2FtZUluaXQocmVzdWx0LmRhdGFbaV0udGFibGVJZCwgcmVzdWx0LmRhdGFbaV0uc2VhdElkLCByZXN1bHQuZGF0YVtpXS51c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYubWF4TGludCA9IHJlc3VsdC5iZXRfbWF4O1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJMaXN0ID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5pbml0UGxheWVyKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5o6l5pS2546p5a625YeG5aSH5L+h5oGvXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIlRhYmVsUmVhZHlSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ1RhYmVsUmVhZHlSZXN1bHQ9PT09PT09PT09PT09PT09PT09PT09PT09PScsIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhcmV0LnpodWFuZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflvpflm7rlrprluoRpZO+8micgKyByZXQuemh1YW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISFzZWxmLkxhbmRsb3JkcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc2V0TW90aChyZXQuemh1YW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZXQuaXNfbGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnJlYWR5UGxheWVyKHJldC5kYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5ri45oiP54q25oCBXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIkJldFN0YXJ0UmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHJldCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKCdCZXRTdGFydFJlc3VsdD09PT09PT09PT09PT09PT09PT09PT09PT09JywgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oJ0JldFR5cGVSZXN1bHQnLCAocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQmV0VHlwZVJlc3VsdD09PT09PT09PT09PT09PT09PT09PT09PT095byA5aeLJywgcmV0KTtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0JldFR5cGVSZXN1bHQyMjIyMj09PT09PT09PT09PT09PT09PT09PT09PT095byA5aeLJywgcmV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLkp1U2h1LnN0cmluZyA9IGDliakke3JldC5yb3VuZF9udW195bGAYDtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnN0YXJ0SW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc3RhcnRUb3VaaHUoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxfbGVmdF9yb3VuZCA9IHJldC5yb3VuZF9udW07XHJcbiAgICAgICAgICAgICAgICAvLyBzZWxmLkxhbmRsb3Jkcy5jbG9zZVNldHRsZW1lbnQoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8v5byA5aeL5oqi5bqEXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiU3RhcnRDaG9pY2VCYW5rZXJcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W8gOWni+aKouW6hCcpO1xyXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5MYW5kbG9yZHMuY2xvc2VTZXR0bGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5Nb3RoKCk7XHJcbiAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uYWxsb3dFeGl0R2FtZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8v5oqi5bqE5Zue5omnXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiQ2hvaWNlQmFua2VyUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHJldCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aKouW6hOivt+axguaIkOWKn++8micgKyByZXQucmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL+aKouW6hOe7k+aenFxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIk92ZXJDaG9pY2VCYW5rZXJSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+iwgeaYr+W6hHVzZXJJRO+8micpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmV0KTtcclxuICAgICAgICAgICAgICAgIHJldCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhc2VsZi5MYW5kbG9yZHMpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc2V0TW90aChyZXQucmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL+WbnuWQiOe7k+adnyDlj5Hnu5PmnpxcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJPcGVuV2luUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdPcGVuV2luUmVzdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgLy/mjqfliLbmmL7npLrnrZvlrZBcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnNob3dTYWlaaShyZXN1bHQud2luX3Jlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAvL+aOp+WItuWbnuaUtuetuei1hFxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMucmVmdXNlQ2hvdW1hKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiByZXN1bHQucmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBzZWxmLnBsYXllckxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhc2VsZi5wbGF5ZXJMaXN0W2pdICYmIHNlbGYucGxheWVyTGlzdFtqXS51c2VySWQgPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJMaXN0W2pdLnRhYmxlX2dvbGQgPSByZXN1bHQucmVzdWx0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuaW5pdFBsYXllcihzZWxmLnBsYXllckxpc3QpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMub3BlblNldHRsZW1lbnQocmVzdWx0KTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8v5LiL5rOo5Zue5omnXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiVGFiZWxCZXRSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RhYmVsQmV0UmVzdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZHQgPSByZXN1bHQuZGF0YVswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGFbMF0uYmV0X3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG94ID0gWzAsIC0yNzksIDksIDI5OCwgLTI3OSwgOSwgMjk4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBveSA9IFswLCA5NywgOTcsIDk3LCAtMTAzLCAtMTAzLCAtMTAzLCAtMTAzXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuWGlhWmh1KGR0LmJldF9nb2xkLCBwb3hbZHQuYmV0X3Jlc10sIHBveVtkdC5iZXRfcmVzXSwgZHQuc2VhdElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR0LnNlYXRJZCA9PSBzZWxmLkxhbmRsb3Jkcy5zZWF0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubWluZURhdGFbZHQuYmV0X3JlcyAtIDFdICs9IGR0LmJldF9nb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMucmZNaW5lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/nibnmrorms6hcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50bXBTdWJzZXF1ZW50ID0gcmVzdWx0LmxpYW5fY2h1YW5fbWF4O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FtZURhdGEgPSByZXN1bHQuYmV0X21heF9jaGVjaztcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZkdhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5jb21tb25Cb2FyZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmNvbW1vbkxibC5zdHJpbmcgPSAn5LiL5rOo5aSx6LSlJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8v5oyq5Zue5omnXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiVGFiZWxCZXROdW9SZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RhYmVsQmV0TnVvUmVzdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuYmV0X3R5cGUgPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eJueauiuazqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbWVEYXRhID0gcmVzdWx0LmJldF9tYXhfY2hlY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnJmR2FtZURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLnVzZXJJZCA9PSBzZWxmLkxhbmRsb3Jkcy51c2VyaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudG1wTW92ZVRtLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5jb21tb25Cb2FyZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmNvbW1vbkxibC5zdHJpbmcgPSAn5LiL5rOo5aSx6LSlJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcInBsYXlFbnRlclwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ+WFtuWug+eOqeWutui/m+WFpT09PT09PT09PT09PT0nICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnBsYXllckxpc3RbcmVzdWx0LlJlc3VsdERhdGEuc2VhdElkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuaWNrbmFtZTogcmVzdWx0LlJlc3VsdERhdGEubmlja25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6IHJlc3VsdC5SZXN1bHREYXRhLnNjb3JlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXRJZDogcmVzdWx0LlJlc3VsdERhdGEuc2VhdElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogcmVzdWx0LlJlc3VsdERhdGEudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlSWQ6IHNlbGYuTGFuZGxvcmRzLnRhYmxlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVfZ29sZDogcmVzdWx0LlJlc3VsdERhdGEudGFibGVfZ29sZCxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkaW1ndXJsOiByZXN1bHQuUmVzdWx0RGF0YS5oZWFkaW1ndXJsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5pbml0UGxheWVyKHNlbGYucGxheWVyTGlzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJQbGF5ZXJPdXRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBzZWxmLnBsYXllckxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5wbGF5ZXJMaXN0W2ldLnVzZXJJZCA9PSByZXN1bHQudXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghd2luZG93Lnl1eGlheGllTWFpbi5pc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckxpc3RbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuaW5pdFBsYXllcihzZWxmLnBsYXllckxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiR2FtZU92ZXJSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGVyR2FtZVR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudCA9IHJlcXVpcmUoJ2NsdWJOZXQnKS5nZXRJbnN0YW50O1xyXG4gICAgICAgICAgICAgICAgICAgIG50LmNsdWJTb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmdhbWVfd2luX3JlY29yZCA9IHJldC5kYXRhLmdhbWVfd2luX3JlY29yZDtcclxuICAgICAgICAgICAgICAgIC8vIHNlbGYuRXhpdF9GdW5jdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmNsb3NlU2V0dGxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5vcGVuUmVzdWx0VUkocmV0KTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMDApXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiZ2V0VGFibGVXaW5SZWNvcmRSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5bljoblj7Lnu5PmnpxcIiArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWOhuWPsue7k+aenDIyMjIyXCIgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5vcGVuSGlzdG9yeVVJKHJldCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJnZXRUYWJsZURpY3RSZWNvcmRSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5bmipXms6jkv6Hmga9cIiArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluaKleazqOS/oeaBrzIyMjIyXCIgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5vcGVuRGV0YWlsVUkocmV0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcInJlZ3Jlc3Npb25cIiwgZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgLy8gICAgIHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24odCk7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCLmlq3nur/ph43ov55cIiwgdCk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJDaGVja1VzZXJHbG9kXCIsIGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICB0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50ZXJHYW1lVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5ub0dvbGRCZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0xvYmJ5TWFpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwic3RyYXREaXNiYW5kUmVzdWx0XCIsIHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbih0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6YCA5Ye65ri45oiPXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmV4aXRCb2FyZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmV4aXRCb2FyZC5nZXRDaGlsZEJ5TmFtZSgnb2snKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmV4aXRCb2FyZC5nZXRDaGlsZEJ5TmFtZSgnbm8nKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtTGJsID0geXV4aWF4aWVNYWluLmV4aXRCb2FyZC5nZXRDaGlsZEJ5TmFtZSgndG1MYmwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpdGxlTGJsID0geXV4aWF4aWVNYWluLmV4aXRCb2FyZC5nZXRDaGlsZEJ5TmFtZSgndGl0bGVMYmwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgdGl0bGVMYmwuc3RyaW5nID0gYOeOqeWutiR7dC51c2VyX25hbWV955Sz6K+36Kej5pWj5oi/6Ze0YDtcclxuICAgICAgICAgICAgICAgIGlmICh0LnVzZXIgPT0gc2VsZi5wbGF5ZXJJbmZvLnBsYXllcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmV4aXRCb2FyZC5nZXRDaGlsZEJ5TmFtZSgnb2snKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCdubycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVMaXN0ID0geXV4aWF4aWVNYWluLmV4aXRCb2FyZC5nZXRDaGlsZEJ5TmFtZSgndXNlcl9saXN0JykuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZUxpc3RbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmdldENoaWxkQnlOYW1lKCd1c3JOYW1lJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0LnVzZXJfbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUxpc3RbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0bUxibC5zdHJpbmcgPSAnNjDnp5InO1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4aXRUaW1lclRtcCA9IDYwO1xyXG4gICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBleGl0VGltZXJUbXAtLTtcclxuICAgICAgICAgICAgICAgICAgICB0bUxibC5zdHJpbmcgPSBgJHtleGl0VGltZXJUbXB956eSYFxyXG4gICAgICAgICAgICAgICAgfSwgMSwgNTkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwib3ZlckRpc2JhbmRSZXN1bHRcIiwgZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24odCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaJgOacieS6uuWQjOaEj+mAgOWHuua4uOaIj1wiLCB0KTtcclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGl0Qm9hcmQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkV4aXRfRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImNob2ljZURpc2JhbmRSZXN1bHRcIiwgZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24odCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacieS6uuaKleelqFwiLCB0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0LmlzX3RydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZUxpc3QgPSB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCd1c2VyX2xpc3QnKS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbm9kZUxpc3RbaV0uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5nZXRDaGlsZEJ5TmFtZSgndXNyTmFtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdC51c2VyX25hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGl0Qm9hcmQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZW50ZXJSb29tU2VuZF9mdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+WaHVkc2hvd+a2iOaBrycpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQuZW1pdChcImdldFVlclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVJZDogc2VsZi50YWJsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXRJZDogc2VsZi5zZWF0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVySWQ6IHNlbGYucGxheWVySWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5MYW5kbG9yZHNTb2NrZXQuZW1pdChcImpvaW5UYWJsZXJvb21cIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRhYmxlSWQ6IHNlbGYudGFibGVJZCxcclxuICAgICAgICAgICAgICAgIC8vICAgICBzZWF0SWQ6IHNlbGYuc2VhdElkLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHVzZXJJZDogc2VsZi5wbGF5ZXJJZFxyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u5Zy65pmv5a+56LGhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXRMb2JieU1haW5PYmpfRnVuY3Rpb24gPSBmdW5jdGlvbiAoc2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW4gPSBzY2VuZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNldExhbmRsb3Jkc09ial9GdW5jdGlvbiA9IGZ1bmN0aW9uIChzY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3JkcyA9IHNjZW5lO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiA9IGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbnQ6IG5ldyBnZXRJbnN0YW50KCksXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExhbmROZXRXb3JrOyJdfQ==