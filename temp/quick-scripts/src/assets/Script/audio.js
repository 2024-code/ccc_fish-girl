"use strict";
cc._RF.push(module, '82df3EN7AtFwaQw5R+t1Hsl', 'audio');
// Script/audio.js

"use strict";

window.playBGM = function (para) {
  cc.find("audio").getComponent("audio").playBGM(para);
}, window.playEffect = function (para) {
  cc.find("audio").getComponent("audio").playEffect(para);
}, window.stopBGM = function () {
  cc.find("audio").getComponent("audio").stopBGM();
}, window.stopEffect = function () {
  cc.find("audio").getComponent("audio").stopEffect();
}, cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {
    if (this.setted != true) {
      this.setted = true;
      cc.game.addPersistRootNode(this.node);
    }
  },
  // update (dt) {},
  playBGM: function playBGM(para) {
    this.pInfo = require("PlayerInfo").getInstant;

    if (this.pInfo.musicControl == 0) {
      return;
    }

    this.play(para, true);
  },
  stopBGM: function stopBGM() {
    cc.audioEngine.stopAll();
  },
  playEffect: function playEffect(para) {
    this.pInfo = require("PlayerInfo").getInstant;
    if (this.pInfo.soundEffectControl == 0) return;
    this.play(para, false);
  },
  stopEffect: function stopEffect() {},
  play: function play(para, loop) {
    if (loop) {
      window.cc.audioEngine.stopAll();
    }

    var node = window.cc.find('Canvas/audio_source');
    if (!node) return;
    var audio_source = node._components[0];
    if (!audio_source) return;
    if (!audio_source[para]) return;
    window.cc.audioEngine.play(audio_source[para], loop);
  }
});

cc._RF.pop();