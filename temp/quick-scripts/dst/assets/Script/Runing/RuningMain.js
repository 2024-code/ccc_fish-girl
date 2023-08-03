
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Runing/RuningMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '059b55HVOZHi7Equaa/9r/L', 'RuningMain');
// Script/Runing/RuningMain.js

"use strict";

/**
 * 跑得快游戏逻辑
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    pb_Cards: {
      "default": null,
      type: cc.Prefab
    },
    pb_CardNode: {
      "default": null,
      type: cc.Node
    },
    btn_RobLandload: {
      "default": null,
      type: cc.Node
    },
    otherOneL: {
      "default": null,
      type: cc.Node
    },
    otherTwoR: {
      "default": null,
      type: cc.Node
    },
    pb_Timer: {
      "default": [],
      type: cc.Node
    },
    pb_LandloadsCard: {
      "default": [],
      type: cc.Node
    },
    pb_Lower: {
      "default": null,
      type: cc.Node
    },
    btn_CallLandload: {
      "default": null,
      type: cc.Node
    },
    landloadsCards: {
      "default": null,
      type: cc.Node
    },
    bgAudio: {
      "default": null,
      type: cc.AudioClip
    },
    allTips: {
      "default": [],
      type: cc.Node
    },
    landloadsLogo: {
      "default": [],
      type: cc.Node
    },
    btn_OutCard: {
      "default": null,
      type: cc.Node
    },
    btn_again: {
      "default": null,
      type: cc.Node
    },
    cardAudio: {
      "default": [],
      type: cc.AudioClip
    },
    duiZiAudio: {
      "default": [],
      type: cc.AudioClip
    },
    baoJingAudio: {
      "default": [],
      type: cc.AudioClip
    },
    buYaoAudio: {
      "default": [],
      type: cc.AudioClip
    },
    chuTianAudio: {
      "default": null,
      type: cc.AudioClip
    },
    jiaoDiZhuAudio: {
      "default": null,
      type: cc.AudioClip
    },
    buJiaoAudio: {
      "default": null,
      type: cc.AudioClip
    },
    qiangAudio: {
      "default": null,
      type: cc.AudioClip
    },
    buQiangAudio: {
      "default": null,
      type: cc.AudioClip
    },
    cardTypeAudio: {
      "default": [],
      type: cc.AudioClip
    },
    faPaiAudio: {
      "default": null,
      type: cc.AudioClip
    },
    shuYing: {
      "default": [],
      type: cc.AudioClip
    },
    sanGeAudio: {
      "default": [],
      type: cc.AudioClip
    },
    billMessage: {
      "default": [],
      type: cc.Node
    },
    billBg: {
      "default": [],
      type: cc.SpriteFrame
    },
    teXiao: {
      "default": [],
      type: cc.Prefab
    },
    cardTypeText: {
      "default": [],
      type: cc.Prefab
    },
    teXiaoAudio: {
      "default": [],
      type: cc.AudioClip
    },
    changeAudio: {
      "default": null,
      type: cc.AudioClip
    },
    protagonist: {
      "default": null,
      type: cc.Node
    },
    btn_Start: {
      "default": null,
      type: cc.Node
    },
    com_MessageBox: {
      "default": null,
      type: cc.Node
    },
    bgTu: {
      "default": null,
      type: cc.Node
    },
    topSet: {
      "default": null,
      type: cc.Node
    },
    paiXing: {
      "default": null,
      type: cc.Prefab
    },
    rocket: {
      "default": [],
      type: cc.Prefab
    },
    rocketBoom: {
      "default": null,
      type: cc.Prefab
    },
    exitReady: {
      "default": null,
      type: cc.Node
    },
    exitBtn: {
      "default": null,
      type: cc.Node
    },
    closeDoorLbl: cc.Label,
    bpLbl: cc.Label,
    firstOutCard: 1,
    distanceCard: 50,
    smallDistanceCard: 40,
    initY: -220,
    movedY: -200,
    finishY: -50,
    peak: 10,
    tipsCount: 0,
    tuoGuan: false,
    gameFinish: true,
    qiangDiZhu: false
  },
  onLoad: function onLoad() {
    this.allowTips = false; //玩家手中的牌

    this.playerCards = []; //选中的牌

    this.selectedCard = [];
    this.CardsNum = [];
    this.recycling = [[null], [null], [null]];
    this.otherCardArr = [];
    this.mingPaiArray = [[], [], []];
    this.cardsGroup = [[], [], [], [], []]; //提示出的牌

    this.tipsCardsArr = [];
    this.tempPlayerId = null;
    this.chongLian = false;
    this.allPlayerTipsState = [[null], [null], [null]];
    this.btnPlayerState = null;
    this.netWork = null;

    for (var i = 3; i < 16; i++) {
      this.CardsNum.push(i);
    }

    this.CardsNum.splice(this.CardsNum.length - 2, 0, 1, 2);
    this.count = 0;
    this.cardsList = [//小王
    {
      val: 14,
      type: 5
    }, //大王
    {
      val: 15,
      type: 5
    }, //黑桃A
    {
      val: 1,
      type: 1
    }, //黑桃2
    {
      val: 2,
      type: 1
    }, //黑桃3
    {
      val: 3,
      type: 1
    }, //黑桃4
    {
      val: 4,
      type: 1
    }, //黑桃5
    {
      val: 5,
      type: 1
    }, //黑桃
    {
      val: 6,
      type: 1
    }, //黑桃7
    {
      val: 7,
      type: 1
    }, //黑桃8
    {
      val: 8,
      type: 1
    }, //黑桃9
    {
      val: 9,
      type: 1
    }, //黑桃10
    {
      val: 10,
      type: 1
    }, //黑桃J
    {
      val: 11,
      type: 1
    }, //黑桃Q
    {
      val: 12,
      type: 1
    }, //黑桃K
    {
      val: 13,
      type: 1
    }, //红桃A
    {
      val: 1,
      type: 2
    }, //红桃2
    {
      val: 2,
      type: 2
    }, //红桃3
    {
      val: 3,
      type: 2
    }, //红桃4
    {
      val: 4,
      type: 2
    }, //红桃5
    {
      val: 5,
      type: 2
    }, //红桃
    {
      val: 6,
      type: 2
    }, //红桃7
    {
      val: 7,
      type: 2
    }, //红桃8
    {
      val: 8,
      type: 2
    }, //红桃9
    {
      val: 9,
      type: 2
    }, //红桃10
    {
      val: 10,
      type: 2
    }, //红桃J
    {
      val: 11,
      type: 2
    }, //红桃Q
    {
      val: 12,
      type: 2
    }, //红桃K
    {
      val: 13,
      type: 2
    }, //梅花A
    {
      val: 1,
      type: 3
    }, //梅花2
    {
      val: 2,
      type: 3
    }, //梅花3
    {
      val: 3,
      type: 3
    }, //梅花4
    {
      val: 4,
      type: 3
    }, //梅花5
    {
      val: 5,
      type: 3
    }, //梅花
    {
      val: 6,
      type: 3
    }, //梅花7
    {
      val: 7,
      type: 3
    }, //梅花8
    {
      val: 8,
      type: 3
    }, //梅花9
    {
      val: 9,
      type: 3
    }, //梅花10
    {
      val: 10,
      type: 3
    }, //梅花J
    {
      val: 11,
      type: 3
    }, //梅花Q
    {
      val: 12,
      type: 3
    }, //梅花K
    {
      val: 13,
      type: 3
    }, //方片A
    {
      val: 1,
      type: 4
    }, //方片2
    {
      val: 2,
      type: 4
    }, //方片3
    {
      val: 3,
      type: 4
    }, //方片4
    {
      val: 4,
      type: 4
    }, //方片5
    {
      val: 5,
      type: 4
    }, //方片
    {
      val: 6,
      type: 4
    }, //方片7
    {
      val: 7,
      type: 4
    }, //方片8
    {
      val: 8,
      type: 4
    }, //方片9
    {
      val: 9,
      type: 4
    }, //方片10
    {
      val: 10,
      type: 4
    }, //方片J
    {
      val: 11,
      type: 4
    }, //方片Q
    {
      val: 12,
      type: 4
    }, //方片K
    {
      val: 13,
      type: 4
    }]; //排序底牌

    this.cardsArray = this.cardsList.sort(function () {
      return 1 * Math.random() - .5;
    }); //每人上来发17张牌

    this.cardsArray = [{
      val: 12,
      type: 1
    }, {
      val: 12,
      type: 3
    }, {
      val: 12,
      type: 3
    }, {
      val: 12,
      type: 4
    }, {
      val: 12,
      type: 1
    }, {
      val: 12,
      type: 2
    }, {
      val: 12,
      type: 3
    }, {
      val: 12,
      type: 4
    }, {
      val: 12,
      type: 1
    }, {
      val: 12,
      type: 2
    }, {
      val: 12,
      type: 3
    }, {
      val: 12,
      type: 4
    }, {
      val: 12,
      type: 1
    }, {
      val: 12,
      type: 2
    }, {
      val: 12,
      type: 3
    }, {
      val: 12,
      type: 2
    }, {
      val: 12,
      type: 1
    }], this.cardsArray = this.cardsArray.splice(0, 16);
    this.initUI();
  },
  start: function start() {
    if (!!window.reconnectPoint) {
      cc.log('断线重连开始游戏');
      this.btn_Start.active = false;
      this.exitBtn.active = false;
      window.reconnectPoint = false;
      this.netWork.startGameFunction();
      this.gameInit();
      this.allTips[1].getChildByName("dengdai").active = true;
    }
  },

  /**
   * 初始化UI
   */
  initUI: function initUI() {
    var _this = this;

    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);

    if (cc.view.getVisibleSize().width / 1334 < cc.view.getVisibleSize().height / 750) {
      this.biLi = cc.view.getVisibleSize().width / 1334;
    } else {
      this.biLi = cc.view.getVisibleSize().height / 750;
    }

    if (this.biLi > 1) {
      this.bgTu.width = cc.view.getVisibleSize().width + 30;
      this.bgTu.height = cc.view.getVisibleSize().height + 30;
      this.node.scale = 1;
      this.biLi = 1;
    } else {
      this.bgTu.width = cc.view.getVisibleSize().width / this.biLi + 30;
      this.bgTu.height = cc.view.getVisibleSize().height / this.biLi + 30;
      this.node.scale = this.biLi;
    }

    this.topSet.setPosition(cc.view.getVisibleSize().width / 2 / this.biLi, cc.view.getVisibleSize().height / 2 / this.biLi - this.topSet.height / 2); //设置三张底牌位置

    this.landloadsCards.setPosition(-68, cc.view.getVisibleSize().height / 2 / this.biLi - this.landloadsCards.height / 2 * this.landloadsCards.scale - 20);
    this.node.getChildByName("blackFace").setContentSize(cc.view.getVisibleSize().width / this.biLi, cc.view.getVisibleSize().height / this.biLi);
    this.com_MessageBox.getChildByName("blackFace").setContentSize(cc.view.getVisibleSize().width / this.biLi, cc.view.getVisibleSize().height / this.biLi);
    this.node.getChildByName("tuoGuanCancel").getChildByName("smallBlack").setContentSize(cc.view.getVisibleSize().width / this.biLi, this.node.getChildByName("tuoGuanCancel").getChildByName("smallBlack").getContentSize().height);
    cc.view.setResizeCallback(function () {
      if (cc.view.getVisibleSize().width / 1334 < cc.view.getVisibleSize().height / 750) {
        _this.biLi = cc.view.getVisibleSize().width / 1334;
      } else {
        _this.biLi = cc.view.getVisibleSize().height / 750;
      }

      if (_this.biLi > 1) {
        _this.bgTu.width = cc.view.getVisibleSize().width + 30;
        _this.bgTu.height = cc.view.getVisibleSize().height + 30;
        _this.node.scale = 1;
        _this.biLi = 1;
      } else {
        _this.bgTu.width = cc.view.getVisibleSize().width / _this.biLi + 30;
        _this.bgTu.height = cc.view.getVisibleSize().height / _this.biLi + 30;
        _this.node.scale = _this.biLi;
      }

      _this.topSet.setPosition(cc.view.getVisibleSize().width / 2 / _this.biLi, cc.view.getVisibleSize().height / 2 / _this.biLi - _this.topSet.height / 2); //设置三张底牌位置


      _this.landloadsCards.setPosition(-68, cc.view.getVisibleSize().height / 2 / _this.biLi - _this.landloadsCards.height / 2 * _this.landloadsCards.scale - 20);

      _this.node.getChildByName("blackFace").setContentSize(cc.view.getVisibleSize().width / _this.biLi, cc.view.getVisibleSize().height / _this.biLi);

      _this.com_MessageBox.getChildByName("blackFace").setContentSize(cc.view.getVisibleSize().width / _this.biLi, cc.view.getVisibleSize().height / _this.biLi);

      _this.node.getChildByName("tuoGuanCancel").getChildByName("smallBlack").setContentSize(cc.view.getVisibleSize().width / _this.biLi, _this.node.getChildByName("tuoGuanCancel").getChildByName("smallBlack").getContentSize().height);
    });
    this.pInfo = require("PlayerInfo").getInstant;
    this.netWork = require("RuningNetWork").getInstant;
    this.netWork.setruningObj_Function(this);
    this.pInfo.setGameObj_Function(this);
    Helper.loadHead(this.pInfo.playerHeadId, function (sp) {
      _this.node.getChildByName('player').getComponent("cc.Sprite").spriteFrame = sp;
    });
    this.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = parseFloat(this.pInfo.playerCoin).toFixed(2);
    this.pb_Lower.getChildByName("head").getChildByName("niCheng").getComponent("cc.Label").string = this.pInfo.playerName;
    this.tempPlayersLists = [];

    if (this.pInfo.musicControl) {
      this.bgMusic = cc.audioEngine.play(this.bgAudio, true, 1);
    }
  },

  /**
   * 初始化游戏
   */
  gameInit: function gameInit() {
    this.netWork.disconnected = false;
    this.roomBet = this.netWork.roomBet;
    this.netWork.gameExit = false;
    this.playerId = this.pInfo.playerId; //玩家列表

    this.playerArr = [null, this.pInfo.playerId, null]; //扑克数量

    var cardLength = 54; //卡牌对象池

    this.cardsPool = new cc.NodePool("RunCards");

    for (var i = 0; i < cardLength; i++) {
      var card = cc.instantiate(this.pb_Cards);
      this.cardsPool.put(card);
    }
  },

  /**
   * 重置底分
   * @param {*} score 
   */
  resetDF: function resetDF(score) {
    this.pb_Lower.getChildByName("di").getChildByName("bottomScore").getComponent("cc.Label").string = (score / this.pInfo.exchangeRate).toFixed(2);
  },

  /**
   * 设置玩家信息
   * @param {*} nickname 
   * @param {*} score 
   * @param {*} seatId 
   * @param {*} userId 
   */
  setMySeat: function setMySeat(nickname, score, seatId, userId) {
    this.pb_Lower.getChildByName("head").getChildByName("niCheng").getComponent("cc.Label").string = nickname;
    this.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = (score / this.pInfo.exchangeRate).toFixed(2);
  },

  /**
   * 设置卡牌数量
   * @param {*} userId 
   * @param {*} carcd_length 
   */
  setCardLength: function setCardLength(userId, carcd_length) {
    for (var i = 0; i < this.playerArr.length; i++) {
      if (this.playerArr[i] == userId) {
        if (i == 0) {
          this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = carcd_length;
        } else if (i == 2) {
          this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = carcd_length;
        }
      }
    }
  },

  /**
   * 进入房间  座位号排序
   * @param {*} nickname 
   * @param {*} score 
   * @param {*} seatId 
   * @param {*} userId 
   */
  otherEnterRoom: function otherEnterRoom(nickname, score, seatId, userId, usrHead) {
    cc.log('其它玩家进入房间:' + seatId);
    var seat = null;

    if (this.netWork.seatId == 0 && seatId == 1) {
      seat = this.otherTwoR;
      this.playerArr[2] = userId;
    } else if (this.netWork.seatId == 0 && seatId == 2) {
      seat = this.otherOneL;
      this.playerArr[0] = userId;
    } else if (this.netWork.seatId == 1 && seatId == 0) {
      seat = this.otherOneL;
      this.playerArr[0] = userId;
    } else if (this.netWork.seatId == 1 && seatId == 2) {
      seat = this.otherTwoR;
      this.playerArr[2] = userId;
    } else if (this.netWork.seatId == 2 && seatId == 1) {
      seat = this.otherOneL;
      this.playerArr[0] = userId;
    } else if (this.netWork.seatId == 2 && seatId == 0) {
      seat = this.otherTwoR;
      this.playerArr[2] = userId;
    }

    seat.active = true;
    seat.getChildByName("bg_name").getChildByName("Score").getComponent("cc.Label").string = (score / this.pInfo.exchangeRate).toFixed(2);
    seat.getChildByName("bg_name").getChildByName("niCheng").getComponent("cc.Label").string = nickname;
    Helper.loadHead(usrHead, function (sp) {
      seat.getComponent("cc.Sprite").spriteFrame = sp;
    });
  },

  /**
   * 离开房间
   * @param {*} userId 
   */
  playerOutRoom: function playerOutRoom(userId) {
    for (var i = 0; i < this.playerArr.length; i++) {
      if (this.playerArr[i] == userId) {
        if (i == 0) {
          this.otherOneL.active = false;
        } else if (i == 2) {
          this.otherTwoR.active = false;
        }

        this.landloadsLogo[i].active = false;
        break;
      }
    }
  },

  /**
   * 断开连接
   */
  disconnectNetWork_Function: function disconnectNetWork_Function() {
    try {
      this.netWork.LandlordsSocket.disconnect();
    } catch (error) {}

    ;
    this.netWork.LandlordsSocket = null;
    this.pInfo.gameDisconnect = true;
    this.com_MessageBox.active = true;
    this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "您已断线，请重新登录";
  },

  /**
   * 重新连接
   * @param {*} userId 
   * @param {*} double 
   */
  resetLandlords: function resetLandlords(userId, _double) {
    this.qiangDiZhu = false;

    for (var i = 0; i < this.playerArr.length; i++) {
      if (this.playerArr[i] == userId) {
        if (this.netWork.playerId == userId) {
          this.landloadsLogo[1].active = true;
          this.tempPlayersLists[1].isLandlord = true;
          this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = _double;
        } else {
          this.landloadsLogo[i].active = true;
          this.tempPlayersLists[i].isLandlord = true;
          this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = _double / 2;
        }
      }
    }

    for (var i = 0; i < this.tempPlayersLists.length; i++) {
      for (var j = 0; j < this.tempPlayersLists[i].state.length; j++) {
        if (this.tempPlayersLists[i].state[j] != null) {
          this.tempPlayersLists[i].state[j].active = false;
        }
      }

      this.tempPlayersLists[i].state = [];
    }
  },

  /**
   * 叫地主，抢地主
   * @param {*} second 
   */
  callLandloads: function callLandloads(second) {
    this.btn_CallLandload.active = true;
    this.btnPlayerState = this.btn_CallLandload;
    this.timer(1, second);
  },

  /**
   * 公共牌, 三张底牌
   * @param {*} cards 
   */
  publicCard: function publicCard(cards) {
    if (!!!cards) {
      return;
    }

    cc.log("公共牌", cards);
    this.landloadsCards.active = true; //对底牌进行对比排序

    cards.sort(function (cardA, cardB) {
      var value;

      if (cardA.val == 1) {
        cardA.val += 12.1;
      } else if (cardA.val == 2) {
        cardA.val += 11.2;
      }

      if (cardB.val == 1) {
        cardB.val += 12.1;
      } else if (cardB.val == 2) {
        cardB.val += 11.2;
      }

      if (cardA.val == cardB.val) {
        value = cardB.type - cardA.type;
      } else {
        value = cardB.val - cardA.val;
      }

      return value;
    });

    for (var i = 0; i < this.pb_LandloadsCard.length; i++) {
      if (cards[i].val == 13.1) {
        cards[i].val = 1;
      } else if (cards[i].val == 13.2) {
        cards[i].val = 2;
      }

      this.pb_LandloadsCard[i].getComponent("RunCards").cardsCreate(cards[i].val, cards[i].type);
    }
  },

  /**
   * 震屏效果
   */
  shacking: function shacking() {
    this.bgTu.stopAllActions();
    var bgTuAction = cc.repeat(cc.sequence(cc.moveTo(.05, cc.v2(15, 15)), cc.moveTo(.1, cc.v2(-15, -15)), cc.moveTo(.05, cc.v2(15, 0)), cc.moveTo(.05, cc.v2(-15, 0)), cc.moveTo(.1, cc.v2(0, -15)), cc.moveTo(.05, cc.v2(0, 0))), 1);
    this.bgTu.runAction(bgTuAction);
  },
  checkLandlords: function checkLandlords(e, t, i) {
    this.landloadsCards.active = true, this.qiangDiZhu = false, this.tempPlayerId = null, t.sort(function (e, t) {
      return 1 == e.val ? e.val += 12.1 : 2 == e.val && (e.val += 11.2), 1 == t.val ? t.val += 12.1 : 2 == t.val && (t.val += 11.2), e.val == t.val ? t.type - e.type : t.val - e.val;
    });

    for (var n = 0; n < this.pb_LandloadsCard.length; n++) {
      13.1 == t[n].val ? t[n].val = 1 : 13.2 == t[n].val && (t[n].val = 2), this.pb_LandloadsCard[n].getComponent("RunCards").cardsCreate(t[n].val, t[n].type);
    }

    if (e == this.netWork.playerId) {
      this.landloadsLogo[1].active = true, this.tempPlayersLists[1].isLandlord = true, this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 16, this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 16;

      for (var n = 0; n < t.length; n++) {
        var o;
        o = this.cardsPool.size() > 0 ? this.cardsPool.get() : cc.instantiate(this.pb_Cards), o.scale = 1.2, this.pb_CardNode.addChild(o, 1), o.getComponent("RunCards").cardsCreate(t[n].val, t[n].type), this.playerCards.push(o);
      }

      this.playerCards.sort(function (e, t) {
        return e.getComponent("RunCards").val == t.getComponent("RunCards").val ? t.getComponent("RunCards").type - e.getComponent("RunCards").type : t.getComponent("RunCards").val - e.getComponent("RunCards").val;
      });

      for (var n = 0, a = null, s = null, c = null; n < this.playerCards.length; n++) {
        if (this.playerCards[n].getComponent("RunCards").val > 13) a = n;else if (2 == this.playerCards[n].getComponent("RunCards").val || 1 == this.playerCards[n].getComponent("RunCards").val) {
          s = n;
          break;
        }
      }

      if (null == a && null != s) {
        c = this.playerCards.splice(n, this.playerCards.length - 1);

        for (var r = 0; r < c.length; r++) {
          this.playerCards.splice(r, 0, c[r]);
        }
      } else if (null != a && null != s) {
        c = this.playerCards.splice(n, this.playerCards.length - 1);

        for (var r = 0; r < c.length; r++) {
          this.playerCards.splice(a + r + 1, 0, c[r]);
        }
      }

      this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = i, this.resetCardLocat(), this.firstOutCard = 0, this.count = 2;
    } else {
      for (var n = 0; n < this.playerArr.length; n++) {
        this.playerArr[n] == e && 0 == n ? (this.landloadsLogo[n].active = true, this.tempPlayersLists[n].isLandlord = true, this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 20, this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 16) : this.playerArr[n] == e && 2 == n && (this.landloadsLogo[n].active = true, this.tempPlayersLists[n].isLandlord = true, this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 16, this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 20);
      }

      this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = i / 2;
    }

    this.scheduleOnce(function () {
      cc.log("检测地主");

      for (var e = 0; e < this.tempPlayersLists.length; e++) {
        for (var t = 0; t < this.tempPlayersLists[e].state.length; t++) {
          null != this.tempPlayersLists[e].state[t] && (this.tempPlayersLists[e].state[t].active = false);
        }

        this.tempPlayersLists[e].state = [];
      }
    }, 1);
  },
  playerNowState: function playerNowState(e, t, i, n) {
    cc.log("玩家状态", e, t), this.cancelTimer(), null != n && this.landloadsLogo[1].active == true ? this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = n : null != n && this.landloadsLogo[1].active == false && (this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = n / 2);

    for (var o = -1, a = 0; a < this.playerArr.length; a++) {
      if (this.playerArr[a] == e) {
        o = a;
        break;
      }
    }

    switch (1 == o && null != this.btnPlayerState && (this.btnPlayerState.active = false), t) {
      case "叫地主":
        this.allTips[o].getChildByName("Call-the-landlord").active = true, this.pInfo.soundEffectControl && cc.audioEngine.play(this.jiaoDiZhuAudio, false, 1), this.allPlayerTipsState[o] = this.allTips[o].getChildByName("Call-the-landlord");
        break;

      case "不叫":
        this.allTips[o].getChildByName("Don't-call").active = true, this.pInfo.soundEffectControl && cc.audioEngine.play(this.buJiaoAudio, false, 1), this.allPlayerTipsState[o] = this.allTips[o].getChildByName("Don't-call");
        break;

      case "不抢":
        this.allTips[o].getChildByName("Don't-grab").active = true, this.pInfo.soundEffectControl && cc.audioEngine.play(this.buQiangAudio, false, 1), this.allPlayerTipsState[o] = this.allTips[o].getChildByName("Don't-grab");
        break;

      case "不加倍":
        this.allTips[o].getChildByName("No-doubling").active = true, this.allPlayerTipsState[o] = this.allTips[o].getChildByName("No-doubling");
        break;

      case "不出":
        if (this.allTips[o].getChildByName("No").active = true, this.pInfo.soundEffectControl && cc.audioEngine.play(this.buYaoAudio[Math.floor(3 * Math.random())], false, 1), 1 == o) {
          for (var a = 0; a < this.playerCards.length; a++) {
            this.playerCards[a].position.y == this.movedY && this.playerCards[a].getComponent("RunCards").moveCard();
          }

          this.selectedCard = [], this.count = 0;
        }

        this.allPlayerTipsState[o] = this.allTips[o].getChildByName("No");
        break;

      case "抢地主":
        this.allTips[o].getChildByName("Rob-landlords").active = true, this.pInfo.soundEffectControl && cc.audioEngine.play(this.qiangAudio, false, 1), this.allPlayerTipsState[o] = this.allTips[o].getChildByName("Rob-landlords");
        break;

      case "加倍":
        this.allTips[o].getChildByName("double").active = true, this.allPlayerTipsState[o] = this.allTips[o].getChildByName("double");
        break;

      case "单牌":
        this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardAudio[i[0].val - 1], false, 1);
        break;

      case "对子":
        this.pInfo.soundEffectControl && cc.audioEngine.play(this.duiZiAudio[i[0].val - 1], false, 1);
        break;

      case "顺子":
        this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardTypeAudio[4], false, 1);
        var s = cc.instantiate(this.paiXing);
        this.pb_CardNode.addChild(s, 101), this.recycling[o].length < this.peak ? s.setPosition((this.recycling[o][0].position.x + this.recycling[o][this.recycling[o].length - 1].position.x + this.recycling[o][0].width * this.recycling[o][0].scale) / 2, this.recycling[o][0].position.y) : s.setPosition((this.recycling[o][0].position.x + this.recycling[o][this.peak].position.x + this.recycling[o][0].width * this.recycling[o][0].scale) / 2, this.recycling[o][0].position.y), s.getComponent("dragonBones.ArmatureDisplay").armature().animation.play("shunzi", 1), this.scheduleOnce(function () {
          s.destroy();
        }, 1);
        break;

      case "三顺":
        this.pInfo.soundEffectControl && (cc.audioEngine.play(this.cardTypeAudio[0], false, 1), cc.audioEngine.play(this.teXiaoAudio[1], false, 1));
        var c = cc.instantiate(this.cardTypeText[0]);
        this.pb_CardNode.addChild(c, 101), c.setPosition(cc.v2(0, 0)), this.scheduleOnce(function () {
          var e = cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            c.destroy();
          }, this));
          c.runAction(e);
        }, 1);
        var r = cc.instantiate(this.teXiao[0]);
        this.pb_CardNode.addChild(r, 100), r.setPosition(cc.v2(867 / this.biLi, 0));
        var l = cc.sequence(cc.moveTo(1, cc.v2(-867 / this.biLi, 0)), cc.callFunc(function () {
          r.destroy();
        }, this));
        r.runAction(l);
        break;

      case "连对":
        this.pInfo.soundEffectControl && (cc.audioEngine.play(this.cardTypeAudio[1], false, 1), cc.audioEngine.play(this.changeAudio, false, 1));
        var s = cc.instantiate(this.paiXing);
        this.pb_CardNode.addChild(s, 101), this.recycling[o].length < this.peak ? s.setPosition((this.recycling[o][0].position.x + this.recycling[o][this.recycling[o].length - 1].position.x + this.recycling[o][0].width * this.recycling[o][0].scale) / 2, this.recycling[o][0].position.y) : s.setPosition((this.recycling[o][0].position.x + this.recycling[o][this.peak].position.x + this.recycling[o][0].width * this.recycling[o][0].scale) / 2, this.recycling[o][0].position.y), s.getComponent("dragonBones.ArmatureDisplay").armature().animation.play("liandui", 1), this.scheduleOnce(function () {
          s.destroy();
        }, 1);
        break;

      case "三条":
        this.pInfo.soundEffectControl && cc.audioEngine.play(this.sanGeAudio[i[0].val - 1], false, 1);
        break;

      case "三带一":
        this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardTypeAudio[3], false, 1);
        break;

      case "三带二":
        this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardTypeAudio[2], false, 1);
        break;

      case "四带二":
        this.pInfo.soundEffectControl && (6 == i.length ? cc.audioEngine.play(this.cardTypeAudio[5], false, 1) : 8 == i.length && cc.audioEngine.play(this.cardTypeAudio[6], false, 1));
        break;

      case "飞机":
        this.pInfo.soundEffectControl && (cc.audioEngine.play(this.cardTypeAudio[0], false, 1), cc.audioEngine.play(this.teXiaoAudio[1], false, 1));
        var c = cc.instantiate(this.cardTypeText[0]);
        this.pb_CardNode.addChild(c, 101), c.setPosition(cc.v2(0, 0)), this.scheduleOnce(function () {
          var e = cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            c.destroy();
          }, this));
          c.runAction(e);
        }, 1);
        var r = cc.instantiate(this.teXiao[0]);
        this.pb_CardNode.addChild(r, 100), r.setPosition(cc.v2(867 / this.biLi, 0));
        var l = cc.sequence(cc.moveTo(1, cc.v2(-867 / this.biLi, 0)), cc.callFunc(function () {
          r.destroy();
        }, this));
        r.runAction(l);
        break;

      case "炸弹":
        if (0 == o) var h = this.otherOneL.position,
            d = [h, cc.v2(h.x / 2, h.y + 150), cc.v2(0, 0)];else if (1 == o) var h = this.protagonist.position,
            d = [h, cc.v2(h.x / 2, h.y + 350), cc.v2(0, 0)];else if (2 == o) var h = this.otherTwoR.position,
            d = [h, cc.v2(h.x / 2, h.y + 150), cc.v2(0, 0)];
        this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardTypeAudio[8], false, 1);
        var c = cc.instantiate(this.cardTypeText[3]);
        this.pb_CardNode.addChild(c, 101), c.setPosition(cc.v2(0, 0));
        var r = cc.instantiate(this.teXiao[3]);
        this.pb_CardNode.addChild(r, 100), r.setPosition(h);
        var u = cc.spawn(cc.rotateTo(.5, 180), cc.cardinalSplineTo(.5, d, -.5));
        r.runAction(u);
        var m = null;
        this.scheduleOnce(function () {
          r.destroy(), this.pInfo.soundEffectControl && cc.audioEngine.play(this.teXiaoAudio[0], false, 1), m = cc.instantiate(this.teXiao[1]), this.pb_CardNode.addChild(m, 100), m.setPosition(cc.v2(0, 0));
          var e = cc.sequence(cc.scaleTo(.2, 1.2, 1.2), cc.scaleTo(.2, 1, 1), cc.delayTime(1), cc.fadeOut(.1), cc.callFunc(function () {
            c.destroy();
          }, this));
          c.runAction(e), this.shacking();
        }, .5), this.scheduleOnce(function () {
          m.destroy();
        }, 1.1);
        break;

      case "王炸":
        this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardTypeAudio[7], false, 1);
        var r = cc.instantiate(this.teXiao[2]),
            g = cc.v2((this.recycling[o][0].position.x + this.recycling[o][this.recycling[o].length - 1].position.x) / 2, this.recycling[o][0].position.y);
        this.pb_CardNode.addChild(r, 100), r.setPosition(g), this.scheduleOnce(function () {
          r.destroy();
        }, .4);
        var p = cc.sequence(cc.moveTo(.4, cc.v2(0, 735 / this.biLi)), cc.rotateTo(0, 180), cc.moveTo(.2, cc.v2(0, 0)), cc.callFunc(function () {
          var e = cc.instantiate(this.rocketBoom);
          this.pb_CardNode.addChild(e, 100), e.setPosition(cc.v2(0, 0));
          var t = cc.sequence(cc.spawn(cc.scaleTo(.5, 3), cc.fadeOut(.5)), cc.callFunc(function () {
            e.destroy();
          }, this));
          e.runAction(t), this.pInfo.soundEffectControl && cc.audioEngine.play(this.teXiaoAudio[0], false, 1);
          var i = cc.instantiate(this.cardTypeText[4]);
          this.pb_CardNode.addChild(i, 101), i.setPosition(cc.v2(0, 0)), this.scheduleOnce(function () {
            var e = cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
              i.destroy();
            }, this));
            i.runAction(e);
          }, 1), this.shacking(), y.destroy();
        }, this)),
            y = cc.instantiate(this.rocket);
        this.pb_CardNode.addChild(y, 100), y.setPosition(g.x, g.y + 150), y.runAction(p);
        break;

      default:
        this.allPlayerTipsState[o] = [null];
    }

    this.tempPlayersLists[o].state.push(this.allPlayerTipsState[o]);
  },

  /**
   * 春天动画
   */
  chunTianAnimation: function chunTianAnimation() {
    this.node.getChildByName("chunTian").active = true;
    this.node.getChildByName("chunTian").getComponent("dragonBones.ArmatureDisplay").armature().animation.play("chuntian", 1);
    this.scheduleOnce(function () {
      this.node.getChildByName("chunTian").active = false;
    }, 2);
  },

  /**
   * 发牌,并进行排序
   * @param {*} cards 
   * @param {*} isLicensing 
   */
  cardsSorting: function cardsSorting(cards, isLicensing) {
    this.finishGame(), this.allTips[1].getChildByName("dengdai").active = false, this.tempPlayerList(), this.cardsArray = cards, this.cardsArray.sort(function (e, t) {
      return e.val === t.val ? t.type - e.type : t.val - e.val;
    });

    for (var i = 0, n = null, o = null, a = null; i < this.cardsArray.length; i++) {
      if (this.cardsArray[i].val > 13) n = i;else if (2 === this.cardsArray[i].val || 1 === this.cardsArray[i].val) {
        o = i;
        break;
      }
    }

    if (null === n && null !== o) {
      a = this.cardsArray.splice(i, this.cardsArray.length - 1);

      for (var s = 0; s < a.length; s++) {
        this.cardsArray.splice(s, 0, a[s]);
      }
    } else if (null !== n && null !== o) {
      a = this.cardsArray.splice(i, this.cardsArray.length - 1);

      for (var s = 0; s < a.length; s++) {
        this.cardsArray.splice(n + s + 1, 0, a[s]);
      }
    }

    if (isLicensing) for (var i = 0; i < cards.length; i++) {
      this.licensing(i, cards[i].val, cards[i].type);
    } else this.licensingTimer();
    this.addEventListener(), this.count = 2;
  },

  /**
   * 临时的玩家列表
   */
  tempPlayerList: function tempPlayerList() {
    var niCheng = null;
    this.tempPlayersLists = [];

    for (var i = 0; i < this.playerArr.length; i++) {
      if (i == 0) {
        niCheng = this.otherOneL.getChildByName("bg_name").getChildByName("niCheng").getComponent("cc.Label").string;
      } else if (i == 1) {
        niCheng = this.pb_Lower.getChildByName("head").getChildByName("niCheng").getComponent("cc.Label").string;
      } else {
        niCheng = this.otherTwoR.getChildByName("bg_name").getChildByName("niCheng").getComponent("cc.Label").string;
      }

      this.tempPlayersLists[i] = {
        id: this.playerArr[i],
        niCheng: niCheng,
        zhiShengYi: 1,
        zhiShengEr: 1,
        seatId: i,
        outCard: [],
        state: [],
        isLandlord: false
      };
    }
  },

  /**
   * 初始化卡牌数
   */
  licensingTimer: function licensingTimer() {
    var index = 0;
    this.schedule(function () {
      this.licensing(index, this.cardsArray[index].val, this.cardsArray[index].type);
      this.pInfo.soundEffectControl && cc.audioEngine.play(this.faPaiAudio, false, 1);

      if (this.cardsArray.length - 1 === index) {
        this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 16;
        this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 16;
      }

      index++;
    }, 0.1, this.cardsArray.length - 1);
  },

  /**
   * 
   * @param {*} index 
   * @param {*} val 
   * @param {*} type 
   */
  licensing: function licensing(index, val, type) {
    var card;

    if (this.cardsPool.size() > 0) {
      card = this.cardsPool.get();
    } else {
      card = cc.instantiate(this.pb_Cards);
    }

    card.scale = 1.2;
    this.cardWidth = card.getContentSize().width * card.scale;
    this.cardHeight = card.getContentSize().height * card.scale;
    var dWidth = -this.cardWidth / 2 - (this.cardsArray.length - 1) / 2 * this.distanceCard;
    this.pb_CardNode.addChild(card, 50 + index);
    card.setPosition(dWidth + this.distanceCard * index, this.initY);
    card.getComponent("RunCards").cardsCreate(val, type);
    this.playerCards.push(card);
  },

  /**
   * 抢地主
   * @param {*} second 
   * @param {*} userId 
   */
  robLandlord: function robLandlord(second, userId) {
    for (var i = 0; i < this.playerArr.length; i++) {
      if (this.playerArr[i] === userId) {
        if (i === 1) {
          this.btn_RobLandload.active = true;
          this.btnPlayerState = this.btn_RobLandload;
        } //判断是否托管


        if (this.tuoGuan === true) {
          this.tuoGuanFunction(i);
        } else {
          this.timer(i, second);
        }

        break;
      }
    }
  },

  /**
   * 启动计时器
   * @param {*} seatIndex 
   * @param {*} second 
   */
  timer: function timer(seatIndex, second) {
    //移除原来的计时器
    this.cancelTimer();
    cc.log("计时器", seatIndex);

    for (var i = 0; i < this.tempPlayersLists[seatIndex].state.length; i++) {
      if (this.tempPlayersLists[seatIndex].state[i]) {
        this.tempPlayersLists[seatIndex].state[i].active = false;
      }
    }

    this.tempPlayersLists[seatIndex].state = [];
    this.removeCards(seatIndex);
    this.pb_Timer[seatIndex].active = true;

    if (second) {
      this.pb_Timer[seatIndex].getComponent("RunTimer").num = second;
      this.pb_Timer[seatIndex].getComponent("RunTimer").count = 0;
    }

    this.pb_Timer[seatIndex].getComponent("RunTimer").startTimer();
  },

  /**
   * 移除计时器
   */
  cancelTimer: function cancelTimer() {
    for (var i = 0; i < this.pb_Timer.length; i++) {
      if (this.pb_Timer[i].active === true) {
        this.pb_Timer[i].getComponent("RunTimer").cancelTimer();
        this.pb_Timer[i].active = false;
        break;
      }
    }
  },
  rules: function rules(e) {
    console.log('规则检测');
    var t = this.cardType(this.primaryCard);
    console.log('主牌牌型' + t.type);
    if (0 == e.length) return t.type > -1;
    var i = this.cardType(e);
    console.log('对方牌型' + i.type);
    return 1 == t.max ? t.max += 12.1 : 2 == t.max && (t.max += 11.2), 1 == i.max ? i.max += 12.1 : 2 == i.max && (i.max += 11.2), 8 == t.type && i.type < 8 || 9 == t.type || t.length == i.length && t.type == i.type && t.max > i.max;
  },

  /**
   * 获得牌型
   */
  cardType: function cardType(cards) {
    var count;
    var type = -1;
    var max = 0;
    var cardList = [];

    if (cards.length > 0) {
      //单牌
      cardList[0] = this.checkOneCard(cards); //对子

      cardList[1] = this.checkDuiZi(cards); //顺子

      cardList[2] = this.checkShunZi(cards); //三顺

      cardList[3] = this.checkSanOrShun(cards); //四带二

      cardList[4] = this.checkSiTakeTwo(cards); //四带两对

      cardList[5] = this.checkSiTakeTwoShuang(cards); //飞机

      cardList[6] = this.checkSanOrPlane(cards); //连队

      cardList[7] = this.checkSanShuangOrPlane(cards); //炸弹

      cardList[8] = this.checkSi(cards); //王炸

      cardList[9] = this.kingBoom(cards);

      for (var i = 0; i < cardList.length; i++) {
        if (cardList[i].num) {
          type = i;
          max = cardList[i].max;
          count = cards.length;
        }
      }
    }

    return {
      type: type,
      max: max,
      length: count
    };
  },

  /**
   * 选择卡牌
   * @param {*} ar 
   */
  selectCards: function selectCards(ar) {
    if (this.startLocat.x >= ar.x) {
      for (var t = 0; t < this.playerCards.length; t++) {
        if (t == this.playerCards.length - 1) {
          if (ar.x > this.playerCards[t].position.x + this.cardWidth || this.startLocat.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
            this.playerCards[t].getComponent("RunCards").changeBai();
          } else {
            this.playerCards[t].getComponent("RunCards").changeHui();
          }
        } else {
          if (ar.x > this.playerCards[t].position.x + this.distanceCard || this.startLocat.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
            this.playerCards[t].getComponent("RunCards").changeBai();
          } else {
            this.playerCards[t].getComponent("RunCards").changeHui();
          }
        }
      }
    } else {
      for (var t = 0; t < this.playerCards.length; t++) {
        if (t == this.playerCards.length - 1) {
          if (this.startLocat.x > this.playerCards[t].position.x + this.cardWidth || ar.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
            this.playerCards[t].getComponent("RunCards").changeBai();
          } else {
            this.playerCards[t].getComponent("RunCards").changeHui();
          }
        } else {
          if (this.startLocat.x > this.playerCards[t].position.x + this.distanceCard || ar.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
            this.playerCards[t].getComponent("RunCards").changeBai();
          } else {
            this.playerCards[t].getComponent("RunCards").changeHui();
          }
        }
      }
    }
  },
  outCard: function outCard() {
    this.selectedCard = [];
    this.primaryNum();

    for (var e = 0; e < this.playerCards.length; e++) {
      this.playerCards[e].position.y == this.movedY && this.selectedCard.push(this.playerCards[e]);
    }

    if (this.selectedCard.length <= 0) {
      this.notConformRules();
      this.btn_OutCard.active = true; // this.timer(1, null);

      this.btnPlayerState = this.btn_OutCard;
      return;
    }

    for (var t = [], e = 0; e < this.selectedCard.length; e++) {
      t.push({
        val: this.selectedCard[e].getComponent("RunCards").val,
        type: this.selectedCard[e].getComponent("RunCards").type
      });
    }

    try {
      this.netWork.LandlordsSocket.emit("sendCardsArr", {
        array: t,
        userId: this.pInfo.playerId,
        tableId: this.netWork.tableId,
        seatId: this.netWork.seatId
      }), cc.log("emit", t, this.pInfo.playerId, this.netWork.tableId, this.netWork.seatId);
    } catch (i) {}
  },
  identifyCards: function identifyCards() {
    this.btn_OutCard.active = false;

    for (var e = 0; e < this.playerCards.length; e++) {
      for (var t = 0; t < this.selectedCard.length; t++) {
        if (this.playerCards[e] == this.selectedCard[t]) {
          this.playerCards.splice(e, 1), e--;
          break;
        }
      }
    }

    var i = null,
        n = null;

    if (this.selectedCard.length % 2 == 0) {
      n = this.selectedCard.length / 2;

      for (var e = 0; e < this.selectedCard.length; e++) {
        this.selectedCard[e].scale = .8, i = -n * this.smallDistanceCard + e * this.smallDistanceCard - this.selectedCard[e].getContentSize().width * this.selectedCard[e].scale / 2 + this.smallDistanceCard / 2, this.selectedCard[e].setPosition(cc.v2(i, this.finishY)), this.selectedCard[e].zIndex = 0, this.selectedCard[e].color = new cc.Color(255, 255, 255);
      }
    } else {
      n = (this.selectedCard.length - 1) / 2;

      for (var e = 0; e < this.selectedCard.length; e++) {
        this.selectedCard[e].scale = .8, i = -n * this.smallDistanceCard + e * this.smallDistanceCard - this.selectedCard[e].getContentSize().width * this.selectedCard[e].scale / 2, this.selectedCard[e].setPosition(cc.v2(i, this.finishY)), this.selectedCard[e].zIndex = 0, this.selectedCard[e].color = new cc.Color(255, 255, 255);
      }
    }

    this.btn_OutCard.getChildByName("btn_buchu").getComponent("cc.Button").interactable == false && (this.btn_OutCard.getChildByName("btn_buchu").getComponent("cc.Button").interactable = true), this.selectedCard.length > 0 && this.resetCardLocat(), this.otherCardArr = [], this.tipsCardsArr = [], this.tipsCount = 0, this.count = 0;
  },

  /**
   * 不符合规则
   */
  notConformRules: function notConformRules() {
    this.allTips[1].getChildByName("Prompt1").active = true;
    this.allTips[1].getChildByName("Prompt1").getComponent("cc.Animation").play();
  },

  /**
   * 
   * @param {*} userId 
   * @param {*} second 
   */
  playState: function playState(userId, second) {
    this.cancelTimer();

    for (var i = 0; i < this.playerArr.length; i++) {
      if (this.playerArr[i] == userId) {
        if (this.netWork.playerId == userId) {
          //是否托管
          if (this.tuoGuan == false) {
            this.btn_OutCard.active = true;
            this.btnPlayerState = this.btn_OutCard;
            this.timer(i, second);

            if (this.count >= 2 || this.firstOutCard == 0) {
              this.btn_OutCard.getChildByName("btn_buchu").getComponent("cc.Button").interactable = false;
              this.firstOutCard++;
            }
          } else {
            this.tuoGuanFunction(i);
          }
        } else {
          this.timer(i, second);
        }
      }
    }
  },

  /**
   * 托管
   * @param {*} index 
   */
  tuoGuanFunction: function tuoGuanFunction(index) {
    var _this2 = this;

    // this.scheduleOnce(function () {
    if (this.qiangDiZhu && (this.pb_Timer[1].active == true || ndex == 1)) {
      try {
        this.netWork.LandlordsSocket.emit("qiang", {
          tableId: this.netWork.tableId,
          seatId: this.netWork.seatId,
          playerId: this.netWork.playerId,
          qiang: 0
        });
      } catch (error) {}

      ;

      for (var i = 0; i < this.tempPlayersLists[1].state.length; i++) {
        if (this.tempPlayersLists[1].state[i] != null) {
          this.tempPlayersLists[1].state[i].active = false;
        }
      }

      this.tempPlayersLists[1].state = [];
      return;
    }

    if (!this.gameFinish && (index == 1 || this.pb_Timer[1].active == true)) {
      for (var i = 0; i < this.tempPlayersLists[1].state.length; i++) {
        if (this.tempPlayersLists[1].state[i] != null) {
          this.tempPlayersLists[1].state[i].active = false;
        }
      }

      this.tmpTuoguan = true;
      this.tempPlayersLists[1].state = [];
      this.removeCards(1);
      this.scheduleOnce(function () {
        _this2.tipsClick();
      }, 1);
    } // }, 1);

  },

  /**
   * 托管状态
   * @param {*} reslut 
   * @param {*} userId 
   */
  tuoGuanState: function tuoGuanState(reslut, userId) {
    var index = -1;

    for (var i = 0; i < this.playerArr.length; i++) {
      if (this.playerArr[i] == userId) {
        index = i;
        break;
      }
    }

    if (index == 0) {
      this.otherOneL.getChildByName("tuoGuan").active = reslut;
    } else if (index == 2) {
      this.otherTwoR.getChildByName("tuoGuan").active = reslut;
    }
  },

  /**
   * 
   */
  resetCardLocat: function resetCardLocat() {
    var size = -this.cardWidth / 2 - (this.playerCards.length - 1) / 2 * this.distanceCard;

    for (var i = 0; i < this.playerCards.length; i++) {
      this.playerCards[i].setPosition(cc.v2(size + this.distanceCard * i, this.initY));
      this.playerCards[i].zIndex = i + 50;
      this.playerCards[i].getComponent("RunCards").handCard = true;
    }

    this.recycling[1] = this.selectedCard;
    this.selectedCard = [];
  },

  /**
   * 
   */
  primaryNum: function primaryNum() {
    this.primaryCard = [];

    for (var e = 0; e < this.playerCards.length; e++) {
      if (this.playerCards[e].position.y == this.movedY) {
        this.primaryCard.push({
          val: this.playerCards[e].getComponent("RunCards").val
        });
      }
    }
  },

  /**
   * 检测单牌
   * @param {*} cards 
   */
  checkOneCard: function checkOneCard(cards) {
    var value = {};
    value.max = 0;
    value.num = 0;

    if (cards.length === 1) {
      value.max = cards[0].val;
      value.num = 1;
    }

    return value;
  },

  /**
   * 检测对子
   * @param {*} cards 
   */
  checkDuiZi: function checkDuiZi(cards) {
    var value = {};
    value.max = cards[0].val;
    value.num = 0; //计算偶数

    if (cards.length % 2 === 0) {
      if (cards.length == 2) {
        if (cards[0].val == cards[1].val) {
          return {
            max: cards[0].val,
            num: 1
          };
        }
      } else if (cards.length > 5) {
        if (this.checkSi(cards).num != 0) {
          return {
            max: cards[0].val,
            num: 0
          };
        }

        var isCan, isEqual;
        var size = cards.length / 2;

        for (var eq = 0; eq < size; eq++) {
          if (cards[2 * eq].val != cards[2 * eq + 1].val) {
            isEqual = false;
            break;
          }

          isEqual = true;

          if ((eq + 1) * 2 < cards.length) {
            if (cards[2 * eq].val == 1 && cards[2 * (eq + 1)].val == 13) {
              isCan = true;
            } else {
              if (2 === cards[2 * eq].val) {
                isCan = false;
                break;
              }

              if (cards[2 * eq].val - cards[2 * (eq + 1)].val != 1) {
                isCan = false;
                break;
              }

              isCan = true;
            }
          }
        }

        if (isEqual && isCan) {
          value.max = cards[0].val;
          value.num = size;
        }
      }
    }

    return value;
  },

  /**
   * 检测顺子
   * @param {*} cards 
   */
  checkShunZi: function checkShunZi(cards) {
    var isCan;
    var value = {};
    value.max = cards[0].val;
    value.num = 0; //长度大于4

    if (cards.length > 4) {
      for (var i = 0; i < cards.length - 1; i++) {
        if (cards[i].val == 1 && cards[i + 1].val == 13) {
          isCan = true;
        } else {
          if (cards[i].val == 2) {
            isCan = false;
            break;
          }

          if (cards[i].val - cards[i + 1].val != 1) {
            isCan = false;
            break;
          }

          isCan = true;
        }
      }

      if (isCan) {
        value.max = cards[0].val;
        value.num = cards.length;
      }
    }

    return value;
  },

  /**
   * 检测三顺
   * @param {*} cards 
   */
  checkSanOrShun: function checkSanOrShun(cards) {
    var isCan, isEqual;
    var value = {};
    value.max = cards[0].val;
    value.num = 0;

    if (cards.length % 3 == 0) {
      var size = cards.length / 3;

      if (size == 1) {
        isEqual = true;

        for (var i = 0; i < cards.length - 1; i++) {
          if (cards[i].val !== cards[i + 1].val) {
            isCan = false;
            break;
          }

          isCan = true;
        }
      } else {
        for (var i = 0; i < size; i++) {
          for (var j = 0; j < 2; j++) {
            if (3 * (i + 1) < cards.length) {
              if (cards[3 * i].val - cards[3 * (i + 1)].val != 1 && (cards[3 * i].val != 1 || cards[3 * (i + 1)].val != 13)) {
                isEqual = false;
                break;
              }

              isEqual = true;
            }

            if (cards[3 * i + j].val != cards[3 * i + j + 1].val || cards[3 * i + j].val == 2) {
              isCan = false;
              break;
            }

            isCan = true;
          }
        }
      }

      if (isCan && isEqual) {
        value.max = cards[0].val;
        value.num = size;
      }
    }

    return value;
  },

  /**
   * 检测炸弹
   * @param {*} cards 
   */
  checkSi: function checkSi(cards) {
    var isEqual = false;
    var value = {};
    value.max = cards[0].val;
    value.num = 0; //判断长度为4

    if (cards.length === 4) {
      for (var i = 0; i < cards.length - 1; i++) {
        //判断是否相同
        if (cards[i].val == cards[i + 1].val) {
          isEqual = true;
        } else {
          isEqual = false;
        }
      }

      if (isEqual) {
        value.max = cards[0].val;
        value.num = 1;
      }
    }

    return value;
  },

  /**
   * 检测四带二
   * @param {*} cards 
   */
  checkSiTakeTwo: function checkSiTakeTwo(cards) {
    var temp;
    var value = {};
    value.max = cards[0].val;
    value.num = 0;

    if (cards.length === 6) {
      for (var i = 0; i < 3; i++) {
        temp = [];

        for (var k = 0; k < cards.length; k++) {
          temp.push(cards[k]);
        }

        temp.splice(0, i);
        temp.splice(temp.length - (2 - i), 2 - i);

        if (this.checkSi(temp).num === 1) {
          value.max = temp[0].val;
          value.num = 1;
        }
      }
    }

    return value;
  },

  /**
   * 检测四带两对
   */
  checkSiTakeTwoShuang: function checkSiTakeTwoShuang(cards) {
    var cardList,
        tempList,
        index,
        size = 2;
    var value = {};
    value.max = cards[0].val;
    value.num = 0; //判断长度等于8

    if (cards.length == 8) {
      for (var i = 0; i < 3; i++) {
        cardList = [];
        tempList = [];
        index = 0;

        for (var j = 0; j < cards.length; j++) {
          cardList.push(cards[j]);
        }

        var oneCard = cardList.slice(0, 2 * i);
        var twoCard = cardList.slice(cardList.length - 2 * size + 2 * i, cardList.length);
        cardList.splice(0, 2 * i);
        cardList.splice(cardList.length - 2 * size + 2 * i, 2 * size - 2 * i);

        for (var j = 0; j < oneCard.length / 2; j++) {
          tempList.push([oneCard[2 * j], oneCard[2 * j + 1]]);
        }

        for (var j = 0; j < twoCard.length / 2; j++) {
          tempList.push([twoCard[2 * j], twoCard[2 * j + 1]]);
        }

        for (var j = 0; j < tempList.length; j++) {
          if (this.checkDuiZi(tempList[j]).num == 1) {
            index++;

            if (index == size && this.checkSi(cardList).num == 1) {
              value.max = cardList[0].val;
              value.num = 1;
            }
          }
        }
      }
    }

    return value;
  },

  /**
   * 检测飞机
   */
  checkSanOrPlane: function checkSanOrPlane(cards) {
    var size;
    var value = {};
    value.max = cards[0].val;
    value.num = 0;

    if (cards.length % 4 == 0) {
      size = cards.length / 4;
      var tempList;

      for (var i = 0; i <= size; i++) {
        if (this.checkSi(cards.slice(i, i + 4)).num) {
          value.max = cards[0].val;
          value.num = 0;
        }

        tempList = [];

        for (var k = 0; k < cards.length; k++) {
          if (size > 1 && cards[k].val == 2) {
            value.max = cards[0].val;
            value.num = 0;
          }

          tempList.push(cards[k]);
        }

        tempList.splice(0, i);
        tempList.splice(tempList.length - size + i, size - i);

        if (this.checkSanOrShun(tempList).num === size) {
          value.max = tempList[0].val;
          value.num = size;
        }
      }
    }

    return value;
  },

  /**
   * 检测连对
   * @param {*} cards 
   */
  checkSanShuangOrPlane: function checkSanShuangOrPlane(cards) {
    var value = {};
    value.max = cards[0].val;
    value.num = 0;

    if (cards.length % 5 == 0) {
      var size;
      var cardList = [];
      var tempList;
      var index = 0;
      var size = cards.length / 5;

      for (var i = 0; i <= size; i++) {
        tempList = [];
        cardList = [];
        index = 0;

        for (var k = 0; k < cards.length; k++) {
          if (size > 1 && 2 === cards[k].val) {
            value.max = cards[0].val;
            value.num = 0;
          }

          tempList.push(cards[k]);
        }

        var oneCard = tempList.slice(0, 2 * i);
        var twoCard = tempList.slice(tempList.length - 2 * size + 2 * i, tempList.length);
        tempList.splice(0, 2 * i);
        tempList.splice(tempList.length - 2 * size + 2 * i, 2 * size - 2 * i);

        for (var k = 0; k < oneCard.length / 2; k++) {
          cardList.push([oneCard[2 * k], oneCard[2 * k + 1]]);
        }

        for (var k = 0; k < twoCard.length / 2; k++) {
          cardList.push([twoCard[2 * k], twoCard[2 * k + 1]]);
        }

        for (var k = 0; k < cardList.length; k++) {
          if (this.checkDuiZi(cardList[k]).num == 1) {
            index++;

            if (index == size && this.checkSanOrShun(tempList).num == size) {
              value.max = tempList[0].val;
              value.num = size;
            }
          }
        }
      }
    }

    return value;
  },

  /**
   * 检测王炸
   * @param {*} cards 
   */
  kingBoom: function kingBoom(cards) {
    var value = {};
    value.max = 0;
    value.num = 0; //判断是两张牌, 有大王和小王，则是王炸

    if (cards.length === 2) {
      if (cards[0].val === 15 && cards[1].val == 14) {
        value.max = 15;
        value.num = 1;
      }
    }

    ;
    return value;
  },
  otherPlayerOutCard: function otherPlayerOutCard(e, t, i) {
    for (var n = -1, o = 0; o < this.playerArr.length; o++) {
      if (this.playerArr[o] == t) {
        n = o, 0 == n ? (this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string > 0 && (this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = parseInt(this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string) - e.length + i), this.pInfo.soundEffectControl && (2 == this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string ? 1 == this.tempPlayersLists[n].zhiShengEr && (cc.audioEngine.play(this.baoJingAudio[1], false, 1), this.tempPlayersLists[n].zhiShengEr--) : 1 == this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string && 1 == this.tempPlayersLists[n].zhiShengYi && (cc.audioEngine.play(this.baoJingAudio[0], false, 1), this.tempPlayersLists[n].zhiShengYi--))) : 2 == n && (this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string > 0 && (this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = parseInt(this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string) - e.length + i), this.pInfo.soundEffectControl && (2 == this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string ? 1 == this.tempPlayersLists[n].zhiShengEr && (cc.audioEngine.play(this.baoJingAudio[1], false, 1), this.tempPlayersLists[n].zhiShengEr--) : 1 == this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string && 1 == this.tempPlayersLists[n].zhiShengYi && (cc.audioEngine.play(this.baoJingAudio[0], false, 1), this.tempPlayersLists[n].zhiShengYi--)));
        break;
      }
    }

    if (e.length > 0) {
      e = this.xiTongSorting(e);
      var a,
          s = [],
          c = .8,
          r = 0;
      if (0 == n) var l = this.otherOneL.position.x + 120;else if (e.length < this.peak) var l = this.otherTwoR.position.x - 178.5 - e.length * this.smallDistanceCard;else var l = this.otherTwoR.position.x - 178.5 - this.peak * this.smallDistanceCard,
          h = this.otherTwoR.position.x - 178.5 - (e.length - this.peak) * this.smallDistanceCard;

      for (var o = 0; o < e.length; o++) {
        a = this.cardsPool.size() > 0 ? this.cardsPool.get() : cc.instantiate(this.pb_Cards), this.pb_CardNode.addChild(a, 0), e.length < this.peak ? (a.scale = c, 0 == n ? a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherOneL.position.y + a.getContentSize().height * c * .4)) : a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherTwoR.position.y + a.getContentSize().height * c * .4))) : (a.scale = c, o < this.peak ? 0 == n ? a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherOneL.position.y + a.getContentSize().height * c * .4)) : a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherTwoR.position.y + a.getContentSize().height * c * .4)) : (0 == n ? a.setPosition(cc.v2(l + this.smallDistanceCard * r, this.otherOneL.position.y)) : a.setPosition(cc.v2(h + this.smallDistanceCard * r, this.otherTwoR.position.y)), r++)), a.getComponent("RunCards").cardsCreate(e[o].val, e[o].type), s.push(a);
      }

      cc.log("otherPlayerOutCard", n), this.recycling[n] = s, this.otherCardArr = e, cc.log(this.otherCardArr), this.count = 0, this.tempPlayersLists[n].outCard.push(s);
    } else this.count++, this.recycling[n] = null, this.tempPlayersLists[n].outCard.push([]);
  },
  otherPlayerNo: function otherPlayerNo(e) {
    for (var t = -1, i = 0; i < this.playerArr.length; i++) {
      if (this.playerArr[i] == e) {
        t = i;
        break;
      }
    }

    this.count++, this.recycling[t] = null, this.tempPlayersLists[t].outCard.push([]);
  },
  checkTopPlayer: function checkTopPlayer() {
    console.log('当前count' + this.count);
    return this.count < 2 ? !!this.rules(this.otherCardArr) : this.count >= 2 ? !!this.rules([]) : void 0;
  },
  removeCards: function removeCards(e) {
    this.recycling[e] = null;

    for (var t = 0; t < this.tempPlayersLists[e].outCard.length; t++) {
      cc.log(this.tempPlayersLists[e].outCard);

      for (var i = 0; i < this.tempPlayersLists[e].outCard[t].length; i++) {
        this.cardsPool.put(this.tempPlayersLists[e].outCard[t][i]);
      }
    }

    this.tempPlayersLists[e].outCard = [];
  },
  settlement: function settlement(e, closeDoor, bp) {
    switch (closeDoor) {
      case 0:
        this.closeDoorLbl.string = '';
        break;

      case 1:
        this.closeDoorLbl.string = '单关';
        break;

      case 2:
        this.closeDoorLbl.string = '双关';
        break;

      case 3:
        this.closeDoorLbl.string = '反关';
        break;
    }

    this.bpLbl.string = bp ? '包赔' : '';

    for (var t = 0; t < e.length; t++) {
      for (var i = 0; i < this.tempPlayersLists.length; i++) {
        if (e[t].userId == this.tempPlayersLists[i].id) {
          0 == i ? (this.otherOneL.getChildByName("bg_name").getChildByName("Score").getComponent("cc.Label").string = ((e[t].Fraction + e[t].score) / this.pInfo.exchangeRate).toFixed(2), this.landloadsLogo[i].active && !this.landloadsLogo[1].active ? this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].card_num : this.landloadsLogo[i].active || this.landloadsLogo[1].active ? this.landloadsLogo[1].active && (this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].card_num) : this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].card_num) : 1 == i ? (this.node.getChildByName("Bill").active = true, e[t].Fraction > 0 ? this.node.getChildByName("Bill").getChildByName("jieShuan").getComponent("dragonBones.ArmatureDisplay").armature().animation.play("shengli", 0) : this.node.getChildByName("Bill").getChildByName("jieShuan").getComponent("dragonBones.ArmatureDisplay").armature().animation.play("shibai", 0), this.pInfo.soundEffectControl && (e[t].Fraction > 0 ? cc.audioEngine.play(this.shuYing[1], false, 1) : cc.audioEngine.play(this.shuYing[0], false, 1)), this.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = (e[t].Fraction / this.pInfo.exchangeRate).toFixed(2), this.node.getChildByName("Bill").getComponent("cc.Sprite").spriteFrame = this.billBg[1], this.node.getChildByName("blackFace").active = true, this.node.getChildByName("blackFace").getChildByName("btn_Signout").active = true, this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].card_num) : 2 == i && (this.otherTwoR.getChildByName("bg_name").getChildByName("Score").getComponent("cc.Label").string = ((e[t].Fraction + e[t].score) / this.pInfo.exchangeRate).toFixed(2), this.landloadsLogo[i].active && !this.landloadsLogo[1].active ? this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].card_num : this.landloadsLogo[i].active || this.landloadsLogo[1].active ? this.landloadsLogo[1].active && (this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].card_num) : this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].card_num), 1 == this.tempPlayersLists[i].isLandlord ? this.billMessage[i].getChildByName("icon").active = true : this.billMessage[i].getChildByName("icon").active = false, this.billMessage[i].getChildByName("niCheng").getComponent("cc.Label").string = this.tempPlayersLists[i].niCheng, this.billMessage[i].getChildByName("bottomScore").getComponent("cc.Label").string = (e[t].Bottom / this.pInfo.exchangeRate).toFixed(2); //this.pb_Lower.getChildByName("di").getChildByName("bottomScore").getComponent("cc.Label").string,

          this.billMessage[i].getChildByName("gold").getComponent("cc.Label").string = (e[t].Fraction / this.pInfo.exchangeRate).toFixed(2);
          break;
        }
      }
    }

    for (var k in e) {
      if (e[k].userId == this.pInfo.playerId) {
        this.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = (e[k].score * 0.01).toFixed(2);
        break;
      }
    }

    this.node.getChildByName("btn_Continue-game").active = true, this.btn_again.active = true, this.gameFinish = true;
  },

  /**
   * 添加鼠标侦听事件
   */
  addEventListener: function addEventListener() {
    //开始
    this.TouchStart = this.node.on("touchstart", function (event) {
      this.startLocat = this.node.convertToNodeSpaceAR(event.getLocation());
      this.selectCards(this.startLocat);

      for (var i = 0; i < this.playerCards.length; i++) {
        if (this.playerCards[i].position.y != this.movedY && i == this.playerCards.length - 1) {
          this.tuoPaiCount = 0;
        } else if (this.playerCards[i].position.y == this.movedY) {
          break;
        }
      }
    }, this); //移动

    this.TouchMove = this.node.on("touchmove", function (event) {
      var ar = this.node.convertToNodeSpaceAR(event.getLocation());
      this.selectCards(ar);
    }, this); //停止

    this.TouchEnd = this.node.on("touchend", function (event) {
      for (var i = 0; i < this.playerCards.length; i++) {
        if (this.playerCards[i].color == "rgba(144, 144, 144, 255)") {
          this.playerCards[i].getComponent("RunCards").moveCard();
          this.playerCards[i].getComponent("RunCards").changeBai();
        }
      }

      this.tuoPaiCount = 0;
    }, this); //取消

    this.TouchCancel = this.node.on("touchcancel", function (event) {
      for (var i = 0; i < this.playerCards.length; i++) {
        if (this.playerCards[i].color == "rgba(144, 144, 144, 255)") {
          this.playerCards[i].getComponent("RunCards").moveCard();
          this.playerCards[i].getComponent("RunCards").changeBai();
        }
      }

      this.tuoPaiCount = 0;
    }, this);
  },

  /**
   * 移除鼠标事件
   */
  turnOffTouch: function turnOffTouch() {
    this.node.off("touchstart", this.TouchStart, this);
    this.node.off("touchmove", this.TouchMove, this);
    this.node.off("touchend", this.TouchEnd, this);
    this.node.off("touchcancel", this.TouchCancel, this);
  },
  finishGame: function finishGame() {
    this.turnOffTouch();

    for (var e = 0; e < this.recycling.length; e++) {
      if (null != this.recycling[e]) for (var t = 0; t < this.recycling[e].length; t++) {
        this.cardsPool.put(this.recycling[e][t]);
      }
    }

    this.recycling = [[null], [null], [null]];

    for (var e = 0; e < this.playerCards.length; e++) {
      this.cardsPool.put(this.playerCards[e]);
    }

    this.playerCards = [], this.landloadsCards.active = false, this.cancelTimer(), cc.log("结束all");

    for (var t = 0; t < this.tempPlayersLists.length; t++) {
      for (var e = 0; e < this.tempPlayersLists[t].state.length; e++) {
        null != this.tempPlayersLists[t].state[e] && (this.tempPlayersLists[t].state[e].active = false);
      }

      this.tempPlayersLists[t].state = [];
    }

    for (var e = 0; e < this.landloadsLogo.length; e++) {
      this.landloadsLogo[e].active = false;
    }

    this.firstOutCard = 1, null != this.btnPlayerState && (this.btnPlayerState.active = false), this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = 0;
  },

  /**
   * 移除全部状态
   */
  removeAllState: function removeAllState() {
    this.cancelTimer(), cc.log("移除");

    for (var i = 0; i < this.tempPlayersLists.length; i++) {
      for (var j = 0; j < this.tempPlayersLists[i].state.length; j++) {
        if (this.tempPlayersLists[i].state[j] != null) {
          this.tempPlayersLists[i].state[j].active = false;
        }
      }

      this.tempPlayersLists[i].state = [];
    }

    this.otherOneL.getChildByName("tuoGuan").active = false;
    this.otherTwoR.getChildByName("tuoGuan").active = false;

    for (var i = 0; i < this.playerArr.length; i++) {
      this.removeCards(i);
    }

    this.node.getComponent("RuningButtonClick").cancelTuoGaun();
  },

  /**
   * 重新开始游戏
   */
  resetGame: function resetGame() {
    this.finishGame();
    this.addEventListener();
  },
  matchingType: function matchingType() {
    cc.log(this.otherCardArr, this.count);
    var e = -1;
    this.count < 2 ? (e = this.cardType(this.otherCardArr), this.checkTypeNum(e)) : this.count >= 2 && this.tipsCardsArr.push(this.playerCards[this.playerCards.length - 1]);
  },
  checkTypeNum: function checkTypeNum(e) {
    this.sameDifferentVal();
    var t,
        i = [],
        n = [],
        o = -1,
        a = -1;

    switch (e.type) {
      case 0:
        this.pureType();

        for (var s = 0; s < this.pureArr.length; s++) {
          for (var c = 0; c < this.pureArr[s].length; c++) {
            o = 1 == this.pureArr[s][c][0].getComponent("RunCards").val ? 13.1 : 2 == this.pureArr[s][c][0].getComponent("RunCards").val ? 13.2 : this.pureArr[s][c][0].getComponent("RunCards").val, a = 1 == e.max ? 13.1 : 2 == e.max ? 13.2 : e.max, o > a && this.tipsCardsArr.push(this.pureArr[s][c][0]);
          }
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          n = [];

          for (var c = 0; c < this.cardsGroup[3][s].length; c++) {
            n.push(this.cardsGroup[3][s][c]), 4 == n.length && this.tipsCardsArr.push(n);
          }
        }

        if (this.cardsGroup[4].length > 1) {
          n = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var c = 0; c < this.cardsGroup[4][s].length; c++) {
              n.push(this.cardsGroup[4][s][c]), 2 == n.length && this.tipsCardsArr.push(n);
            }
          }
        }

        break;

      case 1:
        if (t = e.length / 2, 1 == t) {
          this.pureType();

          for (var s = 0; s < this.pureArr[1].length; s++) {
            i = [], i.push(this.pureArr[1][s][0]), i.push(this.pureArr[1][s][1]), this.drawCards(i, e);
          }

          for (var s = 0; s < this.pureArr[2].length; s++) {
            i = [], i.push(this.pureArr[2][s][0]), i.push(this.pureArr[2][s][1]), this.drawCards(i, e);
          }

          for (var s = 0; s < this.pureArr[3].length; s++) {
            i = [], i.push(this.pureArr[3][s][0]), i.push(this.pureArr[3][s][1]), this.drawCards(i, e);
          }
        } else for (var s = 0; s < this.cardsGroup[1].length; s++) {
          i = [];

          for (var r = 0; r < t && !(s + r >= this.cardsGroup[1].length); r++) {
            for (var c = 0; c < this.cardsGroup[1][s + r].length; c++) {
              i.push(this.cardsGroup[1][s + r][c]);
            }
          }

          i.length == e.length && this.drawCards(i, e);
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          n = [];

          for (var c = 0; c < this.cardsGroup[3][s].length; c++) {
            n.push(this.cardsGroup[3][s][c]), 4 == n.length && this.tipsCardsArr.push(n);
          }
        }

        if (this.cardsGroup[4].length > 1) {
          n = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var c = 0; c < this.cardsGroup[4][s].length; c++) {
              n.push(this.cardsGroup[4][s][c]), 2 == n.length && this.tipsCardsArr.push(n);
            }
          }
        }

        break;

      case 2:
        for (var s = 0; s < this.cardsGroup[0].length; s++) {
          i = [];

          for (var c = 0; c < e.length; c++) {
            s + c < this.cardsGroup[0].length && i.push(this.cardsGroup[0][s + c][0]);
          }

          i.length == e.length && this.drawCards(i, e);
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          n = [];

          for (var c = 0; c < this.cardsGroup[3][s].length; c++) {
            n.push(this.cardsGroup[3][s][c]), 4 == n.length && this.tipsCardsArr.push(n);
          }
        }

        if (this.cardsGroup[4].length > 1) {
          n = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var c = 0; c < this.cardsGroup[4][s].length; c++) {
              n.push(this.cardsGroup[4][s][c]), 2 == n.length && this.tipsCardsArr.push(n);
            }
          }
        }

        break;

      case 3:
        t = e.length / 3;

        for (var s = 0; s < this.cardsGroup[2].length; s++) {
          i = [];

          for (var r = 0; r < t; r++) {
            if (s + r < this.cardsGroup[2].length) {
              for (var c = 0; c < this.cardsGroup[2][s + r].length; c++) {
                i.push(this.cardsGroup[2][s + r][c]);
              }

              i.length == e.length && this.drawCards(i, e);
            }
          }
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          n = [];

          for (var c = 0; c < this.cardsGroup[3][s].length; c++) {
            n.push(this.cardsGroup[3][s][c]), 4 == n.length && this.tipsCardsArr.push(n);
          }
        }

        if (this.cardsGroup[4].length > 1) {
          n = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var c = 0; c < this.cardsGroup[4][s].length; c++) {
              n.push(this.cardsGroup[4][s][c]), 2 == n.length && this.tipsCardsArr.push(n);
            }
          }
        }

        break;

      case 4:
        for (var l = 0, s = 0; s < this.cardsGroup[3].length; s++) {
          i = [];

          e: for (var c = 0; c < this.cardsGroup[3][s].length; c++) {
            if (i.push(this.cardsGroup[3][s][c]), 4 == i.length) {
              this.pureType();

              for (var h = 0; h < this.pureArr[0].length; h++) {
                if (i.push(this.pureArr[0][h][0]), i.length == e.length) {
                  this.drawCards(i, e);
                  break;
                }
              }

              if (i.length < e.length) for (var r = this.playerCards.length - 1; r > -1; r--) {
                for (var d = 0; d < i.length; d++) {
                  if (i[d].getComponent("RunCards").val != this.playerCards[r].val) {
                    if ((14 == this.playerCards[r].val || 15 == this.playerCards[r].val) && l < 1) l++;else if ((14 == this.playerCards[r].val || 15 == this.playerCards[r].val) && 1 == l) continue;

                    if (d == i.length - 1 && (i.push(this.playerCards[r]), i.length == e.length)) {
                      this.drawCards(i, e);
                      break e;
                    }
                  }
                }
              }
            }
          }
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          n = [];

          for (var c = 0; c < this.cardsGroup[3][s].length; c++) {
            n.push(this.cardsGroup[3][s][c]), 4 == n.length && this.tipsCardsArr.push(n);
          }
        }

        if (this.cardsGroup[4].length > 1) {
          n = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var c = 0; c < this.cardsGroup[4][s].length; c++) {
              n.push(this.cardsGroup[4][s][c]), 2 == n.length && this.tipsCardsArr.push(n);
            }
          }
        }

        break;

      case 5:
        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          i = [];

          e: for (var c = 0; c < this.cardsGroup[3][s].length; c++) {
            if (i.push(this.cardsGroup[3][s][c]), 4 == i.length) {
              this.pureType();

              for (var h = 0; h < this.pureArr[1].length; h++) {
                if (i.push(this.pureArr[1][h][0]), i.push(this.pureArr[1][h][1]), i.length == e.length) {
                  this.drawCards(i, e);
                  break e;
                }
              }

              if (i.length < e.length) for (var h = 0; h < this.pureArr[2].length; h++) {
                if (i.push(this.pureArr[2][h][0]), i.push(this.pureArr[2][h][1]), i.length == e.length) {
                  this.drawCards(i, e);
                  break e;
                }
              }
              if (i.length < e.length) for (var h = 0; h < this.pureArr[3].length; h++) {
                for (var u = 0; u < i.length && i[u].getComponent("RunCards").val != this.pureArr[3][h][0].getComponent("RunCards").val; u++) {
                  if (u == i.length - 1 && (i.push(this.pureArr[3][h][0]), i.push(this.pureArr[3][h][1]), i.length == e.length)) {
                    this.drawCards(i, e);
                    break e;
                  }
                }
              }
            }
          }
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          n = [];

          for (var c = 0; c < this.cardsGroup[3][s].length; c++) {
            n.push(this.cardsGroup[3][s][c]), 4 == n.length && this.tipsCardsArr.push(n);
          }
        }

        if (this.cardsGroup[4].length > 1) {
          n = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var c = 0; c < this.cardsGroup[4][s].length; c++) {
              n.push(this.cardsGroup[4][s][c]), 2 == n.length && this.tipsCardsArr.push(n);
            }
          }
        }

        break;

      case 6:
        var l = 0;
        t = e.length / 4;

        for (var s = 0; s < this.cardsGroup[2].length; s++) {
          i = [];

          for (var r = 0; r < t; r++) {
            if (s + r < this.cardsGroup[2].length) for (var c = 0; c < this.cardsGroup[2][s + r].length; c++) {
              i.push(this.cardsGroup[2][s + r][c]);
            }
          }

          this.pureType();

          for (var c = 0; c < this.pureArr[0].length; c++) {
            if (i.push(this.pureArr[0][c][0]), i.length == e.length) {
              this.drawCards(i, e);
              break;
            }
          }

          if (i.length < e.length) {
            var m = i.length;

            e: for (var r = this.playerCards.length - 1; r > -1; r--) {
              for (var d = 0; d < m && i[d].getComponent("RunCards").val != this.playerCards[r].val; d++) {
                if ((14 == this.playerCards[r].val || 15 == this.playerCards[r].val) && l < 1) l++;else if ((14 == this.playerCards[r].val || 15 == this.playerCards[r].val) && 1 == l) break;

                if (d == m - 1 && (cc.log(this.playerCards[r].val), i.push(this.playerCards[r]), i.length == e.length)) {
                  this.drawCards(i, e);
                  break e;
                }
              }
            }
          }
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          n = [];

          for (var c = 0; c < this.cardsGroup[3][s].length; c++) {
            n.push(this.cardsGroup[3][s][c]), 4 == n.length && this.tipsCardsArr.push(n);
          }
        }

        if (this.cardsGroup[4].length > 1) {
          n = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var c = 0; c < this.cardsGroup[4][s].length; c++) {
              n.push(this.cardsGroup[4][s][c]), 2 == n.length && this.tipsCardsArr.push(n);
            }
          }
        }

        break;

      case 7:
        t = e.length / 5;

        for (var s = 0; s < this.cardsGroup[2].length; s++) {
          i = [];

          for (var r = 0; r < t; r++) {
            if (s + r < this.cardsGroup[2].length) for (var c = 0; c < this.cardsGroup[2][s + r].length; c++) {
              i.push(this.cardsGroup[2][s + r][c]);
            }
          }

          this.pureType();

          for (var h = 0; h < this.pureArr[1].length; h++) {
            if (i.push(this.pureArr[1][h][0]), i.push(this.pureArr[1][h][1]), i.length == e.length) {
              this.drawCards(i, e);
              break;
            }
          }

          if (i.length < e.length) for (var h = 0; h < this.pureArr[2].length; h++) {
            for (var u = 0; u < i.length && i[u].getComponent("RunCards").val != this.pureArr[2][h][0].getComponent("RunCards").val; u++) {
              if (u == i.length - 1 && (i.push(this.pureArr[2][h][0]), i.push(this.pureArr[2][h][1]), i.length == e.length)) {
                this.drawCards(i, e);
                break;
              }
            }
          }
          if (i.length < e.length) for (var h = 0; h < this.pureArr[3].length; h++) {
            if (i.push(this.pureArr[3][h][0]), i.push(this.pureArr[3][h][1]), i.length == e.length) {
              this.drawCards(i, e);
              break;
            }
          }
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          n = [];

          for (var c = 0; c < this.cardsGroup[3][s].length; c++) {
            n.push(this.cardsGroup[3][s][c]), 4 == n.length && this.tipsCardsArr.push(n);
          }
        }

        if (this.cardsGroup[4].length > 1) {
          n = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var c = 0; c < this.cardsGroup[4][s].length; c++) {
              n.push(this.cardsGroup[4][s][c]), 2 == n.length && this.tipsCardsArr.push(n);
            }
          }
        }

        break;

      case 8:
        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          i = [];

          for (var c = 0; c < this.cardsGroup[3][s].length; c++) {
            i.push(this.cardsGroup[3][s][c]), i.length == e.length && this.drawCards(i, e);
          }
        }

        if (this.cardsGroup[4].length > 1) {
          n = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var c = 0; c < this.cardsGroup[4][s].length; c++) {
              n.push(this.cardsGroup[4][s][c]), 2 == n.length && this.tipsCardsArr.push(n);
            }
          }
        }

        break;

      case 9:
        this.tipsCardsArr = [];
    }
  },
  tipsClick: function tipsClick() {
    if (!!this.allowTips) {
      return;
    }

    this.allowTips = true;
    this.netWork.LandlordsSocket.emit('TipsCards'); // 0 == this.tipsCount && this.matchingType(),
    //     this.tipsCount >= this.tipsCardsArr.length && (this.tipsCount = 0);
    // for (var e = 0; e < this.playerCards.length; e++) this.playerCards[e].position.y == this.movedY && this.playerCards[e].getComponent("Cards").moveCard();
    // if (this.tipsCardsArr.length > 0) {
    //     if (this.tipsCardsArr[this.tipsCount].length > 0)
    //         for (var e = 0; e < this.tipsCardsArr[this.tipsCount].length; e++) this.tipsCardsArr[this.tipsCount][e].getComponent("Cards").moveCard(),
    //             cc.log(this.tipsCardsArr[this.tipsCount][e].getComponent("Cards").val);
    //     else this.tipsCardsArr[this.tipsCount].getComponent("Cards").moveCard(),
    //         cc.log(this.tipsCardsArr[this.tipsCount].getComponent("Cards").val);
    //     this.tipsCount++
    // } else this.tuoGuan == false ? (this.allTips[1].getChildByName("Prompt2").active = true, this.allTips[1].getChildByName("Prompt2").getComponent("cc.Animation").play(), this.node.getComponent("LandlordsButtonClick").noOut()) : this.node.getComponent("LandlordsButtonClick").noOut()
  },
  tipsClickCallBack: function tipsClickCallBack(res) {
    var _this3 = this;

    this.scheduleOnce(function () {
      _this3.allowTips = false;
    }, 1);

    for (var i in this.playerCards) {
      if (this.playerCards[i].y == this.movedY) {
        this.playerCards[i].getComponent("RunCards").moveCard();
      }
    }

    if (res.code) {
      for (var _i in res.card) {
        for (var j in this.playerCards) {
          if (this.playerCards[j].getComponent("RunCards").val == res.card[_i].val && this.playerCards[j].getComponent("RunCards").type == res.card[_i].type) {
            this.playerCards[j].getComponent("RunCards").moveCard();
            break;
          }
        }
      }
    } else {
      try {
        this.netWork.LandlordsSocket.emit("sendCardsArr", {
          array: [],
          userId: this.pInfo.playerId,
          tableId: this.netWork.tableId,
          seatId: this.netWork.seatId
        });
      } catch (e) {
        console.log(e);
      }
    }

    if (this.tmpTuoguan) {
      this.tmpTuoguan = false;

      if (res.code) {
        this.outCard();
      }
    }
  },
  xiTongSorting: function xiTongSorting(e) {
    var t = [];
    e.sort(function (e, t) {
      return e.val == t.val ? t.type - e.type : t.val - e.val;
    });

    for (var i = 0, n = null, o = null, a = null; i < e.length; i++) {
      if (e[i].val > 13) n = i;else if (2 == e[i].val || 1 == e[i].val) {
        o = i;
        break;
      }
    }

    if (null == n && null != o) {
      a = e.splice(i, e.length - 1);

      for (var s = 0; s < a.length; s++) {
        e.splice(s, 0, a[s]);
      }
    } else if (null != n && null != o) {
      a = e.splice(i, e.length - 1);

      for (var s = 0; s < a.length; s++) {
        e.splice(n + s + 1, 0, a[s]);
      }
    }

    for (var i = e.length - 1; i > -1; i--) {
      t.push(e[i]);
    }

    return e;
  },
  xiTongOutCard: function xiTongOutCard(e) {
    this.cancelTimer(), this.selectedCard = [];

    for (var t = 0; t < e.length; t++) {
      for (var i = 0; i < this.playerCards.length; i++) {
        if (e[t].val == this.playerCards[i].getComponent("RunCards").val && e[t].type == this.playerCards[i].getComponent("RunCards").type) {
          this.selectedCard.push(this.playerCards[i]);
          break;
        }
      }
    }

    this.selectedCard = this.allSorting(this.selectedCard), this.tempPlayersLists[1].outCard.push(this.selectedCard), this.identifyCards();
  },
  teShuChuPai: function teShuChuPai(e) {
    for (var t, i = [], n = 0; n < e.length; n++) {
      t = this.cardsPool.size() > 0 ? this.cardsPool.get() : cc.instantiate(this.pb_Cards), this.pb_CardNode.addChild(t), t.getComponent("RunCards").cardsCreate(e[n].val, e[n].type), i.push(t);
    }

    i = this.allSorting(i);
    var o = null,
        a = null;

    if (i.length % 2 == 0) {
      a = i.length / 2;

      for (var n = 0; n < i.length; n++) {
        i[n].scale = .8, o = -a * this.smallDistanceCard + n * this.smallDistanceCard - i[n].getContentSize().width * i[n].scale / 2 + this.smallDistanceCard / 2, i[n].setPosition(cc.v2(o, this.finishY)), i[n].zIndex = n;
      }
    } else {
      a = (i.length - 1) / 2;

      for (var n = 0; n < i.length; n++) {
        i[n].scale = .8, o = -a * this.smallDistanceCard + n * this.smallDistanceCard - i[n].getContentSize().width * i[n].scale / 2, i[n].setPosition(cc.v2(o, this.finishY)), i[n].zIndex = n;
      }
    }

    this.tempPlayersLists[1].outCard.push(i), this.recycling[1] = i;
  },
  allSorting: function allSorting(e) {
    var t = [];
    e.sort(function (e, t) {
      return e.getComponent("RunCards").val == t.getComponent("RunCards").val ? t.getComponent("RunCards").type - e.getComponent("RunCards").type : t.getComponent("RunCards").val - e.getComponent("RunCards").val;
    });

    for (var i = 0, n = null, o = null, a = null; i < e.length; i++) {
      if (e[i].getComponent("RunCards").val > 13) n = i;else if (2 == e[i].getComponent("RunCards").val || 1 == e[i].getComponent("RunCards").val) {
        o = i;
        break;
      }
    }

    if (null == n && null != o) {
      a = e.splice(i, e.length - 1);

      for (var s = 0; s < a.length; s++) {
        e.splice(s, 0, a[s]);
      }
    } else if (null != n && null != o) {
      a = e.splice(i, e.length - 1);

      for (var s = 0; s < a.length; s++) {
        e.splice(n + s + 1, 0, a[s]);
      }
    }

    for (var i = e.length - 1; i > -1; i--) {
      t.push(e[i]);
    }

    return e;
  },
  drawCards: function drawCards(e, t) {
    for (var i = [], n = e.length - 1; n > -1; n--) {
      i.push({
        val: e[n].getComponent("RunCards").val
      });
    }

    var o;
    1 == t.type ? o = this.checkDuiZi(i) : 2 == t.type ? o = this.checkShunZi(i) : 3 == t.type ? o = this.checkSanOrShun(i) : 4 == t.type ? o = this.checkSiTakeTwo(i) : 5 == t.type ? o = this.checkSiTakeTwoShuang(i) : 6 == t.type ? o = this.checkSanOrPlane(i) : 7 == t.type ? o = this.checkSanShuangOrPlane(i) : 8 == t.type && (o = this.checkSi(i)), o.num > 0 && (1 == o.max ? o.max += 12.1 : 2 == o.max && (o.max += 11.2), 1 == t.max ? t.max += 12.1 : 2 == t.max && (t.max += 11.2), o.max > t.max && this.tipsCardsArr.push(e));
  },
  sameDifferentVal: function sameDifferentVal() {
    this.cardsGroup = [[], [], [], [], []];

    for (var e = 0; e < this.CardsNum.length; e++) {
      for (var t = [], i = [], n = [], o = [], a = [], s = 0, c = this.playerCards.length - 1; c > -1; c--) {
        this.CardsNum[e] == this.playerCards[c].getComponent("RunCards").val && (14 == this.CardsNum[e] || 15 == this.CardsNum[e] ? s = 5 : s++, 1 == s ? (t.push(this.playerCards[c]), i.push(this.playerCards[c]), n.push(this.playerCards[c]), o.push(this.playerCards[c]), this.cardsGroup[0].push(t)) : 2 == s ? (i.push(this.playerCards[c]), n.push(this.playerCards[c]), o.push(this.playerCards[c]), this.cardsGroup[1].push(i)) : 3 == s ? (n.push(this.playerCards[c]), o.push(this.playerCards[c]), this.cardsGroup[2].push(n)) : 4 == s ? (o.push(this.playerCards[c]), this.cardsGroup[3].push(o)) : 5 == s && (a.push(this.playerCards[c]), this.cardsGroup[4].push(a)));
      }
    }
  },
  pureType: function pureType() {
    this.pureArr = [[], [], [], [], []];

    for (var e = 0; e < this.CardsNum.length; e++) {
      for (var t = [], i = 0, n = this.playerCards.length - 1; n > -1; n--) {
        this.CardsNum[e] == this.playerCards[n].getComponent("RunCards").val && (14 == this.CardsNum[e] || 15 == this.CardsNum[e] ? (t.push(this.playerCards[n]), i += 5) : (t.push(this.playerCards[n]), i++));
      }

      1 == i || 5 == i ? this.pureArr[0].push(t) : 2 == i ? this.pureArr[1].push(t) : 3 == i ? this.pureArr[2].push(t) : 4 == i && this.pureArr[3].push(t), 5 == i && this.pureArr[4].push(t);
    }
  },
  tuoPai: function tuoPai() {
    var e = -1,
        t = [];

    if (this.count < 2) {
      e = this.cardType(this.otherCardArr);
      var i = this.xuanPai(e);
      this.yiDong(i);
    } else if (this.count >= 2) {
      this.sameDifferentVal();

      for (var n = 0; n < this.playerCards.length; n++) {
        this.playerCards[n].position.y == this.movedY && t.push(this.playerCards[n]);
      }

      if (t.length < 1) return;
    }
  },
  t_shunZi: function t_shunZi(e) {
    for (var t, i = this.cardsGroup[0].length, n = []; i >= 5;) {
      for (var o = 0; o < this.cardsGroup[0].length; o++) {
        if (!(o + i <= this.cardsGroup[0].length)) {
          i--;
          break;
        }

        n = [];

        for (var a = 0; a < i; a++) {
          if (n.push(this.cardsGroup[0][a + o][0]), n.length == i) {
            if (this.coincidence(n, e) && this.qiCards(n, {
              type: 2,
              max: 0
            })) {
              t = this.differentZu(n, e), this.yiDong(t), i = 0;
              break;
            }
          } else if (a == this.cardsGroup[0].length - 1 && n.length < i) {
            i--;
            break;
          }
        }
      }
    }
  },
  t_lianDui: function t_lianDui(e) {
    for (var t, i = 2 * this.cardsGroup[1].length, n = []; i > 5;) {
      if (i % 2 == 0) for (var o = 0; o < this.cardsGroup[1].length; o++) {
        if (!(o + i / 2 <= this.cardsGroup[1].length)) {
          i--;
          break;
        }

        n = [];

        for (var a = 0; a < i / 2; a++) {
          if (n.push(this.cardsGroup[1][a + o][0]), n.push(this.cardsGroup[1][a + o][1]), n.length == i) {
            if (this.coincidence(n, e) && this.qiCards(n, {
              type: 1,
              max: 0
            })) {
              t = this.differentZu(n, e), this.yiDong(t), i = 0;
              break;
            }
          } else if (a == this.cardsGroup[1].length - 1 && n.length < i) {
            i--;
            break;
          }
        }
      } else i--;
    }
  },
  t_sanShun: function t_sanShun(e) {
    for (var t, i = 3 * this.cardsGroup[2].length, n = []; i > 2;) {
      if (i % 3 == 0) for (var o = 0; o < this.cardsGroup[2].length; o++) {
        if (!(o + i / 3 <= this.cardsGroup[2].length)) {
          i--;
          break;
        }

        n = [];

        for (var a = 0; a < i / 3; a++) {
          if (n.push(this.cardsGroup[2][a + o][0]), n.push(this.cardsGroup[2][a + o][1]), n.push(this.cardsGroup[2][a + o][2]), n.length == i) {
            if (this.coincidence(n, e) && this.qiCards(n, {
              type: 3,
              max: 0
            })) {
              t = this.differentZu(n, e), this.yiDong(t), i = 0;
              break;
            }
          } else if (a == this.cardsGroup[2].length - 1 && n.length < i) {
            i--;
            break;
          }
        }
      } else i--;
    }
  },
  t_sanDaiYi: function t_sanDaiYi(e) {
    for (var t, i = 3 * this.cardsGroup[2].length, n = []; i > 3;) {
      if (i % 3 == 0) for (var o = 0; o < this.cardsGroup[2].length; o++) {
        if (!(o + i / 3 <= this.cardsGroup[2].length)) {
          i--;
          break;
        }

        n = [];

        for (var a = 0; a < i / 3; a++) {
          if (n.push(this.cardsGroup[2][a + o][0]), n.push(this.cardsGroup[2][a + o][1]), n.push(this.cardsGroup[2][a + o][2]), n.length == i) {
            for (var s = this.yiJiNext(n, e), c = 0; c < s.length; c++) {
              n.push(s[c]);
            }

            if (s.length < i / 3) {
              var r = n.length;

              e: for (var c = this.playerCards.length - 1; c > -1; c--) {
                for (var l = 0; l < r && n[l].getComponent("RunCards").val != this.playerCards[c].getComponent("RunCards").val; l++) {
                  if ((14 == this.playerCards[c].getComponent("RunCards").val || 15 == this.playerCards[c].getComponent("RunCards").val) && kingNum < 1) kingNum++;else if ((14 == this.playerCards[c].getComponent("RunCards").val || 15 == this.playerCards[c].getComponent("RunCards").val) && 1 == kingNum) break;

                  if (l == r - 1 && (n.push(this.playerCards[c]), n.length == i / 3 * 4 && this.coincidence(n, e) && this.qiCards(n, {
                    type: 6,
                    max: 0
                  }))) {
                    t = this.differentZu(n, e), this.yiDong(t), i = 0;
                    break e;
                  }
                }
              }
            } else if (n.length == i / 3 * 4 && this.coincidence(n, e) && this.qiCards(n, {
              type: 6,
              max: 0
            })) {
              t = this.differentZu(n, e), this.yiDong(t), i = 0;
              break;
            }
          } else if (a == this.cardsGroup[2].length - 1 && n.length < i) {
            i--;
            break;
          }
        }
      } else i--;
    }
  },
  t_sanDaiYiDui: function t_sanDaiYiDui(e) {
    for (var t, i = 3 * this.cardsGroup[2].length, n = []; i > 4;) {
      if (i % 3 == 0) for (var o = 0; o < this.cardsGroup[2].length; o++) {
        if (!(o + i / 3 <= this.cardsGroup[2].length)) {
          i--;
          break;
        }

        n = [];

        for (var a = 0; a < i / 3; a++) {
          if (n.push(this.cardsGroup[2][a + o][0]), n.push(this.cardsGroup[2][a + o][1]), n.push(this.cardsGroup[2][a + o][2]), n.length == i) {
            var s = this.yiJiNext(n, e);
            if (!(s.length <= i / 3)) break;

            for (var c = 0; c < s.length; c++) {
              for (var r = 0; r < this.cardsGroup[1].length; r++) {
                if (this.cardsGroup[1][r][0].getComponent("RunCards").val == s[c].getComponent("RunCards").val) for (var l = 0; l < n.length && n[l] != s[c]; l++) {
                  l == n.length - 1 && (n.push(this.cardsGroup[1][r][0]), n.push(this.cardsGroup[1][r][1]));
                }
              }
            }

            n.length == i / 3 * 5;
          } else if (n.length == i / 3 * 4 && this.coincidence(n, e) && this.qiCards(n, {
            type: 6,
            max: 0
          })) {
            t = this.differentZu(n, e), this.yiDong(t), i = 0;
            break;
          }
        }
      } else i--;
    }
  },
  yiJiNext: function yiJiNext(e, t) {
    for (var i = [], n = 0; n < t.length; n++) {
      for (var o = 0; o < e.length && t[n].getComponent("RunCards").val != e[o].getComponent("RunCards").val; o++) {
        if (o == e.length - 1) {
          i.push(t[n]);
          break;
        }
      }
    }

    return i;
  },
  differentZu: function differentZu(e, t) {
    for (var i = [], n = 0; n < e.length; n++) {
      for (var o = 0; o < t.length && (e[n].getComponent("RunCards").val != t[o].getComponent("RunCards").val || e[n].getComponent("RunCards").type != t[o].getComponent("RunCards").type); o++) {
        o == t.length - 1 && i.push(e[n]);
      }
    }

    return this.tuoPaiCount++, i;
  },
  coincidence: function coincidence(e, t) {
    cc.log(t[0].getComponent("RunCards").val);

    for (var i = 0; i < t.length; i++) {
      for (var n = 0; n < e.length && t[i].getComponent("RunCards").val != e[n].getComponent("RunCards").val; n++) {
        if (n == e.length - 1) return cc.log(t[i].getComponent("RunCards").val), false;
      }
    }

    return !0;
  },
  yiDong: function yiDong(e) {
    for (var t = 0; t < e.length; t++) {
      e[t].getComponent("RunCards").moveCard();
    }
  },
  yiJi: function yiJi(e, t) {
    for (var i = [], n = [], o = 0; o < e.length; o++) {
      for (var a = 0; a < t.length; a++) {
        if (t[a].getComponent("RunCards").val == e[o].getComponent("RunCards").val && t[a].getComponent("RunCards").type == e[o].getComponent("RunCards").type) {
          i.push(t[a]);
          break;
        }

        a == t.length - 1 && n.push(t[a]);
      }
    }

    return {
      same: i,
      different: n
    };
  },
  xuanPai: function xuanPai(e) {
    this.sameDifferentVal();

    for (var t, i, n = [], o = [], a = [], s = 0; s < this.playerCards.length; s++) {
      this.playerCards[s].position.y == this.movedY && a.push(this.playerCards[s]);
    }

    switch (e.type) {
      case 0:
        break;

      case 1:
        if (t = e.length / 2, a.length > t) return 0;

        for (var s = 0; s < this.cardsGroup[1].length; s++) {
          n = [];

          for (var c = 0; c < t && !(s + c >= this.cardsGroup[1].length); c++) {
            for (var r = 0; r < this.cardsGroup[1][s + c].length; r++) {
              n.push(this.cardsGroup[1][s + c][r]);
            }
          }

          if (n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          o = [];

          for (var r = 0; r < this.cardsGroup[3][s].length; r++) {
            if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
          }
        }

        if (this.cardsGroup[4].length > 1) {
          o = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var r = 0; r < this.cardsGroup[4][s].length; r++) {
              if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different;
            }
          }
        }

        break;

      case 2:
        for (var s = 0; s < this.cardsGroup[0].length; s++) {
          n = [];

          for (var r = 0; r < e.length; r++) {
            s + r < this.cardsGroup[0].length && n.push(this.cardsGroup[0][s + r][0]);
          }

          if (n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          o = [];

          for (var r = 0; r < this.cardsGroup[3][s].length; r++) {
            if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
          }
        }

        if (this.cardsGroup[4].length > 1) {
          o = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var r = 0; r < this.cardsGroup[4][s].length; r++) {
              if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different;
            }
          }
        }

        break;

      case 3:
        t = e.length / 3;

        for (var s = 0; s < this.cardsGroup[2].length; s++) {
          n = [];

          for (var c = 0; c < t; c++) {
            if (s + c < this.cardsGroup[2].length) {
              for (var r = 0; r < this.cardsGroup[2][s + c].length; r++) {
                n.push(this.cardsGroup[2][s + c][r]);
              }

              if (n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
            }
          }
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          o = [];

          for (var r = 0; r < this.cardsGroup[3][s].length; r++) {
            if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
          }
        }

        if (this.cardsGroup[4].length > 1) {
          o = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var r = 0; r < this.cardsGroup[4][s].length; r++) {
              if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different;
            }
          }
        }

        break;

      case 4:
        for (var l = 0, s = 0; s < this.cardsGroup[3].length; s++) {
          n = [];

          for (var r = 0; r < this.cardsGroup[3][s].length; r++) {
            if (n.push(this.cardsGroup[3][s][r]), 4 == n.length) {
              for (var h = this.yiJi(n, a), c = 0; c < h.different.length; c++) {
                n.push(h.different[c]);
              }

              if (n.length < e.length) for (var c = this.playerCards.length - 1; c > -1; c--) {
                for (var d = 0; d < n.length && n[d].getComponent("RunCards").val != this.playerCards[c].val; d++) {
                  if ((14 == this.playerCards[c].val || 15 == this.playerCards[c].val) && l < 1) l++;else if ((14 == this.playerCards[c].val || 15 == this.playerCards[c].val) && 1 == l) continue;
                  if (d == n.length - 1 && (n.push(this.playerCards[c]), n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e)))) return i.different;
                }
              } else if (n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
            }
          }
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          o = [];

          for (var r = 0; r < this.cardsGroup[3][s].length; r++) {
            if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
          }
        }

        if (this.cardsGroup[4].length > 1) {
          o = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var r = 0; r < this.cardsGroup[4][s].length; r++) {
              if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different;
            }
          }
        }

        break;

      case 5:
        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          n = [];

          for (var r = 0; r < this.cardsGroup[3][s].length; r++) {
            if (n.push(this.cardsGroup[3][s][r]), 4 == n.length) {
              for (var h = this.yiJi(n, a), c = 0; c < h.different.length; c++) {
                n.push(h.different[c]);
              }

              if (n.length < e.length) {
                for (var c = 0; c < this.cardsGroup[1].length; c++) {
                  if (this.cardsGroup[1][c][0].getComponent("RunCards").val != n[0].getComponent("RunCards").val) for (var d = 0; d < this.cardsGroup[1][c].length; d++) {
                    if (n.push(this.cardsGroup[1][c][d]), n.length == e.length) if (i = this.yiJi(n, a), i.same.length == a.length) {
                      if (this.qiCards(n, e)) return i.different;
                    } else n.splice(n.length - this.cardsGroup[1][c][d].length, n.length);
                  }
                }

                for (var c = 0; c < this.cardsGroup[3].length; c++) {
                  if (this.cardsGroup[3][c][0].getComponent("RunCards").val != n[0].getComponent("RunCards").val) for (var d = 0; d < this.cardsGroup[3][c].length; d++) {
                    if (n.push(this.cardsGroup[3][c][d]), n.length == e.length && i.same.length == a.length && this.qiCards(n, e)) return i.different;
                  }
                }
              }
            }
          }
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          o = [];

          for (var r = 0; r < this.cardsGroup[3][s].length; r++) {
            if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
          }
        }

        if (this.cardsGroup[4].length > 1) {
          o = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var r = 0; r < this.cardsGroup[4][s].length; r++) {
              if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different;
            }
          }
        }

        break;

      case 6:
        var l = 0;
        t = e.length / 4;

        for (var s = 0; s < this.cardsGroup[2].length; s++) {
          n = [];

          for (var c = 0; c < t; c++) {
            if (s + c < this.cardsGroup[2].length) for (var r = 0; r < this.cardsGroup[2][s + c].length; r++) {
              n.push(this.cardsGroup[2][s + c][r]);
            }
          }

          for (var h = this.yiJi(n, a), c = 0; c < h.different.length; c++) {
            n.push(h.different[c]);
          }

          if (n.length < e.length) for (var u = n.length, c = this.playerCards.length - 1; c > -1; c--) {
            for (var d = 0; d < u && n[d].getComponent("RunCards").val != this.playerCards[c].val; d++) {
              if ((14 == this.playerCards[c].val || 15 == this.playerCards[c].val) && l < 1) l++;else if ((14 == this.playerCards[c].val || 15 == this.playerCards[c].val) && 1 == l) break;
              if (d == u - 1 && (cc.log(this.playerCards[c].val), n.push(this.playerCards[c]), n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e)))) return i.different;
            }
          } else if (n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          o = [];

          for (var r = 0; r < this.cardsGroup[3][s].length; r++) {
            if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
          }
        }

        if (this.cardsGroup[4].length > 1) {
          o = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var r = 0; r < this.cardsGroup[4][s].length; r++) {
              if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different;
            }
          }
        }

        break;

      case 7:
        t = e.length / 5;

        for (var s = 0; s < this.cardsGroup[2].length; s++) {
          n = [];

          for (var c = 0; c < t; c++) {
            if (s + c < this.cardsGroup[2].length) for (var r = 0; r < this.cardsGroup[2][s + c].length; r++) {
              n.push(this.cardsGroup[2][s + c][r]);
            }
          }

          for (var h = this.yiJi(n, a), c = 0; c < this.cardsGroup[1].length; c++) {
            for (var r = 0; r < this.cardsGroup[1][c].length; r++) {
              for (var d = 0; d < h.different.length; d++) {
                if (h.different[s].getComponent("RunCards").val == this.cardsGroup[1][c][0].getComponent("RunCards").val && (n.push(this.cardsGroup[1][c][r]), n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e)))) return i.different;
              }
            }
          }
        }

        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          o = [];

          for (var r = 0; r < this.cardsGroup[3][s].length; r++) {
            if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
          }
        }

        if (this.cardsGroup[4].length > 1) {
          o = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var r = 0; r < this.cardsGroup[4][s].length; r++) {
              if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different;
            }
          }
        }

        break;

      case 8:
        for (var s = 0; s < this.cardsGroup[3].length; s++) {
          o = [];

          for (var r = 0; r < this.cardsGroup[3][s].length; r++) {
            if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different;
          }
        }

        if (this.cardsGroup[4].length > 1) {
          o = [];

          for (var s = 0; s < this.cardsGroup[4].length; s++) {
            for (var r = 0; r < this.cardsGroup[4][s].length; r++) {
              if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different;
            }
          }
        }

        break;

      case 9:
    }
  },
  qiCards: function qiCards(e, t) {
    var cardVal = [];

    for (var i = e.length - 1; i > -1; i--) {
      cardVal.push({
        val: e[i].getComponent("RunCards").val
      });
    }

    var o;
    return 1 == t.type ? o = this.checkDuiZi(cardVal) : 2 == t.type ? o = this.checkShunZi(cardVal) : 3 == t.type ? o = this.checkSanOrShun(cardVal) : 4 == t.type ? o = this.checkSiTakeTwo(cardVal) : 5 == t.type ? o = this.checkSiTakeTwoShuang(cardVal) : 6 == t.type ? o = this.checkSanOrPlane(cardVal) : 7 == t.type ? o = this.checkSanShuangOrPlane(cardVal) : 8 == t.type && (o = this.checkSi(cardVal)), o.num > 0 ? (1 == o.max ? o.max += 12.1 : 2 == o.max && (o.max += 11.2), 1 == t.max ? t.max += 12.1 : 2 == t.max && (t.max += 11.2), o.max > t.max) : (cc.log(cardVal), false);
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxSdW5pbmdcXFJ1bmluZ01haW4uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwYl9DYXJkcyIsInR5cGUiLCJQcmVmYWIiLCJwYl9DYXJkTm9kZSIsIk5vZGUiLCJidG5fUm9iTGFuZGxvYWQiLCJvdGhlck9uZUwiLCJvdGhlclR3b1IiLCJwYl9UaW1lciIsInBiX0xhbmRsb2Fkc0NhcmQiLCJwYl9Mb3dlciIsImJ0bl9DYWxsTGFuZGxvYWQiLCJsYW5kbG9hZHNDYXJkcyIsImJnQXVkaW8iLCJBdWRpb0NsaXAiLCJhbGxUaXBzIiwibGFuZGxvYWRzTG9nbyIsImJ0bl9PdXRDYXJkIiwiYnRuX2FnYWluIiwiY2FyZEF1ZGlvIiwiZHVpWmlBdWRpbyIsImJhb0ppbmdBdWRpbyIsImJ1WWFvQXVkaW8iLCJjaHVUaWFuQXVkaW8iLCJqaWFvRGlaaHVBdWRpbyIsImJ1Smlhb0F1ZGlvIiwicWlhbmdBdWRpbyIsImJ1UWlhbmdBdWRpbyIsImNhcmRUeXBlQXVkaW8iLCJmYVBhaUF1ZGlvIiwic2h1WWluZyIsInNhbkdlQXVkaW8iLCJiaWxsTWVzc2FnZSIsImJpbGxCZyIsIlNwcml0ZUZyYW1lIiwidGVYaWFvIiwiY2FyZFR5cGVUZXh0IiwidGVYaWFvQXVkaW8iLCJjaGFuZ2VBdWRpbyIsInByb3RhZ29uaXN0IiwiYnRuX1N0YXJ0IiwiY29tX01lc3NhZ2VCb3giLCJiZ1R1IiwidG9wU2V0IiwicGFpWGluZyIsInJvY2tldCIsInJvY2tldEJvb20iLCJleGl0UmVhZHkiLCJleGl0QnRuIiwiY2xvc2VEb29yTGJsIiwiTGFiZWwiLCJicExibCIsImZpcnN0T3V0Q2FyZCIsImRpc3RhbmNlQ2FyZCIsInNtYWxsRGlzdGFuY2VDYXJkIiwiaW5pdFkiLCJtb3ZlZFkiLCJmaW5pc2hZIiwicGVhayIsInRpcHNDb3VudCIsInR1b0d1YW4iLCJnYW1lRmluaXNoIiwicWlhbmdEaVpodSIsIm9uTG9hZCIsImFsbG93VGlwcyIsInBsYXllckNhcmRzIiwic2VsZWN0ZWRDYXJkIiwiQ2FyZHNOdW0iLCJyZWN5Y2xpbmciLCJvdGhlckNhcmRBcnIiLCJtaW5nUGFpQXJyYXkiLCJjYXJkc0dyb3VwIiwidGlwc0NhcmRzQXJyIiwidGVtcFBsYXllcklkIiwiY2hvbmdMaWFuIiwiYWxsUGxheWVyVGlwc1N0YXRlIiwiYnRuUGxheWVyU3RhdGUiLCJuZXRXb3JrIiwiaSIsInB1c2giLCJzcGxpY2UiLCJsZW5ndGgiLCJjb3VudCIsImNhcmRzTGlzdCIsInZhbCIsImNhcmRzQXJyYXkiLCJzb3J0IiwiTWF0aCIsInJhbmRvbSIsImluaXRVSSIsInN0YXJ0Iiwid2luZG93IiwicmVjb25uZWN0UG9pbnQiLCJsb2ciLCJhY3RpdmUiLCJzdGFydEdhbWVGdW5jdGlvbiIsImdhbWVJbml0IiwiZ2V0Q2hpbGRCeU5hbWUiLCJ2aWV3Iiwic2V0T3JpZW50YXRpb24iLCJtYWNybyIsIk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSIsImdldFZpc2libGVTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJiaUxpIiwibm9kZSIsInNjYWxlIiwic2V0UG9zaXRpb24iLCJzZXRDb250ZW50U2l6ZSIsImdldENvbnRlbnRTaXplIiwic2V0UmVzaXplQ2FsbGJhY2siLCJwSW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50Iiwic2V0cnVuaW5nT2JqX0Z1bmN0aW9uIiwic2V0R2FtZU9ial9GdW5jdGlvbiIsIkhlbHBlciIsImxvYWRIZWFkIiwicGxheWVySGVhZElkIiwic3AiLCJnZXRDb21wb25lbnQiLCJzcHJpdGVGcmFtZSIsInN0cmluZyIsInBhcnNlRmxvYXQiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsInBsYXllck5hbWUiLCJ0ZW1wUGxheWVyc0xpc3RzIiwibXVzaWNDb250cm9sIiwiYmdNdXNpYyIsImF1ZGlvRW5naW5lIiwicGxheSIsImRpc2Nvbm5lY3RlZCIsInJvb21CZXQiLCJnYW1lRXhpdCIsInBsYXllcklkIiwicGxheWVyQXJyIiwiY2FyZExlbmd0aCIsImNhcmRzUG9vbCIsIk5vZGVQb29sIiwiY2FyZCIsImluc3RhbnRpYXRlIiwicHV0IiwicmVzZXRERiIsInNjb3JlIiwiZXhjaGFuZ2VSYXRlIiwic2V0TXlTZWF0Iiwibmlja25hbWUiLCJzZWF0SWQiLCJ1c2VySWQiLCJzZXRDYXJkTGVuZ3RoIiwiY2FyY2RfbGVuZ3RoIiwib3RoZXJFbnRlclJvb20iLCJ1c3JIZWFkIiwic2VhdCIsInBsYXllck91dFJvb20iLCJkaXNjb25uZWN0TmV0V29ya19GdW5jdGlvbiIsIkxhbmRsb3Jkc1NvY2tldCIsImRpc2Nvbm5lY3QiLCJlcnJvciIsImdhbWVEaXNjb25uZWN0IiwicmVzZXRMYW5kbG9yZHMiLCJkb3VibGUiLCJpc0xhbmRsb3JkIiwiaiIsInN0YXRlIiwiY2FsbExhbmRsb2FkcyIsInNlY29uZCIsInRpbWVyIiwicHVibGljQ2FyZCIsImNhcmRzIiwiY2FyZEEiLCJjYXJkQiIsInZhbHVlIiwiY2FyZHNDcmVhdGUiLCJzaGFja2luZyIsInN0b3BBbGxBY3Rpb25zIiwiYmdUdUFjdGlvbiIsInJlcGVhdCIsInNlcXVlbmNlIiwibW92ZVRvIiwidjIiLCJydW5BY3Rpb24iLCJjaGVja0xhbmRsb3JkcyIsImUiLCJ0IiwibiIsIm8iLCJzaXplIiwiZ2V0IiwiYWRkQ2hpbGQiLCJhIiwicyIsImMiLCJyIiwicmVzZXRDYXJkTG9jYXQiLCJzY2hlZHVsZU9uY2UiLCJwbGF5ZXJOb3dTdGF0ZSIsImNhbmNlbFRpbWVyIiwic291bmRFZmZlY3RDb250cm9sIiwiZmxvb3IiLCJwb3NpdGlvbiIsInkiLCJtb3ZlQ2FyZCIsIngiLCJhcm1hdHVyZSIsImFuaW1hdGlvbiIsImRlc3Ryb3kiLCJmYWRlT3V0IiwiY2FsbEZ1bmMiLCJsIiwiaCIsImQiLCJ1Iiwic3Bhd24iLCJyb3RhdGVUbyIsImNhcmRpbmFsU3BsaW5lVG8iLCJtIiwic2NhbGVUbyIsImRlbGF5VGltZSIsImciLCJwIiwiY2h1blRpYW5BbmltYXRpb24iLCJjYXJkc1NvcnRpbmciLCJpc0xpY2Vuc2luZyIsImZpbmlzaEdhbWUiLCJ0ZW1wUGxheWVyTGlzdCIsImxpY2Vuc2luZyIsImxpY2Vuc2luZ1RpbWVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm5pQ2hlbmciLCJpZCIsInpoaVNoZW5nWWkiLCJ6aGlTaGVuZ0VyIiwib3V0Q2FyZCIsImluZGV4Iiwic2NoZWR1bGUiLCJjYXJkV2lkdGgiLCJjYXJkSGVpZ2h0IiwiZFdpZHRoIiwicm9iTGFuZGxvcmQiLCJ0dW9HdWFuRnVuY3Rpb24iLCJzZWF0SW5kZXgiLCJyZW1vdmVDYXJkcyIsIm51bSIsInN0YXJ0VGltZXIiLCJydWxlcyIsImNvbnNvbGUiLCJjYXJkVHlwZSIsInByaW1hcnlDYXJkIiwibWF4IiwiY2FyZExpc3QiLCJjaGVja09uZUNhcmQiLCJjaGVja0R1aVppIiwiY2hlY2tTaHVuWmkiLCJjaGVja1Nhbk9yU2h1biIsImNoZWNrU2lUYWtlVHdvIiwiY2hlY2tTaVRha2VUd29TaHVhbmciLCJjaGVja1Nhbk9yUGxhbmUiLCJjaGVja1NhblNodWFuZ09yUGxhbmUiLCJjaGVja1NpIiwia2luZ0Jvb20iLCJzZWxlY3RDYXJkcyIsImFyIiwic3RhcnRMb2NhdCIsImNoYW5nZUJhaSIsImNoYW5nZUh1aSIsInByaW1hcnlOdW0iLCJub3RDb25mb3JtUnVsZXMiLCJlbWl0IiwiYXJyYXkiLCJ0YWJsZUlkIiwiaWRlbnRpZnlDYXJkcyIsInpJbmRleCIsImNvbG9yIiwiQ29sb3IiLCJpbnRlcmFjdGFibGUiLCJwbGF5U3RhdGUiLCJuZGV4IiwicWlhbmciLCJ0bXBUdW9ndWFuIiwidGlwc0NsaWNrIiwidHVvR3VhblN0YXRlIiwicmVzbHV0IiwiaGFuZENhcmQiLCJpc0NhbiIsImlzRXF1YWwiLCJlcSIsInRlbXAiLCJrIiwidGVtcExpc3QiLCJvbmVDYXJkIiwic2xpY2UiLCJ0d29DYXJkIiwib3RoZXJQbGF5ZXJPdXRDYXJkIiwicGFyc2VJbnQiLCJ4aVRvbmdTb3J0aW5nIiwib3RoZXJQbGF5ZXJObyIsImNoZWNrVG9wUGxheWVyIiwic2V0dGxlbWVudCIsImNsb3NlRG9vciIsImJwIiwiRnJhY3Rpb24iLCJjYXJkX251bSIsIkJvdHRvbSIsIlRvdWNoU3RhcnQiLCJvbiIsImV2ZW50IiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJnZXRMb2NhdGlvbiIsInR1b1BhaUNvdW50IiwiVG91Y2hNb3ZlIiwiVG91Y2hFbmQiLCJUb3VjaENhbmNlbCIsInR1cm5PZmZUb3VjaCIsIm9mZiIsInJlbW92ZUFsbFN0YXRlIiwiY2FuY2VsVHVvR2F1biIsInJlc2V0R2FtZSIsIm1hdGNoaW5nVHlwZSIsImNoZWNrVHlwZU51bSIsInNhbWVEaWZmZXJlbnRWYWwiLCJwdXJlVHlwZSIsInB1cmVBcnIiLCJkcmF3Q2FyZHMiLCJ0aXBzQ2xpY2tDYWxsQmFjayIsInJlcyIsImNvZGUiLCJ4aVRvbmdPdXRDYXJkIiwiYWxsU29ydGluZyIsInRlU2h1Q2h1UGFpIiwidHVvUGFpIiwieHVhblBhaSIsInlpRG9uZyIsInRfc2h1blppIiwiY29pbmNpZGVuY2UiLCJxaUNhcmRzIiwiZGlmZmVyZW50WnUiLCJ0X2xpYW5EdWkiLCJ0X3NhblNodW4iLCJ0X3NhbkRhaVlpIiwieWlKaU5leHQiLCJraW5nTnVtIiwidF9zYW5EYWlZaUR1aSIsInlpSmkiLCJzYW1lIiwiZGlmZmVyZW50IiwiY2FyZFZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkgsS0FERjtBQUtSQyxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVRGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUTtBQUZBLEtBTEw7QUFTUkMsSUFBQUEs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QWtELEtBQUtsSyxDQUFDLENBQUN6TCxJQUFQLEdBQWMyTCxDQUFDLEdBQUcsS0FBS3dFLHFCQUFMLENBQTJCd0YsT0FBM0IsQ0FBbEIsR0FBd0QsS0FBS2xLLENBQUMsQ0FBQ3pMLElBQVAsS0FBZ0IyTCxDQUFDLEdBQUcsS0FBS3lFLE9BQUwsQ0FBYXVGLE9BQWIsQ0FBcEIsQ0FBOVYsRUFDSGhLLENBQUMsQ0FBQ3lELEdBQUYsR0FBUSxDQUFSLElBQWEsS0FBS3pELENBQUMsQ0FBQytELEdBQVAsR0FBYS9ELENBQUMsQ0FBQytELEdBQUYsSUFBUyxJQUF0QixHQUE2QixLQUFLL0QsQ0FBQyxDQUFDK0QsR0FBUCxLQUFlL0QsQ0FBQyxDQUFDK0QsR0FBRixJQUFTLElBQXhCLENBQTdCLEVBQTRELEtBQUtqRSxDQUFDLENBQUNpRSxHQUFQLEdBQWFqRSxDQUFDLENBQUNpRSxHQUFGLElBQVMsSUFBdEIsR0FBNkIsS0FBS2pFLENBQUMsQ0FBQ2lFLEdBQVAsS0FBZWpFLENBQUMsQ0FBQ2lFLEdBQUYsSUFBUyxJQUF4QixDQUF6RixFQUF3SC9ELENBQUMsQ0FBQytELEdBQUYsR0FBUWpFLENBQUMsQ0FBQ2lFLEdBQS9JLEtBQXVKL1AsRUFBRSxDQUFDaUcsR0FBSCxDQUFPK1AsT0FBUCxHQUFpQixLQUF4SyxDQURKO0FBRUg7QUF6OEZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDot5Hlvpflv6vmuLjmiI/pgLvovpFcclxuICovXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcGJfQ2FyZHM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYl9DYXJkTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5fUm9iTGFuZGxvYWQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3RoZXJPbmVMOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG90aGVyVHdvUjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYl9UaW1lcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGJfTGFuZGxvYWRzQ2FyZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGJfTG93ZXI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuX0NhbGxMYW5kbG9hZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYW5kbG9hZHNDYXJkczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZ0F1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWxsVGlwczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGFuZGxvYWRzTG9nbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuX091dENhcmQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuX2FnYWluOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhcmRBdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkdWlaaUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJhb0ppbmdBdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidVlhb0F1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNodVRpYW5BdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGppYW9EaVpodUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVKaWFvQXVkaW86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBxaWFuZ0F1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVRaWFuZ0F1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FyZFR5cGVBdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYVBhaUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2h1WWluZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzYW5HZUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbGxNZXNzYWdlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaWxsQmc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZVhpYW86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FyZFR5cGVUZXh0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlWGlhb0F1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYW5nZUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvdGFnb25pc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuX1N0YXJ0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbV9NZXNzYWdlQm94OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJnVHU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9wU2V0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhaVhpbmc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2NrZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9ja2V0Qm9vbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBleGl0UmVhZHk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXhpdEJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbG9zZURvb3JMYmw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGJwTGJsOiBjYy5MYWJlbCxcclxuICAgICAgICBmaXJzdE91dENhcmQ6IDEsXHJcbiAgICAgICAgZGlzdGFuY2VDYXJkOiA1MCxcclxuICAgICAgICBzbWFsbERpc3RhbmNlQ2FyZDogNDAsXHJcbiAgICAgICAgaW5pdFk6IC0yMjAsXHJcbiAgICAgICAgbW92ZWRZOiAtMjAwLFxyXG4gICAgICAgIGZpbmlzaFk6IC01MCxcclxuICAgICAgICBwZWFrOiAxMCxcclxuICAgICAgICB0aXBzQ291bnQ6IDAsXHJcbiAgICAgICAgdHVvR3VhbjogZmFsc2UsXHJcbiAgICAgICAgZ2FtZUZpbmlzaDogdHJ1ZSxcclxuICAgICAgICBxaWFuZ0RpWmh1OiBmYWxzZVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmFsbG93VGlwcyA9IGZhbHNlO1xyXG4gICAgICAgIC8v546p5a625omL5Lit55qE54mMXHJcbiAgICAgICAgdGhpcy5wbGF5ZXJDYXJkcyA9IFtdO1xyXG4gICAgICAgIC8v6YCJ5Lit55qE54mMXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcmQgPSBbXTtcclxuICAgICAgICB0aGlzLkNhcmRzTnVtID0gW107XHJcbiAgICAgICAgdGhpcy5yZWN5Y2xpbmcgPSBbXHJcbiAgICAgICAgICAgIFtudWxsXSxcclxuICAgICAgICAgICAgW251bGxdLFxyXG4gICAgICAgICAgICBbbnVsbF1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMub3RoZXJDYXJkQXJyID0gW107XHJcbiAgICAgICAgdGhpcy5taW5nUGFpQXJyYXkgPSBbXHJcbiAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICBbXSxcclxuICAgICAgICAgICAgW11cclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuY2FyZHNHcm91cCA9IFtcclxuICAgICAgICAgICAgW10sXHJcbiAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICBbXSxcclxuICAgICAgICAgICAgW10sXHJcbiAgICAgICAgICAgIFtdXHJcbiAgICAgICAgXTtcclxuICAgICAgICAvL+aPkOekuuWHuueahOeJjFxyXG4gICAgICAgIHRoaXMudGlwc0NhcmRzQXJyID0gW107XHJcbiAgICAgICAgdGhpcy50ZW1wUGxheWVySWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hvbmdMaWFuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbGxQbGF5ZXJUaXBzU3RhdGUgPSBbXHJcbiAgICAgICAgICAgIFtudWxsXSxcclxuICAgICAgICAgICAgW251bGxdLFxyXG4gICAgICAgICAgICBbbnVsbF1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuYnRuUGxheWVyU3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmV0V29yayA9IG51bGw7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAzOyBpIDwgMTY7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRzTnVtLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FyZHNOdW0uc3BsaWNlKHRoaXMuQ2FyZHNOdW0ubGVuZ3RoIC0gMiwgMCwgMSwgMik7XHJcblxyXG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY2FyZHNMaXN0ID0gW1xyXG4gICAgICAgICAgICAvL+Wwj+eOi1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDE0LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+Wkp+eOi1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDE1LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahg0FcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahgzJcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAyLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahgzNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahgzRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA0LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahgzVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA1LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahg1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDYsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v6buR5qGDN1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDcsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v6buR5qGDOFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDgsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v6buR5qGDOVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v6buR5qGDMTBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/pu5HmoYNKXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMTEsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v6buR5qGDUVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDEyLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahg0tcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYNBXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYMyXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMixcclxuICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYMzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYM0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogNCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYM1XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogNSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA2LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+e6ouahgzdcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA3LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+e6ouahgzhcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA4LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+e6ouahgzlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA5LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+e6ouahgzEwXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMTAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v57qi5qGDSlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDExLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+e6ouahg1FcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxMixcclxuICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYNLXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMTMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxQVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDEsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxMlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxM1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxNFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxNVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogNixcclxuICAgICAgICAgICAgICAgIHR5cGU6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mooXoirE3XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogNyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mooXoirE4XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogOCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mooXoirE5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogOSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mooXoirExMFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDEwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aiheiKsUpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxMSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mooXoirFRXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxS1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDEzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJh0FcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJhzJcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAyLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJhzNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJhzRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA0LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJhzVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA1LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJh1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDYsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5pa554mHN1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDcsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5pa554mHOFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDgsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5pa554mHOVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5pa554mHMTBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mlrnniYdKXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMTEsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5pa554mHUVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDEyLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJh0tcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdO1xyXG5cclxuXHJcbiAgICAgICAgLy/mjpLluo/lupXniYxcclxuICAgICAgICB0aGlzLmNhcmRzQXJyYXkgPSB0aGlzLmNhcmRzTGlzdC5zb3J0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDEgKiBNYXRoLnJhbmRvbSgpIC0gLjU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v5q+P5Lq65LiK5p2l5Y+RMTflvKDniYxcclxuICAgICAgICB0aGlzLmNhcmRzQXJyYXkgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWw6IDEyLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWw6IDEyLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWw6IDEyLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDNcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWw6IDEyLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsOiAxMixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsOiAxMixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsOiAxMixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsOiAxMixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiA0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgdGhpcy5jYXJkc0FycmF5ID0gdGhpcy5jYXJkc0FycmF5LnNwbGljZSgwLCAxNik7XHJcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgaWYgKCEhd2luZG93LnJlY29ubmVjdFBvaW50KSB7XHJcbiAgICAgICAgICAgIGNjLmxvZygn5pat57q/6YeN6L+e5byA5aeL5ri45oiPJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX1N0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmV4aXRCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZWNvbm5lY3RQb2ludCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuc3RhcnRHYW1lRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSW5pdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmFsbFRpcHNbMV0uZ2V0Q2hpbGRCeU5hbWUoXCJkZW5nZGFpXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZVSVxyXG4gICAgICovXHJcbiAgICBpbml0VUkoKSB7XHJcbiAgICAgICAgY2Mudmlldy5zZXRPcmllbnRhdGlvbihjYy5tYWNyby5PUklFTlRBVElPTl9MQU5EU0NBUEUpO1xyXG4gICAgICAgIGlmIChjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyAxMzM0IDwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCAvIDc1MCkge1xyXG4gICAgICAgICAgICB0aGlzLmJpTGkgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyAxMzM0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmlMaSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyA3NTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5iaUxpID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmJnVHUud2lkdGggPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggKyAzMDtcclxuICAgICAgICAgICAgdGhpcy5iZ1R1LmhlaWdodCA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgKyAzMDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5iaUxpID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJnVHUud2lkdGggPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyB0aGlzLmJpTGkgKyAzMDtcclxuICAgICAgICAgICAgdGhpcy5iZ1R1LmhlaWdodCA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyB0aGlzLmJpTGkgKyAzMDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gdGhpcy5iaUxpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRvcFNldC5zZXRQb3NpdGlvbihjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyAyIC8gdGhpcy5iaUxpLCBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gMiAvIHRoaXMuYmlMaSAtIHRoaXMudG9wU2V0LmhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgICAvL+iuvue9ruS4ieW8oOW6leeJjOS9jee9rlxyXG4gICAgICAgIHRoaXMubGFuZGxvYWRzQ2FyZHMuc2V0UG9zaXRpb24oLTY4LCBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gMiAvIHRoaXMuYmlMaSAtIHRoaXMubGFuZGxvYWRzQ2FyZHMuaGVpZ2h0IC8gMiAqIHRoaXMubGFuZGxvYWRzQ2FyZHMuc2NhbGUgLSAyMCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmxhY2tGYWNlXCIpLnNldENvbnRlbnRTaXplKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIHRoaXMuYmlMaSwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCAvIHRoaXMuYmlMaSk7XHJcbiAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImJsYWNrRmFjZVwiKS5zZXRDb250ZW50U2l6ZShjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyB0aGlzLmJpTGksIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyB0aGlzLmJpTGkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInR1b0d1YW5DYW5jZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzbWFsbEJsYWNrXCIpLnNldENvbnRlbnRTaXplKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIHRoaXMuYmlMaSwgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidHVvR3VhbkNhbmNlbFwiKS5nZXRDaGlsZEJ5TmFtZShcInNtYWxsQmxhY2tcIikuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpO1xyXG5cclxuICAgICAgICBjYy52aWV3LnNldFJlc2l6ZUNhbGxiYWNrKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIDEzMzQgPCBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gNzUwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpTGkgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyAxMzM0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaUxpID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCAvIDc1MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5iaUxpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZ1R1LndpZHRoID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLndpZHRoICsgMzA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJnVHUuaGVpZ2h0ID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCArIDMwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlMaSA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJnVHUud2lkdGggPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyB0aGlzLmJpTGkgKyAzMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmdUdS5oZWlnaHQgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gdGhpcy5iaUxpICsgMzA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSB0aGlzLmJpTGk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudG9wU2V0LnNldFBvc2l0aW9uKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIDIgLyB0aGlzLmJpTGksIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyAyIC8gdGhpcy5iaUxpIC0gdGhpcy50b3BTZXQuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIC8v6K6+572u5LiJ5byg5bqV54mM5L2N572uXHJcbiAgICAgICAgICAgIHRoaXMubGFuZGxvYWRzQ2FyZHMuc2V0UG9zaXRpb24oLTY4LCBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gMiAvIHRoaXMuYmlMaSAtIHRoaXMubGFuZGxvYWRzQ2FyZHMuaGVpZ2h0IC8gMiAqIHRoaXMubGFuZGxvYWRzQ2FyZHMuc2NhbGUgLSAyMCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJsYWNrRmFjZVwiKS5zZXRDb250ZW50U2l6ZShjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyB0aGlzLmJpTGksIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyB0aGlzLmJpTGkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiYmxhY2tGYWNlXCIpLnNldENvbnRlbnRTaXplKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIHRoaXMuYmlMaSwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCAvIHRoaXMuYmlMaSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInR1b0d1YW5DYW5jZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzbWFsbEJsYWNrXCIpLnNldENvbnRlbnRTaXplKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIHRoaXMuYmlMaSwgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidHVvR3VhbkNhbmNlbFwiKS5nZXRDaGlsZEJ5TmFtZShcInNtYWxsQmxhY2tcIikuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucEluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0V29yayA9IHJlcXVpcmUoXCJSdW5pbmdOZXRXb3JrXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLnNldHJ1bmluZ09ial9GdW5jdGlvbih0aGlzKTtcclxuICAgICAgICB0aGlzLnBJbmZvLnNldEdhbWVPYmpfRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgSGVscGVyLmxvYWRIZWFkKHRoaXMucEluZm8ucGxheWVySGVhZElkLCBzcCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncGxheWVyJykuZ2V0Q29tcG9uZW50KFwiY2MuU3ByaXRlXCIpLnNwcml0ZUZyYW1lID0gc3A7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wYl9Mb3dlci5nZXRDaGlsZEJ5TmFtZShcImdvbGRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbnRlZ3JhbFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBwYXJzZUZsb2F0KHRoaXMucEluZm8ucGxheWVyQ29pbikudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiaGVhZFwiKS5nZXRDaGlsZEJ5TmFtZShcIm5pQ2hlbmdcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gdGhpcy5wSW5mby5wbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0cyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnBJbmZvLm11c2ljQ29udHJvbCkge1xyXG4gICAgICAgICAgICB0aGlzLmJnTXVzaWMgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYmdBdWRpbywgdHJ1ZSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlua4uOaIj1xyXG4gICAgICovXHJcbiAgICBnYW1lSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuZGlzY29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yb29tQmV0ID0gdGhpcy5uZXRXb3JrLnJvb21CZXQ7XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLmdhbWVFeGl0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJZCA9IHRoaXMucEluZm8ucGxheWVySWQ7XHJcbiAgICAgICAgLy/njqnlrrbliJfooahcclxuICAgICAgICB0aGlzLnBsYXllckFyciA9IFtudWxsLCB0aGlzLnBJbmZvLnBsYXllcklkLCBudWxsXTtcclxuICAgICAgICAvL+aJkeWFi+aVsOmHj1xyXG4gICAgICAgIHZhciBjYXJkTGVuZ3RoID0gNTQ7XHJcbiAgICAgICAgLy/ljaHniYzlr7nosaHmsaBcclxuICAgICAgICB0aGlzLmNhcmRzUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbChcIlJ1bkNhcmRzXCIpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FyZExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjYXJkID0gY2MuaW5zdGFudGlhdGUodGhpcy5wYl9DYXJkcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZHNQb29sLnB1dChjYXJkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDph43nva7lupXliIZcclxuICAgICAqIEBwYXJhbSB7Kn0gc2NvcmUgXHJcbiAgICAgKi9cclxuICAgIHJlc2V0REYoc2NvcmUpIHtcclxuICAgICAgICB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiZGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21TY29yZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAoc2NvcmUgLyB0aGlzLnBJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7njqnlrrbkv6Hmga9cclxuICAgICAqIEBwYXJhbSB7Kn0gbmlja25hbWUgXHJcbiAgICAgKiBAcGFyYW0geyp9IHNjb3JlIFxyXG4gICAgICogQHBhcmFtIHsqfSBzZWF0SWQgXHJcbiAgICAgKiBAcGFyYW0geyp9IHVzZXJJZCBcclxuICAgICAqL1xyXG4gICAgc2V0TXlTZWF0KG5pY2tuYW1lLCBzY29yZSwgc2VhdElkLCB1c2VySWQpIHtcclxuICAgICAgICB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiaGVhZFwiKS5nZXRDaGlsZEJ5TmFtZShcIm5pQ2hlbmdcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gbmlja25hbWU7XHJcbiAgICAgICAgdGhpcy5wYl9Mb3dlci5nZXRDaGlsZEJ5TmFtZShcImdvbGRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbnRlZ3JhbFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAoc2NvcmUgLyB0aGlzLnBJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ljaHniYzmlbDph49cclxuICAgICAqIEBwYXJhbSB7Kn0gdXNlcklkIFxyXG4gICAgICogQHBhcmFtIHsqfSBjYXJjZF9sZW5ndGggXHJcbiAgICAgKi9cclxuICAgIHNldENhcmRMZW5ndGgodXNlcklkLCBjYXJjZF9sZW5ndGgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckFycltpXSA9PSB1c2VySWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyT25lTC5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBjYXJjZF9sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3RoZXJUd29SLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRzTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IGNhcmNkX2xlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOi/m+WFpeaIv+mXtCAg5bqn5L2N5Y+35o6S5bqPXHJcbiAgICAgKiBAcGFyYW0geyp9IG5pY2tuYW1lIFxyXG4gICAgICogQHBhcmFtIHsqfSBzY29yZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VhdElkIFxyXG4gICAgICogQHBhcmFtIHsqfSB1c2VySWQgXHJcbiAgICAgKi9cclxuICAgIG90aGVyRW50ZXJSb29tKG5pY2tuYW1lLCBzY29yZSwgc2VhdElkLCB1c2VySWQsIHVzckhlYWQpIHtcclxuICAgICAgICBjYy5sb2coJ+WFtuWug+eOqeWutui/m+WFpeaIv+mXtDonICsgc2VhdElkKTtcclxuICAgICAgICBsZXQgc2VhdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMubmV0V29yay5zZWF0SWQgPT0gMCAmJiBzZWF0SWQgPT0gMSkge1xyXG4gICAgICAgICAgICBzZWF0ID0gdGhpcy5vdGhlclR3b1I7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQXJyWzJdID0gdXNlcklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXRXb3JrLnNlYXRJZCA9PSAwICYmIHNlYXRJZCA9PSAyKSB7XHJcbiAgICAgICAgICAgIHNlYXQgPSB0aGlzLm90aGVyT25lTDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBcnJbMF0gPSB1c2VySWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5ldFdvcmsuc2VhdElkID09IDEgJiYgc2VhdElkID09IDApIHtcclxuICAgICAgICAgICAgc2VhdCA9IHRoaXMub3RoZXJPbmVMO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckFyclswXSA9IHVzZXJJZDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV0V29yay5zZWF0SWQgPT0gMSAmJiBzZWF0SWQgPT0gMikge1xyXG4gICAgICAgICAgICBzZWF0ID0gdGhpcy5vdGhlclR3b1I7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQXJyWzJdID0gdXNlcklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXRXb3JrLnNlYXRJZCA9PSAyICYmIHNlYXRJZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHNlYXQgPSB0aGlzLm90aGVyT25lTDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBcnJbMF0gPSB1c2VySWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5ldFdvcmsuc2VhdElkID09IDIgJiYgc2VhdElkID09IDApIHtcclxuICAgICAgICAgICAgc2VhdCA9IHRoaXMub3RoZXJUd29SO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckFyclsyXSA9IHVzZXJJZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlYXQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzZWF0LmdldENoaWxkQnlOYW1lKFwiYmdfbmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcIlNjb3JlXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IChzY29yZSAvIHRoaXMucEluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHNlYXQuZ2V0Q2hpbGRCeU5hbWUoXCJiZ19uYW1lXCIpLmdldENoaWxkQnlOYW1lKFwibmlDaGVuZ1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBuaWNrbmFtZTtcclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQodXNySGVhZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICBzZWF0LmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOemu+W8gOaIv+mXtFxyXG4gICAgICogQHBhcmFtIHsqfSB1c2VySWQgXHJcbiAgICAgKi9cclxuICAgIHBsYXllck91dFJvb20odXNlcklkKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJBcnJbaV0gPT0gdXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdGhlck9uZUwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3RoZXJUd29SLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYW5kbG9hZHNMb2dvW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pat5byA6L+e5o6lXHJcbiAgICAgKi9cclxuICAgIGRpc2Nvbm5lY3ROZXRXb3JrX0Z1bmN0aW9uKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0V29yay5MYW5kbG9yZHNTb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuTGFuZGxvcmRzU29ja2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBJbmZvLmdhbWVEaXNjb25uZWN0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImxiX1RpcHNcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCLmgqjlt7Lmlq3nur/vvIzor7fph43mlrDnmbvlvZVcIjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43mlrDov57mjqVcclxuICAgICAqIEBwYXJhbSB7Kn0gdXNlcklkIFxyXG4gICAgICogQHBhcmFtIHsqfSBkb3VibGUgXHJcbiAgICAgKi9cclxuICAgIHJlc2V0TGFuZGxvcmRzKHVzZXJJZCwgZG91YmxlKSB7XHJcbiAgICAgICAgdGhpcy5xaWFuZ0RpWmh1ID0gZmFsc2U7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJBcnJbaV0gPT0gdXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXRXb3JrLnBsYXllcklkID09IHVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFuZGxvYWRzTG9nb1sxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1sxXS5pc0xhbmRsb3JkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiYmVpXCIpLmdldENoaWxkQnlOYW1lKFwiYmV0XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IGRvdWJsZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYW5kbG9hZHNMb2dvW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzW2ldLmlzTGFuZGxvcmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGJfTG93ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJiZWlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gZG91YmxlIC8gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGVtcFBsYXllcnNMaXN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMudGVtcFBsYXllcnNMaXN0c1tpXS5zdGF0ZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGVtcFBsYXllcnNMaXN0c1tpXS5zdGF0ZVtqXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzW2ldLnN0YXRlW2pdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1tpXS5zdGF0ZSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj6vlnLDkuLvvvIzmiqLlnLDkuLtcclxuICAgICAqIEBwYXJhbSB7Kn0gc2Vjb25kIFxyXG4gICAgICovXHJcbiAgICBjYWxsTGFuZGxvYWRzKHNlY29uZCkge1xyXG4gICAgICAgIHRoaXMuYnRuX0NhbGxMYW5kbG9hZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYnRuUGxheWVyU3RhdGUgPSB0aGlzLmJ0bl9DYWxsTGFuZGxvYWQ7XHJcbiAgICAgICAgdGhpcy50aW1lcigxLCBzZWNvbmQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFrOWFseeJjCwg5LiJ5byg5bqV54mMXHJcbiAgICAgKiBAcGFyYW0geyp9IGNhcmRzIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWNDYXJkKGNhcmRzKSB7XHJcbiAgICAgICAgaWYgKCEhIWNhcmRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MubG9nKFwi5YWs5YWx54mMXCIsIGNhcmRzKTtcclxuICAgICAgICB0aGlzLmxhbmRsb2Fkc0NhcmRzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy/lr7nlupXniYzov5vooYzlr7nmr5TmjpLluo9cclxuICAgICAgICBjYXJkcy5zb3J0KGZ1bmN0aW9uIChjYXJkQSwgY2FyZEIpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoY2FyZEEudmFsID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRBLnZhbCArPSAxMi4xO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNhcmRBLnZhbCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkQS52YWwgKz0gMTEuMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNhcmRCLnZhbCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkQi52YWwgKz0gMTIuMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYXJkQi52YWwgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgY2FyZEIudmFsICs9IDExLjI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYXJkQS52YWwgPT0gY2FyZEIudmFsKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGNhcmRCLnR5cGUgLSBjYXJkQS50eXBlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjYXJkQi52YWwgLSBjYXJkQS52YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYl9MYW5kbG9hZHNDYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkc1tpXS52YWwgPT0gMTMuMSkge1xyXG4gICAgICAgICAgICAgICAgY2FyZHNbaV0udmFsID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYXJkc1tpXS52YWwgPT0gMTMuMikge1xyXG4gICAgICAgICAgICAgICAgY2FyZHNbaV0udmFsID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBiX0xhbmRsb2Fkc0NhcmRbaV0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikuY2FyZHNDcmVhdGUoY2FyZHNbaV0udmFsLCBjYXJkc1tpXS50eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZyH5bGP5pWI5p6cXHJcbiAgICAgKi9cclxuICAgIHNoYWNraW5nKCkge1xyXG4gICAgICAgIHRoaXMuYmdUdS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHZhciBiZ1R1QWN0aW9uID0gY2MucmVwZWF0KGNjLnNlcXVlbmNlKGNjLm1vdmVUbyguMDUsIGNjLnYyKDE1LCAxNSkpLCBjYy5tb3ZlVG8oLjEsIGNjLnYyKC0xNSwgLTE1KSksIGNjLm1vdmVUbyguMDUsIGNjLnYyKDE1LCAwKSksIGNjLm1vdmVUbyguMDUsIGNjLnYyKC0xNSwgMCkpLCBjYy5tb3ZlVG8oLjEsIGNjLnYyKDAsIC0xNSkpLCBjYy5tb3ZlVG8oLjA1LCBjYy52MigwLCAwKSkpLCAxKTtcclxuICAgICAgICB0aGlzLmJnVHUucnVuQWN0aW9uKGJnVHVBY3Rpb24pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja0xhbmRsb3JkcyhlLCB0LCBpKSB7XHJcbiAgICAgICAgdGhpcy5sYW5kbG9hZHNDYXJkcy5hY3RpdmUgPSB0cnVlLFxyXG4gICAgICAgICAgICB0aGlzLnFpYW5nRGlaaHUgPSBmYWxzZSxcclxuICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVySWQgPSBudWxsLFxyXG4gICAgICAgICAgICB0LnNvcnQoZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxID09IGUudmFsID8gZS52YWwgKz0gMTIuMSA6IDIgPT0gZS52YWwgJiYgKGUudmFsICs9IDExLjIpLFxyXG4gICAgICAgICAgICAgICAgICAgIDEgPT0gdC52YWwgPyB0LnZhbCArPSAxMi4xIDogMiA9PSB0LnZhbCAmJiAodC52YWwgKz0gMTEuMiksXHJcbiAgICAgICAgICAgICAgICAgICAgZS52YWwgPT0gdC52YWwgPyB0LnR5cGUgLSBlLnR5cGUgOiB0LnZhbCAtIGUudmFsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdGhpcy5wYl9MYW5kbG9hZHNDYXJkLmxlbmd0aDsgbisrKSAxMy4xID09IHRbbl0udmFsID8gdFtuXS52YWwgPSAxIDogMTMuMiA9PSB0W25dLnZhbCAmJiAodFtuXS52YWwgPSAyKSxcclxuICAgICAgICAgICAgdGhpcy5wYl9MYW5kbG9hZHNDYXJkW25dLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLmNhcmRzQ3JlYXRlKHRbbl0udmFsLCB0W25dLnR5cGUpO1xyXG4gICAgICAgIGlmIChlID09IHRoaXMubmV0V29yay5wbGF5ZXJJZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhbmRsb2Fkc0xvZ29bMV0uYWN0aXZlID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1sxXS5pc0xhbmRsb3JkID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRoaXMub3RoZXJPbmVMLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRzTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IDE2LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vdGhlclR3b1IuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gMTY7XHJcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdC5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG87XHJcbiAgICAgICAgICAgICAgICBvID0gdGhpcy5jYXJkc1Bvb2wuc2l6ZSgpID4gMCA/IHRoaXMuY2FyZHNQb29sLmdldCgpIDogY2MuaW5zdGFudGlhdGUodGhpcy5wYl9DYXJkcyksXHJcbiAgICAgICAgICAgICAgICAgICAgby5zY2FsZSA9IDEuMixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKG8sIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIG8uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikuY2FyZHNDcmVhdGUodFtuXS52YWwsIHRbbl0udHlwZSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkcy5wdXNoKG8pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkcy5zb3J0KGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgPT0gdC5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgPyB0LmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnR5cGUgLSBlLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnR5cGUgOiB0LmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCAtIGUuZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudmFsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBuID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBhID0gbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBzID0gbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBjID0gbnVsbDsgbiA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyBuKyspXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJDYXJkc1tuXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgPiAxMykgYSA9IG47XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICgyID09IHRoaXMucGxheWVyQ2FyZHNbbl0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudmFsIHx8IDEgPT0gdGhpcy5wbGF5ZXJDYXJkc1tuXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwpIHtcclxuICAgICAgICAgICAgICAgIHMgPSBuO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobnVsbCA9PSBhICYmIG51bGwgIT0gcykge1xyXG4gICAgICAgICAgICAgICAgYyA9IHRoaXMucGxheWVyQ2FyZHMuc3BsaWNlKG4sIHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IGMubGVuZ3RoOyByKyspIHRoaXMucGxheWVyQ2FyZHMuc3BsaWNlKHIsIDAsIGNbcl0pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVsbCAhPSBhICYmIG51bGwgIT0gcykge1xyXG4gICAgICAgICAgICAgICAgYyA9IHRoaXMucGxheWVyQ2FyZHMuc3BsaWNlKG4sIHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IGMubGVuZ3RoOyByKyspIHRoaXMucGxheWVyQ2FyZHMuc3BsaWNlKGEgKyByICsgMSwgMCwgY1tyXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiYmVpXCIpLmdldENoaWxkQnlOYW1lKFwiYmV0XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IGksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Q2FyZExvY2F0KCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0T3V0Q2FyZCA9IDAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gMlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdGhpcy5wbGF5ZXJBcnIubGVuZ3RoOyBuKyspIHRoaXMucGxheWVyQXJyW25dID09IGUgJiYgMCA9PSBuID8gKHRoaXMubGFuZGxvYWRzTG9nb1tuXS5hY3RpdmUgPSB0cnVlLCB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbbl0uaXNMYW5kbG9yZCA9IHRydWUsIHRoaXMub3RoZXJPbmVMLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRzTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IDIwLCB0aGlzLm90aGVyVHdvUi5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAxNikgOiB0aGlzLnBsYXllckFycltuXSA9PSBlICYmIDIgPT0gbiAmJiAodGhpcy5sYW5kbG9hZHNMb2dvW25dLmFjdGl2ZSA9IHRydWUsIHRoaXMudGVtcFBsYXllcnNMaXN0c1tuXS5pc0xhbmRsb3JkID0gdHJ1ZSwgdGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gMTYsIHRoaXMub3RoZXJUd29SLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRzTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IDIwKTtcclxuICAgICAgICAgICAgdGhpcy5wYl9Mb3dlci5nZXRDaGlsZEJ5TmFtZShcImJlaVwiKS5nZXRDaGlsZEJ5TmFtZShcImJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBpIC8gMlxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCLmo4DmtYvlnLDkuLtcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBlID0gMDsgZSA8IHRoaXMudGVtcFBsYXllcnNMaXN0cy5sZW5ndGg7IGUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdGhpcy50ZW1wUGxheWVyc0xpc3RzW2VdLnN0YXRlLmxlbmd0aDsgdCsrKSBudWxsICE9IHRoaXMudGVtcFBsYXllcnNMaXN0c1tlXS5zdGF0ZVt0XSAmJiAodGhpcy50ZW1wUGxheWVyc0xpc3RzW2VdLnN0YXRlW3RdLmFjdGl2ZSA9IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbZV0uc3RhdGUgPSBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAxKVxyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5ZXJOb3dTdGF0ZShlLCB0LCBpLCBuKSB7XHJcbiAgICAgICAgY2MubG9nKFwi546p5a6254q25oCBXCIsIGUsIHQpLFxyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbFRpbWVyKCksXHJcbiAgICAgICAgICAgIG51bGwgIT0gbiAmJiB0aGlzLmxhbmRsb2Fkc0xvZ29bMV0uYWN0aXZlID09IHRydWUgPyB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiYmVpXCIpLmdldENoaWxkQnlOYW1lKFwiYmV0XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IG4gOiBudWxsICE9IG4gJiYgdGhpcy5sYW5kbG9hZHNMb2dvWzFdLmFjdGl2ZSA9PSBmYWxzZSAmJiAodGhpcy5wYl9Mb3dlci5nZXRDaGlsZEJ5TmFtZShcImJlaVwiKS5nZXRDaGlsZEJ5TmFtZShcImJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBuIC8gMik7XHJcbiAgICAgICAgZm9yICh2YXIgbyA9IC0xLFxyXG4gICAgICAgICAgICAgICAgYSA9IDA7IGEgPCB0aGlzLnBsYXllckFyci5sZW5ndGg7IGErKylcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQXJyW2FdID09IGUpIHtcclxuICAgICAgICAgICAgICAgIG8gPSBhO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoMSA9PSBvICYmIG51bGwgIT0gdGhpcy5idG5QbGF5ZXJTdGF0ZSAmJiAodGhpcy5idG5QbGF5ZXJTdGF0ZS5hY3RpdmUgPSBmYWxzZSksIHQpIHtcclxuICAgICAgICAgICAgY2FzZSBcIuWPq+WcsOS4u1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxUaXBzW29dLmdldENoaWxkQnlOYW1lKFwiQ2FsbC10aGUtbGFuZGxvcmRcIikuYWN0aXZlID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuamlhb0RpWmh1QXVkaW8sIGZhbHNlLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbFBsYXllclRpcHNTdGF0ZVtvXSA9IHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcIkNhbGwtdGhlLWxhbmRsb3JkXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLkuI3lj6tcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcIkRvbid0LWNhbGxcIikuYWN0aXZlID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYnVKaWFvQXVkaW8sIGZhbHNlLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbFBsYXllclRpcHNTdGF0ZVtvXSA9IHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcIkRvbid0LWNhbGxcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIuS4jeaKolwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxUaXBzW29dLmdldENoaWxkQnlOYW1lKFwiRG9uJ3QtZ3JhYlwiKS5hY3RpdmUgPSB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5idVFpYW5nQXVkaW8sIGZhbHNlLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbFBsYXllclRpcHNTdGF0ZVtvXSA9IHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcIkRvbid0LWdyYWJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIuS4jeWKoOWAjVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxUaXBzW29dLmdldENoaWxkQnlOYW1lKFwiTm8tZG91YmxpbmdcIikuYWN0aXZlID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbFBsYXllclRpcHNTdGF0ZVtvXSA9IHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcIk5vLWRvdWJsaW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLkuI3lh7pcIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFsbFRpcHNbb10uZ2V0Q2hpbGRCeU5hbWUoXCJOb1wiKS5hY3RpdmUgPSB0cnVlLCB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYnVZYW9BdWRpb1tNYXRoLmZsb29yKDMgKiBNYXRoLnJhbmRvbSgpKV0sIGZhbHNlLCAxKSwgMSA9PSBvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCB0aGlzLnBsYXllckNhcmRzLmxlbmd0aDsgYSsrKSB0aGlzLnBsYXllckNhcmRzW2FdLnBvc2l0aW9uLnkgPT0gdGhpcy5tb3ZlZFkgJiYgdGhpcy5wbGF5ZXJDYXJkc1thXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS5tb3ZlQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJkID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbFBsYXllclRpcHNTdGF0ZVtvXSA9IHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcIk5vXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLmiqLlnLDkuLtcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcIlJvYi1sYW5kbG9yZHNcIikuYWN0aXZlID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMucWlhbmdBdWRpbywgZmFsc2UsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsUGxheWVyVGlwc1N0YXRlW29dID0gdGhpcy5hbGxUaXBzW29dLmdldENoaWxkQnlOYW1lKFwiUm9iLWxhbmRsb3Jkc1wiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi5Yqg5YCNXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbFRpcHNbb10uZ2V0Q2hpbGRCeU5hbWUoXCJkb3VibGVcIikuYWN0aXZlID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbFBsYXllclRpcHNTdGF0ZVtvXSA9IHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcImRvdWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi5Y2V54mMXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY2FyZEF1ZGlvW2lbMF0udmFsIC0gMV0sIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi5a+55a2QXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuZHVpWmlBdWRpb1tpWzBdLnZhbCAtIDFdLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIumhuuWtkFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmNhcmRUeXBlQXVkaW9bNF0sIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIHZhciBzID0gY2MuaW5zdGFudGlhdGUodGhpcy5wYWlYaW5nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQocywgMTAxKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY3ljbGluZ1tvXS5sZW5ndGggPCB0aGlzLnBlYWsgPyBzLnNldFBvc2l0aW9uKCh0aGlzLnJlY3ljbGluZ1tvXVswXS5wb3NpdGlvbi54ICsgdGhpcy5yZWN5Y2xpbmdbb11bdGhpcy5yZWN5Y2xpbmdbb10ubGVuZ3RoIC0gMV0ucG9zaXRpb24ueCArIHRoaXMucmVjeWNsaW5nW29dWzBdLndpZHRoICogdGhpcy5yZWN5Y2xpbmdbb11bMF0uc2NhbGUpIC8gMiwgdGhpcy5yZWN5Y2xpbmdbb11bMF0ucG9zaXRpb24ueSkgOiBzLnNldFBvc2l0aW9uKCh0aGlzLnJlY3ljbGluZ1tvXVswXS5wb3NpdGlvbi54ICsgdGhpcy5yZWN5Y2xpbmdbb11bdGhpcy5wZWFrXS5wb3NpdGlvbi54ICsgdGhpcy5yZWN5Y2xpbmdbb11bMF0ud2lkdGggKiB0aGlzLnJlY3ljbGluZ1tvXVswXS5zY2FsZSkgLyAyLCB0aGlzLnJlY3ljbGluZ1tvXVswXS5wb3NpdGlvbi55KSxcclxuICAgICAgICAgICAgICAgICAgICBzLmdldENvbXBvbmVudChcImRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheVwiKS5hcm1hdHVyZSgpLmFuaW1hdGlvbi5wbGF5KFwic2h1bnppXCIsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLkuInpobpcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmIChjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY2FyZFR5cGVBdWRpb1swXSwgZmFsc2UsIDEpLCBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMudGVYaWFvQXVkaW9bMV0sIGZhbHNlLCAxKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2FyZFR5cGVUZXh0WzBdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQoYywgMTAxKSxcclxuICAgICAgICAgICAgICAgICAgICBjLnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoLjUpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnJ1bkFjdGlvbihlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAxKTtcclxuICAgICAgICAgICAgICAgIHZhciByID0gY2MuaW5zdGFudGlhdGUodGhpcy50ZVhpYW9bMF0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYl9DYXJkTm9kZS5hZGRDaGlsZChyLCAxMDApLFxyXG4gICAgICAgICAgICAgICAgICAgIHIuc2V0UG9zaXRpb24oY2MudjIoODY3IC8gdGhpcy5iaUxpLCAwKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbCA9IGNjLnNlcXVlbmNlKGNjLm1vdmVUbygxLCBjYy52MigtODY3IC8gdGhpcy5iaUxpLCAwKSksIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgci5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHIucnVuQWN0aW9uKGwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLov57lr7lcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmIChjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY2FyZFR5cGVBdWRpb1sxXSwgZmFsc2UsIDEpLCBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY2hhbmdlQXVkaW8sIGZhbHNlLCAxKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcyA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGFpWGluZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKHMsIDEwMSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWN5Y2xpbmdbb10ubGVuZ3RoIDwgdGhpcy5wZWFrID8gcy5zZXRQb3NpdGlvbigodGhpcy5yZWN5Y2xpbmdbb11bMF0ucG9zaXRpb24ueCArIHRoaXMucmVjeWNsaW5nW29dW3RoaXMucmVjeWNsaW5nW29dLmxlbmd0aCAtIDFdLnBvc2l0aW9uLnggKyB0aGlzLnJlY3ljbGluZ1tvXVswXS53aWR0aCAqIHRoaXMucmVjeWNsaW5nW29dWzBdLnNjYWxlKSAvIDIsIHRoaXMucmVjeWNsaW5nW29dWzBdLnBvc2l0aW9uLnkpIDogcy5zZXRQb3NpdGlvbigodGhpcy5yZWN5Y2xpbmdbb11bMF0ucG9zaXRpb24ueCArIHRoaXMucmVjeWNsaW5nW29dW3RoaXMucGVha10ucG9zaXRpb24ueCArIHRoaXMucmVjeWNsaW5nW29dWzBdLndpZHRoICogdGhpcy5yZWN5Y2xpbmdbb11bMF0uc2NhbGUpIC8gMiwgdGhpcy5yZWN5Y2xpbmdbb11bMF0ucG9zaXRpb24ueSksXHJcbiAgICAgICAgICAgICAgICAgICAgcy5nZXRDb21wb25lbnQoXCJkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXlcIikuYXJtYXR1cmUoKS5hbmltYXRpb24ucGxheShcImxpYW5kdWlcIiwgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIuS4ieadoVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNhbkdlQXVkaW9baVswXS52YWwgLSAxXSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLkuInluKbkuIBcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5jYXJkVHlwZUF1ZGlvWzNdLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIuS4ieW4puS6jFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmNhcmRUeXBlQXVkaW9bMl0sIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi5Zub5bim5LqMXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiAoNiA9PSBpLmxlbmd0aCA/IGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5jYXJkVHlwZUF1ZGlvWzVdLCBmYWxzZSwgMSkgOiA4ID09IGkubGVuZ3RoICYmIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5jYXJkVHlwZUF1ZGlvWzZdLCBmYWxzZSwgMSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLpo57mnLpcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmIChjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY2FyZFR5cGVBdWRpb1swXSwgZmFsc2UsIDEpLCBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMudGVYaWFvQXVkaW9bMV0sIGZhbHNlLCAxKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2FyZFR5cGVUZXh0WzBdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQoYywgMTAxKSxcclxuICAgICAgICAgICAgICAgICAgICBjLnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoLjUpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnJ1bkFjdGlvbihlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAxKTtcclxuICAgICAgICAgICAgICAgIHZhciByID0gY2MuaW5zdGFudGlhdGUodGhpcy50ZVhpYW9bMF0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYl9DYXJkTm9kZS5hZGRDaGlsZChyLCAxMDApLFxyXG4gICAgICAgICAgICAgICAgICAgIHIuc2V0UG9zaXRpb24oY2MudjIoODY3IC8gdGhpcy5iaUxpLCAwKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbCA9IGNjLnNlcXVlbmNlKGNjLm1vdmVUbygxLCBjYy52MigtODY3IC8gdGhpcy5iaUxpLCAwKSksIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgci5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHIucnVuQWN0aW9uKGwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLngrjlvLlcIjpcclxuICAgICAgICAgICAgICAgIGlmICgwID09IG8pIHZhciBoID0gdGhpcy5vdGhlck9uZUwucG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZCA9IFtoLCBjYy52MihoLnggLyAyLCBoLnkgKyAxNTApLCBjYy52MigwLCAwKV07XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICgxID09IG8pIHZhciBoID0gdGhpcy5wcm90YWdvbmlzdC5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBkID0gW2gsIGNjLnYyKGgueCAvIDIsIGgueSArIDM1MCksIGNjLnYyKDAsIDApXTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKDIgPT0gbykgdmFyIGggPSB0aGlzLm90aGVyVHdvUi5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBkID0gW2gsIGNjLnYyKGgueCAvIDIsIGgueSArIDE1MCksIGNjLnYyKDAsIDApXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5jYXJkVHlwZUF1ZGlvWzhdLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2FyZFR5cGVUZXh0WzNdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQoYywgMTAxKSxcclxuICAgICAgICAgICAgICAgICAgICBjLnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKTtcclxuICAgICAgICAgICAgICAgIHZhciByID0gY2MuaW5zdGFudGlhdGUodGhpcy50ZVhpYW9bM10pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYl9DYXJkTm9kZS5hZGRDaGlsZChyLCAxMDApLFxyXG4gICAgICAgICAgICAgICAgICAgIHIuc2V0UG9zaXRpb24oaCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdSA9IGNjLnNwYXduKGNjLnJvdGF0ZVRvKC41LCAxODApLCBjYy5jYXJkaW5hbFNwbGluZVRvKC41LCBkLCAtLjUpKTtcclxuICAgICAgICAgICAgICAgIHIucnVuQWN0aW9uKHUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5kZXN0cm95KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnRlWGlhb0F1ZGlvWzBdLCBmYWxzZSwgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGVYaWFvWzFdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKG0sIDEwMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbS5zZXRQb3NpdGlvbihjYy52MigwLCAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oLjIsIDEuMiwgMS4yKSwgY2Muc2NhbGVUbyguMiwgMSwgMSksIGNjLmRlbGF5VGltZSgxKSwgY2MuZmFkZU91dCguMSksIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMucnVuQWN0aW9uKGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhY2tpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuNSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbS5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMS4xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi546L54K4XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY2FyZFR5cGVBdWRpb1s3XSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRlWGlhb1syXSksXHJcbiAgICAgICAgICAgICAgICAgICAgZyA9IGNjLnYyKCh0aGlzLnJlY3ljbGluZ1tvXVswXS5wb3NpdGlvbi54ICsgdGhpcy5yZWN5Y2xpbmdbb11bdGhpcy5yZWN5Y2xpbmdbb10ubGVuZ3RoIC0gMV0ucG9zaXRpb24ueCkgLyAyLCB0aGlzLnJlY3ljbGluZ1tvXVswXS5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQociwgMTAwKSxcclxuICAgICAgICAgICAgICAgICAgICByLnNldFBvc2l0aW9uKGcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC40KTtcclxuICAgICAgICAgICAgICAgIHZhciBwID0gY2Muc2VxdWVuY2UoY2MubW92ZVRvKC40LCBjYy52MigwLCA3MzUgLyB0aGlzLmJpTGkpKSwgY2Mucm90YXRlVG8oMCwgMTgwKSwgY2MubW92ZVRvKC4yLCBjYy52MigwLCAwKSksIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlID0gY2MuaW5zdGFudGlhdGUodGhpcy5yb2NrZXRCb29tKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQoZSwgMTAwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gY2Muc2VxdWVuY2UoY2Muc3Bhd24oY2Muc2NhbGVUbyguNSwgMyksIGNjLmZhZGVPdXQoLjUpKSwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5ydW5BY3Rpb24odCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnRlWGlhb0F1ZGlvWzBdLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2FyZFR5cGVUZXh0WzRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQoaSwgMTAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoLjUpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLnJ1bkFjdGlvbihlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYWNraW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeS5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcykpLFxyXG4gICAgICAgICAgICAgICAgICAgIHkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJvY2tldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKHksIDEwMCksXHJcbiAgICAgICAgICAgICAgICAgICAgeS5zZXRQb3NpdGlvbihnLngsIGcueSArIDE1MCksXHJcbiAgICAgICAgICAgICAgICAgICAgeS5ydW5BY3Rpb24ocCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsUGxheWVyVGlwc1N0YXRlW29dID0gW251bGxdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1tvXS5zdGF0ZS5wdXNoKHRoaXMuYWxsUGxheWVyVGlwc1N0YXRlW29dKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYpeWkqeWKqOeUu1xyXG4gICAgICovXHJcbiAgICBjaHVuVGlhbkFuaW1hdGlvbigpIHtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjaHVuVGlhblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNodW5UaWFuXCIpLmdldENvbXBvbmVudChcImRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheVwiKS5hcm1hdHVyZSgpLmFuaW1hdGlvbi5wbGF5KFwiY2h1bnRpYW5cIiwgMSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjaHVuVGlhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCAyKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HniYws5bm26L+b6KGM5o6S5bqPXHJcbiAgICAgKiBAcGFyYW0geyp9IGNhcmRzIFxyXG4gICAgICogQHBhcmFtIHsqfSBpc0xpY2Vuc2luZyBcclxuICAgICAqL1xyXG4gICAgY2FyZHNTb3J0aW5nKGNhcmRzLCBpc0xpY2Vuc2luZykge1xyXG4gICAgICAgIHRoaXMuZmluaXNoR2FtZSgpLFxyXG4gICAgICAgICAgICB0aGlzLmFsbFRpcHNbMV0uZ2V0Q2hpbGRCeU5hbWUoXCJkZW5nZGFpXCIpLmFjdGl2ZSA9IGZhbHNlLFxyXG4gICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJMaXN0KCksXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZHNBcnJheSA9IGNhcmRzLFxyXG4gICAgICAgICAgICB0aGlzLmNhcmRzQXJyYXkuc29ydChmdW5jdGlvbiAoZSwgdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGUudmFsID09PSB0LnZhbCA/IHQudHlwZSAtIGUudHlwZSA6IHQudmFsIC0gZS52YWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBuID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIG8gPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgYSA9IG51bGw7IGkgPCB0aGlzLmNhcmRzQXJyYXkubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzQXJyYXlbaV0udmFsID4gMTMpIG4gPSBpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICgyID09PSB0aGlzLmNhcmRzQXJyYXlbaV0udmFsIHx8IDEgPT09IHRoaXMuY2FyZHNBcnJheVtpXS52YWwpIHtcclxuICAgICAgICAgICAgbyA9IGk7XHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChudWxsID09PSBuICYmIG51bGwgIT09IG8pIHtcclxuICAgICAgICAgICAgYSA9IHRoaXMuY2FyZHNBcnJheS5zcGxpY2UoaSwgdGhpcy5jYXJkc0FycmF5Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IGEubGVuZ3RoOyBzKyspIHRoaXMuY2FyZHNBcnJheS5zcGxpY2UocywgMCwgYVtzXSlcclxuICAgICAgICB9IGVsc2UgaWYgKG51bGwgIT09IG4gJiYgbnVsbCAhPT0gbykge1xyXG4gICAgICAgICAgICBhID0gdGhpcy5jYXJkc0FycmF5LnNwbGljZShpLCB0aGlzLmNhcmRzQXJyYXkubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgYS5sZW5ndGg7IHMrKykgdGhpcy5jYXJkc0FycmF5LnNwbGljZShuICsgcyArIDEsIDAsIGFbc10pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0xpY2Vuc2luZylcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXJkcy5sZW5ndGg7IGkrKykgdGhpcy5saWNlbnNpbmcoaSwgY2FyZHNbaV0udmFsLCBjYXJkc1tpXS50eXBlKTtcclxuICAgICAgICBlbHNlIHRoaXMubGljZW5zaW5nVGltZXIoKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoKSxcclxuICAgICAgICAgICAgdGhpcy5jb3VudCA9IDJcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuLTml7bnmoTnjqnlrrbliJfooahcclxuICAgICAqL1xyXG4gICAgdGVtcFBsYXllckxpc3QoKSB7XHJcbiAgICAgICAgdmFyIG5pQ2hlbmcgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0cyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJBcnIubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgICAgIG5pQ2hlbmcgPSB0aGlzLm90aGVyT25lTC5nZXRDaGlsZEJ5TmFtZShcImJnX25hbWVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJuaUNoZW5nXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IDEpIHtcclxuICAgICAgICAgICAgICAgIG5pQ2hlbmcgPSB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiaGVhZFwiKS5nZXRDaGlsZEJ5TmFtZShcIm5pQ2hlbmdcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmlDaGVuZyA9IHRoaXMub3RoZXJUd29SLmdldENoaWxkQnlOYW1lKFwiYmdfbmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcIm5pQ2hlbmdcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1tpXSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLnBsYXllckFycltpXSxcclxuICAgICAgICAgICAgICAgIG5pQ2hlbmc6IG5pQ2hlbmcsXHJcbiAgICAgICAgICAgICAgICB6aGlTaGVuZ1lpOiAxLFxyXG4gICAgICAgICAgICAgICAgemhpU2hlbmdFcjogMSxcclxuICAgICAgICAgICAgICAgIHNlYXRJZDogaSxcclxuICAgICAgICAgICAgICAgIG91dENhcmQ6IFtdLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFtdLFxyXG4gICAgICAgICAgICAgICAgaXNMYW5kbG9yZDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbljaHniYzmlbBcclxuICAgICAqL1xyXG4gICAgbGljZW5zaW5nVGltZXIoKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5saWNlbnNpbmcoaW5kZXgsIHRoaXMuY2FyZHNBcnJheVtpbmRleF0udmFsLCB0aGlzLmNhcmRzQXJyYXlbaW5kZXhdLnR5cGUpO1xyXG4gICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuZmFQYWlBdWRpbywgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYXJkc0FycmF5Lmxlbmd0aCAtIDEgPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm90aGVyT25lTC5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAxNjtcclxuICAgICAgICAgICAgICAgIHRoaXMub3RoZXJUd29SLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRzTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IDE2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfSwgMC4xLCB0aGlzLmNhcmRzQXJyYXkubGVuZ3RoIC0gMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0geyp9IGluZGV4IFxyXG4gICAgICogQHBhcmFtIHsqfSB2YWwgXHJcbiAgICAgKiBAcGFyYW0geyp9IHR5cGUgXHJcbiAgICAgKi9cclxuICAgIGxpY2Vuc2luZyhpbmRleCwgdmFsLCB0eXBlKSB7XHJcbiAgICAgICAgdmFyIGNhcmQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FyZHNQb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgY2FyZCA9IHRoaXMuY2FyZHNQb29sLmdldCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhcmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBiX0NhcmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FyZC5zY2FsZSA9IDEuMjtcclxuICAgICAgICB0aGlzLmNhcmRXaWR0aCA9IGNhcmQuZ2V0Q29udGVudFNpemUoKS53aWR0aCAqIGNhcmQuc2NhbGU7XHJcbiAgICAgICAgdGhpcy5jYXJkSGVpZ2h0ID0gY2FyZC5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCAqIGNhcmQuc2NhbGU7XHJcbiAgICAgICAgdmFyIGRXaWR0aCA9IC10aGlzLmNhcmRXaWR0aCAvIDIgLSAodGhpcy5jYXJkc0FycmF5Lmxlbmd0aCAtIDEpIC8gMiAqIHRoaXMuZGlzdGFuY2VDYXJkO1xyXG4gICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQoY2FyZCwgNTAgKyBpbmRleCk7XHJcbiAgICAgICAgY2FyZC5zZXRQb3NpdGlvbihkV2lkdGggKyB0aGlzLmRpc3RhbmNlQ2FyZCAqIGluZGV4LCB0aGlzLmluaXRZKTtcclxuICAgICAgICBjYXJkLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLmNhcmRzQ3JlYXRlKHZhbCwgdHlwZSk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJDYXJkcy5wdXNoKGNhcmQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaKouWcsOS4u1xyXG4gICAgICogQHBhcmFtIHsqfSBzZWNvbmQgXHJcbiAgICAgKiBAcGFyYW0geyp9IHVzZXJJZCBcclxuICAgICAqL1xyXG4gICAgcm9iTGFuZGxvcmQoc2Vjb25kLCB1c2VySWQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckFycltpXSA9PT0gdXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuX1JvYkxhbmRsb2FkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5QbGF5ZXJTdGF0ZSA9IHRoaXMuYnRuX1JvYkxhbmRsb2FkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5omY566hXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50dW9HdWFuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dW9HdWFuRnVuY3Rpb24oaSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIoaSwgc2Vjb25kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQr+WKqOiuoeaXtuWZqFxyXG4gICAgICogQHBhcmFtIHsqfSBzZWF0SW5kZXggXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlY29uZCBcclxuICAgICAqL1xyXG4gICAgdGltZXIoc2VhdEluZGV4LCBzZWNvbmQpIHtcclxuICAgICAgICAvL+enu+mZpOWOn+adpeeahOiuoeaXtuWZqFxyXG4gICAgICAgIHRoaXMuY2FuY2VsVGltZXIoKTtcclxuICAgICAgICBjYy5sb2coXCLorqHml7blmahcIiwgc2VhdEluZGV4KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGVtcFBsYXllcnNMaXN0c1tzZWF0SW5kZXhdLnN0YXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbc2VhdEluZGV4XS5zdGF0ZVtpXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzW3NlYXRJbmRleF0uc3RhdGVbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1tzZWF0SW5kZXhdLnN0YXRlID0gW107XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDYXJkcyhzZWF0SW5kZXgpO1xyXG4gICAgICAgIHRoaXMucGJfVGltZXJbc2VhdEluZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoc2Vjb25kKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGJfVGltZXJbc2VhdEluZGV4XS5nZXRDb21wb25lbnQoXCJSdW5UaW1lclwiKS5udW0gPSBzZWNvbmQ7XHJcbiAgICAgICAgICAgIHRoaXMucGJfVGltZXJbc2VhdEluZGV4XS5nZXRDb21wb25lbnQoXCJSdW5UaW1lclwiKS5jb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGJfVGltZXJbc2VhdEluZGV4XS5nZXRDb21wb25lbnQoXCJSdW5UaW1lclwiKS5zdGFydFRpbWVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk6K6h5pe25ZmoXHJcbiAgICAgKi9cclxuICAgIGNhbmNlbFRpbWVyKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYl9UaW1lci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYl9UaW1lcltpXS5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfVGltZXJbaV0uZ2V0Q29tcG9uZW50KFwiUnVuVGltZXJcIikuY2FuY2VsVGltZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfVGltZXJbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIHJ1bGVzKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn6KeE5YiZ5qOA5rWLJyk7XHJcbiAgICAgICAgdmFyIHQgPSB0aGlzLmNhcmRUeXBlKHRoaXMucHJpbWFyeUNhcmQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfkuLvniYzniYzlnosnICsgdC50eXBlKTtcclxuICAgICAgICBpZiAoMCA9PSBlLmxlbmd0aCkgcmV0dXJuIHQudHlwZSA+IC0xO1xyXG4gICAgICAgIHZhciBpID0gdGhpcy5jYXJkVHlwZShlKTtcclxuICAgICAgICBjb25zb2xlLmxvZygn5a+55pa554mM5Z6LJyArIGkudHlwZSk7XHJcbiAgICAgICAgcmV0dXJuIDEgPT0gdC5tYXggPyB0Lm1heCArPSAxMi4xIDogMiA9PSB0Lm1heCAmJiAodC5tYXggKz0gMTEuMiksXHJcbiAgICAgICAgICAgIDEgPT0gaS5tYXggPyBpLm1heCArPSAxMi4xIDogMiA9PSBpLm1heCAmJiAoaS5tYXggKz0gMTEuMiksXHJcbiAgICAgICAgICAgIDggPT0gdC50eXBlICYmIGkudHlwZSA8IDggfHwgKDkgPT0gdC50eXBlIHx8IHQubGVuZ3RoID09IGkubGVuZ3RoICYmIHQudHlwZSA9PSBpLnR5cGUgJiYgdC5tYXggPiBpLm1heClcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOiOt+W+l+eJjOWei1xyXG4gICAgICovXHJcbiAgICBjYXJkVHlwZShjYXJkcykge1xyXG4gICAgICAgIHZhciBjb3VudDtcclxuICAgICAgICB2YXIgdHlwZSA9IC0xO1xyXG4gICAgICAgIHZhciBtYXggPSAwO1xyXG4gICAgICAgIHZhciBjYXJkTGlzdCA9IFtdO1xyXG4gICAgICAgIGlmIChjYXJkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8v5Y2V54mMXHJcbiAgICAgICAgICAgIGNhcmRMaXN0WzBdID0gdGhpcy5jaGVja09uZUNhcmQoY2FyZHMpO1xyXG4gICAgICAgICAgICAvL+WvueWtkFxyXG4gICAgICAgICAgICBjYXJkTGlzdFsxXSA9IHRoaXMuY2hlY2tEdWlaaShjYXJkcyk7XHJcbiAgICAgICAgICAgIC8v6aG65a2QXHJcbiAgICAgICAgICAgIGNhcmRMaXN0WzJdID0gdGhpcy5jaGVja1NodW5aaShjYXJkcyk7XHJcbiAgICAgICAgICAgIC8v5LiJ6aG6XHJcbiAgICAgICAgICAgIGNhcmRMaXN0WzNdID0gdGhpcy5jaGVja1Nhbk9yU2h1bihjYXJkcyk7XHJcbiAgICAgICAgICAgIC8v5Zub5bim5LqMXHJcbiAgICAgICAgICAgIGNhcmRMaXN0WzRdID0gdGhpcy5jaGVja1NpVGFrZVR3byhjYXJkcyk7XHJcbiAgICAgICAgICAgIC8v5Zub5bim5Lik5a+5XHJcbiAgICAgICAgICAgIGNhcmRMaXN0WzVdID0gdGhpcy5jaGVja1NpVGFrZVR3b1NodWFuZyhjYXJkcyk7XHJcbiAgICAgICAgICAgIC8v6aOe5py6XHJcbiAgICAgICAgICAgIGNhcmRMaXN0WzZdID0gdGhpcy5jaGVja1Nhbk9yUGxhbmUoY2FyZHMpO1xyXG4gICAgICAgICAgICAvL+i/numYn1xyXG4gICAgICAgICAgICBjYXJkTGlzdFs3XSA9IHRoaXMuY2hlY2tTYW5TaHVhbmdPclBsYW5lKGNhcmRzKTtcclxuICAgICAgICAgICAgLy/ngrjlvLlcclxuICAgICAgICAgICAgY2FyZExpc3RbOF0gPSB0aGlzLmNoZWNrU2koY2FyZHMpO1xyXG4gICAgICAgICAgICAvL+eOi+eCuFxyXG4gICAgICAgICAgICBjYXJkTGlzdFs5XSA9IHRoaXMua2luZ0Jvb20oY2FyZHMpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FyZExpc3RbaV0ubnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gY2FyZExpc3RbaV0ubWF4O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gY2FyZHMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgIG1heDogbWF4LFxyXG4gICAgICAgICAgICBsZW5ndGg6IGNvdW50XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAieaLqeWNoeeJjFxyXG4gICAgICogQHBhcmFtIHsqfSBhciBcclxuICAgICAqL1xyXG4gICAgc2VsZWN0Q2FyZHMoYXIpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGFydExvY2F0LnggPj0gYXIueCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyB0KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ID09IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhci54ID4gdGhpcy5wbGF5ZXJDYXJkc1t0XS5wb3NpdGlvbi54ICsgdGhpcy5jYXJkV2lkdGggfHwgdGhpcy5zdGFydExvY2F0LnggPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnggfHwgdGhpcy5zdGFydExvY2F0LnkgPiB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgKyB0aGlzLmNhcmRIZWlnaHQgLyAyIHx8IGFyLnkgPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgLSB0aGlzLmNhcmRIZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbdF0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikuY2hhbmdlQmFpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1t0XS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS5jaGFuZ2VIdWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhci54ID4gdGhpcy5wbGF5ZXJDYXJkc1t0XS5wb3NpdGlvbi54ICsgdGhpcy5kaXN0YW5jZUNhcmQgfHwgdGhpcy5zdGFydExvY2F0LnggPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnggfHwgdGhpcy5zdGFydExvY2F0LnkgPiB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgKyB0aGlzLmNhcmRIZWlnaHQgLyAyIHx8IGFyLnkgPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgLSB0aGlzLmNhcmRIZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbdF0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikuY2hhbmdlQmFpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1t0XS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS5jaGFuZ2VIdWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyB0KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ID09IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0TG9jYXQueCA+IHRoaXMucGxheWVyQ2FyZHNbdF0ucG9zaXRpb24ueCArIHRoaXMuY2FyZFdpZHRoIHx8IGFyLnggPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnggfHwgdGhpcy5zdGFydExvY2F0LnkgPiB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgKyB0aGlzLmNhcmRIZWlnaHQgLyAyIHx8IGFyLnkgPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgLSB0aGlzLmNhcmRIZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbdF0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikuY2hhbmdlQmFpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1t0XS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS5jaGFuZ2VIdWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0TG9jYXQueCA+IHRoaXMucGxheWVyQ2FyZHNbdF0ucG9zaXRpb24ueCArIHRoaXMuZGlzdGFuY2VDYXJkIHx8IGFyLnggPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnggfHwgdGhpcy5zdGFydExvY2F0LnkgPiB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgKyB0aGlzLmNhcmRIZWlnaHQgLyAyIHx8IGFyLnkgPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgLSB0aGlzLmNhcmRIZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbdF0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikuY2hhbmdlQmFpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1t0XS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS5jaGFuZ2VIdWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG91dENhcmQoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcmQgPSBbXTtcclxuICAgICAgICB0aGlzLnByaW1hcnlOdW0oKTtcclxuICAgICAgICBmb3IgKHZhciBlID0gMDsgZSA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyBlKyspIHRoaXMucGxheWVyQ2FyZHNbZV0ucG9zaXRpb24ueSA9PSB0aGlzLm1vdmVkWSAmJiB0aGlzLnNlbGVjdGVkQ2FyZC5wdXNoKHRoaXMucGxheWVyQ2FyZHNbZV0pO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2FyZC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vdENvbmZvcm1SdWxlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl9PdXRDYXJkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIHRoaXMudGltZXIoMSwgbnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuUGxheWVyU3RhdGUgPSB0aGlzLmJ0bl9PdXRDYXJkO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIHQgPSBbXSwgZSA9IDA7IGUgPCB0aGlzLnNlbGVjdGVkQ2FyZC5sZW5ndGg7IGUrKykgdC5wdXNoKHtcclxuICAgICAgICAgICAgdmFsOiB0aGlzLnNlbGVjdGVkQ2FyZFtlXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwsXHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMuc2VsZWN0ZWRDYXJkW2VdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnR5cGVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuTGFuZGxvcmRzU29ja2V0LmVtaXQoXCJzZW5kQ2FyZHNBcnJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5OiB0LFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5wSW5mby5wbGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZUlkOiB0aGlzLm5ldFdvcmsudGFibGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBzZWF0SWQ6IHRoaXMubmV0V29yay5zZWF0SWRcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiZW1pdFwiLCB0LCB0aGlzLnBJbmZvLnBsYXllcklkLCB0aGlzLm5ldFdvcmsudGFibGVJZCwgdGhpcy5uZXRXb3JrLnNlYXRJZClcclxuICAgICAgICB9IGNhdGNoIChpKSB7fVxyXG4gICAgfSxcclxuXHJcbiAgICBpZGVudGlmeUNhcmRzKCkge1xyXG4gICAgICAgIHRoaXMuYnRuX091dENhcmQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yICh2YXIgZSA9IDA7IGUgPCB0aGlzLnBsYXllckNhcmRzLmxlbmd0aDsgZSsrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMuc2VsZWN0ZWRDYXJkLmxlbmd0aDsgdCsrKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQ2FyZHNbZV0gPT0gdGhpcy5zZWxlY3RlZENhcmRbdF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckNhcmRzLnNwbGljZShlLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgdmFyIGkgPSBudWxsLFxyXG4gICAgICAgICAgICBuID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENhcmQubGVuZ3RoICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgIG4gPSB0aGlzLnNlbGVjdGVkQ2FyZC5sZW5ndGggLyAyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBlID0gMDsgZSA8IHRoaXMuc2VsZWN0ZWRDYXJkLmxlbmd0aDsgZSsrKSB0aGlzLnNlbGVjdGVkQ2FyZFtlXS5zY2FsZSA9IC44LFxyXG4gICAgICAgICAgICAgICAgaSA9IC1uICogdGhpcy5zbWFsbERpc3RhbmNlQ2FyZCArIGUgKiB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkIC0gdGhpcy5zZWxlY3RlZENhcmRbZV0uZ2V0Q29udGVudFNpemUoKS53aWR0aCAqIHRoaXMuc2VsZWN0ZWRDYXJkW2VdLnNjYWxlIC8gMiArIHRoaXMuc21hbGxEaXN0YW5jZUNhcmQgLyAyLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcmRbZV0uc2V0UG9zaXRpb24oY2MudjIoaSwgdGhpcy5maW5pc2hZKSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyZFtlXS56SW5kZXggPSAwLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcmRbZV0uY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCAyNTUsIDI1NSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuID0gKHRoaXMuc2VsZWN0ZWRDYXJkLmxlbmd0aCAtIDEpIC8gMjtcclxuICAgICAgICAgICAgZm9yICh2YXIgZSA9IDA7IGUgPCB0aGlzLnNlbGVjdGVkQ2FyZC5sZW5ndGg7IGUrKykgdGhpcy5zZWxlY3RlZENhcmRbZV0uc2NhbGUgPSAuOCxcclxuICAgICAgICAgICAgICAgIGkgPSAtbiAqIHRoaXMuc21hbGxEaXN0YW5jZUNhcmQgKyBlICogdGhpcy5zbWFsbERpc3RhbmNlQ2FyZCAtIHRoaXMuc2VsZWN0ZWRDYXJkW2VdLmdldENvbnRlbnRTaXplKCkud2lkdGggKiB0aGlzLnNlbGVjdGVkQ2FyZFtlXS5zY2FsZSAvIDIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyZFtlXS5zZXRQb3NpdGlvbihjYy52MihpLCB0aGlzLmZpbmlzaFkpKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJkW2VdLnpJbmRleCA9IDAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyZFtlXS5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDI1NSwgMjU1KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJ0bl9PdXRDYXJkLmdldENoaWxkQnlOYW1lKFwiYnRuX2J1Y2h1XCIpLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPT0gZmFsc2UgJiYgKHRoaXMuYnRuX091dENhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fYnVjaHVcIikuZ2V0Q29tcG9uZW50KFwiY2MuQnV0dG9uXCIpLmludGVyYWN0YWJsZSA9IHRydWUpLFxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyZC5sZW5ndGggPiAwICYmIHRoaXMucmVzZXRDYXJkTG9jYXQoKSxcclxuICAgICAgICAgICAgdGhpcy5vdGhlckNhcmRBcnIgPSBbXSxcclxuICAgICAgICAgICAgdGhpcy50aXBzQ2FyZHNBcnIgPSBbXSxcclxuICAgICAgICAgICAgdGhpcy50aXBzQ291bnQgPSAwLFxyXG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gMFxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog5LiN56ym5ZCI6KeE5YiZXHJcbiAgICAgKi9cclxuICAgIG5vdENvbmZvcm1SdWxlcygpIHtcclxuICAgICAgICB0aGlzLmFsbFRpcHNbMV0uZ2V0Q2hpbGRCeU5hbWUoXCJQcm9tcHQxXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hbGxUaXBzWzFdLmdldENoaWxkQnlOYW1lKFwiUHJvbXB0MVwiKS5nZXRDb21wb25lbnQoXCJjYy5BbmltYXRpb25cIikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSB1c2VySWQgXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlY29uZCBcclxuICAgICAqL1xyXG4gICAgcGxheVN0YXRlKHVzZXJJZCwgc2Vjb25kKSB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxUaW1lcigpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQXJyW2ldID09IHVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmV0V29yay5wbGF5ZXJJZCA9PSB1c2VySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpuaJmOeuoVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnR1b0d1YW4gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5fT3V0Q2FyZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0blBsYXllclN0YXRlID0gdGhpcy5idG5fT3V0Q2FyZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcihpLCBzZWNvbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb3VudCA+PSAyIHx8IHRoaXMuZmlyc3RPdXRDYXJkID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuX091dENhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fYnVjaHVcIikuZ2V0Q29tcG9uZW50KFwiY2MuQnV0dG9uXCIpLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdE91dENhcmQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHVvR3VhbkZ1bmN0aW9uKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcihpLCBzZWNvbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJmOeuoVxyXG4gICAgICogQHBhcmFtIHsqfSBpbmRleCBcclxuICAgICAqL1xyXG4gICAgdHVvR3VhbkZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnFpYW5nRGlaaHUgJiYgKHRoaXMucGJfVGltZXJbMV0uYWN0aXZlID09IHRydWUgfHwgbmRleCA9PSAxKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXRXb3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwicWlhbmdcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlSWQ6IHRoaXMubmV0V29yay50YWJsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXRJZDogdGhpcy5uZXRXb3JrLnNlYXRJZCxcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogdGhpcy5uZXRXb3JrLnBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIHFpYW5nOiAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge307XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50ZW1wUGxheWVyc0xpc3RzWzFdLnN0YXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZW1wUGxheWVyc0xpc3RzWzFdLnN0YXRlW2ldICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbMV0uc3RhdGVbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzWzFdLnN0YXRlID0gW107XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVGaW5pc2ggJiYgKGluZGV4ID09IDEgfHwgdGhpcy5wYl9UaW1lclsxXS5hY3RpdmUgPT0gdHJ1ZSkpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbMV0uc3RhdGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbMV0uc3RhdGVbaV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1sxXS5zdGF0ZVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRtcFR1b2d1YW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbMV0uc3RhdGUgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDYXJkcygxKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBzQ2xpY2soKTtcclxuICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIH0sIDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJmOeuoeeKtuaAgVxyXG4gICAgICogQHBhcmFtIHsqfSByZXNsdXQgXHJcbiAgICAgKiBAcGFyYW0geyp9IHVzZXJJZCBcclxuICAgICAqL1xyXG4gICAgdHVvR3VhblN0YXRlKHJlc2x1dCwgdXNlcklkKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJBcnJbaV0gPT0gdXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm90aGVyT25lTC5nZXRDaGlsZEJ5TmFtZShcInR1b0d1YW5cIikuYWN0aXZlID0gcmVzbHV0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLm90aGVyVHdvUi5nZXRDaGlsZEJ5TmFtZShcInR1b0d1YW5cIikuYWN0aXZlID0gcmVzbHV0O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcmVzZXRDYXJkTG9jYXQoKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSAtdGhpcy5jYXJkV2lkdGggLyAyIC0gKHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMSkgLyAyICogdGhpcy5kaXN0YW5jZUNhcmQ7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllckNhcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbaV0uc2V0UG9zaXRpb24oY2MudjIoc2l6ZSArIHRoaXMuZGlzdGFuY2VDYXJkICogaSwgdGhpcy5pbml0WSkpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckNhcmRzW2ldLnpJbmRleCA9IGkgKyA1MDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1tpXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS5oYW5kQ2FyZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVjeWNsaW5nWzFdID0gdGhpcy5zZWxlY3RlZENhcmQ7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcmQgPSBbXTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcHJpbWFyeU51bSgpIHtcclxuICAgICAgICB0aGlzLnByaW1hcnlDYXJkID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgZSA9IDA7IGUgPCB0aGlzLnBsYXllckNhcmRzLmxlbmd0aDsgZSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckNhcmRzW2VdLnBvc2l0aW9uLnkgPT0gdGhpcy5tb3ZlZFkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJpbWFyeUNhcmQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsOiB0aGlzLnBsYXllckNhcmRzW2VdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvljZXniYxcclxuICAgICAqIEBwYXJhbSB7Kn0gY2FyZHMgXHJcbiAgICAgKi9cclxuICAgIGNoZWNrT25lQ2FyZChjYXJkcykge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHt9O1xyXG4gICAgICAgIHZhbHVlLm1heCA9IDA7XHJcbiAgICAgICAgdmFsdWUubnVtID0gMDtcclxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIHZhbHVlLm1heCA9IGNhcmRzWzBdLnZhbDtcclxuICAgICAgICAgICAgdmFsdWUubnVtID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+WvueWtkFxyXG4gICAgICogQHBhcmFtIHsqfSBjYXJkcyBcclxuICAgICAqL1xyXG4gICAgY2hlY2tEdWlaaShjYXJkcykge1xyXG5cclxuICAgICAgICB2YXIgdmFsdWUgPSB7fTtcclxuICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgdmFsdWUubnVtID0gMDtcclxuXHJcbiAgICAgICAgLy/orqHnrpflgbbmlbBcclxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoICUgMiA9PT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoY2FyZHMubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYXJkc1swXS52YWwgPT0gY2FyZHNbMV0udmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiBjYXJkc1swXS52YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bTogMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYXJkcy5sZW5ndGggPiA1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja1NpKGNhcmRzKS5udW0gIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heDogY2FyZHNbMF0udmFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW06IDBcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGlzQ2FuLCBpc0VxdWFsO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSBjYXJkcy5sZW5ndGggLyAyO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZXEgPSAwOyBlcSA8IHNpemU7IGVxKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZHNbMiAqIGVxXS52YWwgIT0gY2FyZHNbMiAqIGVxICsgMV0udmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRXF1YWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzRXF1YWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZXEgKyAxKSAqIDIgPCBjYXJkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRzWzIgKiBlcV0udmFsID09IDEgJiYgY2FyZHNbMiAqIChlcSArIDEpXS52YWwgPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2FuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgyID09PSBjYXJkc1syICogZXFdLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2FuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZHNbMiAqIGVxXS52YWwgLSBjYXJkc1syICogKGVxICsgMSldLnZhbCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2FuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0VxdWFsICYmIGlzQ2FuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUubWF4ID0gY2FyZHNbMF0udmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLm51bSA9IHNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+mhuuWtkFxyXG4gICAgICogQHBhcmFtIHsqfSBjYXJkcyBcclxuICAgICAqL1xyXG4gICAgY2hlY2tTaHVuWmkoY2FyZHMpIHtcclxuICAgICAgICB2YXIgaXNDYW47XHJcbiAgICAgICAgdmFyIHZhbHVlID0ge307XHJcbiAgICAgICAgdmFsdWUubWF4ID0gY2FyZHNbMF0udmFsO1xyXG4gICAgICAgIHZhbHVlLm51bSA9IDA7XHJcbiAgICAgICAgLy/plb/luqblpKfkuo40XHJcbiAgICAgICAgaWYgKGNhcmRzLmxlbmd0aCA+IDQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXJkcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYXJkc1tpXS52YWwgPT0gMSAmJiBjYXJkc1tpICsgMV0udmFsID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZHNbaV0udmFsID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNDYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRzW2ldLnZhbCAtIGNhcmRzW2kgKyAxXS52YWwgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpc0NhbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzQ2FuKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5udW0gPSBjYXJkcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+S4iemhulxyXG4gICAgICogQHBhcmFtIHsqfSBjYXJkcyBcclxuICAgICAqL1xyXG4gICAgY2hlY2tTYW5PclNodW4oY2FyZHMpIHtcclxuICAgICAgICB2YXIgaXNDYW4sIGlzRXF1YWw7XHJcbiAgICAgICAgdmFyIHZhbHVlID0ge307XHJcbiAgICAgICAgdmFsdWUubWF4ID0gY2FyZHNbMF0udmFsO1xyXG4gICAgICAgIHZhbHVlLm51bSA9IDA7XHJcbiAgICAgICAgaWYgKGNhcmRzLmxlbmd0aCAlIDMgPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IGNhcmRzLmxlbmd0aCAvIDM7XHJcbiAgICAgICAgICAgIGlmIChzaXplID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlzRXF1YWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXJkcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZHNbaV0udmFsICE9PSBjYXJkc1tpICsgMV0udmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2FuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpc0NhbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgzICogKGkgKyAxKSA8IGNhcmRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRzWzMgKiBpXS52YWwgLSBjYXJkc1szICogKGkgKyAxKV0udmFsICE9IDEgJiYgKGNhcmRzWzMgKiBpXS52YWwgIT0gMSB8fCBjYXJkc1szICogKGkgKyAxKV0udmFsICE9IDEzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRXF1YWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRXF1YWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXJkc1szICogaSArIGpdLnZhbCAhPSBjYXJkc1szICogaSArIGogKyAxXS52YWwgfHwgY2FyZHNbMyAqIGkgKyBqXS52YWwgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2FuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzQ2FuICYmIGlzRXF1YWwpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLm1heCA9IGNhcmRzWzBdLnZhbDtcclxuICAgICAgICAgICAgICAgIHZhbHVlLm51bSA9IHNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+eCuOW8uVxyXG4gICAgICogQHBhcmFtIHsqfSBjYXJkcyBcclxuICAgICAqL1xyXG4gICAgY2hlY2tTaShjYXJkcykge1xyXG4gICAgICAgIHZhciBpc0VxdWFsID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHZhbHVlID0ge307XHJcbiAgICAgICAgdmFsdWUubWF4ID0gY2FyZHNbMF0udmFsO1xyXG4gICAgICAgIHZhbHVlLm51bSA9IDA7XHJcbiAgICAgICAgLy/liKTmlq3plb/luqbkuLo0XHJcbiAgICAgICAgaWYgKGNhcmRzLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy/liKTmlq3mmK/lkKbnm7jlkIxcclxuICAgICAgICAgICAgICAgIGlmIChjYXJkc1tpXS52YWwgPT0gY2FyZHNbaSArIDFdLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRXF1YWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0VxdWFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzRXF1YWwpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLm1heCA9IGNhcmRzWzBdLnZhbDtcclxuICAgICAgICAgICAgICAgIHZhbHVlLm51bSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+Wbm+W4puS6jFxyXG4gICAgICogQHBhcmFtIHsqfSBjYXJkcyBcclxuICAgICAqL1xyXG4gICAgY2hlY2tTaVRha2VUd28oY2FyZHMpIHtcclxuICAgICAgICB2YXIgdGVtcDtcclxuICAgICAgICB2YXIgdmFsdWUgPSB7fTtcclxuICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgdmFsdWUubnVtID0gMDtcclxuXHJcbiAgICAgICAgaWYgKGNhcmRzLmxlbmd0aCA9PT0gNikge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjYXJkcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXAucHVzaChjYXJkc1trXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZW1wLnNwbGljZSgwLCBpKTtcclxuICAgICAgICAgICAgICAgIHRlbXAuc3BsaWNlKHRlbXAubGVuZ3RoIC0gKDIgLSBpKSwgMiAtIGkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tTaSh0ZW1wKS5udW0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5tYXggPSB0ZW1wWzBdLnZhbDtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5udW0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvlm5vluKbkuKTlr7lcclxuICAgICAqL1xyXG4gICAgY2hlY2tTaVRha2VUd29TaHVhbmcoY2FyZHMpIHtcclxuICAgICAgICB2YXIgY2FyZExpc3QsIHRlbXBMaXN0LCBpbmRleCwgc2l6ZSA9IDI7XHJcbiAgICAgICAgdmFyIHZhbHVlID0ge307XHJcbiAgICAgICAgdmFsdWUubWF4ID0gY2FyZHNbMF0udmFsO1xyXG4gICAgICAgIHZhbHVlLm51bSA9IDA7XHJcblxyXG4gICAgICAgIC8v5Yik5pat6ZW/5bqm562J5LqOOFxyXG4gICAgICAgIGlmIChjYXJkcy5sZW5ndGggPT0gOCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY2FyZExpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRlbXBMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNhcmRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZExpc3QucHVzaChjYXJkc1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgb25lQ2FyZCA9IGNhcmRMaXN0LnNsaWNlKDAsIDIgKiBpKTtcclxuICAgICAgICAgICAgICAgIHZhciB0d29DYXJkID0gY2FyZExpc3Quc2xpY2UoY2FyZExpc3QubGVuZ3RoIC0gMiAqIHNpemUgKyAyICogaSwgY2FyZExpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0LnNwbGljZSgwLCAyICogaSk7XHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdC5zcGxpY2UoY2FyZExpc3QubGVuZ3RoIC0gMiAqIHNpemUgKyAyICogaSwgMiAqIHNpemUgLSAyICogaSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9uZUNhcmQubGVuZ3RoIC8gMjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpc3QucHVzaChbb25lQ2FyZFsyICogal0sIG9uZUNhcmRbMiAqIGogKyAxXV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0d29DYXJkLmxlbmd0aCAvIDI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaXN0LnB1c2goW3R3b0NhcmRbMiAqIGpdLCB0d29DYXJkWzIgKiBqICsgMV1dKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGVtcExpc3QubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0R1aVppKHRlbXBMaXN0W2pdKS5udW0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gc2l6ZSAmJiB0aGlzLmNoZWNrU2koY2FyZExpc3QpLm51bSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5tYXggPSBjYXJkTGlzdFswXS52YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5udW0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvpo57mnLpcclxuICAgICAqL1xyXG4gICAgY2hlY2tTYW5PclBsYW5lKGNhcmRzKSB7XHJcbiAgICAgICAgdmFyIHNpemU7XHJcbiAgICAgICAgdmFyIHZhbHVlID0ge307XHJcbiAgICAgICAgdmFsdWUubWF4ID0gY2FyZHNbMF0udmFsO1xyXG4gICAgICAgIHZhbHVlLm51bSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChjYXJkcy5sZW5ndGggJSA0ID09IDApIHtcclxuICAgICAgICAgICAgc2l6ZSA9IGNhcmRzLmxlbmd0aCAvIDQ7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja1NpKGNhcmRzLnNsaWNlKGksIGkgKyA0KSkubnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUubWF4ID0gY2FyZHNbMF0udmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLm51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjYXJkcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaXplID4gMSAmJiBjYXJkc1trXS52YWwgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLm51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaXN0LnB1c2goY2FyZHNba10pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGlzdC5zcGxpY2UoMCwgaSk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGlzdC5zcGxpY2UodGVtcExpc3QubGVuZ3RoIC0gc2l6ZSArIGksIHNpemUgLSBpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrU2FuT3JTaHVuKHRlbXBMaXN0KS5udW0gPT09IHNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5tYXggPSB0ZW1wTGlzdFswXS52YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUubnVtID0gc2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWL6L+e5a+5XHJcbiAgICAgKiBAcGFyYW0geyp9IGNhcmRzIFxyXG4gICAgICovXHJcbiAgICBjaGVja1NhblNodWFuZ09yUGxhbmUoY2FyZHMpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB7fTtcclxuICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgdmFsdWUubnVtID0gMDtcclxuXHJcbiAgICAgICAgaWYgKGNhcmRzLmxlbmd0aCAlIDUgPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgc2l6ZTtcclxuICAgICAgICAgICAgdmFyIGNhcmRMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHZhciB0ZW1wTGlzdDtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgdmFyIHNpemUgPSBjYXJkcy5sZW5ndGggLyA1O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY2FyZExpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY2FyZHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZSA+IDEgJiYgMiA9PT0gY2FyZHNba10udmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLm1heCA9IGNhcmRzWzBdLnZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUubnVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpc3QucHVzaChjYXJkc1trXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgb25lQ2FyZCA9IHRlbXBMaXN0LnNsaWNlKDAsIDIgKiBpKTtcclxuICAgICAgICAgICAgICAgIHZhciB0d29DYXJkID0gdGVtcExpc3Quc2xpY2UodGVtcExpc3QubGVuZ3RoIC0gMiAqIHNpemUgKyAyICogaSwgdGVtcExpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHRlbXBMaXN0LnNwbGljZSgwLCAyICogaSk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGlzdC5zcGxpY2UodGVtcExpc3QubGVuZ3RoIC0gMiAqIHNpemUgKyAyICogaSwgMiAqIHNpemUgLSAyICogaSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IG9uZUNhcmQubGVuZ3RoIC8gMjsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZExpc3QucHVzaChbb25lQ2FyZFsyICoga10sIG9uZUNhcmRbMiAqIGsgKyAxXV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0d29DYXJkLmxlbmd0aCAvIDI7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRMaXN0LnB1c2goW3R3b0NhcmRbMiAqIGtdLCB0d29DYXJkWzIgKiBrICsgMV1dKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY2FyZExpc3QubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0R1aVppKGNhcmRMaXN0W2tdKS5udW0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gc2l6ZSAmJiB0aGlzLmNoZWNrU2FuT3JTaHVuKHRlbXBMaXN0KS5udW0gPT0gc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUubWF4ID0gdGVtcExpc3RbMF0udmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUubnVtID0gc2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWL546L54K4XHJcbiAgICAgKiBAcGFyYW0geyp9IGNhcmRzIFxyXG4gICAgICovXHJcbiAgICBraW5nQm9vbShjYXJkcykge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHt9O1xyXG4gICAgICAgIHZhbHVlLm1heCA9IDA7XHJcbiAgICAgICAgdmFsdWUubnVtID0gMDtcclxuICAgICAgICAvL+WIpOaWreaYr+S4pOW8oOeJjCwg5pyJ5aSn546L5ZKM5bCP546L77yM5YiZ5piv546L54K4XHJcbiAgICAgICAgaWYgKGNhcmRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBpZiAoY2FyZHNbMF0udmFsID09PSAxNSAmJiBjYXJkc1sxXS52YWwgPT0gMTQpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLm1heCA9IDE1O1xyXG4gICAgICAgICAgICAgICAgdmFsdWUubnVtID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuICAgIG90aGVyUGxheWVyT3V0Q2FyZChlLCB0LCBpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgbiA9IC0xLFxyXG4gICAgICAgICAgICAgICAgbyA9IDA7IG8gPCB0aGlzLnBsYXllckFyci5sZW5ndGg7IG8rKylcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQXJyW29dID09IHQpIHtcclxuICAgICAgICAgICAgICAgIG4gPSBvLFxyXG4gICAgICAgICAgICAgICAgICAgIDAgPT0gbiA/ICh0aGlzLm90aGVyT25lTC5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPiAwICYmICh0aGlzLm90aGVyT25lTC5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBwYXJzZUludCh0aGlzLm90aGVyT25lTC5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcpIC0gZS5sZW5ndGggKyBpKSwgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgKDIgPT0gdGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID8gMSA9PSB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbbl0uemhpU2hlbmdFciAmJiAoY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJhb0ppbmdBdWRpb1sxXSwgZmFsc2UsIDEpLCB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbbl0uemhpU2hlbmdFci0tKSA6IDEgPT0gdGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nICYmIDEgPT0gdGhpcy50ZW1wUGxheWVyc0xpc3RzW25dLnpoaVNoZW5nWWkgJiYgKGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5iYW9KaW5nQXVkaW9bMF0sIGZhbHNlLCAxKSwgdGhpcy50ZW1wUGxheWVyc0xpc3RzW25dLnpoaVNoZW5nWWktLSkpKSA6IDIgPT0gbiAmJiAodGhpcy5vdGhlclR3b1IuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID4gMCAmJiAodGhpcy5vdGhlclR3b1IuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gcGFyc2VJbnQodGhpcy5vdGhlclR3b1IuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nKSAtIGUubGVuZ3RoICsgaSksIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmICgyID09IHRoaXMub3RoZXJUd29SLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRzTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA/IDEgPT0gdGhpcy50ZW1wUGxheWVyc0xpc3RzW25dLnpoaVNoZW5nRXIgJiYgKGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5iYW9KaW5nQXVkaW9bMV0sIGZhbHNlLCAxKSwgdGhpcy50ZW1wUGxheWVyc0xpc3RzW25dLnpoaVNoZW5nRXItLSkgOiAxID09IHRoaXMub3RoZXJUd29SLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRzTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyAmJiAxID09IHRoaXMudGVtcFBsYXllcnNMaXN0c1tuXS56aGlTaGVuZ1lpICYmIChjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYmFvSmluZ0F1ZGlvWzBdLCBmYWxzZSwgMSksIHRoaXMudGVtcFBsYXllcnNMaXN0c1tuXS56aGlTaGVuZ1lpLS0pKSk7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBlID0gdGhpcy54aVRvbmdTb3J0aW5nKGUpO1xyXG4gICAgICAgICAgICB2YXIgYSwgcyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgYyA9IC44LFxyXG4gICAgICAgICAgICAgICAgciA9IDA7XHJcbiAgICAgICAgICAgIGlmICgwID09IG4pIHZhciBsID0gdGhpcy5vdGhlck9uZUwucG9zaXRpb24ueCArIDEyMDtcclxuICAgICAgICAgICAgZWxzZSBpZiAoZS5sZW5ndGggPCB0aGlzLnBlYWspIHZhciBsID0gdGhpcy5vdGhlclR3b1IucG9zaXRpb24ueCAtIDE3OC41IC0gZS5sZW5ndGggKiB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkO1xyXG4gICAgICAgICAgICBlbHNlIHZhciBsID0gdGhpcy5vdGhlclR3b1IucG9zaXRpb24ueCAtIDE3OC41IC0gdGhpcy5wZWFrICogdGhpcy5zbWFsbERpc3RhbmNlQ2FyZCxcclxuICAgICAgICAgICAgICAgIGggPSB0aGlzLm90aGVyVHdvUi5wb3NpdGlvbi54IC0gMTc4LjUgLSAoZS5sZW5ndGggLSB0aGlzLnBlYWspICogdGhpcy5zbWFsbERpc3RhbmNlQ2FyZDtcclxuICAgICAgICAgICAgZm9yICh2YXIgbyA9IDA7IG8gPCBlLmxlbmd0aDsgbysrKSBhID0gdGhpcy5jYXJkc1Bvb2wuc2l6ZSgpID4gMCA/IHRoaXMuY2FyZHNQb29sLmdldCgpIDogY2MuaW5zdGFudGlhdGUodGhpcy5wYl9DYXJkcyksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKGEsIDApLFxyXG4gICAgICAgICAgICAgICAgZS5sZW5ndGggPCB0aGlzLnBlYWsgPyAoYS5zY2FsZSA9IGMsIDAgPT0gbiA/IGEuc2V0UG9zaXRpb24oY2MudjIobCArIHRoaXMuc21hbGxEaXN0YW5jZUNhcmQgKiBvLCB0aGlzLm90aGVyT25lTC5wb3NpdGlvbi55ICsgYS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCAqIGMgKiAuNCkpIDogYS5zZXRQb3NpdGlvbihjYy52MihsICsgdGhpcy5zbWFsbERpc3RhbmNlQ2FyZCAqIG8sIHRoaXMub3RoZXJUd29SLnBvc2l0aW9uLnkgKyBhLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0ICogYyAqIC40KSkpIDogKGEuc2NhbGUgPSBjLCBvIDwgdGhpcy5wZWFrID8gMCA9PSBuID8gYS5zZXRQb3NpdGlvbihjYy52MihsICsgdGhpcy5zbWFsbERpc3RhbmNlQ2FyZCAqIG8sIHRoaXMub3RoZXJPbmVMLnBvc2l0aW9uLnkgKyBhLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0ICogYyAqIC40KSkgOiBhLnNldFBvc2l0aW9uKGNjLnYyKGwgKyB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkICogbywgdGhpcy5vdGhlclR3b1IucG9zaXRpb24ueSArIGEuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQgKiBjICogLjQpKSA6ICgwID09IG4gPyBhLnNldFBvc2l0aW9uKGNjLnYyKGwgKyB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkICogciwgdGhpcy5vdGhlck9uZUwucG9zaXRpb24ueSkpIDogYS5zZXRQb3NpdGlvbihjYy52MihoICsgdGhpcy5zbWFsbERpc3RhbmNlQ2FyZCAqIHIsIHRoaXMub3RoZXJUd29SLnBvc2l0aW9uLnkpKSwgcisrKSksXHJcbiAgICAgICAgICAgICAgICBhLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLmNhcmRzQ3JlYXRlKGVbb10udmFsLCBlW29dLnR5cGUpLFxyXG4gICAgICAgICAgICAgICAgcy5wdXNoKGEpO1xyXG4gICAgICAgICAgICBjYy5sb2coXCJvdGhlclBsYXllck91dENhcmRcIiwgbiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3ljbGluZ1tuXSA9IHMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm90aGVyQ2FyZEFyciA9IGUsXHJcbiAgICAgICAgICAgICAgICBjYy5sb2codGhpcy5vdGhlckNhcmRBcnIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCA9IDAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbbl0ub3V0Q2FyZC5wdXNoKHMpXHJcbiAgICAgICAgfSBlbHNlIHRoaXMuY291bnQrKyxcclxuICAgICAgICAgICAgdGhpcy5yZWN5Y2xpbmdbbl0gPSBudWxsLFxyXG4gICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbbl0ub3V0Q2FyZC5wdXNoKFtdKVxyXG4gICAgfSxcclxuICAgIG90aGVyUGxheWVyTm8oZSkge1xyXG4gICAgICAgIGZvciAodmFyIHQgPSAtMSxcclxuICAgICAgICAgICAgICAgIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJBcnIubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckFycltpXSA9PSBlKSB7XHJcbiAgICAgICAgICAgICAgICB0ID0gaTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50KyssXHJcbiAgICAgICAgICAgIHRoaXMucmVjeWNsaW5nW3RdID0gbnVsbCxcclxuICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzW3RdLm91dENhcmQucHVzaChbXSlcclxuICAgIH0sXHJcbiAgICBjaGVja1RvcFBsYXllcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5b2T5YmNY291bnQnICsgdGhpcy5jb3VudCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnQgPCAyID8gISF0aGlzLnJ1bGVzKHRoaXMub3RoZXJDYXJkQXJyKSA6IHRoaXMuY291bnQgPj0gMiA/ICEhdGhpcy5ydWxlcyhbXSkgOiB2b2lkIDBcclxuICAgIH0sXHJcbiAgICByZW1vdmVDYXJkcyhlKSB7XHJcbiAgICAgICAgdGhpcy5yZWN5Y2xpbmdbZV0gPSBudWxsO1xyXG4gICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdGhpcy50ZW1wUGxheWVyc0xpc3RzW2VdLm91dENhcmQubGVuZ3RoOyB0KyspIHtcclxuICAgICAgICAgICAgY2MubG9nKHRoaXMudGVtcFBsYXllcnNMaXN0c1tlXS5vdXRDYXJkKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbZV0ub3V0Q2FyZFt0XS5sZW5ndGg7IGkrKykgdGhpcy5jYXJkc1Bvb2wucHV0KHRoaXMudGVtcFBsYXllcnNMaXN0c1tlXS5vdXRDYXJkW3RdW2ldKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbZV0ub3V0Q2FyZCA9IFtdXHJcbiAgICB9LFxyXG4gICAgc2V0dGxlbWVudChlLCBjbG9zZURvb3IsIGJwKSB7XHJcbiAgICAgICAgc3dpdGNoIChjbG9zZURvb3IpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZURvb3JMYmwuc3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZURvb3JMYmwuc3RyaW5nID0gJ+WNleWFsyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZURvb3JMYmwuc3RyaW5nID0gJ+WPjOWFsyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZURvb3JMYmwuc3RyaW5nID0gJ+WPjeWFsyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5icExibC5zdHJpbmcgPSBicCA/ICfljIXotZQnIDogJyc7XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCBlLmxlbmd0aDsgdCsrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGVtcFBsYXllcnNMaXN0cy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIGlmIChlW3RdLnVzZXJJZCA9PSB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbaV0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAwID09IGkgPyAodGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJiZ19uYW1lXCIpLmdldENoaWxkQnlOYW1lKFwiU2NvcmVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gKChlW3RdLkZyYWN0aW9uICsgZVt0XS5zY29yZSkgLyB0aGlzLnBJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKSwgdGhpcy5sYW5kbG9hZHNMb2dvW2ldLmFjdGl2ZSAmJiAhdGhpcy5sYW5kbG9hZHNMb2dvWzFdLmFjdGl2ZSA/IHRoaXMuYmlsbE1lc3NhZ2VbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJ4XCIgKyBlW3RdLmNhcmRfbnVtIDogdGhpcy5sYW5kbG9hZHNMb2dvW2ldLmFjdGl2ZSB8fCB0aGlzLmxhbmRsb2Fkc0xvZ29bMV0uYWN0aXZlID8gdGhpcy5sYW5kbG9hZHNMb2dvWzFdLmFjdGl2ZSAmJiAodGhpcy5iaWxsTWVzc2FnZVtpXS5nZXRDaGlsZEJ5TmFtZShcImJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcInhcIiArIGVbdF0uY2FyZF9udW0pIDogdGhpcy5iaWxsTWVzc2FnZVtpXS5nZXRDaGlsZEJ5TmFtZShcImJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcInhcIiArIGVbdF0uY2FyZF9udW0pIDogMSA9PSBpID8gKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJpbGxcIikuYWN0aXZlID0gdHJ1ZSwgZVt0XS5GcmFjdGlvbiA+IDAgPyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCaWxsXCIpLmdldENoaWxkQnlOYW1lKFwiamllU2h1YW5cIikuZ2V0Q29tcG9uZW50KFwiZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5XCIpLmFybWF0dXJlKCkuYW5pbWF0aW9uLnBsYXkoXCJzaGVuZ2xpXCIsIDApIDogdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQmlsbFwiKS5nZXRDaGlsZEJ5TmFtZShcImppZVNodWFuXCIpLmdldENvbXBvbmVudChcImRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheVwiKS5hcm1hdHVyZSgpLmFuaW1hdGlvbi5wbGF5KFwic2hpYmFpXCIsIDApLCB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiAoZVt0XS5GcmFjdGlvbiA+IDAgPyBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc2h1WWluZ1sxXSwgZmFsc2UsIDEpIDogY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNodVlpbmdbMF0sIGZhbHNlLCAxKSksIHRoaXMucGJfTG93ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkXCIpLmdldENoaWxkQnlOYW1lKFwiaW50ZWdyYWxcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gKGVbdF0uRnJhY3Rpb24gLyB0aGlzLnBJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKSwgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQmlsbFwiKS5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWUgPSB0aGlzLmJpbGxCZ1sxXSwgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmxhY2tGYWNlXCIpLmFjdGl2ZSA9IHRydWUsIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJsYWNrRmFjZVwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9TaWdub3V0XCIpLmFjdGl2ZSA9IHRydWUsIHRoaXMuYmlsbE1lc3NhZ2VbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJ4XCIgKyBlW3RdLmNhcmRfbnVtKSA6IDIgPT0gaSAmJiAodGhpcy5vdGhlclR3b1IuZ2V0Q2hpbGRCeU5hbWUoXCJiZ19uYW1lXCIpLmdldENoaWxkQnlOYW1lKFwiU2NvcmVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gKChlW3RdLkZyYWN0aW9uICsgZVt0XS5zY29yZSkgLyB0aGlzLnBJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKSwgdGhpcy5sYW5kbG9hZHNMb2dvW2ldLmFjdGl2ZSAmJiAhdGhpcy5sYW5kbG9hZHNMb2dvWzFdLmFjdGl2ZSA/IHRoaXMuYmlsbE1lc3NhZ2VbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJ4XCIgKyBlW3RdLmNhcmRfbnVtIDogdGhpcy5sYW5kbG9hZHNMb2dvW2ldLmFjdGl2ZSB8fCB0aGlzLmxhbmRsb2Fkc0xvZ29bMV0uYWN0aXZlID8gdGhpcy5sYW5kbG9hZHNMb2dvWzFdLmFjdGl2ZSAmJiAodGhpcy5iaWxsTWVzc2FnZVtpXS5nZXRDaGlsZEJ5TmFtZShcImJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcInhcIiArIGVbdF0uY2FyZF9udW0pIDogdGhpcy5iaWxsTWVzc2FnZVtpXS5nZXRDaGlsZEJ5TmFtZShcImJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcInhcIiArIGVbdF0uY2FyZF9udW0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAxID09IHRoaXMudGVtcFBsYXllcnNMaXN0c1tpXS5pc0xhbmRsb3JkID8gdGhpcy5iaWxsTWVzc2FnZVtpXS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuYWN0aXZlID0gdHJ1ZSA6IHRoaXMuYmlsbE1lc3NhZ2VbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmFjdGl2ZSA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbGxNZXNzYWdlW2ldLmdldENoaWxkQnlOYW1lKFwibmlDaGVuZ1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbaV0ubmlDaGVuZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWxsTWVzc2FnZVtpXS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVNjb3JlXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IChlW3RdLkJvdHRvbSAvIHRoaXMucEluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpOyAvL3RoaXMucGJfTG93ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJkaVwiKS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVNjb3JlXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbGxNZXNzYWdlW2ldLmdldENoaWxkQnlOYW1lKFwiZ29sZFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAoZVt0XS5GcmFjdGlvbiAvIHRoaXMucEluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiBlKSB7XHJcbiAgICAgICAgICAgIGlmIChlW2tdLnVzZXJJZCA9PSB0aGlzLnBJbmZvLnBsYXllcklkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiZ29sZFwiKS5nZXRDaGlsZEJ5TmFtZShcImludGVncmFsXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IChlW2tdLnNjb3JlICogMC4wMSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9Db250aW51ZS1nYW1lXCIpLmFjdGl2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2FnYWluLmFjdGl2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUZpbmlzaCA9IHRydWVcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDpvKDmoIfkvqblkKzkuovku7ZcclxuICAgICAqL1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcigpIHtcclxuICAgICAgICAvL+W8gOWni1xyXG4gICAgICAgIHRoaXMuVG91Y2hTdGFydCA9IHRoaXMubm9kZS5vbihcInRvdWNoc3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMb2NhdCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihldmVudC5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RDYXJkcyh0aGlzLnN0YXJ0TG9jYXQpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckNhcmRzW2ldLnBvc2l0aW9uLnkgIT0gdGhpcy5tb3ZlZFkgJiYgaSA9PSB0aGlzLnBsYXllckNhcmRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR1b1BhaUNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXJDYXJkc1tpXS5wb3NpdGlvbi55ID09IHRoaXMubW92ZWRZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAvL+enu+WKqFxyXG4gICAgICAgIHRoaXMuVG91Y2hNb3ZlID0gdGhpcy5ub2RlLm9uKFwidG91Y2htb3ZlXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgYXIgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2FyZHMoYXIpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIC8v5YGc5q2iXHJcbiAgICAgICAgdGhpcy5Ub3VjaEVuZCA9IHRoaXMubm9kZS5vbihcInRvdWNoZW5kXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJDYXJkc1tpXS5jb2xvciA9PSBcInJnYmEoMTQ0LCAxNDQsIDE0NCwgMjU1KVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1tpXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS5tb3ZlQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbaV0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikuY2hhbmdlQmFpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudHVvUGFpQ291bnQgPSAwO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIC8v5Y+W5raIXHJcbiAgICAgICAgdGhpcy5Ub3VjaENhbmNlbCA9IHRoaXMubm9kZS5vbihcInRvdWNoY2FuY2VsXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJDYXJkc1tpXS5jb2xvciA9PSBcInJnYmEoMTQ0LCAxNDQsIDE0NCwgMjU1KVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1tpXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS5tb3ZlQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbaV0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikuY2hhbmdlQmFpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudHVvUGFpQ291bnQgPSAwO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOm8oOagh+S6i+S7tlxyXG4gICAgICovXHJcbiAgICB0dXJuT2ZmVG91Y2goKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInRvdWNoc3RhcnRcIiwgdGhpcy5Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKFwidG91Y2htb3ZlXCIsIHRoaXMuVG91Y2hNb3ZlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKFwidG91Y2hlbmRcIiwgdGhpcy5Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInRvdWNoY2FuY2VsXCIsIHRoaXMuVG91Y2hDYW5jZWwsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgZmluaXNoR2FtZSgpIHtcclxuICAgICAgICB0aGlzLnR1cm5PZmZUb3VjaCgpO1xyXG4gICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy5yZWN5Y2xpbmcubGVuZ3RoOyBlKyspXHJcbiAgICAgICAgICAgIGlmIChudWxsICE9IHRoaXMucmVjeWNsaW5nW2VdKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCB0aGlzLnJlY3ljbGluZ1tlXS5sZW5ndGg7IHQrKykgdGhpcy5jYXJkc1Bvb2wucHV0KHRoaXMucmVjeWNsaW5nW2VdW3RdKTtcclxuICAgICAgICB0aGlzLnJlY3ljbGluZyA9IFtcclxuICAgICAgICAgICAgW251bGxdLFxyXG4gICAgICAgICAgICBbbnVsbF0sXHJcbiAgICAgICAgICAgIFtudWxsXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yICh2YXIgZSA9IDA7IGUgPCB0aGlzLnBsYXllckNhcmRzLmxlbmd0aDsgZSsrKSB0aGlzLmNhcmRzUG9vbC5wdXQodGhpcy5wbGF5ZXJDYXJkc1tlXSk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJDYXJkcyA9IFtdLFxyXG4gICAgICAgICAgICB0aGlzLmxhbmRsb2Fkc0NhcmRzLmFjdGl2ZSA9IGZhbHNlLFxyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbFRpbWVyKCksXHJcbiAgICAgICAgICAgIGNjLmxvZyhcIue7k+adn2FsbFwiKTtcclxuICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMudGVtcFBsYXllcnNMaXN0cy5sZW5ndGg7IHQrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBlID0gMDsgZSA8IHRoaXMudGVtcFBsYXllcnNMaXN0c1t0XS5zdGF0ZS5sZW5ndGg7IGUrKykgbnVsbCAhPSB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbdF0uc3RhdGVbZV0gJiYgKHRoaXMudGVtcFBsYXllcnNMaXN0c1t0XS5zdGF0ZVtlXS5hY3RpdmUgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1t0XS5zdGF0ZSA9IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy5sYW5kbG9hZHNMb2dvLmxlbmd0aDsgZSsrKSB0aGlzLmxhbmRsb2Fkc0xvZ29bZV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5maXJzdE91dENhcmQgPSAxLFxyXG4gICAgICAgICAgICBudWxsICE9IHRoaXMuYnRuUGxheWVyU3RhdGUgJiYgKHRoaXMuYnRuUGxheWVyU3RhdGUuYWN0aXZlID0gZmFsc2UpLFxyXG4gICAgICAgICAgICB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiYmVpXCIpLmdldENoaWxkQnlOYW1lKFwiYmV0XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IDBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTlhajpg6jnirbmgIFcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQWxsU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxUaW1lcigpLFxyXG4gICAgICAgICAgICBjYy5sb2coXCLnp7vpmaRcIik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRlbXBQbGF5ZXJzTGlzdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbaV0uc3RhdGUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbaV0uc3RhdGVbal0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1tpXS5zdGF0ZVtqXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbaV0uc3RhdGUgPSBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJ0dW9HdWFuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub3RoZXJUd29SLmdldENoaWxkQnlOYW1lKFwidHVvR3VhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNhcmRzKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiUnVuaW5nQnV0dG9uQ2xpY2tcIikuY2FuY2VsVHVvR2F1bigpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN5paw5byA5aeL5ri45oiPXHJcbiAgICAgKi9cclxuICAgIHJlc2V0R2FtZSgpIHtcclxuICAgICAgICB0aGlzLmZpbmlzaEdhbWUoKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoKTtcclxuICAgIH0sXHJcbiAgICBtYXRjaGluZ1R5cGUoKSB7XHJcbiAgICAgICAgY2MubG9nKHRoaXMub3RoZXJDYXJkQXJyLCB0aGlzLmNvdW50KTtcclxuICAgICAgICB2YXIgZSA9IC0xO1xyXG4gICAgICAgIHRoaXMuY291bnQgPCAyID8gKGUgPSB0aGlzLmNhcmRUeXBlKHRoaXMub3RoZXJDYXJkQXJyKSwgdGhpcy5jaGVja1R5cGVOdW0oZSkpIDogdGhpcy5jb3VudCA+PSAyICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2godGhpcy5wbGF5ZXJDYXJkc1t0aGlzLnBsYXllckNhcmRzLmxlbmd0aCAtIDFdKVxyXG4gICAgfSxcclxuICAgIGNoZWNrVHlwZU51bShlKSB7XHJcbiAgICAgICAgdGhpcy5zYW1lRGlmZmVyZW50VmFsKCk7XHJcbiAgICAgICAgdmFyIHQsIGkgPSBbXSxcclxuICAgICAgICAgICAgbiA9IFtdLFxyXG4gICAgICAgICAgICBvID0gLTEsXHJcbiAgICAgICAgICAgIGEgPSAtMTtcclxuICAgICAgICBzd2l0Y2ggKGUudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1cmVUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMucHVyZUFyci5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMucHVyZUFycltzXS5sZW5ndGg7IGMrKykgbyA9IDEgPT0gdGhpcy5wdXJlQXJyW3NdW2NdWzBdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCA/IDEzLjEgOiAyID09IHRoaXMucHVyZUFycltzXVtjXVswXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgPyAxMy4yIDogdGhpcy5wdXJlQXJyW3NdW2NdWzBdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYSA9IDEgPT0gZS5tYXggPyAxMy4xIDogMiA9PSBlLm1heCA/IDEzLjIgOiBlLm1heCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbyA+IGEgJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaCh0aGlzLnB1cmVBcnJbc11bY11bMF0pO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyBjKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bY10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0ID09IG4ubGVuZ3RoICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2gobilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbNF1bc10ubGVuZ3RoOyBjKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bY10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMiA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgaWYgKHQgPSBlLmxlbmd0aCAvIDIsIDEgPT0gdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHVyZVR5cGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMucHVyZUFyclsxXS5sZW5ndGg7IHMrKykgaSA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLnB1c2godGhpcy5wdXJlQXJyWzFdW3NdWzBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS5wdXNoKHRoaXMucHVyZUFyclsxXVtzXVsxXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NhcmRzKGksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5wdXJlQXJyWzJdLmxlbmd0aDsgcysrKSBpID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkucHVzaCh0aGlzLnB1cmVBcnJbMl1bc11bMF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLnB1c2godGhpcy5wdXJlQXJyWzJdW3NdWzFdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2FyZHMoaSwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLnB1cmVBcnJbM10ubGVuZ3RoOyBzKyspIGkgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS5wdXNoKHRoaXMucHVyZUFyclszXVtzXVswXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkucHVzaCh0aGlzLnB1cmVBcnJbM11bc11bMV0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDYXJkcyhpLCBlKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbMV0ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHQgJiYgIShzICsgciA+PSB0aGlzLmNhcmRzR3JvdXBbMV0ubGVuZ3RoKTsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbMV1bcyArIHJdLmxlbmd0aDsgYysrKSBpLnB1c2godGhpcy5jYXJkc0dyb3VwWzFdW3MgKyByXVtjXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkubGVuZ3RoID09IGUubGVuZ3RoICYmIHRoaXMuZHJhd0NhcmRzKGksIGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyBjKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bY10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0ID09IG4ubGVuZ3RoICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2gobilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbNF1bc10ubGVuZ3RoOyBjKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bY10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMiA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbMF0ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBlLmxlbmd0aDsgYysrKSBzICsgYyA8IHRoaXMuY2FyZHNHcm91cFswXS5sZW5ndGggJiYgaS5wdXNoKHRoaXMuY2FyZHNHcm91cFswXVtzICsgY11bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGkubGVuZ3RoID09IGUubGVuZ3RoICYmIHRoaXMuZHJhd0NhcmRzKGksIGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IGMrKykgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtjXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aDsgcysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFs0XVtzXS5sZW5ndGg7IGMrKykgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFs0XVtzXVtjXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyID09IG4ubGVuZ3RoICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2gobilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0ID0gZS5sZW5ndGggLyAzO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0OyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzICsgciA8IHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzJdW3MgKyByXS5sZW5ndGg7IGMrKykgaS5wdXNoKHRoaXMuY2FyZHNHcm91cFsyXVtzICsgcl1bY10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaS5sZW5ndGggPT0gZS5sZW5ndGggJiYgdGhpcy5kcmF3Q2FyZHMoaSwgZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyBjKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bY10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0ID09IG4ubGVuZ3RoICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2gobilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbNF1bc10ubGVuZ3RoOyBjKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bY10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMiA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbCA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGU6IGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgYysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaS5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtjXSksIDQgPT0gaS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVyZVR5cGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGggPSAwOyBoIDwgdGhpcy5wdXJlQXJyWzBdLmxlbmd0aDsgaCsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLnB1c2godGhpcy5wdXJlQXJyWzBdW2hdWzBdKSwgaS5sZW5ndGggPT0gZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2FyZHMoaSwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkubGVuZ3RoIDwgZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMTsgciA+IC0xOyByLS0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgaS5sZW5ndGg7IGQrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpW2RdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCAhPSB0aGlzLnBsYXllckNhcmRzW3JdLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoMTQgPT0gdGhpcy5wbGF5ZXJDYXJkc1tyXS52YWwgfHwgMTUgPT0gdGhpcy5wbGF5ZXJDYXJkc1tyXS52YWwpICYmIGwgPCAxKSBsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKDE0ID09IHRoaXMucGxheWVyQ2FyZHNbcl0udmFsIHx8IDE1ID09IHRoaXMucGxheWVyQ2FyZHNbcl0udmFsKSAmJiAxID09IGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkID09IGkubGVuZ3RoIC0gMSAmJiAoaS5wdXNoKHRoaXMucGxheWVyQ2FyZHNbcl0pLCBpLmxlbmd0aCA9PSBlLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2FyZHMoaSwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNCA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGU6IGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgYysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaS5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtjXSksIDQgPT0gaS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVyZVR5cGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGggPSAwOyBoIDwgdGhpcy5wdXJlQXJyWzFdLmxlbmd0aDsgaCsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLnB1c2godGhpcy5wdXJlQXJyWzFdW2hdWzBdKSwgaS5wdXNoKHRoaXMucHVyZUFyclsxXVtoXVsxXSksIGkubGVuZ3RoID09IGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NhcmRzKGksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkubGVuZ3RoIDwgZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaCA9IDA7IGggPCB0aGlzLnB1cmVBcnJbMl0ubGVuZ3RoOyBoKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLnB1c2godGhpcy5wdXJlQXJyWzJdW2hdWzBdKSwgaS5wdXNoKHRoaXMucHVyZUFyclsyXVtoXVsxXSksIGkubGVuZ3RoID09IGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDYXJkcyhpLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkubGVuZ3RoIDwgZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaCA9IDA7IGggPCB0aGlzLnB1cmVBcnJbM10ubGVuZ3RoOyBoKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHUgPSAwOyB1IDwgaS5sZW5ndGggJiYgaVt1XS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgIT0gdGhpcy5wdXJlQXJyWzNdW2hdWzBdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbDsgdSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHUgPT0gaS5sZW5ndGggLSAxICYmIChpLnB1c2godGhpcy5wdXJlQXJyWzNdW2hdWzBdKSwgaS5wdXNoKHRoaXMucHVyZUFyclszXVtoXVsxXSksIGkubGVuZ3RoID09IGUubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NhcmRzKGksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyBjKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bY10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0ID09IG4ubGVuZ3RoICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2gobilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbNF1bc10ubGVuZ3RoOyBjKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bY10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMiA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgdmFyIGwgPSAwO1xyXG4gICAgICAgICAgICAgICAgdCA9IGUubGVuZ3RoIC8gNDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocyArIHIgPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbMl1bcyArIHJdLmxlbmd0aDsgYysrKSBpLnB1c2godGhpcy5jYXJkc0dyb3VwWzJdW3MgKyByXVtjXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXJlVHlwZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5wdXJlQXJyWzBdLmxlbmd0aDsgYysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaS5wdXNoKHRoaXMucHVyZUFyclswXVtjXVswXSksIGkubGVuZ3RoID09IGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDYXJkcyhpLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaS5sZW5ndGggPCBlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IGkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlOiBmb3IgKHZhciByID0gdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGggLSAxOyByID4gLTE7IHItLSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgbSAmJiBpW2RdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCAhPSB0aGlzLnBsYXllckNhcmRzW3JdLnZhbDsgZCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgxNCA9PSB0aGlzLnBsYXllckNhcmRzW3JdLnZhbCB8fCAxNSA9PSB0aGlzLnBsYXllckNhcmRzW3JdLnZhbCkgJiYgbCA8IDEpIGwrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoMTQgPT0gdGhpcy5wbGF5ZXJDYXJkc1tyXS52YWwgfHwgMTUgPT0gdGhpcy5wbGF5ZXJDYXJkc1tyXS52YWwpICYmIDEgPT0gbCkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQgPT0gbSAtIDEgJiYgKGNjLmxvZyh0aGlzLnBsYXllckNhcmRzW3JdLnZhbCksIGkucHVzaCh0aGlzLnBsYXllckNhcmRzW3JdKSwgaS5sZW5ndGggPT0gZS5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NhcmRzKGksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNCA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgIHQgPSBlLmxlbmd0aCAvIDU7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHQ7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgKyByIDwgdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzJdW3MgKyByXS5sZW5ndGg7IGMrKykgaS5wdXNoKHRoaXMuY2FyZHNHcm91cFsyXVtzICsgcl1bY10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHVyZVR5cGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBoID0gMDsgaCA8IHRoaXMucHVyZUFyclsxXS5sZW5ndGg7IGgrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkucHVzaCh0aGlzLnB1cmVBcnJbMV1baF1bMF0pLCBpLnB1c2godGhpcy5wdXJlQXJyWzFdW2hdWzFdKSwgaS5sZW5ndGggPT0gZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NhcmRzKGksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpLmxlbmd0aCA8IGUubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBoID0gMDsgaCA8IHRoaXMucHVyZUFyclsyXS5sZW5ndGg7IGgrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHUgPSAwOyB1IDwgaS5sZW5ndGggJiYgaVt1XS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgIT0gdGhpcy5wdXJlQXJyWzJdW2hdWzBdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbDsgdSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1ID09IGkubGVuZ3RoIC0gMSAmJiAoaS5wdXNoKHRoaXMucHVyZUFyclsyXVtoXVswXSksIGkucHVzaCh0aGlzLnB1cmVBcnJbMl1baF1bMV0pLCBpLmxlbmd0aCA9PSBlLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2FyZHMoaSwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpLmxlbmd0aCA8IGUubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBoID0gMDsgaCA8IHRoaXMucHVyZUFyclszXS5sZW5ndGg7IGgrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLnB1c2godGhpcy5wdXJlQXJyWzNdW2hdWzBdKSwgaS5wdXNoKHRoaXMucHVyZUFyclszXVtoXVsxXSksIGkubGVuZ3RoID09IGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2FyZHMoaSwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNCA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgYysrKSBpLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS5sZW5ndGggPT0gZS5sZW5ndGggJiYgdGhpcy5kcmF3Q2FyZHMoaSwgZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbNF1bc10ubGVuZ3RoOyBjKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bY10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMiA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBzQ2FyZHNBcnIgPSBbXVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0aXBzQ2xpY2soKSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy5hbGxvd1RpcHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFsbG93VGlwcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KCdUaXBzQ2FyZHMnKTtcclxuICAgICAgICAvLyAwID09IHRoaXMudGlwc0NvdW50ICYmIHRoaXMubWF0Y2hpbmdUeXBlKCksXHJcbiAgICAgICAgLy8gICAgIHRoaXMudGlwc0NvdW50ID49IHRoaXMudGlwc0NhcmRzQXJyLmxlbmd0aCAmJiAodGhpcy50aXBzQ291bnQgPSAwKTtcclxuICAgICAgICAvLyBmb3IgKHZhciBlID0gMDsgZSA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyBlKyspIHRoaXMucGxheWVyQ2FyZHNbZV0ucG9zaXRpb24ueSA9PSB0aGlzLm1vdmVkWSAmJiB0aGlzLnBsYXllckNhcmRzW2VdLmdldENvbXBvbmVudChcIkNhcmRzXCIpLm1vdmVDYXJkKCk7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMudGlwc0NhcmRzQXJyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMudGlwc0NhcmRzQXJyW3RoaXMudGlwc0NvdW50XS5sZW5ndGggPiAwKVxyXG4gICAgICAgIC8vICAgICAgICAgZm9yICh2YXIgZSA9IDA7IGUgPCB0aGlzLnRpcHNDYXJkc0Fyclt0aGlzLnRpcHNDb3VudF0ubGVuZ3RoOyBlKyspIHRoaXMudGlwc0NhcmRzQXJyW3RoaXMudGlwc0NvdW50XVtlXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS5tb3ZlQ2FyZCgpLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNjLmxvZyh0aGlzLnRpcHNDYXJkc0Fyclt0aGlzLnRpcHNDb3VudF1bZV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsKTtcclxuICAgICAgICAvLyAgICAgZWxzZSB0aGlzLnRpcHNDYXJkc0Fyclt0aGlzLnRpcHNDb3VudF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikubW92ZUNhcmQoKSxcclxuICAgICAgICAvLyAgICAgICAgIGNjLmxvZyh0aGlzLnRpcHNDYXJkc0Fyclt0aGlzLnRpcHNDb3VudF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsKTtcclxuICAgICAgICAvLyAgICAgdGhpcy50aXBzQ291bnQrK1xyXG4gICAgICAgIC8vIH0gZWxzZSB0aGlzLnR1b0d1YW4gPT0gZmFsc2UgPyAodGhpcy5hbGxUaXBzWzFdLmdldENoaWxkQnlOYW1lKFwiUHJvbXB0MlwiKS5hY3RpdmUgPSB0cnVlLCB0aGlzLmFsbFRpcHNbMV0uZ2V0Q2hpbGRCeU5hbWUoXCJQcm9tcHQyXCIpLmdldENvbXBvbmVudChcImNjLkFuaW1hdGlvblwiKS5wbGF5KCksIHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJMYW5kbG9yZHNCdXR0b25DbGlja1wiKS5ub091dCgpKSA6IHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJMYW5kbG9yZHNCdXR0b25DbGlja1wiKS5ub091dCgpXHJcbiAgICB9LFxyXG5cclxuICAgIHRpcHNDbGlja0NhbGxCYWNrKHJlcykge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYWxsb3dUaXBzID0gZmFsc2U7XHJcbiAgICAgICAgfSwxKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMucGxheWVyQ2FyZHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQ2FyZHNbaV0ueSA9PSB0aGlzLm1vdmVkWSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1tpXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS5tb3ZlQ2FyZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHJlcy5jYXJkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIHRoaXMucGxheWVyQ2FyZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJDYXJkc1tqXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgPT0gcmVzLmNhcmRbaV0udmFsICYmIHRoaXMucGxheWVyQ2FyZHNbal0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudHlwZSA9PSByZXMuY2FyZFtpXS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbal0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikubW92ZUNhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV0V29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdChcInNlbmRDYXJkc0FyclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYXk6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5wSW5mby5wbGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZUlkOiB0aGlzLm5ldFdvcmsudGFibGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBzZWF0SWQ6IHRoaXMubmV0V29yay5zZWF0SWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG1wVHVvZ3Vhbikge1xyXG4gICAgICAgICAgICB0aGlzLnRtcFR1b2d1YW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dENhcmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgeGlUb25nU29ydGluZyhlKSB7XHJcbiAgICAgICAgdmFyIHQgPSBbXTtcclxuICAgICAgICBlLnNvcnQoZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUudmFsID09IHQudmFsID8gdC50eXBlIC0gZS50eXBlIDogdC52YWwgLSBlLnZhbFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgbiA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBvID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIGEgPSBudWxsOyBpIDwgZS5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgaWYgKGVbaV0udmFsID4gMTMpIG4gPSBpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICgyID09IGVbaV0udmFsIHx8IDEgPT0gZVtpXS52YWwpIHtcclxuICAgICAgICAgICAgbyA9IGk7XHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChudWxsID09IG4gJiYgbnVsbCAhPSBvKSB7XHJcbiAgICAgICAgICAgIGEgPSBlLnNwbGljZShpLCBlLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IGEubGVuZ3RoOyBzKyspIGUuc3BsaWNlKHMsIDAsIGFbc10pXHJcbiAgICAgICAgfSBlbHNlIGlmIChudWxsICE9IG4gJiYgbnVsbCAhPSBvKSB7XHJcbiAgICAgICAgICAgIGEgPSBlLnNwbGljZShpLCBlLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IGEubGVuZ3RoOyBzKyspIGUuc3BsaWNlKG4gKyBzICsgMSwgMCwgYVtzXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGUubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHQucHVzaChlW2ldKTtcclxuICAgICAgICByZXR1cm4gZVxyXG4gICAgfSxcclxuICAgIHhpVG9uZ091dENhcmQoZSkge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsVGltZXIoKSxcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcmQgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IGUubGVuZ3RoOyB0KyspXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIGlmIChlW3RdLnZhbCA9PSB0aGlzLnBsYXllckNhcmRzW2ldLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCAmJiBlW3RdLnR5cGUgPT0gdGhpcy5wbGF5ZXJDYXJkc1tpXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcmQucHVzaCh0aGlzLnBsYXllckNhcmRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJkID0gdGhpcy5hbGxTb3J0aW5nKHRoaXMuc2VsZWN0ZWRDYXJkKSxcclxuICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzWzFdLm91dENhcmQucHVzaCh0aGlzLnNlbGVjdGVkQ2FyZCksXHJcbiAgICAgICAgICAgIHRoaXMuaWRlbnRpZnlDYXJkcygpXHJcbiAgICB9LFxyXG4gICAgdGVTaHVDaHVQYWkoZSkge1xyXG4gICAgICAgIGZvciAodmFyIHQsIGkgPSBbXSwgbiA9IDA7IG4gPCBlLmxlbmd0aDsgbisrKSB0ID0gdGhpcy5jYXJkc1Bvb2wuc2l6ZSgpID4gMCA/IHRoaXMuY2FyZHNQb29sLmdldCgpIDogY2MuaW5zdGFudGlhdGUodGhpcy5wYl9DYXJkcyksXHJcbiAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQodCksXHJcbiAgICAgICAgICAgIHQuZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikuY2FyZHNDcmVhdGUoZVtuXS52YWwsIGVbbl0udHlwZSksXHJcbiAgICAgICAgICAgIGkucHVzaCh0KTtcclxuICAgICAgICBpID0gdGhpcy5hbGxTb3J0aW5nKGkpO1xyXG4gICAgICAgIHZhciBvID0gbnVsbCxcclxuICAgICAgICAgICAgYSA9IG51bGw7XHJcbiAgICAgICAgaWYgKGkubGVuZ3RoICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgIGEgPSBpLmxlbmd0aCAvIDI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgaS5sZW5ndGg7IG4rKykgaVtuXS5zY2FsZSA9IC44LFxyXG4gICAgICAgICAgICAgICAgbyA9IC1hICogdGhpcy5zbWFsbERpc3RhbmNlQ2FyZCArIG4gKiB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkIC0gaVtuXS5nZXRDb250ZW50U2l6ZSgpLndpZHRoICogaVtuXS5zY2FsZSAvIDIgKyB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkIC8gMixcclxuICAgICAgICAgICAgICAgIGlbbl0uc2V0UG9zaXRpb24oY2MudjIobywgdGhpcy5maW5pc2hZKSksXHJcbiAgICAgICAgICAgICAgICBpW25dLnpJbmRleCA9IG47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYSA9IChpLmxlbmd0aCAtIDEpIC8gMjtcclxuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBpLmxlbmd0aDsgbisrKSBpW25dLnNjYWxlID0gLjgsXHJcbiAgICAgICAgICAgICAgICBvID0gLWEgKiB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkICsgbiAqIHRoaXMuc21hbGxEaXN0YW5jZUNhcmQgLSBpW25dLmdldENvbnRlbnRTaXplKCkud2lkdGggKiBpW25dLnNjYWxlIC8gMixcclxuICAgICAgICAgICAgICAgIGlbbl0uc2V0UG9zaXRpb24oY2MudjIobywgdGhpcy5maW5pc2hZKSksXHJcbiAgICAgICAgICAgICAgICBpW25dLnpJbmRleCA9IG47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1sxXS5vdXRDYXJkLnB1c2goaSksXHJcbiAgICAgICAgICAgIHRoaXMucmVjeWNsaW5nWzFdID0gaVxyXG4gICAgfSxcclxuICAgIGFsbFNvcnRpbmcoZSkge1xyXG4gICAgICAgIHZhciB0ID0gW107XHJcbiAgICAgICAgZS5zb3J0KGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCA9PSB0LmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCA/IHQuZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudHlwZSAtIGUuZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudHlwZSA6IHQuZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudmFsIC0gZS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWxcclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCxcclxuICAgICAgICAgICAgICAgIG4gPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgbyA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBhID0gbnVsbDsgaSA8IGUubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGlmIChlW2ldLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCA+IDEzKSBuID0gaTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoMiA9PSBlW2ldLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCB8fCAxID09IGVbaV0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudmFsKSB7XHJcbiAgICAgICAgICAgIG8gPSBpO1xyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVsbCA9PSBuICYmIG51bGwgIT0gbykge1xyXG4gICAgICAgICAgICBhID0gZS5zcGxpY2UoaSwgZS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCBhLmxlbmd0aDsgcysrKSBlLnNwbGljZShzLCAwLCBhW3NdKVxyXG4gICAgICAgIH0gZWxzZSBpZiAobnVsbCAhPSBuICYmIG51bGwgIT0gbykge1xyXG4gICAgICAgICAgICBhID0gZS5zcGxpY2UoaSwgZS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCBhLmxlbmd0aDsgcysrKSBlLnNwbGljZShuICsgcyArIDEsIDAsIGFbc10pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSBlLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB0LnB1c2goZVtpXSk7XHJcbiAgICAgICAgcmV0dXJuIGVcclxuICAgIH0sXHJcbiAgICBkcmF3Q2FyZHMoZSwgdCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBbXSwgbiA9IGUubGVuZ3RoIC0gMTsgbiA+IC0xOyBuLS0pIGkucHVzaCh7XHJcbiAgICAgICAgICAgIHZhbDogZVtuXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWxcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgbztcclxuICAgICAgICAxID09IHQudHlwZSA/IG8gPSB0aGlzLmNoZWNrRHVpWmkoaSkgOiAyID09IHQudHlwZSA/IG8gPSB0aGlzLmNoZWNrU2h1blppKGkpIDogMyA9PSB0LnR5cGUgPyBvID0gdGhpcy5jaGVja1Nhbk9yU2h1bihpKSA6IDQgPT0gdC50eXBlID8gbyA9IHRoaXMuY2hlY2tTaVRha2VUd28oaSkgOiA1ID09IHQudHlwZSA/IG8gPSB0aGlzLmNoZWNrU2lUYWtlVHdvU2h1YW5nKGkpIDogNiA9PSB0LnR5cGUgPyBvID0gdGhpcy5jaGVja1Nhbk9yUGxhbmUoaSkgOiA3ID09IHQudHlwZSA/IG8gPSB0aGlzLmNoZWNrU2FuU2h1YW5nT3JQbGFuZShpKSA6IDggPT0gdC50eXBlICYmIChvID0gdGhpcy5jaGVja1NpKGkpKSxcclxuICAgICAgICAgICAgby5udW0gPiAwICYmICgxID09IG8ubWF4ID8gby5tYXggKz0gMTIuMSA6IDIgPT0gby5tYXggJiYgKG8ubWF4ICs9IDExLjIpLCAxID09IHQubWF4ID8gdC5tYXggKz0gMTIuMSA6IDIgPT0gdC5tYXggJiYgKHQubWF4ICs9IDExLjIpLCBvLm1heCA+IHQubWF4ICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2goZSkpXHJcbiAgICB9LFxyXG4gICAgc2FtZURpZmZlcmVudFZhbCgpIHtcclxuICAgICAgICB0aGlzLmNhcmRzR3JvdXAgPSBbXHJcbiAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICBbXSxcclxuICAgICAgICAgICAgW10sXHJcbiAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICBbXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yICh2YXIgZSA9IDA7IGUgPCB0aGlzLkNhcmRzTnVtLmxlbmd0aDsgZSsrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciB0ID0gW10sIGkgPSBbXSwgbiA9IFtdLCBvID0gW10sIGEgPSBbXSwgcyA9IDAsIGMgPSB0aGlzLnBsYXllckNhcmRzLmxlbmd0aCAtIDE7IGMgPiAtMTsgYy0tKSB0aGlzLkNhcmRzTnVtW2VdID09IHRoaXMucGxheWVyQ2FyZHNbY10uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudmFsICYmICgxNCA9PSB0aGlzLkNhcmRzTnVtW2VdIHx8IDE1ID09IHRoaXMuQ2FyZHNOdW1bZV0gPyBzID0gNSA6IHMrKywgMSA9PSBzID8gKHQucHVzaCh0aGlzLnBsYXllckNhcmRzW2NdKSwgaS5wdXNoKHRoaXMucGxheWVyQ2FyZHNbY10pLCBuLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tjXSksIG8ucHVzaCh0aGlzLnBsYXllckNhcmRzW2NdKSwgdGhpcy5jYXJkc0dyb3VwWzBdLnB1c2godCkpIDogMiA9PSBzID8gKGkucHVzaCh0aGlzLnBsYXllckNhcmRzW2NdKSwgbi5wdXNoKHRoaXMucGxheWVyQ2FyZHNbY10pLCBvLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tjXSksIHRoaXMuY2FyZHNHcm91cFsxXS5wdXNoKGkpKSA6IDMgPT0gcyA/IChuLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tjXSksIG8ucHVzaCh0aGlzLnBsYXllckNhcmRzW2NdKSwgdGhpcy5jYXJkc0dyb3VwWzJdLnB1c2gobikpIDogNCA9PSBzID8gKG8ucHVzaCh0aGlzLnBsYXllckNhcmRzW2NdKSwgdGhpcy5jYXJkc0dyb3VwWzNdLnB1c2gobykpIDogNSA9PSBzICYmIChhLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tjXSksIHRoaXMuY2FyZHNHcm91cFs0XS5wdXNoKGEpKSlcclxuICAgIH0sXHJcbiAgICBwdXJlVHlwZSgpIHtcclxuICAgICAgICB0aGlzLnB1cmVBcnIgPSBbXHJcbiAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICBbXSxcclxuICAgICAgICAgICAgW10sXHJcbiAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICBbXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yICh2YXIgZSA9IDA7IGUgPCB0aGlzLkNhcmRzTnVtLmxlbmd0aDsgZSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHQgPSBbXSwgaSA9IDAsIG4gPSB0aGlzLnBsYXllckNhcmRzLmxlbmd0aCAtIDE7IG4gPiAtMTsgbi0tKSB0aGlzLkNhcmRzTnVtW2VdID09IHRoaXMucGxheWVyQ2FyZHNbbl0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudmFsICYmICgxNCA9PSB0aGlzLkNhcmRzTnVtW2VdIHx8IDE1ID09IHRoaXMuQ2FyZHNOdW1bZV0gPyAodC5wdXNoKHRoaXMucGxheWVyQ2FyZHNbbl0pLCBpICs9IDUpIDogKHQucHVzaCh0aGlzLnBsYXllckNhcmRzW25dKSwgaSsrKSk7XHJcbiAgICAgICAgICAgIDEgPT0gaSB8fCA1ID09IGkgPyB0aGlzLnB1cmVBcnJbMF0ucHVzaCh0KSA6IDIgPT0gaSA/IHRoaXMucHVyZUFyclsxXS5wdXNoKHQpIDogMyA9PSBpID8gdGhpcy5wdXJlQXJyWzJdLnB1c2godCkgOiA0ID09IGkgJiYgdGhpcy5wdXJlQXJyWzNdLnB1c2godCksXHJcbiAgICAgICAgICAgICAgICA1ID09IGkgJiYgdGhpcy5wdXJlQXJyWzRdLnB1c2godClcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdHVvUGFpKCkge1xyXG4gICAgICAgIHZhciBlID0gLTEsXHJcbiAgICAgICAgICAgIHQgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5jb3VudCA8IDIpIHtcclxuICAgICAgICAgICAgZSA9IHRoaXMuY2FyZFR5cGUodGhpcy5vdGhlckNhcmRBcnIpO1xyXG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMueHVhblBhaShlKTtcclxuICAgICAgICAgICAgdGhpcy55aURvbmcoaSlcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY291bnQgPj0gMikge1xyXG4gICAgICAgICAgICB0aGlzLnNhbWVEaWZmZXJlbnRWYWwoKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB0aGlzLnBsYXllckNhcmRzLmxlbmd0aDsgbisrKSB0aGlzLnBsYXllckNhcmRzW25dLnBvc2l0aW9uLnkgPT0gdGhpcy5tb3ZlZFkgJiYgdC5wdXNoKHRoaXMucGxheWVyQ2FyZHNbbl0pO1xyXG4gICAgICAgICAgICBpZiAodC5sZW5ndGggPCAxKSByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdF9zaHVuWmkoZSkge1xyXG4gICAgICAgIGZvciAodmFyIHQsIGkgPSB0aGlzLmNhcmRzR3JvdXBbMF0ubGVuZ3RoLCBuID0gW107IGkgPj0gNTspXHJcbiAgICAgICAgICAgIGZvciAodmFyIG8gPSAwOyBvIDwgdGhpcy5jYXJkc0dyb3VwWzBdLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIShvICsgaSA8PSB0aGlzLmNhcmRzR3JvdXBbMF0ubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCBpOyBhKyspXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMF1bYSArIG9dWzBdKSwgbi5sZW5ndGggPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb2luY2lkZW5jZShuLCBlKSAmJiB0aGlzLnFpQ2FyZHMobiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuZGlmZmVyZW50WnUobiwgZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55aURvbmcodCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhID09IHRoaXMuY2FyZHNHcm91cFswXS5sZW5ndGggLSAxICYmIG4ubGVuZ3RoIDwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdF9saWFuRHVpKGUpIHtcclxuICAgICAgICBmb3IgKHZhciB0LCBpID0gMiAqIHRoaXMuY2FyZHNHcm91cFsxXS5sZW5ndGgsIG4gPSBbXTsgaSA+IDU7KVxyXG4gICAgICAgICAgICBpZiAoaSAlIDIgPT0gMClcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG8gPSAwOyBvIDwgdGhpcy5jYXJkc0dyb3VwWzFdLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobyArIGkgLyAyIDw9IHRoaXMuY2FyZHNHcm91cFsxXS5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgaSAvIDI7IGErKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMV1bYSArIG9dWzBdKSwgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFsxXVthICsgb11bMV0pLCBuLmxlbmd0aCA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb2luY2lkZW5jZShuLCBlKSAmJiB0aGlzLnFpQ2FyZHMobiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSB0aGlzLmRpZmZlcmVudFp1KG4sIGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlpRG9uZyh0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhID09IHRoaXMuY2FyZHNHcm91cFsxXS5sZW5ndGggLSAxICYmIG4ubGVuZ3RoIDwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGktLVxyXG4gICAgfSxcclxuICAgIHRfc2FuU2h1bihlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgdCwgaSA9IDMgKiB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoLCBuID0gW107IGkgPiAyOylcclxuICAgICAgICAgICAgaWYgKGkgJSAzID09IDApXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBvID0gMDsgbyA8IHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGg7IG8rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKG8gKyBpIC8gMyA8PSB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBhID0gMDsgYSA8IGkgLyAzOyBhKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLnB1c2godGhpcy5jYXJkc0dyb3VwWzJdW2EgKyBvXVswXSksIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMl1bYSArIG9dWzFdKSwgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFsyXVthICsgb11bMl0pLCBuLmxlbmd0aCA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb2luY2lkZW5jZShuLCBlKSAmJiB0aGlzLnFpQ2FyZHMobiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSB0aGlzLmRpZmZlcmVudFp1KG4sIGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlpRG9uZyh0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhID09IHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGggLSAxICYmIG4ubGVuZ3RoIDwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGktLVxyXG4gICAgfSxcclxuICAgIHRfc2FuRGFpWWkoZSkge1xyXG4gICAgICAgIGZvciAodmFyIHQsIGkgPSAzICogdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aCwgbiA9IFtdOyBpID4gMzspXHJcbiAgICAgICAgICAgIGlmIChpICUgMyA9PSAwKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbyA9IDA7IG8gPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShvICsgaSAvIDMgPD0gdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCBpIC8gMzsgYSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5wdXNoKHRoaXMuY2FyZHNHcm91cFsyXVthICsgb11bMF0pLCBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzJdW2EgKyBvXVsxXSksIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMl1bYSArIG9dWzJdKSwgbi5sZW5ndGggPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IHRoaXMueWlKaU5leHQobiwgZSksIGMgPSAwOyBjIDwgcy5sZW5ndGg7IGMrKykgbi5wdXNoKHNbY10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMubGVuZ3RoIDwgaSAvIDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IG4ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGU6IGZvciAodmFyIGMgPSB0aGlzLnBsYXllckNhcmRzLmxlbmd0aCAtIDE7IGMgPiAtMTsgYy0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IHIgJiYgbltsXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgIT0gdGhpcy5wbGF5ZXJDYXJkc1tjXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWw7IGwrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgxNCA9PSB0aGlzLnBsYXllckNhcmRzW2NdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCB8fCAxNSA9PSB0aGlzLnBsYXllckNhcmRzW2NdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCkgJiYga2luZ051bSA8IDEpIGtpbmdOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCgxNCA9PSB0aGlzLnBsYXllckNhcmRzW2NdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCB8fCAxNSA9PSB0aGlzLnBsYXllckNhcmRzW2NdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCkgJiYgMSA9PSBraW5nTnVtKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsID09IHIgLSAxICYmIChuLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tjXSksIG4ubGVuZ3RoID09IGkgLyAzICogNCAmJiB0aGlzLmNvaW5jaWRlbmNlKG4sIGUpICYmIHRoaXMucWlDYXJkcyhuLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSB0aGlzLmRpZmZlcmVudFp1KG4sIGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlpRG9uZyh0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4ubGVuZ3RoID09IGkgLyAzICogNCAmJiB0aGlzLmNvaW5jaWRlbmNlKG4sIGUpICYmIHRoaXMucWlDYXJkcyhuLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuZGlmZmVyZW50WnUobiwgZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueWlEb25nKHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGEgPT0gdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aCAtIDEgJiYgbi5sZW5ndGggPCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaS0tXHJcbiAgICB9LFxyXG4gICAgdF9zYW5EYWlZaUR1aShlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgdCwgaSA9IDMgKiB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoLCBuID0gW107IGkgPiA0OylcclxuICAgICAgICAgICAgaWYgKGkgJSAzID09IDApXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBvID0gMDsgbyA8IHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGg7IG8rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKG8gKyBpIC8gMyA8PSB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBhID0gMDsgYSA8IGkgLyAzOyBhKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLnB1c2godGhpcy5jYXJkc0dyb3VwWzJdW2EgKyBvXVswXSksIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMl1bYSArIG9dWzFdKSwgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFsyXVthICsgb11bMl0pLCBuLmxlbmd0aCA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IHRoaXMueWlKaU5leHQobiwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShzLmxlbmd0aCA8PSBpIC8gMykpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzLmxlbmd0aDsgYysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzFdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzFdW3JdWzBdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCA9PSBzW2NdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgbi5sZW5ndGggJiYgbltsXSAhPSBzW2NdOyBsKyspIGwgPT0gbi5sZW5ndGggLSAxICYmIChuLnB1c2godGhpcy5jYXJkc0dyb3VwWzFdW3JdWzBdKSwgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFsxXVtyXVsxXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5sZW5ndGggPT0gaSAvIDMgKiA1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobi5sZW5ndGggPT0gaSAvIDMgKiA0ICYmIHRoaXMuY29pbmNpZGVuY2UobiwgZSkgJiYgdGhpcy5xaUNhcmRzKG4sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuZGlmZmVyZW50WnUobiwgZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlpRG9uZyh0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpLS1cclxuICAgIH0sXHJcbiAgICB5aUppTmV4dChlLCB0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IFtdLCBuID0gMDsgbiA8IHQubGVuZ3RoOyBuKyspXHJcbiAgICAgICAgICAgIGZvciAodmFyIG8gPSAwOyBvIDwgZS5sZW5ndGggJiYgdFtuXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgIT0gZVtvXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWw7IG8rKylcclxuICAgICAgICAgICAgICAgIGlmIChvID09IGUubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGkucHVzaCh0W25dKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpXHJcbiAgICB9LFxyXG4gICAgZGlmZmVyZW50WnUoZSwgdCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBbXSwgbiA9IDA7IG4gPCBlLmxlbmd0aDsgbisrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciBvID0gMDsgbyA8IHQubGVuZ3RoICYmIChlW25dLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCAhPSB0W29dLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCB8fCBlW25dLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnR5cGUgIT0gdFtvXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS50eXBlKTsgbysrKSBvID09IHQubGVuZ3RoIC0gMSAmJiBpLnB1c2goZVtuXSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHVvUGFpQ291bnQrKyxcclxuICAgICAgICAgICAgaVxyXG4gICAgfSxcclxuICAgIGNvaW5jaWRlbmNlKGUsIHQpIHtcclxuICAgICAgICBjYy5sb2codFswXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBlLmxlbmd0aCAmJiB0W2ldLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCAhPSBlW25dLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbDsgbisrKVxyXG4gICAgICAgICAgICAgICAgaWYgKG4gPT0gZS5sZW5ndGggLSAxKSByZXR1cm4gY2MubG9nKHRbaV0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudmFsKSxcclxuICAgICAgICAgICAgICAgICAgICBmYWxzZTtcclxuICAgICAgICByZXR1cm4gITBcclxuICAgIH0sXHJcbiAgICB5aURvbmcoZSkge1xyXG4gICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgZS5sZW5ndGg7IHQrKykgZVt0XS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS5tb3ZlQ2FyZCgpXHJcbiAgICB9LFxyXG4gICAgeWlKaShlLCB0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IFtdLCBuID0gW10sIG8gPSAwOyBvIDwgZS5sZW5ndGg7IG8rKylcclxuICAgICAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCB0Lmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodFthXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgPT0gZVtvXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgJiYgdFthXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS50eXBlID09IGVbb10uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGkucHVzaCh0W2FdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYSA9PSB0Lmxlbmd0aCAtIDEgJiYgbi5wdXNoKHRbYV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzYW1lOiBpLFxyXG4gICAgICAgICAgICBkaWZmZXJlbnQ6IG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgeHVhblBhaShlKSB7XHJcbiAgICAgICAgdGhpcy5zYW1lRGlmZmVyZW50VmFsKCk7XHJcbiAgICAgICAgZm9yICh2YXIgdCwgaSwgbiA9IFtdLCBvID0gW10sIGEgPSBbXSwgcyA9IDA7IHMgPCB0aGlzLnBsYXllckNhcmRzLmxlbmd0aDsgcysrKSB0aGlzLnBsYXllckNhcmRzW3NdLnBvc2l0aW9uLnkgPT0gdGhpcy5tb3ZlZFkgJiYgYS5wdXNoKHRoaXMucGxheWVyQ2FyZHNbc10pO1xyXG4gICAgICAgIHN3aXRjaCAoZS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBpZiAodCA9IGUubGVuZ3RoIC8gMiwgYS5sZW5ndGggPiB0KSByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzFdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdCAmJiAhKHMgKyBjID49IHRoaXMuY2FyZHNHcm91cFsxXS5sZW5ndGgpOyBjKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzFdW3MgKyBjXS5sZW5ndGg7IHIrKykgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFsxXVtzICsgY11bcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmxlbmd0aCA9PSBlLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShuLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtyXSksIDQgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGggJiYgdGhpcy5xaUNhcmRzKG4sIGUpKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bcl0pLCAyID09IG8ubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG8sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbMF0ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCBlLmxlbmd0aDsgcisrKSBzICsgciA8IHRoaXMuY2FyZHNHcm91cFswXS5sZW5ndGggJiYgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFswXVtzICsgcl1bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmxlbmd0aCA9PSBlLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShuLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtyXSksIDQgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGggJiYgdGhpcy5xaUNhcmRzKG4sIGUpKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bcl0pLCAyID09IG8ubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG8sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdCA9IGUubGVuZ3RoIC8gMztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdDsgYysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocyArIGMgPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHRoaXMuY2FyZHNHcm91cFsyXVtzICsgY10ubGVuZ3RoOyByKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMl1bcyArIGNdW3JdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLmxlbmd0aCA9PSBlLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShuLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW3JdKSwgNCA9PSBvLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShvLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG8gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbNF1bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFs0XVtzXVtyXSksIDIgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGgpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW3JdKSwgNCA9PSBuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaCA9IHRoaXMueWlKaShuLCBhKSwgYyA9IDA7IGMgPCBoLmRpZmZlcmVudC5sZW5ndGg7IGMrKykgbi5wdXNoKGguZGlmZmVyZW50W2NdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLmxlbmd0aCA8IGUubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSB0aGlzLnBsYXllckNhcmRzLmxlbmd0aCAtIDE7IGMgPiAtMTsgYy0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBkID0gMDsgZCA8IG4ubGVuZ3RoICYmIG5bZF0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudmFsICE9IHRoaXMucGxheWVyQ2FyZHNbY10udmFsOyBkKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoMTQgPT0gdGhpcy5wbGF5ZXJDYXJkc1tjXS52YWwgfHwgMTUgPT0gdGhpcy5wbGF5ZXJDYXJkc1tjXS52YWwpICYmIGwgPCAxKSBsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoMTQgPT0gdGhpcy5wbGF5ZXJDYXJkc1tjXS52YWwgfHwgMTUgPT0gdGhpcy5wbGF5ZXJDYXJkc1tjXS52YWwpICYmIDEgPT0gbCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PSBuLmxlbmd0aCAtIDEgJiYgKG4ucHVzaCh0aGlzLnBsYXllckNhcmRzW2NdKSwgbi5sZW5ndGggPT0gZS5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobiwgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGggJiYgdGhpcy5xaUNhcmRzKG4sIGUpKSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4ubGVuZ3RoID09IGUubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG4sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoICYmIHRoaXMucWlDYXJkcyhuLCBlKSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bcl0pLCA0ID09IG8ubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG8sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoICYmIHRoaXMucWlDYXJkcyhuLCBlKSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aDsgcysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHRoaXMuY2FyZHNHcm91cFs0XVtzXS5sZW5ndGg7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW3JdKSwgMiA9PSBvLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShvLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtyXSksIDQgPT0gbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGggPSB0aGlzLnlpSmkobiwgYSksIGMgPSAwOyBjIDwgaC5kaWZmZXJlbnQubGVuZ3RoOyBjKyspIG4ucHVzaChoLmRpZmZlcmVudFtjXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5sZW5ndGggPCBlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzFdLmxlbmd0aDsgYysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzFdW2NdWzBdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCAhPSBuWzBdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgdGhpcy5jYXJkc0dyb3VwWzFdW2NdLmxlbmd0aDsgZCsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLnB1c2godGhpcy5jYXJkc0dyb3VwWzFdW2NdW2RdKSwgbi5sZW5ndGggPT0gZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID0gdGhpcy55aUppKG4sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5xaUNhcmRzKG4sIGUpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIG4uc3BsaWNlKG4ubGVuZ3RoIC0gdGhpcy5jYXJkc0dyb3VwWzFdW2NdW2RdLmxlbmd0aCwgbi5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgYysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzNdW2NdWzBdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCAhPSBuWzBdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgdGhpcy5jYXJkc0dyb3VwWzNdW2NdLmxlbmd0aDsgZCsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW2NdW2RdKSwgbi5sZW5ndGggPT0gZS5sZW5ndGggJiYgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bcl0pLCA0ID09IG8ubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG8sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoICYmIHRoaXMucWlDYXJkcyhuLCBlKSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aDsgcysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHRoaXMuY2FyZHNHcm91cFs0XVtzXS5sZW5ndGg7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW3JdKSwgMiA9PSBvLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShvLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIHZhciBsID0gMDtcclxuICAgICAgICAgICAgICAgIHQgPSBlLmxlbmd0aCAvIDQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHQ7IGMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgKyBjIDwgdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzJdW3MgKyBjXS5sZW5ndGg7IHIrKykgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFsyXVtzICsgY11bcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGggPSB0aGlzLnlpSmkobiwgYSksIGMgPSAwOyBjIDwgaC5kaWZmZXJlbnQubGVuZ3RoOyBjKyspIG4ucHVzaChoLmRpZmZlcmVudFtjXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4ubGVuZ3RoIDwgZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHUgPSBuLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGggLSAxOyBjID4gLTE7IGMtLSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgdSAmJiBuW2RdLmdldENvbXBvbmVudChcIlJ1bkNhcmRzXCIpLnZhbCAhPSB0aGlzLnBsYXllckNhcmRzW2NdLnZhbDsgZCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgxNCA9PSB0aGlzLnBsYXllckNhcmRzW2NdLnZhbCB8fCAxNSA9PSB0aGlzLnBsYXllckNhcmRzW2NdLnZhbCkgJiYgbCA8IDEpIGwrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoMTQgPT0gdGhpcy5wbGF5ZXJDYXJkc1tjXS52YWwgfHwgMTUgPT0gdGhpcy5wbGF5ZXJDYXJkc1tjXS52YWwpICYmIDEgPT0gbCkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQgPT0gdSAtIDEgJiYgKGNjLmxvZyh0aGlzLnBsYXllckNhcmRzW2NdLnZhbCksIG4ucHVzaCh0aGlzLnBsYXllckNhcmRzW2NdKSwgbi5sZW5ndGggPT0gZS5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobiwgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGggJiYgdGhpcy5xaUNhcmRzKG4sIGUpKSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuLmxlbmd0aCA9PSBlLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShuLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtyXSksIDQgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGggJiYgdGhpcy5xaUNhcmRzKG4sIGUpKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bcl0pLCAyID09IG8ubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG8sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgdCA9IGUubGVuZ3RoIC8gNTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdDsgYysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocyArIGMgPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbMl1bcyArIGNdLmxlbmd0aDsgcisrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzJdW3MgKyBjXVtyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaCA9IHRoaXMueWlKaShuLCBhKSwgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbMV0ubGVuZ3RoOyBjKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzFdW2NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZCA9IDA7IGQgPCBoLmRpZmZlcmVudC5sZW5ndGg7IGQrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaC5kaWZmZXJlbnRbc10uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudmFsID09IHRoaXMuY2FyZHNHcm91cFsxXVtjXVswXS5nZXRDb21wb25lbnQoXCJSdW5DYXJkc1wiKS52YWwgJiYgKG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMV1bY11bcl0pLCBuLmxlbmd0aCA9PSBlLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShuLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bcl0pLCA0ID09IG8ubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG8sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoICYmIHRoaXMucWlDYXJkcyhuLCBlKSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aDsgcysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHRoaXMuY2FyZHNHcm91cFs0XVtzXS5sZW5ndGg7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW3JdKSwgMiA9PSBvLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShvLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtyXSksIDQgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGggJiYgdGhpcy5xaUNhcmRzKG4sIGUpKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bcl0pLCAyID09IG8ubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG8sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBxaUNhcmRzKGUsIHQpIHtcclxuICAgICAgICB2YXIgY2FyZFZhbCA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBlLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB7XHJcbiAgICAgICAgICAgIGNhcmRWYWwucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB2YWw6IGVbaV0uZ2V0Q29tcG9uZW50KFwiUnVuQ2FyZHNcIikudmFsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbztcclxuICAgICAgICByZXR1cm4gMSA9PSB0LnR5cGUgPyBvID0gdGhpcy5jaGVja0R1aVppKGNhcmRWYWwpIDogMiA9PSB0LnR5cGUgPyBvID0gdGhpcy5jaGVja1NodW5aaShjYXJkVmFsKSA6IDMgPT0gdC50eXBlID8gbyA9IHRoaXMuY2hlY2tTYW5PclNodW4oY2FyZFZhbCkgOiA0ID09IHQudHlwZSA/IG8gPSB0aGlzLmNoZWNrU2lUYWtlVHdvKGNhcmRWYWwpIDogNSA9PSB0LnR5cGUgPyBvID0gdGhpcy5jaGVja1NpVGFrZVR3b1NodWFuZyhjYXJkVmFsKSA6IDYgPT0gdC50eXBlID8gbyA9IHRoaXMuY2hlY2tTYW5PclBsYW5lKGNhcmRWYWwpIDogNyA9PSB0LnR5cGUgPyBvID0gdGhpcy5jaGVja1NhblNodWFuZ09yUGxhbmUoY2FyZFZhbCkgOiA4ID09IHQudHlwZSAmJiAobyA9IHRoaXMuY2hlY2tTaShjYXJkVmFsKSksXHJcbiAgICAgICAgICAgIG8ubnVtID4gMCA/ICgxID09IG8ubWF4ID8gby5tYXggKz0gMTIuMSA6IDIgPT0gby5tYXggJiYgKG8ubWF4ICs9IDExLjIpLCAxID09IHQubWF4ID8gdC5tYXggKz0gMTIuMSA6IDIgPT0gdC5tYXggJiYgKHQubWF4ICs9IDExLjIpLCBvLm1heCA+IHQubWF4KSA6IChjYy5sb2coY2FyZFZhbCksIGZhbHNlKVxyXG4gICAgfVxyXG59KTsiXX0=