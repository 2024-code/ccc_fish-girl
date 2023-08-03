"use strict";
cc._RF.push(module, 'e6db63xnhtDtYAsTPMPABwn', 'dynamic_sprite');
// Script/dynamic_sprite.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    folder: ""
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (this.folder != "") {
      var sp = this.getComponent(cc.Sprite).spriteFrame;

      if (sp.atlas) {} else {
        var realUrl = cc.url.raw('resources/' + this.folder + "/" + sp.name);
        var self = this;
        var url = this.folder + "/" + sp;
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
          sp.spriteFrame = spriteFrame;
        });
      }
    }
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();