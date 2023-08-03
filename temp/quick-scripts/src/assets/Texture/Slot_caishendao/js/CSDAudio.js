"use strict";
cc._RF.push(module, '2b510AecERIWKU/5KpI9meC', 'CSDAudio');
// Texture/Slot_caishendao/js/CSDAudio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    bgmAudio: {
      type: cc.AudioClip,
      "default": []
    },
    stopWheel: {
      type: cc.AudioClip,
      "default": null
    },
    closeDoor: {
      type: cc.AudioClip,
      "default": null
    },
    showCS: {
      type: cc.AudioClip,
      "default": null
    },
    freeAudio: {
      type: cc.AudioClip,
      "default": null
    },
    bigWinEf: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.pInfo = require("PlayerInfo").getInstant;
  },
  start: function start() {
    cc.audioEngine.stopAll();
    this.playBgm(0);
  },
  stopAudio: function stopAudio() {
    cc.audioEngine.stopAll();
  },
  playBgm: function playBgm(id) {
    if (this.pInfo.musicControl == 0) {
      return;
    }

    cc.audioEngine.stopMusic();
    cc.audioEngine.playMusic(this.bgmAudio[id], true);
  },
  playStopWheel: function playStopWheel() {
    this.playEf(this.stopWheel);
  },
  playCloseDoor: function playCloseDoor() {
    this.playEf(this.closeDoor);
  },
  playCs: function playCs() {
    this.playEf(this.showCS);
  },
  playFree: function playFree() {
    this.playEf(this.freeAudio);
  },
  playBW: function playBW() {
    this.playEf(this.bigWinEf);
  },
  playEf: function playEf(clip) {
    if (this.pInfo.soundEffectControl == 0) {
      return;
    }

    cc.audioEngine.playEffect(clip);
  }
});

cc._RF.pop();