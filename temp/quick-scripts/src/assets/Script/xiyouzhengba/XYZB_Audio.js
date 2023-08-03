"use strict";
cc._RF.push(module, '3b5ecp1m41HgblLyo7RGmsZ', 'XYZB_Audio');
// Script/xiyouzhengba/XYZB_Audio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    roleAudio: {
      type: cc.AudioClip,
      "default": []
    },
    wheelAudio: {
      type: cc.AudioClip,
      "default": []
    },
    bgmAudio: {
      type: cc.AudioClip,
      "default": []
    },
    betAudio: {
      type: cc.AudioClip,
      "default": null
    },
    clearbetAudio: {
      type: cc.AudioClip,
      "default": null
    },
    reBetAudio: {
      type: cc.AudioClip,
      "default": null
    },
    changeBetAudio: {
      type: cc.AudioClip,
      "default": null
    },
    specialAudio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.gameMain = null;
    this.wheelId = 0;
    this.pInfo = require("PlayerInfo").getInstant;
  },
  stopAll: function stopAll() {
    cc.audioEngine.stopAll();
  },
  playWheel: function playWheel() {
    this.playEf(this.wheelAudio[this.wheelId]);
    this.wheelId++;

    if (this.wheelId > this.wheelAudio.length - 1) {
      this.wheelId = 0;
    }
  },
  playBet: function playBet() {
    this.playEf(this.betAudio);
  },
  playReBet: function playReBet() {
    this.playEf(this.reBetAudio);
  },
  playClearBet: function playClearBet() {
    this.playEf(this.clearbetAudio);
  },
  playChangeBet: function playChangeBet() {
    this.playEf(this.changeBetAudio);
  },
  playRoleAudio: function playRoleAudio(r) {
    this.playEf(this.roleAudio[r]);
  },
  playSpecial: function playSpecial() {
    this.playEf(this.specialAudio);
  },
  playBgm: function playBgm(id) {
    if (this.pInfo.musicControl == 0) {
      return;
    }

    cc.audioEngine.play(this.bgmAudio[id], true);
  },
  playEf: function playEf(clip) {
    if (this.pInfo.soundEffectControl == 0) {
      return;
    }

    cc.audioEngine.playEffect(clip);
  }
});

cc._RF.pop();