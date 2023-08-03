"use strict";
cc._RF.push(module, '53fb0O+5dxLuLlY9TyArQ0n', 'paihangbg');
// Texture/Style_HappyCity/js/paihangbg.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    rankNumBg: [cc.Node],
    rankNumLab: cc.Label,
    headSp: cc.Sprite,
    nickNameLab: cc.Label,
    coinLab: cc.Label
  },
  onLoad: function onLoad() {},
  start: function start() {},
  setView: function setView(data, index, type) {
    var _this = this;

    for (var i in this.rankNumBg) {
      this.rankNumBg[i].active = false;
    }

    if (index < 3) {
      this.rankNumBg[index].active = true;
    } else {
      this.rankNumBg[3].active = true;
    }

    this.rankNumLab.string = index + 1;
    Helper.loadHead(data.headimgurl, function (sp) {
      _this.headSp.spriteFrame = sp;
    });
    this.nickNameLab.string = data.nickname;

    if (type == 1) {
      this.coinLab.string = data.score;
    } else {
      this.coinLab.string = data.diamond;
    }
  }
});

cc._RF.pop();