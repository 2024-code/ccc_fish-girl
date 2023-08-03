"use strict";
cc._RF.push(module, '89632NGuxNM7rUeDa5QH/c4', 'modifyCoins');
// LaoHuJi/module/modifyCoins/modifyCoins.js

"use strict";

cc.Class({
  "extends": cc.Component,
  start: function start() {//////KBEngineEvent.register("onSendNewCoin", this, "onSendNewCoin");
  },
  //取消注册
  onDestroy: function onDestroy() {//////KBEngineEvent.deregister("onSendNewCoin", this);
  },
  onSendNewCoin: function onSendNewCoin(nNewCoin) {
    this.node.getComponent(cc.Label).string = nNewCoin.lo; //////KBEngineapp.player().reqGetAccountInfo();//刷新账户信息
  }
});

cc._RF.pop();