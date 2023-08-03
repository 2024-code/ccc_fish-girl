
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Land/LandlordsMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '744ecnkn8BJi45n8twIDhBf', 'LandlordsMain');
// Script/Land/LandlordsMain.js

"use strict";

/**
 * 斗地主游戏逻辑
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
    btn_match_again: {
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
    zuoZi: {
      "default": null,
      type: cc.Node
    },
    exitReady: {
      "default": null,
      type: cc.Node
    },
    exitBtn: {
      "default": null,
      type: cc.Node
    },
    exitMatchBtn: {
      "default": null,
      type: cc.Node
    },
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
    }], this.cardsArray = this.cardsArray.splice(0, 17);
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
    this.netWork = require("LandNetWork").getInstant;
    this.netWork.setLandlordsObj_Function(this);
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

    this.cardsPool = new cc.NodePool("cards");

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
    for (var i in this.playerArr) {
      if (this.playerArr[i] == userId) {
        if (i == 0) {
          this.otherOneL.active = false;
        } else if (i == 2) {
          this.otherTwoR.active = false;
        }

        this.landloadsLogo[i].active = false;
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
  //叫地主
  callLandloads: function callLandloads(second) {
    this.btn_CallLandload.active = true;
    this.btnPlayerState = this.btn_CallLandload;
    this.timer(1, second);
  },
  //抢地主
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
   * 公共牌, 三张底牌
   * @param {*} cards 
   */
  publicCard: function publicCard(cards) {
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

      this.pb_LandloadsCard[i].getComponent("Cards").cardsCreate(cards[i].val, cards[i].type);
    }
  },

  /**
   * 震屏效果
   */
  shacking: function shacking() {// this.bgTu.stopAllActions();
    // this.zuoZi.stopAllActions();
    // var zuoZiPoint = this.zuoZi.position;
    // var zuoZiAction = cc.sequence(cc.moveTo(.05, cc.v2(zuoZiPoint.x + 15, zuoZiPoint.y + 15)), cc.moveTo(.1, cc.v2(zuoZiPoint.x - 15, zuoZiPoint.y - 15)), cc.moveTo(.05, cc.v2(zuoZiPoint.x + 15, zuoZiPoint.y)), cc.moveTo(.05, cc.v2(zuoZiPoint.x - 15, zuoZiPoint.y)), cc.moveTo(.1, cc.v2(zuoZiPoint.x, zuoZiPoint.y - 15)), cc.moveTo(.05, zuoZiPoint));
    // var bgTuAction = cc.repeat(cc.sequence(cc.moveTo(.05, cc.v2(15, 15)), cc.moveTo(.1, cc.v2(-15, -15)), cc.moveTo(.05, cc.v2(15, 0)), cc.moveTo(.05, cc.v2(-15, 0)), cc.moveTo(.1, cc.v2(0, -15)), cc.moveTo(.05, cc.v2(0, 0))), 1);
    // this.bgTu.runAction(bgTuAction);
    // this.zuoZi.runAction(zuoZiAction);
  },
  checkLandlords: function checkLandlords(e, t, i) {
    this.landloadsCards.active = true, this.qiangDiZhu = false, this.tempPlayerId = null, t.sort(function (e, t) {
      return 1 == e.val ? e.val += 12.1 : 2 == e.val && (e.val += 11.2), 1 == t.val ? t.val += 12.1 : 2 == t.val && (t.val += 11.2), e.val == t.val ? t.type - e.type : t.val - e.val;
    });

    for (var n = 0; n < this.pb_LandloadsCard.length; n++) {
      13.1 == t[n].val ? t[n].val = 1 : 13.2 == t[n].val && (t[n].val = 2), this.pb_LandloadsCard[n].getComponent("Cards").cardsCreate(t[n].val, t[n].type);
    }

    if (e == this.netWork.playerId) {
      this.landloadsLogo[1].active = true, this.tempPlayersLists[1].isLandlord = true, this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17, this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17;

      for (var n = 0; n < t.length; n++) {
        var o;
        o = this.cardsPool.size() > 0 ? this.cardsPool.get() : cc.instantiate(this.pb_Cards), o.scale = 1.2, this.pb_CardNode.addChild(o, 1), o.getComponent("Cards").cardsCreate(t[n].val, t[n].type), this.playerCards.push(o);
      }

      this.playerCards.sort(function (e, t) {
        return e.getComponent("Cards").val == t.getComponent("Cards").val ? t.getComponent("Cards").type - e.getComponent("Cards").type : t.getComponent("Cards").val - e.getComponent("Cards").val;
      });

      for (var n = 0, a = null, s = null, c = null; n < this.playerCards.length; n++) {
        if (this.playerCards[n].getComponent("Cards").val > 13) a = n;else if (2 == this.playerCards[n].getComponent("Cards").val || 1 == this.playerCards[n].getComponent("Cards").val) {
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
        this.playerArr[n] == e && 0 == n ? (this.landloadsLogo[n].active = true, this.tempPlayersLists[n].isLandlord = true, this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 20, this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17) : this.playerArr[n] == e && 2 == n && (this.landloadsLogo[n].active = true, this.tempPlayersLists[n].isLandlord = true, this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17, this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 20);
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
            this.playerCards[a].position.y == this.movedY && this.playerCards[a].getComponent("Cards").moveCard();
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
        this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17;
        this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17;
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
    card.getComponent("Cards").cardsCreate(val, type);
    this.playerCards.push(card);
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
      this.pb_Timer[seatIndex].getComponent("timer").num = second;
      this.pb_Timer[seatIndex].getComponent("timer").count = 0;
    }

    this.pb_Timer[seatIndex].getComponent("timer").startTimer();
  },

  /**
   * 移除计时器
   */
  cancelTimer: function cancelTimer() {
    for (var i = 0; i < this.pb_Timer.length; i++) {
      if (this.pb_Timer[i].active === true) {
        this.pb_Timer[i].getComponent("timer").cancelTimer();
        this.pb_Timer[i].active = false;
        break;
      }
    }
  },
  rules: function rules(e) {
    var t = this.cardType(this.primaryCard);
    if (0 == e.length) return t.type > -1;
    var i = this.cardType(e);
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
    // console.log('1111111', this.startLocat.x, ar.x, this.playerCards.length);
    if (this.startLocat.x >= ar.x) {
      for (var t = 0; t < this.playerCards.length; t++) {
        if (t == this.playerCards.length - 1) {
          if (ar.x > this.playerCards[t].position.x + this.cardWidth || this.startLocat.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
            this.playerCards[t].getComponent("Cards").changeBai();
          } else {
            this.playerCards[t].getComponent("Cards").changeHui();
          }
        } else {
          if (ar.x > this.playerCards[t].position.x + this.distanceCard || this.startLocat.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
            this.playerCards[t].getComponent("Cards").changeBai();
          } else {
            this.playerCards[t].getComponent("Cards").changeHui();
          }
        }
      }
    } else {
      for (var t = 0; t < this.playerCards.length; t++) {
        if (t == this.playerCards.length - 1) {
          if (this.startLocat.x > this.playerCards[t].position.x + this.cardWidth || ar.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
            this.playerCards[t].getComponent("Cards").changeBai();
          } else {
            this.playerCards[t].getComponent("Cards").changeHui();
          }
        } else {
          if (this.startLocat.x > this.playerCards[t].position.x + this.distanceCard || ar.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
            this.playerCards[t].getComponent("Cards").changeBai();
          } else {
            this.playerCards[t].getComponent("Cards").changeHui();
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
        val: this.selectedCard[e].getComponent("Cards").val,
        type: this.selectedCard[e].getComponent("Cards").type
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
   * 到自己出牌 显示出牌按钮
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

    // this.scheduleOnce(() => {
    if (this.qiangDiZhu && (this.pb_Timer[1].active == true || index == 1)) {
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

      this.tempPlayersLists[1].state = [];
      this.removeCards(1);
      this.tmpTuoguan = true;
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
      this.playerCards[i].getComponent("Cards").handCard = true;
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
          val: this.playerCards[e].getComponent("Cards").val
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
        a = this.cardsPool.size() > 0 ? this.cardsPool.get() : cc.instantiate(this.pb_Cards), this.pb_CardNode.addChild(a, 0), e.length < this.peak ? (a.scale = c, 0 == n ? a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherOneL.position.y + a.getContentSize().height * c * .4)) : a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherTwoR.position.y + a.getContentSize().height * c * .4))) : (a.scale = c, o < this.peak ? 0 == n ? a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherOneL.position.y + a.getContentSize().height * c * .4)) : a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherTwoR.position.y + a.getContentSize().height * c * .4)) : (0 == n ? a.setPosition(cc.v2(l + this.smallDistanceCard * r, this.otherOneL.position.y)) : a.setPosition(cc.v2(h + this.smallDistanceCard * r, this.otherTwoR.position.y)), r++)), a.getComponent("Cards").cardsCreate(e[o].val, e[o].type), s.push(a);
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
  settlement: function settlement(e, chuntian) {
    if (chuntian) {
      this.chunTianAnimation();
    }

    for (var t = 0; t < e.length; t++) {
      for (var i = 0; i < this.tempPlayersLists.length; i++) {
        if (e[t].userId == this.tempPlayersLists[i].id) {
          0 == i ? (this.otherOneL.getChildByName("bg_name").getChildByName("Score").getComponent("cc.Label").string = (e[t].Fraction / this.pInfo.exchangeRate).toFixed(2), this.landloadsLogo[i].active && !this.landloadsLogo[1].active ? this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu : this.landloadsLogo[i].active || this.landloadsLogo[1].active ? this.landloadsLogo[1].active && (this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu) : this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu) : 1 == i ? (this.node.getChildByName("Bill").active = true, e[t].Bottom > 0 ? this.node.getChildByName("Bill").getChildByName("jieShuan").getComponent("dragonBones.ArmatureDisplay").armature().animation.play("shengli", 0) : this.node.getChildByName("Bill").getChildByName("jieShuan").getComponent("dragonBones.ArmatureDisplay").armature().animation.play("shibai", 0), this.pInfo.soundEffectControl && (e[t].Bottom > 0 ? cc.audioEngine.play(this.shuYing[1], false, 1) : cc.audioEngine.play(this.shuYing[0], false, 1)), this.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = (e[t].Fraction / this.pInfo.exchangeRate).toFixed(2), this.node.getChildByName("Bill").getComponent("cc.Sprite").spriteFrame = this.billBg[1], this.node.getChildByName("blackFace").active = true, this.node.getChildByName("blackFace").getChildByName("btn_Signout").active = true, this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu) : 2 == i && (this.otherTwoR.getChildByName("bg_name").getChildByName("Score").getComponent("cc.Label").string = (e[t].Fraction / this.pInfo.exchangeRate).toFixed(2), this.landloadsLogo[i].active && !this.landloadsLogo[1].active ? this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu : this.landloadsLogo[i].active || this.landloadsLogo[1].active ? this.landloadsLogo[1].active && (this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu) : this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu), 1 == this.tempPlayersLists[i].isLandlord ? this.billMessage[i].getChildByName("icon").active = true : this.billMessage[i].getChildByName("icon").active = false, this.billMessage[i].getChildByName("niCheng").getComponent("cc.Label").string = this.tempPlayersLists[i].niCheng, this.billMessage[i].getChildByName("bottomScore").getComponent("cc.Label").string = this.pb_Lower.getChildByName("di").getChildByName("bottomScore").getComponent("cc.Label").string, this.billMessage[i].getChildByName("gold").getComponent("cc.Label").string = (e[t].Bottom / this.pInfo.exchangeRate).toFixed(2);
          break;
        }
      }
    }

    for (var k in e) {
      if (e[k].userId == this.pInfo.playerId && this.netWork.prot != 13706) {
        this.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = (e[k].score * 0.01).toFixed(2);
        break;
      }
    }

    this.btn_again.active = this.netWork.prot != 13706;
    this.exitMatchBtn.active = this.netWork.prot == 13706; // this.btn_match_again.active = false;

    this.gameFinish = true;
  },

  /**
   * 添加鼠标侦听事件
   */
  addEventListener: function addEventListener() {
    var _this3 = this;

    //开始
    this.TouchStart = this.node.on("touchstart", function (event) {
      _this3.startLocat = _this3.node.convertToNodeSpaceAR(event.getLocation());

      _this3.selectCards(_this3.startLocat);

      for (var i = 0; i < _this3.playerCards.length; i++) {
        if (_this3.playerCards[i].position.y != _this3.movedY && i == _this3.playerCards.length - 1) {
          _this3.tuoPaiCount = 0;
        } else if (_this3.playerCards[i].position.y == _this3.movedY) {
          break;
        }
      }
    }, this); //移动

    this.TouchMove = this.node.on("touchmove", function (event) {
      var ar = _this3.node.convertToNodeSpaceAR(event.getLocation());

      _this3.selectCards(ar);
    }, this); //停止

    this.TouchEnd = this.node.on("touchend", function (event) {
      for (var i = 0; i < _this3.playerCards.length; i++) {
        if (_this3.playerCards[i].color == "rgba(144, 144, 144, 255)") {
          _this3.playerCards[i].getComponent("Cards").moveCard();

          _this3.playerCards[i].getComponent("Cards").changeBai();
        }
      }

      _this3.tuoPaiCount = 0;
    }, this); //取消

    this.TouchCancel = this.node.on("touchcancel", function (event) {
      for (var i = 0; i < _this3.playerCards.length; i++) {
        if (_this3.playerCards[i].color == "rgba(144, 144, 144, 255)") {
          _this3.playerCards[i].getComponent("Cards").moveCard();

          _this3.playerCards[i].getComponent("Cards").changeBai();
        }
      }

      _this3.tuoPaiCount = 0;
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

    this.node.getComponent("LandlordsButtonClick").cancelTuoGaun();
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
            o = 1 == this.pureArr[s][c][0].getComponent("Cards").val ? 13.1 : 2 == this.pureArr[s][c][0].getComponent("Cards").val ? 13.2 : this.pureArr[s][c][0].getComponent("Cards").val, a = 1 == e.max ? 13.1 : 2 == e.max ? 13.2 : e.max, o > a && this.tipsCardsArr.push(this.pureArr[s][c][0]);
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
                  if (i[d].getComponent("Cards").val != this.playerCards[r].val) {
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
                for (var u = 0; u < i.length && i[u].getComponent("Cards").val != this.pureArr[3][h][0].getComponent("Cards").val; u++) {
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
              for (var d = 0; d < m && i[d].getComponent("Cards").val != this.playerCards[r].val; d++) {
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
            for (var u = 0; u < i.length && i[u].getComponent("Cards").val != this.pureArr[2][h][0].getComponent("Cards").val; u++) {
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
    var _this4 = this;

    this.scheduleOnce(function () {
      _this4.allowTips = false;
    }, 1);

    for (var i in this.playerCards) {
      if (this.playerCards[i].y == this.movedY) {
        this.playerCards[i].getComponent("Cards").moveCard();
      }
    }

    if (res.code) {
      for (var _i in res.card) {
        for (var j in this.playerCards) {
          if (this.playerCards[j].getComponent("Cards").val == res.card[_i].val && this.playerCards[j].getComponent("Cards").type == res.card[_i].type) {
            this.playerCards[j].getComponent("Cards").moveCard();
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
        if (e[t].val == this.playerCards[i].getComponent("Cards").val && e[t].type == this.playerCards[i].getComponent("Cards").type) {
          this.selectedCard.push(this.playerCards[i]);
          break;
        }
      }
    }

    this.selectedCard = this.allSorting(this.selectedCard), this.tempPlayersLists[1].outCard.push(this.selectedCard), this.identifyCards();
  },
  teShuChuPai: function teShuChuPai(e) {
    for (var t, i = [], n = 0; n < e.length; n++) {
      t = this.cardsPool.size() > 0 ? this.cardsPool.get() : cc.instantiate(this.pb_Cards), this.pb_CardNode.addChild(t), t.getComponent("Cards").cardsCreate(e[n].val, e[n].type), i.push(t);
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
      return e.getComponent("Cards").val == t.getComponent("Cards").val ? t.getComponent("Cards").type - e.getComponent("Cards").type : t.getComponent("Cards").val - e.getComponent("Cards").val;
    });

    for (var i = 0, n = null, o = null, a = null; i < e.length; i++) {
      if (e[i].getComponent("Cards").val > 13) n = i;else if (2 == e[i].getComponent("Cards").val || 1 == e[i].getComponent("Cards").val) {
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
        val: e[n].getComponent("Cards").val
      });
    }

    var o;
    1 == t.type ? o = this.checkDuiZi(i) : 2 == t.type ? o = this.checkShunZi(i) : 3 == t.type ? o = this.checkSanOrShun(i) : 4 == t.type ? o = this.checkSiTakeTwo(i) : 5 == t.type ? o = this.checkSiTakeTwoShuang(i) : 6 == t.type ? o = this.checkSanOrPlane(i) : 7 == t.type ? o = this.checkSanShuangOrPlane(i) : 8 == t.type && (o = this.checkSi(i)), o.num > 0 && (1 == o.max ? o.max += 12.1 : 2 == o.max && (o.max += 11.2), 1 == t.max ? t.max += 12.1 : 2 == t.max && (t.max += 11.2), o.max > t.max && this.tipsCardsArr.push(e));
  },
  sameDifferentVal: function sameDifferentVal() {
    this.cardsGroup = [[], [], [], [], []];

    for (var e = 0; e < this.CardsNum.length; e++) {
      for (var t = [], i = [], n = [], o = [], a = [], s = 0, c = this.playerCards.length - 1; c > -1; c--) {
        this.CardsNum[e] == this.playerCards[c].getComponent("Cards").val && (14 == this.CardsNum[e] || 15 == this.CardsNum[e] ? s = 5 : s++, 1 == s ? (t.push(this.playerCards[c]), i.push(this.playerCards[c]), n.push(this.playerCards[c]), o.push(this.playerCards[c]), this.cardsGroup[0].push(t)) : 2 == s ? (i.push(this.playerCards[c]), n.push(this.playerCards[c]), o.push(this.playerCards[c]), this.cardsGroup[1].push(i)) : 3 == s ? (n.push(this.playerCards[c]), o.push(this.playerCards[c]), this.cardsGroup[2].push(n)) : 4 == s ? (o.push(this.playerCards[c]), this.cardsGroup[3].push(o)) : 5 == s && (a.push(this.playerCards[c]), this.cardsGroup[4].push(a)));
      }
    }
  },
  pureType: function pureType() {
    this.pureArr = [[], [], [], [], []];

    for (var e = 0; e < this.CardsNum.length; e++) {
      for (var t = [], i = 0, n = this.playerCards.length - 1; n > -1; n--) {
        this.CardsNum[e] == this.playerCards[n].getComponent("Cards").val && (14 == this.CardsNum[e] || 15 == this.CardsNum[e] ? (t.push(this.playerCards[n]), i += 5) : (t.push(this.playerCards[n]), i++));
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
                for (var l = 0; l < r && n[l].getComponent("Cards").val != this.playerCards[c].getComponent("Cards").val; l++) {
                  if ((14 == this.playerCards[c].getComponent("Cards").val || 15 == this.playerCards[c].getComponent("Cards").val) && kingNum < 1) kingNum++;else if ((14 == this.playerCards[c].getComponent("Cards").val || 15 == this.playerCards[c].getComponent("Cards").val) && 1 == kingNum) break;

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
                if (this.cardsGroup[1][r][0].getComponent("Cards").val == s[c].getComponent("Cards").val) for (var l = 0; l < n.length && n[l] != s[c]; l++) {
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
      for (var o = 0; o < e.length && t[n].getComponent("Cards").val != e[o].getComponent("Cards").val; o++) {
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
      for (var o = 0; o < t.length && (e[n].getComponent("Cards").val != t[o].getComponent("Cards").val || e[n].getComponent("Cards").type != t[o].getComponent("Cards").type); o++) {
        o == t.length - 1 && i.push(e[n]);
      }
    }

    return this.tuoPaiCount++, i;
  },
  coincidence: function coincidence(e, t) {
    cc.log(t[0].getComponent("Cards").val);

    for (var i = 0; i < t.length; i++) {
      for (var n = 0; n < e.length && t[i].getComponent("Cards").val != e[n].getComponent("Cards").val; n++) {
        if (n == e.length - 1) return cc.log(t[i].getComponent("Cards").val), false;
      }
    }

    return !0;
  },
  yiDong: function yiDong(e) {
    for (var t = 0; t < e.length; t++) {
      e[t].getComponent("Cards").moveCard();
    }
  },
  yiJi: function yiJi(e, t) {
    for (var i = [], n = [], o = 0; o < e.length; o++) {
      for (var a = 0; a < t.length; a++) {
        if (t[a].getComponent("Cards").val == e[o].getComponent("Cards").val && t[a].getComponent("Cards").type == e[o].getComponent("Cards").type) {
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
                for (var d = 0; d < n.length && n[d].getComponent("Cards").val != this.playerCards[c].val; d++) {
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
                  if (this.cardsGroup[1][c][0].getComponent("Cards").val != n[0].getComponent("Cards").val) for (var d = 0; d < this.cardsGroup[1][c].length; d++) {
                    if (n.push(this.cardsGroup[1][c][d]), n.length == e.length) if (i = this.yiJi(n, a), i.same.length == a.length) {
                      if (this.qiCards(n, e)) return i.different;
                    } else n.splice(n.length - this.cardsGroup[1][c][d].length, n.length);
                  }
                }

                for (var c = 0; c < this.cardsGroup[3].length; c++) {
                  if (this.cardsGroup[3][c][0].getComponent("Cards").val != n[0].getComponent("Cards").val) for (var d = 0; d < this.cardsGroup[3][c].length; d++) {
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
            for (var d = 0; d < u && n[d].getComponent("Cards").val != this.playerCards[c].val; d++) {
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
                if (h.different[s].getComponent("Cards").val == this.cardsGroup[1][c][0].getComponent("Cards").val && (n.push(this.cardsGroup[1][c][r]), n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e)))) return i.different;
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
        val: e[i].getComponent("Cards").val
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMYW5kXFxMYW5kbG9yZHNNYWluLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGJfQ2FyZHMiLCJ0eXBlIiwiUHJlZmFiIiwicGJfQ2FyZE5vZGUiLCJOb2RlIiwiYnRuX1JvYkxhbmRsb2FkIiwib3RoZXJPbmVMIiwib3RoZXJUd29SIiwicGJfVGltZXIiLCJwYl9MYW5kbG9hZHNDYXJkIiwicGJfTG93ZXIiLCJidG5fQ2FsbExhbmRsb2FkIiwibGFuZGxvYWRzQ2FyZHMiLCJiZ0F1ZGlvIiwiQXVkaW9DbGlwIiwiYWxsVGlwcyIsImxhbmRsb2Fkc0xvZ28iLCJidG5fT3V0Q2FyZCIsImJ0bl9hZ2FpbiIsImJ0bl9tYXRjaF9hZ2FpbiIsImNhcmRBdWRpbyIsImR1aVppQXVkaW8iLCJiYW9KaW5nQXVkaW8iLCJidVlhb0F1ZGlvIiwiY2h1VGlhbkF1ZGlvIiwiamlhb0RpWmh1QXVkaW8iLCJidUppYW9BdWRpbyIsInFpYW5nQXVkaW8iLCJidVFpYW5nQXVkaW8iLCJjYXJkVHlwZUF1ZGlvIiwiZmFQYWlBdWRpbyIsInNodVlpbmciLCJzYW5HZUF1ZGlvIiwiYmlsbE1lc3NhZ2UiLCJiaWxsQmciLCJTcHJpdGVGcmFtZSIsInRlWGlhbyIsImNhcmRUeXBlVGV4dCIsInRlWGlhb0F1ZGlvIiwiY2hhbmdlQXVkaW8iLCJwcm90YWdvbmlzdCIsImJ0bl9TdGFydCIsImNvbV9NZXNzYWdlQm94IiwiYmdUdSIsInRvcFNldCIsInBhaVhpbmciLCJyb2NrZXQiLCJyb2NrZXRCb29tIiwienVvWmkiLCJleGl0UmVhZHkiLCJleGl0QnRuIiwiZXhpdE1hdGNoQnRuIiwiZmlyc3RPdXRDYXJkIiwiZGlzdGFuY2VDYXJkIiwic21hbGxEaXN0YW5jZUNhcmQiLCJpbml0WSIsIm1vdmVkWSIsImZpbmlzaFkiLCJwZWFrIiwidGlwc0NvdW50IiwidHVvR3VhbiIsImdhbWVGaW5pc2giLCJxaWFuZ0RpWmh1Iiwib25Mb2FkIiwiYWxsb3dUaXBzIiwicGxheWVyQ2FyZHMiLCJzZWxlY3RlZENhcmQiLCJDYXJkc051bSIsInJlY3ljbGluZyIsIm90aGVyQ2FyZEFyciIsIm1pbmdQYWlBcnJheSIsImNhcmRzR3JvdXAiLCJ0aXBzQ2FyZHNBcnIiLCJ0ZW1wUGxheWVySWQiLCJjaG9uZ0xpYW4iLCJhbGxQbGF5ZXJUaXBzU3RhdGUiLCJidG5QbGF5ZXJTdGF0ZSIsIm5ldFdvcmsiLCJpIiwicHVzaCIsInNwbGljZSIsImxlbmd0aCIsImNvdW50IiwiY2FyZHNMaXN0IiwidmFsIiwiY2FyZHNBcnJheSIsInNvcnQiLCJNYXRoIiwicmFuZG9tIiwiaW5pdFVJIiwic3RhcnQiLCJ3aW5kb3ciLCJyZWNvbm5lY3RQb2ludCIsImxvZyIsImFjdGl2ZSIsInN0YXJ0R2FtZUZ1bmN0aW9uIiwiZ2FtZUluaXQiLCJnZXRDaGlsZEJ5TmFtZSIsInZpZXciLCJzZXRPcmllbnRhdGlvbiIsIm1hY3JvIiwiT1JJRU5UQVRJT05fTEFORFNDQVBFIiwiZ2V0VmlzaWJsZVNpemUiLCJ3aWR0aCIsImhlaWdodCIsImJpTGkiLCJub2RlIiwic2NhbGUiLCJzZXRQb3NpdGlvbiIsInNldENvbnRlbnRTaXplIiwiZ2V0Q29udGVudFNpemUiLCJzZXRSZXNpemVDYWxsYmFjayIsInBJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJzZXRMYW5kbG9yZHNPYmpfRnVuY3Rpb24iLCJzZXRHYW1lT2JqX0Z1bmN0aW9uIiwiSGVscGVyIiwibG9hZEhlYWQiLCJwbGF5ZXJIZWFkSWQiLCJzcCIsImdldENvbXBvbmVudCIsInNwcml0ZUZyYW1lIiwic3RyaW5nIiwicGFyc2VGbG9hdCIsInBsYXllckNvaW4iLCJ0b0ZpeGVkIiwicGxheWVyTmFtZSIsInRlbXBQbGF5ZXJzTGlzdHMiLCJtdXNpY0NvbnRyb2wiLCJiZ011c2ljIiwiYXVkaW9FbmdpbmUiLCJwbGF5IiwiZGlzY29ubmVjdGVkIiwicm9vbUJldCIsImdhbWVFeGl0IiwicGxheWVySWQiLCJwbGF5ZXJBcnIiLCJjYXJkTGVuZ3RoIiwiY2FyZHNQb29sIiwiTm9kZVBvb2wiLCJjYXJkIiwiaW5zdGFudGlhdGUiLCJwdXQiLCJyZXNldERGIiwic2NvcmUiLCJleGNoYW5nZVJhdGUiLCJzZXRNeVNlYXQiLCJuaWNrbmFtZSIsInNlYXRJZCIsInVzZXJJZCIsInNldENhcmRMZW5ndGgiLCJjYXJjZF9sZW5ndGgiLCJvdGhlckVudGVyUm9vbSIsInVzckhlYWQiLCJzZWF0IiwicGxheWVyT3V0Um9vbSIsImRpc2Nvbm5lY3ROZXRXb3JrX0Z1bmN0aW9uIiwiTGFuZGxvcmRzU29ja2V0IiwiZGlzY29ubmVjdCIsImVycm9yIiwiZ2FtZURpc2Nvbm5lY3QiLCJyZXNldExhbmRsb3JkcyIsImRvdWJsZSIsImlzTGFuZGxvcmQiLCJqIiwic3RhdGUiLCJjYWxsTGFuZGxvYWRzIiwic2Vjb25kIiwidGltZXIiLCJyb2JMYW5kbG9yZCIsInR1b0d1YW5GdW5jdGlvbiIsInB1YmxpY0NhcmQiLCJjYXJkcyIsImNhcmRBIiwiY2FyZEIiLCJ2YWx1ZSIsImNhcmRzQ3JlYXRlIiwic2hhY2tpbmciLCJjaGVja0xhbmRsb3JkcyIsImUiLCJ0IiwibiIsIm8iLCJzaXplIiwiZ2V0IiwiYWRkQ2hpbGQiLCJhIiwicyIsImMiLCJyIiwicmVzZXRDYXJkTG9jYXQiLCJzY2hlZHVsZU9uY2UiLCJwbGF5ZXJOb3dTdGF0ZSIsImNhbmNlbFRpbWVyIiwic291bmRFZmZlY3RDb250cm9sIiwiZmxvb3IiLCJwb3NpdGlvbiIsInkiLCJtb3ZlQ2FyZCIsIngiLCJhcm1hdHVyZSIsImFuaW1hdGlvbiIsImRlc3Ryb3kiLCJ2MiIsInNlcXVlbmNlIiwiZmFkZU91dCIsImNhbGxGdW5jIiwicnVuQWN0aW9uIiwibCIsIm1vdmVUbyIsImgiLCJkIiwidSIsInNwYXduIiwicm90YXRlVG8iLCJjYXJkaW5hbFNwbGluZVRvIiwibSIsInNjYWxlVG8iLCJkZWxheVRpbWUiLCJnIiwicCIsImNodW5UaWFuQW5pbWF0aW9uIiwiY2FyZHNTb3J0aW5nIiwiaXNMaWNlbnNpbmciLCJmaW5pc2hHYW1lIiwidGVtcFBsYXllckxpc3QiLCJsaWNlbnNpbmciLCJsaWNlbnNpbmdUaW1lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJuaUNoZW5nIiwiaWQiLCJ6aGlTaGVuZ1lpIiwiemhpU2hlbmdFciIsIm91dENhcmQiLCJpbmRleCIsInNjaGVkdWxlIiwiY2FyZFdpZHRoIiwiY2FyZEhlaWdodCIsImRXaWR0aCIsInNlYXRJbmRleCIsInJlbW92ZUNhcmRzIiwibnVtIiwic3RhcnRUaW1lciIsInJ1bGVzIiwiY2FyZFR5cGUiLCJwcmltYXJ5Q2FyZCIsIm1heCIsImNhcmRMaXN0IiwiY2hlY2tPbmVDYXJkIiwiY2hlY2tEdWlaaSIsImNoZWNrU2h1blppIiwiY2hlY2tTYW5PclNodW4iLCJjaGVja1NpVGFrZVR3byIsImNoZWNrU2lUYWtlVHdvU2h1YW5nIiwiY2hlY2tTYW5PclBsYW5lIiwiY2hlY2tTYW5TaHVhbmdPclBsYW5lIiwiY2hlY2tTaSIsImtpbmdCb29tIiwic2VsZWN0Q2FyZHMiLCJhciIsInN0YXJ0TG9jYXQiLCJjaGFuZ2VCYWkiLCJjaGFuZ2VIdWkiLCJwcmltYXJ5TnVtIiwibm90Q29uZm9ybVJ1bGVzIiwiZW1pdCIsImFycmF5IiwidGFibGVJZCIsImlkZW50aWZ5Q2FyZHMiLCJ6SW5kZXgiLCJjb2xvciIsIkNvbG9yIiwiaW50ZXJhY3RhYmxlIiwicGxheVN0YXRlIiwicWlhbmciLCJ0bXBUdW9ndWFuIiwidGlwc0NsaWNrIiwidHVvR3VhblN0YXRlIiwicmVzbHV0IiwiaGFuZENhcmQiLCJpc0NhbiIsImlzRXF1YWwiLCJlcSIsInRlbXAiLCJrIiwidGVtcExpc3QiLCJvbmVDYXJkIiwic2xpY2UiLCJ0d29DYXJkIiwib3RoZXJQbGF5ZXJPdXRDYXJkIiwicGFyc2VJbnQiLCJ4aVRvbmdTb3J0aW5nIiwib3RoZXJQbGF5ZXJObyIsImNoZWNrVG9wUGxheWVyIiwic2V0dGxlbWVudCIsImNodW50aWFuIiwiRnJhY3Rpb24iLCJiZWlfc2h1IiwiQm90dG9tIiwicHJvdCIsIlRvdWNoU3RhcnQiLCJvbiIsImV2ZW50IiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJnZXRMb2NhdGlvbiIsInR1b1BhaUNvdW50IiwiVG91Y2hNb3ZlIiwiVG91Y2hFbmQiLCJUb3VjaENhbmNlbCIsInR1cm5PZmZUb3VjaCIsIm9mZiIsInJlbW92ZUFsbFN0YXRlIiwiY2FuY2VsVHVvR2F1biIsInJlc2V0R2FtZSIsIm1hdGNoaW5nVHlwZSIsImNoZWNrVHlwZU51bSIsInNhbWVEaWZmZXJlbnRWYWwiLCJwdXJlVHlwZSIsInB1cmVBcnIiLCJkcmF3Q2FyZHMiLCJ0aXBzQ2xpY2tDYWxsQmFjayIsInJlcyIsImNvZGUiLCJjb25zb2xlIiwieGlUb25nT3V0Q2FyZCIsImFsbFNvcnRpbmciLCJ0ZVNodUNodVBhaSIsInR1b1BhaSIsInh1YW5QYWkiLCJ5aURvbmciLCJ0X3NodW5aaSIsImNvaW5jaWRlbmNlIiwicWlDYXJkcyIsImRpZmZlcmVudFp1IiwidF9saWFuRHVpIiwidF9zYW5TaHVuIiwidF9zYW5EYWlZaSIsInlpSmlOZXh0Iiwia2luZ051bSIsInRfc2FuRGFpWWlEdWkiLCJ5aUppIiwic2FtZSIsImRpZmZlcmVudCIsImNhcmRWYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5DLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBREY7QUFLUkMsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsSUFEQTtBQUVURixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1E7QUFGQSxLQUxMO0FBU1JDLElBQUFBLGVBQWUsRUFBRTtBQUNiLGlCQUFTLElBREk7QUFFYkos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UCxHQUFhaEUsQ0FBQyxDQUFDZ0UsR0FBRixJQUFTLElBQXRCLEdBQTZCLEtBQUtoRSxDQUFDLENBQUNnRSxHQUFQLEtBQWVoRSxDQUFDLENBQUNnRSxHQUFGLElBQVMsSUFBeEIsQ0FBN0IsRUFBNEQsS0FBS2xFLENBQUMsQ0FBQ2tFLEdBQVAsR0FBYWxFLENBQUMsQ0FBQ2tFLEdBQUYsSUFBUyxJQUF0QixHQUE2QixLQUFLbEUsQ0FBQyxDQUFDa0UsR0FBUCxLQUFlbEUsQ0FBQyxDQUFDa0UsR0FBRixJQUFTLElBQXhCLENBQXpGLEVBQXdIaEUsQ0FBQyxDQUFDZ0UsR0FBRixHQUFRbEUsQ0FBQyxDQUFDa0UsR0FBL0ksS0FBdUozUCxFQUFFLENBQUNpRyxHQUFILENBQU8yUCxPQUFQLEdBQWlCLEtBQXhLLENBREo7QUFFSDtBQS83RkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOaWl+WcsOS4u+a4uOaIj+mAu+i+kVxyXG4gKi9cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwYl9DYXJkczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBiX0NhcmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0bl9Sb2JMYW5kbG9hZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvdGhlck9uZUw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3RoZXJUd29SOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBiX1RpbWVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYl9MYW5kbG9hZHNDYXJkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYl9Mb3dlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5fQ2FsbExhbmRsb2FkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxhbmRsb2Fkc0NhcmRzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJnQXVkaW86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbGxUaXBzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYW5kbG9hZHNMb2dvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5fT3V0Q2FyZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5fYWdhaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuX21hdGNoX2FnYWluOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhcmRBdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkdWlaaUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJhb0ppbmdBdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidVlhb0F1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNodVRpYW5BdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGppYW9EaVpodUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVKaWFvQXVkaW86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBxaWFuZ0F1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVRaWFuZ0F1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FyZFR5cGVBdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYVBhaUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2h1WWluZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzYW5HZUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbGxNZXNzYWdlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaWxsQmc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZVhpYW86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FyZFR5cGVUZXh0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlWGlhb0F1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYW5nZUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvdGFnb25pc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuX1N0YXJ0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbV9NZXNzYWdlQm94OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJnVHU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9wU2V0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhaVhpbmc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2NrZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9ja2V0Qm9vbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHp1b1ppOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGV4aXRSZWFkeToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBleGl0QnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGV4aXRNYXRjaEJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaXJzdE91dENhcmQ6IDEsXHJcbiAgICAgICAgZGlzdGFuY2VDYXJkOiA1MCxcclxuICAgICAgICBzbWFsbERpc3RhbmNlQ2FyZDogNDAsXHJcbiAgICAgICAgaW5pdFk6IC0yMjAsXHJcbiAgICAgICAgbW92ZWRZOiAtMjAwLFxyXG4gICAgICAgIGZpbmlzaFk6IC01MCxcclxuICAgICAgICBwZWFrOiAxMCxcclxuICAgICAgICB0aXBzQ291bnQ6IDAsXHJcbiAgICAgICAgdHVvR3VhbjogZmFsc2UsXHJcbiAgICAgICAgZ2FtZUZpbmlzaDogdHJ1ZSxcclxuICAgICAgICBxaWFuZ0RpWmh1OiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5hbGxvd1RpcHMgPSBmYWxzZTtcclxuICAgICAgICAvL+eOqeWutuaJi+S4reeahOeJjFxyXG4gICAgICAgIHRoaXMucGxheWVyQ2FyZHMgPSBbXTtcclxuICAgICAgICAvL+mAieS4reeahOeJjFxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJkID0gW107XHJcbiAgICAgICAgdGhpcy5DYXJkc051bSA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVjeWNsaW5nID0gW1xyXG4gICAgICAgICAgICBbbnVsbF0sXHJcbiAgICAgICAgICAgIFtudWxsXSxcclxuICAgICAgICAgICAgW251bGxdXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLm90aGVyQ2FyZEFyciA9IFtdO1xyXG4gICAgICAgIHRoaXMubWluZ1BhaUFycmF5ID0gW1xyXG4gICAgICAgICAgICBbXSxcclxuICAgICAgICAgICAgW10sXHJcbiAgICAgICAgICAgIFtdXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmNhcmRzR3JvdXAgPSBbXHJcbiAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICBbXSxcclxuICAgICAgICAgICAgW10sXHJcbiAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICBbXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgLy/mj5DnpLrlh7rnmoTniYxcclxuICAgICAgICB0aGlzLnRpcHNDYXJkc0FyciA9IFtdO1xyXG4gICAgICAgIHRoaXMudGVtcFBsYXllcklkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNob25nTGlhbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWxsUGxheWVyVGlwc1N0YXRlID0gW1xyXG4gICAgICAgICAgICBbbnVsbF0sXHJcbiAgICAgICAgICAgIFtudWxsXSxcclxuICAgICAgICAgICAgW251bGxdXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmJ0blBsYXllclN0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5ldFdvcmsgPSBudWxsO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMzsgaSA8IDE2OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkc051bS5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhcmRzTnVtLnNwbGljZSh0aGlzLkNhcmRzTnVtLmxlbmd0aCAtIDIsIDAsIDEsIDIpO1xyXG5cclxuICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmNhcmRzTGlzdCA9IFtcclxuICAgICAgICAgICAgLy/lsI/njotcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxNCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/lpKfnjotcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxNSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/pu5HmoYNBXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/pu5HmoYMyXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMixcclxuICAgICAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/pu5HmoYMzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/pu5HmoYM0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogNCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/pu5HmoYM1XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogNSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/pu5HmoYNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA2LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahgzdcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA3LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahgzhcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA4LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahgzlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA5LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahgzEwXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMTAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v6buR5qGDSlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDExLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+m7keahg1FcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxMixcclxuICAgICAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/pu5HmoYNLXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMTMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v57qi5qGDQVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDEsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v57qi5qGDMlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v57qi5qGDM1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v57qi5qGDNFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v57qi5qGDNVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v57qi5qGDXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogNixcclxuICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYM3XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogNyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYM4XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogOCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYM5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogOSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYMxMFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDEwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+e6ouahg0pcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxMSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/nuqLmoYNRXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v57qi5qGDS1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDEzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aiheiKsUFcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aiheiKsTJcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAyLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aiheiKsTNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aiheiKsTRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA0LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aiheiKsTVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA1LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aiheiKsVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDYsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxN1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDcsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxOFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDgsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxOVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxMTBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mooXoirFKXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMTEsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5qKF6IqxUVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDEyLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aiheiKsUtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mlrnniYdBXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mlrnniYcyXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMixcclxuICAgICAgICAgICAgICAgIHR5cGU6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mlrnniYczXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mlrnniYc0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogNCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mlrnniYc1XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogNSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mlrnniYdcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA2LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJhzdcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA3LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJhzhcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA4LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJhzlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiA5LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJhzEwXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMTAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8v5pa554mHSlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWw6IDExLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+aWueeJh1FcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsOiAxMixcclxuICAgICAgICAgICAgICAgIHR5cGU6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/mlrnniYdLXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbDogMTMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgLy/mjpLluo/lupXniYxcclxuICAgICAgICB0aGlzLmNhcmRzQXJyYXkgPSB0aGlzLmNhcmRzTGlzdC5zb3J0KCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIDEgKiBNYXRoLnJhbmRvbSgpIC0gLjU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v5q+P5Lq65LiK5p2l5Y+RMTflvKDniYxcclxuICAgICAgICB0aGlzLmNhcmRzQXJyYXkgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogNFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWw6IDEyLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWw6IDEyLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDJcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWw6IDEyLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDNcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWw6IDEyLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsOiAxMixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsOiAxMixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsOiAxMixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAzXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsOiAxMixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiA0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogM1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgdGhpcy5jYXJkc0FycmF5ID0gdGhpcy5jYXJkc0FycmF5LnNwbGljZSgwLCAxNyk7XHJcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgaWYgKCEhd2luZG93LnJlY29ubmVjdFBvaW50KSB7XHJcbiAgICAgICAgICAgIGNjLmxvZygn5pat57q/6YeN6L+e5byA5aeL5ri45oiPJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX1N0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmV4aXRCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZWNvbm5lY3RQb2ludCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5ldFdvcmsuc3RhcnRHYW1lRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSW5pdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmFsbFRpcHNbMV0uZ2V0Q2hpbGRCeU5hbWUoXCJkZW5nZGFpXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZVSVxyXG4gICAgICovXHJcbiAgICBpbml0VUkoKSB7XHJcbiAgICAgICAgY2Mudmlldy5zZXRPcmllbnRhdGlvbihjYy5tYWNyby5PUklFTlRBVElPTl9MQU5EU0NBUEUpO1xyXG4gICAgICAgIGlmIChjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyAxMzM0IDwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCAvIDc1MCkge1xyXG4gICAgICAgICAgICB0aGlzLmJpTGkgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyAxMzM0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmlMaSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyA3NTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5iaUxpID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmJnVHUud2lkdGggPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggKyAzMDtcclxuICAgICAgICAgICAgdGhpcy5iZ1R1LmhlaWdodCA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgKyAzMDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5iaUxpID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJnVHUud2lkdGggPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyB0aGlzLmJpTGkgKyAzMDtcclxuICAgICAgICAgICAgdGhpcy5iZ1R1LmhlaWdodCA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyB0aGlzLmJpTGkgKyAzMDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gdGhpcy5iaUxpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRvcFNldC5zZXRQb3NpdGlvbihjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyAyIC8gdGhpcy5iaUxpLCBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gMiAvIHRoaXMuYmlMaSAtIHRoaXMudG9wU2V0LmhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgICAvL+iuvue9ruS4ieW8oOW6leeJjOS9jee9rlxyXG4gICAgICAgIHRoaXMubGFuZGxvYWRzQ2FyZHMuc2V0UG9zaXRpb24oLTY4LCBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gMiAvIHRoaXMuYmlMaSAtIHRoaXMubGFuZGxvYWRzQ2FyZHMuaGVpZ2h0IC8gMiAqIHRoaXMubGFuZGxvYWRzQ2FyZHMuc2NhbGUgLSAyMCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmxhY2tGYWNlXCIpLnNldENvbnRlbnRTaXplKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIHRoaXMuYmlMaSwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCAvIHRoaXMuYmlMaSk7XHJcbiAgICAgICAgdGhpcy5jb21fTWVzc2FnZUJveC5nZXRDaGlsZEJ5TmFtZShcImJsYWNrRmFjZVwiKS5zZXRDb250ZW50U2l6ZShjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyB0aGlzLmJpTGksIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyB0aGlzLmJpTGkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInR1b0d1YW5DYW5jZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzbWFsbEJsYWNrXCIpLnNldENvbnRlbnRTaXplKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIHRoaXMuYmlMaSwgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidHVvR3VhbkNhbmNlbFwiKS5nZXRDaGlsZEJ5TmFtZShcInNtYWxsQmxhY2tcIikuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpO1xyXG5cclxuICAgICAgICBjYy52aWV3LnNldFJlc2l6ZUNhbGxiYWNrKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIDEzMzQgPCBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gNzUwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpTGkgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyAxMzM0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaUxpID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCAvIDc1MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5iaUxpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZ1R1LndpZHRoID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLndpZHRoICsgMzA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJnVHUuaGVpZ2h0ID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCArIDMwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlMaSA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJnVHUud2lkdGggPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyB0aGlzLmJpTGkgKyAzMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmdUdS5oZWlnaHQgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gdGhpcy5iaUxpICsgMzA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSB0aGlzLmJpTGk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudG9wU2V0LnNldFBvc2l0aW9uKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIDIgLyB0aGlzLmJpTGksIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyAyIC8gdGhpcy5iaUxpIC0gdGhpcy50b3BTZXQuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIC8v6K6+572u5LiJ5byg5bqV54mM5L2N572uXHJcbiAgICAgICAgICAgIHRoaXMubGFuZGxvYWRzQ2FyZHMuc2V0UG9zaXRpb24oLTY4LCBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gMiAvIHRoaXMuYmlMaSAtIHRoaXMubGFuZGxvYWRzQ2FyZHMuaGVpZ2h0IC8gMiAqIHRoaXMubGFuZGxvYWRzQ2FyZHMuc2NhbGUgLSAyMCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJsYWNrRmFjZVwiKS5zZXRDb250ZW50U2l6ZShjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyB0aGlzLmJpTGksIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyB0aGlzLmJpTGkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwiYmxhY2tGYWNlXCIpLnNldENvbnRlbnRTaXplKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIHRoaXMuYmlMaSwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCAvIHRoaXMuYmlMaSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInR1b0d1YW5DYW5jZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzbWFsbEJsYWNrXCIpLnNldENvbnRlbnRTaXplKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIHRoaXMuYmlMaSwgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidHVvR3VhbkNhbmNlbFwiKS5nZXRDaGlsZEJ5TmFtZShcInNtYWxsQmxhY2tcIikuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucEluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0V29yayA9IHJlcXVpcmUoXCJMYW5kTmV0V29ya1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0V29yay5zZXRMYW5kbG9yZHNPYmpfRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgdGhpcy5wSW5mby5zZXRHYW1lT2JqX0Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgIEhlbHBlci5sb2FkSGVhZCh0aGlzLnBJbmZvLnBsYXllckhlYWRJZCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BsYXllcicpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucGJfTG93ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkXCIpLmdldENoaWxkQnlOYW1lKFwiaW50ZWdyYWxcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gcGFyc2VGbG9hdCh0aGlzLnBJbmZvLnBsYXllckNvaW4pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5wYl9Mb3dlci5nZXRDaGlsZEJ5TmFtZShcImhlYWRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJuaUNoZW5nXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IHRoaXMucEluZm8ucGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgdGhpcy5iZ011c2ljID0gY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJnQXVkaW8sIHRydWUsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmuLjmiI9cclxuICAgICAqL1xyXG4gICAgZ2FtZUluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucm9vbUJldCA9IHRoaXMubmV0V29yay5yb29tQmV0O1xyXG4gICAgICAgIHRoaXMubmV0V29yay5nYW1lRXhpdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGxheWVySWQgPSB0aGlzLnBJbmZvLnBsYXllcklkO1xyXG4gICAgICAgIC8v546p5a625YiX6KGoXHJcbiAgICAgICAgdGhpcy5wbGF5ZXJBcnIgPSBbbnVsbCwgdGhpcy5wSW5mby5wbGF5ZXJJZCwgbnVsbF07XHJcbiAgICAgICAgLy/miZHlhYvmlbDph49cclxuICAgICAgICB2YXIgY2FyZExlbmd0aCA9IDU0O1xyXG4gICAgICAgIC8v5Y2h54mM5a+56LGh5rGgXHJcbiAgICAgICAgdGhpcy5jYXJkc1Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woXCJjYXJkc1wiKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2FyZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGJfQ2FyZHMpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcmRzUG9vbC5wdXQoY2FyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog6YeN572u5bqV5YiGXHJcbiAgICAgKiBAcGFyYW0geyp9IHNjb3JlIFxyXG4gICAgICovXHJcbiAgICByZXNldERGKHNjb3JlKSB7XHJcbiAgICAgICAgdGhpcy5wYl9Mb3dlci5nZXRDaGlsZEJ5TmFtZShcImRpXCIpLmdldENoaWxkQnlOYW1lKFwiYm90dG9tU2NvcmVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gKHNjb3JlIC8gdGhpcy5wSW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u546p5a625L+h5oGvXHJcbiAgICAgKiBAcGFyYW0geyp9IG5pY2tuYW1lIFxyXG4gICAgICogQHBhcmFtIHsqfSBzY29yZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VhdElkIFxyXG4gICAgICogQHBhcmFtIHsqfSB1c2VySWQgXHJcbiAgICAgKi9cclxuICAgIHNldE15U2VhdChuaWNrbmFtZSwgc2NvcmUsIHNlYXRJZCwgdXNlcklkKSB7XHJcbiAgICAgICAgdGhpcy5wYl9Mb3dlci5nZXRDaGlsZEJ5TmFtZShcImhlYWRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJuaUNoZW5nXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IG5pY2tuYW1lO1xyXG4gICAgICAgIHRoaXMucGJfTG93ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkXCIpLmdldENoaWxkQnlOYW1lKFwiaW50ZWdyYWxcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gKHNjb3JlIC8gdGhpcy5wSW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5Y2h54mM5pWw6YePXHJcbiAgICAgKiBAcGFyYW0geyp9IHVzZXJJZCBcclxuICAgICAqIEBwYXJhbSB7Kn0gY2FyY2RfbGVuZ3RoIFxyXG4gICAgICovXHJcbiAgICBzZXRDYXJkTGVuZ3RoKHVzZXJJZCwgY2FyY2RfbGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJBcnJbaV0gPT0gdXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gY2FyY2RfbGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyVHdvUi5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBjYXJjZF9sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDov5vlhaXmiL/pl7QgIOW6p+S9jeWPt+aOkuW6j1xyXG4gICAgICogQHBhcmFtIHsqfSBuaWNrbmFtZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gc2NvcmUgXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlYXRJZCBcclxuICAgICAqIEBwYXJhbSB7Kn0gdXNlcklkIFxyXG4gICAgICovXHJcbiAgICBvdGhlckVudGVyUm9vbShuaWNrbmFtZSwgc2NvcmUsIHNlYXRJZCwgdXNlcklkLCB1c3JIZWFkKSB7XHJcbiAgICAgICAgY2MubG9nKCflhbblroPnjqnlrrbov5vlhaXmiL/pl7Q6JyArIHNlYXRJZCk7XHJcbiAgICAgICAgbGV0IHNlYXQgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5ldFdvcmsuc2VhdElkID09IDAgJiYgc2VhdElkID09IDEpIHtcclxuICAgICAgICAgICAgc2VhdCA9IHRoaXMub3RoZXJUd29SO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckFyclsyXSA9IHVzZXJJZDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV0V29yay5zZWF0SWQgPT0gMCAmJiBzZWF0SWQgPT0gMikge1xyXG4gICAgICAgICAgICBzZWF0ID0gdGhpcy5vdGhlck9uZUw7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQXJyWzBdID0gdXNlcklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXRXb3JrLnNlYXRJZCA9PSAxICYmIHNlYXRJZCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHNlYXQgPSB0aGlzLm90aGVyT25lTDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBcnJbMF0gPSB1c2VySWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5ldFdvcmsuc2VhdElkID09IDEgJiYgc2VhdElkID09IDIpIHtcclxuICAgICAgICAgICAgc2VhdCA9IHRoaXMub3RoZXJUd29SO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckFyclsyXSA9IHVzZXJJZDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV0V29yay5zZWF0SWQgPT0gMiAmJiBzZWF0SWQgPT0gMSkge1xyXG4gICAgICAgICAgICBzZWF0ID0gdGhpcy5vdGhlck9uZUw7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQXJyWzBdID0gdXNlcklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXRXb3JrLnNlYXRJZCA9PSAyICYmIHNlYXRJZCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHNlYXQgPSB0aGlzLm90aGVyVHdvUjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBcnJbMl0gPSB1c2VySWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWF0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc2VhdC5nZXRDaGlsZEJ5TmFtZShcImJnX25hbWVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJTY29yZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAoc2NvcmUgLyB0aGlzLnBJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKTtcclxuICAgICAgICBzZWF0LmdldENoaWxkQnlOYW1lKFwiYmdfbmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcIm5pQ2hlbmdcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gbmlja25hbWU7XHJcbiAgICAgICAgSGVscGVyLmxvYWRIZWFkKHVzckhlYWQsIHNwID0+IHtcclxuICAgICAgICAgICAgc2VhdC5nZXRDb21wb25lbnQoXCJjYy5TcHJpdGVcIikuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnprvlvIDmiL/pl7RcclxuICAgICAqIEBwYXJhbSB7Kn0gdXNlcklkIFxyXG4gICAgICovXHJcbiAgICBwbGF5ZXJPdXRSb29tKHVzZXJJZCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5wbGF5ZXJBcnIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQXJyW2ldID09IHVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3RoZXJPbmVMLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVyVHdvUi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGFuZGxvYWRzTG9nb1tpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlq3lvIDov57mjqVcclxuICAgICAqL1xyXG4gICAgZGlzY29ubmVjdE5ldFdvcmtfRnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5uZXRXb3JrLkxhbmRsb3Jkc1NvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9O1xyXG4gICAgICAgIHRoaXMubmV0V29yay5MYW5kbG9yZHNTb2NrZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucEluZm8uZ2FtZURpc2Nvbm5lY3QgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29tX01lc3NhZ2VCb3guYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbV9NZXNzYWdlQm94LmdldENoaWxkQnlOYW1lKFwibGJfVGlwc1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcIuaCqOW3suaWree6v++8jOivt+mHjeaWsOeZu+W9lVwiO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeaWsOi/nuaOpVxyXG4gICAgICogQHBhcmFtIHsqfSB1c2VySWQgXHJcbiAgICAgKiBAcGFyYW0geyp9IGRvdWJsZSBcclxuICAgICAqL1xyXG4gICAgcmVzZXRMYW5kbG9yZHModXNlcklkLCBkb3VibGUpIHtcclxuICAgICAgICB0aGlzLnFpYW5nRGlaaHUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckFycltpXSA9PSB1c2VySWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5ldFdvcmsucGxheWVySWQgPT0gdXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYW5kbG9hZHNMb2dvWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzWzFdLmlzTGFuZGxvcmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGJfTG93ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJiZWlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gZG91YmxlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhbmRsb2Fkc0xvZ29baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbaV0uaXNMYW5kbG9yZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYl9Mb3dlci5nZXRDaGlsZEJ5TmFtZShcImJlaVwiKS5nZXRDaGlsZEJ5TmFtZShcImJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBkb3VibGUgLyAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50ZW1wUGxheWVyc0xpc3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy50ZW1wUGxheWVyc0xpc3RzW2ldLnN0YXRlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZW1wUGxheWVyc0xpc3RzW2ldLnN0YXRlW2pdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbaV0uc3RhdGVbal0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzW2ldLnN0YXRlID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WPq+WcsOS4u1xyXG4gICAgY2FsbExhbmRsb2FkcyhzZWNvbmQpIHtcclxuICAgICAgICB0aGlzLmJ0bl9DYWxsTGFuZGxvYWQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJ0blBsYXllclN0YXRlID0gdGhpcy5idG5fQ2FsbExhbmRsb2FkO1xyXG4gICAgICAgIHRoaXMudGltZXIoMSwgc2Vjb25kKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/miqLlnLDkuLtcclxuICAgIHJvYkxhbmRsb3JkKHNlY29uZCwgdXNlcklkKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBsYXllckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJBcnJbaV0gPT09IHVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bl9Sb2JMYW5kbG9hZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuUGxheWVyU3RhdGUgPSB0aGlzLmJ0bl9Sb2JMYW5kbG9hZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL+WIpOaWreaYr+WQpuaJmOeuoVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHVvR3VhbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHVvR3VhbkZ1bmN0aW9uKGkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyKGksIHNlY29uZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhazlhbHniYwsIOS4ieW8oOW6leeJjFxyXG4gICAgICogQHBhcmFtIHsqfSBjYXJkcyBcclxuICAgICAqL1xyXG4gICAgcHVibGljQ2FyZChjYXJkcykge1xyXG4gICAgICAgIGNjLmxvZyhcIuWFrOWFseeJjFwiLCBjYXJkcyk7XHJcbiAgICAgICAgdGhpcy5sYW5kbG9hZHNDYXJkcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8v5a+55bqV54mM6L+b6KGM5a+55q+U5o6S5bqPXHJcbiAgICAgICAgY2FyZHMuc29ydCgoY2FyZEEsIGNhcmRCKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKGNhcmRBLnZhbCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkQS52YWwgKz0gMTIuMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYXJkQS52YWwgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgY2FyZEEudmFsICs9IDExLjI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYXJkQi52YWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY2FyZEIudmFsICs9IDEyLjE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2FyZEIudmFsID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRCLnZhbCArPSAxMS4yO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FyZEEudmFsID09IGNhcmRCLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjYXJkQi50eXBlIC0gY2FyZEEudHlwZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gY2FyZEIudmFsIC0gY2FyZEEudmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGJfTGFuZGxvYWRzQ2FyZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY2FyZHNbaV0udmFsID09IDEzLjEpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRzW2ldLnZhbCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2FyZHNbaV0udmFsID09IDEzLjIpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRzW2ldLnZhbCA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wYl9MYW5kbG9hZHNDYXJkW2ldLmdldENvbXBvbmVudChcIkNhcmRzXCIpLmNhcmRzQ3JlYXRlKGNhcmRzW2ldLnZhbCwgY2FyZHNbaV0udHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmch+Wxj+aViOaenFxyXG4gICAgICovXHJcbiAgICBzaGFja2luZygpIHtcclxuICAgICAgICAvLyB0aGlzLmJnVHUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAvLyB0aGlzLnp1b1ppLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgLy8gdmFyIHp1b1ppUG9pbnQgPSB0aGlzLnp1b1ppLnBvc2l0aW9uO1xyXG4gICAgICAgIC8vIHZhciB6dW9aaUFjdGlvbiA9IGNjLnNlcXVlbmNlKGNjLm1vdmVUbyguMDUsIGNjLnYyKHp1b1ppUG9pbnQueCArIDE1LCB6dW9aaVBvaW50LnkgKyAxNSkpLCBjYy5tb3ZlVG8oLjEsIGNjLnYyKHp1b1ppUG9pbnQueCAtIDE1LCB6dW9aaVBvaW50LnkgLSAxNSkpLCBjYy5tb3ZlVG8oLjA1LCBjYy52Mih6dW9aaVBvaW50LnggKyAxNSwgenVvWmlQb2ludC55KSksIGNjLm1vdmVUbyguMDUsIGNjLnYyKHp1b1ppUG9pbnQueCAtIDE1LCB6dW9aaVBvaW50LnkpKSwgY2MubW92ZVRvKC4xLCBjYy52Mih6dW9aaVBvaW50LngsIHp1b1ppUG9pbnQueSAtIDE1KSksIGNjLm1vdmVUbyguMDUsIHp1b1ppUG9pbnQpKTtcclxuICAgICAgICAvLyB2YXIgYmdUdUFjdGlvbiA9IGNjLnJlcGVhdChjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oLjA1LCBjYy52MigxNSwgMTUpKSwgY2MubW92ZVRvKC4xLCBjYy52MigtMTUsIC0xNSkpLCBjYy5tb3ZlVG8oLjA1LCBjYy52MigxNSwgMCkpLCBjYy5tb3ZlVG8oLjA1LCBjYy52MigtMTUsIDApKSwgY2MubW92ZVRvKC4xLCBjYy52MigwLCAtMTUpKSwgY2MubW92ZVRvKC4wNSwgY2MudjIoMCwgMCkpKSwgMSk7XHJcbiAgICAgICAgLy8gdGhpcy5iZ1R1LnJ1bkFjdGlvbihiZ1R1QWN0aW9uKTtcclxuICAgICAgICAvLyB0aGlzLnp1b1ppLnJ1bkFjdGlvbih6dW9aaUFjdGlvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrTGFuZGxvcmRzKGUsIHQsIGkpIHtcclxuICAgICAgICB0aGlzLmxhbmRsb2Fkc0NhcmRzLmFjdGl2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgIHRoaXMucWlhbmdEaVpodSA9IGZhbHNlLFxyXG4gICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJJZCA9IG51bGwsXHJcbiAgICAgICAgICAgIHQuc29ydChmdW5jdGlvbiAoZSwgdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgPT0gZS52YWwgPyBlLnZhbCArPSAxMi4xIDogMiA9PSBlLnZhbCAmJiAoZS52YWwgKz0gMTEuMiksXHJcbiAgICAgICAgICAgICAgICAgICAgMSA9PSB0LnZhbCA/IHQudmFsICs9IDEyLjEgOiAyID09IHQudmFsICYmICh0LnZhbCArPSAxMS4yKSxcclxuICAgICAgICAgICAgICAgICAgICBlLnZhbCA9PSB0LnZhbCA/IHQudHlwZSAtIGUudHlwZSA6IHQudmFsIC0gZS52YWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB0aGlzLnBiX0xhbmRsb2Fkc0NhcmQubGVuZ3RoOyBuKyspIDEzLjEgPT0gdFtuXS52YWwgPyB0W25dLnZhbCA9IDEgOiAxMy4yID09IHRbbl0udmFsICYmICh0W25dLnZhbCA9IDIpLFxyXG4gICAgICAgICAgICB0aGlzLnBiX0xhbmRsb2Fkc0NhcmRbbl0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikuY2FyZHNDcmVhdGUodFtuXS52YWwsIHRbbl0udHlwZSk7XHJcbiAgICAgICAgaWYgKGUgPT0gdGhpcy5uZXRXb3JrLnBsYXllcklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFuZGxvYWRzTG9nb1sxXS5hY3RpdmUgPSB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzWzFdLmlzTGFuZGxvcmQgPSB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gMTcsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm90aGVyVHdvUi5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAxNztcclxuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB0Lmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbztcclxuICAgICAgICAgICAgICAgIG8gPSB0aGlzLmNhcmRzUG9vbC5zaXplKCkgPiAwID8gdGhpcy5jYXJkc1Bvb2wuZ2V0KCkgOiBjYy5pbnN0YW50aWF0ZSh0aGlzLnBiX0NhcmRzKSxcclxuICAgICAgICAgICAgICAgICAgICBvLnNjYWxlID0gMS4yLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQobywgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgby5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS5jYXJkc0NyZWF0ZSh0W25dLnZhbCwgdFtuXS50eXBlKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckNhcmRzLnB1c2gobylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllckNhcmRzLnNvcnQoZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCA9PSB0LmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCA/IHQuZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudHlwZSAtIGUuZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudHlwZSA6IHQuZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsIC0gZS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGEgPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHMgPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGMgPSBudWxsOyBuIDwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IG4rKylcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckNhcmRzW25dLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCA+IDEzKSBhID0gbjtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKDIgPT0gdGhpcy5wbGF5ZXJDYXJkc1tuXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgfHwgMSA9PSB0aGlzLnBsYXllckNhcmRzW25dLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgcyA9IG47XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChudWxsID09IGEgJiYgbnVsbCAhPSBzKSB7XHJcbiAgICAgICAgICAgICAgICBjID0gdGhpcy5wbGF5ZXJDYXJkcy5zcGxpY2UobiwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgYy5sZW5ndGg7IHIrKykgdGhpcy5wbGF5ZXJDYXJkcy5zcGxpY2UociwgMCwgY1tyXSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChudWxsICE9IGEgJiYgbnVsbCAhPSBzKSB7XHJcbiAgICAgICAgICAgICAgICBjID0gdGhpcy5wbGF5ZXJDYXJkcy5zcGxpY2UobiwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgYy5sZW5ndGg7IHIrKykgdGhpcy5wbGF5ZXJDYXJkcy5zcGxpY2UoYSArIHIgKyAxLCAwLCBjW3JdKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGJfTG93ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJiZWlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gaSxcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRDYXJkTG9jYXQoKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RPdXRDYXJkID0gMCxcclxuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSAyXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB0aGlzLnBsYXllckFyci5sZW5ndGg7IG4rKykgdGhpcy5wbGF5ZXJBcnJbbl0gPT0gZSAmJiAwID09IG4gPyAodGhpcy5sYW5kbG9hZHNMb2dvW25dLmFjdGl2ZSA9IHRydWUsIHRoaXMudGVtcFBsYXllcnNMaXN0c1tuXS5pc0xhbmRsb3JkID0gdHJ1ZSwgdGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gMjAsIHRoaXMub3RoZXJUd29SLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRzTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IDE3KSA6IHRoaXMucGxheWVyQXJyW25dID09IGUgJiYgMiA9PSBuICYmICh0aGlzLmxhbmRsb2Fkc0xvZ29bbl0uYWN0aXZlID0gdHJ1ZSwgdGhpcy50ZW1wUGxheWVyc0xpc3RzW25dLmlzTGFuZGxvcmQgPSB0cnVlLCB0aGlzLm90aGVyT25lTC5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAxNywgdGhpcy5vdGhlclR3b1IuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gMjApO1xyXG4gICAgICAgICAgICB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiYmVpXCIpLmdldENoaWxkQnlOYW1lKFwiYmV0XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IGkgLyAyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuajgOa1i+WcsOS4u1wiKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy50ZW1wUGxheWVyc0xpc3RzLmxlbmd0aDsgZSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbZV0uc3RhdGUubGVuZ3RoOyB0KyspIG51bGwgIT0gdGhpcy50ZW1wUGxheWVyc0xpc3RzW2VdLnN0YXRlW3RdICYmICh0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbZV0uc3RhdGVbdF0uYWN0aXZlID0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1tlXS5zdGF0ZSA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDEpXHJcbiAgICB9LFxyXG4gICAgcGxheWVyTm93U3RhdGUoZSwgdCwgaSwgbikge1xyXG4gICAgICAgIGNjLmxvZyhcIueOqeWutueKtuaAgVwiLCBlLCB0KSxcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxUaW1lcigpLFxyXG4gICAgICAgICAgICBudWxsICE9IG4gJiYgdGhpcy5sYW5kbG9hZHNMb2dvWzFdLmFjdGl2ZSA9PSB0cnVlID8gdGhpcy5wYl9Mb3dlci5nZXRDaGlsZEJ5TmFtZShcImJlaVwiKS5nZXRDaGlsZEJ5TmFtZShcImJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBuIDogbnVsbCAhPSBuICYmIHRoaXMubGFuZGxvYWRzTG9nb1sxXS5hY3RpdmUgPT0gZmFsc2UgJiYgKHRoaXMucGJfTG93ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJiZWlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gbiAvIDIpO1xyXG4gICAgICAgIGZvciAodmFyIG8gPSAtMSxcclxuICAgICAgICAgICAgICAgIGEgPSAwOyBhIDwgdGhpcy5wbGF5ZXJBcnIubGVuZ3RoOyBhKyspXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckFyclthXSA9PSBlKSB7XHJcbiAgICAgICAgICAgICAgICBvID0gYTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKDEgPT0gbyAmJiBudWxsICE9IHRoaXMuYnRuUGxheWVyU3RhdGUgJiYgKHRoaXMuYnRuUGxheWVyU3RhdGUuYWN0aXZlID0gZmFsc2UpLCB0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCLlj6vlnLDkuLtcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcIkNhbGwtdGhlLWxhbmRsb3JkXCIpLmFjdGl2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmppYW9EaVpodUF1ZGlvLCBmYWxzZSwgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxQbGF5ZXJUaXBzU3RhdGVbb10gPSB0aGlzLmFsbFRpcHNbb10uZ2V0Q2hpbGRCeU5hbWUoXCJDYWxsLXRoZS1sYW5kbG9yZFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi5LiN5Y+rXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbFRpcHNbb10uZ2V0Q2hpbGRCeU5hbWUoXCJEb24ndC1jYWxsXCIpLmFjdGl2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJ1Smlhb0F1ZGlvLCBmYWxzZSwgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxQbGF5ZXJUaXBzU3RhdGVbb10gPSB0aGlzLmFsbFRpcHNbb10uZ2V0Q2hpbGRCeU5hbWUoXCJEb24ndC1jYWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLkuI3miqJcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcIkRvbid0LWdyYWJcIikuYWN0aXZlID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYnVRaWFuZ0F1ZGlvLCBmYWxzZSwgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxQbGF5ZXJUaXBzU3RhdGVbb10gPSB0aGlzLmFsbFRpcHNbb10uZ2V0Q2hpbGRCeU5hbWUoXCJEb24ndC1ncmFiXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLkuI3liqDlgI1cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcIk5vLWRvdWJsaW5nXCIpLmFjdGl2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxQbGF5ZXJUaXBzU3RhdGVbb10gPSB0aGlzLmFsbFRpcHNbb10uZ2V0Q2hpbGRCeU5hbWUoXCJOby1kb3VibGluZ1wiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi5LiN5Ye6XCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGxUaXBzW29dLmdldENoaWxkQnlOYW1lKFwiTm9cIikuYWN0aXZlID0gdHJ1ZSwgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJ1WWFvQXVkaW9bTWF0aC5mbG9vcigzICogTWF0aC5yYW5kb20oKSldLCBmYWxzZSwgMSksIDEgPT0gbykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IGErKykgdGhpcy5wbGF5ZXJDYXJkc1thXS5wb3NpdGlvbi55ID09IHRoaXMubW92ZWRZICYmIHRoaXMucGxheWVyQ2FyZHNbYV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikubW92ZUNhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyZCA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxQbGF5ZXJUaXBzU3RhdGVbb10gPSB0aGlzLmFsbFRpcHNbb10uZ2V0Q2hpbGRCeU5hbWUoXCJOb1wiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi5oqi5Zyw5Li7XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbFRpcHNbb10uZ2V0Q2hpbGRCeU5hbWUoXCJSb2ItbGFuZGxvcmRzXCIpLmFjdGl2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnFpYW5nQXVkaW8sIGZhbHNlLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbFBsYXllclRpcHNTdGF0ZVtvXSA9IHRoaXMuYWxsVGlwc1tvXS5nZXRDaGlsZEJ5TmFtZShcIlJvYi1sYW5kbG9yZHNcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIuWKoOWAjVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxUaXBzW29dLmdldENoaWxkQnlOYW1lKFwiZG91YmxlXCIpLmFjdGl2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxQbGF5ZXJUaXBzU3RhdGVbb10gPSB0aGlzLmFsbFRpcHNbb10uZ2V0Q2hpbGRCeU5hbWUoXCJkb3VibGVcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIuWNleeJjFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmNhcmRBdWRpb1tpWzBdLnZhbCAtIDFdLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIuWvueWtkFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmR1aVppQXVkaW9baVswXS52YWwgLSAxXSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLpobrlrZBcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5jYXJkVHlwZUF1ZGlvWzRdLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcyA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGFpWGluZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKHMsIDEwMSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWN5Y2xpbmdbb10ubGVuZ3RoIDwgdGhpcy5wZWFrID8gcy5zZXRQb3NpdGlvbigodGhpcy5yZWN5Y2xpbmdbb11bMF0ucG9zaXRpb24ueCArIHRoaXMucmVjeWNsaW5nW29dW3RoaXMucmVjeWNsaW5nW29dLmxlbmd0aCAtIDFdLnBvc2l0aW9uLnggKyB0aGlzLnJlY3ljbGluZ1tvXVswXS53aWR0aCAqIHRoaXMucmVjeWNsaW5nW29dWzBdLnNjYWxlKSAvIDIsIHRoaXMucmVjeWNsaW5nW29dWzBdLnBvc2l0aW9uLnkpIDogcy5zZXRQb3NpdGlvbigodGhpcy5yZWN5Y2xpbmdbb11bMF0ucG9zaXRpb24ueCArIHRoaXMucmVjeWNsaW5nW29dW3RoaXMucGVha10ucG9zaXRpb24ueCArIHRoaXMucmVjeWNsaW5nW29dWzBdLndpZHRoICogdGhpcy5yZWN5Y2xpbmdbb11bMF0uc2NhbGUpIC8gMiwgdGhpcy5yZWN5Y2xpbmdbb11bMF0ucG9zaXRpb24ueSksXHJcbiAgICAgICAgICAgICAgICAgICAgcy5nZXRDb21wb25lbnQoXCJkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXlcIikuYXJtYXR1cmUoKS5hbmltYXRpb24ucGxheShcInNodW56aVwiLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi5LiJ6aG6XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiAoY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmNhcmRUeXBlQXVkaW9bMF0sIGZhbHNlLCAxKSwgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnRlWGlhb0F1ZGlvWzFdLCBmYWxzZSwgMSkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRUeXBlVGV4dFswXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKGMsIDEwMSksXHJcbiAgICAgICAgICAgICAgICAgICAgYy5zZXRQb3NpdGlvbihjYy52MigwLCAwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KC41KSwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5ydW5BY3Rpb24oZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgciA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGVYaWFvWzBdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQociwgMTAwKSxcclxuICAgICAgICAgICAgICAgICAgICByLnNldFBvc2l0aW9uKGNjLnYyKDg2NyAvIHRoaXMuYmlMaSwgMCkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGwgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMSwgY2MudjIoLTg2NyAvIHRoaXMuYmlMaSwgMCkpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICByLnJ1bkFjdGlvbihsKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi6L+e5a+5XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiAoY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmNhcmRUeXBlQXVkaW9bMV0sIGZhbHNlLCAxKSwgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmNoYW5nZUF1ZGlvLCBmYWxzZSwgMSkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBhaVhpbmcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYl9DYXJkTm9kZS5hZGRDaGlsZChzLCAxMDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjeWNsaW5nW29dLmxlbmd0aCA8IHRoaXMucGVhayA/IHMuc2V0UG9zaXRpb24oKHRoaXMucmVjeWNsaW5nW29dWzBdLnBvc2l0aW9uLnggKyB0aGlzLnJlY3ljbGluZ1tvXVt0aGlzLnJlY3ljbGluZ1tvXS5sZW5ndGggLSAxXS5wb3NpdGlvbi54ICsgdGhpcy5yZWN5Y2xpbmdbb11bMF0ud2lkdGggKiB0aGlzLnJlY3ljbGluZ1tvXVswXS5zY2FsZSkgLyAyLCB0aGlzLnJlY3ljbGluZ1tvXVswXS5wb3NpdGlvbi55KSA6IHMuc2V0UG9zaXRpb24oKHRoaXMucmVjeWNsaW5nW29dWzBdLnBvc2l0aW9uLnggKyB0aGlzLnJlY3ljbGluZ1tvXVt0aGlzLnBlYWtdLnBvc2l0aW9uLnggKyB0aGlzLnJlY3ljbGluZ1tvXVswXS53aWR0aCAqIHRoaXMucmVjeWNsaW5nW29dWzBdLnNjYWxlKSAvIDIsIHRoaXMucmVjeWNsaW5nW29dWzBdLnBvc2l0aW9uLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHMuZ2V0Q29tcG9uZW50KFwiZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5XCIpLmFybWF0dXJlKCkuYW5pbWF0aW9uLnBsYXkoXCJsaWFuZHVpXCIsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLkuInmnaFcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zYW5HZUF1ZGlvW2lbMF0udmFsIC0gMV0sIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi5LiJ5bim5LiAXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY2FyZFR5cGVBdWRpb1szXSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCLkuInluKbkuoxcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5jYXJkVHlwZUF1ZGlvWzJdLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIuWbm+W4puS6jFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgKDYgPT0gaS5sZW5ndGggPyBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY2FyZFR5cGVBdWRpb1s1XSwgZmFsc2UsIDEpIDogOCA9PSBpLmxlbmd0aCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY2FyZFR5cGVBdWRpb1s2XSwgZmFsc2UsIDEpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi6aOe5py6XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiAoY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmNhcmRUeXBlQXVkaW9bMF0sIGZhbHNlLCAxKSwgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnRlWGlhb0F1ZGlvWzFdLCBmYWxzZSwgMSkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRUeXBlVGV4dFswXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKGMsIDEwMSksXHJcbiAgICAgICAgICAgICAgICAgICAgYy5zZXRQb3NpdGlvbihjYy52MigwLCAwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KC41KSwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5ydW5BY3Rpb24oZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgciA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGVYaWFvWzBdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQociwgMTAwKSxcclxuICAgICAgICAgICAgICAgICAgICByLnNldFBvc2l0aW9uKGNjLnYyKDg2NyAvIHRoaXMuYmlMaSwgMCkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGwgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMSwgY2MudjIoLTg2NyAvIHRoaXMuYmlMaSwgMCkpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICByLnJ1bkFjdGlvbihsKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwi54K45by5XCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoMCA9PSBvKSB2YXIgaCA9IHRoaXMub3RoZXJPbmVMLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGQgPSBbaCwgY2MudjIoaC54IC8gMiwgaC55ICsgMTUwKSwgY2MudjIoMCwgMCldO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoMSA9PSBvKSB2YXIgaCA9IHRoaXMucHJvdGFnb25pc3QucG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZCA9IFtoLCBjYy52MihoLnggLyAyLCBoLnkgKyAzNTApLCBjYy52MigwLCAwKV07XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICgyID09IG8pIHZhciBoID0gdGhpcy5vdGhlclR3b1IucG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZCA9IFtoLCBjYy52MihoLnggLyAyLCBoLnkgKyAxNTApLCBjYy52MigwLCAwKV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY2FyZFR5cGVBdWRpb1s4XSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRUeXBlVGV4dFszXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKGMsIDEwMSksXHJcbiAgICAgICAgICAgICAgICAgICAgYy5zZXRQb3NpdGlvbihjYy52MigwLCAwKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgciA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGVYaWFvWzNdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQociwgMTAwKSxcclxuICAgICAgICAgICAgICAgICAgICByLnNldFBvc2l0aW9uKGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHUgPSBjYy5zcGF3bihjYy5yb3RhdGVUbyguNSwgMTgwKSwgY2MuY2FyZGluYWxTcGxpbmVUbyguNSwgZCwgLS41KSk7XHJcbiAgICAgICAgICAgICAgICByLnJ1bkFjdGlvbih1KTtcclxuICAgICAgICAgICAgICAgIHZhciBtID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZGVzdHJveSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy50ZVhpYW9BdWRpb1swXSwgZmFsc2UsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRlWGlhb1sxXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYl9DYXJkTm9kZS5hZGRDaGlsZChtLCAxMDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0uc2V0UG9zaXRpb24oY2MudjIoMCwgMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKC4yLCAxLjIsIDEuMiksIGNjLnNjYWxlVG8oLjIsIDEsIDEpLCBjYy5kZWxheVRpbWUoMSksIGNjLmZhZGVPdXQoLjEpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnJ1bkFjdGlvbihlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYWNraW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLjUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0uZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEuMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIueOi+eCuFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmNhcmRUeXBlQXVkaW9bN10sIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIHZhciByID0gY2MuaW5zdGFudGlhdGUodGhpcy50ZVhpYW9bMl0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGcgPSBjYy52MigodGhpcy5yZWN5Y2xpbmdbb11bMF0ucG9zaXRpb24ueCArIHRoaXMucmVjeWNsaW5nW29dW3RoaXMucmVjeWNsaW5nW29dLmxlbmd0aCAtIDFdLnBvc2l0aW9uLngpIC8gMiwgdGhpcy5yZWN5Y2xpbmdbb11bMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKHIsIDEwMCksXHJcbiAgICAgICAgICAgICAgICAgICAgci5zZXRQb3NpdGlvbihnKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuNCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcCA9IGNjLnNlcXVlbmNlKGNjLm1vdmVUbyguNCwgY2MudjIoMCwgNzM1IC8gdGhpcy5iaUxpKSksIGNjLnJvdGF0ZVRvKDAsIDE4MCksIGNjLm1vdmVUbyguMiwgY2MudjIoMCwgMCkpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucm9ja2V0Qm9vbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKGUsIDEwMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zZXRQb3NpdGlvbihjYy52MigwLCAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGNjLnNlcXVlbmNlKGNjLnNwYXduKGNjLnNjYWxlVG8oLjUsIDMpLCBjYy5mYWRlT3V0KC41KSksIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucnVuQWN0aW9uKHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucEluZm8uc291bmRFZmZlY3RDb250cm9sICYmIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy50ZVhpYW9BdWRpb1swXSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRUeXBlVGV4dFs0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKGksIDEwMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaS5zZXRQb3NpdGlvbihjYy52MigwLCAwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KC41KSwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaS5ydW5BY3Rpb24oZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFja2luZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMpKSxcclxuICAgICAgICAgICAgICAgICAgICB5ID0gY2MuaW5zdGFudGlhdGUodGhpcy5yb2NrZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYl9DYXJkTm9kZS5hZGRDaGlsZCh5LCAxMDApLFxyXG4gICAgICAgICAgICAgICAgICAgIHkuc2V0UG9zaXRpb24oZy54LCBnLnkgKyAxNTApLFxyXG4gICAgICAgICAgICAgICAgICAgIHkucnVuQWN0aW9uKHApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbFBsYXllclRpcHNTdGF0ZVtvXSA9IFtudWxsXVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbb10uc3RhdGUucHVzaCh0aGlzLmFsbFBsYXllclRpcHNTdGF0ZVtvXSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmKXlpKnliqjnlLtcclxuICAgICAqL1xyXG4gICAgY2h1blRpYW5BbmltYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2h1blRpYW5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjaHVuVGlhblwiKS5nZXRDb21wb25lbnQoXCJkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXlcIikuYXJtYXR1cmUoKS5hbmltYXRpb24ucGxheShcImNodW50aWFuXCIsIDEpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2h1blRpYW5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R54mMLOW5tui/m+ihjOaOkuW6j1xyXG4gICAgICogQHBhcmFtIHsqfSBjYXJkcyBcclxuICAgICAqIEBwYXJhbSB7Kn0gaXNMaWNlbnNpbmcgXHJcbiAgICAgKi9cclxuICAgIGNhcmRzU29ydGluZyhjYXJkcywgaXNMaWNlbnNpbmcpIHtcclxuICAgICAgICB0aGlzLmZpbmlzaEdhbWUoKSxcclxuICAgICAgICAgICAgdGhpcy5hbGxUaXBzWzFdLmdldENoaWxkQnlOYW1lKFwiZGVuZ2RhaVwiKS5hY3RpdmUgPSBmYWxzZSxcclxuICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyTGlzdCgpLFxyXG4gICAgICAgICAgICB0aGlzLmNhcmRzQXJyYXkgPSBjYXJkcyxcclxuICAgICAgICAgICAgdGhpcy5jYXJkc0FycmF5LnNvcnQoZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlLnZhbCA9PT0gdC52YWwgPyB0LnR5cGUgLSBlLnR5cGUgOiB0LnZhbCAtIGUudmFsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgbiA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBvID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIGEgPSBudWxsOyBpIDwgdGhpcy5jYXJkc0FycmF5Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYXJkc0FycmF5W2ldLnZhbCA+IDEzKSBuID0gaTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoMiA9PT0gdGhpcy5jYXJkc0FycmF5W2ldLnZhbCB8fCAxID09PSB0aGlzLmNhcmRzQXJyYXlbaV0udmFsKSB7XHJcbiAgICAgICAgICAgIG8gPSBpO1xyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVsbCA9PT0gbiAmJiBudWxsICE9PSBvKSB7XHJcbiAgICAgICAgICAgIGEgPSB0aGlzLmNhcmRzQXJyYXkuc3BsaWNlKGksIHRoaXMuY2FyZHNBcnJheS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCBhLmxlbmd0aDsgcysrKSB0aGlzLmNhcmRzQXJyYXkuc3BsaWNlKHMsIDAsIGFbc10pXHJcbiAgICAgICAgfSBlbHNlIGlmIChudWxsICE9PSBuICYmIG51bGwgIT09IG8pIHtcclxuICAgICAgICAgICAgYSA9IHRoaXMuY2FyZHNBcnJheS5zcGxpY2UoaSwgdGhpcy5jYXJkc0FycmF5Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IGEubGVuZ3RoOyBzKyspIHRoaXMuY2FyZHNBcnJheS5zcGxpY2UobiArIHMgKyAxLCAwLCBhW3NdKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNMaWNlbnNpbmcpXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FyZHMubGVuZ3RoOyBpKyspIHRoaXMubGljZW5zaW5nKGksIGNhcmRzW2ldLnZhbCwgY2FyZHNbaV0udHlwZSk7XHJcbiAgICAgICAgZWxzZSB0aGlzLmxpY2Vuc2luZ1RpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCksXHJcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSAyXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Li05pe255qE546p5a625YiX6KGoXHJcbiAgICAgKi9cclxuICAgIHRlbXBQbGF5ZXJMaXN0KCkge1xyXG4gICAgICAgIHZhciBuaUNoZW5nID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyQXJyLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBuaUNoZW5nID0gdGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJiZ19uYW1lXCIpLmdldENoaWxkQnlOYW1lKFwibmlDaGVuZ1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBuaUNoZW5nID0gdGhpcy5wYl9Mb3dlci5nZXRDaGlsZEJ5TmFtZShcImhlYWRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJuaUNoZW5nXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5pQ2hlbmcgPSB0aGlzLm90aGVyVHdvUi5nZXRDaGlsZEJ5TmFtZShcImJnX25hbWVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJuaUNoZW5nXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbaV0gPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5wbGF5ZXJBcnJbaV0sXHJcbiAgICAgICAgICAgICAgICBuaUNoZW5nOiBuaUNoZW5nLFxyXG4gICAgICAgICAgICAgICAgemhpU2hlbmdZaTogMSxcclxuICAgICAgICAgICAgICAgIHpoaVNoZW5nRXI6IDEsXHJcbiAgICAgICAgICAgICAgICBzZWF0SWQ6IGksXHJcbiAgICAgICAgICAgICAgICBvdXRDYXJkOiBbXSxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBbXSxcclxuICAgICAgICAgICAgICAgIGlzTGFuZGxvcmQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5Y2h54mM5pWwXHJcbiAgICAgKi9cclxuICAgIGxpY2Vuc2luZ1RpbWVyKCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGljZW5zaW5nKGluZGV4LCB0aGlzLmNhcmRzQXJyYXlbaW5kZXhdLnZhbCwgdGhpcy5jYXJkc0FycmF5W2luZGV4XS50eXBlKTtcclxuICAgICAgICAgICAgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmZhUGFpQXVkaW8sIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FyZHNBcnJheS5sZW5ndGggLSAxID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gMTc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm90aGVyVHdvUi5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAxNztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH0sIDAuMSwgdGhpcy5jYXJkc0FycmF5Lmxlbmd0aCAtIDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBpbmRleCBcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsIFxyXG4gICAgICogQHBhcmFtIHsqfSB0eXBlIFxyXG4gICAgICovXHJcbiAgICBsaWNlbnNpbmcoaW5kZXgsIHZhbCwgdHlwZSkge1xyXG4gICAgICAgIHZhciBjYXJkO1xyXG4gICAgICAgIGlmICh0aGlzLmNhcmRzUG9vbC5zaXplKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGNhcmQgPSB0aGlzLmNhcmRzUG9vbC5nZXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYXJkID0gY2MuaW5zdGFudGlhdGUodGhpcy5wYl9DYXJkcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhcmQuc2NhbGUgPSAxLjI7XHJcbiAgICAgICAgdGhpcy5jYXJkV2lkdGggPSBjYXJkLmdldENvbnRlbnRTaXplKCkud2lkdGggKiBjYXJkLnNjYWxlO1xyXG4gICAgICAgIHRoaXMuY2FyZEhlaWdodCA9IGNhcmQuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQgKiBjYXJkLnNjYWxlO1xyXG4gICAgICAgIHZhciBkV2lkdGggPSAtdGhpcy5jYXJkV2lkdGggLyAyIC0gKHRoaXMuY2FyZHNBcnJheS5sZW5ndGggLSAxKSAvIDIgKiB0aGlzLmRpc3RhbmNlQ2FyZDtcclxuICAgICAgICB0aGlzLnBiX0NhcmROb2RlLmFkZENoaWxkKGNhcmQsIDUwICsgaW5kZXgpO1xyXG4gICAgICAgIGNhcmQuc2V0UG9zaXRpb24oZFdpZHRoICsgdGhpcy5kaXN0YW5jZUNhcmQgKiBpbmRleCwgdGhpcy5pbml0WSk7XHJcbiAgICAgICAgY2FyZC5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS5jYXJkc0NyZWF0ZSh2YWwsIHR5cGUpO1xyXG4gICAgICAgIHRoaXMucGxheWVyQ2FyZHMucHVzaChjYXJkKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCv5Yqo6K6h5pe25ZmoXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlYXRJbmRleCBcclxuICAgICAqIEBwYXJhbSB7Kn0gc2Vjb25kIFxyXG4gICAgICovXHJcbiAgICB0aW1lcihzZWF0SW5kZXgsIHNlY29uZCkge1xyXG4gICAgICAgIC8v56e76Zmk5Y6f5p2l55qE6K6h5pe25ZmoXHJcbiAgICAgICAgdGhpcy5jYW5jZWxUaW1lcigpO1xyXG4gICAgICAgIGNjLmxvZyhcIuiuoeaXtuWZqFwiLCBzZWF0SW5kZXgpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50ZW1wUGxheWVyc0xpc3RzW3NlYXRJbmRleF0uc3RhdGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVtcFBsYXllcnNMaXN0c1tzZWF0SW5kZXhdLnN0YXRlW2ldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbc2VhdEluZGV4XS5zdGF0ZVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzW3NlYXRJbmRleF0uc3RhdGUgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbW92ZUNhcmRzKHNlYXRJbmRleCk7XHJcbiAgICAgICAgdGhpcy5wYl9UaW1lcltzZWF0SW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChzZWNvbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYl9UaW1lcltzZWF0SW5kZXhdLmdldENvbXBvbmVudChcInRpbWVyXCIpLm51bSA9IHNlY29uZDtcclxuICAgICAgICAgICAgdGhpcy5wYl9UaW1lcltzZWF0SW5kZXhdLmdldENvbXBvbmVudChcInRpbWVyXCIpLmNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYl9UaW1lcltzZWF0SW5kZXhdLmdldENvbXBvbmVudChcInRpbWVyXCIpLnN0YXJ0VGltZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTorqHml7blmahcclxuICAgICAqL1xyXG4gICAgY2FuY2VsVGltZXIoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBiX1RpbWVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBiX1RpbWVyW2ldLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYl9UaW1lcltpXS5nZXRDb21wb25lbnQoXCJ0aW1lclwiKS5jYW5jZWxUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYl9UaW1lcltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgcnVsZXMoZSkge1xyXG4gICAgICAgIHZhciB0ID0gdGhpcy5jYXJkVHlwZSh0aGlzLnByaW1hcnlDYXJkKTtcclxuICAgICAgICBpZiAoMCA9PSBlLmxlbmd0aCkgcmV0dXJuIHQudHlwZSA+IC0xO1xyXG4gICAgICAgIHZhciBpID0gdGhpcy5jYXJkVHlwZShlKTtcclxuICAgICAgICByZXR1cm4gMSA9PSB0Lm1heCA/IHQubWF4ICs9IDEyLjEgOiAyID09IHQubWF4ICYmICh0Lm1heCArPSAxMS4yKSxcclxuICAgICAgICAgICAgMSA9PSBpLm1heCA/IGkubWF4ICs9IDEyLjEgOiAyID09IGkubWF4ICYmIChpLm1heCArPSAxMS4yKSxcclxuICAgICAgICAgICAgOCA9PSB0LnR5cGUgJiYgaS50eXBlIDwgOCB8fCAoOSA9PSB0LnR5cGUgfHwgdC5sZW5ndGggPT0gaS5sZW5ndGggJiYgdC50eXBlID09IGkudHlwZSAmJiB0Lm1heCA+IGkubWF4KVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog6I635b6X54mM5Z6LXHJcbiAgICAgKi9cclxuICAgIGNhcmRUeXBlKGNhcmRzKSB7XHJcbiAgICAgICAgdmFyIGNvdW50O1xyXG4gICAgICAgIHZhciB0eXBlID0gLTE7XHJcbiAgICAgICAgdmFyIG1heCA9IDA7XHJcbiAgICAgICAgdmFyIGNhcmRMaXN0ID0gW107XHJcbiAgICAgICAgaWYgKGNhcmRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy/ljZXniYxcclxuICAgICAgICAgICAgY2FyZExpc3RbMF0gPSB0aGlzLmNoZWNrT25lQ2FyZChjYXJkcyk7XHJcbiAgICAgICAgICAgIC8v5a+55a2QXHJcbiAgICAgICAgICAgIGNhcmRMaXN0WzFdID0gdGhpcy5jaGVja0R1aVppKGNhcmRzKTtcclxuICAgICAgICAgICAgLy/pobrlrZBcclxuICAgICAgICAgICAgY2FyZExpc3RbMl0gPSB0aGlzLmNoZWNrU2h1blppKGNhcmRzKTtcclxuICAgICAgICAgICAgLy/kuInpobpcclxuICAgICAgICAgICAgY2FyZExpc3RbM10gPSB0aGlzLmNoZWNrU2FuT3JTaHVuKGNhcmRzKTtcclxuICAgICAgICAgICAgLy/lm5vluKbkuoxcclxuICAgICAgICAgICAgY2FyZExpc3RbNF0gPSB0aGlzLmNoZWNrU2lUYWtlVHdvKGNhcmRzKTtcclxuICAgICAgICAgICAgLy/lm5vluKbkuKTlr7lcclxuICAgICAgICAgICAgY2FyZExpc3RbNV0gPSB0aGlzLmNoZWNrU2lUYWtlVHdvU2h1YW5nKGNhcmRzKTtcclxuICAgICAgICAgICAgLy/po57mnLpcclxuICAgICAgICAgICAgY2FyZExpc3RbNl0gPSB0aGlzLmNoZWNrU2FuT3JQbGFuZShjYXJkcyk7XHJcbiAgICAgICAgICAgIC8v6L+e6ZifXHJcbiAgICAgICAgICAgIGNhcmRMaXN0WzddID0gdGhpcy5jaGVja1NhblNodWFuZ09yUGxhbmUoY2FyZHMpO1xyXG4gICAgICAgICAgICAvL+eCuOW8uVxyXG4gICAgICAgICAgICBjYXJkTGlzdFs4XSA9IHRoaXMuY2hlY2tTaShjYXJkcyk7XHJcbiAgICAgICAgICAgIC8v546L54K4XHJcbiAgICAgICAgICAgIGNhcmRMaXN0WzldID0gdGhpcy5raW5nQm9vbShjYXJkcyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FyZExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYXJkTGlzdFtpXS5udW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSBjYXJkTGlzdFtpXS5tYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSBjYXJkcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgbWF4OiBtYXgsXHJcbiAgICAgICAgICAgIGxlbmd0aDogY291bnRcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCJ5oup5Y2h54mMXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyIFxyXG4gICAgICovXHJcbiAgICBzZWxlY3RDYXJkcyhhcikge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCcxMTExMTExJywgdGhpcy5zdGFydExvY2F0LngsIGFyLngsIHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoKTtcclxuICAgICAgICBpZiAodGhpcy5zdGFydExvY2F0LnggPj0gYXIueCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyB0KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ID09IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhci54ID4gdGhpcy5wbGF5ZXJDYXJkc1t0XS5wb3NpdGlvbi54ICsgdGhpcy5jYXJkV2lkdGggfHwgdGhpcy5zdGFydExvY2F0LnggPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnggfHwgdGhpcy5zdGFydExvY2F0LnkgPiB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgKyB0aGlzLmNhcmRIZWlnaHQgLyAyIHx8IGFyLnkgPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgLSB0aGlzLmNhcmRIZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbdF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikuY2hhbmdlQmFpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1t0XS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS5jaGFuZ2VIdWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhci54ID4gdGhpcy5wbGF5ZXJDYXJkc1t0XS5wb3NpdGlvbi54ICsgdGhpcy5kaXN0YW5jZUNhcmQgfHwgdGhpcy5zdGFydExvY2F0LnggPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnggfHwgdGhpcy5zdGFydExvY2F0LnkgPiB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgKyB0aGlzLmNhcmRIZWlnaHQgLyAyIHx8IGFyLnkgPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgLSB0aGlzLmNhcmRIZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbdF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikuY2hhbmdlQmFpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1t0XS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS5jaGFuZ2VIdWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyB0KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ID09IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0TG9jYXQueCA+IHRoaXMucGxheWVyQ2FyZHNbdF0ucG9zaXRpb24ueCArIHRoaXMuY2FyZFdpZHRoIHx8IGFyLnggPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnggfHwgdGhpcy5zdGFydExvY2F0LnkgPiB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgKyB0aGlzLmNhcmRIZWlnaHQgLyAyIHx8IGFyLnkgPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgLSB0aGlzLmNhcmRIZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbdF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikuY2hhbmdlQmFpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1t0XS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS5jaGFuZ2VIdWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0TG9jYXQueCA+IHRoaXMucGxheWVyQ2FyZHNbdF0ucG9zaXRpb24ueCArIHRoaXMuZGlzdGFuY2VDYXJkIHx8IGFyLnggPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnggfHwgdGhpcy5zdGFydExvY2F0LnkgPiB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgKyB0aGlzLmNhcmRIZWlnaHQgLyAyIHx8IGFyLnkgPCB0aGlzLnBsYXllckNhcmRzW3RdLnBvc2l0aW9uLnkgLSB0aGlzLmNhcmRIZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbdF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikuY2hhbmdlQmFpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1t0XS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS5jaGFuZ2VIdWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb3V0Q2FyZCgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyZCA9IFtdO1xyXG4gICAgICAgIHRoaXMucHJpbWFyeU51bSgpO1xyXG4gICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IGUrKykgdGhpcy5wbGF5ZXJDYXJkc1tlXS5wb3NpdGlvbi55ID09IHRoaXMubW92ZWRZICYmIHRoaXMuc2VsZWN0ZWRDYXJkLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tlXSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXJkLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm90Q29uZm9ybVJ1bGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX091dENhcmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gdGhpcy50aW1lcigxLCBudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5idG5QbGF5ZXJTdGF0ZSA9IHRoaXMuYnRuX091dENhcmQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IFtdLCBlID0gMDsgZSA8IHRoaXMuc2VsZWN0ZWRDYXJkLmxlbmd0aDsgZSsrKSB0LnB1c2goe1xyXG4gICAgICAgICAgICB2YWw6IHRoaXMuc2VsZWN0ZWRDYXJkW2VdLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCxcclxuICAgICAgICAgICAgdHlwZTogdGhpcy5zZWxlY3RlZENhcmRbZV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudHlwZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV0V29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdChcInNlbmRDYXJkc0FyclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYXk6IHQsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnBJbmZvLnBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlSWQ6IHRoaXMubmV0V29yay50YWJsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXRJZDogdGhpcy5uZXRXb3JrLnNlYXRJZFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJlbWl0XCIsIHQsIHRoaXMucEluZm8ucGxheWVySWQsIHRoaXMubmV0V29yay50YWJsZUlkLCB0aGlzLm5ldFdvcmsuc2VhdElkKVxyXG4gICAgICAgIH0gY2F0Y2ggKGkpIHt9XHJcbiAgICB9LFxyXG4gICAgaWRlbnRpZnlDYXJkcygpIHtcclxuICAgICAgICB0aGlzLmJ0bl9PdXRDYXJkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IGUrKylcclxuICAgICAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCB0aGlzLnNlbGVjdGVkQ2FyZC5sZW5ndGg7IHQrKylcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckNhcmRzW2VdID09IHRoaXMuc2VsZWN0ZWRDYXJkW3RdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkcy5zcGxpY2UoZSwgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUtLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIHZhciBpID0gbnVsbCxcclxuICAgICAgICAgICAgbiA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXJkLmxlbmd0aCAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICBuID0gdGhpcy5zZWxlY3RlZENhcmQubGVuZ3RoIC8gMjtcclxuICAgICAgICAgICAgZm9yICh2YXIgZSA9IDA7IGUgPCB0aGlzLnNlbGVjdGVkQ2FyZC5sZW5ndGg7IGUrKykgdGhpcy5zZWxlY3RlZENhcmRbZV0uc2NhbGUgPSAuOCxcclxuICAgICAgICAgICAgICAgIGkgPSAtbiAqIHRoaXMuc21hbGxEaXN0YW5jZUNhcmQgKyBlICogdGhpcy5zbWFsbERpc3RhbmNlQ2FyZCAtIHRoaXMuc2VsZWN0ZWRDYXJkW2VdLmdldENvbnRlbnRTaXplKCkud2lkdGggKiB0aGlzLnNlbGVjdGVkQ2FyZFtlXS5zY2FsZSAvIDIgKyB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkIC8gMixcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJkW2VdLnNldFBvc2l0aW9uKGNjLnYyKGksIHRoaXMuZmluaXNoWSkpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcmRbZV0uekluZGV4ID0gMCxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJkW2VdLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMjU1LCAyNTUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbiA9ICh0aGlzLnNlbGVjdGVkQ2FyZC5sZW5ndGggLSAxKSAvIDI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy5zZWxlY3RlZENhcmQubGVuZ3RoOyBlKyspIHRoaXMuc2VsZWN0ZWRDYXJkW2VdLnNjYWxlID0gLjgsXHJcbiAgICAgICAgICAgICAgICBpID0gLW4gKiB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkICsgZSAqIHRoaXMuc21hbGxEaXN0YW5jZUNhcmQgLSB0aGlzLnNlbGVjdGVkQ2FyZFtlXS5nZXRDb250ZW50U2l6ZSgpLndpZHRoICogdGhpcy5zZWxlY3RlZENhcmRbZV0uc2NhbGUgLyAyLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcmRbZV0uc2V0UG9zaXRpb24oY2MudjIoaSwgdGhpcy5maW5pc2hZKSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyZFtlXS56SW5kZXggPSAwLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcmRbZV0uY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCAyNTUsIDI1NSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5idG5fT3V0Q2FyZC5nZXRDaGlsZEJ5TmFtZShcImJ0bl9idWNodVwiKS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID09IGZhbHNlICYmICh0aGlzLmJ0bl9PdXRDYXJkLmdldENoaWxkQnlOYW1lKFwiYnRuX2J1Y2h1XCIpLmdldENvbXBvbmVudChcImNjLkJ1dHRvblwiKS5pbnRlcmFjdGFibGUgPSB0cnVlKSxcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcmQubGVuZ3RoID4gMCAmJiB0aGlzLnJlc2V0Q2FyZExvY2F0KCksXHJcbiAgICAgICAgICAgIHRoaXMub3RoZXJDYXJkQXJyID0gW10sXHJcbiAgICAgICAgICAgIHRoaXMudGlwc0NhcmRzQXJyID0gW10sXHJcbiAgICAgICAgICAgIHRoaXMudGlwc0NvdW50ID0gMCxcclxuICAgICAgICAgICAgdGhpcy5jb3VudCA9IDBcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOS4jeespuWQiOinhOWImVxyXG4gICAgICovXHJcbiAgICBub3RDb25mb3JtUnVsZXMoKSB7XHJcbiAgICAgICAgdGhpcy5hbGxUaXBzWzFdLmdldENoaWxkQnlOYW1lKFwiUHJvbXB0MVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYWxsVGlwc1sxXS5nZXRDaGlsZEJ5TmFtZShcIlByb21wdDFcIikuZ2V0Q29tcG9uZW50KFwiY2MuQW5pbWF0aW9uXCIpLnBsYXkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLDoh6rlt7Hlh7rniYwg5pi+56S65Ye654mM5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0geyp9IHVzZXJJZCBcclxuICAgICAqIEBwYXJhbSB7Kn0gc2Vjb25kIFxyXG4gICAgICovXHJcbiAgICBwbGF5U3RhdGUodXNlcklkLCBzZWNvbmQpIHtcclxuICAgICAgICB0aGlzLmNhbmNlbFRpbWVyKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBsYXllckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJBcnJbaV0gPT0gdXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXRXb3JrLnBsYXllcklkID09IHVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5omY566hXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHVvR3VhbiA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bl9PdXRDYXJkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuUGxheWVyU3RhdGUgPSB0aGlzLmJ0bl9PdXRDYXJkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyKGksIHNlY29uZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvdW50ID49IDIgfHwgdGhpcy5maXJzdE91dENhcmQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5fT3V0Q2FyZC5nZXRDaGlsZEJ5TmFtZShcImJ0bl9idWNodVwiKS5nZXRDb21wb25lbnQoXCJjYy5CdXR0b25cIikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0T3V0Q2FyZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50dW9HdWFuRnVuY3Rpb24oaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyKGksIHNlY29uZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omY566hXHJcbiAgICAgKiBAcGFyYW0geyp9IGluZGV4IFxyXG4gICAgICovXHJcbiAgICB0dW9HdWFuRnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucWlhbmdEaVpodSAmJiAodGhpcy5wYl9UaW1lclsxXS5hY3RpdmUgPT0gdHJ1ZSB8fCBpbmRleCA9PSAxKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXRXb3JrLkxhbmRsb3Jkc1NvY2tldC5lbWl0KFwicWlhbmdcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlSWQ6IHRoaXMubmV0V29yay50YWJsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXRJZDogdGhpcy5uZXRXb3JrLnNlYXRJZCxcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogdGhpcy5uZXRXb3JrLnBsYXllcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIHFpYW5nOiAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge307XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50ZW1wUGxheWVyc0xpc3RzWzFdLnN0YXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZW1wUGxheWVyc0xpc3RzWzFdLnN0YXRlW2ldICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbMV0uc3RhdGVbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzWzFdLnN0YXRlID0gW107XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVGaW5pc2ggJiYgKGluZGV4ID09IDEgfHwgdGhpcy5wYl9UaW1lclsxXS5hY3RpdmUgPT0gdHJ1ZSkpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbMV0uc3RhdGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbMV0uc3RhdGVbaV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1sxXS5zdGF0ZVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbMV0uc3RhdGUgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDYXJkcygxKTtcclxuICAgICAgICAgICAgdGhpcy50bXBUdW9ndWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBzQ2xpY2soKTtcclxuICAgICAgICAgICAgfSwgMSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB9LCAxKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZjnrqHnirbmgIFcclxuICAgICAqIEBwYXJhbSB7Kn0gcmVzbHV0IFxyXG4gICAgICogQHBhcmFtIHsqfSB1c2VySWQgXHJcbiAgICAgKi9cclxuICAgIHR1b0d1YW5TdGF0ZShyZXNsdXQsIHVzZXJJZCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQXJyW2ldID09IHVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJ0dW9HdWFuXCIpLmFjdGl2ZSA9IHJlc2x1dDtcclxuICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdGhlclR3b1IuZ2V0Q2hpbGRCeU5hbWUoXCJ0dW9HdWFuXCIpLmFjdGl2ZSA9IHJlc2x1dDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHJlc2V0Q2FyZExvY2F0KCkge1xyXG4gICAgICAgIHZhciBzaXplID0gLXRoaXMuY2FyZFdpZHRoIC8gMiAtICh0aGlzLnBsYXllckNhcmRzLmxlbmd0aCAtIDEpIC8gMiAqIHRoaXMuZGlzdGFuY2VDYXJkO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckNhcmRzW2ldLnNldFBvc2l0aW9uKGNjLnYyKHNpemUgKyB0aGlzLmRpc3RhbmNlQ2FyZCAqIGksIHRoaXMuaW5pdFkpKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1tpXS56SW5kZXggPSBpICsgNTA7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbaV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikuaGFuZENhcmQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlY3ljbGluZ1sxXSA9IHRoaXMuc2VsZWN0ZWRDYXJkO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJkID0gW107XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHByaW1hcnlOdW0oKSB7XHJcbiAgICAgICAgdGhpcy5wcmltYXJ5Q2FyZCA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IGUrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJDYXJkc1tlXS5wb3NpdGlvbi55ID09IHRoaXMubW92ZWRZKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaW1hcnlDYXJkLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbDogdGhpcy5wbGF5ZXJDYXJkc1tlXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+WNleeJjFxyXG4gICAgICogQHBhcmFtIHsqfSBjYXJkcyBcclxuICAgICAqL1xyXG4gICAgY2hlY2tPbmVDYXJkKGNhcmRzKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0ge307XHJcbiAgICAgICAgdmFsdWUubWF4ID0gMDtcclxuICAgICAgICB2YWx1ZS5udW0gPSAwO1xyXG4gICAgICAgIGlmIChjYXJkcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgdmFsdWUubWF4ID0gY2FyZHNbMF0udmFsO1xyXG4gICAgICAgICAgICB2YWx1ZS5udW0gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWL5a+55a2QXHJcbiAgICAgKiBAcGFyYW0geyp9IGNhcmRzIFxyXG4gICAgICovXHJcbiAgICBjaGVja0R1aVppKGNhcmRzKSB7XHJcblxyXG4gICAgICAgIHZhciB2YWx1ZSA9IHt9O1xyXG4gICAgICAgIHZhbHVlLm1heCA9IGNhcmRzWzBdLnZhbDtcclxuICAgICAgICB2YWx1ZS5udW0gPSAwO1xyXG5cclxuICAgICAgICAvL+iuoeeul+WBtuaVsFxyXG4gICAgICAgIGlmIChjYXJkcy5sZW5ndGggJSAyID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkcy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhcmRzWzBdLnZhbCA9PSBjYXJkc1sxXS52YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXg6IGNhcmRzWzBdLnZhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNhcmRzLmxlbmd0aCA+IDUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrU2koY2FyZHMpLm51bSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiBjYXJkc1swXS52YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bTogMFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNDYW4sIGlzRXF1YWw7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IGNhcmRzLmxlbmd0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBlcSA9IDA7IGVxIDwgc2l6ZTsgZXErKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXJkc1syICogZXFdLnZhbCAhPSBjYXJkc1syICogZXEgKyAxXS52YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFcXVhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFcXVhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChlcSArIDEpICogMiA8IGNhcmRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZHNbMiAqIGVxXS52YWwgPT0gMSAmJiBjYXJkc1syICogKGVxICsgMSldLnZhbCA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDIgPT09IGNhcmRzWzIgKiBlcV0udmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXJkc1syICogZXFdLnZhbCAtIGNhcmRzWzIgKiAoZXEgKyAxKV0udmFsICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzRXF1YWwgJiYgaXNDYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUubnVtID0gc2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWL6aG65a2QXHJcbiAgICAgKiBAcGFyYW0geyp9IGNhcmRzIFxyXG4gICAgICovXHJcbiAgICBjaGVja1NodW5aaShjYXJkcykge1xyXG4gICAgICAgIHZhciBpc0NhbjtcclxuICAgICAgICB2YXIgdmFsdWUgPSB7fTtcclxuICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgdmFsdWUubnVtID0gMDtcclxuICAgICAgICAvL+mVv+W6puWkp+S6jjRcclxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoID4gNCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhcmRzW2ldLnZhbCA9PSAxICYmIGNhcmRzW2kgKyAxXS52YWwgPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0NhbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXJkc1tpXS52YWwgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZHNbaV0udmFsIC0gY2FyZHNbaSArIDFdLnZhbCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2FuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2FuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNDYW4pIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLm1heCA9IGNhcmRzWzBdLnZhbDtcclxuICAgICAgICAgICAgICAgIHZhbHVlLm51bSA9IGNhcmRzLmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWL5LiJ6aG6XHJcbiAgICAgKiBAcGFyYW0geyp9IGNhcmRzIFxyXG4gICAgICovXHJcbiAgICBjaGVja1Nhbk9yU2h1bihjYXJkcykge1xyXG4gICAgICAgIHZhciBpc0NhbiwgaXNFcXVhbDtcclxuICAgICAgICB2YXIgdmFsdWUgPSB7fTtcclxuICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgdmFsdWUubnVtID0gMDtcclxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoICUgMyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gY2FyZHMubGVuZ3RoIC8gMztcclxuICAgICAgICAgICAgaWYgKHNpemUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaXNFcXVhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXJkc1tpXS52YWwgIT09IGNhcmRzW2kgKyAxXS52YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNDYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2FuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDMgKiAoaSArIDEpIDwgY2FyZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZHNbMyAqIGldLnZhbCAtIGNhcmRzWzMgKiAoaSArIDEpXS52YWwgIT0gMSAmJiAoY2FyZHNbMyAqIGldLnZhbCAhPSAxIHx8IGNhcmRzWzMgKiAoaSArIDEpXS52YWwgIT0gMTMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFcXVhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFcXVhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRzWzMgKiBpICsgal0udmFsICE9IGNhcmRzWzMgKiBpICsgaiArIDFdLnZhbCB8fCBjYXJkc1szICogaSArIGpdLnZhbCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNDYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNDYW4gJiYgaXNFcXVhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUubWF4ID0gY2FyZHNbMF0udmFsO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUubnVtID0gc2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWL54K45by5XHJcbiAgICAgKiBAcGFyYW0geyp9IGNhcmRzIFxyXG4gICAgICovXHJcbiAgICBjaGVja1NpKGNhcmRzKSB7XHJcbiAgICAgICAgdmFyIGlzRXF1YWwgPSBmYWxzZTtcclxuICAgICAgICB2YXIgdmFsdWUgPSB7fTtcclxuICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgdmFsdWUubnVtID0gMDtcclxuICAgICAgICAvL+WIpOaWremVv+W6puS4ujRcclxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FyZHMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WIpOaWreaYr+WQpuebuOWQjFxyXG4gICAgICAgICAgICAgICAgaWYgKGNhcmRzW2ldLnZhbCA9PSBjYXJkc1tpICsgMV0udmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFcXVhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRXF1YWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNFcXVhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUubWF4ID0gY2FyZHNbMF0udmFsO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUubnVtID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWL5Zub5bim5LqMXHJcbiAgICAgKiBAcGFyYW0geyp9IGNhcmRzIFxyXG4gICAgICovXHJcbiAgICBjaGVja1NpVGFrZVR3byhjYXJkcykge1xyXG4gICAgICAgIHZhciB0ZW1wO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHt9O1xyXG4gICAgICAgIHZhbHVlLm1heCA9IGNhcmRzWzBdLnZhbDtcclxuICAgICAgICB2YWx1ZS5udW0gPSAwO1xyXG5cclxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoID09PSA2KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNhcmRzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcC5wdXNoKGNhcmRzW2tdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRlbXAuc3BsaWNlKDAsIGkpO1xyXG4gICAgICAgICAgICAgICAgdGVtcC5zcGxpY2UodGVtcC5sZW5ndGggLSAoMiAtIGkpLCAyIC0gaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja1NpKHRlbXApLm51bSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLm1heCA9IHRlbXBbMF0udmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLm51bSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+Wbm+W4puS4pOWvuVxyXG4gICAgICovXHJcbiAgICBjaGVja1NpVGFrZVR3b1NodWFuZyhjYXJkcykge1xyXG4gICAgICAgIHZhciBjYXJkTGlzdCwgdGVtcExpc3QsIGluZGV4LCBzaXplID0gMjtcclxuICAgICAgICB2YXIgdmFsdWUgPSB7fTtcclxuICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgdmFsdWUubnVtID0gMDtcclxuXHJcbiAgICAgICAgLy/liKTmlq3plb/luqbnrYnkuo44XHJcbiAgICAgICAgaWYgKGNhcmRzLmxlbmd0aCA9PSA4KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGVtcExpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2FyZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXJkTGlzdC5wdXNoKGNhcmRzW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBvbmVDYXJkID0gY2FyZExpc3Quc2xpY2UoMCwgMiAqIGkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHR3b0NhcmQgPSBjYXJkTGlzdC5zbGljZShjYXJkTGlzdC5sZW5ndGggLSAyICogc2l6ZSArIDIgKiBpLCBjYXJkTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgY2FyZExpc3Quc3BsaWNlKDAsIDIgKiBpKTtcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0LnNwbGljZShjYXJkTGlzdC5sZW5ndGggLSAyICogc2l6ZSArIDIgKiBpLCAyICogc2l6ZSAtIDIgKiBpKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb25lQ2FyZC5sZW5ndGggLyAyOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTGlzdC5wdXNoKFtvbmVDYXJkWzIgKiBqXSwgb25lQ2FyZFsyICogaiArIDFdXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHR3b0NhcmQubGVuZ3RoIC8gMjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpc3QucHVzaChbdHdvQ2FyZFsyICogal0sIHR3b0NhcmRbMiAqIGogKyAxXV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0ZW1wTGlzdC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrRHVpWmkodGVtcExpc3Rbal0pLm51bSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSBzaXplICYmIHRoaXMuY2hlY2tTaShjYXJkTGlzdCkubnVtID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLm1heCA9IGNhcmRMaXN0WzBdLnZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLm51bSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+mjnuaculxyXG4gICAgICovXHJcbiAgICBjaGVja1Nhbk9yUGxhbmUoY2FyZHMpIHtcclxuICAgICAgICB2YXIgc2l6ZTtcclxuICAgICAgICB2YXIgdmFsdWUgPSB7fTtcclxuICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgdmFsdWUubnVtID0gMDtcclxuXHJcbiAgICAgICAgaWYgKGNhcmRzLmxlbmd0aCAlIDQgPT0gMCkge1xyXG4gICAgICAgICAgICBzaXplID0gY2FyZHMubGVuZ3RoIC8gNDtcclxuICAgICAgICAgICAgdmFyIHRlbXBMaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBzaXplOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrU2koY2FyZHMuc2xpY2UoaSwgaSArIDQpKS5udW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5tYXggPSBjYXJkc1swXS52YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUubnVtID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRlbXBMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNhcmRzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUgPiAxICYmIGNhcmRzW2tdLnZhbCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLm1heCA9IGNhcmRzWzBdLnZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUubnVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpc3QucHVzaChjYXJkc1trXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRlbXBMaXN0LnNwbGljZSgwLCBpKTtcclxuICAgICAgICAgICAgICAgIHRlbXBMaXN0LnNwbGljZSh0ZW1wTGlzdC5sZW5ndGggLSBzaXplICsgaSwgc2l6ZSAtIGkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tTYW5PclNodW4odGVtcExpc3QpLm51bSA9PT0gc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLm1heCA9IHRlbXBMaXN0WzBdLnZhbDtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5udW0gPSBzaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvov57lr7lcclxuICAgICAqIEBwYXJhbSB7Kn0gY2FyZHMgXHJcbiAgICAgKi9cclxuICAgIGNoZWNrU2FuU2h1YW5nT3JQbGFuZShjYXJkcykge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHt9O1xyXG4gICAgICAgIHZhbHVlLm1heCA9IGNhcmRzWzBdLnZhbDtcclxuICAgICAgICB2YWx1ZS5udW0gPSAwO1xyXG5cclxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoICUgNSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzaXplO1xyXG4gICAgICAgICAgICB2YXIgY2FyZExpc3QgPSBbXTtcclxuICAgICAgICAgICAgdmFyIHRlbXBMaXN0O1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IGNhcmRzLmxlbmd0aCAvIDU7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBzaXplOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRlbXBMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBjYXJkTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjYXJkcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaXplID4gMSAmJiAyID09PSBjYXJkc1trXS52YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUubWF4ID0gY2FyZHNbMF0udmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5udW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTGlzdC5wdXNoKGNhcmRzW2tdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBvbmVDYXJkID0gdGVtcExpc3Quc2xpY2UoMCwgMiAqIGkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHR3b0NhcmQgPSB0ZW1wTGlzdC5zbGljZSh0ZW1wTGlzdC5sZW5ndGggLSAyICogc2l6ZSArIDIgKiBpLCB0ZW1wTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdGVtcExpc3Quc3BsaWNlKDAsIDIgKiBpKTtcclxuICAgICAgICAgICAgICAgIHRlbXBMaXN0LnNwbGljZSh0ZW1wTGlzdC5sZW5ndGggLSAyICogc2l6ZSArIDIgKiBpLCAyICogc2l6ZSAtIDIgKiBpKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgb25lQ2FyZC5sZW5ndGggLyAyOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXJkTGlzdC5wdXNoKFtvbmVDYXJkWzIgKiBrXSwgb25lQ2FyZFsyICogayArIDFdXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHR3b0NhcmQubGVuZ3RoIC8gMjsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZExpc3QucHVzaChbdHdvQ2FyZFsyICoga10sIHR3b0NhcmRbMiAqIGsgKyAxXV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjYXJkTGlzdC5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrRHVpWmkoY2FyZExpc3Rba10pLm51bSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSBzaXplICYmIHRoaXMuY2hlY2tTYW5PclNodW4odGVtcExpc3QpLm51bSA9PSBzaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5tYXggPSB0ZW1wTGlzdFswXS52YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5udW0gPSBzaXplO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvnjovngrhcclxuICAgICAqIEBwYXJhbSB7Kn0gY2FyZHMgXHJcbiAgICAgKi9cclxuICAgIGtpbmdCb29tKGNhcmRzKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0ge307XHJcbiAgICAgICAgdmFsdWUubWF4ID0gMDtcclxuICAgICAgICB2YWx1ZS5udW0gPSAwO1xyXG4gICAgICAgIC8v5Yik5pat5piv5Lik5byg54mMLCDmnInlpKfnjovlkozlsI/njovvvIzliJnmmK/njovngrhcclxuICAgICAgICBpZiAoY2FyZHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkc1swXS52YWwgPT09IDE1ICYmIGNhcmRzWzFdLnZhbCA9PSAxNCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUubWF4ID0gMTU7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5udW0gPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgb3RoZXJQbGF5ZXJPdXRDYXJkKGUsIHQsIGkpIHtcclxuICAgICAgICBmb3IgKHZhciBuID0gLTEsXHJcbiAgICAgICAgICAgICAgICBvID0gMDsgbyA8IHRoaXMucGxheWVyQXJyLmxlbmd0aDsgbysrKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJBcnJbb10gPT0gdCkge1xyXG4gICAgICAgICAgICAgICAgbiA9IG8sXHJcbiAgICAgICAgICAgICAgICAgICAgMCA9PSBuID8gKHRoaXMub3RoZXJPbmVMLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRzTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA+IDAgJiYgKHRoaXMub3RoZXJPbmVMLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRzTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IHBhcnNlSW50KHRoaXMub3RoZXJPbmVMLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRzTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZykgLSBlLmxlbmd0aCArIGkpLCB0aGlzLnBJbmZvLnNvdW5kRWZmZWN0Q29udHJvbCAmJiAoMiA9PSB0aGlzLm90aGVyT25lTC5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPyAxID09IHRoaXMudGVtcFBsYXllcnNMaXN0c1tuXS56aGlTaGVuZ0VyICYmIChjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYmFvSmluZ0F1ZGlvWzFdLCBmYWxzZSwgMSksIHRoaXMudGVtcFBsYXllcnNMaXN0c1tuXS56aGlTaGVuZ0VyLS0pIDogMSA9PSB0aGlzLm90aGVyT25lTC5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgJiYgMSA9PSB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbbl0uemhpU2hlbmdZaSAmJiAoY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJhb0ppbmdBdWRpb1swXSwgZmFsc2UsIDEpLCB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbbl0uemhpU2hlbmdZaS0tKSkpIDogMiA9PSBuICYmICh0aGlzLm90aGVyVHdvUi5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPiAwICYmICh0aGlzLm90aGVyVHdvUi5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBwYXJzZUludCh0aGlzLm90aGVyVHdvUi5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkc051bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcpIC0gZS5sZW5ndGggKyBpKSwgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgKDIgPT0gdGhpcy5vdGhlclR3b1IuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID8gMSA9PSB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbbl0uemhpU2hlbmdFciAmJiAoY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJhb0ppbmdBdWRpb1sxXSwgZmFsc2UsIDEpLCB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbbl0uemhpU2hlbmdFci0tKSA6IDEgPT0gdGhpcy5vdGhlclR3b1IuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZHNOdW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nICYmIDEgPT0gdGhpcy50ZW1wUGxheWVyc0xpc3RzW25dLnpoaVNoZW5nWWkgJiYgKGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5iYW9KaW5nQXVkaW9bMF0sIGZhbHNlLCAxKSwgdGhpcy50ZW1wUGxheWVyc0xpc3RzW25dLnpoaVNoZW5nWWktLSkpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBpZiAoZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGUgPSB0aGlzLnhpVG9uZ1NvcnRpbmcoZSk7XHJcbiAgICAgICAgICAgIHZhciBhLCBzID0gW10sXHJcbiAgICAgICAgICAgICAgICBjID0gLjgsXHJcbiAgICAgICAgICAgICAgICByID0gMDtcclxuICAgICAgICAgICAgaWYgKDAgPT0gbikgdmFyIGwgPSB0aGlzLm90aGVyT25lTC5wb3NpdGlvbi54ICsgMTIwO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChlLmxlbmd0aCA8IHRoaXMucGVhaykgdmFyIGwgPSB0aGlzLm90aGVyVHdvUi5wb3NpdGlvbi54IC0gMTc4LjUgLSBlLmxlbmd0aCAqIHRoaXMuc21hbGxEaXN0YW5jZUNhcmQ7XHJcbiAgICAgICAgICAgIGVsc2UgdmFyIGwgPSB0aGlzLm90aGVyVHdvUi5wb3NpdGlvbi54IC0gMTc4LjUgLSB0aGlzLnBlYWsgKiB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkLFxyXG4gICAgICAgICAgICAgICAgaCA9IHRoaXMub3RoZXJUd29SLnBvc2l0aW9uLnggLSAxNzguNSAtIChlLmxlbmd0aCAtIHRoaXMucGVhaykgKiB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBvID0gMDsgbyA8IGUubGVuZ3RoOyBvKyspIGEgPSB0aGlzLmNhcmRzUG9vbC5zaXplKCkgPiAwID8gdGhpcy5jYXJkc1Bvb2wuZ2V0KCkgOiBjYy5pbnN0YW50aWF0ZSh0aGlzLnBiX0NhcmRzKSxcclxuICAgICAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQoYSwgMCksXHJcbiAgICAgICAgICAgICAgICBlLmxlbmd0aCA8IHRoaXMucGVhayA/IChhLnNjYWxlID0gYywgMCA9PSBuID8gYS5zZXRQb3NpdGlvbihjYy52MihsICsgdGhpcy5zbWFsbERpc3RhbmNlQ2FyZCAqIG8sIHRoaXMub3RoZXJPbmVMLnBvc2l0aW9uLnkgKyBhLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0ICogYyAqIC40KSkgOiBhLnNldFBvc2l0aW9uKGNjLnYyKGwgKyB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkICogbywgdGhpcy5vdGhlclR3b1IucG9zaXRpb24ueSArIGEuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQgKiBjICogLjQpKSkgOiAoYS5zY2FsZSA9IGMsIG8gPCB0aGlzLnBlYWsgPyAwID09IG4gPyBhLnNldFBvc2l0aW9uKGNjLnYyKGwgKyB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkICogbywgdGhpcy5vdGhlck9uZUwucG9zaXRpb24ueSArIGEuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQgKiBjICogLjQpKSA6IGEuc2V0UG9zaXRpb24oY2MudjIobCArIHRoaXMuc21hbGxEaXN0YW5jZUNhcmQgKiBvLCB0aGlzLm90aGVyVHdvUi5wb3NpdGlvbi55ICsgYS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCAqIGMgKiAuNCkpIDogKDAgPT0gbiA/IGEuc2V0UG9zaXRpb24oY2MudjIobCArIHRoaXMuc21hbGxEaXN0YW5jZUNhcmQgKiByLCB0aGlzLm90aGVyT25lTC5wb3NpdGlvbi55KSkgOiBhLnNldFBvc2l0aW9uKGNjLnYyKGggKyB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkICogciwgdGhpcy5vdGhlclR3b1IucG9zaXRpb24ueSkpLCByKyspKSxcclxuICAgICAgICAgICAgICAgIGEuZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikuY2FyZHNDcmVhdGUoZVtvXS52YWwsIGVbb10udHlwZSksXHJcbiAgICAgICAgICAgICAgICBzLnB1c2goYSk7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIm90aGVyUGxheWVyT3V0Q2FyZFwiLCBuKSxcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjeWNsaW5nW25dID0gcyxcclxuICAgICAgICAgICAgICAgIHRoaXMub3RoZXJDYXJkQXJyID0gZSxcclxuICAgICAgICAgICAgICAgIGNjLmxvZyh0aGlzLm90aGVyQ2FyZEFyciksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gMCxcclxuICAgICAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1tuXS5vdXRDYXJkLnB1c2gocylcclxuICAgICAgICB9IGVsc2UgdGhpcy5jb3VudCsrLFxyXG4gICAgICAgICAgICB0aGlzLnJlY3ljbGluZ1tuXSA9IG51bGwsXHJcbiAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1tuXS5vdXRDYXJkLnB1c2goW10pXHJcbiAgICB9LFxyXG4gICAgb3RoZXJQbGF5ZXJObyhlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IC0xLFxyXG4gICAgICAgICAgICAgICAgaSA9IDA7IGkgPCB0aGlzLnBsYXllckFyci5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQXJyW2ldID09IGUpIHtcclxuICAgICAgICAgICAgICAgIHQgPSBpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY291bnQrKyxcclxuICAgICAgICAgICAgdGhpcy5yZWN5Y2xpbmdbdF0gPSBudWxsLFxyXG4gICAgICAgICAgICB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbdF0ub3V0Q2FyZC5wdXNoKFtdKVxyXG4gICAgfSxcclxuICAgIGNoZWNrVG9wUGxheWVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50IDwgMiA/ICEhdGhpcy5ydWxlcyh0aGlzLm90aGVyQ2FyZEFycikgOiB0aGlzLmNvdW50ID49IDIgPyAhIXRoaXMucnVsZXMoW10pIDogdm9pZCAwXHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlQ2FyZHMoZSkge1xyXG4gICAgICAgIHRoaXMucmVjeWNsaW5nW2VdID0gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMudGVtcFBsYXllcnNMaXN0c1tlXS5vdXRDYXJkLmxlbmd0aDsgdCsrKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZyh0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbZV0ub3V0Q2FyZCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50ZW1wUGxheWVyc0xpc3RzW2VdLm91dENhcmRbdF0ubGVuZ3RoOyBpKyspIHRoaXMuY2FyZHNQb29sLnB1dCh0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbZV0ub3V0Q2FyZFt0XVtpXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzW2VdLm91dENhcmQgPSBbXVxyXG4gICAgfSxcclxuICAgIHNldHRsZW1lbnQoZSwgY2h1bnRpYW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGNodW50aWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2h1blRpYW5BbmltYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCBlLmxlbmd0aDsgdCsrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGVtcFBsYXllcnNMaXN0cy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIGlmIChlW3RdLnVzZXJJZCA9PSB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbaV0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAwID09IGkgPyAodGhpcy5vdGhlck9uZUwuZ2V0Q2hpbGRCeU5hbWUoXCJiZ19uYW1lXCIpLmdldENoaWxkQnlOYW1lKFwiU2NvcmVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gKGVbdF0uRnJhY3Rpb24gLyB0aGlzLnBJbmZvLmV4Y2hhbmdlUmF0ZSkudG9GaXhlZCgyKSwgdGhpcy5sYW5kbG9hZHNMb2dvW2ldLmFjdGl2ZSAmJiAhdGhpcy5sYW5kbG9hZHNMb2dvWzFdLmFjdGl2ZSA/IHRoaXMuYmlsbE1lc3NhZ2VbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJ4XCIgKyBlW3RdLmJlaV9zaHUgOiB0aGlzLmxhbmRsb2Fkc0xvZ29baV0uYWN0aXZlIHx8IHRoaXMubGFuZGxvYWRzTG9nb1sxXS5hY3RpdmUgPyB0aGlzLmxhbmRsb2Fkc0xvZ29bMV0uYWN0aXZlICYmICh0aGlzLmJpbGxNZXNzYWdlW2ldLmdldENoaWxkQnlOYW1lKFwiYmV0XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwieFwiICsgZVt0XS5iZWlfc2h1KSA6IHRoaXMuYmlsbE1lc3NhZ2VbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gXCJ4XCIgKyBlW3RdLmJlaV9zaHUpIDogMSA9PSBpID8gKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJpbGxcIikuYWN0aXZlID0gdHJ1ZSwgZVt0XS5Cb3R0b20gPiAwID8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQmlsbFwiKS5nZXRDaGlsZEJ5TmFtZShcImppZVNodWFuXCIpLmdldENvbXBvbmVudChcImRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheVwiKS5hcm1hdHVyZSgpLmFuaW1hdGlvbi5wbGF5KFwic2hlbmdsaVwiLCAwKSA6IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJpbGxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJqaWVTaHVhblwiKS5nZXRDb21wb25lbnQoXCJkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXlcIikuYXJtYXR1cmUoKS5hbmltYXRpb24ucGxheShcInNoaWJhaVwiLCAwKSwgdGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgJiYgKGVbdF0uQm90dG9tID4gMCA/IGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zaHVZaW5nWzFdLCBmYWxzZSwgMSkgOiBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc2h1WWluZ1swXSwgZmFsc2UsIDEpKSwgdGhpcy5wYl9Mb3dlci5nZXRDaGlsZEJ5TmFtZShcImdvbGRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbnRlZ3JhbFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSAoZVt0XS5GcmFjdGlvbiAvIHRoaXMucEluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpLCB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCaWxsXCIpLmdldENvbXBvbmVudChcImNjLlNwcml0ZVwiKS5zcHJpdGVGcmFtZSA9IHRoaXMuYmlsbEJnWzFdLCB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJibGFja0ZhY2VcIikuYWN0aXZlID0gdHJ1ZSwgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmxhY2tGYWNlXCIpLmdldENoaWxkQnlOYW1lKFwiYnRuX1NpZ25vdXRcIikuYWN0aXZlID0gdHJ1ZSwgdGhpcy5iaWxsTWVzc2FnZVtpXS5nZXRDaGlsZEJ5TmFtZShcImJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcInhcIiArIGVbdF0uYmVpX3NodSkgOiAyID09IGkgJiYgKHRoaXMub3RoZXJUd29SLmdldENoaWxkQnlOYW1lKFwiYmdfbmFtZVwiKS5nZXRDaGlsZEJ5TmFtZShcIlNjb3JlXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IChlW3RdLkZyYWN0aW9uIC8gdGhpcy5wSW5mby5leGNoYW5nZVJhdGUpLnRvRml4ZWQoMiksIHRoaXMubGFuZGxvYWRzTG9nb1tpXS5hY3RpdmUgJiYgIXRoaXMubGFuZGxvYWRzTG9nb1sxXS5hY3RpdmUgPyB0aGlzLmJpbGxNZXNzYWdlW2ldLmdldENoaWxkQnlOYW1lKFwiYmV0XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwieFwiICsgZVt0XS5iZWlfc2h1IDogdGhpcy5sYW5kbG9hZHNMb2dvW2ldLmFjdGl2ZSB8fCB0aGlzLmxhbmRsb2Fkc0xvZ29bMV0uYWN0aXZlID8gdGhpcy5sYW5kbG9hZHNMb2dvWzFdLmFjdGl2ZSAmJiAodGhpcy5iaWxsTWVzc2FnZVtpXS5nZXRDaGlsZEJ5TmFtZShcImJldFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSBcInhcIiArIGVbdF0uYmVpX3NodSkgOiB0aGlzLmJpbGxNZXNzYWdlW2ldLmdldENoaWxkQnlOYW1lKFwiYmV0XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IFwieFwiICsgZVt0XS5iZWlfc2h1KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSA9PSB0aGlzLnRlbXBQbGF5ZXJzTGlzdHNbaV0uaXNMYW5kbG9yZCA/IHRoaXMuYmlsbE1lc3NhZ2VbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmFjdGl2ZSA9IHRydWUgOiB0aGlzLmJpbGxNZXNzYWdlW2ldLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS5hY3RpdmUgPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWxsTWVzc2FnZVtpXS5nZXRDaGlsZEJ5TmFtZShcIm5pQ2hlbmdcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gdGhpcy50ZW1wUGxheWVyc0xpc3RzW2ldLm5pQ2hlbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlsbE1lc3NhZ2VbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21TY29yZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcgPSB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiZGlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21TY29yZVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKS5zdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlsbE1lc3NhZ2VbaV0uZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IChlW3RdLkJvdHRvbSAvIHRoaXMucEluZm8uZXhjaGFuZ2VSYXRlKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiBlKSB7XHJcbiAgICAgICAgICAgIGlmIChlW2tdLnVzZXJJZCA9PSB0aGlzLnBJbmZvLnBsYXllcklkICYmIHRoaXMubmV0V29yay5wcm90ICE9IDEzNzA2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBiX0xvd2VyLmdldENoaWxkQnlOYW1lKFwiZ29sZFwiKS5nZXRDaGlsZEJ5TmFtZShcImludGVncmFsXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpLnN0cmluZyA9IChlW2tdLnNjb3JlICogMC4wMSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnRuX2FnYWluLmFjdGl2ZSA9IHRoaXMubmV0V29yay5wcm90ICE9IDEzNzA2O1xyXG4gICAgICAgIHRoaXMuZXhpdE1hdGNoQnRuLmFjdGl2ZSA9IHRoaXMubmV0V29yay5wcm90ID09IDEzNzA2O1xyXG4gICAgICAgIC8vIHRoaXMuYnRuX21hdGNoX2FnYWluLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZ2FtZUZpbmlzaCA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6byg5qCH5L6m5ZCs5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIGFkZEV2ZW50TGlzdGVuZXIoKSB7XHJcbiAgICAgICAgLy/lvIDlp4tcclxuICAgICAgICB0aGlzLlRvdWNoU3RhcnQgPSB0aGlzLm5vZGUub24oXCJ0b3VjaHN0YXJ0XCIsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydExvY2F0ID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdENhcmRzKHRoaXMuc3RhcnRMb2NhdCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQ2FyZHNbaV0ucG9zaXRpb24ueSAhPSB0aGlzLm1vdmVkWSAmJiBpID09IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHVvUGFpQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBsYXllckNhcmRzW2ldLnBvc2l0aW9uLnkgPT0gdGhpcy5tb3ZlZFkpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIC8v56e75YqoXHJcbiAgICAgICAgdGhpcy5Ub3VjaE1vdmUgPSB0aGlzLm5vZGUub24oXCJ0b3VjaG1vdmVcIiwgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICB2YXIgYXIgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2FyZHMoYXIpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIC8v5YGc5q2iXHJcbiAgICAgICAgdGhpcy5Ub3VjaEVuZCA9IHRoaXMubm9kZS5vbihcInRvdWNoZW5kXCIsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllckNhcmRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQ2FyZHNbaV0uY29sb3IgPT0gXCJyZ2JhKDE0NCwgMTQ0LCAxNDQsIDI1NSlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbaV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikubW92ZUNhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckNhcmRzW2ldLmdldENvbXBvbmVudChcIkNhcmRzXCIpLmNoYW5nZUJhaSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnR1b1BhaUNvdW50ID0gMDtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAvL+WPlua2iFxyXG4gICAgICAgIHRoaXMuVG91Y2hDYW5jZWwgPSB0aGlzLm5vZGUub24oXCJ0b3VjaGNhbmNlbFwiLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckNhcmRzW2ldLmNvbG9yID09IFwicmdiYSgxNDQsIDE0NCwgMTQ0LCAyNTUpXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckNhcmRzW2ldLmdldENvbXBvbmVudChcIkNhcmRzXCIpLm1vdmVDYXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1tpXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS5jaGFuZ2VCYWkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50dW9QYWlDb3VudCA9IDA7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk6byg5qCH5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHR1cm5PZmZUb3VjaCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKFwidG91Y2hzdGFydFwiLCB0aGlzLlRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJ0b3VjaG1vdmVcIiwgdGhpcy5Ub3VjaE1vdmUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJ0b3VjaGVuZFwiLCB0aGlzLlRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5Ub3VjaENhbmNlbCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBmaW5pc2hHYW1lKCkge1xyXG4gICAgICAgIHRoaXMudHVybk9mZlRvdWNoKCk7XHJcbiAgICAgICAgZm9yICh2YXIgZSA9IDA7IGUgPCB0aGlzLnJlY3ljbGluZy5sZW5ndGg7IGUrKylcclxuICAgICAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5yZWN5Y2xpbmdbZV0pXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMucmVjeWNsaW5nW2VdLmxlbmd0aDsgdCsrKSB0aGlzLmNhcmRzUG9vbC5wdXQodGhpcy5yZWN5Y2xpbmdbZV1bdF0pO1xyXG4gICAgICAgIHRoaXMucmVjeWNsaW5nID0gW1xyXG4gICAgICAgICAgICBbbnVsbF0sXHJcbiAgICAgICAgICAgIFtudWxsXSxcclxuICAgICAgICAgICAgW251bGxdXHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3IgKHZhciBlID0gMDsgZSA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyBlKyspIHRoaXMuY2FyZHNQb29sLnB1dCh0aGlzLnBsYXllckNhcmRzW2VdKTtcclxuICAgICAgICB0aGlzLnBsYXllckNhcmRzID0gW10sXHJcbiAgICAgICAgICAgIHRoaXMubGFuZGxvYWRzQ2FyZHMuYWN0aXZlID0gZmFsc2UsXHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsVGltZXIoKSxcclxuICAgICAgICAgICAgY2MubG9nKFwi57uT5p2fYWxsXCIpO1xyXG4gICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdGhpcy50ZW1wUGxheWVyc0xpc3RzLmxlbmd0aDsgdCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy50ZW1wUGxheWVyc0xpc3RzW3RdLnN0YXRlLmxlbmd0aDsgZSsrKSBudWxsICE9IHRoaXMudGVtcFBsYXllcnNMaXN0c1t0XS5zdGF0ZVtlXSAmJiAodGhpcy50ZW1wUGxheWVyc0xpc3RzW3RdLnN0YXRlW2VdLmFjdGl2ZSA9IGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzW3RdLnN0YXRlID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgZSA9IDA7IGUgPCB0aGlzLmxhbmRsb2Fkc0xvZ28ubGVuZ3RoOyBlKyspIHRoaXMubGFuZGxvYWRzTG9nb1tlXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZpcnN0T3V0Q2FyZCA9IDEsXHJcbiAgICAgICAgICAgIG51bGwgIT0gdGhpcy5idG5QbGF5ZXJTdGF0ZSAmJiAodGhpcy5idG5QbGF5ZXJTdGF0ZS5hY3RpdmUgPSBmYWxzZSksXHJcbiAgICAgICAgICAgIHRoaXMucGJfTG93ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJiZWlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJiZXRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIikuc3RyaW5nID0gMFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOWFqOmDqOeKtuaAgVxyXG4gICAgICovXHJcbiAgICByZW1vdmVBbGxTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmNhbmNlbFRpbWVyKCksXHJcbiAgICAgICAgICAgIGNjLmxvZyhcIuenu+mZpFwiKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGVtcFBsYXllcnNMaXN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMudGVtcFBsYXllcnNMaXN0c1tpXS5zdGF0ZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGVtcFBsYXllcnNMaXN0c1tpXS5zdGF0ZVtqXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wUGxheWVyc0xpc3RzW2ldLnN0YXRlW2pdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1tpXS5zdGF0ZSA9IFtdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm90aGVyT25lTC5nZXRDaGlsZEJ5TmFtZShcInR1b0d1YW5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vdGhlclR3b1IuZ2V0Q2hpbGRCeU5hbWUoXCJ0dW9HdWFuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2FyZHMoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJMYW5kbG9yZHNCdXR0b25DbGlja1wiKS5jYW5jZWxUdW9HYXVuKClcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43mlrDlvIDlp4vmuLjmiI9cclxuICAgICAqL1xyXG4gICAgcmVzZXRHYW1lKCkge1xyXG4gICAgICAgIHRoaXMuZmluaXNoR2FtZSgpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigpO1xyXG4gICAgfSxcclxuICAgIG1hdGNoaW5nVHlwZSgpIHtcclxuICAgICAgICBjYy5sb2codGhpcy5vdGhlckNhcmRBcnIsIHRoaXMuY291bnQpO1xyXG4gICAgICAgIHZhciBlID0gLTE7XHJcbiAgICAgICAgdGhpcy5jb3VudCA8IDIgPyAoZSA9IHRoaXMuY2FyZFR5cGUodGhpcy5vdGhlckNhcmRBcnIpLCB0aGlzLmNoZWNrVHlwZU51bShlKSkgOiB0aGlzLmNvdW50ID49IDIgJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaCh0aGlzLnBsYXllckNhcmRzW3RoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMV0pXHJcbiAgICB9LFxyXG4gICAgY2hlY2tUeXBlTnVtOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHRoaXMuc2FtZURpZmZlcmVudFZhbCgpO1xyXG4gICAgICAgIHZhciB0LCBpID0gW10sXHJcbiAgICAgICAgICAgIG4gPSBbXSxcclxuICAgICAgICAgICAgbyA9IC0xLFxyXG4gICAgICAgICAgICBhID0gLTE7XHJcbiAgICAgICAgc3dpdGNoIChlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wdXJlVHlwZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLnB1cmVBcnIubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLnB1cmVBcnJbc10ubGVuZ3RoOyBjKyspIG8gPSAxID09IHRoaXMucHVyZUFycltzXVtjXVswXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgPyAxMy4xIDogMiA9PSB0aGlzLnB1cmVBcnJbc11bY11bMF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsID8gMTMuMiA6IHRoaXMucHVyZUFycltzXVtjXVswXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGEgPSAxID09IGUubWF4ID8gMTMuMSA6IDIgPT0gZS5tYXggPyAxMy4yIDogZS5tYXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8gPiBhICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2godGhpcy5wdXJlQXJyW3NdW2NdWzBdKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNCA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmICh0ID0gZS5sZW5ndGggLyAyLCAxID09IHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1cmVUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLnB1cmVBcnJbMV0ubGVuZ3RoOyBzKyspIGkgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS5wdXNoKHRoaXMucHVyZUFyclsxXVtzXVswXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkucHVzaCh0aGlzLnB1cmVBcnJbMV1bc11bMV0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDYXJkcyhpLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMucHVyZUFyclsyXS5sZW5ndGg7IHMrKykgaSA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLnB1c2godGhpcy5wdXJlQXJyWzJdW3NdWzBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS5wdXNoKHRoaXMucHVyZUFyclsyXVtzXVsxXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NhcmRzKGksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5wdXJlQXJyWzNdLmxlbmd0aDsgcysrKSBpID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkucHVzaCh0aGlzLnB1cmVBcnJbM11bc11bMF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLnB1c2godGhpcy5wdXJlQXJyWzNdW3NdWzFdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2FyZHMoaSwgZSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzFdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0ICYmICEocyArIHIgPj0gdGhpcy5jYXJkc0dyb3VwWzFdLmxlbmd0aCk7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzFdW3MgKyByXS5sZW5ndGg7IGMrKykgaS5wdXNoKHRoaXMuY2FyZHNHcm91cFsxXVtzICsgcl1bY10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLmxlbmd0aCA9PSBlLmxlbmd0aCAmJiB0aGlzLmRyYXdDYXJkcyhpLCBlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNCA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzBdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgZS5sZW5ndGg7IGMrKykgcyArIGMgPCB0aGlzLmNhcmRzR3JvdXBbMF0ubGVuZ3RoICYmIGkucHVzaCh0aGlzLmNhcmRzR3JvdXBbMF1bcyArIGNdWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBpLmxlbmd0aCA9PSBlLmxlbmd0aCAmJiB0aGlzLmRyYXdDYXJkcyhpLCBlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyBjKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bY10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0ID09IG4ubGVuZ3RoICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2gobilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbNF1bc10ubGVuZ3RoOyBjKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bY10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMiA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdCA9IGUubGVuZ3RoIC8gMztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocyArIHIgPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFsyXVtzICsgcl0ubGVuZ3RoOyBjKyspIGkucHVzaCh0aGlzLmNhcmRzR3JvdXBbMl1bcyArIHJdW2NdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkubGVuZ3RoID09IGUubGVuZ3RoICYmIHRoaXMuZHJhd0NhcmRzKGksIGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNCA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGwgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBlOiBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IGMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bY10pLCA0ID09IGkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1cmVUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBoID0gMDsgaCA8IHRoaXMucHVyZUFyclswXS5sZW5ndGg7IGgrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaS5wdXNoKHRoaXMucHVyZUFyclswXVtoXVswXSksIGkubGVuZ3RoID09IGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NhcmRzKGksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLmxlbmd0aCA8IGUubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSB0aGlzLnBsYXllckNhcmRzLmxlbmd0aCAtIDE7IHIgPiAtMTsgci0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBkID0gMDsgZCA8IGkubGVuZ3RoOyBkKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaVtkXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgIT0gdGhpcy5wbGF5ZXJDYXJkc1tyXS52YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKDE0ID09IHRoaXMucGxheWVyQ2FyZHNbcl0udmFsIHx8IDE1ID09IHRoaXMucGxheWVyQ2FyZHNbcl0udmFsKSAmJiBsIDwgMSkgbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCgxNCA9PSB0aGlzLnBsYXllckNhcmRzW3JdLnZhbCB8fCAxNSA9PSB0aGlzLnBsYXllckNhcmRzW3JdLnZhbCkgJiYgMSA9PSBsKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PSBpLmxlbmd0aCAtIDEgJiYgKGkucHVzaCh0aGlzLnBsYXllckNhcmRzW3JdKSwgaS5sZW5ndGggPT0gZS5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NhcmRzKGksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IGMrKykgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtjXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aDsgcysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFs0XVtzXS5sZW5ndGg7IGMrKykgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFs0XVtzXVtjXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyID09IG4ubGVuZ3RoICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2gobilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBlOiBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IGMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bY10pLCA0ID09IGkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1cmVUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBoID0gMDsgaCA8IHRoaXMucHVyZUFyclsxXS5sZW5ndGg7IGgrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaS5wdXNoKHRoaXMucHVyZUFyclsxXVtoXVswXSksIGkucHVzaCh0aGlzLnB1cmVBcnJbMV1baF1bMV0pLCBpLmxlbmd0aCA9PSBlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDYXJkcyhpLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLmxlbmd0aCA8IGUubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGggPSAwOyBoIDwgdGhpcy5wdXJlQXJyWzJdLmxlbmd0aDsgaCsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaS5wdXNoKHRoaXMucHVyZUFyclsyXVtoXVswXSksIGkucHVzaCh0aGlzLnB1cmVBcnJbMl1baF1bMV0pLCBpLmxlbmd0aCA9PSBlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2FyZHMoaSwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLmxlbmd0aCA8IGUubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGggPSAwOyBoIDwgdGhpcy5wdXJlQXJyWzNdLmxlbmd0aDsgaCsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB1ID0gMDsgdSA8IGkubGVuZ3RoICYmIGlbdV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsICE9IHRoaXMucHVyZUFyclszXVtoXVswXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWw7IHUrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1ID09IGkubGVuZ3RoIC0gMSAmJiAoaS5wdXNoKHRoaXMucHVyZUFyclszXVtoXVswXSksIGkucHVzaCh0aGlzLnB1cmVBcnJbM11baF1bMV0pLCBpLmxlbmd0aCA9PSBlLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDYXJkcyhpLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNCA9PSBuLmxlbmd0aCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKG4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIHZhciBsID0gMDtcclxuICAgICAgICAgICAgICAgIHQgPSBlLmxlbmd0aCAvIDQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHQ7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgKyByIDwgdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzJdW3MgKyByXS5sZW5ndGg7IGMrKykgaS5wdXNoKHRoaXMuY2FyZHNHcm91cFsyXVtzICsgcl1bY10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHVyZVR5cGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMucHVyZUFyclswXS5sZW5ndGg7IGMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkucHVzaCh0aGlzLnB1cmVBcnJbMF1bY11bMF0pLCBpLmxlbmd0aCA9PSBlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2FyZHMoaSwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkubGVuZ3RoIDwgZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSBpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZTogZm9yICh2YXIgciA9IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMTsgciA+IC0xOyByLS0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBkID0gMDsgZCA8IG0gJiYgaVtkXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgIT0gdGhpcy5wbGF5ZXJDYXJkc1tyXS52YWw7IGQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoMTQgPT0gdGhpcy5wbGF5ZXJDYXJkc1tyXS52YWwgfHwgMTUgPT0gdGhpcy5wbGF5ZXJDYXJkc1tyXS52YWwpICYmIGwgPCAxKSBsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKDE0ID09IHRoaXMucGxheWVyQ2FyZHNbcl0udmFsIHx8IDE1ID09IHRoaXMucGxheWVyQ2FyZHNbcl0udmFsKSAmJiAxID09IGwpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkID09IG0gLSAxICYmIChjYy5sb2codGhpcy5wbGF5ZXJDYXJkc1tyXS52YWwpLCBpLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tyXSksIGkubGVuZ3RoID09IGUubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDYXJkcyhpLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IGMrKykgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtjXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aDsgcysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFs0XVtzXS5sZW5ndGg7IGMrKykgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFs0XVtzXVtjXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyID09IG4ubGVuZ3RoICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2gobilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICB0ID0gZS5sZW5ndGggLyA1O1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0OyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzICsgciA8IHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFsyXVtzICsgcl0ubGVuZ3RoOyBjKyspIGkucHVzaCh0aGlzLmNhcmRzR3JvdXBbMl1bcyArIHJdW2NdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1cmVUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaCA9IDA7IGggPCB0aGlzLnB1cmVBcnJbMV0ubGVuZ3RoOyBoKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLnB1c2godGhpcy5wdXJlQXJyWzFdW2hdWzBdKSwgaS5wdXNoKHRoaXMucHVyZUFyclsxXVtoXVsxXSksIGkubGVuZ3RoID09IGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDYXJkcyhpLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaS5sZW5ndGggPCBlLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaCA9IDA7IGggPCB0aGlzLnB1cmVBcnJbMl0ubGVuZ3RoOyBoKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB1ID0gMDsgdSA8IGkubGVuZ3RoICYmIGlbdV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsICE9IHRoaXMucHVyZUFyclsyXVtoXVswXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWw7IHUrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodSA9PSBpLmxlbmd0aCAtIDEgJiYgKGkucHVzaCh0aGlzLnB1cmVBcnJbMl1baF1bMF0pLCBpLnB1c2godGhpcy5wdXJlQXJyWzJdW2hdWzFdKSwgaS5sZW5ndGggPT0gZS5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NhcmRzKGksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaS5sZW5ndGggPCBlLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaCA9IDA7IGggPCB0aGlzLnB1cmVBcnJbM10ubGVuZ3RoOyBoKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaS5wdXNoKHRoaXMucHVyZUFyclszXVtoXVswXSksIGkucHVzaCh0aGlzLnB1cmVBcnJbM11baF1bMV0pLCBpLmxlbmd0aCA9PSBlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NhcmRzKGksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IGMrKykgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtjXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aDsgcysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFs0XVtzXS5sZW5ndGg7IGMrKykgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFs0XVtzXVtjXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyID09IG4ubGVuZ3RoICYmIHRoaXMudGlwc0NhcmRzQXJyLnB1c2gobilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IGMrKykgaS5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtjXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkubGVuZ3RoID09IGUubGVuZ3RoICYmIHRoaXMuZHJhd0NhcmRzKGksIGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgYysrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW2NdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgPT0gbi5sZW5ndGggJiYgdGhpcy50aXBzQ2FyZHNBcnIucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwc0NhcmRzQXJyID0gW11cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRpcHNDbGljaygpIHtcclxuICAgICAgICBpZiAoISF0aGlzLmFsbG93VGlwcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxsb3dUaXBzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuTGFuZGxvcmRzU29ja2V0LmVtaXQoJ1RpcHNDYXJkcycpO1xyXG4gICAgICAgIC8vIDAgPT0gdGhpcy50aXBzQ291bnQgJiYgdGhpcy5tYXRjaGluZ1R5cGUoKSxcclxuICAgICAgICAvLyAgICAgdGhpcy50aXBzQ291bnQgPj0gdGhpcy50aXBzQ2FyZHNBcnIubGVuZ3RoICYmICh0aGlzLnRpcHNDb3VudCA9IDApO1xyXG4gICAgICAgIC8vIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IGUrKykgdGhpcy5wbGF5ZXJDYXJkc1tlXS5wb3NpdGlvbi55ID09IHRoaXMubW92ZWRZICYmIHRoaXMucGxheWVyQ2FyZHNbZV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikubW92ZUNhcmQoKTtcclxuICAgICAgICAvLyBpZiAodGhpcy50aXBzQ2FyZHNBcnIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy50aXBzQ2FyZHNBcnJbdGhpcy50aXBzQ291bnRdLmxlbmd0aCA+IDApXHJcbiAgICAgICAgLy8gICAgICAgICBmb3IgKHZhciBlID0gMDsgZSA8IHRoaXMudGlwc0NhcmRzQXJyW3RoaXMudGlwc0NvdW50XS5sZW5ndGg7IGUrKykgdGhpcy50aXBzQ2FyZHNBcnJbdGhpcy50aXBzQ291bnRdW2VdLmdldENvbXBvbmVudChcIkNhcmRzXCIpLm1vdmVDYXJkKCksXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgY2MubG9nKHRoaXMudGlwc0NhcmRzQXJyW3RoaXMudGlwc0NvdW50XVtlXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwpO1xyXG4gICAgICAgIC8vICAgICBlbHNlIHRoaXMudGlwc0NhcmRzQXJyW3RoaXMudGlwc0NvdW50XS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS5tb3ZlQ2FyZCgpLFxyXG4gICAgICAgIC8vICAgICAgICAgY2MubG9nKHRoaXMudGlwc0NhcmRzQXJyW3RoaXMudGlwc0NvdW50XS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnRpcHNDb3VudCsrXHJcbiAgICAgICAgLy8gfSBlbHNlIHRoaXMudHVvR3VhbiA9PSBmYWxzZSA/ICh0aGlzLmFsbFRpcHNbMV0uZ2V0Q2hpbGRCeU5hbWUoXCJQcm9tcHQyXCIpLmFjdGl2ZSA9IHRydWUsIHRoaXMuYWxsVGlwc1sxXS5nZXRDaGlsZEJ5TmFtZShcIlByb21wdDJcIikuZ2V0Q29tcG9uZW50KFwiY2MuQW5pbWF0aW9uXCIpLnBsYXkoKSwgdGhpcy5ub2RlLmdldENvbXBvbmVudChcIkxhbmRsb3Jkc0J1dHRvbkNsaWNrXCIpLm5vT3V0KCkpIDogdGhpcy5ub2RlLmdldENvbXBvbmVudChcIkxhbmRsb3Jkc0J1dHRvbkNsaWNrXCIpLm5vT3V0KClcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHRpcHNDbGlja0NhbGxCYWNrKHJlcykge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYWxsb3dUaXBzID0gZmFsc2U7XHJcbiAgICAgICAgfSwxKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMucGxheWVyQ2FyZHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQ2FyZHNbaV0ueSA9PSB0aGlzLm1vdmVkWSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkc1tpXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS5tb3ZlQ2FyZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHJlcy5jYXJkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIHRoaXMucGxheWVyQ2FyZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJDYXJkc1tqXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgPT0gcmVzLmNhcmRbaV0udmFsICYmIHRoaXMucGxheWVyQ2FyZHNbal0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudHlwZSA9PSByZXMuY2FyZFtpXS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZHNbal0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikubW92ZUNhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV0V29yay5MYW5kbG9yZHNTb2NrZXQuZW1pdChcInNlbmRDYXJkc0FyclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYXk6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5wSW5mby5wbGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZUlkOiB0aGlzLm5ldFdvcmsudGFibGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBzZWF0SWQ6IHRoaXMubmV0V29yay5zZWF0SWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG1wVHVvZ3Vhbikge1xyXG4gICAgICAgICAgICB0aGlzLnRtcFR1b2d1YW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dENhcmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgeGlUb25nU29ydGluZzogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgdCA9IFtdO1xyXG4gICAgICAgIGUuc29ydChmdW5jdGlvbiAoZSwgdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS52YWwgPT0gdC52YWwgPyB0LnR5cGUgLSBlLnR5cGUgOiB0LnZhbCAtIGUudmFsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBuID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIG8gPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgYSA9IG51bGw7IGkgPCBlLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBpZiAoZVtpXS52YWwgPiAxMykgbiA9IGk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKDIgPT0gZVtpXS52YWwgfHwgMSA9PSBlW2ldLnZhbCkge1xyXG4gICAgICAgICAgICBvID0gaTtcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG51bGwgPT0gbiAmJiBudWxsICE9IG8pIHtcclxuICAgICAgICAgICAgYSA9IGUuc3BsaWNlKGksIGUubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgYS5sZW5ndGg7IHMrKykgZS5zcGxpY2UocywgMCwgYVtzXSlcclxuICAgICAgICB9IGVsc2UgaWYgKG51bGwgIT0gbiAmJiBudWxsICE9IG8pIHtcclxuICAgICAgICAgICAgYSA9IGUuc3BsaWNlKGksIGUubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgYS5sZW5ndGg7IHMrKykgZS5zcGxpY2UobiArIHMgKyAxLCAwLCBhW3NdKVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gZS5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkgdC5wdXNoKGVbaV0pO1xyXG4gICAgICAgIHJldHVybiBlXHJcbiAgICB9LFxyXG4gICAgeGlUb25nT3V0Q2FyZDogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB0aGlzLmNhbmNlbFRpbWVyKCksXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJkID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCBlLmxlbmd0aDsgdCsrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICBpZiAoZVt0XS52YWwgPT0gdGhpcy5wbGF5ZXJDYXJkc1tpXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgJiYgZVt0XS50eXBlID09IHRoaXMucGxheWVyQ2FyZHNbaV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJkLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyZCA9IHRoaXMuYWxsU29ydGluZyh0aGlzLnNlbGVjdGVkQ2FyZCksXHJcbiAgICAgICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1sxXS5vdXRDYXJkLnB1c2godGhpcy5zZWxlY3RlZENhcmQpLFxyXG4gICAgICAgICAgICB0aGlzLmlkZW50aWZ5Q2FyZHMoKVxyXG4gICAgfSxcclxuICAgIHRlU2h1Q2h1UGFpOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGZvciAodmFyIHQsIGkgPSBbXSwgbiA9IDA7IG4gPCBlLmxlbmd0aDsgbisrKSB0ID0gdGhpcy5jYXJkc1Bvb2wuc2l6ZSgpID4gMCA/IHRoaXMuY2FyZHNQb29sLmdldCgpIDogY2MuaW5zdGFudGlhdGUodGhpcy5wYl9DYXJkcyksXHJcbiAgICAgICAgICAgIHRoaXMucGJfQ2FyZE5vZGUuYWRkQ2hpbGQodCksXHJcbiAgICAgICAgICAgIHQuZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikuY2FyZHNDcmVhdGUoZVtuXS52YWwsIGVbbl0udHlwZSksXHJcbiAgICAgICAgICAgIGkucHVzaCh0KTtcclxuICAgICAgICBpID0gdGhpcy5hbGxTb3J0aW5nKGkpO1xyXG4gICAgICAgIHZhciBvID0gbnVsbCxcclxuICAgICAgICAgICAgYSA9IG51bGw7XHJcbiAgICAgICAgaWYgKGkubGVuZ3RoICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgIGEgPSBpLmxlbmd0aCAvIDI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgaS5sZW5ndGg7IG4rKykgaVtuXS5zY2FsZSA9IC44LFxyXG4gICAgICAgICAgICAgICAgbyA9IC1hICogdGhpcy5zbWFsbERpc3RhbmNlQ2FyZCArIG4gKiB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkIC0gaVtuXS5nZXRDb250ZW50U2l6ZSgpLndpZHRoICogaVtuXS5zY2FsZSAvIDIgKyB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkIC8gMixcclxuICAgICAgICAgICAgICAgIGlbbl0uc2V0UG9zaXRpb24oY2MudjIobywgdGhpcy5maW5pc2hZKSksXHJcbiAgICAgICAgICAgICAgICBpW25dLnpJbmRleCA9IG47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYSA9IChpLmxlbmd0aCAtIDEpIC8gMjtcclxuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBpLmxlbmd0aDsgbisrKSBpW25dLnNjYWxlID0gLjgsXHJcbiAgICAgICAgICAgICAgICBvID0gLWEgKiB0aGlzLnNtYWxsRGlzdGFuY2VDYXJkICsgbiAqIHRoaXMuc21hbGxEaXN0YW5jZUNhcmQgLSBpW25dLmdldENvbnRlbnRTaXplKCkud2lkdGggKiBpW25dLnNjYWxlIC8gMixcclxuICAgICAgICAgICAgICAgIGlbbl0uc2V0UG9zaXRpb24oY2MudjIobywgdGhpcy5maW5pc2hZKSksXHJcbiAgICAgICAgICAgICAgICBpW25dLnpJbmRleCA9IG47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGVtcFBsYXllcnNMaXN0c1sxXS5vdXRDYXJkLnB1c2goaSksXHJcbiAgICAgICAgICAgIHRoaXMucmVjeWNsaW5nWzFdID0gaVxyXG4gICAgfSxcclxuICAgIGFsbFNvcnRpbmc6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIHQgPSBbXTtcclxuICAgICAgICBlLnNvcnQoZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUuZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsID09IHQuZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsID8gdC5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS50eXBlIC0gZS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS50eXBlIDogdC5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgLSBlLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgbiA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBvID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIGEgPSBudWxsOyBpIDwgZS5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgaWYgKGVbaV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsID4gMTMpIG4gPSBpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICgyID09IGVbaV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsIHx8IDEgPT0gZVtpXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwpIHtcclxuICAgICAgICAgICAgbyA9IGk7XHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChudWxsID09IG4gJiYgbnVsbCAhPSBvKSB7XHJcbiAgICAgICAgICAgIGEgPSBlLnNwbGljZShpLCBlLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IGEubGVuZ3RoOyBzKyspIGUuc3BsaWNlKHMsIDAsIGFbc10pXHJcbiAgICAgICAgfSBlbHNlIGlmIChudWxsICE9IG4gJiYgbnVsbCAhPSBvKSB7XHJcbiAgICAgICAgICAgIGEgPSBlLnNwbGljZShpLCBlLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IGEubGVuZ3RoOyBzKyspIGUuc3BsaWNlKG4gKyBzICsgMSwgMCwgYVtzXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGUubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHQucHVzaChlW2ldKTtcclxuICAgICAgICByZXR1cm4gZVxyXG4gICAgfSxcclxuICAgIGRyYXdDYXJkczogZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gW10sIG4gPSBlLmxlbmd0aCAtIDE7IG4gPiAtMTsgbi0tKSBpLnB1c2goe1xyXG4gICAgICAgICAgICB2YWw6IGVbbl0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIG87XHJcbiAgICAgICAgMSA9PSB0LnR5cGUgPyBvID0gdGhpcy5jaGVja0R1aVppKGkpIDogMiA9PSB0LnR5cGUgPyBvID0gdGhpcy5jaGVja1NodW5aaShpKSA6IDMgPT0gdC50eXBlID8gbyA9IHRoaXMuY2hlY2tTYW5PclNodW4oaSkgOiA0ID09IHQudHlwZSA/IG8gPSB0aGlzLmNoZWNrU2lUYWtlVHdvKGkpIDogNSA9PSB0LnR5cGUgPyBvID0gdGhpcy5jaGVja1NpVGFrZVR3b1NodWFuZyhpKSA6IDYgPT0gdC50eXBlID8gbyA9IHRoaXMuY2hlY2tTYW5PclBsYW5lKGkpIDogNyA9PSB0LnR5cGUgPyBvID0gdGhpcy5jaGVja1NhblNodWFuZ09yUGxhbmUoaSkgOiA4ID09IHQudHlwZSAmJiAobyA9IHRoaXMuY2hlY2tTaShpKSksXHJcbiAgICAgICAgICAgIG8ubnVtID4gMCAmJiAoMSA9PSBvLm1heCA/IG8ubWF4ICs9IDEyLjEgOiAyID09IG8ubWF4ICYmIChvLm1heCArPSAxMS4yKSwgMSA9PSB0Lm1heCA/IHQubWF4ICs9IDEyLjEgOiAyID09IHQubWF4ICYmICh0Lm1heCArPSAxMS4yKSwgby5tYXggPiB0Lm1heCAmJiB0aGlzLnRpcHNDYXJkc0Fyci5wdXNoKGUpKVxyXG4gICAgfSxcclxuICAgIHNhbWVEaWZmZXJlbnRWYWwoKSB7XHJcbiAgICAgICAgdGhpcy5jYXJkc0dyb3VwID0gW1xyXG4gICAgICAgICAgICBbXSxcclxuICAgICAgICAgICAgW10sXHJcbiAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICBbXSxcclxuICAgICAgICAgICAgW11cclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy5DYXJkc051bS5sZW5ndGg7IGUrKylcclxuICAgICAgICAgICAgZm9yICh2YXIgdCA9IFtdLCBpID0gW10sIG4gPSBbXSwgbyA9IFtdLCBhID0gW10sIHMgPSAwLCBjID0gdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGggLSAxOyBjID4gLTE7IGMtLSkgdGhpcy5DYXJkc051bVtlXSA9PSB0aGlzLnBsYXllckNhcmRzW2NdLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCAmJiAoMTQgPT0gdGhpcy5DYXJkc051bVtlXSB8fCAxNSA9PSB0aGlzLkNhcmRzTnVtW2VdID8gcyA9IDUgOiBzKyssIDEgPT0gcyA/ICh0LnB1c2godGhpcy5wbGF5ZXJDYXJkc1tjXSksIGkucHVzaCh0aGlzLnBsYXllckNhcmRzW2NdKSwgbi5wdXNoKHRoaXMucGxheWVyQ2FyZHNbY10pLCBvLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tjXSksIHRoaXMuY2FyZHNHcm91cFswXS5wdXNoKHQpKSA6IDIgPT0gcyA/IChpLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tjXSksIG4ucHVzaCh0aGlzLnBsYXllckNhcmRzW2NdKSwgby5wdXNoKHRoaXMucGxheWVyQ2FyZHNbY10pLCB0aGlzLmNhcmRzR3JvdXBbMV0ucHVzaChpKSkgOiAzID09IHMgPyAobi5wdXNoKHRoaXMucGxheWVyQ2FyZHNbY10pLCBvLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tjXSksIHRoaXMuY2FyZHNHcm91cFsyXS5wdXNoKG4pKSA6IDQgPT0gcyA/IChvLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tjXSksIHRoaXMuY2FyZHNHcm91cFszXS5wdXNoKG8pKSA6IDUgPT0gcyAmJiAoYS5wdXNoKHRoaXMucGxheWVyQ2FyZHNbY10pLCB0aGlzLmNhcmRzR3JvdXBbNF0ucHVzaChhKSkpXHJcbiAgICB9LFxyXG4gICAgcHVyZVR5cGUoKSB7XHJcbiAgICAgICAgdGhpcy5wdXJlQXJyID0gW1xyXG4gICAgICAgICAgICBbXSxcclxuICAgICAgICAgICAgW10sXHJcbiAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICBbXSxcclxuICAgICAgICAgICAgW11cclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdGhpcy5DYXJkc051bS5sZW5ndGg7IGUrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB0ID0gW10sIGkgPSAwLCBuID0gdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGggLSAxOyBuID4gLTE7IG4tLSkgdGhpcy5DYXJkc051bVtlXSA9PSB0aGlzLnBsYXllckNhcmRzW25dLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCAmJiAoMTQgPT0gdGhpcy5DYXJkc051bVtlXSB8fCAxNSA9PSB0aGlzLkNhcmRzTnVtW2VdID8gKHQucHVzaCh0aGlzLnBsYXllckNhcmRzW25dKSwgaSArPSA1KSA6ICh0LnB1c2godGhpcy5wbGF5ZXJDYXJkc1tuXSksIGkrKykpO1xyXG4gICAgICAgICAgICAxID09IGkgfHwgNSA9PSBpID8gdGhpcy5wdXJlQXJyWzBdLnB1c2godCkgOiAyID09IGkgPyB0aGlzLnB1cmVBcnJbMV0ucHVzaCh0KSA6IDMgPT0gaSA/IHRoaXMucHVyZUFyclsyXS5wdXNoKHQpIDogNCA9PSBpICYmIHRoaXMucHVyZUFyclszXS5wdXNoKHQpLFxyXG4gICAgICAgICAgICAgICAgNSA9PSBpICYmIHRoaXMucHVyZUFycls0XS5wdXNoKHQpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHR1b1BhaSgpIHtcclxuICAgICAgICB2YXIgZSA9IC0xLFxyXG4gICAgICAgICAgICB0ID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuY291bnQgPCAyKSB7XHJcbiAgICAgICAgICAgIGUgPSB0aGlzLmNhcmRUeXBlKHRoaXMub3RoZXJDYXJkQXJyKTtcclxuICAgICAgICAgICAgdmFyIGkgPSB0aGlzLnh1YW5QYWkoZSk7XHJcbiAgICAgICAgICAgIHRoaXMueWlEb25nKGkpXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvdW50ID49IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5zYW1lRGlmZmVyZW50VmFsKCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdGhpcy5wbGF5ZXJDYXJkcy5sZW5ndGg7IG4rKykgdGhpcy5wbGF5ZXJDYXJkc1tuXS5wb3NpdGlvbi55ID09IHRoaXMubW92ZWRZICYmIHQucHVzaCh0aGlzLnBsYXllckNhcmRzW25dKTtcclxuICAgICAgICAgICAgaWYgKHQubGVuZ3RoIDwgMSkgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRfc2h1blppOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGZvciAodmFyIHQsIGkgPSB0aGlzLmNhcmRzR3JvdXBbMF0ubGVuZ3RoLCBuID0gW107IGkgPj0gNTspXHJcbiAgICAgICAgICAgIGZvciAodmFyIG8gPSAwOyBvIDwgdGhpcy5jYXJkc0dyb3VwWzBdLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIShvICsgaSA8PSB0aGlzLmNhcmRzR3JvdXBbMF0ubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCBpOyBhKyspXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMF1bYSArIG9dWzBdKSwgbi5sZW5ndGggPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb2luY2lkZW5jZShuLCBlKSAmJiB0aGlzLnFpQ2FyZHMobiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuZGlmZmVyZW50WnUobiwgZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55aURvbmcodCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhID09IHRoaXMuY2FyZHNHcm91cFswXS5sZW5ndGggLSAxICYmIG4ubGVuZ3RoIDwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdF9saWFuRHVpOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGZvciAodmFyIHQsIGkgPSAyICogdGhpcy5jYXJkc0dyb3VwWzFdLmxlbmd0aCwgbiA9IFtdOyBpID4gNTspXHJcbiAgICAgICAgICAgIGlmIChpICUgMiA9PSAwKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbyA9IDA7IG8gPCB0aGlzLmNhcmRzR3JvdXBbMV0ubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShvICsgaSAvIDIgPD0gdGhpcy5jYXJkc0dyb3VwWzFdLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCBpIC8gMjsgYSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5wdXNoKHRoaXMuY2FyZHNHcm91cFsxXVthICsgb11bMF0pLCBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzFdW2EgKyBvXVsxXSksIG4ubGVuZ3RoID09IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvaW5jaWRlbmNlKG4sIGUpICYmIHRoaXMucWlDYXJkcyhuLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuZGlmZmVyZW50WnUobiwgZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueWlEb25nKHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGEgPT0gdGhpcy5jYXJkc0dyb3VwWzFdLmxlbmd0aCAtIDEgJiYgbi5sZW5ndGggPCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaS0tXHJcbiAgICB9LFxyXG4gICAgdF9zYW5TaHVuOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGZvciAodmFyIHQsIGkgPSAzICogdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aCwgbiA9IFtdOyBpID4gMjspXHJcbiAgICAgICAgICAgIGlmIChpICUgMyA9PSAwKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbyA9IDA7IG8gPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShvICsgaSAvIDMgPD0gdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCBpIC8gMzsgYSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5wdXNoKHRoaXMuY2FyZHNHcm91cFsyXVthICsgb11bMF0pLCBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzJdW2EgKyBvXVsxXSksIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMl1bYSArIG9dWzJdKSwgbi5sZW5ndGggPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29pbmNpZGVuY2UobiwgZSkgJiYgdGhpcy5xaUNhcmRzKG4sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ID0gdGhpcy5kaWZmZXJlbnRadShuLCBlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55aURvbmcodCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYSA9PSB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoIC0gMSAmJiBuLmxlbmd0aCA8IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpLS1cclxuICAgIH0sXHJcbiAgICB0X3NhbkRhaVlpOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGZvciAodmFyIHQsIGkgPSAzICogdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aCwgbiA9IFtdOyBpID4gMzspXHJcbiAgICAgICAgICAgIGlmIChpICUgMyA9PSAwKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbyA9IDA7IG8gPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShvICsgaSAvIDMgPD0gdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCBpIC8gMzsgYSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5wdXNoKHRoaXMuY2FyZHNHcm91cFsyXVthICsgb11bMF0pLCBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzJdW2EgKyBvXVsxXSksIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMl1bYSArIG9dWzJdKSwgbi5sZW5ndGggPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IHRoaXMueWlKaU5leHQobiwgZSksIGMgPSAwOyBjIDwgcy5sZW5ndGg7IGMrKykgbi5wdXNoKHNbY10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMubGVuZ3RoIDwgaSAvIDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IG4ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGU6IGZvciAodmFyIGMgPSB0aGlzLnBsYXllckNhcmRzLmxlbmd0aCAtIDE7IGMgPiAtMTsgYy0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IHIgJiYgbltsXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgIT0gdGhpcy5wbGF5ZXJDYXJkc1tjXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWw7IGwrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgxNCA9PSB0aGlzLnBsYXllckNhcmRzW2NdLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCB8fCAxNSA9PSB0aGlzLnBsYXllckNhcmRzW2NdLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCkgJiYga2luZ051bSA8IDEpIGtpbmdOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCgxNCA9PSB0aGlzLnBsYXllckNhcmRzW2NdLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCB8fCAxNSA9PSB0aGlzLnBsYXllckNhcmRzW2NdLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCkgJiYgMSA9PSBraW5nTnVtKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsID09IHIgLSAxICYmIChuLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tjXSksIG4ubGVuZ3RoID09IGkgLyAzICogNCAmJiB0aGlzLmNvaW5jaWRlbmNlKG4sIGUpICYmIHRoaXMucWlDYXJkcyhuLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSB0aGlzLmRpZmZlcmVudFp1KG4sIGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlpRG9uZyh0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4ubGVuZ3RoID09IGkgLyAzICogNCAmJiB0aGlzLmNvaW5jaWRlbmNlKG4sIGUpICYmIHRoaXMucWlDYXJkcyhuLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuZGlmZmVyZW50WnUobiwgZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueWlEb25nKHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGEgPT0gdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aCAtIDEgJiYgbi5sZW5ndGggPCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaS0tXHJcbiAgICB9LFxyXG4gICAgdF9zYW5EYWlZaUR1aTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBmb3IgKHZhciB0LCBpID0gMyAqIHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGgsIG4gPSBbXTsgaSA+IDQ7KVxyXG4gICAgICAgICAgICBpZiAoaSAlIDMgPT0gMClcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG8gPSAwOyBvIDwgdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobyArIGkgLyAzIDw9IHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgaSAvIDM7IGErKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMl1bYSArIG9dWzBdKSwgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFsyXVthICsgb11bMV0pLCBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzJdW2EgKyBvXVsyXSksIG4ubGVuZ3RoID09IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzID0gdGhpcy55aUppTmV4dChuLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHMubGVuZ3RoIDw9IGkgLyAzKSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHMubGVuZ3RoOyBjKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbMV0ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbMV1bcl1bMF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsID09IHNbY10uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBuLmxlbmd0aCAmJiBuW2xdICE9IHNbY107IGwrKykgbCA9PSBuLmxlbmd0aCAtIDEgJiYgKG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMV1bcl1bMF0pLCBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzFdW3JdWzFdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLmxlbmd0aCA9PSBpIC8gMyAqIDVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuLmxlbmd0aCA9PSBpIC8gMyAqIDQgJiYgdGhpcy5jb2luY2lkZW5jZShuLCBlKSAmJiB0aGlzLnFpQ2FyZHMobiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gdGhpcy5kaWZmZXJlbnRadShuLCBlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueWlEb25nKHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGktLVxyXG4gICAgfSxcclxuICAgIHlpSmlOZXh0OiBmdW5jdGlvbiAoZSwgdCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBbXSwgbiA9IDA7IG4gPCB0Lmxlbmd0aDsgbisrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciBvID0gMDsgbyA8IGUubGVuZ3RoICYmIHRbbl0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsICE9IGVbb10uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsOyBvKyspXHJcbiAgICAgICAgICAgICAgICBpZiAobyA9PSBlLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpLnB1c2godFtuXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaVxyXG4gICAgfSxcclxuICAgIGRpZmZlcmVudFp1OiBmdW5jdGlvbiAoZSwgdCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBbXSwgbiA9IDA7IG4gPCBlLmxlbmd0aDsgbisrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciBvID0gMDsgbyA8IHQubGVuZ3RoICYmIChlW25dLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCAhPSB0W29dLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCB8fCBlW25dLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnR5cGUgIT0gdFtvXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS50eXBlKTsgbysrKSBvID09IHQubGVuZ3RoIC0gMSAmJiBpLnB1c2goZVtuXSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHVvUGFpQ291bnQrKyxcclxuICAgICAgICAgICAgaVxyXG4gICAgfSxcclxuICAgIGNvaW5jaWRlbmNlOiBmdW5jdGlvbiAoZSwgdCkge1xyXG4gICAgICAgIGNjLmxvZyh0WzBdLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGUubGVuZ3RoICYmIHRbaV0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsICE9IGVbbl0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsOyBuKyspXHJcbiAgICAgICAgICAgICAgICBpZiAobiA9PSBlLmxlbmd0aCAtIDEpIHJldHVybiBjYy5sb2codFtpXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiAhMFxyXG4gICAgfSxcclxuICAgIHlpRG9uZzogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IGUubGVuZ3RoOyB0KyspIGVbdF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikubW92ZUNhcmQoKVxyXG4gICAgfSxcclxuICAgIHlpSmk6IGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IFtdLCBuID0gW10sIG8gPSAwOyBvIDwgZS5sZW5ndGg7IG8rKylcclxuICAgICAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCB0Lmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodFthXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgPT0gZVtvXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgJiYgdFthXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS50eXBlID09IGVbb10uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGkucHVzaCh0W2FdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYSA9PSB0Lmxlbmd0aCAtIDEgJiYgbi5wdXNoKHRbYV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzYW1lOiBpLFxyXG4gICAgICAgICAgICBkaWZmZXJlbnQ6IG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgeHVhblBhaTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB0aGlzLnNhbWVEaWZmZXJlbnRWYWwoKTtcclxuICAgICAgICBmb3IgKHZhciB0LCBpLCBuID0gW10sIG8gPSBbXSwgYSA9IFtdLCBzID0gMDsgcyA8IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoOyBzKyspIHRoaXMucGxheWVyQ2FyZHNbc10ucG9zaXRpb24ueSA9PSB0aGlzLm1vdmVkWSAmJiBhLnB1c2godGhpcy5wbGF5ZXJDYXJkc1tzXSk7XHJcbiAgICAgICAgc3dpdGNoIChlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmICh0ID0gZS5sZW5ndGggLyAyLCBhLmxlbmd0aCA+IHQpIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbMV0ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0ICYmICEocyArIGMgPj0gdGhpcy5jYXJkc0dyb3VwWzFdLmxlbmd0aCk7IGMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbMV1bcyArIGNdLmxlbmd0aDsgcisrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzFdW3MgKyBjXVtyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4ubGVuZ3RoID09IGUubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG4sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoICYmIHRoaXMucWlDYXJkcyhuLCBlKSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW3JdKSwgNCA9PSBvLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShvLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG8gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbNF1bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFs0XVtzXVtyXSksIDIgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGgpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFswXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IGUubGVuZ3RoOyByKyspIHMgKyByIDwgdGhpcy5jYXJkc0dyb3VwWzBdLmxlbmd0aCAmJiBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzBdW3MgKyByXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4ubGVuZ3RoID09IGUubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG4sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoICYmIHRoaXMucWlDYXJkcyhuLCBlKSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW3JdKSwgNCA9PSBvLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShvLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG8gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbNF1bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFs0XVtzXVtyXSksIDIgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGgpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0ID0gZS5sZW5ndGggLyAzO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0OyBjKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzICsgYyA8IHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzJdW3MgKyBjXS5sZW5ndGg7IHIrKykgbi5wdXNoKHRoaXMuY2FyZHNHcm91cFsyXVtzICsgY11bcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ubGVuZ3RoID09IGUubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG4sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoICYmIHRoaXMucWlDYXJkcyhuLCBlKSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bcl0pLCA0ID09IG8ubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG8sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoICYmIHRoaXMucWlDYXJkcyhuLCBlKSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aDsgcysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHRoaXMuY2FyZHNHcm91cFs0XVtzXS5sZW5ndGg7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnB1c2godGhpcy5jYXJkc0dyb3VwWzRdW3NdW3JdKSwgMiA9PSBvLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShvLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGwgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFszXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHRoaXMuY2FyZHNHcm91cFszXVtzXS5sZW5ndGg7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bc11bcl0pLCA0ID09IG4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBoID0gdGhpcy55aUppKG4sIGEpLCBjID0gMDsgYyA8IGguZGlmZmVyZW50Lmxlbmd0aDsgYysrKSBuLnB1c2goaC5kaWZmZXJlbnRbY10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ubGVuZ3RoIDwgZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMTsgYyA+IC0xOyBjLS0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgbi5sZW5ndGggJiYgbltkXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgIT0gdGhpcy5wbGF5ZXJDYXJkc1tjXS52YWw7IGQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgxNCA9PSB0aGlzLnBsYXllckNhcmRzW2NdLnZhbCB8fCAxNSA9PSB0aGlzLnBsYXllckNhcmRzW2NdLnZhbCkgJiYgbCA8IDEpIGwrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCgxNCA9PSB0aGlzLnBsYXllckNhcmRzW2NdLnZhbCB8fCAxNSA9PSB0aGlzLnBsYXllckNhcmRzW2NdLnZhbCkgJiYgMSA9PSBsKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkID09IG4ubGVuZ3RoIC0gMSAmJiAobi5wdXNoKHRoaXMucGxheWVyQ2FyZHNbY10pLCBuLmxlbmd0aCA9PSBlLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShuLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobi5sZW5ndGggPT0gZS5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobiwgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGggJiYgdGhpcy5xaUNhcmRzKG4sIGUpKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtyXSksIDQgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGggJiYgdGhpcy5xaUNhcmRzKG4sIGUpKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bcl0pLCAyID09IG8ubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG8sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW3JdKSwgNCA9PSBuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaCA9IHRoaXMueWlKaShuLCBhKSwgYyA9IDA7IGMgPCBoLmRpZmZlcmVudC5sZW5ndGg7IGMrKykgbi5wdXNoKGguZGlmZmVyZW50W2NdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLmxlbmd0aCA8IGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbMV0ubGVuZ3RoOyBjKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbMV1bY11bMF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsICE9IG5bMF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZCA9IDA7IGQgPCB0aGlzLmNhcmRzR3JvdXBbMV1bY10ubGVuZ3RoOyBkKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMV1bY11bZF0pLCBuLmxlbmd0aCA9PSBlLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPSB0aGlzLnlpSmkobiwgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnFpQ2FyZHMobiwgZSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugbi5zcGxpY2Uobi5sZW5ndGggLSB0aGlzLmNhcmRzR3JvdXBbMV1bY11bZF0ubGVuZ3RoLCBuLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBjKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbM11bY11bMF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsICE9IG5bMF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZCA9IDA7IGQgPCB0aGlzLmNhcmRzR3JvdXBbM11bY10ubGVuZ3RoOyBkKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbM11bY11bZF0pLCBuLmxlbmd0aCA9PSBlLmxlbmd0aCAmJiBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoICYmIHRoaXMucWlDYXJkcyhuLCBlKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtyXSksIDQgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGggJiYgdGhpcy5xaUNhcmRzKG4sIGUpKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bcl0pLCAyID09IG8ubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG8sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgdmFyIGwgPSAwO1xyXG4gICAgICAgICAgICAgICAgdCA9IGUubGVuZ3RoIC8gNDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzJdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdDsgYysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocyArIGMgPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbMl1bcyArIGNdLmxlbmd0aDsgcisrKSBuLnB1c2godGhpcy5jYXJkc0dyb3VwWzJdW3MgKyBjXVtyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaCA9IHRoaXMueWlKaShuLCBhKSwgYyA9IDA7IGMgPCBoLmRpZmZlcmVudC5sZW5ndGg7IGMrKykgbi5wdXNoKGguZGlmZmVyZW50W2NdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobi5sZW5ndGggPCBlLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdSA9IG4ubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSB0aGlzLnBsYXllckNhcmRzLmxlbmd0aCAtIDE7IGMgPiAtMTsgYy0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZCA9IDA7IGQgPCB1ICYmIG5bZF0uZ2V0Q29tcG9uZW50KFwiQ2FyZHNcIikudmFsICE9IHRoaXMucGxheWVyQ2FyZHNbY10udmFsOyBkKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKDE0ID09IHRoaXMucGxheWVyQ2FyZHNbY10udmFsIHx8IDE1ID09IHRoaXMucGxheWVyQ2FyZHNbY10udmFsKSAmJiBsIDwgMSkgbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCgxNCA9PSB0aGlzLnBsYXllckNhcmRzW2NdLnZhbCB8fCAxNSA9PSB0aGlzLnBsYXllckNhcmRzW2NdLnZhbCkgJiYgMSA9PSBsKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PSB1IC0gMSAmJiAoY2MubG9nKHRoaXMucGxheWVyQ2FyZHNbY10udmFsKSwgbi5wdXNoKHRoaXMucGxheWVyQ2FyZHNbY10pLCBuLmxlbmd0aCA9PSBlLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShuLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4ubGVuZ3RoID09IGUubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG4sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoICYmIHRoaXMucWlDYXJkcyhuLCBlKSkpIHJldHVybiBpLmRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW3JdKSwgNCA9PSBvLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShvLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG8gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbNF1bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFs0XVtzXVtyXSksIDIgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGgpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICB0ID0gZS5sZW5ndGggLyA1O1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbMl0ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0OyBjKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzICsgYyA8IHRoaXMuY2FyZHNHcm91cFsyXS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHRoaXMuY2FyZHNHcm91cFsyXVtzICsgY10ubGVuZ3RoOyByKyspIG4ucHVzaCh0aGlzLmNhcmRzR3JvdXBbMl1bcyArIGNdW3JdKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBoID0gdGhpcy55aUppKG4sIGEpLCBjID0gMDsgYyA8IHRoaXMuY2FyZHNHcm91cFsxXS5sZW5ndGg7IGMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbMV1bY10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBkID0gMDsgZCA8IGguZGlmZmVyZW50Lmxlbmd0aDsgZCsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoLmRpZmZlcmVudFtzXS5nZXRDb21wb25lbnQoXCJDYXJkc1wiKS52YWwgPT0gdGhpcy5jYXJkc0dyb3VwWzFdW2NdWzBdLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbCAmJiAobi5wdXNoKHRoaXMuY2FyZHNHcm91cFsxXVtjXVtyXSksIG4ubGVuZ3RoID09IGUubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG4sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoICYmIHRoaXMucWlDYXJkcyhuLCBlKSkpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5jYXJkc0dyb3VwWzNdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzNdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFszXVtzXVtyXSksIDQgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGggJiYgdGhpcy5xaUNhcmRzKG4sIGUpKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXJkc0dyb3VwWzRdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoOyBzKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgdGhpcy5jYXJkc0dyb3VwWzRdW3NdLmxlbmd0aDsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ucHVzaCh0aGlzLmNhcmRzR3JvdXBbNF1bc11bcl0pLCAyID09IG8ubGVuZ3RoICYmIChpID0gdGhpcy55aUppKG8sIGEpLCBpLnNhbWUubGVuZ3RoID09IGEubGVuZ3RoKSkgcmV0dXJuIGkuZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCB0aGlzLmNhcmRzR3JvdXBbM10ubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbM11bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnB1c2godGhpcy5jYXJkc0dyb3VwWzNdW3NdW3JdKSwgNCA9PSBvLmxlbmd0aCAmJiAoaSA9IHRoaXMueWlKaShvLCBhKSwgaS5zYW1lLmxlbmd0aCA9PSBhLmxlbmd0aCAmJiB0aGlzLnFpQ2FyZHMobiwgZSkpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcmRzR3JvdXBbNF0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG8gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuY2FyZHNHcm91cFs0XS5sZW5ndGg7IHMrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCB0aGlzLmNhcmRzR3JvdXBbNF1bc10ubGVuZ3RoOyByKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5wdXNoKHRoaXMuY2FyZHNHcm91cFs0XVtzXVtyXSksIDIgPT0gby5sZW5ndGggJiYgKGkgPSB0aGlzLnlpSmkobywgYSksIGkuc2FtZS5sZW5ndGggPT0gYS5sZW5ndGgpKSByZXR1cm4gaS5kaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHFpQ2FyZHM6IGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICAgICAgdmFyIGNhcmRWYWwgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gZS5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xyXG4gICAgICAgICAgICBjYXJkVmFsLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdmFsOiBlW2ldLmdldENvbXBvbmVudChcIkNhcmRzXCIpLnZhbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG87XHJcbiAgICAgICAgcmV0dXJuIDEgPT0gdC50eXBlID8gbyA9IHRoaXMuY2hlY2tEdWlaaShjYXJkVmFsKSA6IDIgPT0gdC50eXBlID8gbyA9IHRoaXMuY2hlY2tTaHVuWmkoY2FyZFZhbCkgOiAzID09IHQudHlwZSA/IG8gPSB0aGlzLmNoZWNrU2FuT3JTaHVuKGNhcmRWYWwpIDogNCA9PSB0LnR5cGUgPyBvID0gdGhpcy5jaGVja1NpVGFrZVR3byhjYXJkVmFsKSA6IDUgPT0gdC50eXBlID8gbyA9IHRoaXMuY2hlY2tTaVRha2VUd29TaHVhbmcoY2FyZFZhbCkgOiA2ID09IHQudHlwZSA/IG8gPSB0aGlzLmNoZWNrU2FuT3JQbGFuZShjYXJkVmFsKSA6IDcgPT0gdC50eXBlID8gbyA9IHRoaXMuY2hlY2tTYW5TaHVhbmdPclBsYW5lKGNhcmRWYWwpIDogOCA9PSB0LnR5cGUgJiYgKG8gPSB0aGlzLmNoZWNrU2koY2FyZFZhbCkpLFxyXG4gICAgICAgICAgICBvLm51bSA+IDAgPyAoMSA9PSBvLm1heCA/IG8ubWF4ICs9IDEyLjEgOiAyID09IG8ubWF4ICYmIChvLm1heCArPSAxMS4yKSwgMSA9PSB0Lm1heCA/IHQubWF4ICs9IDEyLjEgOiAyID09IHQubWF4ICYmICh0Lm1heCArPSAxMS4yKSwgby5tYXggPiB0Lm1heCkgOiAoY2MubG9nKGNhcmRWYWwpLCBmYWxzZSlcclxuICAgIH1cclxufSk7Il19