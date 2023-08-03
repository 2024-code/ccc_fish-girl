"use strict";
cc._RF.push(module, '62f61V/VK5PcbiSv+UlKJWD', 'GrabBullButtonClick');
// Script/GrabBull/GrabBullButtonClick.js

"use strict";

/**
 * 抢庄牛牛点击事件
 */
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
   * 
   */
  grapButtonClick_Function: function grapButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").grabBanker_Function(this);
  },

  /**
   * 点击下注按钮
   */
  betButtonClick_Function: function betButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").betSelect_Function(this);
  },

  /**
   * 点击显示帮助界面
   */
  helpButtonClick_Functionf: function helpButtonClick_Functionf() {
    this.canvasNode.getComponent("GrabBullMain").bg_Black.active = true;
    this.canvasNode.getComponent("GrabBullMain").com_Help.active = true;
  },

  /**
   * 点击关闭帮助界面
   */
  helpMenuCloseClick_Function: function helpMenuCloseClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").bg_Black.active = false;
    this.canvasNode.getComponent("GrabBullMain").com_Help.active = false;
  },

  /**
   * 点击离开按钮
   */
  exitButtonClick_Function: function exitButtonClick_Function() {
    //判断是否在游戏中，如果在游戏中，则打开离开提示界面
    // if(this.canvasNode.getComponent("GrabBullMain").isGaming)
    // {
    //     this.canvasNode.getComponent("GrabBullMain").bg_Black.active = true;
    //     this.canvasNode.getComponent("GrabBullMain").com_Exit.active = true;
    // }
    // else
    // {
    //     this.canvasNode.getComponent("GrabBullMain").exitGame_Function();
    // }
    this.canvasNode.getComponent("GrabBullMain").netWork.grabBullSocket.emit("LogoutRoom");
  },

  /**
   * 点击有牛按钮
   */
  getBullButtonClick_Function: function getBullButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").setBullPoint_Function();
  },

  /**
   * 点击散牌按钮
   */
  noBullButtonClick_Function: function noBullButtonClick_Function() {
    if (this.canvasNode.getComponent("GrabBullMain").serverPoint === 0) {
      this.canvasNode.getComponent("GrabBullMain").netWork.grabBullSocket.emit("show");
      this.canvasNode.getComponent("GrabBullMain").com_GetBull.getChildByName("bt_GetBull").active = false;
      this.canvasNode.getComponent("GrabBullMain").com_GetBull.getChildByName("bt_NotBull").active = false;
    }
  },

  /**
   * 
   */
  messageBoxConfirmButtonClick_Function: function messageBoxConfirmButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").com_MessageBox.active = false;
    cc.audioEngine.stopAll();
    cc.director.loadScene("LobbyMain");
  },

  /**
   * 
   */
  messageBoxReconnectButtonClick_Function: function messageBoxReconnectButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").com_MessageBox.active = false;
    cc.audioEngine.stopAll();
    cc.director.loadScene("LobbyMain");
  },

  /**
   * 点击关闭离开提示界面
   */
  exitMenuCancelButtonClick_Function: function exitMenuCancelButtonClick_Function() {// this.canvasNode.getComponent("GrabBullMain").bg_Black.active = false;
    // this.canvasNode.getComponent("GrabBullMain").com_Exit.active = false;
    // this.canvasNode.getComponent("GrabBullMain").netWork.grabBullSocket.emit("LogoutRoom");
  },

  /**
   * 点击强行退出游戏按钮
   */
  exitMenuForceExitButtonClick_Function: function exitMenuForceExitButtonClick_Function() {
    this.canvasNode.getComponent("GrabBullMain").exitGame_Function();
  },
  onClickCloseBd: function onClickCloseBd(e, v) {
    cc.find('Canvas/com_ingame_tips').active = false;
  },
  onClickExit: function onClickExit(e, v) {
    console.log(v);
    cc.find('Canvas/com_exit_tips').active = false;

    if (v == 'exit') {
      this.exitButtonClick_Function();
    }
  }
});

cc._RF.pop();