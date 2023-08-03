
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/yadaxiao/yadaxiaoNetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx5YWRheGlhb1xceWFkYXhpYW9OZXRXb3JrLmpzIl0sIm5hbWVzIjpbIkxhbmROZXRXb3JrIiwiZ2V0SW5zdGFudCIsIl9pbnN0YW5jZSIsInVuZGVmaW5lZCIsIlNpbmdsZSIsImxvYmJ5TWFpbiIsIkxhbmRsb3JkcyIsIkxhbmRsb3Jkc1NvY2tldCIsInBsYXllckluZm8iLCJob3VzZUlkIiwidGFibGVJZCIsInNlYXRJZCIsInBsYXllckhlYWQiLCJwbGF5ZXJMaXN0Iiwicm9vbUJldCIsIkxhbmRsb3Jkc0RhdGEiLCJtYXhMaW50IiwiZ2FtZURhdGEiLCJtaW5lRGF0YSIsInRtcE1vdmVUbSIsInRtcFN1YnNlcXVlbnQiLCJlbnRlckdhbWVUeXBlIiwiaW5pdCIsInJlcXVpcmUiLCJsb2dpbkdhbWVfRnVuY3Rpb24iLCJpcCIsInByb3QiLCJwbGF5ZXJJZCIsInNpZ24iLCJMaGpjb25maWciLCJTZXJ2ZXJfSVAiLCJnYW1lTmFtZSIsImdhbWVEaXNjb25uZWN0IiwibG9iYnlNYWluU29ja2V0Iiwic29ja2V0Iiwic3RhcnRHYW1lRnVuY3Rpb24iLCJjbHViX2xvZ2luR2FtZV9GdW5jdGlvbjIiLCJnYW1lU2lnbiIsImluaXRDTHViT2JqIiwiY2x1Yk9iaiIsImxvZ2luR2FtZVJlc3VsdCIsImNsdWJfbG9naW5HYW1lX0Z1bmN0aW9uIiwiZ29sZF9sb2dpbkdhbWVfRnVuY3Rpb24iLCJnb2xkT2JqIiwic2VsZiIsImNjIiwic3lzIiwiaXNOYXRpdmUiLCJTb2NrZXRJTyIsImNvbm5lY3QiLCJvbiIsImxvZyIsInJldCIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlcmlkIiwiZ2FtZXR5cGUiLCJjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uIiwid2luZG93IiwieWFkYXhpYW9fc2MiLCJPYmoiLCJyZXN1bHRpZCIsInBsYXllckNvaW4iLCJzY29yZSIsImRpc2Nvbm5lY3QiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiUWllSHVhblNjZW5lX25vcm1hbCIsInJlc3VsdCIsImNvbnNvbGUiLCJ5YWRheGlhb19pbnMiLCJpbml0X3N0YXQiLCJSZXN1bHRDb2RlIiwic2hvd0hpbnQiLCJxaWFuZ05vZGUiLCJhY3RpdmUiLCJiZXRfdGV4dF9xaWFuZyIsIm1faUdhbWVPdmVyVGltZSIsIkRhdGUiLCJub3ciLCJzZXR6aHVhbmciLCJvbkJldCIsImJldF9kaWN0IiwiZSIsInNob3dSZXN1bHQiLCJiZXRCZWdpbiIsImluaXRfcmVjb3JkIiwiZ2FtZV9yZWNvcmRfbGlzdCIsImNqc29uIiwicGFyc2UiLCJ5dXhpYXhpZU1haW4iLCJyZWNlaXZlU3BDaGF0Iiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwiUmVhZHkiLCJKdVNodSIsInN0cmluZyIsInJvdW5kX251bSIsImdsb2JhbF9sZWZ0X3JvdW5kIiwiaXNfdGFibGVfdHlwZSIsInN0YXJ0SW5pdCIsInNjaGVkdWxlT25jZSIsInN0YXJ0VG91Wmh1IiwiYmV0X3RpbWUiLCJiZXREYXRhIiwiYmV0X2RhdGEiLCJpIiwiYmV0X3R5cGUiLCJwb3giLCJwb3kiLCJYaWFaaHUiLCJiZXRfZ29sZCIsImJldF9yZXMiLCJzZWF0SUQiLCJ0ZW1wTmV0V29yayIsInJmTWluZURhdGEiLCJsaWFuX2NodWFuX21heCIsImJldF9tYXhfY2hlY2siLCJyZkdhbWVEYXRhIiwidXNlcl9nb2xkX2RpY3QiLCJqIiwidXNlcklkIiwidGFibGVfZ29sZCIsImluaXRQbGF5ZXIiLCJsYXN0X3dpbl9jYXJkIiwibGlzdCIsInJlc3VsdE5vZGUiLCJyZW1vdmVBbGxDaGlsZHJlbiIsIm5kIiwiaW5zdGFudGlhdGUiLCJTaGFpWmlzIiwic3BUeXBlIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJzaGFpTGlzdDEiLCJzaGFpTGlzdDIiLCJzY2FsZSIsInBvc2l0aW9uIiwidjIiLCJhZGRDaGlsZCIsIkV4aXRfRnVuY3Rpb24iLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsIkxhbmRsb3Jkc05ldFdvcmsiLCJ0IiwibmVlZF9yZWNvbm5ldCIsImhvdXNlTGJsIiwiZXhob3VzZUlkIiwiZGF0YSIsImdhbWVJbml0IiwiYmV0X21heCIsInpodWFuZyIsInNldE1vdGgiLCJpc19saW5lIiwicmVhZHlQbGF5ZXIiLCJNb3RoIiwiYWxsb3dFeGl0R2FtZSIsInNob3dTYWlaaSIsIndpbl9yZXN1bHQiLCJyZWZ1c2VDaG91bWEiLCJvcGVuU2V0dGxlbWVudCIsImR0IiwiY29tbW9uQm9hcmQiLCJwbGF5IiwiY29tbW9uTGJsIiwiUmVzdWx0RGF0YSIsIm5pY2tuYW1lIiwidGFibGVJRCIsImhlYWRpbWd1cmwiLCJpc0dhbWVPdmVyIiwibnQiLCJjbHViU29ja2V0IiwiZ2FtZV93aW5fcmVjb3JkIiwic2V0VGltZW91dCIsImNsb3NlU2V0dGxlbWVudCIsIm9wZW5SZXN1bHRVSSIsIm9wZW5IaXN0b3J5VUkiLCJvcGVuRGV0YWlsVUkiLCJub0dvbGRCZCIsImV4aXRCb2FyZCIsInRtTGJsIiwiTGFiZWwiLCJ0aXRsZUxibCIsInVzZXJfbmFtZSIsInVzZXIiLCJub2RlTGlzdCIsImNoaWxkcmVuIiwiZXhpdFRpbWVyVG1wIiwic2NoZWR1bGUiLCJpc190cnVlIiwiZW50ZXJSb29tU2VuZF9mdW5jIiwiZXJyb3IiLCJzZXRMb2JieU1haW5PYmpfRnVuY3Rpb24iLCJzY2VuZSIsInNldExhbmRsb3Jkc09ial9GdW5jdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxXQUFXLEdBQUksWUFBWTtBQUMzQixXQUFTQyxVQUFULEdBQXNCO0FBQ2xCLFFBQUlDLFNBQUo7O0FBQ0EsUUFBSUEsU0FBUyxLQUFLQyxTQUFsQixFQUE2QjtBQUN6QkQsTUFBQUEsU0FBUyxHQUFHLElBQUlFLE1BQUosRUFBWjtBQUNIOztBQUNELFdBQU9GLFNBQVA7QUFDSDs7QUFFRCxXQUFTRSxNQUFULEdBQWtCO0FBQUE7O0FBQ2QsU0FBS0MsU0FBTCxHQUFpQixJQUFqQjtB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Q0FBcUI4QyxJQUFyQixDQUEwQixRQUExQixFQUFvQztBQUNoQzNDLFVBQUFBLE9BQU8sRUFBRWtDLElBQUksQ0FBQ2xDLE9BRGtCO0FBRWhDQyxVQUFBQSxNQUFNLEVBQUVpQyxJQUFJLENBQUNqQyxNQUZtQjtBQUdoQ2dCLFVBQUFBLFFBQVEsRUFBRWlCLElBQUksQ0FBQ2pCO0FBSGlCLFNBQXBDLEVBRkEsQ0FPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsT0FaRCxDQVlFLE9BQU9xSyxLQUFQLEVBQWMsQ0FBRTs7QUFBQTtBQUNyQixLQWZEO0FBaUJBO0FBQ1I7QUFDQTs7O0FBQ1EsU0FBS0Msd0JBQUwsR0FBZ0MsVUFBVUMsS0FBVixFQUFpQjtBQUM3QyxXQUFLN0wsU0FBTCxHQUFpQjZMLEtBQWpCO0FBQ0gsS0FGRDs7QUFJQSxTQUFLQyx3QkFBTCxHQUFnQyxVQUFVRCxLQUFWLEVBQWlCO0FBQzdDLFdBQUs1TCxTQUFMLEdBQWlCNEwsS0FBakI7QUFDSCxLQUZEOztBQUlBLFNBQUt4SSx5QkFBTCxHQUFpQyxVQUFVTixHQUFWLEVBQWU7QUFDNUMsVUFBSVAsRUFBRSxDQUFDQyxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsZUFBT08sSUFBSSxDQUFDb0MsS0FBTCxDQUFXdEMsR0FBWCxDQUFQO0FBQ0g7O0FBQ0QsYUFBT0EsR0FBUDtBQUNILEtBTEQ7O0FBTUEsU0FBSzlCLElBQUw7QUFDSDs7QUFDRCxTQUFPO0FBQ0hyQixJQUFBQSxVQUFVLEVBQUUsSUFBSUEsVUFBSjtBQURULEdBQVA7QUFHSCxDQWhxQmlCLEVBQWxCOztBQWtxQkFtTSxNQUFNLENBQUNDLE9BQVAsR0FBaUJyTSxXQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9zZ3R0ZXN0XHJcbnZhciBMYW5kTmV0V29yayA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBnZXRJbnN0YW50KCkge1xyXG4gICAgICAgIHZhciBfaW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKF9pbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIF9pbnN0YW5jZSA9IG5ldyBTaW5nbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBTaW5nbGUoKSB7XHJcbiAgICAgICAgdGhpcy5sb2JieU1haW4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGFuZGxvcmRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gbnVsbDtcclxuICAgICAgICB0aGlzLmhvdXNlSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFibGVJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuc2VhdElkID0gLTE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBsYXllckxpc3QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucm9vbUJldCA9IDE7XHJcbiAgICAgICAgdGhpcy5MYW5kbG9yZHNEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1heExpbnQgPSBbMCwgMCwgMF07IC8v5Y2V5Y6LIOS4siAg6LG55a2QXHJcbiAgICAgICAgdGhpcy5nYW1lRGF0YSA9IFtdOyAvL+WNleWxgOaVsOaNrlxyXG4gICAgICAgIHRoaXMubWluZURhdGEgPSBbXTsgLy/ljZXlsYDkuKrkurrmlbDmja5cclxuICAgICAgICB0aGlzLnRtcE1vdmVUbSA9IDA7IC8v5oyq55qE5qyh5pWwXHJcbiAgICAgICAgdGhpcy50bXBTdWJzZXF1ZW50ID0ge307IC8v5bGA5YaF5Liy55qE57uE5ZCIXHJcbiAgICAgICAgdGhpcy5lbnRlckdhbWVUeXBlID0gMDsgLy8g5q2j5bi45oi/5Y2h5Zy6IDAgICDkv7HkuZDpg6jmiL/ljaHlnLoxXHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmiL/ljaHlnLrov5vlhaXmuLjmiI9cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxvZ2luR2FtZV9GdW5jdGlvbiA9IChpcCwgcHJvdCwgcGxheWVySWQsIHNpZ24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pcCA9IExoamNvbmZpZy5TZXJ2ZXJfSVA7XHJcbiAgICAgICAgICAgIHRoaXMucHJvdCA9IHByb3Q7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySWQgPSBwbGF5ZXJJZDtcclxuICAgICAgICAgICAgdGhpcy5zaWduID0gc2lnbjtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllckluZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lVHlwZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lTmFtZSA9IFwibG90dGVyeVwiO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW5Tb2NrZXQgPSByZXF1aXJlKCcuLi9Mb2JieS9Mb2JieU5ldFdvcmsnKS5zb2NrZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lRnVuY3Rpb24oKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jbHViX2xvZ2luR2FtZV9GdW5jdGlvbjIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXAgPSBMaGpjb25maWcuU2VydmVyX0lQO1xyXG4gICAgICAgICAgICB0aGlzLnByb3QgPSAnMTM4NTEnO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGxheWVySW5mbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbnRlckdhbWVUeXBlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJZCA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJJZDtcclxuICAgICAgICAgICAgdGhpcy5zaWduID0gdGhpcy5wbGF5ZXJJbmZvLmdhbWVTaWduO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZU5hbWUgPSBcIkxhbmRcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVEaXNjb25uZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9iYnlNYWluU29ja2V0ID0gcmVxdWlyZSgnLi4vTG9iYnkvTG9iYnlOZXRXb3JrJykuc29ja2V0O1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZUZ1bmN0aW9uKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmluaXRDTHViT2JqID0gZnVuY3Rpb24oY2x1Yk9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2x1Yk9iaiA9IGNsdWJPYmo7XHJcbiAgICAgICAgICAgIHRoaXMuY2x1Yk9iai5sb2dpbkdhbWVSZXN1bHQoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNsdWJfbG9naW5HYW1lX0Z1bmN0aW9uID0gKGNsdWJPYmopID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pcCA9IExoamNvbmZpZy5TZXJ2ZXJfSVA7XHJcbiAgICAgICAgICAgIHRoaXMucHJvdCA9ICcxMzg1MSc7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVudGVyR2FtZVR5cGUgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmNsdWJPYmogPSBjbHViT2JqO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcklkID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkO1xyXG4gICAgICAgICAgICB0aGlzLnNpZ24gPSB0aGlzLnBsYXllckluZm8uZ2FtZVNpZ247XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lTmFtZSA9IFwiTGFuZFwiO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW5Tb2NrZXQgPSByZXF1aXJlKCcuLi9Mb2JieS9Mb2JieU5ldFdvcmsnKS5zb2NrZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lRnVuY3Rpb24oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdvbGRfbG9naW5HYW1lX0Z1bmN0aW9uID0gKGdvbGRPYmopID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pcCA9IExoamNvbmZpZy5TZXJ2ZXJfSVA7XHJcbiAgICAgICAgICAgIHRoaXMucHJvdCA9ICcxMzg1Mic7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdvbGRPYmogPSBnb2xkT2JqO1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyR2FtZVR5cGUgPSAyO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcklkID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkO1xyXG4gICAgICAgICAgICB0aGlzLnNpZ24gPSB0aGlzLnBsYXllckluZm8uZ2FtZVNpZ247XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lTmFtZSA9IFwiTGFuZFwiO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW5Tb2NrZXQgPSByZXF1aXJlKCcuLi9Mb2JieS9Mb2JieU5ldFdvcmsnKS5zb2NrZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lRnVuY3Rpb24oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlvIDlp4vmuLjmiI9cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnN0YXJ0R2FtZUZ1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaXAgPSB0aGlzLmlwO1xyXG4gICAgICAgICAgICB2YXIgcHJvdCA9IHRoaXMucHJvdDtcclxuICAgICAgICAgICAgdmFyIHBsYXllcklkID0gdGhpcy5wbGF5ZXJJZDtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLnNpZ247XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNvY2tldCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldCA9IFNvY2tldElPLmNvbm5lY3QoaXAgKyBcIjpcIiArIHByb3QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc29ja2V0ID0gcmVxdWlyZShcInNvY2tldC1pb1wiKSwgc2VsZi5MYW5kbG9yZHNTb2NrZXQgPSBzb2NrZXQoaXAgKyBcIjpcIiArIHByb3QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImNvbm5lY3RfZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi6L+e5o6l5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiY29ubmVjdF90aW1lb3V0XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIui/nuaOpei2heaXtlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImNvbm5lY3RlZFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAvL2NjLmxvZygn6L+b5YWl5ri45oiPPT09PT0nICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiTG9naW5HYW1lXCIsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWV0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNpZ246IHNpZ25cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImxvZ2luR2FtZVJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ+i/m+WFpeaKvOWkp+Wwj++8jCDov5Tlm57muLjmiI/kv6Hmga86JyArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cueWFkYXhpYW9fc2MgPSByZXQuT2JqO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldC5yZXN1bHRpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5wbGF5ZXJDb2luID0gcmV0Lk9iai5zY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpblNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiZ2V0R2FtZVJhbmtpbmdMaXN0XCIsXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9idXR0b25DdHJsXCIpLmdldENvbXBvbmVudChcIkxvYmJ5QnV0dG9uQ2xpY2tcIikuUWllSHVhblNjZW5lX25vcm1hbChcInlhZGF4aWFvX2dhbWVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gLy/lvZPliY3nirbmgIFcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJnZXRHYW1lVHlwZVJlc3VsdFwiLCBmdW5jdGlvbihyZXQpIHtcclxuICAgICAgICAgICAgICAgIC8vMeW8gOWni+S4i+azqCAy5byA5aWWIDPnu5PmnZ8gNOWPr+S7peaKouW6hFxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cueWFkYXhpYW9faW5zLmluaXRfc3RhdChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJxaWFuZ1podWFuZ1Jlc3VsdFwiLCBmdW5jdGlvbihyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiqLluoTnu5PmnpwnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LlJlc3VsdENvZGUgPT0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cueWFkYXhpYW9faW5zLnNob3dIaW50KCflt7Lnu4/miqLluoQnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vd2luZG93LnlhZGF4aWFvX2lucy5zaG93SGludCgn5oqi5bqE5aSx6LSlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJxaWFuZ1N0YXJ0XCIsIGZ1bmN0aW9uKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vmiqLluoRcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy55YWRheGlhb19pbnMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy55YWRheGlhb19pbnMucWlhbmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy55YWRheGlhb19pbnMuYmV0X3RleHRfcWlhbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cueWFkYXhpYW9faW5zLm1faUdhbWVPdmVyVGltZSA9IERhdGUubm93KCkvMTAwMCs1O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwic2VuZFpodWFuZ1wiLCBmdW5jdGlvbihyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB5bqEXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LnlhZGF4aWFvX2lucyl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnlhZGF4aWFvX2lucy5zZXR6aHVhbmcocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwibG90dGVyeVJlc3VsdFwiLCBmdW5jdGlvbihyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi772e772e772e772e772e772e5LiL5rOo6L+U5ZueXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuUmVzdWx0Q29kZSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAocmVzdWx0LlJlc3VsdENvZGUgPT0gMilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICAgICAgeWFkYXhpYW9faW5zLm9uQmV0KHJlc3VsdC5iZXRfZGljdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIk9wZW5XaW5SZXN1bHRcIiwgZnVuY3Rpb24ocmV0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LnlhZGF4aWFvX2lucylcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cueWFkYXhpYW9faW5zLnNob3dSZXN1bHQocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi772e772e772e772e772e772e5byA54mMXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmV0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiQmV0U3RhcnRcIiwgZnVuY3Rpb24ocmV0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBzcyA9IHtyZXN1bHQ6dHJ1ZSx0eXBlOjF9O1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy55YWRheGlhb19pbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnlhZGF4aWFvX2lucy5iZXRCZWdpbigpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLvvZ7vvZ7vvZ7vvZ7vvZ7vvZ7lvIDlsYBcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy/orrDlvZVcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJnZXRHYW1lUmVjb3JkTGlzdFJlc3VsdFwiLCBmdW5jdGlvbihyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cueWFkYXhpYW9faW5zLmluaXRfcmVjb3JkKHJlc3VsdC5nYW1lX3JlY29yZF9saXN0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcInNlbmRUYWJsZU1zZ1Jlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNqc29uID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2pzb24gPSBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjanNvbiA9PSAnb2JqZWN0JyAmJiBjanNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBjanNvbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY2MubG9nKCfogYrlpKk9PT09PScgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy55dXhpYXhpZU1haW4ucmVjZWl2ZVNwQ2hhdChyZXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiQnJva2VuTGluZVJlY292ZXJ5XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55+t57q/6YeN6L+eJyArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMubm9kZS5nZXRDaGlsZEJ5TmFtZSgn5YeG5aSH5oyJ6ZKuJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5ub2RlLmdldENoaWxkQnlOYW1lKCfpgoDor7fkv7HkuZDpg6jmiJDlkZjmjInpkq4nKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLlJlYWR5KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBKU09OLnBhcnNlKHJldCk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQmV0VHlwZVJlc3VsdDIyMjIyPT09PT09PT09PT09PT09PT09PT09PT09PT3lvIDlp4snLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuSnVTaHUuc3RyaW5nID0gJ+WJqScrcmV0LnJvdW5kX251bSsn5bGAJztcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxfbGVmdF9yb3VuZCA9IHJldC5yb3VuZF9udW07XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0LmlzX3RhYmxlX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5LiL5rOo54q25oCB6ZyA6KaBIOWPr+S7peS4i+azqCAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc3RhcnRJbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMubWluZURhdGEgPSBbMCwgMCwgMCwgMCwgMCwgMF07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLnN0YXJ0VG91Wmh1KHJldC5iZXRfdGltZSAtIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ooaXmipXms6jkv6Hmga9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJldERhdGEgPSByZXQuYmV0X2RhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gYmV0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJldERhdGFbaV0uYmV0X3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3ggPSBbMCwgLTI3OSwgOSwgMjk4LCAtMjc5LCA5LCAyOThdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3kgPSBbMCwgOTcsIDk3LCA5NywgLTEwMywgLTEwMywgLTEwMywgLTEwM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuWGlhWmh1KGJldERhdGFbaV0uYmV0X2dvbGQsIHBveFtiZXREYXRhW2ldLmJldF9yZXNdLCBwb3lbYmV0RGF0YVtpXS5iZXRfcmVzXSwgYmV0RGF0YVtpXS5zZWF0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiZXREYXRhW2ldLnNlYXRJZCA9PSBzZWxmLkxhbmRsb3Jkcy5zZWF0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMudGVtcE5ldFdvcmsubWluZURhdGFbYmV0RGF0YVtpXS5iZXRfcmVzIC0gMV0gKz0gYmV0RGF0YVtpXS5iZXRfZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMucmZNaW5lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy50ZW1wTmV0V29yay50bXBTdWJzZXF1ZW50ID0gcmV0LmxpYW5fY2h1YW5fbWF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy50ZW1wTmV0V29yay5nYW1lRGF0YSA9IHJldC5iZXRfbWF4X2NoZWNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZkdhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL+ihpeeOqeWutumHkeW4gVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gcmV0LnVzZXJfZ29sZF9kaWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gc2VsZi5wbGF5ZXJMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFzZWxmLnBsYXllckxpc3Rbal0gJiYgc2VsZi5wbGF5ZXJMaXN0W2pdLnVzZXJJZCA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJMaXN0W2pdLnRhYmxlX2dvbGQgPSByZXQudXNlcl9nb2xkX2RpY3RbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuaW5pdFBsYXllcihzZWxmLnBsYXllckxpc3QpO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/ooaXkuIrkuIDlsYDlvIDpqrDlrZDnu5PmnpxcclxuICAgICAgICAgICAgICAgIGlmICghIXJldC5sYXN0X3dpbl9jYXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSByZXQubGFzdF93aW5fY2FyZDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZXN1bHROb2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZCA9IGNjLmluc3RhbnRpYXRlKHNlbGYuTGFuZGxvcmRzLlNoYWlaaXNbbGlzdFtpXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5MYW5kbG9yZHMuc3BUeXBlID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLkxhbmRsb3Jkcy5zaGFpTGlzdDFbbGlzdFtpXSAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuTGFuZGxvcmRzLnNwVHlwZSA9PSAnMicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5kLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2VsZi5MYW5kbG9yZHMuc2hhaUxpc3QyW2xpc3RbaV0gLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZC5zY2FsZSA9IDAuMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmQucG9zaXRpb24gPSBpID09ICcwJyA/IGNjLnYyKC0xNDAsIDIzOSkgOiBjYy52MigtOTMsIDIzOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnJlc3VsdE5vZGUuYWRkQ2hpbGQobmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5FeGl0X0Z1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdMb2JieU1haW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9iYnlNYWluID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG91c2VJZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlSWQgPSAtMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdElkID0gLTE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllckhlYWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJMaXN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9vbUJldCA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXhMaW50ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lRGF0YSA9IFtdOyAvL+WNleWxgOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgdGhpcy5taW5lRGF0YSA9IFtdOyAvL+WNleWxgOS4quS6uuaVsOaNrlxyXG4gICAgICAgICAgICAgICAgdGhpcy50bXBNb3ZlVG0gPSAwOyAvL+aMqueahOasoeaVsFxyXG4gICAgICAgICAgICAgICAgdGhpcy50bXBTdWJzZXF1ZW50ID0ge307IC8v5bGA5YaF5Liy55qE57uE5ZCIXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNvY2tldOmVv+i/nlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuTGFuZGxvcmRzTmV0V29yayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55uR5ZCsc29ja2V05LqL5Lu2Jyk7XHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgLy9zZWxmLmdhbWVFeGl0IHx8IChzZWxmLkxhbmRsb3Jkcy5jb21fTWVzc2FnZUJveC5hY3RpdmUgPSB0cnVlLCBzZWxmLkxhbmRsb3Jkcy5kaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmlq3lvIDov57mjqUnKTtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubmVlZF9yZWNvbm5ldClcclxuICAgICAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIyMumHjei/nlwiK3NlbGYuaXAgKyBcIjpcIiArIHNlbGYucHJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLkxhbmRsb3Jkc1NvY2tldCA9IFNvY2tldElPLmNvbm5lY3Qoc2VsZi5pcCArIFwiOlwiICsgc2VsZi5wcm90KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3dpbmRvdy5uZWVkX3JlY29ubmV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOaOpeaUtuaJgOacieeOqeWutuS/oeaBr1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJIdWRzaG93XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5ob3VzZUxibC5zdHJpbmcgPSAn5oi/5Y+377yaJyArIHNlbGYuaG91c2VJZDtcclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGhvdXNlSWQgPSBzZWxmLmhvdXNlSWQ7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ0h1ZHNob3c9PT09PT09PT09PT09PT09PT09PT09PT09PScgKyBKU09OLnN0cmluZ2lmeShyZXQpICsgJyAgICAgJyArIHNlbGYuaG91c2VJZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhW2ldLnNlYXRJZCA9PSBzZWxmLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5nYW1lSW5pdChyZXN1bHQuZGF0YVtpXS50YWJsZUlkLCByZXN1bHQuZGF0YVtpXS5zZWF0SWQsIHJlc3VsdC5kYXRhW2ldLnVzZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5tYXhMaW50ID0gcmVzdWx0LmJldF9tYXg7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnBsYXllckxpc3QgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLmluaXRQbGF5ZXIocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDmjqXmlLbnjqnlrrblh4blpIfkv6Hmga9cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiVGFiZWxSZWFkeVJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygnVGFiZWxSZWFkeVJlc3VsdD09PT09PT09PT09PT09PT09PT09PT09PT09JywgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFyZXQuemh1YW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+W+l+WbuuWumuW6hGlk77yaJyArIHJldC56aHVhbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIXNlbGYuTGFuZGxvcmRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5zZXRNb3RoKHJldC56aHVhbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJldC5pc19saW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMucmVhZHlQbGF5ZXIocmV0LmRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDmuLjmiI/nirbmgIFcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiQmV0U3RhcnRSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ0JldFN0YXJ0UmVzdWx0PT09PT09PT09PT09PT09PT09PT09PT09PT0nLCBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbignQmV0VHlwZVJlc3VsdCcsIChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCZXRUeXBlUmVzdWx0PT09PT09PT09PT09PT09PT09PT09PT09PT3lvIDlp4snLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBKU09OLnBhcnNlKHJldCk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQmV0VHlwZVJlc3VsdDIyMjIyPT09PT09PT09PT09PT09PT09PT09PT09PT3lvIDlp4snLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuSnVTaHUuc3RyaW5nID0gYOWJqSR7cmV0LnJvdW5kX251bX3lsYBgO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc3RhcnRJbml0KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5zdGFydFRvdVpodSgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lmdsb2JhbF9sZWZ0X3JvdW5kID0gcmV0LnJvdW5kX251bTtcclxuICAgICAgICAgICAgICAgIC8vIHNlbGYuTGFuZGxvcmRzLmNsb3NlU2V0dGxlbWVudCgpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy/lvIDlp4vmiqLluoRcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJTdGFydENob2ljZUJhbmtlclwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5byA5aeL5oqi5bqEJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBzZWxmLkxhbmRsb3Jkcy5jbG9zZVNldHRsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLk1vdGgoKTtcclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5hbGxvd0V4aXRHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy/miqLluoTlm57miadcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJDaG9pY2VCYW5rZXJSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5oqi5bqE6K+35rGC5oiQ5Yqf77yaJyArIHJldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8v5oqi5bqE57uT5p6cXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiT3ZlckNob2ljZUJhbmtlclJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6LCB5piv5bqEdXNlcklE77yaJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXQpO1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzZWxmLkxhbmRsb3JkcylcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5zZXRNb3RoKHJldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8v5Zue5ZCI57uT5p2fIOWPkee7k+aenFxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIk9wZW5XaW5SZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ09wZW5XaW5SZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICAvL+aOp+WItuaYvuekuuetm+WtkFxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc2hvd1NhaVppKHJlc3VsdC53aW5fcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIC8v5o6n5Yi25Zue5pS256256LWEXHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZWZ1c2VDaG91bWEodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHJlc3VsdC5yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIHNlbGYucGxheWVyTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFzZWxmLnBsYXllckxpc3Rbal0gJiYgc2VsZi5wbGF5ZXJMaXN0W2pdLnVzZXJJZCA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckxpc3Rbal0udGFibGVfZ29sZCA9IHJlc3VsdC5yZXN1bHRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5pbml0UGxheWVyKHNlbGYucGxheWVyTGlzdCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5vcGVuU2V0dGxlbWVudChyZXN1bHQpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy/kuIvms6jlm57miadcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJUYWJlbEJldFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGFiZWxCZXRSZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdCA9IHJlc3VsdC5kYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YVswXS5iZXRfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3ggPSBbMCwgLTI3OSwgOSwgMjk4LCAtMjc5LCA5LCAyOThdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG95ID0gWzAsIDk3LCA5NywgOTcsIC0xMDMsIC0xMDMsIC0xMDMsIC0xMDNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5YaWFaaHUoZHQuYmV0X2dvbGQsIHBveFtkdC5iZXRfcmVzXSwgcG95W2R0LmJldF9yZXNdLCBkdC5zZWF0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHQuc2VhdElkID09IHNlbGYuTGFuZGxvcmRzLnNlYXRJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5taW5lRGF0YVtkdC5iZXRfcmVzIC0gMV0gKz0gZHQuYmV0X2dvbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZk1pbmVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eJueauiuazqFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRtcFN1YnNlcXVlbnQgPSByZXN1bHQubGlhbl9jaHVhbl9tYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nYW1lRGF0YSA9IHJlc3VsdC5iZXRfbWF4X2NoZWNrO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnJmR2FtZURhdGEoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmNvbW1vbkJvYXJkLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uY29tbW9uTGJsLnN0cmluZyA9ICfkuIvms6jlpLHotKUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy/mjKrlm57miadcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJUYWJlbEJldE51b1Jlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGFiZWxCZXROdW9SZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5iZXRfdHlwZSA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v54m55q6K5rOoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FtZURhdGEgPSByZXN1bHQuYmV0X21heF9jaGVjaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMucmZHYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEudXNlcklkID09IHNlbGYuTGFuZGxvcmRzLnVzZXJpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50bXBNb3ZlVG0tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmNvbW1vbkJvYXJkLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uY29tbW9uTGJsLnN0cmluZyA9ICfkuIvms6jlpLHotKUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwicGxheUVudGVyXCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygn5YW25a6D546p5a626L+b5YWlPT09PT09PT09PT09PScgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIHNlbGYucGxheWVyTGlzdFtyZXN1bHQuUmVzdWx0RGF0YS5zZWF0SWRdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lOiByZXN1bHQuUmVzdWx0RGF0YS5uaWNrbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBzY29yZTogcmVzdWx0LlJlc3VsdERhdGEuc2NvcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhdElkOiByZXN1bHQuUmVzdWx0RGF0YS5zZWF0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiByZXN1bHQuUmVzdWx0RGF0YS51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVJZDogc2VsZi5MYW5kbG9yZHMudGFibGVJRCxcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZV9nb2xkOiByZXN1bHQuUmVzdWx0RGF0YS50YWJsZV9nb2xkLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRpbWd1cmw6IHJlc3VsdC5SZXN1bHREYXRhLmhlYWRpbWd1cmxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLmluaXRQbGF5ZXIoc2VsZi5wbGF5ZXJMaXN0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIlBsYXllck91dFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHNlbGYucGxheWVyTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnBsYXllckxpc3RbaV0udXNlcklkID09IHJlc3VsdC51c2VySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cueXV4aWF4aWVNYWluLmlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVyTGlzdFtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5pbml0UGxheWVyKHNlbGYucGxheWVyTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJHYW1lT3ZlclJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50ZXJHYW1lVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG50ID0gcmVxdWlyZSgnY2x1Yk5ldCcpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbnQuY2x1YlNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZ2FtZV93aW5fcmVjb3JkID0gcmV0LmRhdGEuZ2FtZV93aW5fcmVjb3JkO1xyXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5FeGl0X0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uY2xvc2VTZXR0bGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLm9wZW5SZXN1bHRVSShyZXQpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwMClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJnZXRUYWJsZVdpblJlY29yZFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWOhuWPsue7k+aenFwiICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWOhuWPsue7k+aenDIyMjIyXCIgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5vcGVuSGlzdG9yeVVJKHJldCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJnZXRUYWJsZURpY3RSZWNvcmRSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5bmipXms6jkv6Hmga9cIiArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5bmipXms6jkv6Hmga8yMjIyMlwiICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4ub3BlbkRldGFpbFVJKHJldCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJyZWdyZXNzaW9uXCIsIGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHQpO1xyXG4gICAgICAgICAgICAvLyAgICAgY2MubG9nKFwi5pat57q/6YeN6L+eXCIsIHQpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiQ2hlY2tVc2VyR2xvZFwiLCBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbih0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGVyR2FtZVR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4ubm9Hb2xkQmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdMb2JieU1haW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcInN0cmF0RGlzYmFuZFJlc3VsdFwiLCB0ID0+IHtcclxuICAgICAgICAgICAgICAgIHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24odCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIumAgOWHuua4uOaIj1wiLCB0KTtcclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGl0Qm9hcmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGl0Qm9hcmQuZ2V0Q2hpbGRCeU5hbWUoJ29rJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGl0Qm9hcmQuZ2V0Q2hpbGRCeU5hbWUoJ25vJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCB0bUxibCA9IHl1eGlheGllTWFpbi5leGl0Qm9hcmQuZ2V0Q2hpbGRCeU5hbWUoJ3RtTGJsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGxldCB0aXRsZUxibCA9IHl1eGlheGllTWFpbi5leGl0Qm9hcmQuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTGJsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgIHRpdGxlTGJsLnN0cmluZyA9IGDnjqnlrrYke3QudXNlcl9uYW1lfeeUs+ivt+ino+aVo+aIv+mXtGA7XHJcbiAgICAgICAgICAgICAgICBpZiAodC51c2VyID09IHNlbGYucGxheWVySW5mby5wbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGl0Qm9hcmQuZ2V0Q2hpbGRCeU5hbWUoJ29rJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmV4aXRCb2FyZC5nZXRDaGlsZEJ5TmFtZSgnbm8nKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlTGlzdCA9IHl1eGlheGllTWFpbi5leGl0Qm9hcmQuZ2V0Q2hpbGRCeU5hbWUoJ3VzZXJfbGlzdCcpLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5nZXRDaGlsZEJ5TmFtZSgndXNyTmFtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdC51c2VyX25hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG1MYmwuc3RyaW5nID0gJzYw56eSJztcclxuICAgICAgICAgICAgICAgIGxldCBleGl0VGltZXJUbXAgPSA2MDtcclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhpdFRpbWVyVG1wLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdG1MYmwuc3RyaW5nID0gYCR7ZXhpdFRpbWVyVG1wfeenkmBcclxuICAgICAgICAgICAgICAgIH0sIDEsIDU5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIm92ZXJEaXNiYW5kUmVzdWx0XCIsIGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICB0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiYDmnInkurrlkIzmhI/pgIDlh7rmuLjmiI9cIiwgdCk7XHJcbiAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5FeGl0X0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJjaG9pY2VEaXNiYW5kUmVzdWx0XCIsIGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICB0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnInkurrmipXnpahcIiwgdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodC5pc190cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGVMaXN0ID0geXV4aWF4aWVNYWluLmV4aXRCb2FyZC5nZXRDaGlsZEJ5TmFtZSgndXNlcl9saXN0JykuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5vZGVMaXN0W2ldLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUxpc3RbaV0uZ2V0Q2hpbGRCeU5hbWUoJ3Vzck5hbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHQudXNlcl9uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUxpc3RbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmVudGVyUm9vbVNlbmRfZnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlmh1ZHNob3fmtojmga8nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJnZXRVZXJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlSWQ6IHNlbGYudGFibGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBzZWF0SWQ6IHNlbGYuc2VhdElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllcklkOiBzZWxmLnBsYXllcklkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHNlbGYuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJqb2luVGFibGVyb29tXCIsIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0YWJsZUlkOiBzZWxmLnRhYmxlSWQsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc2VhdElkOiBzZWxmLnNlYXRJZCxcclxuICAgICAgICAgICAgICAgIC8vICAgICB1c2VySWQ6IHNlbGYucGxheWVySWRcclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge307XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u5Zy65pmv5a+56LGhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXRMb2JieU1haW5PYmpfRnVuY3Rpb24gPSBmdW5jdGlvbiAoc2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW4gPSBzY2VuZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNldExhbmRsb3Jkc09ial9GdW5jdGlvbiA9IGZ1bmN0aW9uIChzY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3JkcyA9IHNjZW5lO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiA9IGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbnQ6IG5ldyBnZXRJbnN0YW50KCksXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExhbmROZXRXb3JrOyJdfQ==