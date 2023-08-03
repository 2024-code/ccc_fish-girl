"use strict";
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