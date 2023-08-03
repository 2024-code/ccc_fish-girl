"use strict";
cc._RF.push(module, 'd098dOiKSJFZKK0JMWfYkPx', 'choose_language');
// LaoHuJi/module/i18n/choose_language.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    Panel_multi_language: cc.Node
  },
  onBtnClick: function onBtnClick() {
    this.node.active = false;
    this.Panel_multi_language.active = true;
  }
});

cc._RF.pop();