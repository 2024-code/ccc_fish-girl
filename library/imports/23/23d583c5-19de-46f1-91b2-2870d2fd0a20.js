"use strict";
cc._RF.push(module, '23d58PFGd5G8ZGyKHDS/Qog', 'FishNetWork');
// Script/Fish/FishNetWork.js

"use strict";

/**
 * 捕鱼达人SOCKET通讯
 */
var FishNetWork = function () {
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

    //TODO:变量初始化未完成
    this.lobbyMain = null;
    this.fishMain = null;
    this.fishSocket = null;
    this.playerInfo = null;
    this.eventMgr = null;
    this.userList = null;
    this.tableId = -1;
    this.seatId = -1;
    this.seatIndex = -1;
    this.roomBet = 1;
    /**
     * 初始化
     */

    this.init = function () {
      _this.playerInfo = require("PlayerInfo").getInstant;
    };
    /**
     * 进入游戏
     * @param {*} loginIP 
     * @param {*} port 
     * @param {*} userid 
     * @param {*} sign 
     */


    var self = this;

    self.loginGame_Function = function (loginIP, port, userid, sign) {
      var socket = null;

      if (cc.sys.isNative) {
        self.fishSocket = SocketIO.connect(loginIP + ":" + port);
      } else {
        socket = require("socket-io");
        self.fishSocket = socket(loginIP + ":" + port);
      } //连接失败


      self.fishSocket.on("error", function () {
        try {
          cc.sys.isBrowser && self.fishSocket.close();
          self.fishSocket = null;
          self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Fish");
        } catch (e) {
          self.fishMain.openAlert();
        }
      }); //连接失败

      self.fishSocket.on("connect_error", function () {
        try {
          cc.sys.isBrowser && self.fishSocket.close();
          self.fishSocket = null;
          self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Fish");
        } catch (e) {
          self.fishMain.openAlert();
        }
      }); //连接超时

      self.fishSocket.on("connect_timeout", function () {
        try {
          cc.sys.isBrowser && self.fishSocket.close();
          self.fishSocket = null;
          self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Fish");
        } catch (e) {
          self.fishMain.openAlert();
        }
      }); //连接

      self.fishSocket.on("connected", function (ret) {
        if (ret) {
          try {
            //进入游戏
            self.fishSocket.emit("LoginGame", {
              userid: userid,
              //用户ID
              gametype: 11,
              //游戏类型
              sign: sign //签名

            });
          } catch (error) {}
        }
      });
      self.fishSocket.on("loginGameResult", function (ret) {
        var result = self.changeResultJSON_Function(ret); //console.log('游戏登陆成功=======================' + JSON.stringify(result));

        if (result.resultid) {
          //游戏登录成功
          self.roomBet = result.Obj.bet;
          self.playerInfo.playerCoin = result.Obj.score;
          self.lobbyMain.getComponent("LobbyMain").netWork.socket.disconnect();
          self.setFishSocketOn_Fuction();
          self.loginRoom_Function();
          cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("FishMain", function () {
            self.fishSocket.emit("LoginRoom", {
              //登录游戏房间接口 roomid传 1 就好
              roomid: 1
            });
          });
        } else {
          //游戏登录失败
          if (self.lobbyMain.com_Tips) {
            self.lobbyMain.getComponent("LobbyMain").loadGameScene = false;
            self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
          } else {
            self.fishMain.openAlert();
          }
        }
      });
    };
    /**
     * 进入房间
     */


    self.loginRoom_Function = function () {
      //返回房间数据
      self.fishSocket.on("LoginRoomResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);

        if (result.ResultCode) {
          self.tableId = result.ResultData.TableId;
          self.seatId = result.ResultData.seatId; //所有用户信息 userId: 3120, seatId: 0, nickname: "cv123456", score: 1004900, userType: 0,

          self.userList = result.ResultData.userList;
          self.playerInfo.gameDisconnect = false;
          self.playerInfo.gameName = "Fish";
          cc.audioEngine.stopAll();
          self.fishMain.start_();
        }
      });
    };
    /**
     * 长连通讯
     */


    self.setFishSocketOn_Fuction = function () {
      var _this2 = this;

      //击杀结果
      self.fishSocket.on('HitResult', function (res) {
        //console.log('hit: '+res);
        var result = self.changeResultJSON_Function(res);

        if (result.ResultCode == 1) {
          self.fishMain.onFishHit(result.ResultData);
        }
      }); //鱼进入场景

      self.fishSocket.on('FishOut', function (res) {
        // {"fishId":[7217],"fishType":18,"fishPath":13,"fishCount":1,"fishLineup":0,"lineup":false,"propCount":0}
        //console.log('1111111' + JSON.stringify(res));
        //console.log("出鱼："+JSON.stringify(res));
        var result = self.changeResultJSON_Function(res); // console.log(result);

        if (self.fishMain) {
          self.fishMain.createFish(result); //var t = result;
          //self.fishMain.BirdCreat_Function(t.fishId, 16, t.fishPath, t.fishCount, t.fishLineup, t.lineup, t.propCount)
        }
      }); //发射结果

      self.fishSocket.on('fishShoot', function (res) {
        var result = self.changeResultJSON_Function(res); //console.log('fishShoot=======================' + JSON.stringify(result));

        self.fishMain.shoot_r(result.userid, result.position, result.bet, result.bulletId);
      });
      self.fishSocket.on('getDownTimeResult', function (res) {
        var result = self.changeResultJSON_Function(ret); //console.log('getDownTimeResult=======================' + JSON.stringify(result));
      }); //用户进入

      self.fishSocket.on('playEnter', function (res) {
        var result = self.changeResultJSON_Function(res);

        if (result.ResultCode) {
          self.fishMain.setPlayerEnter(result.ResultData.UserId, result.ResultData.seatId, result.ResultData.nickname, result.ResultData.score, result.ResultData.headimgurl, result.ResultData.diamond);
        }
      }); //用户退出

      self.fishSocket.on('PlayerOut', function (res) {
        var result = self.changeResultJSON_Function(res);
        self.fishMain.setPlayerExit(result.PlayerSeatId);
      });
      self.fishSocket.on('changePowerResult', function (res) {
        var result = self.changeResultJSON_Function(res);
        self.fishMain.changePower(result);
      });
      self.fishSocket.on('useSkillResult', function (res) {
        var result = self.changeResultJSON_Function(res);
        console.log("useSkillResult", result);
        self.fishMain.cast_skill_r(result);
      });
      self.fishSocket.on('fishHit_boardResult', function (res) {
        res = self.changeResultJSON_Function(res);

        if (res.uid == self.playerInfo.playerId) {
          _this2._gameSocket.emit('fishHit', res);
        }
      });
      self.fishSocket.on('userGoldUpdate', function (res) {});
      self.fishSocket.on('pool', function (res) {});
      self.fishSocket.on('fishSceneChange', function (res) {});
      self.fishSocket.on('getFishListResult', function (res) {});
      self.fishSocket.on('getMoguiCountResult', function (res) {});
      self.fishSocket.on('boomFishHitResult', function (res) {
        // ResultData:{userId:_userId,hitSocre:score,fishList:outfishList}}
        var result = self.changeResultJSON_Function(res);
        self.fishMain.onBoomFishHit(result.ResultData);
      });
      self.fishSocket.on('disconnect', function (res) {
        self.fishMain.openAlert();

        try {
          cc.sys.isBrowser && self.fishSocket.close();
          self.fishSocket = null;
          self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Fish");
        } catch (e) {}
      });
    };
    /**
     * 传递this作用域
     * @param {*} scene 来自LobbyMain.js
     */


    this.setLobbyMainObj_Function = function (scene) {
      _this.lobbyMain = scene;
    };
    /**
     * 保存当前场景
     */


    this.setFishObj_Funtion = function (scene) {
      _this.fishMain = scene;
    };
    /**
     * 解析JSON数据
     * @param {*} ret 
     */


    this.changeResultJSON_Function = function (ret) {
      if (cc.sys.isNative) {
        return JSON.parse(ret);
      }

      return ret;
    };

    this.init();
  }

  ;
  return {
    getInstant: new getInstant()
  };
}();

module.exports = FishNetWork;

cc._RF.pop();