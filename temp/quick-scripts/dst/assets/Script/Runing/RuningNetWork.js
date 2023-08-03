
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Runing/RuningNetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7d44fAEP3dFto21gyi7uh4l', 'RuningNetWork');
// Script/Runing/RuningNetWork.js

"use strict";

/**
 * 跑得快SOCKET通讯
 */
var RuningNetWork = function () {
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
    this.Runing = null;
    this.RuningSocket = null;
    this.playerInfo = null;
    this.tableId = -1;
    this.seatId = -1;
    this.playerHead = null;
    this.playerList = null;
    this.roomBet = 1;
    this.disconnected = false;
    this.RuningData = null;
    this.gameExit = false;
    this.count = 0;
    /**
     * 初始化
     */

    this.init = function () {
      this.playerInfo = require("PlayerInfo").getInstant;
    };
    /**
     * 进入游戏
     */


    this.loginGame_Function = function (ip, prot, playerId, sign) {
      _this.ip = ip;
      _this.prot = prot;
      _this.playerId = playerId;
      _this.sign = sign;
      _this.playerInfo.gameName = "Runing";
      _this.playerInfo.gameDisconnect = false;
      cc.log('进入跑得快:' + ip, prot, playerId, sign);
      setTimeout(function () {
        cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("RunMain");
      }, 1000);
    };
    /**
     * 开始游戏
     */


    this.startGameFunction = function () {
      var _this2 = this;

      var ip = this.ip;
      var prot = this.prot;
      var playerId = this.playerId;
      var sign = this.sign;
      var socket = null;

      if (cc.sys.isNative) {
        this.LandlordsSocket = SocketIO.connect(ip + ":" + prot);
      } else {
        socket = require("socket-io");
        this.LandlordsSocket = socket(ip + ":" + prot);
      }

      this.LandlordsSocket.on("connect_error", function () {
        _this2.netErr('网络连接错误，请联系客服');
      });
      this.LandlordsSocket.on("connect_timeout", function () {
        _this2.netErr('网络连接错误，请联系客服');
      });
      this.LandlordsSocket.on("connected", function (ret) {
        cc.log('斗地主网络已连接，发起loginGame');

        _this2.LandlordsSocket.emit("LoginGame", JSON.stringify({
          userid: playerId,
          gametype: 1,
          sign: sign
        }));
      });
      this.LandlordsSocket.on('TipsCardsResult', function (ret) {
        ret = _this2.changeResultJSON_Function(ret);
        cc.log('出牌提示：' + JSON.stringify(ret));

        _this2.Landlords.tipsClickCallBack(ret);
      });
      this.LandlordsSocket.on('NoPushTipsCardsResult', function (ret) {
        ret = _this2.changeResultJSON_Function(ret);
        cc.log('不能出牌提示：' + JSON.stringify(ret));

        if (!ret.code) {
          _this2.Landlords.btn_OutCard.active = false;

          try {
            _this2.Landlords.netWork.LandlordsSocket.emit("sendCardsArr", {
              array: [],
              userId: _this2.Landlords.pInfo.playerId,
              tableId: _this2.tableId,
              seatId: _this2.seatId
            });
          } catch (error) {}

          ;
        }
      });
      this.LandlordsSocket.on("loginGameResult", function (ret) {
        cc.log('进入跑得快， 返回游戏信息:' + JSON.stringify(ret));
        ret = _this2.changeResultJSON_Function(ret);

        if (ret.resultid) {
          _this2.playerInfo.playerCoin = ret.Obj.score;
          _this2.roomBet = ret.Obj.bet;

          _this2.lobbyMainSocket.disconnect();

          _this2.LandlordsSocket.emit("LoginRoom", JSON.stringify({
            roomid: 1
          }));

          if (!cc.sys.isNative) _this2.LandlordsSocket.removeListener("LoginRoomResult");

          _this2.LandlordsSocket.on("LoginRoomResult", function (ret) {
            ret = _this2.changeResultJSON_Function(ret);

            if (ret.ResultCode) {
              _this2.tableId = ret.ResultData.tableId;
              _this2.seatId = ret.ResultData.seatId;
              _this2.playerList = ret.ResultData.userList;
              _this2.tax = ret.ResultData.tax;
              _this2.addScore = ret.ResultData.addscore;

              _this2.Landlords.resetDF(ret.points);

              _this2.LandlordsData = ret.ResultData.LandlordsData;

              _this2.LandlordsNetWork();
            }
          });
        } else {
          !_this2.gameExit && _this2.netErr(ret.msg);
        }
      });
    }; //错误信息弹板


    this.netErr = function (msg) {
      _this.Landlords.node.getChildByName("blackFace").active = true;
      _this.Landlords.exitReady.active = true;
      _this.Landlords.exitReady.getChildByName("message").getComponent("cc.Label").string = msg;
    };
    /**
     * socket长连
     */


    this.LandlordsNetWork = function () {
      _this.LandlordsSocket.on("disconnect", function (t) {
        _this.gameExit || (_this.Landlords.com_MessageBox.active = true, _this.Landlords.disconnectNetWork_Function());
      });

      _this.LandlordsSocket.on("Hudshow", function (ret) {
        cc.log('Hudshow~~~~:' + JSON.stringify(ret));

        var result = _this.changeResultJSON_Function(ret);

        for (var i = 0; i < result.data.length; i++) {
          if (result.data[i] != null) {
            if (result.data[i].seatId != _this.seatId) {
              //设置其他人的信息
              _this.Landlords.otherEnterRoom(result.data[i].nickname, result.data[i].score, result.data[i].seatId, result.data[i].userId, result.data[i].headimgurl);
            } else {
              //设置自己的信息
              _this.Landlords.setMySeat(result.data[i].nickname, result.data[i].score);
            }
          }
        }
      });
      /**
       * 
       */


      _this.LandlordsSocket.on("Landlord", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        console.log('抢地主：' + JSON.stringify(result));

        if (result.No1 && result.userId === _this.playerId) {
          //叫地主
          _this.Landlords.callLandloads(result.second);
        } else {
          //抢地主
          _this.Landlords.robLandlord(result.second, result.userId);
        }

        _this.Landlords.qiangDiZhu = true;
      });
      /**
       * 
       */


      _this.LandlordsSocket.on("ListenCarcd", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        result.second = result.second - 1;

        _this.Landlords.scheduleOnce(function () {
          _this.Landlords.gameFinish || _this.Landlords.playState(result.userId, result.second);
        }, 1);
      });
      /**
       * 
       */


      _this.LandlordsSocket.on("ACarcd", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        if (result.userId !== _this.playerId) {
          _this.Landlords.otherPlayerOutCard(result.carcd, result.userId, 0);
        } else {
          _this.Landlords.xiTongOutCard(result.carcd);
        }

        _this.Landlords.playerNowState(result.userId, result.Explain, result.carcd, result["double"]);
      });
      /**
       * 
       */


      _this.LandlordsSocket.on("MyCarcd", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        console.log("MyCarcd" + JSON.stringify(result));
        result.soery || result.result || (cc.log("不能出"), _this.Landlords.notConformRules());
      });
      /**
       * 
       */


      _this.LandlordsSocket.on("CCTV", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        _this.Landlords.playerNowState(result.userId, result.Explain, null, null);
      });
      /**
       * 
       */


      _this.LandlordsSocket.on("victory", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        console.log('推送结果' + JSON.stringify(result));
        var winner = result.Winner;
        var guanmen = result.guan_men_type;
        var baopei = result.bao_pei; // this.Landlords.scheduleOnce(() => {

        _this.Landlords.settlement(winner, guanmen, baopei);

        _this.Landlords.exitBtn.active = true; // }, 2);
      });
      /**
       * 
       */


      _this.LandlordsSocket.on("Mingcarcd", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        _this.Landlords.removeAllState();

        for (var i = 0; i < result.carcd.length; i++) {
          if (result.carcd[i].userId == _this.playerId) {
            if (_this.Landlords.playerCards.length > 0) {
              _this.Landlords.xiTongOutCard(result.carcd[i].carcd);
            } else {
              _this.Landlords.teShuChuPai(result.carcd[i].carcd);
            }
          } else {
            _this.Landlords.otherPlayerOutCard(result.carcd[i].carcd, result.carcd[i].userId, 0);
          }
        }
      });
      /**
       * 托管
       */


      _this.LandlordsSocket.on("InTuoGuan", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        _this.Landlords.tuoGuanState(result.reslut, result.userId);
      });
      /**
       * 玩家进入
       */


      _this.LandlordsSocket.on("playEnter", function (ret) {
        cc.log('玩家进入斗地主=============' + JSON.stringify(ret));

        var result = _this.changeResultJSON_Function(ret);

        _this.Landlords.otherEnterRoom(result.ResultData.nickname, result.ResultData.score, result.ResultData.seatId, result.ResultData.userId, result.ResultData.headimgurl);
      });
      /**
       * 发牌
       */


      _this.LandlordsSocket.on("sendCard", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        _this.Landlords.exitBtn.active = false;

        if (_this.Landlords.gameFinish == true) {
          _this.Landlords.gameFinish = false;

          _this.Landlords.cardsSorting(result.carcd, false);
        } else {
          _this.Landlords.cardsSorting(result.carcd, false);
        }
      });
      /**
       * 
       */


      _this.LandlordsSocket.on("PlayerOut", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        _this.Landlords.playerOutRoom(result.userId);
      });
      /**
       * 
       */


      _this.LandlordsSocket.on("LandlordsSocket", function (ret) {
        var result = _this.changeResultJSON_Function(ret);
      });
      /**
       * 春天
       */


      _this.LandlordsSocket.on("Spring", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        _this.Landlords.chunTianAnimation();
      });
      /**
       * 地主
       */


      _this.LandlordsSocket.on("Landlord_Poker", function (ret) {
        var result = _this.changeResultJSON_Function(ret); //result && this.Landlords.checkLandlords(result.userId, result.carcd, result["double"]);

      });

      _this.LandlordsSocket.on("sendBoomScore", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        var dlist = [].concat(result.res);

        for (var i in dlist) {
          var seat = null;

          if (dlist[i].seat_id == _this.seatId) {
            _this.Landlords.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = (dlist[i].score / _this.Landlords.pInfo.exchangeRate).toFixed(2);

            var nd = _this.Landlords.pb_Lower.getChildByName("act");

            nd.getChildByName("lbl").getComponent("cc.Label").string = (dlist[i].add_score >= 0 ? '+' : '') + (dlist[i].add_score / _this.Landlords.pInfo.exchangeRate).toFixed(2);
            nd.runAction(cc.sequence(cc.fadeIn(1), cc.fadeOut(1)));
          } else {
            if (_this.seatId == 0 && dlist[i].seat_id == 1) {
              seat = _this.Landlords.otherTwoR;
            } else if (_this.seatId == 0 && dlist[i].seat_id == 2) {
              seat = _this.Landlords.otherOneL;
            } else if (_this.seatId == 1 && dlist[i].seat_id == 0) {
              seat = _this.Landlords.otherOneL;
            } else if (_this.seatId == 1 && dlist[i].seat_id == 2) {
              seat = _this.Landlords.otherTwoR;
            } else if (_this.seatId == 2 && dlist[i].seat_id == 1) {
              seat = _this.Landlords.otherOneL;
            } else if (_this.seatId == 2 && dlist[i].seat_id == 0) {
              seat = _this.Landlords.otherTwoR;
            }

            if (!!seat) {
              seat.getChildByName("bg_name").getChildByName("Score").getComponent("cc.Label").string = (dlist[i].score / _this.Landlords.pInfo.exchangeRate).toFixed(2);

              var _nd = seat.getChildByName("act");

              _nd.getChildByName("lbl").getComponent("cc.Label").string = (dlist[i].add_score >= 0 ? '+' : '') + (dlist[i].add_score / _this.Landlords.pInfo.exchangeRate).toFixed(2);

              _nd.runAction(cc.sequence(cc.fadeIn(1), cc.fadeOut(1)));
            }
          }
        }
      });
      /**
       * 
       */


      _this.LandlordsSocket.on("regression", function (t) {
        t = _this.changeResultJSON_Function(t);
        cc.log("断线重连", t);

        if (t.result) {
          t = t.HUD;

          for (var i = 0; i < t.length; i++) {
            t[i].userId === _this.playerId ? (_this.Landlords.resetDF(t[i].DF), t[i].MyCarcd && (_this.Landlords.gameFinish = false, _this.Landlords.cardsSorting(t[i].MyCarcd, true)), _this.Landlords.publicCard(t[i].tong_yi_pai)) : _this.Landlords.setCardLength(t[i].userId, t[i].carcd_length), 2 === t[i].Landlord && _this.Landlords.resetLandlords(t[i].userId, t[i]["double"]);
          }

          if (0 == _this.seatId) {
            e: for (var _i = 0; _i < t.length; _i++) {
              if (0 == t[_i].seatId) {
                _this.Landlords.teShuChuPai(t[_i].carcd);

                for (var n = 0; n < t.length; n++) {
                  if (1 == t[n].seatId) {
                    0 == t[n].carcd.length ? _this.Landlords.otherPlayerNo(t[n].userId) : _this.Landlords.otherPlayerOutCard(t[n].carcd, t[n].userId, t[n].carcd.length);

                    for (var o = 0; o < t.length; o++) {
                      if (2 == t[o].seatId) {
                        0 == t[o].carcd.length ? _this.Landlords.otherPlayerNo(t[o].userId) : _this.Landlords.otherPlayerOutCard(t[o].carcd, t[o].userId, t[o].carcd.length);
                        break e;
                      }
                    }
                  }
                }
              }
            }
          } else if (1 == _this.seatId) {
            e: for (var _i2 = 0; _i2 < t.length; _i2++) {
              if (1 == t[_i2].seatId) {
                _this.Landlords.teShuChuPai(t[_i2].carcd);

                for (var _n = 0; _n < t.length; _n++) {
                  if (2 == t[_n].seatId) {
                    0 == t[_n].carcd.length ? _this.Landlords.otherPlayerNo(t[_n].userId) : _this.Landlords.otherPlayerOutCard(t[_n].carcd, t[_n].userId, t[_n].carcd.length);

                    for (var _o = 0; _o < t.length; _o++) {
                      if (0 == t[_o].seatId) {
                        0 == t[_o].carcd.length ? _this.Landlords.otherPlayerNo(t[_o].userId) : _this.Landlords.otherPlayerOutCard(t[_o].carcd, t[_o].userId, t[_o].carcd.length);
                        break e;
                      }
                    }
                  }
                }
              }
            }
          } else e: for (var _i3 = 0; _i3 < t.length; _i3++) {
            if (2 == t[_i3].seatId) {
              _this.Landlords.teShuChuPai(t[_i3].carcd);

              for (var _n2 = 0; _n2 < t.length; _n2++) {
                if (0 == t[_n2].seatId) {
                  0 == t[_n2].carcd.length ? _this.Landlords.otherPlayerNo(t[_n2].userId) : _this.Landlords.otherPlayerOutCard(t[_n2].carcd, t[_n2].userId, t[_n2].carcd.length);

                  for (var _o2 = 0; _o2 < t.length; _o2++) {
                    if (1 == t[_o2].seatId) {
                      0 == t[_o2].carcd.length ? _this.Landlords.otherPlayerNo(t[_o2].userId) : _this.Landlords.otherPlayerOutCard(t[_o2].carcd, t[_o2].userId, t[_o2].carcd.length);
                      break e;
                    }
                  }
                }
              }
            }
          } // for (let i = 0; i < t.length; i++) "undefined" != typeof t[i].qiang ? t[i].Pgup != -1 && (1 == t[i].qiang ? this.Landlords.playerNowState(t[i].userId, "抢地主", null, null) : this.Landlords.playerNowState(t[i].userId, "不抢", null, null)) : 0 == t[i].carcd.length && this.Landlords.playerNowState(t[i].userId, "不出", null, null);
          // for (let i = 0; i < t.length; i++) 20 === t[i].Mytime ? this.Landlords.playState(t[i].userId, t[i].time) : 15 === t[i].Mytime && this.Landlords.robLandlord(t[i].time, t[i].userId)


          for (var _i4 = 0; _i4 < t.length; _i4++) {
            if (15 === t[_i4].Mytime) {
              console.log(t[_i4].userId, _this.Landlords.pInfo.playerId);

              _this.Landlords.playState(t[_i4].userId, t[_i4].time);
            }
          }
        }

        _this.Landlords.chongLian = true;
      });

      _this.LandlordsSocket.on("publicCarcd", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        _this.Landlords.resetDF(result.points);
      });

      try {
        _this.LandlordsSocket.emit("getUer", {
          tableId: _this.tableId,
          seatId: _this.seatId,
          playerId: _this.playerId
        });

        _this.LandlordsSocket.emit("loadedFinish", {
          ready: 0,
          tableId: _this.tableId,
          seatId: _this.seatId,
          playerId: _this.playerId
        });

        _this.LandlordsSocket.emit("joinTableroom", {
          tableId: _this.tableId,
          seatId: _this.seatId,
          userId: _this.playerId
        });
      } catch (error) {}

      ;
    };
    /**
     * 
     */


    this.setLobbyMainObj_Function = function (scene) {
      _this.lobbyMain = scene;
      _this.lobbyMainSocket = scene.getComponent("LobbyMain").netWork.socket;
    };
    /**
     * 
     */


    this.setruningObj_Function = function (scene) {
      _this.Landlords = scene;
    };
    /**
     * 
     */


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

