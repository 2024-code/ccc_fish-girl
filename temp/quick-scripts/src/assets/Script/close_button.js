"use strict";
cc._RF.push(module, 'a17b052r0BLELHA2w4b0rvY', 'close_button');
// Script/close_button.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  // update (dt) {},
  onClick: function onClick() {
    playEffect('Click');
    ;
    this.node.active = false;
  }
});

cc._RF.pop();