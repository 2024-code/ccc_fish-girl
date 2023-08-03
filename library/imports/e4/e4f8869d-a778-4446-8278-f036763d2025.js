"use strict";
cc._RF.push(module, 'e4f88adp3hERoJ48DZ2PSAl', 'i18n_label');
// LaoHuJi/module/i18n/i18n_label.js

"use strict";

var i18n = require('i18n');

cc.Class({
  "extends": cc.Component,
  properties: {
    Label: cc.Label,
    textKey: {
      "default": 'TEXT_KEY',
      multiline: true,
      tooltip: 'Enter i18n key here'
    }
  },
  update: function update() {
    if (this.language != cc.sys.localStorage.getItem('language')) {
      this.language = cc.sys.localStorage.getItem('language');
      this.Label.string = i18n.t(this.textKey);
    }
  }
});

cc._RF.pop();