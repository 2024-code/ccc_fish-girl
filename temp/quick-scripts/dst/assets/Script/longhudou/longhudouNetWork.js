
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/longhudou/longhudouNetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ff821DLMZBTLNqHfDEk5Xq', 'longhudouNetWork');
// Script/longhudou/longhudouNetWork.js

"use strict";

var NETPATH = 'http://60.205.191.87'; //const NETPATH = 'http://192.168.18.7';
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
        cc.log('进入龙虎斗， 返回游戏信息:' + JSON.stringify(ret));
        ret = self.changeResultJSON_Function(ret);
        window.lhd_sc = ret.Obj;

        if (ret.resultid) {
          self.playerInfo.playerCoin = ret.Obj.score; //self.roomBet = ret.Obj.bet;
          //self.lobbyMain.enterRoom = undefined;

          self.lobbyMainSocket.disconnect(); //cc.director.loadScene("lhd_game");

          self.LandlordsSocket.emit("getGameRankingList", "");
        } // if (ret.resultid && self.enterGameType == 1) {
        //     //self.clubObj.loginGameResult();
        // } else if (ret.resultid && self.enterGameType == 2) {
        //     self.goldObj.loginGameResult();
        // }

      }); // //名单

      self.LandlordsSocket.on("getGameRankingListResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.lhd_global.userInfo_list = result;

        if (cc.director.getScene().name != "lhd_game") {
          cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("lhd_game");
        } else {
          window.longhudou_ins.serializeUsers(result);
          window.longhudou_ins.betBegin_r();
        }
      }); // //当前状态

      self.LandlordsSocket.on("getGameTypeResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.longhudou_ins.init_stat(result);
      });
      self.LandlordsSocket.on("lotteryResult", function (ret) {
        var result = self.changeResultJSON_Function(ret); // console.log(result)
        // console.log(result.bet_dict);
        // console.log("～～～～～～下注返回");

        if (result.ResultCode == -1) {
          return;
        } else if (result.ResultCode == 2) {
          longhudou_ins.onBet(result.bet_dict);
        }
      });
      self.LandlordsSocket.on("OpenWinResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(ret);
        if (window.longhudou_ins) window.longhudou_ins.showResult(result);
        console.log("～～～～～～开牌");
      });
      self.LandlordsSocket.on("BetStart", function (ret) {
        var result = self.changeResultJSON_Function(ret); //var ss = {result:true,type:1};

        if (window.longhudou_ins) window.longhudou_ins.betBegin(); //console.log("～～～～～～开局");
      }); //记录

      self.LandlordsSocket.on("getGameRecordListResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.longhudou_ins.init_record(result.game_record_list);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxsb25naHVkb3VcXGxvbmdodWRvdU5ldFdvcmsuanMiXSwibmFtZXMiOlsiTkVUUEFUSCIsIkxhbmROZXRXb3JrIiwiZ2V0SW5zdGFudCIsIl9pbnN0YW5jZSIsInVuZGVmaW5lZCIsIlNpbmdsZSIsImxvYmJ5TWFpbiIsIkxhbmRsb3JkcyIsIkxhbmRsb3Jkc1NvY2tldCIsInBsYXllckluZm8iLCJob3VzZUlkIiwidGFibGVJZCIsInNlYXRJZCIsInBsYXllckhlYWQiLCJwbGF5ZXJMaXN0Iiwicm9vbUJldCIsIkxhbmRsb3Jkc0RhdGEiLCJtYXhMaW50IiwiZ2FtZURhdGEiLCJtaW5lRGF0YSIsInRtcE1vdmVUbSIsInRtcFN1YnNlcXVlbnQiLCJlbnRlckdhbWVUeXBlIiwiaW5pdCIsInJlcXVpcmUiLCJsb2dpbkdhbWVfRnVuY3Rpb24iLCJpcCIsInByb3QiLCJwbGF5ZXJJZCIsInNpZ24iLCJMaGpjb25maWciLCJTZXJ2ZXJfSVAiLCJnYW1lTmFtZSIsImdhbWVEaXNjb25uZWN0IiwibG9iYnlNYWluU29ja2V0Iiwic29ja2V0Iiwic3RhcnRHYW1lRnVuY3Rpb24iLCJjbHViX2xvZ2luR2FtZV9GdW5jdGlvbjIiLCJnYW1lU2lnbiIsImluaXRDTHViT2JqIiwiY2x1Yk9iaiIsImxvZ2luR2FtZVJlc3VsdCIsImNsdWJfbG9naW5HYW1lX0Z1bmN0aW9uIiwiZ29sZF9sb2dpbkdhbWVfRnVuY3Rpb24iLCJnb2xkT2JqIiwic2VsZiIsImNjIiwic3lzIiwiaXNOYXRpdmUiLCJTb2NrZXRJTyIsImNvbm5lY3QiLCJvbiIsImxvZyIsInJldCIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlcmlkIiwiZ2FtZXR5cGUiLCJjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uIiwid2luZG93IiwibGhkX3NjIiwiT2JqIiwicmVzdWx0aWQiLCJwbGF5ZXJDb2luIiwic2NvcmUiLCJkaXNjb25uZWN0IiwicmVzdWx0IiwiY29uc29sZSIsImxoZF9nbG9iYWwiLCJ1c2VySW5mb19saXN0IiwiZGlyZWN0b3IiLCJnZXRTY2VuZSIsIm5hbWUiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiUWllSHVhblNjZW5lX25vcm1hbCIsImxvbmdodWRvdV9pbnMiLCJzZXJpYWxpemVVc2VycyIsImJldEJlZ2luX3IiLCJpbml0X3N0YXQiLCJSZXN1bHRDb2RlIiwib25CZXQiLCJiZXRfZGljdCIsInNob3dSZXN1bHQiLCJiZXRCZWdpbiIsImluaXRfcmVjb3JkIiwiZ2FtZV9yZWNvcmRfbGlzdCIsImNqc29uIiwicGFyc2UiLCJlIiwieXV4aWF4aWVNYWluIiwicmVjZWl2ZVNwQ2hhdCIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsIlJlYWR5IiwiSnVTaHUiLCJzdHJpbmciLCJyb3VuZF9udW0iLCJnbG9iYWxfbGVmdF9yb3VuZCIsImlzX3RhYmxlX3R5cGUiLCJzdGFydEluaXQiLCJzY2hlZHVsZU9uY2UiLCJzdGFydFRvdVpodSIsImJldF90aW1lIiwiYmV0RGF0YSIsImJldF9kYXRhIiwiaSIsImJldF90eXBlIiwicG94IiwicG95IiwiWGlhWmh1IiwiYmV0X2dvbGQiLCJiZXRfcmVzIiwic2VhdElEIiwidGVtcE5ldFdvcmsiLCJyZk1pbmVEYXRhIiwibGlhbl9jaHVhbl9tYXgiLCJiZXRfbWF4X2NoZWNrIiwicmZHYW1lRGF0YSIsInVzZXJfZ29sZF9kaWN0IiwiaiIsInVzZXJJZCIsInRhYmxlX2dvbGQiLCJpbml0UGxheWVyIiwibGFzdF93aW5fY2FyZCIsImxpc3QiLCJyZXN1bHROb2RlIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJuZCIsImluc3RhbnRpYXRlIiwiU2hhaVppcyIsInNwVHlwZSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwic2hhaUxpc3QxIiwic2hhaUxpc3QyIiwic2NhbGUiLCJwb3NpdGlvbiIsInYyIiwiYWRkQ2hpbGQiLCJFeGl0X0Z1bmN0aW9uIiwibG9hZFNjZW5lIiwiTGFuZGxvcmRzTmV0V29yayIsInQiLCJuZWVkX3JlY29ubmV0IiwiaG91c2VMYmwiLCJleGhvdXNlSWQiLCJkYXRhIiwiZ2FtZUluaXQiLCJiZXRfbWF4Iiwiemh1YW5nIiwic2V0TW90aCIsImlzX2xpbmUiLCJyZWFkeVBsYXllciIsIk1vdGgiLCJhbGxvd0V4aXRHYW1lIiwic2hvd1NhaVppIiwid2luX3Jlc3VsdCIsInJlZnVzZUNob3VtYSIsIm9wZW5TZXR0bGVtZW50IiwiZHQiLCJjb21tb25Cb2FyZCIsInBsYXkiLCJjb21tb25MYmwiLCJSZXN1bHREYXRhIiwibmlja25hbWUiLCJ0YWJsZUlEIiwiaGVhZGltZ3VybCIsImlzR2FtZU92ZXIiLCJudCIsImNsdWJTb2NrZXQiLCJnYW1lX3dpbl9yZWNvcmQiLCJzZXRUaW1lb3V0IiwiY2xvc2VTZXR0bGVtZW50Iiwib3BlblJlc3VsdFVJIiwib3Blbkhpc3RvcnlVSSIsIm9wZW5EZXRhaWxVSSIsIm5vR29sZEJkIiwiZXhpdEJvYXJkIiwidG1MYmwiLCJMYWJlbCIsInRpdGxlTGJsIiwidXNlcl9uYW1lIiwidXNlciIsIm5vZGVMaXN0IiwiY2hpbGRyZW4iLCJleGl0VGltZXJUbXAiLCJzY2hlZHVsZSIsImlzX3RydWUiLCJlbnRlclJvb21TZW5kX2Z1bmMiLCJlcnJvciIsInNldExvYmJ5TWFpbk9ial9GdW5jdGlvbiIsInNjZW5lIiwic2V0TGFuZGxvcmRzT2JqX0Z1bmN0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxPQUFPLEdBQUcsc0JBQWhCLEVBQ0E7QUFFQTs7QUFDQSxJQUFJQyxXQUFXLEdBQUksWUFBWTtBQUMzQixXQUFTQyxVQUFULEdBQXNCO0FBQ2xCLFFBQUlDLFNBQUo7O0FBQ0EsUUFBSUEsU0FBUyxLQUFLQyxTQUFsQixFQUE2QjtBQUN6QkQsTUFBQUEsU0FBUyxHQUFHLElBQUlFLE1BQUosRUFBWjtBQUNIOztBQUNELFdBQU9GLFNBQVA7QUFDSDs7QUFFRCxXQUFTRSxNQUFULEdBQWtC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c0NvbnRlbnQiOlsiY29uc3QgTkVUUEFUSCA9ICdodHRwOi8vNjAuMjA1LjE5MS44Nyc7XHJcbi8vY29uc3QgTkVUUEFUSCA9ICdodHRwOi8vMTkyLjE2OC4xOC43JztcclxuXHJcbi8vc2d0dGVzdFxyXG52YXIgTGFuZE5ldFdvcmsgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gZ2V0SW5zdGFudCgpIHtcclxuICAgICAgICB2YXIgX2luc3RhbmNlO1xyXG4gICAgICAgIGlmIChfaW5zdGFuY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBfaW5zdGFuY2UgPSBuZXcgU2luZ2xlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gU2luZ2xlKCkge1xyXG4gICAgICAgIHRoaXMubG9iYnlNYWluID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxhbmRsb3JkcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ob3VzZUlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRhYmxlSWQgPSAtMTtcclxuICAgICAgICB0aGlzLnNlYXRJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMucGxheWVySGVhZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJMaXN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJvb21CZXQgPSAxO1xyXG4gICAgICAgIHRoaXMuTGFuZGxvcmRzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tYXhMaW50ID0gWzAsIDAsIDBdOyAvL+WNleWOiyDkuLIgIOixueWtkFxyXG4gICAgICAgIHRoaXMuZ2FtZURhdGEgPSBbXTsgLy/ljZXlsYDmlbDmja5cclxuICAgICAgICB0aGlzLm1pbmVEYXRhID0gW107IC8v5Y2V5bGA5Liq5Lq65pWw5o2uXHJcbiAgICAgICAgdGhpcy50bXBNb3ZlVG0gPSAwOyAvL+aMqueahOasoeaVsFxyXG4gICAgICAgIHRoaXMudG1wU3Vic2VxdWVudCA9IHt9OyAvL+WxgOWGheS4sueahOe7hOWQiFxyXG4gICAgICAgIHRoaXMuZW50ZXJHYW1lVHlwZSA9IDA7IC8vIOato+W4uOaIv+WNoeWcuiAwICAg5L+x5LmQ6YOo5oi/5Y2h5Zy6MVxyXG5cclxuICAgICAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5oi/5Y2h5Zy66L+b5YWl5ri45oiPXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5sb2dpbkdhbWVfRnVuY3Rpb24gPSAoaXAsIHByb3QsIHBsYXllcklkLCBzaWduKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXAgPSBMaGpjb25maWcuU2VydmVyX0lQO1xyXG4gICAgICAgICAgICB0aGlzLnByb3QgPSBwcm90O1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcklkID0gcGxheWVySWQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2lnbiA9IHNpZ247XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVudGVyR2FtZVR5cGUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZU5hbWUgPSBcImxvdHRlcnlcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVEaXNjb25uZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9iYnlNYWluU29ja2V0ID0gcmVxdWlyZSgnLi4vTG9iYnkvTG9iYnlOZXRXb3JrJykuc29ja2V0O1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZUZ1bmN0aW9uKCk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2x1Yl9sb2dpbkdhbWVfRnVuY3Rpb24yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlwID0gTGhqY29uZmlnLlNlcnZlcl9JUDtcclxuICAgICAgICAgICAgdGhpcy5wcm90ID0gJzEzODUxJztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllckluZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lVHlwZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySWQgPSB0aGlzLnBsYXllckluZm8ucGxheWVySWQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2lnbiA9IHRoaXMucGxheWVySW5mby5nYW1lU2lnbjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVOYW1lID0gXCJMYW5kXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lRGlzY29ubmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvYmJ5TWFpblNvY2tldCA9IHJlcXVpcmUoJy4uL0xvYmJ5L0xvYmJ5TmV0V29yaycpLnNvY2tldDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWVGdW5jdGlvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0Q0x1Yk9iaiA9IGZ1bmN0aW9uIChjbHViT2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2x1Yk9iaiA9IGNsdWJPYmo7XHJcbiAgICAgICAgICAgIHRoaXMuY2x1Yk9iai5sb2dpbkdhbWVSZXN1bHQoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNsdWJfbG9naW5HYW1lX0Z1bmN0aW9uID0gKGNsdWJPYmopID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pcCA9IExoamNvbmZpZy5TZXJ2ZXJfSVA7XHJcbiAgICAgICAgICAgIHRoaXMucHJvdCA9ICcxMzg1MSc7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVudGVyR2FtZVR5cGUgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmNsdWJPYmogPSBjbHViT2JqO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcklkID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkO1xyXG4gICAgICAgICAgICB0aGlzLnNpZ24gPSB0aGlzLnBsYXllckluZm8uZ2FtZVNpZ247XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lTmFtZSA9IFwiTGFuZFwiO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW5Tb2NrZXQgPSByZXF1aXJlKCcuLi9Mb2JieS9Mb2JieU5ldFdvcmsnKS5zb2NrZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lRnVuY3Rpb24oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdvbGRfbG9naW5HYW1lX0Z1bmN0aW9uID0gKGdvbGRPYmopID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pcCA9IExoamNvbmZpZy5TZXJ2ZXJfSVA7XHJcbiAgICAgICAgICAgIHRoaXMucHJvdCA9ICcxMzg1Mic7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdvbGRPYmogPSBnb2xkT2JqO1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyR2FtZVR5cGUgPSAyO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcklkID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkO1xyXG4gICAgICAgICAgICB0aGlzLnNpZ24gPSB0aGlzLnBsYXllckluZm8uZ2FtZVNpZ247XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lTmFtZSA9IFwiTGFuZFwiO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW5Tb2NrZXQgPSByZXF1aXJlKCcuLi9Mb2JieS9Mb2JieU5ldFdvcmsnKS5zb2NrZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lRnVuY3Rpb24oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlvIDlp4vmuLjmiI9cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnN0YXJ0R2FtZUZ1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaXAgPSB0aGlzLmlwO1xyXG4gICAgICAgICAgICB2YXIgcHJvdCA9IHRoaXMucHJvdDtcclxuICAgICAgICAgICAgdmFyIHBsYXllcklkID0gdGhpcy5wbGF5ZXJJZDtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLnNpZ247XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNvY2tldCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldCA9IFNvY2tldElPLmNvbm5lY3QoaXAgKyBcIjpcIiArIHByb3QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc29ja2V0ID0gcmVxdWlyZShcInNvY2tldC1pb1wiKSwgc2VsZi5MYW5kbG9yZHNTb2NrZXQgPSBzb2NrZXQoaXAgKyBcIjpcIiArIHByb3QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImNvbm5lY3RfZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi6L+e5o6l5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiY29ubmVjdF90aW1lb3V0XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIui/nuaOpei2heaXtlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImNvbm5lY3RlZFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAvL2NjLmxvZygn6L+b5YWl5ri45oiPPT09PT0nICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiTG9naW5HYW1lXCIsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWV0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNpZ246IHNpZ25cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImxvZ2luR2FtZVJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ+i/m+WFpem+meiZjuaWl++8jCDov5Tlm57muLjmiI/kv6Hmga86JyArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubGhkX3NjID0gcmV0Lk9iajtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQucmVzdWx0aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8ucGxheWVyQ29pbiA9IHJldC5PYmouc2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnJvb21CZXQgPSByZXQuT2JqLmJldDtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGYubG9iYnlNYWluLmVudGVyUm9vbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpblNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJsaGRfZ2FtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiZ2V0R2FtZVJhbmtpbmdMaXN0XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHJldC5yZXN1bHRpZCAmJiBzZWxmLmVudGVyR2FtZVR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vc2VsZi5jbHViT2JqLmxvZ2luR2FtZVJlc3VsdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIGlmIChyZXQucmVzdWx0aWQgJiYgc2VsZi5lbnRlckdhbWVUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBzZWxmLmdvbGRPYmoubG9naW5HYW1lUmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIC8v5ZCN5Y2VXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiZ2V0R2FtZVJhbmtpbmdMaXN0UmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubGhkX2dsb2JhbC51c2VySW5mb19saXN0ID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmRpcmVjdG9yLmdldFNjZW5lKCkubmFtZSAhPSBcImxoZF9nYW1lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL2J1dHRvbkN0cmxcIikuZ2V0Q29tcG9uZW50KFwiTG9iYnlCdXR0b25DbGlja1wiKS5RaWVIdWFuU2NlbmVfbm9ybWFsKFwibGhkX2dhbWVcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb25naHVkb3VfaW5zLnNlcmlhbGl6ZVVzZXJzKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvbmdodWRvdV9pbnMuYmV0QmVnaW5fcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gLy/lvZPliY3nirbmgIFcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJnZXRHYW1lVHlwZVJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb25naHVkb3VfaW5zLmluaXRfc3RhdChyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImxvdHRlcnlSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0LmJldF9kaWN0KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi772e772e772e772e772e772e5LiL5rOo6L+U5ZueXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuUmVzdWx0Q29kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZ2h1ZG91X2lucy5vbkJldChyZXN1bHQuYmV0X2RpY3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJPcGVuV2luUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvbmdodWRvdV9pbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvbmdodWRvdV9pbnMuc2hvd1Jlc3VsdChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLvvZ7vvZ7vvZ7vvZ7vvZ7vvZ7lvIDniYxcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIkJldFN0YXJ0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIHNzID0ge3Jlc3VsdDp0cnVlLHR5cGU6MX07XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvbmdodWRvdV9pbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvbmdodWRvdV9pbnMuYmV0QmVnaW4oKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCLvvZ7vvZ7vvZ7vvZ7vvZ7vvZ7lvIDlsYBcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL+iusOW9lVxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImdldEdhbWVSZWNvcmRMaXN0UmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9uZ2h1ZG91X2lucy5pbml0X3JlY29yZChyZXN1bHQuZ2FtZV9yZWNvcmRfbGlzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJzZW5kVGFibGVNc2dSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjanNvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNqc29uID0gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2pzb24gPT0gJ29iamVjdCcgJiYgY2pzb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gY2pzb247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ+iBiuWkqT09PT09JyArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lnl1eGlheGllTWFpbi5yZWNlaXZlU3BDaGF0KHJldCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJCcm9rZW5MaW5lUmVjb3ZlcnlcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnn63nur/ph43ov54nICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5ub2RlLmdldENoaWxkQnlOYW1lKCflh4blpIfmjInpkq4nKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ+mCgOivt+S/seS5kOmDqOaIkOWRmOaMiemSricpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuUmVhZHkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCZXRUeXBlUmVzdWx0MjIyMjI9PT09PT09PT09PT09PT09PT09PT09PT09PeW8gOWniycsIHJldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5KdVNodS5zdHJpbmcgPSAn5YmpJyArIHJldC5yb3VuZF9udW0gKyAn5bGAJztcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxfbGVmdF9yb3VuZCA9IHJldC5yb3VuZF9udW07XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0LmlzX3RhYmxlX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5LiL5rOo54q25oCB6ZyA6KaBIOWPr+S7peS4i+azqCAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc3RhcnRJbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMubWluZURhdGEgPSBbMCwgMCwgMCwgMCwgMCwgMF07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLnN0YXJ0VG91Wmh1KHJldC5iZXRfdGltZSAtIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ooaXmipXms6jkv6Hmga9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJldERhdGEgPSByZXQuYmV0X2RhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gYmV0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJldERhdGFbaV0uYmV0X3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3ggPSBbMCwgLTI3OSwgOSwgMjk4LCAtMjc5LCA5LCAyOThdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3kgPSBbMCwgOTcsIDk3LCA5NywgLTEwMywgLTEwMywgLTEwMywgLTEwM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuWGlhWmh1KGJldERhdGFbaV0uYmV0X2dvbGQsIHBveFtiZXREYXRhW2ldLmJldF9yZXNdLCBwb3lbYmV0RGF0YVtpXS5iZXRfcmVzXSwgYmV0RGF0YVtpXS5zZWF0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiZXREYXRhW2ldLnNlYXRJZCA9PSBzZWxmLkxhbmRsb3Jkcy5zZWF0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMudGVtcE5ldFdvcmsubWluZURhdGFbYmV0RGF0YVtpXS5iZXRfcmVzIC0gMV0gKz0gYmV0RGF0YVtpXS5iZXRfZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMucmZNaW5lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy50ZW1wTmV0V29yay50bXBTdWJzZXF1ZW50ID0gcmV0LmxpYW5fY2h1YW5fbWF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy50ZW1wTmV0V29yay5nYW1lRGF0YSA9IHJldC5iZXRfbWF4X2NoZWNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZkdhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL+ihpeeOqeWutumHkeW4gVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gcmV0LnVzZXJfZ29sZF9kaWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gc2VsZi5wbGF5ZXJMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFzZWxmLnBsYXllckxpc3Rbal0gJiYgc2VsZi5wbGF5ZXJMaXN0W2pdLnVzZXJJZCA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJMaXN0W2pdLnRhYmxlX2dvbGQgPSByZXQudXNlcl9nb2xkX2RpY3RbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuaW5pdFBsYXllcihzZWxmLnBsYXllckxpc3QpO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/ooaXkuIrkuIDlsYDlvIDpqrDlrZDnu5PmnpxcclxuICAgICAgICAgICAgICAgIGlmICghIXJldC5sYXN0X3dpbl9jYXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSByZXQubGFzdF93aW5fY2FyZDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZXN1bHROb2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZCA9IGNjLmluc3RhbnRpYXRlKHNlbGYuTGFuZGxvcmRzLlNoYWlaaXNbbGlzdFtpXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5MYW5kbG9yZHMuc3BUeXBlID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLkxhbmRsb3Jkcy5zaGFpTGlzdDFbbGlzdFtpXSAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuTGFuZGxvcmRzLnNwVHlwZSA9PSAnMicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5kLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2VsZi5MYW5kbG9yZHMuc2hhaUxpc3QyW2xpc3RbaV0gLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZC5zY2FsZSA9IDAuMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmQucG9zaXRpb24gPSBpID09ICcwJyA/IGNjLnYyKC0xNDAsIDIzOSkgOiBjYy52MigtOTMsIDIzOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnJlc3VsdE5vZGUuYWRkQ2hpbGQobmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5FeGl0X0Z1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnTG9iYnlNYWluJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9iYnlNYWluID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuaG91c2VJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVJZCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXRJZCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckhlYWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckxpc3QgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnJvb21CZXQgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLm1heExpbnQgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZURhdGEgPSBbXTsgLy/ljZXlsYDmlbDmja5cclxuICAgICAgICAgICAgdGhpcy5taW5lRGF0YSA9IFtdOyAvL+WNleWxgOS4quS6uuaVsOaNrlxyXG4gICAgICAgICAgICB0aGlzLnRtcE1vdmVUbSA9IDA7IC8v5oyq55qE5qyh5pWwXHJcbiAgICAgICAgICAgIHRoaXMudG1wU3Vic2VxdWVudCA9IHt9OyAvL+WxgOWGheS4sueahOe7hOWQiFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogc29ja2V06ZW/6L+eXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc05ldFdvcmsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55uR5ZCsc29ja2V05LqL5Lu2Jyk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGYuZ2FtZUV4aXQgfHwgKHNlbGYuTGFuZGxvcmRzLmNvbV9NZXNzYWdlQm94LmFjdGl2ZSA9IHRydWUsIHNlbGYuTGFuZGxvcmRzLmRpc2Nvbm5lY3ROZXRXb3JrX0Z1bmN0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmlq3lvIDov57mjqUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lm5lZWRfcmVjb25uZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIjIy6YeN6L+eXCIrc2VsZi5pcCArIFwiOlwiICsgc2VsZi5wcm90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLkxhbmRsb3Jkc1NvY2tldCA9IFNvY2tldElPLmNvbm5lY3Qoc2VsZi5pcCArIFwiOlwiICsgc2VsZi5wcm90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy93aW5kb3cubmVlZF9yZWNvbm5ldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICog5o6l5pS25omA5pyJ546p5a625L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiSHVkc2hvd1wiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmhvdXNlTGJsLnN0cmluZyA9ICfmiL/lj7fvvJonICsgc2VsZi5ob3VzZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGhvdXNlSWQgPSBzZWxmLmhvdXNlSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCdIdWRzaG93PT09PT09PT09PT09PT09PT09PT09PT09PT0nICsgSlNPTi5zdHJpbmdpZnkocmV0KSArICcgICAgICcgKyBzZWxmLmhvdXNlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YVtpXS5zZWF0SWQgPT0gc2VsZi5zZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLmdhbWVJbml0KHJlc3VsdC5kYXRhW2ldLnRhYmxlSWQsIHJlc3VsdC5kYXRhW2ldLnNlYXRJZCwgcmVzdWx0LmRhdGFbaV0udXNlcklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm1heExpbnQgPSByZXN1bHQuYmV0X21heDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckxpc3QgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5pbml0UGxheWVyKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICog5o6l5pS2546p5a625YeG5aSH5L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiVGFiZWxSZWFkeVJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCdUYWJlbFJlYWR5UmVzdWx0PT09PT09PT09PT09PT09PT09PT09PT09PT0nLCBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISFyZXQuemh1YW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflvpflm7rlrprluoRpZO+8micgKyByZXQuemh1YW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhc2VsZi5MYW5kbG9yZHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5zZXRNb3RoKHJldC56aHVhbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0LmlzX2xpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZWFkeVBsYXllcihyZXQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIOa4uOaIj+eKtuaAgVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIkJldFN0YXJ0UmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ0JldFN0YXJ0UmVzdWx0PT09PT09PT09PT09PT09PT09PT09PT09PT0nLCBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKCdCZXRUeXBlUmVzdWx0JywgKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCZXRUeXBlUmVzdWx0PT09PT09PT09PT09PT09PT09PT09PT09PT3lvIDlp4snLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQmV0VHlwZVJlc3VsdDIyMjIyPT09PT09PT09PT09PT09PT09PT09PT09PT3lvIDlp4snLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5KdVNodS5zdHJpbmcgPSBg5YmpJHtyZXQucm91bmRfbnVtfeWxgGA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc3RhcnRJbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc3RhcnRUb3VaaHUoKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZ2xvYmFsX2xlZnRfcm91bmQgPSByZXQucm91bmRfbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGYuTGFuZGxvcmRzLmNsb3NlU2V0dGxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvL+W8gOWni+aKouW6hFxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJTdGFydENob2ljZUJhbmtlclwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W8gOWni+aKouW6hCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGYuTGFuZGxvcmRzLmNsb3NlU2V0dGxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLk1vdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uYWxsb3dFeGl0R2FtZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/miqLluoTlm57miadcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiQ2hvaWNlQmFua2VyUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5oqi5bqE6K+35rGC5oiQ5Yqf77yaJyArIHJldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/miqLluoTnu5PmnpxcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiT3ZlckNob2ljZUJhbmtlclJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+iwgeaYr+W6hHVzZXJJRO+8micpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhc2VsZi5MYW5kbG9yZHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnNldE1vdGgocmV0LnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+WbnuWQiOe7k+adnyDlj5Hnu5PmnpxcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiT3BlbldpblJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ09wZW5XaW5SZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAvL+aOp+WItuaYvuekuuetm+WtkFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnNob3dTYWlaaShyZXN1bHQud2luX3Jlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mjqfliLblm57mlLbnrbnotYRcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZWZ1c2VDaG91bWEodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiByZXN1bHQucmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gc2VsZi5wbGF5ZXJMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFzZWxmLnBsYXllckxpc3Rbal0gJiYgc2VsZi5wbGF5ZXJMaXN0W2pdLnVzZXJJZCA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJMaXN0W2pdLnRhYmxlX2dvbGQgPSByZXN1bHQucmVzdWx0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLmluaXRQbGF5ZXIoc2VsZi5wbGF5ZXJMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5vcGVuU2V0dGxlbWVudChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvL+S4i+azqOWbnuaJp1xyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJUYWJlbEJldFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RhYmVsQmV0UmVzdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR0ID0gcmVzdWx0LmRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YVswXS5iZXRfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG94ID0gWzAsIC0yNzksIDksIDI5OCwgLTI3OSwgOSwgMjk4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3kgPSBbMCwgOTcsIDk3LCA5NywgLTEwMywgLTEwMywgLTEwMywgLTEwM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5YaWFaaHUoZHQuYmV0X2dvbGQsIHBveFtkdC5iZXRfcmVzXSwgcG95W2R0LmJldF9yZXNdLCBkdC5zZWF0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR0LnNlYXRJZCA9PSBzZWxmLkxhbmRsb3Jkcy5zZWF0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm1pbmVEYXRhW2R0LmJldF9yZXMgLSAxXSArPSBkdC5iZXRfZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZk1pbmVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+eJueauiuazqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudG1wU3Vic2VxdWVudCA9IHJlc3VsdC5saWFuX2NodWFuX21heDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nYW1lRGF0YSA9IHJlc3VsdC5iZXRfbWF4X2NoZWNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZkdhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmNvbW1vbkJvYXJkLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmNvbW1vbkxibC5zdHJpbmcgPSAn5LiL5rOo5aSx6LSlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8v5oyq5Zue5omnXHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIlRhYmVsQmV0TnVvUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGFiZWxCZXROdW9SZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuYmV0X3R5cGUgPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nibnmrorms6hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FtZURhdGEgPSByZXN1bHQuYmV0X21heF9jaGVjaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnJmR2FtZURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS51c2VySWQgPT0gc2VsZi5MYW5kbG9yZHMudXNlcmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50bXBNb3ZlVG0tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5jb21tb25Cb2FyZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5jb21tb25MYmwuc3RyaW5nID0gJ+S4i+azqOWksei0pSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJwbGF5RW50ZXJcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygn5YW25a6D546p5a626L+b5YWlPT09PT09PT09PT09PScgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJMaXN0W3Jlc3VsdC5SZXN1bHREYXRhLnNlYXRJZF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lOiByZXN1bHQuUmVzdWx0RGF0YS5uaWNrbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IHJlc3VsdC5SZXN1bHREYXRhLnNjb3JlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWF0SWQ6IHJlc3VsdC5SZXN1bHREYXRhLnNlYXRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiByZXN1bHQuUmVzdWx0RGF0YS51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlSWQ6IHNlbGYuTGFuZGxvcmRzLnRhYmxlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlX2dvbGQ6IHJlc3VsdC5SZXN1bHREYXRhLnRhYmxlX2dvbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbWd1cmw6IHJlc3VsdC5SZXN1bHREYXRhLmhlYWRpbWd1cmxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuaW5pdFBsYXllcihzZWxmLnBsYXllckxpc3QpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJQbGF5ZXJPdXRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHNlbGYucGxheWVyTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5wbGF5ZXJMaXN0W2ldLnVzZXJJZCA9PSByZXN1bHQudXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXdpbmRvdy55dXhpYXhpZU1haW4uaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVyTGlzdFtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuaW5pdFBsYXllcihzZWxmLnBsYXllckxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJHYW1lT3ZlclJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50ZXJHYW1lVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBudCA9IHJlcXVpcmUoJ2NsdWJOZXQnKS5nZXRJbnN0YW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBudC5jbHViU29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmdhbWVfd2luX3JlY29yZCA9IHJldC5kYXRhLmdhbWVfd2luX3JlY29yZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxmLkV4aXRfRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmNsb3NlU2V0dGxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4ub3BlblJlc3VsdFVJKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwMClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImdldFRhYmxlV2luUmVjb3JkUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWOhuWPsue7k+aenFwiICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W5Y6G5Y+y57uT5p6cMjIyMjJcIiArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4ub3Blbkhpc3RvcnlVSShyZXQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJnZXRUYWJsZURpY3RSZWNvcmRSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W5oqV5rOo5L+h5oGvXCIgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5bmipXms6jkv6Hmga8yMjIyMlwiICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5vcGVuRGV0YWlsVUkocmV0KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwicmVncmVzc2lvblwiLCBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24odCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY2MubG9nKFwi5pat57q/6YeN6L+eXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJDaGVja1VzZXJHbG9kXCIsIGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbih0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRlckdhbWVUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4ubm9Hb2xkQmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0xvYmJ5TWFpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcInN0cmF0RGlzYmFuZFJlc3VsdFwiLCB0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6YCA5Ye65ri45oiPXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGl0Qm9hcmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCdvaycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmV4aXRCb2FyZC5nZXRDaGlsZEJ5TmFtZSgnbm8nKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0bUxibCA9IHl1eGlheGllTWFpbi5leGl0Qm9hcmQuZ2V0Q2hpbGRCeU5hbWUoJ3RtTGJsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGl0bGVMYmwgPSB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCd0aXRsZUxibCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVMYmwuc3RyaW5nID0gYOeOqeWutiR7dC51c2VyX25hbWV955Sz6K+36Kej5pWj5oi/6Ze0YDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodC51c2VyID09IHNlbGYucGxheWVySW5mby5wbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCdvaycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCdubycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZUxpc3QgPSB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCd1c2VyX2xpc3QnKS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAnMCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmdldENoaWxkQnlOYW1lKCd1c3JOYW1lJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0LnVzZXJfbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG1MYmwuc3RyaW5nID0gJzYw56eSJztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZXhpdFRpbWVyVG1wID0gNjA7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhpdFRpbWVyVG1wLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtTGJsLnN0cmluZyA9IGAke2V4aXRUaW1lclRtcH3np5JgXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSwgNTkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJvdmVyRGlzYmFuZFJlc3VsdFwiLCBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24odCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiYDmnInkurrlkIzmhI/pgIDlh7rmuLjmiI9cIiwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmV4aXRCb2FyZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkV4aXRfRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiY2hvaWNlRGlzYmFuZFJlc3VsdFwiLCBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24odCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnInkurrmipXnpahcIiwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuaXNfdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZUxpc3QgPSB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCd1c2VyX2xpc3QnKS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFub2RlTGlzdFtpXS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5nZXRDaGlsZEJ5TmFtZSgndXNyTmFtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdC51c2VyX25hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUxpc3RbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGl0Qm9hcmQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZW50ZXJSb29tU2VuZF9mdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+WaHVkc2hvd+a2iOaBrycpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQuZW1pdChcImdldFVlclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVJZDogc2VsZi50YWJsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXRJZDogc2VsZi5zZWF0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVySWQ6IHNlbGYucGxheWVySWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5MYW5kbG9yZHNTb2NrZXQuZW1pdChcImpvaW5UYWJsZXJvb21cIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRhYmxlSWQ6IHNlbGYudGFibGVJZCxcclxuICAgICAgICAgICAgICAgIC8vICAgICBzZWF0SWQ6IHNlbGYuc2VhdElkLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHVzZXJJZDogc2VsZi5wbGF5ZXJJZFxyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u5Zy65pmv5a+56LGhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXRMb2JieU1haW5PYmpfRnVuY3Rpb24gPSBmdW5jdGlvbiAoc2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW4gPSBzY2VuZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNldExhbmRsb3Jkc09ial9GdW5jdGlvbiA9IGZ1bmN0aW9uIChzY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3JkcyA9IHNjZW5lO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiA9IGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbnQ6IG5ldyBnZXRJbnN0YW50KCksXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExhbmROZXRXb3JrOyJdfQ==