"use strict";
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