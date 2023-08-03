"use strict";
cc._RF.push(module, '319feRnDwVJfqqYmu6rcWJZ', 'HongBaoNetWork');
// Script/game_hongbao/HongBaoNetWork.js

"use strict";

/**
 * 红包达人SOCKET通讯
 */
var HongBaoNetWork = function () {
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
    this.gameMain = null;
    this.gameSocket = null;
    this.playerInfo = null;
    this.tableId = -1;
    this.seatId = -1;
    this.playerHead = null;
    this.tax = -1;
    this.addScore = 0;
    this.eventOn = false;
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
      console.log('loginIP:', loginIP);
      console.log('port:', port);
      console.log('userid:', userid);
      console.log('sign:', sign);
      loginIP = "60.205.191.87";
      var self = this;
      var socket = null;

      if (cc.sys.isNative) {
        self.gameSocket = SocketIO.connect(loginIP + ":" + port);
      } else {
        socket = require("socket-io");
        self.gameSocket = socket(loginIP + ":" + port);
      } //用户连接游戏服务器


      this.connectServer_Function(userid, sign); //连接失败

      this.gameSocket.on("error", function () {
        cc.sys.isBrowser && self.gameSocket.close();
        self.gameSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("hongbao");
      }), //连接失败
      this.gameSocket.on("connect_error", function () {
        cc.sys.isBrowser && self.gameSocket.close();
        self.gameSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("hongbao");
      }); //连接超时

      this.gameSocket.on("connect_timeout", function () {
        cc.sys.isBrowser && self.gameSocket.close();
        self.gameSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("hongbao");
      }); //连接

      this.gameSocket.on("connected", function (ret) {
        if (ret) {
          try {
            //进入游戏
            self.gameSocket.emit("LoginGame", {
              userid: userid,
              //用户ID
              nickname: self.playerInfo.playerName,
              headimgurl: self.playerInfo.playerHeadId,
              gametype: 4,
              //游戏类型
              sign: sign //签名

            });
          } catch (error) {}
        }
      });
    };
    /**
     * 连接红包达人服务器
     * @param {*} userid 
     * @param {*} sign 
     */

    this.connectServer_Function = function (userid, sign) {
      var self = this;
      this.gameSocket && this.gameSocket.on("loginGameResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log("红包达人登录游戏返回：", result);

        if (result.resultid) {
          //游戏登录成功
          self.playerInfo.playerCoin = result.Obj.score;
          self.lobbyMain.getComponent("LobbyMain").netWork.socket.disconnect();
          self.loginRoom_Function();
          self.bindSocketCallback();
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
      this.lobbyMain.bg_Black.active = true;
      this.playerInfo.gameDisconnect = false;
      this.playerInfo.gameName = "hongbao";
      cc.audioEngine.stopAll();
      cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("Game_hongbao");
    };
    /**
     * 红包达人长连通讯
     */


    this.bindSocketCallback = function () {
      var self = this;
      /**
      * 红包场次信息
      */

      this.gameSocket.on("hbInit", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        self.gameMain.gameInit(result);
      });
      /**
      * 获取红包列表
      */

      this.gameSocket.on("hongbaoList", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        self.gameMain.updateHongBaoList(result);
      });
      /**
      * 领红包结果返回
      */

      this.gameSocket.on("getHbResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        self.gameMain.getHongBao(result);
      });
      /**
       * 本局金币结算回调,输了为负数
       */

      this.gameSocket.on("open", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        self.gameMain.billing_Function(result);
      });
      /**
       * 广播消息
       */

      this.gameSocket.on("hbTip", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        self.gameMain.horseLamp(result);
      });
      /**
       * 金币不足,踢出房间
       */

      this.gameSocket.on("notEnouhtScore", function () {
        self.gameMain.noMoneyOut_Function();
      });
      /**
       * 长连接断开监听
       */

      this.gameSocket.on("disconnect", function (ret) {
        if (!self.gameMain.gameExit) {
          self.gameMain.disconnectNetWork_Function();
        }
      });
      this.gameSocket.on("noExit", function (ret) {
        ret = self.changeResultJSON_Function(ret);

        if (!!ret) {
          cc.find('Canvas/com_ingame_tips').active = true;
        } else {
          self.gameMain.gameExit = true;
          self.gameMain.exitGame_Function();
        }
      });
      this.gameSocket.on("CanExit", function (ret) {
        ret = self.changeResultJSON_Function(ret);
        console.log('canExit', ret.result);
        self.gameMain.com_Button.getChildByName("bt_Exit").active = ret.result; // cc.find('Canvas/com_exit_tips').active = ret.result;
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
     * @param {*} scene 来自hongbaoMain.js
     */
    this.sethongbaoObj_Function = function (scene) {
      this.gameMain = scene;
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

module.exports = HongBaoNetWork;

cc._RF.pop();