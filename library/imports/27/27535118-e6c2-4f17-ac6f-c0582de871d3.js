"use strict";
cc._RF.push(module, '27535EY5sJPF6xvwFgt6HHT', 'BCServer');
// Script/Lobby/BCServer.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // onLoad () {},
  start: function start() {
    if (!window.BCNetWork) {
      window.BCNetWork = require("BCNetWork");
      window.BCNetWork.netWorkInit_Function();
    }
  }
});

cc._RF.pop();