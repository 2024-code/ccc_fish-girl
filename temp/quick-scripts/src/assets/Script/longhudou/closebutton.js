"use strict";
cc._RF.push(module, '4f1040iKuhNlq9HPzsdWfjH', 'closebutton');
// Script/longhudou/closebutton.js

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
    this.node.active = false;
  }
});

cc._RF.pop();