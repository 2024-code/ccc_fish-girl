"use strict";
cc._RF.push(module, 'e1867obXcBFjY/ZWshLAiRX', 'i18n_editbox');
// LaoHuJi/module/i18n/i18n_editbox.js

"use strict";

var i18n = require('i18n');

cc.Class({
  "extends": cc.Component,
  properties: {
    EditBox: cc.EditBox,
    textKey: {
      "default": 'TEXT_KEY',
      multiline: true,
      tooltip: 'Enter i18n key here',
      notify: function notify() {
        if (this._sgNode) {
          this._sgNode.setString(this.string);

          this._updateNodeSize();
        }
      }
    }
  },
  update: function update() {
    if (this.language != cc.sys.localStorage.getItem('language')) {
      this.language = cc.sys.localStorage.getItem('language');
      this.EditBox.placeholder = i18n.t(this.textKey);
    }
  }
});

cc._RF.pop();