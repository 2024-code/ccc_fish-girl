
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/slot_iceland/js/IcelandMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0e274f1hWtJeIGbKUQ9KbJY', 'IcelandMain');
// Texture/slot_iceland/js/IcelandMain.js

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
    this.net = this.node.getComponent('IcelandNetwork');
    this.audio = this.node.getComponent('IcelandAudio');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcc2xvdF9pY2VsYW5kXFxqc1xcSWNlbGFuZE1haW4uanMiXSwibmFtZXMiOlsiQkVUTlVNIiwiTElORVMiLCJUT1BCRVQiLCJCRVQiLCJSVUxFTElTVCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibGJsVXNlckNvaW4iLCJ0eXBlIiwiTGFiZWwiLCJkaXNwbGF5TmFtZSIsImxibExpbmVzIiwibGluZU5vZGUiLCJOb2RlIiwibGJsQ3VyQmV0IiwibGJsV2luQ29pbiIsImxibENvaW5MaXN0Iiwicm9sZVBiIiwiUHJlZmFiIiwic3BBdGxhcyIsIlNwcml0ZUF0bGFzIiwiYXV0b0J0biIsIkJ1dHRvbiIsIlN0b3BBdXRvQnRuIiwic3RhcnRCdG4iLCJzdG9wQnRuIiwiY3RybEJ0biIsImVmZmVjdEFuaW1QciIsImVmZmVjdEFuaW1GdWxsQSIsImVmZmVjdEFuaW1GdWxsQiIsImVmZmVjdEFuaW1CaWdGdWxsIiwiYmlnV2luTm9kZSIsImJpZ1dpblJlc3VsdEFuaW0iLCJCZ05vZGUiLCJmcmVlQmdOb2RlIiwiZnJlZUJlZ2luTm9kZSIsImZyZWVFbmROb2RlIiwiZnJlZVRpbWVzTm9kZSIsImhlbHBVSSIsImhlbHBOdW0iLCJiaWdXaW5UaXAiLCJtZW51UGFuZWwiLCJoZWxwUGFuZWwxIiwiaGVscFBhbmVsMiIsIm9uTG9hZCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIm5ldCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJhdWRpbyIsIndoZWVsTGlzdCIsImJldCIsImF1dG8iLCJzdGF0dXMiLCJiaWdXaW5SZXNMaXN0IiwiYmlnV2luQ2FyZCIsImJpZ1dpbkNvaW4iLCJiaWdXaW5Cb28iLCJmcmVlVGltZXMiLCJyb2xsUmVzdWx0Iiwicm9sbEluZGV4IiwibG90dGVyeVJlcyIsInN0b3BGcmVlIiwiZnJlZUdhbWVDb2luIiwiYklzRnJlZUdhbWUiLCJpc0RvaW5nTWVudSIsImlzTWVudU9wZW4iLCJpc0RvaW5nSGVscDIiLCJpc0hlbHAyT3BlbiIsInN0YXJ0Iiwic3RyaW5nIiwic2V0QmV0IiwicGxheWVyQ29pbiIsInRvRml4ZWQiLCJvbkNMaWNrIiwiZXZlbnQiLCJhcmdzIiwiYWN0aXZlIiwic2VuZFJvbGwiLCJzdG9wSW1tZWRpYXRlbHkiLCJsZW5ndGgiLCJwbGF5QmdtIiwiaHIiLCJjaGlsZHJlbiIsImkiLCJzb2NrZXQiLCJkaXNjb25uZWN0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJwSW5mbyIsIm11c2ljQ29udHJvbCIsInN0b3BBdWRpbyIsIm1lbnVBY2l0b24iLCJoZWxwUGFuZWwyQWN0aW9uIiwiZ2FtZSIsImVuZCIsInNldEJ0blVzYWJsZSIsImlzVXNhYmxlIiwiaW50ZXJhY3RhYmxlIiwic3RhdGVDYWxsQmFjayIsInN0IiwickluZGV4IiwidXNlcnNjb3JlIiwid2luc2NvcmUiLCJzY2hlZHVsZU9uY2UiLCJwbGF5V2luQW5pbSIsInZpZXdhcnJheSIsImdldEZyZWVUaW1lIiwiYkZsYWciLCJuRnJlZVRpbWUiLCJjbG9zZVNoaW5lIiwic3RhcnRGcmVlR2FtZSIsImhhc1dpbkJvb2wiLCJhbGxMaW5lIiwibldpbkNhcmRzIiwicHVzaCIsImxpbmVzIiwibldpbkxpbmVzRGV0YWlsIiwibGlzdCIsInNwIiwiU2tlbGV0b24iLCJjbGVhclRyYWNrIiwic2V0QW5pbWF0aW9uIiwibGJsX2NvaW4iLCJnZXRDaGlsZEJ5TmFtZSIsImFkZGNvaW4iLCJzY2hlZHVsZSIsIndpbkFjaXRvbiIsImFuaW1JbmRleCIsImNsc29lQW5pbSIsInBhcnNlSW50IiwiaiIsInNob3dBbmltIiwiZk11bHRpcGxlIiwic3RvcEZyZWVUaW1lcyIsImNvbnNvbGUiLCJsb2ciLCJmcmVlSGlkZU5vZGUiLCJpbml0V2hlZWwiLCJjb2xzIiwiaW5kZXgiLCJiZWlzaHUiLCJwbGF5QlciLCJyb2xlSWRMaXN0Iiwicm9sZVBiTGlzdCIsInBsYXlBbmltIiwibm9kZUxpc3QiLCJBbmltYXRpb24iLCJwbGF5Iiwic3RvcEFuaW0iLCJjaGVja1JvbGxEYXRhIiwiaXRlcmF0b3IiLCJyb2xsIiwiYWxlcnQiLCJsaW5lIiwic3RhcnRSb2xsIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJuQmV0TGlzdCIsInN0YXJ0QmlnV2luIiwiQmlnV2luU2V0IiwiU2V0IiwicHIiLCJwcjEiLCJiaWdXaW5DbGljayIsImJpZ1dpblRpbWVzIiwibnVtIiwic2l6ZSIsImFkZCIsIndpbk5vZGVQciIsIm5hbWVMaXN0IiwibmQiLCJiaWdXaW5SZXN1bHRDb2luIiwibHQiLCJ4IiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJtb3ZlVG8iLCJ2MiIsInkiLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsInN0b3AiLCJpc09wZW4iLCJwMSIsInAyIiwidDEiLCJ0MiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxNQUFNLEdBQUcsR0FBZixFQUFvQjs7QUFDcEIsSUFBTUMsS0FBSyxHQUFHLEVBQWQsRUFBa0I7O0FBQ2xCLElBQU1DLE1BQU0sR0FBRyxDQUFDLEVBQUQsRUFBSyxJQUFMLEVBQVcsR0FBWCxFQUFnQixFQUFoQixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBWjtBQUNBLElBQU1DLFFBQVEsR0FBRyxDQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBcUMsSUFBckMsRUFBMkMsR0FBM0MsRUFBZ0QsR0FBaEQsRUFBcUQsSUFBckQsRUFBMkQsR0FBM0QsRUFBZ0UsR0FBaEUsRUFBcUUsSUFBckUsRUFBMkUsR0FBM0UsRUFBZ0YsR0FBaEYsRUFBcUYs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Q0FBQ2lMLE1BQUgsQ0FBVVMsRUFBVixFQUFjMUwsRUFBRSxDQUFDa0wsRUFBSCxDQUFNTSxFQUFOLEVBQVUsS0FBS2xKLFNBQUwsQ0FBZTZJLENBQXpCLENBQWQsQ0FESixFQUVJbkwsRUFBRSxDQUFDaUwsTUFBSCxDQUFVVSxFQUFWLEVBQWMzTCxFQUFFLENBQUNrTCxFQUFILENBQU1PLEVBQU4sRUFBVSxLQUFLbkosU0FBTCxDQUFlNkksQ0FBekIsQ0FBZCxDQUZKLEVBR0luTCxFQUFFLENBQUNxTCxRQUFILENBQVksWUFBTTtBQUNkLE1BQUEsTUFBSSxDQUFDckgsV0FBTCxHQUFtQixLQUFuQjtBQUNILEtBRkQsQ0FISixDQURKO0FBU0gsR0F2cEJJO0FBd3BCTDtBQUNBNEIsRUFBQUEsZ0JBenBCSyw4QkF5cEJjO0FBQUE7O0FBQ2YsUUFBSSxLQUFLMUIsWUFBVCxFQUF1QjtBQUNuQjtBQUNIOztBQUNELFNBQUtBLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxRQUFJc0gsRUFBRSxHQUFHLEtBQUtySCxXQUFMLEdBQW1CLENBQW5CLEdBQXVCLEdBQWhDO0FBQ0EsU0FBSzNCLFVBQUwsQ0FBZ0J1SSxTQUFoQixDQUNJL0ssRUFBRSxDQUFDZ0wsUUFBSCxDQUNJaEwsRUFBRSxDQUFDaUwsTUFBSCxDQUFVLEdBQVYsRUFBZWpMLEVBQUUsQ0FBQ2tMLEVBQUgsQ0FBTSxLQUFLMUksVUFBTCxDQUFnQnNJLENBQXRCLEVBQXlCVSxFQUF6QixDQUFmLENBREosRUFFSXhMLEVBQUUsQ0FBQ3FMLFFBQUgsQ0FBWSxZQUFNO0FBQ2QsTUFBQSxNQUFJLENBQUNuSCxZQUFMLEdBQW9CLEtBQXBCO0FBQ0gsS0FGRCxDQUZKLENBREo7QUFRSDtBQXZxQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQkVUTlVNID0gMi41OyAvL+WNleazqOWAvFxyXG5jb25zdCBMSU5FUyA9IDI1OyAvL+e6v+aVsFxyXG5jb25zdCBUT1BCRVQgPSBbMzAsIDEwMDAsIDEwMCwgMTBdO1xyXG5jb25zdCBCRVQgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xyXG5jb25zdCBSVUxFTElTVCA9IFsyLCAwLjIsIDAuMSwgMSwgMC4yLCAwLjEsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAzLCAwLjYsIDAuMl07IC8v6KeE5YiZXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbGJsVXNlckNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi36YeR5biBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibExpbmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e6v+aVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5lTm9kZTogY2MuTm9kZSwvL+eUu+e6v1xyXG4gICAgICAgIGxibEN1ckJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDmgLvms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsV2luQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDotaLlvpcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ29pbkxpc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WIl+WAjeeOh+aYvuekuicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xlUGI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmu5rova7op5LoibJQYicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcEF0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WbvumbhicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfoh6rliqjmjInpkq4nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU3RvcEF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WBnOatouiHquWKqOaMiemSricsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydEJ0bjogY2MuQnV0dG9uLC8v5byA5aeLXHJcbiAgICAgICAgc3RvcEJ0bjogY2MuQnV0dG9uLC8v5YGc5q2iXHJcbiAgICAgICAgY3RybEJ0bjogW2NjLkJ1dHRvbl0sLy/pnIDopoHmjqfliLblvIDlhbPnmoTmjInpkq5cclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aSn5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5SZXN1bHRBbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnYmlnV2lu5Lit5aWWJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5ri45oiP6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgICAgIGZyZWVCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbog4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUJlZ2luTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+W8gOWni+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlRW5kTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e7k+adn+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZnJlZVRpbWVzTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluaYvuekuuiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdoicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscE51bToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaLlj6/lj5jms6jmlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmlnV2luVGlwOiBjYy5Ob2RlLC8v5Lit5aWW5o+Q56S6XHJcbiAgICAgICAgbWVudVBhbmVsOiBjYy5Ob2RlLC8v6I+c5Y2VXHJcbiAgICAgICAgaGVscFBhbmVsMTogY2MuTm9kZSwvL+W4ruWKqTFcclxuICAgICAgICBoZWxwUGFuZWwyOiBjYy5Ob2RlLC8v5biu5YqpMlxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ0ljZWxhbmROZXR3b3JrJyk7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ0ljZWxhbmRBdWRpbycpO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSBbMywgMSwgMl07XHJcbiAgICAgICAgdGhpcy5iaWdXaW5DYXJkID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXMgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sbFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxvdHRlcnlSZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIC8v5Yqo5pWI55u45YWzXHJcbiAgICAgICAgdGhpcy5pc0RvaW5nTWVudSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNNZW51T3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNEb2luZ0hlbHAyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0hlbHAyT3BlbiA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxibExpbmVzLnN0cmluZyA9IExJTkVTO1xyXG4gICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJDb2luLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ0xpY2soZXZlbnQsIGFyZ3MpIHtcclxuICAgICAgICBzd2l0Y2ggKGFyZ3MpIHtcclxuICAgICAgICAgICAgY2FzZSBcImF1dG9cIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdG9wQXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImF1dG9TdG9wXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0b3BBdXRvQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJyb2xsXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic3RvcFJvbGxcIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhZGRcIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJldCArPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSBCRVQubGVuZ3RoID8gQkVULmxlbmd0aCAtIDEgOiB0aGlzLmJldDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRlY1wiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYmV0IC09IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhZGRMaW5lXCI6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1YkxpbmVcIjpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VCaWdXaW5cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBociA9IHRoaXMuaGVscE51bS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gaHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBocltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChSVUxFTElTVFtpXSAqIEJFVFt0aGlzLmJldF0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlSGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImV4aXRHYW1lXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhdWRpb1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPSAhdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2w7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zdG9wQXVkaW8oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibWVudVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51QWNpdG9uKHRoaXMuaXNNZW51T3Blbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm9wZW5MaW5lSGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0hlbHAyT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBQYW5lbDJBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VMaW5lSGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0hlbHAyT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwUGFuZWwyQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlR2FtZVwiOlxyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbmQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLy/orr7nva7kuqTkupLmjInpkq7nmoTlj6/nlKjmgKdcclxuICAgIHNldEJ0blVzYWJsZShpc1VzYWJsZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5jdHJsQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3RybEJ0bltpXS5pbnRlcmFjdGFibGUgPSBpc1VzYWJsZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEJldCgpIHtcclxuICAgICAgICB0aGlzLmxibEN1ckJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGJsQ29pbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luTGlzdFtpXS5zdHJpbmcgPSAoVE9QQkVUW2ldICogKHRoaXMuYmV0ICsgMSkgKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVdpbkFuaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3guYkZsYWcpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQm9vID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0O1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5DYXJkID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9jYXJkO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5Db2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LndpbjtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luUmVzdWx0Q29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkudXNlcl9zY29yZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLnN0YXJ0QmlnV2luKCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9LCAyKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEZyZWVHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5V2luQW5pbSgpIHtcclxuICAgICAgICAvL+WKqOeUu+e7k+adn+WQjuiHquWKqHJvbGxcclxuICAgICAgICBsZXQgaGFzV2luQm9vbCA9IDA7XHJcbiAgICAgICAgbGV0IGFsbExpbmUgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHNbaV0pIHtcclxuICAgICAgICAgICAgICAgIGFsbExpbmUucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGluZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5MaW5lc0RldGFpbDtcclxuICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgbGV0IGxpc3QgPSAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuc3RvcEZyZWUpID8gW2FsbExpbmUsXSA6IFthbGxMaW5lLCAuLi5saW5lc107XHJcbiAgICAgICAgaGFzV2luQm9vbCA9IGxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoaGFzV2luQm9vbCA+IDApIHtcclxuICAgICAgICAgICAgLy/mkq3mlL7mga3llpzlrZfmoLfliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcIndpbl9jblwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oub6LSi54yr5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBsYmxfY29pbiA9IHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbGV0IGFkZGNvaW4gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZGNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMzBcclxuICAgICAgICAgICAgICAgIGlmIChhZGRjb2luID4gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkY29pbiA9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxibF9jb2luLnN0cmluZyA9IChhZGRjb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9LCAwLCAzMCwgMC4wMSlcclxuICAgICAgICAgICAgLy/liKTmlq3mkq3mlL7ph5HluIHmjonokL3liqjnlLtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSA+IEJFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDApIHsgLy/lpoLmnpzlpKfkuo4xMDDlgI3otYzms6jvvIzlsLHmkq3mlL5iaWdGdWxs5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb24xXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICF0aGlzLmF1dG8gJiYgdGhpcy53aW5BY2l0b24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFuaW1JbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNvZUFuaW0oaSAlIDUsIHBhcnNlSW50KGkgLyA1KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISEhbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpKTsvL+S/ruaUuVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSksIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZk11bHRpcGxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFuaW1JbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMywgbGlzdC5sZW5ndGgsIDAuMDEpXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnRuVXNhYmxlKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3BGcmVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlVGltZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuZnJlZVRpbWVzID09IDAgJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaGFzV2luQm9vbCA+IDAgPyBoYXNXaW5Cb29sICogMyA6IDIpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICBzdGFydEZyZWVHYW1lKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRGcmVlR2FtZVwiKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5TdG9wQXV0b0J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU3RvcEF1dG9CdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAvLyB9LCAyKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEZyZWVUaW1lcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0b3BGcmVlVGltZXMgZnJlZUdhbWVDb2luIDogXCIsIHRoaXMuZnJlZUdhbWVDb2luKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlN0b3BBdXRvQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5mcmVlR2FtZUNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICB9LCAyKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vMC01IDAtMlxyXG4gICAgc2hvd0FuaW0oY29scywgaW5kZXgsIGJlaXNodSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJXKCk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnBsYXlBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpICYmIGJlaXNodSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmVpc2h1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikuc3RvcEFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JvbGxEYXRhKGxpc3QpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yID49IHRoaXMucm9sZVBiLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICByb2xsKGxpc3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tSb2xsRGF0YShsaXN0KSkge1xyXG4gICAgICAgICAgICBhbGVydChgXHJcbiAgICAgICAgICAgIOacjeWKoeWZqOiOt+WPlueahOiKseiJsuenjeexu+Wkp+S6jueOsOacieeahOiKseiJsuenjeexu++8ge+8ge+8gVxyXG4gICAgICAgICAgICDor7fogZTns7vmnI3liqHlmajkurrlkZjov5vooYzmlbDmja7osIPmlbTvvIFgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIGxpc3QpIHtcclxuICAgICAgICAgICAgbGluZVtpICUgNV1bMiAtIHBhcnNlSW50KGkgLyA1KV0gPSBsaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0YXJ0Um9sbCguLi5saW5lW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlU2hpbmUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRSb2xsKCkge1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5Vc2FibGUoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdsb3R0ZXJ5JywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBiZXQ6IHRoaXMuYmV0LFxyXG4gICAgICAgICAgICBuQmV0TGlzdDogW0JFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDAsXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnRuVXNhYmxlKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydEJpZ1dpbigpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLm5vZGUuYWN0aXZlID0gIXRoaXMuYXV0bztcclxuICAgICAgICB0aGlzLlN0b3BBdXRvQnRuLm5vZGUuYWN0aXZlID0gdGhpcy5hdXRvO1xyXG4gICAgICAgIHRoaXMuQmlnV2luU2V0ID0gbmV3IFNldCgpO1xyXG4gICAgICAgIHRoaXMuYmlnV2luTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBwciA9IHRoaXMuYmlnV2luTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHByKSB7XHJcbiAgICAgICAgICAgIGxldCBwcjEgPSBwcltpXS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBwcjEpIHtcclxuICAgICAgICAgICAgICAgIHByMVtqXS5hY3RpdmUgPSBqID09IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGJpZ1dpbkNsaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYmlnV2luVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSB0aGlzLkJpZ1dpblNldC5zaXplO1xyXG4gICAgICAgICAgICB0aGlzLkJpZ1dpblNldC5hZGQoYXJncyk7XHJcbiAgICAgICAgICAgIGlmIChudW0gPT0gdGhpcy5CaWdXaW5TZXQuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB3aW5Ob2RlUHIgPSB0aGlzLmJpZ1dpbk5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luVGltZXMtLTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5iaWdXaW5SZXNMaXN0W3RoaXMuYmlnV2luVGltZXNdO1xyXG4gICAgICAgICAgICBsZXQgbmFtZUxpc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAxMDogJ3NfYm9udXNfU0gwMEZfbWlub3InLFxyXG4gICAgICAgICAgICAgICAgMTAwOiAnc19ib251c19TSDAwRl9tZWRpdW0nLFxyXG4gICAgICAgICAgICAgICAgMTAwMDogJ3NfYm9udXNfU0gwMEZfbWVnYSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbmQgPSB3aW5Ob2RlUHJbYXJnc10uZ2V0Q2hpbGRCeU5hbWUobmFtZUxpc3RbaW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5kLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICAgICAgfSwgMC41KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmlnV2luVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luUmVzdWx0Q29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uZ2V0Q2hpbGRCeU5hbWUoJ2NvaW4nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLmJpZ1dpbkNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGx0ID0gWzEwLCAzMCwgMTAwLCAxMDAwXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5nZXRDaGlsZEJ5TmFtZSgnJyArIGx0W2ldKS5hY3RpdmUgPSB0aGlzLmJpZ1dpbkNhcmQgPT0gbHRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+S4reWlluWKqOaViDQ5MC02MzVcclxuICAgIHdpbkFjaXRvbigpIHtcclxuICAgICAgICB0aGlzLmJpZ1dpblRpcC54ID0gNjM1O1xyXG4gICAgICAgIHRoaXMuYmlnV2luVGlwLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICB0aGlzLmJpZ1dpblRpcC5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNSwgY2MudjIoNDkwLCB0aGlzLmJpZ1dpblRpcC55KSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC41LCBjYy52Mig2MzUsIHRoaXMuYmlnV2luVGlwLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblRpcC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvL+iPnOWNleWKqOaViDY3Ni00NjZcclxuICAgIG1lbnVBY2l0b24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEb2luZ01lbnUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzTWVudU9wZW4gPSAhdGhpcy5pc01lbnVPcGVuO1xyXG4gICAgICAgIGxldCBpc09wZW4gPSB0aGlzLmlzTWVudU9wZW47XHJcbiAgICAgICAgdGhpcy5pc0RvaW5nTWVudSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHAxLCBwMiwgdDEsIHQyO1xyXG4gICAgICAgIGlmIChpc09wZW4pIHtcclxuICAgICAgICAgICAgcDEgPSA0NDY7XHJcbiAgICAgICAgICAgIHAyID0gNDY2O1xyXG4gICAgICAgICAgICB0MSA9IDAuMztcclxuICAgICAgICAgICAgdDIgPSAwLjA1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAxID0gNDQ2O1xyXG4gICAgICAgICAgICBwMiA9IDY3NjtcclxuICAgICAgICAgICAgdDEgPSAwLjA1O1xyXG4gICAgICAgICAgICB0MiA9IDAuMztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tZW51UGFuZWwucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbyh0MSwgY2MudjIocDEsIHRoaXMubWVudVBhbmVsLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbyh0MiwgY2MudjIocDIsIHRoaXMubWVudVBhbmVsLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRG9pbmdNZW51ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvL+eUu+e6v+inhOWImeW4ruWKqTY0MC0wXHJcbiAgICBoZWxwUGFuZWwyQWN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRG9pbmdIZWxwMikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNEb2luZ0hlbHAyID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcDEgPSB0aGlzLmlzSGVscDJPcGVuID8gMCA6IDY0MDtcclxuICAgICAgICB0aGlzLmhlbHBQYW5lbDIucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjQsIGNjLnYyKHRoaXMuaGVscFBhbmVsMi54LCBwMSkpLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNEb2luZ0hlbHAyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7Il19