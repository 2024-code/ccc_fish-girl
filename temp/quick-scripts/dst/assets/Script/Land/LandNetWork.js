
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Land/LandNetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1c8fcv93olPTaz0+il0WcPL', 'LandNetWork');
// Script/Land/LandNetWork.js

"use strict";

/**
 * 斗地主SOCKET通讯
 */
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
    this.tableId = -1;
    this.seatId = -1;
    this.playerHead = null;
    this.playerList = null;
    this.roomBet = 1;
    this.disconnected = false;
    this.LandlordsData = null;
    this.gameExit = false;
    this.count = 0;

    this.init = function () {
      _this.playerInfo = require("PlayerInfo").getInstant;
    };

    this.loginGame_Function = function (ip, prot, playerId, sign) {
      _this.ip = ip;
      _this.prot = prot;
      _this.playerId = playerId;
      _this.sign = sign;
      _this.playerInfo.gameName = "Land";
      _this.playerInfo.gameDisconnect = false;
      setTimeout(function () {
        cc.log('开始加载斗地主场景');
        cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("LandMain");
      }, 1000);
    };

    this.startGameFunction = function () {
      var ip = _this.ip;
      var prot = _this.prot;
      var playerId = _this.playerId;
      var sign = _this.sign;

      if (cc.sys.isNative) {
        _this.LandlordsSocket = SocketIO.connect(ip + ":" + prot);
      } else {
        var socket = require("socket-io");

        _this.LandlordsSocket = socket(ip + ":" + prot);
      }

      _this.LandlordsSocket.on("connect_error", function () {
        _this.netErr('网络连接错误，请联系客服');
      });

      _this.LandlordsSocket.on("connect_timeout", function () {
        _this.netErr('网络连接错误，请联系客服');
      });

      _this.LandlordsSocket.on("connected", function (ret) {
        cc.log('斗地主网络已连接，发起loginGame');

        _this.LandlordsSocket.emit("LoginGame", JSON.stringify({
          userid: playerId,
          gametype: 1,
          sign: sign
        }));
      });

      _this.LandlordsSocket.on('TipsCardsResult', function (ret) {
        ret = _this.changeResultJSON_Function(ret);
        cc.log('出牌提示：' + JSON.stringify(ret));

        _this.Landlords.tipsClickCallBack(ret);
      });

      _this.LandlordsSocket.on("loginGameResult", function (ret) {
        ret = _this.changeResultJSON_Function(ret);
        cc.log('loginGameResult + LoginRoom:' + JSON.stringify(ret));

        if (ret.resultid) {
          _this.playerInfo.playerCoin = ret.Obj.score;
          _this.roomBet = ret.Obj.bet;

          _this.lobbyMainSocket.disconnect();

          _this.LandlordsSocket.emit("LoginRoom", JSON.stringify({
            roomid: 1
          }));

          if (!cc.sys.isNative) _this.LandlordsSocket.removeListener("LoginRoomResult");

          _this.LandlordsSocket.on("LoginRoomResult", function (ret) {
            ret = _this.changeResultJSON_Function(ret);

            if (ret.ResultCode) {
              _this.tableId = ret.ResultData.tableId;
              _this.seatId = ret.ResultData.seatId;
              _this.playerList = ret.ResultData.userList;
              _this.tax = ret.ResultData.tax;
              _this.addScore = ret.ResultData.addscore;
              _this.LandlordsData = ret.ResultData.LandlordsData;

              _this.LandlordsNetWork();
            }
          });
        } else {
          !_this.gameExit && _this.netErr(ret.msg);
        }
      });
    }; //错误信息弹板


    this.netErr = function (msg) {
      _this.Landlords.node.getChildByName("blackFace").active = true;
      _this.Landlords.exitReady.active = true;
      _this.Landlords.exitReady.getChildByName("message").getComponent("cc.Label").string = msg;
    }; //长连监听


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
       * 抢地主 叫地主
       */


      _this.LandlordsSocket.on("Landlord", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        console.log('landlord', JSON.stringify(result));

        if (result.No1 && result.userId === _this.playerId) {
          _this.Landlords.callLandloads(result.second);
        } else {
          _this.Landlords.robLandlord(result.second, result.userId);
        }

        _this.Landlords.qiangDiZhu = true;
      });
      /**
       * 是否到自己出牌
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

        result.soery || result.result || (cc.log("不能出"), _this.Landlords.notConformRules());
      });
      /**
       * 广播 出不出 要不要地主
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

        var winner = result.Winner;

        _this.Landlords.scheduleOnce(function () {
          _this.Landlords.settlement(winner, result.chun_tian);

          _this.Landlords.exitBtn.active = true;
        }, 2);
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
        cc.log('其它玩家进入' + JSON.stringify(ret));

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

      _this.LandlordsSocket.on("sendCardsArrResult", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        console.log("sendCardsArrResult", result);

        if (result) {
          _this.Landlords.count = 0;
        } else {
          for (var e = 0; e < _this.Landlords.playerCards.length; e++) {
            if (_this.Landlords.playerCards[e].position.y == _this.Landlords.movedY) {
              _this.Landlords.playerCards[e].getComponent("Cards").moveCard();
            }
          }

          _this.Landlords.notConformRules();

          _this.Landlords.btn_OutCard.active = true;

          _this.Landlords.timer(1, null);

          _this.Landlords.btnPlayerState = _this.Landlords.btn_OutCard;
        }
      });

      _this.LandlordsSocket.on("PlayerOut", function (ret) {
        var result = _this.changeResultJSON_Function(ret);

        _this.Landlords.playerOutRoom(result.userId);
      });

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
        var result = _this.changeResultJSON_Function(ret);

        result && _this.Landlords.checkLandlords(result.userId, result.carcd, result["double"]);
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
          }

          for (var _i4 = 0; _i4 < t.length; _i4++) {
            "undefined" != typeof t[_i4].qiang ? t[_i4].Pgup != -1 && (1 == t[_i4].qiang ? _this.Landlords.playerNowState(t[_i4].userId, "抢地主", null, null) : _this.Landlords.playerNowState(t[_i4].userId, "不抢", null, null)) : 0 == t[_i4].carcd.length && _this.Landlords.playerNowState(t[_i4].userId, "不出", null, null);
          }

          for (var _i5 = 0; _i5 < t.length; _i5++) {
            20 === t[_i5].Mytime ? _this.Landlords.playState(t[_i5].userId, t[_i5].time) : 15 === t[_i5].Mytime && _this.Landlords.robLandlord(t[_i5].time, t[_i5].userId);
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
      } catch (error) {
        console.log(loadedFinish, error);
      }

      ; // this.LandlordsSocket.on("OverUserPush", ret => {
      //     let result = this.changeResultJSON_Function(ret);
      //     console.log('overUserpush', result);
      //     let st = new Set(result.over_user_list);
      //     this.Landlords.btn_match_again.active = !st.has(this.playerId);
      // })
    };
    /**
     * 设置场景对象
     */


    this.setLobbyMainObj_Function = function (scene) {
      _this.lobbyMain = scene;
      _this.lobbyMainSocket = scene.getComponent("LobbyMain").netWork.socket;
    };
    /**
     * 
     */


    this.setLandlordsObj_Function = function (scene) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMYW5kXFxMYW5kTmV0V29yay5qcyJdLCJuYW1lcyI6WyJMYW5kTmV0V29yayIsImdldEluc3RhbnQiLCJfaW5zdGFuY2UiLCJ1bmRlZmluZWQiLCJTaW5nbGUiLCJsb2JieU1haW4iLCJMYW5kbG9yZHMiLCJMYW5kbG9yZHNTb2NrZXQiLCJwbGF5ZXJJbmZvIiwidGFibGVJZCIsInNlYXRJZCIsInBsYXllckhlYWQiLCJwbGF5ZXJMaXN0Iiwicm9vbUJldCIsImRpc2Nvbm5lY3RlZCIsIkxhbmRsb3Jkc0RhdGEiLCJnYW1lRXhpdCIsImNvdW50IiwiaW5pdCIsInJlcXVpcmUiLCJsb2dpbkdhbWVfRnVuY3Rpb24iLCJpcCIsInByb3QiLCJwbGF5ZXJJZCIsInNpZ24iLCJnYW1lTmFtZSIsImdhbWVEaXNjb25uZWN0Iiwic2V0VGltZW91dCIsImNjIiwibG9nIiwiZmluZCIsImdldENvbXBvbmVudCIsIlFpZUh1YW5TY2VuZV9ub3JtYWwiLCJzdGFydEdhbWVGdW5jdGlvbiIsInN5cyIsImlzTmF0aXZlIiwiU29ja2V0SU8iLCJjb25uZWN0Iiwic29ja2V0Iiwib24iLCJuZXRFcnIiLCJyZXQiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJpZCIsImdhbWV0eXBlIiwiY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiIsInRpcHNDbGlja0NhbGxCYWNrIiwicmVzdWx0aWQiLCJwbGF5ZXJDb2luIiwiT2JqIiwic2NvcmUiLCJiZXQiLCJsb2JieU1haW5Tb2NrZXQiLCJkaXNjb25uZWN0Iiwicm9vbWlkIiwicmVtb3ZlTGlzdGVuZXIiLCJSZXN1bHRDb2RlIiwiUmVzdWx0RGF0YSIsInVzZXJMaXN0IiwidGF4IiwiYWRkU2NvcmUiLCJhZGRzY29yZSIsIkxhbmRsb3Jkc05ldFdvcmsiLCJtc2ciLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhY3RpdmUiLCJleGl0UmVhZHkiLCJzdHJpbmciLCJ0IiwiY29tX01lc3NhZ2VCb3giLCJkaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbiIsInJlc3VsdCIsImkiLCJkYXRhIiwibGVuZ3RoIiwib3RoZXJFbnRlclJvb20iLCJuaWNrbmFtZSIsInVzZXJJZCIsImhlYWRpbWd1cmwiLCJzZXRNeVNlYXQiLCJjb25zb2xlIiwiTm8xIiwiY2FsbExhbmRsb2FkcyIsInNlY29uZCIsInJvYkxhbmRsb3JkIiwicWlhbmdEaVpodSIsInNjaGVkdWxlT25jZSIsImdhbWVGaW5pc2giLCJwbGF5U3RhdGUiLCJvdGhlclBsYXllck91dENhcmQiLCJjYXJjZCIsInhpVG9uZ091dENhcmQiLCJwbGF5ZXJOb3dTdGF0ZSIsIkV4cGxhaW4iLCJzb2VyeSIsIm5vdENvbmZvcm1SdWxlcyIsIndpbm5lciIsIldpbm5lciIsInNldHRsZW1lbnQiLCJjaHVuX3RpYW4iLCJleGl0QnRuIiwicmVtb3ZlQWxsU3RhdGUiLCJwbGF5ZXJDYXJkcyIsInRlU2h1Q2h1UGFpIiwidHVvR3VhblN0YXRlIiwicmVzbHV0IiwiY2FyZHNTb3J0aW5nIiwiZSIsInBvc2l0aW9uIiwieSIsIm1vdmVkWSIsIm1vdmVDYXJkIiwiYnRuX091dENhcmQiLCJ0aW1lciIsImJ0blBsYXllclN0YXRlIiwicGxheWVyT3V0Um9vbSIsImNodW5UaWFuQW5pbWF0aW9uIiwiY2hlY2tMYW5kbG9yZHMiLCJIVUQiLCJyZXNldERGIiwiREYiLCJNeUNhcmNkIiwicHVibGljQ2FyZCIsInRvbmdfeWlfcGFpIiwic2V0Q2FyZExlbmd0aCIsImNhcmNkX2xlbmd0aCIsIkxhbmRsb3JkIiwicmVzZXRMYW5kbG9yZHMiLCJuIiwib3RoZXJQbGF5ZXJObyIsIm8iLCJxaWFuZyIsIlBndXAiLCJNeXRpbWUiLCJ0aW1lIiwiY2hvbmdMaWFuIiwicG9pbnRzIiwicmVhZHkiLCJlcnJvciIsImxvYWRlZEZpbmlzaCIsInNldExvYmJ5TWFpbk9ial9GdW5jdGlvbiIsInNjZW5lIiwibmV0V29yayIsInNldExhbmRsb3Jkc09ial9GdW5jdGlvbiIsInBhcnNl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TUFBL0Q7QUFDSCxLQUhEO0FBS0E7QUFDUjtBQUNBOzs7QUFDUSxTQUFLNEcsd0JBQUwsR0FBZ0MsVUFBQUYsS0FBSyxFQUFJO0FBQ3JDLE1BQUEsS0FBSSxDQUFDMUksU0FBTCxHQUFpQjBJLEtBQWpCO0FBQ0gsS0FGRDtBQUlBO0FBQ1I7QUFDQTs7O0FBQ1EsU0FBS2pHLHlCQUFMLEdBQWlDLFVBQUFOLEdBQUcsRUFBSTtBQUNwQyxVQUFJYixFQUFFLENBQUNNLEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQixlQUFPUSxJQUFJLENBQUN3RyxLQUFMLENBQVcxRyxHQUFYLENBQVA7QUFDSDs7QUFDRCxhQUFPQSxHQUFQO0FBQ0gsS0FMRDs7QUFNQSxTQUFLdkIsSUFBTDtBQUNIOztBQUNELFNBQU87QUFDSGpCLElBQUFBLFVBQVUsRUFBRSxJQUFJQSxVQUFKO0FBRFQsR0FBUDtBQUdILENBbmFpQixFQUFsQjs7QUFxYUFtSixNQUFNLENBQUNDLE9BQVAsR0FBaUJySixXQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOaWl+WcsOS4u1NPQ0tFVOmAmuiur1xyXG4gKi9cclxubGV0IExhbmROZXRXb3JrID0gKCgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGdldEluc3RhbnQoKSB7XHJcbiAgICAgICAgbGV0IF9pbnN0YW5jZTtcclxuICAgICAgICBpZiAoX2luc3RhbmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgX2luc3RhbmNlID0gbmV3IFNpbmdsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFNpbmdsZSgpIHtcclxuICAgICAgICB0aGlzLmxvYmJ5TWFpbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MYW5kbG9yZHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFibGVJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuc2VhdElkID0gLTE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBsYXllckxpc3QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucm9vbUJldCA9IDE7XHJcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkxhbmRsb3Jkc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2FtZUV4aXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubG9naW5HYW1lX0Z1bmN0aW9uID0gKGlwLCBwcm90LCBwbGF5ZXJJZCwgc2lnbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlwID0gaXA7XHJcbiAgICAgICAgICAgIHRoaXMucHJvdCA9IHByb3Q7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySWQgPSBwbGF5ZXJJZDtcclxuICAgICAgICAgICAgdGhpcy5zaWduID0gc2lnbjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVOYW1lID0gXCJMYW5kXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lRGlzY29ubmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygn5byA5aeL5Yqg6L295paX5Zyw5Li75Zy65pmvJyk7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL2J1dHRvbkN0cmxcIikuZ2V0Q29tcG9uZW50KFwiTG9iYnlCdXR0b25DbGlja1wiKS5RaWVIdWFuU2NlbmVfbm9ybWFsKFwiTGFuZE1haW5cIik7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lRnVuY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpcCA9IHRoaXMuaXA7XHJcbiAgICAgICAgICAgIGxldCBwcm90ID0gdGhpcy5wcm90O1xyXG4gICAgICAgICAgICBsZXQgcGxheWVySWQgPSB0aGlzLnBsYXllcklkO1xyXG4gICAgICAgICAgICBsZXQgc2lnbiA9IHRoaXMuc2lnbjtcclxuXHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0ID0gU29ja2V0SU8uY29ubmVjdChpcCArIFwiOlwiICsgcHJvdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29ja2V0ID0gcmVxdWlyZShcInNvY2tldC1pb1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0ID0gc29ja2V0KGlwICsgXCI6XCIgKyBwcm90KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJjb25uZWN0X2Vycm9yXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV0RXJyKCfnvZHnu5zov57mjqXplJnor6/vvIzor7fogZTns7vlrqLmnI0nKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcImNvbm5lY3RfdGltZW91dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ldEVycign572R57uc6L+e5o6l6ZSZ6K+v77yM6K+36IGU57O75a6i5pyNJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJjb25uZWN0ZWRcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygn5paX5Zyw5Li7572R57uc5bey6L+e5o6l77yM5Y+R6LW3bG9naW5HYW1lJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiTG9naW5HYW1lXCIsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWV0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNpZ246IHNpZ25cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbignVGlwc0NhcmRzUmVzdWx0JywgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKCflh7rniYzmj5DnpLrvvJonICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy50aXBzQ2xpY2tDYWxsQmFjayhyZXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwibG9naW5HYW1lUmVzdWx0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygnbG9naW5HYW1lUmVzdWx0ICsgTG9naW5Sb29tOicgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQucmVzdWx0aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbiA9IHJldC5PYmouc2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tQmV0ID0gcmV0Lk9iai5iZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2JieU1haW5Tb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJMb2dpblJvb21cIiwgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb29taWQ6IDFcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5yZW1vdmVMaXN0ZW5lcihcIkxvZ2luUm9vbVJlc3VsdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIkxvZ2luUm9vbVJlc3VsdFwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5SZXN1bHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlSWQgPSByZXQuUmVzdWx0RGF0YS50YWJsZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0SWQgPSByZXQuUmVzdWx0RGF0YS5zZWF0SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckxpc3QgPSByZXQuUmVzdWx0RGF0YS51c2VyTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGF4ID0gcmV0LlJlc3VsdERhdGEudGF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTY29yZSA9IHJldC5SZXN1bHREYXRhLmFkZHNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNEYXRhID0gcmV0LlJlc3VsdERhdGEuTGFuZGxvcmRzRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzTmV0V29yaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIXRoaXMuZ2FtZUV4aXQgJiYgdGhpcy5uZXRFcnIocmV0Lm1zZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v6ZSZ6K+v5L+h5oGv5by55p2/XHJcbiAgICAgICAgdGhpcy5uZXRFcnIgPSBtc2cgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmxhY2tGYWNlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLmV4aXRSZWFkeS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5leGl0UmVhZHkuZ2V0Q2hpbGRCeU5hbWUoXCJtZXNzYWdlXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IG1zZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6ZW/6L+e55uR5ZCsXHJcbiAgICAgICAgdGhpcy5MYW5kbG9yZHNOZXRXb3JrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVFeGl0IHx8ICh0aGlzLkxhbmRsb3Jkcy5jb21fTWVzc2FnZUJveC5hY3RpdmUgPSB0cnVlLCB0aGlzLkxhbmRsb3Jkcy5kaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbigpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIkh1ZHNob3dcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygnSHVkc2hvd35+fn46JyArIEpTT04uc3RyaW5naWZ5KHJldCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YVtpXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YVtpXS5zZWF0SWQgIT0gdGhpcy5zZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6K6+572u5YW25LuW5Lq655qE5L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5vdGhlckVudGVyUm9vbShyZXN1bHQuZGF0YVtpXS5uaWNrbmFtZSwgcmVzdWx0LmRhdGFbaV0uc2NvcmUsIHJlc3VsdC5kYXRhW2ldLnNlYXRJZCwgcmVzdWx0LmRhdGFbaV0udXNlcklkLCByZXN1bHQuZGF0YVtpXS5oZWFkaW1ndXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6K6+572u6Ieq5bex55qE5L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5zZXRNeVNlYXQocmVzdWx0LmRhdGFbaV0ubmlja25hbWUsIHJlc3VsdC5kYXRhW2ldLnNjb3JlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5oqi5Zyw5Li7IOWPq+WcsOS4u1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJMYW5kbG9yZFwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xhbmRsb3JkJywgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lk5vMSAmJiByZXN1bHQudXNlcklkID09PSB0aGlzLnBsYXllcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMuY2FsbExhbmRsb2FkcyhyZXN1bHQuc2Vjb25kKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMucm9iTGFuZGxvcmQocmVzdWx0LnNlY29uZCwgcmVzdWx0LnVzZXJJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5xaWFuZ0RpWmh1ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5piv5ZCm5Yiw6Ieq5bex5Ye654mMXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIkxpc3RlbkNhcmNkXCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuc2Vjb25kID0gcmVzdWx0LnNlY29uZCAtIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLmdhbWVGaW5pc2ggfHwgdGhpcy5MYW5kbG9yZHMucGxheVN0YXRlKHJlc3VsdC51c2VySWQsIHJlc3VsdC5zZWNvbmQpO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJBQ2FyY2RcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudXNlcklkICE9PSB0aGlzLnBsYXllcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMub3RoZXJQbGF5ZXJPdXRDYXJkKHJlc3VsdC5jYXJjZCwgcmVzdWx0LnVzZXJJZCwgMCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnhpVG9uZ091dENhcmQocmVzdWx0LmNhcmNkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnBsYXllck5vd1N0YXRlKHJlc3VsdC51c2VySWQsIHJlc3VsdC5FeHBsYWluLCByZXN1bHQuY2FyY2QsIHJlc3VsdFtcImRvdWJsZVwiXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJNeUNhcmNkXCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuc29lcnkgfHwgcmVzdWx0LnJlc3VsdCB8fCAoY2MubG9nKFwi5LiN6IO95Ye6XCIpLCB0aGlzLkxhbmRsb3Jkcy5ub3RDb25mb3JtUnVsZXMoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOW5v+aSrSDlh7rkuI3lh7og6KaB5LiN6KaB5Zyw5Li7XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIkNDVFZcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnBsYXllck5vd1N0YXRlKHJlc3VsdC51c2VySWQsIHJlc3VsdC5FeHBsYWluLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcInZpY3RvcnlcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGxldCB3aW5uZXIgPSByZXN1bHQuV2lubmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5zZXR0bGVtZW50KHdpbm5lciwgcmVzdWx0LmNodW5fdGlhbilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5leGl0QnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIk1pbmdjYXJjZFwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMucmVtb3ZlQWxsU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0LmNhcmNkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jYXJjZFtpXS51c2VySWQgPT0gdGhpcy5wbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5MYW5kbG9yZHMucGxheWVyQ2FyZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMueGlUb25nT3V0Q2FyZChyZXN1bHQuY2FyY2RbaV0uY2FyY2QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMudGVTaHVDaHVQYWkocmVzdWx0LmNhcmNkW2ldLmNhcmNkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyT3V0Q2FyZChyZXN1bHQuY2FyY2RbaV0uY2FyY2QsIHJlc3VsdC5jYXJjZFtpXS51c2VySWQsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5omY566hXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcIkluVHVvR3VhblwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMudHVvR3VhblN0YXRlKHJlc3VsdC5yZXNsdXQsIHJlc3VsdC51c2VySWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDnjqnlrrbov5vlhaVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwicGxheUVudGVyXCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ+WFtuWug+eOqeWutui/m+WFpScgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLm90aGVyRW50ZXJSb29tKHJlc3VsdC5SZXN1bHREYXRhLm5pY2tuYW1lLCByZXN1bHQuUmVzdWx0RGF0YS5zY29yZSwgcmVzdWx0LlJlc3VsdERhdGEuc2VhdElkLCByZXN1bHQuUmVzdWx0RGF0YS51c2VySWQsIHJlc3VsdC5SZXN1bHREYXRhLmhlYWRpbWd1cmwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDlj5HniYxcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwic2VuZENhcmRcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLmV4aXRCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5MYW5kbG9yZHMuZ2FtZUZpbmlzaCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMuZ2FtZUZpbmlzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLmNhcmRzU29ydGluZyhyZXN1bHQuY2FyY2QsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMuY2FyZHNTb3J0aW5nKHJlc3VsdC5jYXJjZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwic2VuZENhcmRzQXJyUmVzdWx0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRDYXJkc0FyclJlc3VsdFwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLmNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZSA9IDA7IGUgPCB0aGlzLkxhbmRsb3Jkcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IGUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5MYW5kbG9yZHMucGxheWVyQ2FyZHNbZV0ucG9zaXRpb24ueSA9PSB0aGlzLkxhbmRsb3Jkcy5tb3ZlZFkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnBsYXllckNhcmRzW2VdLmdldENvbXBvbmVudChcIkNhcmRzXCIpLm1vdmVDYXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMubm90Q29uZm9ybVJ1bGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMuYnRuX091dENhcmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy50aW1lcigxLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5idG5QbGF5ZXJTdGF0ZSA9IHRoaXMuTGFuZGxvcmRzLmJ0bl9PdXRDYXJkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwiUGxheWVyT3V0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5wbGF5ZXJPdXRSb29tKHJlc3VsdC51c2VySWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzU29ja2V0Lm9uKFwiTGFuZGxvcmRzU29ja2V0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOaYpeWkqVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJTcHJpbmdcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLmNodW5UaWFuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWcsOS4u1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJMYW5kbG9yZF9Qb2tlclwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICYmIHRoaXMuTGFuZGxvcmRzLmNoZWNrTGFuZGxvcmRzKHJlc3VsdC51c2VySWQsIHJlc3VsdC5jYXJjZCwgcmVzdWx0W1wiZG91YmxlXCJdKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcInJlZ3Jlc3Npb25cIiwgdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHQpO1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi5pat57q/6YeN6L+eXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHQucmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdCA9IHQuSFVEO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdC5sZW5ndGg7IGkrKykgdFtpXS51c2VySWQgPT09IHRoaXMucGxheWVySWQgPyAodGhpcy5MYW5kbG9yZHMucmVzZXRERih0W2ldLkRGKSwgdFtpXS5NeUNhcmNkICYmICh0aGlzLkxhbmRsb3Jkcy5nYW1lRmluaXNoID0gZmFsc2UsIHRoaXMuTGFuZGxvcmRzLmNhcmRzU29ydGluZyh0W2ldLk15Q2FyY2QsIHRydWUpKSwgdGhpcy5MYW5kbG9yZHMucHVibGljQ2FyZCh0W2ldLnRvbmdfeWlfcGFpKSkgOiB0aGlzLkxhbmRsb3Jkcy5zZXRDYXJkTGVuZ3RoKHRbaV0udXNlcklkLCB0W2ldLmNhcmNkX2xlbmd0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDIgPT09IHRbaV0uTGFuZGxvcmQgJiYgdGhpcy5MYW5kbG9yZHMucmVzZXRMYW5kbG9yZHModFtpXS51c2VySWQsIHRbaV1bXCJkb3VibGVcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgwID09IHRoaXMuc2VhdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGU6IGZvciAobGV0IGkgPSAwOyBpIDwgdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IHRbaV0uc2VhdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMudGVTaHVDaHVQYWkodFtpXS5jYXJjZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCB0Lmxlbmd0aDsgbisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMSA9PSB0W25dLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCA9PSB0W25dLmNhcmNkLmxlbmd0aCA/IHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyTm8odFtuXS51c2VySWQpIDogdGhpcy5MYW5kbG9yZHMub3RoZXJQbGF5ZXJPdXRDYXJkKHRbbl0uY2FyY2QsIHRbbl0udXNlcklkLCB0W25dLmNhcmNkLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IHQubGVuZ3RoOyBvKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDIgPT0gdFtvXS5zZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCA9PSB0W29dLmNhcmNkLmxlbmd0aCA/IHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyTm8odFtvXS51c2VySWQpIDogdGhpcy5MYW5kbG9yZHMub3RoZXJQbGF5ZXJPdXRDYXJkKHRbb10uY2FyY2QsIHRbb10udXNlcklkLCB0W29dLmNhcmNkLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoMSA9PSB0aGlzLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlOiBmb3IgKGxldCBpID0gMDsgaSA8IHQubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMSA9PSB0W2ldLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGFuZGxvcmRzLnRlU2h1Q2h1UGFpKHRbaV0uY2FyY2QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdC5sZW5ndGg7IG4rKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDIgPT0gdFtuXS5zZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgPT0gdFtuXS5jYXJjZC5sZW5ndGggPyB0aGlzLkxhbmRsb3Jkcy5vdGhlclBsYXllck5vKHRbbl0udXNlcklkKSA6IHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyT3V0Q2FyZCh0W25dLmNhcmNkLCB0W25dLnVzZXJJZCwgdFtuXS5jYXJjZC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCB0Lmxlbmd0aDsgbysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IHRbb10uc2VhdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgPT0gdFtvXS5jYXJjZC5sZW5ndGggPyB0aGlzLkxhbmRsb3Jkcy5vdGhlclBsYXllck5vKHRbb10udXNlcklkKSA6IHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyT3V0Q2FyZCh0W29dLmNhcmNkLCB0W29dLnVzZXJJZCwgdFtvXS5jYXJjZC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgZTogZm9yIChsZXQgaSA9IDA7IGkgPCB0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMiA9PSB0W2ldLnNlYXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MYW5kbG9yZHMudGVTaHVDaHVQYWkodFtpXS5jYXJjZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHQubGVuZ3RoOyBuKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gdFtuXS5zZWF0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCA9PSB0W25dLmNhcmNkLmxlbmd0aCA/IHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyTm8odFtuXS51c2VySWQpIDogdGhpcy5MYW5kbG9yZHMub3RoZXJQbGF5ZXJPdXRDYXJkKHRbbl0uY2FyY2QsIHRbbl0udXNlcklkLCB0W25dLmNhcmNkLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgdC5sZW5ndGg7IG8rKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxID09IHRbb10uc2VhdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCA9PSB0W29dLmNhcmNkLmxlbmd0aCA/IHRoaXMuTGFuZGxvcmRzLm90aGVyUGxheWVyTm8odFtvXS51c2VySWQpIDogdGhpcy5MYW5kbG9yZHMub3RoZXJQbGF5ZXJPdXRDYXJkKHRbb10uY2FyY2QsIHRbb10udXNlcklkLCB0W29dLmNhcmNkLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdC5sZW5ndGg7IGkrKykgXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgdFtpXS5xaWFuZyA/IHRbaV0uUGd1cCAhPSAtMSAmJiAoMSA9PSB0W2ldLnFpYW5nID8gdGhpcy5MYW5kbG9yZHMucGxheWVyTm93U3RhdGUodFtpXS51c2VySWQsIFwi5oqi5Zyw5Li7XCIsIG51bGwsIG51bGwpIDogdGhpcy5MYW5kbG9yZHMucGxheWVyTm93U3RhdGUodFtpXS51c2VySWQsIFwi5LiN5oqiXCIsIG51bGwsIG51bGwpKSA6IDAgPT0gdFtpXS5jYXJjZC5sZW5ndGggJiYgdGhpcy5MYW5kbG9yZHMucGxheWVyTm93U3RhdGUodFtpXS51c2VySWQsIFwi5LiN5Ye6XCIsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdC5sZW5ndGg7IGkrKykgMjAgPT09IHRbaV0uTXl0aW1lID8gdGhpcy5MYW5kbG9yZHMucGxheVN0YXRlKHRbaV0udXNlcklkLCB0W2ldLnRpbWUpIDogMTUgPT09IHRbaV0uTXl0aW1lICYmIHRoaXMuTGFuZGxvcmRzLnJvYkxhbmRsb3JkKHRbaV0udGltZSwgdFtpXS51c2VySWQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5jaG9uZ0xpYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5vbihcInB1YmxpY0NhcmNkXCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkcy5yZXNldERGKHJlc3VsdC5wb2ludHMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiZ2V0VWVyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZUlkOiB0aGlzLnRhYmxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhdElkOiB0aGlzLnNlYXRJZCxcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogdGhpcy5wbGF5ZXJJZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwibG9hZGVkRmluaXNoXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkeTogMCxcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZUlkOiB0aGlzLnRhYmxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhdElkOiB0aGlzLnNlYXRJZCxcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogdGhpcy5wbGF5ZXJJZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwiam9pblRhYmxlcm9vbVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVJZDogdGhpcy50YWJsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXRJZDogdGhpcy5zZWF0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnBsYXllcklkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvYWRlZEZpbmlzaCwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5MYW5kbG9yZHNTb2NrZXQub24oXCJPdmVyVXNlclB1c2hcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdvdmVyVXNlcnB1c2gnLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHN0ID0gbmV3IFNldChyZXN1bHQub3Zlcl91c2VyX2xpc3QpO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5MYW5kbG9yZHMuYnRuX21hdGNoX2FnYWluLmFjdGl2ZSA9ICFzdC5oYXModGhpcy5wbGF5ZXJJZCk7XHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u5Zy65pmv5a+56LGhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXRMb2JieU1haW5PYmpfRnVuY3Rpb24gPSBzY2VuZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9iYnlNYWluID0gc2NlbmU7XHJcbiAgICAgICAgICAgIHRoaXMubG9iYnlNYWluU29ja2V0ID0gc2NlbmUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0TGFuZGxvcmRzT2JqX0Z1bmN0aW9uID0gc2NlbmUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkxhbmRsb3JkcyA9IHNjZW5lO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiA9IHJldCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW50OiBuZXcgZ2V0SW5zdGFudCgpXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExhbmROZXRXb3JrOyJdfQ==