module.exports = RuningNetWork;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxSdW5pbmdcXFJ1bmluZ05ldFdvcmsuanMiXSwibmFtZXMiOlsiUnVuaW5nTmV0V29yayIsImdldEluc3RhbnQiLCJfaW5zdGFuY2UiLCJ1bmRlZmluZWQiLCJTaW5nbGUiLCJsb2JieU1haW4iLCJSdW5pbmciLCJSdW5pbmdTb2NrZXQiLCJwbGF5ZXJJbmZvIiwidGFibGVJZCIsInNlYXRJZCIsInBsYXllckhlYWQiLCJwbGF5ZXJMaXN0Iiwicm9vbUJldCIsImRpc2Nvbm5lY3RlZCIsIlJ1bmluZ0RhdGEiLCJnYW1lRXhpdCIsImNvdW50IiwiaW5pdCIsInJlcXVpcmUiLCJsb2dpbkdhbWVfRnVuY3Rpb24iLCJpcCIsInByb3QiLCJwbGF5ZXJJZCIsInNpZ24iLCJnYW1lTmFtZSIsImdhbWVEaXNjb25uZWN0IiwiY2MiLCJsb2ciLCJzZXRUaW1lb3V0IiwiZmluZCIsImdldENvbXBvbmVudCIsIlFpZUh1YW5TY2VuZV9ub3JtYWwiLCJzdGFydEdhbWVGdW5jdGlvbiIsInNvY2tldCIsInN5cyIsImlzTmF0aXZlIiwiTGFuZGxvcmRzU29ja2V0IiwiU29ja2V0SU8iLCJjb25uZWN0Iiwib24iLCJuZXRFcnIiLCJyZXQiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJpZCIsImdhbWV0eXBlIiwiY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiIsIkxhbmRsb3JkcyIsInRpcHNDbGlja0NhbGxCYWNrIiwiY29kZSIsImJ0bl9PdXRDYXJkIiwiYWN0aXZlIiwibmV0V29yayIsImFycmF5IiwidXNlcklkIiwicEluZm8iLCJlcnJvciIsInJlc3VsdGlkIiwicGxheWVyQ29pbiIsIk9iaiIsInNjb3JlIiwiYmV0IiwibG9iYnlNYWluU29ja2V0IiwiZGlzY29ubmVjdCIsInJvb21pZCIsInJlbW92ZUxpc3RlbmVyIiwiUmVzdWx0Q29kZSIsIlJlc3VsdERhdGEiLCJ1c2VyTGlzdCIsInRheCIsImFkZFNjb3JlIiwiYWRkc2NvcmUiLCJyZXNldERGIiwicG9pbnRzIiwiTGFuZGxvcmRzRGF0YSIsIkxhbmRsb3Jkc05ldFdvcmsiLCJtc2ciLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJleGl0UmVhZHkiLCJzdHJpbmciLCJ0IiwiY29tX01lc3NhZ2VCb3giLCJkaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbiIsInJlc3VsdCIsImkiLCJkYXRhIiwibGVuZ3RoIiwib3RoZXJFbnRlclJvb20iLCJuaWNrbmFtZSIsImhlYWRpbWd1cmwiLCJzZXRNeVNlYXQiLCJjb25zb2xlIiwiTm8xIiwiY2FsbExhbmRsb2FkcyIsInNlY29uZCIsInJvYkxhbmRsb3JkIiwicWlhbmdEaVpodSIsInNjaGVkdWxlT25jZSIsImdhbWVGaW5pc2giLCJwbGF5U3RhdGUiLCJvdGhlclBsYXllck91dENhcmQiLCJjYXJjZCIsInhpVG9uZ091dENhcmQiLCJwbGF5ZXJOb3dTdGF0ZSIsIkV4cGxhaW4iLCJzb2VyeSIsIm5vdENvbmZvcm1SdWxlcyIsIndpbm5lciIsIldpbm5lciIsImd1YW5tZW4iLCJndWFuX21lbl90eXBlIiwiYmFvcGVpIiwiYmFvX3BlaSIsInNldHRsZW1lbnQiLCJleGl0QnRuIiwicmVtb3ZlQWxsU3RhdGUiLCJwbGF5ZXJDYXJkcyIsInRlU2h1Q2h1UGFpIiwidHVvR3VhblN0YXRlIiwicmVzbHV0IiwiY2FyZHNTb3J0aW5nIiwicGxheWVyT3V0Um9vbSIsImNodW5UaWFuQW5pbWF0aW9uIiwiZGxpc3QiLCJyZXMiLCJzZWF0Iiwic2VhdF9pZCIsInBiX0xvd2VyIiwiZXhjaGFuZ2VSYXRlIiwidG9GaXhlZCIsIm5kIiwiYWRkX3Njb3JlIiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJmYWRlSW4iLCJmYWRlT3V0Iiwib3RoZXJUd29SIiwib3RoZXJPbmVMIiwiSFVEIiwiREYiLCJNeUNhcmNkIiwicHVibGljQ2FyZCIsInRvbmdfeWlfcGFpIiwic2V0Q2FyZExlbmd0aCIsImNhcmNkX2xlbmd0aCIsIkxhbmRsb3JkIiwicmVzZXRMYW5kbG9yZHMiLCJlIiwibiIsIm90aGVyUGxheWVyTm8iLCJvIiwiTXl0aW1lIiwidGltZSIsImNob25nTGlhbiIsInJlYWR5Iiwic2V0TG9iYnlNYWluT2JqX0Z1bmN0aW9uIiwic2NlbmUiLCJzZXRydW5pbmdPYmpfRnVuY3Rpb24iLCJwYXJzZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsYUFBYSxHQUFJLFlBQVk7QUFDN0I7QUFDSjtBQUNBO0FBQ0ksV0FBU0MsVUFBVCxHQUFzQjtBQUNsQixRQUFJQyxTQUFKOztBQUNBLFFBQUlBLFNBQVMsS0FBS0MsU0FBbEIsRUFBNkI7QUFDekJELE1BQUFBLFNBQVMsR0FBRyxJQUFJRSxNQUFKLEVBQVo7QUFDSDs7QUFDRCxXQUFPRixTQUFQO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7OztBQUNJLFdBQVNFLE1BQVQsR0FBa0I7QUFBQTs7QUFDZCxTQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxDQUFDLENBQWhCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLENBQUMsQ0FBZjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLENBQWY7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUVBO0FBQ1I7QUFDQTs7QUFDUSxTQUFLQyxJQUFMLEdBQVksWUFBWTtBQUNwQixXQUFLVixVQUFMLEdBQWtCVyxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCbEIsVUFBeEM7QUFD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QUksQ0FBQ0EsT0FEeUI7QUFFdkNDLFVBQUFBLE1BQU0sRUFBRSxLQUFJLENBQUNBLE1BRjBCO0FBR3ZDOEMsVUFBQUEsTUFBTSxFQUFFLEtBQUksQ0FBQ2pDO0FBSDBCLFNBQTNDO0FBS0gsT0FqQkQsQ0FpQkUsT0FBT21DLEtBQVAsRUFBYyxDQUFFOztBQUFBO0FBQ3JCLEtBNVNEO0FBOFNBO0FBQ1I7QUFDQTs7O0FBQ1EsU0FBS29HLHdCQUFMLEdBQWdDLFVBQUFDLEtBQUssRUFBSTtBQUNyQyxNQUFBLEtBQUksQ0FBQzFKLFNBQUwsR0FBaUIwSixLQUFqQjtBQUNBLE1BQUEsS0FBSSxDQUFDL0YsZUFBTCxHQUF1QitGLEtBQUssQ0FBQ2hJLFlBQU4sQ0FBbUIsV0FBbkIsRUFBZ0N1QixPQUFoQyxDQUF3Q3BCLE1BQS9EO0FBQ0gsS0FIRDtBQUtBO0FBQ1I7QUFDQTs7O0FBQ1EsU0FBSzhILHFCQUFMLEdBQTZCLFVBQUFELEtBQUssRUFBSTtBQUNsQyxNQUFBLEtBQUksQ0FBQzlHLFNBQUwsR0FBaUI4RyxLQUFqQjtBQUNILEtBRkQ7QUFJQTtBQUNSO0FBQ0E7OztBQUNRLFNBQUsvRyx5QkFBTCxHQUFpQyxVQUFBTixHQUFHLEVBQUk7QUFDcEMsVUFBSWYsRUFBRSxDQUFDUSxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsZUFBT1EsSUFBSSxDQUFDcUgsS0FBTCxDQUFXdkgsR0FBWCxDQUFQO0FBQ0g7O0FBQ0QsYUFBT0EsR0FBUDtBQUNILEtBTEQ7O0FBTUEsU0FBS3hCLElBQUw7QUFDSDs7QUFDRCxTQUFPO0FBQ0hqQixJQUFBQSxVQUFVLEVBQUUsSUFBSUEsVUFBSjtBQURULEdBQVA7QUFHSCxDQWxlbUIsRUFBcEI7O0FBb2VBaUssTUFBTSxDQUFDQyxPQUFQLEdBQWlCbkssYUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDot5Hlvpflv6tTT0NLRVTpgJrorq9cclxuICovXHJcbmxldCBSdW5pbmdOZXRXb3JrID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICog5Y2V5L6L5qih5byPXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldEluc3RhbnQoKSB7XHJcbiAgICAgICAgbGV0IF9pbnN0YW5jZTtcclxuICAgICAgICBpZiAoX2luc3RhbmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgX2luc3RhbmNlID0gbmV3IFNpbmdsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpgLvovpHlsYJcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gU2luZ2xlKCkge1xyXG4gICAgICAgIHRoaXMubG9iYnlNYWluID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJ1bmluZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SdW5pbmdTb2NrZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50YWJsZUlkID0gLTE7XHJcbiAgICAgICAgdGhpcy5zZWF0SWQgPSAtMTtcclxuICAgICAgICB0aGlzLnBsYXllckhlYWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGxheWVyTGlzdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yb29tQmV0ID0gMTtcclxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUnVuaW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nYW1lRXhpdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliJ3lp4vljJZcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6L+b5YWl5ri45oiPXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5sb2dpbkdhbWVfRnVuY3Rpb24gPSAoaXAsIHByb3QsIHBsYXllcklkLCBzaWduKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXAgPSBpcDtcclxuICAgICAgICAgICAgdGhpcy5wcm90ID0gcHJvdDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJZCA9IHBsYXllcklkO1xyXG4gICAgICAgICAgICB0aGlzLnNpZ24gPSBzaWduO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZU5hbWUgPSBcIlJ1bmluZ1wiO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MubG9nKCfov5vlhaXot5Hlvpflv6s6JyArIGlwLCBwcm90LCBwbGF5ZXJJZCwgc2lnbik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9idXR0b25DdHJsXCIpLmdldENvbXBvbmVudChcIkxvYmJ5QnV0dG9uQ2xpY2tcIikuUWllSHVhblNjZW5lX25vcm1hbChcIlJ1bk1haW5cIik7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOW8gOWni+a4uOaIj1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lRnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBpcCA9IHRoaXMuaXA7XHJcbiAgICAgICAgICAgIGxldCBwcm90ID0gdGhpcy5wcm90O1xyXG4gICAgICAgICAgICBsZXQgcGxheWVySWQgPSB0aGlzLnBsYXllcklkO1xyXG4gICAgICAgICAgICBsZXQgc2lnbiA9IHRoaXMuc2lnbjtcclxuICAgICAgICAgICAgbGV0IHNvY2tldCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldCA9IFNvY2tldElPLmNvbm5lY3QoaXAgKyBcIjpcIiArIHByb3QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc29ja2V0ID0gcmVxdWlyZShcInNvY2tldC1pb1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0ID0gc29ja2V0KGlwICsgXCI6XCIgKyBwcm90KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJjb25uZWN0X2Vycm9yXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV0RXJyKCfnvZHnu5zov57mjqXplJnor6/vvIzor7fogZTns7vlrqLmnI0nKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcImNvbm5lY3RfdGltZW91dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ldEVycign572R57uc6L+e5o6l6ZSZ6K+v77yM6K+36IGU57O75a6i5pyNJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJjb25uZWN0ZWRcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygn5paX5Zyw5Li7572R57uc5bey6L+e5o6l77yM5Y+R6LW3bG9naW5HYW1lJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiTG9naW5HYW1lXCIsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWV0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNpZ246IHNpZ25cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbignVGlwc0NhcmRzUmVzdWx0JywgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKCflh7rniYzmj5DnpLrvvJonICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy50aXBzQ2xpY2tDYWxsQmFjayhyZXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKCdOb1B1c2hUaXBzQ2FyZHNSZXN1bHQnLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ+S4jeiDveWHuueJjOaPkOekuu+8micgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIGlmICghcmV0LmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5idG5fT3V0Q2FyZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5uZXRXb3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwic2VuZENhcmRzQXJyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5OiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5MYW5kbG9yZHMucEluZm8ucGxheWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUlkOiB0aGlzLnRhYmxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0SWQ6IHRoaXMuc2VhdElkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJsb2dpbkdhbWVSZXN1bHRcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygn6L+b5YWl6LeR5b6X5b+r77yMIOi/lOWbnua4uOaIj+S/oeaBrzonICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICByZXQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQucmVzdWx0aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbiA9IHJldC5PYmouc2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tQmV0ID0gcmV0Lk9iai5iZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2JieU1haW5Tb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJMb2dpblJvb21cIiwgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb29taWQ6IDFcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5yZW1vdmVMaXN0ZW5lcihcIkxvZ2luUm9vbVJlc3VsdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIkxvZ2luUm9vbVJlc3VsdFwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5SZXN1bHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlSWQgPSByZXQuUmVzdWx0RGF0YS50YWJsZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0SWQgPSByZXQuUmVzdWx0RGF0YS5zZWF0SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckxpc3QgPSByZXQuUmVzdWx0RGF0YS51c2VyTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGF4ID0gcmV0LlJlc3VsdERhdGEudGF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTY29yZSA9IHJldC5SZXN1bHREYXRhLmFkZHNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMucmVzZXRERihyZXQucG9pbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzRGF0YSA9IHJldC5SZXN1bHREYXRhLkxhbmRsb3Jkc0RhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc05ldFdvcmsoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICF0aGlzLmdhbWVFeGl0ICYmIHRoaXMubmV0RXJyKHJldC5tc2cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL+mUmeivr+S/oeaBr+W8ueadv1xyXG4gICAgICAgIHRoaXMubmV0RXJyID0gbXNnID0+IHtcclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJsYWNrRmFjZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5leGl0UmVhZHkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMuZXhpdFJlYWR5LmdldENoaWxkQnlOYW1lKFwibWVzc2FnZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBtc2c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBzb2NrZXTplb/ov55cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLkxhbmRsb3Jkc05ldFdvcmsgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCB0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUV4aXQgfHwgKHRoaXMuTGFuZGxvcmRzLmNvbV9NZXNzYWdlQm94LmFjdGl2ZSA9IHRydWUsIHRoaXMuTGFuZGxvcmRzLmRpc2Nvbm5lY3ROZXRXb3JrX0Z1bmN0aW9uKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwiSHVkc2hvd1wiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKCdIdWRzaG93fn5+fjonICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhW2ldICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhW2ldLnNlYXRJZCAhPSB0aGlzLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/orr7nva7lhbbku5bkurrnmoTkv6Hmga9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLm90aGVyRW50ZXJSb29tKHJlc3VsdC5kYXRhW2ldLm5pY2tuYW1lLCByZXN1bHQuZGF0YVtpXS5zY29yZSwgcmVzdWx0LmRhdGFbaV0uc2VhdElkLCByZXN1bHQuZGF0YVtpXS51c2VySWQsIHJlc3VsdC5kYXRhW2ldLmhlYWRpbWd1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/orr7nva7oh6rlt7HnmoTkv6Hmga9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnNldE15U2VhdChyZXN1bHQuZGF0YVtpXS5uaWNrbmFtZSwgcmVzdWx0LmRhdGFbaV0uc2NvcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwiTGFuZGxvcmRcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiqLlnLDkuLvvvJonICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lk5vMSAmJiByZXN1bHQudXNlcklkID09PSB0aGlzLnBsYXllcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lj6vlnLDkuLtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5jYWxsTGFuZGxvYWRzKHJlc3VsdC5zZWNvbmQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+aKouWcsOS4u1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnJvYkxhbmRsb3JkKHJlc3VsdC5zZWNvbmQsIHJlc3VsdC51c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMucWlhbmdEaVpodSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJMaXN0ZW5DYXJjZFwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNlY29uZCA9IHJlc3VsdC5zZWNvbmQgLSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5nYW1lRmluaXNoIHx8IHRoaXMuTGFuZGxvcmRzLnBsYXlTdGF0ZShyZXN1bHQudXNlcklkLCByZXN1bHQuc2Vjb25kKTtcclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwiQUNhcmNkXCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnVzZXJJZCAhPT0gdGhpcy5wbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyT3V0Q2FyZChyZXN1bHQuY2FyY2QsIHJlc3VsdC51c2VySWQsIDApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy54aVRvbmdPdXRDYXJkKHJlc3VsdC5jYXJjZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5wbGF5ZXJOb3dTdGF0ZShyZXN1bHQudXNlcklkLCByZXN1bHQuRXhwbGFpbiwgcmVzdWx0LmNhcmNkLCByZXN1bHRbXCJkb3VibGVcIl0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwiTXlDYXJjZFwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNeUNhcmNkXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5zb2VyeSB8fCByZXN1bHQucmVzdWx0IHx8IChjYy5sb2coXCLkuI3og73lh7pcIiksIHRoaXMuTGFuZGxvcmRzLm5vdENvbmZvcm1SdWxlcygpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIkNDVFZcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnBsYXllck5vd1N0YXRlKHJlc3VsdC51c2VySWQsIHJlc3VsdC5FeHBsYWluLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcInZpY3RvcnlcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmjqjpgIHnu5PmnpwnICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lubmVyID0gcmVzdWx0Lldpbm5lcjtcclxuICAgICAgICAgICAgICAgIGxldCBndWFubWVuID0gcmVzdWx0Lmd1YW5fbWVuX3R5cGU7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFvcGVpID0gcmVzdWx0LmJhb19wZWk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLkxhbmRsb3Jkcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMuc2V0dGxlbWVudCh3aW5uZXIsIGd1YW5tZW4sIGJhb3BlaSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5leGl0QnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyB9LCAyKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIk1pbmdjYXJjZFwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMucmVtb3ZlQWxsU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0LmNhcmNkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jYXJjZFtpXS51c2VySWQgPT0gdGhpcy5wbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5MYW5kbG9yZHMucGxheWVyQ2FyZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMueGlUb25nT3V0Q2FyZChyZXN1bHQuY2FyY2RbaV0uY2FyY2QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMudGVTaHVDaHVQYWkocmVzdWx0LmNhcmNkW2ldLmNhcmNkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyT3V0Q2FyZChyZXN1bHQuY2FyY2RbaV0uY2FyY2QsIHJlc3VsdC5jYXJjZFtpXS51c2VySWQsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5omY566hXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIkluVHVvR3VhblwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMudHVvR3VhblN0YXRlKHJlc3VsdC5yZXNsdXQsIHJlc3VsdC51c2VySWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDnjqnlrrbov5vlhaVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwicGxheUVudGVyXCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ+eOqeWutui/m+WFpeaWl+WcsOS4uz09PT09PT09PT09PT0nICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5vdGhlckVudGVyUm9vbShyZXN1bHQuUmVzdWx0RGF0YS5uaWNrbmFtZSwgcmVzdWx0LlJlc3VsdERhdGEuc2NvcmUsIHJlc3VsdC5SZXN1bHREYXRhLnNlYXRJZCwgcmVzdWx0LlJlc3VsdERhdGEudXNlcklkLCByZXN1bHQuUmVzdWx0RGF0YS5oZWFkaW1ndXJsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Y+R54mMXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcInNlbmRDYXJkXCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5leGl0QnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuTGFuZGxvcmRzLmdhbWVGaW5pc2ggPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLmdhbWVGaW5pc2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5jYXJkc1NvcnRpbmcocmVzdWx0LmNhcmNkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLmNhcmRzU29ydGluZyhyZXN1bHQuY2FyY2QsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIlBsYXllck91dFwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMucGxheWVyT3V0Um9vbShyZXN1bHQudXNlcklkKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJMYW5kbG9yZHNTb2NrZXRcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5pil5aSpXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIlNwcmluZ1wiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMuY2h1blRpYW5BbmltYXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Zyw5Li7XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIkxhbmRsb3JkX1Bva2VyXCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICAvL3Jlc3VsdCAmJiB0aGlzLkxhbmRsb3Jkcy5jaGVja0xhbmRsb3JkcyhyZXN1bHQudXNlcklkLCByZXN1bHQuY2FyY2QsIHJlc3VsdFtcImRvdWJsZVwiXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJzZW5kQm9vbVNjb3JlXCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGxpc3QgPSBbLi4ucmVzdWx0LnJlc107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGRsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlYXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkbGlzdFtpXS5zZWF0X2lkID09IHRoaXMuc2VhdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiZ29sZFwiKS5nZXRDaGlsZEJ5TmFtZShcImludGVncmFsXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IChkbGlzdFtpXS5zY29yZSAvIHRoaXMuTGFuZGxvcmRzLnBJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5kID0gdGhpcy5MYW5kbG9yZHMucGJfTG93ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJhY3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5kLmdldENoaWxkQnlOYW1lKFwibGJsXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IChkbGlzdFtpXS5hZGRfc2NvcmUgPj0gMCA/ICcrJyA6ICcnKSArIChkbGlzdFtpXS5hZGRfc2NvcmUgLyB0aGlzLkxhbmRsb3Jkcy5wSW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5kLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlSW4oMSksIGNjLmZhZGVPdXQoMSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWF0SWQgPT0gMCAmJiBkbGlzdFtpXS5zZWF0X2lkID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXQgPSB0aGlzLkxhbmRsb3Jkcy5vdGhlclR3b1I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWF0SWQgPT0gMCAmJiBkbGlzdFtpXS5zZWF0X2lkID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXQgPSB0aGlzLkxhbmRsb3Jkcy5vdGhlck9uZUw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWF0SWQgPT0gMSAmJiBkbGlzdFtpXS5zZWF0X2lkID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXQgPSB0aGlzLkxhbmRsb3Jkcy5vdGhlck9uZUw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWF0SWQgPT0gMSAmJiBkbGlzdFtpXS5zZWF0X2lkID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXQgPSB0aGlzLkxhbmRsb3Jkcy5vdGhlclR3b1I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWF0SWQgPT0gMiAmJiBkbGlzdFtpXS5zZWF0X2lkID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXQgPSB0aGlzLkxhbmRsb3Jkcy5vdGhlck9uZUw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWF0SWQgPT0gMiAmJiBkbGlzdFtpXS5zZWF0X2lkID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXQgPSB0aGlzLkxhbmRsb3Jkcy5vdGhlclR3b1I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhc2VhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdC5nZXRDaGlsZEJ5TmFtZShcImJnX25hbWVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJTY29yZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAoZGxpc3RbaV0uc2NvcmUgLyB0aGlzLkxhbmRsb3Jkcy5wSW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmQgPSBzZWF0LmdldENoaWxkQnlOYW1lKFwiYWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmQuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gKGRsaXN0W2ldLmFkZF9zY29yZSA+PSAwID8gJysnIDogJycpICsgKGRsaXN0W2ldLmFkZF9zY29yZSAvIHRoaXMuTGFuZGxvcmRzLnBJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5kLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlSW4oMSksIGNjLmZhZGVPdXQoMSkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJyZWdyZXNzaW9uXCIsIHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbih0KTtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuaWree6v+mHjei/nlwiLCB0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0LnJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHQgPSB0LkhVRDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHQubGVuZ3RoOyBpKyspIHRbaV0udXNlcklkID09PSB0aGlzLnBsYXllcklkID8gKHRoaXMuTGFuZGxvcmRzLnJlc2V0REYodFtpXS5ERiksIHRbaV0uTXlDYXJjZCAmJiAodGhpcy5MYW5kbG9yZHMuZ2FtZUZpbmlzaCA9IGZhbHNlLCB0aGlzLkxhbmRsb3Jkcy5jYXJkc1NvcnRpbmcodFtpXS5NeUNhcmNkLCB0cnVlKSksIHRoaXMuTGFuZGxvcmRzLnB1YmxpY0NhcmQodFtpXS50b25nX3lpX3BhaSkpIDogdGhpcy5MYW5kbG9yZHMuc2V0Q2FyZExlbmd0aCh0W2ldLnVzZXJJZCwgdFtpXS5jYXJjZF9sZW5ndGgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAyID09PSB0W2ldLkxhbmRsb3JkICYmIHRoaXMuTGFuZGxvcmRzLnJlc2V0TGFuZGxvcmRzKHRbaV0udXNlcklkLCB0W2ldW1wiZG91YmxlXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSB0aGlzLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlOiBmb3IgKGxldCBpID0gMDsgaSA8IHQubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSB0W2ldLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnRlU2h1Q2h1UGFpKHRbaV0uY2FyY2QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdC5sZW5ndGg7IG4rKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPT0gdFtuXS5zZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgPT0gdFtuXS5jYXJjZC5sZW5ndGggPyB0aGlzLkxhbmRsb3Jkcy5vdGhlclBsYXllck5vKHRbbl0udXNlcklkKSA6IHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyT3V0Q2FyZCh0W25dLmNhcmNkLCB0W25dLnVzZXJJZCwgdFtuXS5jYXJjZC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCB0Lmxlbmd0aDsgbysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgyID09IHRbb10uc2VhdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgPT0gdFtvXS5jYXJjZC5sZW5ndGggPyB0aGlzLkxhbmRsb3Jkcy5vdGhlclBsYXllck5vKHRbb10udXNlcklkKSA6IHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyT3V0Q2FyZCh0W29dLmNhcmNkLCB0W29dLnVzZXJJZCwgdFtvXS5jYXJjZC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKDEgPT0gdGhpcy5zZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZTogZm9yIChsZXQgaSA9IDA7IGkgPCB0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPT0gdFtpXS5zZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy50ZVNodUNodVBhaSh0W2ldLmNhcmNkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHQubGVuZ3RoOyBuKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgyID09IHRbbl0uc2VhdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwID09IHRbbl0uY2FyY2QubGVuZ3RoID8gdGhpcy5MYW5kbG9yZHMub3RoZXJQbGF5ZXJObyh0W25dLnVzZXJJZCkgOiB0aGlzLkxhbmRsb3Jkcy5vdGhlclBsYXllck91dENhcmQodFtuXS5jYXJjZCwgdFtuXS51c2VySWQsIHRbbl0uY2FyY2QubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgdC5sZW5ndGg7IG8rKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSB0W29dLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwID09IHRbb10uY2FyY2QubGVuZ3RoID8gdGhpcy5MYW5kbG9yZHMub3RoZXJQbGF5ZXJObyh0W29dLnVzZXJJZCkgOiB0aGlzLkxhbmRsb3Jkcy5vdGhlclBsYXllck91dENhcmQodFtvXS5jYXJjZCwgdFtvXS51c2VySWQsIHRbb10uY2FyY2QubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGU6IGZvciAobGV0IGkgPSAwOyBpIDwgdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDIgPT0gdFtpXS5zZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnRlU2h1Q2h1UGFpKHRbaV0uY2FyY2QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCB0Lmxlbmd0aDsgbisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IHRbbl0uc2VhdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgPT0gdFtuXS5jYXJjZC5sZW5ndGggPyB0aGlzLkxhbmRsb3Jkcy5vdGhlclBsYXllck5vKHRbbl0udXNlcklkKSA6IHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyT3V0Q2FyZCh0W25dLmNhcmNkLCB0W25dLnVzZXJJZCwgdFtuXS5jYXJjZC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IHQubGVuZ3RoOyBvKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMSA9PSB0W29dLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgPT0gdFtvXS5jYXJjZC5sZW5ndGggPyB0aGlzLkxhbmRsb3Jkcy5vdGhlclBsYXllck5vKHRbb10udXNlcklkKSA6IHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyT3V0Q2FyZCh0W29dLmNhcmNkLCB0W29dLnVzZXJJZCwgdFtvXS5jYXJjZC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHQubGVuZ3RoOyBpKyspIFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIHRbaV0ucWlhbmcgPyB0W2ldLlBndXAgIT0gLTEgJiYgKDEgPT0gdFtpXS5xaWFuZyA/IHRoaXMuTGFuZGxvcmRzLnBsYXllck5vd1N0YXRlKHRbaV0udXNlcklkLCBcIuaKouWcsOS4u1wiLCBudWxsLCBudWxsKSA6IHRoaXMuTGFuZGxvcmRzLnBsYXllck5vd1N0YXRlKHRbaV0udXNlcklkLCBcIuS4jeaKolwiLCBudWxsLCBudWxsKSkgOiAwID09IHRbaV0uY2FyY2QubGVuZ3RoICYmIHRoaXMuTGFuZGxvcmRzLnBsYXllck5vd1N0YXRlKHRbaV0udXNlcklkLCBcIuS4jeWHulwiLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHQubGVuZ3RoOyBpKyspIDIwID09PSB0W2ldLk15dGltZSA/IHRoaXMuTGFuZGxvcmRzLnBsYXlTdGF0ZSh0W2ldLnVzZXJJZCwgdFtpXS50aW1lKSA6IDE1ID09PSB0W2ldLk15dGltZSAmJiB0aGlzLkxhbmRsb3Jkcy5yb2JMYW5kbG9yZCh0W2ldLnRpbWUsIHRbaV0udXNlcklkKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDE1ID09PSB0W2ldLk15dGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codFtpXS51c2VySWQsIHRoaXMuTGFuZGxvcmRzLnBJbmZvLnBsYXllcklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnBsYXlTdGF0ZSh0W2ldLnVzZXJJZCwgdFtpXS50aW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLmNob25nTGlhbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwicHVibGljQ2FyY2RcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnJlc2V0REYocmVzdWx0LnBvaW50cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJnZXRVZXJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlSWQ6IHRoaXMudGFibGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBzZWF0SWQ6IHRoaXMuc2VhdElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllcklkOiB0aGlzLnBsYXllcklkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJsb2FkZWRGaW5pc2hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWR5OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlSWQ6IHRoaXMudGFibGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBzZWF0SWQ6IHRoaXMuc2VhdElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllcklkOiB0aGlzLnBsYXllcklkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJqb2luVGFibGVyb29tXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZUlkOiB0aGlzLnRhYmxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhdElkOiB0aGlzLnNlYXRJZCxcclxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMucGxheWVySWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge307XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXRMb2JieU1haW5PYmpfRnVuY3Rpb24gPSBzY2VuZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9iYnlNYWluID0gc2NlbmU7XHJcbiAgICAgICAgICAgIHRoaXMubG9iYnlNYWluU29ja2V0ID0gc2NlbmUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0cnVuaW5nT2JqX0Z1bmN0aW9uID0gc2NlbmUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3JkcyA9IHNjZW5lO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiA9IHJldCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW50OiBuZXcgZ2V0SW5zdGFudCgpXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJ1bmluZ05ldFdvcms7Il19