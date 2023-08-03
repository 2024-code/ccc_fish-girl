"use strict";
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
    var language = cc.sys.localStorage.getItem('selectedLanguage') || 'txt.zh';
    cc.log('点击兑换按钮============');
    this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;

    if (this.canvasNode.getComponent("LobbyMain").playerInfo.isOffical) {
      if (!this.canvasNode.getComponent("LobbyMain").playerInfo.aliAccount && this.canvasNode.getComponent("LobbyMain").playerInfo.isBindAli) {
        switch (language) {
          case 'txt.zh':
            this.canvasNode.getComponent("LobbyMain").showMessagebox_Function("兑现必须绑定支付宝,\n\n要前去绑定支付宝吗?", 2, 2);
            break;

          case 'txt.vn':
            this.canvasNode.getComponent("LobbyMain").showMessagebox_Function("Uang tunai harus mengikat Alipay, atau mengikat Alipay?", 2, 2);
            break;

          case 'txt.en':
            this.canvasNode.getComponent("LobbyMain").showMessagebox_Function("Cash must bind Alipay,\n\n to bind Alipay?", 2, 2);
            break;
        }
      } else {//打开兑换界面
      }
    } else {
      switch (language) {
        case 'txt.zh':
          this.canvasNode.getComponent("LobbyMain").showMessagebox_Function("兑现必须绑定支付宝,\n\n要前去绑定支付宝吗?", 2, 1);
          break;

        case 'txt.vn':
          this.canvasNode.getComponent("LobbyMain").showMessagebox_Function("Uang tunai harus mengikat Alipay, atau mengikat Alipay?", 2, 1);
          break;

        case 'txt.en':
          this.canvasNode.getComponent("LobbyMain").showMessagebox_Function("Cash must bind Alipay,\n\n to bind Alipay?", 2, 1);
          break;
      }
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