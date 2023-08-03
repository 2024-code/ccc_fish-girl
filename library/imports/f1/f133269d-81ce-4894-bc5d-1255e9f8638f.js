"use strict";
cc._RF.push(module, 'f1332adgc5IlLxdElXp+GOP', 'texture_manager');
// Script/texture_manager.js

"use strict";

window.setHeadTexture = function (node, url) {
  if (isNaN(url)) {
    cc.loader.load({
      url: url,
      type: 'png'
    }, function (err, texture) {
      node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
    });
  } else {
    if (parseInt(url) < 0) url = 0;
    var fra = cc.find("texture_manager").getComponent("texture_manager").head[parseInt(url) - 1];
    node.getComponent(cc.Sprite).spriteFrame = fra;
  }
};

cc.Class({
  "extends": cc.Component,
  properties: {
    head: [cc.SpriteFrame]
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    if (!this.setted) {
      this.setted = true;
      cc.game.addPersistRootNode(this.node);
    }
  } // update (dt) {},

});
window.gold_rate = 100;

cc._RF.pop();