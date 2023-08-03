"use strict";
cc._RF.push(module, 'c3eee6T08tJ0bsHLI1rxDKG', 'yadaxiaoNetWork');
// Script/yadaxiao/yadaxiaoNetWork.js

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
        window.yadaxiao_sc = ret.Obj;

        if (ret.resultid) {
          self.playerInfo.playerCoin = ret.Obj.score;
          self.lobbyMainSocket.disconnect(); //self.LandlordsSocket.emit("getGameRankingList","");

          cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("yadaxiao_game");
        }
      }); // //当前状态

      self.LandlordsSocket.on("getGameTypeResult", function (ret) {
        //1开始下注 2开奖 3结束 4可以抢庄
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.yadaxiao_ins.init_stat(result);
      });
      self.LandlordsSocket.on("qiangZhuangResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log('抢庄结果');
        console.log(result);

        if (result.ResultCode == 1) {
          window.yadaxiao_ins.showHint('已经抢庄');
        } else {//window.yadaxiao_ins.showHint('抢庄失败');
        }
      });
      self.LandlordsSocket.on("qiangStart", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log("开始抢庄");
        console.log(result);

        if (window.yadaxiao_ins) {
          window.yadaxiao_ins.qiangNode.active = true;
          window.yadaxiao_ins.bet_text_qiang.active = true;
          window.yadaxiao_ins.m_iGameOverTime = Date.now() / 1000 + 5;
        }
      });
      self.LandlordsSocket.on("sendZhuang", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log("发送庄");
        console.log(result);

        if (window.yadaxiao_ins) {
          window.yadaxiao_ins.setzhuang(result);
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
            yadaxiao_ins.onBet(result.bet_dict);
          } catch (e) {}
        }
      });
      self.LandlordsSocket.on("OpenWinResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        if (window.yadaxiao_ins) window.yadaxiao_ins.showResult(result);
        console.log("～～～～～～开牌");
        console.log(ret);
      });
      self.LandlordsSocket.on("BetStart", function (ret) {
        var result = self.changeResultJSON_Function(ret); //var ss = {result:true,type:1};

        if (window.yadaxiao_ins) window.yadaxiao_ins.betBegin();
        console.log("～～～～～～开局");
        console.log(result);
      }); //记录

      self.LandlordsSocket.on("getGameRecordListResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.yadaxiao_ins.init_record(result.game_record_list);
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
    },
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