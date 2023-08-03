
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/baijiale/baijialeNetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a1e3edw/uhDKaxX7Lf+kA+H', 'baijialeNetWork');
// Script/baijiale/baijialeNetWork.js

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
        cc.log('进入百家乐， 返回游戏信息:' + JSON.stringify(ret));
        ret = self.changeResultJSON_Function(ret);
        window.baijiale_sc = ret.Obj;

        if (ret.resultid) {
          self.playerInfo.playerCoin = ret.Obj.score;
          self.lobbyMainSocket.disconnect();
          self.LandlordsSocket.emit("getGameRankingList", "");
        }
      }); // //名单

      self.LandlordsSocket.on("getGameRankingListResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.baijiale_global.userInfo_list = result;

        if (cc.director.getScene().name != "baijiale_game") {
          cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("baijiale_game");
        } else {
          window.baijiale_ins.serializeUsers(result);
          window.baijiale_ins.betBegin_r();
        }
      }); // //当前状态

      self.LandlordsSocket.on("getGameTypeResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.baijiale_ins.init_stat(result);
      });
      self.LandlordsSocket.on("lotteryResult", function (ret) {
        var result = self.changeResultJSON_Function(ret); // console.log(result)
        // console.log(result.bet_dict);
        // console.log("～～～～～～下注返回");

        if (result.ResultCode == -1) {
          return;
        } else if (result.ResultCode == 2) {
          baijiale_ins.onBet(result.bet_dict);
        }
      });
      self.LandlordsSocket.on("OpenWinResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(ret);
        if (window.baijiale_ins) window.baijiale_ins.showResult(result);
        console.log("～～～～～～开牌");
      });
      self.LandlordsSocket.on("BetStart", function (ret) {
        var result = self.changeResultJSON_Function(ret); //var ss = {result:true,type:1};

        if (window.baijiale_ins) window.baijiale_ins.betBegin(); //console.log("～～～～～～开局");
      }); //记录

      self.LandlordsSocket.on("getGameRecordListResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log(result);
        window.baijiale_ins.init_record(result.game_record_list);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYWlqaWFsZVxcYmFpamlhbGVOZXRXb3JrLmpzIl0sIm5hbWVzIjpbIkxhbmROZXRXb3JrIiwiZ2V0SW5zdGFudCIsIl9pbnN0YW5jZSIsInVuZGVmaW5lZCIsIlNpbmdsZSIsImxvYmJ5TWFpbiIsIkxhbmRsb3JkcyIsIkxhbmRsb3Jkc1NvY2tldCIsInBsYXllckluZm8iLCJob3VzZUlkIiwidGFibGVJZCIsInNlYXRJZCIsInBsYXllckhlYWQiLCJwbGF5ZXJMaXN0Iiwicm9vbUJldCIsIkxhbmRsb3Jkc0RhdGEiLCJtYXhMaW50IiwiZ2FtZURhdGEiLCJtaW5lRGF0YSIsInRtcE1vdmVUbSIsInRtcFN1YnNlcXVlbnQiLCJlbnRlckdhbWVUeXBlIiwiaW5pdCIsInJlcXVpcmUiLCJsb2dpbkdhbWVfRnVuY3Rpb24iLCJpcCIsInByb3QiLCJwbGF5ZXJJZCIsInNpZ24iLCJMaGpjb25maWciLCJTZXJ2ZXJfSVAiLCJnYW1lTmFtZSIsImdhbWVEaXNjb25uZWN0IiwibG9iYnlNYWluU29ja2V0Iiwic29ja2V0Iiwic3RhcnRHYW1lRnVuY3Rpb24iLCJjbHViX2xvZ2luR2FtZV9GdW5jdGlvbjIiLCJnYW1lU2lnbiIsImluaXRDTHViT2JqIiwiY2x1Yk9iaiIsImxvZ2luR2FtZVJlc3VsdCIsImNsdWJfbG9naW5HYW1lX0Z1bmN0aW9uIiwiZ29sZF9sb2dpbkdhbWVfRnVuY3Rpb24iLCJnb2xkT2JqIiwic2VsZiIsImNjIiwic3lzIiwiaXNOYXRpdmUiLCJTb2NrZXRJTyIsImNvbm5lY3QiLCJvbiIsImxvZyIsInJldCIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlcmlkIiwiZ2FtZXR5cGUiLCJjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uIiwid2luZG93IiwiYmFpamlhbGVfc2MiLCJPYmoiLCJyZXN1bHRpZCIsInBsYXllckNvaW4iLCJzY29yZSIsImRpc2Nvbm5lY3QiLCJyZXN1bHQiLCJjb25zb2xlIiwiYmFpamlhbGVfZ2xvYmFsIiwidXNlckluZm9fbGlzdCIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJuYW1lIiwiZmluZCIsImdldENvbXBvbmVudCIsIlFpZUh1YW5TY2VuZV9ub3JtYWwiLCJiYWlqaWFsZV9pbnMiLCJzZXJpYWxpemVVc2VycyIsImJldEJlZ2luX3IiLCJpbml0X3N0YXQiLCJSZXN1bHRDb2RlIiwib25CZXQiLCJiZXRfZGljdCIsInNob3dSZXN1bHQiLCJiZXRCZWdpbiIsImluaXRfcmVjb3JkIiwiZ2FtZV9yZWNvcmRfbGlzdCIsImNqc29uIiwicGFyc2UiLCJlIiwieXV4aWF4aWVNYWluIiwicmVjZWl2ZVNwQ2hhdCIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsIlJlYWR5IiwiSnVTaHUiLCJzdHJpbmciLCJyb3VuZF9udW0iLCJnbG9iYWxfbGVmdF9yb3VuZCIsImlzX3RhYmxlX3R5cGUiLCJzdGFydEluaXQiLCJzY2hlZHVsZU9uY2UiLCJzdGFydFRvdVpodSIsImJldF90aW1lIiwiYmV0RGF0YSIsImJldF9kYXRhIiwiaSIsImJldF90eXBlIiwicG94IiwicG95IiwiWGlhWmh1IiwiYmV0X2dvbGQiLCJiZXRfcmVzIiwic2VhdElEIiwidGVtcE5ldFdvcmsiLCJyZk1pbmVEYXRhIiwibGlhbl9jaHVhbl9tYXgiLCJiZXRfbWF4X2NoZWNrIiwicmZHYW1lRGF0YSIsInVzZXJfZ29sZF9kaWN0IiwiaiIsInVzZXJJZCIsInRhYmxlX2dvbGQiLCJpbml0UGxheWVyIiwibGFzdF93aW5fY2FyZCIsImxpc3QiLCJyZXN1bHROb2RlIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJuZCIsImluc3RhbnRpYXRlIiwiU2hhaVppcyIsInNwVHlwZSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwic2hhaUxpc3QxIiwic2hhaUxpc3QyIiwic2NhbGUiLCJwb3NpdGlvbiIsInYyIiwiYWRkQ2hpbGQiLCJFeGl0X0Z1bmN0aW9uIiwibG9hZFNjZW5lIiwiTGFuZGxvcmRzTmV0V29yayIsInQiLCJuZWVkX3JlY29ubmV0IiwiaG91c2VMYmwiLCJleGhvdXNlSWQiLCJkYXRhIiwiZ2FtZUluaXQiLCJiZXRfbWF4Iiwiemh1YW5nIiwic2V0TW90aCIsImlzX2xpbmUiLCJyZWFkeVBsYXllciIsIk1vdGgiLCJhbGxvd0V4aXRHYW1lIiwic2hvd1NhaVppIiwid2luX3Jlc3VsdCIsInJlZnVzZUNob3VtYSIsIm9wZW5TZXR0bGVtZW50IiwiZHQiLCJjb21tb25Cb2FyZCIsInBsYXkiLCJjb21tb25MYmwiLCJSZXN1bHREYXRhIiwibmlja25hbWUiLCJ0YWJsZUlEIiwiaGVhZGltZ3VybCIsImlzR2FtZU92ZXIiLCJudCIsImNsdWJTb2NrZXQiLCJnYW1lX3dpbl9yZWNvcmQiLCJzZXRUaW1lb3V0IiwiY2xvc2VTZXR0bGVtZW50Iiwib3BlblJlc3VsdFVJIiwib3Blbkhpc3RvcnlVSSIsIm9wZW5EZXRhaWxVSSIsIm5vR29sZEJkIiwiZXhpdEJvYXJkIiwidG1MYmwiLCJMYWJlbCIsInRpdGxlTGJsIiwidXNlcl9uYW1lIiwidXNlciIsIm5vZGVMaXN0IiwiY2hpbGRyZW4iLCJleGl0VGltZXJUbXAiLCJzY2hlZHVsZSIsImlzX3RydWUiLCJlbnRlclJvb21TZW5kX2Z1bmMiLCJlcnJvciIsInNldExvYmJ5TWFpbk9ial9GdW5jdGlvbiIsInNjZW5lIiwic2V0TGFuZGxvcmRzT2JqX0Z1bmN0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlBLFdBQVcsR0FBSSxZQUFZO0FBQzNCLFdBQVNDLFVBQVQsR0FBc0I7QUFDbEIsUUFBSUMsU0FBSjs7QUFDQSxRQUFJQSxTQUFTLEtBQUtDLFNBQWxCLEVBQTZCO0FBQ3pCRCxNQUFBQSxTQUFTLEdBQUcsSUFBSUUsTUFBSixFQUFaO0FBQ0g7O0FBQ0QsV0FBT0YsU0FBUDtBQUNIOztBQUVELFdBQVNFLE1BQVQsR0FBa0I7QUFBQTs7QUFDZCxTQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FB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WSxhQUFaO0FBQ0FQLFFBQUFBLElBQUksQ0FBQ3JDLGVBQUwsQ0FBcUI4QyxJQUFyQixDQUEwQixRQUExQixFQUFvQztBQUNoQzNDLFVBQUFBLE9BQU8sRUFBRWtDLElBQUksQ0FBQ2xDLE9BRGtCO0FBRWhDQyxVQUFBQSxNQUFNLEVBQUVpQyxJQUFJLENBQUNqQyxNQUZtQjtBQUdoQ2dCLFVBQUFBLFFBQVEsRUFBRWlCLElBQUksQ0FBQ2pCO0FBSGlCLFNBQXBDLEVBRkEsQ0FPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsT0FaRCxDQVlFLE9BQU9vSyxLQUFQLEVBQWMsQ0FBRzs7QUFBQTtBQUN0QixLQWZEO0FBaUJBO0FBQ1I7QUFDQTs7O0FBQ1EsU0FBS0Msd0JBQUwsR0FBZ0MsVUFBVUMsS0FBVixFQUFpQjtBQUM3QyxXQUFLNUwsU0FBTCxHQUFpQjRMLEtBQWpCO0FBQ0gsS0FGRDs7QUFJQSxTQUFLQyx3QkFBTCxHQUFnQyxVQUFVRCxLQUFWLEVBQWlCO0FBQzdDLFdBQUszTCxTQUFMLEdBQWlCMkwsS0FBakI7QUFDSCxLQUZEOztBQUlBLFNBQUt2SSx5QkFBTCxHQUFpQyxVQUFVTixHQUFWLEVBQWU7QUFDNUMsVUFBSVAsRUFBRSxDQUFDQyxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsZUFBT08sSUFBSSxDQUFDa0MsS0FBTCxDQUFXcEMsR0FBWCxDQUFQO0FBQ0g7O0FBQ0QsYUFBT0EsR0FBUDtBQUNILEtBTEQ7O0FBTUEsU0FBSzlCLElBQUw7QUFDSDs7QUFDRCxTQUFPO0FBQ0hyQixJQUFBQSxVQUFVLEVBQUUsSUFBSUEsVUFBSjtBQURULEdBQVA7QUFHSCxDQTNuQmlCLEVBQWxCOztBQTZuQkFrTSxNQUFNLENBQUNDLE9BQVAsR0FBaUJwTSxXQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9zZ3R0ZXN0XHJcbnZhciBMYW5kTmV0V29yayA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBnZXRJbnN0YW50KCkge1xyXG4gICAgICAgIHZhciBfaW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKF9pbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIF9pbnN0YW5jZSA9IG5ldyBTaW5nbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBTaW5nbGUoKSB7XHJcbiAgICAgICAgdGhpcy5sb2JieU1haW4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGFuZGxvcmRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gbnVsbDtcclxuICAgICAgICB0aGlzLmhvdXNlSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFibGVJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuc2VhdElkID0gLTE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBsYXllckxpc3QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucm9vbUJldCA9IDE7XHJcbiAgICAgICAgdGhpcy5MYW5kbG9yZHNEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1heExpbnQgPSBbMCwgMCwgMF07IC8v5Y2V5Y6LIOS4siAg6LG55a2QXHJcbiAgICAgICAgdGhpcy5nYW1lRGF0YSA9IFtdOyAvL+WNleWxgOaVsOaNrlxyXG4gICAgICAgIHRoaXMubWluZURhdGEgPSBbXTsgLy/ljZXlsYDkuKrkurrmlbDmja5cclxuICAgICAgICB0aGlzLnRtcE1vdmVUbSA9IDA7IC8v5oyq55qE5qyh5pWwXHJcbiAgICAgICAgdGhpcy50bXBTdWJzZXF1ZW50ID0ge307IC8v5bGA5YaF5Liy55qE57uE5ZCIXHJcbiAgICAgICAgdGhpcy5lbnRlckdhbWVUeXBlID0gMDsgLy8g5q2j5bi45oi/5Y2h5Zy6IDAgICDkv7HkuZDpg6jmiL/ljaHlnLoxXHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmiL/ljaHlnLrov5vlhaXmuLjmiI9cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxvZ2luR2FtZV9GdW5jdGlvbiA9IChpcCwgcHJvdCwgcGxheWVySWQsIHNpZ24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pcCA9IExoamNvbmZpZy5TZXJ2ZXJfSVA7XHJcbiAgICAgICAgICAgIHRoaXMucHJvdCA9IHByb3Q7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySWQgPSBwbGF5ZXJJZDtcclxuICAgICAgICAgICAgdGhpcy5zaWduID0gc2lnbjtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllckluZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lVHlwZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lTmFtZSA9IFwibG90dGVyeVwiO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2JieU1haW5Tb2NrZXQgPSByZXF1aXJlKCcuLi9Mb2JieS9Mb2JieU5ldFdvcmsnKS5zb2NrZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lRnVuY3Rpb24oKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jbHViX2xvZ2luR2FtZV9GdW5jdGlvbjIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXAgPSBMaGpjb25maWcuU2VydmVyX0lQO1xyXG4gICAgICAgICAgICB0aGlzLnByb3QgPSAnMTM4NTEnO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGxheWVySW5mbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbnRlckdhbWVUeXBlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJZCA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJJZDtcclxuICAgICAgICAgICAgdGhpcy5zaWduID0gdGhpcy5wbGF5ZXJJbmZvLmdhbWVTaWduO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZU5hbWUgPSBcIkxhbmRcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVEaXNjb25uZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9iYnlNYWluU29ja2V0ID0gcmVxdWlyZSgnLi4vTG9iYnkvTG9iYnlOZXRXb3JrJykuc29ja2V0O1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZUZ1bmN0aW9uKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmluaXRDTHViT2JqID0gZnVuY3Rpb24gKGNsdWJPYmopIHtcclxuICAgICAgICAgICAgdGhpcy5jbHViT2JqID0gY2x1Yk9iajtcclxuICAgICAgICAgICAgdGhpcy5jbHViT2JqLmxvZ2luR2FtZVJlc3VsdCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2x1Yl9sb2dpbkdhbWVfRnVuY3Rpb24gPSAoY2x1Yk9iaikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlwID0gTGhqY29uZmlnLlNlcnZlcl9JUDtcclxuICAgICAgICAgICAgdGhpcy5wcm90ID0gJzEzODUxJztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllckluZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lVHlwZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuY2x1Yk9iaiA9IGNsdWJPYmo7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySWQgPSB0aGlzLnBsYXllckluZm8ucGxheWVySWQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2lnbiA9IHRoaXMucGxheWVySW5mby5nYW1lU2lnbjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVOYW1lID0gXCJMYW5kXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lRGlzY29ubmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvYmJ5TWFpblNvY2tldCA9IHJlcXVpcmUoJy4uL0xvYmJ5L0xvYmJ5TmV0V29yaycpLnNvY2tldDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWVGdW5jdGlvbigpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ29sZF9sb2dpbkdhbWVfRnVuY3Rpb24gPSAoZ29sZE9iaikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlwID0gTGhqY29uZmlnLlNlcnZlcl9JUDtcclxuICAgICAgICAgICAgdGhpcy5wcm90ID0gJzEzODUyJztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllckluZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ29sZE9iaiA9IGdvbGRPYmo7XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lVHlwZSA9IDI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySWQgPSB0aGlzLnBsYXllckluZm8ucGxheWVySWQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2lnbiA9IHRoaXMucGxheWVySW5mby5nYW1lU2lnbjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVOYW1lID0gXCJMYW5kXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lRGlzY29ubmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvYmJ5TWFpblNvY2tldCA9IHJlcXVpcmUoJy4uL0xvYmJ5L0xvYmJ5TmV0V29yaycpLnNvY2tldDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWVGdW5jdGlvbigpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOW8gOWni+a4uOaIj1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lRnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpcCA9IHRoaXMuaXA7XHJcbiAgICAgICAgICAgIHZhciBwcm90ID0gdGhpcy5wcm90O1xyXG4gICAgICAgICAgICB2YXIgcGxheWVySWQgPSB0aGlzLnBsYXllcklkO1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuc2lnbjtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc29ja2V0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0ID0gU29ja2V0SU8uY29ubmVjdChpcCArIFwiOlwiICsgcHJvdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzb2NrZXQgPSByZXF1aXJlKFwic29ja2V0LWlvXCIpLCBzZWxmLkxhbmRsb3Jkc1NvY2tldCA9IHNvY2tldChpcCArIFwiOlwiICsgcHJvdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiY29ubmVjdF9lcnJvclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCLov57mjqXlpLHotKVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJjb25uZWN0X3RpbWVvdXRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi6L+e5o6l6LaF5pe2XCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiY29ubmVjdGVkXCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIC8vY2MubG9nKCfov5vlhaXmuLjmiI89PT09PScgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJMb2dpbkdhbWVcIiwgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJpZDogcGxheWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZXR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbjogc2lnblxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwibG9naW5HYW1lUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygn6L+b5YWl55m+5a625LmQ77yMIOi/lOWbnua4uOaIj+S/oeaBrzonICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5iYWlqaWFsZV9zYyA9IHJldC5PYmo7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0LnJlc3VsdGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnBsYXllckNvaW4gPSByZXQuT2JqLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluU29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiZ2V0R2FtZVJhbmtpbmdMaXN0XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIC8v5ZCN5Y2VXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiZ2V0R2FtZVJhbmtpbmdMaXN0UmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYmFpamlhbGVfZ2xvYmFsLnVzZXJJbmZvX2xpc3QgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5uYW1lICE9IFwiYmFpamlhbGVfZ2FtZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9idXR0b25DdHJsXCIpLmdldENvbXBvbmVudChcIkxvYmJ5QnV0dG9uQ2xpY2tcIikuUWllSHVhblNjZW5lX25vcm1hbChcImJhaWppYWxlX2dhbWVcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5iYWlqaWFsZV9pbnMuc2VyaWFsaXplVXNlcnMocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYmFpamlhbGVfaW5zLmJldEJlZ2luX3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIC8v5b2T5YmN54q25oCBXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiZ2V0R2FtZVR5cGVSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYmFpamlhbGVfaW5zLmluaXRfc3RhdChyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImxvdHRlcnlSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0LmJldF9kaWN0KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi772e772e772e772e772e772e5LiL5rOo6L+U5ZueXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuUmVzdWx0Q29kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFpamlhbGVfaW5zLm9uQmV0KHJlc3VsdC5iZXRfZGljdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIk9wZW5XaW5SZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmV0KTtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuYmFpamlhbGVfaW5zKVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5iYWlqaWFsZV9pbnMuc2hvd1Jlc3VsdChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLvvZ7vvZ7vvZ7vvZ7vvZ7vvZ7lvIDniYxcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIkJldFN0YXJ0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIHNzID0ge3Jlc3VsdDp0cnVlLHR5cGU6MX07XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmJhaWppYWxlX2lucylcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYmFpamlhbGVfaW5zLmJldEJlZ2luKCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwi772e772e772e772e772e772e5byA5bGAXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy/orrDlvZVcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJnZXRHYW1lUmVjb3JkTGlzdFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmJhaWppYWxlX2lucy5pbml0X3JlY29yZChyZXN1bHQuZ2FtZV9yZWNvcmRfbGlzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJzZW5kVGFibGVNc2dSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjanNvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNqc29uID0gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2pzb24gPT0gJ29iamVjdCcgJiYgY2pzb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gY2pzb247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ+iBiuWkqT09PT09JyArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lnl1eGlheGllTWFpbi5yZWNlaXZlU3BDaGF0KHJldCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJCcm9rZW5MaW5lUmVjb3ZlcnlcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnn63nur/ph43ov54nICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5ub2RlLmdldENoaWxkQnlOYW1lKCflh4blpIfmjInpkq4nKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ+mCgOivt+S/seS5kOmDqOaIkOWRmOaMiemSricpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuUmVhZHkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCZXRUeXBlUmVzdWx0MjIyMjI9PT09PT09PT09PT09PT09PT09PT09PT09PeW8gOWniycsIHJldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5KdVNodS5zdHJpbmcgPSAn5YmpJyArIHJldC5yb3VuZF9udW0gKyAn5bGAJztcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxfbGVmdF9yb3VuZCA9IHJldC5yb3VuZF9udW07XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0LmlzX3RhYmxlX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5LiL5rOo54q25oCB6ZyA6KaBIOWPr+S7peS4i+azqCAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc3RhcnRJbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMubWluZURhdGEgPSBbMCwgMCwgMCwgMCwgMCwgMF07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLnN0YXJ0VG91Wmh1KHJldC5iZXRfdGltZSAtIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ooaXmipXms6jkv6Hmga9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJldERhdGEgPSByZXQuYmV0X2RhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gYmV0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJldERhdGFbaV0uYmV0X3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3ggPSBbMCwgLTI3OSwgOSwgMjk4LCAtMjc5LCA5LCAyOThdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3kgPSBbMCwgOTcsIDk3LCA5NywgLTEwMywgLTEwMywgLTEwMywgLTEwM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuWGlhWmh1KGJldERhdGFbaV0uYmV0X2dvbGQsIHBveFtiZXREYXRhW2ldLmJldF9yZXNdLCBwb3lbYmV0RGF0YVtpXS5iZXRfcmVzXSwgYmV0RGF0YVtpXS5zZWF0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiZXREYXRhW2ldLnNlYXRJZCA9PSBzZWxmLkxhbmRsb3Jkcy5zZWF0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMudGVtcE5ldFdvcmsubWluZURhdGFbYmV0RGF0YVtpXS5iZXRfcmVzIC0gMV0gKz0gYmV0RGF0YVtpXS5iZXRfZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMucmZNaW5lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy50ZW1wTmV0V29yay50bXBTdWJzZXF1ZW50ID0gcmV0LmxpYW5fY2h1YW5fbWF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy50ZW1wTmV0V29yay5nYW1lRGF0YSA9IHJldC5iZXRfbWF4X2NoZWNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZkdhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL+ihpeeOqeWutumHkeW4gVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gcmV0LnVzZXJfZ29sZF9kaWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gc2VsZi5wbGF5ZXJMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFzZWxmLnBsYXllckxpc3Rbal0gJiYgc2VsZi5wbGF5ZXJMaXN0W2pdLnVzZXJJZCA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJMaXN0W2pdLnRhYmxlX2dvbGQgPSByZXQudXNlcl9nb2xkX2RpY3RbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuaW5pdFBsYXllcihzZWxmLnBsYXllckxpc3QpO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/ooaXkuIrkuIDlsYDlvIDpqrDlrZDnu5PmnpxcclxuICAgICAgICAgICAgICAgIGlmICghIXJldC5sYXN0X3dpbl9jYXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSByZXQubGFzdF93aW5fY2FyZDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZXN1bHROb2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZCA9IGNjLmluc3RhbnRpYXRlKHNlbGYuTGFuZGxvcmRzLlNoYWlaaXNbbGlzdFtpXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5MYW5kbG9yZHMuc3BUeXBlID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzZWxmLkxhbmRsb3Jkcy5zaGFpTGlzdDFbbGlzdFtpXSAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuTGFuZGxvcmRzLnNwVHlwZSA9PSAnMicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5kLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2VsZi5MYW5kbG9yZHMuc2hhaUxpc3QyW2xpc3RbaV0gLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZC5zY2FsZSA9IDAuMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmQucG9zaXRpb24gPSBpID09ICcwJyA/IGNjLnYyKC0xNDAsIDIzOSkgOiBjYy52MigtOTMsIDIzOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnJlc3VsdE5vZGUuYWRkQ2hpbGQobmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5FeGl0X0Z1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnTG9iYnlNYWluJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9iYnlNYWluID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuaG91c2VJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVJZCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXRJZCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckhlYWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckxpc3QgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnJvb21CZXQgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLm1heExpbnQgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZURhdGEgPSBbXTsgLy/ljZXlsYDmlbDmja5cclxuICAgICAgICAgICAgdGhpcy5taW5lRGF0YSA9IFtdOyAvL+WNleWxgOS4quS6uuaVsOaNrlxyXG4gICAgICAgICAgICB0aGlzLnRtcE1vdmVUbSA9IDA7IC8v5oyq55qE5qyh5pWwXHJcbiAgICAgICAgICAgIHRoaXMudG1wU3Vic2VxdWVudCA9IHt9OyAvL+WxgOWGheS4sueahOe7hOWQiFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNvY2tldOmVv+i/nlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuTGFuZGxvcmRzTmV0V29yayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55uR5ZCsc29ja2V05LqL5Lu2Jyk7XHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgLy9zZWxmLmdhbWVFeGl0IHx8IChzZWxmLkxhbmRsb3Jkcy5jb21fTWVzc2FnZUJveC5hY3RpdmUgPSB0cnVlLCBzZWxmLkxhbmRsb3Jkcy5kaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmlq3lvIDov57mjqUnKTtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubmVlZF9yZWNvbm5ldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIyMumHjei/nlwiK3NlbGYuaXAgKyBcIjpcIiArIHNlbGYucHJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLkxhbmRsb3Jkc1NvY2tldCA9IFNvY2tldElPLmNvbm5lY3Qoc2VsZi5pcCArIFwiOlwiICsgc2VsZi5wcm90KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3dpbmRvdy5uZWVkX3JlY29ubmV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOaOpeaUtuaJgOacieeOqeWutuS/oeaBr1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJIdWRzaG93XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5ob3VzZUxibC5zdHJpbmcgPSAn5oi/5Y+377yaJyArIHNlbGYuaG91c2VJZDtcclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGhvdXNlSWQgPSBzZWxmLmhvdXNlSWQ7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ0h1ZHNob3c9PT09PT09PT09PT09PT09PT09PT09PT09PScgKyBKU09OLnN0cmluZ2lmeShyZXQpICsgJyAgICAgJyArIHNlbGYuaG91c2VJZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhW2ldLnNlYXRJZCA9PSBzZWxmLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5nYW1lSW5pdChyZXN1bHQuZGF0YVtpXS50YWJsZUlkLCByZXN1bHQuZGF0YVtpXS5zZWF0SWQsIHJlc3VsdC5kYXRhW2ldLnVzZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5tYXhMaW50ID0gcmVzdWx0LmJldF9tYXg7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnBsYXllckxpc3QgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLmluaXRQbGF5ZXIocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDmjqXmlLbnjqnlrrblh4blpIfkv6Hmga9cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiVGFiZWxSZWFkeVJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygnVGFiZWxSZWFkeVJlc3VsdD09PT09PT09PT09PT09PT09PT09PT09PT09JywgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFyZXQuemh1YW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+W+l+WbuuWumuW6hGlk77yaJyArIHJldC56aHVhbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIXNlbGYuTGFuZGxvcmRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5zZXRNb3RoKHJldC56aHVhbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJldC5pc19saW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMucmVhZHlQbGF5ZXIocmV0LmRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDmuLjmiI/nirbmgIFcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiQmV0U3RhcnRSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ0JldFN0YXJ0UmVzdWx0PT09PT09PT09PT09PT09PT09PT09PT09PT0nLCBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbignQmV0VHlwZVJlc3VsdCcsIChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCZXRUeXBlUmVzdWx0PT09PT09PT09PT09PT09PT09PT09PT09PT3lvIDlp4snLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQmV0VHlwZVJlc3VsdDIyMjIyPT09PT09PT09PT09PT09PT09PT09PT09PT3lvIDlp4snLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuSnVTaHUuc3RyaW5nID0gYOWJqSR7cmV0LnJvdW5kX251bX3lsYBgO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc3RhcnRJbml0KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5zdGFydFRvdVpodSgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lmdsb2JhbF9sZWZ0X3JvdW5kID0gcmV0LnJvdW5kX251bTtcclxuICAgICAgICAgICAgICAgIC8vIHNlbGYuTGFuZGxvcmRzLmNsb3NlU2V0dGxlbWVudCgpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy/lvIDlp4vmiqLluoRcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJTdGFydENob2ljZUJhbmtlclwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5byA5aeL5oqi5bqEJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBzZWxmLkxhbmRsb3Jkcy5jbG9zZVNldHRsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLk1vdGgoKTtcclxuICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5hbGxvd0V4aXRHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy/miqLluoTlm57miadcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJDaG9pY2VCYW5rZXJSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5oqi5bqE6K+35rGC5oiQ5Yqf77yaJyArIHJldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8v5oqi5bqE57uT5p6cXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiT3ZlckNob2ljZUJhbmtlclJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6LCB5piv5bqEdXNlcklE77yaJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXQpO1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzZWxmLkxhbmRsb3JkcylcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5zZXRNb3RoKHJldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8v5Zue5ZCI57uT5p2fIOWPkee7k+aenFxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIk9wZW5XaW5SZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ09wZW5XaW5SZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICAvL+aOp+WItuaYvuekuuetm+WtkFxyXG4gICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMuc2hvd1NhaVppKHJlc3VsdC53aW5fcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIC8v5o6n5Yi25Zue5pS256256LWEXHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZWZ1c2VDaG91bWEodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHJlc3VsdC5yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIHNlbGYucGxheWVyTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFzZWxmLnBsYXllckxpc3Rbal0gJiYgc2VsZi5wbGF5ZXJMaXN0W2pdLnVzZXJJZCA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckxpc3Rbal0udGFibGVfZ29sZCA9IHJlc3VsdC5yZXN1bHRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5pbml0UGxheWVyKHNlbGYucGxheWVyTGlzdCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5vcGVuU2V0dGxlbWVudChyZXN1bHQpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy/kuIvms6jlm57miadcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJUYWJlbEJldFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGFiZWxCZXRSZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdCA9IHJlc3VsdC5kYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YVswXS5iZXRfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3ggPSBbMCwgLTI3OSwgOSwgMjk4LCAtMjc5LCA5LCAyOThdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG95ID0gWzAsIDk3LCA5NywgOTcsIC0xMDMsIC0xMDMsIC0xMDMsIC0xMDNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5YaWFaaHUoZHQuYmV0X2dvbGQsIHBveFtkdC5iZXRfcmVzXSwgcG95W2R0LmJldF9yZXNdLCBkdC5zZWF0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHQuc2VhdElkID09IHNlbGYuTGFuZGxvcmRzLnNlYXRJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5taW5lRGF0YVtkdC5iZXRfcmVzIC0gMV0gKz0gZHQuYmV0X2dvbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5yZk1pbmVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eJueauiuazqFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRtcFN1YnNlcXVlbnQgPSByZXN1bHQubGlhbl9jaHVhbl9tYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nYW1lRGF0YSA9IHJlc3VsdC5iZXRfbWF4X2NoZWNrO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLnJmR2FtZURhdGEoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmNvbW1vbkJvYXJkLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uY29tbW9uTGJsLnN0cmluZyA9ICfkuIvms6jlpLHotKUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy/mjKrlm57miadcclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJUYWJlbEJldE51b1Jlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGFiZWxCZXROdW9SZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5iZXRfdHlwZSA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v54m55q6K5rOoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FtZURhdGEgPSByZXN1bHQuYmV0X21heF9jaGVjaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHMucmZHYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEudXNlcklkID09IHNlbGYuTGFuZGxvcmRzLnVzZXJpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50bXBNb3ZlVG0tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmNvbW1vbkJvYXJkLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uY29tbW9uTGJsLnN0cmluZyA9ICfkuIvms6jlpLHotKUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwicGxheUVudGVyXCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygn5YW25a6D546p5a626L+b5YWlPT09PT09PT09PT09PScgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIHNlbGYucGxheWVyTGlzdFtyZXN1bHQuUmVzdWx0RGF0YS5zZWF0SWRdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lOiByZXN1bHQuUmVzdWx0RGF0YS5uaWNrbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBzY29yZTogcmVzdWx0LlJlc3VsdERhdGEuc2NvcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhdElkOiByZXN1bHQuUmVzdWx0RGF0YS5zZWF0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiByZXN1bHQuUmVzdWx0RGF0YS51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVJZDogc2VsZi5MYW5kbG9yZHMudGFibGVJRCxcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZV9nb2xkOiByZXN1bHQuUmVzdWx0RGF0YS50YWJsZV9nb2xkLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRpbWd1cmw6IHJlc3VsdC5SZXN1bHREYXRhLmhlYWRpbWd1cmxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzLmluaXRQbGF5ZXIoc2VsZi5wbGF5ZXJMaXN0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIlBsYXllck91dFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHNlbGYucGxheWVyTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnBsYXllckxpc3RbaV0udXNlcklkID09IHJlc3VsdC51c2VySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cueXV4aWF4aWVNYWluLmlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVyTGlzdFtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkcy5pbml0UGxheWVyKHNlbGYucGxheWVyTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJHYW1lT3ZlclJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50ZXJHYW1lVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG50ID0gcmVxdWlyZSgnY2x1Yk5ldCcpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbnQuY2x1YlNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZ2FtZV93aW5fcmVjb3JkID0gcmV0LmRhdGEuZ2FtZV93aW5fcmVjb3JkO1xyXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5FeGl0X0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uY2xvc2VTZXR0bGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLm9wZW5SZXN1bHRVSShyZXQpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwMClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJnZXRUYWJsZVdpblJlY29yZFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWOhuWPsue7k+aenFwiICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W5Y6G5Y+y57uT5p6cMjIyMjJcIiArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLm9wZW5IaXN0b3J5VUkocmV0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcImdldFRhYmxlRGljdFJlY29yZFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluaKleazqOS/oeaBr1wiICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W5oqV5rOo5L+h5oGvMjIyMjJcIiArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLm9wZW5EZXRhaWxVSShyZXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwicmVncmVzc2lvblwiLCBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAvLyAgICAgdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbih0KTtcclxuICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhcIuaWree6v+mHjei/nlwiLCB0KTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5vbihcIkNoZWNrVXNlckdsb2RcIiwgZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24odCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRlckdhbWVUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLm5vR29sZEJkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnTG9iYnlNYWluJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJzdHJhdERpc2JhbmRSZXN1bHRcIiwgdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLpgIDlh7rmuLjmiI9cIiwgdCk7XHJcbiAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCdvaycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCdubycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1MYmwgPSB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCd0bUxibCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGl0bGVMYmwgPSB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCd0aXRsZUxibCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgICAgICB0aXRsZUxibC5zdHJpbmcgPSBg546p5a62JHt0LnVzZXJfbmFtZX3nlLPor7fop6PmlaPmiL/pl7RgO1xyXG4gICAgICAgICAgICAgICAgaWYgKHQudXNlciA9PSBzZWxmLnBsYXllckluZm8ucGxheWVySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCdvaycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHl1eGlheGllTWFpbi5leGl0Qm9hcmQuZ2V0Q2hpbGRCeU5hbWUoJ25vJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUxpc3QgPSB5dXhpYXhpZU1haW4uZXhpdEJvYXJkLmdldENoaWxkQnlOYW1lKCd1c2VyX2xpc3QnKS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gbm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAnMCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUxpc3RbaV0uZ2V0Q2hpbGRCeU5hbWUoJ3Vzck5hbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHQudXNlcl9uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRtTGJsLnN0cmluZyA9ICc2MOenkic7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhpdFRpbWVyVG1wID0gNjA7XHJcbiAgICAgICAgICAgICAgICB5dXhpYXhpZU1haW4uc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4aXRUaW1lclRtcC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHRtTGJsLnN0cmluZyA9IGAke2V4aXRUaW1lclRtcH3np5JgXHJcbiAgICAgICAgICAgICAgICB9LCAxLCA1OSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5MYW5kbG9yZHNTb2NrZXQub24oXCJvdmVyRGlzYmFuZFJlc3VsdFwiLCBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbih0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5omA5pyJ5Lq65ZCM5oSP6YCA5Ye65ri45oiPXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmV4aXRCb2FyZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuRXhpdF9GdW5jdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuTGFuZGxvcmRzU29ja2V0Lm9uKFwiY2hvaWNlRGlzYmFuZFJlc3VsdFwiLCBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbih0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pyJ5Lq65oqV56WoXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHQuaXNfdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlTGlzdCA9IHl1eGlheGllTWFpbi5leGl0Qm9hcmQuZ2V0Q2hpbGRCeU5hbWUoJ3VzZXJfbGlzdCcpLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gbm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFub2RlTGlzdFtpXS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmdldENoaWxkQnlOYW1lKCd1c3JOYW1lJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0LnVzZXJfbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeXV4aWF4aWVNYWluLmV4aXRCb2FyZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5lbnRlclJvb21TZW5kX2Z1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5ZodWRzaG935raI5oGvJyk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiZ2V0VWVyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZUlkOiBzZWxmLnRhYmxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhdElkOiBzZWxmLnNlYXRJZCxcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogc2VsZi5wbGF5ZXJJZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBzZWxmLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiam9pblRhYmxlcm9vbVwiLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGFibGVJZDogc2VsZi50YWJsZUlkLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNlYXRJZDogc2VsZi5zZWF0SWQsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdXNlcklkOiBzZWxmLnBsYXllcklkXHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7lnLrmma/lr7nosaFcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldExvYmJ5TWFpbk9ial9GdW5jdGlvbiA9IGZ1bmN0aW9uIChzY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYmJ5TWFpbiA9IHNjZW5lO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TGFuZGxvcmRzT2JqX0Z1bmN0aW9uID0gZnVuY3Rpb24gKHNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzID0gc2NlbmU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uID0gZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFudDogbmV3IGdldEluc3RhbnQoKSxcclxuICAgIH1cclxufSkoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFuZE5ldFdvcms7Il19