"use strict";
cc._RF.push(module, 'fd610GgZ5NKGYu7N5QmP/IH', 'GrabBullPoint');
// Script/GrabBull/GrabBullPoint.js

"use strict";

/**
 * 牛牛点数动画管理
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    type: 0
  },
  onLoad: function onLoad() {
    this.pointDisplay = this.getComponent("dragonBones.ArmatureDisplay");
    this.pointArmature = this.pointDisplay.armature();
  },

  /**
   * 设置牌型
   * @param {*} type 
   */
  setType_Function: function setType_Function(type) {
    this.type = type;
    this.setFrame_Function(type);
  },

  /**
   * 设置牌面材质
   * @param {*} type 
   */
  setFrame_Function: function setFrame_Function(type) {
    this.pointDisplay.playAnimation("point" + type, 1);
  }
});

cc._RF.pop();