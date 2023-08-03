"use strict";
cc._RF.push(module, '742b2iszihEEp38cyJLFyMQ', 'pastList');
// Texture/yadaxiao/js/pastList.js

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
    this.init();
    this.item = [];
  },
  init: function init() {
    this.itemSlots = [];

    var cfg = require("cfg");

    var http = require("http");

    var self = this;

    var past = function past(ret) {
      console.log("成功");
      self.item = ret;

      for (var i = 0; i < self.item.length; ++i) {
        var itemSlot = self.addItemSlot(parseInt(self.item[i].sieve1), parseInt(self.item[i].sieve2), parseInt(self.item[i].sieve3));
        self.itemSlots.push(itemSlot);
      }
    };

    http.createXMLHttpRequest(cfg.webUrl + "getlist", past);
  },
  addItemSlot: function addItemSlot(a, b, c) {
    var itemSlot = cc.instantiate(this.itemPrefeb);
    this.scrollView.content.addChild(itemSlot);
    itemSlot.getComponent('pastItem').updateItem(a, b, c);
    return itemSlot;
  }
});

cc._RF.pop();