"use strict";
cc._RF.push(module, '559cfhcMbNIWqFxwYKv+TH1', 'GrabBullCard');
// Script/GrabBull/GrabBullCard.js

"use strict";

/**
 * 扑克管理类
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    sp_CardSprite: {
      "default": [],
      type: cc.SpriteFrame
    },
    canvasNode: {
      "default": null,
      type: cc.Node
    },
    type: 0,
    point: 0
  },
  onLoad: function onLoad() {
    this.defaultFrame = this.node.getComponent("cc.Sprite").spriteFrame;
  },

  /**
   * 显示卡牌
   * @param {*} index 
   */
  open_Function: function open_Function(index) {
    this.type = index;
    this.setFrame_Function(index);
    this.setPoint_Function(index);
  },

  /**
   * vip特权 关闭显示
   */
  close_func: function close_func() {
    this.node.getComponent("cc.Sprite").spriteFrame = this.defaultFrame;
  },

  /**
   * 设置显示帧数
   * @param {*} index 
   */
  setFrame_Function: function setFrame_Function(index) {
    this.node.getComponent("cc.Sprite").spriteFrame = this.sp_CardSprite[index];
  },

  /**
   * 设置点数
   * @param {*} index 
   */
  setPoint_Function: function setPoint_Function(index) {
    var point = index % 13;

    if (point == 0 || point > 10) {
      this.point = 10;
    } else {
      this.point = point;
    }
  },

  /**
   * 点击扑克
   */
  clickCard_Function: function clickCard_Function() {
    if (this.canvasNode.canSetBull) {
      this.canvasNode.checkBull_Function(this.node.cardId);
    }
  }
});

cc._RF.pop();