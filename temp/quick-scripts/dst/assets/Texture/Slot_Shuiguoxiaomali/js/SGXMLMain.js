
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_Shuiguoxiaomali/js/SGXMLMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd337dyOtxZOpbTecav1FCgc', 'SGXMLMain');
// Texture/Slot_Shuiguoxiaomali/js/SGXMLMain.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BETNUM = 9.0; //单注值

var LINES = 9; //线数

var TOPBET = [30, 1000, 100, 10];
var BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var RULELIST = [2, 0.2, 0.1, 1, 0.2, 0.1, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 3, 0.6, 0.2]; //规则

cc.Class({
  "extends": cc.Component,
  properties: {
    spUserFace: {
      "default": null,
      type: cc.Sprite,
      displayName: '用户头像'
    },
    lblUserName: {
      "default": null,
      type: cc.Label,
      displayName: '用户名'
    },
    lblUserCoin: {
      "default": null,
      type: cc.Label,
      displayName: '用户金币'
    },
    lblBet: {
      "default": null,
      type: cc.Label,
      displayName: '单注'
    },
    lblLines: {
      "default": null,
      type: cc.Label,
      displayName: '线数'
    },
    lblCurBet: {
      "default": null,
      type: cc.Label,
      displayName: '本局总注'
    },
    lblWinCoin: {
      "default": null,
      type: cc.Label,
      displayName: '本局赢得'
    },
    lblCoinList: {
      "default": [],
      type: cc.Label,
      displayName: '列倍率显示'
    },
    rollBtnAnim: {
      "default": null,
      type: cc.Animation,
      displayName: 'roll按钮动画'
    },
    rolePb: {
      "default": [],
      type: cc.Prefab,
      displayName: '滚轮角色Pb'
    },
    roleMiniPb: {
      "default": [],
      type: cc.Prefab,
      displayName: 'mini游戏滚轮角色Pb'
    },
    spAtlas: {
      "default": null,
      type: cc.SpriteAtlas,
      displayName: '图集'
    },
    autoBtn: {
      "default": null,
      type: cc.Sprite,
      displayName: '自动按钮Sprite'
    },
    effectAnimPr: {
      "default": null,
      type: cc.Node,
      displayName: '中奖特效'
    },
    effectAnimFullA: {
      "default": null,
      type: cc.Node,
      displayName: '中奖全屏特效A'
    },
    effectAnimFullB: {
      "default": null,
      type: cc.Node,
      displayName: '中奖全屏特效B'
    },
    effectAnimBigFull: {
      "default": null,
      type: cc.Node,
      displayName: '中大奖全屏特效'
    },
    bigWinNode: {
      "default": null,
      type: cc.Node,
      displayName: '大奖节点'
    },
    bigWinResultAnim: {
      "default": null,
      type: cc.Node,
      displayName: 'bigWin中奖'
    },
    BgNode: {
      "default": null,
      type: cc.Node,
      displayName: '游戏背景节点'
    },
    //免费次数有关
    freeBgNode: {
      "default": null,
      type: cc.Node,
      displayName: '免费摇奖背景节点'
    },
    freeBeginNode: {
      "default": null,
      type: cc.Node,
      displayName: '开始免费摇奖节点'
    },
    freeEndNode: {
      "default": null,
      type: cc.Node,
      displayName: '结束免费摇奖节点'
    },
    freeTimesNode: {
      "default": null,
      type: cc.Node,
      displayName: '免费摇奖显示节点'
    },
    helpUI: {
      "default": null,
      type: cc.Node,
      displayName: 'help界面'
    },
    helpNum: {
      "default": null,
      type: cc.Node,
      displayName: 'help界面可变注数'
    },
    audioBtn: {
      "default": null,
      type: cc.Sprite,
      displayName: '声音按钮'
    }
  },
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.net = this.node.getComponent('SGXMLNetwork');
    this.audio = this.node.getComponent('SGXMLAudio');
    this.wheelList = [];
    this.miniWheelList = [];
    this.bet = 0;
    this.auto = false;
    this.status = 0;
    this.bigWinResList = [3, 1, 2];
    this.bigWinCard = 0;
    this.bigWinCoin = 0;
    this.bigWinBoo = false;
    this.freeTimes = 0;
    this.rollResult = [];
    this.rollIndex = 0;
    this.lotteryRes = null;
    this.stopFree = false;
    this.freeGameCoin = 0;
    this.bIsFreeGame = false;
    this.delayClick = false;
    this.roundOldIndex = 0; //minigame用

    this.roundNowIndex = 0; //minigame用

    this.castTime = 0; //minigame用

    this.allSteps = 0; //minigame用

    this.nowStep = 0; //minigame用

    this.miniGameScore = 0; //minigame用
  },
  start: function start() {
    var _this = this;

    this.lblLines.string = LINES;
    this.lblWinCoin.string = '0.00';
    this.setBet();
    Helper.loadHead(this.playerInfo.playerHeadId, function (sp) {
      _this.spUserFace.spriteFrame = sp;
    });
    this.lblUserName.string = this.playerInfo.playerName;
    this.lblUserCoin.string = this.playerInfo.playerCoin.toFixed(2);
  },
  onCLick: function onCLick(event, args) {
    var _this2 = this;

    if (args == 'auto') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame || this.delayClick) {
        return;
      }

      this.auto = !this.auto;
      this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');

      if (this.auto && this.status == 0) {
        this.sendRoll();
      }
    } else if (args == 'roll') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame || this.delayClick) {
        return;
      }

      if (!this.auto) {
        if (this.status == 0) {
          this.rollBtnAnim.play();
          this.status = 2;
          this.sendRoll();
        } else if (this.status == 1) {
          this.delayClick = true;
          this.scheduleOnce(function () {
            _this2.delayClick = false;
          }, 1);
          this.stopImmediately();
        }
      }
    } else if (args == 'add') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
        return;
      }

      this.bet += 1;
      this.bet = this.bet >= BET.length ? BET.length - 1 : this.bet;
      this.setBet();
    } else if (args == 'addMax') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
        return;
      }

      this.bet = BET.length - 1;
      this.setBet();
    } else if (args == 'dec') {
      if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
        return;
      }

      this.bet -= 1;
      this.bet = this.bet >= 0 ? this.bet : 0;
      this.setBet();
    } else if (args == 'closeBigWin') {
      this.bigWinResultAnim.active = false;
      this.bigWinNode.active = false;
      this.audio.playBgm(0);
    } else if (args == 'help') {
      this.helpUI.active = true;
      var hr = this.helpNum.children;

      for (var i in hr) {
        hr[i].getComponent(cc.Label).string = (RULELIST[i] * BET[this.bet]).toFixed(2);
      }
    } else if (args == 'closeHelp') {
      this.helpUI.active = false;
    } else if (args == 'exitGame') {
      this.net.socket.disconnect();
      cc.director.loadScene("LobbyMain");
    } else if (args == 'audio') {
      this.audio.pInfo.musicControl = !this.audio.pInfo.musicControl;
      this.audioBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.audio.pInfo.musicControl ? 'btn_sound' : 'btn_sound_2');

      if (!this.audio.pInfo.musicControl) {
        this.audio.stopAudio();
      } else {
        if (this.freeTimes > 0) {
          this.audio.playBgm(1);
        } else if (this.bigWinBoo) {
          this.audio.playBgm(2);
        } else {
          this.audio.playBgm(0);
        }
      }
    }
  },
  setBet: function setBet() {
    this.lblBet.string = (BET[this.bet] * BETNUM).toFixed(2);
    this.lblCurBet.string = (BET[this.bet] * BETNUM).toFixed(2);

    for (var i in this.lblCoinList) {
      this.lblCoinList[i].string = (TOPBET[i] * (this.bet + 1) * BETNUM).toFixed(2);
    }
  },
  stateCallBack: function stateCallBack() {
    var _this3 = this;

    var st = 0;

    for (var i in this.wheelList) {
      if (this.wheelList[i].status) {
        st = 1;
        break;
      }
    }

    this.status = st;

    if (this.status == 0) {
      //结束当前轮盘
      var rIndex = this.rollIndex;
      this.lblUserCoin.string = (this.lotteryRes.userscore / 100).toFixed(2);
      this.lblWinCoin.string = (this.lotteryRes.winscore / 100).toFixed(2);

      if (this.bIsFreeGame) {
        this.freeGameCoin += this.lotteryRes.winscore;
      }

      this.scheduleOnce(function () {
        if (rIndex == _this3.rollIndex) {
          _this3.playWinAnim();
        }
      }, 1);

      if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
        this.bigWinBoo = true; // this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
        // this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
        // this.bigWinCard = this.lotteryRes.viewarray.getOpenBox.win_card;

        this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
        this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
        this.scheduleOnce(function () {
          _this3.startBigWin();
        }, 2);
      }

      if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
        if (this.freeTimes == 0) {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.freeBeginNode.active = true;
          this.scheduleOnce(function () {
            _this3.freeBeginNode.active = false;

            _this3.closeShine();

            _this3.startFreeGame();
          }, 5);
        } else {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.stopFree = false;
        }
      }
    }
  },
  playWinAnim: function playWinAnim() {
    var _this4 = this;

    //动画结束后自动roll
    var hasWinBool = 0;
    var allLine = [];

    for (var i in this.lotteryRes.viewarray.nWinCards) {
      if (this.lotteryRes.viewarray.nWinCards[i]) {
        allLine.push(i);
      }
    }

    var lines = this.lotteryRes.viewarray.nWinLinesDetail;
    var rIndex = this.rollIndex;
    var list = this.freeTimes > 0 || this.stopFree ? [allLine] : [allLine].concat(lines);
    hasWinBool = list.length - 1;

    if (hasWinBool > 0) {
      //播放恭喜字样动画
      this.effectAnimFullA.active = true;
      this.effectAnimFullA.getComponent(sp.Skeleton).clearTrack(0);
      this.effectAnimFullA.getComponent(sp.Skeleton).setAnimation(0, "win_cn", false); //播放招财猫动画

      this.effectAnimFullB.active = true;
      var lbl_coin = this.effectAnimFullB.getChildByName("lbl_coin").getComponent(cc.Label);
      var addcoin = 0;
      this.schedule(function () {
        addcoin += _this4.lotteryRes.winscore / 30;

        if (addcoin > _this4.lotteryRes.winscore) {
          addcoin = _this4.lotteryRes.winscore;
        }

        lbl_coin.string = (addcoin / 100).toFixed(2);
      }, 0, 30, 0.01); //判断播放金币掉落动画

      if (this.lotteryRes.winscore > BET[this.bet] * BETNUM * 100) {
        //如果大于100倍赌注，就播放bigFull动画
        this.effectAnimBigFull.active = true;
        this.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);
        this.effectAnimBigFull.getComponent(sp.Skeleton).setAnimation(0, "animation1", true);
      }
    }

    var animIndex = 0;
    this.schedule(function () {
      if (rIndex == _this4.rollIndex) {
        _this4.closeShine();

        for (var _i = 0; _i < 15; _i++) {
          _this4.clsoeAnim(_i % 5, parseInt(_i / 5));
        }

        if (!!!list[animIndex]) {
          return;
        }

        for (var j in list[animIndex]) {
          // this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));//修改
          _this4.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5), _this4.lotteryRes.viewarray.fMultiple);
        }

        animIndex++;
      }
    }, 3, list.length, 0.01);
    this.scheduleOnce(function () {
      _this4.effectAnimFullA.active = false;
      _this4.effectAnimFullB.active = false;

      _this4.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);

      _this4.effectAnimBigFull.active = false;

      if (_this4.stopFree) {
        _this4.stopFree = false;

        _this4.stopFreeTimes();

        _this4.closeShine();
      }

      if (_this4.freeTimes > 0) {
        _this4.freeTimes--;
        _this4.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = _this4.freeTimes;

        if (_this4.freeTimes == 0) {
          _this4.stopFree = true;
        }

        _this4.auto && _this4.sendRoll();
      }

      if (rIndex == _this4.rollIndex) {
        _this4.auto && _this4.freeTimes == 0 && _this4.sendRoll();
      }
    }, hasWinBool > 0 ? hasWinBool * 3 : 2);
  },
  //免费次数有关
  startFreeGame: function startFreeGame() {
    console.log("startFreeGame");
    this.audio.playBgm(1);
    this.freeGameCoin = 0;
    this.BgNode.active = false;
    this.bIsFreeGame = true;
    this.freeBgNode.active = true;
    this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame('btn_zidong');

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = false;
    }

    for (var _i2 in this.wheelList) {
      this.wheelList[_i2].initWheel();
    }

    this.freeTimesNode.active = true;
    this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes; // this.scheduleOnce(() => {

    this.auto = true;
    this.sendRoll(); // }, 2);
  },
  stopFreeTimes: function stopFreeTimes() {
    var _this5 = this;

    console.log("stopFreeTimes freeGameCoin : ", this.freeGameCoin);
    this.audio.playBgm(0);
    this.auto = false;

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = true;
    }

    for (var _i3 in this.wheelList) {
      this.wheelList[_i3].initWheel();
    }

    this.freeTimesNode.active = false;
    this.freeEndNode.active = true;
    this.freeEndNode.getChildByName("lbl_coin").getComponent(cc.Label).string = (this.freeGameCoin / 100).toFixed(2);
    this.scheduleOnce(function () {
      _this5.freeEndNode.active = false;
      _this5.BgNode.active = true;
      _this5.freeBgNode.active = false;
      _this5.bIsFreeGame = false;
    }, 2);
  },
  //0-5 0-2
  showAnim: function showAnim(cols, index, beishu) {
    this.audio.playBW();
    var length = this.wheelList[cols].roleIdList.length;
    this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").playAnim(); //添加

    if (this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu") && beishu > 1) {
      this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").active = true;
      this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").getComponent(cc.Label).string = "x" + beishu;
    } //添加结束


    var nodeList = this.effectAnimPr.children;
    nodeList[cols * 3 + index].active = true;
    nodeList[cols * 3 + index].getComponent(cc.Animation).play();
  },
  clsoeAnim: function clsoeAnim(cols, index) {
    var length = this.wheelList[cols].roleIdList.length;
    this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").stopAnim(); //添加

    if (this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu")) {
      this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").active = false;
    } //添加结束


    var nodeList = this.effectAnimPr.children;
    nodeList[cols * 3 + index].active = false;
  },
  checkRollData: function checkRollData(list) {
    for (var _iterator = _createForOfIteratorHelperLoose(list), _step; !(_step = _iterator()).done;) {
      var iterator = _step.value;

      if (iterator >= this.rolePb.length) {
        return false;
      }
    }

    return true;
  },
  roll: function roll(list) {
    if (!this.checkRollData(list)) {
      alert("\n            \u670D\u52A1\u5668\u83B7\u53D6\u7684\u82B1\u8272\u79CD\u7C7B\u5927\u4E8E\u73B0\u6709\u7684\u82B1\u8272\u79CD\u7C7B\uFF01\uFF01\uFF01\n            \u8BF7\u8054\u7CFB\u670D\u52A1\u5668\u4EBA\u5458\u8FDB\u884C\u6570\u636E\u8C03\u6574\uFF01");
      return;
    }

    this.status = 1;
    var line = [];

    for (var i = 0; i < 5; i++) {
      line[i] = [];
    }

    for (var _i4 in list) {
      line[_i4 % 5][2 - parseInt(_i4 / 5)] = list[_i4];
    }

    for (var _i5 in this.wheelList) {
      var _this$wheelList$_i;

      (_this$wheelList$_i = this.wheelList[_i5]).startRoll.apply(_this$wheelList$_i, line[_i5]);
    }
  },
  closeShine: function closeShine() {
    var nodeList = this.effectAnimPr.children;

    for (var i in nodeList) {
      nodeList[i].active = false;
    }
  },
  sendRoll: function sendRoll() {
    this.rollIndex++;
    this.closeShine();
    this.net.socket.emit('lottery', JSON.stringify({
      bet: this.bet,
      nBetList: [BET[this.bet] * BETNUM * 100]
    }));
  },
  stopImmediately: function stopImmediately() {
    if (!this.auto) {
      for (var i in this.wheelList) {
        this.wheelList[i].stopImmediately();
      }
    }
  },
  //开始mini游戏
  startMiniGame: function startMiniGame(event, customentData) {
    this.bigWinNode.getChildByName("startNode").active = false;
    this.bigWinNode.getChildByName("img_CiShu_0").getChildByName("label").getComponent(cc.Label).string = this.lotteryRes.viewarray.getOpenBox.cishu;
    this.bigWinNode.getChildByName("img_ZongYa_0").getChildByName("label").getComponent(cc.Label).string = (this.lotteryRes.viewarray.getOpenBox.chouma / 100).toFixed(2);
    this.bigWinNode.getChildByName("img_DeFen_0").getChildByName("label").getComponent(cc.Label).string = this.miniGameScore.toFixed(2);
    this.bigWinNode.getChildByName("img_ChouMa_0").getChildByName("label").getComponent(cc.Label).string = (this.miniGameScore / 100).toFixed(2);

    if (this.lotteryRes.viewarray.getOpenBox.gameList.length > 0) {
      var list = this.lotteryRes.viewarray.getOpenBox.gameList.shift();
      var round = this.lotteryRes.viewarray.getOpenBox.roundList.shift();
      var tempScore = this.lotteryRes.viewarray.getOpenBox.scoreList.shift();

      for (var i in this.miniWheelList) {
        this.miniWheelList[i].initWheel();
      }

      this.miniGameScore += tempScore;
      this.startMiniGameRoll(list, round);
    } else {
      this.audio.playBgm(0);
      this.bigWinNode.active = false;
      this.bigWinBoo = false;
      this.roundOldIndex = 0;
      this.miniGameScore = 0;
      this.lblUserCoin.string = (this.bigWinResultCoin / 100).toFixed(2);
      this.lblWinCoin.string = (this.bigWinCoin / 100).toFixed(2);
      var lightNode = this.bigWinNode.getChildByName("light");

      for (var _i6 = 1; _i6 < 25; _i6++) {
        lightNode.getChildByName("" + _i6).active = false;
      }
    }
  },
  startMiniGameRoll: function startMiniGameRoll(data, round) {
    for (var i in this.miniWheelList) {
      this.miniWheelList[i].startRoll(data[i]);
    }

    var roundArray = [6, 5, 0, 7, 6, 2, 1, 3, 4, 7, 2, 0, 1, 4, 5, 7, 6, 0, 3, 4, 5, 7, 2, 3];

    if (round == 3 || round == 9 || round == 15 || round == 21) {
      this.lotteryRes.viewarray.getOpenBox.cishu--;
    }

    var oldIndex = this.roundOldIndex;
    this.roundNowIndex = this.roundOldIndex;
    this.roundOldIndex = round;
    var lightNode = this.bigWinNode.getChildByName("light");
    lightNode.getChildByName("" + (this.roundNowIndex + 1)).active = true;
    oldIndex = this.oldIndexAdd(oldIndex);
    oldIndex = this.oldIndexAdd(oldIndex);
    oldIndex = this.oldIndexAdd(oldIndex);
    this.allSteps = 3;
    this.nowStep = 1;
    var endIndex = round - 7;

    if (endIndex < 0) {
      endIndex += 24;
    }

    var count = 0;

    while (true) {
      oldIndex = this.oldIndexAdd(oldIndex);
      this.allSteps++;

      if (oldIndex == endIndex) {
        count++;
      }

      if (count == 2) {
        break;
      }
    }

    this.allSteps += 7;
    this.schedule(this.scheduleFun, 0.02);
  },
  scheduleFun: function scheduleFun(dt) {
    var _this6 = this;

    this.castTime += dt;

    if (this.nowStep == 1) {
      if (this.castTime > 0.4) {
        this.doStep();
      }
    } else if (this.nowStep == 2) {
      if (this.castTime > 0.3) {
        this.doStep();
      }
    } else if (this.nowStep == 3) {
      if (this.castTime > 0.1) {
        this.doStep();
      }
    } else if (this.nowStep > 3 && this.nowStep <= this.allSteps - 7) {
      this.doStep();
    } else {
      if (this.castTime > 0.03 + (this.nowStep + 7 - this.allSteps) * 0.03) {
        this.doStep();

        if (this.nowStep > this.allSteps) {
          this.bigWinNode.getChildByName("img_DeFen_0").getChildByName("label").getComponent(cc.Label).string = this.miniGameScore.toFixed(2);
          this.bigWinNode.getChildByName("img_ChouMa_0").getChildByName("label").getComponent(cc.Label).string = (this.miniGameScore / 100).toFixed(2);
          this.bigWinNode.getChildByName("img_CiShu_0").getChildByName("label").getComponent(cc.Label).string = this.lotteryRes.viewarray.getOpenBox.cishu;
          this.scheduleOnce(function () {
            _this6.startMiniGame();
          }, 2);
          this.unschedule(this.scheduleFun);
        }
      }
    }
  },
  doStep: function doStep() {
    var lightNode = this.bigWinNode.getChildByName("light");
    lightNode.getChildByName("" + (this.roundNowIndex + 1)).active = false;
    this.roundNowIndex = this.oldIndexAdd(this.roundNowIndex);
    lightNode.getChildByName("" + (this.roundNowIndex + 1)).active = true;
    this.castTime = 0;
    this.nowStep++;
  },
  oldIndexAdd: function oldIndexAdd(index) {
    index++;

    if (index > 23) {
      index = 0;
    }

    return index;
  },
  startBigWin: function startBigWin() {
    this.audio.playBgm(2);
    this.auto = false;
    this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
    this.bigWinNode.active = true;
    this.bigWinNode.getChildByName("startNode").active = true;
  },
  bigWinClick: function bigWinClick(event, args) {
    var _this7 = this;

    if (this.bigWinTimes > 0) {
      var num = this.BigWinSet.size;
      this.BigWinSet.add(args);

      if (num == this.BigWinSet.size) {
        return;
      }

      var winNodePr = this.bigWinNode.children;
      this.bigWinTimes--;
      var index = this.bigWinResList[this.bigWinTimes];
      var nameList = {
        10: 's_bonus_SH00F_minor',
        100: 's_bonus_SH00F_medium',
        1000: 's_bonus_SH00F_mega'
      };
      var nd = winNodePr[args].getChildByName(nameList[index]);
      this.scheduleOnce(function () {
        nd.active = true;
        nd.getComponent(cc.Animation).play();
      }, 0.5);

      if (this.bigWinTimes == 0) {
        this.scheduleOnce(function () {
          _this7.bigWinResultAnim.active = true;
          _this7.lblUserCoin.string = (_this7.bigWinResultCoin / 100).toFixed(2);
          _this7.lblWinCoin.string = (_this7.bigWinCoin / 100).toFixed(2);
          _this7.bigWinResultAnim.getChildByName('coin').getComponent(cc.Label).string = (_this7.bigWinCoin / 100).toFixed(2);
          var lt = [10, 30, 100, 1000];

          for (var i in lt) {
            _this7.bigWinResultAnim.getChildByName('' + lt[i]).active = _this7.bigWinCard == lt[i];
          }

          _this7.bigWinBoo = false;
        }, 2);
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9TaHVpZ3VveGlhb21hbGlcXGpzXFxTR1hNTE1haW4uanMiXSwibmFtZXMiOlsiQkVUTlVNIiwiTElORVMiLCJUT1BCRVQiLCJCRVQiLCJSVUxFTElTVCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BVc2VyRmFjZSIsInR5cGUiLCJTcHJpdGUiLCJkaXNwbGF5TmFtZSIsImxibFVzZXJOYW1lIiwiTGFiZWwiLCJsYmxVc2VyQ29pbiIsImxibEJldCIsImxibExpbmVzIiwibGJsQ3VyQmV0IiwibGJsV2luQ29pbiIsImxibENvaW5MaXN0Iiwicm9sbEJ0bkFuaW0iLCJBbmltYXRpb24iLCJyb2xlUGIiLCJQcmVmYWIiLCJyb2xlTWluaVBiIiwic3BBdGxhcyIsIlNwcml0ZUF0bGFzIiwiYXV0b0J0biIsImVmZmVjdEFuaW1QciIsIk5vZGUiLCJlZmZlY3RBbmltRnVsbEEiLCJlZmZlY3RBbmltRnVsbEIiLCJlZmZlY3RBbmltQmlnRnVsbCIsImJpZ1dpbk5vZGUiLCJiaWdXaW5SZXN1bHRBbmltIiwiQmdOb2RlIiwiZnJlZUJnTm9kZSIsImZyZWVCZWdpbk5vZGUiLCJmcmVlRW5kTm9kZSIsImZyZWVUaW1lc05vZGUiLCJoZWxwVUkiLCJoZWxwTnVtIiwiYXVkaW9CdG4iLCJvbkxvYWQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJuZXQiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiYXVkaW8iLCJ3aGVlbExpc3QiLCJtaW5pV2hlZWxMaXN0IiwiYmV0IiwiYXV0byIsInN0YXR1cyIsImJpZ1dpblJlc0xpc3QiLCJiaWdXaW5DYXJkIiwiYmlnV2luQ29pbiIsImJpZ1dpbkJvbyIsImZyZWVUaW1lcyIsInJvbGxSZXN1bHQiLCJyb2xsSW5kZXgiLCJsb3R0ZXJ5UmVzIiwic3RvcEZyZWUiLCJmcmVlR2FtZUNvaW4iLCJiSXNGcmVlR2FtZSIsImRlbGF5Q2xpY2siLCJyb3VuZE9sZEluZGV4Iiwicm91bmROb3dJbmRleCIsImNhc3RUaW1lIiwiYWxsU3RlcHMiLCJub3dTdGVwIiwibWluaUdhbWVTY29yZSIsInN0YXJ0Iiwic3RyaW5nIiwic2V0QmV0IiwiSGVscGVyIiwibG9hZEhlYWQiLCJwbGF5ZXJIZWFkSWQiLCJzcCIsInNwcml0ZUZyYW1lIiwicGxheWVyTmFtZSIsInBsYXllckNvaW4iLCJ0b0ZpeGVkIiwib25DTGljayIsImV2ZW50IiwiYXJncyIsImdldFNwcml0ZUZyYW1lIiwic2VuZFJvbGwiLCJwbGF5Iiwic2NoZWR1bGVPbmNlIiwic3RvcEltbWVkaWF0ZWx5IiwibGVuZ3RoIiwiYWN0aXZlIiwicGxheUJnbSIsImhyIiwiY2hpbGRyZW4iLCJpIiwic29ja2V0IiwiZGlzY29ubmVjdCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwicEluZm8iLCJtdXNpY0NvbnRyb2wiLCJzdG9wQXVkaW8iLCJzdGF0ZUNhbGxCYWNrIiwic3QiLCJySW5kZXgiLCJ1c2Vyc2NvcmUiLCJ3aW5zY29yZSIsInBsYXlXaW5BbmltIiwidmlld2FycmF5IiwiZ2V0T3BlbkJveCIsImJGbGFnIiwid2luIiwiYmlnV2luUmVzdWx0Q29pbiIsInVzZXJfc2NvcmUiLCJzdGFydEJpZ1dpbiIsImdldEZyZWVUaW1lIiwibkZyZWVUaW1lIiwiY2xvc2VTaGluZSIsInN0YXJ0RnJlZUdhbWUiLCJoYXNXaW5Cb29sIiwiYWxsTGluZSIsIm5XaW5DYXJkcyIsInB1c2giLCJsaW5lcyIsIm5XaW5MaW5lc0RldGFpbCIsImxpc3QiLCJTa2VsZXRvbiIsImNsZWFyVHJhY2siLCJzZXRBbmltYXRpb24iLCJsYmxfY29pbiIsImdldENoaWxkQnlOYW1lIiwiYWRkY29pbiIsInNjaGVkdWxlIiwiYW5pbUluZGV4IiwiY2xzb2VBbmltIiwicGFyc2VJbnQiLCJqIiwic2hvd0FuaW0iLCJmTXVsdGlwbGUiLCJzdG9wRnJlZVRpbWVzIiwiY29uc29sZSIsImxvZyIsImZyZWVIaWRlTm9kZSIsImluaXRXaGVlbCIsImNvbHMiLCJpbmRleCIsImJlaXNodSIsInBsYXlCVyIsInJvbGVJZExpc3QiLCJyb2xlUGJMaXN0IiwicGxheUFuaW0iLCJub2RlTGlzdCIsInN0b3BBbmltIiwiY2hlY2tSb2xsRGF0YSIsIml0ZXJhdG9yIiwicm9sbCIsImFsZXJ0IiwibGluZSIsInN0YXJ0Um9sbCIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwibkJldExpc3QiLCJzdGFydE1pbmlHYW1lIiwiY3VzdG9tZW50RGF0YSIsImNpc2h1IiwiY2hvdW1hIiwiZ2FtZUxpc3QiLCJzaGlmdCIsInJvdW5kIiwicm91bmRMaXN0IiwidGVtcFNjb3JlIiwic2NvcmVMaXN0Iiwic3RhcnRNaW5pR2FtZVJvbGwiLCJsaWdodE5vZGUiLCJkYXRhIiwicm91bmRBcnJheSIsIm9sZEluZGV4Iiwib2xkSW5kZXhBZGQiLCJlbmRJbmRleCIsImNvdW50Iiwic2NoZWR1bGVGdW4iLCJkdCIsImRvU3RlcCIsInVuc2NoZWR1bGUiLCJiaWdXaW5DbGljayIsImJpZ1dpblRpbWVzIiwibnVtIiwiQmlnV2luU2V0Iiwic2l6ZSIsImFkZCIsIndpbk5vZGVQciIsIm5hbWVMaXN0IiwibmQiLCJsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxNQUFNLEdBQUcsR0FBZixFQUFvQjs7QUFDcEIsSUFBTUMsS0FBSyxHQUFHLENBQWQsRUFBaUI7O0FBQ2pCLElBQU1DLE1BQU0sR0FBRyxDQUFDLEVBQUQsRUFBSyxJQUFMLEVBQVcsR0FBWCxFQUFnQixFQUFoQixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBWjtBQUNBLElBQU1DLFFBQVEsR0FBRyxDQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsR0FBVCxFQUFj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Q3JGLFlBQTdDLENBQTBEN0MsRUFBRSxDQUFDUyxLQUE3RCxFQUFvRThELE1BQXBFLEdBQTZFLENBQUMsTUFBSSxDQUFDakIsVUFBTCxHQUFrQixHQUFuQixFQUF3QjBCLE9BQXhCLENBQWdDLENBQWhDLENBQTdFO0FBQ0EsY0FBSWtILEVBQUUsR0FBRyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsR0FBVCxFQUFjLElBQWQsQ0FBVDs7QUFDQSxlQUFLLElBQUlwRyxDQUFULElBQWNvRyxFQUFkLEVBQWtCO0FBQ2QsWUFBQSxNQUFJLENBQUNwSyxnQkFBTCxDQUFzQm9HLGNBQXRCLENBQXFDLEtBQUtnRSxFQUFFLENBQUNwRyxDQUFELENBQTVDLEVBQWlESixNQUFqRCxHQUEwRCxNQUFJLENBQUNyQyxVQUFMLElBQW1CNkksRUFBRSxDQUFDcEcsQ0FBRCxDQUEvRTtBQUNIOztBQUNELFVBQUEsTUFBSSxDQUFDdkMsU0FBTCxHQUFpQixLQUFqQjtBQUNILFNBVkQsRUFVRyxDQVZIO0FBV0g7QUFDSjtBQUNKO0FBMXJCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCRVROVU0gPSA5LjA7IC8v5Y2V5rOo5YC8XHJcbmNvbnN0IExJTkVTID0gOTsgLy/nur/mlbBcclxuY29uc3QgVE9QQkVUID0gWzMwLCAxMDAwLCAxMDAsIDEwXTtcclxuY29uc3QgQkVUID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcclxuY29uc3QgUlVMRUxJU1QgPSBbMiwgMC4yLCAwLjEsIDEsIDAuMiwgMC4xLCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMywgMC42LCAwLjJdOyAvL+inhOWImVxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNwVXNlckZhY2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+WktOWDjycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxVc2VyTmFtZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLflkI0nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsVXNlckNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi36YeR5biBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibEJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfljZXms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsTGluZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57q/5pWwJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibEN1ckJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDmgLvms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsV2luQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDotaLlvpcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ29pbkxpc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WIl+WAjeeOh+aYvuekuicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xsQnRuQW5pbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BbmltYXRpb24sXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAncm9sbOaMiemSruWKqOeUuycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xlUGI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmu5rova7op5LoibJQYicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xlTWluaVBiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnbWluaea4uOaIj+a7mui9ruinkuiJslBiJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Zu+6ZuGJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+iHquWKqOaMiemSrlNwcml0ZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aSn5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5SZXN1bHRBbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnYmlnV2lu5Lit5aWWJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5ri45oiP6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgICAgIGZyZWVCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbog4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUJlZ2luTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+W8gOWni+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlRW5kTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e7k+adn+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZnJlZVRpbWVzTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluaYvuekuuiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdoicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscE51bToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaLlj6/lj5jms6jmlbAnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGF1ZGlvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflo7Dpn7PmjInpkq4nLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5uZXQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdTR1hNTE5ldHdvcmsnKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnU0dYTUxBdWRpbycpO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5taW5pV2hlZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSBbMywgMSwgMl07XHJcbiAgICAgICAgdGhpcy5iaWdXaW5DYXJkID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXMgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sbFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxvdHRlcnlSZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5kZWxheUNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yb3VuZE9sZEluZGV4ID0gMDsvL21pbmlnYW1l55SoXHJcbiAgICAgICAgdGhpcy5yb3VuZE5vd0luZGV4ID0gMDsvL21pbmlnYW1l55SoXHJcbiAgICAgICAgdGhpcy5jYXN0VGltZSA9IDA7Ly9taW5pZ2FtZeeUqFxyXG4gICAgICAgIHRoaXMuYWxsU3RlcHMgPSAwOy8vbWluaWdhbWXnlKhcclxuICAgICAgICB0aGlzLm5vd1N0ZXAgPSAwOy8vbWluaWdhbWXnlKhcclxuICAgICAgICB0aGlzLm1pbmlHYW1lU2NvcmUgPSAwOy8vbWluaWdhbWXnlKhcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxMaW5lcy5zdHJpbmcgPSBMSU5FUztcclxuICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gJzAuMDAnO1xyXG4gICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgSGVscGVyLmxvYWRIZWFkKHRoaXMucGxheWVySW5mby5wbGF5ZXJIZWFkSWQsIHNwID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcFVzZXJGYWNlLnNwcml0ZUZyYW1lID0gc3A7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyTmFtZS5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJDb2luLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ0xpY2soZXZlbnQsIGFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncyA9PSAnYXV0bycpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYklzRnJlZUdhbWUgfHwgdGhpcy5kZWxheUNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hdXRvID0gIXRoaXMuYXV0bztcclxuICAgICAgICAgICAgdGhpcy5hdXRvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKHRoaXMuYXV0byA/ICdidG5fdGluZ3poaScgOiAnYnRuX3ppZG9uZycpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvICYmIHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAncm9sbCcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYklzRnJlZUdhbWUgfHwgdGhpcy5kZWxheUNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xsQnRuQW5pbS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5Q2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdhZGQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJldCArPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IEJFVC5sZW5ndGggPyBCRVQubGVuZ3RoIC0gMSA6IHRoaXMuYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnYWRkTWF4Jykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZXQgPSBCRVQubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2RlYycpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmV0IC09IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gMCA/IHRoaXMuYmV0IDogMDtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2Nsb3NlQmlnV2luJykge1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnaGVscCcpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGhyID0gdGhpcy5oZWxwTnVtLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIGhyKSB7XHJcbiAgICAgICAgICAgICAgICBocltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChSVUxFTElTVFtpXSAqIEJFVFt0aGlzLmJldF0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgPT0gJ2Nsb3NlSGVscCcpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzID09ICdleGl0R2FtZScpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncyA9PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sID0gIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5zcEF0bGFzLmdldFNwcml0ZUZyYW1lKHRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sID8gJ2J0bl9zb3VuZCcgOiAnYnRuX3NvdW5kXzInKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zdG9wQXVkaW8oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYmlnV2luQm9vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEJldCgpIHtcclxuICAgICAgICB0aGlzLmxibEJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLmxibEN1ckJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGJsQ29pbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luTGlzdFtpXS5zdHJpbmcgPSAoVE9QQkVUW2ldICogKHRoaXMuYmV0ICsgMSkgKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVdpbkFuaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3guYkZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luQm9vID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYmlnV2luVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5iaWdXaW5SZXNMaXN0ID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0O1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5iaWdXaW5DYXJkID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9jYXJkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LndpbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0Q29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkudXNlcl9zY29yZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QmlnV2luKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEZyZWVHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5V2luQW5pbSgpIHtcclxuICAgICAgICAvL+WKqOeUu+e7k+adn+WQjuiHquWKqHJvbGxcclxuICAgICAgICBsZXQgaGFzV2luQm9vbCA9IDA7XHJcbiAgICAgICAgbGV0IGFsbExpbmUgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHNbaV0pIHtcclxuICAgICAgICAgICAgICAgIGFsbExpbmUucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGluZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5MaW5lc0RldGFpbDtcclxuICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgbGV0IGxpc3QgPSAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuc3RvcEZyZWUpID8gW2FsbExpbmUsIF0gOiBbYWxsTGluZSwgLi4ubGluZXNdO1xyXG4gICAgICAgIGhhc1dpbkJvb2wgPSBsaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKGhhc1dpbkJvb2wgPiAwKSB7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oGt5Zac5a2X5qC35Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIndpbl9jblwiLGZhbHNlKTtcclxuICAgICAgICAgICAgLy/mkq3mlL7mi5votKLnjKvliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGxibF9jb2luID0gdGhpcy5lZmZlY3RBbmltRnVsbEIuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgYWRkY29pbiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkY29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAzMFxyXG4gICAgICAgICAgICAgICAgaWYgKGFkZGNvaW4gPiB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRjb2luID0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGJsX2NvaW4uc3RyaW5nID0gKGFkZGNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH0sIDAsIDMwLCAwLjAxKVxyXG4gICAgICAgICAgICAvL+WIpOaWreaSreaUvumHkeW4geaOieiQveWKqOeUu1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlID4gQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqMTAwKSB7IC8v5aaC5p6c5aSn5LqOMTAw5YCN6LWM5rOo77yM5bCx5pKt5pS+YmlnRnVsbOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJhbmltYXRpb24xXCIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFuaW1JbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNvZUFuaW0oaSAlIDUsIHBhcnNlSW50KGkgLyA1KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISEhbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpKTsvL+S/ruaUuVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSksIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZk11bHRpcGxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFuaW1JbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMywgbGlzdC5sZW5ndGgsIDAuMDEpXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3BGcmVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlVGltZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuZnJlZVRpbWVzID09IDAgJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaGFzV2luQm9vbCA+IDAgPyBoYXNXaW5Cb29sICogMyA6IDIpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICBzdGFydEZyZWVHYW1lKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRGcmVlR2FtZVwiKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSgnYnRuX3ppZG9uZycpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAvLyB9LCAyKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEZyZWVUaW1lcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0b3BGcmVlVGltZXMgZnJlZUdhbWVDb2luIDogXCIsdGhpcy5mcmVlR2FtZUNvaW4pO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLmZyZWVHYW1lQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICB9LDIpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvLzAtNSAwLTJcclxuICAgIHNob3dBbmltKGNvbHMsIGluZGV4LCBiZWlzaHUpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCVygpO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5wbGF5QW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSAmJiBiZWlzaHUgPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIGJlaXNodTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mt7vliqDnu5PmnZ9cclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xzb2VBbmltKGNvbHMsIGluZGV4KSB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnN0b3BBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mt7vliqDnu5PmnZ9cclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tSb2xsRGF0YShsaXN0KXtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yID49IHRoaXMucm9sZVBiLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICByb2xsKGxpc3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tSb2xsRGF0YShsaXN0KSkge1xyXG4gICAgICAgICAgICBhbGVydChgXHJcbiAgICAgICAgICAgIOacjeWKoeWZqOiOt+WPlueahOiKseiJsuenjeexu+Wkp+S6jueOsOacieeahOiKseiJsuenjeexu++8ge+8ge+8gVxyXG4gICAgICAgICAgICDor7fogZTns7vmnI3liqHlmajkurrlkZjov5vooYzmlbDmja7osIPmlbTvvIFgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIGxpc3QpIHtcclxuICAgICAgICAgICAgbGluZVtpICUgNV1bMiAtIHBhcnNlSW50KGkgLyA1KV0gPSBsaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0YXJ0Um9sbCguLi5saW5lW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlU2hpbmUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRSb2xsKCkge1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2xvdHRlcnknLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGJldDogdGhpcy5iZXQsXHJcbiAgICAgICAgICAgIG5CZXRMaXN0OiBbQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqIDEwMCwgXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+W8gOWni21pbmnmuLjmiI9cclxuICAgIHN0YXJ0TWluaUdhbWUoZXZlbnQsIGN1c3RvbWVudERhdGEpe1xyXG4gICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YXJ0Tm9kZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfQ2lTaHVfMFwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LmNpc2h1O1xyXG4gICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19ab25nWWFfMFwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC5jaG91bWEgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX0RlRmVuXzBcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMubWluaUdhbWVTY29yZS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19DaG91TWFfMFwiKS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMubWluaUdhbWVTY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LmdhbWVMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3guZ2FtZUxpc3Quc2hpZnQoKTtcclxuICAgICAgICAgICAgbGV0IHJvdW5kID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LnJvdW5kTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgICAgICBsZXQgdGVtcFNjb3JlID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LnNjb3JlTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubWluaVdoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5taW5pV2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWluaUdhbWVTY29yZSArPSB0ZW1wU2NvcmU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRNaW5pR2FtZVJvbGwobGlzdCwgcm91bmQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJvdW5kT2xkSW5kZXggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1pbmlHYW1lU2NvcmUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpblJlc3VsdENvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5iaWdXaW5Db2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICBsZXQgbGlnaHROb2RlID0gdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwibGlnaHRcIik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMjU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGlnaHROb2RlLmdldENoaWxkQnlOYW1lKFwiXCIgKyBpKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRNaW5pR2FtZVJvbGwoZGF0YSwgcm91bmQpIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubWluaVdoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLm1pbmlXaGVlbExpc3RbaV0uc3RhcnRSb2xsKGRhdGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcm91bmRBcnJheSA9IFs2LCA1LCAwLCA3LFxyXG4gICAgICAgICAgICA2LCAyLCAxLCAzLCA0LCA3LFxyXG4gICAgICAgICAgICAyLCAwLCAxLCA0LCA1LCA3LFxyXG4gICAgICAgICAgICA2LCAwLCAzLCA0LCA1LCA3LFxyXG4gICAgICAgICAgICAyLCAzXTtcclxuICAgICAgICBpZiAocm91bmQgPT0gMyB8fCByb3VuZCA9PSA5IHx8IHJvdW5kID09IDE1IHx8IHJvdW5kID09IDIxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC5jaXNodS0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb2xkSW5kZXggPSB0aGlzLnJvdW5kT2xkSW5kZXg7XHJcbiAgICAgICAgdGhpcy5yb3VuZE5vd0luZGV4ID0gdGhpcy5yb3VuZE9sZEluZGV4O1xyXG4gICAgICAgIHRoaXMucm91bmRPbGRJbmRleCA9IHJvdW5kO1xyXG4gICAgICAgIGxldCBsaWdodE5vZGUgPSB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsaWdodFwiKTtcclxuICAgICAgICBsaWdodE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJcIiArICh0aGlzLnJvdW5kTm93SW5kZXggKyAxKSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBvbGRJbmRleCA9IHRoaXMub2xkSW5kZXhBZGQob2xkSW5kZXgpO1xyXG4gICAgICAgIG9sZEluZGV4ID0gdGhpcy5vbGRJbmRleEFkZChvbGRJbmRleCk7XHJcbiAgICAgICAgb2xkSW5kZXggPSB0aGlzLm9sZEluZGV4QWRkKG9sZEluZGV4KTtcclxuICAgICAgICB0aGlzLmFsbFN0ZXBzID0gMztcclxuICAgICAgICB0aGlzLm5vd1N0ZXAgPSAxO1xyXG4gICAgICAgIGxldCBlbmRJbmRleCA9IHJvdW5kIC0gNztcclxuICAgICAgICBpZiAoZW5kSW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIGVuZEluZGV4ICs9IDI0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIG9sZEluZGV4ID0gdGhpcy5vbGRJbmRleEFkZChvbGRJbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsU3RlcHMrKztcclxuICAgICAgICAgICAgaWYgKG9sZEluZGV4ID09IGVuZEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA9PTIpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxsU3RlcHMgKz0gNztcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc2NoZWR1bGVGdW4sIDAuMDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzY2hlZHVsZUZ1biAoZHQpIHtcclxuICAgICAgICB0aGlzLmNhc3RUaW1lICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLm5vd1N0ZXAgPT0gMSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYXN0VGltZSA+IDAuNCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb1N0ZXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ub3dTdGVwID09IDIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FzdFRpbWUgPiAwLjMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9TdGVwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm93U3RlcCA9PSAzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhc3RUaW1lID4gMC4xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvU3RlcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5vd1N0ZXAgPiAzICYmIHRoaXMubm93U3RlcCA8PSB0aGlzLmFsbFN0ZXBzIC0gNykge1xyXG4gICAgICAgICAgICB0aGlzLmRvU3RlcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhc3RUaW1lID4gKDAuMDMgKyAodGhpcy5ub3dTdGVwICsgNyAtIHRoaXMuYWxsU3RlcHMpICogMC4wMykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9TdGVwKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub3dTdGVwID4gdGhpcy5hbGxTdGVwcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19EZUZlbl8wXCIpLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLm1pbmlHYW1lU2NvcmUudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfQ2hvdU1hXzBcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLm1pbmlHYW1lU2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX0NpU2h1XzBcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC5jaXNodTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRNaW5pR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnNjaGVkdWxlRnVuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZG9TdGVwICgpIHtcclxuICAgICAgICBsZXQgbGlnaHROb2RlID0gdGhpcy5iaWdXaW5Ob2RlLmdldENoaWxkQnlOYW1lKFwibGlnaHRcIik7XHJcbiAgICAgICAgbGlnaHROb2RlLmdldENoaWxkQnlOYW1lKFwiXCIgKyAodGhpcy5yb3VuZE5vd0luZGV4ICsgMSkpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucm91bmROb3dJbmRleCA9IHRoaXMub2xkSW5kZXhBZGQodGhpcy5yb3VuZE5vd0luZGV4KTtcclxuICAgICAgICBsaWdodE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJcIiArICh0aGlzLnJvdW5kTm93SW5kZXggKyAxKSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLm5vd1N0ZXArKztcclxuICAgIH0sXHJcblxyXG4gICAgb2xkSW5kZXhBZGQgKGluZGV4KSB7XHJcbiAgICAgICAgaW5kZXgrKztcclxuICAgICAgICBpZiAoaW5kZXggPiAyMykge1xyXG4gICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRCaWdXaW4oKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDIpO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BBdGxhcy5nZXRTcHJpdGVGcmFtZSh0aGlzLmF1dG8gPyAnYnRuX3Rpbmd6aGknIDogJ2J0bl96aWRvbmcnKTtcclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydE5vZGVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgYmlnV2luQ2xpY2soZXZlbnQsIGFyZ3MpIHtcclxuICAgICAgICBpZiAodGhpcy5iaWdXaW5UaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgbGV0IG51bSA9IHRoaXMuQmlnV2luU2V0LnNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuQmlnV2luU2V0LmFkZChhcmdzKTtcclxuICAgICAgICAgICAgaWYgKG51bSA9PSB0aGlzLkJpZ1dpblNldC5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHdpbk5vZGVQciA9IHRoaXMuYmlnV2luTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5UaW1lcy0tO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmJpZ1dpblJlc0xpc3RbdGhpcy5iaWdXaW5UaW1lc107XHJcbiAgICAgICAgICAgIGxldCBuYW1lTGlzdCA9IHtcclxuICAgICAgICAgICAgICAgIDEwOiAnc19ib251c19TSDAwRl9taW5vcicsXHJcbiAgICAgICAgICAgICAgICAxMDA6ICdzX2JvbnVzX1NIMDBGX21lZGl1bScsXHJcbiAgICAgICAgICAgICAgICAxMDAwOiAnc19ib251c19TSDAwRl9tZWdhJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBuZCA9IHdpbk5vZGVQclthcmdzXS5nZXRDaGlsZEJ5TmFtZShuYW1lTGlzdFtpbmRleF0pO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbmQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgICAgICB9LCAwLjUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iaWdXaW5UaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5iaWdXaW5SZXN1bHRDb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5iaWdXaW5Db2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5nZXRDaGlsZEJ5TmFtZSgnY29pbicpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuYmlnV2luQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbHQgPSBbMTAsIDMwLCAxMDAsIDEwMDBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gbHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmdldENoaWxkQnlOYW1lKCcnICsgbHRbaV0pLmFjdGl2ZSA9IHRoaXMuYmlnV2luQ2FyZCA9PSBsdFtpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7Il19