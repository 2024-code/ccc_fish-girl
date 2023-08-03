
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/LobbyMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c760fu9oGVEn7HwXGWdF5jz', 'LobbyMain');
// Script/Lobby/LobbyMain.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    pb_Chat0: {
      "default": null,
      type: cc.Prefab
    },
    pb_Chat1: {
      "default": null,
      type: cc.Prefab
    },
    pb_EditCardInfo: {
      "default": null,
      type: cc.Prefab
    },
    pb_MailSelect: {
      "default": null,
      type: cc.Prefab
    },
    com_BG: {
      "default": null,
      type: cc.Node
    },
    com_PlayerMessage: {
      "default": null,
      type: cc.Node
    },
    com_Button: {
      "default": null,
      type: cc.Node
    },
    com_SystemMessage: {
      "default": null,
      type: cc.Node
    },
    com_Mall: {
      "default": null,
      type: cc.Node
    },
    com_CustomerService: {
      "default": null,
      type: cc.Node
    },
    com_Mail: {
      "default": null,
      type: cc.Node
    },
    com_PlayerInfo: {
      "default": null,
      type: cc.Node
    },
    com_Login: {
      "default": null,
      type: cc.Node
    },
    com_Register: {
      "default": null,
      type: cc.Node
    },
    com_Tips: {
      "default": null,
      type: cc.Node
    },
    com_Setting: {
      "default": null,
      type: cc.Node
    },
    com_MessageBox: {
      "default": null,
      type: cc.Node
    },
    bg_Black: {
      "default": null,
      type: cc.Node
    },
    au_LobbyBGM: {
      "default": null,
      type: cc.AudioClip
    },
    sp_OnAndOff: {
      "default": [],
      type: cc.SpriteFrame
    },
    poxyUI: {
      "default": null,
      type: cc.Node
    },
    poxyPb: {
      "default": null,
      type: cc.Prefab
    },
    com_Quest: {
      "default": null,
      type: cc.Node
    },
    com_rank: {
      "default": null,
      type: cc.Node
    },
    com_activity: {
      "default": null,
      type: cc.Node
    },
    com_vip: {
      "default": null,
      type: cc.Node
    },
    historyItemPb: {
      "default": null,
      type: cc.Prefab
    },
    headBgSp: {
      "default": null,
      type: cc.SpriteFrame
    },
    adView: {
      "default": null,
      type: cc.Node
    },
    com_bank: cc.Node //银行界面

  },

  /**
   * 
   */
  onLoad: function onLoad() {
    var _this = this;

    //cc.sys.isNative && cc.Device.setKeepScreenOn(true);
    //cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
    //关闭脏矩形
    this.node.getChildByName("lb_Version").getComponent(cc.Label).string = window.game_ver;

    if (cc.renderType === cc.game.RENDER_TYPE_CANVAS) {
      cc.renderer.enableDirtyRegion(false);
    }

    var self = this;
    cc.view.setResizeCallback(function () {
      self.uiResize_Function();
    });
    this.bg_Black.on("touchstart", function (ret) {
      return false;
    }, this);
    this.disconneted = false;
    this.playerInfo = require("PlayerInfo").getInstant;
    this.playerInfo.setGameObj_Function(this);
    this.jackpot_script = this.node.getChildByName('jackpot').getComponent('jackpot');
    this.node.getChildByName('Loading').active = false; //默认隐藏加载页面
    //加载配置文件

    cc.loader.loadRes('Configuration/SwitchControl', function (error, ret) {
      ret = ret.json; // cc.loader.load("res/raw-assets/Texture/Configuration/SwitchControl.json", function (err, ret) {

      this.playerInfo.isBindAli = ret.isBindAli;
      this.playerInfo.isBindCreditCard = ret.isBindCreditCard;
      this.playerInfo.isBindPhone = ret.isBindPhone;
      this.playerInfo.isWithdraw = ret.isWithdraw;
      this.playerInfo.isWithdrawPhoneCard = ret.isWithdrawPhoneCard;
      this.playerInfo.shareUrl = ret.shareUrl;
      this.playerInfo.isAutoLogin = ret.isAutoLogin;
      this.playerInfo.paySelect = ret.paySelect;
      this.netWork = require("LobbyNetWork");
      this.netWork.netWorkInit_Function();
    }.bind(this));
    this.netWorkTimeCount = 0;
    this.tempNetWork = null;
    this.md5 = require("md5").getInstant;
    this.wordFilter = require("WordFilter").getInstant;

    if (cc.sys.isNative && window.platform_wx) {
      cc.find('Canvas/com_Login/wx_denglu').active = true; // cc.find('Canvas/com_Login/bt_Login').y = -80;
      // cc.find('Canvas/com_Login/yjian_zhuce').y = -80;
      // cc.find('Canvas/com_Login/bt_Register').y = -80;
    } // this.com_daohang.active = !!!window.firstComeIn;


    window.firstComeIn = true;
    Helper.http('http://game.bullsts.com/index.php/admin/api/imgs').then(function (e) {
      console.log('得到服务器信息' + JSON.stringify(e));
      var arr = [];

      for (var i in e) {
        if (!!e[i]) {
          arr.push(e[i]);
        }
      }

      if (arr.length > 1) {
        for (var _i = arr.length - 1; _i > 0; _i--) {
          var adNd = _this.adView.getChildByName('ad');

          var newAdNd = cc.instantiate(adNd);

          _this.adView.parent.parent.getComponent(cc.PageView).addPage(newAdNd);
        }
      }

      var _loop = function _loop(_i2) {
        var spr = _this.adView.children[_i2];
        Helper.loadHead(arr[_i2], function (sp) {
          spr.getComponent("cc.Sprite").spriteFrame = sp;
        });
      };

      for (var _i2 in arr) {
        _loop(_i2);
      }
    });
  },

  /**
   * 
   */

  /**
   * 初始化
   */
  lobbyInit_Function: function lobbyInit_Function() {
    this.loadGameScene = false;
    this.com_MessageBox.active = false;
    this.com_MessageBox.getChildByName("bt_Reconnet").active = false;
    this.mallInit_Function();
    this.setSystemMessage_Function();
    this.enterRoom = false;
    this.checkUpdateTimeOut = false;
    this.checkUpdateGameName = "";
    this.checkUpdateTime = 20;
    this.checkUpdateTimeLabel = this.checkUpdateTime;
    this.heartBeatTime = -20;
    this.heartBeatTimeOut = 0;
    this.heartBeatEmitControl = false;
    this.chatArray = [];
    this.chatMessageArray = new Array();
    this.chatMessagePosition = [[-500, -30], [485, -30]];
    this.bankSelect = -1;
    this.editCardId = -1;
    this.bg_Black.active = false;
    this.settingInit_Function();

    if (!cc.sys.isBrowser) {//this.node.getComponent("LobbyMenu").needToUpdate_Function();
    } // if (this.playerInfo.gameDisconnect) {
    //     this.gameReconnect_Function(this.playerInfo.gameIp, this.playerInfo.gameProt, this.playerInfo.gameName);
    // }


    this.codeTimeCount = false;
    this.getCodeTime = 0;
    this.checkIdResult = false;
    this.messageBoxType = 0; // this.customerServiceMessageInit_Function();

    this.HeadInit_Function();
    this.netWork.socket.emit("getBankScore");
    this.show_vip();
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * 设置界面初始化
   */
  settingInit_Function: function settingInit_Function() {
    this.sp_settingControl = new Array(2); //背景音乐

    this.sp_settingControl[0] = this.sp_OnAndOff[0]; //游戏音效

    this.sp_settingControl[1] = this.sp_OnAndOff[1];
    cc.audioEngine.stopAll();
    var e = null;
    null === this.playerInfo.musicControl ? (e = this.playerInfo.readData_Function("userSetting"), null === e ? (e = {
      musicControl: 1,
      soundEffectControl: 1
    }, this.playerInfo.writeData_Function("userSetting", e), this.playerInfo.musicControl = e.musicControl, this.playerInfo.soundEffectControl = e.soundEffectControl, this.com_Setting.getChildByName("bt_MusicControl").isVoice = this.playerInfo.musiccontrol, this.com_Setting.getChildByName("bt_SoundEffectControl").isVoice = this.playerInfo.soundEffectControl, this.bgmNumber = cc.audioEngine.play(this.au_LobbyBGM, true, 1)) : (this.playerInfo.musicControl = e.musicControl, this.playerInfo.soundEffectControl = e.soundEffectControl, this.com_Setting.getChildByName("bt_MusicControl").isVoice = this.playerInfo.musiccontrol, this.com_Setting.getChildByName("bt_SoundEffectControl").isVoice = this.playerInfo.soundEffectControl, this.playerInfo.musicControl && (this.bgmNumber = cc.audioEngine.play(this.au_LobbyBGM, true, 1)))) : this.playerInfo.musicControl && (this.com_Setting.getChildByName("bt_MusicControl").isVoice = this.playerInfo.musiccontrol, this.com_Setting.getChildByName("bt_SoundEffectControl").isVoice = this.playerInfo.soundEffectControl, this.bgmNumber = cc.audioEngine.play(this.au_LobbyBGM, true, 1)), this.playerInfo.musicControl ? (this.com_Setting.getChildByName("bt_MusicControl").getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1], this.com_Setting.getChildByName("bt_MusicControl").getChildByName("sp_Control").setPosition(60, 0)) : (this.com_Setting.getChildByName("bt_MusicControl").getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0], this.com_Setting.getChildByName("bt_MusicControl").getChildByName("sp_Control").setPosition(-60, 0)), this.playerInfo.soundEffectControl ? (this.com_Setting.getChildByName("bt_SoundEffectControl").getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1], this.com_Setting.getChildByName("bt_SoundEffectControl").getChildByName("sp_Control").setPosition(60, 0)) : (this.com_Setting.getChildByName("bt_SoundEffectControl").getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0], this.com_Setting.getChildByName("bt_SoundEffectControl").getChildByName("sp_Control").setPosition(-60, 0)), cc.sys.os === cc.sys.OS_ANDROID && (this.com_Setting.getChildByName("bt_Exit").active = true);
  },
  playerInfoMenuInit_Function: function playerInfoMenuInit_Function() {
    for (var e = 12; e < this.com_PlayerInfo.children.length; ++e) {
      this.com_PlayerInfo.children[e].active = false;
    }

    this.playerInfo.isOffical ? (this.com_PlayerInfo.getChildByName("bt_CreateAccount").active = false, this.com_PlayerInfo.getChildByName("com_CreateAccount").active = false, this.com_PlayerInfo.getChildByName("bt_ChangeName").active = true, this.com_PlayerInfo.getChildByName("bt_ChangeName").getComponent("cc.Button").interactable = false, this.com_PlayerInfo.getChildByName("com_ChangeName").active = true, this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_State").getComponent("cc.Label").string = "账号状态: 已转正", this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Account").getComponent("cc.Label").string = "账号: " + this.playerInfo.account, this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Id").getComponent("cc.Label").string = "用户ID: " + this.playerInfo.playerId) : (this.com_PlayerInfo.getChildByName("bt_CreateAccount").active = true, this.com_PlayerInfo.getChildByName("bt_CreateAccount").active = true, this.com_PlayerInfo.getChildByName("bt_CreateAccount").getComponent("cc.Button").interactable = false, this.com_PlayerInfo.getChildByName("com_CreateAccount").active = true, this.com_PlayerInfo.getChildByName("bt_ChangeName").active = false, this.com_PlayerInfo.getChildByName("com_ChangeName").active = false, this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_State").getComponent("cc.Label").string = "", this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Account").getComponent("cc.Label").string = "", this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Id").getComponent("cc.Label").string = ""), this.playerInfo.isBindAli ? this.playerInfo.aliAccount ? (this.com_PlayerInfo.getChildByName("bt_BindAli").active = false, this.com_PlayerInfo.getChildByName("bt_BindedAli").active = true, this.playerInfo.encryptAliAccount = this.encryptString_Function(this.playerInfo.aliAccount, 3, 6), this.playerInfo.encryptAliName = this.encryptString_Function(this.playerInfo.aliName, 1, 3), this.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_AccountInfo").getComponent("cc.Label").string = this.playerInfo.encryptAliAccount, this.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_NameInfo").getComponent("cc.Label").string = this.playerInfo.encryptAliName) : (this.com_PlayerInfo.getChildByName("bt_BindAli").active = true, this.com_PlayerInfo.getChildByName("bt_BindedAli").active = false, this.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_AccountInfo").getComponent("cc.Label").string = "", this.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_NameInfo").getComponent("cc.Label").string = "") : (this.com_PlayerInfo.getChildByName("bt_BindAli").active = false, this.com_PlayerInfo.getChildByName("bt_BindedAli").active = false), this.playerInfo.isBindCreditCard ? this.com_PlayerInfo.getChildByName("bt_BindCreditCard").active = true : this.com_PlayerInfo.getChildByName("bt_BindCreditCard").active = false, this.playerInfo.isBindPhone ? this.com_PlayerInfo.getChildByName("bt_BindPhone").active = true : this.com_PlayerInfo.getChildByName("bt_BindPhone").active = false, this.playerInfo.playerCoin < 50 ? this.com_Button.getChildByName("bt_PlusMall").getChildByName("tips").active = true : this.com_Button.getChildByName("bt_PlusMall").getChildByName("tips").active = false, 2 === this.playerInfo.isAutoLogin && (this.com_PlayerInfo.getChildByName("bt_ChangeAccount").active = false, this.com_PlayerInfo.getChildByName("bt_ChangePassword").active = false), this.bankIdInit_Function(), this.netWork.socket && this.netWork.socket.emit("getBank"), this.readChat_Function();
  },
  encryptString_Function: function encryptString_Function(e, t, i) {
    for (var n = e, o = "", a = t; a < n.length; ++a) {
      o += "*";
    }

    return o.length > 8 && (o = "********"), n = n.length > i ? n.substring(0, t) + o + n.substring(n.length - t, n.length) : n.substring(0, t) + o;
  },
  mallInit_Function: function mallInit_Function() {
    this.rechargeMoneyArray = [98, 198, 498, 968];

    for (var e = 0; e < 4; ++e) {
      this.com_Mall.getChildByName("com_chongzhi_01").getChildByName("bt_Recharge" + e).rechargeId = e;
    } //for (e = 0; e < this.playerInfo.paySelect.length; ++e) this.com_Mall.children[e + 9].getComponent("cc.Button").interactable = this.playerInfo.paySelect[e];

  },
  HeadInit_Function: function HeadInit_Function() {
    var _this2 = this;

    //初始化头像
    Helper.loadHead(this.playerInfo.playerHeadId, function (sp) {
      _this2.com_BG.getChildByName("sp_Head").getComponent("cc.Sprite").spriteFrame = sp;
    });
  },
  customerServiceMessageInit_Function: function customerServiceMessageInit_Function() {
    var e = this.com_CustomerService.getChildByName("sv_View").getComponent("cc.ScrollView").content;
    e.removeAllChildren(), this.chatMessageArray = [], this.netWork.socket && this.netWork.socket.emit("getMsgToUser");
  },
  mailInit_Function: function mailInit_Function(e) {
    this.playerInfo.mailList = e, this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string = "";
    this.com_Mail.getChildByName("bt_Get").getComponent("cc.Button").interactable = false;
    var t = this.com_Mail.getChildByName("sv_Mail").getComponent("cc.ScrollView").content;

    if (t.removeAllChildren(), e) {
      for (var i = null, n = 0, o = -40, a = 0; a < e.length; ++a) {
        i = cc.instantiate(this.pb_MailSelect), t.addChild(i), i.setPosition(n, o + a * -70), i.getChildByName("Label").getComponent("cc.Label").string = "系统邮件", i.getComponent("LobbyButtonClick").canvasNode = this, i.buttonID = a, i.mailID = e[a].id;
      }

      e.length > 4 ? t.height = 70 * e.length : t.height = 320, e.length > 0 ? this.com_Button.getChildByName("bt_Mail").getChildByName("tips").active = true : this.com_Button.getChildByName("bt_Mail").getChildByName("tips").active = false;
    }
  },
  getMailInfo_Function: function getMailInfo_Function(e) {
    for (var t = this.com_Mail.getChildByName("sv_Mail").getComponent("cc.ScrollView").content, i = 0; i < t.children.length; ++i) {
      t.children[i].getComponent("cc.Button").interactable = true;
    }

    e.getComponent("cc.Button").interactable = false, this.mailClick = e.node.buttonID, this.com_Mail.getChildByName("bt_Get").getComponent("cc.Button").interactable = true;
    var n = "";

    switch (this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string = "系统邮件\n\n", this.playerInfo.mailList[e.node.buttonID].type) {
      case 0:
        this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += "恭喜您在比赛当中获得第 " + this.playerInfo.mailList[e.node.buttonID].rankidx + " 名\n\n";
        break;

      case 1:
        this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += "玩家昵称: " + this.playerInfo.mailList[e.node.buttonID].nickName + "\nID: " + this.playerInfo.mailList[e.node.buttonID].sendCoinUserId + "\n\n给你赠送了";
        break;

      case 2:
        this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += "在开炮送话费活动中您完成了一个等级\n\n";
    }

    if (this.playerInfo.mailList[e.node.buttonID].propCount > 0) {
      switch (this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += "获得 " + this.playerInfo.mailList[e.node.buttonID].propCount + " 个", this.playerInfo.mailList[e.node.buttonID].propId) {
        case 1:
          n = "话费券";
      }

      this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += n + "\n\n";
    }

    this.playerInfo.mailList[e.node.buttonID].winScore > 0 && (this.playerInfo.mailList[e.node.buttonID].nickName ? this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += (this.playerInfo.mailList[e.node.buttonID].winScore / this.playerInfo.exchangeRate).toFixed(2) + " 金币" : this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += "获得 " + (this.playerInfo.mailList[e.node.buttonID].winScore / this.playerInfo.exchangeRate).toFixed(2) + " 金币");
  },

  /**
   * 获得邮件
   */
  getMail_Function: function getMail_Function() {
    if (this.mailClick !== -1) {
      this.netWork.socket.emit("getPrize", {
        id: this.playerInfo.mailList[this.mailClick].id
      });
    }

    this.com_Mail.getChildByName("bt_Get").getComponent("cc.Button").interactable = false;
  },

  /**
   * 添加邮件
   * @param {*} data 
   */
  addMail_Function: function addMail_Function(data) {
    this.playerInfo.mailList.push(data);
    var sv_Mail = this.com_Mail.getChildByName("sv_Mail").getComponent("cc.ScrollView").content;
    var mailObject = null;
    mailObject = cc.instantiate(this.pb_MailSelect);
    sv_Mail.addChild(mailObject);
    mailObject.getChildByName("Label").getComponent("cc.Label").string = "系统邮件";
    mailObject.getComponent("LobbyButtonClick").canvasNode = this;
    mailObject.mailID = data.id;
    mailObject.buttonID = this.playerInfo.mailList.length - 1;
    this.com_Button.getChildByName("bt_Mail").getChildByName("tips").active = true;
    this.updateMailContent_Function();
  },

  /**
   * 删除邮件
   */
  destroyMail_Function: function destroyMail_Function() {
    this.playerInfo.mailList[this.mailClick] = null;
    this.updateMailContent_Function();
  },
  updateMailContent_Function: function updateMailContent_Function() {
    for (var e = this.com_Mail.getChildByName("sv_Mail").getComponent("cc.ScrollView").content, t = 0, i = -40, n = 0; n < this.playerInfo.mailList.length; ++n) {
      null === this.playerInfo.mailList[n] && (this.playerInfo.mailList.splice(n, 1), e.removeChild(e.children[n]));
    }

    for (var n = 0; n < this.playerInfo.mailList.length; ++n) {
      e.children[n].buttonID = n, e.children[n].setPosition(t, i + n * -70);
    }

    this.playerInfo.mailList.length > 4 ? e.height = 70 * this.playerInfo.mailList.length : (e.height = 320, 0 === this.playerInfo.mailList.length && (this.com_Button.getChildByName("bt_Mail").getChildByName("tips").active = false)), this.com_Mail.getChildByName("sv_Mail").getComponent("cc.ScrollView").scrollToTop(.5), this.mailClick = -1, this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string = "";
  },
  bankIdInit_Function: function bankIdInit_Function() {
    for (var e = this.com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").getComponent("cc.ScrollView").content, t = this.com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").getComponent("cc.ScrollView").content, i = 0; i < e.childrenCount; ++i) {
      e.children[i].bankId = i, t.children[i].bankId = i;
    }
  },
  bankInfoInit_Function: function bankInfoInit_Function(e) {
    this.creditCardObj = null;
    this.bankList = e;
    this.bankNameList = ["", "工商银行", "中国银行", "农业银行", "建设银行", "交通银行", "招商银行", "中国邮政", "光大银行", "民生银行", "中信银行", "兴业银行", "华夏银行"];

    for (var t = null, i = 0; i < e.length; ++i) {
      t = cc.instantiate(this.pb_EditCardInfo);
      t.setPosition(175, 180 - 100 * i);
      t.getChildByName("lb_CardInfo").getComponent("cc.Label").string = "银行卡: " + this.encryptString_Function(e[i].account, 4, 4);
      t.cardId = e[i].cardId;
      t.getComponent("LobbyButtonClick").canvasNode = this;
      this.com_PlayerInfo.getChildByName("com_BindCreditCard").addChild(t);
      e.length > 4 ? this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").active = false : this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").setPosition(175, 180 - 100 * e.length);
    }
  },

  /**
   * 添加银行卡
   * @param {*} cardId 
   * @param {*} msg 
   */
  addCreditCard_Function: function addCreditCard_Function(cardId, msg) {
    if (!this.bankList) {
      this.bankList = new Array();
    }

    this.creditCardObj.cardId = cardId;
    this.bankList.push(this.creditCardObj);
    this.com_PlayerInfo.getChildByName("com_AddCreditCard").active = false;
    this.com_PlayerInfo.getChildByName("com_BindCreditCard").active = true;
    var info = cc.instantiate(this.pb_EditCardInfo);
    info.cardId = cardId;
    info.setPosition(175, 180 - 100 * (this.bankList.length - 1));
    info.getChildByName("lb_CardInfo").getComponent("cc.Label").string = "银行卡: " + this.encryptString_Function(this.creditCardObj.account, 4, 4);
    info.getComponent("LobbyButtonClick").canvasNode = this;
    this.com_PlayerInfo.getChildByName("com_BindCreditCard").addChild(info);

    if (this.bankList.length > 4) {
      this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").active = false;
    } else {
      this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").setPosition(175, 180 - 100 * this.bankList.length);
    }

    this.creditCardObj = null;
    this.showMessagebox_Function(msg, 1, 0);
  },

  /**
   * 修改银行卡
   * @param {*} cardId 
   * @param {*} msg 
   */
  editCreditCard_Function: function editCreditCard_Function(cardId, msg) {
    for (var i = 0; i < this.bankList.length; i++) {
      if (this.bankList[i].cardId === cardId) {
        this.bankList[i].account = this.com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string;
        this.bankList[i].name = this.com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_Owner").getComponent("cc.EditBox").string;
        this.bankList[i].bankType = this.bankSelect;
      }
    }

    this.bankSelect = -1;
    this.com_PlayerInfo.getChildByName("com_EditCreditCard").active = false;
    this.com_PlayerInfo.getChildByName("com_BindCreditCard").active = true;
    this.showMessagebox_Function(msg, 1, 0);

    for (var i = 0; i < this.com_PlayerInfo.getChildByName("com_BindCreditCard").childrenCount; i++) {
      if (this.com_PlayerInfo.getChildByName("com_BindCreditCard").children[i].cardId === cardId) {
        this.com_PlayerInfo.getChildByName("com_BindCreditCard").children[i].getChildByName("lb_CardInfo").getComponent("cc.Label").string = "银行卡: " + this.encryptString_Function(this.com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string, 4, 4);
      }
    }
  },

  /**
   * 删除银行卡
   * @param {*} cardId 
   * @param {*} msg 
   */
  deleteCreditCard_Function: function deleteCreditCard_Function(cardId, msg) {
    this.com_PlayerInfo.getChildByName("com_EditCreditCard").active = false;
    this.com_PlayerInfo.getChildByName("com_BindCreditCard").active = true;

    for (var i = 0; i < this.bankList.length; i++) {
      if (this.bankList[i].cardId === cardId) {
        this.bankList.splice(i, 1);
        break;
      }
    }

    for (i = 0; i < this.com_PlayerInfo.getChildByName("com_BindCreditCard").childrenCount; i++) {
      if (this.com_PlayerInfo.getChildByName("com_BindCreditCard").children[i].cardId === cardId) {
        this.com_PlayerInfo.getChildByName("com_BindCreditCard").removeChild(this.com_PlayerInfo.getChildByName("com_BindCreditCard").children[i]);
        break;
      }
    }

    this.showMessagebox_Function(msg, 1, 0);
    this.updateBankList_Function();
  },

  /**
   * 更新银行列表
   */
  updateBankList_Function: function updateBankList_Function() {
    for (var i = 0; i < this.com_PlayerInfo.getChildByName("com_BindCreditCard").childrenCount; i++) {
      this.com_PlayerInfo.getChildByName("com_BindCreditCard").children[i].setPosition(175, 180 - 100 * (i - 1));
    }

    if (this.bankList.length > 4) {
      this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").active = false;
    } else {
      this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").active = true;
      this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").setPosition(175, 180 - 100 * this.bankList.length);
    }
  },

  /**
   * 连接游戏服务器失败
   * @param {*} gameName 
   */
  contentGameServerFail_Function: function contentGameServerFail_Function(gameName) {
    var errorMsg = "";

    switch (gameName) {
      case "Fish":
        errorMsg = "街机捕鱼";
        break;

      case "Bde":
        errorMsg = "八搭二";
        break;

      case "GrabBull":
        errorMsg = "抢庄牛牛";
        break;

      case "TwoEight":
        errorMsg = "二八杠";
        break;

      case "Bull":
        errorMsg = "经典牛牛";
        break;

      case "LineGame":
        errorMsg = "经典老虎机";
        break;

      case "Roulette":
        errorMsg = "欧式轮盘";
        break;

      case "hongbao":
        errorMsg = "红包达人";
        break;

      case "Fishhaiwang2":
        errorMsg = "海王2";
        break;
    }

    this.showMessagebox_Function("连接" + errorMsg + "出错,请联系客服", 1, 4);
    this.loadGameScene = false;
  },

  /**
   * 进入游戏房间
   * @param {*} gameObj 
   * @param {*} gameName 
   */
  loginGameRoom_Function: function loginGameRoom_Function(gameObj, gameName) {
    if (this.playerInfo.playerCoin < gameObj.node.entryCoin / 100) {
      this.showMessagebox_Function("金币不够了啦,\n\n去充值好吗?", 3, 4);
      return;
    }

    this.node.getChildByName('Loading').active = true; //点亮加载游戏界面

    console.log('gameObj:', gameObj);
    this.playerInfo.gameIp = gameObj.node.ip;
    this.playerInfo.gameProt = gameObj.node.prot;
    this.playerInfo.gameName = gameName;
    this.tempNetWork = null;

    if (!this.loadGameScene) {
      this.loadGameScene = true;

      switch (gameName) {
        case "GrabBull":
          this.tempNetWork = require("GrabBullNetWork").getInstant;
          break;

        case "Land":
          this.tempNetWork = require("LandNetWork").getInstant;
          break;

        case "Runing":
          this.tempNetWork = require("RuningNetWork").getInstant;
          break;

        case "Holdem":
          this.tempNetWork = require("HoldemNetWork").getInstant;
          break;

        case "Flower":
          this.tempNetWork = require("FlowerNetWork").getInstant;
          break;

        case "Roulette":
          this.tempNetWork = require("RouletteNet").getInstant;
          break;

        case "Fish":
          this.tempNetWork = require("FishNetWork").getInstant;
          break;

        case "hongbao":
          this.tempNetWork = require("HongBaoNetWork").getInstant;
          break;

        case "Fishhaiwang2":
          this.tempNetWork = require("Fishhaiwang2NetWork").getInstant;
          break;
      }

      this.getComponent("LobbyMain").bg_Black.active = true;
      this.enterRoom = true;
      this.tempNetWork.setLobbyMainObj_Function(this);
      this.tempNetWork.loginGame_Function(this.playerInfo.gameIp, this.playerInfo.gameProt, this.playerInfo.playerId, this.playerInfo.gameSign);
      cc.audioEngine.stopAll();
    }

    this.checkLinkTimeOut = true;
    this.linkTime = 5;
  },

  /**
   * 连接游戏Socket服务器
   * @param {*} loginIP 
   * @param {*} prot 
   * @param {*} gameName 
   */
  gameReconnect_Function: function gameReconnect_Function(loginIP, prot, gameName) {
    this.playerInfo.gameIp = loginIP;
    this.playerInfo.gameProt = prot;
    this.playerInfo.gameName = gameName;
    var netWord = null;

    if (!this.loadGameScene) {
      this.loadGameScene = true;

      switch (gameName) {
        case "GrabBull":
          netWord = require("GrabBullNetWork").getInstant;
          break;

        case "Land":
          netWord = require("LandNetWork").getInstant;
          break;

        case "Runing":
          netWord = require("RuningNetWork").getInstant;
          break;

        case "Holdem":
          this.tempNetWork = require("HoldemNetWork").getInstant;
          break;

        case "Flower":
          this.tempNetWork = require("FlowerNetWork").getInstant;
          break;

        case "hongbao":
          this.tempNetWork = require("hongbaoNetWork").getInstant;
          break;
      }

      this.enterRoom = true;
      this.getComponent("LobbyMain").bg_Black.active = true;
      netWord.setLobbyMainObj_Function(this);
      netWord.loginGame_Function(loginIP, prot, this.playerInfo.playerId, this.playerInfo.gameSign);
      cc.audioEngine.stopAll();
      netWord = null;
    }
  },

  /**
   * 
   * @param {*} money 
   * @param {*} nodeID 
   * @param {*} type 
   */
  pay_Function: function pay_Function(money, nodeID, type) {
    if (!money || money < 50) return; //

    var url = "http://game.bullsts.com/";
    url += "index.php/api/pay/pay/";
    url += "uid/";
    url += this.playerInfo.playerId;
    url += "/fee/";
    url += money;
    url += "/type/";
    url += type;

    if (cc.sys.isNative) {
      cc.sys.openURL(url);
    } else {
      var webnode = this.com_Mall.getChildByName('com_RechargeWeb');
      webnode.active = true;
      var web = webnode.getChildByName('wv_Web').getComponent(cc.WebView);
      web.url = url;
    }

    this.rechargeMoney = 0; // var platform = -1;
    // switch (cc.sys.os) {
    //     case cc.sys.OS_ANDROID:
    //         platform = 0;
    //         break;
    //     case cc.sys.OS_IOS:
    //         platform = 1;
    //         break;
    //     default:
    //         platform = 2;
    //         break;
    // }
    // switch (type) {
    //     case 0:
    //         var playerId = this.playerInfo.playerId;
    //         var totalFee = money * this.playerInfo.exchangeRate;
    //         var payType = 1300;
    //         var appId = 1001;
    //         var account = this.playerInfo.account;
    //         var url = "http://ys.httpvip.com:8088/cz.php?userId=" + playerId + "&totalFee=" + totalFee + "&platform=" + platform + "&payType=" + payType + "&appId=" + appId + "&account=" + account;
    //         break;
    //     case 1:
    //         var playerId = this.playerInfo.playerId;
    //         var totalFee = money * this.playerInfo.exchangeRate;
    //         var payType = 2000;
    //         var appId = 1002;
    //         var account = this.playerInfo.account;
    //         var url = "http://ys.httpvip.com:8088/cz.php?userId=" + playerId + "&totalFee=" + totalFee + "&platform=" + platform + "&payType=" + payType + "&appId=" + appId + "&account=" + account;
    //         break;
    //     case 2:
    //         var d = [6, 18, 50, 100, 200];
    //         var playerId = this.playerInfo.playerId;
    //         var totalFee = d[nodeID] * this.playerInfo.exchangeRate;
    //         var appId = 1001;
    //         var account = this.playerInfo.account;
    //         var url = "http://ys.httpvip.com:8088/cz.php?userId=" + playerId + "&totalFee=" + totalFee + "&platform=" + platform + "&goodsId=" + nodeID + "&appId=" + appId + "&account=" + account;
    //         break;
    // }
    // this.rechargeMoney = 0;
    // cc.sys.openURL(url);
  },

  /**
   * 
   * @param {*} userId 
   * @param {*} nickname 
   * @param {*} msg 
   */
  customerServiceSendMessage_Function: function customerServiceSendMessage_Function(userId, nickname, msg) {// this.setChat_Function(userId, nickname, msg);
    // this.writeChat_Function(userId, nickname, msg);
  },

  /**
   * 
   * @param {*} userId 
   * @param {*} nickname 
   * @param {*} message 
   */
  setChat_Function: function setChat_Function(userId, nickname, message) {
    var view = this.com_CustomerService.getChildByName("sv_View").getComponent("cc.ScrollView").content;
    var object = null;

    if (userId === this.playerInfo.playerId) {
      object = cc.instantiate(this.pb_Chat1);
      object.setPosition(this.chatMessagePosition[1][0] - 50, this.chatMessagePosition[1][1] + this.chatMessageArray.length * -160);
    } else if (userId == 10) {
      object = cc.instantiate(this.pb_Chat0);
      object.setPosition(this.chatMessagePosition[0][0] + 65, this.chatMessagePosition[0][1] + this.chatMessageArray.length * -160);
    }

    if (object) {
      object.getChildByName("lb_Chat").width = object.getChildByName("lb_Chat").width + 10;
      object.getChildByName("lb_Chat").height = object.getChildByName("lb_Chat").height + 10;
      Helper.loadHead(userId == 10 ? 99 : this.playerInfo.playerHeadId, function (texture) {
        object.getChildByName("sp").getChildByName("sp_Head").getComponent(cc.Sprite).spriteFrame = texture;
      });
      object.getChildByName("lb_Name").getComponent("cc.Label").string = nickname;
      object.getChildByName("lb_Chat").getComponent("cc.Label").string = message;
      this.chatMessageArray.push(object);
      view.addChild(object);
      object.getChildByName("sp_ChatFrame").width = object.getChildByName("lb_Chat").width + 20;
      object.getChildByName("sp_ChatFrame").height = object.getChildByName("lb_Chat").height + 20;
      this.updateCustomerServiceMessageContent_Function(view);
    }
  },

  /**
   * 将聊天数据写入缓存
   * @param {*} userId 
   * @param {*} nickname 
   * @param {*} message 
   */
  writeChat_Function: function writeChat_Function(userId, nickname, message) {
    if (typeof this.chatData == "undefined") {
      this.chatData = this.playerInfo.readData_Function("chatData" + this.playerInfo.playerId);
    }

    var data = {
      userId: userId,
      nickname: nickname,
      message: message
    };

    if (!this.chatData) {
      this.chatData = new Array();
    }

    this.chatData.push(data);

    if (this.chatData.length > 30) {
      this.chatData.shift();
    }

    this.playerInfo.writeData_Function("chatData" + this.playerInfo.playerId, this.chatData);
  },

  /**
   * 读取缓存中的聊天记录
   */
  readChat_Function: function readChat_Function() {// this.chatData = null;
    // this.chatData = this.playerInfo.readData_Function("chatData" + this.playerInfo.playerId);
    // if (this.chatData != null) {
    //     for (var i = 0; i < this.chatData.length; i++) {
    //         this.setChat_Function(this.chatData[i].userId, this.chatData[i].nickname, this.chatData[i].message);
    //     }
    // }
  },

  /**
   * 
   * @param {*} node 
   */
  updateCustomerServiceMessageContent_Function: function updateCustomerServiceMessageContent_Function(node) {
    node.height = 160 * this.chatMessageArray.length + 30;
    this.com_CustomerService.getChildByName("sv_View").getComponent("cc.ScrollView").scrollToBottom(.5);
  },

  /**
   * 
   */
  setSystemMessage_Function: function setSystemMessage_Function() {
    if (this.systemMessageArray) {
      this.systemMessageArray = [];
    } else {
      this.systemMessageArray = new Array(0);
    }

    this.com_SystemMessage.getChildByName("vi_View").removeAllChildren();
    this.systemMessageSign = 0;
    var node = new cc.Node();
    node.addComponent("cc.Label");
    node.anchorX = 0;
    node.anchorY = .5;
    node.getComponent("cc.Label").overflow = 0;
    node.getComponent("cc.Label").string = "本程序仅供演示严禁赌博";
    node.getComponent("cc.Label").fontSize = 26;
    node.getComponent("cc.Label").lineHeight = 28;
    node.setPosition(this.com_SystemMessage.getChildByName("vi_View").width / 2, 0);
    this.systemMessageArray.push(node);
    this.com_SystemMessage.getChildByName("vi_View").addChild(node);
    this.moveSystemMessage_Function();
  },

  /**
   * 
   */
  moveSystemMessage_Function: function moveSystemMessage_Function() {
    if (this.systemMessageArray.length > 0) {
      var movePoint = cc.moveBy(8, -this.systemMessageArray[this.systemMessageSign].width - this.com_SystemMessage.getChildByName("vi_View").width, 0);
      var delayTime = cc.delayTime(2);
      var action = cc.sequence(movePoint, delayTime, cc.callFunc(function () {
        if (this.systemMessageArray.length > 5) {
          for (var i = 0; i < this.systemMessageArray.length - 5; i++) {
            this.com_SystemMessage.getChildByName("vi_View").children[i].destroy();
          }

          this.systemMessageArray.splice(0, this.systemMessageArray.length - 5);
          this.systemMessageSign = this.systemMessageArray.length - 1;
        } else if (this.systemMessageSign < this.systemMessageArray.length - 1) {
          this.systemMessageSign++;
        } else {
          this.systemMessageSign = 0;
        }

        this.moveSystemMessage_Function();
      }, this));
      this.systemMessageArray[this.systemMessageSign].setPosition(this.com_SystemMessage.getChildByName("vi_View").width / 2, 0), this.systemMessageArray[this.systemMessageSign].runAction(action);
    }
  },

  /**
   * 
   * @param {*} msg 
   */
  updateSystemMessage_Function: function updateSystemMessage_Function(msg) {
    if (!this.systemMessageArray) return;
    var node = new cc.Node();
    node.addComponent("cc.Label");
    node.anchorX = 0;
    node.anchorY = .5;
    node.getComponent("cc.Label").overflow = 0;
    node.getComponent("cc.Label").string = msg;
    node.getComponent("cc.Label").fontSize = 26;
    node.getComponent("cc.Label").lineHeight = 28;
    node.setPosition(this.com_SystemMessage.getChildByName("vi_View").width / 2, 0);
    this.systemMessageArray.push(node);
    this.com_SystemMessage.getChildByName("vi_View").addChild(node);
  },

  /**
   * 点击游戏按钮
   * @param {*} index 
   */
  gameMenuButtonClick_Function: function gameMenuButtonClick_Function(index) {
    this.com_Button.getChildByName("bt_GameMenuBack").active = true;
    this.com_Button.getChildByName("bt_Mail").active = true;
    this.com_Button.getChildByName("bt_Setting").active = true; //隐藏子节点下的全部按钮

    for (var i = 0; i < this.node.getComponent("LobbyMenu").com_GameMenu.children.length; i++) {
      this.node.getComponent("LobbyMenu").com_GameMenu.children[i].active = false;
    }

    this.node.getComponent("LobbyMenu").com_GameMenu.getChildByName(index).active = true;
    this.com_BG.getChildByName("roomselectbg").active = true;
    this.com_BG.getChildByName("bg").active = false;
  },

  /**
   * 点击返回按钮
   */
  gameMenuBackButtonClick_Function: function gameMenuBackButtonClick_Function() {
    this.com_Button.getChildByName("bt_GameMenuBack").active = false;
    this.com_Button.getChildByName("bt_Mail").active = true;
    this.com_Button.getChildByName("bt_Setting").active = true; //隐藏子节点下的全部按钮

    for (var i = 0; i < this.node.getComponent("LobbyMenu").com_GameMenu.children.length; i++) {
      this.node.getComponent("LobbyMenu").com_GameMenu.children[i].active = false;
    }

    var menuList = this.node.getComponent("LobbyMenu").com_GameMenu.getChildByName("Game_iconlist"); //显示游戏按钮列表

    menuList.active = true;
    this.com_BG.getChildByName("roomselectbg").active = false;
    this.com_BG.getChildByName("bg").active = true;
  },

  /**
   * 点击设置按钮
   * @param {*} self 
   * @param {*} type 
   */
  settingControlButtonClick_Function: function settingControlButtonClick_Function(self, type) {
    var movePoint, action;

    switch (type) {
      case 0:
        if (this.playerInfo.musicControl) {
          movePoint = cc.moveBy(.1, -120, 0);
          action = cc.sequence(movePoint, cc.callFunc(function () {
            this.playerInfo.musicControl = 0;
            self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0];
            this.writeUserSettingDate_Function();
          }, this));
          cc.audioEngine.stop(this.bgmNumber);
        } else {
          movePoint = cc.moveBy(.1, 120, 0);
          action = cc.sequence(movePoint, cc.callFunc(function () {
            this.playerInfo.musicControl = 1;
            self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1];
            this.writeUserSettingDate_Function();
          }, this));
          this.bgmNumber = cc.audioEngine.play(this.au_LobbyBGM, true, 1);
        }

        break;

      case 1:
        if (this.playerInfo.soundEffectControl) {
          movePoint = cc.moveBy(.1, -120, 0);
          action = cc.sequence(movePoint, cc.callFunc(function () {
            this.playerInfo.soundEffectControl = 0;
            self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0];
            this.writeUserSettingDate_Function();
          }, this));
        } else {
          movePoint = cc.moveBy(.1, 120, 0);
          action = cc.sequence(movePoint, cc.callFunc(function () {
            this.playerInfo.soundEffectControl = 1;
            self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1];
            this.writeUserSettingDate_Function();
          }, this));
        }

        break;
    }

    self.getChildByName("sp_Control").runAction(action);
  },

  /**
   * 将设置数据写入缓存数据
   */
  writeUserSettingDate_Function: function writeUserSettingDate_Function() {
    var data = {
      musicControl: this.playerInfo.musicControl,
      soundEffectControl: this.playerInfo.soundEffectControl
    };
    this.playerInfo.writeData_Function("userSetting", data);
  },

  /**
   * 断开连接
   */
  checkNetWorkConnected_Function: function checkNetWorkConnected_Function() {
    return this.disconneted;
  },

  /**
   * 中断socket服务器
   * @param {*} msg 
   */
  netWorkDisconneted_Function: function netWorkDisconneted_Function(msg) {
    if (this.com_Tips == null) {
      return;
    }

    this.showMessagebox_Function(msg, 0, 4);
    this.disconneted = true;

    if (cc.sys.isNative || this.netWork.socket !== null) {
      this.netWork.socket.close();
    }

    this.netWork.socket = null;
  },

  /**
   * 重新连接
   */
  reconntetedGame_Function: function reconntetedGame_Function() {
    cc.audioEngine.stopAll();

    switch (this.playerInfo.isAutoLogin) {
      case 0:
        this.com_MessageBox.active = false;
        break;

      case 1:
        var account = this.node.getComponent("LobbyRegister").account;
        var password = this.node.getComponent("LobbyRegister").password;

        if (this.netWork.socket !== null) {
          if (!cc.sys.isNative) {
            this.netWork.socket.close();
          }

          for (var socket in this.netWork.socket.$events) {
            if (socket !== 0) {
              this.netWork.socket.removeListen(socket);
            }
          }

          this.netWork.socket = null;
          this.netWork.connected = false;
        }

        this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "正在重新连接";
        this.netWork.loginAccount_Function(this.playerInfo.loginIp, account, password);
        break;

      case 2:
        this.netWork.accountChange = true;
        this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "正在重新连接";
        this.netWork.loginAccount_Function(this.playerInfo.loginIp, null, null, this.playerInfo.loginCode);
        break;
    }
  },

  /**
   * 检测更新
   * @param {*} gameName 
   */
  checkUpdate_Function: function checkUpdate_Function(gameName) {
    if (gameName !== "") {
      this.checkUpdateGameName = gameName;
    } else if (this.checkUpdateGameName === "") {
      return;
    }

    this.bg_Black.active = true;
    this.node.getComponent("GameUpdate").checkGameUpdate_Function(this.checkUpdateGameName);
    this.checkUpdateTimeOut = true;
  },

  /**
   * 显示提示框
   * @param {*} msg 
   * @param {*} type 
   * @param {*} operationType 
   */
  messageBoxCallBack_Function: function messageBoxCallBack_Function(msg, type, operationType) {
    switch (type) {
      case 0:
        this.com_MessageBox_CB.getChildByName("bt_Confirm").setPosition(0, -130);
        this.com_MessageBox_CB.getChildByName("bt_Cancel").active = false;
        break;

      case 1:
        this.com_MessageBox_CB.getChildByName("bt_Confirm").setPosition(-120, -130);
        this.com_MessageBox_CB.getChildByName("bt_Cancel").active = true;
        break;
    }

    this.com_MessageBox_CB.active = true, this.com_MessageBox_CB.getChildByName("lb_Tips").getComponent("cc.Label").string = msg, this.operationType = operationType;
  },

  /**
   * 显示提示信息
   * @param {*} msg 
   * @param {*} type 
   * @param {*} operationType 
   */
  showMessagebox_Function: function showMessagebox_Function(msg, type, operationType) {
    this.node.getChildByName('Loading').active = false; //隐藏加载界面

    this.bg_Black.active = true;

    for (var i = 3; i < this.com_MessageBox.children.length; i++) {
      this.com_MessageBox.children[i].active = false;
    }

    this.com_MessageBox.active = true;
    this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = msg;

    switch (type) {
      case 0:
        this.com_MessageBox.getChildByName("bt_Reconnet").active = true;
        this.com_MessageBox.getChildByName("bt_Reconnet").setPosition(0, -130);
        break;

      case 1:
        this.com_MessageBox.getChildByName("bt_Confirm").active = true;
        this.com_MessageBox.getChildByName("bt_Confirm").setPosition(0, -130);
        break;

      case 2:
        this.com_MessageBox.getChildByName("bt_Cancel").active = true;
        this.com_MessageBox.getChildByName("bt_Cancel").setPosition(-130, -130);
        this.com_MessageBox.getChildByName("bt_Confirm").active = true;
        this.com_MessageBox.getChildByName("bt_Confirm").setPosition(130, -130);
        break;

      case 3:
        this.com_MessageBox.getChildByName("bt_Cancel").active = true;
        this.com_MessageBox.getChildByName("bt_Cancel").setPosition(-130, -130);
        this.com_MessageBox.getChildByName("bt_GoToMall").active = true;
        this.com_MessageBox.getChildByName("bt_GoToMall").setPosition(130, -130);
        break;

      case 4:
        this.com_MessageBox.getChildByName("sp_Award0").active = true;
        this.com_MessageBox.getChildByName("sp_Award0").setPosition(0, -20);
        this.com_MessageBox.getChildByName("db_Award0").active = true;
        this.com_MessageBox.getChildByName("db_Award0").setPosition(0, -20);
        var db_Award0 = this.com_MessageBox.getChildByName("db_Award0").getComponent("dragonBones.ArmatureDisplay");
        db_Award0.playAnimation("db_Award", 1);
        this.com_MessageBox.getChildByName("bt_Confirm").active = true;
        this.com_MessageBox.getChildByName("bt_Confirm").setPosition(0, -130);
        break;

      case 5:
        this.com_MessageBox.getChildByName("sp_Award1").active = true;
        this.com_MessageBox.getChildByName("sp_Award1").setPosition(0, -20);
        this.com_MessageBox.getChildByName("db_Award1").active = true;
        this.com_MessageBox.getChildByName("db_Award1").setPosition(0, -20);
        var db_Award1 = this.com_MessageBox.getChildByName("db_Award1").getComponent("dragonBones.ArmatureDisplay");
        db_Award1.playAnimation("db_Award", 1);
        this.com_MessageBox.getChildByName("bt_Confirm").active = true;
        this.com_MessageBox.getChildByName("bt_Confirm").setPosition(0, -130);
        break;

      case 6:
        this.com_MessageBox.getChildByName("sp_Award0").active = true;
        this.com_MessageBox.getChildByName("sp_Award0").setPosition(-80, -20);
        this.com_MessageBox.getChildByName("sp_Award1").active = true;
        this.com_MessageBox.getChildByName("sp_Award1").setPosition(80, -20);
        this.com_MessageBox.getChildByName("db_Award0").active = true;
        this.com_MessageBox.getChildByName("db_Award1").active = true;
        this.com_MessageBox.getChildByName("db_Award0").setPosition(-80, -20);
        this.com_MessageBox.getChildByName("db_Award1").setPosition(80, -20);
        var award0 = this.com_MessageBox.getChildByName("db_Award0").getComponent("dragonBones.ArmatureDisplay");
        var award1 = this.com_MessageBox.getChildByName("db_Award1").getComponent("dragonBones.ArmatureDisplay");
        award0.playAnimation("db_Award", 1);
        award1.playAnimation("db_Award", 1);
        this.com_MessageBox.getChildByName("bt_Confirm").active = true;
        this.com_MessageBox.getChildByName("bt_Confirm").setPosition(0, -130);
        break;
    }

    this.messageBoxOperationType = operationType;
  },

  /**
   * 获得范围随机数
   * @param {*} min 
   * @param {*} max 
   */
  getRandom_Function: function getRandom_Function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  /**
   * 更新
   * @param {*} dt 
   */
  update: function update(dt) {
    if (this.checkUpdateTimeOut) {
      if (this.checkUpdateTime > 0) {
        this.checkUpdateTime -= dt;
        this.checkUpdateTimeLabel = parseInt(this.checkUpdateTime);
      } else {
        this.checkUpdateTimeOut = false;
      }
    }

    if (this.codeTimeCount) {
      if (this.getCodeTime > 0) {
        this.getCodeTime -= dt;
        this.com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("bt_GetCode").getChildByName("lb_Time").getComponent("cc.Label").string = parseInt(this.getCodeTime) + "s";
      } else {
        this.com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("bt_GetCode").getChildByName("lb_Time").getComponent("cc.Label").string = "";
        this.com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("bt_GetCode").getComponent("cc.Button").interactable = true;
      }
    }

    if (this.tempNetWork && this.tempNetWork.eventOn) {
      switch (this.playerInfo.gameName) {
        case "Fish":
          this.tempNetWork.fishSocket.disconnect();
          this.tempNetWork.fishSocket = null;
          break;

        case "Bde":
          this.tempNetWork.bdeGameSocket.disconnect();
          this.tempNetWork.bdeGameSocket = null;
          break;

        case "GrabBull":
          this.tempNetWork.grabBullSocket.disconnect();
          this.tempNetWork.grabBullSocket = null;
          break;

        case "TwoEight":
          this.tempNetWork.twoEightGameSocket.disconnect();
          this.tempNetWork.twoEightGameSocket = null;
          break;

        case "Bull":
          this.tempNetWork.bullSocket.disconnect();
          this.tempNetWork.bullSocket = null;
          break;

        case "LineGame":
          this.tempNetWork.lineGameGameSocket.disconnect();
          this.tempNetWork.lineGameGameSocket = null;
          break;

        case "Land":
          break;

        case "hongbao":
          this.tempNetWork.gameSocket.disconnect();
          this.tempNetWork.gameSocket = null;
          break;

        case "Fishhaiwang2":
          this.tempNetWork.fishhaiwang2Socket.disconnect();
          this.tempNetWork.fishhaiwang2Socket = null;
          break;
      }

      this.tempNetWork.eventOn = false;
      this.tempNetWork = null;
      this.playerInfo.gameName = "Lobby";
    }
  },
  setPoxyUI: function setPoxyUI(result) {
    var _this3 = this;

    var data = result.data;
    console.log('poxy:', data);

    if (!!result.status && result.status == 1) {
      this.poxyUI.active = true;
      this.changePoxyPage(1);
      this.poxyUI.getChildByName('dl_a').getChildByName('renshu').getComponent(cc.Label).string = data.numA;
      this.poxyUI.getChildByName('dl_b').getChildByName('renshu').getComponent(cc.Label).string = data.numB;
      this.poxyUI.getChildByName('dl_c').getChildByName('renshu').getComponent(cc.Label).string = data.numC;
      this.poxyUI.getChildByName('zongshouyi').getChildByName('shuzi').getComponent(cc.Label).string = data.AllYongJin;
      this.poxyUI.getChildByName('benzhoushishi').getChildByName('shuzi').getComponent(cc.Label).string = data.nowIncome;
      var view = this.poxyUI.getChildByName('com_symx').getChildByName('list_view').getChildByName('view').getChildByName('content');
      view.removeAllChildren();
      var time = data.timeDiff;
      this.poxyTime(time);
      this.interval_poxy = setInterval(function () {
        time--;
        time >= 0 && _this3.poxyTime(time);
      }, 1000);
      var stack = new Array();

      if (!!data.person.a) {
        for (var i in data.person.a) {
          stack.push({
            grade: 'A',
            data: data.person.a[i],
            name: i
          });
        }
      }

      if (!!data.person.b) {
        for (var _i3 in data.person.b) {
          stack.push({
            grade: 'B',
            data: data.person.b[_i3],
            name: _i3
          });
        }
      }

      if (!!data.person.c) {
        for (var _i4 in data.person.c) {
          stack.push({
            grade: 'C',
            data: data.person.c[_i4],
            name: _i4
          });
        }
      }

      for (var _i5 in stack) {
        var lt = cc.instantiate(this.poxyPb);
        view.addChild(lt);
        var ch = lt.getChildByName('id').children;

        for (var j in ch) {
          ch[j].active = ch[j]._name == stack[_i5].grade;
        }

        var red = new cc.Color(255, 0, 0, 255);
        var green = new cc.Color(109, 148, 48, 255);
        lt.getChildByName('id').getComponent(cc.Label).string = stack[_i5].name;
        lt.getChildByName('dqks').getComponent(cc.Label).string = stack[_i5].data[0];
        lt.getChildByName('dqks').color = stack[_i5].data[0] >= 0 ? green : red;
        lt.getChildByName('zks').getComponent(cc.Label).string = stack[_i5].data[1];
        lt.getChildByName('zks').color = stack[_i5].data[1] >= 0 ? green : red;
        lt.getChildByName('sssy').getComponent(cc.Label).string = stack[_i5].data[2];
        lt.getChildByName('sssy').color = stack[_i5].data[2] >= 0 ? green : red;
        lt.getChildByName('sssy1').getComponent(cc.Label).string = stack[_i5].data[3];
        lt.getChildByName('sssy1').color = stack[_i5].data[3] >= 0 ? green : red;
      }
    } else if (!!result.status && result.status == 2) {
      this.showMessagebox_Function("非代理人员无法查看", 1, 4);
    }
  },
  poxyTime: function poxyTime(time) {
    var day = parseInt(time / 86400);
    var hour = parseInt(time / 3600 % 24);
    var min = parseInt(time / 60 % 60);
    var sec = parseInt(time % 60);
    var timeLbl = this.poxyUI.getChildByName('bg').getChildByName('time').getComponent(cc.Label);
    timeLbl.string = "\u8DDD\u79BB\u7ED3\u7B97\u8FD8\u6709" + day + "\u5929" + hour + "\u5C0F\u65F6" + min + "\u5206\u949F" + sec + "\u79D2";
  },
  changePoxyPage: function changePoxyPage(page) {
    if (page == 1) {
      this.poxyUI.getChildByName('btn_symx').getComponent(cc.Button).interactable = false;
      this.poxyUI.getChildByName('btn_tgjc').getComponent(cc.Button).interactable = true;
      this.poxyUI.getChildByName('com_symx').active = true;
      this.poxyUI.getChildByName('com_tgjc').active = false;
    } else if (page == 2) {
      this.poxyUI.getChildByName('btn_symx').getComponent(cc.Button).interactable = true;
      this.poxyUI.getChildByName('btn_tgjc').getComponent(cc.Button).interactable = false;
      this.poxyUI.getChildByName('com_symx').active = false;
      this.poxyUI.getChildByName('com_tgjc').active = true;
    }
  },
  closePoxyUI: function closePoxyUI() {
    clearInterval(this.interval_poxy);
    this.poxyUI.active = false;
  },
  changeMallUI: function changeMallUI(id) {
    var _this4 = this;

    this.com_Mall.getChildByName('com_chongzhi_01').active = id == 0;
    this.com_Mall.getChildByName('com_kefulist').active = id == 1;
    this.com_Mall.getChildByName('com_CustomerService').active = id == 2;
    this.com_Mall.getChildByName('btn_kefuzhichong').getComponent(cc.Button).interactable = id == 0;
    this.com_Mall.getChildByName('btn_xianshang').getComponent(cc.Button).interactable = id != 0;

    if (id == 1) {
      Helper.http('http://game.bullsts.com/index.php/api/kefu/lists').then(function (e) {
        console.log('得到服务器信息' + JSON.stringify(e));

        if (!!e.code) {
          var pb = _this4.com_Mall.getChildByName('customServerPb');

          var pr = _this4.com_Mall.getChildByName('com_kefulist').getChildByName('scrollview').getChildByName('view').getChildByName('content');

          pr.removeAllChildren();

          for (var i in e.data) {
            var p = cc.instantiate(pb);
            p.getChildByName('kefu_name').getComponent(cc.Label).string = e.data[i].name;
            p.getChildByName('btn_shop_recharge1_0').getComponent(cc.Button).clickEvents[0].customEventData = JSON.stringify(e.data[i]);
            p.active = true;
            pr.addChild(p);
          }
        }
      });
    } else if (id == 2) {
      var view = this.com_CustomerService.getChildByName("sv_View").getComponent("cc.ScrollView").content;
      this.chatMessageArray = [];
      view.removeAllChildren();
    }
  },
  //显示vip界面
  show_vip: function show_vip() {
    var date = new Date(new Date().setHours(0, 0, 0, 0)).getTime();

    if (date == this.playerInfo.readData_Function("todayTime")) {
      this.com_vip.active = false;
    } else {
      this.com_vip.active = true;
      this.playerInfo.writeData_Function("todayTime", date);
    }
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcTG9iYnlNYWluLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGJfQ2hhdDAiLCJ0eXBlIiwiUHJlZmFiIiwicGJfQ2hhdDEiLCJwYl9FZGl0Q2FyZEluZm8iLCJwYl9NYWlsU2VsZWN0IiwiY29tX0JHIiwiTm9kZSIsImNvbV9QbGF5ZXJNZXNzYWdlIiwiY29tX0J1dHRvbiIsImNvbV9TeXN0ZW1NZXNzYWdlIiwiY29tX01hbGwiLCJjb21fQ3VzdG9tZXJTZXJ2aWNlIiwiY29tX01haWwiLCJjb21fUGxheWVySW5mbyIsImNvbV9Mb2dpbiIsImNvbV9SZWdpc3RlciIsImNvbV9UaXBzIiwiY29tX1NldHRpbmciLCJjb21fTWVzc2FnZUJveCIsImJnX0JsYWNrIiwiYXVfTG9iYnlCR00iLCJBdWRpb0NsaXAiLCJzcF9PbkFuZE9mZiIsIlNwcml0ZUZyYW1lIiwicG94eVVJIiwicG94eVBiIiwiY29tX1F1ZXN0IiwiY29tX3JhbmsiLCJjb21fYWN0aXZpdHkiLCJjb21fdmlwIiwiaGlzdG9yeUl0ZW1QYiIsImhlYWRCZ1NwIiwiYWRWaWV3IiwiY29tX2JhbmsiLCJvbkxvYWQiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInN0cmluZyIsIndpbmRvdyIsImdhbWVfdmVyIiwicmVuZGVyVHlwZSIsImdhbWUiLCJSRU5ERVJfVFlQRV9DQU5WQVMiLCJyZW5kZXJlciIsImVuYWJsZURpcnR5UmVnaW9uIiwic2VsZiIsInZpZXciLCJzZXRSZXNpemVDYWxsYmFjayIsInVpUmVzaXplX0Z1bmN0aW9uIiwib24iLCJyZXQiLCJkaXNjb25uZXRlZCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsInNldEdhbWVPYmpfRnVuY3Rpb24iLCJqYWNrcG90X3NjcmlwdCIsImFjdGl2ZSIsImxvYWRlciIsImxvYWRSZXMiLCJlcnJvciIsImpzb24iLCJpc0JpbmRBbGkiLCJpc0JpbmRDcmVkaXRDYXJkIiwiaXNCaW5kUGhvbmUiLCJpc1dpdGhkcmF3IiwiaXNXaXRoZHJhd1Bob25lQ2FyZCIsInNoYXJlVXJsIiwiaXNBdXRvTG9naW4iLCJwYXlTZWxlY3QiLCJuZXRXb3JrIiwibmV0V29ya0luaXRfRnVuY3Rpb24iLCJiaW5kIiwibmV0V29ya1RpbWVDb3VudCIsInRlbXBOZXRXb3JrIiwibWQ1Iiwid29yZEZpbHRlciIsInN5cyIsImlzTmF0aXZlIiwicGxhdGZvcm1fd3giLCJmaW5kIiwiZmlyc3RDb21lSW4iLCJIZWxwZXIiLCJodHRwIiwidGhlbiIsImUiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsImFyciIsImkiLCJwdXNoIiwibGVuZ3RoIiwiYWROZCIsIm5ld0FkTmQiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIlBhZ2VWaWV3IiwiYWRkUGFnZSIsInNwciIsImNoaWxkcmVuIiwibG9hZEhlYWQiLCJzcCIsInNwcml0ZUZyYW1lIiwibG9iYnlJbml0X0Z1bmN0aW9uIiwibG9hZEdhbWVTY2VuZSIsIm1hbGxJbml0X0Z1bmN0aW9uIiwic2V0U3lzdGVtTWVzc2FnZV9GdW5jdGlvbiIsImVudGVyUm9vbSIsImNoZWNrVXBkYXRlVGltZU91dCIsImNoZWNrVXBkYXRlR2FtZU5hbWUiLCJjaGVja1VwZGF0ZVRpbWUiLCJjaGVja1VwZGF0ZVRpbWVMYWJlbCIsImhlYXJ0QmVhdFRpbWUiLCJoZWFydEJlYXRUaW1lT3V0IiwiaGVhcnRCZWF0RW1pdENvbnRyb2wiLCJjaGF0QXJyYXkiLCJjaGF0TWVzc2FnZUFycmF5IiwiQXJyYXkiLCJjaGF0TWVzc2FnZVBvc2l0aW9uIiwiYmFua1NlbGVjdCIsImVkaXRDYXJkSWQiLCJzZXR0aW5nSW5pdF9GdW5jdGlvbiIsImlzQnJvd3NlciIsImNvZGVUaW1lQ291bnQiLCJnZXRDb2RlVGltZSIsImNoZWNrSWRSZXN1bHQiLCJtZXNzYWdlQm94VHlwZSIsIkhlYWRJbml0X0Z1bmN0aW9uIiwic29ja2V0IiwiZW1pdCIsInNob3dfdmlwIiwic3Bfc2V0dGluZ0NvbnRyb2wiLCJhdWRpb0VuZ2luZSIsInN0b3BBbGwiLCJtdXNpY0NvbnRyb2wiLCJyZWFkRGF0YV9GdW5jdGlvbiIsInNvdW5kRWZmZWN0Q29udHJvbCIsIndyaXRlRGF0YV9GdW5jdGlvbiIsImlzVm9pY2UiLCJtdXNpY2NvbnRyb2wiLCJiZ21OdW1iZXIiLCJwbGF5Iiwic2V0UG9zaXRpb24iLCJvcyIsIk9TX0FORFJPSUQiLCJwbGF5ZXJJbmZvTWVudUluaXRfRnVuY3Rpb24iLCJpc09mZmljYWwiLCJpbnRlcmFjdGFibGUiLCJhY2NvdW50IiwicGxheWVySWQiLCJhbGlBY2NvdW50IiwiZW5jcnlwdEFsaUFjY291bnQiLCJlbmNyeXB0U3RyaW5nX0Z1bmN0aW9uIiwiZW5jcnlwdEFsaU5hbWUiLCJhbGlOYW1lIiwicGxheWVyQ29pbiIsImJhbmtJZEluaXRfRnVuY3Rpb24iLCJyZWFkQ2hhdF9GdW5jdGlvbiIsInQiLCJuIiwibyIsImEiLCJzdWJzdHJpbmciLCJyZWNoYXJnZU1vbmV5QXJyYXkiLCJyZWNoYXJnZUlkIiwicGxheWVySGVhZElkIiwiY3VzdG9tZXJTZXJ2aWNlTWVzc2FnZUluaXRfRnVuY3Rpb24iLCJjb250ZW50IiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJtYWlsSW5pdF9GdW5jdGlvbiIsIm1haWxMaXN0IiwiYWRkQ2hpbGQiLCJjYW52YXNOb2RlIiwiYnV0dG9uSUQiLCJtYWlsSUQiLCJpZCIsImhlaWdodCIsImdldE1haWxJbmZvX0Z1bmN0aW9uIiwibWFpbENsaWNrIiwicmFua2lkeCIsIm5pY2tOYW1lIiwic2VuZENvaW5Vc2VySWQiLCJwcm9wQ291bnQiLCJwcm9wSWQiLCJ3aW5TY29yZSIsImV4Y2hhbmdlUmF0ZSIsInRvRml4ZWQiLCJnZXRNYWlsX0Z1bmN0aW9uIiwiYWRkTWFpbF9GdW5jdGlvbiIsImRhdGEiLCJzdl9NYWlsIiwibWFpbE9iamVjdCIsInVwZGF0ZU1haWxDb250ZW50X0Z1bmN0aW9uIiwiZGVzdHJveU1haWxfRnVuY3Rpb24iLCJzcGxpY2UiLCJyZW1vdmVDaGlsZCIsInNjcm9sbFRvVG9wIiwiY2hpbGRyZW5Db3VudCIsImJhbmtJZCIsImJhbmtJbmZvSW5pdF9GdW5jdGlvbiIsImNyZWRpdENhcmRPYmoiLCJiYW5rTGlzdCIsImJhbmtOYW1lTGlzdCIsImNhcmRJZCIsImFkZENyZWRpdENhcmRfRnVuY3Rpb24iLCJtc2ciLCJpbmZvIiwic2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24iLCJlZGl0Q3JlZGl0Q2FyZF9GdW5jdGlvbiIsIm5hbWUiLCJiYW5rVHlwZSIsImRlbGV0ZUNyZWRpdENhcmRfRnVuY3Rpb24iLCJ1cGRhdGVCYW5rTGlzdF9GdW5jdGlvbiIsImNvbnRlbnRHYW1lU2VydmVyRmFpbF9GdW5jdGlvbiIsImdhbWVOYW1lIiwiZXJyb3JNc2ciLCJsb2dpbkdhbWVSb29tX0Z1bmN0aW9uIiwiZ2FtZU9iaiIsImVudHJ5Q29pbiIsImdhbWVJcCIsImlwIiwiZ2FtZVByb3QiLCJwcm90Iiwic2V0TG9iYnlNYWluT2JqX0Z1bmN0aW9uIiwibG9naW5HYW1lX0Z1bmN0aW9uIiwiZ2FtZVNpZ24iLCJjaGVja0xpbmtUaW1lT3V0IiwibGlua1RpbWUiLCJnYW1lUmVjb25uZWN0X0Z1bmN0aW9uIiwibG9naW5JUCIsIm5ldFdvcmQiLCJwYXlfRnVuY3Rpb24iLCJtb25leSIsIm5vZGVJRCIsInVybCIsIm9wZW5VUkwiLCJ3ZWJub2RlIiwid2ViIiwiV2ViVmlldyIsInJlY2hhcmdlTW9uZXkiLCJjdXN0b21lclNlcnZpY2VTZW5kTWVzc2FnZV9GdW5jdGlvbiIsInVzZXJJZCIsIm5pY2tuYW1lIiwic2V0Q2hhdF9GdW5jdGlvbiIsIm1lc3NhZ2UiLCJvYmplY3QiLCJ3aWR0aCIsInRleHR1cmUiLCJTcHJpdGUiLCJ1cGRhdGVDdXN0b21lclNlcnZpY2VNZXNzYWdlQ29udGVudF9GdW5jdGlvbiIsIndyaXRlQ2hhdF9GdW5jdGlvbiIsImNoYXREYXRhIiwic2hpZnQiLCJzY3JvbGxUb0JvdHRvbSIsInN5c3RlbU1lc3NhZ2VBcnJheSIsInN5c3RlbU1lc3NhZ2VTaWduIiwiYWRkQ29tcG9uZW50IiwiYW5jaG9yWCIsImFuY2hvclkiLCJvdmVyZmxvdyIsImZvbnRTaXplIiwibGluZUhlaWdodCIsIm1vdmVTeXN0ZW1NZXNzYWdlX0Z1bmN0aW9uIiwibW92ZVBvaW50IiwibW92ZUJ5IiwiZGVsYXlUaW1lIiwiYWN0aW9uIiwic2VxdWVuY2UiLCJjYWxsRnVuYyIsImRlc3Ryb3kiLCJydW5BY3Rpb24iLCJ1cGRhdGVTeXN0ZW1NZXNzYWdlX0Z1bmN0aW9uIiwiZ2FtZU1lbnVCdXR0b25DbGlja19GdW5jdGlvbiIsImluZGV4IiwiY29tX0dhbWVNZW51IiwiZ2FtZU1lbnVCYWNrQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJtZW51TGlzdCIsInNldHRpbmdDb250cm9sQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJ3cml0ZVVzZXJTZXR0aW5nRGF0ZV9GdW5jdGlvbiIsInN0b3AiLCJjaGVja05ldFdvcmtDb25uZWN0ZWRfRnVuY3Rpb24iLCJuZXRXb3JrRGlzY29ubmV0ZWRfRnVuY3Rpb24iLCJjbG9zZSIsInJlY29ubnRldGVkR2FtZV9GdW5jdGlvbiIsInBhc3N3b3JkIiwiJGV2ZW50cyIsInJlbW92ZUxpc3RlbiIsImNvbm5lY3RlZCIsImxvZ2luQWNjb3VudF9GdW5jdGlvbiIsImxvZ2luSXAiLCJhY2NvdW50Q2hhbmdlIiwibG9naW5Db2RlIiwiY2hlY2tVcGRhdGVfRnVuY3Rpb24iLCJjaGVja0dhbWVVcGRhdGVfRnVuY3Rpb24iLCJtZXNzYWdlQm94Q2FsbEJhY2tfRnVuY3Rpb24iLCJvcGVyYXRpb25UeXBlIiwiY29tX01lc3NhZ2VCb3hfQ0IiLCJkYl9Bd2FyZDAiLCJwbGF5QW5pbWF0aW9uIiwiZGJfQXdhcmQxIiwiYXdhcmQwIiwiYXdhcmQxIiwibWVzc2FnZUJveE9wZXJhdGlvblR5cGUiLCJnZXRSYW5kb21fRnVuY3Rpb24iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ1cGRhdGUiLCJkdCIsInBhcnNlSW50IiwiZXZlbnRPbiIsImZpc2hTb2NrZXQiLCJkaXNjb25uZWN0IiwiYmRlR2FtZVNvY2tldCIsImdyYWJCdWxsU29ja2V0IiwidHdvRWlnaHRHYW1lU29ja2V0IiwiYnVsbFNvY2tldCIsImxpbmVHYW1lR2FtZVNvY2tldCIsImdhbWVTb2NrZXQiLCJmaXNoaGFpd2FuZzJTb2NrZXQiLCJzZXRQb3h5VUkiLCJyZXN1bHQiLCJzdGF0dXMiLCJjaGFuZ2VQb3h5UGFnZSIsIm51bUEiLCJudW1CIiwibnVtQyIsIkFsbFlvbmdKaW4iLCJub3dJbmNvbWUiLCJ0aW1lIiwidGltZURpZmYiLCJwb3h5VGltZSIsImludGVydmFsX3BveHkiLCJzZXRJbnRlcnZhbCIsInN0YWNrIiwicGVyc29uIiwiZ3JhZGUiLCJiIiwiYyIsImx0IiwiY2giLCJqIiwiX25hbWUiLCJyZWQiLCJDb2xvciIsImdyZWVuIiwiY29sb3IiLCJkYXkiLCJob3VyIiwic2VjIiwidGltZUxibCIsInBhZ2UiLCJCdXR0b24iLCJjbG9zZVBveHlVSSIsImNsZWFySW50ZXJ2YWwiLCJjaGFuZ2VNYWxsVUkiLCJjb2RlIiwicGIiLCJwciIsInAiLCJjbGlja0V2ZW50cyIsImN1c3RvbUV2ZW50RGF0YSIsImRhdGUiLCJEYXRlIiwic2V0SG91cnMiLCJnZXRUaW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsSUFESDtBQUVOQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGSCxLQURGO0FBS1JDLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTkYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkgsS0FMRjtBQVNSRSxJQUFB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O0FBQ0F4RSxNQUFBQSxJQUFJLENBQUM0SCxpQkFBTDtBQUNIO0FBQ0osR0FoMUNJO0FBaTFDTDtBQUNBdEMsRUFBQUEsUUFsMUNLLHNCQWsxQ007QUFDUCxRQUFJME8sSUFBSSxHQUFHLElBQUlDLElBQUosQ0FBUyxJQUFJQSxJQUFKLEdBQVdDLFFBQVgsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsQ0FBVCxFQUEwQ0MsT0FBMUMsRUFBWDs7QUFDQSxRQUFJSCxJQUFJLElBQUksS0FBSzFULFVBQUwsQ0FBZ0JxRixpQkFBaEIsQ0FBa0MsV0FBbEMsQ0FBWixFQUE0RDtBQUN4RCxXQUFLOUcsT0FBTCxDQUFhOEIsTUFBYixHQUFzQixLQUF0QjtBQUNILEtBRkQsTUFFTztBQUNILFdBQUs5QixPQUFMLENBQWE4QixNQUFiLEdBQXNCLElBQXRCO0FBQ0EsV0FBS0wsVUFBTCxDQUFnQnVGLGtCQUFoQixDQUFtQyxXQUFuQyxFQUFnRG1PLElBQWhEO0FBQ0g7QUFDSjtBQTExQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwYl9DaGF0MDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBiX0NoYXQxOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGJfRWRpdENhcmRJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGJfTWFpbFNlbGVjdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbV9CRzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21fUGxheWVyTWVzc2FnZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21fQnV0dG9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbV9TeXN0ZW1NZXNzYWdlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbV9NYWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbV9DdXN0b21lclNlcnZpY2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX01haWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX1BsYXllckluZm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tX0xvZ2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbV9SZWdpc3Rlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21fVGlwczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21fU2V0dGluZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21fTWVzc2FnZUJveDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZ19CbGFjazoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdV9Mb2JieUJHTToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwX09uQW5kT2ZmOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcG94eVVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBveHlQYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21fUXVlc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbV9yYW5rOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21fYWN0aXZpdHk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbV92aXA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpc3RvcnlJdGVtUGI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkQmdTcDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRWaWV3OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29tX2Jhbms6IGNjLk5vZGUsLy/pk7booYznlYzpnaJcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9jYy5zeXMuaXNOYXRpdmUgJiYgY2MuRGV2aWNlLnNldEtlZXBTY3JlZW5Pbih0cnVlKTtcclxuICAgICAgICAvL2NjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fTEFORFNDQVBFKTtcclxuICAgICAgICAvL+WFs+mXreiEj+efqeW9olxyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9WZXJzaW9uXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gd2luZG93LmdhbWVfdmVyO1xyXG5cclxuICAgICAgICBpZiAoY2MucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcclxuICAgICAgICAgICAgY2MucmVuZGVyZXIuZW5hYmxlRGlydHlSZWdpb24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY2Mudmlldy5zZXRSZXNpemVDYWxsYmFjayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYudWlSZXNpemVfRnVuY3Rpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJnX0JsYWNrLm9uKFwidG91Y2hzdGFydFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmRpc2Nvbm5ldGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8uc2V0R2FtZU9ial9GdW5jdGlvbih0aGlzKTtcclxuICAgICAgICB0aGlzLmphY2twb3Rfc2NyaXB0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdqYWNrcG90JykuZ2V0Q29tcG9uZW50KCdqYWNrcG90Jyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdMb2FkaW5nJykuYWN0aXZlID0gZmFsc2U7IC8v6buY6K6k6ZqQ6JeP5Yqg6L296aG16Z2iXHJcbiAgICAgICAgLy/liqDovb3phY3nva7mlofku7ZcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcygnQ29uZmlndXJhdGlvbi9Td2l0Y2hDb250cm9sJywgZnVuY3Rpb24gKGVycm9yLCByZXQpIHtcclxuICAgICAgICAgICAgcmV0ID0gcmV0Lmpzb247XHJcbiAgICAgICAgICAgIC8vIGNjLmxvYWRlci5sb2FkKFwicmVzL3Jhdy1hc3NldHMvVGV4dHVyZS9Db25maWd1cmF0aW9uL1N3aXRjaENvbnRyb2wuanNvblwiLCBmdW5jdGlvbiAoZXJyLCByZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmlzQmluZEFsaSA9IHJldC5pc0JpbmRBbGk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5pc0JpbmRDcmVkaXRDYXJkID0gcmV0LmlzQmluZENyZWRpdENhcmQ7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5pc0JpbmRQaG9uZSA9IHJldC5pc0JpbmRQaG9uZTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmlzV2l0aGRyYXcgPSByZXQuaXNXaXRoZHJhdztcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmlzV2l0aGRyYXdQaG9uZUNhcmQgPSByZXQuaXNXaXRoZHJhd1Bob25lQ2FyZDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLnNoYXJlVXJsID0gcmV0LnNoYXJlVXJsO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uaXNBdXRvTG9naW4gPSByZXQuaXNBdXRvTG9naW47XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5wYXlTZWxlY3QgPSByZXQucGF5U2VsZWN0O1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsgPSByZXF1aXJlKFwiTG9iYnlOZXRXb3JrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsubmV0V29ya0luaXRfRnVuY3Rpb24oKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubmV0V29ya1RpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy50ZW1wTmV0V29yayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tZDUgPSByZXF1aXJlKFwibWQ1XCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy53b3JkRmlsdGVyID0gcmVxdWlyZShcIldvcmRGaWx0ZXJcIikuZ2V0SW5zdGFudDtcclxuXHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSAmJiB3aW5kb3cucGxhdGZvcm1fd3gpIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2NvbV9Mb2dpbi93eF9kZW5nbHUnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBjYy5maW5kKCdDYW52YXMvY29tX0xvZ2luL2J0X0xvZ2luJykueSA9IC04MDtcclxuICAgICAgICAgICAgLy8gY2MuZmluZCgnQ2FudmFzL2NvbV9Mb2dpbi95amlhbl96aHVjZScpLnkgPSAtODA7XHJcbiAgICAgICAgICAgIC8vIGNjLmZpbmQoJ0NhbnZhcy9jb21fTG9naW4vYnRfUmVnaXN0ZXInKS55ID0gLTgwO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIHRoaXMuY29tX2Rhb2hhbmcuYWN0aXZlID0gISEhd2luZG93LmZpcnN0Q29tZUluO1xyXG4gICAgICAgIHdpbmRvdy5maXJzdENvbWVJbiA9IHRydWU7XHJcblxyXG4gICAgICAgIEhlbHBlci5odHRwKCdodHRwOi8vZ2FtZS5idWxsc3RzLmNvbS9pbmRleC5waHAvYWRtaW4vYXBpL2ltZ3MnKS50aGVuKGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5b6X5Yiw5pyN5Yqh5Zmo5L+h5oGvJyArIEpTT04uc3RyaW5naWZ5KGUpKTtcclxuICAgICAgICAgICAgbGV0IGFyciA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghIWVbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChlW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhZE5kID0gdGhpcy5hZFZpZXcuZ2V0Q2hpbGRCeU5hbWUoJ2FkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0FkTmQgPSBjYy5pbnN0YW50aWF0ZShhZE5kKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkVmlldy5wYXJlbnQucGFyZW50LmdldENvbXBvbmVudChjYy5QYWdlVmlldykuYWRkUGFnZShuZXdBZE5kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIGFycikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwciA9IHRoaXMuYWRWaWV3LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgSGVscGVyLmxvYWRIZWFkKGFycltpXSwgc3AgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwci5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgbG9iYnlJbml0X0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkR2FtZVNjZW5lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiYnRfUmVjb25uZXRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tYWxsSW5pdF9GdW5jdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc2V0U3lzdGVtTWVzc2FnZV9GdW5jdGlvbigpO1xyXG4gICAgICAgIHRoaXMuZW50ZXJSb29tID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jaGVja1VwZGF0ZVRpbWVPdXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNoZWNrVXBkYXRlR2FtZU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2hlY2tVcGRhdGVUaW1lID0gMjA7XHJcbiAgICAgICAgdGhpcy5jaGVja1VwZGF0ZVRpbWVMYWJlbCA9IHRoaXMuY2hlY2tVcGRhdGVUaW1lO1xyXG4gICAgICAgIHRoaXMuaGVhcnRCZWF0VGltZSA9IC0yMDtcclxuICAgICAgICB0aGlzLmhlYXJ0QmVhdFRpbWVPdXQgPSAwO1xyXG4gICAgICAgIHRoaXMuaGVhcnRCZWF0RW1pdENvbnRyb2wgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNoYXRBcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2hhdE1lc3NhZ2VBcnJheSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuY2hhdE1lc3NhZ2VQb3NpdGlvbiA9IFtcclxuICAgICAgICAgICAgWy01MDAsIC0zMF0sXHJcbiAgICAgICAgICAgIFs0ODUsIC0zMF1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuYmFua1NlbGVjdCA9IC0xO1xyXG4gICAgICAgIHRoaXMuZWRpdENhcmRJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuYmdfQmxhY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nSW5pdF9GdW5jdGlvbigpO1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzQnJvd3Nlcikge1xyXG4gICAgICAgICAgICAvL3RoaXMubm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1lbnVcIikubmVlZFRvVXBkYXRlX0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmICh0aGlzLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5nYW1lUmVjb25uZWN0X0Z1bmN0aW9uKHRoaXMucGxheWVySW5mby5nYW1lSXAsIHRoaXMucGxheWVySW5mby5nYW1lUHJvdCwgdGhpcy5wbGF5ZXJJbmZvLmdhbWVOYW1lKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5jb2RlVGltZUNvdW50ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5nZXRDb2RlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jaGVja0lkUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlQm94VHlwZSA9IDA7XHJcbiAgICAgICAgLy8gdGhpcy5jdXN0b21lclNlcnZpY2VNZXNzYWdlSW5pdF9GdW5jdGlvbigpO1xyXG4gICAgICAgIHRoaXMuSGVhZEluaXRfRnVuY3Rpb24oKTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuc29ja2V0LmVtaXQoXCJnZXRCYW5rU2NvcmVcIik7XHJcbiAgICAgICAgdGhpcy5zaG93X3ZpcCgpO1xyXG4gICAgfSxcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u55WM6Z2i5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIHNldHRpbmdJbml0X0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zcF9zZXR0aW5nQ29udHJvbCA9IG5ldyBBcnJheSgyKTtcclxuICAgICAgICAvL+iDjOaZr+mfs+S5kFxyXG4gICAgICAgIHRoaXMuc3Bfc2V0dGluZ0NvbnRyb2xbMF0gPSB0aGlzLnNwX09uQW5kT2ZmWzBdO1xyXG4gICAgICAgIC8v5ri45oiP6Z+z5pWIXHJcbiAgICAgICAgdGhpcy5zcF9zZXR0aW5nQ29udHJvbFsxXSA9IHRoaXMuc3BfT25BbmRPZmZbMV07XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG5cclxuICAgICAgICB2YXIgZSA9IG51bGw7XHJcbiAgICAgICAgbnVsbCA9PT0gdGhpcy5wbGF5ZXJJbmZvLm11c2ljQ29udHJvbCA/IChlID0gdGhpcy5wbGF5ZXJJbmZvLnJlYWREYXRhX0Z1bmN0aW9uKFwidXNlclNldHRpbmdcIiksIG51bGwgPT09IGUgPyAoZSA9IHtcclxuICAgICAgICAgICAgbXVzaWNDb250cm9sOiAxLFxyXG4gICAgICAgICAgICBzb3VuZEVmZmVjdENvbnRyb2w6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8ud3JpdGVEYXRhX0Z1bmN0aW9uKFwidXNlclNldHRpbmdcIiwgZSksIHRoaXMucGxheWVySW5mby5tdXNpY0NvbnRyb2wgPSBlLm11c2ljQ29udHJvbCwgdGhpcy5wbGF5ZXJJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCA9IGUuc291bmRFZmZlY3RDb250cm9sLCB0aGlzLmNvbV9TZXR0aW5nLmdldENoaWxkQnlOYW1lKFwiYnRfTXVzaWNDb250cm9sXCIpLmlzVm9pY2UgPSB0aGlzLnBsYXllckluZm8ubXVzaWNjb250cm9sLCB0aGlzLmNvbV9TZXR0aW5nLmdldENoaWxkQnlOYW1lKFwiYnRfU291bmRFZmZlY3RDb250cm9sXCIpLmlzVm9pY2UgPSB0aGlzLnBsYXllckluZm8uc291bmRFZmZlY3RDb250cm9sLCB0aGlzLmJnbU51bWJlciA9IGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdV9Mb2JieUJHTSwgdHJ1ZSwgMSkpIDogKHRoaXMucGxheWVySW5mby5tdXNpY0NvbnRyb2wgPSBlLm11c2ljQ29udHJvbCwgdGhpcy5wbGF5ZXJJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCA9IGUuc291bmRFZmZlY3RDb250cm9sLCB0aGlzLmNvbV9TZXR0aW5nLmdldENoaWxkQnlOYW1lKFwiYnRfTXVzaWNDb250cm9sXCIpLmlzVm9pY2UgPSB0aGlzLnBsYXllckluZm8ubXVzaWNjb250cm9sLCB0aGlzLmNvbV9TZXR0aW5nLmdldENoaWxkQnlOYW1lKFwiYnRfU291bmRFZmZlY3RDb250cm9sXCIpLmlzVm9pY2UgPSB0aGlzLnBsYXllckluZm8uc291bmRFZmZlY3RDb250cm9sLCB0aGlzLnBsYXllckluZm8ubXVzaWNDb250cm9sICYmICh0aGlzLmJnbU51bWJlciA9IGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdV9Mb2JieUJHTSwgdHJ1ZSwgMSkpKSkgOiB0aGlzLnBsYXllckluZm8ubXVzaWNDb250cm9sICYmICh0aGlzLmNvbV9TZXR0aW5nLmdldENoaWxkQnlOYW1lKFwiYnRfTXVzaWNDb250cm9sXCIpLmlzVm9pY2UgPSB0aGlzLnBsYXllckluZm8ubXVzaWNjb250cm9sLCB0aGlzLmNvbV9TZXR0aW5nLmdldENoaWxkQnlOYW1lKFwiYnRfU291bmRFZmZlY3RDb250cm9sXCIpLmlzVm9pY2UgPSB0aGlzLnBsYXllckluZm8uc291bmRFZmZlY3RDb250cm9sLCB0aGlzLmJnbU51bWJlciA9IGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdV9Mb2JieUJHTSwgdHJ1ZSwgMSkpLFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8ubXVzaWNDb250cm9sID8gKHRoaXMuY29tX1NldHRpbmcuZ2V0Q2hpbGRCeU5hbWUoXCJidF9NdXNpY0NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF9zZXR0aW5nQ29udHJvbFsxXSwgdGhpcy5jb21fU2V0dGluZy5nZXRDaGlsZEJ5TmFtZShcImJ0X011c2ljQ29udHJvbFwiKS5nZXRDaGlsZEJ5TmFtZShcInNwX0NvbnRyb2xcIikuc2V0UG9zaXRpb24oNjAsIDApKSA6ICh0aGlzLmNvbV9TZXR0aW5nLmdldENoaWxkQnlOYW1lKFwiYnRfTXVzaWNDb250cm9sXCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3Bfc2V0dGluZ0NvbnRyb2xbMF0sIHRoaXMuY29tX1NldHRpbmcuZ2V0Q2hpbGRCeU5hbWUoXCJidF9NdXNpY0NvbnRyb2xcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9Db250cm9sXCIpLnNldFBvc2l0aW9uKC02MCwgMCkpLFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uc291bmRFZmZlY3RDb250cm9sID8gKHRoaXMuY29tX1NldHRpbmcuZ2V0Q2hpbGRCeU5hbWUoXCJidF9Tb3VuZEVmZmVjdENvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF9zZXR0aW5nQ29udHJvbFsxXSwgdGhpcy5jb21fU2V0dGluZy5nZXRDaGlsZEJ5TmFtZShcImJ0X1NvdW5kRWZmZWN0Q29udHJvbFwiKS5nZXRDaGlsZEJ5TmFtZShcInNwX0NvbnRyb2xcIikuc2V0UG9zaXRpb24oNjAsIDApKSA6ICh0aGlzLmNvbV9TZXR0aW5nLmdldENoaWxkQnlOYW1lKFwiYnRfU291bmRFZmZlY3RDb250cm9sXCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3Bfc2V0dGluZ0NvbnRyb2xbMF0sIHRoaXMuY29tX1NldHRpbmcuZ2V0Q2hpbGRCeU5hbWUoXCJidF9Tb3VuZEVmZmVjdENvbnRyb2xcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9Db250cm9sXCIpLnNldFBvc2l0aW9uKC02MCwgMCkpLFxyXG4gICAgICAgICAgICBjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEICYmICh0aGlzLmNvbV9TZXR0aW5nLmdldENoaWxkQnlOYW1lKFwiYnRfRXhpdFwiKS5hY3RpdmUgPSB0cnVlKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHBsYXllckluZm9NZW51SW5pdF9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGUgPSAxMjsgZSA8IHRoaXMuY29tX1BsYXllckluZm8uY2hpbGRyZW4ubGVuZ3RoOyArK2UpIHRoaXMuY29tX1BsYXllckluZm8uY2hpbGRyZW5bZV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmlzT2ZmaWNhbCA/ICh0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQ3JlYXRlQWNjb3VudFwiKS5hY3RpdmUgPSBmYWxzZSwgdGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DcmVhdGVBY2NvdW50XCIpLmFjdGl2ZSA9IGZhbHNlLCB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQ2hhbmdlTmFtZVwiKS5hY3RpdmUgPSB0cnVlLCB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQ2hhbmdlTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gZmFsc2UsIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlTmFtZVwiKS5hY3RpdmUgPSB0cnVlLCB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZU5hbWVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9TdGF0ZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIui0puWPt+eKtuaAgTog5bey6L2s5q2jXCIsIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlTmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX0FjY291bnRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLotKblj7c6IFwiICsgdGhpcy5wbGF5ZXJJbmZvLmFjY291bnQsIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlTmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX0lkXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi55So5oi3SUQ6IFwiICsgdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkKSA6ICh0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQ3JlYXRlQWNjb3VudFwiKS5hY3RpdmUgPSB0cnVlLCB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQ3JlYXRlQWNjb3VudFwiKS5hY3RpdmUgPSB0cnVlLCB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQ3JlYXRlQWNjb3VudFwiKS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gZmFsc2UsIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ3JlYXRlQWNjb3VudFwiKS5hY3RpdmUgPSB0cnVlLCB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQ2hhbmdlTmFtZVwiKS5hY3RpdmUgPSBmYWxzZSwgdGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VOYW1lXCIpLmFjdGl2ZSA9IGZhbHNlLCB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZU5hbWVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9TdGF0ZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIlwiLCB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZU5hbWVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9BY2NvdW50XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwiXCIsIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlTmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX0lkXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwiXCIpLFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uaXNCaW5kQWxpID8gdGhpcy5wbGF5ZXJJbmZvLmFsaUFjY291bnQgPyAodGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImJ0X0JpbmRBbGlcIikuYWN0aXZlID0gZmFsc2UsIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJidF9CaW5kZWRBbGlcIikuYWN0aXZlID0gdHJ1ZSwgdGhpcy5wbGF5ZXJJbmZvLmVuY3J5cHRBbGlBY2NvdW50ID0gdGhpcy5lbmNyeXB0U3RyaW5nX0Z1bmN0aW9uKHRoaXMucGxheWVySW5mby5hbGlBY2NvdW50LCAzLCA2KSwgdGhpcy5wbGF5ZXJJbmZvLmVuY3J5cHRBbGlOYW1lID0gdGhpcy5lbmNyeXB0U3RyaW5nX0Z1bmN0aW9uKHRoaXMucGxheWVySW5mby5hbGlOYW1lLCAxLCAzKSwgdGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kZWRBbGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9BY2NvdW50SW5mb1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8uZW5jcnlwdEFsaUFjY291bnQsIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZGVkQWxpXCIpLmdldENoaWxkQnlOYW1lKFwibGJfTmFtZUluZm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLmVuY3J5cHRBbGlOYW1lKSA6ICh0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQmluZEFsaVwiKS5hY3RpdmUgPSB0cnVlLCB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQmluZGVkQWxpXCIpLmFjdGl2ZSA9IGZhbHNlLCB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRlZEFsaVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX0FjY291bnRJbmZvXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwiXCIsIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZGVkQWxpXCIpLmdldENoaWxkQnlOYW1lKFwibGJfTmFtZUluZm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJcIikgOiAodGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImJ0X0JpbmRBbGlcIikuYWN0aXZlID0gZmFsc2UsIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJidF9CaW5kZWRBbGlcIikuYWN0aXZlID0gZmFsc2UpLFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uaXNCaW5kQ3JlZGl0Q2FyZCA/IHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJidF9CaW5kQ3JlZGl0Q2FyZFwiKS5hY3RpdmUgPSB0cnVlIDogdGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImJ0X0JpbmRDcmVkaXRDYXJkXCIpLmFjdGl2ZSA9IGZhbHNlLFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uaXNCaW5kUGhvbmUgPyAodGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImJ0X0JpbmRQaG9uZVwiKS5hY3RpdmUgPSB0cnVlKSA6IHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJidF9CaW5kUGhvbmVcIikuYWN0aXZlID0gZmFsc2UsXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5wbGF5ZXJDb2luIDwgNTAgPyAodGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiYnRfUGx1c01hbGxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBzXCIpLmFjdGl2ZSA9IHRydWUpIDogKHRoaXMuY29tX0J1dHRvbi5nZXRDaGlsZEJ5TmFtZShcImJ0X1BsdXNNYWxsXCIpLmdldENoaWxkQnlOYW1lKFwidGlwc1wiKS5hY3RpdmUgPSBmYWxzZSksXHJcbiAgICAgICAgICAgIDIgPT09IHRoaXMucGxheWVySW5mby5pc0F1dG9Mb2dpbiAmJiAodGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImJ0X0NoYW5nZUFjY291bnRcIikuYWN0aXZlID0gZmFsc2UsIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJidF9DaGFuZ2VQYXNzd29yZFwiKS5hY3RpdmUgPSBmYWxzZSksXHJcbiAgICAgICAgICAgIHRoaXMuYmFua0lkSW5pdF9GdW5jdGlvbigpLFxyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuc29ja2V0ICYmIHRoaXMubmV0V29yay5zb2NrZXQuZW1pdChcImdldEJhbmtcIiksXHJcbiAgICAgICAgICAgIHRoaXMucmVhZENoYXRfRnVuY3Rpb24oKVxyXG4gICAgfSxcclxuICAgIGVuY3J5cHRTdHJpbmdfRnVuY3Rpb246IGZ1bmN0aW9uIChlLCB0LCBpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgbiA9IGUsXHJcbiAgICAgICAgICAgIG8gPSBcIlwiLFxyXG4gICAgICAgICAgICBhID0gdDsgYSA8IG4ubGVuZ3RoOyArK2EpIG8gKz0gXCIqXCI7XHJcbiAgICAgICAgcmV0dXJuIG8ubGVuZ3RoID4gOCAmJiAobyA9IFwiKioqKioqKipcIiksXHJcbiAgICAgICAgICAgIG4gPSBuLmxlbmd0aCA+IGkgPyBuLnN1YnN0cmluZygwLCB0KSArIG8gKyBuLnN1YnN0cmluZyhuLmxlbmd0aCAtIHQsIG4ubGVuZ3RoKSA6IG4uc3Vic3RyaW5nKDAsIHQpICsgb1xyXG4gICAgfSxcclxuICAgIG1hbGxJbml0X0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5yZWNoYXJnZU1vbmV5QXJyYXkgPSBbOTgsIDE5OCwgNDk4LCA5NjhdO1xyXG4gICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgNDsgKytlKSB0aGlzLmNvbV9NYWxsLmdldENoaWxkQnlOYW1lKFwiY29tX2Nob25nemhpXzAxXCIpLmdldENoaWxkQnlOYW1lKFwiYnRfUmVjaGFyZ2VcIiArIGUpLnJlY2hhcmdlSWQgPSBlO1xyXG4gICAgICAgIC8vZm9yIChlID0gMDsgZSA8IHRoaXMucGxheWVySW5mby5wYXlTZWxlY3QubGVuZ3RoOyArK2UpIHRoaXMuY29tX01hbGwuY2hpbGRyZW5bZSArIDldLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSB0aGlzLnBsYXllckluZm8ucGF5U2VsZWN0W2VdO1xyXG4gICAgfSxcclxuICAgIEhlYWRJbml0X0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy/liJ3lp4vljJblpLTlg49cclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQodGhpcy5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9CRy5nZXRDaGlsZEJ5TmFtZShcInNwX0hlYWRcIikuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gc3A7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgY3VzdG9tZXJTZXJ2aWNlTWVzc2FnZUluaXRfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZSA9IHRoaXMuY29tX0N1c3RvbWVyU2VydmljZS5nZXRDaGlsZEJ5TmFtZShcInN2X1ZpZXdcIikuZ2V0Q29tcG9uZW50KFwiY2MuU2Nyb2xsVmlld1wiKS5jb250ZW50O1xyXG4gICAgICAgIGUucmVtb3ZlQWxsQ2hpbGRyZW4oKSxcclxuICAgICAgICAgICAgdGhpcy5jaGF0TWVzc2FnZUFycmF5ID0gW10sXHJcbiAgICAgICAgICAgIHRoaXMubmV0V29yay5zb2NrZXQgJiYgdGhpcy5uZXRXb3JrLnNvY2tldC5lbWl0KFwiZ2V0TXNnVG9Vc2VyXCIpXHJcbiAgICB9LFxyXG5cclxuICAgIG1haWxJbml0X0Z1bmN0aW9uOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mby5tYWlsTGlzdCA9IGUsXHJcbiAgICAgICAgICAgIHRoaXMuY29tX01haWwuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9NYWlsSW5mb1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY29tX01haWwuZ2V0Q2hpbGRCeU5hbWUoXCJidF9HZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuQnV0dG9uXCIpLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciB0ID0gdGhpcy5jb21fTWFpbC5nZXRDaGlsZEJ5TmFtZShcInN2X01haWxcIikuZ2V0Q29tcG9uZW50KFwiY2MuU2Nyb2xsVmlld1wiKS5jb250ZW50O1xyXG4gICAgICAgIGlmICh0LnJlbW92ZUFsbENoaWxkcmVuKCksIGUpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBuID0gMCxcclxuICAgICAgICAgICAgICAgIG8gPSAtNDAsXHJcbiAgICAgICAgICAgICAgICBhID0gMDsgYSA8IGUubGVuZ3RoOyArK2EpIGkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBiX01haWxTZWxlY3QpLFxyXG4gICAgICAgICAgICAgICAgICAgIHQuYWRkQ2hpbGQoaSksXHJcbiAgICAgICAgICAgICAgICAgICAgaS5zZXRQb3NpdGlvbihuLCBvICsgYSAqIC03MCksXHJcbiAgICAgICAgICAgICAgICAgICAgaS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi57O757uf6YKu5Lu2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaS5nZXRDb21wb25lbnQoXCJMb2JieUJ1dHRvbkNsaWNrXCIpLmNhbnZhc05vZGUgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIGkuYnV0dG9uSUQgPSBhLFxyXG4gICAgICAgICAgICAgICAgICAgIGkubWFpbElEID0gZVthXS5pZDtcclxuICAgICAgICAgICAgZS5sZW5ndGggPiA0ID8gdC5oZWlnaHQgPSA3MCAqIGUubGVuZ3RoIDogdC5oZWlnaHQgPSAzMjAsXHJcbiAgICAgICAgICAgICAgICBlLmxlbmd0aCA+IDAgPyB0aGlzLmNvbV9CdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJidF9NYWlsXCIpLmdldENoaWxkQnlOYW1lKFwidGlwc1wiKS5hY3RpdmUgPSB0cnVlIDogdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiYnRfTWFpbFwiKS5nZXRDaGlsZEJ5TmFtZShcInRpcHNcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0TWFpbEluZm9fRnVuY3Rpb246IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IHRoaXMuY29tX01haWwuZ2V0Q2hpbGRCeU5hbWUoXCJzdl9NYWlsXCIpLmdldENvbXBvbmVudChcImNjLlNjcm9sbFZpZXdcIikuY29udGVudCwgaSA9IDA7IGkgPCB0LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB0LmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgIGUuZ2V0Q29tcG9uZW50KFwiY2MuQnV0dG9uXCIpLmludGVyYWN0YWJsZSA9IGZhbHNlLFxyXG4gICAgICAgICAgICB0aGlzLm1haWxDbGljayA9IGUubm9kZS5idXR0b25JRCxcclxuICAgICAgICAgICAgdGhpcy5jb21fTWFpbC5nZXRDaGlsZEJ5TmFtZShcImJ0X0dldFwiKS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICB2YXIgbiA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmNvbV9NYWlsLmdldENoaWxkQnlOYW1lKFwibGJfTWFpbEluZm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLns7vnu5/pgq7ku7ZcXG5cXG5cIiwgdGhpcy5wbGF5ZXJJbmZvLm1haWxMaXN0W2Uubm9kZS5idXR0b25JRF0udHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NYWlsLmdldENoaWxkQnlOYW1lKFwibGJfTWFpbEluZm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nICs9IFwi5oGt5Zac5oKo5Zyo5q+U6LWb5b2T5Lit6I635b6X56ysIFwiICsgdGhpcy5wbGF5ZXJJbmZvLm1haWxMaXN0W2Uubm9kZS5idXR0b25JRF0ucmFua2lkeCArIFwiIOWQjVxcblxcblwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX01haWwuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9NYWlsSW5mb1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgKz0gXCLnjqnlrrbmmLXnp7A6IFwiICsgdGhpcy5wbGF5ZXJJbmZvLm1haWxMaXN0W2Uubm9kZS5idXR0b25JRF0ubmlja05hbWUgKyBcIlxcbklEOiBcIiArIHRoaXMucGxheWVySW5mby5tYWlsTGlzdFtlLm5vZGUuYnV0dG9uSURdLnNlbmRDb2luVXNlcklkICsgXCJcXG5cXG7nu5nkvaDotaDpgIHkuoZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NYWlsLmdldENoaWxkQnlOYW1lKFwibGJfTWFpbEluZm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nICs9IFwi5Zyo5byA54Ku6YCB6K+d6LS55rS75Yqo5Lit5oKo5a6M5oiQ5LqG5LiA5Liq562J57qnXFxuXFxuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVySW5mby5tYWlsTGlzdFtlLm5vZGUuYnV0dG9uSURdLnByb3BDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNvbV9NYWlsLmdldENoaWxkQnlOYW1lKFwibGJfTWFpbEluZm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nICs9IFwi6I635b6XIFwiICsgdGhpcy5wbGF5ZXJJbmZvLm1haWxMaXN0W2Uubm9kZS5idXR0b25JRF0ucHJvcENvdW50ICsgXCIg5LiqXCIsIHRoaXMucGxheWVySW5mby5tYWlsTGlzdFtlLm5vZGUuYnV0dG9uSURdLnByb3BJZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBcIuivnei0ueWIuFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb21fTWFpbC5nZXRDaGlsZEJ5TmFtZShcImxiX01haWxJbmZvXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyArPSBuICsgXCJcXG5cXG5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBsYXllckluZm8ubWFpbExpc3RbZS5ub2RlLmJ1dHRvbklEXS53aW5TY29yZSA+IDAgJiYgKHRoaXMucGxheWVySW5mby5tYWlsTGlzdFtlLm5vZGUuYnV0dG9uSURdLm5pY2tOYW1lID8gdGhpcy5jb21fTWFpbC5nZXRDaGlsZEJ5TmFtZShcImxiX01haWxJbmZvXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyArPSAodGhpcy5wbGF5ZXJJbmZvLm1haWxMaXN0W2Uubm9kZS5idXR0b25JRF0ud2luU2NvcmUgLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpICsgXCIg6YeR5biBXCIgOiB0aGlzLmNvbV9NYWlsLmdldENoaWxkQnlOYW1lKFwibGJfTWFpbEluZm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nICs9IFwi6I635b6XIFwiICsgKHRoaXMucGxheWVySW5mby5tYWlsTGlzdFtlLm5vZGUuYnV0dG9uSURdLndpblNjb3JlIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKSArIFwiIOmHkeW4gVwiKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+W+l+mCruS7tlxyXG4gICAgICovXHJcbiAgICBnZXRNYWlsX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWFpbENsaWNrICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuc29ja2V0LmVtaXQoXCJnZXRQcml6ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5wbGF5ZXJJbmZvLm1haWxMaXN0W3RoaXMubWFpbENsaWNrXS5pZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb21fTWFpbC5nZXRDaGlsZEJ5TmFtZShcImJ0X0dldFwiKS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6YKu5Lu2XHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgXHJcbiAgICAgKi9cclxuICAgIGFkZE1haWxfRnVuY3Rpb246IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLm1haWxMaXN0LnB1c2goZGF0YSk7XHJcbiAgICAgICAgdmFyIHN2X01haWwgPSB0aGlzLmNvbV9NYWlsLmdldENoaWxkQnlOYW1lKFwic3ZfTWFpbFwiKS5nZXRDb21wb25lbnQoXCJjYy5TY3JvbGxWaWV3XCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgdmFyIG1haWxPYmplY3QgPSBudWxsO1xyXG4gICAgICAgIG1haWxPYmplY3QgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBiX01haWxTZWxlY3QpO1xyXG4gICAgICAgIHN2X01haWwuYWRkQ2hpbGQobWFpbE9iamVjdCk7XHJcbiAgICAgICAgbWFpbE9iamVjdC5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi57O757uf6YKu5Lu2XCI7XHJcbiAgICAgICAgbWFpbE9iamVjdC5nZXRDb21wb25lbnQoXCJMb2JieUJ1dHRvbkNsaWNrXCIpLmNhbnZhc05vZGUgPSB0aGlzO1xyXG4gICAgICAgIG1haWxPYmplY3QubWFpbElEID0gZGF0YS5pZDtcclxuICAgICAgICBtYWlsT2JqZWN0LmJ1dHRvbklEID0gdGhpcy5wbGF5ZXJJbmZvLm1haWxMaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiYnRfTWFpbFwiKS5nZXRDaGlsZEJ5TmFtZShcInRpcHNcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1haWxDb250ZW50X0Z1bmN0aW9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk6YKu5Lu2XHJcbiAgICAgKi9cclxuICAgIGRlc3Ryb3lNYWlsX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLm1haWxMaXN0W3RoaXMubWFpbENsaWNrXSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYWlsQ29udGVudF9GdW5jdGlvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVNYWlsQ29udGVudF9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGUgPSB0aGlzLmNvbV9NYWlsLmdldENoaWxkQnlOYW1lKFwic3ZfTWFpbFwiKS5nZXRDb21wb25lbnQoXCJjYy5TY3JvbGxWaWV3XCIpLmNvbnRlbnQsIHQgPSAwLCBpID0gLTQwLCBuID0gMDsgbiA8IHRoaXMucGxheWVySW5mby5tYWlsTGlzdC5sZW5ndGg7ICsrbikgbnVsbCA9PT0gdGhpcy5wbGF5ZXJJbmZvLm1haWxMaXN0W25dICYmICh0aGlzLnBsYXllckluZm8ubWFpbExpc3Quc3BsaWNlKG4sIDEpLCBlLnJlbW92ZUNoaWxkKGUuY2hpbGRyZW5bbl0pKTtcclxuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHRoaXMucGxheWVySW5mby5tYWlsTGlzdC5sZW5ndGg7ICsrbikgZS5jaGlsZHJlbltuXS5idXR0b25JRCA9IG4sXHJcbiAgICAgICAgICAgIGUuY2hpbGRyZW5bbl0uc2V0UG9zaXRpb24odCwgaSArIG4gKiAtNzApO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mby5tYWlsTGlzdC5sZW5ndGggPiA0ID8gZS5oZWlnaHQgPSA3MCAqIHRoaXMucGxheWVySW5mby5tYWlsTGlzdC5sZW5ndGggOiAoZS5oZWlnaHQgPSAzMjAsIDAgPT09IHRoaXMucGxheWVySW5mby5tYWlsTGlzdC5sZW5ndGggJiYgKHRoaXMuY29tX0J1dHRvbi5nZXRDaGlsZEJ5TmFtZShcImJ0X01haWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBzXCIpLmFjdGl2ZSA9IGZhbHNlKSksXHJcbiAgICAgICAgICAgIHRoaXMuY29tX01haWwuZ2V0Q2hpbGRCeU5hbWUoXCJzdl9NYWlsXCIpLmdldENvbXBvbmVudChcImNjLlNjcm9sbFZpZXdcIikuc2Nyb2xsVG9Ub3AoLjUpLFxyXG4gICAgICAgICAgICB0aGlzLm1haWxDbGljayA9IC0xLFxyXG4gICAgICAgICAgICB0aGlzLmNvbV9NYWlsLmdldENoaWxkQnlOYW1lKFwibGJfTWFpbEluZm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJcIlxyXG4gICAgfSxcclxuICAgIGJhbmtJZEluaXRfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBlID0gdGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9BZGRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwic3ZfU2VsZWN0QmFua1wiKS5nZXRDb21wb25lbnQoXCJjYy5TY3JvbGxWaWV3XCIpLmNvbnRlbnQsIHQgPSB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0VkaXRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwic3ZfU2VsZWN0QmFua1wiKS5nZXRDb21wb25lbnQoXCJjYy5TY3JvbGxWaWV3XCIpLmNvbnRlbnQsIGkgPSAwOyBpIDwgZS5jaGlsZHJlbkNvdW50OyArK2kpIGUuY2hpbGRyZW5baV0uYmFua0lkID0gaSxcclxuICAgICAgICAgICAgdC5jaGlsZHJlbltpXS5iYW5rSWQgPSBpXHJcbiAgICB9LFxyXG4gICAgYmFua0luZm9Jbml0X0Z1bmN0aW9uOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZE9iaiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5iYW5rTGlzdCA9IGU7XHJcbiAgICAgICAgdGhpcy5iYW5rTmFtZUxpc3QgPSBbXCJcIiwgXCLlt6XllYbpk7booYxcIiwgXCLkuK3lm73pk7booYxcIiwgXCLlhpzkuJrpk7booYxcIiwgXCLlu7rorr7pk7booYxcIiwgXCLkuqTpgJrpk7booYxcIiwgXCLmi5vllYbpk7booYxcIiwgXCLkuK3lm73pgq7mlL9cIiwgXCLlhYnlpKfpk7booYxcIiwgXCLmsJHnlJ/pk7booYxcIiwgXCLkuK3kv6Hpk7booYxcIiwgXCLlhbTkuJrpk7booYxcIiwgXCLljY7lpI/pk7booYxcIl07XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IG51bGwsIGkgPSAwOyBpIDwgZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wYl9FZGl0Q2FyZEluZm8pO1xyXG4gICAgICAgICAgICB0LnNldFBvc2l0aW9uKDE3NSwgMTgwIC0gMTAwICogaSk7XHJcbiAgICAgICAgICAgIHQuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9DYXJkSW5mb1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIumTtuihjOWNoTogXCIgKyB0aGlzLmVuY3J5cHRTdHJpbmdfRnVuY3Rpb24oZVtpXS5hY2NvdW50LCA0LCA0KTtcclxuICAgICAgICAgICAgdC5jYXJkSWQgPSBlW2ldLmNhcmRJZDtcclxuICAgICAgICAgICAgdC5nZXRDb21wb25lbnQoXCJMb2JieUJ1dHRvbkNsaWNrXCIpLmNhbnZhc05vZGUgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRDcmVkaXRDYXJkXCIpLmFkZENoaWxkKHQpO1xyXG4gICAgICAgICAgICBlLmxlbmd0aCA+IDQgPyB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiYnRfQWRkQ3JlZGl0Q2FyZFwiKS5hY3RpdmUgPSBmYWxzZSA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiYnRfQWRkQ3JlZGl0Q2FyZFwiKS5zZXRQb3NpdGlvbigxNzUsIDE4MCAtIDEwMCAqIGUubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6ZO26KGM5Y2hXHJcbiAgICAgKiBAcGFyYW0geyp9IGNhcmRJZCBcclxuICAgICAqIEBwYXJhbSB7Kn0gbXNnIFxyXG4gICAgICovXHJcbiAgICBhZGRDcmVkaXRDYXJkX0Z1bmN0aW9uOiBmdW5jdGlvbiAoY2FyZElkLCBtc2cpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYmFua0xpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5iYW5rTGlzdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNyZWRpdENhcmRPYmouY2FyZElkID0gY2FyZElkO1xyXG4gICAgICAgIHRoaXMuYmFua0xpc3QucHVzaCh0aGlzLmNyZWRpdENhcmRPYmopO1xyXG4gICAgICAgIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQWRkQ3JlZGl0Q2FyZFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRDcmVkaXRDYXJkXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIGluZm8gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBiX0VkaXRDYXJkSW5mbyk7XHJcbiAgICAgICAgaW5mby5jYXJkSWQgPSBjYXJkSWQ7XHJcbiAgICAgICAgaW5mby5zZXRQb3NpdGlvbigxNzUsIDE4MCAtIDEwMCAqICh0aGlzLmJhbmtMaXN0Lmxlbmd0aCAtIDEpKTtcclxuICAgICAgICBpbmZvLmdldENoaWxkQnlOYW1lKFwibGJfQ2FyZEluZm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLpk7booYzljaE6IFwiICsgdGhpcy5lbmNyeXB0U3RyaW5nX0Z1bmN0aW9uKHRoaXMuY3JlZGl0Q2FyZE9iai5hY2NvdW50LCA0LCA0KTtcclxuICAgICAgICBpbmZvLmdldENvbXBvbmVudChcIkxvYmJ5QnV0dG9uQ2xpY2tcIikuY2FudmFzTm9kZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQ3JlZGl0Q2FyZFwiKS5hZGRDaGlsZChpbmZvKTtcclxuICAgICAgICBpZiAodGhpcy5iYW5rTGlzdC5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidF9BZGRDcmVkaXRDYXJkXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidF9BZGRDcmVkaXRDYXJkXCIpLnNldFBvc2l0aW9uKDE3NSwgMTgwIC0gMTAwICogdGhpcy5iYW5rTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNyZWRpdENhcmRPYmogPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24obXNnLCAxLCAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnpk7booYzljaFcclxuICAgICAqIEBwYXJhbSB7Kn0gY2FyZElkIFxyXG4gICAgICogQHBhcmFtIHsqfSBtc2cgXHJcbiAgICAgKi9cclxuICAgIGVkaXRDcmVkaXRDYXJkX0Z1bmN0aW9uOiBmdW5jdGlvbiAoY2FyZElkLCBtc2cpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYmFua0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmFua0xpc3RbaV0uY2FyZElkID09PSBjYXJkSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFua0xpc3RbaV0uYWNjb3VudCA9IHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9DYXJkTm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbmtMaXN0W2ldLm5hbWUgPSB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0VkaXRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfT3duZXJcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbmtMaXN0W2ldLmJhbmtUeXBlID0gdGhpcy5iYW5rU2VsZWN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYmFua1NlbGVjdCA9IC0xO1xyXG4gICAgICAgIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQ3JlZGl0Q2FyZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd01lc3NhZ2Vib3hfRnVuY3Rpb24obXNnLCAxLCAwKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRDcmVkaXRDYXJkXCIpLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQ3JlZGl0Q2FyZFwiKS5jaGlsZHJlbltpXS5jYXJkSWQgPT09IGNhcmRJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQ3JlZGl0Q2FyZFwiKS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImxiX0NhcmRJbmZvXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi6ZO26KGM5Y2hOiBcIiArIHRoaXMuZW5jcnlwdFN0cmluZ19GdW5jdGlvbih0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0VkaXRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfQ2FyZE5vXCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nLCA0LCA0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKDpmaTpk7booYzljaFcclxuICAgICAqIEBwYXJhbSB7Kn0gY2FyZElkIFxyXG4gICAgICogQHBhcmFtIHsqfSBtc2cgXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZUNyZWRpdENhcmRfRnVuY3Rpb246IGZ1bmN0aW9uIChjYXJkSWQsIG1zZykge1xyXG4gICAgICAgIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQ3JlZGl0Q2FyZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5iYW5rTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iYW5rTGlzdFtpXS5jYXJkSWQgPT09IGNhcmRJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5rTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZENyZWRpdENhcmRcIikuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRDcmVkaXRDYXJkXCIpLmNoaWxkcmVuW2ldLmNhcmRJZCA9PT0gY2FyZElkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRDcmVkaXRDYXJkXCIpLnJlbW92ZUNoaWxkKHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZENyZWRpdENhcmRcIikuY2hpbGRyZW5baV0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKG1zZywgMSwgMCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCYW5rTGlzdF9GdW5jdGlvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOmTtuihjOWIl+ihqFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVCYW5rTGlzdF9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQ3JlZGl0Q2FyZFwiKS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQ3JlZGl0Q2FyZFwiKS5jaGlsZHJlbltpXS5zZXRQb3NpdGlvbigxNzUsIDE4MCAtIDEwMCAqIChpIC0gMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5iYW5rTGlzdC5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidF9BZGRDcmVkaXRDYXJkXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidF9BZGRDcmVkaXRDYXJkXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidF9BZGRDcmVkaXRDYXJkXCIpLnNldFBvc2l0aW9uKDE3NSwgMTgwIC0gMTAwICogdGhpcy5iYW5rTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov57mjqXmuLjmiI/mnI3liqHlmajlpLHotKVcclxuICAgICAqIEBwYXJhbSB7Kn0gZ2FtZU5hbWUgXHJcbiAgICAgKi9cclxuICAgIGNvbnRlbnRHYW1lU2VydmVyRmFpbF9GdW5jdGlvbjogZnVuY3Rpb24gKGdhbWVOYW1lKSB7XHJcbiAgICAgICAgdmFyIGVycm9yTXNnID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKGdhbWVOYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJGaXNoXCI6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1zZyA9IFwi6KGX5py65o2V6bG8XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkJkZVwiOlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBcIuWFq+aQreS6jFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJHcmFiQnVsbFwiOlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBcIuaKouW6hOeJm+eJm1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUd29FaWdodFwiOlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBcIuS6jOWFq+adoFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJCdWxsXCI6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1zZyA9IFwi57uP5YW454mb54mbXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkxpbmVHYW1lXCI6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1zZyA9IFwi57uP5YW46ICB6JmO5py6XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlJvdWxldHRlXCI6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1zZyA9IFwi5qyn5byP6L2u55uYXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImhvbmdiYW9cIjpcclxuICAgICAgICAgICAgICAgIGVycm9yTXNnID0gXCLnuqLljIXovr7kurpcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiRmlzaGhhaXdhbmcyXCI6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1zZyA9IFwi5rW3546LMlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKFwi6L+e5o6lXCIgKyBlcnJvck1zZyArIFwi5Ye66ZSZLOivt+iBlOezu+WuouacjVwiLCAxLCA0KTtcclxuICAgICAgICB0aGlzLmxvYWRHYW1lU2NlbmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5vlhaXmuLjmiI/miL/pl7RcclxuICAgICAqIEBwYXJhbSB7Kn0gZ2FtZU9iaiBcclxuICAgICAqIEBwYXJhbSB7Kn0gZ2FtZU5hbWUgXHJcbiAgICAgKi9cclxuICAgIGxvZ2luR2FtZVJvb21fRnVuY3Rpb246IGZ1bmN0aW9uIChnYW1lT2JqLCBnYW1lTmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbiA8IGdhbWVPYmoubm9kZS5lbnRyeUNvaW4gLyAxMDApIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihcIumHkeW4geS4jeWkn+S6huWVpixcXG5cXG7ljrvlhYXlgLzlpb3lkJc/XCIsIDMsIDQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnTG9hZGluZycpLmFjdGl2ZSA9IHRydWU7IC8v54K55Lqu5Yqg6L295ri45oiP55WM6Z2iXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dhbWVPYmo6JywgZ2FtZU9iaik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVJcCA9IGdhbWVPYmoubm9kZS5pcDtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZVByb3QgPSBnYW1lT2JqLm5vZGUucHJvdDtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZU5hbWUgPSBnYW1lTmFtZTtcclxuICAgICAgICB0aGlzLnRlbXBOZXRXb3JrID0gbnVsbDtcclxuICAgICAgICBpZiAoIXRoaXMubG9hZEdhbWVTY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRHYW1lU2NlbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGdhbWVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiR3JhYkJ1bGxcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBOZXRXb3JrID0gcmVxdWlyZShcIkdyYWJCdWxsTmV0V29ya1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkxhbmRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBOZXRXb3JrID0gcmVxdWlyZShcIkxhbmROZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiUnVuaW5nXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yayA9IHJlcXVpcmUoXCJSdW5pbmdOZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiSG9sZGVtXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yayA9IHJlcXVpcmUoXCJIb2xkZW1OZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRmxvd2VyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yayA9IHJlcXVpcmUoXCJGbG93ZXJOZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiUm91bGV0dGVcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBOZXRXb3JrID0gcmVxdWlyZShcIlJvdWxldHRlTmV0XCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRmlzaFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcE5ldFdvcmsgPSByZXF1aXJlKFwiRmlzaE5ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJob25nYmFvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yayA9IHJlcXVpcmUoXCJIb25nQmFvTmV0V29ya1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgXCJGaXNoaGFpd2FuZzJcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBOZXRXb3JrID0gcmVxdWlyZShcIkZpc2hoYWl3YW5nMk5ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5iZ19CbGFjay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyUm9vbSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcE5ldFdvcmsuc2V0TG9iYnlNYWluT2JqX0Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBOZXRXb3JrLmxvZ2luR2FtZV9GdW5jdGlvbih0aGlzLnBsYXllckluZm8uZ2FtZUlwLCB0aGlzLnBsYXllckluZm8uZ2FtZVByb3QsIHRoaXMucGxheWVySW5mby5wbGF5ZXJJZCwgdGhpcy5wbGF5ZXJJbmZvLmdhbWVTaWduKTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrTGlua1RpbWVPdXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGlua1RpbWUgPSA1O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/nuaOpea4uOaIj1NvY2tldOacjeWKoeWZqFxyXG4gICAgICogQHBhcmFtIHsqfSBsb2dpbklQIFxyXG4gICAgICogQHBhcmFtIHsqfSBwcm90IFxyXG4gICAgICogQHBhcmFtIHsqfSBnYW1lTmFtZSBcclxuICAgICAqL1xyXG4gICAgZ2FtZVJlY29ubmVjdF9GdW5jdGlvbjogZnVuY3Rpb24gKGxvZ2luSVAsIHByb3QsIGdhbWVOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVJcCA9IGxvZ2luSVA7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVQcm90ID0gcHJvdDtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZU5hbWUgPSBnYW1lTmFtZTtcclxuICAgICAgICB2YXIgbmV0V29yZCA9IG51bGw7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRHYW1lU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkR2FtZVNjZW5lID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3dpdGNoIChnYW1lTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkdyYWJCdWxsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV0V29yZCA9IHJlcXVpcmUoXCJHcmFiQnVsbE5ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJMYW5kXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV0V29yZCA9IHJlcXVpcmUoXCJMYW5kTmV0V29ya1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIlJ1bmluZ1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIG5ldFdvcmQgPSByZXF1aXJlKFwiUnVuaW5nTmV0V29ya1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkhvbGRlbVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcE5ldFdvcmsgPSByZXF1aXJlKFwiSG9sZGVtTmV0V29ya1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkZsb3dlclwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcE5ldFdvcmsgPSByZXF1aXJlKFwiRmxvd2VyTmV0V29ya1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImhvbmdiYW9cIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBOZXRXb3JrID0gcmVxdWlyZShcImhvbmdiYW9OZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJSb29tID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuYmdfQmxhY2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbmV0V29yZC5zZXRMb2JieU1haW5PYmpfRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgICAgIG5ldFdvcmQubG9naW5HYW1lX0Z1bmN0aW9uKGxvZ2luSVAsIHByb3QsIHRoaXMucGxheWVySW5mby5wbGF5ZXJJZCwgdGhpcy5wbGF5ZXJJbmZvLmdhbWVTaWduKTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgICAgICBuZXRXb3JkID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0geyp9IG1vbmV5IFxyXG4gICAgICogQHBhcmFtIHsqfSBub2RlSUQgXHJcbiAgICAgKiBAcGFyYW0geyp9IHR5cGUgXHJcbiAgICAgKi9cclxuICAgIHBheV9GdW5jdGlvbjogZnVuY3Rpb24gKG1vbmV5LCBub2RlSUQsIHR5cGUpIHtcclxuICAgICAgICBpZiAoIW1vbmV5IHx8IG1vbmV5IDwgNTApIHJldHVybjsgLy9cclxuICAgICAgICB2YXIgdXJsID0gXCJodHRwOi8vZ2FtZS5idWxsc3RzLmNvbS9cIjtcclxuICAgICAgICB1cmwgKz0gXCJpbmRleC5waHAvYXBpL3BheS9wYXkvXCI7XHJcbiAgICAgICAgdXJsICs9IFwidWlkL1wiO1xyXG4gICAgICAgIHVybCArPSB0aGlzLnBsYXllckluZm8ucGxheWVySWQ7XHJcbiAgICAgICAgdXJsICs9IFwiL2ZlZS9cIlxyXG4gICAgICAgIHVybCArPSBtb25leTtcclxuICAgICAgICB1cmwgKz0gXCIvdHlwZS9cIjtcclxuICAgICAgICB1cmwgKz0gdHlwZTtcclxuXHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICBjYy5zeXMub3BlblVSTCh1cmwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciB3ZWJub2RlID0gdGhpcy5jb21fTWFsbC5nZXRDaGlsZEJ5TmFtZSgnY29tX1JlY2hhcmdlV2ViJyk7XHJcbiAgICAgICAgICAgIHdlYm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHZhciB3ZWIgPSB3ZWJub2RlLmdldENoaWxkQnlOYW1lKCd3dl9XZWInKS5nZXRDb21wb25lbnQoY2MuV2ViVmlldyk7XHJcbiAgICAgICAgICAgIHdlYi51cmwgPSB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVjaGFyZ2VNb25leSA9IDA7XHJcbiAgICAgICAgLy8gdmFyIHBsYXRmb3JtID0gLTE7XHJcbiAgICAgICAgLy8gc3dpdGNoIChjYy5zeXMub3MpIHtcclxuICAgICAgICAvLyAgICAgY2FzZSBjYy5zeXMuT1NfQU5EUk9JRDpcclxuICAgICAgICAvLyAgICAgICAgIHBsYXRmb3JtID0gMDtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICBjYXNlIGNjLnN5cy5PU19JT1M6XHJcbiAgICAgICAgLy8gICAgICAgICBwbGF0Zm9ybSA9IDE7XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyAgICAgICAgIHBsYXRmb3JtID0gMjtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAvLyAgICAgY2FzZSAwOlxyXG4gICAgICAgIC8vICAgICAgICAgdmFyIHBsYXllcklkID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkO1xyXG4gICAgICAgIC8vICAgICAgICAgdmFyIHRvdGFsRmVlID0gbW9uZXkgKiB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlO1xyXG4gICAgICAgIC8vICAgICAgICAgdmFyIHBheVR5cGUgPSAxMzAwO1xyXG4gICAgICAgIC8vICAgICAgICAgdmFyIGFwcElkID0gMTAwMTtcclxuICAgICAgICAvLyAgICAgICAgIHZhciBhY2NvdW50ID0gdGhpcy5wbGF5ZXJJbmZvLmFjY291bnQ7XHJcbiAgICAgICAgLy8gICAgICAgICB2YXIgdXJsID0gXCJodHRwOi8veXMuaHR0cHZpcC5jb206ODA4OC9jei5waHA/dXNlcklkPVwiICsgcGxheWVySWQgKyBcIiZ0b3RhbEZlZT1cIiArIHRvdGFsRmVlICsgXCImcGxhdGZvcm09XCIgKyBwbGF0Zm9ybSArIFwiJnBheVR5cGU9XCIgKyBwYXlUeXBlICsgXCImYXBwSWQ9XCIgKyBhcHBJZCArIFwiJmFjY291bnQ9XCIgKyBhY2NvdW50O1xyXG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgIGNhc2UgMTpcclxuICAgICAgICAvLyAgICAgICAgIHZhciBwbGF5ZXJJZCA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJJZDtcclxuICAgICAgICAvLyAgICAgICAgIHZhciB0b3RhbEZlZSA9IG1vbmV5ICogdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZTtcclxuICAgICAgICAvLyAgICAgICAgIHZhciBwYXlUeXBlID0gMjAwMDtcclxuICAgICAgICAvLyAgICAgICAgIHZhciBhcHBJZCA9IDEwMDI7XHJcbiAgICAgICAgLy8gICAgICAgICB2YXIgYWNjb3VudCA9IHRoaXMucGxheWVySW5mby5hY2NvdW50O1xyXG4gICAgICAgIC8vICAgICAgICAgdmFyIHVybCA9IFwiaHR0cDovL3lzLmh0dHB2aXAuY29tOjgwODgvY3oucGhwP3VzZXJJZD1cIiArIHBsYXllcklkICsgXCImdG90YWxGZWU9XCIgKyB0b3RhbEZlZSArIFwiJnBsYXRmb3JtPVwiICsgcGxhdGZvcm0gKyBcIiZwYXlUeXBlPVwiICsgcGF5VHlwZSArIFwiJmFwcElkPVwiICsgYXBwSWQgKyBcIiZhY2NvdW50PVwiICsgYWNjb3VudDtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICBjYXNlIDI6XHJcbiAgICAgICAgLy8gICAgICAgICB2YXIgZCA9IFs2LCAxOCwgNTAsIDEwMCwgMjAwXTtcclxuICAgICAgICAvLyAgICAgICAgIHZhciBwbGF5ZXJJZCA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJJZDtcclxuICAgICAgICAvLyAgICAgICAgIHZhciB0b3RhbEZlZSA9IGRbbm9kZUlEXSAqIHRoaXMucGxheWVySW5mby5leGNoYW5nZVJhdGU7XHJcbiAgICAgICAgLy8gICAgICAgICB2YXIgYXBwSWQgPSAxMDAxO1xyXG4gICAgICAgIC8vICAgICAgICAgdmFyIGFjY291bnQgPSB0aGlzLnBsYXllckluZm8uYWNjb3VudDtcclxuICAgICAgICAvLyAgICAgICAgIHZhciB1cmwgPSBcImh0dHA6Ly95cy5odHRwdmlwLmNvbTo4MDg4L2N6LnBocD91c2VySWQ9XCIgKyBwbGF5ZXJJZCArIFwiJnRvdGFsRmVlPVwiICsgdG90YWxGZWUgKyBcIiZwbGF0Zm9ybT1cIiArIHBsYXRmb3JtICsgXCImZ29vZHNJZD1cIiArIG5vZGVJRCArIFwiJmFwcElkPVwiICsgYXBwSWQgKyBcIiZhY2NvdW50PVwiICsgYWNjb3VudDtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5yZWNoYXJnZU1vbmV5ID0gMDtcclxuICAgICAgICAvLyBjYy5zeXMub3BlblVSTCh1cmwpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSB1c2VySWQgXHJcbiAgICAgKiBAcGFyYW0geyp9IG5pY2tuYW1lIFxyXG4gICAgICogQHBhcmFtIHsqfSBtc2cgXHJcbiAgICAgKi9cclxuICAgIGN1c3RvbWVyU2VydmljZVNlbmRNZXNzYWdlX0Z1bmN0aW9uOiBmdW5jdGlvbiAodXNlcklkLCBuaWNrbmFtZSwgbXNnKSB7XHJcbiAgICAgICAgLy8gdGhpcy5zZXRDaGF0X0Z1bmN0aW9uKHVzZXJJZCwgbmlja25hbWUsIG1zZyk7XHJcbiAgICAgICAgLy8gdGhpcy53cml0ZUNoYXRfRnVuY3Rpb24odXNlcklkLCBuaWNrbmFtZSwgbXNnKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7Kn0gdXNlcklkIFxyXG4gICAgICogQHBhcmFtIHsqfSBuaWNrbmFtZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gbWVzc2FnZSBcclxuICAgICAqL1xyXG4gICAgc2V0Q2hhdF9GdW5jdGlvbjogZnVuY3Rpb24gKHVzZXJJZCwgbmlja25hbWUsIG1lc3NhZ2UpIHtcclxuICAgICAgICB2YXIgdmlldyA9IHRoaXMuY29tX0N1c3RvbWVyU2VydmljZS5nZXRDaGlsZEJ5TmFtZShcInN2X1ZpZXdcIikuZ2V0Q29tcG9uZW50KFwiY2MuU2Nyb2xsVmlld1wiKS5jb250ZW50O1xyXG4gICAgICAgIHZhciBvYmplY3QgPSBudWxsO1xyXG4gICAgICAgIGlmICh1c2VySWQgPT09IHRoaXMucGxheWVySW5mby5wbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICBvYmplY3QgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBiX0NoYXQxKTtcclxuICAgICAgICAgICAgb2JqZWN0LnNldFBvc2l0aW9uKHRoaXMuY2hhdE1lc3NhZ2VQb3NpdGlvblsxXVswXSAtIDUwLCB0aGlzLmNoYXRNZXNzYWdlUG9zaXRpb25bMV1bMV0gKyB0aGlzLmNoYXRNZXNzYWdlQXJyYXkubGVuZ3RoICogLTE2MCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh1c2VySWQgPT0gMTApIHtcclxuICAgICAgICAgICAgb2JqZWN0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wYl9DaGF0MCk7XHJcbiAgICAgICAgICAgIG9iamVjdC5zZXRQb3NpdGlvbih0aGlzLmNoYXRNZXNzYWdlUG9zaXRpb25bMF1bMF0gKyA2NSwgdGhpcy5jaGF0TWVzc2FnZVBvc2l0aW9uWzBdWzFdICsgdGhpcy5jaGF0TWVzc2FnZUFycmF5Lmxlbmd0aCAqIC0xNjApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2JqZWN0KSB7XHJcbiAgICAgICAgICAgIG9iamVjdC5nZXRDaGlsZEJ5TmFtZShcImxiX0NoYXRcIikud2lkdGggPSBvYmplY3QuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9DaGF0XCIpLndpZHRoICsgMTA7XHJcbiAgICAgICAgICAgIG9iamVjdC5nZXRDaGlsZEJ5TmFtZShcImxiX0NoYXRcIikuaGVpZ2h0ID0gb2JqZWN0LmdldENoaWxkQnlOYW1lKFwibGJfQ2hhdFwiKS5oZWlnaHQgKyAxMDtcclxuICAgICAgICAgICAgSGVscGVyLmxvYWRIZWFkKHVzZXJJZCA9PSAxMCA/IDk5IDogdGhpcy5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCwgKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5nZXRDaGlsZEJ5TmFtZShcInNwXCIpLmdldENoaWxkQnlOYW1lKFwic3BfSGVhZFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgb2JqZWN0LmdldENoaWxkQnlOYW1lKFwibGJfTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBuaWNrbmFtZTtcclxuICAgICAgICAgICAgb2JqZWN0LmdldENoaWxkQnlOYW1lKFwibGJfQ2hhdFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBtZXNzYWdlO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXRNZXNzYWdlQXJyYXkucHVzaChvYmplY3QpO1xyXG4gICAgICAgICAgICB2aWV3LmFkZENoaWxkKG9iamVjdCk7XHJcbiAgICAgICAgICAgIG9iamVjdC5nZXRDaGlsZEJ5TmFtZShcInNwX0NoYXRGcmFtZVwiKS53aWR0aCA9IG9iamVjdC5nZXRDaGlsZEJ5TmFtZShcImxiX0NoYXRcIikud2lkdGggKyAyMDtcclxuICAgICAgICAgICAgb2JqZWN0LmdldENoaWxkQnlOYW1lKFwic3BfQ2hhdEZyYW1lXCIpLmhlaWdodCA9IG9iamVjdC5nZXRDaGlsZEJ5TmFtZShcImxiX0NoYXRcIikuaGVpZ2h0ICsgMjA7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tZXJTZXJ2aWNlTWVzc2FnZUNvbnRlbnRfRnVuY3Rpb24odmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuiBiuWkqeaVsOaNruWGmeWFpee8k+WtmFxyXG4gICAgICogQHBhcmFtIHsqfSB1c2VySWQgXHJcbiAgICAgKiBAcGFyYW0geyp9IG5pY2tuYW1lIFxyXG4gICAgICogQHBhcmFtIHsqfSBtZXNzYWdlIFxyXG4gICAgICovXHJcbiAgICB3cml0ZUNoYXRfRnVuY3Rpb246IGZ1bmN0aW9uICh1c2VySWQsIG5pY2tuYW1lLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNoYXREYXRhID09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGF0RGF0YSA9IHRoaXMucGxheWVySW5mby5yZWFkRGF0YV9GdW5jdGlvbihcImNoYXREYXRhXCIgKyB0aGlzLnBsYXllckluZm8ucGxheWVySWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgdXNlcklkOiB1c2VySWQsXHJcbiAgICAgICAgICAgIG5pY2tuYW1lOiBuaWNrbmFtZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoYXREYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhdERhdGEgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGF0RGF0YS5wdXNoKGRhdGEpO1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXREYXRhLmxlbmd0aCA+IDMwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhdERhdGEuc2hpZnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLndyaXRlRGF0YV9GdW5jdGlvbihcImNoYXREYXRhXCIgKyB0aGlzLnBsYXllckluZm8ucGxheWVySWQsIHRoaXMuY2hhdERhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOivu+WPlue8k+WtmOS4reeahOiBiuWkqeiusOW9lVxyXG4gICAgICovXHJcbiAgICByZWFkQ2hhdF9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIHRoaXMuY2hhdERhdGEgPSBudWxsO1xyXG4gICAgICAgIC8vIHRoaXMuY2hhdERhdGEgPSB0aGlzLnBsYXllckluZm8ucmVhZERhdGFfRnVuY3Rpb24oXCJjaGF0RGF0YVwiICsgdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkKTtcclxuXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuY2hhdERhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hhdERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2V0Q2hhdF9GdW5jdGlvbih0aGlzLmNoYXREYXRhW2ldLnVzZXJJZCwgdGhpcy5jaGF0RGF0YVtpXS5uaWNrbmFtZSwgdGhpcy5jaGF0RGF0YVtpXS5tZXNzYWdlKTtcclxuICAgICAgICAvLyAgICAgfVxyXG5cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBub2RlIFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVDdXN0b21lclNlcnZpY2VNZXNzYWdlQ29udGVudF9GdW5jdGlvbjogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBub2RlLmhlaWdodCA9IDE2MCAqIHRoaXMuY2hhdE1lc3NhZ2VBcnJheS5sZW5ndGggKyAzMDtcclxuICAgICAgICB0aGlzLmNvbV9DdXN0b21lclNlcnZpY2UuZ2V0Q2hpbGRCeU5hbWUoXCJzdl9WaWV3XCIpLmdldENvbXBvbmVudChcImNjLlNjcm9sbFZpZXdcIikuc2Nyb2xsVG9Cb3R0b20oLjUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBzZXRTeXN0ZW1NZXNzYWdlX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3lzdGVtTWVzc2FnZUFycmF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtTWVzc2FnZUFycmF5ID0gW107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zeXN0ZW1NZXNzYWdlQXJyYXkgPSBuZXcgQXJyYXkoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29tX1N5c3RlbU1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJ2aV9WaWV3XCIpLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1NZXNzYWdlU2lnbiA9IDA7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZTtcclxuICAgICAgICBub2RlLmFkZENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xyXG4gICAgICAgIG5vZGUuYW5jaG9yWCA9IDA7XHJcbiAgICAgICAgbm9kZS5hbmNob3JZID0gLjU7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5vdmVyZmxvdyA9IDA7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIuacrOeoi+W6j+S7heS+m+a8lOekuuS4peemgei1jOWNmlwiO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuZm9udFNpemUgPSAyNjtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLmxpbmVIZWlnaHQgPSAyODtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHRoaXMuY29tX1N5c3RlbU1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJ2aV9WaWV3XCIpLndpZHRoIC8gMiwgMCk7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1NZXNzYWdlQXJyYXkucHVzaChub2RlKTtcclxuICAgICAgICB0aGlzLmNvbV9TeXN0ZW1NZXNzYWdlLmdldENoaWxkQnlOYW1lKFwidmlfVmlld1wiKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICB0aGlzLm1vdmVTeXN0ZW1NZXNzYWdlX0Z1bmN0aW9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIG1vdmVTeXN0ZW1NZXNzYWdlX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3lzdGVtTWVzc2FnZUFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG1vdmVQb2ludCA9IGNjLm1vdmVCeSg4LCAtdGhpcy5zeXN0ZW1NZXNzYWdlQXJyYXlbdGhpcy5zeXN0ZW1NZXNzYWdlU2lnbl0ud2lkdGggLSB0aGlzLmNvbV9TeXN0ZW1NZXNzYWdlLmdldENoaWxkQnlOYW1lKFwidmlfVmlld1wiKS53aWR0aCwgMCk7XHJcbiAgICAgICAgICAgIHZhciBkZWxheVRpbWUgPSBjYy5kZWxheVRpbWUoMik7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBjYy5zZXF1ZW5jZShtb3ZlUG9pbnQsIGRlbGF5VGltZSwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3lzdGVtTWVzc2FnZUFycmF5Lmxlbmd0aCA+IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3lzdGVtTWVzc2FnZUFycmF5Lmxlbmd0aCAtIDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbV9TeXN0ZW1NZXNzYWdlLmdldENoaWxkQnlOYW1lKFwidmlfVmlld1wiKS5jaGlsZHJlbltpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtTWVzc2FnZUFycmF5LnNwbGljZSgwLCB0aGlzLnN5c3RlbU1lc3NhZ2VBcnJheS5sZW5ndGggLSA1KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbU1lc3NhZ2VTaWduID0gdGhpcy5zeXN0ZW1NZXNzYWdlQXJyYXkubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zeXN0ZW1NZXNzYWdlU2lnbiA8IHRoaXMuc3lzdGVtTWVzc2FnZUFycmF5Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbU1lc3NhZ2VTaWduKys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtTWVzc2FnZVNpZ24gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlU3lzdGVtTWVzc2FnZV9GdW5jdGlvbigpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtTWVzc2FnZUFycmF5W3RoaXMuc3lzdGVtTWVzc2FnZVNpZ25dLnNldFBvc2l0aW9uKHRoaXMuY29tX1N5c3RlbU1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJ2aV9WaWV3XCIpLndpZHRoIC8gMiwgMCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbU1lc3NhZ2VBcnJheVt0aGlzLnN5c3RlbU1lc3NhZ2VTaWduXS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0geyp9IG1zZyBcclxuICAgICAqL1xyXG4gICAgdXBkYXRlU3lzdGVtTWVzc2FnZV9GdW5jdGlvbjogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgIGlmICghdGhpcy5zeXN0ZW1NZXNzYWdlQXJyYXkpIHJldHVybjtcclxuICAgICAgICB2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgbm9kZS5hZGRDb21wb25lbnQoXCJjYy5MYWJlbFwiKTtcclxuICAgICAgICBub2RlLmFuY2hvclggPSAwO1xyXG4gICAgICAgIG5vZGUuYW5jaG9yWSA9IC41O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikub3ZlcmZsb3cgPSAwO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gbXNnO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuZm9udFNpemUgPSAyNjtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLmxpbmVIZWlnaHQgPSAyODtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHRoaXMuY29tX1N5c3RlbU1lc3NhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJ2aV9WaWV3XCIpLndpZHRoIC8gMiwgMCk7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1NZXNzYWdlQXJyYXkucHVzaChub2RlKTtcclxuICAgICAgICB0aGlzLmNvbV9TeXN0ZW1NZXNzYWdlLmdldENoaWxkQnlOYW1lKFwidmlfVmlld1wiKS5hZGRDaGlsZChub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vmuLjmiI/mjInpkq5cclxuICAgICAqIEBwYXJhbSB7Kn0gaW5kZXggXHJcbiAgICAgKi9cclxuICAgIGdhbWVNZW51QnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHRoaXMuY29tX0J1dHRvbi5nZXRDaGlsZEJ5TmFtZShcImJ0X0dhbWVNZW51QmFja1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29tX0J1dHRvbi5nZXRDaGlsZEJ5TmFtZShcImJ0X01haWxcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbV9CdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJidF9TZXR0aW5nXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy/pmpDol4/lrZDoioLngrnkuIvnmoTlhajpg6jmjInpkq5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1lbnVcIikuY29tX0dhbWVNZW51LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1lbnVcIikuY29tX0dhbWVNZW51LmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNZW51XCIpLmNvbV9HYW1lTWVudS5nZXRDaGlsZEJ5TmFtZShpbmRleCkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbV9CRy5nZXRDaGlsZEJ5TmFtZShcInJvb21zZWxlY3RiZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29tX0JHLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76L+U5Zue5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIGdhbWVNZW51QmFja0J1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jb21fQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiYnRfR2FtZU1lbnVCYWNrXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29tX0J1dHRvbi5nZXRDaGlsZEJ5TmFtZShcImJ0X01haWxcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbV9CdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJidF9TZXR0aW5nXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy/pmpDol4/lrZDoioLngrnkuIvnmoTlhajpg6jmjInpkq5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1lbnVcIikuY29tX0dhbWVNZW51LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1lbnVcIikuY29tX0dhbWVNZW51LmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG1lbnVMaXN0ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWVudVwiKS5jb21fR2FtZU1lbnUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lX2ljb25saXN0XCIpO1xyXG4gICAgICAgIC8v5pi+56S65ri45oiP5oyJ6ZKu5YiX6KGoXHJcbiAgICAgICAgbWVudUxpc3QuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbV9CRy5nZXRDaGlsZEJ5TmFtZShcInJvb21zZWxlY3RiZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbV9CRy5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76K6+572u5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbGYgXHJcbiAgICAgKiBAcGFyYW0geyp9IHR5cGUgXHJcbiAgICAgKi9cclxuICAgIHNldHRpbmdDb250cm9sQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uIChzZWxmLCB0eXBlKSB7XHJcbiAgICAgICAgdmFyIG1vdmVQb2ludCwgYWN0aW9uO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJJbmZvLm11c2ljQ29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVQb2ludCA9IGNjLm1vdmVCeSguMSwgLTEyMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gY2Muc2VxdWVuY2UobW92ZVBvaW50LCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5tdXNpY0NvbnRyb2wgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3Bfc2V0dGluZ0NvbnRyb2xbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGVVc2VyU2V0dGluZ0RhdGVfRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmJnbU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVQb2ludCA9IGNjLm1vdmVCeSguMSwgMTIwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSBjYy5zZXF1ZW5jZShtb3ZlUG9pbnQsIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLm11c2ljQ29udHJvbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF9zZXR0aW5nQ29udHJvbFsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0ZVVzZXJTZXR0aW5nRGF0ZV9GdW5jdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJnbU51bWJlciA9IGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdV9Mb2JieUJHTSwgdHJ1ZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVySW5mby5zb3VuZEVmZmVjdENvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlUG9pbnQgPSBjYy5tb3ZlQnkoLjEsIC0xMjAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IGNjLnNlcXVlbmNlKG1vdmVQb2ludCwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckluZm8uc291bmRFZmZlY3RDb250cm9sID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX3NldHRpbmdDb250cm9sWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXRlVXNlclNldHRpbmdEYXRlX0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlUG9pbnQgPSBjYy5tb3ZlQnkoLjEsIDEyMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gY2Muc2VxdWVuY2UobW92ZVBvaW50LCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5zb3VuZEVmZmVjdENvbnRyb2wgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3Bfc2V0dGluZ0NvbnRyb2xbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGVVc2VyU2V0dGluZ0RhdGVfRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5nZXRDaGlsZEJ5TmFtZShcInNwX0NvbnRyb2xcIikucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCG6K6+572u5pWw5o2u5YaZ5YWl57yT5a2Y5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHdyaXRlVXNlclNldHRpbmdEYXRlX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIG11c2ljQ29udHJvbDogdGhpcy5wbGF5ZXJJbmZvLm11c2ljQ29udHJvbCxcclxuICAgICAgICAgICAgc291bmRFZmZlY3RDb250cm9sOiB0aGlzLnBsYXllckluZm8uc291bmRFZmZlY3RDb250cm9sXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8ud3JpdGVEYXRhX0Z1bmN0aW9uKFwidXNlclNldHRpbmdcIiwgZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pat5byA6L+e5o6lXHJcbiAgICAgKi9cclxuICAgIGNoZWNrTmV0V29ya0Nvbm5lY3RlZF9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpc2Nvbm5ldGVkO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4reaWrXNvY2tldOacjeWKoeWZqFxyXG4gICAgICogQHBhcmFtIHsqfSBtc2cgXHJcbiAgICAgKi9cclxuICAgIG5ldFdvcmtEaXNjb25uZXRlZF9GdW5jdGlvbjogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbV9UaXBzID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKG1zZywgMCwgNCk7XHJcbiAgICAgICAgdGhpcy5kaXNjb25uZXRlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSB8fCB0aGlzLm5ldFdvcmsuc29ja2V0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0V29yay5zb2NrZXQuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLnNvY2tldCA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN5paw6L+e5o6lXHJcbiAgICAgKi9cclxuICAgIHJlY29ubnRldGVkR2FtZV9GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucGxheWVySW5mby5pc0F1dG9Mb2dpbikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHZhciBhY2NvdW50ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChcIkxvYmJ5UmVnaXN0ZXJcIikuYWNjb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBwYXNzd29yZCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJMb2JieVJlZ2lzdGVyXCIpLnBhc3N3b3JkO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmV0V29yay5zb2NrZXQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5ldFdvcmsuc29ja2V0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHNvY2tldCBpbiB0aGlzLm5ldFdvcmsuc29ja2V0LiRldmVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvY2tldCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXRXb3JrLnNvY2tldC5yZW1vdmVMaXN0ZW4oc29ja2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ldFdvcmsuc29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ldFdvcmsuY29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwibGJfVGlwc1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIuato+WcqOmHjeaWsOi/nuaOpVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXRXb3JrLmxvZ2luQWNjb3VudF9GdW5jdGlvbih0aGlzLnBsYXllckluZm8ubG9naW5JcCwgYWNjb3VudCwgcGFzc3dvcmQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV0V29yay5hY2NvdW50Q2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5q2j5Zyo6YeN5paw6L+e5o6lXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ldFdvcmsubG9naW5BY2NvdW50X0Z1bmN0aW9uKHRoaXMucGxheWVySW5mby5sb2dpbklwLCBudWxsLCBudWxsLCB0aGlzLnBsYXllckluZm8ubG9naW5Db2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvmm7TmlrBcclxuICAgICAqIEBwYXJhbSB7Kn0gZ2FtZU5hbWUgXHJcbiAgICAgKi9cclxuICAgIGNoZWNrVXBkYXRlX0Z1bmN0aW9uOiBmdW5jdGlvbiAoZ2FtZU5hbWUpIHtcclxuICAgICAgICBpZiAoZ2FtZU5hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1VwZGF0ZUdhbWVOYW1lID0gZ2FtZU5hbWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrVXBkYXRlR2FtZU5hbWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJnX0JsYWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChcIkdhbWVVcGRhdGVcIikuY2hlY2tHYW1lVXBkYXRlX0Z1bmN0aW9uKHRoaXMuY2hlY2tVcGRhdGVHYW1lTmFtZSk7XHJcbiAgICAgICAgdGhpcy5jaGVja1VwZGF0ZVRpbWVPdXQgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuaPkOekuuahhlxyXG4gICAgICogQHBhcmFtIHsqfSBtc2cgXHJcbiAgICAgKiBAcGFyYW0geyp9IHR5cGUgXHJcbiAgICAgKiBAcGFyYW0geyp9IG9wZXJhdGlvblR5cGUgXHJcbiAgICAgKi9cclxuICAgIG1lc3NhZ2VCb3hDYWxsQmFja19GdW5jdGlvbjogZnVuY3Rpb24gKG1zZywgdHlwZSwgb3BlcmF0aW9uVHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94X0NCLmdldENoaWxkQnlOYW1lKFwiYnRfQ29uZmlybVwiKS5zZXRQb3NpdGlvbigwLCAtMTMwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3hfQ0IuZ2V0Q2hpbGRCeU5hbWUoXCJidF9DYW5jZWxcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveF9DQi5nZXRDaGlsZEJ5TmFtZShcImJ0X0NvbmZpcm1cIikuc2V0UG9zaXRpb24oLTEyMCwgLTEzMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94X0NCLmdldENoaWxkQnlOYW1lKFwiYnRfQ2FuY2VsXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveF9DQi5hY3RpdmUgPSB0cnVlLFxyXG4gICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94X0NCLmdldENoaWxkQnlOYW1lKFwibGJfVGlwc1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBtc2csXHJcbiAgICAgICAgICAgIHRoaXMub3BlcmF0aW9uVHlwZSA9IG9wZXJhdGlvblR5cGVcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmj5DnpLrkv6Hmga9cclxuICAgICAqIEBwYXJhbSB7Kn0gbXNnIFxyXG4gICAgICogQHBhcmFtIHsqfSB0eXBlIFxyXG4gICAgICogQHBhcmFtIHsqfSBvcGVyYXRpb25UeXBlIFxyXG4gICAgICovXHJcbiAgICBzaG93TWVzc2FnZWJveF9GdW5jdGlvbjogZnVuY3Rpb24gKG1zZywgdHlwZSwgb3BlcmF0aW9uVHlwZSkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnTG9hZGluZycpLmFjdGl2ZSA9IGZhbHNlOyAvL+makOiXj+WKoOi9veeVjOmdolxyXG4gICAgICAgIHRoaXMuYmdfQmxhY2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMzsgaSA8IHRoaXMuY29tX01lc3NhZ2VCb3guY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IG1zZztcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImJ0X1JlY29ubmV0XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiYnRfUmVjb25uZXRcIikuc2V0UG9zaXRpb24oMCwgLTEzMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImJ0X0NvbmZpcm1cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJidF9Db25maXJtXCIpLnNldFBvc2l0aW9uKDAsIC0xMzApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJidF9DYW5jZWxcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJidF9DYW5jZWxcIikuc2V0UG9zaXRpb24oLTEzMCwgLTEzMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiYnRfQ29uZmlybVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImJ0X0NvbmZpcm1cIikuc2V0UG9zaXRpb24oMTMwLCAtMTMwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiYnRfQ2FuY2VsXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiYnRfQ2FuY2VsXCIpLnNldFBvc2l0aW9uKC0xMzAsIC0xMzApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImJ0X0dvVG9NYWxsXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiYnRfR29Ub01hbGxcIikuc2V0UG9zaXRpb24oMTMwLCAtMTMwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwic3BfQXdhcmQwXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwic3BfQXdhcmQwXCIpLnNldFBvc2l0aW9uKDAsIC0yMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiZGJfQXdhcmQwXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiZGJfQXdhcmQwXCIpLnNldFBvc2l0aW9uKDAsIC0yMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGJfQXdhcmQwID0gdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImRiX0F3YXJkMFwiKS5nZXRDb21wb25lbnQoXCJkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXlcIik7XHJcbiAgICAgICAgICAgICAgICBkYl9Bd2FyZDAucGxheUFuaW1hdGlvbihcImRiX0F3YXJkXCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImJ0X0NvbmZpcm1cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJidF9Db25maXJtXCIpLnNldFBvc2l0aW9uKDAsIC0xMzApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJzcF9Bd2FyZDFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJzcF9Bd2FyZDFcIikuc2V0UG9zaXRpb24oMCwgLTIwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJkYl9Bd2FyZDFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJkYl9Bd2FyZDFcIikuc2V0UG9zaXRpb24oMCwgLTIwKTtcclxuICAgICAgICAgICAgICAgIHZhciBkYl9Bd2FyZDEgPSB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiZGJfQXdhcmQxXCIpLmdldENvbXBvbmVudChcImRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheVwiKTtcclxuICAgICAgICAgICAgICAgIGRiX0F3YXJkMS5wbGF5QW5pbWF0aW9uKFwiZGJfQXdhcmRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiYnRfQ29uZmlybVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImJ0X0NvbmZpcm1cIikuc2V0UG9zaXRpb24oMCwgLTEzMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcInNwX0F3YXJkMFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcInNwX0F3YXJkMFwiKS5zZXRQb3NpdGlvbigtODAsIC0yMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwic3BfQXdhcmQxXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwic3BfQXdhcmQxXCIpLnNldFBvc2l0aW9uKDgwLCAtMjApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImRiX0F3YXJkMFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImRiX0F3YXJkMVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImRiX0F3YXJkMFwiKS5zZXRQb3NpdGlvbigtODAsIC0yMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiZGJfQXdhcmQxXCIpLnNldFBvc2l0aW9uKDgwLCAtMjApO1xyXG4gICAgICAgICAgICAgICAgdmFyIGF3YXJkMCA9IHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJkYl9Bd2FyZDBcIikuZ2V0Q29tcG9uZW50KFwiZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGF3YXJkMSA9IHRoaXMuY29tX01lc3NhZ2VCb3guZ2V0Q2hpbGRCeU5hbWUoXCJkYl9Bd2FyZDFcIikuZ2V0Q29tcG9uZW50KFwiZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgYXdhcmQwLnBsYXlBbmltYXRpb24oXCJkYl9Bd2FyZFwiLCAxKTtcclxuICAgICAgICAgICAgICAgIGF3YXJkMS5wbGF5QW5pbWF0aW9uKFwiZGJfQXdhcmRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiYnRfQ29uZmlybVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImJ0X0NvbmZpcm1cIikuc2V0UG9zaXRpb24oMCwgLTEzMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlQm94T3BlcmF0aW9uVHlwZSA9IG9wZXJhdGlvblR5cGU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635b6X6IyD5Zu06ZqP5py65pWwXHJcbiAgICAgKiBAcGFyYW0geyp9IG1pbiBcclxuICAgICAqIEBwYXJhbSB7Kn0gbWF4IFxyXG4gICAgICovXHJcbiAgICBnZXRSYW5kb21fRnVuY3Rpb246IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsFxyXG4gICAgICogQHBhcmFtIHsqfSBkdCBcclxuICAgICAqL1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja1VwZGF0ZVRpbWVPdXQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tVcGRhdGVUaW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwZGF0ZVRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBkYXRlVGltZUxhYmVsID0gcGFyc2VJbnQodGhpcy5jaGVja1VwZGF0ZVRpbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwZGF0ZVRpbWVPdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb2RlVGltZUNvdW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldENvZGVUaW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb2RlVGltZSAtPSBkdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZFBob25lXCIpLmdldENoaWxkQnlOYW1lKFwiYnRfR2V0Q29kZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1RpbWVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gcGFyc2VJbnQodGhpcy5nZXRDb2RlVGltZSkgKyBcInNcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZFBob25lXCIpLmdldENoaWxkQnlOYW1lKFwiYnRfR2V0Q29kZVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1RpbWVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZFBob25lXCIpLmdldENoaWxkQnlOYW1lKFwiYnRfR2V0Q29kZVwiKS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50ZW1wTmV0V29yayAmJiB0aGlzLnRlbXBOZXRXb3JrLmV2ZW50T24pIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnBsYXllckluZm8uZ2FtZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJGaXNoXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yay5maXNoU29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBOZXRXb3JrLmZpc2hTb2NrZXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkJkZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcE5ldFdvcmsuYmRlR2FtZVNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yay5iZGVHYW1lU29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJHcmFiQnVsbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcE5ldFdvcmsuZ3JhYkJ1bGxTb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcE5ldFdvcmsuZ3JhYkJ1bGxTb2NrZXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIlR3b0VpZ2h0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yay50d29FaWdodEdhbWVTb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcE5ldFdvcmsudHdvRWlnaHRHYW1lU29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJCdWxsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yay5idWxsU29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBOZXRXb3JrLmJ1bGxTb2NrZXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkxpbmVHYW1lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yay5saW5lR2FtZUdhbWVTb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcE5ldFdvcmsubGluZUdhbWVHYW1lU29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJMYW5kXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaG9uZ2Jhb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcE5ldFdvcmsuZ2FtZVNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yay5nYW1lU29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHRcdFx0XHRjYXNlIFwiRmlzaGhhaXdhbmcyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yay5maXNoaGFpd2FuZzJTb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcE5ldFdvcmsuZmlzaGhhaXdhbmcyU29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRlbXBOZXRXb3JrLmV2ZW50T24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy50ZW1wTmV0V29yayA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5nYW1lTmFtZSA9IFwiTG9iYnlcIjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFBveHlVSTogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICBjb25zb2xlLmxvZygncG94eTonLCBkYXRhKTtcclxuICAgICAgICBpZiAoISFyZXN1bHQuc3RhdHVzICYmIHJlc3VsdC5zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBveHlVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVBveHlQYWdlKDEpO1xyXG4gICAgICAgICAgICB0aGlzLnBveHlVSS5nZXRDaGlsZEJ5TmFtZSgnZGxfYScpLmdldENoaWxkQnlOYW1lKCdyZW5zaHUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGEubnVtQTtcclxuICAgICAgICAgICAgdGhpcy5wb3h5VUkuZ2V0Q2hpbGRCeU5hbWUoJ2RsX2InKS5nZXRDaGlsZEJ5TmFtZSgncmVuc2h1JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLm51bUI7XHJcbiAgICAgICAgICAgIHRoaXMucG94eVVJLmdldENoaWxkQnlOYW1lKCdkbF9jJykuZ2V0Q2hpbGRCeU5hbWUoJ3JlbnNodScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YS5udW1DO1xyXG4gICAgICAgICAgICB0aGlzLnBveHlVSS5nZXRDaGlsZEJ5TmFtZSgnem9uZ3Nob3V5aScpLmdldENoaWxkQnlOYW1lKCdzaHV6aScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YS5BbGxZb25nSmluO1xyXG4gICAgICAgICAgICB0aGlzLnBveHlVSS5nZXRDaGlsZEJ5TmFtZSgnYmVuemhvdXNoaXNoaScpLmdldENoaWxkQnlOYW1lKCdzaHV6aScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YS5ub3dJbmNvbWU7XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5wb3h5VUkuZ2V0Q2hpbGRCeU5hbWUoJ2NvbV9zeW14JykuZ2V0Q2hpbGRCeU5hbWUoJ2xpc3RfdmlldycpLmdldENoaWxkQnlOYW1lKCd2aWV3JykuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnQnKTtcclxuICAgICAgICAgICAgdmlldy5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICBsZXQgdGltZSA9IGRhdGEudGltZURpZmY7XHJcbiAgICAgICAgICAgIHRoaXMucG94eVRpbWUodGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxfcG94eSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRpbWUtLTtcclxuICAgICAgICAgICAgICAgIHRpbWUgPj0gMCAmJiB0aGlzLnBveHlUaW1lKHRpbWUpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgbGV0IHN0YWNrID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEucGVyc29uLmEpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gZGF0YS5wZXJzb24uYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmFkZTogJ0EnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLnBlcnNvbi5hW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEucGVyc29uLmIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gZGF0YS5wZXJzb24uYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmFkZTogJ0InLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLnBlcnNvbi5iW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEucGVyc29uLmMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gZGF0YS5wZXJzb24uYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmFkZTogJ0MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLnBlcnNvbi5jW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHN0YWNrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbHQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBveHlQYik7XHJcbiAgICAgICAgICAgICAgICB2aWV3LmFkZENoaWxkKGx0KTtcclxuICAgICAgICAgICAgICAgIGxldCBjaCA9IGx0LmdldENoaWxkQnlOYW1lKCdpZCcpLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoW2pdLmFjdGl2ZSA9IGNoW2pdLl9uYW1lID09IHN0YWNrW2ldLmdyYWRlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHJlZCA9IG5ldyBjYy5Db2xvcigyNTUsIDAsIDAsIDI1NSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JlZW4gPSBuZXcgY2MuQ29sb3IoMTA5LCAxNDgsIDQ4LCAyNTUpO1xyXG4gICAgICAgICAgICAgICAgbHQuZ2V0Q2hpbGRCeU5hbWUoJ2lkJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdGFja1tpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgbHQuZ2V0Q2hpbGRCeU5hbWUoJ2Rxa3MnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0YWNrW2ldLmRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICBsdC5nZXRDaGlsZEJ5TmFtZSgnZHFrcycpLmNvbG9yID0gc3RhY2tbaV0uZGF0YVswXSA+PSAwID8gZ3JlZW4gOiByZWQ7XHJcbiAgICAgICAgICAgICAgICBsdC5nZXRDaGlsZEJ5TmFtZSgnemtzJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdGFja1tpXS5kYXRhWzFdO1xyXG4gICAgICAgICAgICAgICAgbHQuZ2V0Q2hpbGRCeU5hbWUoJ3prcycpLmNvbG9yID0gc3RhY2tbaV0uZGF0YVsxXSA+PSAwID8gZ3JlZW4gOiByZWQ7XHJcbiAgICAgICAgICAgICAgICBsdC5nZXRDaGlsZEJ5TmFtZSgnc3NzeScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RhY2tbaV0uZGF0YVsyXTtcclxuICAgICAgICAgICAgICAgIGx0LmdldENoaWxkQnlOYW1lKCdzc3N5JykuY29sb3IgPSBzdGFja1tpXS5kYXRhWzJdID49IDAgPyBncmVlbiA6IHJlZDtcclxuICAgICAgICAgICAgICAgIGx0LmdldENoaWxkQnlOYW1lKCdzc3N5MScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RhY2tbaV0uZGF0YVszXTtcclxuICAgICAgICAgICAgICAgIGx0LmdldENoaWxkQnlOYW1lKCdzc3N5MScpLmNvbG9yID0gc3RhY2tbaV0uZGF0YVszXSA+PSAwID8gZ3JlZW4gOiByZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCEhcmVzdWx0LnN0YXR1cyAmJiByZXN1bHQuc3RhdHVzID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihcIumdnuS7o+eQhuS6uuWRmOaXoOazleafpeeci1wiLCAxLCA0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBveHlUaW1lOiBmdW5jdGlvbiAodGltZSkge1xyXG4gICAgICAgIGxldCBkYXkgPSBwYXJzZUludCh0aW1lIC8gODY0MDApO1xyXG4gICAgICAgIGxldCBob3VyID0gcGFyc2VJbnQodGltZSAvIDM2MDAgJSAyNCk7XHJcbiAgICAgICAgbGV0IG1pbiA9IHBhcnNlSW50KHRpbWUgLyA2MCAlIDYwKTtcclxuICAgICAgICBsZXQgc2VjID0gcGFyc2VJbnQodGltZSAlIDYwKTtcclxuICAgICAgICBsZXQgdGltZUxibCA9IHRoaXMucG94eVVJLmdldENoaWxkQnlOYW1lKCdiZycpLmdldENoaWxkQnlOYW1lKCd0aW1lJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aW1lTGJsLnN0cmluZyA9IGDot53nprvnu5Pnrpfov5jmnIkke2RheX3lpKkke2hvdXJ95bCP5pe2JHttaW595YiG6ZKfJHtzZWN956eSYDtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlUG94eVBhZ2U6IGZ1bmN0aW9uIChwYWdlKSB7XHJcbiAgICAgICAgaWYgKHBhZ2UgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBveHlVSS5nZXRDaGlsZEJ5TmFtZSgnYnRuX3N5bXgnKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wb3h5VUkuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl90Z2pjJykuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wb3h5VUkuZ2V0Q2hpbGRCeU5hbWUoJ2NvbV9zeW14JykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wb3h5VUkuZ2V0Q2hpbGRCeU5hbWUoJ2NvbV90Z2pjJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3h5VUkuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9zeW14JykuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wb3h5VUkuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl90Z2pjJykuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucG94eVVJLmdldENoaWxkQnlOYW1lKCdjb21fc3lteCcpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBveHlVSS5nZXRDaGlsZEJ5TmFtZSgnY29tX3RnamMnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2VQb3h5VUk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxfcG94eSk7XHJcbiAgICAgICAgdGhpcy5wb3h5VUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZU1hbGxVSTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgdGhpcy5jb21fTWFsbC5nZXRDaGlsZEJ5TmFtZSgnY29tX2Nob25nemhpXzAxJykuYWN0aXZlID0gaWQgPT0gMDtcclxuICAgICAgICB0aGlzLmNvbV9NYWxsLmdldENoaWxkQnlOYW1lKCdjb21fa2VmdWxpc3QnKS5hY3RpdmUgPSBpZCA9PSAxO1xyXG4gICAgICAgIHRoaXMuY29tX01hbGwuZ2V0Q2hpbGRCeU5hbWUoJ2NvbV9DdXN0b21lclNlcnZpY2UnKS5hY3RpdmUgPSBpZCA9PSAyO1xyXG4gICAgICAgIHRoaXMuY29tX01hbGwuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9rZWZ1emhpY2hvbmcnKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBpZCA9PSAwO1xyXG4gICAgICAgIHRoaXMuY29tX01hbGwuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl94aWFuc2hhbmcnKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBpZCAhPSAwO1xyXG4gICAgICAgIGlmIChpZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIEhlbHBlci5odHRwKCdodHRwOi8vZ2FtZS5idWxsc3RzLmNvbS9pbmRleC5waHAvYXBpL2tlZnUvbGlzdHMnKS50aGVuKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W+l+WIsOacjeWKoeWZqOS/oeaBrycgKyBKU09OLnN0cmluZ2lmeShlKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFlLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGIgPSB0aGlzLmNvbV9NYWxsLmdldENoaWxkQnlOYW1lKCdjdXN0b21TZXJ2ZXJQYicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwciA9IHRoaXMuY29tX01hbGwuZ2V0Q2hpbGRCeU5hbWUoJ2NvbV9rZWZ1bGlzdCcpLmdldENoaWxkQnlOYW1lKCdzY3JvbGx2aWV3JykuZ2V0Q2hpbGRCeU5hbWUoJ3ZpZXcnKS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBlLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBjYy5pbnN0YW50aWF0ZShwYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAuZ2V0Q2hpbGRCeU5hbWUoJ2tlZnVfbmFtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZS5kYXRhW2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9zaG9wX3JlY2hhcmdlMV8wJykuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHNbMF0uY3VzdG9tRXZlbnREYXRhID0gSlNPTi5zdHJpbmdpZnkoZS5kYXRhW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwci5hZGRDaGlsZChwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaWQgPT0gMikge1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IHRoaXMuY29tX0N1c3RvbWVyU2VydmljZS5nZXRDaGlsZEJ5TmFtZShcInN2X1ZpZXdcIikuZ2V0Q29tcG9uZW50KFwiY2MuU2Nyb2xsVmlld1wiKS5jb250ZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNoYXRNZXNzYWdlQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgdmlldy5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+aYvuekunZpcOeVjOmdolxyXG4gICAgc2hvd192aXAoKSB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShuZXcgRGF0ZSgpLnNldEhvdXJzKDAsIDAsIDAsIDApKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgaWYgKGRhdGUgPT0gdGhpcy5wbGF5ZXJJbmZvLnJlYWREYXRhX0Z1bmN0aW9uKFwidG9kYXlUaW1lXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tX3ZpcC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbV92aXAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLndyaXRlRGF0YV9GdW5jdGlvbihcInRvZGF5VGltZVwiLCBkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbn0pOyJdfQ==