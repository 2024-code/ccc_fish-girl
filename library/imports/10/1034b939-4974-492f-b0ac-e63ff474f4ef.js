"use strict";
cc._RF.push(module, '1034bk5SXRJL7Cs5j/0dPTv', 'RunCards');
// Script/Runing/RunCards.js

"use strict";

/**
 * 跑得快卡牌管理类
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    //扑克容器
    pb_Cards: {
      "default": [],
      type: cc.SpriteFrame
    },
    handCard: false,
    selectedCard: false,
    outCard: false,
    moved: false,
    subscript: 0
  },
  onLoad: function onLoad() {},
  cardsCreate: function cardsCreate(value, type) {
    this.val = value;
    this.type = type;
    this.handCard = true; //类型等于5代表是王

    if (type == 5) {
      //值是14为小王,15为大王
      if (value == 14) {
        //小王
        this.node.getComponent("cc.Sprite").spriteFrame = this.pb_Cards[53];
      } else {
        //大王
        this.node.getComponent("cc.Sprite").spriteFrame = this.pb_Cards[54];
      }
    } else {
      this.node.getComponent("cc.Sprite").spriteFrame = this.pb_Cards[13 * (type - 1) + value];
    }
  },

  /**
   * 卡牌移动
   */
  moveCard: function moveCard() {
    if (this.handCard) {
      this.node.setPosition(this.node.position.x, this.node.position.y + 20);
      this.handCard = false;
    } else {
      this.node.setPosition(this.node.position.x, this.node.position.y - 20);
      this.handCard = true;
    }

    this.node.parent.parent.getComponent("RuningMain").primaryNum();
  },

  /**
   * 
   */
  changeHui: function changeHui() {
    this.node.color = new cc.Color(144, 144, 144);
  },

  /**
   * 
   */
  changeBai: function changeBai() {
    this.node.color = new cc.Color(255, 255, 255);
  }
});

cc._RF.pop();