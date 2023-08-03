"use strict";
cc._RF.push(module, 'c79d3ChJcFCC5NCPXj00AhM', 'set_language');
// LaoHuJi/module/i18n/set_language.js

"use strict";

var i18n = require('i18n');

cc.Class({
  "extends": cc.Component,
  SetLanguage_en: function SetLanguage_en() {
    cc.sys.localStorage.setItem('language', 'en');
    i18n.init('en');
  },
  SetLanguage_zh: function SetLanguage_zh() {
    cc.sys.localStorage.setItem('language', 'zh');
    i18n.init('zh');
  },
  SetLanguage_my: function SetLanguage_my() {
    cc.sys.localStorage.setItem('language', 'my');
    i18n.init('my');
  },
  SetLanguage_es: function SetLanguage_es() {
    cc.sys.localStorage.setItem('language', 'es');
    i18n.init('es');
  },
  SetLanguage_fr: function SetLanguage_fr() {
    cc.sys.localStorage.setItem('language', 'fr');
    i18n.init('fr');
  },
  SetLanguage_th: function SetLanguage_th() {
    cc.sys.localStorage.setItem('language', 'th');
    i18n.init('th');
  },
  SetLanguage_vn: function SetLanguage_vn() {
    cc.sys.localStorage.setItem('language', 'vn');
    i18n.init('vn');
  },
  SetLanguage_kp: function SetLanguage_kp() {
    cc.sys.localStorage.setItem('language', 'kp');
    i18n.init('kp');
  },
  SetLanguage_id: function SetLanguage_id() {
    cc.sys.localStorage.setItem('language', 'id');
    i18n.init('id');
  },
  SetLanguage_in: function SetLanguage_in() {
    cc.sys.localStorage.setItem('language', 'in');
    i18n.init('in');
  }
});

cc._RF.pop();