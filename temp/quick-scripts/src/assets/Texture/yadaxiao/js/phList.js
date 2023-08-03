"use strict";
cc._RF.push(module, 'cf533Eu4ohCo7B6bbKKTs7J', 'phList');
// Texture/yadaxiao/js/phList.js

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

    var userGetrank = function userGetrank(ret) {
      console.log("成功");
      self.item = ret;

      for (var i = 0; i < self.item.length; ++i) {
        var itemSlot = self.addItemSlot(self.item[i].username, self.item[i].coin, self.item[i].id, self.item[i].weixin, self.item[i].qq, self.item[i].mobile);
        self.itemSlots.push(itemSlot);
      }
    };

    http.createXMLHttpRequest(cfg.cUrl + "USERGETRANK", userGetrank);
  },
  addItemSlot: function addItemSlot(a, b, c, d, e, f) {
    var itemSlot = cc.instantiate(this.itemPrefeb);
    this.scrollView.content.addChild(itemSlot);
    itemSlot.getComponent('phItem').updateItem(a, b, c, d, e, f);
    return itemSlot;
  }
});

cc._RF.pop();