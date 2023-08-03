
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/slot_LrishLuck/js/IrishLuckMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e0294f2UcpJjZJIbM1k2rc3', 'IrishLuckMain');
// Texture/slot_LrishLuck/js/IrishLuckMain.js

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
    this.net = this.node.getComponent('IrishLuckNetwork');
    this.audio = this.node.getComponent('IrishLuckAudio');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcc2xvdF9McmlzaEx1Y2tcXGpzXFxJcmlzaEx1Y2tNYWluLmpzIl0sIm5hbWVzIjpbIkJFVE5VTSIsIkxJTkVTIiwiVE9QQkVUIiwiQkVUIiwiUlVMRUxJU1QiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxibFVzZXJDb2luIiwidHlwZSIsIkxhYmVsIiwiZGlzcGxheU5hbWUiLCJsYmxMaW5lcyIsImxpbmVOb2RlIiwiTm9kZSIsImxibEN1ckJldCIsImxibFdpbkNvaW4iLCJsYmxDb2luTGlzdCIsInJvbGVQYiIsIlByZWZhYiIsInNwQXRsYXMiLCJTcHJpdGVBdGxhcyIsImF1dG9CdG4iLCJCdXR0b24iLCJTdG9wQXV0b0J0biIsInN0YXJ0QnRuIiwic3RvcEJ0biIsImN0cmxCdG4iLCJlZmZlY3RBbmltUHIiLCJlZmZlY3RBbmltRnVsbEEiLCJlZmZlY3RBbmltRnVsbEIiLCJlZmZlY3RBbmltQmlnRnVsbCIsImJpZ1dpbk5vZGUiLCJiaWdXaW5SZXN1bHRBbmltIiwiQmdOb2RlIiwiZnJlZUJnTm9kZSIsImZyZWVCZWdpbk5vZGUiLCJmcmVlRW5kTm9kZSIsImZyZWVUaW1lc05vZGUiLCJoZWxwVUkiLCJoZWxwTnVtIiwiYmlnV2luVGlwIiwibWVudVBhbmVsIiwiaGVscFBhbmVsMSIsImhlbHBQYW5lbDIiLCJvbkxvYWQiLCJwbGF5ZXJJbmZvIiwicmVxdWlyZSIsImdldEluc3RhbnQiLCJuZXQiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiYXVkaW8iLCJ3aGVlbExpc3QiLCJiZXQiLCJhdXRvIiwic3RhdHVzIiwiYmlnV2luUmVzTGlzdCIsImJpZ1dpbkNhcmQiLCJiaWdXaW5Db2luIiwiYmlnV2luQm9vIiwiZnJlZVRpbWVzIiwicm9sbFJlc3VsdCIsInJvbGxJbmRleCIsImxvdHRlcnlSZXMiLCJzdG9wRnJlZSIsImZyZWVHYW1lQ29pbiIsImJJc0ZyZWVHYW1lIiwiaXNEb2luZ01lbnUiLCJpc01lbnVPcGVuIiwiaXNEb2luZ0hlbHAyIiwiaXNIZWxwMk9wZW4iLCJzdGFydCIsInN0cmluZyIsInNldEJldCIsInBsYXllckNvaW4iLCJ0b0ZpeGVkIiwib25DTGljayIsImV2ZW50IiwiYXJncyIsImFjdGl2ZSIsInNlbmRSb2xsIiwic3RvcEltbWVkaWF0ZWx5IiwibGVuZ3RoIiwicGxheUJnbSIsImhyIiwiY2hpbGRyZW4iLCJpIiwic29ja2V0IiwiZGlzY29ubmVjdCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwicEluZm8iLCJtdXNpY0NvbnRyb2wiLCJzdG9wQXVkaW8iLCJtZW51QWNpdG9uIiwiaGVscFBhbmVsMkFjdGlvbiIsImdhbWUiLCJlbmQiLCJzZXRCdG5Vc2FibGUiLCJpc1VzYWJsZSIsImludGVyYWN0YWJsZSIsInN0YXRlQ2FsbEJhY2siLCJzdCIsInJJbmRleCIsInVzZXJzY29yZSIsIndpbnNjb3JlIiwic2NoZWR1bGVPbmNlIiwicGxheVdpbkFuaW0iLCJ2aWV3YXJyYXkiLCJnZXRGcmVlVGltZSIsImJGbGFnIiwibkZyZWVUaW1lIiwiY2xvc2VTaGluZSIsInN0YXJ0RnJlZUdhbWUiLCJoYXNXaW5Cb29sIiwiYWxsTGluZSIsIm5XaW5DYXJkcyIsInB1c2giLCJsaW5lcyIsIm5XaW5MaW5lc0RldGFpbCIsImxpc3QiLCJzcCIsIlNrZWxldG9uIiwiY2xlYXJUcmFjayIsInNldEFuaW1hdGlvbiIsImxibF9jb2luIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhZGRjb2luIiwic2NoZWR1bGUiLCJ3aW5BY2l0b24iLCJhbmltSW5kZXgiLCJjbHNvZUFuaW0iLCJwYXJzZUludCIsImoiLCJzaG93QW5pbSIsImZNdWx0aXBsZSIsInN0b3BGcmVlVGltZXMiLCJjb25zb2xlIiwibG9nIiwiZnJlZUhpZGVOb2RlIiwiaW5pdFdoZWVsIiwiY29scyIsImluZGV4IiwiYmVpc2h1IiwicGxheUJXIiwicm9sZUlkTGlzdCIsInJvbGVQYkxpc3QiLCJwbGF5QW5pbSIsIm5vZGVMaXN0IiwiQW5pbWF0aW9uIiwicGxheSIsInN0b3BBbmltIiwiY2hlY2tSb2xsRGF0YSIsIml0ZXJhdG9yIiwicm9sbCIsImFsZXJ0IiwibGluZSIsInN0YXJ0Um9sbCIsImVtaXQiLCJKU09OIiwic3RyaW5naWZ5IiwibkJldExpc3QiLCJzdGFydEJpZ1dpbiIsIkJpZ1dpblNldCIsIlNldCIsInByIiwicHIxIiwiYmlnV2luQ2xpY2siLCJiaWdXaW5UaW1lcyIsIm51bSIsInNpemUiLCJhZGQiLCJ3aW5Ob2RlUHIiLCJuYW1lTGlzdCIsIm5kIiwiYmlnV2luUmVzdWx0Q29pbiIsImx0IiwieCIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwibW92ZVRvIiwidjIiLCJ5IiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiLCJzdG9wIiwiaXNPcGVuIiwicDEiLCJwMiIsInQxIiwidDIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsTUFBTSxHQUFHLEdBQWYsRUFBb0I7O0FBQ3BCLElBQU1DLEtBQUssR0FBRyxFQUFkLEVBQWtCOztBQUNsQixJQUFNQyxNQUFNLEdBQUcsQ0FBQyxFQUFELEVBQUssSUFBTCxFQUFXLEdBQVgsRUFBZ0IsRUFBaEIsQ0FBZjtBQUNBLElBQU1DLEdBQUcsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLEVBQTVCLENBQVo7QUFDQSxJQUFNQyxRQUFRLEdBQUcsQ0FBQyxDQUFELEVBQUksR0FBSixFQUFTLEdBQVQsRUFBYyxDQUFkLEVBQWlCLEdBQWpCLEVBQXNCLEdBQXRCLEVBQTJCLEdBQTNCLEVBQWdDLEdBQWhDLEVBQXFDLElBQXJDLEVBQTJDLEdBQTNDLEVBQWdELEdBQWhELEVBQXFELElBQXJELEVBQTJELEdBQTNELEVBQWdFLEdBQWhFLEVBQXFFLElBQXJFLEVBQTJFLEdBQTNFLEVBQWdGLEdBQWhGLEVB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RUFBRSxDQUFDaUwsTUFBSCxDQUFVUyxFQUFWLEVBQWMxTCxFQUFFLENBQUNrTCxFQUFILENBQU1NLEVBQU4sRUFBVSxLQUFLbEosU0FBTCxDQUFlNkksQ0FBekIsQ0FBZCxDQURKLEVBRUluTCxFQUFFLENBQUNpTCxNQUFILENBQVVVLEVBQVYsRUFBYzNMLEVBQUUsQ0FBQ2tMLEVBQUgsQ0FBTU8sRUFBTixFQUFVLEtBQUtuSixTQUFMLENBQWU2SSxDQUF6QixDQUFkLENBRkosRUFHSW5MLEVBQUUsQ0FBQ3FMLFFBQUgsQ0FBWSxZQUFNO0FBQ2QsTUFBQSxNQUFJLENBQUNySCxXQUFMLEdBQW1CLEtBQW5CO0FBQ0gsS0FGRCxDQUhKLENBREo7QUFTSCxHQXZwQkk7QUF3cEJMO0FBQ0E0QixFQUFBQSxnQkF6cEJLLDhCQXlwQmM7QUFBQTs7QUFDZixRQUFJLEtBQUsxQixZQUFULEVBQXVCO0FBQ25CO0FBQ0g7O0FBQ0QsU0FBS0EsWUFBTCxHQUFvQixJQUFwQjtBQUNBLFFBQUlzSCxFQUFFLEdBQUcsS0FBS3JILFdBQUwsR0FBbUIsQ0FBbkIsR0FBdUIsR0FBaEM7QUFDQSxTQUFLM0IsVUFBTCxDQUFnQnVJLFNBQWhCLENBQ0kvSyxFQUFFLENBQUNnTCxRQUFILENBQ0loTCxFQUFFLENBQUNpTCxNQUFILENBQVUsR0FBVixFQUFlakwsRUFBRSxDQUFDa0wsRUFBSCxDQUFNLEtBQUsxSSxVQUFMLENBQWdCc0ksQ0FBdEIsRUFBeUJVLEVBQXpCLENBQWYsQ0FESixFQUVJeEwsRUFBRSxDQUFDcUwsUUFBSCxDQUFZLFlBQU07QUFDZCxNQUFBLE1BQUksQ0FBQ25ILFlBQUwsR0FBb0IsS0FBcEI7QUFDSCxLQUZELENBRkosQ0FESjtBQVFIO0FBdnFCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCRVROVU0gPSAyLjU7IC8v5Y2V5rOo5YC8XHJcbmNvbnN0IExJTkVTID0gMjU7IC8v57q/5pWwXHJcbmNvbnN0IFRPUEJFVCA9IFszMCwgMTAwMCwgMTAwLCAxMF07XHJcbmNvbnN0IEJFVCA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XHJcbmNvbnN0IFJVTEVMSVNUID0gWzIsIDAuMiwgMC4xLCAxLCAwLjIsIDAuMSwgMC40LCAwLjEsIDAuMDUsIDAuNCwgMC4xLCAwLjA1LCAwLjQsIDAuMSwgMC4wNSwgMC40LCAwLjEsIDAuMDUsIDMsIDAuNiwgMC4yXTsgLy/op4TliJlcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBsYmxVc2VyQ29pbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfnlKjmiLfph5HluIEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJsTGluZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57q/5pWwJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbmVOb2RlOiBjYy5Ob2RlLC8v55S757q/XHJcbiAgICAgICAgbGJsQ3VyQmV0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOaAu+azqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxXaW5Db2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+acrOWxgOi1ouW+lycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYmxDb2luTGlzdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YiX5YCN546H5pi+56S6JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGVQYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+a7mui9ruinkuiJslBiJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5Zu+6ZuGJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+iHquWKqOaMiemSricsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTdG9wQXV0b0J0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5CdXR0b24sXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YGc5q2i6Ieq5Yqo5oyJ6ZKuJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXJ0QnRuOiBjYy5CdXR0b24sLy/lvIDlp4tcclxuICAgICAgICBzdG9wQnRuOiBjYy5CdXR0b24sLy/lgZzmraJcclxuICAgICAgICBjdHJsQnRuOiBbY2MuQnV0dG9uXSwvL+mcgOimgeaOp+WItuW8gOWFs+eahOaMiemSrlxyXG4gICAgICAgIGVmZmVjdEFuaW1Qcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWllueJueaViCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RBbmltRnVsbEE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpZblhajlsY/nibnmlYhBJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdEFuaW1GdWxsQjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+S4reWlluWFqOWxj+eJueaViEInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0QW5pbUJpZ0Z1bGw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuK3lpKflpZblhajlsY/nibnmlYgnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJpZ1dpbk5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICflpKflpZboioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJpZ1dpblJlc3VsdEFuaW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdiaWdXaW7kuK3lpZYnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBCZ05vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfmuLjmiI/og4zmma/oioLngrknLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICAgICAgZnJlZUJnTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+WFjei0ueaRh+WlluiDjOaZr+iKgueCuScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmVlQmVnaW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5byA5aeL5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyZWVFbmROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn57uT5p2f5YWN6LS55pGH5aWW6IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmcmVlVGltZXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5YWN6LS55pGH5aWW5pi+56S66IqC54K5JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdoZWxw55WM6Z2iJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoZWxwTnVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnaGVscOeVjOmdouWPr+WPmOazqOaVsCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaWdXaW5UaXA6IGNjLk5vZGUsLy/kuK3lpZbmj5DnpLpcclxuICAgICAgICBtZW51UGFuZWw6IGNjLk5vZGUsLy/oj5zljZVcclxuICAgICAgICBoZWxwUGFuZWwxOiBjYy5Ob2RlLC8v5biu5YqpMVxyXG4gICAgICAgIGhlbHBQYW5lbDI6IGNjLk5vZGUsLy/luK7liqkyXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnSXJpc2hMdWNrTmV0d29yaycpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdJcmlzaEx1Y2tBdWRpbycpO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpblJlc0xpc3QgPSBbMywgMSwgMl07XHJcbiAgICAgICAgdGhpcy5iaWdXaW5DYXJkID0gMDtcclxuICAgICAgICB0aGlzLmJpZ1dpbkNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXMgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sbFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxvdHRlcnlSZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RvcEZyZWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5iSXNGcmVlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIC8v5Yqo5pWI55u45YWzXHJcbiAgICAgICAgdGhpcy5pc0RvaW5nTWVudSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNNZW51T3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNEb2luZ0hlbHAyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0hlbHAyT3BlbiA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxibExpbmVzLnN0cmluZyA9IExJTkVTO1xyXG4gICAgICAgIHRoaXMubGJsV2luQ29pbi5zdHJpbmcgPSAnMC4wMCc7XHJcbiAgICAgICAgdGhpcy5zZXRCZXQoKTtcclxuICAgICAgICB0aGlzLmxibFVzZXJDb2luLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJDb2luLnRvRml4ZWQoMik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ0xpY2soZXZlbnQsIGFyZ3MpIHtcclxuICAgICAgICBzd2l0Y2ggKGFyZ3MpIHtcclxuICAgICAgICAgICAgY2FzZSBcImF1dG9cIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdG9wQXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImF1dG9TdG9wXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0b3BBdXRvQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJyb2xsXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuYmlnV2luQm9vIHx8IHRoaXMuc3RvcEZyZWUgfHwgdGhpcy5iSXNGcmVlR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic3RvcFJvbGxcIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhZGRcIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5iaWdXaW5Cb28gfHwgdGhpcy5zdG9wRnJlZSB8fCB0aGlzLmF1dG8pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJldCArPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCA+PSBCRVQubGVuZ3RoID8gQkVULmxlbmd0aCAtIDEgOiB0aGlzLmJldDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QmV0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRlY1wiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCB8fCB0aGlzLmJpZ1dpbkJvbyB8fCB0aGlzLnN0b3BGcmVlIHx8IHRoaXMuYXV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYmV0IC09IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0ID49IDAgPyB0aGlzLmJldCA6IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJldCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhZGRMaW5lXCI6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1YkxpbmVcIjpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VCaWdXaW5cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUJnbSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBociA9IHRoaXMuaGVscE51bS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gaHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBocltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChSVUxFTElTVFtpXSAqIEJFVFt0aGlzLmJldF0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlSGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImV4aXRHYW1lXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ldC5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlNYWluXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhdWRpb1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2wgPSAhdGhpcy5hdWRpby5wSW5mby5tdXNpY0NvbnRyb2w7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYXVkaW8ucEluZm8ubXVzaWNDb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zdG9wQXVkaW8oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpZ1dpbkJvbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QmdtKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibWVudVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51QWNpdG9uKHRoaXMuaXNNZW51T3Blbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm9wZW5MaW5lSGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0hlbHAyT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBQYW5lbDJBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VMaW5lSGVscFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0hlbHAyT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWxwUGFuZWwyQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlR2FtZVwiOlxyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbmQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLy/orr7nva7kuqTkupLmjInpkq7nmoTlj6/nlKjmgKdcclxuICAgIHNldEJ0blVzYWJsZShpc1VzYWJsZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5jdHJsQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3RybEJ0bltpXS5pbnRlcmFjdGFibGUgPSBpc1VzYWJsZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEJldCgpIHtcclxuICAgICAgICB0aGlzLmxibEN1ckJldC5zdHJpbmcgPSAoQkVUW3RoaXMuYmV0XSAqIEJFVE5VTSkudG9GaXhlZCgyKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGJsQ29pbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luTGlzdFtpXS5zdHJpbmcgPSAoVE9QQkVUW2ldICogKHRoaXMuYmV0ICsgMSkgKiBCRVROVU0pLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0ZUNhbGxCYWNrKCkge1xyXG4gICAgICAgIGxldCBzdCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbaV0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5b2T5YmN6L2u55uYXHJcbiAgICAgICAgICAgIGxldCBySW5kZXggPSB0aGlzLnJvbGxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5sYmxVc2VyQ29pbi5zdHJpbmcgPSAodGhpcy5sb3R0ZXJ5UmVzLnVzZXJzY29yZSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgdGhpcy5sYmxXaW5Db2luLnN0cmluZyA9ICh0aGlzLmxvdHRlcnlSZXMud2luc2NvcmUgLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJJc0ZyZWVHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVHYW1lQ29pbiArPSB0aGlzLmxvdHRlcnlSZXMud2luc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVdpbkFuaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3guYkZsYWcpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luQm9vID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luVGltZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5LmdldE9wZW5Cb3gud2luX2xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5SZXNMaXN0ID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9saXN0O1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5DYXJkID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94Lndpbl9jYXJkO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iaWdXaW5Db2luID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRPcGVuQm94LndpbjtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmlnV2luUmVzdWx0Q29pbiA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkudXNlcl9zY29yZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLnN0YXJ0QmlnV2luKCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9LCAyKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5iRmxhZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lcyA9IHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZ2V0RnJlZVRpbWUubkZyZWVUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZUJlZ2luTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlQmVnaW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEZyZWVHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzID0gdGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5nZXRGcmVlVGltZS5uRnJlZVRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRnJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5V2luQW5pbSgpIHtcclxuICAgICAgICAvL+WKqOeUu+e7k+adn+WQjuiHquWKqHJvbGxcclxuICAgICAgICBsZXQgaGFzV2luQm9vbCA9IDA7XHJcbiAgICAgICAgbGV0IGFsbExpbmUgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5DYXJkcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5UmVzLnZpZXdhcnJheS5uV2luQ2FyZHNbaV0pIHtcclxuICAgICAgICAgICAgICAgIGFsbExpbmUucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGluZXMgPSB0aGlzLmxvdHRlcnlSZXMudmlld2FycmF5Lm5XaW5MaW5lc0RldGFpbDtcclxuICAgICAgICBsZXQgckluZGV4ID0gdGhpcy5yb2xsSW5kZXg7XHJcbiAgICAgICAgbGV0IGxpc3QgPSAodGhpcy5mcmVlVGltZXMgPiAwIHx8IHRoaXMuc3RvcEZyZWUpID8gW2FsbExpbmUsXSA6IFthbGxMaW5lLCAuLi5saW5lc107XHJcbiAgICAgICAgaGFzV2luQm9vbCA9IGxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoaGFzV2luQm9vbCA+IDApIHtcclxuICAgICAgICAgICAgLy/mkq3mlL7mga3llpzlrZfmoLfliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltRnVsbEEuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcIndpbl9jblwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5oub6LSi54yr5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBsYmxfY29pbiA9IHRoaXMuZWZmZWN0QW5pbUZ1bGxCLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbGV0IGFkZGNvaW4gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZGNvaW4gKz0gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlIC8gMzBcclxuICAgICAgICAgICAgICAgIGlmIChhZGRjb2luID4gdGhpcy5sb3R0ZXJ5UmVzLndpbnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkY29pbiA9IHRoaXMubG90dGVyeVJlcy53aW5zY29yZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxibF9jb2luLnN0cmluZyA9IChhZGRjb2luIC8gMTAwKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9LCAwLCAzMCwgMC4wMSlcclxuICAgICAgICAgICAgLy/liKTmlq3mkq3mlL7ph5HluIHmjonokL3liqjnlLtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG90dGVyeVJlcy53aW5zY29yZSA+IEJFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDApIHsgLy/lpoLmnpzlpKfkuo4xMDDlgI3otYzms6jvvIzlsLHmkq3mlL5iaWdGdWxs5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1CaWdGdWxsLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJhbmltYXRpb24xXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICF0aGlzLmF1dG8gJiYgdGhpcy53aW5BY2l0b24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFuaW1JbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChySW5kZXggPT0gdGhpcy5yb2xsSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNvZUFuaW0oaSAlIDUsIHBhcnNlSW50KGkgLyA1KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISEhbGlzdFthbmltSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBsaXN0W2FuaW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dBbmltKGxpc3RbYW5pbUluZGV4XVtqXSAlIDUsIHBhcnNlSW50KGxpc3RbYW5pbUluZGV4XVtqXSAvIDUpKTsvL+S/ruaUuVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FuaW0obGlzdFthbmltSW5kZXhdW2pdICUgNSwgcGFyc2VJbnQobGlzdFthbmltSW5kZXhdW2pdIC8gNSksIHRoaXMubG90dGVyeVJlcy52aWV3YXJyYXkuZk11bHRpcGxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFuaW1JbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMywgbGlzdC5sZW5ndGgsIDAuMDEpXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUZ1bGxBLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdEFuaW1GdWxsQi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RBbmltQmlnRnVsbC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0QW5pbUJpZ0Z1bGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnRuVXNhYmxlKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3BGcmVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlVGltZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTaGluZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyZWVUaW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVRpbWVzLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BGcmVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0byAmJiB0aGlzLnNlbmRSb2xsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJJbmRleCA9PSB0aGlzLnJvbGxJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvICYmIHRoaXMuZnJlZVRpbWVzID09IDAgJiYgdGhpcy5zZW5kUm9sbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaGFzV2luQm9vbCA+IDAgPyBoYXNXaW5Cb29sICogMyA6IDIpXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5YWN6LS55qyh5pWw5pyJ5YWzXHJcbiAgICBzdGFydEZyZWVHYW1lKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRGcmVlR2FtZVwiKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMSk7XHJcbiAgICAgICAgdGhpcy5mcmVlR2FtZUNvaW4gPSAwO1xyXG4gICAgICAgIHRoaXMuQmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJlZUJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5TdG9wQXV0b0J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5mcmVlSGlkZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlSGlkZU5vZGVbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLmluaXRXaGVlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVUaW1lc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dCcpLmdldENoaWxkQnlOYW1lKCdOZXcgTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZnJlZVRpbWVzO1xyXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU3RvcEF1dG9CdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZFJvbGwoKTtcclxuICAgICAgICAvLyB9LCAyKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEZyZWVUaW1lcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0b3BGcmVlVGltZXMgZnJlZUdhbWVDb2luIDogXCIsIHRoaXMuZnJlZUdhbWVDb2luKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMCk7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlN0b3BBdXRvQnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmZyZWVIaWRlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVIaWRlTm9kZVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLndoZWVsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLndoZWVsTGlzdFtpXS5pbml0V2hlZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmVlVGltZXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJlZUVuZE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX2NvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAodGhpcy5mcmVlR2FtZUNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVFbmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVCZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYklzRnJlZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICB9LCAyKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vMC01IDAtMlxyXG4gICAgc2hvd0FuaW0oY29scywgaW5kZXgsIGJlaXNodSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheUJXKCk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVJZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDb21wb25lbnQoXCJUZW1wQW5pbWF0aW9uXCIpLnBsYXlBbmltKCk7XHJcbiAgICAgICAgLy/mt7vliqBcclxuICAgICAgICBpZiAodGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpICYmIGJlaXNodSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2NvbHNdLnJvbGVQYkxpc3RbbGVuZ3RoIC0gMiAtIGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImJlaXNodVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmVpc2h1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZUxpc3RbY29scyAqIDMgKyBpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbHNvZUFuaW0oY29scywgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy53aGVlbExpc3RbY29sc10ucm9sZUlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENvbXBvbmVudChcIlRlbXBBbmltYXRpb25cIikuc3RvcEFuaW0oKTtcclxuICAgICAgICAvL+a3u+WKoFxyXG4gICAgICAgIGlmICh0aGlzLndoZWVsTGlzdFtjb2xzXS5yb2xlUGJMaXN0W2xlbmd0aCAtIDIgLSBpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJiZWlzaHVcIikpIHtcclxuICAgICAgICAgICAgdGhpcy53aGVlbExpc3RbY29sc10ucm9sZVBiTGlzdFtsZW5ndGggLSAyIC0gaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiYmVpc2h1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a3u+WKoOe7k+adn1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9IHRoaXMuZWZmZWN0QW5pbVByLmNoaWxkcmVuO1xyXG4gICAgICAgIG5vZGVMaXN0W2NvbHMgKiAzICsgaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1JvbGxEYXRhKGxpc3QpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yID49IHRoaXMucm9sZVBiLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICByb2xsKGxpc3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tSb2xsRGF0YShsaXN0KSkge1xyXG4gICAgICAgICAgICBhbGVydChgXHJcbiAgICAgICAgICAgIOacjeWKoeWZqOiOt+WPlueahOiKseiJsuenjeexu+Wkp+S6jueOsOacieeahOiKseiJsuenjeexu++8ge+8ge+8gVxyXG4gICAgICAgICAgICDor7fogZTns7vmnI3liqHlmajkurrlkZjov5vooYzmlbDmja7osIPmlbTvvIFgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgICAgIGxldCBsaW5lID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIGxpc3QpIHtcclxuICAgICAgICAgICAgbGluZVtpICUgNV1bMiAtIHBhcnNlSW50KGkgLyA1KV0gPSBsaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMud2hlZWxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0YXJ0Um9sbCguLi5saW5lW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlU2hpbmUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gdGhpcy5lZmZlY3RBbmltUHIuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBub2RlTGlzdCkge1xyXG4gICAgICAgICAgICBub2RlTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRSb2xsKCkge1xyXG4gICAgICAgIHRoaXMucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNoaW5lKCk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5Vc2FibGUoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0b3BCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubmV0LnNvY2tldC5lbWl0KCdsb3R0ZXJ5JywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBiZXQ6IHRoaXMuYmV0LFxyXG4gICAgICAgICAgICBuQmV0TGlzdDogW0JFVFt0aGlzLmJldF0gKiBCRVROVU0gKiAxMDAsXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEltbWVkaWF0ZWx5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRvKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnRuVXNhYmxlKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy53aGVlbExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxMaXN0W2ldLnN0b3BJbW1lZGlhdGVseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydEJpZ1dpbigpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXlCZ20oMik7XHJcbiAgICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLm5vZGUuYWN0aXZlID0gIXRoaXMuYXV0bztcclxuICAgICAgICB0aGlzLlN0b3BBdXRvQnRuLm5vZGUuYWN0aXZlID0gdGhpcy5hdXRvO1xyXG4gICAgICAgIHRoaXMuQmlnV2luU2V0ID0gbmV3IFNldCgpO1xyXG4gICAgICAgIHRoaXMuYmlnV2luTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBwciA9IHRoaXMuYmlnV2luTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHByKSB7XHJcbiAgICAgICAgICAgIGxldCBwcjEgPSBwcltpXS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBwcjEpIHtcclxuICAgICAgICAgICAgICAgIHByMVtqXS5hY3RpdmUgPSBqID09IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGJpZ1dpbkNsaWNrKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYmlnV2luVGltZXMgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSB0aGlzLkJpZ1dpblNldC5zaXplO1xyXG4gICAgICAgICAgICB0aGlzLkJpZ1dpblNldC5hZGQoYXJncyk7XHJcbiAgICAgICAgICAgIGlmIChudW0gPT0gdGhpcy5CaWdXaW5TZXQuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB3aW5Ob2RlUHIgPSB0aGlzLmJpZ1dpbk5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIHRoaXMuYmlnV2luVGltZXMtLTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5iaWdXaW5SZXNMaXN0W3RoaXMuYmlnV2luVGltZXNdO1xyXG4gICAgICAgICAgICBsZXQgbmFtZUxpc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAxMDogJ3NfYm9udXNfU0gwMEZfbWlub3InLFxyXG4gICAgICAgICAgICAgICAgMTAwOiAnc19ib251c19TSDAwRl9tZWRpdW0nLFxyXG4gICAgICAgICAgICAgICAgMTAwMDogJ3NfYm9udXNfU0gwMEZfbWVnYSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbmQgPSB3aW5Ob2RlUHJbYXJnc10uZ2V0Q2hpbGRCeU5hbWUobmFtZUxpc3RbaW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5kLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICAgICAgfSwgMC41KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmlnV2luVGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGJsVXNlckNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luUmVzdWx0Q29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFdpbkNvaW4uc3RyaW5nID0gKHRoaXMuYmlnV2luQ29pbiAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblJlc3VsdEFuaW0uZ2V0Q2hpbGRCeU5hbWUoJ2NvaW4nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLmJpZ1dpbkNvaW4gLyAxMDApLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGx0ID0gWzEwLCAzMCwgMTAwLCAxMDAwXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luUmVzdWx0QW5pbS5nZXRDaGlsZEJ5TmFtZSgnJyArIGx0W2ldKS5hY3RpdmUgPSB0aGlzLmJpZ1dpbkNhcmQgPT0gbHRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlnV2luQm9vID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+S4reWlluWKqOaViDQ5MC02MzVcclxuICAgIHdpbkFjaXRvbigpIHtcclxuICAgICAgICB0aGlzLmJpZ1dpblRpcC54ID0gNjM1O1xyXG4gICAgICAgIHRoaXMuYmlnV2luVGlwLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICB0aGlzLmJpZ1dpblRpcC5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNSwgY2MudjIoNDkwLCB0aGlzLmJpZ1dpblRpcC55KSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC41LCBjYy52Mig2MzUsIHRoaXMuYmlnV2luVGlwLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ1dpblRpcC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvL+iPnOWNleWKqOaViDY3Ni00NjZcclxuICAgIG1lbnVBY2l0b24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEb2luZ01lbnUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzTWVudU9wZW4gPSAhdGhpcy5pc01lbnVPcGVuO1xyXG4gICAgICAgIGxldCBpc09wZW4gPSB0aGlzLmlzTWVudU9wZW47XHJcbiAgICAgICAgdGhpcy5pc0RvaW5nTWVudSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHAxLCBwMiwgdDEsIHQyO1xyXG4gICAgICAgIGlmIChpc09wZW4pIHtcclxuICAgICAgICAgICAgcDEgPSA0NDY7XHJcbiAgICAgICAgICAgIHAyID0gNDY2O1xyXG4gICAgICAgICAgICB0MSA9IDAuMztcclxuICAgICAgICAgICAgdDIgPSAwLjA1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAxID0gNDQ2O1xyXG4gICAgICAgICAgICBwMiA9IDY3NjtcclxuICAgICAgICAgICAgdDEgPSAwLjA1O1xyXG4gICAgICAgICAgICB0MiA9IDAuMztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tZW51UGFuZWwucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbyh0MSwgY2MudjIocDEsIHRoaXMubWVudVBhbmVsLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbyh0MiwgY2MudjIocDIsIHRoaXMubWVudVBhbmVsLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRG9pbmdNZW51ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvL+eUu+e6v+inhOWImeW4ruWKqTY0MC0wXHJcbiAgICBoZWxwUGFuZWwyQWN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRG9pbmdIZWxwMikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNEb2luZ0hlbHAyID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcDEgPSB0aGlzLmlzSGVscDJPcGVuID8gMCA6IDY0MDtcclxuICAgICAgICB0aGlzLmhlbHBQYW5lbDIucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjQsIGNjLnYyKHRoaXMuaGVscFBhbmVsMi54LCBwMSkpLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNEb2luZ0hlbHAyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7Il19