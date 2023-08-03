
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Holdem/HoldemNetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '082feB3pMRE2oEsRIpmHmVv', 'HoldemNetWork');
// Script/Holdem/HoldemNetWork.js

"use strict";

/**
 * 炸金花SOCKET通讯
 */
var HoldemNetWork = function () {
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
    this.lobbyMain = null;
    this.holdem = null;
    this.holdemSocket = null;
    this.playerInfo = null;
    this.tableId = -1;
    this.seatIndex = -1;
    this.playerHead = null;
    this.tax = -1;
    this.addScore = 0;
    this.eventOn = false;
    this.seats = null;
    this.turn = -1;
    this.button = -1;
    this.chu = -1;
    this.isOver = false;
    this.consume_num = 0;
    /**
     * 初始化
     */

    this.init = function () {
      this.playerInfo = require("PlayerInfo").getInstant;
    },
    /**
     * 进入游戏
     * @param {*} loginIP 
     * @param {*} port 
     * @param {*} userid 
     * @param {*} sign 
     */
    this.loginGame_Function = function (loginIP, port, userid, sign) {
      var self = this;
      var socket = null;

      if (cc.sys.isNative) {
        self.holdemSocket = SocketIO.connect(loginIP + ":" + port);
      } else {
        socket = require("socket-io");
        self.holdemSocket = socket(loginIP + ":" + port);
      } //用户连接游戏服务器


      this.connectServer_Function(userid, sign); //连接失败

      this.holdemSocket.on("error", function () {
        cc.sys.isBrowser && self.holdemSocket.close();
        self.holdemSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Holdem");
      }), //连接失败
      this.holdemSocket.on("connect_error", function () {
        cc.sys.isBrowser && self.holdemSocket.close();
        self.holdemSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Holdem");
      }); //连接超时

      this.holdemSocket.on("connect_timeout", function () {
        cc.sys.isBrowser && self.holdemSocket.close();
        self.holdemSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Holdem");
      }); //连接

      this.holdemSocket.on("connected", function (ret) {
        if (ret) {
          try {
            //进入游戏
            self.holdemSocket.emit("LoginGame", {
              userid: userid,
              //用户ID
              gametype: 11,
              //游戏类型
              sign: sign //签名

            });
          } catch (error) {}
        }
      });
    };
    /**
     * 连接德州扑克服务器
     * @param {*} userid 
     * @param {*} sign 
     */

    this.connectServer_Function = function (userid, sign) {
      var self = this;
      this.holdemSocket && this.holdemSocket.on("loginGameResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        cc.log('游戏登陆成功=======================' + JSON.stringify(result));

        if (result.resultid) {
          //游戏登录成功
          self.playerInfo.playerCoin = result.Obj.score;
          self.lobbyMain.getComponent("LobbyMain").netWork.socket.disconnect();
          self.holdemSocket.emit("LoginRoom", {
            //登录游戏房间接口 roomid传 1 就好
            roomid: 1
          });
          self.setHoldemSocketOn_Function();
          self.loginRoom_Function();
        } else {
          //游戏登录失败
          self.lobbyMain.getComponent("LobbyMain").loadGameScene = false;
          self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
          self.eventOn = true;
        }
      });
    };
    /**
     * 进入房间
     */


    this.loginRoom_Function = function () {
      cc.log('进入房间');
      var self = this; //返回房间数据

      this.holdemSocket.on("LoginRoomResult", function (ret) {
        console.log('LoginRoomResult:', ret);
        var result = self.changeResultJSON_Function(ret);

        if (result.ResultCode) {
          self.lobbyMain.bg_Black.active = true;
          self.tableId = result.ResultData.TableId;
          self.seatId = result.ResultData.seatId;
          self.tax = result.ResultData.tax;
          self.addScore = result.ResultData.addscore;
          self.playerInfo.gameDisconnect = false;
          self.playerInfo.gameName = "Holdem";
          cc.audioEngine.stopAll();
          cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("HoldemMain");
        }
      });
    };

    this.reset = function () {
      this.turn = -1;
      this.chu = -1;
      this.button = -1;
      this.curaction = null;

      for (var i = 0; i < this.seats.length; ++i) {
        this.seats[i].op = null;
        this.seats[i].ready = false;
      }
    };

    this.isOwner = function () {
      return this.seatIndex == 0;
    };

    this.getSelfData = function () {
      return this.seats[this.seatIndex];
    };

    this.getSeatByID = function (userId) {
      var seatIndex = this.getSeatIndexByID(userId);
      var seat = this.seats[seatIndex];
      return seat;
    };

    this.getSeatIndexByID = function (userId) {
      for (var i = 0; i < this.seats.length; ++i) {
        var s = this.seats[i];

        if (s.userid == userId) {
          return i;
        }
      }

      return -1;
    };

    this.getLocalIndex = function (index) {
      var ret = (index - this.seatIndex + 5) % 5;
      return ret;
    };

    this.getLocalIndexByUserId = function (userId) {
      var seatIndex = this.getSeatIndexByID(userId);
      var ret = this.getLocalIndex(seatIndex);
      return ret;
    };
    /**
     * 长连通讯
     */


    this.setHoldemSocketOn_Function = function () {
      var self = this;
      /**
       * 长连接断开监听
       */

      this.holdemSocket.on("login_result", function (data) {
        data = self.changeResultJSON_Function(data);
        console.log("login_result:", data);

        if (data.errcode === 0) {
          self.reconnectP = data.ret;
          var data = data.data;
          self.seats = data.seats;
          self.seatIndex = self.getSeatIndexByID(self.playerInfo.playerId);
          self.isOver = false;
          self.consume_num = data.scene.consume_num ? data.scene.consume_num : 50;
        } else {
          console.log(data.errmsg);
        }
      });
      this.holdemSocket.on("socket_MyHolds", function (data) {
        data = self.changeResultJSON_Function(data);

        if (data && data.length > 0) {
          self.holdem.myHolds(data);
        }
      });
      this.holdemSocket.on("count_down_push", function (data) {
        data = self.changeResultJSON_Function(data);
        !!self.holdem && !!self.holdem.countDown && self.holdem.countDown(data);
      });
      this.holdemSocket.on("game_begin_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.gameBegin(data);
      });
      this.holdemSocket.on("game_diChiUpdate_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.updateDiChi(data);
      });
      this.holdemSocket.on("game_myInfo_push", function (data) {
        data = self.changeResultJSON_Function(data);
        var seat = self.getSeatByID(data.userid);
        seat.score = (data.money * 0.01).toFixed(2);
        self.holdem.myInfo(data);
      });
      this.holdemSocket.on("game_myTurn_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.myTurn(data);
      });
      this.holdemSocket.on("myTurn_time_init", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.myTurnForNoMoney(data);
      });
      this.holdemSocket.on("game_oneClickGuo_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.oneGuo(data);
      });
      this.holdemSocket.on("game_oneGen_push", function (data) {
        data = self.changeResultJSON_Function(data);
        var seat = self.getSeatByID(data.userid);
        seat.score = (data.money * 0.01).toFixed(2);
        self.holdem.oneGen(data);
      });
      this.holdemSocket.on("game_oneAllIn_push", function (data) {
        data = self.changeResultJSON_Function(data);
        var seat = self.getSeatByID(data.userid);
        seat.score = (data.money * 0.01).toFixed(2);
        self.holdem.oneAllIn(data);
      });
      this.holdemSocket.on("game_oneQuit_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.oneQuit(data);
      });
      this.holdemSocket.on("game_playersInNewCircle_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.playersInNewCircle(data);
      });
      this.holdemSocket.on("game_newCircle_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.newCircle(data);
      });
      this.holdemSocket.on("game_turnChanged_push", function (data) {
        data = self.changeResultJSON_Function(data);

        if (self.playerInfo.playerId != data) {
          self.holdem.gameTurnChanged(data);
        }
      });
      this.holdemSocket.on("game_caculateResult_push", function (data) {
        data = self.changeResultJSON_Function(data);

        for (var i = 0; i < data.length; i++) {
          if (self.playerInfo.playerId == data[i].userid && data[i].isWinner) {
            self.holdem.settlement(false);
          } else if (self.playerInfo.playerId == data[i].userid && !data[i].isWinner) {
            self.holdem.settlement(true);
          }
        }

        ;
        self.holdem.caculateResult(data);
      });
      this.holdemSocket.on("game_myARGStatusChanged_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.myARGStatusChanged(data);
      });
      this.holdemSocket.on("game_over", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.gameOver(data);
      });
      this.holdemSocket.on("game_gameInfoById_push", function (data) {
        if (data) {
          data = self.changeResultJSON_Function(data);
          self.holdem.gameInfoById(data);
        }
      });
      this.holdemSocket.on("game_userInfoById_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.userInfoById(data);
      });
      this.holdemSocket.on("game_allGuo_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.holdem.allGuo(data);
      });
      this.holdemSocket.on("exit_result", function (data) {
        data = self.changeResultJSON_Function(data);
        console.log('离开房间返回信息:' + data);
        self.turn = -1;
        self.seats = null;
        self.holdem.exitResult(data);
        self.holdem = null;
      });
      this.holdemSocket.on("exit_notify_push", function (data) {
        data = self.changeResultJSON_Function(data);
        var userId = data;
        var s = self.getSeatByID(userId);
        cc.log('离开桌子===================' + JSON.stringify(s));

        if (s != null) {
          s.userid = 0;
          s.name = "";
          self.holdem.changeUserState(s);
        }
      });
      this.holdemSocket.on("noExit", function (ret) {
        cc.find('Canvas/com_ingame_tips').active = true;
      });
      this.holdemSocket.on("dispress_push", function (data) {
        self.turn = -1;
        self.seats = null;
      });
      this.holdemSocket.on("disconnect", function (data) {
        cc.find('Canvas/Loading').active = true;

        if (!self.holdem.gameExit) {
          self.holdem.disconnectNetWork_Function();
        }
      }); // 新人加入房间

      this.holdemSocket.on("new_user_comes_push", function (data) {
        data = self.changeResultJSON_Function(data);
        cc.log('有新玩家加入==============' + JSON.stringify(data));
        var seatIndex = data.seatindex;

        if (self.seats[seatIndex].userid > 0) {
          self.seats[seatIndex].online = true;
          self.seats[seatIndex].ready = data.ready;
          self.seats[seatIndex].score = data.score;
          self.seats[seatIndex].status = data.status;
          self.seats[seatIndex].headUrl = data.headimgurl;
        } else {
          data.online = true;
          self.seats[seatIndex] = JSON.parse(JSON.stringify(data));
          !!self.holdem && self.holdem.updateSeatInfo(self.seats[seatIndex]);
        }
      });
    },
    /**
     * 传递this作用域
     * @param {*} scene 来自LobbyMain.js
     */
    this.setLobbyMainObj_Function = function (scene) {
      this.lobbyMain = scene;
    },
    /**
     * 传递this作用域
     * @param {*} scene 来自FlowerMain.js
     */
    this.setHoldemObj_Function = function (scene) {
      this.holdem = scene;
    },
    /**
     * 解析JSON数据
     * @param {*} ret 
     */
    this.changeResultJSON_Function = function (ret) {
      // if (cc.sys.isNative) {
      //     return JSON.parse(ret);
      // }
      var jsonstr = null;

      try {
        jsonstr = JSON.parse(ret);
      } catch (e) {
        jsonstr = null;
      }

      if (jsonstr == null) return ret;else return jsonstr;
    }, this.init();
  }

  return {
    getInstant: new getInstant()
  };
}();

