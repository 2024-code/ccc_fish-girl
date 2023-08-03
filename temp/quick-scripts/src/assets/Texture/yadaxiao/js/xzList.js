"use strict";
cc._RF.push(module, 'd5e04qxQtBALagVLZsEwCFh', 'xzList');
// Texture/yadaxiao/js/xzList.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    scrollView: {
      "default": null,
      type: cc.ScrollView
    },
    itemPrefeb: cc.Prefab
  },
  start: function start() {
    // this.init();
    this.item = [];
  },
  init: function init() {
    this.itemSlots = [];

    var cfg = require("cfg");

    var http = require("http");

    var self = this;

    var xiazhu = function xiazhu(ret) {
      console.log("成功");
      self.item = ret;

      for (var i = 0; i < self.item.length; ++i) {
        var itemSlot = self.addItemSlot(self.item[i].username, self.item[i].big, self.item[i].small);
        self.itemSlots.push(itemSlot);
      }
    };

    http.createXMLHttpRequest(cfg.webUrl + "getbetlist", xiazhu);
  },
  addItemSlot: function addItemSlot(a, b, c) {
    var itemSlot = cc.instantiate(this.itemPrefeb);
    this.scrollView.content.addChild(itemSlot);
    itemSlot.getComponent('xzItem').updateItem(a, b, c);
    return itemSlot;
  }
});

cc._RF.pop();