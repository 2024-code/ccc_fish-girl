"use strict";
cc._RF.push(module, 'b6257GyeVtGb5GSaKK0sDvR', 'BC_message');
// resources/BC_message.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    rich_text: cc.RichText
  },
  setView: function setView(data) {
    // cc.log(data);
    this.playerInfo = require("PlayerInfo").getInstant;
    this.rich_text.string = "\u73A9\u5BB6" + data.nickName + "\u521A\u521A\u5728\u6E38\u620F<color=#94FF86>" + data.gameName + "</color>\u4E2D\u5956<color=#CD7F32>" + data.win / this.playerInfo.exchangeRate + "</color>\u91D1\u5E01";
    this.actionDo();
  },
  //滚动展示
  actionDo: function actionDo() {
    var _this = this;

    this.rich_text.node.x = 800;
    cc.tween(this.rich_text.node).to(5, {
      position: cc.v2(-800, 0)
    }).call(function () {
      _this.node.destroy();
    }).start();
  }
});

cc._RF.pop();