
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Flower/FlowerNetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eb932RXTl9CuYxiYU49gH5A', 'FlowerNetWork');
// Script/Flower/FlowerNetWork.js

"use strict";

/**
 * 炸金花SOCKET通讯
 */
var FlowerNetWork = function () {
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
    this.flower = null;
    this.flowerSocket = null;
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
        self.flowerSocket = SocketIO.connect(loginIP + ":" + port);
      } else {
        socket = require("socket-io");
        self.flowerSocket = socket(loginIP + ":" + port);
      } //用户连接游戏服务器


      this.connectServer_Function(userid, sign); //连接失败

      this.flowerSocket.on("error", function () {
        cc.sys.isBrowser && self.flowerSocket.close();
        self.flowerSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Flower");
      }), //连接失败
      this.flowerSocket.on("connect_error", function () {
        cc.sys.isBrowser && self.flowerSocket.close();
        self.flowerSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Flower");
      }); //连接超时

      this.flowerSocket.on("connect_timeout", function () {
        cc.sys.isBrowser && self.flowerSocket.close();
        self.flowerSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Flower");
      }); //连接

      this.flowerSocket.on("connected", function (ret) {
        if (ret) {
          try {
            //进入游戏
            self.flowerSocket.emit("LoginGame", {
              userid: userid,
              //用户ID
              gametype: 11,
              //游戏类型
              sign: sign //签名

            });
          } catch (error) {}
        }
      });
      this.flowerSocket.on("disconnect", function (ret) {
        cc.find('Canvas/Loading').active = true;
      });
    };
    /**
     * 连接炸金花服务器
     * @param {*} userid 
     * @param {*} sign 
     */

    this.connectServer_Function = function (userid, sign) {
      var self = this;
      this.flowerSocket && this.flowerSocket.on("loginGameResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);

        if (result.resultid) {
          //游戏登录成功
          self.playerInfo.playerCoin = result.Obj.score;
          self.lobbyMain.getComponent("LobbyMain").netWork.socket.disconnect();
          self.flowerSocket.emit("LoginRoom", {
            //登录游戏房间接口 roomid传 1 就好
            roomid: 1
          });
          self.setFlowerSocketOn_Function();
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
      var self = this; //返回房间数据

      this.flowerSocket.on("LoginRoomResult", function (ret) {
        console.log('LoginRoomResult:', ret);
        var result = self.changeResultJSON_Function(ret);

        if (result.ResultCode) {
          self.lobbyMain.bg_Black.active = true;
          self.tableId = result.ResultData.TableId;
          self.seatIndex = result.ResultData.seatId;
          self.tax = result.ResultData.tax;
          self.addScore = result.ResultData.addscore;
          self.playerInfo.gameDisconnect = false;
          self.playerInfo.gameName = "Flower";
          cc.audioEngine.stopAll(); // cc.director.loadScene("FlowerMain");
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


    this.setFlowerSocketOn_Function = function () {
      var self = this;
      this.flowerSocket.on("login_result", function (data) {
        console.log("login_result:", data);
        data = self.changeResultJSON_Function(data);

        if (data.errcode === 0) {
          self.reconnectP = data.ret;
          var data = data.data;
          var seat = data.seats;

          for (var i = 0; i < seat.length; i++) {
            if (seat[i].score != "") {
              seat[i].score = (seat[i].score * 0.01).toFixed(2);
            }
          }

          self.roomId = data.roomid;
          self.seats = data.seats;
          self.seatIndex = self.getSeatIndexByID(self.playerInfo.playerId);
          console.log('返回登陆结果==================' + self.seatIndex);
          self.isOver = false;
          cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("FlowerMain");
        } else {
          console.log(data.errmsg);
        }
      });
      this.flowerSocket.on("exit_result", function (data) {
        data = self.changeResultJSON_Function(data);
        self.roomId = null;
        self.turn = -1;
        self.seats = null;

        if (data) {
          //特殊情况下（锦标赛等）可以设置这里的data，在退出的时候进行操作
          self.actionData = data;
        }
      });
      this.flowerSocket.on("exit_notify_push", function (data) {
        data = self.changeResultJSON_Function(data);
        var userId = data;
        var s = self.getSeatByID(userId);

        if (s != null) {
          s.userid = 0;
          s.name = "";
          self.flower.changedUserState(s);
        }
      });
      this.flowerSocket.on("count_down_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.flower.gameCountDown(data);
      });
      this.flowerSocket.on("dispress_push", function (data) {
        self.roomId = null;
        self.turn = -1;
        self.seats = null;
      });
      this.flowerSocket.on("new_user_comes_push", function (data) {
        data = self.changeResultJSON_Function(data);
        var seatIndex = data.seatindex;

        if (self.seats[seatIndex].userid > 0) {
          self.seats[seatIndex].online = true;
        } else {
          data.online = true;
          self.seats[seatIndex] = JSON.parse(JSON.stringify(data));
          !!self.flower && self.flower.addUser(self.seats[seatIndex]);
        }
      });
      this.flowerSocket.on("game_checkPai_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.flower.kanpai(data);
      });
      this.flowerSocket.on("game_losed_push", function (data) {
        self.flower.qipaiResult();
      });
      this.flowerSocket.on("game_wannaToCompare_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.flower.gameWannaToCompare(data);
      }); //弃牌通知 game_userInlosed_push

      this.flowerSocket.on("game_userInlosed_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.flower.qiPaiNotify(data);
      });
      this.flowerSocket.on("game_myTurn_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.flower.gameMyTurnPush(data);
      });
      this.flowerSocket.on("game_turnChanged_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.flower.changedGameTurn(data);
      });
      this.flowerSocket.on("game_timerInitCounter_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.flower.gameTimerInitCounter(data);
      });
      this.flowerSocket.on("guo_notify_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.flower.guoNotify(data);
      });
      this.flowerSocket.on("game_myWin_push", function (data) {//我赢了
        //self.flower.win(data);
      });
      this.flowerSocket.on("gameOver_notify_push", function (data) {
        data = self.changeResultJSON_Function(data); //游戏结束清除定时器

        self.flower.gameOverNotify(data);
      });
      this.flowerSocket.on("game_oneInWin_push", function (data) {
        data = self.changeResultJSON_Function(data); //赢了

        self.flower.win(data);
      });
      this.flowerSocket.on("game_begin_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.button = data;
        self.turn = self.button;
        self.gamestate = "begin";
        self.flower.gameBegin({
          currentZhu: data.currentZhu,
          turn: data.turn
        });
      }); //没钱了通知前端，让其退出

      this.flowerSocket.on("game_noMoney_exit", function (data) {
        data = self.changeResultJSON_Function(data);
        self.flower.noMoneyExit(data);
      }); //总注通知

      this.flowerSocket.on("game_moneyPool_push", function (data) {
        data = self.changeResultJSON_Function(data);
        console.log('game_moneyPool_push', data);
        var a = data.commonInfo;

        for (var key in a) {
          a[key].money = (a[key].money * 0.01).toFixed(2);
        }

        self.flower.gameMoneyPool(data);
      }); //跟注通知

      this.flowerSocket.on("genZhu_notify_push", function (data) {
        console.log('跟注通知：genZhu_notify_push');
        data = self.changeResultJSON_Function(data);
        console.log(data);
        self.flower.genZhuNotify(data);
      }); //看牌通知 game_oneInCheckPai_push

      this.flowerSocket.on("game_oneInCheckPai_push", function (data) {
        console.log('game_oneInCheckPai_push');
        data = self.changeResultJSON_Function(data);
        console.log(data);
        self.flower.kanPaiNotify(data);
      }); //加注通知 jiaZhu_notify_push

      this.flowerSocket.on("jiaZhu_notify_push", function (data) {
        console.log('jiaZhu_notify_push');
        data = self.changeResultJSON_Function(data);
        console.log(data);
        self.flower.jiaZhuNotify(data);
      }); //提示消息通知

      this.flowerSocket.on("message_notify_push", function (data) {
        console.log('message_notify_push');
        data = self.changeResultJSON_Function(data);
        console.log(data);
        self.flower.messageNotify(data);
      }); //轮数通知

      this.flowerSocket.on("game_circleCount_push", function (data) {
        console.log('game_circleCount_push');
        data = self.changeResultJSON_Function(data);
        console.log(data);
        self.flower.gameCircleCount(data);
      }); //比牌结果通知 game_userInBipai_result_push

      this.flowerSocket.on("game_userInBipai_result_push", function (data) {
        console.log('game_userInBipai_result_push');
        data = self.changeResultJSON_Function(data);
        console.log(data);
        self.flower.gameUserInBiPaiResult(data);
      });
      this.flowerSocket.on("game_actionChanged_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.flower.changedGameAction(data);
      });
      this.flowerSocket.on("game_AntiResults_push", function (data) {
        data = self.changeResultJSON_Function(data);
        self.flower.gameAntiResults(data);
      });
      this.flowerSocket.on("game_userInfoById_push", function (data) {
        data = self.changeResultJSON_Function(data);

        if (data) {
          self.flower.userInfoById(data);
        }
      });
      this.flowerSocket.on("game_gameInfoById_push", function (data) {
        data = self.changeResultJSON_Function(data);

        if (data) {
          self.flower.gameInfoById(data);
        }
      });
      this.flowerSocket.on("game_sbInAllIn_push", function (data) {
        data = self.changeResultJSON_Function(data);

        if (data) {
          self.flower.sbInAllIn(data);
        }
      });
      this.flowerSocket.on("noExit", function (ret) {
        cc.find('Canvas/com_ingame_tips').active = true;
      });
      /**
       * 长连接断开监听
       */

      this.flowerSocket.on("disconnect", function (ret) {
        //console.log("aaaxxxxxxxxxxxx");
        //console.log(self.flower);
        var actionData = self.actionData;
        self.flower.exitRoom();
        console.log(self.roomId); // if (self.roomId == null) {
        //     if (actionData) {
        //         if (actionData.msg) {
        //             //alert.show("提示", actionData.msg);
        //         }
        //         setTimeout(function() {
        //             self.actionData = null;
        //             cc.audioEngine.stopAll();
        //             cc.director.loadScene("LobbyMain");
        //         }, actionData.delay * 1000);
        //     } else {

        cc.audioEngine.stopAll();
        cc.director.loadScene("LobbyMain"); //    }
        //}

        if (!self.flower.gameExit) {
          self.flower.disconnectNetWork_Function();
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
    this.setFlowerObj_Function = function (scene) {
      this.flower = scene;
    },
    /**
     * 解析JSON数据
     * @param {*} ret 
     */
    this.changeResultJSON_Function = function (ret) {
      if (cc.sys.isNative) {
        return JSON.parse(ret);
      }

      return ret;
    }, this.init();
  }

  return {
    getInstant: new getInstant()
  };
}();

module.exports = FlowerNetWork;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxGbG93ZXJcXEZsb3dlck5ldFdvcmsuanMiXSwibmFtZXMiOlsiRmxvd2VyTmV0V29yayIsImdldEluc3RhbnQiLCJfaW5zdGFuY2UiLCJ1bmRlZmluZWQiLCJTaW5nbGUiLCJsb2JieU1haW4iLCJmbG93ZXIiLCJmbG93ZXJTb2NrZXQiLCJwbGF5ZXJJbmZvIiwidGFibGVJZCIsInNlYXRJbmRleCIsInBsYXllckhlYWQiLCJ0YXgiLCJhZGRTY29yZSIsImV2ZW50T24iLCJzZWF0cyIsInR1cm4iLCJidXR0b24iLCJjaHUiLCJpc092ZXIiLCJjb25zdW1lX251bSIsImluaXQiLCJyZXF1aXJlIiwibG9naW5HYW1lX0Z1bmN0aW9uIiwibG9naW5JUCIsInBvcnQiLCJ1c2VyaWQiLCJzaWduIiwic2VsZiIsInNvY2tldCIsImNjIiwic3lzIiwiaXNOYXRpdmUiLCJTb2NrZXRJTyIsImNvbm5lY3QiLCJjb25uZWN0U2VydmVyX0Z1bmN0aW9uIiwib24iLCJpc0Jyb3dzZXIiLCJjbG9zZSIsImdhbWVEaXNjb25uZWN0IiwiY29udGVudEdhbWVTZXJ2ZXJGYWlsX0Z1bmN0aW9uIiwicmV0IiwiZW1pdCIsImdhbWV0eXBlIiwiZXJyb3IiLCJmaW5kIiwiYWN0aXZlIiwicmVzdWx0IiwiY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiIsInJlc3VsdGlkIiwicGxheWVyQ29pbiIsIk9iaiIsInNjb3JlIiwiZ2V0Q29tcG9uZW50IiwibmV0V29yayIsImRpc2Nvbm5lY3QiLCJyb29taWQiLCJzZXRGbG93ZXJTb2NrZXRPbl9GdW5jdGlvbiIsImxvZ2luUm9vbV9GdW5jdGlvbiIsImxvYWRHYW1lU2NlbmUiLCJzaG93TWVzc2FnZWJveF9GdW5jdGlvbiIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJSZXN1bHRDb2RlIiwiYmdfQmxhY2siLCJSZXN1bHREYXRhIiwiVGFibGVJZCIsInNlYXRJZCIsImFkZHNjb3JlIiwiZ2FtZU5hbWUiLCJhdWRpb0VuZ2luZSIsInN0b3BBbGwiLCJyZXNldCIsImN1cmFjdGlvbiIsImkiLCJsZW5ndGgiLCJvcCIsInJlYWR5IiwiaXNPd25lciIsImdldFNlbGZEYXRhIiwiZ2V0U2VhdEJ5SUQiLCJ1c2VySWQiLCJnZXRTZWF0SW5kZXhCeUlEIiwic2VhdCIsInMiLCJnZXRMb2NhbEluZGV4IiwiaW5kZXgiLCJnZXRMb2NhbEluZGV4QnlVc2VySWQiLCJkYXRhIiwiZXJyY29kZSIsInJlY29ubmVjdFAiLCJ0b0ZpeGVkIiwicm9vbUlkIiwicGxheWVySWQiLCJRaWVIdWFuU2NlbmVfbm9ybWFsIiwiZXJybXNnIiwiYWN0aW9uRGF0YSIsIm5hbWUiLCJjaGFuZ2VkVXNlclN0YXRlIiwiZ2FtZUNvdW50RG93biIsInNlYXRpbmRleCIsIm9ubGluZSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImFkZFVzZXIiLCJrYW5wYWkiLCJxaXBhaVJlc3VsdCIsImdhbWVXYW5uYVRvQ29tcGFyZSIsInFpUGFpTm90aWZ5IiwiZ2FtZU15VHVyblB1c2giLCJjaGFuZ2VkR2FtZVR1cm4iLCJnYW1lVGltZXJJbml0Q291bnRlciIsImd1b05vdGlmeSIsImdhbWVPdmVyTm90aWZ5Iiwid2luIiwiZ2FtZXN0YXRlIiwiZ2FtZUJlZ2luIiwiY3VycmVudFpodSIsIm5vTW9uZXlFeGl0IiwiYSIsImNvbW1vbkluZm8iLCJrZXkiLCJtb25leSIsImdhbWVNb25leVBvb2wiLCJnZW5aaHVOb3RpZnkiLCJrYW5QYWlOb3RpZnkiLCJqaWFaaHVOb3RpZnkiLCJtZXNzYWdlTm90aWZ5IiwiZ2FtZUNpcmNsZUNvdW50IiwiZ2FtZVVzZXJJbkJpUGFpUmVzdWx0IiwiY2hhbmdlZEdhbWVBY3Rpb24iLCJnYW1lQW50aVJlc3VsdHMiLCJ1c2VySW5mb0J5SWQiLCJnYW1lSW5mb0J5SWQiLCJzYkluQWxsSW4iLCJleGl0Um9vbSIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiZ2FtZUV4aXQiLCJkaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbiIsInNldExvYmJ5TWFpbk9ial9GdW5jdGlvbiIsInNjZW5lIiwic2V0Rmxvd2VyT2JqX0Z1bmN0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxhQUFhLEdBQUksWUFBWTtBQUM3QjtBQUNKO0FBQ0E7QUFDSSxXQUFTQyxVQUFULEdBQXNCO0FBQ2xCLFFBQUlDLFNBQUo7O0FBQ0EsUUFBSUEsU0FBUyxLQUFLQyxTQUFsQixFQUE2QjtBQUN6QkQsTUFBQUEsU0FBUyxHQUFHLElBQUlFLE1BQUosRUFBWjtBQUNIOztBQUNELFdBQU9GLFNBQVA7QUFDSDtBQUNEO0FBQ0o7QUFDQTs7O0FBQ0ksV0FBU0UsTUFBVCxHQUFrQjtBQUNkLFNBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLENBQUMsQ0FBaEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLENBQUMsQ0FBbEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLENBQUMsQ0FBWjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUVBLFNBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLENBQUMsQ0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxDQUFDLENBQWY7QUFDQSxTQUFLQyxHQUFMLEdBQVcsQ0FBQyxDQUFaO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEtBQWQ7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBRUE7QUFDUjtBQUNBOztBQUNRLFNBQUtDLElBQUwsR0FBWSxZQUFZO0FBQ2hCLFdBQUtiLFVBQUwsR0FBa0JjLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JyQixV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SCxDQUFZQyxTQUFaLENBQXNCLFdBQXRCLEVBdEI4QyxDQXVCOUM7QUFDQTs7QUFFQSxZQUFJLENBQUMvRyxJQUFJLENBQUN0QixNQUFMLENBQVlzSSxRQUFqQixFQUEyQjtBQUN2QmhILFVBQUFBLElBQUksQ0FBQ3RCLE1BQUwsQ0FBWXVJLDBCQUFaO0FBQ0g7QUFDSixPQTdCRDtBQThCSCxLQXZQTDtBQXlQSTtBQUNaO0FBQ0E7QUFDQTtBQUNZLFNBQUtDLHdCQUFMLEdBQWdDLFVBQVVDLEtBQVYsRUFBaUI7QUFDN0MsV0FBSzFJLFNBQUwsR0FBaUIwSSxLQUFqQjtBQUNILEtBL1BMO0FBaVFJO0FBQ1o7QUFDQTtBQUNBO0FBQ1ksU0FBS0MscUJBQUwsR0FBNkIsVUFBVUQsS0FBVixFQUFpQjtBQUMxQyxXQUFLekksTUFBTCxHQUFjeUksS0FBZDtBQUNILEtBdlFMO0FBeVFJO0FBQ1o7QUFDQTtBQUNBO0FBQ1ksU0FBSy9GLHlCQUFMLEdBQWlDLFVBQVVQLEdBQVYsRUFBZTtBQUM1QyxVQUFJWCxFQUFFLENBQUNDLEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQixlQUFPdUUsSUFBSSxDQUFDQyxLQUFMLENBQVcvRCxHQUFYLENBQVA7QUFDSDs7QUFDRCxhQUFPQSxHQUFQO0FBQ0gsS0FsUkwsRUFtUkksS0FBS3BCLElBQUwsRUFuUko7QUFvUkg7O0FBQ0QsU0FBTztBQUNIcEIsSUFBQUEsVUFBVSxFQUFFLElBQUlBLFVBQUo7QUFEVCxHQUFQO0FBR0gsQ0EzZG1CLEVBQXBCOztBQTZkQWdKLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxKLGFBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog54K46YeR6IqxU09DS0VU6YCa6K6vXHJcbiAqL1xyXG52YXIgRmxvd2VyTmV0V29yayA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIOWNleS+i+aooeW8j1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRJbnN0YW50KCkge1xyXG4gICAgICAgIHZhciBfaW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKF9pbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIF9pbnN0YW5jZSA9IG5ldyBTaW5nbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6YC76L6R5bGCXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFNpbmdsZSgpIHtcclxuICAgICAgICB0aGlzLmxvYmJ5TWFpbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5mbG93ZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZmxvd2VyU29ja2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFibGVJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuc2VhdEluZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRheCA9IC0xO1xyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSAwO1xyXG4gICAgICAgIHRoaXMuZXZlbnRPbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnNlYXRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnR1cm4gPSAtMTtcclxuICAgICAgICB0aGlzLmJ1dHRvbiA9IC0xO1xyXG4gICAgICAgIHRoaXMuY2h1ID0gLTE7XHJcbiAgICAgICAgdGhpcy5pc092ZXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbnN1bWVfbnVtID0gMDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yid5aeL5YyWXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDov5vlhaXmuLjmiI9cclxuICAgICAgICAgICAgICogQHBhcmFtIHsqfSBsb2dpbklQIFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0geyp9IHBvcnQgXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gdXNlcmlkIFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0geyp9IHNpZ24gXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luR2FtZV9GdW5jdGlvbiA9IGZ1bmN0aW9uIChsb2dpbklQLCBwb3J0LCB1c2VyaWQsIHNpZ24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBzb2NrZXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyU29ja2V0ID0gU29ja2V0SU8uY29ubmVjdChsb2dpbklQICsgXCI6XCIgKyBwb3J0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0ID0gcmVxdWlyZShcInNvY2tldC1pb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZsb3dlclNvY2tldCA9IHNvY2tldChsb2dpbklQICsgXCI6XCIgKyBwb3J0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v55So5oi36L+e5o6l5ri45oiP5pyN5Yqh5ZmoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RTZXJ2ZXJfRnVuY3Rpb24odXNlcmlkLCBzaWduKTtcclxuICAgICAgICAgICAgICAgIC8v6L+e5o6l5aSx6LSlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImVycm9yXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmlzQnJvd3NlciAmJiBzZWxmLmZsb3dlclNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZsb3dlclNvY2tldCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5nYW1lRGlzY29ubmVjdCB8fCBzZWxmLmxvYmJ5TWFpbi5jb250ZW50R2FtZVNlcnZlckZhaWxfRnVuY3Rpb24oXCJGbG93ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy/ov57mjqXlpLHotKVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImNvbm5lY3RfZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMuaXNCcm93c2VyICYmIHNlbGYuZmxvd2VyU29ja2V0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyU29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmdhbWVEaXNjb25uZWN0IHx8IHNlbGYubG9iYnlNYWluLmNvbnRlbnRHYW1lU2VydmVyRmFpbF9GdW5jdGlvbihcIkZsb3dlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8v6L+e5o6l6LaF5pe2XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImNvbm5lY3RfdGltZW91dFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmlzQnJvd3NlciAmJiBzZWxmLmZsb3dlclNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyU29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgfHwgc2VsZi5sb2JieU1haW4uY29udGVudEdhbWVTZXJ2ZXJGYWlsX0Z1bmN0aW9uKFwiRmxvd2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL+i/nuaOpVxyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJjb25uZWN0ZWRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6L+b5YWl5ri45oiPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZsb3dlclNvY2tldC5lbWl0KFwiTG9naW5HYW1lXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCwgLy/nlKjmiLdJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWV0eXBlOiAxMSwgLy/muLjmiI/nsbvlnotcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduOiBzaWduIC8v562+5ZCNXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJkaXNjb25uZWN0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvTG9hZGluZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6L+e5o6l54K46YeR6Iqx5pyN5Yqh5ZmoXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSB1c2VyaWQgXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBzaWduIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFNlcnZlcl9GdW5jdGlvbiA9IGZ1bmN0aW9uICh1c2VyaWQsIHNpZ24pIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQgJiYgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJsb2dpbkdhbWVSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHRpZCkgeyAvL+a4uOaIj+eZu+W9leaIkOWKn1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5wbGF5ZXJDb2luID0gcmVzdWx0Lk9iai5zY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyU29ja2V0LmVtaXQoXCJMb2dpblJvb21cIiwgeyAvL+eZu+W9lea4uOaIj+aIv+mXtOaOpeWPoyByb29taWTkvKAgMSDlsLHlpb1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbWlkOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRGbG93ZXJTb2NrZXRPbl9GdW5jdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW5Sb29tX0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5ri45oiP55m75b2V5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmxvYWRHYW1lU2NlbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24ocmVzdWx0Lm1zZywgMSwgNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ldmVudE9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6L+b5YWl5oi/6Ze0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5sb2dpblJvb21fRnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgLy/ov5Tlm57miL/pl7TmlbDmja5cclxuICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJMb2dpblJvb21SZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luUm9vbVJlc3VsdDonLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uYmdfQmxhY2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRhYmxlSWQgPSByZXN1bHQuUmVzdWx0RGF0YS5UYWJsZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VhdEluZGV4ID0gcmVzdWx0LlJlc3VsdERhdGEuc2VhdElkO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGF4ID0gcmVzdWx0LlJlc3VsdERhdGEudGF4O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWRkU2NvcmUgPSByZXN1bHQuUmVzdWx0RGF0YS5hZGRzY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8uZ2FtZU5hbWUgPSBcIkZsb3dlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJGbG93ZXJNYWluXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy50dXJuID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuY2h1ID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyYWN0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNlYXRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXRzW2ldLm9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdHNbaV0ucmVhZHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWF0SW5kZXggPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0U2VsZkRhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlYXRzW3RoaXMuc2VhdEluZGV4XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0U2VhdEJ5SUQgPSBmdW5jdGlvbiAodXNlcklkKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWF0SW5kZXggPSB0aGlzLmdldFNlYXRJbmRleEJ5SUQodXNlcklkKTtcclxuICAgICAgICAgICAgdmFyIHNlYXQgPSB0aGlzLnNlYXRzW3NlYXRJbmRleF07XHJcbiAgICAgICAgICAgIHJldHVybiBzZWF0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0U2VhdEluZGV4QnlJRCA9IGZ1bmN0aW9uICh1c2VySWQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNlYXRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcyA9IHRoaXMuc2VhdHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAocy51c2VyaWQgPT0gdXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRMb2NhbEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciByZXQgPSAoaW5kZXggLSB0aGlzLnNlYXRJbmRleCArIDUpICUgNTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0TG9jYWxJbmRleEJ5VXNlcklkID0gZnVuY3Rpb24gKHVzZXJJZCkge1xyXG4gICAgICAgICAgICB2YXIgc2VhdEluZGV4ID0gdGhpcy5nZXRTZWF0SW5kZXhCeUlEKHVzZXJJZCk7XHJcbiAgICAgICAgICAgIHZhciByZXQgPSB0aGlzLmdldExvY2FsSW5kZXgoc2VhdEluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOmVv+i/numAmuiur1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0Rmxvd2VyU29ja2V0T25fRnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJsb2dpbl9yZXN1bHRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luX3Jlc3VsdDpcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJjb2RlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVjb25uZWN0UCA9IGRhdGEucmV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXQgPSBkYXRhLnNlYXRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlYXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWF0W2ldLnNjb3JlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0W2ldLnNjb3JlID0gKHNlYXRbaV0uc2NvcmUgKiAwLjAxKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucm9vbUlkID0gZGF0YS5yb29taWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VhdHMgPSBkYXRhLnNlYXRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlYXRJbmRleCA9IHNlbGYuZ2V0U2VhdEluZGV4QnlJRChzZWxmLnBsYXllckluZm8ucGxheWVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6L+U5Zue55m76ZmG57uT5p6cPT09PT09PT09PT09PT09PT09JyArIHNlbGYuc2VhdEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc092ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9idXR0b25DdHJsXCIpLmdldENvbXBvbmVudChcIkxvYmJ5QnV0dG9uQ2xpY2tcIikuUWllSHVhblNjZW5lX25vcm1hbChcIkZsb3dlck1haW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5lcnJtc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyU29ja2V0Lm9uKFwiZXhpdF9yZXN1bHRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucm9vbUlkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnR1cm4gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlYXRzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eJueauiuaDheWGteS4i++8iOmUpuagh+i1m+etie+8ieWPr+S7peiuvue9rui/memHjOeahGRhdGHvvIzlnKjpgIDlh7rnmoTml7blgJnov5vooYzmk43kvZxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY3Rpb25EYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyU29ja2V0Lm9uKFwiZXhpdF9ub3RpZnlfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJJZCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSBzZWxmLmdldFNlYXRCeUlEKHVzZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzLnVzZXJpZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHMubmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLmNoYW5nZWRVc2VyU3RhdGUocyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImNvdW50X2Rvd25fcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mbG93ZXIuZ2FtZUNvdW50RG93bihkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJkaXNwcmVzc19wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yb29tSWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHVybiA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VhdHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyU29ja2V0Lm9uKFwibmV3X3VzZXJfY29tZXNfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXRJbmRleCA9IGRhdGEuc2VhdGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnNlYXRzW3NlYXRJbmRleF0udXNlcmlkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlYXRzW3NlYXRJbmRleF0ub25saW5lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm9ubGluZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VhdHNbc2VhdEluZGV4XSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAhIXNlbGYuZmxvd2VyICYmIHNlbGYuZmxvd2VyLmFkZFVzZXIoc2VsZi5zZWF0c1tzZWF0SW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImdhbWVfY2hlY2tQYWlfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mbG93ZXIua2FucGFpKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImdhbWVfbG9zZWRfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLnFpcGFpUmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyU29ja2V0Lm9uKFwiZ2FtZV93YW5uYVRvQ29tcGFyZV9wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZsb3dlci5nYW1lV2FubmFUb0NvbXBhcmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8v5byD54mM6YCa55+lIGdhbWVfdXNlcklubG9zZWRfcHVzaFxyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJnYW1lX3VzZXJJbmxvc2VkX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLnFpUGFpTm90aWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImdhbWVfbXlUdXJuX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLmdhbWVNeVR1cm5QdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImdhbWVfdHVybkNoYW5nZWRfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mbG93ZXIuY2hhbmdlZEdhbWVUdXJuKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImdhbWVfdGltZXJJbml0Q291bnRlcl9wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZsb3dlci5nYW1lVGltZXJJbml0Q291bnRlcihkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJndW9fbm90aWZ5X3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLmd1b05vdGlmeShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJnYW1lX215V2luX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+aIkei1ouS6hlxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZi5mbG93ZXIud2luKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImdhbWVPdmVyX25vdGlmeV9wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+a4uOaIj+e7k+adn+a4hemZpOWumuaXtuWZqFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLmdhbWVPdmVyTm90aWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyU29ja2V0Lm9uKFwiZ2FtZV9vbmVJbldpbl9wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+i1ouS6hlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLndpbihkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJnYW1lX2JlZ2luX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYnV0dG9uID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnR1cm4gPSBzZWxmLmJ1dHRvbjtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbWVzdGF0ZSA9IFwiYmVnaW5cIjtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZsb3dlci5nYW1lQmVnaW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Wmh1OiBkYXRhLmN1cnJlbnRaaHUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm46IGRhdGEudHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL+ayoemSseS6humAmuefpeWJjeerr++8jOiuqeWFtumAgOWHulxyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJnYW1lX25vTW9uZXlfZXhpdFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mbG93ZXIubm9Nb25leUV4aXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8v5oC75rOo6YCa55+lXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImdhbWVfbW9uZXlQb29sX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnYW1lX21vbmV5UG9vbF9wdXNoJywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGEgPSBkYXRhLmNvbW1vbkluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYVtrZXldLm1vbmV5ID0gKGFba2V5XS5tb25leSAqIDAuMDEpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLmdhbWVNb25leVBvb2woZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8v6Lef5rOo6YCa55+lXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImdlblpodV9ub3RpZnlfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfot5/ms6jpgJrnn6XvvJpnZW5aaHVfbm90aWZ5X3B1c2gnKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLmdlblpodU5vdGlmeShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy/nnIvniYzpgJrnn6UgZ2FtZV9vbmVJbkNoZWNrUGFpX3B1c2hcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyU29ja2V0Lm9uKFwiZ2FtZV9vbmVJbkNoZWNrUGFpX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZV9vbmVJbkNoZWNrUGFpX3B1c2gnKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLmthblBhaU5vdGlmeShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy/liqDms6jpgJrnn6UgamlhWmh1X25vdGlmeV9wdXNoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImppYVpodV9ub3RpZnlfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdqaWFaaHVfbm90aWZ5X3B1c2gnKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLmppYVpodU5vdGlmeShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy/mj5DnpLrmtojmga/pgJrnn6VcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyU29ja2V0Lm9uKFwibWVzc2FnZV9ub3RpZnlfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtZXNzYWdlX25vdGlmeV9wdXNoJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZsb3dlci5tZXNzYWdlTm90aWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL+i9ruaVsOmAmuefpVxyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJnYW1lX2NpcmNsZUNvdW50X3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZV9jaXJjbGVDb3VudF9wdXNoJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZsb3dlci5nYW1lQ2lyY2xlQ291bnQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8v5q+U54mM57uT5p6c6YCa55+lIGdhbWVfdXNlckluQmlwYWlfcmVzdWx0X3B1c2hcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyU29ja2V0Lm9uKFwiZ2FtZV91c2VySW5CaXBhaV9yZXN1bHRfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnYW1lX3VzZXJJbkJpcGFpX3Jlc3VsdF9wdXNoJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZsb3dlci5nYW1lVXNlckluQmlQYWlSZXN1bHQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyU29ja2V0Lm9uKFwiZ2FtZV9hY3Rpb25DaGFuZ2VkX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLmNoYW5nZWRHYW1lQWN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImdhbWVfQW50aVJlc3VsdHNfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mbG93ZXIuZ2FtZUFudGlSZXN1bHRzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImdhbWVfdXNlckluZm9CeUlkX3B1c2hcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZmxvd2VyLnVzZXJJbmZvQnlJZChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyU29ja2V0Lm9uKFwiZ2FtZV9nYW1lSW5mb0J5SWRfcHVzaFwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mbG93ZXIuZ2FtZUluZm9CeUlkKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJTb2NrZXQub24oXCJnYW1lX3NiSW5BbGxJbl9wdXNoXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZsb3dlci5zYkluQWxsSW4oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyU29ja2V0Lm9uKFwibm9FeGl0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2NvbV9pbmdhbWVfdGlwcycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIOmVv+i/nuaOpeaWreW8gOebkeWQrFxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsb3dlclNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgZnVuY3Rpb24gKHJldCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWFheHh4eHh4eHh4eHh4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc2VsZi5mbG93ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uRGF0YSA9IHNlbGYuYWN0aW9uRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZsb3dlci5leGl0Um9vbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYucm9vbUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHNlbGYucm9vbUlkID09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmIChhY3Rpb25EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZiAoYWN0aW9uRGF0YS5tc2cpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvL2FsZXJ0LnNob3coXCLmj5DnpLpcIiwgYWN0aW9uRGF0YS5tc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBzZWxmLmFjdGlvbkRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9LCBhY3Rpb25EYXRhLmRlbGF5ICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5mbG93ZXIuZ2FtZUV4aXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mbG93ZXIuZGlzY29ubmVjdE5ldFdvcmtfRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDkvKDpgJJ0aGlz5L2c55So5Z+fXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gc2NlbmUg5p2l6IeqTG9iYnlNYWluLmpzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLnNldExvYmJ5TWFpbk9ial9GdW5jdGlvbiA9IGZ1bmN0aW9uIChzY2VuZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2JieU1haW4gPSBzY2VuZTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDkvKDpgJJ0aGlz5L2c55So5Z+fXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gc2NlbmUg5p2l6IeqRmxvd2VyTWFpbi5qc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5zZXRGbG93ZXJPYmpfRnVuY3Rpb24gPSBmdW5jdGlvbiAoc2NlbmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyID0gc2NlbmU7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6Kej5p6QSlNPTuaVsOaNrlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0geyp9IHJldCBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiA9IGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluc3RhbnQ6IG5ldyBnZXRJbnN0YW50KClcclxuICAgIH1cclxufSkoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmxvd2VyTmV0V29yazsiXX0=