module.exports = HoldemNetWork;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxIb2xkZW1cXEhvbGRlbU5ldFdvcmsuanMiXSwibmFtZXMiOlsiSG9sZGVtTmV0V29yayIsImdldEluc3RhbnQiLCJfaW5zdGFuY2UiLCJ1bmRlZmluZWQiLCJTaW5nbGUiLCJsb2JieU1haW4iLCJob2xkZW0iLCJob2xkZW1Tb2NrZXQiLCJwbGF5ZXJJbmZvIiwidGFibGVJZCIsInNlYXRJbmRleCIsInBsYXllckhlYWQiLCJ0YXgiLCJhZGRTY29yZSIsImV2ZW50T24iLCJzZWF0cyIsInR1cm4iLCJidXR0b24iLCJjaHUiLCJpc092ZXIiLCJjb25zdW1lX251bSIsImluaXQiLCJyZXF1aXJlIiwibG9naW5HYW1lX0Z1bmN0aW9uIiwibG9naW5JUCIsInBvcnQiLCJ1c2VyaWQiLCJzaWduIiwic2VsZiIsInNvY2tldCIsImNjIiwic3lzIiwiaXNOYXRpdmUiLCJTb2NrZXRJTyIsImNvbm5lY3QiLCJjb25uZWN0U2VydmVyX0Z1bmN0aW9uIiwib24iLCJpc0Jyb3dzZXIiLCJjbG9zZSIsImdhbWVEaXNjb25uZWN0IiwiY29udGVudEdhbWVTZXJ2ZXJGYWlsX0Z1bmN0aW9uIiwicmV0IiwiZW1pdCIsImdhbWV0eXBlIiwiZXJyb3IiLCJyZXN1bHQiLCJjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3VsdGlkIiwicGxheWVyQ29pbiIsIk9iaiIsInNjb3JlIiwiZ2V0Q29tcG9uZW50IiwibmV0V29yayIsImRpc2Nvbm5lY3QiLCJyb29taWQiLCJzZXRIb2xkZW1Tb2NrZXRPbl9GdW5jdGlvbiIsImxvZ2luUm9vbV9GdW5jdGlvbiIsImxvYWRHYW1lU2NlbmUiLCJzaG93TWVzc2FnZWJveF9GdW5jdGlvbiIsIm1zZyIsImNvbnNvbGUiLCJSZXN1bHRDb2RlIiwiYmdfQmxhY2siLCJhY3RpdmUiLCJSZXN1bHREYXRhIiwiVGFibGVJZCIsInNlYXRJZCIsImFkZHNjb3JlIiwiZ2FtZU5hbWUiLCJhdWRpb0VuZ2luZSIsInN0b3BBbGwiLCJmaW5kIiwiUWllSHVhblNjZW5lX25vcm1hbCIsInJlc2V0IiwiY3VyYWN0aW9uIiwiaSIsImxlbmd0aCIsIm9wIiwicmVhZHkiLCJpc093bmVyIiwiZ2V0U2VsZkRhdGEiLCJnZXRTZWF0QnlJRCIsInVzZXJJZCIsImdldFNlYXRJbmRleEJ5SUQiLCJzZWF0IiwicyIsImdldExvY2FsSW5kZXgiLCJpbmRleCIsImdldExvY2FsSW5kZXhCeVVzZXJJZCIsImRhdGEiLCJlcnJjb2RlIiwicmVjb25uZWN0UCIsInBsYXllcklkIiwic2NlbmUiLCJlcnJtc2ciLCJteUhvbGRzIiwiY291bnREb3duIiwiZ2FtZUJlZ2luIiwidXBkYXRlRGlDaGkiLCJtb25leSIsInRvRml4ZWQiLCJteUluZm8iLCJteVR1cm4iLCJteVR1cm5Gb3JOb01vbmV5Iiwib25lR3VvIiwib25lR2VuIiwib25lQWxsSW4iLCJvbmVRdWl0IiwicGxheWVyc0luTmV3Q2lyY2xlIiwibmV3Q2lyY2xlIiwiZ2FtZVR1cm5DaGFuZ2VkIiwiaXNXaW5uZXIiLCJzZXR0bGVtZW50IiwiY2FjdWxhdGVSZXN1bHQiLCJteUFSR1N0YXR1c0NoYW5nZWQiLCJnYW1lT3ZlciIsImdhbWVJbmZvQnlJZCIsInVzZXJJbmZvQnlJZCIsImFsbEd1byIsImV4aXRSZXN1bHQiLCJuYW1lIiwiY2hhbmdlVXNlclN0YXRlIiwiZ2FtZUV4aXQiLCJkaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbiIsInNlYXRpbmRleCIsIm9ubGluZSIsInN0YXR1cyIsImhlYWRVcmwiLCJoZWFkaW1ndXJsIiwicGFyc2UiLCJ1cGRhdGVTZWF0SW5mbyIsInNldExvYmJ5TWFpbk9ial9GdW5jdGlvbiIsInNldEhvbGRlbU9ial9GdW5jdGlvbiIsImpzb25zdHIiLCJlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxhQUFhLEdBQUks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Z01JO0FBQ1o7QUFDQTtBQUNBO0FBQ1ksU0FBS2xELHlCQUFMLEdBQWlDLFVBQVVMLEdBQVYsRUFBZTtBQUM1QztBQUNBO0FBQ0E7QUFDQSxVQUFJK0YsT0FBTyxHQUFHLElBQWQ7O0FBQ0EsVUFBSTtBQUNBQSxRQUFBQSxPQUFPLEdBQUd4RixJQUFJLENBQUNvRixLQUFMLENBQVczRixHQUFYLENBQVY7QUFDSCxPQUZELENBRUUsT0FBT2dHLENBQVAsRUFBVTtBQUNSRCxRQUFBQSxPQUFPLEdBQUcsSUFBVjtBQUNIOztBQUNELFVBQUlBLE9BQU8sSUFBSSxJQUFmLEVBQ0ksT0FBTy9GLEdBQVAsQ0FESixLQUdJLE9BQU8rRixPQUFQO0FBQ1AsS0FsTkwsRUFtTkksS0FBS25ILElBQUwsRUFuTko7QUFvTkg7O0FBQ0QsU0FBTztBQUNIcEIsSUFBQUEsVUFBVSxFQUFFLElBQUlBLFVBQUo7QUFEVCxHQUFQO0FBR0gsQ0F4Wm1CLEVBQXBCOztBQTBaQXlJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjNJLGFBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog54K46YeR6IqxU09DS0VU6YCa6K6vXHJcbiAqL1xyXG52YXIgSG9sZGVtTmV0V29yayA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIOWNleS+i+aooeW8j1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRJbnN0YW50KCkge1xyXG4gICAgICAgIHZhciBfaW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKF9pbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIF9pbnN0YW5jZSA9IG5ldyBTaW5nbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6YC76L6R5bGCXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFNpbmdsZSgpIHtcclxuICAgICAgICB0aGlzLmxvYmJ5TWFpbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ob2xkZW0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaG9sZGVtU29ja2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFibGVJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuc2VhdEluZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRheCA9IC0xO1xyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSAwO1xyXG4gICAgICAgIHRoaXMuZXZlbnRPbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnNlYXRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnR1cm4gPSAtMTtcclxuICAgICAgICB0aGlzLmJ1dHRvbiA9IC0xO1xyXG4gICAgICAgIHRoaXMuY2h1ID0gLTE7XHJcbiAgICAgICAgdGhpcy5pc092ZXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbnN1bWVfbnVtID0gMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yid5aeL5YyWXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDov5vlhaXmuLjmiI9cclxuICAgICAgICAgICAgICogQHBhcmFtIHsqfSBsb2dpbklQIFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0geyp9IHBvcnQgXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gdXNlcmlkIFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0geyp9IHNpZ24gXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luR2FtZV9GdW5jdGlvbiA9IGZ1bmN0aW9uIChsb2dpbklQLCBwb3J0LCB1c2VyaWQsIHNpZ24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBzb2NrZXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaG9sZGVtU29ja2V0ID0gU29ja2V0SU8uY29ubmVjdChsb2dpbklQICsgXCI6XCIgKyBwb3J0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0ID0gcmVxdWlyZShcInNvY2tldC1pb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbVNvY2tldCA9IHNvY2tldChsb2dpbklQICsgXCI6XCIgKyBwb3J0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v55So5oi36L+e5o6l5ri45oiP5pyN5Yqh5ZmoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RTZXJ2ZXJfRnVuY3Rpb24odXNlcmlkLCBzaWduKTtcclxuICAgICAgICAgICAgICAgIC8v6L+e5o6l5aSx6LSlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcImVycm9yXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmlzQnJvd3NlciAmJiBzZWxmLmhvbGRlbVNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbVNvY2tldCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5nYW1lRGlzY29ubmVjdCB8fCBzZWxmLmxvYmJ5TWFpbi5jb250ZW50R2FtZVNlcnZlckZhaWxfRnVuY3Rpb24oXCJIb2xkZW1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy/ov57mjqXlpLHotKVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcImNvbm5lY3RfZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMuaXNCcm93c2VyICYmIHNlbGYuaG9sZGVtU29ja2V0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaG9sZGVtU29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmdhbWVEaXNjb25uZWN0IHx8IHNlbGYubG9iYnlNYWluLmNvbnRlbnRHYW1lU2VydmVyRmFpbF9GdW5jdGlvbihcIkhvbGRlbVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8v6L+e5o6l6LaF5pe2XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcImNvbm5lY3RfdGltZW91dFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmlzQnJvd3NlciAmJiBzZWxmLmhvbGRlbVNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaG9sZGVtU29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgfHwgc2VsZi5sb2JieU1haW4uY29udGVudEdhbWVTZXJ2ZXJGYWlsX0Z1bmN0aW9uKFwiSG9sZGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL+i/nuaOpVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZW1Tb2NrZXQub24oXCJjb25uZWN0ZWRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6L+b5YWl5ri45oiPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbVNvY2tldC5lbWl0KFwiTG9naW5HYW1lXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCwgLy/nlKjmiLdJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWV0eXBlOiAxMSwgLy/muLjmiI/nsbvlnotcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduOiBzaWduIC8v562+5ZCNXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOi/nuaOpeW+t+W3nuaJkeWFi+acjeWKoeWZqFxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gdXNlcmlkIFxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gc2lnbiBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbm5lY3RTZXJ2ZXJfRnVuY3Rpb24gPSBmdW5jdGlvbiAodXNlcmlkLCBzaWduKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaG9sZGVtU29ja2V0ICYmIHRoaXMuaG9sZGVtU29ja2V0Lm9uKFwibG9naW5HYW1lUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygn5ri45oiP55m76ZmG5oiQ5YqfPT09PT09PT09PT09PT09PT09PT09PT0nICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdGlkKSB7IC8v5ri45oiP55m75b2V5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnBsYXllckNvaW4gPSByZXN1bHQuT2JqLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ob2xkZW1Tb2NrZXQuZW1pdChcIkxvZ2luUm9vbVwiLCB7IC8v55m75b2V5ri45oiP5oi/6Ze05o6l5Y+jIHJvb21pZOS8oCAxIOWwseWlvVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb29taWQ6IDFcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEhvbGRlbVNvY2tldE9uX0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpblJvb21fRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/muLjmiI/nmbvlvZXlpLHotKVcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubG9hZEdhbWVTY2VuZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihyZXN1bHQubXNnLCAxLCA0KTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmV2ZW50T24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDov5vlhaXmiL/pl7RcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxvZ2luUm9vbV9GdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2MubG9nKCfov5vlhaXmiL/pl7QnKVxyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8v6L+U5Zue5oi/6Ze05pWw5o2uXHJcbiAgICAgICAgICAgIHRoaXMuaG9sZGVtU29ja2V0Lm9uKFwiTG9naW5Sb29tUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpblJvb21SZXN1bHQ6JywgcmV0KTtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuUmVzdWx0Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmJnX0JsYWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50YWJsZUlkID0gcmVzdWx0LlJlc3VsdERhdGEuVGFibGVJZDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlYXRJZCA9IHJlc3VsdC5SZXN1bHREYXRhLnNlYXRJZDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRheCA9IHJlc3VsdC5SZXN1bHREYXRhLnRheDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZFNjb3JlID0gcmVzdWx0LlJlc3VsdERhdGEuYWRkc2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmdhbWVEaXNjb25uZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmdhbWVOYW1lID0gXCJIb2xkZW1cIjtcclxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9idXR0b25DdHJsXCIpLmdldENvbXBvbmVudChcIkxvYmJ5QnV0dG9uQ2xpY2tcIikuUWllSHVhblNjZW5lX25vcm1hbChcIkhvbGRlbU1haW5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHVybiA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmNodSA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmN1cmFjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZWF0cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0c1tpXS5vcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXRzW2ldLnJlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNPd25lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VhdEluZGV4ID09IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldFNlbGZEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWF0c1t0aGlzLnNlYXRJbmRleF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldFNlYXRCeUlEID0gZnVuY3Rpb24gKHVzZXJJZCkge1xyXG4gICAgICAgICAgICB2YXIgc2VhdEluZGV4ID0gdGhpcy5nZXRTZWF0SW5kZXhCeUlEKHVzZXJJZCk7XHJcbiAgICAgICAgICAgIHZhciBzZWF0ID0gdGhpcy5zZWF0c1tzZWF0SW5kZXhdO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VhdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdldFNlYXRJbmRleEJ5SUQgPSBmdW5jdGlvbiAodXNlcklkKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZWF0cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHMgPSB0aGlzLnNlYXRzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHMudXNlcmlkID09IHVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0TG9jYWxJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB2YXIgcmV0ID0gKGluZGV4IC0gdGhpcy5zZWF0SW5kZXggKyA1KSAlIDU7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldExvY2FsSW5kZXhCeVVzZXJJZCA9IGZ1bmN0aW9uICh1c2VySWQpIHtcclxuICAgICAgICAgICAgdmFyIHNlYXRJbmRleCA9IHRoaXMuZ2V0U2VhdEluZGV4QnlJRCh1c2VySWQpO1xyXG4gICAgICAgICAgICB2YXIgcmV0ID0gdGhpcy5nZXRMb2NhbEluZGV4KHNlYXRJbmRleCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDplb/ov57pgJrorq9cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNldEhvbGRlbVNvY2tldE9uX0Z1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICog6ZW/6L+e5o6l5pat5byA55uR5ZCsXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVtU29ja2V0Lm9uKFwibG9naW5fcmVzdWx0XCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luX3Jlc3VsdDpcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY29ubmVjdFAgPSBkYXRhLnJldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VhdHMgPSBkYXRhLnNlYXRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlYXRJbmRleCA9IHNlbGYuZ2V0U2VhdEluZGV4QnlJRChzZWxmLnBsYXllckluZm8ucGxheWVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzT3ZlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnN1bWVfbnVtID0gZGF0YS5zY2VuZS5jb25zdW1lX251bSA/IGRhdGEuc2NlbmUuY29uc3VtZV9udW0gOiA1MDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmVycm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVtU29ja2V0Lm9uKFwic29ja2V0X015SG9sZHNcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS5teUhvbGRzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZW1Tb2NrZXQub24oXCJjb3VudF9kb3duX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICEhc2VsZi5ob2xkZW0gJiYgISFzZWxmLmhvbGRlbS5jb3VudERvd24gJiYgc2VsZi5ob2xkZW0uY291bnREb3duKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcImdhbWVfYmVnaW5fcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ob2xkZW0uZ2FtZUJlZ2luKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcImdhbWVfZGlDaGlVcGRhdGVfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ob2xkZW0udXBkYXRlRGlDaGkoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVtU29ja2V0Lm9uKFwiZ2FtZV9teUluZm9fcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXQgPSBzZWxmLmdldFNlYXRCeUlEKGRhdGEudXNlcmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWF0LnNjb3JlID0gKGRhdGEubW9uZXkgKiAwLjAxKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaG9sZGVtLm15SW5mbyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZW1Tb2NrZXQub24oXCJnYW1lX215VHVybl9wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS5teVR1cm4oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcIm15VHVybl90aW1lX2luaXRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaG9sZGVtLm15VHVybkZvck5vTW9uZXkoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcImdhbWVfb25lQ2xpY2tHdW9fcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ob2xkZW0ub25lR3VvKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcImdhbWVfb25lR2VuX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWF0ID0gc2VsZi5nZXRTZWF0QnlJRChkYXRhLnVzZXJpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhdC5zY29yZSA9IChkYXRhLm1vbmV5ICogMC4wMSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS5vbmVHZW4oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVtU29ja2V0Lm9uKFwiZ2FtZV9vbmVBbGxJbl9wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VhdCA9IHNlbGYuZ2V0U2VhdEJ5SUQoZGF0YS51c2VyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlYXQuc2NvcmUgPSAoZGF0YS5tb25leSAqIDAuMDEpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ob2xkZW0ub25lQWxsSW4oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVtU29ja2V0Lm9uKFwiZ2FtZV9vbmVRdWl0X3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaG9sZGVtLm9uZVF1aXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVtU29ja2V0Lm9uKFwiZ2FtZV9wbGF5ZXJzSW5OZXdDaXJjbGVfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ob2xkZW0ucGxheWVyc0luTmV3Q2lyY2xlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcImdhbWVfbmV3Q2lyY2xlX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaG9sZGVtLm5ld0NpcmNsZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZW1Tb2NrZXQub24oXCJnYW1lX3R1cm5DaGFuZ2VkX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnBsYXllckluZm8ucGxheWVySWQgIT0gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS5nYW1lVHVybkNoYW5nZWQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcImdhbWVfY2FjdWxhdGVSZXN1bHRfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnBsYXllckluZm8ucGxheWVySWQgPT0gZGF0YVtpXS51c2VyaWQgJiYgZGF0YVtpXS5pc1dpbm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5ob2xkZW0uc2V0dGxlbWVudChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5wbGF5ZXJJbmZvLnBsYXllcklkID09IGRhdGFbaV0udXNlcmlkICYmICFkYXRhW2ldLmlzV2lubmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS5zZXR0bGVtZW50KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS5jYWN1bGF0ZVJlc3VsdChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZW1Tb2NrZXQub24oXCJnYW1lX215QVJHU3RhdHVzQ2hhbmdlZF9wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS5teUFSR1N0YXR1c0NoYW5nZWQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVtU29ja2V0Lm9uKFwiZ2FtZV9vdmVyXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS5nYW1lT3ZlcihkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZW1Tb2NrZXQub24oXCJnYW1lX2dhbWVJbmZvQnlJZF9wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5ob2xkZW0uZ2FtZUluZm9CeUlkKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZW1Tb2NrZXQub24oXCJnYW1lX3VzZXJJbmZvQnlJZF9wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS51c2VySW5mb0J5SWQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVtU29ja2V0Lm9uKFwiZ2FtZV9hbGxHdW9fcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ob2xkZW0uYWxsR3VvKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcImV4aXRfcmVzdWx0XCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn56a75byA5oi/6Ze06L+U5Zue5L+h5oGvOicgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnR1cm4gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlYXRzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS5leGl0UmVzdWx0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaG9sZGVtID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZW1Tb2NrZXQub24oXCJleGl0X25vdGlmeV9wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcklkID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IHNlbGYuZ2V0U2VhdEJ5SUQodXNlcklkKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ+emu+W8gOahjOWtkD09PT09PT09PT09PT09PT09PT0nICsgSlNPTi5zdHJpbmdpZnkocykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcy51c2VyaWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzLm5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS5jaGFuZ2VVc2VyU3RhdGUocyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZW1Tb2NrZXQub24oXCJub0V4aXRcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvY29tX2luZ2FtZV90aXBzJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVtU29ja2V0Lm9uKFwiZGlzcHJlc3NfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHVybiA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VhdHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvTG9hZGluZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmhvbGRlbS5nYW1lRXhpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhvbGRlbS5kaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8g5paw5Lq65Yqg5YWl5oi/6Ze0XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlbVNvY2tldC5vbihcIm5ld191c2VyX2NvbWVzX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygn5pyJ5paw546p5a625Yqg5YWlPT09PT09PT09PT09PT0nICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWF0SW5kZXggPSBkYXRhLnNlYXRpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZWF0c1tzZWF0SW5kZXhdLnVzZXJpZCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWF0c1tzZWF0SW5kZXhdLm9ubGluZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VhdHNbc2VhdEluZGV4XS5yZWFkeSA9IGRhdGEucmVhZHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VhdHNbc2VhdEluZGV4XS5zY29yZSA9IGRhdGEuc2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VhdHNbc2VhdEluZGV4XS5zdGF0dXMgPSBkYXRhLnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWF0c1tzZWF0SW5kZXhdLmhlYWRVcmwgPSBkYXRhLmhlYWRpbWd1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5vbmxpbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlYXRzW3NlYXRJbmRleF0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgISFzZWxmLmhvbGRlbSAmJiBzZWxmLmhvbGRlbS51cGRhdGVTZWF0SW5mbyhzZWxmLnNlYXRzW3NlYXRJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOS8oOmAknRoaXPkvZznlKjln59cclxuICAgICAgICAgICAgICogQHBhcmFtIHsqfSBzY2VuZSDmnaXoh6pMb2JieU1haW4uanNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuc2V0TG9iYnlNYWluT2JqX0Z1bmN0aW9uID0gZnVuY3Rpb24gKHNjZW5lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYmJ5TWFpbiA9IHNjZW5lO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOS8oOmAknRoaXPkvZznlKjln59cclxuICAgICAgICAgICAgICogQHBhcmFtIHsqfSBzY2VuZSDmnaXoh6pGbG93ZXJNYWluLmpzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLnNldEhvbGRlbU9ial9GdW5jdGlvbiA9IGZ1bmN0aW9uIChzY2VuZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZW0gPSBzY2VuZTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDop6PmnpBKU09O5pWw5o2uXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gcmV0IFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uID0gZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB2YXIganNvbnN0ciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpzb25zdHIgPSBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAganNvbnN0ciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbnN0ciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGpzb25zdHI7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbnN0YW50OiBuZXcgZ2V0SW5zdGFudCgpXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhvbGRlbU5ldFdvcms7Il19