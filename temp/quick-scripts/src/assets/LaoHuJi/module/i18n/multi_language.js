"use strict";
cc._RF.push(module, '0cc9eN7J95EQrPRNr0Xjc0h', 'multi_language');
// LaoHuJi/module/i18n/multi_language.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    Panel_choose_language: cc.Node
  },
  onBtnClick_arrow: function onBtnClick_arrow() {
    // this.node.active = false;
    this.Panel_choose_language.active = true;
  }
});

cc._RF.pop();