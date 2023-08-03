"use strict";
cc._RF.push(module, '5ad18Q1mUpDZ7vV8J1BtzN/', 'sm_Audio');
// Texture/game_saima/sm_Audio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    roleAudio: {
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
    buttonAudio: {
      type: cc.AudioClip,
      "default": null
    },
    startBetAudio: {
      type: cc.AudioClip,
      "default": null
    },
    dingAudio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.gameMain = null;
    this.wheelId = 0;
    this.pInfo = require("PlayerInfo").getInstant;
  },
  start: function start() {
    cc.audioEngine.stopAll();
    this.playBgm(0);
  },
  playBgm: function playBgm(id) {
    if (this.pInfo.musicControl == 0) {
      return;
    }

    cc.audioEngine.stopMusic();
    cc.audioEngine.playMusic(this.bgmAudio[id], true);
  },
  playBet: function playBet() {
    this.playEf(this.betAudio);
  },
  playButton: function playButton() {
    this.playEf(this.buttonAudio);
  },
  playStartBet: function playStartBet() {
    this.playEf(this.startBetAudio);
  },
  playDingAudio: function playDingAudio() {
    this.playEf(this.dingAudio);
  },
  playEf: function playEf(clip) {
    if (this.pInfo.soundEffectControl == 0) {
      return;
    }

    cc.audioEngine.playEffect(clip);
  }
});

cc._RF.pop();