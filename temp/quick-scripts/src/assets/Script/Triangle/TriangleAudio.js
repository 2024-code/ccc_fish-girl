"use strict";
cc._RF.push(module, '052edv7W3pBabCvLt9LOFmM', 'TriangleAudio');
// Script/Triangle/TriangleAudio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    bgmAudio: {
      type: cc.AudioClip,
      "default": null
    },
    flyInAudio: {
      type: cc.AudioClip,
      "default": null
    },
    buttonAudio: {
      type: cc.AudioClip,
      "default": null
    },
    delAudio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.pInfo = require("PlayerInfo").getInstant;
  },
  start: function start() {
    cc.audioEngine.stopAll();
    this.playBgm();
  },
  stopAudio: function stopAudio() {
    cc.audioEngine.stopAll();
  },
  playBgm: function playBgm() {
    if (this.pInfo.musicControl == 0) {
      return;
    }

    cc.audioEngine.stopMusic();
    cc.audioEngine.playMusic(this.bgmAudio, true);
  },
  playEf: function playEf(clip) {
    if (this.pInfo.soundEffectControl == 0) {
      return;
    }

    cc.audioEngine.playEffect(clip);
  },
  playBtnEf: function playBtnEf() {
    this.playEf(this.buttonAudio);
  },
  playFlyInEf: function playFlyInEf() {
    this.playEf(this.flyInAudio);
  },
  playDelEf: function playDelEf() {
    this.playEf(this.delAudio);
  }
});

cc._RF.pop();