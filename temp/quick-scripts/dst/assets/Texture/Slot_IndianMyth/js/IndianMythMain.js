
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_IndianMyth/js/IndianMythMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c3a7bYYyepBmq3a9quTBd0A', 'IndianMythMain');
// Texture/Slot_IndianMyth/js/IndianMythMain.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BETNUM = 2.5; //单注值

var LINES = 25; //线数

var TOPBET = [30, 1000, 100, 10];
var BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var RULELIST = [2, 0.2, 0.1, 1, 0.2, 0.1, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 3, 0.6, 0.2]; //规则

cc.Class({
  "extends": cc.Component,
  properties: {
    lblUserCoin: {
      "default": null,
      type: cc.Label,
      displayName: '用户金币'
    },
    lblLines: {
      "default": null,
      type: cc.Label,
      displayName: '线数'
    },
    lineNode: cc.Node,
    //画线
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
    rolePb: {
      "default": [],
      type: cc.Prefab,
      displayName: '滚轮角色Pb'
    },
    spAtlas: {
      "default": null,
      type: cc.SpriteAtlas,
      displayName: '图集'
    },
    autoBtn: {
      "default": null,
      type: cc.Button,
      displayName: '自动按钮'
    },
    StopAutoBtn: {
      "default": null,
      type: cc.Button,
      displayName: '停止自动按钮'
    },
    startBtn: cc.Button,
    //开始
    stopBtn: cc.Button,
    //停止
    ctrlBtn: [cc.Button],
    //需要控制开关的按钮
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
    bigWinTip: cc.Node,
    //中奖提示
    menuPanel: cc.Node,
    //菜单
    helpPanel1: cc.Node,
    //帮助1
    helpPanel2: cc.Node //帮助2

  },
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.net = this.node.getComponent('IndianMythNetwork');
    this.audio = this.node.getComponent('IndianMythAudio');
    this.wheelList = [];
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
    this.bIsFreeGame = false; //动效相关

    this.isDoingMenu = false;
    this.isMenuOpen = false;
    this.isDoingHelp2 = false;
    this.isHelp2Open = false;
  },
  start: function start() {
    this.lblLines.string = LINES;
    this.lblWinCoin.string = '0.00';
    this.setBet();
    this.lblUserCoin.string = this.playerInfo.playerCoin.toFixed(2);
  },
  onCLick: function onCLick(event, args) {
    switch (args) {
      case "auto":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame) {
          return;
        }

        this.auto = true;
        this.autoBtn.node.active = false;
        this.StopAutoBtn.node.active = true;
        this.startBtn.node.active = false;
        this.stopBtn.node.active = true;

        if (this.status == 0) {
          this.sendRoll();
        }

        break;

      case "autoStop":
        this.auto = false;
        this.autoBtn.node.active = true;
        this.StopAutoBtn.node.active = false;
        this.startBtn.node.active = true;
        this.stopBtn.node.active = false;
        break;

      case "roll":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame) {
          return;
        }

        if (!this.auto) {
          if (this.status == 0) {
            this.sendRoll();
          }
        }

        break;

      case "stopRoll":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame) {
          return;
        }

        if (this.status == 1) {
          this.startBtn.node.active = true;
          this.stopBtn.node.active = false;
          this.stopImmediately();
        }

        break;

      case "add":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
          return;
        }

        this.bet += 1;
        this.bet = this.bet >= BET.length ? BET.length - 1 : this.bet;
        this.setBet();
        break;

      case "dec":
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
          return;
        }

        this.bet -= 1;
        this.bet = this.bet >= 0 ? this.bet : 0;
        this.setBet();
        break;

      case "addLine":
        break;

      case "subLine":
        break;

      case "closeBigWin":
        this.bigWinResultAnim.active = false;
        this.bigWinNode.active = false;
        this.audio.playBgm(0);
        break;

      case "help":
        this.helpUI.active = true;
        var hr = this.helpNum.children;

        for (var i in hr) {
          hr[i].getComponent(cc.Label).string = (RULELIST[i] * BET[this.bet]).toFixed(2);
        }

        break;

      case "closeHelp":
        this.helpUI.active = false;
        break;

      case "exitGame":
        this.net.socket.disconnect();
        cc.director.loadScene("LobbyMain");
        break;

      case "audio":
        this.audio.pInfo.musicControl = !this.audio.pInfo.musicControl;

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

        break;

      case "menu":
        this.menuAciton(this.isMenuOpen);
        break;

      case "openLineHelp":
        this.isHelp2Open = true;
        this.helpPanel2Action();
        break;

      case "closeLineHelp":
        this.isHelp2Open = false;
        this.helpPanel2Action();
        break;

      case "closeGame":
        cc.game.end();
        break;
    }
  },
  //设置交互按钮的可用性
  setBtnUsable: function setBtnUsable(isUsable) {
    for (var i in this.ctrlBtn) {
      this.ctrlBtn[i].interactable = isUsable;
    }
  },
  setBet: function setBet() {
    this.lblCurBet.string = (BET[this.bet] * BETNUM).toFixed(2);

    for (var i in this.lblCoinList) {
      this.lblCoinList[i].string = (TOPBET[i] * (this.bet + 1) * BETNUM).toFixed(2);
    }
  },
  stateCallBack: function stateCallBack() {
    var _this = this;

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
        if (rIndex == _this.rollIndex) {
          _this.playWinAnim();
        }
      }, 1); // if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
      //     this.bigWinBoo = true;
      //     this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
      //     this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
      //     this.bigWinCard = this.lotteryRes.viewarray.getOpenBox.win_card;
      //     this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
      //     this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
      //     this.scheduleOnce(() => {
      //         this.startBigWin();
      //     }, 2);
      // }

      if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
        if (this.freeTimes == 0) {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.freeBeginNode.active = true;
          this.scheduleOnce(function () {
            _this.freeBeginNode.active = false;

            _this.closeShine();

            _this.startFreeGame();
          }, 5);
        } else {
          this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
          this.stopFree = false;
        }
      }
    }
  },
  playWinAnim: function playWinAnim() {
    var _this2 = this;

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
        addcoin += _this2.lotteryRes.winscore / 30;

        if (addcoin > _this2.lotteryRes.winscore) {
          addcoin = _this2.lotteryRes.winscore;
        }

        lbl_coin.string = (addcoin / 100).toFixed(2);
      }, 0, 30, 0.01); //判断播放金币掉落动画

      if (this.lotteryRes.winscore > BET[this.bet] * BETNUM * 100) {
        //如果大于100倍赌注，就播放bigFull动画
        this.effectAnimBigFull.active = true;
        this.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);
        this.effectAnimBigFull.getComponent(sp.Skeleton).setAnimation(0, "animation1", true);
      }

      !this.auto && this.winAciton();
    }

    var animIndex = 0;
    this.schedule(function () {
      if (rIndex == _this2.rollIndex) {
        _this2.closeShine();

        for (var _i = 0; _i < 15; _i++) {
          _this2.clsoeAnim(_i % 5, parseInt(_i / 5));
        }

        if (!!!list[animIndex]) {
          return;
        }

        for (var j in list[animIndex]) {
          // this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));//修改
          _this2.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5), _this2.lotteryRes.viewarray.fMultiple);
        }

        animIndex++;
      }
    }, 3, list.length, 0.01);
    this.scheduleOnce(function () {
      _this2.effectAnimFullA.active = false;
      _this2.effectAnimFullB.active = false;

      _this2.effectAnimBigFull.getComponent(sp.Skeleton).clearTrack(0);

      _this2.effectAnimBigFull.active = false;

      _this2.setBtnUsable(true);

      _this2.startBtn.node.active = true;
      _this2.stopBtn.node.active = false;

      if (_this2.stopFree) {
        _this2.stopFree = false;

        _this2.stopFreeTimes();

        _this2.closeShine();
      }

      if (_this2.freeTimes > 0) {
        _this2.freeTimes--;
        _this2.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = _this2.freeTimes;

        if (_this2.freeTimes == 0) {
          _this2.stopFree = true;
        }

        _this2.auto && _this2.sendRoll();
      }

      if (rIndex == _this2.rollIndex) {
        _this2.auto && _this2.freeTimes == 0 && _this2.sendRoll();
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
    this.autoBtn.node.active = true;
    this.StopAutoBtn.node.active = false;

    for (var i in this.freeHideNode) {
      this.freeHideNode[i].active = false;
    }

    for (var _i2 in this.wheelList) {
      this.wheelList[_i2].initWheel();
    }

    this.freeTimesNode.active = true;
    this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes; // this.scheduleOnce(() => {

    this.auto = true;
    this.autoBtn.node.active = false;
    this.StopAutoBtn.node.active = true;
    this.startBtn.node.active = false;
    this.stopBtn.node.active = true;
    this.sendRoll(); // }, 2);
  },
  stopFreeTimes: function stopFreeTimes() {
    var _this3 = this;

    console.log("stopFreeTimes freeGameCoin : ", this.freeGameCoin);
    this.audio.playBgm(0);
    this.auto = false;
    this.autoBtn.node.active = true;
    this.StopAutoBtn.node.active = false;

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
      _this3.freeEndNode.active = false;
      _this3.BgNode.active = true;
      _this3.freeBgNode.active = false;
      _this3.bIsFreeGame = false;
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
    this.setBtnUsable(false);
    this.startBtn.node.active = false;
    this.stopBtn.node.active = true;
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

      this.setBtnUsable(true);
    } else {
      for (var _i6 in this.wheelList) {
        this.wheelList[_i6].stopImmediately();
      }
    }
  },
  startBigWin: function startBigWin() {
    this.audio.playBgm(2);
    this.auto = false;
    this.autoBtn.node.active = !this.auto;
    this.StopAutoBtn.node.active = this.auto;
    this.BigWinSet = new Set();
    this.bigWinNode.active = true;
    var pr = this.bigWinNode.children;

    for (var i in pr) {
      var pr1 = pr[i].children;

      for (var j in pr1) {
        pr1[j].active = j == 0;
      }
    }
  },
  bigWinClick: function bigWinClick(event, args) {
    var _this4 = this;

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
          _this4.bigWinResultAnim.active = true;
          _this4.lblUserCoin.string = (_this4.bigWinResultCoin / 100).toFixed(2);
          _this4.lblWinCoin.string = (_this4.bigWinCoin / 100).toFixed(2);
          _this4.bigWinResultAnim.getChildByName('coin').getComponent(cc.Label).string = (_this4.bigWinCoin / 100).toFixed(2);
          var lt = [10, 30, 100, 1000];

          for (var i in lt) {
            _this4.bigWinResultAnim.getChildByName('' + lt[i]).active = _this4.bigWinCard == lt[i];
          }

          _this4.bigWinBoo = false;
        }, 2);
      }
    }
  },
  //中奖动效490-635
  winAciton: function winAciton() {
    var _this5 = this;

    this.bigWinTip.x = 635;
    this.bigWinTip.getComponent(cc.Animation).play();
    this.bigWinTip.runAction(cc.sequence(cc.moveTo(0.5, cc.v2(490, this.bigWinTip.y)), cc.delayTime(2), cc.moveTo(0.5, cc.v2(635, this.bigWinTip.y)), cc.callFunc(function () {
      _this5.bigWinTip.getComponent(cc.Animation).stop();
    })));
  },
  //菜单动效676-466
  menuAciton: function menuAciton() {
    var _this6 = this;

    if (this.isDoingMenu) {
      return;
    }

    this.isMenuOpen = !this.isMenuOpen;
    var isOpen = this.isMenuOpen;
    this.isDoingMenu = true;
    var p1, p2, t1, t2;

    if (isOpen) {
      p1 = 446;
      p2 = 466;
      t1 = 0.3;
      t2 = 0.05;
    } else {
      p1 = 446;
      p2 = 676;
      t1 = 0.05;
      t2 = 0.3;
    }

    this.menuPanel.runAction(cc.sequence(cc.moveTo(t1, cc.v2(p1, this.menuPanel.y)), cc.moveTo(t2, cc.v2(p2, this.menuPanel.y)), cc.callFunc(function () {
      _this6.isDoingMenu = false;
    })));
  },
  //画线规则帮助640-0
  helpPanel2Action: function helpPanel2Action() {
    var _this7 = this;

    if (this.isDoingHelp2) {
      return;
    }

    this.isDoingHelp2 = true;
    var p1 = this.isHelp2Open ? 0 : 640;
    this.helpPanel2.runAction(cc.sequence(cc.moveTo(0.4, cc.v2(this.helpPanel2.x, p1)), cc.callFunc(function () {
      _this7.isDoingHelp2 = false;
    })));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9JbmRpYW5NeXRoXFxqc1xcSW5kaWFuTXl0aE1haW4uanMiXSwibmFtZXMiOlsiQkVUTlVNIiwiTElORVMiLCJUT1BCRVQiLCJCRVQiLCJSVUxFTElTVCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibGJsVXNlckNvaW4iLCJ0eXBlIiwiTGFiZWwiLCJkaXNwbGF5TmFtZSIsImxibExpbmVzIiwibGluZU5vZGUiLCJOb2RlIiwibGJsQ3VyQmV0IiwibGJsV2luQ29pbiIsImxibENvaW5MaXN0Iiwicm9sZVBiIiwiUHJlZmFiIiwic3BBdGxhcyIsIlNwcml0ZUF0bGFzIiwiYXV0b0J0biIsIkJ1dHRvbiIsIlN0b3BBdXRvQnRuIiwic3RhcnRCdG4iLCJzdG9wQnRuIiwiY3RybEJ0biIsImVmZmVjdEFuaW1QciIsImVmZmVjdEFuaW1GdWxsQSIsImVmZmVjdEFuaW1GdWxsQiIsImVmZmVjdEFuaW1CaWdGdWxsIiwiYmlnV2luTm9kZSIsImJpZ1dpblJlc3VsdEFuaW0iLCJCZ05vZGUiLCJmcmVlQmdOb2RlIiwiZnJlZUJlZ2luTm9kZSIsImZyZWVFbmROb2RlIiwiZnJlZVRpbWVzTm9kZSIsImhlbHBVSSIsImhlbHBOdW0iLCJiaWdXaW5UaXAiLCJtZW51UGFuZWwiLCJoZWxwUGFuZWwxIiwiaGVscFBhbmVsMiIsIm9uTG9hZCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIm5ldCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJhdWRpbyIsIndoZWVsTGlzdCIsImJldCIsImF1dG8iLCJzdGF0dXMiLCJiaWdXaW5SZXNMaXN0IiwiYmlnV2luQ2FyZCIsImJpZ1dpbkNvaW4iLCJiaWdXaW5Cb28iLCJmcmVlVGltZXMiLCJyb2xsUmVzdWx0Iiwicm9sbEluZGV4IiwibG90dGVyeVJlcyIsInN0b3BGcmVlIiwiZnJlZUdhbWVDb2luIiwiYklzRnJlZUdhbWUiLCJpc0RvaW5nTWVudSIsImlzTWVudU9wZW4iLCJpc0RvaW5nSGVscDIiLCJpc0hlbHAyT3BlbiIsInN0YXJ0Iiwic3RyaW5nIiwic2V0QmV0IiwicGxheWVyQ29pbiIsInRvRml4ZWQiLCJvbkNMaWNrIiwiZXZlbnQiLCJhcmdzIiwiYWN0aXZlIiwic2VuZFJvbGwiLCJzdG9wSW1tZWRpYXRlbHkiLCJsZW5ndGgiLCJwbGF5QmdtIiwiaHIiLCJjaGlsZHJlbiIsImkiLCJzb2NrZXQiLCJkaXNjb25uZWN0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJwSW5mbyIsIm11c2ljQ29udHJvbCIsInN0b3BBdWRpbyIsIm1lbnVBY2l0b24iLCJoZWxwUGFuZWwyQWN0aW9uIiwiZ2FtZSIsImVuZCIsInNldEJ0blVzYWJsZSIsImlzVXNhYmxlIiwiaW50ZXJhY3RhYmxlIiwic3RhdGVDYWxsQmFjayIsInN0IiwickluZGV4IiwidXNlcnNjb3JlIiwid2luc2NvcmUiLCJzY2hlZHVsZU9uY2UiLCJwbGF5V2luQW5pbSIsInZpZXdhcnJheSIsImdldEZyZWVUaW1lIiwiYkZsYWciLCJuRnJlZVRpbWUiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsImhhc1dpbkJvb2wiLCJhbGxMaW5lIiwibldpbkNhcmRzIiwicHVzaCIsImxpbmVzIiwibldpbkxpbmVzRGV0YWlsIiwibGlzdCIsInNwIiwiU2tlbGV0b24iLCJjbGVhclRyYWNrIiwic2V0QW5pbWF0aW9uIiwibGJsX2NvaW4iLCJnZXRDaGlsZEJ5TmFtZSIsImFkZGNvaW4iLCJzY2hlZHVsZSIsIndpbkFjaXRvbiIsImFuaW1JbmRleCIsImNsc29lQW5pbSIsInBhcnNlSW50IiwiaiIsInNob3dBbmltIiwiZk11bHRpcGxlIiwic3RvcEZyZWVUaW1lcyIsImNvbnNvbGUiLCJsb2ciLCJmcmVlSGlkZU5vZGUiLCJpbml0V2hlZWwiLCJjb2xzIiwiaW5kZXgiLCJiZWlzaHUiLCJwbGF5QlciLCJyb2xlSWRMaXN0Iiwicm9sZVBiTGlzdCIsInBsYXlBbmltIiwibm9kZUxpc3QiLCJBbmltYXRpb24iLCJwbGF5Iiwic3RvcEFuaW0iLCJjaGVja1JvbGxEYXRhIiwiaXRlcmF0b3IiLCJyb2xsIiwiYWxlcnQiLCJsaW5lIiwic3RhcnRSb2xsIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJuQmV0TGlzdCIsInN0YXJ0QmlnV2luIiwiQmlnV2luU2V0IiwiU2V0IiwicHIiLCJwcjEiLCJiaWdXaW5DbGljayIsImJpZ1dpblRpbWVzIiwibnVtIiwic2l6ZSIsImFkZCIsIndpbk5vZGVQciIsIm5hbWVMaXN0IiwibmQiLCJiaWdXaW5SZXN1bHRDb2luIiwibHQiLCJ4IiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJtb3ZlVG8iLCJ2MiIsInkiLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsInN0b3AiLCJpc09wZW4iLCJwMSIsInAyIiwidDEiLCJ0MiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxNQUFNLEdBQUcsR0FBZixFQUFvQjs7QUFDcEIsSUFBTUMsS0FBSyxHQUFHLEVBQWQsRUFBa0I7O0FBQ2xCLElBQU1DLE1BQU0sR0FBRyxDQUFDLEVBQUQsRUFBSyxJQUFMLEVBQVcsR0FBWCxFQUFnQixFQUFoQixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBWjtBQUNBLElBQU1DLFFBQVEsR0FBRyxDQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBcUMsSUFBckMsRUFBMkMsR0FBM0MsRUFBZ0QsR0FBaEQsRUFBcUQsSUFBckQsRUFBMkQsR0FBM0QsRUFBZ0UsR0FBaEUsRUFBcUUsSUFBckUsRUFBMkUsR0FBM0UsRUFBZ0YsR0FBaEYs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TCxFQUFFLENBQUNpTCxNQUFILENBQVVTLEVBQVYsRUFBYzFMLEVBQUUsQ0FBQ2tMLEVBQUgsQ0FBTU0sRUFBTixFQUFVLEtBQUtsSixTQUFMLENBQWU2SSxDQUF6QixDQUFkLENBREosRUFFSW5MLEVBQUUsQ0FBQ2lMLE1BQUgsQ0FBVVUsRUFBVixFQUFjM0wsRUFBRSxDQUFDa0wsRUFBSCxDQUFNTyxFQUFOLEVBQVUsS0FBS25KLFNBQUwsQ0FBZTZJLENBQXpCLENBQWQsQ0FGSixFQUdJbkwsRUFBRSxDQUFDcUwsUUFBSCxDQUFZLFlBQU07QUFDZCxNQUFBLE1BQUksQ0FBQ3JILFdBQUwsR0FBbUIsS0FBbkI7QUFDSCxLQUZELENBSEosQ0FESjtBQVNILEdBdnBCSTtBQXdwQkw7QUFDQTRCLEVBQUFBLGdCQXpwQkssOEJBeXBCYztBQUFBOztBQUNmLFFBQUksS0FBSzFCLFlBQVQsRUFBdUI7QUFDbkI7QUFDSDs7QUFDRCxTQUFLQSxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsUUFBSXNILEVBQUUsR0FBRyxLQUFLckgsV0FBTCxHQUFtQixDQUFuQixHQUF1QixHQUFoQztBQUNBLFNBQUszQixVQUFMLENBQWdCdUksU0FBaEIsQ0FDSS9LLEVBQUUsQ0FBQ2dMLFFBQUgsQ0FDSWhMLEVBQUUsQ0FBQ2lMLE1BQUgsQ0FBVSxHQUFWLEVBQWVqTCxFQUFFLENBQUNrTCxFQUFILENBQU0sS0FBSzFJLFVBQUwsQ0FBZ0JzSSxDQUF0QixFQUF5QlUsRUFBekIsQ0FBZixDQURKLEVBRUl4TCxFQUFFLENBQUNxTCxRQUFILENBQVksWUFBTTtBQUNkLE1BQUEsTUFBSSxDQUFDbkgsWUFBTCxHQUFvQixLQUFwQjtBQUNILEtBRkQsQ0FGSixDQURKO0FBUUg7QUF2cUJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJFVE5VTSA9IDIuNTsgLy/ljZXms6jlgLxcclxuY29uc3QgTElORVMgPSAyNTsgLy/nur/mlbBcclxuY29uc3QgVE9QQkVUID0gWzMwLCAxMDAwLCAxMDAsIDEwXTtcclxuY29uc3QgQkVUID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcclxuY29uc3QgUlVMRUxJU1QgPSBbMiwgMC4yLCAwLjEsIDEsIDAuMiwgMC4xLCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMywgMC42LCAwLjJdOyAvL+inhOWImVxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxibFVzZXJDb2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eUqOaIt+mHkeW4gScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxMaW5lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnur/mlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluZU5vZGU6IGNjLk5vZGUsLy/nlLvnur9cclxuICAgICAgICBsYmxDdXJCZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA5oC75rOoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibFdpbkNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5pys5bGA6LWi5b6XJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibENvaW5MaXN0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfliJflgI3njofmmL7npLonLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sZVBiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5rua6L2u6KeS6ImyUGInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BBdGxhczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVBdGxhcyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflm77pm4YnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXV0b0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5CdXR0b24sXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn6Ieq5Yqo5oyJ6ZKuJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFN0b3BBdXRvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflgZzmraLoh6rliqjmjInpkq4nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RhcnRCdG46IGNjLkJ1dHRvbiwvL+W8gOWni1xyXG4gICAgICAgIHN0b3BCdG46IGNjLkJ1dHRvbiwvL+WBnOatolxyXG4gICAgICAgIGN0cmxCdG46IFtjYy5CdXR0b25dLC8v6ZyA6KaB5o6n5Yi25byA5YWz55qE5oyJ6ZKuXHJcbiAgICAgICAgZWZmZWN0QW5pbVByOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW54m55pWIJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxCOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltQmlnRnVsbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWkp+WlluWFqOWxj+eJueaViCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmlnV2luTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+Wkp+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmlnV2luUmVzdWx0QW5pbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2JpZ1dpbuS4reWllidcclxuICAgICAgICB9LFxyXG4gICAgICAgIEJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a4uOaIj+iDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgICAgICBmcmVlQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVCZWdpbk5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflvIDlp4vlhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUVuZE5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnu5PmnZ/lhY3otLnmkYflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZyZWVUaW1lc05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbmmL7npLroioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaInLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhlbHBOdW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2i5Y+v5Y+Y5rOo5pWwJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpZ1dpblRpcDogY2MuTm9kZSwvL+S4reWlluaPkOekulxyXG4gICAgICAgIG1lbnVQYW5lbDogY2MuTm9kZSwvL+iPnOWNlVxyXG4gICAgICAgIGhlbHBQYW5lbDE6IGNjLk5vZGUsLy/luK7liqkxXHJcbiAgICAgICAgaGVscFBhbmVsMjogY2MuTm9kZSwvL+W4ruWKqTJcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5uZXQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdJbmRpYW5NeXRoTmV0d29yaycpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdJbmRpYW5NeXRoQXVkaW8nKTtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmV0ID0gMDtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gWzMsIDEsIDJdO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ2FyZCA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Db2luID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzID0gMDtcclxuICAgICAgICB0aGlzLnJvbGxSZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5sb3R0ZXJ5UmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICAvL+WKqOaViOebuOWFs1xyXG4gICAgICAgIHRoaXMuaXNEb2luZ01lbnUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzTWVudU9wZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzRG9pbmdIZWxwMiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNIZWxwMk9wZW4gPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxMaW5lcy5zdHJpbmcgPSBMSU5FUztcclxuICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gJzAuMDAnO1xyXG4gICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSB0aGlzLnBsYXllckluZm8ucGxheWVyQ29pbi50b0ZpeGVkKDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNMaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgc3dpdGNoIChhcmdzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhdXRvXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9CdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RvcEF1dG9CdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhdXRvU3RvcFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9CdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdG9wQXV0b0J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEJ0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicm9sbFwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYklzRnJlZUdhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN0b3BSb2xsXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEJ0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYWRkXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXQgKz0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gQkVULmxlbmd0aCA/IEJFVC5sZW5ndGggLSAxIDogdGhpcy5iZXQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkZWNcIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJldCAtPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSAwID8gdGhpcy5iZXQgOiAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYWRkTGluZVwiOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdWJMaW5lXCI6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlQmlnV2luXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImhlbHBcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgaHIgPSB0aGlzLmhlbHBOdW0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHJbaV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoUlVMRUxJU1RbaV0gKiBCRVRbdGhpcy5iZXRdKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZUhlbHBcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVscFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJleGl0R2FtZVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXQuc29ja2V0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkxvYmJ5TWFpblwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYXVkaW9cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sID0gIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcEF1ZGlvKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaWdXaW5Cb28pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1lbnVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubWVudUFjaXRvbih0aGlzLmlzTWVudU9wZW4pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJvcGVuTGluZUhlbHBcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNIZWxwMk9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwUGFuZWwyQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlTGluZUhlbHBcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNIZWxwMk9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVscFBhbmVsMkFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZUdhbWVcIjpcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW5kKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8v6K6+572u5Lqk5LqS5oyJ6ZKu55qE5Y+v55So5oCnXHJcbiAgICBzZXRCdG5Vc2FibGUoaXNVc2FibGUpIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuY3RybEJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLmN0cmxCdG5baV0uaW50ZXJhY3RhYmxlID0gaXNVc2FibGU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRCZXQoKSB7XHJcbiAgICAgICAgdGhpcy5sYmxDdXJCZXQuc3RyaW5nID0gKEJFVFt0aGlzLmJldF0gKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxibENvaW5MaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsQ29pbkxpc3RbaV0uc3RyaW5nID0gKFRPUEJFVFtpXSAqICh0aGlzLmJldCArIDEpICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGVDYWxsQmFjaygpIHtcclxuICAgICAgICBsZXQgc3QgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2ldLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgc3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAvL+e7k+adn+W9k+WJjei9ruebmFxyXG4gICAgICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy51c2Vyc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlXaW5BbmltKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LmJGbGFnKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkJvbyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luUmVzTGlzdCA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fbGlzdDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQ2FyZCA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fY2FyZDtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQ29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW47XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblJlc3VsdENvaW4gPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LnVzZXJfc2NvcmU7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5zdGFydEJpZ1dpbigpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUuYkZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRGcmVlR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcGxheVdpbkFuaW0oKSB7XHJcbiAgICAgICAgLy/liqjnlLvnu5PmnZ/lkI7oh6rliqhyb2xsXHJcbiAgICAgICAgbGV0IGhhc1dpbkJvb2wgPSAwO1xyXG4gICAgICAgIGxldCBhbGxMaW5lID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxMaW5lLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luTGluZXNEZXRhaWw7XHJcbiAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgIGxldCBsaXN0ID0gKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLnN0b3BGcmVlKSA/IFthbGxMaW5lLF0gOiBbYWxsTGluZSwgLi4ubGluZXNdO1xyXG4gICAgICAgIGhhc1dpbkJvb2wgPSBsaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKGhhc1dpbkJvb2wgPiAwKSB7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oGt5Zac5a2X5qC35Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJ3aW5fY25cIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvL+aSreaUvuaLm+i0oueMq+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbGJsX2NvaW4gPSB0aGlzLmVmZmVjdEFuaW1GdWxsQi5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBhZGRjb2luID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhZGRjb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDMwXHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkY29pbiA+IHRoaXMubG90dGVyeVJlcy53aW5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGNvaW4gPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYmxfY29pbi5zdHJpbmcgPSAoYWRkY29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgfSwgMCwgMzAsIDAuMDEpXHJcbiAgICAgICAgICAgIC8v5Yik5pat5pKt5pS+6YeR5biB5o6J6JC95Yqo55S7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgPiBCRVRbdGhpcy5iZXRdICogQkVUTlVNICogMTAwKSB7IC8v5aaC5p6c5aSn5LqOMTAw5YCN6LWM5rOo77yM5bCx5pKt5pS+YmlnRnVsbOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uMVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAhdGhpcy5hdXRvICYmIHRoaXMud2luQWNpdG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmltSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xzb2VBbmltKGkgJSA1LCBwYXJzZUludChpIC8gNSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEhIWxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSk7Ly/kv67mlLlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpLCB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmZNdWx0aXBsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbmltSW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDMsIGxpc3QubGVuZ3RoLCAwLjAxKVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ0blVzYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEJ0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcEJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9wRnJlZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZVRpbWVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLmZyZWVUaW1lcyA9PSAwICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGhhc1dpbkJvb2wgPiAwID8gaGFzV2luQm9vbCAqIDMgOiAyKVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgc3RhcnRGcmVlR2FtZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0RnJlZUdhbWVcIik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDEpO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU3RvcEF1dG9CdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmdldENoaWxkQnlOYW1lKCd0eHQnKS5nZXRDaGlsZEJ5TmFtZSgnTmV3IExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmZyZWVUaW1lcztcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlN0b3BBdXRvQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdG9wQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgLy8gfSwgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BGcmVlVGltZXMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdG9wRnJlZVRpbWVzIGZyZWVHYW1lQ29pbiA6IFwiLCB0aGlzLmZyZWVHYW1lQ29pbik7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5TdG9wQXV0b0J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9jb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuZnJlZUdhbWVDb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMik7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLzAtNSAwLTJcclxuICAgIHNob3dBbmltKGNvbHMsIGluZGV4LCBiZWlzaHUpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCVygpO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5wbGF5QW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSAmJiBiZWlzaHUgPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIGJlaXNodTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mt7vliqDnu5PmnZ9cclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xzb2VBbmltKGNvbHMsIGluZGV4KSB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnN0b3BBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mt7vliqDnu5PmnZ9cclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tSb2xsRGF0YShsaXN0KSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVyYXRvciBvZiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVyYXRvciA+PSB0aGlzLnJvbGVQYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9sbChsaXN0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrUm9sbERhdGEobGlzdCkpIHtcclxuICAgICAgICAgICAgYWxlcnQoYFxyXG4gICAgICAgICAgICDmnI3liqHlmajojrflj5bnmoToirHoibLnp43nsbvlpKfkuo7njrDmnInnmoToirHoibLnp43nsbvvvIHvvIHvvIFcclxuICAgICAgICAgICAg6K+36IGU57O75pyN5Yqh5Zmo5Lq65ZGY6L+b6KGM5pWw5o2u6LCD5pW077yBYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMTtcclxuICAgICAgICBsZXQgbGluZSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpbmVbaV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBsaXN0KSB7XHJcbiAgICAgICAgICAgIGxpbmVbaSAlIDVdWzIgLSBwYXJzZUludChpIC8gNSldID0gbGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdGFydFJvbGwoLi4ubGluZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZVNoaW5lKCkge1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgbm9kZUxpc3RbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZW5kUm9sbCgpIHtcclxuICAgICAgICB0aGlzLnJvbGxJbmRleCsrO1xyXG4gICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0QnRuVXNhYmxlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdG9wQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZW1pdCgnbG90dGVyeScsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgYmV0OiB0aGlzLmJldCxcclxuICAgICAgICAgICAgbkJldExpc3Q6IFtCRVRbdGhpcy5iZXRdICogQkVUTlVNICogMTAwLF1cclxuICAgICAgICB9KSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEJ0blVzYWJsZSh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5zdG9wSW1tZWRpYXRlbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRCaWdXaW4oKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDIpO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9ICF0aGlzLmF1dG87XHJcbiAgICAgICAgdGhpcy5TdG9wQXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRoaXMuYXV0bztcclxuICAgICAgICB0aGlzLkJpZ1dpblNldCA9IG5ldyBTZXQoKTtcclxuICAgICAgICB0aGlzLmJpZ1dpbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcHIgPSB0aGlzLmJpZ1dpbk5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBwcikge1xyXG4gICAgICAgICAgICBsZXQgcHIxID0gcHJbaV0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogaW4gcHIxKSB7XHJcbiAgICAgICAgICAgICAgICBwcjFbal0uYWN0aXZlID0gaiA9PSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBiaWdXaW5DbGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIGlmICh0aGlzLmJpZ1dpblRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgbnVtID0gdGhpcy5CaWdXaW5TZXQuc2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5CaWdXaW5TZXQuYWRkKGFyZ3MpO1xyXG4gICAgICAgICAgICBpZiAobnVtID09IHRoaXMuQmlnV2luU2V0LnNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgd2luTm9kZVByID0gdGhpcy5iaWdXaW5Ob2RlLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICB0aGlzLmJpZ1dpblRpbWVzLS07XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuYmlnV2luUmVzTGlzdFt0aGlzLmJpZ1dpblRpbWVzXTtcclxuICAgICAgICAgICAgbGV0IG5hbWVMaXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgMTA6ICdzX2JvbnVzX1NIMDBGX21pbm9yJyxcclxuICAgICAgICAgICAgICAgIDEwMDogJ3NfYm9udXNfU0gwMEZfbWVkaXVtJyxcclxuICAgICAgICAgICAgICAgIDEwMDA6ICdzX2JvbnVzX1NIMDBGX21lZ2EnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5kID0gd2luTm9kZVByW2FyZ3NdLmdldENoaWxkQnlOYW1lKG5hbWVMaXN0W2luZGV4XSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5kLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBuZC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJpZ1dpblRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpblJlc3VsdENvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmJpZ1dpbkNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmdldENoaWxkQnlOYW1lKCdjb2luJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5iaWdXaW5Db2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsdCA9IFsxMCwgMzAsIDEwMCwgMTAwMF07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uZ2V0Q2hpbGRCeU5hbWUoJycgKyBsdFtpXSkuYWN0aXZlID0gdGhpcy5iaWdXaW5DYXJkID09IGx0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpbkJvbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/kuK3lpZbliqjmlYg0OTAtNjM1XHJcbiAgICB3aW5BY2l0b24oKSB7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5UaXAueCA9IDYzNTtcclxuICAgICAgICB0aGlzLmJpZ1dpblRpcC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5UaXAucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjUsIGNjLnYyKDQ5MCwgdGhpcy5iaWdXaW5UaXAueSkpLFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNSwgY2MudjIoNjM1LCB0aGlzLmJpZ1dpblRpcC55KSksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5UaXAuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLy/oj5zljZXliqjmlYg2NzYtNDY2XHJcbiAgICBtZW51QWNpdG9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRG9pbmdNZW51KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc01lbnVPcGVuID0gIXRoaXMuaXNNZW51T3BlbjtcclxuICAgICAgICBsZXQgaXNPcGVuID0gdGhpcy5pc01lbnVPcGVuO1xyXG4gICAgICAgIHRoaXMuaXNEb2luZ01lbnUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBwMSwgcDIsIHQxLCB0MjtcclxuICAgICAgICBpZiAoaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIHAxID0gNDQ2O1xyXG4gICAgICAgICAgICBwMiA9IDQ2NjtcclxuICAgICAgICAgICAgdDEgPSAwLjM7XHJcbiAgICAgICAgICAgIHQyID0gMC4wNTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwMSA9IDQ0NjtcclxuICAgICAgICAgICAgcDIgPSA2NzY7XHJcbiAgICAgICAgICAgIHQxID0gMC4wNTtcclxuICAgICAgICAgICAgdDIgPSAwLjM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWVudVBhbmVsLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlVG8odDEsIGNjLnYyKHAxLCB0aGlzLm1lbnVQYW5lbC55KSksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlVG8odDIsIGNjLnYyKHAyLCB0aGlzLm1lbnVQYW5lbC55KSksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0RvaW5nTWVudSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLy/nlLvnur/op4TliJnluK7liqk2NDAtMFxyXG4gICAgaGVscFBhbmVsMkFjdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0RvaW5nSGVscDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzRG9pbmdIZWxwMiA9IHRydWU7XHJcbiAgICAgICAgbGV0IHAxID0gdGhpcy5pc0hlbHAyT3BlbiA/IDAgOiA2NDA7XHJcbiAgICAgICAgdGhpcy5oZWxwUGFuZWwyLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC40LCBjYy52Mih0aGlzLmhlbHBQYW5lbDIueCwgcDEpKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRG9pbmdIZWxwMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pOyJdfQ==