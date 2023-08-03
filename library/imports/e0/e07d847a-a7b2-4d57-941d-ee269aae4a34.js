"use strict";
cc._RF.push(module, 'e07d8R6p7JNV5Qd7iaarko0', 'ATTMain');
// Texture/game_attlhp/js/ATTMain.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    lblUserCoin: {
      "default": null,
      type: cc.Label,
      displayName: '用户金币'
    },
    lblWinCoin: {
      "default": null,
      type: cc.Label,
      displayName: '本局赢得'
    },
    lblBet: {
      "default": null,
      type: cc.Label,
      displayName: '押注'
    },
    rolePb: {
      "default": [],
      type: cc.Prefab,
      displayName: '牌角色Pb'
    },
    cards: {
      "default": [],
      type: cc.Node,
      displayName: '桌面牌'
    }
  },
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.net = this.node.getComponent('ATTNetwork');
    this.audio = this.node.getComponent('ATTAudio');
    this.bet = 100;
    this.lotteryRes = null;
    this.isAni = false;
    this.chooseCardArray = [];
  },
  start: function start() {
    // this.lblWinCoin.string = '0.00';
    this.setBet();
    this.lblUserCoin.string = this.playerInfo.playerCoin.toFixed(2);
    this.dealCards();
  },
  onCLick: function onCLick(event, args) {
    if (this.isAni) {
      return;
    }

    if (args == 'roll') {
      this.sendRoll();
    } else if (args == 'add') {
      if (this.lotteryRes != null && !this.lotteryRes.viewarray.isFinal) {
        return;
      }

      this.audio.playEffect(0);
      this.bet += 100;
      this.bet = this.bet >= 10000 ? 10000 : this.bet;
      this.setBet();
    } else if (args == 'dec') {
      if (this.lotteryRes != null && !this.lotteryRes.viewarray.isFinal) {
        return;
      }

      this.audio.playEffect(5);
      this.bet -= 100;
      this.bet = this.bet > 0 ? this.bet : 100;
      this.setBet();
    } else if (args == 'max') {
      if (this.lotteryRes != null && !this.lotteryRes.viewarray.isFinal) {
        return;
      }

      this.audio.playEffect(4);
      this.bet = 10000;
      this.setBet();
    } else if (args == 'exitGame') {
      this.audio.playEffect(5);
      this.net.socket.disconnect();
      cc.director.loadScene("LobbyMain");
    }
  },
  setBet: function setBet() {
    this.lblBet.string = (this.bet / 100).toFixed(2);
    var betShowArray = [750, 250, 150, 60, 10, 7, 5, 3, 2, 1];

    for (var i = 0; i < betShowArray.length; i++) {
      this.node.getChildByName("image_pic1").getChildByName("list").getChildByName("" + (i + 1)).getComponent(cc.Label).string = betShowArray[i] * (this.bet / 100);

      if (i < 4) {
        this.node.getChildByName("caijinliebiao").getChildByName("" + (i + 1)).getComponent(cc.Label).string = betShowArray[i] * (this.bet / 100);
      }
    }
  },
  chooseCard: function chooseCard(event, data) {
    if (this.lotteryRes && !this.lotteryRes.viewarray.isFinal && !this.isAni) {
      this.audio.playEffect(1);
      var needPush = true;

      for (var i = 0; i < this.chooseCardArray.length; i++) {
        if (parseInt(data) == this.chooseCardArray[i]) {
          needPush = false;
          this.chooseCardArray.splice(i, 1);
          this.cards[data].getChildByName("UI_BaoLiu").active = false;
          break;
        }
      }

      if (needPush) {
        this.cards[data].getChildByName("UI_BaoLiu").active = true;
        this.chooseCardArray.push(parseInt(data));
      }
    }
  },
  //发牌
  dealCards: function dealCards() {
    var _this = this;

    this.isAni = true;
    this.audio.playEffect(3);

    for (var i = 0; i < this.cards.length; i++) {
      var tempCard = this.cards[i];
      tempCard.setPosition(cc.v2(-500, 0));
      tempCard.getChildByName("back").scaleX = 1;
      tempCard.getChildByName("card").scaleX = 0;
      tempCard.getChildByName("card2").scaleX = 0;
      tempCard.getChildByName("UI_BaoLiu").active = false;
      var moveToPos = cc.v2(-314 + i * 157, 0);
      tempCard.stopAllActions();
      var cardIndex = this.cards.length - 1 - i;
      tempCard.runAction(cc.sequence(cc.delayTime(cardIndex * 0.1), cc.moveTo(0.2 - cardIndex * 0.02, moveToPos)));
    }

    this.scheduleOnce(function () {
      _this.isAni = false;
    }, 0.7);
  },
  leaveCards: function leaveCards() {
    var _this2 = this;

    this.isAni = true;
    this.lotteryRes = null;

    for (var i = 0; i < this.cards.length; i++) {
      var tempCard = this.cards[i];
      tempCard.stopAllActions();
      var cardIndex = this.cards.length - 1 - i;
      tempCard.runAction(cc.sequence(cc.delayTime(cardIndex * 0.1), cc.moveBy(0.2, cc.v2(-150, 0)), cc.moveTo(0.3 - cardIndex * 0.02, cc.v2(500, 0))));
    }

    this.scheduleOnce(function () {
      _this2.dealCards();
    }, 1.5);
  },
  //开牌
  openCards: function openCards(isFinal) {
    var _this3 = this;

    this.isAni = true;
    this.audio.playEffect(2);

    if (!isFinal) {
      this.lblUserCoin.string = (this.lotteryRes.userscore / 100).toFixed(2);

      for (var i = 0; i < this.cards.length; i++) {
        var tempCard = this.cards[i];
        tempCard.getChildByName("back").runAction(cc.scaleTo(0.1, 0, 1));
        tempCard.getChildByName("card").runAction(cc.sequence(cc.delayTime(0.1), cc.scaleTo(0.1, 1, 1)));
      }

      this.scheduleOnce(function () {
        _this3.isAni = false;
      }, 0.3);
    } else {
      for (var _i = 0; _i < this.cards.length; _i++) {
        var _tempCard = this.cards[_i];
        var needAni = true;

        for (var j = 0; j < this.chooseCardArray.length; j++) {
          if (this.chooseCardArray[j] == _i) {
            _tempCard.getChildByName("card").scaleX = 0;
            _tempCard.getChildByName("card2").scaleX = 1;
            needAni = false;
            break;
          }
        }

        if (needAni) {
          _tempCard.getChildByName("card").runAction(cc.scaleTo(0.1, 0, 1));

          _tempCard.getChildByName("card2").runAction(cc.sequence(cc.delayTime(0.1), cc.scaleTo(0.1, 1, 1), cc.scaleTo(0.1, 0, 1), cc.scaleTo(0.1, 1, 1)));
        }
      }

      this.scheduleOnce(function () {
        _this3.showResult();
      }, 1);
    }
  },
  showResult: function showResult() {
    var _this4 = this;

    this.hideResultAni();
    this.lblUserCoin.string = (this.lotteryRes.userscore / 100).toFixed(2);

    if (this.lotteryRes.viewarray.winType == 0) {
      this.audio.playEffect(6);
      this.node.getChildByName("resultAni").getChildByName("ani0").active = true;
      this.node.getChildByName("resultAni").getChildByName("ani0").getComponent(cc.Animation).play();
      this.node.getChildByName("resultAni").getChildByName("aniLose").active = true;
      this.node.getChildByName("resultAni").getChildByName("aniLose").getComponent(cc.Animation).play();
    } else {
      this.audio.playEffect(7);
      this.node.getChildByName("resultAni").getChildByName("ani" + this.lotteryRes.viewarray.winType).active = true;
      this.node.getChildByName("resultAni").getChildByName("ani" + this.lotteryRes.viewarray.winType).getComponent(cc.Animation).play();
      this.node.getChildByName("resultAni").getChildByName("aniGold").active = true;
      this.node.getChildByName("resultAni").getChildByName("aniGold").getComponent(cc.Animation).play();
    }

    this.scheduleOnce(function () {
      _this4.hideResultAni();

      _this4.leaveCards();
    }, 2);
  },
  roll: function roll(list) {
    for (var i = 0; i < this.cards.length; i++) {
      if (!this.lotteryRes.viewarray.isFinal) {
        this.cards[i].getChildByName("card").removeAllChildren();
        var pb = cc.instantiate(this.rolePb[list[i]]);
        this.cards[i].getChildByName("card").addChild(pb);
      } else {
        this.cards[i].getChildByName("card2").removeAllChildren();

        var _pb = cc.instantiate(this.rolePb[list[i]]);

        this.cards[i].getChildByName("card2").addChild(_pb);
      }
    }

    this.openCards(this.lotteryRes.viewarray.isFinal);

    if (this.lotteryRes.viewarray.isFinal) {
      this.chooseCardArray = [];
    }
  },
  sendRoll: function sendRoll() {
    this.net.socket.emit('lottery', JSON.stringify({
      bet: this.bet,
      array: this.chooseCardArray
    }));
  },
  hideResultAni: function hideResultAni() {
    this.node.getChildByName("resultAni").getChildByName("aniGold").active = false;
    this.node.getChildByName("resultAni").getChildByName("aniLose").active = false;

    for (var i = 0; i < 11; i++) {
      this.node.getChildByName("resultAni").getChildByName("ani" + i).active = false;
    }
  }
});

cc._RF.pop();