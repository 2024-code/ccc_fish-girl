"use strict";
cc._RF.push(module, 'e8898TYtPxO/qR6ARstdGOg', 'LHDB_Audio');
// Script/Lhdb/LHDB_Audio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    bgmAudio: {
      type: cc.AudioClip,
      "default": null
    },
    btnAudio: {
      type: cc.AudioClip,
      "default": null
    },
    awardAudio: {
      type: cc.AudioClip,
      "default": null
    },
    booAudio: {
      type: cc.AudioClip,
      "default": null
    },
    decBoxAudio: {
      type: cc.AudioClip,
      "default": null
    },
    landAudio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.pInfo = require("PlayerInfo").getInstant;
  },
  stopAll: function stopAll() {
    cc.audioEngine.stopAll();
  },
  playBtn: function playBtn() {
    this.playEf(this.btnAudio);
  },
  playBgm: function playBgm() {
    if (this.pInfo.musicControl == 0) {
      return;
    }

    cc.audioEngine.play(this.bgmAudio, true);
  },
  playEf: function playEf(clip) {
    if (this.pInfo.soundEffectControl == 0) {
      return;
    }

    cc.audioEngine.playEffect(clip);
  },
  playAward: function playAward() {
    this.playEf(this.awardAudio);
  },
  playBoo: function playBoo() {
    this.playEf(this.booAudio);
  },
  playDecBox: function playDecBox() {
    this.playEf(this.decBoxAudio);
  },
  playLandAudio: function playLandAudio() {
    this.playEf(this.landAudio);
  }
});

cc._RF.pop();