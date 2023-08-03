"use strict";
cc._RF.push(module, '0389775KzNNk4L/SjlkPft2', 'timer');
// Script/Land/timer.js

"use strict";

/**
 * 斗地主定时器
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    count: 0,
    num: 0
  },
  onLoad: function onLoad() {},

  /**
   * 定时器
   */
  timing: function timing() {
    if (this.num === this.count) {
      this.cancelTimer();

      if (this.node.parent.getComponent("LandlordsMain").btnPlayerState) {
        this.node.parent.getComponent("LandlordsMain").btnPlayerState.active = false;
      }

      this.node.active = false;
    } else {
      this.node.getChildByName("times").getComponent("cc.Label").string = this.num - this.count; //还剩下5秒时，开始报警

      if (this.node.getChildByName("times").getComponent("cc.Label").string == '5' && this.node.parent.getComponent("LandlordsMain").pInfo.soundEffectControl) {
        cc.audioEngine.play(this.node.parent.getComponent("LandlordsMain").baoJingAudio[2]);
      }

      this.count++;
    }
  },

  /**
   * 开始定时
   */
  startTimer: function startTimer() {
    this.node.getChildByName("times").getComponent("cc.Label").string = this.num - this.count;
    this.count++;

    if (this.num < 1) {
      this.count = 0;

      if (this.node.parent.getComponent("LandlordsMain").btnPlayerState) {
        this.node.parent.getComponent("LandlordsMain").btnPlayerState.active = false;
      }

      this.node.active = false;
    } else {
      this.schedule(this.timing, 1, this.num - 1);
    }
  },

  /**
   * 取消定时器
   */
  cancelTimer: function cancelTimer() {
    this.unschedule(this.timing);
  }
});

cc._RF.pop();