
(function () {
  var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
  var __module = nodeEnv ? module : { exports: {} };
  var __filename = 'preview-scripts/assets/Script/Lobby/LobbyNetWork.js';
  var __require = nodeEnv ? function (request) {
    return cc.require(request);
  } : function (request) {
    return __quick_compile_project__.require(request, __filename);
  };
  function __define(exports, require, module) {
    if (!nodeEnv) { __quick_compile_project__.registerModule(__filename, module); } "use strict";
    cc._RF.push(module, '4ad78UYFFxA5IvetZGpqZ74', 'LobbyNetWork');
    // Script/Lobby/LobbyNetWork.js

    "use strict";

    /**
     * 大厅SOCKET通讯
     */
    var LobbyNetWork = {
      accountChange: false,
      lobbyMain: null,
      playerInfo: null,
      serverList: null,
      getNameAndSign: false,
      getLoginCode: false,
      headSprite: null,
      socket: null,
      io: null,
      connected: false,
      userName: "",
      passWord: "",
      loginClick: false,

      /**
       * 初始化
       */
      netWorkInit_Function: function netWorkInit_Function() {
        this.io = null;
        this.socket = null;
        this.connected = false;
        this.playerInfo = require("PlayerInfo").getInstant;
        this.setLobbyMainObj_Function(this.playerInfo.gameObj);

        switch (this.playerInfo.isAutoLogin) {
          case 0:
            //账号登陆
            var userData = null; //获取缓存中的用户数据

            if (cc.sys.isNative) {
              userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
            } else {
              userData = JSON.parse(localStorage.getItem("userData"));
            }

            if (userData) {
              this.lobbyMain.node.getChildByName('Loading').active = true;
              this.loginAccount_Function(this.playerInfo.loginIp, userData.account, userData.password);
            } else {
              this.lobbyMain.com_Login.active = true;
            }

            break;

          case 1:
            //游客登录
            this.loginAccount_Function(this.playerInfo.loginIp);
            break;

          case 2:
            //微信登陆
            this.accountChange = true;
            var t = "";
            t = this.playerInfo.loginCode ? this.playerInfo.loginCode : this.getUrlCode_Function("loginCode"), t ? this.loginAccount_Function(this.playerInfo.loginIp, null, null, t) : (this.accountChange = false, this.loginAccount_Function(this.playerInfo.loginIp));
            break;
        }
      },

      /**
       * 账号登陆
       * @param {*} url 
       * @param {*} account 
       * @param {*} passWord 
       * @param {*} loginCode 
       */
      loginAccount_Function: function loginAccount_Function(url, account, passWord, loginCode) {
        this.userName = account;
        this.passWord = passWord;
        this.loginCode = loginCode;
        this.socket = null;

        if (cc.sys.isNative) {
          this.socket = SocketIO.connect(url);
        } else {
          this.io = require("socket-io");
          this.socket = this.io(url);
        }

        this.loginSocketOn_Function();
      },
      loginSocketOn_Function: function loginSocketOn_Function() {
        var self = this;
        /**
         * 连接错误
         */

        self.socket.on("connect_error", function (ret) {
          if (self.lobbyMain.com_MessageBox == null) {
            return;
          }

          self.lobbyMain.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "连接错误,请检测网络";

          if (self.socket !== null) {
            for (var key in self.socket.$events) {
              if (key !== 0) {
                self.socket.removeListen(key);
              }
            }
          }
        });
        /**
         * 连接超时
         */

        self.socket.on("connect_timeout", function (ret) {
          self.lobbyMain.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "连接超时,请检测网络";

          if (self.socket !== null) {
            for (var key in self.socket.$events) {
              if (key !== 0) {
                self.socket.removeListen(key);
              }
            }
          }
        });
        /**
         * 网络错误
         */

        self.socket.on("error", function (ret) {
          self.lobbyMain.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "网络错误,请检测网络";

          if (self.socket !== null) {
            for (var key in self.socket.$events) {
              if (key !== 0) {
                self.socket.removeListen(key);
              }
            }
          }
        });
        /**
         * 重新连接
         */

        self.socket.on("reconnect", function (ret) {
          if (self.socket !== null) {
            for (var key in self.socket.$events) {
              if (key !== 0) {
                self.socket.removeListen(key);
              }
            }
          }
        });
        /**
         * 连接socke.
         * 用户登录
         */

        self.socket.on("connected", function (ret) {
          //cc.log(ret);
          if (ret) {
            self.lobbyMain.disconneted = false;

            if (self.accountChange) {
              switch (self.playerInfo.isAutoLogin) {
                case 0:
                case 1:
                  self.socket.emit("login", {
                    userName: self.userName,
                    password: self.passWord
                  });
                  break;

                case 2:
                  //微信登陆
                  self.socket.emit("login", {
                    loginCode: self.loginCode
                  });
                  break;
              }
            } else {
              self.lobbyMain.getComponent("LobbyRegister").checkAccount_Function(self.playerInfo.loginIp);
            }

            if (!self.lobbyMain.disconneted) {
              self.lobbyMain.bg_Black.active = false;
              self.lobbyMain.com_MessageBox.active = false;
            }

            self.connected = true;
          }
        });
        /**
         * 返回登陆信息
         */

        self.socket.on("loginResult", function (ret) {
          console.log('返回登陆信息:' + JSON.stringify(ret));
          var result = self.changeResultJSON(ret);

          switch (result.resultid) {
            case -2:
              self.lobbyMain.bg_Black.active = true;
              self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string = "";
              self.lobbyMain.com_Login.getChildByName("bt_Login").getComponent("cc.Button").interactable = true;
              self.accountChange = false;

              switch (self.playerInfo.isAutoLogin) {
                case 0:
                  break;

                case 1:
                  self.lobbyMain.showMessagebox_Function("登录信息不完整,\n请重新登录", 1, 4);
                  break;

                case 2:
                  self.lobbyMain.showMessagebox_Function("登录信息不完整,\n请重新登录", 1, 0);
                  break;
              }

              break;

            case -1:
              self.lobbyMain.bg_Black.active = true;
              self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string = "";
              self.lobbyMain.com_Login.getChildByName("bt_Login").getComponent("cc.Button").interactable = true;
              self.accountChange = false;

              switch (self.playerInfo.isAutoLogin) {
                case 0:
                  self.lobbyMain.showMessagebox_Function("账号已经冻结,\n请用其它账号联系客服", 1, 0);
                  break;

                case 1:
                  self.lobbyMain.showMessagebox_Function("账号已经冻结,\n请用其它账号联系客服", 1, 4);
                  break;

                case 2:
                  self.lobbyMain.showMessagebox_Function("账号已经冻结,\n请用其它账号联系客服", 1, 0);
                  break;
              }

              break;

            case 0:
              self.lobbyMain.bg_Black.active = true;
              self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string = "";
              self.lobbyMain.com_Login.getChildByName("bt_Login").getComponent("cc.Button").interactable = true;
              self.accountChange = false;

              switch (self.playerInfo.isAutoLogin) {
                case 0:
                  self.lobbyMain.showMessagebox_Function("账号或者密码错误,请重新登录", 1, 10);
                  break;

                case 1:
                  self.lobbyMain.showMessagebox_Function("账号或者密码错误,\n请重新登录,\n个人信息按钮(左下角)\n可切换账号", 1, 4);
                  break;

                case 2:
                  self.lobbyMain.showMessagebox_Function("账号或者密码错误,请重新登录", 1, 10);
                  break;
              }

              break;

            case 1:
              self.loginClick = false;
              self.playerInfo.account = result.Obj.account;
              self.playerInfo.password = self.lobbyMain.com_Login.getChildByName("eb_Password").getComponent("cc.EditBox").string;
              self.playerInfo.loginCode = self.loginCode;
              self.playerInfo.gameSign = result.Obj.sign;
              self.playerInfo.playerId = result.Obj.id;
              self.playerInfo.playerName = result.Obj.nickname;
              self.playerInfo.playerCoin = result.Obj.score / self.playerInfo.exchangeRate;
              self.playerInfo.playerDiamond = result.Obj.diamond;
              self.playerInfo.playerHeadId = result.Obj.headimgurl;
              self.playerInfo.iosChannel = result.Obj.ChannelType;
              self.playerInfo.win_pool = result.win_pool;

              if (result.Obj.proplist[1]) {
                self.playerInfo.playerGift = result.Obj.proplist[1];
              } else {
                self.playerInfo.playerGift = 0;
              }

              self.playerInfo.phoneNumber = result.Obj.phoneNo;

              if (result.Obj.phoneNo) {
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedPhone").getChildByName("lb_Number").getComponent("cc.Label").string = self.lobbyMain.encryptString_Function(result.Obj.phoneNo, 3, 6);
              } else {
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedPhone").getChildByName("lb_Number").getComponent("cc.Label").string = "";
              }

              self.playerInfo.isOffical = result.Obj.official;
              self.playerInfo.gameDisconnect || (self.playerInfo.gameName = "Lobby");
              self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerName").getComponent("cc.Label").string = result.Obj.nickname;
              self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerId").getComponent("cc.Label").string = result.Obj.id;
              self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = self.playerInfo.playerCoin.toFixed(2);
              self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerDiamond").getComponent("cc.Label").string = self.playerInfo.playerDiamond;
              self.lobbyMain.com_PlayerInfo.active = false;
              self.lobbyMain.com_Mall.active = false;
              self.lobbyMain.com_CustomerService.active = false;
              self.lobbyMain.com_Setting.active = false;
              self.lobbyMain.com_Login.active = false;
              self.lobbyMain.com_Register.active = false;
              self.lobbyMain.com_Mail.active = false;
              self.lobbyMain.com_bank.active = false;
              self.lobbyMain.jackpot_script.ShowJackPot(result.win_pool); //显示彩金数值

              if (self.playerInfo.isAutoLogin === 2) {
                history.replaceState(null, "Fish_CN_WX", "?login=1");
              }

              if (self.accountChange) {
                if (self.userName !== "" && self.passWord !== "") {
                  self.lobbyMain.getComponent("LobbyRegister").changeUserData_Function(self.userName, self.passWord);
                }

                self.accountChange = false;
                self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").active = false;
                self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string = "";
                self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string = "";
              }

              self.lobbyMain.lobbyInit_Function();
              break;
          }

          ;
          self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_ChangeAccount").getComponent("cc.Button").interactable = true;
          self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("bt_Change").getComponent("cc.Button").interactable = true;
          self.lobbyMain.node.getChildByName('Loading').active = false;
        });
        /**
         * 返回服务器列表数据
         */

        self.socket.on("ServerListResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (result) {
            self.serverList = result.GameInfo; // cc.log('返回服务器列表数据:' + JSON.stringify(ret));
            // cc.log('查找LobbyMenu==============================' + self.lobbyMain.getComponent("LobbyMenu"));
            // cc.log('--------------返回服务器列表===============' + JSON.stringify(self.serverList));
            //初始化游戏按钮

            self.lobbyMain.getComponent("LobbyMenu").gameMenuInit_Function(self.serverList);
          }
        });
        self.anotherFunctionInit_Function();
        /**
         * 监听彩金的刷新
         */

        self.socket.on('RedisWinPool', function (ret) {
          if (self.lobbyMain.jackpot_script == null) {
            return;
          }

          self.lobbyMain.jackpot_script.ShowJackPot(ret);
        });
      },

      /**
       * 
       */
      anotherFunctionInit_Function: function anotherFunctionInit_Function() {
        var self = this;
        /**
         * 
         */

        self.socket.on("sendCoinResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (result.Result) {
            //充值回调接口
            self.playerInfo.playerCoin = self.playerInfo.playerCoin + result.score / self.playerInfo.exchangeRate;
            self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = self.playerInfo.playerCoin.toFixed(2);
          }
        }),
          /**
           * 
           */
          self.socket.on("sendGiveCoinResult", function (ret) {
            var result = self.changeResultJSON(ret);

            if (result.Result) {
              self.playerInfo.playerCoin = (result.remainScore / self.playerInfo.exchangeRate).toFixed(2);
              self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = self.playerInfo.playerCoin.toFixed(2);
            }

            self.lobbyMain.showMessagebox_Function(result.msg, 1, 0);
          });
        /**
         * 检测昵称
         */

        self.socket.on("checkNickNameResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (result.resultCode) {
            self.lobbyMain.checkIdResult = true;
          } else {
            self.lobbyMain.checkIdResult = false;
          }
        });
        /**
         * 请求绑定手机号
         */

        self.socket.on("sendbindPhoneNoResult", function (ret) {
          var result = self.changeResultJSON(ret);
          result.Result || (self.lobbyMain.com_PlayerInfo.active = false, self.lobbyMain.showMessagebox_Function(result.msg, 1, 4));
        });
        /**
         * 绑定手机号
         */

        self.socket.on("bindPhoneResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (result.Result) {
            self.playerInfo.phoneNumber = self.lobbyMain.com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("eb_PhoneNumber").getComponent("cc.EditBox").string;
            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindPhone").active = false;
            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedPhone").active = true;
            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedPhone").getChildByName("lb_Number").getComponent("cc.Label").string = self.playerInfo.phoneNumber;
          }

          self.lobbyMain.com_PlayerInfo.active = false;
          self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
        });
        /**
         * 
         */

        self.socket.on("exchangeResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (result.Result) {
            self.playerInfo.playerGift += result.deleteCount;
          }

          self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
        });
        self.socket.on("GMsendMsg", function (ret) {
          var result = self.changeResultJSON(ret);
          cc.log('GM:', JSON.stringify(result));
          var lbl = self.lobbyMain.com_Mall.getChildByName('com_CustomerService').getChildByName('New Label');

          if (lbl.csData.id == result.gm_id) {
            self.lobbyMain.setChat_Function(10, lbl.csData.name, result.msg);
          }
        });
        /**
         * 
         */

        self.socket.on("sendMsg", function (ret) {
          var result = self.changeResultJSON(ret);
          self.lobbyMain.customerServiceSendMessage_Function(result.userId, result.nickname, result.msg);
        });
        /**
         * 
         */

        self.socket.on("sendMsgToUserResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (result.ResultCode) {
            self.lobbyMain.com_CustomerService.getChildByName("eb_Chat").getComponent("cc.EditBox").string = result.msg;
          } else {
            self.lobbyMain.customerServiceSendMessage_Function(self.playerInfo.playerId, self.playerInfo.playerName, self.lobbyMain.sendMessage);
            self.lobbyMain.sendMessage = "";
          }
        });
        /**
         * 
         */

        self.socket.on("getMsgToUserResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (!result.ResultCode) {
            var idList = new Array();

            if (result.data.chatList) {
              for (var i = 0; i < result.data.chatList.length; i++) {
                self.lobbyMain.customerServiceSendMessage_Function(result.data.chatList[i].userId, result.data.chatList[i].nickname, result.data.chatList[i].msg);
                idList[i] = result.data.chatList[i].id;
              }
            }
          }

          self.socket.emit("updateCharLog", {
            idList: idList
          });
        });
        /**
         * 银行查金币结果
         */

        self.socket.on("getPlayerCoinResult", function (ret) {
          var result = self.changeResultJSON(ret);
          cc.log(result.ResultCode);

          if (result.ResultCode) {
            self.lobbyMain.getComponent("LobbyMain").com_bank.getComponent("LobbyBank").showSelectCoin(result);
          } else {
            self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
          }
        });
        /**
         * 获取银行资金数
         */

        self.socket.on("getBankScoreResult", function (ret) {
          var result = self.changeResultJSON(ret);
          self.playerInfo.playerBankCoin = result.bankScore;
        });
        /**
         * 更新银行资金数
         */

        self.socket.on("updateBankScoreResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (result.ResultCode) {
            self.playerInfo.playerBankCoin = result.bankScore;
            self.lobbyMain.getComponent("LobbyMain").com_bank.getComponent("LobbyBank").updateView();
          } else {
            self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
          }
        });
        /**
        * 修改银行密码
        */

        self.socket.on("updateBankpwdResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (result.ResultCode) {
            var language = cc.sys.localStorage.getItem('selectedLanguage') || 'txt.zh';

            switch (language) {
              case 'txt.zh':
                self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function("银行密码修改成功", 1, 4);
                break;
              case 'txt.vn':
                self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function("The bank password is successfully changed", 1, 4);
                break;
              case 'txt.en':
                self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function("Password bank berhasil diubah", 1, 4);
                break;
            }
          } else {
            self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
          }
        });
        /**
         * 走马灯公告信息
         */

        self.socket.on("noticeMsg", function (ret) {
          // var result = self.changeResultJSON(ret);
          // self.lobbyMain.updateSystemMessage_Function(result.nickname + " : " + result.msg);
          console.log('noticeMsg:' + JSON.stringify(ret));
          var result = self.changeResultJSON(ret);

          if (self.lobbyMain.systemMessageArray) {
            self.lobbyMain.systemMessageArray = [];
          } else {
            self.lobbyMain.systemMessageArray = new Array(0);
          }

          self.lobbyMain.com_SystemMessage.getChildByName("vi_View").removeAllChildren();
          self.lobbyMain.systemMessageSign = 0;

          for (var i in result) {
            self.lobbyMain.updateSystemMessage_Function(result[i].txt);
          }

          self.lobbyMain.moveSystemMessage_Function();
        });
        /**
         * 
         */

        self.socket.on("sendMsgResult", function (ret) {
          var result = self.changeResultJSON(ret);
          self.playerInfo.playerCoin = (result.remainScore / self.playerInfo.exchangeRate).toFixed(2);
          self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = self.playerInfo.playerCoin.toFixed(2);
        });
        /**
         * 
         */

        self.socket.on("firstExchagerResult", function (ret) {
          var result = self.changeResultJSON(ret);
          self.playerInfo.aliAccount = result.zhifubao;
          self.playerInfo.aliName = result.zhifubaoName;
          self.lobbyMain.playerInfoMenuInit_Function();
        });
        /**
         * 
         */

        self.socket.on("addPrize", function (ret) {
          var result = self.changeResultJSON(ret);
          result && self.lobbyMain.addMail_Function(result);
        });
        /**
         * 
         */

        self.socket.on("prizeListResult", function (ret) {
          var result = self.changeResultJSON(ret);
          result.prizeList && self.lobbyMain.mailInit_Function(result.prizeList);
        });
        /**
         * 
         */

        self.socket.on("getPrizeResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (result.Result) {
            if (result.data.winScore) {
              self.lobbyMain.showMessagebox_Function(result.msg + " " + result.data.winScore / self.playerInfo.exchangeRate + " 金币\n\n", 4, 0);
              self.playerInfo.playerCoin = (parseFloat(self.playerInfo.playerCoin) + result.data.winScore / self.playerInfo.exchangeRate).toFixed(2);
              self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = self.playerInfo.playerCoin.toFixed(2);
            } else {
              self.lobbyMain.showMessagebox_Function(result.msg, 1, 0);
            }

            self.lobbyMain.destroyMail_Function();
          }
        });
        /**
         * 断开连接
         */

        self.socket.on("disconnect", function () {
          console.log('大厅连接断开', self.lobbyMain.enterRoom);

          if (self.lobbyMain.enterRoom == undefined) {
            return;
          }

          self.connected = false; //self.loginClick || self.lobbyMain.enterRoom || self.lobbyMain.netWorkDisconneted_Function("游戏已断开，请重新连接游戏");
        });
        /**
         * 
         */

        self.socket.on("heartbeatResult", function () {
          self.lobbyMain.heartBeatTime = 0;
          self.lobbyMain.heartBeatTimeOut = 0;
        });
        /**
         * 修改昵称
         */

        self.socket.on("updateNickNameResult", function (ret) {
          var result = self.changeResultJSON(ret);
          self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("bt_Change").getComponent("cc.Button").interactable = true;

          if (result.Result) {
            self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("eb_Name").getComponent("cc.EditBox").string = result.msg;
          } else {
            self.playerInfo.playerName = self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("eb_Name").getComponent("cc.EditBox").string;
            self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerName").getComponent("cc.Label").string = self.playerInfo.playerName;
            self.lobbyMain.com_PlayerInfo.active = false;
            self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("eb_Name").getComponent("cc.EditBox").string = "";
            self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Account").getComponent("cc.Label").string = "账号: " + self.playerInfo.account;
            self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
          }
        });
        /**
         * 绑定支付宝
         */

        self.socket.on("bindZhifubaoResult", function (ret) {
          var result = self.changeResultJSON(ret);
          self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("bt_Bind").getComponent("cc.Button").interactable = true;

          if (result.Result) {
            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Account").getComponent("cc.EditBox").string = result.msg;
            self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Account").getComponent("cc.EditBox").string = result.msg;
          } else {
            if (self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Account").getComponent("cc.EditBox").string) {
              self.playerInfo.aliAccount = self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Account").getComponent("cc.EditBox").string;
              self.playerInfo.aliName = self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Name").getComponent("cc.EditBox").string;
            } else {
              self.playerInfo.aliAccount = self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Account").getComponent("cc.EditBox").string;
              self.playerInfo.aliName = self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Name").getComponent("cc.EditBox").string;
            }

            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Account").getComponent("cc.EditBox").string = "";
            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_AccountConfirm").getComponent("cc.EditBox").string = "";
            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Name").getComponent("cc.EditBox").string = "";
            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").active = false;
            self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeAli").active = false;
            self.lobbyMain.com_PlayerInfo.getChildByName("bt_BindAli").active = false;
            self.lobbyMain.com_PlayerInfo.getChildByName("bt_BindedAli").active = true;
            self.lobbyMain.com_PlayerInfo.getChildByName("bt_BindedAli").getComponent("cc.Button").interactable = false;
            self.playerInfo.encryptAliAccount = self.lobbyMain.encryptString_Function(self.playerInfo.aliAccount, 3, 6);
            self.playerInfo.encryptAliName = self.lobbyMain.encryptString_Function(self.playerInfo.aliName, 1, 3);
            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_AccountInfo").getComponent("cc.Label").string = self.playerInfo.encryptAliAccount;
            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_NameInfo").getComponent("cc.Label").string = self.playerInfo.encryptAliName;
            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedAli").active = true;
            self.lobbyMain.com_PlayerInfo.active = false;
            self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
          }
        });
        /**
         * 
         */

        self.socket.on("scoreOutResult", function (ret) {
          var result = self.changeResultJSON(ret);
          self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
        });
        /**
         * 
         */

        self.socket.on("changeOfficialResult", function (ret) {
          var result = self.changeResultJSON(ret);
          self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("bt_Create").getComponent("cc.Button").interactable = true;

          if (result.ResultCode) {
            self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips0").getComponent("cc.Label").string = result.msg;
          } else {
            var data = {
              account: self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string,
              password: self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string
            };
            self.lobbyMain.getComponent("LobbyRegister").writeUserDate_Function(data, function () {
              self.playerInfo.account = data.account;
              self.playerInfo.password = data.password;
              self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string = "";
              self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string = "";
              self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string = "";
              self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").active = false;
              self.lobbyMain.com_PlayerInfo.getChildByName("bt_CreateAccount").active = false;
              self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").active = true;
              self.lobbyMain.com_PlayerInfo.getChildByName("bt_ChangeName").active = true;
              self.lobbyMain.com_PlayerInfo.getChildByName("bt_ChangeName").getComponent("cc.Button").interactable = false;
              self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_State").getComponent("cc.Label").string = "账号状态: 已转正";
              self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Account").getComponent("cc.Label").string = "账号: " + self.playerInfo.account;
              self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Id").getComponent("cc.Label").string = "用户ID: " + self.playerInfo.playerId;
              self.lobbyMain.com_PlayerInfo.active = false;
              self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
              self.playerInfo.isOffical = 1;
            });
          }
        });
        /**
         * 
         */

        self.socket.on("BankInfoResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (!result.Result) {
            switch (result.act) {
              case 1:
                self.lobbyMain.addCreditCard_Function(result.cardId, result.msg);
                break;

              case 2:
                self.lobbyMain.editCreditCard_Function(result.cardId, result.msg);
                break;

              case 3:
                self.lobbyMain.deleteCreditCard_Function(result.cardId, result.msg);
                break;
            }
          }
        });
        /**
         * 
         */

        self.socket.on("getBankResult", function (ret) {
          var result = self.changeResultJSON(ret);
          self.lobbyMain.bankInfoInit_Function(result.data.bankList);
        });
        /**
         * 修改密码
         */

        self.socket.on("updatePasswordResult", function (ret) {
          var result = self.changeResultJSON(ret);
          self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("bt_Change").getComponent("cc.Button").interactable = true;

          if (result.ResultCode) {
            self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips0").getComponent("cc.Label").string = result.msg;
          } else {
            var data = {
              account: self.playerInfo.account,
              password: self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_NewPassword").getComponent("cc.EditBox").string
            };
            self.lobbyMain.getComponent("LobbyRegister").writeUserDate_Function(data, function () {
              self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_OldPassword").getComponent("cc.EditBox").string = "", self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_NewPassword").getComponent("cc.EditBox").string = "", self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string = "", self.lobbyMain.com_PlayerInfo.active = false, self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
            });
          }
        });
        self.socket.on('updateHeadUrlResult', function (ret) {
          var result = self.changeResultJSON(ret);

          if (!result.Result) {
            var head = self.lobbyMain.com_BG.getChildByName("sp_Head");
            Helper.loadHead(result.url, function (texture) {
              head.getComponent(cc.Sprite).spriteFrame = texture;
            });
          }

          self.lobbyMain.showMessagebox_Function(result.msg, 1, 0);
        });
        /**
         * 设置头像返回信息
         */

        self.socket.on("setHeadResult", function (ret) {
          var result = self.changeResultJSON(ret);

          if (!result.Result) {
            self.playerInfo.playerHeadId = result.headId;
            self.lobbyMain.com_PlayerMessage.getChildByName("sp_Head").getComponent("cc.Sprite").spriteFrame = self.playerInfo.playerHeadArray[self.playerInfo.playerHeadId];
            self.playerInfo.playerHead = self.playerInfo.playerHeadArray[self.playerInfo.playerHeadId];
          }

          self.lobbyMain.showMessagebox_Function(result.msg, 1, 0);
        });
        self.socket.on("lineOutMsg", function (ret) {
          var result = self.changeResultJSON(ret);
          console.log('断线重连 发起', JSON.stringify(result));
          self.playerInfo.gameIp = Lhjconfig.Server_IP;
          self.playerInfo.gameProt = result.serverId;
          var tmpNet = null;

          if (result.serverId >= 13701 && result.serverId <= 13704) {
            //斗地主
            tmpNet = require("LandNetWork").getInstant;
          } else if (result.serverId >= 14101 && result.serverId <= 14104) {
            //德州
            tmpNet = require("HoldemNetWork").getInstant;
          } else if (result.serverId >= 13201 && result.serverId <= 13204) {
            //红包
            tmpNet = require("hongbaoNetWork").getInstant;
          } else if (result.serverId >= 13401 && result.serverId <= 13404) {
            //牛牛
            tmpNet = require("GrabBullNetWork").getInstant;
          } else if (result.serverId >= 13801 && result.serverId <= 13804) {
            //跑的快
            tmpNet = require("RuningNetWork").getInstant;
          } else if (result.serverId >= 14201 && result.serverId <= 14204) {
            //砸金花
            tmpNet = require("FlowerNetWork").getInstant;
          } else if (result.serverId == 13706) {
            tmpNet = require("LandNetWork").getInstant;
          }

          if (!!tmpNet) {
            self.lobbyMain.node.getChildByName('Loading').active = true; //点亮加载游戏界面

            if (result.serverId >= 13701 && result.serverId <= 13704 || result.serverId >= 13801 && result.serverId <= 13804 || result.serverId == 13706) {
              window.reconnectPoint = true; //判断是不是断线重连
            }

            tmpNet.setLobbyMainObj_Function(self.lobbyMain);
            tmpNet.loginGame_Function(self.playerInfo.gameIp, self.playerInfo.gameProt, self.playerInfo.playerId, self.playerInfo.gameSign);
            cc.audioEngine.stopAll();
          }
        }); //排行榜接口

        self.socket.on("getCoinRankResult", function (ret) {
          var result = self.changeResultJSON(ret);
          console.log('getCoinRankResult', JSON.stringify(result));

          if (result.ResultCode) {
            cc.find("Canvas").getComponent("LobbyMain").com_rank.getComponent("LobbyRank").updateCoinPanel(result.result);
          }
        });
        self.socket.on("getDiamondRankResult", function (ret) {
          var result = self.changeResultJSON(ret);
          console.log('getDiamondRankResult', JSON.stringify(result));

          if (result.ResultCode) {
            cc.find("Canvas").getComponent("LobbyMain").com_rank.getComponent("LobbyRank").updateDiamondPanel(result.result);
          }
        });
      },
      timeFormat: function timeFormat(nS) {
        var date = new Date(parseInt(nS)); // 时间戳为10位需乘1000，为13位则不用

        var Y = date.getFullYear(); // 年

        var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; // 月

        var D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + ''; // 日

        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); // 时

        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); // 分

        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); // 秒

        return Y + '' + M + '' + D; // yyyy/mm/dd hh:mm:ss
      },

      /**
       * 断开socket
       */
      logoutAccount_Function: function logoutAccount_Function() {
        console.log('logoutAccount_Function');
        this.socket.disconnect();
        this.socket = null;
      },

      /**
       * 设置场景对象
       * @param {*} scene 
       */
      setLobbyMainObj_Function: function setLobbyMainObj_Function(scene) {
        this.lobbyMain = scene;
      },

      /**
       * 获取url参数
       * @param {*} name 
       */
      getUrlCode_Function: function getUrlCode_Function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
      },

      /**
       * 解析JSON数据
       * @param {*} ret 
       */
      changeResultJSON: function changeResultJSON(ret) {
        if (cc.sys.isNative) {
          return JSON.parse(ret);
        }

        return ret;
      },
      changeHead: function changeHead(headUrl) {
        this.socket.emit('updateHeadUrl', JSON.stringify({
          url: headUrl
        }));
      }
    };
    module.exports = LobbyNetWork;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcTG9iYnlOZXRXb3JrLmpzIl0sIm5hbWVzIjpbIkxvYmJ5TmV0V29yayIsImFjY291bnRDaGFuZ2UiLCJsb2JieU1haW4iLCJwbGF5ZXJJbmZvIiwic2VydmVyTGlzdCIsImdldE5hbWVBbmRTaWduIiwiZ2V0TG9naW5Db2RlIiwiaGVhZFNwcml0ZSIsInNvY2tldCIsImlvIiwiY29ubmVjdGVkIiwidXNlck5hbWUiLCJwYXNzV29yZCIsImxvZ2luQ2xpY2siLCJuZXRXb3JrSW5pdF9GdW5jdGlvbiIsInJlcXVpcmUiLCJnZXRJbnN0YW50Iiwic2V0TG9iYnlNYWluT2JqX0Z1bmN0aW9uIiwiZ2FtZU9iaiIsImlzQXV0b0xvZ2luIiwidXNlckRhdGEiLCJjYyIsInN5cyIsImlzTmF0aXZlIiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsImxvZ2luQWNjb3VudF9GdW5jdGlvbiIsImxvZ2luSXAiLCJhY2NvdW50IiwicGFzc3dvcmQiLCJjb21fTG9naW4iLCJ0IiwibG9naW5Db2RlIiwiZ2V0VXJsQ29kZV9GdW5jdGlvbiIsInVybCIsIlNvY2tldElPIiwiY29ubmVjdCIsImxvZ2luU29ja2V0T25fRnVuY3Rpb24iLCJzZWxmIiwib24iLCJyZXQiLCJjb21fTWVzc2FnZUJveCIsImdldENvbXBvbmVudCIsInN0cmluZyIsImtleSIsIiRldmVudHMiLCJyZW1vdmVMaXN0ZW4iLCJkaXNjb25uZXRlZCIsImVtaXQiLCJjaGVja0FjY291bnRfRnVuY3Rpb24iLCJiZ19CbGFjayIsImNvbnNvbGUiLCJsb2ciLCJzdHJpbmdpZnkiLCJyZXN1bHQiLCJjaGFuZ2VSZXN1bHRKU09OIiwicmVzdWx0aWQiLCJjb21fUGxheWVySW5mbyIsImludGVyYWN0YWJsZSIsInNob3dNZXNzYWdlYm94X0Z1bmN0aW9uIiwiT2JqIiwiZ2FtZVNpZ24iLCJzaWduIiwicGxheWVySWQiLCJpZCIsInBsYXllck5hbWUiLCJuaWNrbmFtZSIsInBsYXllckNvaW4iLCJzY29yZSIsImV4Y2hhbmdlUmF0ZSIsInBsYXllckRpYW1vbmQiLCJkaWFtb25kIiwicGxheWVySGVhZElkIiwiaGVhZGltZ3VybCIsImlvc0NoYW5uZWwiLCJDaGFubmVsVHlwZSIsIndpbl9wb29sIiwicHJvcGxpc3QiLCJwbGF5ZXJHaWZ0IiwicGhvbmVOdW1iZXIiLCJwaG9uZU5vIiwiZW5jcnlwdFN0cmluZ19GdW5jdGlvbiIsImlzT2ZmaWNhbCIsIm9mZmljaWFsIiwiZ2FtZURpc2Nvbm5lY3QiLCJnYW1lTmFtZSIsImNvbV9QbGF5ZXJNZXNzYWdlIiwidG9GaXhlZCIsImNvbV9NYWxsIiwiY29tX0N1c3RvbWVyU2VydmljZSIsImNvbV9TZXR0aW5nIiwiY29tX1JlZ2lzdGVyIiwiY29tX01haWwiLCJjb21fYmFuayIsImphY2twb3Rfc2NyaXB0IiwiU2hvd0phY2tQb3QiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwiY2hhbmdlVXNlckRhdGFfRnVuY3Rpb24iLCJsb2JieUluaXRfRnVuY3Rpb24iLCJHYW1lSW5mbyIsImdhbWVNZW51SW5pdF9GdW5jdGlvbiIsImFub3RoZXJGdW5jdGlvbkluaXRfRnVuY3Rpb24iLCJSZXN1bHQiLCJyZW1haW5TY29yZSIsIm1zZyIsInJlc3VsdENvZGUiLCJjaGVja0lkUmVzdWx0IiwiZGVsZXRlQ291bnQiLCJsYmwiLCJjc0RhdGEiLCJnbV9pZCIsInNldENoYXRfRnVuY3Rpb24iLCJuYW1lIiwiY3VzdG9tZXJTZXJ2aWNlU2VuZE1lc3NhZ2VfRnVuY3Rpb24iLCJ1c2VySWQiLCJSZXN1bHRDb2RlIiwic2VuZE1lc3NhZ2UiLCJpZExpc3QiLCJBcnJheSIsImRhdGEiLCJjaGF0TGlzdCIsImkiLCJsZW5ndGgiLCJzaG93U2VsZWN0Q29pbiIsInBsYXllckJhbmtDb2luIiwiYmFua1Njb3JlIiwidXBkYXRlVmlldyIsInN5c3RlbU1lc3NhZ2VBcnJheSIsImNvbV9TeXN0ZW1NZXNzYWdlIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJzeXN0ZW1NZXNzYWdlU2lnbiIsInVwZGF0ZVN5c3RlbU1lc3NhZ2VfRnVuY3Rpb24iLCJ0eHQiLCJtb3ZlU3lzdGVtTWVzc2FnZV9GdW5jdGlvbiIsImFsaUFjY291bnQiLCJ6aGlmdWJhbyIsImFsaU5hbWUiLCJ6aGlmdWJhb05hbWUiLCJwbGF5ZXJJbmZvTWVudUluaXRfRnVuY3Rpb24iLCJhZGRNYWlsX0Z1bmN0aW9uIiwicHJpemVMaXN0IiwibWFpbEluaXRfRnVuY3Rpb24iLCJ3aW5TY29yZSIsInBhcnNlRmxvYXQiLCJkZXN0cm95TWFpbF9GdW5jdGlvbiIsImVudGVyUm9vbSIsInVuZGVmaW5lZCIsImhlYXJ0QmVhdFRpbWUiLCJoZWFydEJlYXRUaW1lT3V0IiwiZW5jcnlwdEFsaUFjY291bnQiLCJlbmNyeXB0QWxpTmFtZSIsIndyaXRlVXNlckRhdGVfRnVuY3Rpb24iLCJhY3QiLCJhZGRDcmVkaXRDYXJkX0Z1bmN0aW9uIiwiY2FyZElkIiwiZWRpdENyZWRpdENhcmRfRnVuY3Rpb24iLCJkZWxldGVDcmVkaXRDYXJkX0Z1bmN0aW9uIiwiYmFua0luZm9Jbml0X0Z1bmN0aW9uIiwiYmFua0xpc3QiLCJoZWFkIiwiY29tX0JHIiwiSGVscGVyIiwibG9hZEhlYWQiLCJ0ZXh0dXJlIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJoZWFkSWQiLCJwbGF5ZXJIZWFkQXJyYXkiLCJwbGF5ZXJIZWFkIiwiZ2FtZUlwIiwiTGhqY29uZmlnIiwiU2VydmVyX0lQIiwiZ2FtZVByb3QiLCJzZXJ2ZXJJZCIsInRtcE5ldCIsIndpbmRvdyIsInJlY29ubmVjdFBvaW50IiwibG9naW5HYW1lX0Z1bmN0aW9uIiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwiZmluZCIsImNvbV9yYW5rIiwidXBkYXRlQ29pblBhbmVsIiwidXBkYXRlRGlhbW9uZFBhbmVsIiwidGltZUZvcm1hdCIsIm5TIiwiZGF0ZSIsIkRhdGUiLCJwYXJzZUludCIsIlkiLCJnZXRGdWxsWWVhciIsIk0iLCJnZXRNb250aCIsIkQiLCJnZXREYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJzIiwiZ2V0U2Vjb25kcyIsImxvZ291dEFjY291bnRfRnVuY3Rpb24iLCJkaXNjb25uZWN0Iiwic2NlbmUiLCJyZWciLCJSZWdFeHAiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsIm1hdGNoIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiY2hhbmdlSGVhZCIsImhlYWRVcmwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLFlBQVksR0FBRztBQUNmQyxFQUFBQSxhQUFhLEVBQUUsS0FEQTtBQUVmQyxFQUFBQSxTQUFTLEVBQUUsSUFGSTtBQUdmQyxFQUFBQSxVQUFVLEVBQUUsSUFIRztBQUlmQyxFQUFBQSxVQUFVLEVBQUUsSUFKRztBQUtmQyxFQUFBQSxjQUFjLEVBQUUsS0FMRDtBQU1mQyxFQUFBQSxZQUFZLEVBQUUsS0FOQztBQU9mQyxFQUFBQSxVQUFVLEVBQUUsSUFQRztBQVFmQyxFQUFBQSxNQUFNLEVBQUUsSUFSTztBQVNmQyxFQUFBQSxFQUFFLEVBQUUsSUFUVztBQVVmQyxFQUFBQSxTQUFTLEVBQUUsS0FWSTtBQVdmQyxFQUFBQSxRQUFRLEVBQUUsRUFYSztBQVlmQyxFQUFBQSxRQUFRLEVBQUUsRUFaSztBQWFmQyxFQUFBQSxVQUFVLEVBQUUsS0FiRzs7QUFjZjtBQUNKO0FBQ0E7QUFDSUMsRUFBQUEsb0JBQW9CLEVBQUUsZ0NBQVk7QUFDOUIsU0FBS0wsRUFBTCxHQUFVLElBQVY7QUFDQSxTQUFLRCxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtFLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQUFLUCxVQUFMLEdBQWtCWSxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQyxVQUF4QztBQUNBLFNBQUtDLHdCQUFMLENBQThCLEtBQUtkLFVBQUwsQ0FBZ0JlLE9BQTlDOztBQUNBLFlBQVEsS0FBS2YsVUFBTCxDQUFnQmdCLFdBQXhCO0FBQ0ksV0FBSyxDQUFMO0FBQVE7QUFDSixZQUFJQyxRQUFRLEdBQUcsSUFBZixDQURKLENBRUk7O0FBQ0EsWUFBSUMsRUFBRSxDQUFDQyxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakJILFVBQUFBLFFBQVEsR0FBR0ksSUFBSSxDQUFDQyxLQUFMLENBQVdKLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPSSxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixDQUFYLENBQVg7QUFDSCxTQUZELE1BRU87QUFDSFAsVUFBQUEsUUFBUSxHQUFHSSxJQUFJLENBQUNDLEtBQUwsQ0FBV0MsWUFBWSxDQUFDQyxPQUFiLENBQXFCLFVBQXJCLENBQVgsQ0FBWDtBQUNIOztBQUVELFlBQUlQLFFBQUosRUFBYztBQUNWLGVBQUtsQixTQUFMLENBQWUwQixJQUFmLENBQW9CQyxjQUFwQixDQUFtQyxTQUFuQyxFQUE4Q0MsTUFBOUMsR0FBdUQsSUFBdkQ7QUFDQSxlQUFLQyxxQkFBTCxDQUEyQixLQUFLNUIsVUFBTCxDQUFnQjZCLE9BQTNDLEVBQW9EWixRQUFRLENBQUNhLE9BQTdELEVBQXNFYixRQUFRLENBQUNjLFFBQS9FO0FBQ0gsU0FIRCxNQUdPO0FBQ0gsZUFBS2hDLFNBQUwsQ0FBZWlDLFNBQWYsQ0FBeUJMLE1BQXpCLEdBQWtDLElBQWxDO0FBQ0g7O0FBQ0Q7O0FBQ0osV0FBSyxDQUFMO0FBQVE7QUFDSixhQUFLQyxxQkFBTCxDQUEyQixLQUFLNUIsVUFBTCxDQUFnQjZCLE9BQTNDO0FBQ0E7O0FBQ0osV0FBSyxDQUFMO0FBQVE7QUFDSixhQUFLL0IsYUFBTCxHQUFxQixJQUFyQjtBQUNBLFlBQUltQyxDQUFDLEdBQUcsRUFBUjtBQUNBQSxRQUFBQSxDQUFDLEdBQUcsS0FBS2pDLFVBQUwsQ0FBZ0JrQyxTQUFoQixHQUE0QixLQUFLbEMsVUFBTCxDQUFnQmtDLFNBQTVDLEdBQXdELEtBQUtDLG1CQUFMLENBQXlCLFdBQXpCLENBQTVELEVBQ0lGLENBQUMsR0FBRyxLQUFLTCxxQkFBTCxDQUEyQixLQUFLNUIsVUFBTCxDQUFnQjZCLE9BQTNDLEVBQW9ELElBQXBELEVBQTBELElBQTFELEVBQWdFSSxDQUFoRSxDQUFILElBQXlFLEtBQUtuQyxhQUFMLEdBQXFCLEtBQXJCLEVBQTRCLEtBQUs4QixxQkFBTCxDQUEyQixLQUFLNUIsVUFBTCxDQUFnQjZCLE9BQTNDLENBQXJHLENBREw7QUFFQTtBQXpCUjtBQTJCSCxHQWxEYzs7QUFtRGY7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUQsRUFBQUEscUJBQXFCLEVBQUUsK0JBQVVRLEdBQVYsRUFBZU4sT0FBZixFQUF3QnJCLFFBQXhCLEVBQWtDeUIsU0FBbEMsRUFBNkM7QUFDaEUsU0FBSzFCLFFBQUwsR0FBZ0JzQixPQUFoQjtBQUNBLFNBQUtyQixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUt5QixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUs3QixNQUFMLEdBQWMsSUFBZDs7QUFDQSxRQUFJYSxFQUFFLENBQUNDLEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQixXQUFLZixNQUFMLEdBQWNnQyxRQUFRLENBQUNDLE9BQVQsQ0FBaUJGLEdBQWpCLENBQWQ7QUFFSCxLQUhELE1BR087QUFDSCxXQUFLOUIsRUFBTCxHQUFVTSxPQUFPLENBQUMsV0FBRCxDQUFqQjtBQUNBLFdBQUtQLE1BQUwsR0FBYyxLQUFLQyxFQUFMLENBQVE4QixHQUFSLENBQWQ7QUFDSDs7QUFDRCxTQUFLRyxzQkFBTDtBQUNILEdBdkVjO0FBd0VmQSxFQUFBQSxzQkFBc0IsRUFBRSxrQ0FBWTtBQUNoQyxRQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUNBO0FBQ1I7QUFDQTs7QUFDUUEsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLGVBQWYsRUFBZ0MsVUFBVUMsR0FBVixFQUFlO0FBQzNDLFVBQUlGLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRDLGNBQWYsSUFBaUMsSUFBckMsRUFBMkM7QUFDdkM7QUFDSDs7QUFDREgsTUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEMsY0FBZixDQUE4QmpCLGNBQTlCLENBQTZDLFNBQTdDLEVBQXdEa0IsWUFBeEQsQ0FBcUUsVUFBckUsRUFBaUZDLE1BQWpGLEdBQTBGLFlBQTFGOztBQUNBLFVBQUlMLElBQUksQ0FBQ25DLE1BQUwsS0FBZ0IsSUFBcEIsRUFBMEI7QUFDdEIsYUFBSyxJQUFJeUMsR0FBVCxJQUFnQk4sSUFBSSxDQUFDbkMsTUFBTCxDQUFZMEMsT0FBNUIsRUFBcUM7QUFDakMsY0FBSUQsR0FBRyxLQUFLLENBQVosRUFBZTtBQUNYTixZQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVkyQyxZQUFaLENBQXlCRixHQUF6QjtBQUNIO0FBQ0o7QUFDSjtBQUNKLEtBWkQ7QUFhQTtBQUNSO0FBQ0E7O0FBQ1FOLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxpQkFBZixFQUFrQyxVQUFVQyxHQUFWLEVBQWU7QUFDN0NGLE1BQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRDLGNBQWYsQ0FBOEJqQixjQUE5QixDQUE2QyxTQUE3QyxFQUF3RGtCLFlBQXhELENBQXFFLFVBQXJFLEVBQWlGQyxNQUFqRixHQUEwRixZQUExRjs7QUFDQSxVQUFJTCxJQUFJLENBQUNuQyxNQUFMLEtBQWdCLElBQXBCLEVBQTBCO0FBQ3RCLGFBQUssSUFBSXlDLEdBQVQsSUFBZ0JOLElBQUksQ0FBQ25DLE1BQUwsQ0FBWTBDLE9BQTVCLEVBQXFDO0FBQ2pDLGNBQUlELEdBQUcsS0FBSyxDQUFaLEVBQWU7QUFDWE4sWUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZMkMsWUFBWixDQUF5QkYsR0FBekI7QUFDSDtBQUNKO0FBQ0o7QUFDSixLQVREO0FBVUE7QUFDUjtBQUNBOztBQUNRTixJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUsT0FBZixFQUF3QixVQUFVQyxHQUFWLEVBQWU7QUFDbkNGLE1BQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRDLGNBQWYsQ0FBOEJqQixjQUE5QixDQUE2QyxTQUE3QyxFQUF3RGtCLFlBQXhELENBQXFFLFVBQXJFLEVBQWlGQyxNQUFqRixHQUEwRixZQUExRjs7QUFDQSxVQUFJTCxJQUFJLENBQUNuQyxNQUFMLEtBQWdCLElBQXBCLEVBQTBCO0FBQ3RCLGFBQUssSUFBSXlDLEdBQVQsSUFBZ0JOLElBQUksQ0FBQ25DLE1BQUwsQ0FBWTBDLE9BQTVCLEVBQXFDO0FBQ2pDLGNBQUlELEdBQUcsS0FBSyxDQUFaLEVBQWU7QUFDWE4sWUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZMkMsWUFBWixDQUF5QkYsR0FBekI7QUFDSDtBQUNKO0FBQ0o7QUFDSixLQVREO0FBVUE7QUFDUjtBQUNBOztBQUNRTixJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUsV0FBZixFQUE0QixVQUFVQyxHQUFWLEVBQWU7QUFDdkMsVUFBSUYsSUFBSSxDQUFDbkMsTUFBTCxLQUFnQixJQUFwQixFQUEwQjtBQUN0QixhQUFLLElBQUl5QyxHQUFULElBQWdCTixJQUFJLENBQUNuQyxNQUFMLENBQVkwQyxPQUE1QixFQUFxQztBQUNqQyxjQUFJRCxHQUFHLEtBQUssQ0FBWixFQUFlO0FBQ1hOLFlBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWTJDLFlBQVosQ0FBeUJGLEdBQXpCO0FBQ0g7QUFDSjtBQUNKO0FBQ0osS0FSRDtBQVNBO0FBQ1I7QUFDQTtBQUNBOztBQUNRTixJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUsV0FBZixFQUE0QixVQUFVQyxHQUFWLEVBQWU7QUFDdkM7QUFDQSxVQUFJQSxHQUFKLEVBQVM7QUFDTEYsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFla0QsV0FBZixHQUE2QixLQUE3Qjs7QUFDQSxZQUFJVCxJQUFJLENBQUMxQyxhQUFULEVBQXdCO0FBQ3BCLGtCQUFRMEMsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQmdCLFdBQXhCO0FBQ0ksaUJBQUssQ0FBTDtBQUNBLGlCQUFLLENBQUw7QUFDSXdCLGNBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWTZDLElBQVosQ0FBaUIsT0FBakIsRUFBMEI7QUFDdEIxQyxnQkFBQUEsUUFBUSxFQUFFZ0MsSUFBSSxDQUFDaEMsUUFETztBQUV0QnVCLGdCQUFBQSxRQUFRLEVBQUVTLElBQUksQ0FBQy9CO0FBRk8sZUFBMUI7QUFJQTs7QUFDSixpQkFBSyxDQUFMO0FBQVE7QUFDSitCLGNBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWTZDLElBQVosQ0FBaUIsT0FBakIsRUFBMEI7QUFDdEJoQixnQkFBQUEsU0FBUyxFQUFFTSxJQUFJLENBQUNOO0FBRE0sZUFBMUI7QUFHQTtBQVpSO0FBY0gsU0FmRCxNQWVPO0FBQ0hNLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTZDLFlBQWYsQ0FBNEIsZUFBNUIsRUFBNkNPLHFCQUE3QyxDQUFtRVgsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjZCLE9BQW5GO0FBQ0g7O0FBRUQsWUFBSSxDQUFDVyxJQUFJLENBQUN6QyxTQUFMLENBQWVrRCxXQUFwQixFQUFpQztBQUM3QlQsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlcUQsUUFBZixDQUF3QnpCLE1BQXhCLEdBQWlDLEtBQWpDO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRDLGNBQWYsQ0FBOEJoQixNQUE5QixHQUF1QyxLQUF2QztBQUNIOztBQUVEYSxRQUFBQSxJQUFJLENBQUNqQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0g7QUFDSixLQTlCRDtBQStCQTtBQUNSO0FBQ0E7O0FBQ1FpQyxJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUsYUFBZixFQUE4QixVQUFVQyxHQUFWLEVBQWU7QUFDekNXLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVlqQyxJQUFJLENBQUNrQyxTQUFMLENBQWViLEdBQWYsQ0FBeEI7QUFDQSxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjs7QUFDQSxjQUFRYyxNQUFNLENBQUNFLFFBQWY7QUFDSSxhQUFLLENBQUMsQ0FBTjtBQUNJbEIsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlcUQsUUFBZixDQUF3QnpCLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTZDLFlBQWYsQ0FBNEIsV0FBNUIsRUFBeUNlLGNBQXpDLENBQXdEakMsY0FBeEQsQ0FBdUUsbUJBQXZFLEVBQTRGQSxjQUE1RixDQUEyRyxhQUEzRyxFQUEwSGtCLFlBQTFILENBQXVJLFlBQXZJLEVBQXFKQyxNQUFySixHQUE4SixFQUE5SjtBQUNBTCxVQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWVpQyxTQUFmLENBQXlCTixjQUF6QixDQUF3QyxVQUF4QyxFQUFvRGtCLFlBQXBELENBQWlFLFdBQWpFLEVBQThFZ0IsWUFBOUUsR0FBNkYsSUFBN0Y7QUFDQXBCLFVBQUFBLElBQUksQ0FBQzFDLGFBQUwsR0FBcUIsS0FBckI7O0FBQ0Esa0JBQVEwQyxJQUFJLENBQUN4QyxVQUFMLENBQWdCZ0IsV0FBeEI7QUFDSSxpQkFBSyxDQUFMO0FBQ0k7O0FBQ0osaUJBQUssQ0FBTDtBQUNJd0IsY0FBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlOEQsdUJBQWYsQ0FBdUMsaUJBQXZDLEVBQTBELENBQTFELEVBQTZELENBQTdEO0FBQ0E7O0FBQ0osaUJBQUssQ0FBTDtBQUNJckIsY0FBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlOEQsdUJBQWYsQ0FBdUMsaUJBQXZDLEVBQTBELENBQTFELEVBQTZELENBQTdEO0FBQ0E7QUFSUjs7QUFVQTs7QUFDSixhQUFLLENBQUMsQ0FBTjtBQUNJckIsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlcUQsUUFBZixDQUF3QnpCLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTZDLFlBQWYsQ0FBNEIsV0FBNUIsRUFBeUNlLGNBQXpDLENBQXdEakMsY0FBeEQsQ0FBdUUsbUJBQXZFLEVBQTRGQSxjQUE1RixDQUEyRyxhQUEzRyxFQUEwSGtCLFlBQTFILENBQXVJLFlBQXZJLEVBQXFKQyxNQUFySixHQUE4SixFQUE5SjtBQUNBTCxVQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWVpQyxTQUFmLENBQXlCTixjQUF6QixDQUF3QyxVQUF4QyxFQUFvRGtCLFlBQXBELENBQWlFLFdBQWpFLEVBQThFZ0IsWUFBOUUsR0FBNkYsSUFBN0Y7QUFDQXBCLFVBQUFBLElBQUksQ0FBQzFDLGFBQUwsR0FBcUIsS0FBckI7O0FBQ0Esa0JBQVEwQyxJQUFJLENBQUN4QyxVQUFMLENBQWdCZ0IsV0FBeEI7QUFDSSxpQkFBSyxDQUFMO0FBQ0l3QixjQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1QyxxQkFBdkMsRUFBOEQsQ0FBOUQsRUFBaUUsQ0FBakU7QUFDQTs7QUFDSixpQkFBSyxDQUFMO0FBQ0lyQixjQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1QyxxQkFBdkMsRUFBOEQsQ0FBOUQsRUFBaUUsQ0FBakU7QUFDQTs7QUFDSixpQkFBSyxDQUFMO0FBQ0lyQixjQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1QyxxQkFBdkMsRUFBOEQsQ0FBOUQsRUFBaUUsQ0FBakU7QUFDQTtBQVRSOztBQVdBOztBQUNKLGFBQUssQ0FBTDtBQUNJckIsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlcUQsUUFBZixDQUF3QnpCLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTZDLFlBQWYsQ0FBNEIsV0FBNUIsRUFBeUNlLGNBQXpDLENBQXdEakMsY0FBeEQsQ0FBdUUsbUJBQXZFLEVBQTRGQSxjQUE1RixDQUEyRyxhQUEzRyxFQUEwSGtCLFlBQTFILENBQXVJLFlBQXZJLEVBQXFKQyxNQUFySixHQUE4SixFQUE5SjtBQUNBTCxVQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWVpQyxTQUFmLENBQXlCTixjQUF6QixDQUF3QyxVQUF4QyxFQUFvRGtCLFlBQXBELENBQWlFLFdBQWpFLEVBQThFZ0IsWUFBOUUsR0FBNkYsSUFBN0Y7QUFDQXBCLFVBQUFBLElBQUksQ0FBQzFDLGFBQUwsR0FBcUIsS0FBckI7O0FBQ0Esa0JBQVEwQyxJQUFJLENBQUN4QyxVQUFMLENBQWdCZ0IsV0FBeEI7QUFDSSxpQkFBSyxDQUFMO0FBQ0l3QixjQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1QyxnQkFBdkMsRUFBeUQsQ0FBekQsRUFBNEQsRUFBNUQ7QUFDQTs7QUFDSixpQkFBSyxDQUFMO0FBQ0lyQixjQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1Qyx1Q0FBdkMsRUFBZ0YsQ0FBaEYsRUFBbUYsQ0FBbkY7QUFDQTs7QUFDSixpQkFBSyxDQUFMO0FBQ0lyQixjQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1QyxnQkFBdkMsRUFBeUQsQ0FBekQsRUFBNEQsRUFBNUQ7QUFDQTtBQVRSOztBQVdBOztBQUNKLGFBQUssQ0FBTDtBQUNJckIsVUFBQUEsSUFBSSxDQUFDOUIsVUFBTCxHQUFrQixLQUFsQjtBQUNBOEIsVUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjhCLE9BQWhCLEdBQTBCMEIsTUFBTSxDQUFDTSxHQUFQLENBQVdoQyxPQUFyQztBQUNBVSxVQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCK0IsUUFBaEIsR0FBMkJTLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZWlDLFNBQWYsQ0FBeUJOLGNBQXpCLENBQXdDLGFBQXhDLEVBQXVEa0IsWUFBdkQsQ0FBb0UsWUFBcEUsRUFBa0ZDLE1BQTdHO0FBQ0FMLFVBQUFBLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0JrQyxTQUFoQixHQUE0Qk0sSUFBSSxDQUFDTixTQUFqQztBQUNBTSxVQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCK0QsUUFBaEIsR0FBMkJQLE1BQU0sQ0FBQ00sR0FBUCxDQUFXRSxJQUF0QztBQUNBeEIsVUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQmlFLFFBQWhCLEdBQTJCVCxNQUFNLENBQUNNLEdBQVAsQ0FBV0ksRUFBdEM7QUFDQTFCLFVBQUFBLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0JtRSxVQUFoQixHQUE2QlgsTUFBTSxDQUFDTSxHQUFQLENBQVdNLFFBQXhDO0FBQ0E1QixVQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCcUUsVUFBaEIsR0FBNkJiLE1BQU0sQ0FBQ00sR0FBUCxDQUFXUSxLQUFYLEdBQW1COUIsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQnVFLFlBQWhFO0FBQ0EvQixVQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCd0UsYUFBaEIsR0FBZ0NoQixNQUFNLENBQUNNLEdBQVAsQ0FBV1csT0FBM0M7QUFDQWpDLFVBQUFBLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0IwRSxZQUFoQixHQUErQmxCLE1BQU0sQ0FBQ00sR0FBUCxDQUFXYSxVQUExQztBQUNBbkMsVUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjRFLFVBQWhCLEdBQTZCcEIsTUFBTSxDQUFDTSxHQUFQLENBQVdlLFdBQXhDO0FBQ0FyQyxVQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCOEUsUUFBaEIsR0FBMkJ0QixNQUFNLENBQUNzQixRQUFsQzs7QUFFQSxjQUFJdEIsTUFBTSxDQUFDTSxHQUFQLENBQVdpQixRQUFYLENBQW9CLENBQXBCLENBQUosRUFBNEI7QUFDeEJ2QyxZQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCZ0YsVUFBaEIsR0FBNkJ4QixNQUFNLENBQUNNLEdBQVAsQ0FBV2lCLFFBQVgsQ0FBb0IsQ0FBcEIsQ0FBN0I7QUFDSCxXQUZELE1BRU87QUFDSHZDLFlBQUFBLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0JnRixVQUFoQixHQUE2QixDQUE3QjtBQUNIOztBQUNEeEMsVUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQmlGLFdBQWhCLEdBQThCekIsTUFBTSxDQUFDTSxHQUFQLENBQVdvQixPQUF6Qzs7QUFFQSxjQUFJMUIsTUFBTSxDQUFDTSxHQUFQLENBQVdvQixPQUFmLEVBQXdCO0FBQ3BCMUMsWUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGlCQUE3QyxFQUFnRUEsY0FBaEUsQ0FBK0UsV0FBL0UsRUFBNEZrQixZQUE1RixDQUF5RyxVQUF6RyxFQUFxSEMsTUFBckgsR0FBOEhMLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZW9GLHNCQUFmLENBQXNDM0IsTUFBTSxDQUFDTSxHQUFQLENBQVdvQixPQUFqRCxFQUEwRCxDQUExRCxFQUE2RCxDQUE3RCxDQUE5SDtBQUNILFdBRkQsTUFFTztBQUNIMUMsWUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGlCQUE3QyxFQUFnRUEsY0FBaEUsQ0FBK0UsV0FBL0UsRUFBNEZrQixZQUE1RixDQUF5RyxVQUF6RyxFQUFxSEMsTUFBckgsR0FBOEgsRUFBOUg7QUFDSDs7QUFDREwsVUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQm9GLFNBQWhCLEdBQTRCNUIsTUFBTSxDQUFDTSxHQUFQLENBQVd1QixRQUF2QztBQUNBN0MsVUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQnNGLGNBQWhCLEtBQW1DOUMsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQnVGLFFBQWhCLEdBQTJCLE9BQTlEO0FBQ0EvQyxVQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWV5RixpQkFBZixDQUFpQzlELGNBQWpDLENBQWdELGVBQWhELEVBQWlFa0IsWUFBakUsQ0FBOEUsVUFBOUUsRUFBMEZDLE1BQTFGLEdBQW1HVyxNQUFNLENBQUNNLEdBQVAsQ0FBV00sUUFBOUc7QUFDQTVCLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZXlGLGlCQUFmLENBQWlDOUQsY0FBakMsQ0FBZ0QsYUFBaEQsRUFBK0RrQixZQUEvRCxDQUE0RSxVQUE1RSxFQUF3RkMsTUFBeEYsR0FBaUdXLE1BQU0sQ0FBQ00sR0FBUCxDQUFXSSxFQUE1RztBQUNBMUIsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFleUYsaUJBQWYsQ0FBaUM5RCxjQUFqQyxDQUFnRCxnQkFBaEQsRUFBa0VrQixZQUFsRSxDQUErRSxVQUEvRSxFQUEyRkMsTUFBM0YsR0FBb0dMLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0JxRSxVQUFoQixDQUEyQm9CLE9BQTNCLENBQW1DLENBQW5DLENBQXBHO0FBQ0FqRCxVQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWV5RixpQkFBZixDQUFpQzlELGNBQWpDLENBQWdELGtCQUFoRCxFQUFvRWtCLFlBQXBFLENBQWlGLFVBQWpGLEVBQTZGQyxNQUE3RixHQUFzR0wsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQndFLGFBQXRIO0FBQ0FoQyxVQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCaEMsTUFBOUIsR0FBdUMsS0FBdkM7QUFDQWEsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlMkYsUUFBZixDQUF3Qi9ELE1BQXhCLEdBQWlDLEtBQWpDO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRGLG1CQUFmLENBQW1DaEUsTUFBbkMsR0FBNEMsS0FBNUM7QUFDQWEsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNkYsV0FBZixDQUEyQmpFLE1BQTNCLEdBQW9DLEtBQXBDO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZWlDLFNBQWYsQ0FBeUJMLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZThGLFlBQWYsQ0FBNEJsRSxNQUE1QixHQUFxQyxLQUFyQztBQUNBYSxVQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWUrRixRQUFmLENBQXdCbkUsTUFBeEIsR0FBaUMsS0FBakM7QUFDQWEsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlZ0csUUFBZixDQUF3QnBFLE1BQXhCLEdBQWlDLEtBQWpDO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZWlHLGNBQWYsQ0FBOEJDLFdBQTlCLENBQTBDekMsTUFBTSxDQUFDc0IsUUFBakQsRUF4Q0osQ0F3Q2dFOztBQUM1RCxjQUFJdEMsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQmdCLFdBQWhCLEtBQWdDLENBQXBDLEVBQXVDO0FBQ25Da0YsWUFBQUEsT0FBTyxDQUFDQyxZQUFSLENBQXFCLElBQXJCLEVBQTJCLFlBQTNCLEVBQXlDLFVBQXpDO0FBQ0g7O0FBQ0QsY0FBSTNELElBQUksQ0FBQzFDLGFBQVQsRUFBd0I7QUFFcEIsZ0JBQUkwQyxJQUFJLENBQUNoQyxRQUFMLEtBQWtCLEVBQWxCLElBQXdCZ0MsSUFBSSxDQUFDL0IsUUFBTCxLQUFrQixFQUE5QyxFQUFrRDtBQUM5QytCLGNBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTZDLFlBQWYsQ0FBNEIsZUFBNUIsRUFBNkN3RCx1QkFBN0MsQ0FBcUU1RCxJQUFJLENBQUNoQyxRQUExRSxFQUFvRmdDLElBQUksQ0FBQy9CLFFBQXpGO0FBQ0g7O0FBRUQrQixZQUFBQSxJQUFJLENBQUMxQyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EwQyxZQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU2QyxZQUFmLENBQTRCLFdBQTVCLEVBQXlDZSxjQUF6QyxDQUF3RGpDLGNBQXhELENBQXVFLG1CQUF2RSxFQUE0RkMsTUFBNUYsR0FBcUcsS0FBckc7QUFDQWEsWUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNkMsWUFBZixDQUE0QixXQUE1QixFQUF5Q2UsY0FBekMsQ0FBd0RqQyxjQUF4RCxDQUF1RSxtQkFBdkUsRUFBNEZBLGNBQTVGLENBQTJHLFlBQTNHLEVBQXlIa0IsWUFBekgsQ0FBc0ksWUFBdEksRUFBb0pDLE1BQXBKLEdBQTZKLEVBQTdKO0FBQ0FMLFlBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTZDLFlBQWYsQ0FBNEIsV0FBNUIsRUFBeUNlLGNBQXpDLENBQXdEakMsY0FBeEQsQ0FBdUUsbUJBQXZFLEVBQTRGQSxjQUE1RixDQUEyRyxhQUEzRyxFQUEwSGtCLFlBQTFILENBQXVJLFlBQXZJLEVBQXFKQyxNQUFySixHQUE4SixFQUE5SjtBQUNIOztBQUNETCxVQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWVzRyxrQkFBZjtBQUNBO0FBM0dSOztBQTRHQztBQUNEN0QsTUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNkMsWUFBZixDQUE0QixXQUE1QixFQUF5Q2UsY0FBekMsQ0FBd0RqQyxjQUF4RCxDQUF1RSxrQkFBdkUsRUFBMkZrQixZQUEzRixDQUF3RyxXQUF4RyxFQUFxSGdCLFlBQXJILEdBQW9JLElBQXBJO0FBQ0FwQixNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU2QyxZQUFmLENBQTRCLFdBQTVCLEVBQXlDZSxjQUF6QyxDQUF3RGpDLGNBQXhELENBQXVFLG1CQUF2RSxFQUE0RkEsY0FBNUYsQ0FBMkcsV0FBM0csRUFBd0hrQixZQUF4SCxDQUFxSSxXQUFySSxFQUFrSmdCLFlBQWxKLEdBQWlLLElBQWpLO0FBQ0FwQixNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWUwQixJQUFmLENBQW9CQyxjQUFwQixDQUFtQyxTQUFuQyxFQUE4Q0MsTUFBOUMsR0FBdUQsS0FBdkQ7QUFDSCxLQW5IRDtBQXFIQTtBQUNSO0FBQ0E7O0FBQ1FhLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxrQkFBZixFQUFtQyxVQUFVQyxHQUFWLEVBQWU7QUFDOUMsVUFBSWMsTUFBTSxHQUFHaEIsSUFBSSxDQUFDaUIsZ0JBQUwsQ0FBc0JmLEdBQXRCLENBQWI7O0FBQ0EsVUFBSWMsTUFBSixFQUFZO0FBQ1JoQixRQUFBQSxJQUFJLENBQUN2QyxVQUFMLEdBQWtCdUQsTUFBTSxDQUFDOEMsUUFBekIsQ0FEUSxDQUVSO0FBQ0E7QUFDQTtBQUNBOztBQUNBOUQsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNkMsWUFBZixDQUE0QixXQUE1QixFQUF5QzJELHFCQUF6QyxDQUErRC9ELElBQUksQ0FBQ3ZDLFVBQXBFO0FBQ0g7QUFDSixLQVZEO0FBV0F1QyxJQUFBQSxJQUFJLENBQUNnRSw0QkFBTDtBQUVBO0FBQ1I7QUFDQTs7QUFDUWhFLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxjQUFmLEVBQStCLFVBQUNDLEdBQUQsRUFBUztBQUNwQyxVQUFJRixJQUFJLENBQUN6QyxTQUFMLENBQWVpRyxjQUFmLElBQWlDLElBQXJDLEVBQTJDO0FBQ3ZDO0FBQ0g7O0FBQ0R4RCxNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWVpRyxjQUFmLENBQThCQyxXQUE5QixDQUEwQ3ZELEdBQTFDO0FBQ0gsS0FMRDtBQU1ILEdBcFRjOztBQXFUZjtBQUNKO0FBQ0E7QUFDSThELEVBQUFBLDRCQUE0QixFQUFFLHdDQUFZO0FBQ3RDLFFBQUloRSxJQUFJLEdBQUcsSUFBWDtBQUVBO0FBQ1I7QUFDQTs7QUFDUUEsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLGdCQUFmLEVBQWlDLFVBQVVDLEdBQVYsRUFBZTtBQUM1QyxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjs7QUFDQSxVQUFJYyxNQUFNLENBQUNpRCxNQUFYLEVBQW1CO0FBQ2Y7QUFDQWpFLFFBQUFBLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0JxRSxVQUFoQixHQUE4QjdCLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0JxRSxVQUFoQixHQUE2QmIsTUFBTSxDQUFDYyxLQUFQLEdBQWU5QixJQUFJLENBQUN4QyxVQUFMLENBQWdCdUUsWUFBMUY7QUFDQS9CLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZXlGLGlCQUFmLENBQWlDOUQsY0FBakMsQ0FBZ0QsZ0JBQWhELEVBQWtFa0IsWUFBbEUsQ0FBK0UsVUFBL0UsRUFBMkZDLE1BQTNGLEdBQW9HTCxJQUFJLENBQUN4QyxVQUFMLENBQWdCcUUsVUFBaEIsQ0FBMkJvQixPQUEzQixDQUFtQyxDQUFuQyxDQUFwRztBQUNIO0FBQ0osS0FQRDtBQVNJO0FBQ1o7QUFDQTtBQUNZakQsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLG9CQUFmLEVBQXFDLFVBQVVDLEdBQVYsRUFBZTtBQUNoRCxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjs7QUFDQSxVQUFJYyxNQUFNLENBQUNpRCxNQUFYLEVBQW1CO0FBQ2ZqRSxRQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCcUUsVUFBaEIsR0FBNkIsQ0FBQ2IsTUFBTSxDQUFDa0QsV0FBUCxHQUFxQmxFLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0J1RSxZQUF0QyxFQUFvRGtCLE9BQXBELENBQTRELENBQTVELENBQTdCO0FBQ0FqRCxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWV5RixpQkFBZixDQUFpQzlELGNBQWpDLENBQWdELGdCQUFoRCxFQUFrRWtCLFlBQWxFLENBQStFLFVBQS9FLEVBQTJGQyxNQUEzRixHQUFvR0wsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQnFFLFVBQWhCLENBQTJCb0IsT0FBM0IsQ0FBbUMsQ0FBbkMsQ0FBcEc7QUFFSDs7QUFDRGpELE1BQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZThELHVCQUFmLENBQXVDTCxNQUFNLENBQUNtRCxHQUE5QyxFQUFtRCxDQUFuRCxFQUFzRCxDQUF0RDtBQUNILEtBUkQsQ0FaSjtBQXNCQTtBQUNSO0FBQ0E7O0FBQ1FuRSxJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUscUJBQWYsRUFBc0MsVUFBVUMsR0FBVixFQUFlO0FBQ2pELFVBQUljLE1BQU0sR0FBR2hCLElBQUksQ0FBQ2lCLGdCQUFMLENBQXNCZixHQUF0QixDQUFiOztBQUNBLFVBQUljLE1BQU0sQ0FBQ29ELFVBQVgsRUFBdUI7QUFDbkJwRSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RyxhQUFmLEdBQStCLElBQS9CO0FBQ0gsT0FGRCxNQUVPO0FBQ0hyRSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RyxhQUFmLEdBQStCLEtBQS9CO0FBQ0g7QUFDSixLQVBEO0FBU0E7QUFDUjtBQUNBOztBQUNRckUsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLHVCQUFmLEVBQXdDLFVBQVVDLEdBQVYsRUFBZTtBQUNuRCxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjtBQUNBYyxNQUFBQSxNQUFNLENBQUNpRCxNQUFQLEtBQWtCakUsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmhDLE1BQTlCLEdBQXVDLEtBQXZDLEVBQThDYSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1Q0wsTUFBTSxDQUFDbUQsR0FBOUMsRUFBbUQsQ0FBbkQsRUFBc0QsQ0FBdEQsQ0FBaEU7QUFDSCxLQUhEO0FBS0E7QUFDUjtBQUNBOztBQUNRbkUsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLGlCQUFmLEVBQWtDLFVBQVVDLEdBQVYsRUFBZTtBQUM3QyxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjs7QUFDQSxVQUFJYyxNQUFNLENBQUNpRCxNQUFYLEVBQW1CO0FBQ2ZqRSxRQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCaUYsV0FBaEIsR0FBOEJ6QyxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsZUFBN0MsRUFBOERBLGNBQTlELENBQTZFLGdCQUE3RSxFQUErRmtCLFlBQS9GLENBQTRHLFlBQTVHLEVBQTBIQyxNQUF4SjtBQUNBTCxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsZUFBN0MsRUFBOERDLE1BQTlELEdBQXVFLEtBQXZFO0FBQ0FhLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxpQkFBN0MsRUFBZ0VDLE1BQWhFLEdBQXlFLElBQXpFO0FBQ0FhLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxpQkFBN0MsRUFBZ0VBLGNBQWhFLENBQStFLFdBQS9FLEVBQTRGa0IsWUFBNUYsQ0FBeUcsVUFBekcsRUFBcUhDLE1BQXJILEdBQThITCxJQUFJLENBQUN4QyxVQUFMLENBQWdCaUYsV0FBOUk7QUFDSDs7QUFDRHpDLE1BQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJoQyxNQUE5QixHQUF1QyxLQUF2QztBQUNBYSxNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1Q0wsTUFBTSxDQUFDbUQsR0FBOUMsRUFBbUQsQ0FBbkQsRUFBc0QsQ0FBdEQ7QUFDSCxLQVZEO0FBWUE7QUFDUjtBQUNBOztBQUNRbkUsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLGdCQUFmLEVBQWlDLFVBQVVDLEdBQVYsRUFBZTtBQUM1QyxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjs7QUFDQSxVQUFJYyxNQUFNLENBQUNpRCxNQUFYLEVBQW1CO0FBQ2ZqRSxRQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCZ0YsVUFBaEIsSUFBOEJ4QixNQUFNLENBQUNzRCxXQUFyQztBQUNIOztBQUNEdEUsTUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlOEQsdUJBQWYsQ0FBdUNMLE1BQU0sQ0FBQ21ELEdBQTlDLEVBQW1ELENBQW5ELEVBQXNELENBQXREO0FBQ0gsS0FORDtBQVNBbkUsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLFdBQWYsRUFBNEIsVUFBVUMsR0FBVixFQUFlO0FBQ3ZDLFVBQUljLE1BQU0sR0FBR2hCLElBQUksQ0FBQ2lCLGdCQUFMLENBQXNCZixHQUF0QixDQUFiO0FBQ0F4QixNQUFBQSxFQUFFLENBQUNvQyxHQUFILENBQU8sS0FBUCxFQUFjakMsSUFBSSxDQUFDa0MsU0FBTCxDQUFlQyxNQUFmLENBQWQ7QUFDQSxVQUFJdUQsR0FBRyxHQUFHdkUsSUFBSSxDQUFDekMsU0FBTCxDQUFlMkYsUUFBZixDQUF3QmhFLGNBQXhCLENBQXVDLHFCQUF2QyxFQUE4REEsY0FBOUQsQ0FBNkUsV0FBN0UsQ0FBVjs7QUFDQSxVQUFJcUYsR0FBRyxDQUFDQyxNQUFKLENBQVc5QyxFQUFYLElBQWlCVixNQUFNLENBQUN5RCxLQUE1QixFQUFtQztBQUMvQnpFLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZW1ILGdCQUFmLENBQWdDLEVBQWhDLEVBQW9DSCxHQUFHLENBQUNDLE1BQUosQ0FBV0csSUFBL0MsRUFBcUQzRCxNQUFNLENBQUNtRCxHQUE1RDtBQUNIO0FBQ0osS0FQRDtBQVVBO0FBQ1I7QUFDQTs7QUFDUW5FLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxTQUFmLEVBQTBCLFVBQVVDLEdBQVYsRUFBZTtBQUNyQyxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjtBQUNBRixNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWVxSCxtQ0FBZixDQUFtRDVELE1BQU0sQ0FBQzZELE1BQTFELEVBQWtFN0QsTUFBTSxDQUFDWSxRQUF6RSxFQUFtRlosTUFBTSxDQUFDbUQsR0FBMUY7QUFDSCxLQUhEO0FBS0E7QUFDUjtBQUNBOztBQUNRbkUsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLHFCQUFmLEVBQXNDLFVBQVVDLEdBQVYsRUFBZTtBQUNqRCxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjs7QUFDQSxVQUFJYyxNQUFNLENBQUM4RCxVQUFYLEVBQXVCO0FBQ25COUUsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEYsbUJBQWYsQ0FBbUNqRSxjQUFuQyxDQUFrRCxTQUFsRCxFQUE2RGtCLFlBQTdELENBQTBFLFlBQTFFLEVBQXdGQyxNQUF4RixHQUFpR1csTUFBTSxDQUFDbUQsR0FBeEc7QUFDSCxPQUZELE1BRU87QUFDSG5FLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZXFILG1DQUFmLENBQW1ENUUsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQmlFLFFBQW5FLEVBQTZFekIsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQm1FLFVBQTdGLEVBQXlHM0IsSUFBSSxDQUFDekMsU0FBTCxDQUFld0gsV0FBeEg7QUFDQS9FLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZXdILFdBQWYsR0FBNkIsRUFBN0I7QUFDSDtBQUNKLEtBUkQ7QUFVQTtBQUNSO0FBQ0E7O0FBQ1EvRSxJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUsb0JBQWYsRUFBcUMsVUFBVUMsR0FBVixFQUFlO0FBQ2hELFVBQUljLE1BQU0sR0FBR2hCLElBQUksQ0FBQ2lCLGdCQUFMLENBQXNCZixHQUF0QixDQUFiOztBQUNBLFVBQUksQ0FBQ2MsTUFBTSxDQUFDOEQsVUFBWixFQUF3QjtBQUNwQixZQUFJRSxNQUFNLEdBQUcsSUFBSUMsS0FBSixFQUFiOztBQUNBLFlBQUlqRSxNQUFNLENBQUNrRSxJQUFQLENBQVlDLFFBQWhCLEVBQTBCO0FBQ3RCLGVBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3BFLE1BQU0sQ0FBQ2tFLElBQVAsQ0FBWUMsUUFBWixDQUFxQkUsTUFBekMsRUFBaURELENBQUMsRUFBbEQsRUFBc0Q7QUFDbERwRixZQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWVxSCxtQ0FBZixDQUFtRDVELE1BQU0sQ0FBQ2tFLElBQVAsQ0FBWUMsUUFBWixDQUFxQkMsQ0FBckIsRUFBd0JQLE1BQTNFLEVBQW1GN0QsTUFBTSxDQUFDa0UsSUFBUCxDQUFZQyxRQUFaLENBQXFCQyxDQUFyQixFQUF3QnhELFFBQTNHLEVBQXFIWixNQUFNLENBQUNrRSxJQUFQLENBQVlDLFFBQVosQ0FBcUJDLENBQXJCLEVBQXdCakIsR0FBN0k7QUFDQWEsWUFBQUEsTUFBTSxDQUFDSSxDQUFELENBQU4sR0FBWXBFLE1BQU0sQ0FBQ2tFLElBQVAsQ0FBWUMsUUFBWixDQUFxQkMsQ0FBckIsRUFBd0IxRCxFQUFwQztBQUNIO0FBQ0o7QUFDSjs7QUFDRDFCLE1BQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWTZDLElBQVosQ0FBaUIsZUFBakIsRUFBa0M7QUFDOUJzRSxRQUFBQSxNQUFNLEVBQUVBO0FBRHNCLE9BQWxDO0FBR0gsS0FkRDtBQWdCQTtBQUNSO0FBQ0E7O0FBQ1FoRixJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUscUJBQWYsRUFBc0MsVUFBVUMsR0FBVixFQUFlO0FBQ2pELFVBQUljLE1BQU0sR0FBR2hCLElBQUksQ0FBQ2lCLGdCQUFMLENBQXNCZixHQUF0QixDQUFiO0FBQ0F4QixNQUFBQSxFQUFFLENBQUNvQyxHQUFILENBQU9FLE1BQU0sQ0FBQzhELFVBQWQ7O0FBQ0EsVUFBSTlELE1BQU0sQ0FBQzhELFVBQVgsRUFBdUI7QUFDbkI5RSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU2QyxZQUFmLENBQTRCLFdBQTVCLEVBQXlDbUQsUUFBekMsQ0FBa0RuRCxZQUFsRCxDQUErRCxXQUEvRCxFQUE0RWtGLGNBQTVFLENBQTJGdEUsTUFBM0Y7QUFDSCxPQUZELE1BRU87QUFDSGhCLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTZDLFlBQWYsQ0FBNEIsV0FBNUIsRUFBeUNpQix1QkFBekMsQ0FBaUVMLE1BQU0sQ0FBQ21ELEdBQXhFLEVBQTZFLENBQTdFLEVBQWdGLENBQWhGO0FBQ0g7QUFDSixLQVJEO0FBVUE7QUFDUjtBQUNBOztBQUNRbkUsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLG9CQUFmLEVBQXFDLFVBQVVDLEdBQVYsRUFBZTtBQUNoRCxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjtBQUNBRixNQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCK0gsY0FBaEIsR0FBaUN2RSxNQUFNLENBQUN3RSxTQUF4QztBQUNILEtBSEQ7QUFLQTtBQUNSO0FBQ0E7O0FBQ1F4RixJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUsdUJBQWYsRUFBd0MsVUFBVUMsR0FBVixFQUFlO0FBQ25ELFVBQUljLE1BQU0sR0FBR2hCLElBQUksQ0FBQ2lCLGdCQUFMLENBQXNCZixHQUF0QixDQUFiOztBQUNBLFVBQUljLE1BQU0sQ0FBQzhELFVBQVgsRUFBdUI7QUFDbkI5RSxRQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCK0gsY0FBaEIsR0FBaUN2RSxNQUFNLENBQUN3RSxTQUF4QztBQUNBeEYsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNkMsWUFBZixDQUE0QixXQUE1QixFQUF5Q21ELFFBQXpDLENBQWtEbkQsWUFBbEQsQ0FBK0QsV0FBL0QsRUFBNEVxRixVQUE1RTtBQUNILE9BSEQsTUFHTztBQUNIekYsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNkMsWUFBZixDQUE0QixXQUE1QixFQUF5Q2lCLHVCQUF6QyxDQUFpRUwsTUFBTSxDQUFDbUQsR0FBeEUsRUFBNkUsQ0FBN0UsRUFBZ0YsQ0FBaEY7QUFDSDtBQUVKLEtBVEQ7QUFXQTtBQUNSO0FBQ0E7O0FBQ1FuRSxJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUscUJBQWYsRUFBc0MsVUFBVUMsR0FBVixFQUFlO0FBQ2pELFVBQUljLE1BQU0sR0FBR2hCLElBQUksQ0FBQ2lCLGdCQUFMLENBQXNCZixHQUF0QixDQUFiOztBQUNBLFVBQUljLE1BQU0sQ0FBQzhELFVBQVgsRUFBdUI7QUFDbkI5RSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU2QyxZQUFmLENBQTRCLFdBQTVCLEVBQXlDaUIsdUJBQXpDLENBQWlFLFVBQWpFLEVBQTZFLENBQTdFLEVBQWdGLENBQWhGO0FBQ0gsT0FGRCxNQUVPO0FBQ0hyQixRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU2QyxZQUFmLENBQTRCLFdBQTVCLEVBQXlDaUIsdUJBQXpDLENBQWlFTCxNQUFNLENBQUNtRCxHQUF4RSxFQUE2RSxDQUE3RSxFQUFnRixDQUFoRjtBQUNIO0FBQ0osS0FQRDtBQVNBO0FBQ1I7QUFDQTs7QUFDUW5FLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxXQUFmLEVBQTRCLFVBQVVDLEdBQVYsRUFBZTtBQUN2QztBQUNBO0FBRUFXLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQWVqQyxJQUFJLENBQUNrQyxTQUFMLENBQWViLEdBQWYsQ0FBM0I7QUFDQSxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjs7QUFDQSxVQUFJRixJQUFJLENBQUN6QyxTQUFMLENBQWVtSSxrQkFBbkIsRUFBdUM7QUFDbkMxRixRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWVtSSxrQkFBZixHQUFvQyxFQUFwQztBQUNILE9BRkQsTUFFTztBQUNIMUYsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlbUksa0JBQWYsR0FBb0MsSUFBSVQsS0FBSixDQUFVLENBQVYsQ0FBcEM7QUFDSDs7QUFDRGpGLE1BQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZW9JLGlCQUFmLENBQWlDekcsY0FBakMsQ0FBZ0QsU0FBaEQsRUFBMkQwRyxpQkFBM0Q7QUFDQTVGLE1BQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZXNJLGlCQUFmLEdBQW1DLENBQW5DOztBQUNBLFdBQUssSUFBSVQsQ0FBVCxJQUFjcEUsTUFBZCxFQUFzQjtBQUNsQmhCLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZXVJLDRCQUFmLENBQTRDOUUsTUFBTSxDQUFDb0UsQ0FBRCxDQUFOLENBQVVXLEdBQXREO0FBQ0g7O0FBQ0QvRixNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWV5SSwwQkFBZjtBQUNILEtBakJEO0FBbUJBO0FBQ1I7QUFDQTs7QUFDUWhHLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxlQUFmLEVBQWdDLFVBQVVDLEdBQVYsRUFBZTtBQUMzQyxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjtBQUNBRixNQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCcUUsVUFBaEIsR0FBNkIsQ0FBQ2IsTUFBTSxDQUFDa0QsV0FBUCxHQUFxQmxFLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0J1RSxZQUF0QyxFQUFvRGtCLE9BQXBELENBQTRELENBQTVELENBQTdCO0FBQ0FqRCxNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWV5RixpQkFBZixDQUFpQzlELGNBQWpDLENBQWdELGdCQUFoRCxFQUFrRWtCLFlBQWxFLENBQStFLFVBQS9FLEVBQTJGQyxNQUEzRixHQUFvR0wsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQnFFLFVBQWhCLENBQTJCb0IsT0FBM0IsQ0FBbUMsQ0FBbkMsQ0FBcEc7QUFDSCxLQUpEO0FBTUE7QUFDUjtBQUNBOztBQUNRakQsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLHFCQUFmLEVBQXNDLFVBQVVDLEdBQVYsRUFBZTtBQUNqRCxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjtBQUNBRixNQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCeUksVUFBaEIsR0FBNkJqRixNQUFNLENBQUNrRixRQUFwQztBQUNBbEcsTUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjJJLE9BQWhCLEdBQTBCbkYsTUFBTSxDQUFDb0YsWUFBakM7QUFDQXBHLE1BQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZThJLDJCQUFmO0FBQ0gsS0FMRDtBQU9BO0FBQ1I7QUFDQTs7QUFDUXJHLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxVQUFmLEVBQTJCLFVBQVVDLEdBQVYsRUFBZTtBQUN0QyxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjtBQUNBYyxNQUFBQSxNQUFNLElBQUloQixJQUFJLENBQUN6QyxTQUFMLENBQWUrSSxnQkFBZixDQUFnQ3RGLE1BQWhDLENBQVY7QUFDSCxLQUhEO0FBS0E7QUFDUjtBQUNBOztBQUNRaEIsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLGlCQUFmLEVBQWtDLFVBQVVDLEdBQVYsRUFBZTtBQUM3QyxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjtBQUNBYyxNQUFBQSxNQUFNLENBQUN1RixTQUFQLElBQW9CdkcsSUFBSSxDQUFDekMsU0FBTCxDQUFlaUosaUJBQWYsQ0FBaUN4RixNQUFNLENBQUN1RixTQUF4QyxDQUFwQjtBQUNILEtBSEQ7QUFLQTtBQUNSO0FBQ0E7O0FBQ1F2RyxJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUsZ0JBQWYsRUFBaUMsVUFBVUMsR0FBVixFQUFlO0FBQzVDLFVBQUljLE1BQU0sR0FBR2hCLElBQUksQ0FBQ2lCLGdCQUFMLENBQXNCZixHQUF0QixDQUFiOztBQUNBLFVBQUljLE1BQU0sQ0FBQ2lELE1BQVgsRUFBbUI7QUFDZixZQUFJakQsTUFBTSxDQUFDa0UsSUFBUCxDQUFZdUIsUUFBaEIsRUFBMEI7QUFDdEJ6RyxVQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1Q0wsTUFBTSxDQUFDbUQsR0FBUCxHQUFhLEdBQWIsR0FBbUJuRCxNQUFNLENBQUNrRSxJQUFQLENBQVl1QixRQUFaLEdBQXVCekcsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQnVFLFlBQTFELEdBQXlFLFNBQWhILEVBQTJILENBQTNILEVBQThILENBQTlIO0FBQ0EvQixVQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCcUUsVUFBaEIsR0FBNkIsQ0FBQzZFLFVBQVUsQ0FBQzFHLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0JxRSxVQUFqQixDQUFWLEdBQXlDYixNQUFNLENBQUNrRSxJQUFQLENBQVl1QixRQUFaLEdBQXVCekcsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQnVFLFlBQWpGLEVBQStGa0IsT0FBL0YsQ0FBdUcsQ0FBdkcsQ0FBN0I7QUFDQWpELFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZXlGLGlCQUFmLENBQWlDOUQsY0FBakMsQ0FBZ0QsZ0JBQWhELEVBQWtFa0IsWUFBbEUsQ0FBK0UsVUFBL0UsRUFBMkZDLE1BQTNGLEdBQW9HTCxJQUFJLENBQUN4QyxVQUFMLENBQWdCcUUsVUFBaEIsQ0FBMkJvQixPQUEzQixDQUFtQyxDQUFuQyxDQUFwRztBQUNILFNBSkQsTUFJTztBQUNIakQsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlOEQsdUJBQWYsQ0FBdUNMLE1BQU0sQ0FBQ21ELEdBQTlDLEVBQW1ELENBQW5ELEVBQXNELENBQXREO0FBQ0g7O0FBQ0RuRSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWVvSixvQkFBZjtBQUNIO0FBQ0osS0FaRDtBQWNBO0FBQ1I7QUFDQTs7QUFDUTNHLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxZQUFmLEVBQTZCLFlBQVk7QUFDckNZLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVosRUFBc0JkLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZXFKLFNBQXJDOztBQUNBLFVBQUk1RyxJQUFJLENBQUN6QyxTQUFMLENBQWVxSixTQUFmLElBQTRCQyxTQUFoQyxFQUEyQztBQUN2QztBQUNIOztBQUNEN0csTUFBQUEsSUFBSSxDQUFDakMsU0FBTCxHQUFpQixLQUFqQixDQUxxQyxDQU1yQztBQUNILEtBUEQ7QUFTQTtBQUNSO0FBQ0E7O0FBQ1FpQyxJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUsaUJBQWYsRUFBa0MsWUFBWTtBQUMxQ0QsTUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFldUosYUFBZixHQUErQixDQUEvQjtBQUNBOUcsTUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFld0osZ0JBQWYsR0FBa0MsQ0FBbEM7QUFDSCxLQUhEO0FBS0E7QUFDUjtBQUNBOztBQUNRL0csSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLHNCQUFmLEVBQXVDLFVBQVVDLEdBQVYsRUFBZTtBQUNsRCxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjtBQUNBRixNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsZ0JBQTdDLEVBQStEQSxjQUEvRCxDQUE4RSxXQUE5RSxFQUEyRmtCLFlBQTNGLENBQXdHLFdBQXhHLEVBQXFIZ0IsWUFBckgsR0FBb0ksSUFBcEk7O0FBQ0EsVUFBSUosTUFBTSxDQUFDaUQsTUFBWCxFQUFtQjtBQUNmakUsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGdCQUE3QyxFQUErREEsY0FBL0QsQ0FBOEUsU0FBOUUsRUFBeUZrQixZQUF6RixDQUFzRyxZQUF0RyxFQUFvSEMsTUFBcEgsR0FBNkhXLE1BQU0sQ0FBQ21ELEdBQXBJO0FBQ0gsT0FGRCxNQUVPO0FBQ0huRSxRQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCbUUsVUFBaEIsR0FBNkIzQixJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsZ0JBQTdDLEVBQStEQSxjQUEvRCxDQUE4RSxTQUE5RSxFQUF5RmtCLFlBQXpGLENBQXNHLFlBQXRHLEVBQW9IQyxNQUFqSjtBQUNBTCxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWV5RixpQkFBZixDQUFpQzlELGNBQWpDLENBQWdELGVBQWhELEVBQWlFa0IsWUFBakUsQ0FBOEUsVUFBOUUsRUFBMEZDLE1BQTFGLEdBQW1HTCxJQUFJLENBQUN4QyxVQUFMLENBQWdCbUUsVUFBbkg7QUFDQTNCLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJoQyxNQUE5QixHQUF1QyxLQUF2QztBQUNBYSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsZ0JBQTdDLEVBQStEQSxjQUEvRCxDQUE4RSxTQUE5RSxFQUF5RmtCLFlBQXpGLENBQXNHLFlBQXRHLEVBQW9IQyxNQUFwSCxHQUE2SCxFQUE3SDtBQUNBTCxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsZ0JBQTdDLEVBQStEQSxjQUEvRCxDQUE4RSxZQUE5RSxFQUE0RmtCLFlBQTVGLENBQXlHLFVBQXpHLEVBQXFIQyxNQUFySCxHQUE4SCxTQUFTTCxJQUFJLENBQUN4QyxVQUFMLENBQWdCOEIsT0FBdko7QUFDQVUsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlOEQsdUJBQWYsQ0FBdUNMLE1BQU0sQ0FBQ21ELEdBQTlDLEVBQW1ELENBQW5ELEVBQXNELENBQXREO0FBQ0g7QUFDSixLQWJEO0FBZUE7QUFDUjtBQUNBOztBQUNRbkUsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLG9CQUFmLEVBQXFDLFVBQVVDLEdBQVYsRUFBZTtBQUNoRCxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjtBQUNBRixNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsYUFBN0MsRUFBNERBLGNBQTVELENBQTJFLFNBQTNFLEVBQXNGa0IsWUFBdEYsQ0FBbUcsV0FBbkcsRUFBZ0hnQixZQUFoSCxHQUErSCxJQUEvSDs7QUFDQSxVQUFJSixNQUFNLENBQUNpRCxNQUFYLEVBQW1CO0FBQ2ZqRSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsYUFBN0MsRUFBNERBLGNBQTVELENBQTJFLFlBQTNFLEVBQXlGa0IsWUFBekYsQ0FBc0csWUFBdEcsRUFBb0hDLE1BQXBILEdBQTZIVyxNQUFNLENBQUNtRCxHQUFwSTtBQUNBbkUsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGVBQTdDLEVBQThEQSxjQUE5RCxDQUE2RSxZQUE3RSxFQUEyRmtCLFlBQTNGLENBQXdHLFlBQXhHLEVBQXNIQyxNQUF0SCxHQUErSFcsTUFBTSxDQUFDbUQsR0FBdEk7QUFDSCxPQUhELE1BR087QUFDSCxZQUFJbkUsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGFBQTdDLEVBQTREQSxjQUE1RCxDQUEyRSxZQUEzRSxFQUF5RmtCLFlBQXpGLENBQXNHLFlBQXRHLEVBQW9IQyxNQUF4SCxFQUFnSTtBQUM1SEwsVUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQnlJLFVBQWhCLEdBQTZCakcsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGFBQTdDLEVBQTREQSxjQUE1RCxDQUEyRSxZQUEzRSxFQUF5RmtCLFlBQXpGLENBQXNHLFlBQXRHLEVBQW9IQyxNQUFqSjtBQUNBTCxVQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCMkksT0FBaEIsR0FBMEJuRyxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsYUFBN0MsRUFBNERBLGNBQTVELENBQTJFLFNBQTNFLEVBQXNGa0IsWUFBdEYsQ0FBbUcsWUFBbkcsRUFBaUhDLE1BQTNJO0FBQ0gsU0FIRCxNQUdPO0FBQ0hMLFVBQUFBLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0J5SSxVQUFoQixHQUE2QmpHLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxlQUE3QyxFQUE4REEsY0FBOUQsQ0FBNkUsWUFBN0UsRUFBMkZrQixZQUEzRixDQUF3RyxZQUF4RyxFQUFzSEMsTUFBbko7QUFDQUwsVUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjJJLE9BQWhCLEdBQTBCbkcsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGVBQTdDLEVBQThEQSxjQUE5RCxDQUE2RSxTQUE3RSxFQUF3RmtCLFlBQXhGLENBQXFHLFlBQXJHLEVBQW1IQyxNQUE3STtBQUNIOztBQUNETCxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsYUFBN0MsRUFBNERBLGNBQTVELENBQTJFLFlBQTNFLEVBQXlGa0IsWUFBekYsQ0FBc0csWUFBdEcsRUFBb0hDLE1BQXBILEdBQTZILEVBQTdIO0FBQ0FMLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxhQUE3QyxFQUE0REEsY0FBNUQsQ0FBMkUsbUJBQTNFLEVBQWdHa0IsWUFBaEcsQ0FBNkcsWUFBN0csRUFBMkhDLE1BQTNILEdBQW9JLEVBQXBJO0FBQ0FMLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxhQUE3QyxFQUE0REEsY0FBNUQsQ0FBMkUsU0FBM0UsRUFBc0ZrQixZQUF0RixDQUFtRyxZQUFuRyxFQUFpSEMsTUFBakgsR0FBMEgsRUFBMUg7QUFDQUwsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGFBQTdDLEVBQTREQyxNQUE1RCxHQUFxRSxLQUFyRTtBQUNBYSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsZUFBN0MsRUFBOERDLE1BQTlELEdBQXVFLEtBQXZFO0FBQ0FhLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxZQUE3QyxFQUEyREMsTUFBM0QsR0FBb0UsS0FBcEU7QUFDQWEsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGNBQTdDLEVBQTZEQyxNQUE3RCxHQUFzRSxJQUF0RTtBQUNBYSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsY0FBN0MsRUFBNkRrQixZQUE3RCxDQUEwRSxXQUExRSxFQUF1RmdCLFlBQXZGLEdBQXNHLEtBQXRHO0FBQ0FwQixRQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCd0osaUJBQWhCLEdBQW9DaEgsSUFBSSxDQUFDekMsU0FBTCxDQUFlb0Ysc0JBQWYsQ0FBc0MzQyxJQUFJLENBQUN4QyxVQUFMLENBQWdCeUksVUFBdEQsRUFBa0UsQ0FBbEUsRUFBcUUsQ0FBckUsQ0FBcEM7QUFDQWpHLFFBQUFBLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0J5SixjQUFoQixHQUFpQ2pILElBQUksQ0FBQ3pDLFNBQUwsQ0FBZW9GLHNCQUFmLENBQXNDM0MsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjJJLE9BQXRELEVBQStELENBQS9ELEVBQWtFLENBQWxFLENBQWpDO0FBQ0FuRyxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsZUFBN0MsRUFBOERBLGNBQTlELENBQTZFLGdCQUE3RSxFQUErRmtCLFlBQS9GLENBQTRHLFVBQTVHLEVBQXdIQyxNQUF4SCxHQUFpSUwsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQndKLGlCQUFqSjtBQUNBaEgsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGVBQTdDLEVBQThEQSxjQUE5RCxDQUE2RSxhQUE3RSxFQUE0RmtCLFlBQTVGLENBQXlHLFVBQXpHLEVBQXFIQyxNQUFySCxHQUE4SEwsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQnlKLGNBQTlJO0FBQ0FqSCxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsZUFBN0MsRUFBOERDLE1BQTlELEdBQXVFLElBQXZFO0FBQ0FhLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJoQyxNQUE5QixHQUF1QyxLQUF2QztBQUNBYSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1Q0wsTUFBTSxDQUFDbUQsR0FBOUMsRUFBbUQsQ0FBbkQsRUFBc0QsQ0FBdEQ7QUFDSDtBQUNKLEtBOUJEO0FBZ0NBO0FBQ1I7QUFDQTs7QUFDUW5FLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxnQkFBZixFQUFpQyxVQUFVQyxHQUFWLEVBQWU7QUFDNUMsVUFBSWMsTUFBTSxHQUFHaEIsSUFBSSxDQUFDaUIsZ0JBQUwsQ0FBc0JmLEdBQXRCLENBQWI7QUFDQUYsTUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlOEQsdUJBQWYsQ0FBdUNMLE1BQU0sQ0FBQ21ELEdBQTlDLEVBQW1ELENBQW5ELEVBQXNELENBQXREO0FBQ0gsS0FIRDtBQUtBO0FBQ1I7QUFDQTs7QUFDUW5FLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxzQkFBZixFQUF1QyxVQUFVQyxHQUFWLEVBQWU7QUFDbEQsVUFBSWMsTUFBTSxHQUFHaEIsSUFBSSxDQUFDaUIsZ0JBQUwsQ0FBc0JmLEdBQXRCLENBQWI7QUFDQUYsTUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLG1CQUE3QyxFQUFrRUEsY0FBbEUsQ0FBaUYsV0FBakYsRUFBOEZrQixZQUE5RixDQUEyRyxXQUEzRyxFQUF3SGdCLFlBQXhILEdBQXVJLElBQXZJOztBQUNBLFVBQUlKLE1BQU0sQ0FBQzhELFVBQVgsRUFBdUI7QUFDbkI5RSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsbUJBQTdDLEVBQWtFQSxjQUFsRSxDQUFpRixVQUFqRixFQUE2RmtCLFlBQTdGLENBQTBHLFVBQTFHLEVBQXNIQyxNQUF0SCxHQUErSFcsTUFBTSxDQUFDbUQsR0FBdEk7QUFDSCxPQUZELE1BRU87QUFDSCxZQUFJZSxJQUFJLEdBQUc7QUFDUDVGLFVBQUFBLE9BQU8sRUFBRVUsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLG1CQUE3QyxFQUFrRUEsY0FBbEUsQ0FBaUYsWUFBakYsRUFBK0ZrQixZQUEvRixDQUE0RyxZQUE1RyxFQUEwSEMsTUFENUg7QUFFUGQsVUFBQUEsUUFBUSxFQUFFUyxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsbUJBQTdDLEVBQWtFQSxjQUFsRSxDQUFpRixhQUFqRixFQUFnR2tCLFlBQWhHLENBQTZHLFlBQTdHLEVBQTJIQztBQUY5SCxTQUFYO0FBSUFMLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTZDLFlBQWYsQ0FBNEIsZUFBNUIsRUFBNkM4RyxzQkFBN0MsQ0FBb0VoQyxJQUFwRSxFQUEwRSxZQUFZO0FBQ2xGbEYsVUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjhCLE9BQWhCLEdBQTBCNEYsSUFBSSxDQUFDNUYsT0FBL0I7QUFDQVUsVUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQitCLFFBQWhCLEdBQTJCMkYsSUFBSSxDQUFDM0YsUUFBaEM7QUFDQVMsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLG1CQUE3QyxFQUFrRUEsY0FBbEUsQ0FBaUYsWUFBakYsRUFBK0ZrQixZQUEvRixDQUE0RyxZQUE1RyxFQUEwSEMsTUFBMUgsR0FBbUksRUFBbkk7QUFDQUwsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLG1CQUE3QyxFQUFrRUEsY0FBbEUsQ0FBaUYsYUFBakYsRUFBZ0drQixZQUFoRyxDQUE2RyxZQUE3RyxFQUEySEMsTUFBM0gsR0FBb0ksRUFBcEk7QUFDQUwsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLG1CQUE3QyxFQUFrRUEsY0FBbEUsQ0FBaUYsb0JBQWpGLEVBQXVHa0IsWUFBdkcsQ0FBb0gsWUFBcEgsRUFBa0lDLE1BQWxJLEdBQTJJLEVBQTNJO0FBQ0FMLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxtQkFBN0MsRUFBa0VDLE1BQWxFLEdBQTJFLEtBQTNFO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxrQkFBN0MsRUFBaUVDLE1BQWpFLEdBQTBFLEtBQTFFO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxnQkFBN0MsRUFBK0RDLE1BQS9ELEdBQXdFLElBQXhFO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxlQUE3QyxFQUE4REMsTUFBOUQsR0FBdUUsSUFBdkU7QUFDQWEsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGVBQTdDLEVBQThEa0IsWUFBOUQsQ0FBMkUsV0FBM0UsRUFBd0ZnQixZQUF4RixHQUF1RyxLQUF2RztBQUNBcEIsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGdCQUE3QyxFQUErREEsY0FBL0QsQ0FBOEUsVUFBOUUsRUFBMEZrQixZQUExRixDQUF1RyxVQUF2RyxFQUFtSEMsTUFBbkgsR0FBNEgsV0FBNUg7QUFDQUwsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLGdCQUE3QyxFQUErREEsY0FBL0QsQ0FBOEUsWUFBOUUsRUFBNEZrQixZQUE1RixDQUF5RyxVQUF6RyxFQUFxSEMsTUFBckgsR0FBOEgsU0FBU0wsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjhCLE9BQXZKO0FBQ0FVLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxnQkFBN0MsRUFBK0RBLGNBQS9ELENBQThFLE9BQTlFLEVBQXVGa0IsWUFBdkYsQ0FBb0csVUFBcEcsRUFBZ0hDLE1BQWhILEdBQXlILFdBQVdMLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0JpRSxRQUFwSjtBQUNBekIsVUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmhDLE1BQTlCLEdBQXVDLEtBQXZDO0FBQ0FhLFVBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZThELHVCQUFmLENBQXVDTCxNQUFNLENBQUNtRCxHQUE5QyxFQUFtRCxDQUFuRCxFQUFzRCxDQUF0RDtBQUNBbkUsVUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQm9GLFNBQWhCLEdBQTRCLENBQTVCO0FBQ0gsU0FqQkQ7QUFrQkg7QUFDSixLQTdCRDtBQStCQTtBQUNSO0FBQ0E7O0FBQ1E1QyxJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUsZ0JBQWYsRUFBaUMsVUFBVUMsR0FBVixFQUFlO0FBQzVDLFVBQUljLE1BQU0sR0FBR2hCLElBQUksQ0FBQ2lCLGdCQUFMLENBQXNCZixHQUF0QixDQUFiOztBQUNBLFVBQUksQ0FBQ2MsTUFBTSxDQUFDaUQsTUFBWixFQUFvQjtBQUNoQixnQkFBUWpELE1BQU0sQ0FBQ21HLEdBQWY7QUFDSSxlQUFLLENBQUw7QUFDSW5ILFlBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTZKLHNCQUFmLENBQXNDcEcsTUFBTSxDQUFDcUcsTUFBN0MsRUFBcURyRyxNQUFNLENBQUNtRCxHQUE1RDtBQUNBOztBQUNKLGVBQUssQ0FBTDtBQUNJbkUsWUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlK0osdUJBQWYsQ0FBdUN0RyxNQUFNLENBQUNxRyxNQUE5QyxFQUFzRHJHLE1BQU0sQ0FBQ21ELEdBQTdEO0FBQ0E7O0FBQ0osZUFBSyxDQUFMO0FBQ0luRSxZQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWVnSyx5QkFBZixDQUF5Q3ZHLE1BQU0sQ0FBQ3FHLE1BQWhELEVBQXdEckcsTUFBTSxDQUFDbUQsR0FBL0Q7QUFDQTtBQVRSO0FBV0g7QUFDSixLQWZEO0FBZ0JBO0FBQ1I7QUFDQTs7QUFDUW5FLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxlQUFmLEVBQWdDLFVBQVVDLEdBQVYsRUFBZTtBQUMzQyxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjtBQUNBRixNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWVpSyxxQkFBZixDQUFxQ3hHLE1BQU0sQ0FBQ2tFLElBQVAsQ0FBWXVDLFFBQWpEO0FBQ0gsS0FIRDtBQUlBO0FBQ1I7QUFDQTs7QUFDUXpILElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxzQkFBZixFQUF1QyxVQUFVQyxHQUFWLEVBQWU7QUFDbEQsVUFBSWMsTUFBTSxHQUFHaEIsSUFBSSxDQUFDaUIsZ0JBQUwsQ0FBc0JmLEdBQXRCLENBQWI7QUFDQUYsTUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLG9CQUE3QyxFQUFtRUEsY0FBbkUsQ0FBa0YsV0FBbEYsRUFBK0ZrQixZQUEvRixDQUE0RyxXQUE1RyxFQUF5SGdCLFlBQXpILEdBQXdJLElBQXhJOztBQUNBLFVBQUlKLE1BQU0sQ0FBQzhELFVBQVgsRUFBdUI7QUFDbkI5RSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsb0JBQTdDLEVBQW1FQSxjQUFuRSxDQUFrRixVQUFsRixFQUE4RmtCLFlBQTlGLENBQTJHLFVBQTNHLEVBQXVIQyxNQUF2SCxHQUFnSVcsTUFBTSxDQUFDbUQsR0FBdkk7QUFDSCxPQUZELE1BRU87QUFDSCxZQUFJZSxJQUFJLEdBQUc7QUFDUDVGLFVBQUFBLE9BQU8sRUFBRVUsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjhCLE9BRGxCO0FBRVBDLFVBQUFBLFFBQVEsRUFBRVMsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLG9CQUE3QyxFQUFtRUEsY0FBbkUsQ0FBa0YsZ0JBQWxGLEVBQW9Ha0IsWUFBcEcsQ0FBaUgsWUFBakgsRUFBK0hDO0FBRmxJLFNBQVg7QUFJQUwsUUFBQUEsSUFBSSxDQUFDekMsU0FBTCxDQUFlNkMsWUFBZixDQUE0QixlQUE1QixFQUE2QzhHLHNCQUE3QyxDQUFvRWhDLElBQXBFLEVBQTBFLFlBQVk7QUFDbEZsRixVQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCakMsY0FBOUIsQ0FBNkMsb0JBQTdDLEVBQW1FQSxjQUFuRSxDQUFrRixnQkFBbEYsRUFBb0drQixZQUFwRyxDQUFpSCxZQUFqSCxFQUErSEMsTUFBL0gsR0FBd0ksRUFBeEksRUFDSUwsSUFBSSxDQUFDekMsU0FBTCxDQUFlNEQsY0FBZixDQUE4QmpDLGNBQTlCLENBQTZDLG9CQUE3QyxFQUFtRUEsY0FBbkUsQ0FBa0YsZ0JBQWxGLEVBQW9Ha0IsWUFBcEcsQ0FBaUgsWUFBakgsRUFBK0hDLE1BQS9ILEdBQXdJLEVBRDVJLEVBRUlMLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTRELGNBQWYsQ0FBOEJqQyxjQUE5QixDQUE2QyxvQkFBN0MsRUFBbUVBLGNBQW5FLENBQWtGLG9CQUFsRixFQUF3R2tCLFlBQXhHLENBQXFILFlBQXJILEVBQW1JQyxNQUFuSSxHQUE0SSxFQUZoSixFQUdJTCxJQUFJLENBQUN6QyxTQUFMLENBQWU0RCxjQUFmLENBQThCaEMsTUFBOUIsR0FBdUMsS0FIM0MsRUFJSWEsSUFBSSxDQUFDekMsU0FBTCxDQUFlOEQsdUJBQWYsQ0FBdUNMLE1BQU0sQ0FBQ21ELEdBQTlDLEVBQW1ELENBQW5ELEVBQXNELENBQXRELENBSko7QUFLSCxTQU5EO0FBT0g7QUFDSixLQWxCRDtBQW9CQW5FLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxxQkFBZixFQUFzQyxVQUFBQyxHQUFHLEVBQUk7QUFDekMsVUFBSWMsTUFBTSxHQUFHaEIsSUFBSSxDQUFDaUIsZ0JBQUwsQ0FBc0JmLEdBQXRCLENBQWI7O0FBQ0EsVUFBSSxDQUFDYyxNQUFNLENBQUNpRCxNQUFaLEVBQW9CO0FBQ2hCLFlBQUl5RCxJQUFJLEdBQUcxSCxJQUFJLENBQUN6QyxTQUFMLENBQWVvSyxNQUFmLENBQXNCekksY0FBdEIsQ0FBcUMsU0FBckMsQ0FBWDtBQUNBMEksUUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCN0csTUFBTSxDQUFDcEIsR0FBdkIsRUFBNEIsVUFBQWtJLE9BQU8sRUFBSTtBQUNuQ0osVUFBQUEsSUFBSSxDQUFDdEgsWUFBTCxDQUFrQjFCLEVBQUUsQ0FBQ3FKLE1BQXJCLEVBQTZCQyxXQUE3QixHQUEyQ0YsT0FBM0M7QUFDSCxTQUZEO0FBR0g7O0FBQ0Q5SCxNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1Q0wsTUFBTSxDQUFDbUQsR0FBOUMsRUFBbUQsQ0FBbkQsRUFBc0QsQ0FBdEQ7QUFDSCxLQVREO0FBV0E7QUFDUjtBQUNBOztBQUNRbkUsSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLGVBQWYsRUFBZ0MsVUFBVUMsR0FBVixFQUFlO0FBQzNDLFVBQUljLE1BQU0sR0FBR2hCLElBQUksQ0FBQ2lCLGdCQUFMLENBQXNCZixHQUF0QixDQUFiOztBQUNBLFVBQUksQ0FBQ2MsTUFBTSxDQUFDaUQsTUFBWixFQUFvQjtBQUNoQmpFLFFBQUFBLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0IwRSxZQUFoQixHQUErQmxCLE1BQU0sQ0FBQ2lILE1BQXRDO0FBQ0FqSSxRQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWV5RixpQkFBZixDQUFpQzlELGNBQWpDLENBQWdELFNBQWhELEVBQTJEa0IsWUFBM0QsQ0FBd0UsV0FBeEUsRUFBcUY0SCxXQUFyRixHQUFtR2hJLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0IwSyxlQUFoQixDQUFnQ2xJLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0IwRSxZQUFoRCxDQUFuRztBQUNBbEMsUUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjJLLFVBQWhCLEdBQTZCbkksSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjBLLGVBQWhCLENBQWdDbEksSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjBFLFlBQWhELENBQTdCO0FBQ0g7O0FBQ0RsQyxNQUFBQSxJQUFJLENBQUN6QyxTQUFMLENBQWU4RCx1QkFBZixDQUF1Q0wsTUFBTSxDQUFDbUQsR0FBOUMsRUFBbUQsQ0FBbkQsRUFBc0QsQ0FBdEQ7QUFDSCxLQVJEO0FBVUFuRSxJQUFBQSxJQUFJLENBQUNuQyxNQUFMLENBQVlvQyxFQUFaLENBQWUsWUFBZixFQUE2QixVQUFVQyxHQUFWLEVBQWU7QUFDeEMsVUFBSWMsTUFBTSxHQUFHaEIsSUFBSSxDQUFDaUIsZ0JBQUwsQ0FBc0JmLEdBQXRCLENBQWI7QUFDQVcsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksU0FBWixFQUF1QmpDLElBQUksQ0FBQ2tDLFNBQUwsQ0FBZUMsTUFBZixDQUF2QjtBQUNBaEIsTUFBQUEsSUFBSSxDQUFDeEMsVUFBTCxDQUFnQjRLLE1BQWhCLEdBQXlCQyxTQUFTLENBQUNDLFNBQW5DO0FBQ0F0SSxNQUFBQSxJQUFJLENBQUN4QyxVQUFMLENBQWdCK0ssUUFBaEIsR0FBMkJ2SCxNQUFNLENBQUN3SCxRQUFsQztBQUNBLFVBQUlDLE1BQU0sR0FBRyxJQUFiOztBQUNBLFVBQUl6SCxNQUFNLENBQUN3SCxRQUFQLElBQW1CLEtBQW5CLElBQTRCeEgsTUFBTSxDQUFDd0gsUUFBUCxJQUFtQixLQUFuRCxFQUEwRDtBQUN0RDtBQUNBQyxRQUFBQSxNQUFNLEdBQUdySyxPQUFPLENBQUMsYUFBRCxDQUFQLENBQXVCQyxVQUFoQztBQUNILE9BSEQsTUFHTyxJQUFJMkMsTUFBTSxDQUFDd0gsUUFBUCxJQUFtQixLQUFuQixJQUE0QnhILE1BQU0sQ0FBQ3dILFFBQVAsSUFBbUIsS0FBbkQsRUFBMEQ7QUFDN0Q7QUFDQUMsUUFBQUEsTUFBTSxHQUFHckssT0FBTyxDQUFDLGVBQUQsQ0FBUCxDQUF5QkMsVUFBbEM7QUFDSCxPQUhNLE1BR0EsSUFBSTJDLE1BQU0sQ0FBQ3dILFFBQVAsSUFBbUIsS0FBbkIsSUFBNEJ4SCxNQUFNLENBQUN3SCxRQUFQLElBQW1CLEtBQW5ELEVBQTBEO0FBQzdEO0FBQ0FDLFFBQUFBLE1BQU0sR0FBR3JLLE9BQU8sQ0FBQyxnQkFBRCxDQUFQLENBQTBCQyxVQUFuQztBQUNILE9BSE0sTUFHQSxJQUFJMkMsTUFBTSxDQUFDd0gsUUFBUCxJQUFtQixLQUFuQixJQUE0QnhILE1BQU0sQ0FBQ3dILFFBQVAsSUFBbUIsS0FBbkQsRUFBMEQ7QUFDN0Q7QUFDQUMsUUFBQUEsTUFBTSxHQUFHckssT0FBTyxDQUFDLGlCQUFELENBQVAsQ0FBMkJDLFVBQXBDO0FBQ0gsT0FITSxNQUdBLElBQUkyQyxNQUFNLENBQUN3SCxRQUFQLElBQW1CLEtBQW5CLElBQTRCeEgsTUFBTSxDQUFDd0gsUUFBUCxJQUFtQixLQUFuRCxFQUEwRDtBQUM3RDtBQUNBQyxRQUFBQSxNQUFNLEdBQUdySyxPQUFPLENBQUMsZUFBRCxDQUFQLENBQXlCQyxVQUFsQztBQUNILE9BSE0sTUFHQSxJQUFJMkMsTUFBTSxDQUFDd0gsUUFBUCxJQUFtQixLQUFuQixJQUE0QnhILE1BQU0sQ0FBQ3dILFFBQVAsSUFBbUIsS0FBbkQsRUFBMEQ7QUFDN0Q7QUFDQUMsUUFBQUEsTUFBTSxHQUFHckssT0FBTyxDQUFDLGVBQUQsQ0FBUCxDQUF5QkMsVUFBbEM7QUFDSCxPQUhNLE1BR0EsSUFBSTJDLE1BQU0sQ0FBQ3dILFFBQVAsSUFBbUIsS0FBdkIsRUFBOEI7QUFDakNDLFFBQUFBLE1BQU0sR0FBR3JLLE9BQU8sQ0FBQyxhQUFELENBQVAsQ0FBdUJDLFVBQWhDO0FBQ0g7O0FBQ0QsVUFBSSxDQUFDLENBQUNvSyxNQUFOLEVBQWM7QUFDVnpJLFFBQUFBLElBQUksQ0FBQ3pDLFNBQUwsQ0FBZTBCLElBQWYsQ0FBb0JDLGNBQXBCLENBQW1DLFNBQW5DLEVBQThDQyxNQUE5QyxHQUF1RCxJQUF2RCxDQURVLENBQ21EOztBQUM3RCxZQUFJNkIsTUFBTSxDQUFDd0gsUUFBUCxJQUFtQixLQUFuQixJQUE0QnhILE1BQU0sQ0FBQ3dILFFBQVAsSUFBbUIsS0FBL0MsSUFBd0R4SCxNQUFNLENBQUN3SCxRQUFQLElBQW1CLEtBQW5CLElBQTRCeEgsTUFBTSxDQUFDd0gsUUFBUCxJQUFtQixLQUF2RyxJQUFnSHhILE1BQU0sQ0FBQ3dILFFBQVAsSUFBbUIsS0FBdkksRUFBOEk7QUFDMUlFLFVBQUFBLE1BQU0sQ0FBQ0MsY0FBUCxHQUF3QixJQUF4QixDQUQwSSxDQUM1RztBQUNqQzs7QUFDREYsUUFBQUEsTUFBTSxDQUFDbkssd0JBQVAsQ0FBZ0MwQixJQUFJLENBQUN6QyxTQUFyQztBQUNBa0wsUUFBQUEsTUFBTSxDQUFDRyxrQkFBUCxDQUEwQjVJLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0I0SyxNQUExQyxFQUFrRHBJLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0IrSyxRQUFsRSxFQUE0RXZJLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0JpRSxRQUE1RixFQUFzR3pCLElBQUksQ0FBQ3hDLFVBQUwsQ0FBZ0IrRCxRQUF0SDtBQUNBN0MsUUFBQUEsRUFBRSxDQUFDbUssV0FBSCxDQUFlQyxPQUFmO0FBQ0g7QUFDSixLQXBDRCxFQWxic0MsQ0F3ZHRDOztBQUNBOUksSUFBQUEsSUFBSSxDQUFDbkMsTUFBTCxDQUFZb0MsRUFBWixDQUFlLG1CQUFmLEVBQW9DLFVBQUNDLEdBQUQsRUFBUztBQUN6QyxVQUFJYyxNQUFNLEdBQUdoQixJQUFJLENBQUNpQixnQkFBTCxDQUFzQmYsR0FBdEIsQ0FBYjtBQUNBVyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQ2pDLElBQUksQ0FBQ2tDLFNBQUwsQ0FBZUMsTUFBZixDQUFqQzs7QUFDQSxVQUFJQSxNQUFNLENBQUM4RCxVQUFYLEVBQXVCO0FBQ25CcEcsUUFBQUEsRUFBRSxDQUFDcUssSUFBSCxDQUFRLFFBQVIsRUFBa0IzSSxZQUFsQixDQUErQixXQUEvQixFQUE0QzRJLFFBQTVDLENBQXFENUksWUFBckQsQ0FBa0UsV0FBbEUsRUFBK0U2SSxlQUEvRSxDQUErRmpJLE1BQU0sQ0FBQ0EsTUFBdEc7QUFDSDtBQUNKLEtBTkQ7QUFRQWhCLElBQUFBLElBQUksQ0FBQ25DLE1BQUwsQ0FBWW9DLEVBQVosQ0FBZSxzQkFBZixFQUF1QyxVQUFDQyxHQUFELEVBQVM7QUFDNUMsVUFBSWMsTUFBTSxHQUFHaEIsSUFBSSxDQUFDaUIsZ0JBQUwsQ0FBc0JmLEdBQXRCLENBQWI7QUFDQVcsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVosRUFBb0NqQyxJQUFJLENBQUNrQyxTQUFMLENBQWVDLE1BQWYsQ0FBcEM7O0FBQ0EsVUFBSUEsTUFBTSxDQUFDOEQsVUFBWCxFQUF1QjtBQUNuQnBHLFFBQUFBLEVBQUUsQ0FBQ3FLLElBQUgsQ0FBUSxRQUFSLEVBQWtCM0ksWUFBbEIsQ0FBK0IsV0FBL0IsRUFBNEM0SSxRQUE1QyxDQUFxRDVJLFlBQXJELENBQWtFLFdBQWxFLEVBQStFOEksa0JBQS9FLENBQWtHbEksTUFBTSxDQUFDQSxNQUF6RztBQUNIO0FBQ0osS0FORDtBQU9ILEdBaHlCYztBQWt5QmZtSSxFQUFBQSxVQUFVLEVBQUUsb0JBQVVDLEVBQVYsRUFBYztBQUN0QixRQUFJQyxJQUFJLEdBQUcsSUFBSUMsSUFBSixDQUFTQyxRQUFRLENBQUNILEVBQUQsQ0FBakIsQ0FBWCxDQURzQixDQUNZOztBQUNsQyxRQUFJSSxDQUFDLEdBQUdILElBQUksQ0FBQ0ksV0FBTCxFQUFSLENBRnNCLENBRUs7O0FBQzNCLFFBQUlDLENBQUMsR0FBSUwsSUFBSSxDQUFDTSxRQUFMLEtBQWtCLENBQWxCLEdBQXNCLEVBQXRCLEdBQTJCLE9BQU9OLElBQUksQ0FBQ00sUUFBTCxLQUFrQixDQUF6QixDQUEzQixHQUF5RE4sSUFBSSxDQUFDTSxRQUFMLEtBQWtCLENBQXBGLENBSHNCLENBR2lFOztBQUN2RixRQUFJQyxDQUFDLEdBQUdQLElBQUksQ0FBQ1EsT0FBTCxLQUFpQixFQUFqQixHQUFzQixNQUFNUixJQUFJLENBQUNRLE9BQUwsRUFBTixHQUF1QixFQUE3QyxHQUFrRFIsSUFBSSxDQUFDUSxPQUFMLEtBQWlCLEVBQTNFLENBSnNCLENBSXdEOztBQUU5RSxRQUFJQyxDQUFDLEdBQUdULElBQUksQ0FBQ1UsUUFBTCxLQUFrQixFQUFsQixHQUF1QixNQUFNVixJQUFJLENBQUNVLFFBQUwsRUFBN0IsR0FBK0NWLElBQUksQ0FBQ1UsUUFBTCxFQUF2RCxDQU5zQixDQU1pRDs7QUFDdkUsUUFBSUMsQ0FBQyxHQUFHWCxJQUFJLENBQUNZLFVBQUwsS0FBb0IsRUFBcEIsR0FBeUIsTUFBTVosSUFBSSxDQUFDWSxVQUFMLEVBQS9CLEdBQW1EWixJQUFJLENBQUNZLFVBQUwsRUFBM0QsQ0FQc0IsQ0FPdUQ7O0FBQzdFLFFBQUlDLENBQUMsR0FBR2IsSUFBSSxDQUFDYyxVQUFMLEtBQW9CLEVBQXBCLEdBQXlCLE1BQU1kLElBQUksQ0FBQ2MsVUFBTCxFQUEvQixHQUFtRGQsSUFBSSxDQUFDYyxVQUFMLEVBQTNELENBUnNCLENBUXVEOztBQUM3RSxXQUFPWCxDQUFDLEdBQUcsRUFBSixHQUFTRSxDQUFULEdBQWEsRUFBYixHQUFrQkUsQ0FBekIsQ0FUc0IsQ0FTTTtBQUUvQixHQTd5QmM7O0FBK3lCZjtBQUNKO0FBQ0E7QUFDSVEsRUFBQUEsc0JBQXNCLEVBQUUsa0NBQVk7QUFDaEN2SixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx3QkFBWjtBQUNBLFNBQUtqRCxNQUFMLENBQVl3TSxVQUFaO0FBQ0EsU0FBS3hNLE1BQUwsR0FBYyxJQUFkO0FBQ0gsR0F0ekJjOztBQXd6QmY7QUFDSjtBQUNBO0FBQ0E7QUFDSVMsRUFBQUEsd0JBQXdCLEVBQUUsa0NBQVVnTSxLQUFWLEVBQWlCO0FBQ3ZDLFNBQUsvTSxTQUFMLEdBQWlCK00sS0FBakI7QUFDSCxHQTl6QmM7O0FBK3pCZjtBQUNKO0FBQ0E7QUFDQTtBQUNJM0ssRUFBQUEsbUJBQW1CLEVBQUUsNkJBQVVnRixJQUFWLEVBQWdCO0FBQ2pDLFFBQUk0RixHQUFHLEdBQUcsSUFBSUMsTUFBSixDQUFXLFVBQVU3RixJQUFWLEdBQWlCLGVBQTVCLENBQVY7QUFDQSxRQUFJM0QsTUFBTSxHQUFHMEgsTUFBTSxDQUFDK0IsUUFBUCxDQUFnQkMsTUFBaEIsQ0FBdUJDLE1BQXZCLENBQThCLENBQTlCLEVBQWlDQyxLQUFqQyxDQUF1Q0wsR0FBdkMsQ0FBYjtBQUNBLFdBQU92SixNQUFNLEdBQUc2SixrQkFBa0IsQ0FBQzdKLE1BQU0sQ0FBQyxDQUFELENBQVAsQ0FBckIsR0FBbUMsSUFBaEQ7QUFDSCxHQXYwQmM7O0FBdzBCZjtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxnQkFBZ0IsRUFBRSwwQkFBVWYsR0FBVixFQUFlO0FBQzdCLFFBQUl4QixFQUFFLENBQUNDLEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQixhQUFPQyxJQUFJLENBQUNDLEtBQUwsQ0FBV29CLEdBQVgsQ0FBUDtBQUNIOztBQUNELFdBQU9BLEdBQVA7QUFDSCxHQWoxQmM7QUFtMUJmNEssRUFBQUEsVUFBVSxFQUFFLG9CQUFVQyxPQUFWLEVBQW1CO0FBQzNCLFNBQUtsTixNQUFMLENBQVk2QyxJQUFaLENBQWlCLGVBQWpCLEVBQWtDN0IsSUFBSSxDQUFDa0MsU0FBTCxDQUFlO0FBQzdDbkIsTUFBQUEsR0FBRyxFQUFFbUw7QUFEd0MsS0FBZixDQUFsQztBQUdIO0FBdjFCYyxDQUFuQjtBQTAxQkFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVOLFlBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5aSn5Y6FU09DS0VU6YCa6K6vXHJcbiAqL1xyXG52YXIgTG9iYnlOZXRXb3JrID0ge1xyXG4gICAgYWNjb3VudENoYW5nZTogZmFsc2UsXHJcbiAgICBsb2JieU1haW46IG51bGwsXHJcbiAgICBwbGF5ZXJJbmZvOiBudWxsLFxyXG4gICAgc2VydmVyTGlzdDogbnVsbCxcclxuICAgIGdldE5hbWVBbmRTaWduOiBmYWxzZSxcclxuICAgIGdldExvZ2luQ29kZTogZmFsc2UsXHJcbiAgICBoZWFkU3ByaXRlOiBudWxsLFxyXG4gICAgc29ja2V0OiBudWxsLFxyXG4gICAgaW86IG51bGwsXHJcbiAgICBjb25uZWN0ZWQ6IGZhbHNlLFxyXG4gICAgdXNlck5hbWU6IFwiXCIsXHJcbiAgICBwYXNzV29yZDogXCJcIixcclxuICAgIGxvZ2luQ2xpY2s6IGZhbHNlLFxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgbmV0V29ya0luaXRfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmlvID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNvY2tldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMuc2V0TG9iYnlNYWluT2JqX0Z1bmN0aW9uKHRoaXMucGxheWVySW5mby5nYW1lT2JqKTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucGxheWVySW5mby5pc0F1dG9Mb2dpbikge1xyXG4gICAgICAgICAgICBjYXNlIDA6IC8v6LSm5Y+355m76ZmGXHJcbiAgICAgICAgICAgICAgICB2YXIgdXNlckRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy/ojrflj5bnvJPlrZjkuK3nmoTnlKjmiLfmlbDmja5cclxuICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyRGF0YVwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2JieU1haW4ubm9kZS5nZXRDaGlsZEJ5TmFtZSgnTG9hZGluZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbkFjY291bnRfRnVuY3Rpb24odGhpcy5wbGF5ZXJJbmZvLmxvZ2luSXAsIHVzZXJEYXRhLmFjY291bnQsIHVzZXJEYXRhLnBhc3N3b3JkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2JieU1haW4uY29tX0xvZ2luLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOiAvL+a4uOWuoueZu+W9lVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpbkFjY291bnRfRnVuY3Rpb24odGhpcy5wbGF5ZXJJbmZvLmxvZ2luSXApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjogLy/lvq7kv6HnmbvpmYZcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjb3VudENoYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5wbGF5ZXJJbmZvLmxvZ2luQ29kZSA/IHRoaXMucGxheWVySW5mby5sb2dpbkNvZGUgOiB0aGlzLmdldFVybENvZGVfRnVuY3Rpb24oXCJsb2dpbkNvZGVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgdCA/IHRoaXMubG9naW5BY2NvdW50X0Z1bmN0aW9uKHRoaXMucGxheWVySW5mby5sb2dpbklwLCBudWxsLCBudWxsLCB0KSA6ICh0aGlzLmFjY291bnRDaGFuZ2UgPSBmYWxzZSwgdGhpcy5sb2dpbkFjY291bnRfRnVuY3Rpb24odGhpcy5wbGF5ZXJJbmZvLmxvZ2luSXApKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOi0puWPt+eZu+mZhlxyXG4gICAgICogQHBhcmFtIHsqfSB1cmwgXHJcbiAgICAgKiBAcGFyYW0geyp9IGFjY291bnQgXHJcbiAgICAgKiBAcGFyYW0geyp9IHBhc3NXb3JkIFxyXG4gICAgICogQHBhcmFtIHsqfSBsb2dpbkNvZGUgXHJcbiAgICAgKi9cclxuICAgIGxvZ2luQWNjb3VudF9GdW5jdGlvbjogZnVuY3Rpb24gKHVybCwgYWNjb3VudCwgcGFzc1dvcmQsIGxvZ2luQ29kZSkge1xyXG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBhY2NvdW50O1xyXG4gICAgICAgIHRoaXMucGFzc1dvcmQgPSBwYXNzV29yZDtcclxuICAgICAgICB0aGlzLmxvZ2luQ29kZSA9IGxvZ2luQ29kZTtcclxuICAgICAgICB0aGlzLnNvY2tldCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldCA9IFNvY2tldElPLmNvbm5lY3QodXJsKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbyA9IHJlcXVpcmUoXCJzb2NrZXQtaW9cIik7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gdGhpcy5pbyh1cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2luU29ja2V0T25fRnVuY3Rpb24oKTtcclxuICAgIH0sXHJcbiAgICBsb2dpblNvY2tldE9uX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOi/nuaOpemUmeivr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwiY29ubmVjdF9lcnJvclwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmxvYmJ5TWFpbi5jb21fTWVzc2FnZUJveCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi6L+e5o6l6ZSZ6K+vLOivt+ajgOa1i+e9kee7nFwiO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5zb2NrZXQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLnNvY2tldC4kZXZlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNvY2tldC5yZW1vdmVMaXN0ZW4oa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDov57mjqXotoXml7ZcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcImNvbm5lY3RfdGltZW91dFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwibGJfVGlwc1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIui/nuaOpei2heaXtizor7fmo4DmtYvnvZHnu5xcIjtcclxuICAgICAgICAgICAgaWYgKHNlbGYuc29ja2V0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VsZi5zb2NrZXQuJGV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zb2NrZXQucmVtb3ZlTGlzdGVuKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog572R57uc6ZSZ6K+vXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJlcnJvclwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwibGJfVGlwc1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIue9kee7nOmUmeivryzor7fmo4DmtYvnvZHnu5xcIjtcclxuICAgICAgICAgICAgaWYgKHNlbGYuc29ja2V0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VsZi5zb2NrZXQuJGV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zb2NrZXQucmVtb3ZlTGlzdGVuKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6YeN5paw6L+e5o6lXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJyZWNvbm5lY3RcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5zb2NrZXQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLnNvY2tldC4kZXZlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNvY2tldC5yZW1vdmVMaXN0ZW4oa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDov57mjqVzb2NrZS5cclxuICAgICAgICAgKiDnlKjmiLfnmbvlvZVcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcImNvbm5lY3RlZFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIC8vY2MubG9nKHJldCk7XHJcbiAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmRpc2Nvbm5ldGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5hY2NvdW50Q2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzZWxmLnBsYXllckluZm8uaXNBdXRvTG9naW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNvY2tldC5lbWl0KFwibG9naW5cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiBzZWxmLnVzZXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBzZWxmLnBhc3NXb3JkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IC8v5b6u5L+h55m76ZmGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNvY2tldC5lbWl0KFwibG9naW5cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luQ29kZTogc2VsZi5sb2dpbkNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieVJlZ2lzdGVyXCIpLmNoZWNrQWNjb3VudF9GdW5jdGlvbihzZWxmLnBsYXllckluZm8ubG9naW5JcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLmxvYmJ5TWFpbi5kaXNjb25uZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmJnX0JsYWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9NZXNzYWdlQm94LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuY29ubmVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOi/lOWbnueZu+mZhuS/oeaBr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwibG9naW5SZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6L+U5Zue55m76ZmG5L+h5oGvOicgKyBKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5yZXN1bHRpZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAtMjpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5iZ19CbGFjay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VBY2NvdW50XCIpLmdldENoaWxkQnlOYW1lKFwiZWJfUGFzc3dvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9Mb2dpbi5nZXRDaGlsZEJ5TmFtZShcImJ0X0xvZ2luXCIpLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjb3VudENoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5wbGF5ZXJJbmZvLmlzQXV0b0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihcIueZu+W9leS/oeaBr+S4jeWujOaVtCxcXG7or7fph43mlrDnmbvlvZVcIiwgMSwgNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24oXCLnmbvlvZXkv6Hmga/kuI3lrozmlbQsXFxu6K+36YeN5paw55m75b2VXCIsIDEsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAtMTpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5iZ19CbGFjay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VBY2NvdW50XCIpLmdldENoaWxkQnlOYW1lKFwiZWJfUGFzc3dvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9Mb2dpbi5nZXRDaGlsZEJ5TmFtZShcImJ0X0xvZ2luXCIpLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjb3VudENoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5wbGF5ZXJJbmZvLmlzQXV0b0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKFwi6LSm5Y+35bey57uP5Ya757uTLFxcbuivt+eUqOWFtuWug+i0puWPt+iBlOezu+WuouacjVwiLCAxLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihcIui0puWPt+W3sue7j+WGu+e7kyxcXG7or7fnlKjlhbblroPotKblj7fogZTns7vlrqLmnI1cIiwgMSwgNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24oXCLotKblj7flt7Lnu4/lhrvnu5MsXFxu6K+355So5YW25a6D6LSm5Y+36IGU57O75a6i5pyNXCIsIDEsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmJnX0JsYWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZUFjY291bnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9QYXNzd29yZFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX0xvZ2luLmdldENoaWxkQnlOYW1lKFwiYnRfTG9naW5cIikuZ2V0Q29tcG9uZW50KFwiY2MuQnV0dG9uXCIpLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NvdW50Q2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzZWxmLnBsYXllckluZm8uaXNBdXRvTG9naW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24oXCLotKblj7fmiJbogIXlr4bnoIHplJnor68s6K+36YeN5paw55m75b2VXCIsIDEsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihcIui0puWPt+aIluiAheWvhueggemUmeivryxcXG7or7fph43mlrDnmbvlvZUsXFxu5Liq5Lq65L+h5oGv5oyJ6ZKuKOW3puS4i+inkilcXG7lj6/liIfmjaLotKblj7dcIiwgMSwgNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24oXCLotKblj7fmiJbogIXlr4bnoIHplJnor68s6K+36YeN5paw55m75b2VXCIsIDEsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvZ2luQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8uYWNjb3VudCA9IHJlc3VsdC5PYmouYWNjb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8ucGFzc3dvcmQgPSBzZWxmLmxvYmJ5TWFpbi5jb21fTG9naW4uZ2V0Q2hpbGRCeU5hbWUoXCJlYl9QYXNzd29yZFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8ubG9naW5Db2RlID0gc2VsZi5sb2dpbkNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmdhbWVTaWduID0gcmVzdWx0Lk9iai5zaWduO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5wbGF5ZXJJZCA9IHJlc3VsdC5PYmouaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnBsYXllck5hbWUgPSByZXN1bHQuT2JqLm5pY2tuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5wbGF5ZXJDb2luID0gcmVzdWx0Lk9iai5zY29yZSAvIHNlbGYucGxheWVySW5mby5leGNoYW5nZVJhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnBsYXllckRpYW1vbmQgPSByZXN1bHQuT2JqLmRpYW1vbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCA9IHJlc3VsdC5PYmouaGVhZGltZ3VybDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8uaW9zQ2hhbm5lbCA9IHJlc3VsdC5PYmouQ2hhbm5lbFR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLndpbl9wb29sID0gcmVzdWx0Lndpbl9wb29sO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lk9iai5wcm9wbGlzdFsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8ucGxheWVyR2lmdCA9IHJlc3VsdC5PYmoucHJvcGxpc3RbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnBsYXllckdpZnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8ucGhvbmVOdW1iZXIgPSByZXN1bHQuT2JqLnBob25lTm87XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuT2JqLnBob25lTm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZGVkUGhvbmVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9OdW1iZXJcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gc2VsZi5sb2JieU1haW4uZW5jcnlwdFN0cmluZ19GdW5jdGlvbihyZXN1bHQuT2JqLnBob25lTm8sIDMsIDYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRlZFBob25lXCIpLmdldENoaWxkQnlOYW1lKFwibGJfTnVtYmVyXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5pc09mZmljYWwgPSByZXN1bHQuT2JqLm9mZmljaWFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5nYW1lRGlzY29ubmVjdCB8fCAoc2VsZi5wbGF5ZXJJbmZvLmdhbWVOYW1lID0gXCJMb2JieVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImxiX1BsYXllck5hbWVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gcmVzdWx0Lk9iai5uaWNrbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImxiX1BsYXllcklkXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IHJlc3VsdC5PYmouaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllck1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9QbGF5ZXJNb25leVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBzZWxmLnBsYXllckluZm8ucGxheWVyQ29pbi50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwibGJfUGxheWVyRGlhbW9uZFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBzZWxmLnBsYXllckluZm8ucGxheWVyRGlhbW9uZDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fTWFsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fQ3VzdG9tZXJTZXJ2aWNlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9TZXR0aW5nLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9Mb2dpbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUmVnaXN0ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX01haWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX2JhbmsuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uamFja3BvdF9zY3JpcHQuU2hvd0phY2tQb3QocmVzdWx0Lndpbl9wb29sKTsgLy/mmL7npLrlvanph5HmlbDlgLxcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5wbGF5ZXJJbmZvLmlzQXV0b0xvZ2luID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiRmlzaF9DTl9XWFwiLCBcIj9sb2dpbj0xXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5hY2NvdW50Q2hhbmdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi51c2VyTmFtZSAhPT0gXCJcIiAmJiBzZWxmLnBhc3NXb3JkICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieVJlZ2lzdGVyXCIpLmNoYW5nZVVzZXJEYXRhX0Z1bmN0aW9uKHNlbGYudXNlck5hbWUsIHNlbGYucGFzc1dvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY291bnRDaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZUFjY291bnRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VBY2NvdW50XCIpLmdldENoaWxkQnlOYW1lKFwiZWJfQWNjb3VudFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VBY2NvdW50XCIpLmdldENoaWxkQnlOYW1lKFwiZWJfUGFzc3dvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5sb2JieUluaXRfRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQ2hhbmdlQWNjb3VudFwiKS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZUFjY291bnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidF9DaGFuZ2VcIikuZ2V0Q29tcG9uZW50KFwiY2MuQnV0dG9uXCIpLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0xvYWRpbmcnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6L+U5Zue5pyN5Yqh5Zmo5YiX6KGo5pWw5o2uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJTZXJ2ZXJMaXN0UmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlcnZlckxpc3QgPSByZXN1bHQuR2FtZUluZm87XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coJ+i/lOWbnuacjeWKoeWZqOWIl+ihqOaVsOaNrjonICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coJ+afpeaJvkxvYmJ5TWVudT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScgKyBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1lbnVcIikpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKCctLS0tLS0tLS0tLS0tLei/lOWbnuacjeWKoeWZqOWIl+ihqD09PT09PT09PT09PT09PScgKyBKU09OLnN0cmluZ2lmeShzZWxmLnNlcnZlckxpc3QpKTtcclxuICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW5ri45oiP5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1lbnVcIikuZ2FtZU1lbnVJbml0X0Z1bmN0aW9uKHNlbGYuc2VydmVyTGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxmLmFub3RoZXJGdW5jdGlvbkluaXRfRnVuY3Rpb24oKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog55uR5ZCs5b2p6YeR55qE5Yi35pawXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oJ1JlZGlzV2luUG9vbCcsIChyZXQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGYubG9iYnlNYWluLmphY2twb3Rfc2NyaXB0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5qYWNrcG90X3NjcmlwdC5TaG93SmFja1BvdChyZXQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGFub3RoZXJGdW5jdGlvbkluaXRfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwic2VuZENvaW5SZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvL+WFheWAvOWbnuiwg+aOpeWPo1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnBsYXllckNvaW4gPSAoc2VsZi5wbGF5ZXJJbmZvLnBsYXllckNvaW4gKyByZXN1bHQuc2NvcmUgLyBzZWxmLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKTtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwibGJfUGxheWVyTW9uZXlcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gc2VsZi5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2VsZi5zb2NrZXQub24oXCJzZW5kR2l2ZUNvaW5SZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8ucGxheWVyQ29pbiA9IChyZXN1bHQucmVtYWluU2NvcmUgLyBzZWxmLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwibGJfUGxheWVyTW9uZXlcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gc2VsZi5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihyZXN1bHQubXNnLCAxLCAwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOajgOa1i+aYteensFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwiY2hlY2tOaWNrTmFtZVJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT04ocmV0KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jaGVja0lkUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNoZWNrSWRSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDor7fmsYLnu5HlrprmiYvmnLrlj7dcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcInNlbmRiaW5kUGhvbmVOb1Jlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT04ocmV0KTtcclxuICAgICAgICAgICAgcmVzdWx0LlJlc3VsdCB8fCAoc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uYWN0aXZlID0gZmFsc2UsIHNlbGYubG9iYnlNYWluLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKHJlc3VsdC5tc2csIDEsIDQpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog57uR5a6a5omL5py65Y+3XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJiaW5kUGhvbmVSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnBsYXllckluZm8ucGhvbmVOdW1iZXIgPSBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kUGhvbmVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9QaG9uZU51bWJlclwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRQaG9uZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRlZFBob25lXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kZWRQaG9uZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX051bWJlclwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBzZWxmLnBsYXllckluZm8ucGhvbmVOdW1iZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKHJlc3VsdC5tc2csIDEsIDQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcImV4Y2hhbmdlUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LlJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnBsYXllckdpZnQgKz0gcmVzdWx0LmRlbGV0ZUNvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKHJlc3VsdC5tc2csIDEsIDQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJHTXNlbmRNc2dcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldCk7XHJcbiAgICAgICAgICAgIGNjLmxvZygnR006JywgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIGxldCBsYmwgPSBzZWxmLmxvYmJ5TWFpbi5jb21fTWFsbC5nZXRDaGlsZEJ5TmFtZSgnY29tX0N1c3RvbWVyU2VydmljZScpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKTtcclxuICAgICAgICAgICAgaWYgKGxibC5jc0RhdGEuaWQgPT0gcmVzdWx0LmdtX2lkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5zZXRDaGF0X0Z1bmN0aW9uKDEwLCBsYmwuY3NEYXRhLm5hbWUsIHJlc3VsdC5tc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcInNlbmRNc2dcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldCk7XHJcbiAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmN1c3RvbWVyU2VydmljZVNlbmRNZXNzYWdlX0Z1bmN0aW9uKHJlc3VsdC51c2VySWQsIHJlc3VsdC5uaWNrbmFtZSwgcmVzdWx0Lm1zZyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwic2VuZE1zZ1RvVXNlclJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT04ocmV0KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fQ3VzdG9tZXJTZXJ2aWNlLmdldENoaWxkQnlOYW1lKFwiZWJfQ2hhdFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IHJlc3VsdC5tc2c7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jdXN0b21lclNlcnZpY2VTZW5kTWVzc2FnZV9GdW5jdGlvbihzZWxmLnBsYXllckluZm8ucGxheWVySWQsIHNlbGYucGxheWVySW5mby5wbGF5ZXJOYW1lLCBzZWxmLmxvYmJ5TWFpbi5zZW5kTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5zZW5kTWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJnZXRNc2dUb1VzZXJSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldCk7XHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0LlJlc3VsdENvZGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpZExpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5jaGF0TGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0LmRhdGEuY2hhdExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY3VzdG9tZXJTZXJ2aWNlU2VuZE1lc3NhZ2VfRnVuY3Rpb24ocmVzdWx0LmRhdGEuY2hhdExpc3RbaV0udXNlcklkLCByZXN1bHQuZGF0YS5jaGF0TGlzdFtpXS5uaWNrbmFtZSwgcmVzdWx0LmRhdGEuY2hhdExpc3RbaV0ubXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRMaXN0W2ldID0gcmVzdWx0LmRhdGEuY2hhdExpc3RbaV0uaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuc29ja2V0LmVtaXQoXCJ1cGRhdGVDaGFyTG9nXCIsIHtcclxuICAgICAgICAgICAgICAgIGlkTGlzdDogaWRMaXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOmTtuihjOafpemHkeW4gee7k+aenFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwiZ2V0UGxheWVyQ29pblJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT04ocmV0KTtcclxuICAgICAgICAgICAgY2MubG9nKHJlc3VsdC5SZXN1bHRDb2RlKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX2JhbmsuZ2V0Q29tcG9uZW50KFwiTG9iYnlCYW5rXCIpLnNob3dTZWxlY3RDb2luKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24ocmVzdWx0Lm1zZywgMSwgNCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W6ZO26KGM6LWE6YeR5pWwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJnZXRCYW5rU2NvcmVSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldCk7XHJcbiAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5wbGF5ZXJCYW5rQ29pbiA9IHJlc3VsdC5iYW5rU2NvcmU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOabtOaWsOmTtuihjOi1hOmHkeaVsFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwidXBkYXRlQmFua1Njb3JlUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LlJlc3VsdENvZGUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5wbGF5ZXJCYW5rQ29pbiA9IHJlc3VsdC5iYW5rU2NvcmU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX2JhbmsuZ2V0Q29tcG9uZW50KFwiTG9iYnlCYW5rXCIpLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihyZXN1bHQubXNnLCAxLCA0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDkv67mlLnpk7booYzlr4bnoIFcclxuICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwidXBkYXRlQmFua3B3ZFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT04ocmV0KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24oXCLpk7booYzlr4bnoIHkv67mlLnmiJDlip9cIiwgMSwgNCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24ocmVzdWx0Lm1zZywgMSwgNCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6LWw6ams54Gv5YWs5ZGK5L+h5oGvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJub3RpY2VNc2dcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAvLyB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldCk7XHJcbiAgICAgICAgICAgIC8vIHNlbGYubG9iYnlNYWluLnVwZGF0ZVN5c3RlbU1lc3NhZ2VfRnVuY3Rpb24ocmVzdWx0Lm5pY2tuYW1lICsgXCIgOiBcIiArIHJlc3VsdC5tc2cpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ25vdGljZU1zZzonICsgSlNPTi5zdHJpbmdpZnkocmV0KSk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT04ocmV0KTtcclxuICAgICAgICAgICAgaWYgKHNlbGYubG9iYnlNYWluLnN5c3RlbU1lc3NhZ2VBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uc3lzdGVtTWVzc2FnZUFycmF5ID0gW107XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5zeXN0ZW1NZXNzYWdlQXJyYXkgPSBuZXcgQXJyYXkoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1N5c3RlbU1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJ2aV9WaWV3XCIpLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLnN5c3RlbU1lc3NhZ2VTaWduID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLnVwZGF0ZVN5c3RlbU1lc3NhZ2VfRnVuY3Rpb24ocmVzdWx0W2ldLnR4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4ubW92ZVN5c3RlbU1lc3NhZ2VfRnVuY3Rpb24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJzZW5kTXNnUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICBzZWxmLnBsYXllckluZm8ucGxheWVyQ29pbiA9IChyZXN1bHQucmVtYWluU2NvcmUgLyBzZWxmLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcImxiX1BsYXllck1vbmV5XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IHNlbGYucGxheWVySW5mby5wbGF5ZXJDb2luLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwiZmlyc3RFeGNoYWdlclJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT04ocmV0KTtcclxuICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmFsaUFjY291bnQgPSByZXN1bHQuemhpZnViYW87XHJcbiAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5hbGlOYW1lID0gcmVzdWx0LnpoaWZ1YmFvTmFtZTtcclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4ucGxheWVySW5mb01lbnVJbml0X0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwiYWRkUHJpemVcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldCk7XHJcbiAgICAgICAgICAgIHJlc3VsdCAmJiBzZWxmLmxvYmJ5TWFpbi5hZGRNYWlsX0Z1bmN0aW9uKHJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwicHJpemVMaXN0UmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICByZXN1bHQucHJpemVMaXN0ICYmIHNlbGYubG9iYnlNYWluLm1haWxJbml0X0Z1bmN0aW9uKHJlc3VsdC5wcml6ZUxpc3QpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcImdldFByaXplUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LlJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLndpblNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24ocmVzdWx0Lm1zZyArIFwiIFwiICsgcmVzdWx0LmRhdGEud2luU2NvcmUgLyBzZWxmLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlICsgXCIg6YeR5biBXFxuXFxuXCIsIDQsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5wbGF5ZXJDb2luID0gKHBhcnNlRmxvYXQoc2VsZi5wbGF5ZXJJbmZvLnBsYXllckNvaW4pICsgcmVzdWx0LmRhdGEud2luU2NvcmUgLyBzZWxmLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwibGJfUGxheWVyTW9uZXlcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gc2VsZi5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24ocmVzdWx0Lm1zZywgMSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5kZXN0cm95TWFpbF9GdW5jdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaWreW8gOi/nuaOpVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCflpKfljoXov57mjqXmlq3lvIAnLCBzZWxmLmxvYmJ5TWFpbi5lbnRlclJvb20pO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5sb2JieU1haW4uZW50ZXJSb29tID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuY29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vc2VsZi5sb2dpbkNsaWNrIHx8IHNlbGYubG9iYnlNYWluLmVudGVyUm9vbSB8fCBzZWxmLmxvYmJ5TWFpbi5uZXRXb3JrRGlzY29ubmV0ZWRfRnVuY3Rpb24oXCLmuLjmiI/lt7Lmlq3lvIDvvIzor7fph43mlrDov57mjqXmuLjmiI9cIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwiaGVhcnRiZWF0UmVzdWx0XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uaGVhcnRCZWF0VGltZSA9IDA7XHJcbiAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmhlYXJ0QmVhdFRpbWVPdXQgPSAwO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDkv67mlLnmmLXnp7BcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcInVwZGF0ZU5pY2tOYW1lUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VOYW1lXCIpLmdldENoaWxkQnlOYW1lKFwiYnRfQ2hhbmdlXCIpLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LlJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlTmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcImViX05hbWVcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSByZXN1bHQubXNnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnBsYXllck5hbWUgPSBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VOYW1lXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJNZXNzYWdlLmdldENoaWxkQnlOYW1lKFwibGJfUGxheWVyTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBzZWxmLnBsYXllckluZm8ucGxheWVyTmFtZTtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlTmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcImViX05hbWVcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlTmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX0FjY291bnRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLotKblj7c6IFwiICsgc2VsZi5wbGF5ZXJJbmZvLmFjY291bnQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihyZXN1bHQubXNnLCAxLCA0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnu5HlrprmlK/ku5jlrp1cclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcImJpbmRaaGlmdWJhb1Jlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT04ocmV0KTtcclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZEFsaVwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0X0JpbmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuQnV0dG9uXCIpLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQWxpXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfQWNjb3VudFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IHJlc3VsdC5tc2c7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VBbGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9BY2NvdW50XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nID0gcmVzdWx0Lm1zZztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQWxpXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfQWNjb3VudFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5hbGlBY2NvdW50ID0gc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZEFsaVwiKS5nZXRDaGlsZEJ5TmFtZShcImViX0FjY291bnRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmFsaU5hbWUgPSBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQWxpXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmFsaUFjY291bnQgPSBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VBbGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9BY2NvdW50XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5hbGlOYW1lID0gc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlQWxpXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRBbGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9BY2NvdW50XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRBbGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9BY2NvdW50Q29uZmlybVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQWxpXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQWxpXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlQWxpXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJidF9CaW5kQWxpXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJidF9CaW5kZWRBbGlcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQmluZGVkQWxpXCIpLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5lbmNyeXB0QWxpQWNjb3VudCA9IHNlbGYubG9iYnlNYWluLmVuY3J5cHRTdHJpbmdfRnVuY3Rpb24oc2VsZi5wbGF5ZXJJbmZvLmFsaUFjY291bnQsIDMsIDYpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmVuY3J5cHRBbGlOYW1lID0gc2VsZi5sb2JieU1haW4uZW5jcnlwdFN0cmluZ19GdW5jdGlvbihzZWxmLnBsYXllckluZm8uYWxpTmFtZSwgMSwgMyk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kZWRBbGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9BY2NvdW50SW5mb1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBzZWxmLnBsYXllckluZm8uZW5jcnlwdEFsaUFjY291bnQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kZWRBbGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9OYW1lSW5mb1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBzZWxmLnBsYXllckluZm8uZW5jcnlwdEFsaU5hbWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kZWRBbGlcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24ocmVzdWx0Lm1zZywgMSwgNCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJzY29yZU91dFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT04ocmV0KVxyXG4gICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihyZXN1bHQubXNnLCAxLCA0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJjaGFuZ2VPZmZpY2lhbFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT04ocmV0KTtcclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ3JlYXRlQWNjb3VudFwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0X0NyZWF0ZVwiKS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DcmVhdGVBY2NvdW50XCIpLmdldENoaWxkQnlOYW1lKFwibGJfVGlwczBcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gcmVzdWx0Lm1zZztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY291bnQ6IHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NyZWF0ZUFjY291bnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9BY2NvdW50XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DcmVhdGVBY2NvdW50XCIpLmdldENoaWxkQnlOYW1lKFwiZWJfUGFzc3dvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieVJlZ2lzdGVyXCIpLndyaXRlVXNlckRhdGVfRnVuY3Rpb24oZGF0YSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5hY2NvdW50ID0gZGF0YS5hY2NvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5wYXNzd29yZCA9IGRhdGEucGFzc3dvcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ3JlYXRlQWNjb3VudFwiKS5nZXRDaGlsZEJ5TmFtZShcImViX0FjY291bnRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NyZWF0ZUFjY291bnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9QYXNzd29yZFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ3JlYXRlQWNjb3VudFwiKS5nZXRDaGlsZEJ5TmFtZShcImViX1Bhc3N3b3JkQ29uZmlybVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ3JlYXRlQWNjb3VudFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImJ0X0NyZWF0ZUFjY291bnRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlTmFtZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQ2hhbmdlTmFtZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQ2hhbmdlTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlTmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1N0YXRlXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi6LSm5Y+354q25oCBOiDlt7LovazmraNcIjtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VOYW1lXCIpLmdldENoaWxkQnlOYW1lKFwibGJfQWNjb3VudFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIui0puWPtzogXCIgKyBzZWxmLnBsYXllckluZm8uYWNjb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VOYW1lXCIpLmdldENoaWxkQnlOYW1lKFwibGJfSWRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLnlKjmiLdJRDogXCIgKyBzZWxmLnBsYXllckluZm8ucGxheWVySWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24ocmVzdWx0Lm1zZywgMSwgNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmlzT2ZmaWNhbCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwiQmFua0luZm9SZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldClcclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5hY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmFkZENyZWRpdENhcmRfRnVuY3Rpb24ocmVzdWx0LmNhcmRJZCwgcmVzdWx0Lm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uZWRpdENyZWRpdENhcmRfRnVuY3Rpb24ocmVzdWx0LmNhcmRJZCwgcmVzdWx0Lm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uZGVsZXRlQ3JlZGl0Q2FyZF9GdW5jdGlvbihyZXN1bHQuY2FyZElkLCByZXN1bHQubXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcImdldEJhbmtSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldCk7XHJcbiAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmJhbmtJbmZvSW5pdF9GdW5jdGlvbihyZXN1bHQuZGF0YS5iYW5rTGlzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5L+u5pS55a+G56CBXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJ1cGRhdGVQYXNzd29yZFJlc3VsdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT04ocmV0KTtcclxuICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlUGFzc3dvcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidF9DaGFuZ2VcIikuZ2V0Q29tcG9uZW50KFwiY2MuQnV0dG9uXCIpLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuUmVzdWx0Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlUGFzc3dvcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzMFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSByZXN1bHQubXNnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogc2VsZi5wbGF5ZXJJbmZvLmFjY291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZVBhc3N3b3JkXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfTmV3UGFzc3dvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5nZXRDb21wb25lbnQoXCJMb2JieVJlZ2lzdGVyXCIpLndyaXRlVXNlckRhdGVfRnVuY3Rpb24oZGF0YSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZVBhc3N3b3JkXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfT2xkUGFzc3dvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VQYXNzd29yZFwiKS5nZXRDaGlsZEJ5TmFtZShcImViX05ld1Bhc3N3b3JkXCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nID0gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlUGFzc3dvcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9QYXNzd29yZENvbmZpcm1cIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVySW5mby5hY3RpdmUgPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24ocmVzdWx0Lm1zZywgMSwgNCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKCd1cGRhdGVIZWFkVXJsUmVzdWx0JywgcmV0ID0+IHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5SZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBoZWFkID0gc2VsZi5sb2JieU1haW4uY29tX0JHLmdldENoaWxkQnlOYW1lKFwic3BfSGVhZFwiKTtcclxuICAgICAgICAgICAgICAgIEhlbHBlci5sb2FkSGVhZChyZXN1bHQudXJsLCB0ZXh0dXJlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKHJlc3VsdC5tc2csIDEsIDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7lpLTlg4/ov5Tlm57kv6Hmga9cclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcInNldEhlYWRSZXN1bHRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldCk7XHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0LlJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCA9IHJlc3VsdC5oZWFkSWQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5jb21fUGxheWVyTWVzc2FnZS5nZXRDaGlsZEJ5TmFtZShcInNwX0hlYWRcIikuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gc2VsZi5wbGF5ZXJJbmZvLnBsYXllckhlYWRBcnJheVtzZWxmLnBsYXllckluZm8ucGxheWVySGVhZElkXTtcclxuICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5wbGF5ZXJIZWFkID0gc2VsZi5wbGF5ZXJJbmZvLnBsYXllckhlYWRBcnJheVtzZWxmLnBsYXllckluZm8ucGxheWVySGVhZElkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmxvYmJ5TWFpbi5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihyZXN1bHQubXNnLCAxLCAwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VsZi5zb2NrZXQub24oXCJsaW5lT3V0TXNnXCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5pat57q/6YeN6L+eIOWPkei1tycsIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICBzZWxmLnBsYXllckluZm8uZ2FtZUlwID0gTGhqY29uZmlnLlNlcnZlcl9JUDtcclxuICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmdhbWVQcm90ID0gcmVzdWx0LnNlcnZlcklkO1xyXG4gICAgICAgICAgICBsZXQgdG1wTmV0ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5zZXJ2ZXJJZCA+PSAxMzcwMSAmJiByZXN1bHQuc2VydmVySWQgPD0gMTM3MDQpIHtcclxuICAgICAgICAgICAgICAgIC8v5paX5Zyw5Li7XHJcbiAgICAgICAgICAgICAgICB0bXBOZXQgPSByZXF1aXJlKFwiTGFuZE5ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuc2VydmVySWQgPj0gMTQxMDEgJiYgcmVzdWx0LnNlcnZlcklkIDw9IDE0MTA0KSB7XHJcbiAgICAgICAgICAgICAgICAvL+W+t+W3nlxyXG4gICAgICAgICAgICAgICAgdG1wTmV0ID0gcmVxdWlyZShcIkhvbGRlbU5ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuc2VydmVySWQgPj0gMTMyMDEgJiYgcmVzdWx0LnNlcnZlcklkIDw9IDEzMjA0KSB7XHJcbiAgICAgICAgICAgICAgICAvL+e6ouWMhVxyXG4gICAgICAgICAgICAgICAgdG1wTmV0ID0gcmVxdWlyZShcImhvbmdiYW9OZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnNlcnZlcklkID49IDEzNDAxICYmIHJlc3VsdC5zZXJ2ZXJJZCA8PSAxMzQwNCkge1xyXG4gICAgICAgICAgICAgICAgLy/niZvniZtcclxuICAgICAgICAgICAgICAgIHRtcE5ldCA9IHJlcXVpcmUoXCJHcmFiQnVsbE5ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuc2VydmVySWQgPj0gMTM4MDEgJiYgcmVzdWx0LnNlcnZlcklkIDw9IDEzODA0KSB7XHJcbiAgICAgICAgICAgICAgICAvL+i3keeahOW/q1xyXG4gICAgICAgICAgICAgICAgdG1wTmV0ID0gcmVxdWlyZShcIlJ1bmluZ05ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuc2VydmVySWQgPj0gMTQyMDEgJiYgcmVzdWx0LnNlcnZlcklkIDw9IDE0MjA0KSB7XHJcbiAgICAgICAgICAgICAgICAvL+eguOmHkeiKsVxyXG4gICAgICAgICAgICAgICAgdG1wTmV0ID0gcmVxdWlyZShcIkZsb3dlck5ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuc2VydmVySWQgPT0gMTM3MDYpIHtcclxuICAgICAgICAgICAgICAgIHRtcE5ldCA9IHJlcXVpcmUoXCJMYW5kTmV0V29ya1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghIXRtcE5ldCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4ubm9kZS5nZXRDaGlsZEJ5TmFtZSgnTG9hZGluZycpLmFjdGl2ZSA9IHRydWU7IC8v54K55Lqu5Yqg6L295ri45oiP55WM6Z2iXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnNlcnZlcklkID49IDEzNzAxICYmIHJlc3VsdC5zZXJ2ZXJJZCA8PSAxMzcwNCB8fCByZXN1bHQuc2VydmVySWQgPj0gMTM4MDEgJiYgcmVzdWx0LnNlcnZlcklkIDw9IDEzODA0IHx8IHJlc3VsdC5zZXJ2ZXJJZCA9PSAxMzcwNikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZWNvbm5lY3RQb2ludCA9IHRydWU7IC8v5Yik5pat5piv5LiN5piv5pat57q/6YeN6L+eXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0bXBOZXQuc2V0TG9iYnlNYWluT2JqX0Z1bmN0aW9uKHNlbGYubG9iYnlNYWluKTtcclxuICAgICAgICAgICAgICAgIHRtcE5ldC5sb2dpbkdhbWVfRnVuY3Rpb24oc2VsZi5wbGF5ZXJJbmZvLmdhbWVJcCwgc2VsZi5wbGF5ZXJJbmZvLmdhbWVQcm90LCBzZWxmLnBsYXllckluZm8ucGxheWVySWQsIHNlbGYucGxheWVySW5mby5nYW1lU2lnbik7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/mjpLooYzmppzmjqXlj6NcclxuICAgICAgICBzZWxmLnNvY2tldC5vbihcImdldENvaW5SYW5rUmVzdWx0XCIsIChyZXQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTihyZXQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0Q29pblJhbmtSZXN1bHQnLCBKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fcmFuay5nZXRDb21wb25lbnQoXCJMb2JieVJhbmtcIikudXBkYXRlQ29pblBhbmVsKHJlc3VsdC5yZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbGYuc29ja2V0Lm9uKFwiZ2V0RGlhbW9uZFJhbmtSZXN1bHRcIiwgKHJldCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OKHJldCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXREaWFtb25kUmFua1Jlc3VsdCcsIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LlJlc3VsdENvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9yYW5rLmdldENvbXBvbmVudChcIkxvYmJ5UmFua1wiKS51cGRhdGVEaWFtb25kUGFuZWwocmVzdWx0LnJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgdGltZUZvcm1hdDogZnVuY3Rpb24gKG5TKSB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChuUykpIC8vIOaXtumXtOaIs+S4ujEw5L2N6ZyA5LmYMTAwMO+8jOS4ujEz5L2N5YiZ5LiN55SoXHJcbiAgICAgICAgbGV0IFkgPSBkYXRlLmdldEZ1bGxZZWFyKCkgLy8g5bm0XHJcbiAgICAgICAgbGV0IE0gPSAoZGF0ZS5nZXRNb250aCgpICsgMSA8IDEwID8gJzAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpIDogZGF0ZS5nZXRNb250aCgpICsgMSkgLy8g5pyIXHJcbiAgICAgICAgbGV0IEQgPSBkYXRlLmdldERhdGUoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXREYXRlKCkgKyAnJyA6IGRhdGUuZ2V0RGF0ZSgpICsgJycgLy8g5pelXHJcblxyXG4gICAgICAgIGxldCBoID0gZGF0ZS5nZXRIb3VycygpIDwgMTAgPyAnMCcgKyBkYXRlLmdldEhvdXJzKCkgOiBkYXRlLmdldEhvdXJzKCkgLy8g5pe2XHJcbiAgICAgICAgbGV0IG0gPSBkYXRlLmdldE1pbnV0ZXMoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXRNaW51dGVzKCkgOiBkYXRlLmdldE1pbnV0ZXMoKSAvLyDliIZcclxuICAgICAgICBsZXQgcyA9IGRhdGUuZ2V0U2Vjb25kcygpIDwgMTAgPyAnMCcgKyBkYXRlLmdldFNlY29uZHMoKSA6IGRhdGUuZ2V0U2Vjb25kcygpIC8vIOenklxyXG4gICAgICAgIHJldHVybiBZICsgJycgKyBNICsgJycgKyBEOyAvLyB5eXl5L21tL2RkIGhoOm1tOnNzXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaWreW8gHNvY2tldFxyXG4gICAgICovXHJcbiAgICBsb2dvdXRBY2NvdW50X0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2xvZ291dEFjY291bnRfRnVuY3Rpb24nKTtcclxuICAgICAgICB0aGlzLnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWcuuaZr+WvueixoVxyXG4gICAgICogQHBhcmFtIHsqfSBzY2VuZSBcclxuICAgICAqL1xyXG4gICAgc2V0TG9iYnlNYWluT2JqX0Z1bmN0aW9uOiBmdW5jdGlvbiAoc2NlbmUpIHtcclxuICAgICAgICB0aGlzLmxvYmJ5TWFpbiA9IHNjZW5lO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WdXJs5Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXHJcbiAgICAgKi9cclxuICAgIGdldFVybENvZGVfRnVuY3Rpb246IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoJyhefCYpJyArIG5hbWUgKyAnPShbXiZdKikoJnwkKScpO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5tYXRjaChyZWcpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQgPyBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0WzJdKSA6IG51bGw7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDop6PmnpBKU09O5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0geyp9IHJldCBcclxuICAgICAqL1xyXG4gICAgY2hhbmdlUmVzdWx0SlNPTjogZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlSGVhZDogZnVuY3Rpb24gKGhlYWRVcmwpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCd1cGRhdGVIZWFkVXJsJywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1cmw6IGhlYWRVcmxcclxuICAgICAgICB9KSk7XHJcbiAgICB9LFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExvYmJ5TmV0V29yazsiXX0=