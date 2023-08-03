"use strict";
cc._RF.push(module, '69c1bEAIAZIobl9OfZcV9Vf', 'GrabBullAniamation');
// Script/GrabBull/GrabBullAniamation.js

"use strict";

/**
 * 抢庄牛牛动画管理
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
   * 发牌动画
   * @param {*} index 
   */
  sendCardAnimationCallBack_Function: function sendCardAnimationCallBack_Function(index) {
    this.canvasNode.getComponent("GrabBullMain").cardArray[index].active = true;
  },

  /**
   * 发牌完成后回调
   */
  sendCardFinishCallBack_Function: function sendCardFinishCallBack_Function() {
    this.canvasNode.getComponent("GrabBullMain").openSendCard_Function();
  },

  /**
   * 再次发牌动画
   * @param {*} index 
   */
  reissueCardAnimationCallBack_Function: function reissueCardAnimationCallBack_Function(index) {
    this.canvasNode.getComponent("GrabBullMain").cardArray[index].active = true;
    this.canvasNode.getComponent("GrabBullMain").openReissueCard_Function();
  },
  setBankerAnimationCallBack_Funcion: function setBankerAnimationCallBack_Funcion() {},

  /**
   * 播放结算动画
   * @param {*} index 
   */
  playerWinScoreLabelCallBack_Function: function playerWinScoreLabelCallBack_Function(index) {
    this.canvasNode.getComponent("GrabBullMain").com_PlayerMessage.getChildByName("com_Player" + index).getChildByName("lb_WinScore").active = false;
    this.canvasNode.getComponent("GrabBullMain").com_PlayerMessage.getChildByName("com_Player" + index).getChildByName("lb_FailScore").active = false;
  }
});

cc._RF.pop();