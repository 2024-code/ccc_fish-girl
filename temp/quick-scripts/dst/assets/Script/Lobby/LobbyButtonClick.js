
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/LobbyButtonClick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd60clQofxEIaFBPgBXNRnz', 'LobbyButtonClick');
// Script/Lobby/LobbyButtonClick.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    canvasNode: {
      "default": null,
      type: cc.Node
    }
  },
  onLoad: function onLoad() {},

  /**
   * 点击登陆
   */
  loginMenuLoginButtonClick_Function: function loginMenuLoginButtonClick_Function() {
    var account = this.canvasNode.getComponent("LobbyMain").com_Login.getChildByName("eb_Account").getComponent("cc.EditBox").string;
    var password = this.canvasNode.getComponent("LobbyMain").com_Login.getChildByName("eb_Password").getComponent("cc.EditBox").string;
    this.canvasNode.getComponent("LobbyMain").netWork.loginClick = true;

    if (account !== "" && password !== "") {
      var self = this;
      setTimeout(function () {
        self.canvasNode.getComponent("LobbyMain").netWork.accountChange = true;
        self.canvasNode.getComponent("LobbyMain").netWork.loginAccount_Function(self.canvasNode.getComponent("LobbyMain").playerInfo.loginIp, account, password);
      }, 1000);
      this.node.getComponent("cc.Button").interactable = false;
    }
  },

  /**
   * 点击打开注册界面
   */
  loginMenuRegisterButtonClick_Function: function loginMenuRegisterButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_Login.active = false;
    this.canvasNode.getComponent("LobbyMain").com_Register.active = true;
  },

  /**
   * 点击关闭注册界面
   */
  registerMenuBackToLoginButtonClick_Function: function registerMenuBackToLoginButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_Login.active = true;
    this.canvasNode.getComponent("LobbyMain").com_Register.active = false;
  },

  /**
   * 点击注册
   */
  registerMenuRegisterButtonClick_Function: function registerMenuRegisterButtonClick_Function() {
    var account = this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("eb_Account").getComponent("cc.EditBox").string;
    var password = this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("eb_Password").getComponent("cc.EditBox").string;
    var confirm = this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string;

    if (!account) {
      this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("eb_Account").getComponent("cc.EditBox").string = "not null";
      return;
    }

    if (!password) {
      this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("eb_Password").getComponent("cc.EditBox").string = "not null";
      return;
    }

    if (account && password && confirm) {
      if (password.length < 6) {
        this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("eb_Password").getComponent("cc.EditBox").string = "No less than 6 English words or numbers";
        return;
      }

      if (account.length < 11) {
        this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("eb_Account").getComponent("cc.EditBox").string = "No less than 11 English words or numbers";
        return;
      } // if (password !== confirm) {
      //    
      //     return;
      // }


      if (!this.canvasNode.getComponent("LobbyRegister").com_Register.getChildByName("con_register").getChildByName("Label").getComponent('ReturnRegistered')) {
        this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string = "The two verification codes are different";
        return;
      }

      this.canvasNode.getComponent("LobbyRegister").mlapiRegister_Function(account, password);
    }
  },

  /**
   * 
   */
  playerInfoButtonClick_Function: function playerInfoButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = true;
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
  },

  /**
   * 
   */
  mallButtonClick_Function: function mallButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
    this.canvasNode.getComponent("LobbyMain").com_Mall.active = true;
    this.canvasNode.getComponent("LobbyMain").changeMallUI(0);
    this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName("com_chongzhi_01").getChildByName("lb_PlayerId").getComponent("cc.Label").string = "ID: " + this.canvasNode.getComponent("LobbyMain").playerInfo.playerId;
  },

  /**
   * 
   */
  mallMenuBackButtonClick_Function: function mallMenuBackButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
    this.canvasNode.getComponent("LobbyMain").com_Mall.active = false;
  },

  /**
   * 
   */
  mallMenuRechangeButtonClick_Function: function mallMenuRechangeButtonClick_Function() {
    var index = 0;

    switch (this.node.rechargeId) {
      case 0:
        index = 0;
        break;

      case 1:
        index = 1;
        break;

      case 2:
        index = 2;
        break;

      case 3:
        index = 3;
    }

    var money = this.canvasNode.getComponent("LobbyMain").rechargeMoneyArray[index];
    this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName("com_chongzhi_01").getChildByName("eb_RechargeMoney").getComponent("cc.EditBox").string = money.toString();
  },

  /**
   * 
   */
  mallMenuAliPayButtonClick_Function: function mallMenuAliPayButtonClick_Function() {
    var money = parseFloat(this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName('com_chongzhi_01').getChildByName("eb_RechargeMoney").getComponent("cc.EditBox").string); //if (money && money >= 50) {

    this.canvasNode.getComponent("LobbyMain").pay_Function(money, null, 2); //}
  },

  /**
   * 
   */
  mallMenuWeChatPayButtonClick_Function: function mallMenuWeChatPayButtonClick_Function() {
    var money = parseFloat(this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName("com_chongzhi_01").getChildByName("eb_RechargeMoney").getComponent("cc.EditBox").string); //if (money && money >= 50) {

    this.canvasNode.getComponent("LobbyMain").pay_Function(money, null, 1); //}
  },

  /**
   * 
   */
  mallMenuQqPayButtonClick_Function: function mallMenuQqPayButtonClick_Function() {
    var money = parseFloat(this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName("com_chongzhi_01").getChildByName("eb_RechargeMoney").getComponent("cc.EditBox").string); //if (money && money >= 50) {

    this.canvasNode.getComponent("LobbyMain").pay_Function(money, null, 2); //}
  },
  mallMenuQuickPayButtonClick_Function: function mallMenuQuickPayButtonClick_Function() {},

  /**
   * 
   */
  rechargeWebViewCloseButtonClick_Function: function rechargeWebViewCloseButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName("com_RechargeWeb").active = false;
  },

  /**
   * 
   */
  mailButtonClick_Function: function mailButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
    this.canvasNode.getComponent("LobbyMain").com_Mail.active = true;
    this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("getEmail");
  },

  /**
   * 
   */
  mailMenuCloseButtonClick_Function: function mailMenuCloseButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_Mail.active = false;
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
  },

  /**
   * 
   */
  mailMenuMailSelectButtonClick: function mailMenuMailSelectButtonClick() {
    this.canvasNode.getMailInfo_Function(this);
  },

  /**
   * 
   */
  mailMenuGetButtonClick_Function: function mailMenuGetButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").getMail_Function();
  },

  /**
   * 点击打开设置界面
   */
  settingButtonClick_Function: function settingButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
    this.canvasNode.getComponent("LobbyMain").com_Setting.active = true;
  },

  /**
   * 点击关闭设置界面
   */
  settingMenuCloseButtonClick_Function: function settingMenuCloseButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
    this.canvasNode.getComponent("LobbyMain").com_Setting.active = false;
  },

  /**
   * 点击背景音乐按钮
   */
  settingMenuMusicButtonClick_Function: function settingMenuMusicButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").settingControlButtonClick_Function(this.node, 0);
  },

  /**
   * 点击游戏音效按钮
   */
  settingMenuSoundEffectButtonClick_Function: function settingMenuSoundEffectButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").settingControlButtonClick_Function(this.node, 1);
  },

  /**
   * 点击设置面板中的退出游戏按钮
   */
  settingMenuExitButtonClick_Function: function settingMenuExitButtonClick_Function() {
    cc.game.end();
  },

  /**
   * 点击分享按钮
   */
  shareButtonClick_Function: function shareButtonClick_Function() {
    var channel = this.canvasNode.getComponent("LobbyMain").netWork.getUrlCode_Function("channel");

    if (channel) {
      cc.sys.openURL(this.canvasNode.getComponent("LobbyMain").playerInfo.shareUrl + "?channel=" + channel);
      return;
    } else {
      channel = this.canvasNode.getComponent("LobbyMain").playerInfo.guest.split("_");
      cc.sys.openURL(this.canvasNode.getComponent("LobbyMain").playerInfo.shareUrl + "?channel=" + channel[0]);
      return;
    }
  },

  /**
   * 点击兑换按钮
   */
  exchangeButtonClick_Function: function exchangeButtonClick_Function() {
    cc.log('点击兑换按钮============');
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;

    if (this.canvasNode.getComponent("LobbyMain").playerInfo.isOffical) {
      if (!this.canvasNode.getComponent("LobbyMain").playerInfo.aliAccount && this.canvasNode.getComponent("LobbyMain").playerInfo.isBindAli) {
        this.canvasNode.getComponent("LobbyMain").showMessagebox_Function("兑现必须绑定支付宝,\n\n要前去绑定支付宝吗?", 2, 2);
      } else {//打开兑换界面
      }
    } else {
      this.canvasNode.getComponent("LobbyMain").showMessagebox_Function("兑现必须绑定账号,\n\n要前去绑定账号吗?", 2, 1);
    }
  },

  /**
   * 
   */
  customerServiceButtonClick_Function: function customerServiceButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
    this.canvasNode.getComponent("LobbyMain").com_CustomerService.active = true;
  },
  customerServiceMenuSendButtonClick_Function: function customerServiceMenuSendButtonClick_Function() {
    var e = this.canvasNode.getComponent("LobbyMain").com_CustomerService.getChildByName("eb_Chat").getComponent("cc.EditBox").string;
    "" !== e && (this.canvasNode.getComponent("LobbyMain").sendMessage = e, this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("sendMsgToUser", {
      userId: 10,
      msg: e
    })), this.canvasNode.getComponent("LobbyMain").com_CustomerService.getChildByName("eb_Chat").getComponent("cc.EditBox").string = "";
  },

  /**
   * 
   */
  customerServiceMenuCloseButtonClick_Function: function customerServiceMenuCloseButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
    this.canvasNode.getComponent("LobbyMain").com_CustomerService.active = false;
  },

  /**
   * 点击抢庄牛牛按钮
   */
  grabBullButtonClick_Function: function grabBullButtonClick_Function() {
    if (cc.sys.isNative && this.canvasNode.getComponent("LobbyMain").playerInfo.needToUpdate[1]) {
      this.canvasNode.getComponent("LobbyMain").checkUpdate_Function("GrabBull");
    } else {
      this.canvasNode.getComponent("LobbyMain").gameMenuButtonClick_Function("com_GrabBull");
    }
  },

  /**
   * 点击斗地主按钮
   */
  landButtonClick_Function: function landButtonClick_Function() {
    if (cc.sys.isNative && this.canvasNode.getComponent("LobbyMain").playerInfo.needToUpdate[7]) {
      this.canvasNode.getComponent("LobbyMain").checkUpdate_Function("Land");
    } else {
      this.canvasNode.getComponent("LobbyMain").gameMenuButtonClick_Function("com_Land");
    }
  },

  /**
   * 点击红包达人按钮
   */
  hongbao_ButtonClick_Function: function hongbao_ButtonClick_Function() {
    if (cc.sys.isNative && this.canvasNode.getComponent("LobbyMain").playerInfo.needToUpdate[1]) {
      this.canvasNode.getComponent("LobbyMain").checkUpdate_Function("Game_hongbao");
    } else {
      this.canvasNode.getComponent("LobbyMain").gameMenuButtonClick_Function("com_Hongbao");
    }
  },

  /**
   * 点击跑得快按钮
   */
  runButtonClick_Function: function runButtonClick_Function() {
    if (cc.sys.isNative && this.canvasNode.getComponent("LobbyMain").playerInfo.needToUpdate[7]) {
      this.canvasNode.getComponent("LobbyMain").checkUpdate_Function("Runing");
    } else {
      this.canvasNode.getComponent("LobbyMain").gameMenuButtonClick_Function("com_Run");
    }
  },

  /**
   * 点击德州扑克按钮
   */
  dzButtonClick_Function: function dzButtonClick_Function() {
    if (cc.sys.isNative && this.canvasNode.getComponent("LobbyMain").playerInfo.needToUpdate[7]) {
      this.canvasNode.getComponent("LobbyMain").checkUpdate_Function("Holdem");
    } else {
      this.canvasNode.getComponent("LobbyMain").gameMenuButtonClick_Function("com_Holdem");
    }
  },

  /**
   * 点击诈金花按钮
   */
  zjhButtonClick_Function: function zjhButtonClick_Function() {
    if (cc.sys.isNative && this.canvasNode.getComponent("LobbyMain").playerInfo.needToUpdate[7]) {
      this.canvasNode.getComponent("LobbyMain").checkUpdate_Function("Flower");
    } else {
      this.canvasNode.getComponent("LobbyMain").gameMenuButtonClick_Function("com_Flower");
    }
  },

  /**
   * 点击财神到按钮
   */
  CaishendaoButtonClick_Function: function CaishendaoButtonClick_Function() {
    window.CAISHEN_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_CaishenGold');
  },

  /**
   * 点击上海00发按钮
   */
  SH00FButtonClick_Function: function SH00FButtonClick_Function() {
    window.SH00F_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Shanghai00fa');
  },

  /**
   * 点击太极熊猫按钮
   */
  TaijiPandaButtonClick_Function: function TaijiPandaButtonClick_Function() {
    window.TaijiPanda_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Taijixiongmao');
  },

  /**
  * 点击梦幻女神按钮
  */
  MHNSButtonClick_Function: function MHNSButtonClick_Function() {
    window.MHNS_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Menghuannvshen');
  },

  /**
  * 点击旺宝按钮
  */
  WBClick_Function: function WBClick_Function() {
    window.WB_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Wangbao');
  },

  /**
  * 点击一路发发按钮
  */
  YLFFButtonClick_Function: function YLFFButtonClick_Function() {
    window.YLFFF_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Yilufafafa');
  },

  /**
  * 点击五福临门按钮
  */
  WFLMButtonClick_Function: function WFLMButtonClick_Function() {
    window.WFLM_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Wufulinmen');
  },

  /**
   * 点击忠肝义胆按钮
   */
  ZHYDButtonClick_Function: function ZHYDButtonClick_Function() {
    window.ZGYD_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Zhongganyidan');
  },

  /**
   * 点击玉蒲团2按钮
   */
  YPT2ButtonClick_Function: function YPT2ButtonClick_Function() {
    window.YPT2_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Yuputuan2');
  },

  /**
   * 点击潘金莲按钮
   */
  PJLButtonClick_Function: function PJLButtonClick_Function() {
    window.PJL_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Panjinlian');
  },

  /**
   * 点击哪吒闹海按钮
   */
  NZNHButtonClick_Function: function NZNHButtonClick_Function() {
    window.NZNH_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Nezhanaohai');
  },

  /**
   * 点击吕布戏貂蝉按钮
   */
  LBXDCButtonClick_Function: function LBXDCButtonClick_Function() {
    window.LBXDC_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Lvbuxidiaochan');
  },

  /**
   * 点击水果钻石按钮
   */
  DiamondButtonClick_Function: function DiamondButtonClick_Function() {
    window.DIAMOND_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_DiamondStrike');
  },

  /**
   * 点击财源滚滚按钮
   */
  CYGGButtonClick_Function: function CYGGButtonClick_Function() {
    window.CYGG_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Caiyuangungun');
  },

  /**
   * 点击埃及珍宝按钮
   */
  EFButtonClick_Function: function EFButtonClick_Function() {
    window.EF_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_EgyptianTreasures');
  },

  /**
  * 点击冰球突破按钮
  */
  BQTPButtonClick_Function: function BQTPButtonClick_Function() {
    window.BQTP_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_bingqiutupo');
  },

  /**
  * 点击美女游泳队按钮
  */
  MNYYDButtonClick_Function: function MNYYDButtonClick_Function() {
    window.MNYYD_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Meinvyouyongdui');
  },

  /**
  * 点击月光宝盒按钮
  */
  YGBHButtonClick_Function: function YGBHButtonClick_Function() {
    window.YGBH_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_yueguangbaohe');
  },

  /**
  * 点击僵尸先生按钮
  */
  JSXSButtonClick_Function: function JSXSButtonClick_Function() {
    window.JSXS_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Jiangshixiansheng');
  },

  /**
  * 点击水浒传按钮
  */
  SHZButtonClick_Function: function SHZButtonClick_Function() {
    window.SHZ_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Shuihuzhuan');
  },
  GreatBlueButtonClick_Function: function GreatBlueButtonClick_Function() {
    window.GreatBlue_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_GreatBlue');
  },
  TrexClick_Function: function TrexClick_Function() {
    window.trex_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_trex');
  },
  IrishLuckButtonClick_Function: function IrishLuckButtonClick_Function() {
    window.IrishLuck_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_IrishLuck');
  },
  IcelandButtonClick_Function: function IcelandButtonClick_Function() {
    window.Iceland_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Iceland');
  },
  PantherMoonButtonClick_Function: function PantherMoonButtonClick_Function() {
    window.PantherMoon_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_PantherMoon');
  },
  IndianMythButtonClick_Function: function IndianMythButtonClick_Function() {
    window.IndianMyth_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_IndianMyth');
  },
  JapanFortureButtonClick_Function: function JapanFortureButtonClick_Function() {
    window.JapanForture_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_JapanForture');
  },
  BonusBearsButtonClick_Function: function BonusBearsButtonClick_Function() {
    window.BonusBears_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_BonusBears');
  },

  /**
   * 点击水果机按钮
   */
  ShuiguojiButtonClick_Function: function ShuiguojiButtonClick_Function() {
    this.QieHuanScene('game_shuiguoji');
  },

  /**
  * 点击水果机竖版 按钮
  */
  ShuiguojishubanButtonClick_Function: function ShuiguojishubanButtonClick_Function() {
    this.QieHuanScene('game_shuiguoji_shuban');
  },

  /**
  * 点击铃铛游戏按钮
  */
  LingdangyouxiButtonClick_Function: function LingdangyouxiButtonClick_Function() {
    this.QieHuanScene('game_lingdangyouxi');
  },

  /**
   * 点击Safari按钮
   */
  SafariButtonClick_Function: function SafariButtonClick_Function() {
    this.QieHuanScene('game_Safari');
  },

  /**
  * 点击RomeGlory按钮
  */
  RomeGloryButtonClick_Function: function RomeGloryButtonClick_Function() {
    window.ROMA_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_RomeGlory');
  },

  /**
  * 点击RomeGlory按钮
  */
  jokerButtonClick_Function: function jokerButtonClick_Function() {
    this.QieHuanScene('Slot_joker');
  },

  /**
  * 点击alading按钮
  */
  aladingButtonClick_Function: function aladingButtonClick_Function() {
    window.ALADING_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Alading');
  },

  /**
  * 点击锦衣卫按钮
  */
  jinyiweiButtonClick_Function: function jinyiweiButtonClick_Function() {
    window.JYW_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Jinyiwei');
  },
  sandabaigujingButtonClick_Function: function sandabaigujingButtonClick_Function() {
    window.SDBGJ_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_sandabaigujing');
  },

  /**
  * 点击玉蒲团按钮
  */
  yuputuanButtonClick_Function: function yuputuanButtonClick_Function() {
    window.YPT_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Yuputuan');
  },

  /**
  * 点击水果小玛丽按钮
  */
  sgxmlButtonClick_Function: function sgxmlButtonClick_Function() {
    window.SGXML_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Shuiguoxiaomali');
  },

  /**
  * 点击阿兹特克按钮
  */
  AZTKButtonClick_Function: function AZTKButtonClick_Function() {
    window.AZTK_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_aztec');
  },

  /**
   * 点击财神夺宝按钮
   */
  CSDBButtonClick_Function: function CSDBButtonClick_Function() {
    window.CSDB_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Caishenduobao');
  },

  /**
  * 点击维加斯之夜按钮
  */
  WJSZYButtonClick_Function: function WJSZYButtonClick_Function() {
    window.WJSZY_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Weijiasizhiye');
  },

  /**
  * 点击财神到按钮
  */
  CSDHYButtonClick_Function: function CSDHYButtonClick_Function() {
    window.CSDHY_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Caishendao');
  },

  /**
  * 点击Fire88按钮
  */
  Fire88ButtonClick_Function: function Fire88ButtonClick_Function() {
    window.FIRE88_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Fire88');
  },

  /**
  * 点击西游记 按钮
  */
  XYJButtonClick_Function: function XYJButtonClick_Function() {
    window.XYJ_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('Slot_Xiyouxi');
  },

  /**
   * 点击ATT连环炮
   */
  ATTButtonClick_Function: function ATTButtonClick_Function() {
    window.ATT_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    this.QieHuanScene('game_ATTlianhuanpao');
  },

  /**
   * 点击精灵女王按钮
   */
  JinwButtonClick_Function: function JinwButtonClick_Function() {
    // if(cc.sys.isNative && this.canvasNode.getComponent("LobbyMain").playerInfo.needToUpdate[7])
    // {
    //     this.canvasNode.getComponent("LobbyMain").checkUpdate_Function("Jinw");
    // }
    // else
    // {
    //     this.canvasNode.getComponent("LobbyMain").gameMenuButtonClick_Function("com_Jinw");
    // }
    this.QieHuanScene('game_jlnw');
  },

  /**
   * 点击万圣节按钮
   */
  WsjButtonClick_Function: function WsjButtonClick_Function() {
    this.QieHuanScene('game_wsj');
  },

  /**
   * 点击3D足球按钮
   */
  FootballButtonClick_Function: function FootballButtonClick_Function() {
    this.QieHuanScene('game_3Dfootball');
  },

  /**
   * 
   */
  gameMenuBackButtonClick_Function: function gameMenuBackButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").gameMenuBackButtonClick_Function();
  },

  /**
   * 点击进入抢庄牛牛房间
   */
  grabBullRoomButtonClick_Function: function grabBullRoomButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "GrabBull");
  },

  /**
  * 点击进入红包达人房间
  */
  hongbaoRoomButtonClick_Function: function hongbaoRoomButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "hongbao");
  },

  /**
   * 点击进入斗地主房间
   */
  landRoomButtonClick_Function: function landRoomButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Land");
  },

  /**
   * 点击进入跑得快房间
   */
  runRoomButtonClick_Function: function runRoomButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Runing");
  },

  /**
   * 点击进入德州扑克房间
   */
  dzRoomButtonClick_Function: function dzRoomButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Holdem");
  },

  /**
   * 点击进入炸金花房间
   */
  zjhRoomButtonClick_Function: function zjhRoomButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Flower");
  },

  /**
   * 连环夺宝
   */
  lhdbButtonClick_Function: function lhdbButtonClick_Function() {
    this.QieHuanScene_normal('Lianhuanduobao');
    window.LHDB_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
  },

  /**
   * 点击进入捕鱼房间
   */
  fishRoomButtonClick_Function: function fishRoomButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Fish");
  },

  /**
   * 点击进入捕鱼海王2房间
   */
  fishRoom_haiwang2ButtonClick_Function: function fishRoom_haiwang2ButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Fishhaiwang2");
  },

  /**
   * 点击进入欧洲轮盘房间
   */
  rouletteRoomButtonClick_Function: function rouletteRoomButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Roulette");
  },

  /**
   * 跳转各种老虎机界面
   */
  QieHuanScene: function QieHuanScene(sceneName) {
    var _this = this;

    if (this.canvasNode.getComponent('LobbyMain').netWork.connected == false) {
      //判断大厅服务器是否连接
      return;
    }

    var self = this;
    var loadingNode = self.canvasNode.getChildByName('Loading');
    loadingNode.active = true; //点亮加载游戏界面

    var progressBarNode = loadingNode.getChildByName('loadingProgressBar');
    var loadTxt = cc.find("pb_Loading_txt", progressBarNode); //初始化

    progressBarNode.getComponent(cc.ProgressBar).progress = 0;
    loadTxt.getComponent(cc.Label).string = 0 + "%";
    this.p = 0;
    cc.director.preloadScene(sceneName, function (completedCount, totalCount, item) {
      //预加载场景&监听加载进度
      if (_this.p < completedCount / totalCount) {
        var loadProgress = completedCount / totalCount;
        _this.p = loadProgress;
        progressBarNode.getComponent(cc.ProgressBar).progress = loadProgress;
        loadTxt.getComponent(cc.Label).string = (loadProgress * 100).toFixed(2) + "%";
      }
    }, function (err, scene) {
      // loadingNode.active = false; //隐藏加载游戏界面
      cc.audioEngine.stopAll();
      cc.director.loadScene(sceneName);
    });
  },

  /**
   * 普通跳转场景界面
   */
  QieHuanScene_normal: function QieHuanScene_normal(sceneName, cb) {
    var _this2 = this;

    var loadingNode = cc.find("Canvas").getChildByName('Loading');
    loadingNode.active = true; //点亮加载游戏界面

    var progressBarNode = loadingNode.getChildByName('loadingProgressBar');
    var loadTxt = cc.find("pb_Loading_txt", progressBarNode); //初始化

    progressBarNode.getComponent(cc.ProgressBar).progress = 0;
    loadTxt.getComponent(cc.Label).string = 0 + "%";
    this.p = 0;
    cc.director.preloadScene(sceneName, function (completedCount, totalCount, item) {
      //预加载场景&监听加载进度
      if (_this2.p < completedCount / totalCount) {
        var loadProgress = completedCount / totalCount;
        _this2.p = loadProgress;
        progressBarNode.getComponent(cc.ProgressBar).progress = loadProgress;
        loadTxt.getComponent(cc.Label).string = (loadProgress * 100).toFixed(2) + "%";
      }
    }, function (err, scene) {
      // loadingNode.active = false; //隐藏加载游戏界面
      cc.audioEngine.stopAll();
      cc.director.loadScene(sceneName, cb);
    });
  },

  /**
   * 
   */
  updateMessageBoxConfirmButtonClick_Function: function updateMessageBoxConfirmButtonClick_Function() {
    this.node.active = false;
    this.node.parent.getChildByName("bt_Close").active = false;
    this.canvasNode.getComponent("LobbyMain").checkUpdate_Function("");
  },

  /**
   * 
   */
  updateMessageBoxCloseuttonClick_Function: function updateMessageBoxCloseuttonClick_Function() {
    this.canvasNode.getComponent("GameUpdate").gameName = "";
    this.canvasNode.getComponent("LobbyMain").com_UpdateMessageBox.active = false;
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
  },

  /**
   * 
   */
  messageBoxConfirmButtonClick_Function: function messageBoxConfirmButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_MessageBox.active = false;

    switch (this.canvasNode.getComponent("LobbyMain").messageBoxOperationType) {
      case 1:
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = true;
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_CreateAccount"), "com_CreateAccount");
        break;

      case 2:
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = true;
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_BindAli"), "com_BindAli");
        break;

      case 3:
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = true;
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_BindPhone"), "com_BindPhone");
        break;

      case 4:
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
        break;

      case 5:
        this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("BankInfo", {
          act: 3,
          cardId: this.canvasNode.getComponent("LobbyMain").editCardId
        });
        break;

      case 6:
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = false;
        this.canvasNode.getComponent("LobbyRegister").registerAccount_Function(this.canvasNode.getComponent("LobbyMain").playerInfo.loginIp, false);
        break;

      case 7:
        var account = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string;
        var password = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string;
        this.canvasNode.getComponent("LobbyMain").netWork.loginClick = true;
        var self = this;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = false;
        this.canvasNode.getComponent("LobbyMain").com_Tips.getChildByName("sp_Logining").active = true;
        var timer = setTimeout(function () {
          clearTimeout(timer);
          self.canvasNode.getComponent("LobbyMain").netWork.logoutAccount_Function();
          self.canvasNode.getComponent("LobbyMain").netWork.accountChange = true;
          self.canvasNode.getComponent("LobbyMain").netWork.loginAccount_Function(self.canvasNode.getComponent("LobbyMain").playerInfo.loginIp, account, password);
          self.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_PlayerInfoBack").getComponent("cc.Button").interactable = false;
        }, 1000);
        break;

      case 8:
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = true;
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_ChangeAccount"), "com_ChangeAccount");
        break;

      case 9:
        this.closeGame();

      case 10:
        this.log_out();
    }

    this.canvasNode.getComponent("LobbyMain").messageBoxOperationType = 0;
  },

  /**
   * 
   */
  messageBoxCancelButtonClick_Function: function messageBoxCancelButtonClick_Function() {
    switch (this.canvasNode.getComponent("LobbyMain").messageBoxOperationType) {
      case 1:
      case 2:
      case 3:
      case 4:
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
        break;

      case 5:
      case 6:
      case 7:
    }

    this.canvasNode.getComponent("LobbyMain").com_MessageBox.active = false;
    this.canvasNode.getComponent("LobbyMain").messageBoxOperationType = 0;
  },

  /**
   * 
   */
  messageBoxGoToMallButtonClick_Function: function messageBoxGoToMallButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_MessageBox.active = false;
    this.mallButtonClick_Function();
  },

  /**
   * 点击重新连接游戏按钮
   */
  reconnetedButtonClick_Function: function reconnetedButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").reconntetedGame_Function();
  },

  /**
   * 点击玩家信息按钮
   */
  playerInfoMenuBackButtonClick_Function: function playerInfoMenuBackButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = false;
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
  },

  /**
   * 
   */
  playerInfoMenuCreateAccountButtonClick_Function: function playerInfoMenuCreateAccountButtonClick_Function() {
    this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_CreateAccount");
  },

  /**
   * 
   */
  playerInfoMenuChangeNameButtonClick_Function: function playerInfoMenuChangeNameButtonClick_Function() {
    this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_ChangeName");
  },

  /**
   * 
   */
  playerInfoMenuChangeAccountButtonClick_Function: function playerInfoMenuChangeAccountButtonClick_Function() {
    this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_ChangeAccount");
  },

  /**
   * 
   */
  playerInfoMenuBindAliButtonClick_Function: function playerInfoMenuBindAliButtonClick_Function() {
    this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindAli");
  },

  /**
   * 
   */
  playerInfoMenuBindedAliButtonClick_Function: function playerInfoMenuBindedAliButtonClick_Function() {
    this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindedAli");
  },

  /**
   * 
   */
  playerInfoMenuBindCreditCardButtonClick_Function: function playerInfoMenuBindCreditCardButtonClick_Function() {
    this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindCreditCard");
  },

  /**
   * 
   */
  playerInfoMenuBindedCreditCardButtonClick_Function: function playerInfoMenuBindedCreditCardButtonClick_Function() {
    this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindedCreditCard");
  },

  /**
   * 
   */
  playerInfoMenuChangePasswordButtonClick_Function: function playerInfoMenuChangePasswordButtonClick_Function() {
    this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_ChangePassword");
  },

  /**
   * 
   */
  playerInfoMenuBindPhoneButtonClick_Function: function playerInfoMenuBindPhoneButtonClick_Function() {
    if (this.canvasNode.getComponent("LobbyMain").playerInfo.phoneNumber) {
      this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindedPhone");
    } else {
      this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindPhone");
    }
  },
  playerInfoMenuFaceClick_Function: function playerInfoMenuFaceClick_Function() {
    this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_face");
    this.node.parent.getChildByName('com_face').getComponent('LobbyButtonClick').changeHeadSex_Function(null, 1);
  },

  /**
   * 
   * @param {*} mainRoot 
   * @param {*} comRoot 
   * @param {*} index 
   */
  playerInfoButtonsAndComponentChange_Function: function playerInfoButtonsAndComponentChange_Function(mainRoot, comRoot, index) {
    for (var i = 2; i < 10; i++) {
      mainRoot.getComponent("LobbyMain").com_PlayerInfo.children[i].getComponent("cc.Button").interactable = true;
    }

    comRoot.getComponent("cc.Button").interactable = false;

    for (i = 10; i < mainRoot.getComponent("LobbyMain").com_PlayerInfo.children.length; i++) {
      mainRoot.getComponent("LobbyMain").com_PlayerInfo.children[i].active = false;
    }

    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName(index).active = true;
  },

  /**
   * 创建账号
   */
  createAccountMenuCreateButtonClick_Function: function createAccountMenuCreateButtonClick_Function() {
    var account = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string;
    var password = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string;
    var confirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string;
    this.editBoxEditingBegin_Function("createAccount");

    if (!account) {
      this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("eb_Account").getComponent("cc.EditBox").string = "账号不能为空";
      return;
    }

    if (!password) {
      this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("eb_Password").getComponent("cc.EditBox").string = "密码不能为空";
      return;
    }

    if (account && password && confirm) {
      if (account.length < 6) {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips0").getComponent("cc.Label").string = "账号至少6个数字或字母";
        return;
      }

      if (password.length < 6) {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips1").getComponent("cc.Label").string = "密码至少6个数字或字母";
        return;
      }

      if (password !== confirm) {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips2").getComponent("cc.Label").string = "密码与确认密码不一致";
        return;
      }

      this.node.getComponent("cc.Button").interactable = false;
      this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("changeOfficial", {
        newAccount: account,
        password: password
      });
    }
  },

  /**
   * 
   */
  changeNameMenuChangeButtonClick_Function: function changeNameMenuChangeButtonClick_Function() {
    var nickName = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("eb_Name").getComponent("cc.EditBox").string;

    if (nickName !== "") {
      /*
      //过滤敏感字
      var wordFilter = this.canvasNode.getComponent("LobbyMain").wordFilter.checkFilter(nickName);
      if (nickName !== wordFilter)
      {
          this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("eb_Name").getComponent("cc.EditBox").string = "名字不符合规定";
          return;
      }
      */
      this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("updateNickName", {
        newNickName: nickName
      });
      this.node.getComponent("cc.Button").interactable = false;
    }
  },

  /**
   * 
   */
  changeAccountMenuChangeButtonClick_Function: function changeAccountMenuChangeButtonClick_Function() {
    var account = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string;
    var password = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string;

    if (account && password) {
      this.canvasNode.getComponent("LobbyMain").showMessagebox_Function("您的账号如果没有转正，\n切换账号将导致账号找不回来！\n\n您确定要切换账号吗?", 2, 7);
    }
  },

  /**
   * 
   */
  changeAccountMenuRegisterButtonClick_Function: function changeAccountMenuRegisterButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").showMessagebox_Function("你确定注册新账号吗?", 2, 6);
  },
  changeAccountMenuForgotButtonClick_Function: function changeAccountMenuForgotButtonClick_Function() {},

  /**
   * 绑定支付宝账号
   */
  bindAliMenuBindButtonClick_Function: function bindAliMenuBindButtonClick_Function() {
    var account = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Account").getComponent("cc.EditBox").string;
    var confirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_AccountConfirm").getComponent("cc.EditBox").string;
    var nickName = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Name").getComponent("cc.EditBox").string;
    this.editBoxEditingBegin_Function("bindAli");

    if (account && confirm && nickName) {
      if (account !== confirm) {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("lb_Tips0").getComponent("cc.Label").string = "账号与确认账号不一致";
        return;
      }

      this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("bindZhifubao", {
        zhifubao: account,
        name: nickName
      });
      this.node.getComponent("cc.Button").interactable = false;
    }
  },

  /**
   * 
   */
  bindedAliChangeButtonClick_Function: function bindedAliChangeButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindedAli").active = false;
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").active = true;
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Account").getComponent("cc.EditBox").string = "";
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_AccountConfirm").getComponent("cc.EditBox").string = "";
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Name").getComponent("cc.EditBox").string = "";
  },

  /**
   * 
   */
  changeAliAccountSubmitButtonClick_Function: function changeAliAccountSubmitButtonClick_Function() {
    var account = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Account").getComponent("cc.EditBox").string;
    var confirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_AccountConfirm").getComponent("cc.EditBox").string;
    var nickName = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Name").getComponent("cc.EditBox").string;
    this.editBoxEditingBegin_Function("changeAli");

    if (account && confirm && nickName) {
      if (account !== confirm) {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("lb_Tips0").getComponent("cc.Label").string = "账号与确认账号不一致";
        return;
      }

      this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("bindZhifubao", {
        zhifubao: account,
        name: nickName
      });
    }
  },

  /**
   * 
   */
  changeAliAccountBackButtonClick_Function: function changeAliAccountBackButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindedAli").active = true;
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").active = false;
  },

  /**
   * 
   */
  bindCreditCardSelectBankButtonClick_Function: function bindCreditCardSelectBankButtonClick_Function() {
    if (this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").active) {
      this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").active = false;
    } else {
      this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").active = true;
    }
  },

  /**
   * 
   */
  bindCreditCardMenuSubmitButtonClick_Function: function bindCreditCardMenuSubmitButtonClick_Function() {
    var owner = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_Owner").getComponent("cc.EditBox").string;
    var cardNo = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string;
    var confirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_CardNoConfirm").getComponent("cc.EditBox").string;

    if (owner && cardNo && confirm) {
      if (cardNo === confirm) {
        if (this.canvasNode.getComponent("LobbyMain").bankSelect > 0) {
          this.canvasNode.getComponent("LobbyMain").creditCardObj = {
            account: cardNo,
            bankType: this.canvasNode.getComponent("LobbyMain").bankSelect,
            cardId: 0,
            name: owner,
            userId: this.canvasNode.getComponent("LobbyMain").playerInfo.playerId
          };
          this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("BankInfo", {
            act: 1,
            account: cardNo,
            name: owner,
            bankType: this.canvasNode.getComponent("LobbyMain").bankSelect
          });
        } else {
          this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "请选择银行卡类型";
        }
      } else {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "信用卡号与确认卡号不一致";
      }
    } else {
      this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "请正确输入持卡人与卡号";
    }
  },

  /**
   * 
   */
  bindCreditCardMenuBackButtonClick_Function: function bindCreditCardMenuBackButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").active = false;
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindCreditCard").active = true;
  },

  /**
   * 
   */
  bindCreditCardMenuEditButtonClick_Function: function bindCreditCardMenuEditButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").editCardId = this.node.cardId;
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindCreditCard").active = false;
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").active = true;

    for (var i = 0; i < this.canvasNode.getComponent("LobbyMain").bankList.length; i++) {
      if (this.node.cardId === this.canvasNode.getComponent("LobbyMain").bankList[i].cardId) {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string = this.canvasNode.getComponent("LobbyMain").bankList[i].account;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNoConfirm").getComponent("cc.EditBox").string = this.canvasNode.getComponent("LobbyMain").bankList[i].account;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_Owner").getComponent("cc.EditBox").string = this.canvasNode.getComponent("LobbyMain").bankList[i].name;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("bt_SelectBank").getComponent("cc.Sprite").spriteFrame = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").getComponent("cc.ScrollView").content.children[this.canvasNode.getComponent("LobbyMain").bankList[i].bankType].getComponent("cc.Sprite").spriteFrame;
        this.canvasNode.getComponent("LobbyMain").bankSelect = this.canvasNode.getComponent("LobbyMain").bankList[i].bankType;
        break;
      }
    }
  },

  /**
   * 
   */
  bindCreditCardMenuAddButtonClick_Function: function bindCreditCardMenuAddButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindCreditCard").active = false;
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").active = true;
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string = "";
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_CardNoConfirm").getComponent("cc.EditBox").string = "";
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_Owner").getComponent("cc.EditBox").string = "";
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("bt_SelectBank").getComponent("cc.Sprite").spriteFrame = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").getComponent("cc.ScrollView").content.children[0].getComponent("cc.Sprite").spriteFrame;
  },

  /**
   * 
   */
  editCreditCardSelectBankButtonClick_Function: function editCreditCardSelectBankButtonClick_Function() {
    if (this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").active) {
      this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").active = false;
    } else {
      this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").active = true;
    }
  },

  /**
   * 
   */
  editCreditCardBanSelectkButtonClick_Function: function editCreditCardBanSelectkButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").bankSelect = this.node.bankId;

    if (this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").active) {
      this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").active = false;
      this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("bt_SelectBank").getComponent("cc.Sprite").spriteFrame = this.node.getComponent("cc.Sprite").spriteFrame;
      return 1;
    } else if (this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").active) {
      this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").active = false;
      this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("bt_SelectBank").getComponent("cc.Sprite").spriteFrame = this.node.getComponent("cc.Sprite").spriteFrame;
      return 1;
    } else {
      return 0;
    }
  },

  /**
   * 点击修改银行卡信息
   */
  editCreditCardBackButtonClick_Function: function editCreditCardBackButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindCreditCard").active = true;
    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").active = false;
    this.canvasNode.getComponent("LobbyMain").bankSelect = -1;
  },

  /**
   * 
   */
  editCreditCardEditConfirmButtonClick_Function: function editCreditCardEditConfirmButtonClick_Function() {
    this.editBoxEditingBegin_Function("editCreditCard");
    var owner = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_Owner").getComponent("cc.EditBox").string;
    var cardNo = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string;
    var confirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNoConfirm").getComponent("cc.EditBox").string;

    if (owner && cardNo && confirm) {
      if (cardNo === confirm) {
        if (this.canvasNode.getComponent("LobbyMain").bankSelect > 0) {
          this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("BankInfo", {
            act: 2,
            cardId: this.canvasNode.getComponent("LobbyMain").editCardId,
            account: cardNo,
            name: owner,
            bankType: this.canvasNode.getComponent("LobbyMain").bankSelect
          });
        } else {
          this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "请选择银行卡类型";
        }
      } else {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "信用卡号与确认卡号不一致";
      }
    } else {
      this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "请正确输入持卡人与卡号";
    }
  },

  /**
   * 点击删除银行卡
   */
  editCreditCardDeleteButtonClick_FunctionF: function editCreditCardDeleteButtonClick_FunctionF() {
    this.canvasNode.getComponent("LobbyMain").showMessagebox_Function("您确定要删除此银行卡吗?", 2, 5);
  },

  /**
   * 获得手机验证码
   */
  bindPhoneGetCodeButtonClick_Function: function bindPhoneGetCodeButtonClick_Function() {
    var phoneNumber = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("eb_PhoneNumber").getComponent("cc.EditBox").string;

    if (phoneNumber.length > 11) {
      this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("sendbindPhoneNo", {
        phoneNo: parseInt(phoneNumber)
      });
      this.canvasNode.getComponent("LobbyMain").codeTimeCount = true;
      this.node.getComponent("cc.Button").interactable = false;
      this.canvasNode.getComponent("LobbyMain").getCodeTime = 60;
      this.node.children[0].getComponent("cc.Label").string = 60;
    }
    /*
    phoneNumber.length < 11 || (this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("sendbindPhoneNo", {
        phoneNo: parseInt(phoneNumber)
    }), this.canvasNode.getComponent("LobbyMain").codeTimeCount = true, this.canvasNode.getComponent("LobbyMain").getCodeTime = 60, this.node.getComponent("cc.Button").interactable = false, this.node.children[0].getComponent("cc.Label").string = 60)
    */

  },

  /**
   * 点击绑定手机号
   */
  bindPhoneSubmitButtonClick_Function: function bindPhoneSubmitButtonClick_Function() {
    var phoneNumber = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("eb_PhoneNumber").getComponent("cc.EditBox").string;
    var code = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("eb_Code").getComponent("cc.EditBox").string;

    if (phoneNumber.length > 11 && code.length > 4) {
      this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("bindPhone", {
        phoneNo: parseInt(phoneNumber),
        checkNo: parseInt(code)
      });
    }
    /*
    phoneNumber.length < 11 || code.length < 4 || this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("bindPhone", {
        phoneNo: parseInt(phoneNumber),
        checkNo: parseInt(code)
    })
    */

  },

  /**
   * 检测修改密码
   */
  changePasswordMenuChangeButtonClick_Function: function changePasswordMenuChangeButtonClick_Function() {
    if (!this.canvasNode.getComponent("LobbyMain").playerInfo.isOffical) {
      this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips1").getComponent("cc.Label").string = "修改密码前必须转正账号";
      return;
    }

    var eb_OldPassword = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_OldPassword").getComponent("cc.EditBox").string;
    var eb_NewPassword = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_NewPassword").getComponent("cc.EditBox").string;
    var eb_PasswordConfirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string;
    this.editBoxEditingBegin_Function("changePassword");

    if (eb_OldPassword && eb_NewPassword && eb_PasswordConfirm) {
      if (eb_OldPassword === eb_NewPassword) {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips1").getComponent("cc.Label").string = "旧密码与新密码相同";
        return;
      }

      if (eb_NewPassword.length < 6) {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips2").getComponent("cc.Label").string = "密码至少6个数字或字母";
        return;
      }

      if (eb_NewPassword !== eb_PasswordConfirm) {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips2").getComponent("cc.Label").string = "密码与确认密码不一致";
        return;
      }

      this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("updatePassword", {
        oldPassword: eb_OldPassword,
        password: eb_NewPassword
      });
      this.node.getComponent("cc.Button").interactable = false;
    }
  },

  /**
   * 
   * @param {*} type 
   */
  editBoxEditingBegin_Function: function editBoxEditingBegin_Function(type) {
    switch (type) {
      case "createAccount":
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips0").getComponent("cc.Label").string = "";
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips1").getComponent("cc.Label").string = "";
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips2").getComponent("cc.Label").string = "";
        break;

      case "changeName":
        break;

      case "bindAli":
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("lb_Tips0").getComponent("cc.Label").string = "";
        break;

      case "changePassword":
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips1").getComponent("cc.Label").string = "", this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips2").getComponent("cc.Label").string = "";
        break;

      case "bindCreditCard":
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "";
        break;

      case "editCreditCard":
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "";
        break;

      case "changeAli":
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("lb_Tips0").getComponent("cc.Label").string = "";
        break;
    }
  },

  /**
   * 关闭导航界面
   */
  daohangCloseButtonClick_Function: function daohangCloseButtonClick_Function() {
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
    this.canvasNode.getComponent("LobbyMain").com_daohang.active = false;
  },
  onClickPoxy: function onClickPoxy(e, v) {
    var lobbyMain = this.canvasNode.getComponent("LobbyMain");
    var uid = lobbyMain.playerInfo.playerId;
    var sendData = JSON.stringify({
      uid: uid,
      sign: require('md5').getInstant.hex_md5(uid + "fdgkl5rtlk4mvcccd765fdv")
    });
    Helper.http('http://game.bullsts.com/index.php/agent/api/clientShow', sendData).then(function (e) {
      lobbyMain.setPoxyUI(e);
    }); //Helper.http('https://fangka.youmegame.cn/clientShow.php', sendData).then(e => {
    //    lobbyMain.setPoxyUI(e);
    //});
  },
  onClickClosePoxy: function onClickClosePoxy(e, v) {
    var lobbyMain = this.canvasNode.getComponent("LobbyMain");
    lobbyMain.closePoxyUI();
  },
  changePoxyPage: function changePoxyPage(e, v) {
    var lobbyMain = this.canvasNode.getComponent("LobbyMain");
    lobbyMain.changePoxyPage(v);
  },
  //点击进入龙虎斗
  longhuDouButtonClick: function longhuDouButtonClick(event, customEventData) {
    var tempNetWork = require("longhudouNetWork").getInstant;

    cc.find('Canvas/Loading').active = true;
    event.currentTarget.getComponent(cc.Button).interactable = false;
    tempNetWork.loginGame_Function('', 16003, tempNetWork.playerInfo.playerId, tempNetWork.playerInfo.gameSign);
  },
  //点击进入西游争霸
  xiyouzhengbaButtonClick: function xiyouzhengbaButtonClick(event, customEventData) {
    cc.find('Canvas/Loading').active = true;
    event.currentTarget.getComponent(cc.Button).interactable = false;
    this.QieHuanScene_normal('xiyouzhengba_main');
    window.XYZB_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
  },
  //点击进入三角魔阵
  triangleButtonClick: function triangleButtonClick(event, customEventData) {
    cc.find('Canvas/Loading').active = true;
    event.currentTarget.getComponent(cc.Button).interactable = false;
    this.QieHuanScene_normal('Slot_Trianglegame');
    window.TG_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
  },
  //点击进入21点
  blackJackButtonClick: function blackJackButtonClick(event, customEventData) {
    cc.find('Canvas/Loading').active = true;
    event.currentTarget.getComponent(cc.Button).interactable = false;
    this.QieHuanScene_normal('game_21dian');
    window.BLACKJACK_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
  },
  //点击进入森林舞会
  zenlinwuhuiButtonClick: function zenlinwuhuiButtonClick(event, customEventData) {
    cc.find('Canvas/Loading').active = true;
    event.currentTarget.getComponent(cc.Button).interactable = false;
    this.QieHuanScene_normal('senlinwuhui');
    window.XYZB_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
  },
  //点击进入百家乐
  baijialeButtonClick: function baijialeButtonClick(event, customEventData) {
    var tempNetWork = require("baijialeNetWork").getInstant;

    cc.find('Canvas/Loading').active = true;
    event.currentTarget.getComponent(cc.Button).interactable = false;
    tempNetWork.loginGame_Function('', 16004, tempNetWork.playerInfo.playerId, tempNetWork.playerInfo.gameSign);
  },
  //点击进入白人牛牛
  bairenniuniuButtonClick: function bairenniuniuButtonClick(event, customEventData) {
    var tempNetWork = require("bairenniuniuNetWork").getInstant;

    cc.find('Canvas/Loading').active = true;
    event.currentTarget.getComponent(cc.Button).interactable = false;
    tempNetWork.loginGame_Function('', 13501, tempNetWork.playerInfo.playerId, tempNetWork.playerInfo.gameSign);
  },
  //点击进入押大小
  yadaxiaoButtonClick: function yadaxiaoButtonClick(event, customEventData) {
    var tempNetWork = require("yadaxiaoNetWork").getInstant;

    cc.find('Canvas/Loading').active = true;
    event.currentTarget.getComponent(cc.Button).interactable = false;
    tempNetWork.loginGame_Function('', 16005, tempNetWork.playerInfo.playerId, tempNetWork.playerInfo.gameSign);
  },
  //点击进入皇家赛马
  HJSMButtonClick: function HJSMButtonClick(event, customEventData) {
    cc.find('Canvas/Loading').active = true;
    event.currentTarget.getComponent(cc.Button).interactable = false;
    this.QieHuanScene_normal('game_saima');
    window.HJSM_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
  },
  //点击进入奔驰宝马
  BCBMButtonClick: function BCBMButtonClick(event, customEventData) {
    var tempNetWork = require("bcbm_NetWork").getInstant;

    cc.find('Canvas/Loading').active = true;
    event.currentTarget.getComponent(cc.Button).interactable = false;
    tempNetWork.loginGame_Function('', 16008, tempNetWork.playerInfo.playerId, tempNetWork.playerInfo.gameSign);
  },
  //点击显示捕鱼
  fishButtonClick: function fishButtonClick(event, customEventData) {
    this.canvasNode.getComponent("LobbyMain").gameMenuButtonClick_Function("com_Fish");
  },
  //点击显示捕鱼海王2
  fishhaiwang2ButtonClick: function fishhaiwang2ButtonClick(event, customEventData) {
    this.canvasNode.getComponent("LobbyMain").gameMenuButtonClick_Function("com_Fishhaiwang2");
  },
  sanjiaoButtonClick: function sanjiaoButtonClick(event, customEventData) {
    cc.find('Canvas/Loading').active = true;
    this.QieHuanScene_normal("Slot_Trianglegame");
  },
  changeHeadSex_Function: function changeHeadSex_Function(ev, sex) {
    if (sex == '1') {
      //男
      this.node.getChildByName('btn_girl_01').getComponent(cc.Button).interactable = true;
      this.node.getChildByName('btn_man_01').getComponent(cc.Button).interactable = false;
      this.node.getChildByName('com_faceman').active = true;
      this.node.getChildByName('com_facegirl').active = false;
      this.clearHeadSel();
    } else {
      //女
      this.node.getChildByName('btn_girl_01').getComponent(cc.Button).interactable = false;
      this.node.getChildByName('btn_man_01').getComponent(cc.Button).interactable = true;
      this.node.getChildByName('com_faceman').active = false;
      this.node.getChildByName('com_facegirl').active = true;
      this.clearHeadSel();
    }
  },
  clearHeadSel: function clearHeadSel(ev, n) {
    var prMale = this.node.getChildByName('com_faceman');
    var prFemale = this.node.getChildByName('com_facegirl');

    for (var i in prMale.children) {
      var show = prMale.children[i].name == n ? true : false;
      prMale.children[i].getChildByName('box').active = show;
    }

    for (var _i in prFemale.children) {
      var _show = prFemale.children[_i].name == n ? true : false;

      prFemale.children[_i].getChildByName('box').active = _show;
    }
  },
  selHead_Function: function selHead_Function(ev, args) {
    var selId = -1;
    var prMale = this.node.getChildByName('com_faceman');
    var prFemale = this.node.getChildByName('com_facegirl');

    if (prMale.active) {
      for (var i in prMale.children) {
        if (prMale.children[i].getChildByName('box').active) {
          selId = prMale.children[i].name;
        }
      }
    } else {
      for (var _i2 in prFemale.children) {
        if (prFemale.children[_i2].getChildByName('box').active) {
          selId = prFemale.children[_i2].name;
        }
      }
    }

    if (selId != -1) {
      this.canvasNode.getComponent("LobbyMain").netWork.changeHead(selId);
    }
  },
  daili_click: function daili_click() {
    cc.find('Canvas/com_dlnumber').active = true;
    cc.find('Canvas/com_dlnumber').getComponent("daili").setDaili(this.canvasNode.getComponent("LobbyMain").playerInfo.playerId);
  },
  log_out: function log_out() {
    cc.sys.localStorage.removeItem("userData");
    cc.game.restart();
  },
  mallTagClick: function mallTagClick(ev, args) {
    this.canvasNode.getComponent("LobbyMain").changeMallUI(args);
  },
  callCustomerService: function callCustomerService(ev, args) {
    this.canvasNode.getComponent("LobbyMain").changeMallUI(2);
    var lbl = this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName('com_CustomerService').getChildByName('New Label');
    lbl.csData = JSON.parse(args);
    lbl.getComponent(cc.Label).string = "\u60A8\u6B63\u5728\u4E0E \u5BA2\u670D " + lbl.csData.name + " \u5BF9\u8BDD";
  },
  sendMsg_CustomerService: function sendMsg_CustomerService() {
    var lobbyMain = this.canvasNode.getComponent("LobbyMain");
    var e = lobbyMain.com_CustomerService.getChildByName("eb_Chat").getComponent("cc.EditBox").string;

    if (e == '') {
      return;
    }

    var lbl = lobbyMain.com_Mall.getChildByName('com_CustomerService').getChildByName('New Label');
    lobbyMain.netWork.socket.emit("sendMsgToGM", JSON.stringify({
      gm_id: lbl.csData.id,
      msg: e
    }));
    lobbyMain.com_CustomerService.getChildByName("eb_Chat").getComponent("cc.EditBox").string = "";
    lobbyMain.setChat_Function(lobbyMain.playerInfo.playerId, lobbyMain.playerInfo.playerName, e);
  },
  closeGame: function closeGame() {
    if (cc.sys.isNative) {
      cc.game.end();
    } else {
      window.close();
    }
  },
  clsoeGameTip: function clsoeGameTip() {
    this.canvasNode.getComponent("LobbyMain").showMessagebox_Function('是否退出游戏？', 2, 9);
  },
  goHall: function goHall() {
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
    this.canvasNode.getComponent("LobbyMain").com_daohang.active = true;
  },
  //通用关闭界面
  onBtnClick_closePanel: function onBtnClick_closePanel(event) {
    //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
    event.target.parent.active = false;
  },
  //打开任务
  onBtnClick_questPanel: function onBtnClick_questPanel() {
    var lobbyMain = this.canvasNode.getComponent("LobbyMain");
    this.canvasNode.getComponent("LobbyMain").com_Quest.active = true;
    lobbyMain.netWork.socket.emit("getTaskInfo");
  },
  //打开排行榜
  onBtnClick_rankPanel: function onBtnClick_rankPanel() {
    var lobbyMain = this.canvasNode.getComponent("LobbyMain");
    this.canvasNode.getComponent("LobbyMain").com_rank.active = true;
    lobbyMain.netWork.socket.emit("getCoinRank");
  },
  //打开活动
  onBtnClick_activityPanel: function onBtnClick_activityPanel() {
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
    this.canvasNode.getComponent("LobbyMain").com_activity.active = true;
  },
  //打开银行
  yinhangButtonClick: function yinhangButtonClick() {
    this.canvasNode.getComponent("LobbyMain").com_bank.getComponent("LobbyBank").updateView();
    this.canvasNode.getComponent("LobbyMain").com_bank.active = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcTG9iYnlCdXR0b25DbGljay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNhbnZhc05vZGUiLCJ0eXBlIiwiTm9kZSIsIm9uTG9hZCIsImxvZ2luTWVudUxvZ2luQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJhY2NvdW50IiwiZ2V0Q29tcG9uZW50IiwiY29tX0xvZ2luIiwiZ2V0Q2hpbGRCeU5hbWUiLCJzdHJpbmciLCJwYXNzd29yZCIsIm5ldFdvcmsiLCJsb2dpbkNsaWNrIiwic2VsZiIsInNldFRpbWVvdXQiLCJhY2NvdW50Q2hhbmdlIiwibG9naW5BY2NvdW50X0Z1bmN0aW9uIiwicGxheWVySW5mbyIsImxvZ2luSXAiLCJub2RlIiwiaW50ZXJhY3RhYmxlIiwibG9naW5NZW51UmVnaXN0ZXJCdXR0b25DbGlja19GdW5jdGlvbiIsImFjdGl2ZSIsImNvbV9SZWdpc3RlciIsInJlZ2lzdGVyTWVudUJhY2tUb0xvZ2luQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJyZWdpc3Rlck1lbnVSZWdpc3RlckJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiY29uZmlybSIsImxlbmd0aCIsIm1sYXBpUmVnaXN0ZXJfRnVuY3Rpb24iLCJwbGF5ZXJJbmZvQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJjb21fUGxheWVySW5mbyIsImJnX0JsYWNrIiwibWFsbEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiY29tX01hbGwiLCJjaGFuZ2VNYWxsVUkiLCJwbGF5ZXJJZCIsIm1hbGxNZW51QmFja0J1dHRvbkNsaWNrX0Z1bmN0aW9uIiwibWFsbE1lbnVSZWNoYW5nZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiaW5kZXgiLCJyZWNoYXJnZUlkIiwibW9uZXkiLCJyZWNoYXJnZU1vbmV5QXJyYXkiLCJ0b1N0cmluZyIsIm1hbGxNZW51QWxpUGF5QnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJwYXJzZUZsb2F0IiwicGF5X0Z1bmN0aW9uIiwibWFsbE1lbnVXZUNoYXRQYXlCdXR0b25DbGlja19GdW5jdGlvbiIsIm1hbGxNZW51UXFQYXlCdXR0b25DbGlja19GdW5jdGlvbiIsIm1hbGxNZW51UXVpY2tQYXlCdXR0b25DbGlja19GdW5jdGlvbiIsInJlY2hhcmdlV2ViVmlld0Nsb3NlQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJtYWlsQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJjb21fTWFpbCIsInNvY2tldCIsImVtaXQiLCJtYWlsTWVudUNsb3NlQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJtYWlsTWVudU1haWxTZWxlY3RCdXR0b25DbGljayIsImdldE1haWxJbmZvX0Z1bmN0aW9uIiwibWFpbE1lbnVHZXRCdXR0b25DbGlja19GdW5jdGlvbiIsImdldE1haWxfRnVuY3Rpb24iLCJzZXR0aW5nQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJjb21fU2V0dGluZyIsInNldHRpbmdNZW51Q2xvc2VCdXR0b25DbGlja19GdW5jdGlvbiIsInNldHRpbmdNZW51TXVzaWNCdXR0b25DbGlja19GdW5jdGlvbiIsInNldHRpbmdDb250cm9sQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJzZXR0aW5nTWVudVNvdW5kRWZmZWN0QnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJzZXR0aW5nTWVudUV4aXRCdXR0b25DbGlja19GdW5jdGlvbiIsImdhbWUiLCJlbmQiLCJzaGFyZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiY2hhbm5lbCIsImdldFVybENvZGVfRnVuY3Rpb24iLCJzeXMiLCJvcGVuVVJMIiwic2hhcmVVcmwiLCJndWVzdCIsInNwbGl0IiwiZXhjaGFuZ2VCdXR0b25DbGlja19GdW5jdGlvbiIsImxvZyIsImlzT2ZmaWNhbCIsImFsaUFjY291bnQiLCJpc0JpbmRBbGkiLCJzaG93TWVzc2FnZWJveF9GdW5jdGlvbiIsImN1c3RvbWVyU2VydmljZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiY29tX0N1c3RvbWVyU2VydmljZSIsImN1c3RvbWVyU2VydmljZU1lbnVTZW5kQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJlIiwic2VuZE1lc3NhZ2UiLCJ1c2VySWQiLCJtc2ciLCJjdXN0b21lclNlcnZpY2VNZW51Q2xvc2VCdXR0b25DbGlja19GdW5jdGlvbiIsImdyYWJCdWxsQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJpc05hdGl2ZSIsIm5lZWRUb1VwZGF0ZSIsImNoZWNrVXBkYXRlX0Z1bmN0aW9uIiwiZ2FtZU1lbnVCdXR0b25DbGlja19GdW5jdGlvbiIsImxhbmRCdXR0b25DbGlja19GdW5jdGlvbiIsImhvbmdiYW9fQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJydW5CdXR0b25DbGlja19GdW5jdGlvbiIsImR6QnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJ6amhCdXR0b25DbGlja19GdW5jdGlvbiIsIkNhaXNoZW5kYW9CdXR0b25DbGlja19GdW5jdGlvbiIsIndpbmRvdyIsIkNBSVNIRU5fTE9CQllORVQiLCJRaWVIdWFuU2NlbmUiLCJTSDAwRkJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiU0gwMEZfTE9CQllORVQiLCJUYWlqaVBhbmRhQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJUYWlqaVBhbmRhX0xPQkJZTkVUIiwiTUhOU0J1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiTUhOU19MT0JCWU5FVCIsIldCQ2xpY2tfRnVuY3Rpb24iLCJXQl9MT0JCWU5FVCIsIllMRkZCdXR0b25DbGlja19GdW5jdGlvbiIsIllMRkZGX0xPQkJZTkVUIiwiV0ZMTUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiV0ZMTV9MT0JCWU5FVCIsIlpIWURCdXR0b25DbGlja19GdW5jdGlvbiIsIlpHWURfTE9CQllORVQiLCJZUFQyQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJZUFQyX0xPQkJZTkVUIiwiUEpMQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJQSkxfTE9CQllORVQiLCJOWk5IQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJOWk5IX0xPQkJZTkVUIiwiTEJYRENCdXR0b25DbGlja19GdW5jdGlvbiIsIkxCWERDX0xPQkJZTkVUIiwiRGlhbW9uZEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiRElBTU9ORF9MT0JCWU5FVCIsIkNZR0dCdXR0b25DbGlja19GdW5jdGlvbiIsIkNZR0dfTE9CQllORVQiLCJFRkJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiRUZfTE9CQllORVQiLCJCUVRQQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJCUVRQX0xPQkJZTkVUIiwiTU5ZWURCdXR0b25DbGlja19GdW5jdGlvbiIsIk1OWVlEX0xPQkJZTkVUIiwiWUdCSEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiWUdCSF9MT0JCWU5FVCIsIkpTWFNCdXR0b25DbGlja19GdW5jdGlvbiIsIkpTWFNfTE9CQllORVQiLCJTSFpCdXR0b25DbGlja19GdW5jdGlvbiIsIlNIWl9MT0JCWU5FVCIsIkdyZWF0Qmx1ZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiR3JlYXRCbHVlX0xPQkJZTkVUIiwiVHJleENsaWNrX0Z1bmN0aW9uIiwidHJleF9MT0JCWU5FVCIsIklyaXNoTHVja0J1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiSXJpc2hMdWNrX0xPQkJZTkVUIiwiSWNlbGFuZEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiSWNlbGFuZF9MT0JCWU5FVCIsIlBhbnRoZXJNb29uQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJQYW50aGVyTW9vbl9MT0JCWU5FVCIsIkluZGlhbk15dGhCdXR0b25DbGlja19GdW5jdGlvbiIsIkluZGlhbk15dGhfTE9CQllORVQiLCJKYXBhbkZvcnR1cmVCdXR0b25DbGlja19GdW5jdGlvbiIsIkphcGFuRm9ydHVyZV9MT0JCWU5FVCIsIkJvbnVzQmVhcnNCdXR0b25DbGlja19GdW5jdGlvbiIsIkJvbnVzQmVhcnNfTE9CQllORVQiLCJTaHVpZ3VvamlCdXR0b25DbGlja19GdW5jdGlvbiIsIlNodWlndW9qaXNodWJhbkJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiTGluZ2Rhbmd5b3V4aUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiU2FmYXJpQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJSb21lR2xvcnlCdXR0b25DbGlja19GdW5jdGlvbiIsIlJPTUFfTE9CQllORVQiLCJqb2tlckJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiYWxhZGluZ0J1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiQUxBRElOR19MT0JCWU5FVCIsImppbnlpd2VpQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJKWVdfTE9CQllORVQiLCJzYW5kYWJhaWd1amluZ0J1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiU0RCR0pfTE9CQllORVQiLCJ5dXB1dHVhbkJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiWVBUX0xPQkJZTkVUIiwic2d4bWxCdXR0b25DbGlja19GdW5jdGlvbiIsIlNHWE1MX0xPQkJZTkVUIiwiQVpUS0J1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiQVpUS19MT0JCWU5FVCIsIkNTREJCdXR0b25DbGlja19GdW5jdGlvbiIsIkNTREJfTE9CQllORVQiLCJXSlNaWUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiV0pTWllfTE9CQllORVQiLCJDU0RIWUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiQ1NESFlfTE9CQllORVQiLCJGaXJlODhCdXR0b25DbGlja19GdW5jdGlvbiIsIkZJUkU4OF9MT0JCWU5FVCIsIlhZSkJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiWFlKX0xPQkJZTkVUIiwiQVRUQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJBVFRfTE9CQllORVQiLCJKaW53QnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJXc2pCdXR0b25DbGlja19GdW5jdGlvbiIsIkZvb3RiYWxsQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJnYW1lTWVudUJhY2tCdXR0b25DbGlja19GdW5jdGlvbiIsImdyYWJCdWxsUm9vbUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwibG9naW5HYW1lUm9vbV9GdW5jdGlvbiIsImhvbmdiYW9Sb29tQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJsYW5kUm9vbUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwicnVuUm9vbUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiZHpSb29tQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJ6amhSb29tQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJsaGRiQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJRaWVIdWFuU2NlbmVfbm9ybWFsIiwiTEhEQl9MT0JCWU5FVCIsImZpc2hSb29tQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJmaXNoUm9vbV9oYWl3YW5nMkJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwicm91bGV0dGVSb29tQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJzY2VuZU5hbWUiLCJjb25uZWN0ZWQiLCJsb2FkaW5nTm9kZSIsInByb2dyZXNzQmFyTm9kZSIsImxvYWRUeHQiLCJmaW5kIiwiUHJvZ3Jlc3NCYXIiLCJwcm9ncmVzcyIsIkxhYmVsIiwicCIsImRpcmVjdG9yIiwicHJlbG9hZFNjZW5lIiwiY29tcGxldGVkQ291bnQiLCJ0b3RhbENvdW50IiwiaXRlbSIsImxvYWRQcm9ncmVzcyIsInRvRml4ZWQiLCJlcnIiLCJzY2VuZSIsImF1ZGlvRW5naW5lIiwic3RvcEFsbCIsImxvYWRTY2VuZSIsImNiIiwidXBkYXRlTWVzc2FnZUJveENvbmZpcm1CdXR0b25DbGlja19GdW5jdGlvbiIsInBhcmVudCIsInVwZGF0ZU1lc3NhZ2VCb3hDbG9zZXV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJnYW1lTmFtZSIsImNvbV9VcGRhdGVNZXNzYWdlQm94IiwibWVzc2FnZUJveENvbmZpcm1CdXR0b25DbGlja19GdW5jdGlvbiIsImNvbV9NZXNzYWdlQm94IiwibWVzc2FnZUJveE9wZXJhdGlvblR5cGUiLCJwbGF5ZXJJbmZvQnV0dG9uc0FuZENvbXBvbmVudENoYW5nZV9GdW5jdGlvbiIsImFjdCIsImNhcmRJZCIsImVkaXRDYXJkSWQiLCJyZWdpc3RlckFjY291bnRfRnVuY3Rpb24iLCJjb21fVGlwcyIsInRpbWVyIiwiY2xlYXJUaW1lb3V0IiwibG9nb3V0QWNjb3VudF9GdW5jdGlvbiIsImNsb3NlR2FtZSIsImxvZ19vdXQiLCJtZXNzYWdlQm94Q2FuY2VsQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJtZXNzYWdlQm94R29Ub01hbGxCdXR0b25DbGlja19GdW5jdGlvbiIsInJlY29ubmV0ZWRCdXR0b25DbGlja19GdW5jdGlvbiIsInJlY29ubnRldGVkR2FtZV9GdW5jdGlvbiIsInBsYXllckluZm9NZW51QmFja0J1dHRvbkNsaWNrX0Z1bmN0aW9uIiwicGxheWVySW5mb01lbnVDcmVhdGVBY2NvdW50QnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJwbGF5ZXJJbmZvTWVudUNoYW5nZU5hbWVCdXR0b25DbGlja19GdW5jdGlvbiIsInBsYXllckluZm9NZW51Q2hhbmdlQWNjb3VudEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwicGxheWVySW5mb01lbnVCaW5kQWxpQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJwbGF5ZXJJbmZvTWVudUJpbmRlZEFsaUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwicGxheWVySW5mb01lbnVCaW5kQ3JlZGl0Q2FyZEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwicGxheWVySW5mb01lbnVCaW5kZWRDcmVkaXRDYXJkQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJwbGF5ZXJJbmZvTWVudUNoYW5nZVBhc3N3b3JkQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJwbGF5ZXJJbmZvTWVudUJpbmRQaG9uZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwicGhvbmVOdW1iZXIiLCJwbGF5ZXJJbmZvTWVudUZhY2VDbGlja19GdW5jdGlvbiIsImNoYW5nZUhlYWRTZXhfRnVuY3Rpb24iLCJtYWluUm9vdCIsImNvbVJvb3QiLCJpIiwiY2hpbGRyZW4iLCJjcmVhdGVBY2NvdW50TWVudUNyZWF0ZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiZWRpdEJveEVkaXRpbmdCZWdpbl9GdW5jdGlvbiIsIm5ld0FjY291bnQiLCJjaGFuZ2VOYW1lTWVudUNoYW5nZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwibmlja05hbWUiLCJuZXdOaWNrTmFtZSIsImNoYW5nZUFjY291bnRNZW51Q2hhbmdlQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJjaGFuZ2VBY2NvdW50TWVudVJlZ2lzdGVyQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJjaGFuZ2VBY2NvdW50TWVudUZvcmdvdEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiYmluZEFsaU1lbnVCaW5kQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJ6aGlmdWJhbyIsIm5hbWUiLCJiaW5kZWRBbGlDaGFuZ2VCdXR0b25DbGlja19GdW5jdGlvbiIsImNoYW5nZUFsaUFjY291bnRTdWJtaXRCdXR0b25DbGlja19GdW5jdGlvbiIsImNoYW5nZUFsaUFjY291bnRCYWNrQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJiaW5kQ3JlZGl0Q2FyZFNlbGVjdEJhbmtCdXR0b25DbGlja19GdW5jdGlvbiIsImJpbmRDcmVkaXRDYXJkTWVudVN1Ym1pdEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwib3duZXIiLCJjYXJkTm8iLCJiYW5rU2VsZWN0IiwiY3JlZGl0Q2FyZE9iaiIsImJhbmtUeXBlIiwiYmluZENyZWRpdENhcmRNZW51QmFja0J1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiYmluZENyZWRpdENhcmRNZW51RWRpdEJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiYmFua0xpc3QiLCJzcHJpdGVGcmFtZSIsImNvbnRlbnQiLCJiaW5kQ3JlZGl0Q2FyZE1lbnVBZGRCdXR0b25DbGlja19GdW5jdGlvbiIsImVkaXRDcmVkaXRDYXJkU2VsZWN0QmFua0J1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiZWRpdENyZWRpdENhcmRCYW5TZWxlY3RrQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJiYW5rSWQiLCJlZGl0Q3JlZGl0Q2FyZEJhY2tCdXR0b25DbGlja19GdW5jdGlvbiIsImVkaXRDcmVkaXRDYXJkRWRpdENvbmZpcm1CdXR0b25DbGlja19GdW5jdGlvbiIsImVkaXRDcmVkaXRDYXJkRGVsZXRlQnV0dG9uQ2xpY2tfRnVuY3Rpb25GIiwiYmluZFBob25lR2V0Q29kZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwicGhvbmVObyIsInBhcnNlSW50IiwiY29kZVRpbWVDb3VudCIsImdldENvZGVUaW1lIiwiYmluZFBob25lU3VibWl0QnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJjb2RlIiwiY2hlY2tObyIsImNoYW5nZVBhc3N3b3JkTWVudUNoYW5nZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uIiwiZWJfT2xkUGFzc3dvcmQiLCJlYl9OZXdQYXNzd29yZCIsImViX1Bhc3N3b3JkQ29uZmlybSIsIm9sZFBhc3N3b3JkIiwiZGFvaGFuZ0Nsb3NlQnV0dG9uQ2xpY2tfRnVuY3Rpb24iLCJjb21fZGFvaGFuZyIsIm9uQ2xpY2tQb3h5IiwidiIsImxvYmJ5TWFpbiIsInVpZCIsInNlbmREYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInNpZ24iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsImhleF9tZDUiLCJIZWxwZXIiLCJodHRwIiwidGhlbiIsInNldFBveHlVSSIsIm9uQ2xpY2tDbG9zZVBveHkiLCJjbG9zZVBveHlVSSIsImNoYW5nZVBveHlQYWdlIiwibG9uZ2h1RG91QnV0dG9uQ2xpY2siLCJldmVudCIsImN1c3RvbUV2ZW50RGF0YSIsInRlbXBOZXRXb3JrIiwiY3VycmVudFRhcmdldCIsIkJ1dHRvbiIsImxvZ2luR2FtZV9GdW5jdGlvbiIsImdhbWVTaWduIiwieGl5b3V6aGVuZ2JhQnV0dG9uQ2xpY2siLCJYWVpCX0xPQkJZTkVUIiwidHJpYW5nbGVCdXR0b25DbGljayIsIlRHX0xPQkJZTkVUIiwiYmxhY2tKYWNrQnV0dG9uQ2xpY2siLCJCTEFDS0pBQ0tfTE9CQllORVQiLCJ6ZW5saW53dWh1aUJ1dHRvbkNsaWNrIiwiYmFpamlhbGVCdXR0b25DbGljayIsImJhaXJlbm5pdW5pdUJ1dHRvbkNsaWNrIiwieWFkYXhpYW9CdXR0b25DbGljayIsIkhKU01CdXR0b25DbGljayIsIkhKU01fTE9CQllORVQiLCJCQ0JNQnV0dG9uQ2xpY2siLCJmaXNoQnV0dG9uQ2xpY2siLCJmaXNoaGFpd2FuZzJCdXR0b25DbGljayIsInNhbmppYW9CdXR0b25DbGljayIsImV2Iiwic2V4IiwiY2xlYXJIZWFkU2VsIiwibiIsInByTWFsZSIsInByRmVtYWxlIiwic2hvdyIsInNlbEhlYWRfRnVuY3Rpb24iLCJhcmdzIiwic2VsSWQiLCJjaGFuZ2VIZWFkIiwiZGFpbGlfY2xpY2siLCJzZXREYWlsaSIsImxvY2FsU3RvcmFnZSIsInJlbW92ZUl0ZW0iLCJyZXN0YXJ0IiwibWFsbFRhZ0NsaWNrIiwiY2FsbEN1c3RvbWVyU2VydmljZSIsImxibCIsImNzRGF0YSIsInBhcnNlIiwic2VuZE1zZ19DdXN0b21lclNlcnZpY2UiLCJnbV9pZCIsImlkIiwic2V0Q2hhdF9GdW5jdGlvbiIsInBsYXllck5hbWUiLCJjbG9zZSIsImNsc29lR2FtZVRpcCIsImdvSGFsbCIsIm9uQnRuQ2xpY2tfY2xvc2VQYW5lbCIsInRhcmdldCIsIm9uQnRuQ2xpY2tfcXVlc3RQYW5lbCIsImNvbV9RdWVzdCIsIm9uQnRuQ2xpY2tfcmFua1BhbmVsIiwiY29tX3JhbmsiLCJvbkJ0bkNsaWNrX2FjdGl2aXR5UGFuZWwiLCJjb21fYWN0aXZpdHkiLCJ5aW5oYW5nQnV0dG9uQ2xpY2siLCJjb21fYmFuayIsInVwZGF0ZVZpZXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZEO0FBREosR0FIUDtBQVVMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVksQ0FBRyxDQVZsQjs7QUFZTDtBQUNKO0FBQ0E7QUFDSUMsRUFBQUEsa0NBQWtDLEVBQUUsOENBQVk7QUFDNUMsUUFBSUMsT0FBTyxHQUFHLEtBQUtMLFVBQUwsQ0FBZ0JNLFlBQWhCLENBQTZCLFdBQTdCLEVBQTBDQyxTQUExQyxDQUFvREMsY0FBcEQsQ0FBbUUsWUFB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e1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjYW52YXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkgeyB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye755m76ZmGXHJcbiAgICAgKi9cclxuICAgIGxvZ2luTWVudUxvZ2luQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWNjb3VudCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX0xvZ2luLmdldENoaWxkQnlOYW1lKFwiZWJfQWNjb3VudFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICB2YXIgcGFzc3dvcmQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9Mb2dpbi5nZXRDaGlsZEJ5TmFtZShcImViX1Bhc3N3b3JkXCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5sb2dpbkNsaWNrID0gdHJ1ZTtcclxuICAgICAgICBpZiAoYWNjb3VudCAhPT0gXCJcIiAmJiBwYXNzd29yZCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLmFjY291bnRDaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLmxvZ2luQWNjb3VudF9GdW5jdGlvbihzZWxmLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8ubG9naW5JcCwgYWNjb3VudCwgcGFzc3dvcmQpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75omT5byA5rOo5YaM55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIGxvZ2luTWVudVJlZ2lzdGVyQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9Mb2dpbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9SZWdpc3Rlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+WFs+mXreazqOWGjOeVjOmdolxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlck1lbnVCYWNrVG9Mb2dpbkJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fTG9naW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9SZWdpc3Rlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vms6jlhoxcclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJNZW51UmVnaXN0ZXJCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY2NvdW50ID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUmVnaXN0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9BY2NvdW50XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nO1xyXG4gICAgICAgIHZhciBwYXNzd29yZCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1JlZ2lzdGVyLmdldENoaWxkQnlOYW1lKFwiZWJfUGFzc3dvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbmZpcm0gPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9SZWdpc3Rlci5nZXRDaGlsZEJ5TmFtZShcImViX1Bhc3N3b3JkQ29uZmlybVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICBpZiAoIWFjY291bnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUmVnaXN0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9BY2NvdW50XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nID0gXCJub3QgbnVsbFwiO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUmVnaXN0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9QYXNzd29yZFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IFwibm90IG51bGxcIjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjY291bnQgJiYgcGFzc3dvcmQgJiYgY29uZmlybSkge1xyXG4gICAgICAgICAgICBpZiAocGFzc3dvcmQubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUmVnaXN0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9QYXNzd29yZFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IFwiTm8gbGVzcyB0aGFuIDYgRW5nbGlzaCB3b3JkcyBvciBudW1iZXJzXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFjY291bnQubGVuZ3RoIDwgMTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1JlZ2lzdGVyLmdldENoaWxkQnlOYW1lKFwiZWJfQWNjb3VudFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IFwiTm8gbGVzcyB0aGFuIDExIEVuZ2xpc2ggd29yZHMgb3IgbnVtYmVyc1wiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAocGFzc3dvcmQgIT09IGNvbmZpcm0pIHtcclxuICAgICAgICAgICAgLy8gICAgXHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5UmVnaXN0ZXJcIikuY29tX1JlZ2lzdGVyLmdldENoaWxkQnlOYW1lKFwiY29uX3JlZ2lzdGVyXCIpLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KCdSZXR1cm5SZWdpc3RlcmVkJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1JlZ2lzdGVyLmdldENoaWxkQnlOYW1lKFwiZWJfUGFzc3dvcmRDb25maXJtXCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nID0gXCJUaGUgdHdvIHZlcmlmaWNhdGlvbiBjb2RlcyBhcmUgZGlmZmVyZW50XCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieVJlZ2lzdGVyXCIpLm1sYXBpUmVnaXN0ZXJfRnVuY3Rpb24oYWNjb3VudCwgcGFzc3dvcmQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwbGF5ZXJJbmZvQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5iZ19CbGFjay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBtYWxsQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fTWFsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY2hhbmdlTWFsbFVJKDApO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX01hbGwuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fY2hvbmd6aGlfMDFcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9QbGF5ZXJJZFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIklEOiBcIiArIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikucGxheWVySW5mby5wbGF5ZXJJZDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgbWFsbE1lbnVCYWNrQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX01hbGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIG1hbGxNZW51UmVjaGFuZ2VCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm5vZGUucmVjaGFyZ2VJZCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IDNcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1vbmV5ID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5yZWNoYXJnZU1vbmV5QXJyYXlbaW5kZXhdO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX01hbGwuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fY2hvbmd6aGlfMDFcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9SZWNoYXJnZU1vbmV5XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nID0gbW9uZXkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgbWFsbE1lbnVBbGlQYXlCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBtb25leSA9IHBhcnNlRmxvYXQodGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fTWFsbC5nZXRDaGlsZEJ5TmFtZSgnY29tX2Nob25nemhpXzAxJykuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9SZWNoYXJnZU1vbmV5XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nKTtcclxuXHJcbiAgICAgICAgLy9pZiAobW9uZXkgJiYgbW9uZXkgPj0gNTApIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBheV9GdW5jdGlvbihtb25leSwgbnVsbCwgMik7XHJcbiAgICAgICAgLy99XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIG1hbGxNZW51V2VDaGF0UGF5QnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbW9uZXkgPSBwYXJzZUZsb2F0KHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX01hbGwuZ2V0Q2hpbGRCeU5hbWUoXCJjb21fY2hvbmd6aGlfMDFcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9SZWNoYXJnZU1vbmV5XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nKTtcclxuICAgICAgICAvL2lmIChtb25leSAmJiBtb25leSA+PSA1MCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikucGF5X0Z1bmN0aW9uKG1vbmV5LCBudWxsLCAxKTtcclxuICAgICAgICAvL31cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgbWFsbE1lbnVRcVBheUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG1vbmV5ID0gcGFyc2VGbG9hdCh0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9NYWxsLmdldENoaWxkQnlOYW1lKFwiY29tX2Nob25nemhpXzAxXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfUmVjaGFyZ2VNb25leVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyk7XHJcbiAgICAgICAgLy9pZiAobW9uZXkgJiYgbW9uZXkgPj0gNTApIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBheV9GdW5jdGlvbihtb25leSwgbnVsbCwgMik7XHJcbiAgICAgICAgLy99XHJcbiAgICB9LFxyXG4gICAgbWFsbE1lbnVRdWlja1BheUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICByZWNoYXJnZVdlYlZpZXdDbG9zZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fTWFsbC5nZXRDaGlsZEJ5TmFtZShcImNvbV9SZWNoYXJnZVdlYlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgbWFpbEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5iZ19CbGFjay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX01haWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0LmVtaXQoXCJnZXRFbWFpbFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgbWFpbE1lbnVDbG9zZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fTWFpbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBtYWlsTWVudU1haWxTZWxlY3RCdXR0b25DbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRNYWlsSW5mb19GdW5jdGlvbih0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgbWFpbE1lbnVHZXRCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuZ2V0TWFpbF9GdW5jdGlvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+aJk+W8gOiuvue9rueVjOmdolxyXG4gICAgICovXHJcbiAgICBzZXR0aW5nQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fU2V0dGluZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+WFs+mXreiuvue9rueVjOmdolxyXG4gICAgICovXHJcbiAgICBzZXR0aW5nTWVudUNsb3NlQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1NldHRpbmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76IOM5pmv6Z+z5LmQ5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIHNldHRpbmdNZW51TXVzaWNCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuc2V0dGluZ0NvbnRyb2xCdXR0b25DbGlja19GdW5jdGlvbih0aGlzLm5vZGUsIDApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+a4uOaIj+mfs+aViOaMiemSrlxyXG4gICAgICovXHJcbiAgICBzZXR0aW5nTWVudVNvdW5kRWZmZWN0QnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnNldHRpbmdDb250cm9sQnV0dG9uQ2xpY2tfRnVuY3Rpb24odGhpcy5ub2RlLCAxKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vorr7nva7pnaLmnb/kuK3nmoTpgIDlh7rmuLjmiI/mjInpkq5cclxuICAgICAqL1xyXG4gICAgc2V0dGluZ01lbnVFeGl0QnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5nYW1lLmVuZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+WIhuS6q+aMiemSrlxyXG4gICAgICovXHJcbiAgICBzaGFyZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNoYW5uZWwgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuZ2V0VXJsQ29kZV9GdW5jdGlvbihcImNoYW5uZWxcIik7XHJcbiAgICAgICAgaWYgKGNoYW5uZWwpIHtcclxuICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwodGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5wbGF5ZXJJbmZvLnNoYXJlVXJsICsgXCI/Y2hhbm5lbD1cIiArIGNoYW5uZWwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hhbm5lbCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikucGxheWVySW5mby5ndWVzdC5zcGxpdChcIl9cIik7XHJcbiAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikucGxheWVySW5mby5zaGFyZVVybCArIFwiP2NoYW5uZWw9XCIgKyBjaGFubmVsWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vlhZHmjaLmjInpkq5cclxuICAgICAqL1xyXG4gICAgZXhjaGFuZ2VCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmxvZygn54K55Ye75YWR5o2i5oyJ6ZKuPT09PT09PT09PT09JylcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikucGxheWVySW5mby5pc09mZmljYWwpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8uYWxpQWNjb3VudCAmJiB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8uaXNCaW5kQWxpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKFwi5YWR546w5b+F6aG757uR5a6a5pSv5LuY5a6dLFxcblxcbuimgeWJjeWOu+e7keWumuaUr+S7mOWuneWQlz9cIiwgMiwgMik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL+aJk+W8gOWFkeaNoueVjOmdolxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihcIuWFkeeOsOW/hemhu+e7keWumui0puWPtyxcXG5cXG7opoHliY3ljrvnu5HlrprotKblj7flkJc/XCIsIDIsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY3VzdG9tZXJTZXJ2aWNlQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fQ3VzdG9tZXJTZXJ2aWNlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgY3VzdG9tZXJTZXJ2aWNlTWVudVNlbmRCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBlID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fQ3VzdG9tZXJTZXJ2aWNlLmdldENoaWxkQnlOYW1lKFwiZWJfQ2hhdFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICBcIlwiICE9PSBlICYmICh0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnNlbmRNZXNzYWdlID0gZSwgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldC5lbWl0KFwic2VuZE1zZ1RvVXNlclwiLCB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogMTAsXHJcbiAgICAgICAgICAgIG1zZzogZVxyXG4gICAgICAgIH0pKSxcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fQ3VzdG9tZXJTZXJ2aWNlLmdldENoaWxkQnlOYW1lKFwiZWJfQ2hhdFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IFwiXCJcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY3VzdG9tZXJTZXJ2aWNlTWVudUNsb3NlQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX0N1c3RvbWVyU2VydmljZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vmiqLluoTniZvniZvmjInpkq5cclxuICAgICAqL1xyXG4gICAgZ3JhYkJ1bGxCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUgJiYgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5wbGF5ZXJJbmZvLm5lZWRUb1VwZGF0ZVsxXSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNoZWNrVXBkYXRlX0Z1bmN0aW9uKFwiR3JhYkJ1bGxcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5nYW1lTWVudUJ1dHRvbkNsaWNrX0Z1bmN0aW9uKFwiY29tX0dyYWJCdWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vmlpflnLDkuLvmjInpkq5cclxuICAgICAqL1xyXG4gICAgbGFuZEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSAmJiB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8ubmVlZFRvVXBkYXRlWzddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY2hlY2tVcGRhdGVfRnVuY3Rpb24oXCJMYW5kXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuZ2FtZU1lbnVCdXR0b25DbGlja19GdW5jdGlvbihcImNvbV9MYW5kXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+e6ouWMhei+vuS6uuaMiemSrlxyXG4gICAgICovXHJcbiAgICBob25nYmFvX0J1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSAmJiB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8ubmVlZFRvVXBkYXRlWzFdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY2hlY2tVcGRhdGVfRnVuY3Rpb24oXCJHYW1lX2hvbmdiYW9cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5nYW1lTWVudUJ1dHRvbkNsaWNrX0Z1bmN0aW9uKFwiY29tX0hvbmdiYW9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+i3keW+l+W/q+aMiemSrlxyXG4gICAgICovXHJcbiAgICBydW5CdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUgJiYgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5wbGF5ZXJJbmZvLm5lZWRUb1VwZGF0ZVs3XSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNoZWNrVXBkYXRlX0Z1bmN0aW9uKFwiUnVuaW5nXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuZ2FtZU1lbnVCdXR0b25DbGlja19GdW5jdGlvbihcImNvbV9SdW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+W+t+W3nuaJkeWFi+aMiemSrlxyXG4gICAgICovXHJcbiAgICBkekJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSAmJiB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8ubmVlZFRvVXBkYXRlWzddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY2hlY2tVcGRhdGVfRnVuY3Rpb24oXCJIb2xkZW1cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5nYW1lTWVudUJ1dHRvbkNsaWNrX0Z1bmN0aW9uKFwiY29tX0hvbGRlbVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76K+I6YeR6Iqx5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIHpqaEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSAmJiB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8ubmVlZFRvVXBkYXRlWzddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY2hlY2tVcGRhdGVfRnVuY3Rpb24oXCJGbG93ZXJcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5nYW1lTWVudUJ1dHRvbkNsaWNrX0Z1bmN0aW9uKFwiY29tX0Zsb3dlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7votKLnpZ7liLDmjInpkq5cclxuICAgICAqL1xyXG4gICAgQ2Fpc2hlbmRhb0J1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LkNBSVNIRU5fTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X0NhaXNoZW5Hb2xkJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vkuIrmtbcwMOWPkeaMiemSrlxyXG4gICAgICovXHJcbiAgICBTSDAwRkJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LlNIMDBGX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF9TaGFuZ2hhaTAwZmEnKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+WkquaegeeGiueMq+aMiemSrlxyXG4gICAgICovXHJcbiAgICBUYWlqaVBhbmRhQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuVGFpamlQYW5kYV9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfVGFpaml4aW9uZ21hbycpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gKiDngrnlh7vmoqblubvlpbPnpZ7mjInpkq5cclxuICovXHJcbiAgICBNSE5TQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuTUhOU19MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfTWVuZ2h1YW5udnNoZW4nKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICog54K55Ye75pe65a6d5oyJ6ZKuXHJcbiAqL1xyXG4gICAgV0JDbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5XQl9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfV2FuZ2JhbycpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gKiDngrnlh7vkuIDot6/lj5Hlj5HmjInpkq5cclxuICovXHJcbiAgICBZTEZGQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuWUxGRkZfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X1lpbHVmYWZhZmEnKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICog54K55Ye75LqU56aP5Li06Zeo5oyJ6ZKuXHJcbiAqL1xyXG4gICAgV0ZMTUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LldGTE1fTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X1d1ZnVsaW5tZW4nKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+W/oOiCneS5ieiDhuaMiemSrlxyXG4gICAgICovXHJcbiAgICBaSFlEQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuWkdZRF9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfWmhvbmdnYW55aWRhbicpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog54K55Ye7546J6JKy5ZuiMuaMiemSrlxyXG4gICAgICovXHJcbiAgICBZUFQyQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuWVBUMl9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfWXVwdXR1YW4yJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vmvZjph5HojrLmjInpkq5cclxuICAgICAqL1xyXG4gICAgUEpMQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuUEpMX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF9QYW5qaW5saWFuJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vlk6rlkJLpl7nmtbfmjInpkq5cclxuICAgICAqL1xyXG4gICAgTlpOSEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93Lk5aTkhfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X05lemhhbmFvaGFpJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vlkJXluIPmiI/osoLonYnmjInpkq5cclxuICAgICAqL1xyXG4gICAgTEJYRENCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5MQlhEQ19MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfTHZidXhpZGlhb2NoYW4nKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+awtOaenOmSu+efs+aMiemSrlxyXG4gICAgICovXHJcbiAgICBEaWFtb25kQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuRElBTU9ORF9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfRGlhbW9uZFN0cmlrZScpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76LSi5rqQ5rua5rua5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIENZR0dCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5DWUdHX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF9DYWl5dWFuZ3VuZ3VuJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vln4Plj4rnj43lrp3mjInpkq5cclxuICAgICAqL1xyXG4gICAgRUZCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5FRl9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfRWd5cHRpYW5UcmVhc3VyZXMnKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAqIOeCueWHu+WGsOeQg+eqgeegtOaMiemSrlxyXG4gKi9cclxuICAgIEJRVFBCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5CUVRQX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF9iaW5ncWl1dHVwbycpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuKiDngrnlh7vnvo7lpbPmuLjms7PpmJ/mjInpkq5cclxuKi9cclxuICAgIE1OWVlEQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuTU5ZWURfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X01laW52eW91eW9uZ2R1aScpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAqIOeCueWHu+aciOWFieWuneebkuaMiemSrlxyXG4gKi9cclxuICAgIFlHQkhCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5ZR0JIX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF95dWVndWFuZ2Jhb2hlJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gKiDngrnlh7vlg7XlsLjlhYjnlJ/mjInpkq5cclxuICovXHJcbiAgICBKU1hTQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuSlNYU19MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfSmlhbmdzaGl4aWFuc2hlbmcnKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAqIOeCueWHu+awtOa1kuS8oOaMiemSrlxyXG4gKi9cclxuICAgIFNIWkJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LlNIWl9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfU2h1aWh1emh1YW4nKTtcclxuICAgIH0sXHJcblxyXG4gICAgR3JlYXRCbHVlQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuR3JlYXRCbHVlX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF9HcmVhdEJsdWUnKTtcclxuICAgIH0sXHJcbiAgICBUcmV4Q2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cudHJleF9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfdHJleCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBJcmlzaEx1Y2tCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5JcmlzaEx1Y2tfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X0lyaXNoTHVjaycpO1xyXG4gICAgfSxcclxuXHJcbiAgICBJY2VsYW5kQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuSWNlbGFuZF9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfSWNlbGFuZCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBQYW50aGVyTW9vbkJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LlBhbnRoZXJNb29uX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF9QYW50aGVyTW9vbicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBJbmRpYW5NeXRoQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuSW5kaWFuTXl0aF9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfSW5kaWFuTXl0aCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBKYXBhbkZvcnR1cmVCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5KYXBhbkZvcnR1cmVfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X0phcGFuRm9ydHVyZScpO1xyXG4gICAgfSxcclxuXHJcbiAgICBCb251c0JlYXJzQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuQm9udXNCZWFyc19MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfQm9udXNCZWFycycpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+awtOaenOacuuaMiemSrlxyXG4gICAgICovXHJcbiAgICBTaHVpZ3VvamlCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdnYW1lX3NodWlndW9qaScpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICog54K55Ye75rC05p6c5py656uW54mIIOaMiemSrlxyXG4gKi9cclxuICAgIFNodWlndW9qaXNodWJhbkJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ2dhbWVfc2h1aWd1b2ppX3NodWJhbicpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiDngrnlh7vpk4Ppk5vmuLjmiI/mjInpkq5cclxuICAgICovXHJcbiAgICBMaW5nZGFuZ3lvdXhpQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnZ2FtZV9saW5nZGFuZ3lvdXhpJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7tTYWZhcmnmjInpkq5cclxuICAgICAqL1xyXG4gICAgU2FmYXJpQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnZ2FtZV9TYWZhcmknKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICog54K55Ye7Um9tZUdsb3J55oyJ6ZKuXHJcbiAqL1xyXG4gICAgUm9tZUdsb3J5QnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuUk9NQV9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfUm9tZUdsb3J5Jyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAqIOeCueWHu1JvbWVHbG9yeeaMiemSrlxyXG4gKi9cclxuICAgIGpva2VyQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF9qb2tlcicpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4qIOeCueWHu2FsYWRpbmfmjInpkq5cclxuKi9cclxuICAgIGFsYWRpbmdCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5BTEFESU5HX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF9BbGFkaW5nJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4qIOeCueWHu+mUpuiho+WNq+aMiemSrlxyXG4qL1xyXG5cclxuICAgIGppbnlpd2VpQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuSllXX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF9KaW55aXdlaScpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzYW5kYWJhaWd1amluZ0J1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LlNEQkdKX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF9zYW5kYWJhaWd1amluZycpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4qIOeCueWHu+eOieiSsuWbouaMiemSrlxyXG4qL1xyXG5cclxuICAgIHl1cHV0dWFuQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuWVBUX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnU2xvdF9ZdXB1dHVhbicpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4qIOeCueWHu+awtOaenOWwj+eOm+S4veaMiemSrlxyXG4qL1xyXG4gICAgc2d4bWxCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5TR1hNTF9MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfU2h1aWd1b3hpYW9tYWxpJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiog54K55Ye76Zi/5YW554m55YWL5oyJ6ZKuXHJcbiovXHJcbiAgICBBWlRLQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuQVpUS19MT0JCWU5FVCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQ7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmUoJ1Nsb3RfYXp0ZWMnKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7votKLnpZ7lpLrlrp3mjInpkq5cclxuICAgICAqL1xyXG4gICAgQ1NEQkJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LkNTREJfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X0NhaXNoZW5kdW9iYW8nKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAqIOeCueWHu+e7tOWKoOaWr+S5i+WknOaMiemSrlxyXG4gKi9cclxuICAgIFdKU1pZQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuV0pTWllfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X1dlaWppYXNpemhpeWUnKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOeCueWHu+i0ouelnuWIsOaMiemSrlxyXG4gICAgKi9cclxuICAgIENTREhZQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuQ1NESFlfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X0NhaXNoZW5kYW8nKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiog54K55Ye7RmlyZTg45oyJ6ZKuXHJcbiovXHJcbiAgICBGaXJlODhCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5GSVJFODhfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X0ZpcmU4OCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuKiDngrnlh7vopb/muLjorrAg5oyJ6ZKuXHJcbiovXHJcbiAgICBYWUpCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5YWUpfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdTbG90X1hpeW91eGknKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu0FUVOi/nueOr+eCrlxyXG4gICAgICovXHJcbiAgICBBVFRCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5BVFRfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgICAgIHRoaXMuUWllSHVhblNjZW5lKCdnYW1lX0FUVGxpYW5odWFucGFvJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye757K+54G15aWz546L5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIEppbndCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIGlmKGNjLnN5cy5pc05hdGl2ZSAmJiB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8ubmVlZFRvVXBkYXRlWzddKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jaGVja1VwZGF0ZV9GdW5jdGlvbihcIkppbndcIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2VcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuZ2FtZU1lbnVCdXR0b25DbGlja19GdW5jdGlvbihcImNvbV9KaW53XCIpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnZ2FtZV9qbG53Jyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vkuIflnKPoioLmjInpkq5cclxuICAgICAqL1xyXG4gICAgV3NqQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnZ2FtZV93c2onKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHuzNE6Laz55CD5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIEZvb3RiYWxsQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZSgnZ2FtZV8zRGZvb3RiYWxsJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgZ2FtZU1lbnVCYWNrQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmdhbWVNZW51QmFja0J1dHRvbkNsaWNrX0Z1bmN0aW9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76L+b5YWl5oqi5bqE54mb54mb5oi/6Ze0XHJcbiAgICAgKi9cclxuICAgIGdyYWJCdWxsUm9vbUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5sb2dpbkdhbWVSb29tX0Z1bmN0aW9uKHRoaXMsIFwiR3JhYkJ1bGxcIik7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAqIOeCueWHu+i/m+WFpee6ouWMhei+vuS6uuaIv+mXtFxyXG4gKi9cclxuICAgIGhvbmdiYW9Sb29tQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmxvZ2luR2FtZVJvb21fRnVuY3Rpb24odGhpcywgXCJob25nYmFvXCIpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vov5vlhaXmlpflnLDkuLvmiL/pl7RcclxuICAgICAqL1xyXG4gICAgbGFuZFJvb21CdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubG9naW5HYW1lUm9vbV9GdW5jdGlvbih0aGlzLCBcIkxhbmRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76L+b5YWl6LeR5b6X5b+r5oi/6Ze0XHJcbiAgICAgKi9cclxuICAgIHJ1blJvb21CdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubG9naW5HYW1lUm9vbV9GdW5jdGlvbih0aGlzLCBcIlJ1bmluZ1wiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vov5vlhaXlvrflt57miZHlhYvmiL/pl7RcclxuICAgICAqL1xyXG4gICAgZHpSb29tQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmxvZ2luR2FtZVJvb21fRnVuY3Rpb24odGhpcywgXCJIb2xkZW1cIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76L+b5YWl54K46YeR6Iqx5oi/6Ze0XHJcbiAgICAgKi9cclxuICAgIHpqaFJvb21CdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubG9naW5HYW1lUm9vbV9GdW5jdGlvbih0aGlzLCBcIkZsb3dlclwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov57njq/lpLrlrp1cclxuICAgICAqL1xyXG4gICAgbGhkYkJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmVfbm9ybWFsKCdMaWFuaHVhbmR1b2JhbycpO1xyXG4gICAgICAgIHdpbmRvdy5MSERCX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vov5vlhaXmjZXpsbzmiL/pl7RcclxuICAgICAqL1xyXG4gICAgZmlzaFJvb21CdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubG9naW5HYW1lUm9vbV9GdW5jdGlvbih0aGlzLCBcIkZpc2hcIik7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vov5vlhaXmjZXpsbzmtbfnjosy5oi/6Ze0XHJcbiAgICAgKi9cclxuICAgIGZpc2hSb29tX2hhaXdhbmcyQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmxvZ2luR2FtZVJvb21fRnVuY3Rpb24odGhpcywgXCJGaXNoaGFpd2FuZzJcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76L+b5YWl5qyn5rSy6L2u55uY5oi/6Ze0XHJcbiAgICAgKi9cclxuICAgIHJvdWxldHRlUm9vbUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5sb2dpbkdhbWVSb29tX0Z1bmN0aW9uKHRoaXMsIFwiUm91bGV0dGVcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Lez6L2s5ZCE56eN6ICB6JmO5py655WM6Z2iXHJcbiAgICAgKi9cclxuICAgIFFpZUh1YW5TY2VuZTogZnVuY3Rpb24gKHNjZW5lTmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KCdMb2JieU1haW4nKS5uZXRXb3JrLmNvbm5lY3RlZCA9PSBmYWxzZSkgeyAvL+WIpOaWreWkp+WOheacjeWKoeWZqOaYr+WQpui/nuaOpVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgbG9hZGluZ05vZGUgPSBzZWxmLmNhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0xvYWRpbmcnKTtcclxuICAgICAgICBsb2FkaW5nTm9kZS5hY3RpdmUgPSB0cnVlOyAvL+eCueS6ruWKoOi9vea4uOaIj+eVjOmdolxyXG4gICAgICAgIGxldCBwcm9ncmVzc0Jhck5vZGUgPSBsb2FkaW5nTm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZGluZ1Byb2dyZXNzQmFyJyk7XHJcbiAgICAgICAgbGV0IGxvYWRUeHQgPSBjYy5maW5kKFwicGJfTG9hZGluZ190eHRcIiwgcHJvZ3Jlc3NCYXJOb2RlKTtcclxuICAgICAgICAvL+WIneWni+WMllxyXG4gICAgICAgIHByb2dyZXNzQmFyTm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gMDtcclxuICAgICAgICBsb2FkVHh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gMCArIFwiJVwiO1xyXG4gICAgICAgIHRoaXMucCA9IDA7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKHNjZW5lTmFtZSwgKGNvbXBsZXRlZENvdW50LCB0b3RhbENvdW50LCBpdGVtKSA9PiB7IC8v6aKE5Yqg6L295Zy65pmvJuebkeWQrOWKoOi9vei/m+W6plxyXG4gICAgICAgICAgICBpZiAodGhpcy5wIDwgY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9hZFByb2dyZXNzID0gY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wID0gbG9hZFByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXJOb2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSBsb2FkUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICBsb2FkVHh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKGxvYWRQcm9ncmVzcyAqIDEwMCkudG9GaXhlZCgyKSArIFwiJVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgKGVyciwgc2NlbmUpID0+IHtcclxuICAgICAgICAgICAgLy8gbG9hZGluZ05vZGUuYWN0aXZlID0gZmFsc2U7IC8v6ZqQ6JeP5Yqg6L295ri45oiP55WM6Z2iXHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHNjZW5lTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pmu6YCa6Lez6L2s5Zy65pmv55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIFFpZUh1YW5TY2VuZV9ub3JtYWwoc2NlbmVOYW1lLCBjYikge1xyXG4gICAgICAgIGxldCBsb2FkaW5nTm9kZSA9IGNjLmZpbmQoXCJDYW52YXNcIikuZ2V0Q2hpbGRCeU5hbWUoJ0xvYWRpbmcnKTtcclxuICAgICAgICBsb2FkaW5nTm9kZS5hY3RpdmUgPSB0cnVlOyAvL+eCueS6ruWKoOi9vea4uOaIj+eVjOmdolxyXG4gICAgICAgIGxldCBwcm9ncmVzc0Jhck5vZGUgPSBsb2FkaW5nTm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZGluZ1Byb2dyZXNzQmFyJyk7XHJcbiAgICAgICAgbGV0IGxvYWRUeHQgPSBjYy5maW5kKFwicGJfTG9hZGluZ190eHRcIiwgcHJvZ3Jlc3NCYXJOb2RlKTtcclxuICAgICAgICAvL+WIneWni+WMllxyXG4gICAgICAgIHByb2dyZXNzQmFyTm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gMDtcclxuICAgICAgICBsb2FkVHh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gMCArIFwiJVwiO1xyXG4gICAgICAgIHRoaXMucCA9IDA7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKHNjZW5lTmFtZSwgKGNvbXBsZXRlZENvdW50LCB0b3RhbENvdW50LCBpdGVtKSA9PiB7IC8v6aKE5Yqg6L295Zy65pmvJuebkeWQrOWKoOi9vei/m+W6plxyXG4gICAgICAgICAgICBpZiAodGhpcy5wIDwgY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9hZFByb2dyZXNzID0gY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wID0gbG9hZFByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXJOb2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSBsb2FkUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICBsb2FkVHh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKGxvYWRQcm9ncmVzcyAqIDEwMCkudG9GaXhlZCgyKSArIFwiJVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgKGVyciwgc2NlbmUpID0+IHtcclxuICAgICAgICAgICAgLy8gbG9hZGluZ05vZGUuYWN0aXZlID0gZmFsc2U7IC8v6ZqQ6JeP5Yqg6L295ri45oiP55WM6Z2iXHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHNjZW5lTmFtZSwgY2IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVNZXNzYWdlQm94Q29uZmlybUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidF9DbG9zZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNoZWNrVXBkYXRlX0Z1bmN0aW9uKFwiXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVNZXNzYWdlQm94Q2xvc2V1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkdhbWVVcGRhdGVcIikuZ2FtZU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1VwZGF0ZU1lc3NhZ2VCb3guYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5iZ19CbGFjay5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBtZXNzYWdlQm94Q29uZmlybUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fTWVzc2FnZUJveC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubWVzc2FnZUJveE9wZXJhdGlvblR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvQnV0dG9uc0FuZENvbXBvbmVudENoYW5nZV9GdW5jdGlvbih0aGlzLmNhbnZhc05vZGUsIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJidF9DcmVhdGVBY2NvdW50XCIpLCBcImNvbV9DcmVhdGVBY2NvdW50XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVySW5mb0J1dHRvbnNBbmRDb21wb25lbnRDaGFuZ2VfRnVuY3Rpb24odGhpcy5jYW52YXNOb2RlLCB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQmluZEFsaVwiKSwgXCJjb21fQmluZEFsaVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllckluZm9CdXR0b25zQW5kQ29tcG9uZW50Q2hhbmdlX0Z1bmN0aW9uKHRoaXMuY2FudmFzTm9kZSwgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImJ0X0JpbmRQaG9uZVwiKSwgXCJjb21fQmluZFBob25lXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuYmdfQmxhY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldC5lbWl0KFwiQmFua0luZm9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdDogMyxcclxuICAgICAgICAgICAgICAgICAgICBjYXJkSWQ6IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuZWRpdENhcmRJZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieVJlZ2lzdGVyXCIpLnJlZ2lzdGVyQWNjb3VudF9GdW5jdGlvbih0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8ubG9naW5JcCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgIHZhciBhY2NvdW50ID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VBY2NvdW50XCIpLmdldENoaWxkQnlOYW1lKFwiZWJfQWNjb3VudFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICAgICAgICAgIHZhciBwYXNzd29yZCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlQWNjb3VudFwiKS5nZXRDaGlsZEJ5TmFtZShcImViX1Bhc3N3b3JkXCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLmxvZ2luQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1RpcHMuZ2V0Q2hpbGRCeU5hbWUoXCJzcF9Mb2dpbmluZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsubG9nb3V0QWNjb3VudF9GdW5jdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5hY2NvdW50Q2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsubG9naW5BY2NvdW50X0Z1bmN0aW9uKHNlbGYuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikucGxheWVySW5mby5sb2dpbklwLCBhY2NvdW50LCBwYXNzd29yZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImJ0X1BsYXllckluZm9CYWNrXCIpLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVySW5mb0J1dHRvbnNBbmRDb21wb25lbnRDaGFuZ2VfRnVuY3Rpb24odGhpcy5jYW52YXNOb2RlLCB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiYnRfQ2hhbmdlQWNjb3VudFwiKSwgXCJjb21fQ2hhbmdlQWNjb3VudFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlR2FtZSgpO1xyXG4gICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dfb3V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubWVzc2FnZUJveE9wZXJhdGlvblR5cGUgPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBtZXNzYWdlQm94Q2FuY2VsQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubWVzc2FnZUJveE9wZXJhdGlvblR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5iZ19CbGFjay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9NZXNzYWdlQm94LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubWVzc2FnZUJveE9wZXJhdGlvblR5cGUgPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBtZXNzYWdlQm94R29Ub01hbGxCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX01lc3NhZ2VCb3guYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tYWxsQnV0dG9uQ2xpY2tfRnVuY3Rpb24oKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vph43mlrDov57mjqXmuLjmiI/mjInpkq5cclxuICAgICAqL1xyXG4gICAgcmVjb25uZXRlZEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5yZWNvbm50ZXRlZEdhbWVfRnVuY3Rpb24oKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vnjqnlrrbkv6Hmga/mjInpkq5cclxuICAgICAqL1xyXG4gICAgcGxheWVySW5mb01lbnVCYWNrQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuYmdfQmxhY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHBsYXllckluZm9NZW51Q3JlYXRlQWNjb3VudEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvQnV0dG9uc0FuZENvbXBvbmVudENoYW5nZV9GdW5jdGlvbih0aGlzLmNhbnZhc05vZGUsIHRoaXMubm9kZSwgXCJjb21fQ3JlYXRlQWNjb3VudFwiKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwbGF5ZXJJbmZvTWVudUNoYW5nZU5hbWVCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mb0J1dHRvbnNBbmRDb21wb25lbnRDaGFuZ2VfRnVuY3Rpb24odGhpcy5jYW52YXNOb2RlLCB0aGlzLm5vZGUsIFwiY29tX0NoYW5nZU5hbWVcIik7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcGxheWVySW5mb01lbnVDaGFuZ2VBY2NvdW50QnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm9CdXR0b25zQW5kQ29tcG9uZW50Q2hhbmdlX0Z1bmN0aW9uKHRoaXMuY2FudmFzTm9kZSwgdGhpcy5ub2RlLCBcImNvbV9DaGFuZ2VBY2NvdW50XCIpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHBsYXllckluZm9NZW51QmluZEFsaUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvQnV0dG9uc0FuZENvbXBvbmVudENoYW5nZV9GdW5jdGlvbih0aGlzLmNhbnZhc05vZGUsIHRoaXMubm9kZSwgXCJjb21fQmluZEFsaVwiKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwbGF5ZXJJbmZvTWVudUJpbmRlZEFsaUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvQnV0dG9uc0FuZENvbXBvbmVudENoYW5nZV9GdW5jdGlvbih0aGlzLmNhbnZhc05vZGUsIHRoaXMubm9kZSwgXCJjb21fQmluZGVkQWxpXCIpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHBsYXllckluZm9NZW51QmluZENyZWRpdENhcmRCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mb0J1dHRvbnNBbmRDb21wb25lbnRDaGFuZ2VfRnVuY3Rpb24odGhpcy5jYW52YXNOb2RlLCB0aGlzLm5vZGUsIFwiY29tX0JpbmRDcmVkaXRDYXJkXCIpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHBsYXllckluZm9NZW51QmluZGVkQ3JlZGl0Q2FyZEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvQnV0dG9uc0FuZENvbXBvbmVudENoYW5nZV9GdW5jdGlvbih0aGlzLmNhbnZhc05vZGUsIHRoaXMubm9kZSwgXCJjb21fQmluZGVkQ3JlZGl0Q2FyZFwiKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwbGF5ZXJJbmZvTWVudUNoYW5nZVBhc3N3b3JkQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm9CdXR0b25zQW5kQ29tcG9uZW50Q2hhbmdlX0Z1bmN0aW9uKHRoaXMuY2FudmFzTm9kZSwgdGhpcy5ub2RlLCBcImNvbV9DaGFuZ2VQYXNzd29yZFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcGxheWVySW5mb01lbnVCaW5kUGhvbmVCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8ucGhvbmVOdW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvQnV0dG9uc0FuZENvbXBvbmVudENoYW5nZV9GdW5jdGlvbih0aGlzLmNhbnZhc05vZGUsIHRoaXMubm9kZSwgXCJjb21fQmluZGVkUGhvbmVcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvQnV0dG9uc0FuZENvbXBvbmVudENoYW5nZV9GdW5jdGlvbih0aGlzLmNhbnZhc05vZGUsIHRoaXMubm9kZSwgXCJjb21fQmluZFBob25lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcGxheWVySW5mb01lbnVGYWNlQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm9CdXR0b25zQW5kQ29tcG9uZW50Q2hhbmdlX0Z1bmN0aW9uKHRoaXMuY2FudmFzTm9kZSwgdGhpcy5ub2RlLCBcImNvbV9mYWNlXCIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2NvbV9mYWNlJykuZ2V0Q29tcG9uZW50KCdMb2JieUJ1dHRvbkNsaWNrJykuY2hhbmdlSGVhZFNleF9GdW5jdGlvbihudWxsLCAxKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7Kn0gbWFpblJvb3QgXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbVJvb3QgXHJcbiAgICAgKiBAcGFyYW0geyp9IGluZGV4IFxyXG4gICAgICovXHJcbiAgICBwbGF5ZXJJbmZvQnV0dG9uc0FuZENvbXBvbmVudENoYW5nZV9GdW5jdGlvbjogZnVuY3Rpb24gKG1haW5Sb290LCBjb21Sb290LCBpbmRleCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgMTA7IGkrKykge1xyXG4gICAgICAgICAgICBtYWluUm9vdC5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KFwiY2MuQnV0dG9uXCIpLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbVJvb3QuZ2V0Q29tcG9uZW50KFwiY2MuQnV0dG9uXCIpLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAoaSA9IDEwOyBpIDwgbWFpblJvb3QuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1haW5Sb290LmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShpbmRleCkuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rotKblj7dcclxuICAgICAqL1xyXG4gICAgY3JlYXRlQWNjb3VudE1lbnVDcmVhdGVCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY2NvdW50ID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DcmVhdGVBY2NvdW50XCIpLmdldENoaWxkQnlOYW1lKFwiZWJfQWNjb3VudFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICB2YXIgcGFzc3dvcmQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NyZWF0ZUFjY291bnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9QYXNzd29yZFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICB2YXIgY29uZmlybSA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ3JlYXRlQWNjb3VudFwiKS5nZXRDaGlsZEJ5TmFtZShcImViX1Bhc3N3b3JkQ29uZmlybVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICB0aGlzLmVkaXRCb3hFZGl0aW5nQmVnaW5fRnVuY3Rpb24oXCJjcmVhdGVBY2NvdW50XCIpO1xyXG5cclxuICAgICAgICBpZiAoIWFjY291bnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUmVnaXN0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9BY2NvdW50XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nID0gXCLotKblj7fkuI3og73kuLrnqbpcIjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1JlZ2lzdGVyLmdldENoaWxkQnlOYW1lKFwiZWJfUGFzc3dvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIuWvhueggeS4jeiDveS4uuepulwiO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWNjb3VudCAmJiBwYXNzd29yZCAmJiBjb25maXJtKSB7XHJcbiAgICAgICAgICAgIGlmIChhY2NvdW50Lmxlbmd0aCA8IDYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ3JlYXRlQWNjb3VudFwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHMwXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi6LSm5Y+36Iez5bCRNuS4quaVsOWtl+aIluWtl+avjVwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXNzd29yZC5sZW5ndGggPCA2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NyZWF0ZUFjY291bnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzMVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIuWvhueggeiHs+WwkTbkuKrmlbDlrZfmiJblrZfmr41cIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFzc3dvcmQgIT09IGNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ3JlYXRlQWNjb3VudFwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHMyXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5a+G56CB5LiO56Gu6K6k5a+G56CB5LiN5LiA6Ie0XCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQuZW1pdChcImNoYW5nZU9mZmljaWFsXCIsIHtcclxuICAgICAgICAgICAgICAgIG5ld0FjY291bnQ6IGFjY291bnQsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VOYW1lTWVudUNoYW5nZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5pY2tOYW1lID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VOYW1lXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICBpZiAobmlja05hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgLy/ov4fmu6TmlY/mhJ/lrZdcclxuICAgICAgICAgICAgdmFyIHdvcmRGaWx0ZXIgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLndvcmRGaWx0ZXIuY2hlY2tGaWx0ZXIobmlja05hbWUpO1xyXG4gICAgICAgICAgICBpZiAobmlja05hbWUgIT09IHdvcmRGaWx0ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlTmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcImViX05hbWVcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIuWQjeWtl+S4jeespuWQiOinhOWumlwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQuZW1pdChcInVwZGF0ZU5pY2tOYW1lXCIsIHtcclxuICAgICAgICAgICAgICAgIG5ld05pY2tOYW1lOiBuaWNrTmFtZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZUFjY291bnRNZW51Q2hhbmdlQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWNjb3VudCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlQWNjb3VudFwiKS5nZXRDaGlsZEJ5TmFtZShcImViX0FjY291bnRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmc7XHJcbiAgICAgICAgdmFyIHBhc3N3b3JkID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VBY2NvdW50XCIpLmdldENoaWxkQnlOYW1lKFwiZWJfUGFzc3dvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmc7XHJcbiAgICAgICAgaWYgKGFjY291bnQgJiYgcGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5zaG93TWVzc2FnZWJveF9GdW5jdGlvbihcIuaCqOeahOi0puWPt+WmguaenOayoeaciei9rOato++8jFxcbuWIh+aNoui0puWPt+WwhuWvvOiHtOi0puWPt+aJvuS4jeWbnuadpe+8gVxcblxcbuaCqOehruWumuimgeWIh+aNoui0puWPt+WQlz9cIiwgMiwgNyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VBY2NvdW50TWVudVJlZ2lzdGVyQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKFwi5L2g56Gu5a6a5rOo5YaM5paw6LSm5Y+35ZCXP1wiLCAyLCA2KTtcclxuICAgIH0sXHJcbiAgICBjaGFuZ2VBY2NvdW50TWVudUZvcmdvdEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7IH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5HlrprmlK/ku5jlrp3otKblj7dcclxuICAgICAqL1xyXG4gICAgYmluZEFsaU1lbnVCaW5kQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWNjb3VudCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZEFsaVwiKS5nZXRDaGlsZEJ5TmFtZShcImViX0FjY291bnRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbmZpcm0gPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRBbGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9BY2NvdW50Q29uZmlybVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICB2YXIgbmlja05hbWUgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRBbGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9OYW1lXCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nO1xyXG4gICAgICAgIHRoaXMuZWRpdEJveEVkaXRpbmdCZWdpbl9GdW5jdGlvbihcImJpbmRBbGlcIik7XHJcbiAgICAgICAgaWYgKGFjY291bnQgJiYgY29uZmlybSAmJiBuaWNrTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoYWNjb3VudCAhPT0gY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQWxpXCIpLmdldENoaWxkQnlOYW1lKFwibGJfVGlwczBcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLotKblj7fkuI7noa7orqTotKblj7fkuI3kuIDoh7RcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0LmVtaXQoXCJiaW5kWmhpZnViYW9cIiwge1xyXG4gICAgICAgICAgICAgICAgemhpZnViYW86IGFjY291bnQsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuaWNrTmFtZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGJpbmRlZEFsaUNoYW5nZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kZWRBbGlcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VBbGlcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZUFsaVwiKS5nZXRDaGlsZEJ5TmFtZShcImViX0FjY291bnRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlQWxpXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfQWNjb3VudENvbmZpcm1cIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlQWxpXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfTmFtZVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZUFsaUFjY291bnRTdWJtaXRCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY2NvdW50ID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VBbGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9BY2NvdW50XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nO1xyXG4gICAgICAgIHZhciBjb25maXJtID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VBbGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9BY2NvdW50Q29uZmlybVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICB2YXIgbmlja05hbWUgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZUFsaVwiKS5nZXRDaGlsZEJ5TmFtZShcImViX05hbWVcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmc7XHJcbiAgICAgICAgdGhpcy5lZGl0Qm94RWRpdGluZ0JlZ2luX0Z1bmN0aW9uKFwiY2hhbmdlQWxpXCIpO1xyXG4gICAgICAgIGlmIChhY2NvdW50ICYmIGNvbmZpcm0gJiYgbmlja05hbWUpIHtcclxuICAgICAgICAgICAgaWYgKGFjY291bnQgIT09IGNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZEFsaVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHMwXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi6LSm5Y+35LiO56Gu6K6k6LSm5Y+35LiN5LiA6Ie0XCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldC5lbWl0KFwiYmluZFpoaWZ1YmFvXCIsIHtcclxuICAgICAgICAgICAgICAgIHpoaWZ1YmFvOiBhY2NvdW50LFxyXG4gICAgICAgICAgICAgICAgbmFtZTogbmlja05hbWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VBbGlBY2NvdW50QmFja0J1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kZWRBbGlcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZUFsaVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgYmluZENyZWRpdENhcmRTZWxlY3RCYW5rQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9BZGRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwic3ZfU2VsZWN0QmFua1wiKS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9BZGRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwic3ZfU2VsZWN0QmFua1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0FkZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzdl9TZWxlY3RCYW5rXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBiaW5kQ3JlZGl0Q2FyZE1lbnVTdWJtaXRCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBvd25lciA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQWRkQ3JlZGl0Q2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImViX093bmVyXCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nO1xyXG4gICAgICAgIHZhciBjYXJkTm8gPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0FkZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9DYXJkTm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbmZpcm0gPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0FkZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9DYXJkTm9Db25maXJtXCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAob3duZXIgJiYgY2FyZE5vICYmIGNvbmZpcm0pIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRObyA9PT0gY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuYmFua1NlbGVjdCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNyZWRpdENhcmRPYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnQ6IGNhcmRObyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFua1R5cGU6IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuYmFua1NlbGVjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZElkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBvd25lcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8ucGxheWVySWRcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQuZW1pdChcIkJhbmtJbmZvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50OiBjYXJkTm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG93bmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYW5rVHlwZTogdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5iYW5rU2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQWRkQ3JlZGl0Q2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHMwXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi6K+36YCJ5oup6ZO26KGM5Y2h57G75Z6LXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0FkZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzMFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIuS/oeeUqOWNoeWPt+S4juehruiupOWNoeWPt+S4jeS4gOiHtFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9BZGRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwibGJfVGlwczBcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLor7fmraPnoa7ovpPlhaXmjIHljaHkurrkuI7ljaHlj7dcIjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGJpbmRDcmVkaXRDYXJkTWVudUJhY2tCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQWRkQ3JlZGl0Q2FyZFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0JpbmRDcmVkaXRDYXJkXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGJpbmRDcmVkaXRDYXJkTWVudUVkaXRCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuZWRpdENhcmRJZCA9IHRoaXMubm9kZS5jYXJkSWQ7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQ3JlZGl0Q2FyZFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0VkaXRDcmVkaXRDYXJkXCIpLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5iYW5rTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNhcmRJZCA9PT0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5iYW5rTGlzdFtpXS5jYXJkSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9DYXJkTm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJhbmtMaXN0W2ldLmFjY291bnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0VkaXRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfQ2FyZE5vQ29uZmlybVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuYmFua0xpc3RbaV0uYWNjb3VudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9Pd25lclwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZyA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuYmFua0xpc3RbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidF9TZWxlY3RCYW5rXCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzdl9TZWxlY3RCYW5rXCIpLmdldENvbXBvbmVudChcImNjLlNjcm9sbFZpZXdcIikuY29udGVudC5jaGlsZHJlblt0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJhbmtMaXN0W2ldLmJhbmtUeXBlXS5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJhbmtTZWxlY3QgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJhbmtMaXN0W2ldLmJhbmtUeXBlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGJpbmRDcmVkaXRDYXJkTWVudUFkZEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQ3JlZGl0Q2FyZFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0FkZENyZWRpdENhcmRcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0FkZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9DYXJkTm9cIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQWRkQ3JlZGl0Q2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImViX0NhcmROb0NvbmZpcm1cIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQWRkQ3JlZGl0Q2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImViX093bmVyXCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0FkZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidF9TZWxlY3RCYW5rXCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQWRkQ3JlZGl0Q2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcInN2X1NlbGVjdEJhbmtcIikuZ2V0Q29tcG9uZW50KFwiY2MuU2Nyb2xsVmlld1wiKS5jb250ZW50LmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgZWRpdENyZWRpdENhcmRTZWxlY3RCYW5rQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9FZGl0Q3JlZGl0Q2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcInN2X1NlbGVjdEJhbmtcIikuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzdl9TZWxlY3RCYW5rXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzdl9TZWxlY3RCYW5rXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBlZGl0Q3JlZGl0Q2FyZEJhblNlbGVjdGtCdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuYmFua1NlbGVjdCA9IHRoaXMubm9kZS5iYW5rSWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQWRkQ3JlZGl0Q2FyZFwiKS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9BZGRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwic3ZfU2VsZWN0QmFua1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9BZGRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiYnRfU2VsZWN0QmFua1wiKS5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzdl9TZWxlY3RCYW5rXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0VkaXRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiYnRfU2VsZWN0QmFua1wiKS5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75L+u5pS56ZO26KGM5Y2h5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIGVkaXRDcmVkaXRDYXJkQmFja0J1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQ3JlZGl0Q2FyZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5iYW5rU2VsZWN0ID0gLTE7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGVkaXRDcmVkaXRDYXJkRWRpdENvbmZpcm1CdXR0b25DbGlja19GdW5jdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZWRpdEJveEVkaXRpbmdCZWdpbl9GdW5jdGlvbihcImVkaXRDcmVkaXRDYXJkXCIpO1xyXG4gICAgICAgIHZhciBvd25lciA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9Pd25lclwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICB2YXIgY2FyZE5vID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9FZGl0Q3JlZGl0Q2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImViX0NhcmROb1wiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICB2YXIgY29uZmlybSA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9DYXJkTm9Db25maXJtXCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAob3duZXIgJiYgY2FyZE5vICYmIGNvbmZpcm0pIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRObyA9PT0gY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuYmFua1NlbGVjdCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0LmVtaXQoXCJCYW5rSW5mb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZElkOiB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmVkaXRDYXJkSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnQ6IGNhcmRObyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogb3duZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbmtUeXBlOiB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJhbmtTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9FZGl0Q3JlZGl0Q2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHMwXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi6K+36YCJ5oup6ZO26KGM5Y2h57G75Z6LXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0VkaXRDcmVkaXRDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwibGJfVGlwczBcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLkv6HnlKjljaHlj7fkuI7noa7orqTljaHlj7fkuI3kuIDoh7RcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fRWRpdENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzMFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIuivt+ato+ehrui+k+WFpeaMgeWNoeS6uuS4juWNoeWPt1wiO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vliKDpmaTpk7booYzljaFcclxuICAgICAqL1xyXG4gICAgZWRpdENyZWRpdENhcmREZWxldGVCdXR0b25DbGlja19GdW5jdGlvbkY6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKFwi5oKo56Gu5a6a6KaB5Yig6Zmk5q2k6ZO26KGM5Y2h5ZCXP1wiLCAyLCA1KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflvpfmiYvmnLrpqozor4HnoIFcclxuICAgICAqL1xyXG4gICAgYmluZFBob25lR2V0Q29kZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHBob25lTnVtYmVyID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kUGhvbmVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9QaG9uZU51bWJlclwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKHBob25lTnVtYmVyLmxlbmd0aCA+IDExKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQuZW1pdChcInNlbmRiaW5kUGhvbmVOb1wiLCB7XHJcbiAgICAgICAgICAgICAgICBwaG9uZU5vOiBwYXJzZUludChwaG9uZU51bWJlcilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29kZVRpbWVDb3VudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuZ2V0Q29kZVRpbWUgPSA2MDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IDYwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICBwaG9uZU51bWJlci5sZW5ndGggPCAxMSB8fCAodGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldC5lbWl0KFwic2VuZGJpbmRQaG9uZU5vXCIsIHtcclxuICAgICAgICAgICAgcGhvbmVObzogcGFyc2VJbnQocGhvbmVOdW1iZXIpXHJcbiAgICAgICAgfSksIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29kZVRpbWVDb3VudCA9IHRydWUsIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuZ2V0Q29kZVRpbWUgPSA2MCwgdGhpcy5ub2RlLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSBmYWxzZSwgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IDYwKVxyXG4gICAgICAgICovXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye757uR5a6a5omL5py65Y+3XHJcbiAgICAgKi9cclxuICAgIGJpbmRQaG9uZVN1Ym1pdEJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHBob25lTnVtYmVyID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kUGhvbmVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9QaG9uZU51bWJlclwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICB2YXIgY29kZSA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZFBob25lXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfQ29kZVwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICBpZiAocGhvbmVOdW1iZXIubGVuZ3RoID4gMTEgJiYgY29kZS5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQuZW1pdChcImJpbmRQaG9uZVwiLCB7XHJcbiAgICAgICAgICAgICAgICBwaG9uZU5vOiBwYXJzZUludChwaG9uZU51bWJlciksXHJcbiAgICAgICAgICAgICAgICBjaGVja05vOiBwYXJzZUludChjb2RlKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgcGhvbmVOdW1iZXIubGVuZ3RoIDwgMTEgfHwgY29kZS5sZW5ndGggPCA0IHx8IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikubmV0V29yay5zb2NrZXQuZW1pdChcImJpbmRQaG9uZVwiLCB7XHJcbiAgICAgICAgICAgIHBob25lTm86IHBhcnNlSW50KHBob25lTnVtYmVyKSxcclxuICAgICAgICAgICAgY2hlY2tObzogcGFyc2VJbnQoY29kZSlcclxuICAgICAgICB9KVxyXG4gICAgICAgICovXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWL5L+u5pS55a+G56CBXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZVBhc3N3b3JkTWVudUNoYW5nZUJ1dHRvbkNsaWNrX0Z1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnBsYXllckluZm8uaXNPZmZpY2FsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlUGFzc3dvcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzMVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIuS/ruaUueWvhueggeWJjeW/hemhu+i9rOato+i0puWPt1wiO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBlYl9PbGRQYXNzd29yZCA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlUGFzc3dvcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9PbGRQYXNzd29yZFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICB2YXIgZWJfTmV3UGFzc3dvcmQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZVBhc3N3b3JkXCIpLmdldENoaWxkQnlOYW1lKFwiZWJfTmV3UGFzc3dvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmc7XHJcbiAgICAgICAgdmFyIGViX1Bhc3N3b3JkQ29uZmlybSA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ2hhbmdlUGFzc3dvcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9QYXNzd29yZENvbmZpcm1cIikuZ2V0Q29tcG9uZW50KFwiY2MuRWRpdEJveFwiKS5zdHJpbmc7XHJcbiAgICAgICAgdGhpcy5lZGl0Qm94RWRpdGluZ0JlZ2luX0Z1bmN0aW9uKFwiY2hhbmdlUGFzc3dvcmRcIik7XHJcbiAgICAgICAgaWYgKGViX09sZFBhc3N3b3JkICYmIGViX05ld1Bhc3N3b3JkICYmIGViX1Bhc3N3b3JkQ29uZmlybSkge1xyXG4gICAgICAgICAgICBpZiAoZWJfT2xkUGFzc3dvcmQgPT09IGViX05ld1Bhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZVBhc3N3b3JkXCIpLmdldENoaWxkQnlOYW1lKFwibGJfVGlwczFcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLml6flr4bnoIHkuI7mlrDlr4bnoIHnm7jlkIxcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWJfTmV3UGFzc3dvcmQubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DaGFuZ2VQYXNzd29yZFwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHMyXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwi5a+G56CB6Iez5bCRNuS4quaVsOWtl+aIluWtl+avjVwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlYl9OZXdQYXNzd29yZCAhPT0gZWJfUGFzc3dvcmRDb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZVBhc3N3b3JkXCIpLmdldENoaWxkQnlOYW1lKFwibGJfVGlwczJcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLlr4bnoIHkuI7noa7orqTlr4bnoIHkuI3kuIDoh7RcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0LmVtaXQoXCJ1cGRhdGVQYXNzd29yZFwiLCB7XHJcbiAgICAgICAgICAgICAgICBvbGRQYXNzd29yZDogZWJfT2xkUGFzc3dvcmQsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogZWJfTmV3UGFzc3dvcmRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSB0eXBlIFxyXG4gICAgICovXHJcbiAgICBlZGl0Qm94RWRpdGluZ0JlZ2luX0Z1bmN0aW9uOiBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY3JlYXRlQWNjb3VudFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9DcmVhdGVBY2NvdW50XCIpLmdldENoaWxkQnlOYW1lKFwibGJfVGlwczBcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQ3JlYXRlQWNjb3VudFwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHMxXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NyZWF0ZUFjY291bnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzMlwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjaGFuZ2VOYW1lXCI6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJpbmRBbGlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZEFsaVwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHMwXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNoYW5nZVBhc3N3b3JkXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZVBhc3N3b3JkXCIpLmdldENoaWxkQnlOYW1lKFwibGJfVGlwczFcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9QbGF5ZXJJbmZvLmdldENoaWxkQnlOYW1lKFwiY29tX0NoYW5nZVBhc3N3b3JkXCIpLmdldENoaWxkQnlOYW1lKFwibGJfVGlwczJcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYmluZENyZWRpdENhcmRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1BsYXllckluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJjb21fQmluZENyZWRpdENhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYl9UaXBzMFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlZGl0Q3JlZGl0Q2FyZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9FZGl0Q3JlZGl0Q2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHMwXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNoYW5nZUFsaVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fUGxheWVySW5mby5nZXRDaGlsZEJ5TmFtZShcImNvbV9CaW5kQWxpXCIpLmdldENoaWxkQnlOYW1lKFwibGJfVGlwczBcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63lr7zoiKrnlYzpnaJcclxuICAgICAqL1xyXG4gICAgZGFvaGFuZ0Nsb3NlQnV0dG9uQ2xpY2tfRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX2Rhb2hhbmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2tQb3h5KGUsIHYpIHtcclxuICAgICAgICBsZXQgbG9iYnlNYWluID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICBsZXQgdWlkID0gbG9iYnlNYWluLnBsYXllckluZm8ucGxheWVySWQ7XHJcbiAgICAgICAgbGV0IHNlbmREYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6IHVpZCxcclxuICAgICAgICAgICAgc2lnbjogcmVxdWlyZSgnbWQ1JykuZ2V0SW5zdGFudC5oZXhfbWQ1KGAke3VpZH1mZGdrbDVydGxrNG12Y2NjZDc2NWZkdmApLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIEhlbHBlci5odHRwKCdodHRwOi8vZ2FtZS5idWxsc3RzLmNvbS9pbmRleC5waHAvYWdlbnQvYXBpL2NsaWVudFNob3cnLCBzZW5kRGF0YSkudGhlbihlID0+IHtcclxuICAgICAgICAgICAgbG9iYnlNYWluLnNldFBveHlVSShlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL0hlbHBlci5odHRwKCdodHRwczovL2ZhbmdrYS55b3VtZWdhbWUuY24vY2xpZW50U2hvdy5waHAnLCBzZW5kRGF0YSkudGhlbihlID0+IHtcclxuICAgICAgICAvLyAgICBsb2JieU1haW4uc2V0UG94eVVJKGUpO1xyXG4gICAgICAgIC8vfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNsaWNrQ2xvc2VQb3h5KGUsIHYpIHtcclxuICAgICAgICBsZXQgbG9iYnlNYWluID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICBsb2JieU1haW4uY2xvc2VQb3h5VUkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlUG94eVBhZ2UoZSwgdikge1xyXG4gICAgICAgIGxldCBsb2JieU1haW4gPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgIGxvYmJ5TWFpbi5jaGFuZ2VQb3h5UGFnZSh2KTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+i/m+WFpem+meiZjuaWl1xyXG4gICAgbG9uZ2h1RG91QnV0dG9uQ2xpY2soZXZlbnQsIGN1c3RvbUV2ZW50RGF0YSkge1xyXG4gICAgICAgIGxldCB0ZW1wTmV0V29yayA9IHJlcXVpcmUoXCJsb25naHVkb3VOZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0xvYWRpbmcnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGVtcE5ldFdvcmsubG9naW5HYW1lX0Z1bmN0aW9uKCcnLCAxNjAwMywgdGVtcE5ldFdvcmsucGxheWVySW5mby5wbGF5ZXJJZCwgdGVtcE5ldFdvcmsucGxheWVySW5mby5nYW1lU2lnbik7XHJcbiAgICB9LFxyXG4gICAgLy/ngrnlh7vov5vlhaXopb/muLjkuonpnLhcclxuICAgIHhpeW91emhlbmdiYUJ1dHRvbkNsaWNrKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvTG9hZGluZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZV9ub3JtYWwoJ3hpeW91emhlbmdiYV9tYWluJyk7XHJcbiAgICAgICAgd2luZG93LlhZWkJfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgfSxcclxuICAgIC8v54K55Ye76L+b5YWl5LiJ6KeS6a2U6Zi1XHJcbiAgICB0cmlhbmdsZUJ1dHRvbkNsaWNrKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvTG9hZGluZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZV9ub3JtYWwoJ1Nsb3RfVHJpYW5nbGVnYW1lJyk7XHJcbiAgICAgICAgd2luZG93LlRHX0xPQkJZTkVUID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldDtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+i/m+WFpTIx54K5XHJcbiAgICBibGFja0phY2tCdXR0b25DbGljayhldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0xvYWRpbmcnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmVfbm9ybWFsKCdnYW1lXzIxZGlhbicpO1xyXG4gICAgICAgIHdpbmRvdy5CTEFDS0pBQ0tfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgfSxcclxuICAgIC8v54K55Ye76L+b5YWl5qOu5p6X6Iie5LyaXHJcbiAgICB6ZW5saW53dWh1aUJ1dHRvbkNsaWNrKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvTG9hZGluZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlFpZUh1YW5TY2VuZV9ub3JtYWwoJ3Nlbmxpbnd1aHVpJyk7XHJcbiAgICAgICAgd2luZG93LlhZWkJfTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgfSxcclxuICAgIC8v54K55Ye76L+b5YWl55m+5a625LmQXHJcbiAgICBiYWlqaWFsZUJ1dHRvbkNsaWNrKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICBsZXQgdGVtcE5ldFdvcmsgPSByZXF1aXJlKFwiYmFpamlhbGVOZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0xvYWRpbmcnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGVtcE5ldFdvcmsubG9naW5HYW1lX0Z1bmN0aW9uKCcnLCAxNjAwNCwgdGVtcE5ldFdvcmsucGxheWVySW5mby5wbGF5ZXJJZCwgdGVtcE5ldFdvcmsucGxheWVySW5mby5nYW1lU2lnbik7XHJcbiAgICB9LFxyXG4gICAgLy/ngrnlh7vov5vlhaXnmb3kurrniZvniZtcclxuICAgIGJhaXJlbm5pdW5pdUJ1dHRvbkNsaWNrKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICBsZXQgdGVtcE5ldFdvcmsgPSByZXF1aXJlKFwiYmFpcmVubml1bml1TmV0V29ya1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9Mb2FkaW5nJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRlbXBOZXRXb3JrLmxvZ2luR2FtZV9GdW5jdGlvbignJywgMTM1MDEsIHRlbXBOZXRXb3JrLnBsYXllckluZm8ucGxheWVySWQsIHRlbXBOZXRXb3JrLnBsYXllckluZm8uZ2FtZVNpZ24pO1xyXG4gICAgfSxcclxuICAgIC8v54K55Ye76L+b5YWl5oq85aSn5bCPXHJcbiAgICB5YWRheGlhb0J1dHRvbkNsaWNrKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICBsZXQgdGVtcE5ldFdvcmsgPSByZXF1aXJlKFwieWFkYXhpYW9OZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0xvYWRpbmcnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGVtcE5ldFdvcmsubG9naW5HYW1lX0Z1bmN0aW9uKCcnLCAxNjAwNSwgdGVtcE5ldFdvcmsucGxheWVySW5mby5wbGF5ZXJJZCwgdGVtcE5ldFdvcmsucGxheWVySW5mby5nYW1lU2lnbik7XHJcbiAgICB9LFxyXG4gICAgLy/ngrnlh7vov5vlhaXnmoflrrbotZvpqaxcclxuICAgIEhKU01CdXR0b25DbGljayhldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0xvYWRpbmcnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmVfbm9ybWFsKCdnYW1lX3NhaW1hJyk7XHJcbiAgICAgICAgd2luZG93LkhKU01fTE9CQllORVQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuc29ja2V0O1xyXG4gICAgfSxcclxuICAgIC8v54K55Ye76L+b5YWl5aWU6amw5a6d6amsXHJcbiAgICBCQ0JNQnV0dG9uQ2xpY2soZXZlbnQsIGN1c3RvbUV2ZW50RGF0YSkge1xyXG4gICAgICAgIGxldCB0ZW1wTmV0V29yayA9IHJlcXVpcmUoXCJiY2JtX05ldFdvcmtcIikuZ2V0SW5zdGFudDtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvTG9hZGluZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB0ZW1wTmV0V29yay5sb2dpbkdhbWVfRnVuY3Rpb24oJycsIDE2MDA4LCB0ZW1wTmV0V29yay5wbGF5ZXJJbmZvLnBsYXllcklkLCB0ZW1wTmV0V29yay5wbGF5ZXJJbmZvLmdhbWVTaWduKTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+aYvuekuuaNlemxvFxyXG4gICAgZmlzaEJ1dHRvbkNsaWNrKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmdhbWVNZW51QnV0dG9uQ2xpY2tfRnVuY3Rpb24oXCJjb21fRmlzaFwiKTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+aYvuekuuaNlemxvOa1t+eOizJcclxuICAgIGZpc2hoYWl3YW5nMkJ1dHRvbkNsaWNrKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmdhbWVNZW51QnV0dG9uQ2xpY2tfRnVuY3Rpb24oXCJjb21fRmlzaGhhaXdhbmcyXCIpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgc2Fuamlhb0J1dHRvbkNsaWNrKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvTG9hZGluZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5RaWVIdWFuU2NlbmVfbm9ybWFsKFwiU2xvdF9UcmlhbmdsZWdhbWVcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZUhlYWRTZXhfRnVuY3Rpb246IGZ1bmN0aW9uIChldiwgc2V4KSB7XHJcbiAgICAgICAgaWYgKHNleCA9PSAnMScpIHtcclxuICAgICAgICAgICAgLy/nlLdcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5fZ2lybF8wMScpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuX21hbl8wMScpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbV9mYWNlbWFuJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb21fZmFjZWdpcmwnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckhlYWRTZWwoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+Wls1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9naXJsXzAxJykuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuX21hbl8wMScpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29tX2ZhY2VtYW4nKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb21fZmFjZWdpcmwnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFySGVhZFNlbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xlYXJIZWFkU2VsOiBmdW5jdGlvbiAoZXYsIG4pIHtcclxuICAgICAgICBsZXQgcHJNYWxlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb21fZmFjZW1hbicpO1xyXG4gICAgICAgIGxldCBwckZlbWFsZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29tX2ZhY2VnaXJsJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBwck1hbGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbGV0IHNob3cgPSBwck1hbGUuY2hpbGRyZW5baV0ubmFtZSA9PSBuID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICBwck1hbGUuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoJ2JveCcpLmFjdGl2ZSA9IHNob3c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHByRmVtYWxlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGxldCBzaG93ID0gcHJGZW1hbGUuY2hpbGRyZW5baV0ubmFtZSA9PSBuID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICBwckZlbWFsZS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZSgnYm94JykuYWN0aXZlID0gc2hvdztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbEhlYWRfRnVuY3Rpb246IGZ1bmN0aW9uIChldiwgYXJncykge1xyXG4gICAgICAgIGxldCBzZWxJZCA9IC0xO1xyXG4gICAgICAgIGxldCBwck1hbGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbV9mYWNlbWFuJyk7XHJcbiAgICAgICAgbGV0IHByRmVtYWxlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb21fZmFjZWdpcmwnKTtcclxuICAgICAgICBpZiAocHJNYWxlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHByTWFsZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByTWFsZS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZSgnYm94JykuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsSWQgPSBwck1hbGUuY2hpbGRyZW5baV0ubmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gcHJGZW1hbGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIGlmIChwckZlbWFsZS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZSgnYm94JykuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsSWQgPSBwckZlbWFsZS5jaGlsZHJlbltpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxJZCAhPSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLm5ldFdvcmsuY2hhbmdlSGVhZChzZWxJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBkYWlsaV9jbGljaygpIHtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvY29tX2RsbnVtYmVyJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvY29tX2RsbnVtYmVyJykuZ2V0Q29tcG9uZW50KFwiZGFpbGlcIikuc2V0RGFpbGkodGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5wbGF5ZXJJbmZvLnBsYXllcklkKTtcclxuICAgIH0sXHJcblxyXG4gICAgbG9nX291dCgpIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VyRGF0YVwiKTtcclxuICAgICAgICBjYy5nYW1lLnJlc3RhcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbWFsbFRhZ0NsaWNrKGV2LCBhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jaGFuZ2VNYWxsVUkoYXJncyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGxDdXN0b21lclNlcnZpY2UoZXYsIGFyZ3MpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNoYW5nZU1hbGxVSSgyKTtcclxuICAgICAgICBsZXQgbGJsID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fTWFsbC5nZXRDaGlsZEJ5TmFtZSgnY29tX0N1c3RvbWVyU2VydmljZScpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKTtcclxuICAgICAgICBsYmwuY3NEYXRhID0gSlNPTi5wYXJzZShhcmdzKTtcclxuICAgICAgICBsYmwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg5oKo5q2j5Zyo5LiOIOWuouacjSAke2xibC5jc0RhdGEubmFtZX0g5a+56K+dYDtcclxuICAgIH0sXHJcblxyXG4gICAgc2VuZE1zZ19DdXN0b21lclNlcnZpY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbG9iYnlNYWluID0gdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICBsZXQgZSA9IGxvYmJ5TWFpbi5jb21fQ3VzdG9tZXJTZXJ2aWNlLmdldENoaWxkQnlOYW1lKFwiZWJfQ2hhdFwiKS5nZXRDb21wb25lbnQoXCJjYy5FZGl0Qm94XCIpLnN0cmluZztcclxuICAgICAgICBpZiAoZSA9PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsYmwgPSBsb2JieU1haW4uY29tX01hbGwuZ2V0Q2hpbGRCeU5hbWUoJ2NvbV9DdXN0b21lclNlcnZpY2UnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJyk7XHJcbiAgICAgICAgbG9iYnlNYWluLm5ldFdvcmsuc29ja2V0LmVtaXQoXCJzZW5kTXNnVG9HTVwiLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGdtX2lkOiBsYmwuY3NEYXRhLmlkLFxyXG4gICAgICAgICAgICBtc2c6IGVcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgbG9iYnlNYWluLmNvbV9DdXN0b21lclNlcnZpY2UuZ2V0Q2hpbGRCeU5hbWUoXCJlYl9DaGF0XCIpLmdldENvbXBvbmVudChcImNjLkVkaXRCb3hcIikuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBsb2JieU1haW4uc2V0Q2hhdF9GdW5jdGlvbihsb2JieU1haW4ucGxheWVySW5mby5wbGF5ZXJJZCwgbG9iYnlNYWluLnBsYXllckluZm8ucGxheWVyTmFtZSwgZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlR2FtZSgpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuZW5kKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUdhbWVUaXAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5zaG93TWVzc2FnZWJveF9GdW5jdGlvbign5piv5ZCm6YCA5Ye65ri45oiP77yfJywgMiwgOSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdvSGFsbCgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fZGFvaGFuZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+mAmueUqOWFs+mXreeVjOmdolxyXG4gICAgb25CdG5DbGlja19jbG9zZVBhbmVsKGV2ZW50KSB7XHJcbiAgICAgICAgLy/ov5nph4wgZXZlbnQg5piv5LiA5LiqIFRvdWNoIEV2ZW50IOWvueixoe+8jOS9oOWPr+S7pemAmui/hyBldmVudC50YXJnZXQg5Y+W5Yiw5LqL5Lu255qE5Y+R6YCB6IqC54K5XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvL+aJk+W8gOS7u+WKoVxyXG4gICAgb25CdG5DbGlja19xdWVzdFBhbmVsKCkge1xyXG4gICAgICAgIGxldCBsb2JieU1haW4gPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX1F1ZXN0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbG9iYnlNYWluLm5ldFdvcmsuc29ja2V0LmVtaXQoXCJnZXRUYXNrSW5mb1wiKTtcclxuICAgIH0sXHJcbiAgICAvL+aJk+W8gOaOkuihjOamnFxyXG4gICAgb25CdG5DbGlja19yYW5rUGFuZWwoKSB7XHJcbiAgICAgICAgbGV0IGxvYmJ5TWFpbiA9IHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIik7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fcmFuay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxvYmJ5TWFpbi5uZXRXb3JrLnNvY2tldC5lbWl0KFwiZ2V0Q29pblJhbmtcIik7XHJcbiAgICB9LFxyXG4gICAgLy/miZPlvIDmtLvliqhcclxuICAgIG9uQnRuQ2xpY2tfYWN0aXZpdHlQYW5lbCgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmJnX0JsYWNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW52YXNOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5jb21fYWN0aXZpdHkuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICAvL+aJk+W8gOmTtuihjFxyXG4gICAgeWluaGFuZ0J1dHRvbkNsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZS5nZXRDb21wb25lbnQoXCJMb2JieU1haW5cIikuY29tX2JhbmsuZ2V0Q29tcG9uZW50KFwiTG9iYnlCYW5rXCIpLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICB0aGlzLmNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLmNvbV9iYW5rLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxufSk7Il19