"use strict";
cc._RF.push(module, 'a8d0eR//odFw7mwZdSIpZmO', 'matchRace');
// Script/Lobby/matchRace.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    list: cc.Node,
    pb: cc.Prefab
  },
  init: function init(dataList) {
    console.log(dataList);
    this.pbList = [];
    this.dataList = dataList;
    this.list.removeAllChildren();
    this.index = 0;

    for (var i = 0; i <= 4; i++) {
      !!this.dataList[i] && this.initPb(this.dataList[i]);
    }

    this.unschedule(this.runAct);

    if (this.dataList.length > 5) {
      this.schedule(this.runAct, 2);
    }
  },
  runAct: function runAct() {
    var pb = this.pbList.shift();
    pb.removeFromParent();
    this.index = this.index >= this.dataList.length ? 0 : this.index;
    this.initPb(this.dataList[this.index]);
  },
  initPb: function initPb(data) {
    var p = cc.instantiate(this.pb);
    var head = p.getChildByName('face').getComponent(cc.Sprite);
    Helper.loadHead(data.head_url, function (texture) {
      head.spriteFrame = texture;
    });
    p.getChildByName('name').getComponent(cc.Label).string = data.nick_name;
    p.getChildByName('New Label').getComponent(cc.Label).string = data.win_all + "\u80DC  " + (data.play - data.win_all) + "\u8D1F";
    this.list.addChild(p);
    this.pbList.push(p);
    this.index++;
  } // update (dt) {},

});

cc._RF.pop();