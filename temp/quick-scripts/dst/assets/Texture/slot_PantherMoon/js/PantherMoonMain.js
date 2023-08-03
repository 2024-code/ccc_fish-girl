
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/slot_PantherMoon/js/PantherMoonMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ece47lUxH9DfJVjXaMfDsEP', 'PantherMoonMain');
// Texture/slot_PantherMoon/js/PantherMoonMain.js

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
    this.net = this.node.getComponent('PantherMoonNetwork');
    this.audio = this.node.getComponent('PantherMoonAudio');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcc2xvdF9QYW50aGVyTW9vblxcanNcXFBhbnRoZXJNb29uTWFpbi5qcyJdLCJuYW1lcyI6WyJCRVROVU0iLCJMSU5FUyIsIlRPUEJFVCIsIkJFVCIsIlJVTEVMSVNUIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYmxVc2VyQ29pbiIsInR5cGUiLCJMYWJlbCIsImRpc3BsYXlOYW1lIiwibGJsTGluZXMiLCJsaW5lTm9kZSIsIk5vZGUiLCJsYmxDdXJCZXQiLCJsYmxXaW5Db2luIiwibGJsQ29pbkxpc3QiLCJyb2xlUGIiLCJQcmVmYWIiLCJzcEF0bGFzIiwiU3ByaXRlQXRsYXMiLCJhdXRvQnRuIiwiQnV0dG9uIiwiU3RvcEF1dG9CdG4iLCJzdGFydEJ0biIsInN0b3BCdG4iLCJjdHJsQnRuIiwiZWZmZWN0QW5pbVByIiwiZWZmZWN0QW5pbUZ1bGxBIiwiZWZmZWN0QW5pbUZ1bGxCIiwiZWZmZWN0QW5pbUJpZ0Z1bGwiLCJiaWdXaW5Ob2RlIiwiYmlnV2luUmVzdWx0QW5pbSIsIkJnTm9kZSIsImZyZWVCZ05vZGUiLCJmcmVlQmVnaW5Ob2RlIiwiZnJlZUVuZE5vZGUiLCJmcmVlVGltZXNOb2RlIiwiaGVscFVJIiwiaGVscE51bSIsImJpZ1dpblRpcCIsIm1lbnVQYW5lbCIsImhlbHBQYW5lbDEiLCJoZWxwUGFuZWwyIiwib25Mb2FkIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwibmV0Iiwibm9kZSIsImdldENvbXBvbmVudCIsImF1ZGlvIiwid2hlZWxMaXN0IiwiYmV0IiwiYXV0byIsInN0YXR1cyIsImJpZ1dpblJlc0xpc3QiLCJiaWdXaW5DYXJkIiwiYmlnV2luQ29pbiIsImJpZ1dpbkJvbyIsImZyZWVUaW1lcyIsInJvbGxSZXN1bHQiLCJyb2xsSW5kZXgiLCJsb3R0ZXJ5UmVzIiwic3RvcEZyZWUiLCJmcmVlR2FtZUNvaW4iLCJiSXNGcmVlR2FtZSIsImlzRG9pbmdNZW51IiwiaXNNZW51T3BlbiIsImlzRG9pbmdIZWxwMiIsImlzSGVscDJPcGVuIiwic3RhcnQiLCJzdHJpbmciLCJzZXRCZXQiLCJwbGF5ZXJDb2luIiwidG9GaXhlZCIsIm9uQ0xpY2siLCJldmVudCIsImFyZ3MiLCJhY3RpdmUiLCJzZW5kUm9sbCIsInN0b3BJbW1lZGlhdGVseSIsImxlbmd0aCIsInBsYXlCZ20iLCJociIsImNoaWxkcmVuIiwiaSIsInNvY2tldCIsImRpc2Nvbm5lY3QiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInBJbmZvIiwibXVzaWNDb250cm9sIiwic3RvcEF1ZGlvIiwibWVudUFjaXRvbiIsImhlbHBQYW5lbDJBY3Rpb24iLCJnYW1lIiwiZW5kIiwic2V0QnRuVXNhYmxlIiwiaXNVc2FibGUiLCJpbnRlcmFjdGFibGUiLCJzdGF0ZUNhbGxCYWNrIiwic3QiLCJySW5kZXgiLCJ1c2Vyc2NvcmUiLCJ3aW5zY29yZSIsInNjaGVkdWxlT25jZSIsInBsYXlXaW5BbmltIiwidmlld2FycmF5IiwiZ2V0RnJlZVRpbWUiLCJiRmxhZyIsIm5GcmVlVGltZSIsImNsb3NlU2hpbmUiLCJzdGFydEZyZWVHYW1lIiwiaGFzV2luQm9vbCIsImFsbExpbmUiLCJuV2luQ2FyZHMiLCJwdXNoIiwibGluZXMiLCJuV2luTGluZXNEZXRhaWwiLCJsaXN0Iiwic3AiLCJTa2VsZXRvbiIsImNsZWFyVHJhY2siLCJzZXRBbmltYXRpb24iLCJsYmxfY29pbiIsImdldENoaWxkQnlOYW1lIiwiYWRkY29pbiIsInNjaGVkdWxlIiwid2luQWNpdG9uIiwiYW5pbUluZGV4IiwiY2xzb2VBbmltIiwicGFyc2VJbnQiLCJqIiwic2hvd0FuaW0iLCJmTXVsdGlwbGUiLCJzdG9wRnJlZVRpbWVzIiwiY29uc29sZSIsImxvZyIsImZyZWVIaWRlTm9kZSIsImluaXRXaGVlbCIsImNvbHMiLCJpbmRleCIsImJlaXNodSIsInBsYXlCVyIsInJvbGVJZExpc3QiLCJyb2xlUGJMaXN0IiwicGxheUFuaW0iLCJub2RlTGlzdCIsIkFuaW1hdGlvbiIsInBsYXkiLCJzdG9wQW5pbSIsImNoZWNrUm9sbERhdGEiLCJpdGVyYXRvciIsInJvbGwiLCJhbGVydCIsImxpbmUiLCJzdGFydFJvbGwiLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsIm5CZXRMaXN0Iiwic3RhcnRCaWdXaW4iLCJCaWdXaW5TZXQiLCJTZXQiLCJwciIsInByMSIsImJpZ1dpbkNsaWNrIiwiYmlnV2luVGltZXMiLCJudW0iLCJzaXplIiwiYWRkIiwid2luTm9kZVByIiwibmFtZUxpc3QiLCJuZCIsImJpZ1dpblJlc3VsdENvaW4iLCJsdCIsIngiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsIm1vdmVUbyIsInYyIiwieSIsImRlbGF5VGltZSIsImNhbGxGdW5jIiwic3RvcCIsImlzT3BlbiIsInAxIiwicDIiLCJ0MSIsInQyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLE1BQU0sR0FBRyxHQUFmLEVBQW9COztBQUNwQixJQUFNQyxLQUFLLEdBQUcsRUFBZCxFQUFrQjs7QUFDbEIsSUFBTUMsTUFBTSxHQUFHLENBQUMsRUFBRCxFQUFLLElBQUwsRUFBVyxHQUFYLEVBQWdCLEVBQWhCLENBQWY7QUFDQSxJQUFNQyxHQUFHLEdBQUcsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixFQUE1QixDQUFaO0FBQ0EsSUFBTUMsUUFBUSxHQUFHLENBQUMsQ0FBRCxFQUFJLEdBQUosRUFBUyxHQUFULEVBQWMsQ0FBZCxFQUFpQixHQUFqQixFQUFzQixHQUF0QixFQUEyQixHQUEzQixFQUFnQyxHQUFoQyxFQUFxQyxJQUFyQyxFQUEyQyxHQUEzQyxFQUFnRCxHQUFoRCxFQUFxRCxJQUFyRCxFQUEyRCxHQUEzRCxFQUFnRSxHQUFoRSxFQUFxRSxJQUFyRSxFQUEyRSxHQUEzRSxFQUFnRixHQUFo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SWhMLEVBQUUsQ0FBQ2lMLE1BQUgsQ0FBVVMsRUFBVixFQUFjMUwsRUFBRSxDQUFDa0wsRUFBSCxDQUFNTSxFQUFOLEVBQVUsS0FBS2xKLFNBQUwsQ0FBZTZJLENBQXpCLENBQWQsQ0FESixFQUVJbkwsRUFBRSxDQUFDaUwsTUFBSCxDQUFVVSxFQUFWLEVBQWMzTCxFQUFFLENBQUNrTCxFQUFILENBQU1PLEVBQU4sRUFBVSxLQUFLbkosU0FBTCxDQUFlNkksQ0FBekIsQ0FBZCxDQUZKLEVBR0luTCxFQUFFLENBQUNxTCxRQUFILENBQVksWUFBTTtBQUNkLE1BQUEsTUFBSSxDQUFDckgsV0FBTCxHQUFtQixLQUFuQjtBQUNILEtBRkQsQ0FISixDQURKO0FBU0gsR0F2cEJJO0FBd3BCTDtBQUNBNEIsRUFBQUEsZ0JBenBCSyw4QkF5cEJjO0FBQUE7O0FBQ2YsUUFBSSxLQUFLMUIsWUFBVCxFQUF1QjtBQUNuQjtBQUNIOztBQUNELFNBQUtBLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxRQUFJc0gsRUFBRSxHQUFHLEtBQUtySCxXQUFMLEdBQW1CLENBQW5CLEdBQXVCLEdBQWhDO0FBQ0EsU0FBSzNCLFVBQUwsQ0FBZ0J1SSxTQUFoQixDQUNJL0ssRUFBRSxDQUFDZ0wsUUFBSCxDQUNJaEwsRUFBRSxDQUFDaUwsTUFBSCxDQUFVLEdBQVYsRUFBZWpMLEVBQUUsQ0FBQ2tMLEVBQUgsQ0FBTSxLQUFLMUksVUFBTCxDQUFnQnNJLENBQXRCLEVBQXlCVSxFQUF6QixDQUFmLENBREosRUFFSXhMLEVBQUUsQ0FBQ3FMLFFBQUgsQ0FBWSxZQUFNO0FBQ2QsTUFBQSxNQUFJLENBQUNuSCxZQUFMLEdBQW9CLEtBQXBCO0FBQ0gsS0FGRCxDQUZKLENBREo7QUFRSDtBQXZxQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQkVUTlVNID0gMi41OyAvL+WNleazqOWAvFxyXG5jb25zdCBMSU5FUyA9IDI1OyAvL+e6v+aVsFxyXG5jb25zdCBUT1BCRVQgPSBbMzAsIDEwMDAsIDEwMCwgMTBdO1xyXG5jb25zdCBCRVQgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xyXG5jb25zdCBSVUxFTElTVCA9IFsyLCAwLjIsIDAuMSwgMSwgMC4yLCAwLjEsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAzLCAwLjYsIDAuMl07IC8v6KeE5YiZXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbGJsVXNlckNvaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn55So5oi36YeR5biBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxibExpbmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e6v+aVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5lTm9kZTogY2MuTm9kZSwvL+eUu+e6v1xyXG4gICAgICAgIGxibEN1ckJldDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDmgLvms6gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsV2luQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmnKzlsYDotaLlvpcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsQ29pbkxpc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WIl+WAjeeOh+aYvuekuicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xlUGI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmu5rova7op5LoibJQYicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcEF0bGFzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WbvumbhicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRvQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvbixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfoh6rliqjmjInpkq4nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU3RvcEF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WBnOatouiHquWKqOaMiemSricsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydEJ0bjogY2MuQnV0dG9uLC8v5byA5aeLXHJcbiAgICAgICAgc3RvcEJ0bjogY2MuQnV0dG9uLC8v5YGc5q2iXHJcbiAgICAgICAgY3RybEJ0bjogW2NjLkJ1dHRvbl0sLy/pnIDopoHmjqfliLblvIDlhbPnmoTmjInpkq5cclxuICAgICAgICBlZmZlY3RBbmltUHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZbnibnmlYgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUZ1bGxBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aWW5YWo5bGP54m55pWIQScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhCJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1CaWdGdWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Lit5aSn5aWW5YWo5bGP54m55pWIJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5aSn5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaWdXaW5SZXN1bHRBbmltOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnYmlnV2lu5Lit5aWWJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5ri45oiP6IOM5pmv6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL+WFjei0ueasoeaVsOacieWFs1xyXG4gICAgICAgIGZyZWVCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflhY3otLnmkYflpZbog4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnJlZUJlZ2luTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+W8gOWni+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlRW5kTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+e7k+adn+WFjei0ueaRh+WlluiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZnJlZVRpbWVzTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluaYvuekuuiKgueCuScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdoicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscE51bToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2hlbHDnlYzpnaLlj6/lj5jms6jmlbAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmlnV2luVGlwOiBjYy5Ob2RlLC8v5Lit5aWW5o+Q56S6XHJcbiAgICAgICAgbWVudVBhbmVsOiBjYy5Ob2RlLC8v6I+c5Y2VXHJcbiAgICAgICAgaGVscFBhbmVsMTogY2MuTm9kZSwvL+W4ruWKqTFcclxuICAgICAgICBoZWxwUGFuZWwyOiBjYy5Ob2RlLC8v5biu5YqpMlxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgICAgICB0aGlzLm5ldCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1BhbnRoZXJNb29uTmV0d29yaycpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdQYW50aGVyTW9vbkF1ZGlvJyk7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmJldCA9IDA7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luUmVzTGlzdCA9IFszLCAxLCAyXTtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNhcmQgPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IDA7XHJcbiAgICAgICAgdGhpcy5yb2xsUmVzdWx0ID0gW107XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMubG90dGVyeVJlcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUdhbWVDb2luID0gMDtcclxuICAgICAgICB0aGlzLmJJc0ZyZWVHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgLy/liqjmlYjnm7jlhbNcclxuICAgICAgICB0aGlzLmlzRG9pbmdNZW51ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc01lbnVPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0RvaW5nSGVscDIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzSGVscDJPcGVuID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubGJsTGluZXMuc3RyaW5nID0gTElORVM7XHJcbiAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICcwLjAwJztcclxuICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllckNvaW4udG9GaXhlZCgyKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DTGljayhldmVudCwgYXJncykge1xyXG4gICAgICAgIHN3aXRjaCAoYXJncykge1xyXG4gICAgICAgICAgICBjYXNlIFwiYXV0b1wiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYklzRnJlZUdhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0b3BBdXRvQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEJ0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYXV0b1N0b3BcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RvcEF1dG9CdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInJvbGxcIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdG9wUm9sbFwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYklzRnJlZUdhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImFkZFwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYmV0ICs9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IEJFVC5sZW5ndGggPyBCRVQubGVuZ3RoIC0gMSA6IHRoaXMuYmV0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZGVjXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXQgLT0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgPj0gMCA/IHRoaXMuYmV0IDogMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImFkZExpbmVcIjpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic3ViTGluZVwiOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZUJpZ1dpblwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJoZWxwXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhyID0gdGhpcy5oZWxwTnVtLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBocikge1xyXG4gICAgICAgICAgICAgICAgICAgIGhyW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKFJVTEVMSVNUW2ldICogQkVUW3RoaXMuYmV0XSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VIZWxwXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZXhpdEdhbWVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV0LnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieU1haW5cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImF1ZGlvXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbCA9ICF0aGlzLmF1ZGlvLnBJbmZvLm11c2ljQ29udHJvbDtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnN0b3BBdWRpbygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYmlnV2luQm9vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtZW51XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVBY2l0b24odGhpcy5pc01lbnVPcGVuKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwib3BlbkxpbmVIZWxwXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzSGVscDJPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVscFBhbmVsMkFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZUxpbmVIZWxwXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzSGVscDJPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBQYW5lbDJBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VHYW1lXCI6XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVuZCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvL+iuvue9ruS6pOS6kuaMiemSrueahOWPr+eUqOaAp1xyXG4gICAgc2V0QnRuVXNhYmxlKGlzVXNhYmxlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmN0cmxCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5jdHJsQnRuW2ldLmludGVyYWN0YWJsZSA9IGlzVXNhYmxlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0QmV0KCkge1xyXG4gICAgICAgIHRoaXMubGJsQ3VyQmV0LnN0cmluZyA9IChCRVRbdGhpcy5iZXRdICogQkVUTlVNKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sYmxDb2luTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxibENvaW5MaXN0W2ldLnN0cmluZyA9IChUT1BCRVRbaV0gKiAodGhpcy5iZXQgKyAxKSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRlQ2FsbEJhY2soKSB7XHJcbiAgICAgICAgbGV0IHN0ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtpXS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIHN0ID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3Q7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgLy/nu5PmnZ/lvZPliY3ova7nm5hcclxuICAgICAgICAgICAgbGV0IHJJbmRleCA9IHRoaXMucm9sbEluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMudXNlcnNjb3JlIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYklzRnJlZUdhbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZUdhbWVDb2luICs9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5V2luQW5pbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC5iRmxhZykge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5Cb28gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5UaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0T3BlbkJveC53aW5fbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3Q7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkNhcmQgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2NhcmQ7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJpZ1dpbkNvaW4gPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5SZXN1bHRDb2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS51c2VyX3Njb3JlO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuc3RhcnRCaWdXaW4oKTtcclxuICAgICAgICAgICAgLy8gICAgIH0sIDIpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLmJGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVCZWdpbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RnJlZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldEZyZWVUaW1lLm5GcmVlVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlXaW5BbmltKCkge1xyXG4gICAgICAgIC8v5Yqo55S757uT5p2f5ZCO6Ieq5Yqocm9sbFxyXG4gICAgICAgIGxldCBoYXNXaW5Cb29sID0gMDtcclxuICAgICAgICBsZXQgYWxsTGluZSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkNhcmRzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgYWxsTGluZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkubldpbkxpbmVzRGV0YWlsO1xyXG4gICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICBsZXQgbGlzdCA9ICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5zdG9wRnJlZSkgPyBbYWxsTGluZSxdIDogW2FsbExpbmUsIC4uLmxpbmVzXTtcclxuICAgICAgICBoYXNXaW5Cb29sID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChoYXNXaW5Cb29sID4gMCkge1xyXG4gICAgICAgICAgICAvL+aSreaUvuaBreWWnOWtl+agt+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwid2luX2NuXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy/mkq3mlL7mi5votKLnjKvliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGxibF9jb2luID0gdGhpcy5lZmZlY3RBbmltRnVsbEIuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgYWRkY29pbiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkY29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAzMFxyXG4gICAgICAgICAgICAgICAgaWYgKGFkZGNvaW4gPiB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRjb2luID0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGJsX2NvaW4uc3RyaW5nID0gKGFkZGNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIH0sIDAsIDMwLCAwLjAxKVxyXG4gICAgICAgICAgICAvL+WIpOaWreaSreaUvumHkeW4geaOieiQveWKqOeUu1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlID4gQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqIDEwMCkgeyAvL+WmguaenOWkp+S6jjEwMOWAjei1jOazqO+8jOWwseaSreaUvmJpZ0Z1bGzliqjnlLtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvbjFcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIXRoaXMuYXV0byAmJiB0aGlzLndpbkFjaXRvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc29lQW5pbShpICUgNSwgcGFyc2VJbnQoaSAvIDUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghISFsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIGxpc3RbYW5pbUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSkpOy8v5L+u5pS5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QW5pbShsaXN0W2FuaW1JbmRleF1bal0gJSA1LCBwYXJzZUludChsaXN0W2FuaW1JbmRleF1bal0gLyA1KSwgdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5mTXVsdGlwbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYW5pbUluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAzLCBsaXN0Lmxlbmd0aCwgMC4wMSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdG5Vc2FibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWVUaW1lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlVGltZXMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEZyZWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAockluZGV4ID09IHRoaXMucm9sbEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gJiYgdGhpcy5mcmVlVGltZXMgPT0gMCAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBoYXNXaW5Cb29sID4gMCA/IGhhc1dpbkJvb2wgKiAzIDogMilcclxuICAgIH0sXHJcblxyXG4gICAgLy/lhY3otLnmrKHmlbDmnInlhbNcclxuICAgIHN0YXJ0RnJlZUdhbWUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydEZyZWVHYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgxKTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5CZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcmVlQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlN0b3BBdXRvQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uaW5pdFdoZWVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZVRpbWVzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0JykuZ2V0Q2hpbGRCeU5hbWUoJ05ldyBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5mcmVlVGltZXM7XHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0byA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5TdG9wQXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdGFydEJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RvcEJ0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgIC8vIH0sIDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wRnJlZVRpbWVzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RvcEZyZWVUaW1lcyBmcmVlR2FtZUNvaW4gOiBcIiwgdGhpcy5mcmVlR2FtZUNvaW4pO1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU3RvcEF1dG9CdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuZnJlZUhpZGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUhpZGVOb2RlW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlRW5kTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLmZyZWVHYW1lQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDIpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8wLTUgMC0yXHJcbiAgICBzaG93QW5pbShjb2xzLCBpbmRleCwgYmVpc2h1KSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5QlcoKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikucGxheUFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikgJiYgYmVpc2h1ID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBiZWlzaHU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBub2RlTGlzdFtjb2xzICogMyArIGluZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsc29lQW5pbShjb2xzLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlSWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q29tcG9uZW50KFwiVGVtcEFuaW1hdGlvblwiKS5zdG9wQW5pbSgpO1xyXG4gICAgICAgIC8v5re75YqgXHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5re75Yqg57uT5p2fXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrUm9sbERhdGEobGlzdCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlcmF0b3Igb2YgbGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IgPj0gdGhpcy5yb2xlUGIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJvbGwobGlzdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1JvbGxEYXRhKGxpc3QpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBcclxuICAgICAgICAgICAg5pyN5Yqh5Zmo6I635Y+W55qE6Iqx6Imy56eN57G75aSn5LqO546w5pyJ55qE6Iqx6Imy56eN57G777yB77yB77yBXHJcbiAgICAgICAgICAgIOivt+iBlOezu+acjeWKoeWZqOS6uuWRmOi/m+ihjOaVsOaNruiwg+aVtO+8gWBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsaW5lW2ldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbGlzdCkge1xyXG4gICAgICAgICAgICBsaW5lW2kgJSA1XVsyIC0gcGFyc2VJbnQoaSAvIDUpXSA9IGxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RhcnRSb2xsKC4uLmxpbmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2VTaGluZSgpIHtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSB0aGlzLmVmZmVjdEFuaW1Qci5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2VuZFJvbGwoKSB7XHJcbiAgICAgICAgdGhpcy5yb2xsSW5kZXgrKztcclxuICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICB0aGlzLnNldEJ0blVzYWJsZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zdGFydEJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RvcEJ0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5uZXQuc29ja2V0LmVtaXQoJ2xvdHRlcnknLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGJldDogdGhpcy5iZXQsXHJcbiAgICAgICAgICAgIG5CZXRMaXN0OiBbQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSAqIDEwMCxdXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wSW1tZWRpYXRlbHkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRCdG5Vc2FibGUodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbaV0uc3RvcEltbWVkaWF0ZWx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0QmlnV2luKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgyKTtcclxuICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1dG9CdG4ubm9kZS5hY3RpdmUgPSAhdGhpcy5hdXRvO1xyXG4gICAgICAgIHRoaXMuU3RvcEF1dG9CdG4ubm9kZS5hY3RpdmUgPSB0aGlzLmF1dG87XHJcbiAgICAgICAgdGhpcy5CaWdXaW5TZXQgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHByID0gdGhpcy5iaWdXaW5Ob2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gcHIpIHtcclxuICAgICAgICAgICAgbGV0IHByMSA9IHByW2ldLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqIGluIHByMSkge1xyXG4gICAgICAgICAgICAgICAgcHIxW2pdLmFjdGl2ZSA9IGogPT0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYmlnV2luQ2xpY2soZXZlbnQsIGFyZ3MpIHtcclxuICAgICAgICBpZiAodGhpcy5iaWdXaW5UaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgbGV0IG51bSA9IHRoaXMuQmlnV2luU2V0LnNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuQmlnV2luU2V0LmFkZChhcmdzKTtcclxuICAgICAgICAgICAgaWYgKG51bSA9PSB0aGlzLkJpZ1dpblNldC5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHdpbk5vZGVQciA9IHRoaXMuYmlnV2luTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgdGhpcy5iaWdXaW5UaW1lcy0tO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmJpZ1dpblJlc0xpc3RbdGhpcy5iaWdXaW5UaW1lc107XHJcbiAgICAgICAgICAgIGxldCBuYW1lTGlzdCA9IHtcclxuICAgICAgICAgICAgICAgIDEwOiAnc19ib251c19TSDAwRl9taW5vcicsXHJcbiAgICAgICAgICAgICAgICAxMDA6ICdzX2JvbnVzX1NIMDBGX21lZGl1bScsXHJcbiAgICAgICAgICAgICAgICAxMDAwOiAnc19ib251c19TSDAwRl9tZWdhJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBuZCA9IHdpbk5vZGVQclthcmdzXS5nZXRDaGlsZEJ5TmFtZShuYW1lTGlzdFtpbmRleF0pO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbmQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgICAgICB9LCAwLjUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iaWdXaW5UaW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5iaWdXaW5SZXN1bHRDb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAodGhpcy5iaWdXaW5Db2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5nZXRDaGlsZEJ5TmFtZSgnY29pbicpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuYmlnV2luQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbHQgPSBbMTAsIDMwLCAxMDAsIDEwMDBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gbHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5SZXN1bHRBbmltLmdldENoaWxkQnlOYW1lKCcnICsgbHRbaV0pLmFjdGl2ZSA9IHRoaXMuYmlnV2luQ2FyZCA9PSBsdFtpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdXaW5Cb28gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5Lit5aWW5Yqo5pWINDkwLTYzNVxyXG4gICAgd2luQWNpdG9uKCkge1xyXG4gICAgICAgIHRoaXMuYmlnV2luVGlwLnggPSA2MzU7XHJcbiAgICAgICAgdGhpcy5iaWdXaW5UaXAuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgIHRoaXMuYmlnV2luVGlwLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC41LCBjYy52Mig0OTAsIHRoaXMuYmlnV2luVGlwLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgyKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjUsIGNjLnYyKDYzNSwgdGhpcy5iaWdXaW5UaXAueSkpLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luVGlwLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8v6I+c5Y2V5Yqo5pWINjc2LTQ2NlxyXG4gICAgbWVudUFjaXRvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0RvaW5nTWVudSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNNZW51T3BlbiA9ICF0aGlzLmlzTWVudU9wZW47XHJcbiAgICAgICAgbGV0IGlzT3BlbiA9IHRoaXMuaXNNZW51T3BlbjtcclxuICAgICAgICB0aGlzLmlzRG9pbmdNZW51ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcDEsIHAyLCB0MSwgdDI7XHJcbiAgICAgICAgaWYgKGlzT3Blbikge1xyXG4gICAgICAgICAgICBwMSA9IDQ0NjtcclxuICAgICAgICAgICAgcDIgPSA0NjY7XHJcbiAgICAgICAgICAgIHQxID0gMC4zO1xyXG4gICAgICAgICAgICB0MiA9IDAuMDU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcDEgPSA0NDY7XHJcbiAgICAgICAgICAgIHAyID0gNjc2O1xyXG4gICAgICAgICAgICB0MSA9IDAuMDU7XHJcbiAgICAgICAgICAgIHQyID0gMC4zO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1lbnVQYW5lbC5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKHQxLCBjYy52MihwMSwgdGhpcy5tZW51UGFuZWwueSkpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKHQyLCBjYy52MihwMiwgdGhpcy5tZW51UGFuZWwueSkpLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNEb2luZ01lbnUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8v55S757q/6KeE5YiZ5biu5YqpNjQwLTBcclxuICAgIGhlbHBQYW5lbDJBY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEb2luZ0hlbHAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0RvaW5nSGVscDIgPSB0cnVlO1xyXG4gICAgICAgIGxldCBwMSA9IHRoaXMuaXNIZWxwMk9wZW4gPyAwIDogNjQwO1xyXG4gICAgICAgIHRoaXMuaGVscFBhbmVsMi5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNCwgY2MudjIodGhpcy5oZWxwUGFuZWwyLngsIHAxKSksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0RvaW5nSGVscDIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTsiXX0=