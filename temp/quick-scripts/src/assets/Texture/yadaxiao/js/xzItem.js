"use strict";
cc._RF.push(module, '31d87EzbAlP84xunEPG7mfG', 'xzItem');
// Texture/yadaxiao/js/xzItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    word: cc.Label
  },
  updateItem: function updateItem(name, big, small) {
    this.word.string = "[" + name + "]" + "下注" + big + "大" + small + "小";
  }
});

cc._RF.pop();